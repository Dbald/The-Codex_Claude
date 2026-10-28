import courses from '../data/courses.json';
import { SITE } from '../config/site.js';
import SmartLink from '../components/site/SmartLink.jsx';
import Portal from '../components/site/Portal.jsx';
import DoorCard from '../components/site/DoorCard.jsx';
import { Link } from '../utils/router.jsx';

const PATH = [
  { n: '01', tag: 'Goal', title: 'Know the aim', color: 'var(--violet)', text: 'Each course opens with clear objectives, so you know what you’re working toward.' },
  { n: '02', tag: 'Learn', title: 'A real teacher', color: 'var(--yellow)', text: 'Short video lessons explain the idea before you go in.' },
  { n: '03', tag: 'Explore', title: 'Step into the world', color: 'var(--teal)', text: 'Run the experiment yourself in the 3D world.' },
  { n: '04', tag: 'Check', title: 'Show what you know', color: 'var(--green)', text: 'An assessment with feedback on what you got right and what to revisit.' },
  { n: '05', tag: 'Next', title: 'Keep your progress', color: 'var(--pink)', text: 'See how far you’ve come and which door opens next.' },
];

export default function Landing() {
  const ocean = courses.find(c => c.id === 'ocean-explorer');
  const oceanOverview = `/courses/${ocean.id}`;
  const oceanWorld = SITE.worlds[ocean.id];

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero__grid">
          <div className="hero__copy">
            <p className="eyebrow">The Codex / 3 worlds · first course forming</p>
            <h1 id="hero-title" className="display-1">
              Every lesson
              <br />
              is a door.
              <br />
              <span className="text-yellow">Step through.</span>
            </h1>
            <p className="lead">
              Short lessons taught by a real teacher, then a 3D world where you test the idea yourself: change the
              conditions, watch what happens, explain why.
            </p>
            <div className="cta-row">
              <Link to={oceanOverview} className="btn btn-primary">
                Start with Ocean Explorer <span className="arrow" aria-hidden="true">→</span>
              </Link>
              <SmartLink href={oceanWorld} fallback={oceanOverview} className="btn btn-ghost">
                Try the reef now
              </SmartLink>
            </div>
            <p className="hero__note">Runs in your web browser · no install</p>
          </div>

          <Portal
            src={ocean.image}
            alt={ocean.imageAlt}
            title={ocean.world}
            caption="Door 01 · first course"
          />
        </div>
      </section>

      {/* ── Three doors ── */}
      <section id="worlds" className="section" aria-labelledby="worlds-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="worlds-title" className="display-2">
              Three doors. Start with the reef.
            </h2>
            <p>Each world becomes a full course. Ocean Explorer opens first, and the others follow the same path.</p>
          </div>
          <div className="doors">
            {courses.map(c => (
              <DoorCard key={c.id} course={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ── First course ── */}
      <section id="first-course" className="section section--alt first-course" aria-labelledby="fc-title">
        <div className="wrap first-course__grid">
          <div>
            <p className="eyebrow">First course · {ocean.world}</p>
            <h2 id="fc-title" className="display-2">
              {ocean.courseTitle}
            </h2>
            <p className="lead">{ocean.intro}</p>
            <ul className="topic-list">
              {ocean.topics.map(t => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="cta-row">
              <SmartLink href={SITE.earlyAccessUrl} fallback={oceanOverview} className="btn btn-primary">
                Get early access to the course
              </SmartLink>
              <SmartLink href={oceanWorld} fallback={oceanOverview} className="btn btn-ghost">
                Explore the world first
              </SmartLink>
            </div>
          </div>

          <div>
            <p className="eyebrow" id="inside-title">
              Inside the world, you…
            </p>
            <ol className="inside-list" aria-labelledby="inside-title">
              {ocean.insideTheWorld.map((step, i) => (
                <li key={step.verb}>
                  <span className="num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="verb">{step.verb}</span>
                  <span className="detail">{step.detail}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="section" aria-labelledby="path-title">
        <div className="wrap">
          <div className="section-head" style={{ gridTemplateColumns: '1fr' }}>
            <h2 id="path-title" className="display-2">
              Every course follows the same path
            </h2>
            <p style={{ maxWidth: '34rem' }}>
              A real lesson before the world, a check after it, and a clear way back to the course. Every activity has
              an accessible alternative.
            </p>
          </div>
          <ol className="path">
            {PATH.map(step => (
              <li key={step.n} style={{ '--step': step.color }}>
                <p className="eyebrow" style={{ margin: 0 }}>
                  {step.n} / {step.tag}
                </p>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Teachers & schools ── */}
      <section id="for-schools" className="section schools" aria-labelledby="schools-title">
        <div className="wrap schools__grid">
          <div>
            <p className="eyebrow">For teachers &amp; schools</p>
            <h2 id="schools-title" className="display-2">
              Open one door for the whole class.
            </h2>
            <p>
              Run Ocean Explorer as a teacher-led lesson, or let students work through it at their own pace. Help shape
              the first course by piloting it with your class.
            </p>
          </div>
          <div className="schools__actions">
            <SmartLink
              href={SITE.pilotUrl}
              notice="Pilot sign-ups aren’t open yet — check back soon."
              className="btn btn-ink"
            >
              Pilot the first course
            </SmartLink>
            <SmartLink
              href={SITE.contactUrl}
              notice="A contact route isn’t connected yet — check back soon."
              className="btn btn-ink-outline"
            >
              Talk to us
            </SmartLink>
          </div>
        </div>
      </section>

      {/* ── Which door first ── */}
      <section className="section which" aria-labelledby="which-title">
        <div className="wrap">
          <h2 id="which-title" className="display-2">
            Which door first?
          </h2>
          <ul className="which__row">
            {courses.map(c => (
              <li key={c.id} data-accent={c.accent}>
                <Link to={`/courses/${c.id}`} className="which__item">
                  <span className="which__thumb">
                    <span className="which__thumb-clip" style={{ display: 'block' }}>
                      <img src={c.image} alt="" width="765" height="667" loading="lazy" />
                    </span>
                  </span>
                  <span className="which__name">{c.world}</span>
                  <span className="which__status">{c.statusLabel}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
