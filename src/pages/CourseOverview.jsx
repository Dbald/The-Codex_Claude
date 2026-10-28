import courses from '../data/courses.json';
import { SITE } from '../config/site.js';
import { Link } from '../utils/router.jsx';
import SmartLink from '../components/site/SmartLink.jsx';
import { doorLabel } from '../components/site/DoorCard.jsx';
import NotFound from './NotFound.jsx';

const PENDING_REVIEW = 'To be confirmed with the educator reviewer';

function Fact({ label, value }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd className={value ? undefined : 'pending'}>{value || PENDING_REVIEW}</dd>
    </div>
  );
}

function minutes([lo, hi]) {
  return lo === hi ? `About ${lo} minutes` : `${lo}–${hi} minutes`;
}

export default function CourseOverview({ courseId }) {
  const course = courses.find(c => c.id === courseId);
  if (!course) return <NotFound />;

  const worldUrl = SITE.worlds[course.id];
  const hasCourse = Boolean(course.courseTitle);
  const filled = course.status === 'first-course';
  const worldNotice = `The ${course.world} world isn’t linked yet — check back soon.`;

  return (
    <div data-accent={course.accent}>
      <div className="wrap">
        <nav aria-label="Breadcrumb" className="crumbs">
          <Link to="/#worlds">Worlds</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{course.world}</span>
        </nav>

        <section className="course-hero" aria-labelledby="course-title">
          <div className="door__frame arch">
            <img src={course.image} alt={course.imageAlt} width="765" height="667" />
          </div>

          <div>
            <p className="eyebrow">{doorLabel(course)}</p>
            <h1 id="course-title" className="display-1">
              {hasCourse ? course.courseTitle : course.world}
            </h1>
            <div className="badge-row">
              <span className={`badge${filled ? ' badge--filled' : ''}`}>{course.statusLabel}</span>
              {course.review === 'draft' && <span className="badge badge--draft">Draft · awaiting educator review</span>}
            </div>
            <p className="lead" style={{ marginTop: '1.25rem' }}>
              {hasCourse ? course.intro : course.summary}
            </p>
            {!hasCourse && <p className="lead" style={{ marginTop: '0.75rem' }}>{course.worldSummary}</p>}
            <div className="cta-row">
              <SmartLink href={worldUrl} notice={worldNotice} className="btn btn-primary">
                {hasCourse ? 'Explore the world' : course.worldCta} <span className="arrow" aria-hidden="true">→</span>
              </SmartLink>
              {hasCourse ? (
                <Link to="/#worlds" className="btn btn-ghost">
                  All worlds
                </Link>
              ) : (
                <Link to="/courses/ocean-explorer" className="btn btn-ghost">
                  Start with Ocean Explorer
                </Link>
              )}
            </div>
          </div>
        </section>
      </div>

      {hasCourse ? (
        <>
          <div className="wrap">
            <dl className="facts">
              <Fact label="Estimated time" value={minutes(course.estimatedMinutes)} />
              <Fact label="Who it’s for" value={course.audience} />
              <Fact label="Format" value="Video lessons · 3D world · checks" />
              <Fact label="Prior knowledge" value={course.prerequisites} />
            </dl>
          </div>

          <div className="wrap course-body">
            <div className="callout">
              <strong>Lessons are in production.</strong> This page describes the planned course. Lessons, videos and
              checks open as each one is reviewed, so nothing here should be read as a finished course yet.
            </div>

            <section className="course-block" aria-labelledby="obj-title">
              <h2 id="obj-title">What you’ll be able to do</h2>
              <ol className="objectives">
                {course.objectives.map(o => (
                  <li key={o}>{o}</li>
                ))}
              </ol>
            </section>

            <section className="course-block" aria-labelledby="outline-title">
              <h2 id="outline-title">Course outline</h2>
              <ol className="lesson-outline">
                {course.lessons.map((lesson, i) => (
                  <li key={lesson.title}>
                    <div className="lesson-head">
                      <span className="lesson-num">Lesson {String(i + 1).padStart(2, '0')}</span>
                      <strong>{lesson.title}</strong>
                      <span className="lesson-obj">Objective {String(lesson.objective + 1).padStart(2, '0')}</span>
                    </div>
                    <p>{lesson.activity}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="course-block" aria-labelledby="world-title">
              <h2 id="world-title">Inside the world, you…</h2>
              <ol className="inside-list" style={{ maxWidth: '36rem' }}>
                {course.insideTheWorld.map((step, i) => (
                  <li key={step.verb}>
                    <span className="num" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="verb">{step.verb}</span>
                    <span className="detail">{step.detail}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="course-block" aria-labelledby="completion-title">
              <h2 id="completion-title">How completion works</h2>
              <p>
                Finishing the activities and meeting the assessment are tracked separately — opening the 3D world counts
                as a visit, never as a passed activity. Where an answer needs a person’s judgment, it’s marked as
                awaiting review rather than scored automatically.
              </p>
              <p style={{ marginTop: '0.75rem' }}>
                <strong style={{ color: 'var(--yellow)' }}>Scoring rule:</strong> {course.completionRule || PENDING_REVIEW}.
              </p>
            </section>

            <section className="course-block" aria-labelledby="access-title">
              <h2 id="access-title">Before you start</h2>
              <ul className="plain-list">
                {course.access.map(a => (
                  <li key={a}>{a}</li>
                ))}
                <li>
                  Progress is saved in this browser on this device only. <Link to="/your-data" className="text-link" style={{ minHeight: 0 }}>How your data is handled</Link>
                </li>
              </ul>
            </section>

            <section className="course-block" aria-labelledby="help-title">
              <h2 id="help-title">Need help?</h2>
              <p>If something doesn’t load or work the way it should, tell us so it can be fixed.</p>
              <div className="cta-row" style={{ marginTop: '1rem' }}>
                <SmartLink
                  href={SITE.contactUrl}
                  notice="A problem-report route isn’t connected yet — check back soon."
                  className="btn btn-ghost"
                >
                  Report a problem
                </SmartLink>
              </div>
            </section>
          </div>
        </>
      ) : (
        <div className="wrap course-body">
          <div className="callout">
            <strong>This course hasn’t opened yet.</strong> Ocean Explorer opens first. {course.world} will follow the
            same path — clear objectives, short video lessons, the 3D world, a check with feedback, and saved progress.
          </div>
        </div>
      )}
    </div>
  );
}
