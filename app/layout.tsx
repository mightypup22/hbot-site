import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";

export const metadata: Metadata = {
  title: "HBOT Studio Berlin",
  description:
    "HBOT Studio Berlin – Rejuvenation 90: 90 Sitzungen in 3 Monaten, 24/7 Zugang, Coaching & Biomarker.",
};

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${plusJakarta.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-white text-slate-900">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
