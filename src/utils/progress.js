import { loadProgress, saveProgress } from './storage.js';

export function markCardViewed(cardId) {
  const progress = loadProgress();
  if (!progress.viewedCardIds.includes(cardId)) {
    progress.viewedCardIds.push(cardId);
  }
  updateStreak(progress);
  saveProgress(progress);
  return progress;
}

export function toggleSaved(cardId) {
  const progress = loadProgress();
  if (progress.savedCardIds.includes(cardId)) {
    progress.savedCardIds = progress.savedCardIds.filter(id => id !== cardId);
  } else {
    progress.savedCardIds.push(cardId);
  }
  saveProgress(progress);
  return progress;
}

export function markLearned(cardId) {
  const progress = loadProgress();
  if (!progress.learnedCardIds.includes(cardId)) {
    progress.learnedCardIds.push(cardId);
  }
  updateStreak(progress);
  saveProgress(progress);
  return progress;
}

export function markChallengeComplete(cardId) {
  const progress = loadProgress();
  if (!progress.completedChallengeIds.includes(cardId)) {
    progress.completedChallengeIds.push(cardId);
  }
  updateStreak(progress);
  saveProgress(progress);
  return progress;
}

export function recordQuizResult(cardId, selectedAnswer, isCorrect) {
  const progress = loadProgress();
  const existing = progress.quizResults.findIndex(r => r.cardId === cardId);
  const result = {
    cardId,
    selectedAnswer,
    isCorrect,
    completedAt: new Date().toISOString(),
  };
  if (existing >= 0) {
    progress.quizResults[existing] = result;
  } else {
    progress.quizResults.push(result);
  }
  updateStreak(progress);
  saveProgress(progress);
  return progress;
}

function updateStreak(progress) {
  const today = new Date().toDateString();
  const last = progress.streak.lastActiveDate;

  if (last === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const wasYesterday = last === yesterday.toDateString();

  if (wasYesterday) {
    progress.streak.current += 1;
  } else if (last !== today) {
    progress.streak.current = 1;
  }

  progress.streak.lastActiveDate = today;
}

export function getChannelStats(progress, allCards) {
  const channels = ['Finance', 'Electronics', 'Robotics'];
  return channels.map(channel => {
    const channelCards = allCards.filter(c => c.channel === channel);
    const total = channelCards.length;
    const learned = channelCards.filter(c =>
      c.type === 'lesson' && progress.learnedCardIds.includes(c.id)
    ).length;
    const quizzed = channelCards.filter(c =>
      c.type === 'quiz' && progress.quizResults.some(r => r.cardId === c.id)
    ).length;
    const challenged = channelCards.filter(c =>
      c.type === 'challenge' && progress.completedChallengeIds.includes(c.id)
    ).length;
    return { channel, total, learned, quizzed, challenged };
  });
}
