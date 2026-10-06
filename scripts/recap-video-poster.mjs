import { execSync } from "node:child_process";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.join(import.meta.dirname, "..");
const video = path.join(ROOT, "public/videos/resumenrhinoscopy-congreso.mp4");
const poster = path.join(ROOT, "public/images/congress/recap-resumen-2026.webp");
const jpg = path.join(ROOT, "public/videos/.recap-poster-frame.jpg");

execSync(
  [
    "ffmpeg",
    "-y",
    "-ss",
    "00:00:04",
    "-i",
    video,
    "-frames:v",
    "1",
    "-q:v",
    "2",
    "-update",
    "1",
    jpg,
  ].join(" "),
  { stdio: "inherit", shell: true },
);

await sharp(jpg)
  .resize({ width: 1920, withoutEnlargement: true })
  .webp({ quality: 94, effort: 6, smartSubsample: false })
  .toFile(poster);

console.log(`Poster → ${poster}`);
