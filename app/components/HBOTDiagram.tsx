// app/components/HBOTDiagram.tsx
// Responsive HBOT-Illustration im Markenstil
// Größe anpassen: ändere die max-width auf dem <figure> (siehe Kommentar unten)

export default function HBOTDiagram({ className = "" }: { className?: string }) {
  return (
    <figure
      className={`mx-auto w-full ${className}`}
      // 👇 Stellschraube: maximale Breite der Illustration
      // Beispiel: "max-w-4xl" oder "max-w-6xl"
      style={{ maxWidth: "72rem" }} // ~ max-w-6xl
      aria-labelledby="hbot-diagram-caption"
    >
      <svg
        viewBox="0 0 900 420"
        role="img"
        aria-describedby="hbot-diagram-caption"
        className="w-full h-auto block"
      >
        <defs>
          {/* Farbverläufe im Markenstil */}
          <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(200,169,110,0.12)" />
            <stop offset="100%" stopColor="rgba(15,23,42,0.06)" />
          </linearGradient>
          <linearGradient id="oxyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(200,169,110,0.38)" />
            <stop offset="100%" stopColor="rgba(200,169,110,0.08)" />
          </linearGradient>
          <linearGradient id="plasmaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(15,23,42,0.15)" />
            <stop offset="100%" stopColor="rgba(15,23,42,0.02)" />
          </linearGradient>
          {/* Pfeilspitzen */}
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--brand, #0b1220)" />
          </marker>
          {/* dezente Schimmerfläche für Druck */}
          <radialGradient id="pressGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(11,18,32,0.10)" />
            <stop offset="100%" stopColor="rgba(11,18,32,0.00)" />
          </radialGradient>
        </defs>

        {/* Hintergrund */}
        <rect x="0" y="0" width="900" height="420" fill="url(#bgGrad)" />

        {/* Schritt-Bubble (1–4) */}
        {[
          { x: 120, y: 60, n: "1" },
          { x: 300, y: 60, n: "2" },
          { x: 600, y: 60, n: "3" },
          { x: 790, y: 60, n: "4" },
        ].map((b, i) => (
          <g key={i}>
            <circle cx={b.x} cy={b.y} r="16" fill="var(--brand, #0b1220)" opacity="0.08" />
            <circle cx={b.x} cy={b.y} r="14" fill="white" stroke="var(--brand, #0b1220)" strokeWidth="1.5" />
            <text x={b.x} y={b.y + 4} textAnchor="middle" fontSize="12" fill="var(--brand, #0b1220)" fontWeight="700">
              {b.n}
            </text>
          </g>
        ))}

        {/* Labels oben */}
        <g fontSize="12" fill="#334155">
          <text x="120" y="92" textAnchor="middle">Druckkammer</text>
          <text x="300" y="92" textAnchor="middle">100% O₂</text>
          <text x="600" y="92" textAnchor="middle">Mehr O₂ im Plasma</text>
          <text x="790" y="92" textAnchor="middle">Dekompression</text>
        </g>

        {/* Links: Zuströmung / Pfeile */}
        <g opacity="0.9">
          <line x1="70" y1="200" x2="220" y2="200" stroke="var(--brand, #0b1220)" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="70" y1="235" x2="220" y2="235" stroke="var(--brand, #0b1220)" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="70" y1="165" x2="220" y2="165" stroke="var(--brand, #0b1220)" strokeWidth="2" markerEnd="url(#arrow)" />
        </g>

        {/* Kammer (Kapsel) */}
        <g>
          {/* Glow/„Druck“ */}
          <ellipse cx="470" cy="230" rx="260" ry="120" fill="url(#pressGlow)" />
          {/* Kapsel */}
          <rect
            x="260" y="130" width="420" height="200" rx="56"
            fill="white" stroke="var(--brand, #0b1220)" strokeWidth="1.5"
          />
          {/* Fenster */}
          <rect x="300" y="160" width="260" height="140" rx="20" fill="url(#plasmaGrad)" stroke="#e2e8f0" strokeWidth="1" />

          {/* Sauerstoff-„Wolke“ */}
          <rect x="300" y="160" width="260" height="140" rx="20" fill="url(#oxyGrad)" />

          {/* Sitzende Silhouette (minimalistisch) */}
          <g transform="translate(420, 210)" fill="none" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.9">
            <circle cx="0" cy="-25" r="10" fill="none" />
            <path d="M 0 -15 L 0 25" />
            <path d="M -18 5 L 18 5" />
            <path d="M 0 25 L 14 40" />
            <path d="M 0 25 L -14 40" />
          </g>

          {/* Maske + O2-Schlauch */}
          <g transform="translate(420, 185)" stroke="#0f172a" strokeWidth="1.6" fill="none" strokeLinecap="round">
            <path d="M 8 0 c 6 6 16 10 36 14" />
            <rect x="-4" y="-6" width="10" height="12" rx="4" fill="white" />
          </g>
        </g>

        {/* Animierte O2-Moleküle (kleine Kreise), „strömen“ von links in die Kammer */}
        {Array.from({ length: 18 }).map((_, i) => {
          const startX = 60 + (i % 3) * 20;
          const startY = 150 + (i * 12) % 180;
          const midX = 290 + (i % 5) * 15;
          const endX = 520 + (i % 7) * 20;
          const endY = 190 + ((i * 9) % 120);

          return (
            <g key={i} opacity="0.85">
              <circle r="3" fill="var(--accent, #c8a96e)">
                <animateMotion
                  dur={`${8 + (i % 5)}s`}
                  repeatCount="indefinite"
                  path={`M ${startX},${startY} C 160,${startY} ${midX},${endY} ${endX},${endY}`}
                />
                <animate
                  attributeName="opacity"
                  values="0.2;0.9;0.2"
                  dur={`${6 + (i % 4)}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}

        {/* Dekompressions-Pfeile (rechts nach außen) */}
        <g opacity="0.7">
          <line x1="700" y1="170" x2="830" y2="170" stroke="var(--brand, #0b1220)" strokeWidth="1.8" markerEnd="url(#arrow)" />
          <line x1="700" y1="210" x2="830" y2="210" stroke="var(--brand, #0b1220)" strokeWidth="1.8" markerEnd="url(#arrow)" />
          <line x1="700" y1="250" x2="830" y2="250" stroke="var(--brand, #0b1220)" strokeWidth="1.8" markerEnd="url(#arrow)" />
        </g>

        {/* Legende unten */}
        <g fontSize="12" fill="#475569">
          <text x="100" y="350">1  Druckaufbau (Kompression)</text>
          <text x="280" y="350">2  Atmen von 100% O₂</text>
          <text x="560" y="350">3  Mehr gelöster O₂ im Plasma</text>
          <text x="770" y="350">4  Langsame Dekompression</text>
        </g>

        {/* Rahmen */}
        <rect x="0.5" y="0.5" width="899" height="419" rx="16" ry="16" fill="none" stroke="#e5e7eb" />
      </svg>

      <figcaption id="hbot-diagram-caption" className="sr-only">
        Schematische Darstellung: Zuströmung von Sauerstoff in eine Druckkammer, atmen von 100 % O₂,
        erhöhter Sauerstoff im Plasma und kontrollierte Dekompression.
      </figcaption>
    </figure>
  );
}
