import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-semibold">Kontakt</h3>
          <p className="mt-3 text-sm text-slate-600">
            HBOT Praxis Charlottenburg<br />
            (genaue Adresse folgt)<br />
            Berlin-Charlottenburg<br />
            Tel: 030&nbsp;1234567<br />
            E-Mail: hallo@hbot-berlin.de
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Links</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:underline">
                Start
              </Link>
            </li>
            <li>
              <Link href="/impressum" className="hover:underline">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/datenschutz" className="hover:underline">
                Datenschutz
              </Link>
            </li>
            <li>
              <Link href="/agb" className="hover:underline">
                AGB
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Hinweis</h3>
          <p className="mt-3 text-xs text-slate-600">
            Diese Inhalte ersetzen keine medizinische Beratung. Kein Heilversprechen. Ergebnisse variieren.
          </p>
        </div>
      </div>
      <div className="border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} HBOT Praxis Charlottenburg. Alle Rechte vorbehalten.
      </div>
    </footer>
  );
}
