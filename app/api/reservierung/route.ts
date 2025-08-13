// app/api/reservierung/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// ---- Runtime bewusst Node.js (nicht Edge), da wir npm-SDK benutzen:
export const runtime = "nodejs";

// ---- .env Variablen (in Vercel setzen):
const RESEND_API_KEY = process.env.RESEND_API_KEY;       // Pflicht (sonst "Dry-Run")
const RESERVATION_TO = process.env.RESERVATION_TO ?? "hallo@hbot-berlin.de";
const RESERVATION_FROM = process.env.RESERVATION_FROM ?? "onboarding@resend.dev"; // In Prod eigene Domain verifizieren

// ---- Simple In-Memory Rate Limit (5 Requests / 10min / IP)
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

// ---- Schema
const FormSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(60).optional().nullable(),
  startWeek: z.string().regex(/^\d{4}-W\d{2}$/).optional().nullable(),
  message: z.string().max(4000).optional().nullable(),
  consent: z.boolean().refine(v => v === true, { message: "Einwilligung erforderlich" }),
  // Honeypot (sollte leer bleiben)
  company: z.string().max(0).optional().nullable(),
});

// 2026-W01 oder später
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

export async function POST(req: Request) {
  const ip = ipFromHeaders(req);

  if (!ratelimit(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = FormSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation error", issues: parsed.error.format() },
      { status: 400 }
    );
  }

  const { name, email, phone, startWeek, message, consent, company } = parsed.data;

  // Honeypot gefüllt -> als Spam leise annehmen, aber nicht verarbeiten
  if (company && company.length > 0) {
    return NextResponse.json({ ok: true, queued: false, spam: true });
  }

  if (!isWeekOnOrAfter2026W01(startWeek)) {
    return NextResponse.json(
      { ok: false, error: "Startwoche erst ab 2026-W01 erlaubt" },
      { status: 400 }
    );
  }

  // Mailinhalt
  const subject = `Neue Reservierung – Rejuvenation 90`;
  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial">
      <h2>Neue Reservierung (Website)</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Telefon:</strong> ${escapeHtml(phone || "")}</p>
      <p><strong>Startwoche:</strong> ${escapeHtml(startWeek || "—")}</p>
      <p><strong>Nachricht:</strong><br/>${escapeHtml(message || "").replace(/\n/g, "<br/>")}</p>
      <hr/>
      <p style="color:#64748b;font-size:12px">IP: ${escapeHtml(ip)} · Einwilligung: ${consent ? "ja" : "nein"}</p>
    </div>
  `;

  // Wenn kein API-Key gesetzt -> Dry-Run (für lokale Tests)
  if (!RESEND_API_KEY) {
    console.warn("[DRY-RUN] RESEND_API_KEY fehlt. E-Mail nicht gesendet.", { to: RESERVATION_TO, subject });
    return NextResponse.json({ ok: true, queued: false, dryRun: true });
  }

  try {
    const resend = new Resend(RESEND_API_KEY);
    const result = await resend.emails.send({
      from: RESERVATION_FROM,
      to: [RESERVATION_TO],
      replyTo: [email],
      subject,
      html,
      text: stripHtml(html),
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return NextResponse.json({ ok: false, error: "Mail send failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true, queued: true, id: result.data?.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 });
  }
}

// -- kleine Helfer
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
