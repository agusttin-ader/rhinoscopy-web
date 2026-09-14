/**
 * Constancia horizontal Rhinoscopy Meet 2026 — layout editorial limpio.
 *
 *   node scripts/generate-meet-constancia.mjs "María Elena Restrepo" 45821
 */

import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, rgb } from "pdf-lib";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(
  ROOT,
  "public/images/constancias/rhinoscopy-meet-2026",
);
const ART_PATH = path.join(ROOT, "public/images/heromeet-art.png");
const LOGO_SOMBRA = path.join(
  ROOT,
  "public/images/rhinoscopy-logo-hero-sombra.png",
);
const FONT_SCRIPT = path.join(ROOT, "scripts/fonts/MarckScript-Regular.ttf");
const FONT_BOLD = path.join(ROOT, "scripts/fonts/Montserrat-Bold.ttf");
const FONT_MEDIUM = path.join(ROOT, "scripts/fonts/Montserrat-Medium.ttf");

const SPONSOR_FILES = [
  "cassara.webp",
  "caparra.webp",
  "gsk.webp",
  "pam.webp",
  "coa-medical.webp",
  "johnson-johnson.webp",
  "sanofi.webp",
  "ovimed.webp",
  "dona-eustaquia.webp",
];

const NAVY = rgb(38 / 255, 36 / 255, 84 / 255);
const SKY = rgb(95 / 255, 198 / 255, 238 / 255);
const SLATE = rgb(78 / 255, 80 / 255, 132 / 255);
const MUTED = rgb(0.45, 0.47, 0.55);
const LINE = rgb(0.88, 0.89, 0.92);
const WHITE = rgb(1, 1, 1);
const BLACK = rgb(0, 0, 0);

const PAGE_W = 841.89;
const PAGE_H = 595.28;
const TOP_BAR = 84;
const FOOT_BAR = 78;
const HEADER_LOGO_H = 68;
const FOOT_LOGO_H = 36;
const SPONSOR_H = 96;
/** Ancho máx. del PNG completo (cuerpo, junto al lockup MEET). */
const ART_MAX_WIDTH_RATIO = 0.18;
const ART_RASTER_DPI = 3;
const MARGIN_X = 48;

export function slugifyName(fullName) {
  return fullName
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const slugPart = (value) =>
  value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();

/** Slug de archivo: apellidos antes que nombres (ej. Maria Belen Domeg Lizardo → domeg-lizardo-maria-belen). */
export function certificateFileSlug(fullName) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const join = (arr) => arr.map(slugPart).join("-");
  if (parts.length >= 4) {
    const names = parts.slice(0, parts.length - 2);
    const surnames = parts.slice(-2);
    return join([...surnames, ...names]);
  }
  if (parts.length === 3) return join([parts[1], parts[2], parts[0]]);
  if (parts.length === 2) return join([parts[1], parts[0]]);
  return slugifyName(fullName);
}

function cx(page, text, font, size) {
  return (page.getWidth() - font.widthOfTextAtSize(text, size)) / 2;
}

/** Rasteriza el logo a la altura en puntos (×2.5 px) para que no se pixele en el PDF. */
async function embedLogoAtHeight(doc, absolutePath, heightPt) {
  const input = readFileSync(absolutePath);
  const meta = await sharp(input).metadata();
  const pxH = Math.max(40, Math.round(heightPt * 2.5));
  const pxW = Math.round((meta.width / meta.height) * pxH);
  const buf = await sharp(input)
    .resize(pxW, pxH, { kernel: sharp.kernel.lanczos3 })
    .png({ compressionLevel: 9 })
    .toBuffer();
  const image = await doc.embedPng(buf);
  const scale = heightPt / image.height;
  return {
    image,
    width: image.width * scale,
    height: heightPt,
  };
}

/** Quita halos y píxeles sueltos del PNG sobre fondo blanco. */
async function polishMeetArtPng(input) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.from(data);
  const ch = channels;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * ch;
      const a = data[i + 3];
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];
      if (a < 255) {
        const k = a / 255;
        r = Math.round(r * k + 255 * (1 - k));
        g = Math.round(g * k + 255 * (1 - k));
        b = Math.round(b * k + 255 * (1 - k));
      }
      out[i] = r;
      out[i + 1] = g;
      out[i + 2] = b;
      out[i + 3] = 255;
    }
  }

  const lumOut = (i) => out[i] + out[i + 1] + out[i + 2];
  const isPaperOut = (i) =>
    out[i] > 238 && out[i + 1] > 238 && out[i + 2] > 238;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * ch;
      if (lumOut(i) > 640) continue;

      let paperNeighbors = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            paperNeighbors++;
            continue;
          }
          const j = (ny * width + nx) * ch;
          if (isPaperOut(j)) paperNeighbors++;
        }
      }

      if (paperNeighbors >= 6 && lumOut(i) < 220) {
        out[i] = 255;
        out[i + 1] = 255;
        out[i + 2] = 255;
      }
    }
  }

  return sharp(out, { raw: { width, height, channels: ch } })
    .png()
    .toBuffer();
}

