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
