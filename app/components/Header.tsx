// app/components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
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
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      {/* Feste Header-Höhe – Header bleibt flach */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo + Wortmarke */}
        <Link
          href="/"
          // ⬇️ HIER ABSTAND LOGO↔WORTMARKE ANPASSEN: nutze z.B. gap-1, gap-2, gap-3 ...
          className="flex items-center gap-3"
        >
          {/* LOGO-Größe: Container steuert die sichtbare Größe, Header bleibt h-16 */}
          {/*   -> h-10/w-10 (kleiner), h-12/w-12 (größer), h-14/w-14 (noch größer) */}
          <div className="relative h-12 w-12 md:h-12 md:w-12">
            <Image
              src="/logo.svg"
              alt="HBOT Studio Berlin Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          <span
            className="whitespace-nowrap leading-none text-lg md:text-xl font-semibold tracking-tight"
            style={{ fontFamily: "Playfair Display, Georgia, serif" }}
          >
            HBOT Studio Berlin
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/#programm" className="navlink hover:text-slate-700">Programm</Link>
          <Link href="/#philosophie" className="navlink hover:text-slate-700">Philosophie</Link>
          <Link href="/#was-ist-hbot" className="navlink hover:text-slate-700">HBOT</Link>
          <Link href="/#evidenz" className="navlink hover:text-slate-700">Evidenz</Link>
          <Link href="/#biomarker" className="navlink hover:text-slate-700">Biomarker</Link>
          <Link href="/#preise" className="navlink hover:text-slate-700">Preis</Link>
          <Link href="/#kontakt" className="px-3 py-1.5 rounded-xl btn-brand">Reservieren</Link>
        </nav>

        {/* Mobile Burger */}
        <button
          aria-label="Menü öffnen"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
          className="md:hidden inline-flex items-center justify-center h-9 w-10 rounded-xl border border-slate-300"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" className="text-slate-700">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile Panel – zentriert */}
      <div className={`md:hidden border-t border-slate-200 bg-white ${open ? "block" : "hidden"} min-h-[40vh]`}>
        <nav className="px-4 py-6 text-sm w-full h-full grid place-items-center">
          <div className="flex flex-col items-center gap-4">
            <Link href="/#programm" onClick={() => setOpen(false)} className="py-2">Programm</Link>
            <Link href="/#philosophie" onClick={() => setOpen(false)} className="py-2">Philosophie</Link>
            <Link href="/#was-ist-hbot" onClick={() => setOpen(false)} className="py-2">HBOT</Link>
            <Link href="/#evidenz" onClick={() => setOpen(false)} className="py-2">Evidenz</Link>
            <Link href="/#biomarker" onClick={() => setOpen(false)} className="py-2">Biomarker</Link>
            <Link href="/#preise" onClick={() => setOpen(false)} className="py-2">Preis</Link>
            <Link href="/#kontakt" onClick={() => setOpen(false)} className="py-2 px-3 rounded-xl btn-brand w-fit">Reservieren</Link>
            {/*<hr className="w-24 border-slate-200 my-2" />
            <Link href="/impressum" onClick={() => setOpen(false)} className="py-2">Impressum</Link>
            <Link href="/datenschutz" onClick={() => setOpen(false)} className="py-2">Datenschutz</Link>
            <Link href="/agb" onClick={() => setOpen(false)} className="py-2">AGB</Link>*/}
          </div>
        </nav>
      </div>
    </header>
  );
}
