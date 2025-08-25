// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import Script from "next/script"; // ← NEU: für JSON-LD

export const metadata: Metadata = {
  // ← WICHTIG: echte Domain setzen
  metadataBase: new URL("https://www.hbot-berlin.de"),

  title: {
    default: "HBOT Studio Berlin",
    template: "%s | HBOT Studio Berlin"
  },
  description:
    "HBOT Studio Berlin – Rejuvenation 90: 90 Sitzungen in 3 Monaten, 24/7 Zugang, Coaching & Biomarker.",

  applicationName: "HBOT Studio Berlin",
  authors: [{ name: "HBOT Studio Berlin" }],
  creator: "HBOT Studio Berlin",
  publisher: "HBOT Studio Berlin",
  keywords: [
    "HBOT Berlin",
    "Hyperbare Sauerstofftherapie",
    "Sauerstofftherapie",
    "Longevity",
    "Regeneration",
    "Charlottenburg"
  ],

  alternates: {
    canonical: "/"
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1
    }
  },

  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://deine-domain.tld/", // ← anpassen
    siteName: "HBOT Studio Berlin",
    title: "HBOT Studio Berlin – Rejuvenation 90",
    description:
      "HBOT Studio Berlin – Rejuvenation 90: 90 Sitzungen in 3 Monaten, 24/7 Zugang, Coaching & Biomarker.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "HBOT Studio Berlin" }]
  },

  twitter: {
    card: "summary_large_image",
    title: "HBOT Studio Berlin – Rejuvenation 90",
    description:
      "HBOT Studio Berlin – Rejuvenation 90: 90 Sitzungen in 3 Monaten, 24/7 Zugang, Coaching & Biomarker.",
    images: ["/og.jpg"]
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" }
    ],
    apple: [{ url: "/icon-180.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/logo.svg", color: "#0b1220" }]
  },

  manifest: "/site.webmanifest",
  themeColor: "#ffffff",
  category: "health"
};

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap"
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${plusJakarta.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-white text-slate-900">
        {/* JSON-LD siteweit */}
        <Script
          id="org-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HealthAndBeautyBusiness", // alternativ "MedicalClinic"
              "@id": "https://deine-domain.tld/#org", // ← anpassen
              url: "https://deine-domain.tld/", // ← anpassen
              name: "HBOT Studio Berlin",
              description:
                "Hyperbare Sauerstofftherapie (HBOT) in Berlin-Charlottenburg. Rejuvenation 90: 60 Sitzungen in 90 Tagen. Premium-Betreuung, flexible Zeiten & Biomarker.",
              logo: "https://deine-domain.tld/logo.svg", // ← anpassen
              image: "https://deine-domain.tld/og.jpg", // ← anpassen
              address: {
                "@type": "PostalAddress",
                streetAddress: "Kaiserdamm XXX", // ← anpassen
                postalCode: "14057",
                addressLocality: "Berlin",
                addressCountry: "DE"
              },
              areaServed: "Berlin",
              openingHours: "Mo-So 00:00-23:59",
              telephone: "+49 30 1234567", // ← anpassen/entfernen
              priceRange: "€€€",
              sameAs: [
                // optionale Profile:
                // "https://www.instagram.com/deinprofil",
                // "https://www.linkedin.com/company/deinprofil"
              ]
            })
          }}
        />

        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
