import { useEffect, useState } from 'react';

// A deliberately small history router. The site needs shareable URLs — a
// teacher sending /courses/ocean-explorer to a class — but not nested routes,
// loaders or transitions, so this stays dependency-free.

const listeners = new Set();

// Bumped on every navigation, so re-selecting the same in-page anchor (already
// at /#worlds but scrolled away) still re-runs scroll handling.
let navKey = 0;

function notify() {
  navKey += 1;
  for (const fn of listeners) fn();
}

if (typeof window !== 'undefined') {
  window.addEventListener('popstate', notify);
}

export function navigate(to, { replace = false } = {}) {
  const url = new URL(to, window.location.href);
  const current = window.location.pathname + window.location.search + window.location.hash;
  const next = url.pathname + url.search + url.hash;
  if (next !== current) {
    window.history[replace ? 'replaceState' : 'pushState']({}, '', next);
  } else if (!url.hash) {
    return;
  }
  notify();
}

function read() {
  return { pathname: window.location.pathname, hash: window.location.hash, key: navKey };
}

/** Current location; re-renders on navigate() and on back/forward. */
export function useLocation() {
  const [loc, setLoc] = useState(read);
  useEffect(() => {
    const update = () => setLoc(read());
    listeners.add(update);
    return () => listeners.delete(update);
  }, []);
  return loc;
}

export function isInternal(href) {
  return typeof href === 'string' && href.startsWith('/') && !href.startsWith('//');
}

/**
 * An anchor that routes internally without a page load, while staying a real
 * link: middle-click, cmd/ctrl-click and "open in new tab" all still work.
 */
export function Link({ to, onClick, children, ...rest }) {
  function handleClick(e) {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (!isInternal(to)) return;
    e.preventDefault();
    navigate(to);
  }
  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
