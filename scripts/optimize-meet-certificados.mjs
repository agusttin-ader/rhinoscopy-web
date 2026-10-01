/**
 * Wrapper para el optimizador Python (PyMuPDF).
 *
 *   npm run constancia:meet:optimize
 *   npm run constancia:meet:optimize -- --dry-run
 */

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const script = path.join(__dirname, "optimize-meet-certificados.py");
const args = process.argv.slice(2);

const venvPython =
  process.platform === "win32"
    ? path.join(root, ".venv-pdf", "Scripts", "python.exe")
    : path.join(root, ".venv-pdf", "bin", "python");

const python = existsSync(venvPython) ? venvPython : "python3";

const result = spawnSync(python, [script, ...args], {
  stdio: "inherit",
  cwd: root,
  env: { ...process.env, OPTIMIZE_SKIP_REEXEC: "1" },
});

process.exit(result.status ?? 1);
