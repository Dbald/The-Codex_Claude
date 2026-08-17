# Lesson videos

Drop a vertical (9:16) video here named after the card id and it appears in
Watch mode automatically — the manifest regenerates on `npm run dev` / `npm run build`.

```
public/videos/
  finance-lesson-001.mp4     ← the video      (required)
  finance-lesson-001.vtt     ← captions       (optional, recommended)
  finance-lesson-001.jpg     ← poster frame   (optional)
```

Card ids are in `src/data/*.json` — e.g. `finance-lesson-001`,
`electronics-lesson-104`, `robotics-lesson-110`.

**Recording tips**
- Shoot vertical, 1080×1920, and keep it under ~60s.
- The bottom ~30% is covered by the title overlay; keep faces/hands above it.
- The right edge is covered by the action rail; leave ~70px clear.
- Videos autoplay muted, so open with something visual, not a spoken hook.
- `.mp4` (H.264) plays everywhere; `.webm` also works.

Anything without a video simply shows its card — no gaps in the feed.
