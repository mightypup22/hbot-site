"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

/**
 * Robust Spline wrapper that
 * - loads the web component with type="module"
 * - waits until it's defined before rendering
 * - provides a graceful SVG fallback + retry
 * - exposes lightweight diagnostics for debugging
 */
function SplineHero({ url, layout = "inline" }: { url: string; layout?: "inline" | "backgroundRight" }) {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scriptId = "spline-viewer-script";

  const defineCheck = useCallback(() => {
    try {
      const defined =
        typeof window !== "undefined" &&
        "customElements" in window &&
        !!window.customElements.get("spline-viewer");
      return defined;
    } catch {
      return false;
    }
  }, []);

  const loadScript = useCallback((cacheBust = false) => {
    if (typeof document === "undefined") return;
    setError(null);

    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    const onLoad = () => {
      requestAnimationFrame(() => {
        if (defineCheck()) {
          setReady(true);
        } else {
          setError("Spline component loaded, but not registered.");
        }
      });
    };
    const onError = () => setError("Failed to load Spline viewer script.");

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "module"; // IMPORTANT for @splinetool/viewer
      script.src = `https://unpkg.com/@splinetool/viewer@latest/build/spline-viewer.js${cacheBust ? `?v=${Date.now()}` : ""}`;
      script.async = true;
      script.addEventListener("load", onLoad);
      script.addEventListener("error", onError);
      document.head.appendChild(script);
    } else {
      if (defineCheck()) {
        setReady(true);
      } else {
        script.addEventListener("load", onLoad, { once: true });
        script.addEventListener("error", onError, { once: true });
      }
    }

    return () => {
      script?.removeEventListener("load", onLoad);
      script?.removeEventListener("error", onError);
    };
  }, [defineCheck]);

  useEffect(() => {
    if (defineCheck()) {
      setReady(true);
      return;
    }
    const cleanup = loadScript(false);
    return () => cleanup && cleanup();
  }, [defineCheck, loadScript]);

  const handleRetry = () => {
    setReady(false);
    loadScript(true);
  };

  const isBg = layout === "backgroundRight";

  return (
    <div className={isBg ? "absolute inset-0" : "relative"}>
      <div className={isBg ? "absolute inset-0 overflow-hidden" : "relative w-full min-h-[340px] h-[50vh] md:h-[60vh] xl:h-[70vh] overflow-hidden"}>
        {ready ? (
          // @ts-expect-error -- Spline Custom Element ist nicht Teil der DOM-Typen
          <spline-viewer
            url={url}
            loading="eager"
            aria-label="Spline 3D Szene: Zellregeneration"
            style={
              isBg
                ? { position: "absolute", top: "50%", left: "75%", transform: "translate(-50%, -50%)", width: "160vw", height: "120vh", display: "block", background: "transparent" }
                : { position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", background: "transparent" }
            }
          />
        ) : (
          // Graceful fallback: animated SVG
          <svg viewBox="0 0 600 450" className="w-full h-full block">
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <linearGradient id="g2" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
            </defs>
            {[...Array(24)].map((_, i) => {
              const x = 50 + i * 22;
              return (
                <g key={i}>
                  <circle cx={x} cy={120 + Math.sin(i / 2) * 40} r={4} fill="url(#g1)">
                    <animate attributeName="cy" values={`120;${120 + Math.sin((i + 4) / 2) * 40};120`} dur="6s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={x} cy={300 + Math.cos(i / 2) * 40} r={4} fill="url(#g1)">
                    <animate attributeName="cy" values={`300;${300 + Math.cos((i + 4) / 2) * 40};300`} dur="6s" repeatCount="indefinite" />
                  </circle>
                  <line x1={x} y1={120 + Math.sin(i / 2) * 40} x2={x} y2={300 + Math.cos(i / 2) * 40} stroke="url(#g2)" strokeWidth="1" opacity="0.6" />
                </g>
              );
            })}
            {[...Array(20)].map((_, i) => {
              const delay = i * 0.6;
              const size = 3 + (i % 5);
              return (
                <circle key={i} cx={80 + ((i * 25) % 440)} cy={420} r={size} fill="#94a3b8" opacity="0.6">
                  <animate attributeName="cy" from="420" to="20" dur={`${7 + (i % 5)}s`} begin={`${delay}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.2;0.8;0.2" dur="6s" begin={`${delay}s`} repeatCount="indefinite" />
                </circle>
              );
            })}
          </svg>
        )}
      </div>
      {!ready && !isBg && (
        <div className="absolute inset-x-0 bottom-2 mx-auto w-fit text-xs bg-white/60 backdrop-blur px-3 py-1 text-slate-600 shadow-sm">
          Lädt 3D-Szene … {error ? <span className="text-rose-600">{error}</span> : null} <button onClick={handleRetry} className="underline ml-2">Erneut versuchen</button>
        </div>
      )}
    </div>
  );
}

export default function HBOTPraxisBerlin() {
  // Zustände für Submit-Feedback & Feldfehler
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState<null | { type: "ok" | "err"; text: string }>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMsg(null);
    setErrors({});

    const form = e.currentTarget;
    const fd = new FormData(form);

    const val = (k: string) => String(fd.get(k) ?? "");
    const opt = (s: string) => (s.trim() === "" ? undefined : s.trim());

    const payload = {
      name: val("name"),
      email: val("email"),
      phone: opt(val("phone")),
      startWeek: opt(val("startWeek")), // optional
      message: opt(val("message")), // optional
      consent: fd.get("consent") === "on",
      company: opt(val("company")), // Honeypot
    };

    try {
      const res = await fetch("/api/reservierung", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));

      if (res.ok && json?.ok) {
        setSubmitMsg({ type: "ok", text: "Danke! Wir haben Ihre Reservierung erhalten und melden uns zeitnah." });
        form.reset();
        setErrors({});
      } else if (res.status === 400 && json?.errors) {
        // Feldfehler hübsch anzeigen
        setErrors(json.errors as Record<string, string>);
        setSubmitMsg({ type: "err", text: json.errors?.general ?? "Bitte prüfen Sie Ihre Eingaben." });
      } else {
        setSubmitMsg({ type: "err", text: json?.error || "Senden fehlgeschlagen. Bitte später erneut versuchen." });
      }
    } catch {
      setSubmitMsg({ type: "err", text: "Netzwerkfehler. Bitte später erneut versuchen." });
    } finally {
      setSubmitting(false);
    }
  }

  // Lightweight diagnostics for the hero component + simple UI tests
  const [diag, setDiag] = useState({
    online: true,
    script: false,
    defined: false,
    tests: [] as { name: string; pass: boolean }[],
  });

  useEffect(() => {
    const update = () => {
      const defined = typeof window !== "undefined" && !!window.customElements?.get("spline-viewer");
      const script = !!document.getElementById("spline-viewer-script");
      const online = typeof navigator !== "undefined" ? navigator.onLine : true;

      // Lightweight "test cases"
      const tests: { name: string; pass: boolean }[] = [];
      tests.push({ name: "Hero zeigt alten & neuen Preis (Durchstreichung)", pass: !!document.querySelector("dl span.line-through") && !!document.querySelector("dl span.font-extrabold") });
      tests.push({ name: "EARLY-BIRD Box sichtbar", pass: !!document.querySelector("#preise .bg-emerald-50") });
      tests.push({ name: "Biomarker-Abschnitt vorhanden", pass: !!document.getElementById("biomarker") });
      tests.push({ name: "Evidenz-Links ≥ 4 vorhanden", pass: document.querySelectorAll("#evidenz a[href^='https']").length >= 4 });
      tests.push({ name: "Spline-Viewer geladen/definiert oder Fallback aktiv", pass: defined || !!document.querySelector("svg > defs") });

      setDiag({ online, script, defined, tests });
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-x-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 to-white" />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 60% at 30% 20%, rgba(200,169,110,0.10) 0%, rgba(200,169,110,0) 60%), radial-gradient(45% 45% at 90% 10%, rgba(15,23,42,0.07) 0%, rgba(15,23,42,0) 55%)",
          }}
        />
        <div className="absolute inset-0 z-0">
          <SplineHero url="https://prod.spline.design/QAxlHsQhvGCBm7Ht/scene.splinecode" layout="backgroundRight" />
        </div>
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-white/85 via-white/55 to-transparent md:from-white/70 md:via-white/35" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="display text-4xl md:text-5xl font-bold tracking-tight">
              Rejuvenation 90 <span className="whitespace-nowrap">- Programm</span>
            </h1>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              60 HBOT-Sitzungen in 90 Tagen in unserem Studio in Berlin-Charlottenburg.
              Ziel: Telomer-Längenerhalt/-verlängerung und Förderung zellulärer Verjüngungsprozesse.
              Premium-Betreuung mit täglichem Zugang <span className="whitespace-nowrap">(24 /7)</span> für optimale Integration in Ihren Alltag.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="#kontakt" className="px-5 py-3 rounded-2xl btn-brand">Early-Bird reservieren</Link>
              <Link href="#programm" className="px-5 py-3 rounded-2xl border border-slate-300 hover:bg-slate-50">Details ansehen</Link>
            </div>
            <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden">
                <dt className="text-slate-500 flex items-center gap-1">Sitzung</dt>
                <dd className="font-semibold break-words whitespace-normal leading-snug">60 - 90 Min 100% Sauerstoff</dd>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden">
                <dt className="text-slate-500 flex items-center gap-1">Anzahl</dt>
                <dd className="font-semibold break-words whitespace-normal leading-snug">60 Sitzungen in 90 Tagen</dd>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden">
                <dt className="text-slate-500 flex items-center gap-1">Zugang</dt>
                <dd className="font-semibold break-words whitespace-normal leading-snug">24 Stunden / 7 Tage die Woche</dd>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden">
                <dt className="text-slate-500 flex items-center gap-1">Preis</dt>
                <dd className="font-semibold break-words whitespace-normal leading-snug">
                  <span className="line-through text-slate-400 mr-2">4.999 €</span>
                  <br />
                  <span className="font-extrabold">4.499 €</span>
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-slate-500">Hinweis: Keine ärztliche Beratung/Heilversprechen. Individuelle Eignung erforderlich.</p>
          </div>

          <div className="hidden md:block" />
        </div>
      </section>

      {/* Programm */}
      <section id="programm" className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="display text-3xl font-bold">Programmübersicht</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl border border-slate-200">
            <h3 className="text-xl font-semibold">Struktur</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>60 Sitzungen in 12–13 Wochen</li>
              <li>Individuelles Tagesfenster, Zugang 24 /7</li>
              <li>Persönliches Coaching & Begleitung</li>
              <li>Biomarker-Messungen vor/nach dem Programm</li>
            </ul>
          </div>
          <div className="p-6 rounded-3xl border border-slate-200">
            <h3 className="text-xl font-semibold">Ziele</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>Telomer-Längenerhalt/-verlängerung (biologischer Alternsmarker)</li>
              <li>Reduktion seneszenter Zellmarker</li>
              <li>Optimierung von Regeneration, Schlaf & kognitiver Leistungsfähigkeit</li>
            </ul>
          </div>
          <div className="p-6 rounded-3xl border border-slate-200">
            <h3 className="text-xl font-semibold">Ablauf</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>Intake: Eignungscheck, Zieldefinition, Basis-Biomarker</li>
              <li>Durchführung: Betreute HBOT-Protokolle</li>
              <li>Review: Abschlussmessung & Ergebnisbesprechung</li>
            </ul>
          </div>
        </div>
        <p className="mt-4 text-xs text-slate-500">* Wissenschaftliche Grundlage siehe Abschnitt Evidenz. Ergebnisse können individuell variieren.</p>
      </section>

      {/* Philosophie */}
      <section id="philosophie" className="max-w-7xl mx-auto px-4 py-16 border-t border-slate-200">
        <h2 className="display text-3xl font-bold">Unsere Philosophie</h2>
        <div className="mt-4 grid md:grid-cols-2 gap-6 text-slate-700 leading-relaxed">
          <p>
            Wir glauben an <strong>proaktive Gesundheitsvorsorge</strong>: Wer frühzeitig in Lebensstil und Prävention investiert, fördert
            Gesundheit im Alter und kann Alterungsprozesse verlangsamen. Statt reaktiver Nachsorge setzen wir auf ein System, in dem
            Sie <strong>selbstwirksam</strong> handeln – mit Stellschrauben wie Training, Ernährung, Schlaf, Erholung und Screening.
          </p>
          <p>
            Unser Beitrag: eine der vielversprechendsten technologischen Anwendungen im Anti-Aging-Bereich <span className="whitespace-nowrap">(HBOT)</span>
            in einem <strong>Premium-Setting</strong>. Wir kombinieren strukturierte Protokolle mit Coaching und objektiven Biomarkern,
            um Fortschritte messbar zu machen – transparent und wissenschaftsnah.
          </p>
        </div>
      </section>

      {/* Was ist HBOT? – Kurzinfo (NEU) */}
      <section id="was-ist-hbot" className="max-w-7xl mx-auto px-4 py-16 border-t border-slate-200">
        <h2 className="display text-3xl font-bold">Was ist HBOT?</h2>
        <p className="mt-3 text-slate-600 max-w-3xl">
          HBOT (Hyperbare Sauerstofftherapie) ist die Gabe von 100&nbsp;% Sauerstoff unter erhöhtem Umgebungsdruck
          in einer Druckkammer. Dadurch löst sich deutlich mehr Sauerstoff im Blutplasma, was die Gewebeversorgung
          und Regenerationsprozesse unterstützen kann.
        </p>
        <ul className="mt-6 grid md:grid-cols-2 gap-3 text-sm text-slate-700">
          <li className="p-4 rounded-2xl bg-slate-50 border border-slate-200">Erhöhte Sauerstoff-Löslichkeit (vereinfacht: Henry-Gesetz).</li>
          <li className="p-4 rounded-2xl bg-slate-50 border border-slate-200">Verbesserte Mikrozirkulation & Gewebsversorgung.</li>
          <li className="p-4 rounded-2xl bg-slate-50 border border-slate-200">Begleitete Protokolle, strukturierter Ablauf.</li>
          <li className="p-4 rounded-2xl bg-slate-50 border border-slate-200">Sicherheit: standardisierte Verfahren, Eignungscheck.</li>
        </ul>
        <div className="mt-6">
          {/* Wenn du eine Detailseite anlegst, ändere href auf "/hbot" */}
          <Link href="/hbot" className="inline-block px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50">
            Mehr erfahren
          </Link>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Hinweis: Keine medizinische Beratung/kein Heilversprechen. Individuelle Eignung erforderlich.
        </p>
      </section>

      {/* Evidenz & Publikationen */}
      <section id="evidenz" className="max-w-7xl mx-auto px-4 py-16 border-t border-slate-200">
        <h2 className="display text-3xl font-bold">Evidenz & Publikationen (Auswahl)</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <article className="p-6 rounded-3xl border border-slate-200">
            <h3 className="font-semibold">Telomere & Seneszenz</h3>
            <p className="mt-2 text-sm text-slate-700">Prospektive Studie: Zunahme Telomer-Länge in Immunzellen und Abnahme seneszenter Marker nach HBOT-Sitzungen bei älteren Erwachsenen.</p>
            <Link className="mt-3 inline-block text-sm underline" href="https://pubmed.ncbi.nlm.nih.gov/33206062/" target="_blank" rel="noreferrer">PubMed: Hachmo et al., 2020 (Aging)</Link>
          </article>
          <article className="p-6 rounded-3xl border border-slate-200">
            <h3 className="font-semibold">Haut & Kollagen</h3>
            <p className="mt-2 text-sm text-slate-700">Biopsie-basierte Daten: gesteigerte Kollagendichte, Angiogenese, Rückgang seneszenter Zellen nach HBOT bei gesunden Älteren.</p>
            <Link className="mt-3 inline-block text-sm underline" href="https://pubmed.ncbi.nlm.nih.gov/34784294/" target="_blank" rel="noreferrer">PubMed: Hachmo et al., 2021</Link>
          </article>
          <article className="p-6 rounded-3xl border border-slate-200">
            <h3 className="font-semibold">Körperliche Leistungsfähigkeit</h3>
            <p className="mt-2 text-sm text-slate-700">Randomisierte, kontrollierte Studie: signifikante Zuwächse bei VO₂max, VO₂AT & Power in Master-Athlet:innen; Hinweise auf verbesserte mitochondriale Funktion.</p>
            <Link className="mt-3 inline-block text-sm underline" href="https://pubmed.ncbi.nlm.nih.gov/35133516/" target="_blank" rel="noreferrer">PubMed: Hadanny et al., 2022</Link>
          </article>
          <article className="p-6 rounded-3xl border border-slate-200">
            <h3 className="font-semibold">Gehirnfunktion & Perfusion</h3>
            <p className="mt-2 text-sm text-slate-700">Randomisierte, kontrollierte Studie in gesunden älteren Erwachsenen: Verbesserungen in Aufmerksamkeit, Verarbeitungsgeschwindigkeit & Exekutivfunktionen; begleitende CBF-Erhöhungen.</p>
            <Link className="mt-3 inline-block text-sm underline" href="https://pubmed.ncbi.nlm.nih.gov/32589613/" target="_blank" rel="noreferrer">PubMed: Hadanny et al., 2020</Link>
          </article>
          <article className="p-6 rounded-3xl border border-slate-200">
            <h3 className="font-semibold">Mikrobiom & Entzündung</h3>
            <p className="mt-2 text-sm text-slate-700">Human-Daten aus IBD-Kohorten und translationalen Analysen deuten auf eine Modulation des Darmmikrobioms und entzündlicher Pfade unter HBOT hin.</p>
            <Link className="mt-3 inline-block text-sm underline" href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9117812/" target="_blank" rel="noreferrer">Gonzalez et al., 2022 (Host-Microbe)</Link>
            <Link className="ml-4 inline-block text-sm underline" href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11137967/" target="_blank" rel="noreferrer">Li et al., 2024</Link>
          </article>
          <article className="p-6 rounded-3xl border border-slate-200">
            <h3 className="font-semibold">Immunmodulation</h3>
            <p className="mt-2 text-sm text-slate-700">Klinische Hinweise auf veränderte Zytokinprofile bei Patient:innen; experimentell anti-inflammatorische Effekte beobachtet (kontextabhängig).</p>
            <Link className="mt-3 inline-block text-sm underline" href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7957267/" target="_blank" rel="noreferrer">Hedetoft et al., 2021 (NSTI)</Link>
            <Link className="ml-4 inline-block text-sm underline" href="https://www.frontiersin.org/journals/physiology/articles/10.3389/fphys.2022.826163/full" target="_blank" rel="noreferrer">de Wolde et al., 2022</Link>
          </article>
        </div>
        <p className="mt-4 text-xs text-slate-500">Hinweis: Die Studienlage ist teils vorläufig/heterogen. Wir beraten transparent über Nutzen & Grenzen.</p>
      </section>

      {/* Biomarker */}
      <section id="biomarker" className="max-w-7xl mx-auto px-4 py-16 border-t border-slate-200">
        <h2 className="display text-3xl font-bold">Relevante Biomarker (vor & nach)</h2>
        <p className="mt-3 text-slate-600 max-w-3xl">
          Auswahl je nach Ziel (Kognition, Performance, Haut, metabolisch). Wir kombinieren objektive Marker mit subjektiven Scores,
          um Fortschritte transparent zu machen.
        </p>
        <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-6 text-sm">
          <div className="p-6 rounded-3xl bg-[var(--card)] border border-slate-200 ring-1 ring-[var(--ring)]/50">
            <h3 className="font-semibold">Biologisches Altern</h3>
            <ul className="mt-3 space-y-2">
              <li><strong>Telomerlänge (PBMC)</strong> — Marker zellulärer Seneszenz; relevant für Alterungsdynamik.</li>
              <li><strong>Epigenetische Uhr (DNAm)</strong> — Schätzung biologischen Alters; sensitiv für Lifestyle-Änderungen.</li>
            </ul>
          </div>
          <div className="p-6 rounded-3xl bg-[var(--card)] border border-slate-200 ring-1 ring-[var(--ring)]/50">
            <h3 className="font-semibold">Entzündung & Immun</h3>
            <ul className="mt-3 space-y-2">
              <li><strong>hs-CRP, IL-6, TNF-α</strong> — systemische Entzündung; relevant für Regeneration & Alterung.</li>
              <li><strong>Leukozyten-Subsets/Seneszenzmarker</strong> — funktionelle Immunlage.</li>
            </ul>
          </div>
          <div className="p-6 rounded-3xl bg-[var(--card)] border border-slate-200 ring-1 ring-[var(--ring)]/50">
            <h3 className="font-semibold">Oxidativer Stress</h3>
            <ul className="mt-3 space-y-2">
              <li><strong>8-OHdG, F2-Isoprostane</strong> — oxidative Schäden; Balance aus Belastung/Adaptation.</li>
              <li><strong>GSH/GSSG</strong> — antioxidative Kapazität.</li>
            </ul>
          </div>
          <div className="p-6 rounded-3xl bg-[var(--card)] border border-slate-200 ring-1 ring-[var(--ring)]/50">
            <h3 className="font-semibold">Kognition & Gehirn</h3>
            <ul className="mt-3 space-y-2">
              <li><strong>Kognitive Tests</strong> — Aufmerksamkeit, Exekutivfunktionen; optional digital.</li>
              <li><strong>CBF/Perfusion (optional)</strong> — bildgebende Marker je nach Verfügbarkeit.</li>
            </ul>
          </div>
          <div className="p-6 rounded-3xl bg-[var(--card)] border border-slate-200 ring-1 ring-[var(--ring)]/50">
            <h3 className="font-semibold">Performance & Erholung</h3>
            <ul className="mt-3 space-y-2">
              <li><strong>VO₂max, VO₂AT</strong> — aerobe Kapazität; Leistungsfähigkeit.</li>
              <li><strong>HRV, Schlafstadien</strong> — autonome Balance & Schlafqualität (Wearables).</li>
            </ul>
          </div>
          <div className="p-6 rounded-3xl bg-[var(--card)] border border-slate-200 ring-1 ring-[var(--ring)]/50">
            <h3 className="font-semibold">Haut & Gefäße</h3>
            <ul className="mt-3 space-y-2">
              <li><strong>Kollagen-Dichte (High-Res-Ultraschall)</strong> — Gewebsstruktur & Elastizität.</li>
              <li><strong>Mikrozirkulation (Laser-Doppler)</strong> — lokale Durchblutung/Angiogenese.</li>
            </ul>
          </div>
          <div className="p-6 rounded-3xl bg-[var(--card)] border border-slate-200 ring-1 ring-[var(--ring)]/50">
            <h3 className="font-semibold">Metabolisch</h3>
            <ul className="mt-3 space-y-2">
              <li><strong>Nüchterninsulin, HOMA-IR, HbA1c</strong> — Glukosestoffwechsel & Insulinsensitivität.</li>
              <li><strong>Lipidprofil (ApoB, LDL-P)</strong> — kardiometabolisches Risiko.</li>
            </ul>
          </div>
          <div className="p-6 rounded-3xl bg-[var(--card)] border border-slate-200 ring-1 ring-[var(--ring)]/50">
            <h3 className="font-semibold">Mikrobiom</h3>
            <ul className="mt-3 space-y-2">
              <li><strong>Stuhl-Sequenzierung (16S/Shotgun)</strong> — Diversität & funktionelle Pfade.</li>
              <li><strong>Entzündungsmarker im Stuhl</strong> — z. B. Calprotectin.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Preis & Angebot */}
      <section id="preise" className="max-w-7xl mx-auto px-4 py-16 border-t border-slate-200">
        <h2 className="display text-3xl font-bold">Preis & Reservierung</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl border border-slate-200">
            <p className="text-sm text-slate-500">Programm</p>
            <h3 className="text-2xl font-bold">Rejuvenation 90</h3>
            <p className="mt-3 text-4xl font-bold">4.999 €</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex gap-2 items-start"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--brand)]" /> 90 Sitzungen in 3 Monaten </li>
              <li className="flex gap-2 items-start"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--brand)]" /> 24 /7 Zugang zum Studio </li>
              <li className="flex gap-2 items-start"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--brand)]" /> Persönliches Coaching </li>
              <li className="flex gap-2 items-start"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--brand)]" /> Biomarker-Messungen vor & nach </li>
            </ul>
            <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-sm">
              <p className="font-medium">EARLY-BIRD: −500 €</p>
              <p className="text-emerald-700">Bei unverbindlicher Reservierung über das Formular.</p>
            </div>
            <Link href="#kontakt" className="mt-6 inline-block px-4 py-2.5 rounded-xl btn-brand">Jetzt reservieren</Link>
          </div>

          {/* Alternative Protokolle (moved & expanded) */}
          <div className="p-6 rounded-3xl border border-slate-200 md:col-span-2">
            <h4 className="font-semibold">Alternative Protokolle</h4>
            <p className="mt-2 text-sm text-slate-700">Auf Anfrage passen wir Dauer, Frequenz und Schwerpunkte an. Preisgestaltung nach Umfang und Zielbild.</p>
            <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-slate-500">Beispiel</p>
                <p className="font-medium">Neuro-Kognition (8–12 Wochen)</p>
                <p className="mt-1">Fokus auf CBF & kognitive Domänen; optional kognitive Aufgaben in-Chamber.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-slate-500">Beispiel</p>
                <p className="font-medium">Performance / Metabolisch (6–8 Wochen)</p>
                <p className="mt-1">Trainingseinbindung, Monitoring von VO₂, Laktat & HRV.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-slate-500">Beispiel</p>
                <p className="font-medium">Recovery & Schlaf (4–8 Wochen)</p>
                <p className="mt-1">Schlafhygiene-Coaching, Wearable-Tracking, Erholungsziele.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-slate-500">Auf Anfrage</p>
                <p className="font-medium">Individualisiert</p>
                <p className="mt-1">Protokoll nach Zielbild und Eignung; interdisziplinäre Abstimmung.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kapazität */}
      <section id="kapazitaet" className="max-w-7xl mx-auto px-4 py-16 border-t border-slate-200">
        <div className="p-6 rounded-3xl border border-slate-200 bg-slate-50">
          <h2 className="display text-2xl font-bold">Begrenzte Plätze: Premium-Betreuung</h2>
          <p className="mt-2 text-slate-700">
            Wir nehmen pro Quartal maximal <strong>10 Kund:innen</strong> auf, um exklusive Betreuung, flexible Terminfenster und
            höchste Qualitätsstandards zu gewährleisten.
          </p>
        </div>
      </section>

      {/* Kontakt / Reservierung */}
      <section id="kontakt" className="max-w-3xl mx-auto px-4 py-16 border-t border-slate-200">
        <h2 className="display text-3xl font-bold">Unverbindlich reservieren</h2>
        <p className="mt-3 text-slate-600">Eröffnung in 2026. Sichern Sie sich jetzt unverbindlich den Early-Bird-Vorteil. Wir melden uns zur Eignungsklärung und Terminplanung.</p>
        <form onSubmit={onSubmit} className="mt-8 grid gap-4">
          {/* Allgemeine Fehlermeldung (oben) */}
          {submitMsg?.type === "err" && (
            <div className="p-3 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-sm">
              {submitMsg.text}
            </div>
          )}

          {/* Honeypot (unsichtbar für Menschen) */}
          <div className="hidden" aria-hidden="true">
            <label>
              Firma
              <input name="company" autoComplete="off" tabIndex={-1} />
            </label>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <label className="grid gap-1 text-sm">
              <span>Vor- und Nachname *</span>
              <input
                name="name"
                required
                placeholder="Max Mustermann"
                aria-invalid={!!errors.name}
                className={`border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 ${errors.name ? "border-rose-300 focus:ring-rose-200" : "border-slate-300 focus:ring-slate-300"}`}
              />
              {errors.name && <p className="text-rose-600 text-xs">{errors.name}</p>}
            </label>
            <label className="grid gap-1 text-sm">
              <span>E-Mail *</span>
              <input
                name="email"
                type="email"
                required
                placeholder="max@example.com"
                aria-invalid={!!errors.email}
                className={`border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 ${errors.email ? "border-rose-300 focus:ring-rose-200" : "border-slate-300 focus:ring-slate-300"}`}
              />
              {errors.email && <p className="text-rose-600 text-xs">{errors.email}</p>}
            </label>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <label className="grid gap-1 text-sm">
              <span>Telefon</span>
              <input
                name="phone"
                type="tel"
                aria-invalid={!!errors.phone}
                className={`border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 ${errors.phone ? "border-rose-300 focus:ring-rose-200" : "border-slate-300 focus:ring-slate-300"}`}
              />
              {errors.phone && <p className="text-rose-600 text-xs">{errors.phone}</p>}
            </label>
            <label className="grid gap-1 text-sm">
              <span>Wunschtermin (Startwoche)</span>
              <input
                name="startWeek"
                type="week"
                min="2026-W01"
                aria-invalid={!!errors.startWeek}
                className={`border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 ${errors.startWeek ? "border-rose-300 focus:ring-rose-200" : "border-slate-300 focus:ring-slate-300"}`}
              />
              {errors.startWeek && <p className="text-rose-600 text-xs">{errors.startWeek}</p>}
            </label>
          </div>

          <label className="grid gap-1 text-sm">
            <span>Ihre Ziele / Hinweise</span>
            <textarea
              name="message"
              rows={4}
              aria-invalid={!!errors.message}
              className={`border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 ${errors.message ? "border-rose-300 focus:ring-rose-200" : "border-slate-300 focus:ring-slate-300"}`}
              placeholder="Z. B. Kognition, Performance, Haut, Schlaf …"
            />
            {errors.message && <p className="text-rose-600 text-xs">{errors.message}</p>}
          </label>

          <div className="flex items-center gap-3 text-sm">
            <input id="agbs" name="consent" type="checkbox" className="h-4 w-4" required aria-invalid={!!errors.consent} />
            <label htmlFor="agbs">
              Ich akzeptiere die <Link href="/agb" className="underline">AGB</Link> & <Link href="/datenschutz" className="underline">Datenschutz</Link>.
            </label>
          </div>
          {errors.consent && <p className="text-rose-600 text-xs">{errors.consent}</p>}

          <button type="submit" disabled={submitting} className="mt-2 w-full md:w-auto px-5 py-3 rounded-2xl btn-brand">
            {submitting ? "Sende …" : "Reservierung absenden"}
          </button>

          {submitMsg?.type === "ok" && (
            <p className="text-sm mt-2 text-emerald-700">{submitMsg.text}</p>
          )}
          <p className="text-xs text-slate-500">
            Mit dem Absenden stimmen Sie der Kontaktaufnahme per E-Mail/Telefon zu.
          </p>
        </form>

        {/* Debug/Diagnostics (acts like lightweight test cases) */}
        <details className="mt-8 text-xs text-slate-500">
          <summary className="cursor-pointer">Diagnose: Spline-Integration & UI-Tests</summary>
          <ul className="mt-3 space-y-1">
            <li>Online: <strong className={diag.online ? "text-emerald-600" : "text-rose-600"}>{String(diag.online)}</strong></li>
            <li>Script vorhanden: <strong className={diag.script ? "text-emerald-600" : "text-rose-600"}>{String(diag.script)}</strong></li>
            <li>Custom Element definiert: <strong className={diag.defined ? "text-emerald-600" : "text-rose-600"}>{String(diag.defined)}</strong></li>
          </ul>
          <div className="mt-3">
            <p className="mb-1">Testfälle:</p>
            <ul className="space-y-1">
              {diag.tests.map((t, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className={`inline-flex items-center justify-center w-16 text-[10px] px-1 py-0.5 rounded ${t.pass ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                    {t.pass ? "PASS" : "FAIL"}
                  </span>
                  <span>{t.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-2">
            Hinweis: Bei  &quot;FAIL &quot; bitte im Hero auf „Erneut versuchen“ klicken (lädt Script mit Cache-Buster) oder Seite neu laden.
          </p>
        </details>
      </section>
    </main>
  );
}
