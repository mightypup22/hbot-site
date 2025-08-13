"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="w-full border-b border-slate-200 sticky top-0 bg-white/80 backdrop-blur z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-[var(--brand)] text-white grid place-items-center font-bold">
            H
          </div>
          <div>
            <p className="text-lg font-semibold leading-tight">HBOT Praxis Charlottenburg</p>
            <p className="text-xs text-slate-500 -mt-1">
              Hyperbare Sauerstofftherapie – Premium-Programme
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/#programm" className="navlink hover:text-slate-700">
            Programm
          </Link>
          <Link href="/#philosophie" className="navlink hover:text-slate-700">
            Philosophie
          </Link>
          <Link href="/#evidenz" className="navlink hover:text-slate-700">
            Evidenz
          </Link>
          <Link href="/#preise" className="navlink hover:text-slate-700">
            Preis
          </Link>
          <Link href="/#kontakt" className="px-3 py-1.5 rounded-xl btn-brand">
            Reservieren
          </Link>
        </nav>

        {/* Mobile Burger */}
        <button
          aria-label="Menü öffnen"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center h-9 w-10 rounded-xl border border-slate-300"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" className="text-slate-700">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile Panel – zentriert */}
      <div className={`md:hidden border-t border-slate-200 bg-white ${open ? "block" : "hidden"} min-h-[60vh]`}>
        <nav className="px-4 py-6 text-sm w-full h-full grid place-items-center">
          <div className="flex flex-col items-center gap-4">
            <Link href="/#programm" onClick={() => setOpen(false)} className="py-2">
              Programm
            </Link>
            <Link href="/#philosophie" onClick={() => setOpen(false)} className="py-2">
              Philosophie
            </Link>
            <Link href="/#evidenz" onClick={() => setOpen(false)} className="py-2">
              Evidenz
            </Link>
            <Link href="/#preise" onClick={() => setOpen(false)} className="py-2">
              Preis
            </Link>
            <Link href="/#kontakt" onClick={() => setOpen(false)} className="py-2 px-3 rounded-xl btn-brand w-fit">
              Reservieren
            </Link>
            <hr className="w-24 border-slate-200 my-2" />
            <Link href="/impressum" onClick={() => setOpen(false)} className="py-2">
              Impressum
            </Link>
            <Link href="/datenschutz" onClick={() => setOpen(false)} className="py-2">
              Datenschutz
            </Link>
            <Link href="/agb" onClick={() => setOpen(false)} className="py-2">
              AGB
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
