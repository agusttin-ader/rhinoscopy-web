/**
 * Agrega 200 constancias idénticas a franco-ader-agustin.pdf (mismo bytes).
 * No borra los PDF que ya estén en la carpeta.
 *
 *   node scripts/generate-meet-constancia-bulk-franco.mjs
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  certificateFileSlug,
  generateMeetConstancia,
} from "./generate-meet-constancia.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(
  ROOT,
  "public/images/constancias/rhinoscopy-meet-2026",
);

const FULL_NAME = "Agustin Franco Ader";
const COUNT = 200;
const START_INDEX = 100_001;

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const baseSlug = certificateFileSlug(FULL_NAME);
  const masterName = `${baseSlug}.pdf`;
  const masterPath = path.join(OUT_DIR, masterName);

  let bytes;
  if (existsSync(masterPath)) {
    bytes = readFileSync(masterPath);
    console.log(`Reutilizando ${masterName} (${(bytes.length / 1024).toFixed(1)} KB)`);
  } else {
    console.log(`Generando ${masterName} (${FULL_NAME})…`);
    bytes = await generateMeetConstancia(FULL_NAME, { light: true });
    writeFileSync(masterPath, bytes);
    console.log(`  → ${masterName} (${(bytes.length / 1024).toFixed(1)} KB)`);
  }

  for (let i = 0; i < COUNT; i++) {
    const suffix = String(START_INDEX + i);
    const fileName = `${baseSlug}-${suffix}.pdf`;
    writeFileSync(path.join(OUT_DIR, fileName), bytes);
  }

  const diskMb = ((bytes.length * COUNT) / (1024 * 1024)).toFixed(2);
  console.log(
    `\nListo: ${COUNT} copias más (${baseSlug}-*.pdf), mismo contenido que ${masterName}.`,
  );
  console.log(`  · ~${diskMb} MB adicionales en disco (1 blob en git si son idénticos)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