/** Arte completo (heromeet-art.png), pulido y sin recortar. */
async function embedArtForDisplay(
  doc,
  absolutePath,
  widthPt,
  heightPt,
  { light = false } = {},
) {
  const rasterDpi = light ? 2 : ART_RASTER_DPI;
  const raw = readFileSync(absolutePath);
  const polished = light ? raw : await polishMeetArtPng(raw);
  const meta = await sharp(polished).metadata();
  const layoutScale = Math.min(
    1,
    widthPt / meta.width,
    heightPt / meta.height,
  );
  const displayW = meta.width * layoutScale;
  const displayH = meta.height * layoutScale;
  const pxW = Math.max(1, Math.round(displayW * rasterDpi));
  const pxH = Math.max(1, Math.round(displayH * rasterDpi));

  let pipeline = sharp(polished).resize(pxW, pxH, {
    fit: "inside",
    kernel: sharp.kernel.lanczos3,
    withoutEnlargement: true,
  });

  let image;
  if (light) {
    const buf = await pipeline
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();
    image = await doc.embedJpg(buf);
  } else {
    const buf = await pipeline
      .sharpen({ sigma: 0.45, m1: 0.6, m2: 0.25 })
      .png({ compressionLevel: 9, effort: 10 })
      .toBuffer();
    image = await doc.embedPng(buf);
  }

  return {
    image,
    width: displayW,
    height: displayH,
  };
}

async function embedRaster(doc, absolutePath, resize) {
  const ext = path.extname(absolutePath).toLowerCase();
  if (resize || ext === ".webp") {
    let pipeline = sharp(readFileSync(absolutePath));
    if (resize) pipeline = pipeline.resize(resize);
    const buf = await pipeline.png({ compressionLevel: 9 }).toBuffer();
    return doc.embedPng(buf);
  }
  const raw = readFileSync(absolutePath);
  if (ext === ".png") return doc.embedPng(raw);
  if (ext === ".jpg" || ext === ".jpeg") return doc.embedJpg(raw);
  const buf = await sharp(raw).png({ compressionLevel: 9 }).toBuffer();
  return doc.embedPng(buf);
}

function drawBar(page, width, { top, h }) {
  const pageH = page.getHeight();
  const y = top ? pageH - h : 0;
  page.drawRectangle({ x: 0, y, width, height: h, color: NAVY });
}

const MEET_TYPO_GAP = 30;
const HEADER_WORDMARK_GAP = 18;
const HEADER_WORDMARK_SIZE = 10.5;

const TYPO_ON_WHITE = {
  rhino: SLATE,
  meet: BLACK,
  year: SKY,
};

function measureMeetTypo(fontBold, fontScript, containerH) {
  const scale = Math.min(1.22, (containerH * 1.12) / 175);
  const rhinoSize = 6.6 * scale;
  const meetSize = 25 * scale;
  const yearSize = 23 * scale;
  const rhinoTrack = 2.2 * scale;
  const meetW = fontBold.widthOfTextAtSize("MEET", meetSize);
  const yearW = fontScript.widthOfTextAtSize("2026", yearSize);
  const rhinoW =
    fontBold.widthOfTextAtSize("RHINOSCOPY", rhinoSize) +
    rhinoTrack * ("RHINOSCOPY".length - 1);
  const width = Math.max(meetW, yearW, rhinoW);
  const height = rhinoSize * 1.15 + meetSize * 0.9 + yearSize * 0.88;
  return { rhinoSize, meetSize, yearSize, rhinoTrack, width, height };
}

