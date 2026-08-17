// Generates a branded placeholder video for a lesson card, so you can preview
// the Watch-mode flow before recording anything real.
//
//   npm i -D playwright-core          (one-off, not a runtime dependency)
//   node scripts/make-placeholder.mjs finance-lesson-001
//   node scripts/make-placeholder.mjs --all-lessons
//
// Delete the generated files from public/videos/ once your real videos land.

import { writeFileSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright-core';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = ['finance', 'electronics', 'robotics', 'financeL2', 'electronicsL2', 'roboticsL2'];
const ACCENT = { Finance: '#10b981', Electronics: '#3b82f6', Robotics: '#a855f7' };
const SECONDS = 6;

const cards = DATA.flatMap(f =>
  JSON.parse(readFileSync(join(root, 'src', 'data', `${f}.json`), 'utf8'))
);

const args = process.argv.slice(2);
const targets = args.includes('--all-lessons')
  ? cards.filter(c => c.type === 'lesson')
  : cards.filter(c => args.includes(c.id));

if (targets.length === 0) {
  console.error('No matching cards. Pass card ids or --all-lessons.');
  process.exit(1);
}

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium',
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
await page.setContent('<canvas id="c" width="540" height="960"></canvas>');

for (const card of targets) {
  const b64 = await page.evaluate(
    async ({ title, hook, channel, accent, secs }) => {
      const c = document.getElementById('c');
      const ctx = c.getContext('2d');
      const rec = new MediaRecorder(c.captureStream(30), { mimeType: 'video/webm' });
      const chunks = [];
      rec.ondataavailable = e => chunks.push(e.data);
      rec.start();

      const wrap = (text, max, font) => {
        ctx.font = font;
        const words = text.split(' ');
        const lines = [];
        let line = '';
        for (const w of words) {
          const test = line ? `${line} ${w}` : w;
          if (ctx.measureText(test).width > max && line) {
            lines.push(line);
            line = w;
          } else line = test;
        }
        if (line) lines.push(line);
        return lines;
      };

      const start = performance.now();
      await new Promise(done => {
        const draw = () => {
          const t = (performance.now() - start) / 1000;

          ctx.fillStyle = '#161c2c';
          ctx.fillRect(0, 0, 540, 960);

          // Breathing accent glow
          const pulse = 0.5 + 0.5 * Math.sin(t * 1.4);
          const g = ctx.createRadialGradient(270, 420, 40, 270, 420, 340);
          g.addColorStop(0, `${accent}${Math.round(30 + pulse * 26).toString(16).padStart(2, '0')}`);
          g.addColorStop(1, '#161c2c00');
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, 540, 960);

          // Rotating ring
          ctx.save();
          ctx.translate(270, 420);
          ctx.rotate(t * 0.7);
          ctx.strokeStyle = accent;
          ctx.globalAlpha = 0.85;
          ctx.lineWidth = 5;
          ctx.setLineDash([90, 40]);
          ctx.beginPath();
          ctx.arc(0, 0, 110, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
          ctx.globalAlpha = 1;
          ctx.setLineDash([]);

          // Play glyph
          ctx.fillStyle = accent;
          ctx.beginPath();
          ctx.moveTo(248, 392);
          ctx.lineTo(248, 448);
          ctx.lineTo(298, 420);
          ctx.closePath();
          ctx.fill();

          ctx.textAlign = 'center';

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 26px system-ui, sans-serif';
          ctx.fillText('THE CODEX', 270, 120);

          ctx.fillStyle = accent;
          ctx.font = 'bold 18px system-ui, sans-serif';
          ctx.fillText(channel.toUpperCase(), 270, 154);

          // The app overlays the title, hook and action rail on top of the
          // video, so this placeholder maps out the area that stays clear.
          ctx.fillStyle = `${accent}cc`;
          ctx.font = 'bold 22px system-ui, sans-serif';
          ctx.fillText('PLACEHOLDER', 270, 600);
          ctx.fillStyle = '#cbd5e1';
          ctx.font = '20px system-ui, sans-serif';
          ctx.fillText('your video goes here', 270, 630);
          ctx.fillStyle = '#64748b';
          ctx.font = '17px system-ui, sans-serif';
          ctx.fillText(`${Math.max(0, secs - t).toFixed(1)}s`, 270, 662);

          // Safe-area guides — keep faces and hands inside this box
          ctx.strokeStyle = '#ffffff30';
          ctx.setLineDash([10, 8]);
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(0, 690);
          ctx.lineTo(540, 690);
          ctx.moveTo(455, 0);
          ctx.lineTo(455, 690);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.fillStyle = '#94a3b8';
          ctx.font = '15px system-ui, sans-serif';
          ctx.fillText('↓ app overlay covers this ↓', 270, 716);
          ctx.save();
          ctx.translate(500, 360);
          ctx.rotate(Math.PI / 2);
          ctx.fillText('action rail', 0, 0);
          ctx.restore();

          if (t < secs) requestAnimationFrame(draw);
          else done();
        };
        draw();
      });

      rec.stop();
      const blob = await new Promise(r => {
        rec.onstop = () => r(new Blob(chunks, { type: 'video/webm' }));
      });
      const bytes = new Uint8Array(await blob.arrayBuffer());
      let s = '';
      for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
      return btoa(s);
    },
    {
      title: card.title,
      hook: card.hook || '',
      channel: card.channel,
      accent: ACCENT[card.channel],
      secs: SECONDS,
    }
  );

  const out = join(root, 'public', 'videos', `${card.id}.webm`);
  writeFileSync(out, Buffer.from(b64, 'base64'));
  console.log(`✓ ${card.id}.webm`);
}

await browser.close();
