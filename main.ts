// News-image entry for Friday 20 November 2026 (Node 22, standard library only).
//
// The entry image lives beside this file as entry.png: one front page summing
// up the world's news of 20 November 2026 (36 stories, 13 illustrated leads,
// a world map with numbered pins, and a date check). This program copies
// those exact bytes to the grader's output directory, so both runs write
// identical bytes.
//
// Local run (Node 22):
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const bytes = readFileSync(join(here, "entry.png"));
// Guard: refuse to emit anything that is not a PNG (first 8 bytes are the
// PNG signature). The entry image is a PNG, so this never fires in practice.
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!bytes.subarray(0, 8).equals(PNG_SIGNATURE)) {
  throw new Error("entry.png is not a PNG file");
}
writeFileSync(join(outDir, "entry.png"), bytes);
