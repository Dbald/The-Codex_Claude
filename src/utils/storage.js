const STORAGE_KEY = 'codex_progress';

const defaultProgress = {
  savedCardIds: [],
  learnedCardIds: [],
  completedChallengeIds: [],
  quizResults: [],
  viewedCardIds: [],
  // Where you stopped in each feed, e.g. { Finance: 7, Mixed: 3 }
  feedPositions: {},
  streak: {
    current: 0,
    lastActiveDate: null,
  },
};

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultProgress };
    return { ...defaultProgress, ...JSON.parse(raw) };
  } catch {
    return { ...defaultProgress };
  }
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // storage full or unavailable
  }
}

export function clearProgress() {
  localStorage.removeItem(STORAGE_KEY);
}
