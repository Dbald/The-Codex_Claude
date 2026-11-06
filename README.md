# The Codex

Live at https://dbcodex.netlify.app/

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
