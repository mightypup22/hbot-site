// app/api/reservierung/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";

// ───────────────────────────── ENV
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESERVATION_TO = process.env.RESERVATION_TO ?? "hallo@hbot-berlin.de";
const RESERVATION_FROM = process.env.RESERVATION_FROM ?? "onboarding@resend.dev"; // Admin-Mail-Absender
const RESEND_FALLBACK_FROM = process.env.RESEND_FALLBACK_FROM ?? "onboarding@resend.dev"; // Nutzer-Bestätigung

// ───────────────────────────── App-Rate-Limit: 5 req / 10 min / IP
type Bucket = { first: number; count: number };
const buckets = new Map<string, Bucket>();
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

function ratelimit(ip: string): boolean {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b) {
    buckets.set(ip, { first: now, count: 1 });
    return true;
  }
  if (now - b.first > WINDOW_MS) {
    buckets.set(ip, { first: now, count: 1 });
    return true;
  }
  if (b.count >= LIMIT) return false;
  b.count += 1;
  return true;
}

// ───────────────────────────── Helpers
const emptyToUndef = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((v) => (v === "" || v === null ? undefined : v), schema);

const FormSchema = z.object({
  name: z.string().min(2, "Bitte geben Sie Ihren Namen an.").max(120),
  email: z.string().email("Bitte eine gültige E-Mail angeben."),
  phone: emptyToUndef(z.string().max(60, "Bitte prüfen Sie die Telefonnummer.")).optional(),
  startWeek: emptyToUndef(z.string().regex(/^\d{4}-W\d{2}$/, "Bitte eine gültige Kalenderwoche wählen.")).optional(),
  message: emptyToUndef(z.string().max(4000, "Nachricht ist zu lang.")).optional(),
  consent: z.boolean().refine((v) => v === true, { message: "Bitte stimmen Sie den Bedingungen zu." }),
  company: emptyToUndef(z.string().max(0)).optional(), // Honeypot (muss leer bleiben)
});

function isWeekOnOrAfter2026W01(w?: string | null): boolean {
  if (!w) return true;
  const m = /^(\d{4})-W(\d{2})$/.exec(w);
  if (!m) return false;
  const year = parseInt(m[1], 10);
  const week = parseInt(m[2], 10);
  if (year > 2026) return true;
  if (year < 2026) return false;
  return week >= 1;
}

function ipFromHeaders(req: Request): string {
  const xf = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim();
  const cf = req.headers.get("cf-connecting-ip") || "";
  const fly = req.headers.get("fly-client-ip") || "";
  return xf || cf || fly || "0.0.0.0";
}

function stripHtml(input: string) {
  return input.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "");
}
function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// ───────────────────────────── Fehler hübsch mappen (typisiert)
type FlattenError = {
  fieldErrors?: Record<string, string[]>;
  formErrors?: string[];
};
function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}
function isStringArray(a: unknown): a is string[] {
  return Array.isArray(a) && a.every((x) => typeof x === "string");
}
function isFlattenError(v: unknown): v is FlattenError {
  if (!isRecord(v)) return false;
  const fe = v["fieldErrors"];
  const fo = v["formErrors"];
  const feOk =
    fe === undefined ||
    (isRecord(fe) && Object.values(fe).every((arr) => isStringArray(arr)));
  const foOk = fo === undefined || isStringArray(fo);
  return feOk && foOk;
}
function errorResponse(status: number, msg: string, issues?: unknown) {
  const errors: Record<string, string> = { general: msg };
  if (isFlattenError(issues)) {
    for (const [k, arr] of Object.entries(issues.fieldErrors ?? {})) {
      if (arr && arr.length) errors[k] = arr[0];
    }
    if (issues.formErrors && issues.formErrors.length) {
      errors.general = issues.formErrors[0];
    }
  }
  return NextResponse.json({ ok: false, error: msg, errors }, { status });
}

