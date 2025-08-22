// scripts/gen-icons.mjs
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
import pngToIco from "png-to-ico";

const src = path.resolve("public", "logo.svg");
const out = path.resolve("public");

const sizes = [16, 32, 48, 64, 180, 192, 256, 384, 512];

async function main() {
  // Sicherstellen, dass logo.svg existiert
  await fs.access(src);

  // PNGs rendern (weißer Hintergrund, falls SVG transparent ist)
  for (const size of sizes) {
    const buf = await sharp(src, { density: size * 4 })
      .resize(size, size, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .png()
      .toBuffer();
    const file = path.join(out, `icon-${size}.png`);
    await fs.writeFile(file, buf);
    console.log("✓", file);
  }

  // favicon.ico aus 16/32/48 bauen
  const ico = await pngToIco([
    path.join(out, "icon-16.png"),
    path.join(out, "icon-32.png"),
    path.join(out, "icon-48.png")
  ]);
  await fs.writeFile(path.join(out, "favicon.ico"), ico);
  console.log("✓ favicon.ico");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
