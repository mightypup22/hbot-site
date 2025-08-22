// app/hbot/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Was ist HBOT? – Hyperbare Sauerstofftherapie | HBOT Studio Berlin",
  description:
    "Kurz erklärt: Wie HBOT (Hyperbare Sauerstofftherapie) funktioniert, mögliche Wirkmechanismen, Sicherheit & Ablauf im HBOT Studio Berlin – inkl. FAQ.",
  alternates: { canonical: "/hbot" },
  openGraph: {
    title: "Was ist HBOT? – Hyperbare Sauerstofftherapie",
    description:
      "Wie HBOT funktioniert, mögliche Wirkmechanismen, Sicherheit & Ablauf – inkl. FAQ.",
    url: "/hbot",
    type: "article",
  },
};

export default function HBOTInfoPage() {
  // Für strukturierte Daten eine (optionale) Basis-URL aus ENV lesen
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "http://localhost:3000";

  const jsonLdWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Was ist HBOT? – Hyperbare Sauerstofftherapie",
    description:
      "Wie HBOT funktioniert, mögliche Wirkmechanismen, Sicherheit & Ablauf im HBOT Studio Berlin.",
    url: `${base}/hbot`,
  } as const;

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Start",
        item: `${base}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "HBOT",
        item: `${base}/hbot`,
      },
    ],
  } as const;

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Was ist HBOT?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "HBOT steht für Hyperbare Sauerstofftherapie. Dabei atmen Sie 100 % Sauerstoff unter erhöhtem Umgebungsdruck in einer Druckkammer. So löst sich mehr Sauerstoff im Blutplasma und erreicht das Gewebe effizienter.",
        },
      },
      {
        "@type": "Question",
        name: "Wie läuft eine Sitzung ab?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Nach einem kurzen Check nehmen Sie in der Kammer Platz. Der Druck wird langsam erhöht, Sie atmen über eine Maske 100 % O2. Eine Sitzung dauert in der Regel 60–90 Minuten, anschließend wird der Druck kontrolliert abgesenkt.",
        },
      },
      {
        "@type": "Question",
        name: "Ist HBOT sicher?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "HBOT folgt standardisierten Sicherheitsprotokollen. Ein Eignungscheck ist erforderlich. Kontraindikationen werden berücksichtigt. Druckausgleich der Ohren ist während der Kompression wichtig.",
        },
      },
      {
        "@type": "Question",
        name: "Was sind mögliche Effekte?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Verbesserte Sauerstoffversorgung, mögliche Unterstützung der Mikrozirkulation, Geweberegeneration und Anpassungsprozesse. Die Evidenz ist anwendungs- und protokollabhängig.",
        },
      },
      {
        "@type": "Question",
        name: "Wie viele Sitzungen sind üblich?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Das variiert je Zielbild und Protokoll. Unser Programm „Rejuvenation 90“ sieht 60 Sitzungen in 90 Tagen vor. Alternative Protokolle sind nach Absprache möglich.",
        },
      },
      {
        "@type": "Question",
        name: "Brauche ich eine ärztliche Verordnung?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Für unsere Studio-Protokolle ist in der Regel keine ärztliche Verordnung nötig. Individuelle Eignung und Sicherheitshinweise werden im Intake geprüft.",
        },
      },
    ],
  } as const;

  return (
    <main className="min-h-screen bg-white text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      {/* Headerbereich */}
      <section className="max-w-7xl mx-auto px-4 pt-10 pb-6">
        <nav className="text-sm text-slate-500">
          <Link href="/" className="hover:underline">Start</Link>
          <span className="mx-2">/</span>
          <span>HBOT</span>
        </nav>
        <h1 className="display mt-3 text-4xl md:text-5xl font-bold tracking-tight">
          HBOT – was ist&nbsp;hyperbare Sauerstofftherapie?
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600 leading-relaxed">
          Kurz erklärt: HBOT erhöht die Sauerstoffmenge, die Ihr Blut transportieren kann –
          durch das Atmen von 100&nbsp;% O<sub>2</sub> unter erhöhtem Umgebungsdruck.
          Dadurch kann Gewebe vorübergehend mit mehr gelöstem Sauerstoff versorgt werden.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/#programm" className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50">
            Programm ansehen
          </Link>
          <Link href="/#kontakt" className="px-4 py-2.5 rounded-xl btn-brand">
            Unverbindlich reservieren
          </Link>
        </div>
      </section>

      {/* Wie es funktioniert */}
      <section className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="display text-3xl font-bold">Wie HBOT funktioniert</h2>
          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            {[
              {
                title: "Druckkammer",
                text:
                  "In einer geschlossenen Kammer wird der Umgebungsdruck kontrolliert erhöht (Kompression).",
                icon: (
                  <path d="M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z" />
                ),
              },
              {
                title: "100 % Sauerstoff",
                text:
                  "Sie atmen reinen Sauerstoff über Maske/Haube. Der Partialdruck von O₂ steigt.",
                icon: (
                  <path d="M12 2v20M5 12h14M7 7l10 10M17 7L7 17" />
                ),
              },
              {
                title: "Mehr O₂ im Plasma",
                text:
                  "Nach Henry-Gesetz löst sich bei höherem Druck mehr O₂ im Blutplasma – unabhängig von Hämoglobin.",
                icon: (
                  <path d="M4 12a8 8 0 1 0 16 0A8 8 0 0 0 4 12zm8-5v10m5-5H7" />
                ),
              },
              {
                title: "Kontrollierte Dekompression",
                text:
                  "Der Druck wird langsam abgesenkt. Ohren-Druckausgleich erfolgt aktiv während der Kompression.",
                icon: (
                  <path d="M3 12h18M6 16l-3-4 3-4M18 8l3 4-3 4" />
                ),
              },
            ].map((c, i) => (
              <article
                key={i}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200"
              >
                <div className="h-9 w-9 rounded-lg bg-[var(--brand)] text-white grid place-items-center mb-3">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    {c.icon}
                  </svg>
                </div>
                <h3 className="font-semibold">{c.title}</h3>
                <p className="mt-1 text-slate-700">{c.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Hinweis: Darstellung vereinfacht. Protokolle und Effekte sind kontext- und zielabhängig.
          </p>
        </div>
      </section>

      {/* Mögliche Wirkmechanismen */}
      <section className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="display text-3xl font-bold">Mögliche Wirkmechanismen</h2>
          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            {[
              {
                title: "Sauerstoffdiffusion & Mikrozirkulation",
                text: "Höhere O₂-Gradienten können die Gewebeversorgung temporär unterstützen.",
              },
              {
                title: "Gefäß-/Gewebsremodelling",
                text: "Daten deuten auf angiogene und matrixbezogene Anpassungsprozesse hin.",
              },
              {
                title: "Mitochondriale Funktion",
                text: "Protokollabhängige Hinweise auf metabolische Effekte und Leistungsmarker.",
              },
              {
                title: "Entzündungsmodulation",
                text: "Kontextabhängige Veränderungen im Zytokinprofil wurden berichtet.",
              },
              {
                title: "Neuroplastizität",
                text: "In Studien Hinweise auf kognitive Domänen & Perfusionsparameter.",
              },
              {
                title: "Haut/Kollagen",
                text: "Biopsie-Daten zeigen veränderte Kollagendichte und Mikrozirkulation.",
              },
            ].map((c, i) => (
              <article key={i} className="p-5 rounded-2xl bg-[var(--card)] border border-slate-200 ring-1 ring-[var(--ring)]/50">
                <h3 className="font-semibold">{c.title}</h3>
                <p className="mt-1 text-slate-700">{c.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">
            * Evidenzlage ist teils vorläufig/heterogen. Siehe{" "}
            <Link href="/#evidenz" className="underline">Publikationen</Link>.
          </p>
        </div>
      </section>

      {/* Sicherheit & Eignung */}
      <section className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="display text-3xl font-bold">Sicherheit & Eignung</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-4 text-sm">
            <article className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-semibold">Eignungscheck</h3>
              <p className="mt-1 text-slate-700">
                Vor Programmstart prüfen wir Eignung & Sicherheitskriterien und besprechen individuelle Ziele.
              </p>
            </article>
            <article className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-semibold">Druckausgleich & Verhalten</h3>
              <p className="mt-1 text-slate-700">
                Während der Kompression aktiv Druckausgleich durchführen; Material-/Sicherheitsregeln befolgen.
              </p>
            </article>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Kein Heilversprechen, keine ärztliche Beratung. Bei Fragen zur persönlichen Eignung bitte ärztlich beraten lassen.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="display text-3xl font-bold">FAQ zu HBOT</h2>
          <div className="mt-6 space-y-3">
            {[
              {
                q: "Wie lange dauert eine HBOT-Sitzung?",
                a: "Typisch 60–90 Minuten inklusive Kompression und Dekompression. Exakte Dauer richtet sich nach dem Protokoll.",
              },
              {
                q: "Wie viele Sitzungen brauche ich?",
                a: "Das ist ziel- und protokollabhängig. Unser Rejuvenation-Programm umfasst 60 Sitzungen in 90 Tagen.",
              },
              {
                q: "Merke ich etwas während der Sitzung?",
                a: "Häufig spürt man nur den Druckausgleich an den Ohren. Ansonsten ist die Sitzung ruhig – lesen/entspannen ist möglich.",
              },
              {
                q: "Welche Kleidung/Utensilien sind erlaubt?",
                a: "Wir geben klare Material-/Sicherheitsvorgaben (z. B. keine entzündlichen Produkte). Sie erhalten dazu eine Checkliste.",
              },
              {
                q: "Gibt es Nebenwirkungen?",
                a: "Gelegentlich können z. B. Druckgefühl an den Ohren auftreten. Wir arbeiten mit standardisierten Sicherheitsabläufen.",
              },
              {
                q: "Brauche ich eine Überweisung?",
                a: "Für unsere Studio-Protokolle meist nicht. Bei medizinischen Fragen bitte ärztlich beraten lassen.",
              },
            ].map((item, i) => (
              <details key={i} className="group rounded-2xl border border-slate-200 p-4 bg-white">
                <summary className="cursor-pointer font-medium flex items-center justify-between">
                  {item.q}
                  <span className="ml-3 inline-grid place-items-center h-6 w-6 rounded-full bg-slate-100 border border-slate-200 text-slate-600">
                    +
                  </span>
                </summary>
                <p className="mt-2 text-sm text-slate-700">{item.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#kontakt" className="px-4 py-2.5 rounded-xl btn-brand">
              Beratung & Reservierung
            </Link>
            <Link href="/#evidenz" className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50">
              Evidenz ansehen
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
