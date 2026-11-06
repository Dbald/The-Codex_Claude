# The Codex

Live at https://dbcodex.netlify.app/

## Site map

| Path | What it is |
| --- | --- |
| `/` | Homepage — "Field trips, minus the bus" |
| `/trips/:trip` | A trip's overview (e.g. `/trips/ocean-explorer`) |
| `/trips/ocean-explorer/belize-living-reef` | The reef lesson, full screen, with Ocean Explorer framed inside |
| `/early-access/` | Sign-up form (static page, Netlify Forms) |
| `/your-data` | What's stored and where, plus a progress reset |
| `/app` | The card-feed app (Finance, Electronics, Robotics; Watch mode) |

Old `/courses/:trip` links forward to `/trips/:trip`. `public/_redirects` sends unknown paths to the app so deep links load; real files such as `/early-access/` are served as-is.

- **Trip content:** `src/data/courses.json`.
- **Outbound links:** `src/config/site.js`. A `null` link either falls back to a page on the site or says it isn't connected yet; nothing points at an invented URL.
- **Guide photo:** add it as `public/images/guide/devin.jpg` and set `guidePhoto: '/images/guide/devin.jpg'` in `src/config/site.js`. Until then the "Your guide" section shows a placeholder.
- **Trip images** in `public/images/trips/` are cropped from the redesign mock; swap in full-resolution captures when you have them.

## Early-access sign-up

`public/early-access/` is a standalone static page (outside the React app) that collects sign-ups with Netlify Forms. Vite copies it into the build as-is, so it is served at `/early-access/`.

- **Turn on form detection once:** in Netlify, Site configuration → Forms → Enable form detection, then redeploy. Sign-ups then appear under Forms → `codex-early-access`.
- **Email alerts:** Forms → Form notifications.

### Links

| Use | Link |
| --- | --- |
| Early access | `/early-access/?interest=early` |
| Classroom pilot | `/early-access/?interest=pilot` |
| Family workshop (library flyers) | `/early-access/?interest=workshop&src=library` |

`interest` pre-ticks the matching box and changes the headline. `src` is saved with each sign-up so you can see where a lead came from. A link to the site root with `?interest=…` is forwarded to the form automatically.

## Interactive worlds (Ocean Explorer)

Ocean Explorer runs **inside** The Codex: the reef lesson opens full screen from Home, with the Codex header around it (course, progress, creature labels, field notes, Save & exit). The world itself stays its own app and is shown in a frame.

- Registry and progress: `src/utils/worlds.js`. Lesson page: `src/pages/WorldLesson.jsx`.
- The world is loaded from `https://oceanexp.netlify.app/?embed=codex&start=lesson`. Override with `VITE_OCEAN_EXPLORER_URL` (e.g. a deploy preview or `http://localhost:5174` in development).
- The two apps talk with `postMessage`, origin-checked on both sides. The message list is in Ocean Explorer's `docs/codex-embed.md`.
- Progress (steps, creatures found, label choice) is stored on this device only, under `codex_worlds`.
- Ocean Explorer needs its Codex support deployed (Ocean Explorer PR "Run inside The Codex"). Before that, the reef still loads here, just without the Codex progress and labels connection.
