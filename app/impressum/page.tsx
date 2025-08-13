export const metadata = {
  title: "Impressum – HBOT Praxis Charlottenburg",
  description:
    "Impressum der HBOT Praxis Charlottenburg GmbH: Anbieterangaben, Kontakt, Registereintrag, USt-IdNr., Haftungshinweise.",
};

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <nav className="text-sm text-slate-500">
          <a href="/" className="hover:underline">Start</a>
          <span className="mx-2">/</span>
          <span>Impressum</span>
        </nav>

        <h1 className="mt-4 text-4xl font-bold tracking-tight">
          Impressum
        </h1>

        <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-700">
          <p><strong>Anbieter</strong></p>
          <p>HBOT Praxis Charlottenburg GmbH</p>
          <p>Kaiserdamm 100<br />14057 Berlin</p>
          <p>Telefon: 030&nbsp;1234567<br />E-Mail: hallo@hbot-berlin.de<br />Web: www.hbot-berlin.de</p>
        </section>

        <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-700">
          <p><strong>Vertretungsberechtigte Geschäftsführer</strong></p>
          <p>Max Beispiel</p>
        </section>

        <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-700">
          <p><strong>Registereintrag</strong></p>
          <p>Amtsgericht Berlin-Charlottenburg, HRB 123456 B</p>
        </section>

        <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-700">
          <p><strong>Umsatzsteuer-Identifikationsnummer</strong></p>
          <p>DE123456789</p>
        </section>

        <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-700">
          <p><strong>Berufshaftpflicht / Verantwortlichkeit</strong></p>
          <p>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV: Max Beispiel, Anschrift wie oben.</p>
        </section>

        <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-700">
          <p><strong>Haftung für Inhalte</strong></p>
          <p>
            Als Diensteanbieter sind wir gemäß §&nbsp;7 Abs.&nbsp;1 TMG für eigene Inhalte auf diesen Seiten nach den
            allgemeinen Gesetzen verantwortlich. Nach §§&nbsp;8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
            verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
            forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
            Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
          </p>
        </section>

        <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-700">
          <p><strong>Haftung für Links</strong></p>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
            Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
            Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
          </p>
        </section>

        <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-700">
          <p><strong>Urheberrecht</strong></p>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
            Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
            Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </section>

        <section className="mt-8 space-y-3 text-xs leading-relaxed text-slate-500">
          <p>Diese Website stellt keine medizinische Beratung dar und enthält kein Heilversprechen.</p>
          <p>Stand: {new Date().toLocaleDateString("de-DE")}</p>
        </section>

        <div className="mt-10">
          <a href="/" className="inline-block px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50">
            Zur Startseite
          </a>
        </div>
      </div>
    </main>
  );
}
