/**
 * Interactive worlds that run inside The Codex.
 *
 * Each world is its own deployed app (shown here in a frame). It talks to the
 * Codex with postMessage — see Ocean Explorer's docs/codex-embed.md for the
 * message list. Progress from those messages is kept on this device only.
 */

const OCEAN_URL = (import.meta.env.VITE_OCEAN_EXPLORER_URL || 'https://oceanexp.netlify.app').replace(/\/$/, '');

export const WORLDS = {
  'ocean-explorer': {
    id: 'ocean-explorer',
    lesson: 'belize-living-reef',
    course: 'Exploring Reef Ecosystems',
    title: 'Belize: The Living Reef',
    world: 'Ocean Explorer',
    blurb: 'Explore a real Belize reef in 3D: who lives there, what they eat, and where they shelter.',
    src: `${OCEAN_URL}/?embed=codex&start=lesson`,
    origin: new URL(OCEAN_URL).origin,
    // Netlify deploy previews of the world, e.g. deploy-preview-2--oceanexp.netlify.app
    previewPattern: /^https:\/\/deploy-preview-\d+--oceanexp\.netlify\.app$/,
  },
};

export const WORLD_SOURCE = 'the-codex';

/** True if a message from this origin may speak for this world. */
export function isWorldOrigin(world, origin) {
  if (!origin) return false;
  if (origin === world.origin) return true;
  if (world.previewPattern?.test(origin)) return true;
  if (import.meta.env.DEV && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return true;
  return false;
}

/** Validates a message from a world. Returns null for anything we don't recognise. */
export function parseWorldEvent(data) {
  if (!data || typeof data !== 'object' || data.source !== 'ocean-explorer') return null;
  switch (data.type) {
    case 'ready':
      return { type: 'ready', labels: data.labels !== false };
    case 'step_changed':
      if (!Number.isInteger(data.index) || !Number.isInteger(data.total)) return null;
      return { type: 'step_changed', mode: String(data.mode), step: String(data.step), index: data.index, total: data.total, label: String(data.label ?? '') };
    case 'lesson_completed':
      return { type: 'lesson_completed', mode: String(data.mode) };
    case 'organism_selected':
      if (typeof data.id !== 'string') return null;
      return { type: 'organism_selected', id: data.id, title: String(data.title ?? data.id) };
    case 'prediction_recorded':
      return { type: 'prediction_recorded', choice: data.choice == null ? null : String(data.choice) };
    case 'labels_changed':
      return { type: 'labels_changed', on: data.on === true };
    default:
      return null;
  }
}

// ── Progress (this device only) ─────────────────────────────────────────────

const KEY = 'codex_worlds';

const emptyLesson = () => ({
  started: false,
  mode: null,
  step: null,
  index: 0,
  total: 0,
  label: '',
  completed: false,
  organisms: [],
  prediction: null,
  labels: true,
  updatedAt: null,
});

export function loadWorldProgress(lessonId) {
  try {
    const all = JSON.parse(localStorage.getItem(KEY) || '{}');
    return { ...emptyLesson(), ...(all[lessonId] || {}) };
  } catch {
    return emptyLesson();
  }
}

function save(lessonId, lesson) {
  try {
    const all = JSON.parse(localStorage.getItem(KEY) || '{}');
    all[lessonId] = lesson;
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    // Storage unavailable: progress lasts for this visit only.
  }
}

/** Applies a world event to saved lesson progress. Pure apart from the save. */
export function applyWorldEvent(lessonId, lesson, ev) {
  const next = { ...lesson, updatedAt: new Date().toISOString() };
  switch (ev.type) {
    case 'step_changed':
      if (ev.mode !== 'lesson') return lesson;
      Object.assign(next, { started: true, mode: ev.mode, step: ev.step, index: ev.index, total: ev.total, label: ev.label });
      break;
    case 'lesson_completed':
      if (ev.mode !== 'lesson') return lesson;
      next.completed = true;
      break;
    case 'organism_selected':
      if (lesson.organisms.some(o => o.id === ev.id)) return lesson;
      next.organisms = [...lesson.organisms, { id: ev.id, title: ev.title }];
      break;
    case 'prediction_recorded':
      next.prediction = ev.choice;
      break;
    case 'labels_changed':
      next.labels = ev.on;
      break;
    default:
      return lesson;
  }
  save(lessonId, next);
  return next;
}

export function setWorldLabels(lessonId, lesson, on) {
  const next = { ...lesson, labels: on };
  save(lessonId, next);
  return next;
}
