import Link from "next/link";

export const metadata = {
  title: "Datenschutzerklärung – HBOT Praxis Charlottenburg",
  description:
    "Datenschutzhinweise der HBOT Praxis Charlottenburg GmbH gemäß DSGVO: Verantwortlicher, Zwecke, Rechtsgrundlagen, Empfänger, Speicherdauer, Betroffenenrechte.",
};

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <nav className="text-sm text-slate-500">
          <Link href="/" className="hover:underline">Start</Link>
          <span className="mx-2">/</span>
          <span>Datenschutzerklärung</span>
        </nav>

        <h1 className="mt-4 text-4xl font-bold tracking-tight">
          Datenschutzerkl&auml;rung
        </h1>

        {/* Verantwortlicher */}
        <section className="mt-8 space-y-2 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-semibold">1. Verantwortlicher</h2>
          <p>HBOT Praxis Charlottenburg GmbH</p>
          <p>Kaiserdamm 100, 14057 Berlin</p>
          <p>
            E-Mail: datenschutz@hbot-berlin.de · Telefon: 030&nbsp;1234567 · Web: www.hbot-berlin.de
          </p>
        </section>

        {/* Zwecke und Rechtsgrundlagen */}
        <section className="mt-8 space-y-2 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-semibold">2. Zwecke und Rechtsgrundlagen der Verarbeitung</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Webseitenbetrieb</strong> (Bereitstellung von Inhalten, Sicherheit, Reichweitenmessung in Server-Logs) – Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).</li>
            <li><strong>Kontakt &amp; Reservierung</strong> (Bearbeitung von Anfragen über das Formular, Terminabstimmung) – Art. 6 Abs. 1 lit. b DSGVO (Vertrag/Anbahnung); ggf. Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).</li>
            <li><strong>Kommunikation</strong> (E-Mail/Telefon-Rückfragen) – Art. 6 Abs. 1 lit. b, f DSGVO.</li>
            <li><strong>IT-Sicherheit</strong> (Log- und Fehlerdaten) – Art. 6 Abs. 1 lit. f DSGVO.</li>
          </ul>
        </section>

        {/* Kategorien personenbezogener Daten */}
        <section className="mt-8 space-y-2 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-semibold">3. Kategorien personenbezogener Daten</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Stammdaten (Name), Kontaktdaten (E-Mail, Telefon).</li>
            <li>Terminwunsch (Startwoche ab 2026), Inhaltsangaben aus dem Freitextfeld.</li>
            <li>Technische Nutzungsdaten (IP-Adresse, Zeitstempel, User-Agent, Referrer) in Server-Logs.</li>
          </ul>
        </section>

        {/* Pflicht zur Bereitstellung */}
        <section className="mt-8 space-y-2 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-semibold">4. Pflicht zur Bereitstellung</h2>
          <p>
            Die Angabe von Kontakt- und Basisdaten im Formular ist erforderlich, um Ihre Anfrage zu bearbeiten. Ohne diese Angaben kann eine Bearbeitung nicht erfolgen.
          </p>
        </section>

        {/* Server-Logfiles */}
        <section className="mt-8 space-y-2 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-semibold">5. Server-Logfiles</h2>
          <p>
            Beim Aufruf unserer Seiten verarbeitet der Server automatisch Protokolldaten (IP-Adresse, Datum/Uhrzeit, abgerufene
            Ressource, Referrer, User-Agent). Die Verarbeitung erfolgt zur Sicherstellung von Stabilität und Sicherheit und wird
            regelm&auml;&szlig;ig nach spätestens 30 Tagen gelöscht bzw. anonymisiert, sofern keine weitere Aufbewahrung zu Beweiszwecken
            notwendig ist.
          </p>
        </section>

        {/* Kontaktformular */}
        <section className="mt-8 space-y-2 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-semibold">6. Kontakt- und Reservierungsformular</h2>
          <p>
            Die &uuml;ber das Formular &uuml;bermittelten Daten (Name, E-Mail, Telefon, Startwoche, Nachricht) werden ausschlie&szlig;lich zur
            Bearbeitung Ihrer Anfrage und ggf. zur Terminvereinbarung genutzt. Die Daten werden gelöscht, sobald der Zweck entf&auml;llt
            und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
          </p>
        </section>

        {/* Cookies / Tracking */}
        <section className="mt-8 space-y-2 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-semibold">7. Cookies, Tracking und Einbindungen</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Cookies/Tracking:</strong> Wir setzen derzeit keine Tracking- oder Marketing-Cookies ein.</li>
            <li>
              <strong>Externe Inhalte (Spline-Viewer)</strong>: Zur Darstellung der 3D-Szene laden wir die Bibliothek 
              <code> @splinetool/viewer </code> von <em>unpkg.com</em>. Hierbei werden technisch notwendige Anfragen an Server des Anbieters
              &uuml;bermittelt (z. B. IP-Adresse, User-Agent). Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an ansprechender
              Darstellung). Falls Sie dies nicht wünschen, können Sie JavaScript im Browser deaktivieren (die Seite zeigt dann eine vereinfachte
              Fallback-Grafik).
            </li>
          </ul>
        </section>

        {/* Empfänger, Auftragsverarbeitung, Drittland */}
        <section className="mt-8 space-y-2 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-semibold">8. Empf&auml;nger, Auftragsverarbeiter, Drittlandtransfer</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Empf&auml;nger</strong>: IT- und Hosting-Dienstleister, die wir mit Wartung/Betrieb beauftragen (Auftragsverarbeitung gem. Art. 28 DSGVO).</li>
            <li><strong>Drittlandtransfer</strong>: Bei der Nutzung externer Inhalte (z. B. unpkg.com) kann ein Transfer in Drittl&auml;nder stattfinden. Wir w&auml;hlen Anbieter mit angemessenem Datenschutzniveau und geeigneten Garantien aus.</li>
          </ul>
        </section>

        {/* Speicherdauer */}
        <section className="mt-8 space-y-2 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-semibold">9. Speicherdauer</h2>
          <p>
            Wir speichern personenbezogene Daten nur so lange, wie es f&uuml;r die genannten Zwecke erforderlich ist oder gesetzliche
            Aufbewahrungspflichten bestehen. Danach werden die Daten gel&ouml;scht oder anonymisiert.
          </p>
        </section>

        {/* Rechte der Betroffenen */}
        <section className="mt-8 space-y-2 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-semibold">10. Ihre Rechte</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Auskunft</strong> (Art. 15 DSGVO) &ndash; ob und welche Daten wir verarbeiten.</li>
            <li><strong>Berichtigung</strong> (Art. 16 DSGVO) &ndash; unrichtige Daten korrigieren.</li>
            <li><strong>L&ouml;schung</strong> (Art. 17 DSGVO) &ndash; Daten l&ouml;schen lassen, sofern kein Grund zur Aufbewahrung besteht.</li>
            <li><strong>Einschr&auml;nkung</strong> (Art. 18 DSGVO) &ndash; Verarbeitung einschr&auml;nken lassen.</li>
            <li><strong>Daten&uuml;bertragbarkeit</strong> (Art. 20 DSGVO) &ndash; Herausgabe in strukturiertem, g&auml;ngigem Format.</li>
            <li><strong>Widerspruch</strong> (Art. 21 DSGVO) &ndash; gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.</li>
            <li><strong>Widerruf</strong> (Art. 7 Abs. 3 DSGVO) &ndash; erteilte Einwilligungen mit Wirkung f&uuml;r die Zukunft widerrufen.</li>
          </ul>
          <p>
            Bitte wenden Sie sich zur Wahrnehmung Ihrer Rechte an: <a href="mailto:datenschutz@hbot-berlin.de" className="underline">datenschutz@hbot-berlin.de</a>.
          </p>
        </section>

        {/* Aufsichtsbehörde */}
        <section className="mt-8 space-y-2 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-semibold">11. Beschwerderecht</h2>
          <p>
            Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbeh&ouml;rde zu beschweren. Zust&auml;ndig ist in der Regel die Beh&ouml;rde Ihres Wohnsitzes
            oder die f&uuml;r uns zust&auml;ndige Beh&ouml;rde:
          </p>
          <p>
            Berliner Beauftragte f&uuml;r Datenschutz und Informationsfreiheit<br />
            Alt-Moabit 59-61, 10555 Berlin<br />
            Web: <a className="underline" href="https://www.datenschutz-berlin.de" target="_blank" rel="noreferrer">www.datenschutz-berlin.de</a>
          </p>
        </section>

        {/* Sicherheit */}
        <section className="mt-8 space-y-2 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-semibold">12. Datensicherheit</h2>
          <p>
            Wir treffen angemessene technische und organisatorische Ma&szlig;nahmen (z. B. TLS-Verschl&uuml;sselung, Zugriffsbeschr&auml;nkungen, Updates),
            um Ihre Daten vor Verlust, Missbrauch und unbefugtem Zugriff zu sch&uuml;tzen.
          </p>
        </section>

        {/* Änderungen */}
        <section className="mt-8 space-y-2 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-semibold">13. Aktualisierungen dieser Erkl&auml;rung</h2>
          <p>
            Wir k&ouml;nnen diese Datenschutzerkl&auml;rung anpassen, um &Auml;nderungen der Rechtslage oder unseres Angebots zu ber&uuml;cksichtigen.
            Die jeweils aktuelle Fassung ist hier abrufbar.
          </p>
          <p className="text-xs text-slate-500">Stand: {new Date().toLocaleDateString("de-DE")}</p>
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="inline-block px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50">
            Zur Startseite
          </Link>
          <Link href="/impressum" className="inline-block px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50">
            Impressum
          </Link>
          <Link href="/agb" className="inline-block px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50">
            AGB
          </Link>
        </div>
      </div>
    </main>
  );
}
