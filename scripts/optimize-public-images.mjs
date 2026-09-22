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

/** Carpetas por jornada (debe coincidir con `dir` en congress-gallery.ts). */
const GALLERY_DAY_DIRS = ["dia-uno", "dia-dos", "dia-tres", "pam-dia-tres"];

const GALLERY_MANIFEST_BY_DIR = {
  "dia-uno": "CONGRESS_GALLERY_DAY1_FILES",
  "dia-dos": "CONGRESS_GALLERY_DAY2_FILES",
  "dia-tres": "CONGRESS_GALLERY_DAY3_FILES",
  "pam-dia-tres": "CONGRESS_GALLERY_PAM_DAY3_FILES",
};

const GALLERY_PREVIEW = {
  subdir: "preview",
  maxWidth: 960,
  quality: 74,
};

const GALLERY_DISPLAY = {
  subdir: "display",
  maxWidth: 1440,
  quality: 76,
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

async function listGalleryDayWebps(dayDir) {
  const dayPath = path.join(GALLERY.dir, dayDir);
  try {
    const entries = await fs.readdir(dayPath, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && /\.webp$/i.test(e.name))
      .map((e) => e.name)
      .sort();
  } catch {
    return [];
  }
}

async function optimizeGalleryDay(dayDir) {
  const dayPath = path.join(GALLERY.dir, dayDir);
  let names;
  try {
    names = (await fs.readdir(dayPath)).filter((n) => /\.jpe?g$/i.test(n));
  } catch {
    return [];
  }

  const webpNames = [];
  let totalIn = 0;
  let totalOut = 0;

  for (const name of names.sort()) {
    const input = path.join(dayPath, name);
    const webpName = name.replace(/\.jpe?g$/i, ".webp");
    const output = path.join(dayPath, webpName);
    const { inBytes, outBytes } = await toWebp(input, output, {
      maxWidth: GALLERY.maxWidth,
      quality: GALLERY.quality,
    });
    totalIn += inBytes;
    totalOut += outBytes;
    webpNames.push(webpName);
    await fs.unlink(input);
    console.log(
      `  galeria/${dayDir}/${webpName}  ${(outBytes / 1024).toFixed(0)} KB`,
    );
  }

  if (webpNames.length > 0) {
    console.log(
      `\n${dayDir}: ${names.length} fotos → WebP (${(totalIn / 1e6).toFixed(1)} MB → ${(totalOut / 1e6).toFixed(1)} MB)\n`,
    );
  }

  return webpNames;
}

async function syncGalleryManifestFromDisk() {
  for (const dayDir of GALLERY_DAY_DIRS) {
    const constName = GALLERY_MANIFEST_BY_DIR[dayDir];
    const webps = await listGalleryDayWebps(dayDir);
    if (webps.length === 0) {
      continue;
    }
    await writeGalleryManifest(constName, webps);
    console.log(
      `Manifiesto ${constName}: ${webps.length} archivos (${dayDir})\n`,
    );
  }
}

async function buildGalleryDerivativesForDay(dayDir, { subdir, maxWidth, quality }, label) {
  const dayPath = path.join(GALLERY.dir, dayDir);
  const outDir = path.join(dayPath, subdir);
  await fs.mkdir(outDir, { recursive: true });

  const webps = await listGalleryDayWebps(dayDir);
  if (webps.length === 0) {
    return;
  }

  let totalOut = 0;
  for (const name of webps) {
    const input = path.join(dayPath, name);
    const output = path.join(outDir, name);
    const { outBytes } = await toWebp(input, output, {
      maxWidth,
      quality,
    });
    totalOut += outBytes;
    console.log(
      `  galeria/${dayDir}/${subdir}/${name}  ${(outBytes / 1024).toFixed(0)} KB`,
    );
  }
  console.log(
    `\n${label} (${dayDir}): ${webps.length} fotos (${(totalOut / 1e6).toFixed(1)} MB total)\n`,
  );
}

async function buildGalleryDerivatives({ subdir, maxWidth, quality }, label) {
  for (const dayDir of GALLERY_DAY_DIRS) {
    await buildGalleryDerivativesForDay(
      dayDir,
      { subdir, maxWidth, quality },
      label,
    );
  }
}

async function writeGalleryManifest(constName, webpNames) {
  const tsPath = path.join(ROOT, "src/data/congress-gallery.ts");
  let src = await fs.readFile(tsPath, "utf8");
  const list = webpNames.map((n) => `  "${n}",`).join("\n");
  const re = new RegExp(
    `const ${constName} = \\[[\\s\\S]*?\\] as const;`,
  );
  if (!re.test(src)) {
    console.warn(`Aviso: no se encontró ${constName} en congress-gallery.ts`);
    return;
  }
  src = src.replace(re, `const ${constName} = [\n${list}\n] as const;`);
  await fs.writeFile(tsPath, src);
}

async function optimizeWebinarFlyers() {
  const dir = path.join(ROOT, "public/images/webinars");
  let names;
  try {
    names = (await fs.readdir(dir)).filter((n) => /\.jpe?g$/i.test(n));
  } catch {
    return;
  }

  for (const name of names.sort()) {
    const input = path.join(dir, name);
    const webpName = name.replace(/\.jpe?g$/i, ".webp");
    const output = path.join(dir, webpName);
    const { outBytes } = await toWebp(input, output, {
      maxWidth: 1280,
      quality: 78,
    });
    await fs.unlink(input);
    console.log(`  webinars/${webpName}  ${(outBytes / 1024).toFixed(0)} KB`);
  }
  if (names.length > 0) {
    console.log(`\nWebinars: ${names.length} flyers → WebP\n`);
  }
}

async function optimizeVertical() {
  for (const rel of VERTICAL.files) {
    const input = path.join(ROOT, rel);
    try {
      await fs.access(input);
    } catch {
      continue;
    }
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
  for (const dayDir of GALLERY_DAY_DIRS) {
    await optimizeGalleryDay(dayDir);
  }
  await syncGalleryManifestFromDisk();
  await buildGalleryDerivatives(GALLERY_PREVIEW, "Previews");
  await buildGalleryDerivatives(GALLERY_DISPLAY, "Display (lightbox)");
  await optimizeWebinarFlyers();
  await optimizeVertical();
  console.log(
    "Listo. Commit public/images/** y src/data/congress-gallery.ts",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
