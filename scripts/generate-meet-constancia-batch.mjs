/**
 * Genera el set de constancias de ejemplo (nombres distintos, búsqueda por apellido).
 *
 *   node scripts/generate-meet-constancia-batch.mjs
 */

import { mkdirSync, readdirSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { generateMeetConstancia } from "./generate-meet-constancia.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(
  ROOT,
  "public/images/constancias/rhinoscopy-meet-2026",
);

/** fullName = texto en el PDF; fileSlug = nombre del archivo sin .pdf */
const CERTIFICATES = [
  {
    fullName: "Maria Belen Domeg Lizardo",
    fileSlug: "domeg-lizardo-maria-belen",
  },
  { fullName: "Sebastian Lopez", fileSlug: "lopez-sebastian" },
  { fullName: "Nicolas Lopez", fileSlug: "lopez-nicolas" },
  { fullName: "Juliana Lopez", fileSlug: "lopez-juliana" },
  { fullName: "Ramiro Lopez", fileSlug: "lopez-ramiro" },
  { fullName: "Carlos Lopez Moris", fileSlug: "lopez-moris-carlos" },
  { fullName: "Guido Hocsman", fileSlug: "hocsman-guido" },
];

function removeLegacyPdfs() {
  let removed = 0;
  for (const file of readdirSync(OUT_DIR)) {
    if (!file.toLowerCase().endsWith(".pdf")) continue;
    unlinkSync(path.join(OUT_DIR, file));
    removed++;
  }
  return removed;
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const removed = removeLegacyPdfs();
  if (removed > 0) {
    console.log(`Eliminados ${removed} PDF anteriores.`);
  }

  const cache = new Map();
  for (const { fullName, fileSlug } of CERTIFICATES) {
    if (!cache.has(fullName)) {
      console.log(`Generando PDF: ${fullName}`);
      cache.set(
        fullName,
        await generateMeetConstancia(fullName, { light: true }),
      );
    }
    const bytes = cache.get(fullName);
    const fileName = `${fileSlug}.pdf`;
    writeFileSync(path.join(OUT_DIR, fileName), bytes);
    console.log(`  → ${fileName} (${(bytes.length / 1024).toFixed(1)} KB)`);
  }

  console.log(`\nListo: ${CERTIFICATES.length} constancias en ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
