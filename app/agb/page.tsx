import Link from "next/link";

export const metadata = {
  title: "AGB – HBOT Praxis Charlottenburg",
  description:
    "Allgemeine Geschäftsbedingungen der HBOT Praxis Charlottenburg GmbH für das Rejuvenation 90 Programm und alternative Protokolle.",
};

export default function AGBPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <nav className="text-sm text-slate-500">
          <Link href="/" className="hover:underline">Start</Link>
          <span className="mx-2">/</span>
          <span>AGB</span>
        </nav>


        <h1 className="mt-4 text-4xl font-bold tracking-tight">
          Allgemeine Geschäftsbedingungen (AGB)
        </h1>

        <p className="mt-3 text-sm text-slate-500">
          Diese AGB regeln die vertraglichen Beziehungen zwischen der HBOT Praxis Charlottenburg GmbH (nachfolgend „Anbieter“) und
          ihren Kund:innen (nachfolgend „Kunde“). Sie gelten für das Programm <strong>„Rejuvenation 90“</strong> sowie für
          alternative, individuell vereinbarte Protokolle.
        </p>

        {/* 1 Geltungsbereich */}
        <section className="mt-8 space-y-2 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-semibold">1. Geltungsbereich</h2>
          <p>
            Diese AGB gelten für alle Verträge zwischen Anbieter und Kunde in Bezug auf hyperbare Sauerstofftherapie-Leistungen
            (HBOT) in unseren Praxisräumen in Berlin-Charlottenburg. Abweichende Bedingungen des Kunden werden nicht anerkannt,
            es sei denn, der Anbieter stimmt ihrer Geltung ausdrücklich schriftlich zu.
          </p>
        </section>

        {/* 2 Vertragspartner */}
        <section className="mt-8 space-y-2 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-semibold">2. Vertragspartner & Kontakt</h2>
          <p>
            HBOT Praxis Charlottenburg GmbH, Kaiserdamm 100, 14057 Berlin · Tel.: 030 1234567 · E-Mail: hallo@hbot-berlin.de
          </p>
        </section>

        {/* 3 Leistungen */}
        <section className="mt-8 space-y-2 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-semibold">3. Leistungen</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Rejuvenation 90</strong>: 90 HBOT-Sitzungen innerhalb von ca. 12–13 Wochen (Planung 6–7 Sitzungen/Woche),
              Zugang <strong>24/7</strong> via Buchungssystem, persönliches Coaching, Biomarker-Messungen vor/nach dem Programm.
            </li>
            <li>
              <strong>Alternative Protokolle</strong>: Zuschnitt nach Zielsetzung (z. B. Neuro-Kognition, Performance/Metabolik,
              Recovery & Schlaf, individualisiert). Umfang, Dauer und Preis werden gesondert vereinbart.
            </li>
            <li>
              Der Anbieter erbringt <strong>keine ärztliche Behandlung</strong> und gibt <strong>kein Heilversprechen</strong>.
              Teilnahme setzt eine <strong>gesundheitliche Eignung</strong> und Sicherheitsunterweisung voraus.
            </li>
          </ul>
        </section>

        {/* 4 Vertragsschluss */}
        <section className="mt-8 space-y-2 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-semibold">4. Vertragsschluss</h2>
          <p>
            Die Reservierung über das Kontaktformular ist <strong>unverbindlich</strong> und stellt noch kein Angebot zum Vertragsschluss dar.
            Der Vertrag kommt erst durch <strong>Bestätigung</strong> des Anbieters (per E-Mail/Telefon) zustande. Der Anbieter behält
            sich vor, Anfragen ohne Angabe von Gründen abzulehnen (z. B. bei fehlender Eignung oder Kapazität).
          </p>
        </section>

        {/* 5 Preise & Early Bird */}
        <section className="mt-8 space-y-2 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-semibold">5. Preise, Nachlässe & Zahlungsbedingungen</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Rejuvenation 90: <strong>4.999 €</strong> (inkl. gesetzl. USt., sofern anwendbar).</li>
            <li>
              <strong>Early-Bird-Nachlass</strong>: −500 € bei rechtzeitiger, unverbindlicher Reservierung gemäß Angebotsangabe;
              die konkreten Bedingungen werden in der Bestätigung mitgeteilt.
            </li>
            <li>
              Zahlungsmodalitäten (z. B. Vorauszahlung/Raten) werden in der Bestätigung vereinbart. Etwaige Gebühren (z. B. Transaktionskosten)
              werden transparent ausgewiesen.
            </li>
          </ul>
        </section>

        {/* 6 Durchführung & Kapazität */}
        <section className="mt-8 space-y-2 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-semibold">6. Durchführung, Zugang & Kapazität</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Zugang zu den Sitzungen <strong>rund um die Uhr (24/7)</strong> nach Verfügbarkeit über das Buchungssystem.</li>
            <li>
              Zur Wahrung der Betreuungsqualität nimmt der Anbieter pro Quartal <strong>maximal 8 Kund:innen</strong> auf.
            </li>
            <li>
              Der Kunde verpflichtet sich, Sicherheitsanweisungen und Praxisregeln einzuhalten. Bei Verstößen kann der Anbieter die
              Leistung aus Sicherheitsgründen verweigern.
            </li>
          </ul>
        </section>

        {/* 7 Termine / Umbuchung / Storno */}
        <section className="mt-8 space-y-2 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-semibold">7. Termine, Umbuchung & Stornierung</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Umbuchungen sind bis <strong>48 Stunden</strong> vor dem Termin kostenfrei möglich (über das Buchungssystem oder per Kontakt).
            </li>
            <li>
              Bei späteren Umbuchungen, Nichterscheinen oder verspätetem Erscheinen kann die Sitzung verfallen; ein Anspruch auf
              Ersatzleistung besteht nicht.
            </li>
            <li>
              Stornierungen des gesamten Programms richten sich nach den in der Bestätigung genannten Bedingungen (je nach Starttermin
              und bereits erbrachten Leistungen).
            </li>
          </ul>
        </section>

        {/* 8 Mitwirkung & Eignung */}
        <section className="mt-8 space-y-2 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-semibold">8. Mitwirkungspflichten & gesundheitliche Eignung</h2>
          <p>
            Der Kunde versichert, alle relevanten Angaben zur gesundheitlichen Eignung wahrheitsgemäß zu machen und Änderungen
            unverzüglich mitzuteilen. Der Anbieter kann die Teilnahme von einer ärztlichen Unbedenklichkeitsbescheinigung abhängig
            machen und Kontraindikationen zugrunde legen.
          </p>
        </section>

        {/* 9 Haftung */}
        <section className="mt-8 space-y-2 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-semibold">9. Haftung</h2>
          <p>
            Der Anbieter haftet für Vorsatz und grobe Fahrlässigkeit. Bei einfacher Fahrlässigkeit haftet der Anbieter nur bei
            Verletzung wesentlicher Vertragspflichten (Kardinalpflichten) und begrenzt auf den vertragstypischen, vorhersehbaren
            Schaden. Gesetzliche Haftungstatbestände (insbesondere für Schäden aus der Verletzung des Lebens, des Körpers oder der
            Gesundheit) bleiben unberührt.
          </p>
        </section>

        {/* 10 Widerruf Verbraucher */}
        <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-semibold">10. Widerrufsrecht für Verbraucher:innen</h2>
          <p>
            Bei außerhalb von Geschäftsräumen geschlossenen Verträgen und Fernabsatzverträgen steht Verbraucher:innen grundsätzlich
            ein Widerrufsrecht von <strong>14 Tagen</strong> zu. Mit ausdrücklicher Zustimmung des Kunden und Bestätigung der Kenntnis
            vom Verlust des Widerrufsrechts bei vollständiger Vertragserfüllung kann der Anbieter vor Ablauf der Frist mit der
            Leistung beginnen.
          </p>
          <details className="rounded-xl border border-slate-200 p-4 bg-slate-50">
            <summary className="cursor-pointer font-medium">Muster-Widerrufsformular anzeigen</summary>
            <div className="mt-3 space-y-2">
              <p>(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie dieses Formular aus und senden Sie es zurück.)</p>
              <p>
                An: HBOT Praxis Charlottenburg GmbH, Kaiserdamm 100, 14057 Berlin, E-Mail: widerruf@hbot-berlin.de
              </p>
              <p>
                Hiermit widerrufe(n) ich/wir den von mir/uns abgeschlossenen Vertrag über die Erbringung der folgenden Leistung:
                __________________________________
              </p>
              <p>
                Bestellt am/erhalten am: __.__.____ · Name des/der Verbraucher(s): ______________________ · Anschrift:
                ______________________ · Datum/Unterschrift (nur bei Mitteilung auf Papier).
              </p>
            </div>
          </details>
        </section>

        {/* 11 Datenschutz Verweis */}
        <section className="mt-8 space-y-2 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-semibold">11. Datenschutz</h2>
          <p>
            Es gilt unsere <a href="/datenschutz" className="underline">Datenschutzerklärung</a>.
          </p>
        </section>

        {/* 12 Geistiges Eigentum */}
        <section className="mt-8 space-y-2 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-semibold">12. Geistiges Eigentum</h2>
          <p>
            Inhalte der Website, Marken, Texte und Designs sind urheber- bzw. kennzeichenrechtlich geschützt. Jede Nutzung außerhalb
            gesetzlicher Schranken bedarf der vorherigen Zustimmung des Anbieters.
          </p>
        </section>

        {/* 13 Schlussbestimmungen */}
        <section className="mt-8 space-y-2 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-semibold">13. Schlussbestimmungen</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts.</li>
            <li>Gerichtsstand ist – soweit zulässig – Berlin.</li>
            <li>Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen unberührt.</li>
          </ul>
          <p className="text-xs text-slate-500">Stand: {new Date().toLocaleDateString("de-DE")}</p>
        </section>

        {/* ODR Hinweis */}
        <section className="mt-8 space-y-2 text-xs leading-relaxed text-slate-500">
          <p>
            Die EU-Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:{" "}
            <a className="underline" target="_blank" rel="noreferrer" href="https://ec.europa.eu/consumers/odr">
              https://ec.europa.eu/consumers/odr
            </a>.
            Wir sind nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
          <p>Hinweis: Diese AGB sind Mustertexte und ersetzen keine Rechtsberatung.</p>
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="inline-block px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50">
            Zur Startseite
          </Link>
          <Link href="/impressum" className="inline-block px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50">
            Impressum
          </Link>
          <Link href="/datenschutz" className="inline-block px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50">
            Datenschutz
          </Link>
        </div>
      </div>
    </main>
  );
}
