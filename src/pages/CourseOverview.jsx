import courses from '../data/courses.json';
import { SITE } from '../config/site.js';
import { Link } from '../utils/router.jsx';
import { lessonPath, WORLDS } from '../utils/worlds.js';
import SmartLink from '../components/site/SmartLink.jsx';
import NotFound from './NotFound.jsx';

const PENDING = 'To be confirmed with the educator reviewer';

function Fact({ label, value }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd className={value ? undefined : 'pending'}>{value || PENDING}</dd>
    </div>
  );
}

const minutes = ([lo, hi]) => (lo === hi ? `About ${lo} minutes` : `${lo}–${hi} minutes per lesson`);
const tripLabel = c => `Trip ${String(c.trip).padStart(2, '0')} · ${c.place}`;
const surface = { teal: 'trip--teal on-dark', blue: 'trip--blue on-dark', orange: 'trip--orange on-orange' };

export default function CourseOverview({ courseId }) {
  const course = courses.find(c => c.id === courseId);
  if (!course) return <NotFound />;

  const hasCourse = Boolean(course.courseTitle);
  const inCodex = Boolean(WORLDS[course.id]);
  const start = inCodex ? lessonPath(course.id) : SITE.previews[course.id];
  const startNotice = `${course.world} isn’t linked from The Codex yet — check back soon.`;

  return (
    <div className="wrap">
      <nav aria-label="Breadcrumb" className="crumbs">
        <Link to="/#trips">The trips</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{course.world}</span>
      </nav>

      <section className={`trip overview-hero ${surface[course.color]}`} aria-labelledby="course-title">
        <div className="trip__media">
          <img src={course.image} alt={course.imageAlt} width="1150" height="810" />
        </div>
        <div className="trip__body">
          <div className="trip__head">
            <p className="kicker">{tripLabel(course)}</p>
            <span className={`pill ${course.color === 'orange' ? 'pill--ink' : course.status === 'open' ? 'pill--white' : 'pill--outline'}`}>
              {course.statusLabel}
            </span>
            {course.review === 'draft' && <span className="badge-draft">Draft · awaiting educator review</span>}
          </div>
          <h1 id="course-title" className="wide" style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', maxWidth: '14ch' }}>
            {hasCourse ? course.courseTitle : course.world}
          </h1>
          {hasCourse && <p className="kicker">{course.world}</p>}
          <p className="trip__text">{course.summary}</p>
          <div className="trip__actions">
            <SmartLink
              href={start}
              notice={startNotice}
              className={course.color === 'orange' ? 'btn btn-ink' : 'btn btn-white'}
            >
              {course.cta}
            </SmartLink>
            {course.ctaNote && <span className="trip__note">{course.ctaNote}</span>}
          </div>
        </div>
      </section>

      {hasCourse ? (
        <>
          <dl className="facts">
            <Fact label="Time" value={minutes(course.estimatedMinutes)} />
            <Fact label="Who it’s for" value={course.audience} />
            <Fact label="Reading level" value={course.readingLevel} />
            <Fact label="Format" value="Video lesson · 3D world · check-in" />
          </dl>

          <div className="course-body">
            <section className="course-block" aria-labelledby="lessons-title">
              <h2 id="lessons-title" className="wide">
                Lessons
              </h2>
              <ol className="lesson-list">
                {course.lessons.map((lesson, i) => {
                  const here = lesson.worldLesson && inCodex;
                  return (
                    <li key={lesson.title}>
                      <span className="title">
                        <span style={{ fontWeight: 800, marginRight: '0.6rem' }}>{String(i + 1).padStart(2, '0')}</span>
                        {lesson.title}
                      </span>
                      {here ? (
                        <>
                          <span className="state state--live">Live in The Codex</span>
                          <Link to={lessonPath(course.id)} className="btn btn-teal btn-sm">
                            Start
                          </Link>
                        </>
                      ) : lesson.state === 'live' ? (
                        <span className="state state--soon">Live in {course.world} · coming to The Codex</span>
                      ) : (
                        <span className="state state--soon">Coming next</span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </section>

            {course.lessonSteps && (
              <section className="course-block" aria-labelledby="steps-title">
                <h2 id="steps-title" className="wide">
                  Inside a lesson
                </h2>
                <ol className="steps">
                  {course.lessonSteps.map((s, i) => (
                    <li key={s}>
                      <span className="n">{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </section>
            )}

            <section className="course-block" aria-labelledby="obj-title">
              <h2 id="obj-title" className="wide">
                What you’ll be able to do
              </h2>
              <ol className="numbered">
                {course.objectives.map(o => (
                  <li key={o}>{o}</li>
                ))}
              </ol>
            </section>

            <section className="course-block" aria-labelledby="completion-title">
              <h2 id="completion-title" className="wide">
                How finishing works
              </h2>
              <p>
                Finishing the activities and showing what you learned are tracked separately — going into the 3D world
                counts as a visit, never as a passed activity. Where an answer needs a person’s judgment, it’s marked as
                waiting for review rather than scored automatically.
              </p>
              <p style={{ marginTop: '0.75rem', color: 'var(--ink)' }}>
                <strong>How it’s scored:</strong> {course.completionRule || PENDING}.
              </p>
            </section>

            <section className="course-block" aria-labelledby="access-title">
              <h2 id="access-title" className="wide">
                Before you start
              </h2>
              <ul className="plain-list">
                {course.access.map(a => (
                  <li key={a}>{a}</li>
                ))}
                <li>
                  Progress is saved in this browser, on this device only.{' '}
                  <Link to="/your-data" className="u-link" style={{ minHeight: 0, '--link': 'var(--teal)' }}>
                    How your data is handled
                  </Link>
                </li>
              </ul>
            </section>

            <section className="course-block" aria-labelledby="help-title">
              <h2 id="help-title" className="wide">
                Bringing a group?
              </h2>
              <div className="cta-row" style={{ marginTop: 0 }}>
                <SmartLink href={SITE.pilotUrl} className="btn btn-outline">
                  Pilot it with your class
                </SmartLink>
                <SmartLink href={SITE.workshopUrl} className="btn btn-outline">
                  Bring a workshop to your library
                </SmartLink>
                <SmartLink
                  href={SITE.contactUrl}
                  notice="A problem-report route isn’t connected yet — check back soon."
                  className="btn btn-outline"
                >
                  Report a problem
                </SmartLink>
              </div>
            </section>
          </div>
        </>
      ) : (
        <div className="course-body">
          <div className="callout">
            <strong>{course.statusLabel}.</strong> The reef opens first. {course.world} follows the same route — clear
            objectives, a short video lesson, the 3D world, a check-in with feedback, and saved progress.
          </div>
          <div className="cta-row" style={{ marginTop: 0 }}>
            <Link to={lessonPath('ocean-explorer')} className="btn btn-teal">
              Start at the reef <span aria-hidden="true">→</span>
            </Link>
            <SmartLink href={SITE.earlyAccessUrl} className="btn btn-outline">
              Get early access
            </SmartLink>
          </div>
        </div>
      )}
    </div>
  );
}
