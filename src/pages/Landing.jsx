import courses from '../data/courses.json';
import { SITE } from '../config/site.js';
import { Link } from '../utils/router.jsx';
import { lessonPath } from '../utils/worlds.js';
import SmartLink from '../components/site/SmartLink.jsx';
import NotifyForm from '../components/site/NotifyForm.jsx';
import BrandDots from '../components/site/BrandDots.jsx';

const byId = Object.fromEntries(courses.map(c => [c.id, c]));
const tripLabel = c => `Trip ${String(c.trip).padStart(2, '0')} · ${c.place}`;

const ROUTE = [
  { stop: 1, title: 'Know the goal', text: 'Clear objectives, so you know what you’re there to find out.' },
  { stop: 2, title: 'Learn it', text: 'A short video lesson from your guide sets up the big idea.' },
  { stop: 3, title: 'Go there', text: 'Step into the 3D world and run the experiment yourself.', here: true },
  { stop: 4, title: 'Prove it', text: 'A check-in with feedback on what stuck and what to revisit.' },
  { stop: 5, title: 'Next stop', text: 'Your progress is saved, and the next trip is waiting.', end: true },
];

function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      →
    </span>
  );
}

export default function Landing() {
  const ocean = byId['ocean-explorer'];
  const orbit = byId['orbit-atlas'];
  const power = byId['power-a-city'];
  const firstTrip = lessonPath('ocean-explorer');

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap">
          <div className="hero__top">
            <h1 id="hero-title" className="wide display-hero">
              Field
              <br />
              trips,
              <br />
              <span className="c-teal">
                minus
                <br />
                the bus.
              </span>
            </h1>
            <div className="hero__copy">
              <p className="lead">
                Explore a real Belize reef, follow satellites around Earth, and wire a city’s power grid. Every trip is
                guided by a real teacher, on a tablet, touchscreen or laptop.
              </p>
              <div className="cta-row">
                <Link to={firstTrip} className="btn btn-teal">
                  Take the first trip <Arrow />
                </Link>
                <Link to="/#trips" className="btn btn-outline">
                  See all three
                </Link>
              </div>
            </div>
          </div>

          <div className="bento">
            <Link to={`/trips/${ocean.id}`} className="tile bento__main">
              <img src={ocean.image} alt={ocean.imageAlt} width="1150" height="810" fetchPriority="high" />
              <span className="bento__chip">
                <span className="kicker" style={{ display: 'block' }}>
                  Trip 01 · {ocean.heroLabel}
                </span>
                <span className="wide" style={{ display: 'block' }}>
                  {ocean.heroPlace}
                </span>
              </span>
            </Link>
            <Link to={`/trips/${orbit.id}`} className="tile tile--blue on-dark">
              <span>
                <span className="kicker" style={{ display: 'block' }}>
                  Trip 02 · {orbit.heroPlace}
                </span>
                <span className="wide" style={{ display: 'block', marginTop: '1.4rem' }}>
                  {orbit.world}
                </span>
              </span>
              <span className="tile__tag">{orbit.heroTagline}</span>
            </Link>
            <Link to={`/trips/${power.id}`} className="tile tile--orange on-orange">
              <span>
                <span className="kicker" style={{ display: 'block' }}>
                  Trip 03 · {power.heroPlace}
                </span>
                <span className="wide" style={{ display: 'block', marginTop: '1.4rem' }}>
                  {power.world}
                </span>
              </span>
              <span className="tile__tag">{power.heroTagline}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why ── */}
      <section className="band on-dark" aria-label="Why The Codex">
        <div className="wrap band__grid">
          <p className="band__statement">
            For every kid who has never seen a reef up close, a satellite at work, or where the power really comes from.
          </p>
          <p>No aquarium, observatory or power plant nearby? The Codex brings the place to you, and a teacher to explain it.</p>
        </div>
      </section>

      {/* ── Where we're going ── */}
      <section id="trips" className="section" aria-labelledby="trips-title">
        <div className="wrap">
          <h2 id="trips-title" className="wide display-xl">
            Where we’re going
          </h2>

          <div className="trips">
            {/* Trip 01 */}
            <article className="trip trip--teal on-dark" aria-labelledby="trip-ocean">
              <div className="trip__media">
                <img src={ocean.image} alt="" width="1150" height="810" loading="lazy" />
              </div>
              <div className="trip__body">
                <div className="trip__head">
                  <p className="kicker">{tripLabel(ocean)}</p>
                  <span className="pill pill--white">{ocean.statusLabel}</span>
                </div>
                <h3 id="trip-ocean" className="wide">
                  <Link to={`/trips/${ocean.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {ocean.world}
                  </Link>
                </h3>
                <p className="trip__text">{ocean.summary}</p>
                <ol className="trip__lessons">
                  {ocean.lessons.map((l, i) => (
                    <li key={l.title}>
                      <span className="n">{String(i + 1).padStart(2, '0')}</span>
                      <span>{l.title}</span>
                    </li>
                  ))}
                </ol>
                <div className="trip__actions">
                  <Link to={firstTrip} className="btn btn-white">
                    {ocean.cta}
                  </Link>
                  <span className="trip__note">{ocean.ctaNote}</span>
                </div>
              </div>
            </article>

            {/* Trip 02 */}
            <article className="trip trip--blue trip--flip on-dark" aria-labelledby="trip-orbit">
              <div className="trip__media">
                <img src={orbit.image} alt="" width="1150" height="810" loading="lazy" />
              </div>
              <div className="trip__body">
                <div className="trip__head">
                  <p className="kicker">{tripLabel(orbit)}</p>
                  <span className="pill pill--outline">{orbit.statusLabel}</span>
                </div>
                <h3 id="trip-orbit" className="wide" style={{ maxWidth: 'none' }}>
                  <Link to={`/trips/${orbit.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {orbit.world}
                  </Link>
                </h3>
                <p className="trip__text">{orbit.summary}</p>
                <p className="trip__text" style={{ fontSize: '0.94rem' }}>
                  <strong>First lesson:</strong> {orbit.firstLesson}
                </p>
                <ul className="chips" aria-label="Each lesson">
                  {orbit.chips.map(c => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <div className="trip__actions">
                  <SmartLink href={SITE.previews[orbit.id]} fallback={`/trips/${orbit.id}`} className="btn btn-white">
                    {orbit.cta}
                  </SmartLink>
                </div>
              </div>
            </article>

            {/* Trip 03 */}
            <article className="trip trip--orange on-orange" aria-labelledby="trip-power">
              <div className="trip__media">
                <img src={power.image} alt="" width="1150" height="810" loading="lazy" />
              </div>
              <div className="trip__body">
                <div className="trip__head">
                  <p className="kicker">{tripLabel(power)}</p>
                  <span className="pill pill--ink">{power.statusLabel}</span>
                </div>
                <h3 id="trip-power" className="wide" style={{ maxWidth: 'none' }}>
                  <Link to={`/trips/${power.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {power.world}
                  </Link>
                </h3>
                <p className="trip__text">{power.summary}</p>
                <ol className="path-chips" aria-label="The route through the course">
                  {power.path.map((step, i) => (
                    <li key={step}>
                      <span className="chip">{step}</span>
                      {i < power.path.length - 1 && <span aria-hidden="true">→</span>}
                    </li>
                  ))}
                </ol>
                <div className="trip__actions">
                  <SmartLink href={SITE.previews[power.id]} fallback={`/trips/${power.id}`} className="btn btn-ink">
                    {power.cta}
                  </SmartLink>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── Every trip, same route ── */}
      <section id="route" className="section" style={{ paddingTop: 0 }} aria-labelledby="route-title">
        <div className="wrap">
          <h2 id="route-title" className="wide display-xl">
            Every trip, same route
          </h2>
          <p className="section-sub">
            A real lesson before the world, a check after it, and you always know your next stop. Every activity has an
            accessible alternative.
          </p>
          <ol className="route">
            {ROUTE.map(r => (
              <li key={r.stop} className={r.here ? 'is-here' : r.end ? 'is-end' : undefined}>
                <p className="kicker">Stop {r.stop}</p>
                <h3 className="wide">{r.title}</h3>
                <p>{r.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Who's coming along ── */}
      <section id="along" className="section section--grey" aria-labelledby="along-title">
        <div className="wrap">
          <h2 id="along-title" className="wide display-xl">
            Who’s coming along
          </h2>
          <div className="along">
            <article className="along__card" style={{ '--link': 'var(--teal)' }}>
              <p className="kicker">Families &amp; libraries</p>
              <h3 className="wide">Explore together</h3>
              <p>
                Gather around a touchscreen or a few iPads and tap your way through the reef as a family. Ask about a
                workshop at your local library.
              </p>
              <SmartLink href={SITE.workshopUrl} className="u-link">
                Bring a workshop to your library →
              </SmartLink>
            </article>
            <article className="along__card" style={{ '--link': 'var(--blue)' }}>
              <p className="kicker">Teachers &amp; schools</p>
              <h3 className="wide">Take the whole class</h3>
              <p>
                Lead the trip from the front of the room, or let students go at their own pace. Help shape the first full
                course by piloting it.
              </p>
              <SmartLink href={SITE.pilotUrl} className="u-link">
                Pilot the reef course →
              </SmartLink>
            </article>
            <article className="along__card" style={{ '--link': 'var(--orange-text)' }}>
              <p className="kicker">Curious learners</p>
              <h3 className="wide">Go on your own</h3>
              <p>
                Start any trip in your browser, no install. Pick up where you left off whenever you’re ready for the next
                stop.
              </p>
              <Link to={firstTrip} className="u-link">
                Start the first trip →
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* ── Your guide ── */}
      <section id="guide" className="section" aria-labelledby="guide-title">
        <div className="wrap guide">
          {SITE.guidePhoto ? (
            <div className="guide__photo">
              <img src={SITE.guidePhoto} alt="Devin, the teacher who builds The Codex worlds" loading="lazy" />
            </div>
          ) : (
            <div className="guide__photo guide__placeholder" aria-hidden="true">
              <BrandDots />
            </div>
          )}
          <div>
            <p className="kicker">Your guide</p>
            <h2 id="guide-title" className="wide display-xl" style={{ marginBottom: 0 }}>
              Taught by a teacher who builds the worlds.
            </h2>
            <p className="lead">
              Devin is a classroom teacher and creative technologist. He builds every Codex world himself, and the reef
              trips are set in Belize waters he explored in person, so what you see comes from somewhere real.
            </p>
            <div style={{ marginTop: '1rem' }}>
              <SmartLink href={SITE.aboutUrl} notice="The About page isn’t published yet." className="u-link">
                More about Devin and The Devinci Code →
              </SmartLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── First stop ── */}
      <section className="final on-dark" aria-labelledby="final-title">
        <div className="wrap final__grid">
          <div>
            <h2 id="final-title" className="wide display-xl">
              First
              <br />
              stop:
              <br />
              the reef.
            </h2>
            <div className="cta-row" style={{ marginTop: '1.75rem' }}>
              <Link to={firstTrip} className="btn btn-white">
                Take the first trip <Arrow />
              </Link>
            </div>
          </div>
          <NotifyForm />
        </div>
      </section>
    </>
  );
}
