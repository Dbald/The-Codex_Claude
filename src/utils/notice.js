// Site-wide polite announcements, for actions that can't complete yet
// (e.g. a link that hasn't been connected). One host renders them.

const listeners = new Set();

export function showNotice(message) {
  for (const fn of listeners) fn(message);
}

export function subscribeNotice(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
