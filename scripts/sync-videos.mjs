// Scans public/videos/ and writes src/data/videoManifest.json.
// Runs automatically before `npm run dev` and `npm run build`.
//
// Drop a file named after the card id and it appears in Watch mode:
//   public/videos/finance-lesson-001.mp4      → the video
//   public/videos/finance-lesson-001.vtt      → optional captions
//   public/videos/finance-lesson-001.jpg      → optional poster frame
//
// Never fails the build: a missing folder just produces an empty manifest.

import { readdirSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const videoDir = join(root, 'public', 'videos');
const outFile = join(root, 'src', 'data', 'videoManifest.json');

const VIDEO_EXT = new Set(['.mp4', '.webm', '.mov', '.m4v']);

function build() {
  if (!existsSync(videoDir)) {
    mkdirSync(videoDir, { recursive: true });
    return {};
  }

  const files = readdirSync(videoDir);
  const byBase = new Map();
  for (const file of files) {
    const ext = extname(file).toLowerCase();
    const base = basename(file, extname(file));
    if (!byBase.has(base)) byBase.set(base, {});
    const entry = byBase.get(base);
    if (VIDEO_EXT.has(ext)) entry.src = `/videos/${file}`;
    else if (ext === '.vtt') entry.captions = `/videos/${file}`;
    else if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) entry.poster = `/videos/${file}`;
  }

  const manifest = {};
  for (const [cardId, entry] of byBase) {
    if (entry.src) manifest[cardId] = entry;
  }
  return manifest;
}

let manifest = {};
try {
  manifest = build();
} catch (err) {
  console.warn('[sync-videos] skipped:', err.message);
}

writeFileSync(outFile, JSON.stringify(manifest, null, 2) + '\n');
const count = Object.keys(manifest).length;
console.log(`[sync-videos] ${count} video${count === 1 ? '' : 's'} indexed`);
