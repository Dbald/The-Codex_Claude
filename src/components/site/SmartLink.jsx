import { Link, isInternal, isSameSite } from '../../utils/router.jsx';
import { showNotice } from '../../utils/notice.js';
import { playSound } from '../../utils/sound.js';

/**
 * Renders the right kind of control for a destination that may not exist yet.
 *
 *  - app route          → client-side Link
 *  - same-site page     → ordinary link (e.g. the static early-access form)
 *  - another site       → new-tab link, announced to screen readers
 *  - nothing at all     → falls back to `fallback` if given, otherwise a button
 *                         that says the link isn't connected yet
 *
 * This is what keeps the site free of dead links and invented URLs while
 * destinations are still being wired up.
 */
export default function SmartLink({ href, fallback, notice, className, children, ...rest }) {
  const target = href || fallback || null;
  const tap = () => playSound('tap');

  if (!target) {
    return (
      <button
        type="button"
        className={className}
        onClick={() => {
          tap();
          showNotice(notice || 'This link isn’t connected yet — check back soon.');
        }}
        {...rest}
      >
        {children}
      </button>
    );
  }

  if (isInternal(target)) {
    return (
      <Link to={target} className={className} onClick={tap} {...rest}>
        {children}
      </Link>
    );
  }

  if (isSameSite(target)) {
    return (
      <a href={target} className={className} onClick={tap} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <a href={target} className={className} target="_blank" rel="noopener noreferrer" onClick={tap} {...rest}>
      {children}
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}
