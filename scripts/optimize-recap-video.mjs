/**
 * Genera `public/videos/resumenrhinoscopy-congreso.mp4` desde el master (alta calidad, web-friendly).
 *
 * Uso:
 *   node scripts/optimize-recap-video.mjs /ruta/al/video-original.mp4
 *   # o dejar el master en public/videos/resumenrhinoscopy-congreso.source.mp4
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public/videos/resumenrhinoscopy-congreso.mp4");
const DEFAULT_SOURCE = path.join(
  ROOT,
  "public/videos/resumenrhinoscopy-congreso.source.mp4",
);

const input = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_SOURCE;

if (!fs.existsSync(input)) {
  console.error(
    "No se encontró el video fuente. Pasá la ruta del archivo (~70 MB) o copiálo a:\n  " +
      DEFAULT_SOURCE,
  );
  process.exit(1);
}

const tmp = path.join(ROOT, "public/videos/.recap-encode-tmp.mp4");
const crf = process.env.RECAP_CRF ?? "20";
console.log(`Codificando (CRF ${crf}, hasta 1080p, faststart)…\n`);
const result = spawnSync(
  "ffmpeg",
  [
    "-y",
    "-i",
    input,
    "-c:v",
    "libx264",
    "-crf",
    crf,
    "-preset",
    "slow",
    "-vf",
    "scale='min(1920,iw)':-2",
    "-c:a",
    "aac",
    "-b:a",
    "160k",
    "-movflags",
    "+faststart",
    tmp,
  ],
  { stdio: "inherit" },
);
if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
fs.renameSync(tmp, OUT);
const mb = (fs.statSync(OUT).size / 1e6).toFixed(1);
console.log(`\nListo: public/videos/resumenrhinoscopy-congreso.mp4 (${mb} MB)`);
console.log("Regenerá el poster: npm run videos:recap-poster");
