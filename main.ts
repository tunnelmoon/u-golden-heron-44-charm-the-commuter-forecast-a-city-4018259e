import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "In Snozzlewick, confetti drizzle until 9, then sunshine and a free second coffee for anyone still waiting at the bus stop.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const chars = [...ENTRY].length;
if (chars < 1 || chars > 140) {
  throw new Error(`entry must be 1 to 140 characters, got ${chars}`);
}
if (ENTRY.trim().length === 0 || /[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single non-blank line");
}

const dst = join(outDir, "entry.txt");
writeFileSync(dst, ENTRY, "utf8");
// Self-check: the file must hold exactly the validated line.
if (readFileSync(dst, "utf8") !== ENTRY) {
  throw new Error(`write mismatch: ${dst} does not hold the entry line`);
}
console.log(`wrote ${dst} (${chars} chars)`);