function drawMeetTypoLockup(
  page,
  fontBold,
  fontScript,
  x,
  zoneY,
  zoneH,
  metrics,
  colors,
) {
  const { rhinoSize, meetSize, yearSize, rhinoTrack, height } = metrics;
  let baseline = zoneY + (zoneH + height) / 2 - rhinoSize * 0.15;

  page.drawText("RHINOSCOPY", {
    x,
    y: baseline,
    size: rhinoSize,
    font: fontBold,
    color: colors.rhino,
    characterSpacing: rhinoTrack,
  });

  baseline -= meetSize * 0.9;
  page.drawText("MEET", {
    x,
    y: baseline,
    size: meetSize,
    font: fontBold,
    color: colors.meet,
  });

  baseline -= yearSize * 0.9;
  page.drawText("2026", {
    x: x - 1,
    y: baseline,
    size: yearSize,
    font: fontScript,
    color: colors.year,
  });
}

/** Wordmark del header: RHINOSCOPY blanco, tracking amplio (como footer web). */
function drawHeaderRhinoscopyWordmark(page, font, x, barTop, barH) {
  const label = "R H I N O S C O P Y";
  const y =
    barTop + (barH - HEADER_WORDMARK_SIZE) / 2 + HEADER_WORDMARK_SIZE * 0.3;
  page.drawText(label, {
    x,
    y,
    size: HEADER_WORDMARK_SIZE,
    font,
    color: WHITE,
  });
}

