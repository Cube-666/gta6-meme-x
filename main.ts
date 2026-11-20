// gta6-meme-x-01 entry (Node 22, standard library only).
//
// The entry is the X post itself: the meme is posted on X from a public
// account, and POST.json at the repository root names the post's address.
// This program reads that file, checks it really points at an X post,
// and copies it byte-for-byte to the output directory, where the gate
// reads it. It never touches the network, never reads the clock, and
// never opens a file outside the entry, so two runs write the same bytes.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output.

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// An X post address looks like https://x.com/<handle>/status/<id>.
// A query string or fragment after the id is allowed; anything else is not.
const POST_URL = /^https:\/\/(x\.com|twitter\.com)\/[^/]+\/status\/\d+([?#].*)?$/;

function fail(message: string): never {
  console.error(`gta6-meme-x-01: ${message}`);
  process.exit(1);
}

const postPath = join(BOT_DIR, 'POST.json');

let raw: string;
try {
  raw = readFileSync(postPath, 'utf8');
} catch {
  fail(
    `POST.json not found in ${BOT_DIR} — the meme has not been posted on X yet, ` +
      `so there is no post address to hand in. Post the meme, write its address ` +
      `into POST.json as {"url": "https://x.com/<handle>/status/<id>"}, and run again.`,
  );
}

let parsed: unknown;
try {
  parsed = JSON.parse(raw);
} catch {
  fail(`POST.json in ${BOT_DIR} is not valid JSON.`);
}

const url =
  typeof parsed === 'object' && parsed !== null
    ? (parsed as Record<string, unknown>).url
    : undefined;
if (typeof url !== 'string' || !POST_URL.test(url)) {
  const shown =
    typeof url === 'string' ? JSON.stringify(url.slice(0, 80)) : String(url);
  fail(
    `POST.json does not name a valid X post address (expected ` +
      `{"url": "https://x.com/<handle>/status/<id>"}); got ${shown}.`,
  );
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(postPath, join(OUTPUT_DIR, 'POST.json'));
} catch (err) {
  fail(`POST.json could not be copied to ${OUTPUT_DIR}: ${(err as Error).message}`);
}
