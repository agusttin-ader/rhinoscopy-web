/**
 * Pre-comprime imágenes pesadas en /public para servir estáticas
 * (Next `images.unoptimized` → sin Image Optimization de Vercel).
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.join(import.meta.dirname, "..");

const GALLERY = {
  dir: path.join(ROOT, "public/images/galeria"),
  maxWidth: 1920,
  quality: 82,
};

const VERTICAL = {
  files: [
    "public/images/pantallas-vertical-1.jpg",
    "public/images/pantalla-vertical-2.jpg",
    "public/images/pantalla-vertical-3.jpg",
  ],
  maxHeight: 1600,
  quality: 82,
};

async function toWebp(
  inputPath,
  outputPath,
  { maxWidth, maxHeight, quality = 82 },
) {
  let pipeline = sharp(inputPath).rotate();
  if (maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  } else if (maxHeight) {
    pipeline = pipeline.resize({ height: maxHeight, withoutEnlargement: true });
  }
  await pipeline.webp({ quality, effort: 4 }).toFile(outputPath);
  const [inStat, outStat] = await Promise.all([
    fs.stat(inputPath),
    fs.stat(outputPath),
  ]);
  return { inBytes: inStat.size, outBytes: outStat.size };
}

async function optimizeGallery() {
  const names = (await fs.readdir(GALLERY.dir)).filter((n) =>
    /\.jpe?g$/i.test(n),
  );
  let totalIn = 0;
  let totalOut = 0;
  const webpNames = [];

  for (const name of names.sort()) {
    const input = path.join(GALLERY.dir, name);
    const webpName = name.replace(/\.jpe?g$/i, ".webp");
    const output = path.join(GALLERY.dir, webpName);
    const { inBytes, outBytes } = await toWebp(input, output, {
      maxWidth: GALLERY.maxWidth,
      quality: GALLERY.quality,
    });
    totalIn += inBytes;
    totalOut += outBytes;
    webpNames.push(webpName);
    await fs.unlink(input);
    console.log(`  galeria/${webpName}  ${(outBytes / 1024).toFixed(0)} KB`);
  }

  await writeGalleryManifest(webpNames);
  console.log(
    `\nGalería: ${names.length} fotos → WebP (${(totalIn / 1e6).toFixed(1)} MB → ${(totalOut / 1e6).toFixed(1)} MB)\n`,
  );
}

async function writeGalleryManifest(webpNames) {
  const tsPath = path.join(ROOT, "src/data/congress-gallery.ts");
  let src = await fs.readFile(tsPath, "utf8");
  const list = webpNames.map((n) => `  "${n}",`).join("\n");
  src = src.replace(
    /const CONGRESS_GALLERY_DAY1_FILES = \[[\s\S]*?\] as const;/,
    `const CONGRESS_GALLERY_DAY1_FILES = [\n${list}\n] as const;`,
  );
  await fs.writeFile(tsPath, src);
}

async function optimizeVertical() {
  for (const rel of VERTICAL.files) {
    const input = path.join(ROOT, rel);
    const output = input.replace(/\.jpe?g$/i, ".webp");
    const { outBytes } = await toWebp(input, output, {
      maxHeight: VERTICAL.maxHeight,
      quality: VERTICAL.quality,
    });
    await fs.unlink(input);
    console.log(`  ${path.basename(output)}  ${(outBytes / 1024).toFixed(0)} KB`);
  }
}

async function main() {
  console.log("Optimizando imágenes públicas…\n");
  await optimizeGallery();
  await optimizeVertical();
  console.log("Listo. Commit public/images/*.webp y src/data/congress-gallery.ts");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