export async function generateMeetConstancia(nombreCompleto, options = {}) {
  const light = options.light === true;
  const sponsorRasterH = light ? 52 : 96;
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  doc.setTitle(`Constancia Rhinoscopy Meet 2026 — ${nombreCompleto}`);
  doc.setAuthor("Rhinoscopy");

  const page = doc.addPage([PAGE_W, PAGE_H]);
  const width = PAGE_W;
  const height = PAGE_H;

  page.drawRectangle({ x: 0, y: 0, width, height, color: WHITE });

  const fontScript = await doc.embedFont(readFileSync(FONT_SCRIPT));
  const fontBold = await doc.embedFont(readFileSync(FONT_BOLD));
  const fontMedium = await doc.embedFont(readFileSync(FONT_MEDIUM));

  const headerLogo = await embedLogoAtHeight(doc, LOGO_SOMBRA, HEADER_LOGO_H);
  const footLogo = await embedLogoAtHeight(doc, LOGO_SOMBRA, FOOT_LOGO_H);

  const contentBottom = FOOT_BAR + SPONSOR_H;
  const contentTop = height - TOP_BAR;
  const innerH = contentTop - contentBottom;

  drawBar(page, width, { top: true, h: TOP_BAR });
  drawBar(page, width, { top: false, h: FOOT_BAR });

  const headerY = height - TOP_BAR + (TOP_BAR - HEADER_LOGO_H) / 2;
  page.drawImage(headerLogo.image, {
    x: MARGIN_X,
    y: headerY,
    width: headerLogo.width,
    height: headerLogo.height,
  });

  const wordmarkX = MARGIN_X + headerLogo.width + HEADER_WORDMARK_GAP;
  drawHeaderRhinoscopyWordmark(
    page,
    fontMedium,
    wordmarkX,
    height - TOP_BAR,
    TOP_BAR,
  );

  const artMeta = await sharp(readFileSync(ART_PATH)).metadata();
  const artMaxH = innerH - 28;
  const artMaxW = width * ART_MAX_WIDTH_RATIO;
  const artLayoutScale = Math.min(
    1,
    artMaxH / artMeta.height,
    artMaxW / artMeta.width,
  );
  const artDisplayW = artMeta.width * artLayoutScale;
  const artDisplayH = artMeta.height * artLayoutScale;
  const art = await embedArtForDisplay(
    doc,
    ART_PATH,
    artDisplayW,
    artDisplayH,
    { light },
  );
  const artY = contentBottom + (innerH - art.height) / 2;
  const typoMetrics = measureMeetTypo(
    fontBold,
    fontScript,
    art.height * 1.08,
  );
  const meetBlockW =
    typoMetrics.width + MEET_TYPO_GAP + art.width;
  const meetBlockX = width - MARGIN_X - meetBlockW;
  const typoX = meetBlockX;
  const artX = meetBlockX + typoMetrics.width + MEET_TYPO_GAP;

  drawMeetTypoLockup(
    page,
    fontBold,
    fontScript,
    typoX,
    artY,
    art.height,
    typoMetrics,
    TYPO_ON_WHITE,
  );

  page.drawImage(art.image, {
    x: artX,
    y: artY,
    width: art.width,
    height: art.height,
  });

  const textMaxW = typoX - MARGIN_X - 28;
  const displayName = nombreCompleto
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .trim()
    .toUpperCase();
  let nameSize =
    displayName.length > 34 ? 18 : displayName.length > 28 ? 20 : displayName.length > 24 ? 22 : 27;
  while (
    nameSize > 14 &&
    fontBold.widthOfTextAtSize(displayName, nameSize) > textMaxW
  ) {
    nameSize -= 1;
  }

  const scriptSize = 32;
  const bodySize = 11;
  const bodyLines = [
    "ha participado en carácter de asistente al",
    "Rhinoscopy Meet 2026 — encuentro de endoscopía nasal",
    "realizado en Buenos Aires, Argentina.",
  ];
  const blockH =
    scriptSize +
    14 +
    nameSize +
    16 +
    bodyLines.length * 16;

  let y = contentBottom + (innerH + blockH) / 2;

  y -= scriptSize;
  page.drawText("Certificamos que", {
    x: MARGIN_X + 8,
    y,
    size: scriptSize,
    font: fontScript,
    color: SKY,
  });

  y -= nameSize + 14;
  page.drawText(displayName, {
    x: MARGIN_X + 8,
    y,
    size: nameSize,
    font: fontBold,
    color: NAVY,
    maxWidth: textMaxW,
  });

  y -= 20;
  for (const line of bodyLines) {
    y -= 16;
    page.drawText(line, {
      x: MARGIN_X + 8,
      y,
      size: bodySize,
      font: fontMedium,
      color: MUTED,
      maxWidth: textMaxW,
    });
  }

  const sponsorLabelSize = 9;
  const sponsorLabel = "Auspician";
  page.drawText(sponsorLabel, {
    x: cx(page, sponsorLabel, fontMedium, sponsorLabelSize),
    y: FOOT_BAR + SPONSOR_H - 12,
    size: sponsorLabelSize,
    font: fontMedium,
    color: SLATE,
  });

  page.drawLine({
    start: { x: MARGIN_X, y: FOOT_BAR + SPONSOR_H - 16 },
    end: { x: width - MARGIN_X, y: FOOT_BAR + SPONSOR_H - 16 },
    thickness: 0.75,
    color: LINE,
  });

  const maxLogoH = 40;
  const gap = 14;
  const logoBandTop = FOOT_BAR + 12;
  const logoBandH = SPONSOR_H - 30;
  const logos = [];
  for (const file of SPONSOR_FILES) {
    const filePath = path.join(ROOT, "public/images/sponsors", file);
    const image = await embedRaster(doc, filePath, {
      height: sponsorRasterH,
      fit: "inside",
    });
    const scale = maxLogoH / image.height;
    logos.push({ image, w: image.width * scale, h: maxLogoH });
  }

  const totalW =
    logos.reduce((s, item) => s + item.w, 0) + gap * (logos.length - 1);
  const rowScale = Math.min(1, (width - MARGIN_X * 2) / totalW);
  let x = (width - totalW * rowScale) / 2;
  const rowLogoH = maxLogoH * rowScale;

  for (const { image, w, h } of logos) {
    const dw = w * rowScale;
    const dh = h * rowScale;
    page.drawImage(image, {
      x,
      y: logoBandTop + (logoBandH - rowLogoH) / 2 + (rowLogoH - dh) / 2,
      width: dw,
      height: dh,
    });
    x += dw + gap * rowScale;
  }

  page.drawImage(footLogo.image, {
    x: (width - footLogo.width) / 2,
    y: (FOOT_BAR - FOOT_LOGO_H) / 2 + 12,
    width: footLogo.width,
    height: footLogo.height,
  });

  const dates = "Buenos Aires  ·  17—19 Septiembre 2026";
  const datesSize = 7.5;
  page.drawText(dates, {
    x: cx(page, dates, fontMedium, datesSize),
    y: 16,
    size: datesSize,
    font: fontMedium,
    color: SKY,
  });

  return doc.save({ useObjectStreams: true });
}

async function main() {
  const nombre = process.argv[2] ?? "Maria Belen Domeg Lizardo";

  mkdirSync(OUT_DIR, { recursive: true });
  const fileName = `${certificateFileSlug(nombre)}.pdf`;

  const bytes = await generateMeetConstancia(nombre);
  writeFileSync(path.join(OUT_DIR, fileName), bytes);
  console.log(`Generado: ${path.join(OUT_DIR, fileName)} (${bytes.length} bytes)`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
