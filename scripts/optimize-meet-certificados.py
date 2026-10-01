#!/usr/bin/env python3
"""
Comprime PDFs del Meet 2026 (carpeta Certificados) manteniendo buena nitidez en pantalla e impresión.

Crea/usa `.venv-pdf` en la raíz del repo (PyMuPDF).

  python3 scripts/optimize-meet-certificados.py
  python3 scripts/optimize-meet-certificados.py --dry-run
"""

from __future__ import annotations

import argparse
import os
import subprocess
import sys
import venv
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CERT_DIR = ROOT / "public/images/constancias/rhinoscopy-meet-2026/Certificados"
VENV_DIR = ROOT / ".venv-pdf"
VENV_PY = VENV_DIR / "bin" / "python"


def venv_has_pymupdf() -> bool:
    if not VENV_PY.is_file():
        return False
    probe = subprocess.run(
        [str(VENV_PY), "-c", "import pymupdf"],
        capture_output=True,
    )
    return probe.returncode == 0


def ensure_venv() -> None:
    if venv_has_pymupdf():
        return
    if not VENV_DIR.is_dir():
        print("Creando entorno .venv-pdf…")
        venv.create(VENV_DIR, with_pip=True)
    print("Instalando PyMuPDF en .venv-pdf…")
    subprocess.check_call(
        [str(VENV_PY), "-m", "pip", "install", "-q", "pymupdf"],
    )


def compress_pdf(input_path: Path, output_path: Path, dpi: int, jpeg_quality: int) -> None:
    import pymupdf

    src = pymupdf.open(input_path)
    dst = pymupdf.open()
    try:
        for page in src:
            pix = page.get_pixmap(dpi=dpi, alpha=False)
            jpg = pix.tobytes("jpeg", jpg_quality=jpeg_quality)
            new_page = dst.new_page(width=page.rect.width, height=page.rect.height)
            new_page.insert_image(page.rect, stream=jpg)
        dst.save(
            output_path,
            deflate=True,
            garbage=4,
            clean=True,
        )
    finally:
        dst.close()
        src.close()


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--dpi", type=int, default=220)
    parser.add_argument("--jpeg-quality", type=int, default=88)
    args = parser.parse_args()

    if not CERT_DIR.is_dir():
        print(f"No existe la carpeta: {CERT_DIR}", file=sys.stderr)
        return 1

    ensure_venv()
    if os.environ.get("OPTIMIZE_SKIP_REEXEC") != "1":
        if Path(sys.executable).resolve() != VENV_PY.resolve():
            os.execv(str(VENV_PY), [str(VENV_PY), *sys.argv])

    files = sorted(p for p in CERT_DIR.iterdir() if p.suffix.lower() == ".pdf")
    tmp_dir = CERT_DIR / ".optimize-tmp"

    before_total = 0
    after_total = 0
    optimized = 0
    skipped = 0

    print(f"{len(files)} PDF en {CERT_DIR}")
    print(f"Config: {args.dpi} DPI, JPEG calidad {args.jpeg_quality}\n")

    if not args.dry_run:
        tmp_dir.mkdir(exist_ok=True)

    for path in files:
        before = path.stat().st_size
        before_total += before

        if args.dry_run:
            print(f"[dry-run] {path.name} ({before / 1024:.0f} KB)")
            after_total += before
            continue

        tmp_out = tmp_dir / path.name
        try:
            compress_pdf(path, tmp_out, args.dpi, args.jpeg_quality)
            after = tmp_out.stat().st_size
            if after >= before * 0.98:
                tmp_out.unlink(missing_ok=True)
                after_total += before
                skipped += 1
                print(f"  ≈ {path.name} sin cambio útil ({before / 1024:.0f} KB)")
                continue
            tmp_out.replace(path)
            after_total += after
            optimized += 1
            pct = (1 - after / before) * 100
            print(
                f"  ✓ {path.name}: {before / 1024:.0f} → {after / 1024:.0f} KB (−{pct:.1f}%)",
            )
        except Exception as exc:  # noqa: BLE001
            tmp_out.unlink(missing_ok=True)
            print(f"  ✗ {path.name}: {exc}", file=sys.stderr)
            after_total += before

    if tmp_dir.is_dir():
        try:
            tmp_dir.rmdir()
        except OSError:
            pass

    print("\n---")
    print(f"Antes:   {before_total / (1024 * 1024):.2f} MB")
    print(f"Después: {after_total / (1024 * 1024):.2f} MB")
    if not args.dry_run:
        print(f"Optimizados: {optimized}, sin cambio: {skipped}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
