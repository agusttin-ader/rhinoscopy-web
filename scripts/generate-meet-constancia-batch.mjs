/**
 * Genera ~200 constancias Meet con el mismo titular y matrículas distintas en el nombre del archivo.
 * El PDF es idéntico en todos los casos (liviano, una sola composición) — git deduplica el blob.
 *
 *   node scripts/generate-meet-constancia-batch.mjs
 */

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  generateMeetConstancia,
  slugifyName,
} from "./generate-meet-constancia.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(
  ROOT,
  "public/images/constancias/rhinoscopy-meet-2026",
);

const HOLDER_NAME = "Belén Domé";
const COUNT = 200;
const REAL_MATRICULA = "161053";

/** Matrículas ficticias de 6 dígitos (secuenciales), incluye la real. */
function buildMatriculas(count) {
  const out = [REAL_MATRICULA];
  for (let m = 100_000; out.length < count && m < 1_000_000; m++) {
    const s = String(m);
    if (s === REAL_MATRICULA) continue;
    out.push(s);
  }
  if (out.length < count) {
    throw new Error(`No alcanzan matrículas de 6 dígitos para ${count} constancias`);
  }
  return out.sort((a, b) => Number(a) - Number(b));
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const slug = slugifyName(HOLDER_NAME);
  const matriculas = buildMatriculas(COUNT);

  console.log(`Generando 1 PDF liviano (${HOLDER_NAME})…`);
  const bytes = await generateMeetConstancia(HOLDER_NAME, { light: true });
  const kb = (bytes.length / 1024).toFixed(1);

  let written = 0;
  for (const matricula of matriculas) {
    const fileName = `${slug}-${matricula}.pdf`;
    writeFileSync(path.join(OUT_DIR, fileName), bytes);
    written++;
  }

  const diskMb = ((bytes.length * written) / (1024 * 1024)).toFixed(2);
  console.log(
    `Listo: ${written} archivos en ${OUT_DIR}\n` +
      `  · ${kb} KB c/u (~${diskMb} MB en disco; git guarda 1 blob si son idénticos)\n` +
      `  · Matrícula real incluida: ${REAL_MATRICULA} → ${slug}-${REAL_MATRICULA}.pdf`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