// ───────────────────────────── Resend-Helfer
function isResend429(err: unknown): boolean {
  if (!isRecord(err)) return false;
  const name = typeof err["name"] === "string" ? err["name"] : "";
  const status = typeof err["statusCode"] === "number" ? err["statusCode"] : 0;
  return name === "rate_limit_exceeded" || status === 429;
}
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(req: Request) {
  const ip = ipFromHeaders(req);
  if (!ratelimit(ip)) {
    return errorResponse(429, "Zu viele Anfragen. Bitte später erneut versuchen.");
  }

  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return errorResponse(400, "Ungültige Anfrage (kein gültiges JSON).");
  }

  const parsed = FormSchema.safeParse(data);
  if (!parsed.success) {
    const flat = parsed.error.flatten();
    return errorResponse(400, "Bitte prüfen Sie Ihre Eingaben.", flat);
  }

  const { name, email, phone, startWeek, message, consent, company } = parsed.data;

  // Honeypot → leise annehmen, aber nichts versenden
  if (company && company.length > 0) {
    return NextResponse.json({ ok: true, spam: true, queued: false });
  }

  if (!isWeekOnOrAfter2026W01(startWeek)) {
    return NextResponse.json(
      { ok: false, error: "Startwoche erst ab 2026-W01 erlaubt.", errors: { startWeek: "Startwoche erst ab 2026-W01 erlaubt." } },
      { status: 400 }
    );
  }

  if (!RESEND_API_KEY) {
    console.warn("[DRY-RUN] RESEND_API_KEY fehlt. E-Mails nicht gesendet.");
    return NextResponse.json({ ok: true, queued: false, dryRun: true });
  }

  const resend = new Resend(RESEND_API_KEY);

  // Inhalte
  const subjectAdmin = "Neue Reservierung – Rejuvenation 90";
  const htmlAdmin = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial">
      <h2>Neue Reservierung (Website)</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Telefon:</strong> ${escapeHtml(phone ?? "")}</p>
      <p><strong>Startwoche:</strong> ${escapeHtml(startWeek ?? "—")}</p>
      <p><strong>Nachricht:</strong><br/>${escapeHtml(message ?? "").replace(/\n/g, "<br/>")}</p>
      <hr/>
      <p style="color:#64748b;font-size:12px">IP: ${escapeHtml(ip)} · Einwilligung: ${consent ? "ja" : "nein"}</p>
    </div>
  `;
  const textAdmin = stripHtml(htmlAdmin);

  const subjectUser = "Empfangsbestätigung – HBOT Praxis Charlottenburg";
  const htmlUser = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;line-height:1.5">
      <h2 style="margin:0 0 8px 0">Vielen Dank für Ihre Reservierung</h2>
      <p>Wir haben Ihre Anfrage erhalten und melden uns zeitnah zur Eignungsklärung und Terminabstimmung.</p>
      <p><strong>Zusammenfassung:</strong></p>
      <ul>
        <li><strong>Name:</strong> ${escapeHtml(name)}</li>
        <li><strong>E-Mail:</strong> ${escapeHtml(email)}</li>
        <li><strong>Telefon:</strong> ${escapeHtml(phone ?? "—")}</li>
        <li><strong>Startwoche:</strong> ${escapeHtml(startWeek ?? "—")}</li>
      </ul>
      ${message ? `<p><strong>Ihre Nachricht:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>` : ""}
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
      <p style="font-size:12px;color:#64748b;margin:0">
        Hinweis: Diese E-Mail wurde automatisch versendet. Bitte antworten Sie bei Rückfragen einfach auf diese Nachricht.
      </p>
    </div>
  `;
  const textUser = stripHtml(htmlUser);

  // E-Mail-Optionen als normale Objekte (kein readonly)
  type SendOpts = Parameters<typeof resend.emails.send>[0];

  const adminOptions: SendOpts = {
    from: RESERVATION_FROM,
    to: RESERVATION_TO,      // string erlaubt
    replyTo: email,
    subject: subjectAdmin,
    html: htmlAdmin,
    text: textAdmin,
  };

  const userOptions: SendOpts = {
    from: `HBOT Praxis <${RESEND_FALLBACK_FROM}>`,
    to: email,               // string erlaubt
    replyTo: RESERVATION_TO,
    subject: subjectUser,
    html: htmlUser,
    text: textUser,
  };

  // Batch (1 Request) + einfacher Retry bei 429
  async function sendBatchWithRetry() {
    const first = await resend.batch.send([adminOptions, userOptions]);
    if (!first?.error) return first;
    if (isResend429(first.error)) {
      await sleep(700);
      return await resend.batch.send([adminOptions, userOptions]);
    }
    return first;
  }

  const batchRes = await sendBatchWithRetry();

  if (batchRes?.error) {
    // Letzter Fallback: nur Admin-Mail (Lead sicherstellen)
    console.error("Resend batch error:", batchRes.error);
    const adminOnly = await resend.emails.send(adminOptions);
    if (adminOnly.error) {
      console.error("Resend admin-only error:", adminOnly.error);
      return errorResponse(502, "Versand fehlgeschlagen. Bitte später erneut versuchen.");
    }
    return NextResponse.json({
      ok: true,
      queued: true,
      adminId: adminOnly.data?.id ?? null,
      userId: null,
      confirmQueued: false,
      note: "Batch fehlgeschlagen; nur Admin-Mail versendet.",
    });
  }

  // ------ IDs sicher extrahieren (ohne Index-Ann. auf unbekanntem Typ)
  function hasId(v: unknown): v is { id: string } {
    return typeof v === "object" && v !== null && typeof (v as { id?: unknown }).id === "string";
  }

  let adminId: string | null = null;
  let userId: string | null = null;

  const dataUnknown = (batchRes as { data?: unknown }).data;
  if (Array.isArray(dataUnknown)) {
    if (hasId(dataUnknown[0])) adminId = dataUnknown[0].id;
    if (hasId(dataUnknown[1])) userId = dataUnknown[1].id;
  }

  return NextResponse.json({
    ok: true,
    queued: true,
    adminId,
    userId,
    confirmQueued: !!userId,
  });
}

// Optionaler GET-Check (für schnelle Diagnose; bei Bedarf später entfernen)
export async function GET() {
  return NextResponse.json({
    ok: true,
    route: "/api/reservierung",
    hasResendKey: !!process.env.RESEND_API_KEY,
    fromAdmin: process.env.RESERVATION_FROM ?? null,
    fromUser: process.env.RESEND_FALLBACK_FROM ?? "onboarding@resend.dev",
    env: process.env.VERCEL_ENV || "unknown",
  });
}
