import { Link } from '../../utils/router.jsx';
import { SITE } from '../../config/site.js';
import SmartLink from './SmartLink.jsx';

export function doorLabel(course) {
  return `Door ${String(course.door).padStart(2, '0')} · ${course.subject}`;
}

/** One of the three arched doors on the homepage. */
export default function DoorCard({ course }) {
  const overview = `/courses/${course.id}`;
  const filled = course.status === 'first-course';

  return (
    <article className="door" data-accent={course.accent}>
      <Link to={overview} className="door__frame arch" tabIndex={-1} aria-hidden="true">
        <img src={course.image} alt="" width="765" height="667" loading="lazy" />
      </Link>

      <div className="door__meta">
        <span className="eyebrow">{doorLabel(course)}</span>
        <span className={`badge${filled ? ' badge--filled' : ''}`}>{course.statusLabel}</span>
      </div>

      <h3 className="display-3">
        <Link to={overview}>{course.world}</Link>
      </h3>
      <p className="door__summary">{course.summary}</p>
      <p className="door__world">{course.worldSummary}</p>

      <SmartLink href={SITE.worlds[course.id]} fallback={overview} className="text-link">
        {course.worldCta}
        <span className="arrow" aria-hidden="true">
          →
        </span>
      </SmartLink>
    </article>
  );
}
