import manifest from '../data/videoManifest.json';

const MUTE_KEY = 'codex_video_muted';

/** Video metadata for a card, or null if none has been recorded yet. */
export function getVideo(cardId) {
  return manifest[cardId] || null;
}

export function hasVideo(cardId) {
  return !!manifest[cardId];
}

export function videoCount() {
  return Object.keys(manifest).length;
}

/** Mute is a sticky viewing preference, the way it is in every short-video app. */
export function loadMuted() {
  try {
    const raw = localStorage.getItem(MUTE_KEY);
    return raw === null ? true : raw === 'true';
  } catch {
    return true;
  }
}

export function saveMuted(muted) {
  try {
    localStorage.setItem(MUTE_KEY, String(muted));
  } catch {
    // storage unavailable
  }
}
