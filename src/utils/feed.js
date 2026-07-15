import financeCards from '../data/finance.json';
import electronicsCards from '../data/electronics.json';
import roboticsCards from '../data/robotics.json';
import financeL2Cards from '../data/financeL2.json';
import electronicsL2Cards from '../data/electronicsL2.json';
import roboticsL2Cards from '../data/roboticsL2.json';

export const ALL_CARDS = [
  ...financeCards,
  ...electronicsCards,
  ...roboticsCards,
  ...financeL2Cards,
  ...electronicsL2Cards,
  ...roboticsL2Cards,
];

// Learn this many Beginner lessons in a channel to unlock its Intermediate tier.
export const UNLOCK_THRESHOLD = 6;

export function getCardsByChannel(channel) {
  return ALL_CARDS.filter(card => card.channel === channel);
}

/**
 * Progression state for a channel: how far along the Beginner tier the user
 * is, and whether the Intermediate tier is unlocked.
 */
export function getUnlockState(channel, progress) {
  const beginnerLessons = ALL_CARDS.filter(
    c => c.channel === channel && c.type === 'lesson' && c.level === 'Beginner'
  );
  const learned = beginnerLessons.filter(c =>
    progress.learnedCardIds.includes(c.id)
  ).length;
  const unlocked = learned >= UNLOCK_THRESHOLD;
  return {
    unlocked,
    learned,
    threshold: UNLOCK_THRESHOLD,
    remaining: Math.max(0, UNLOCK_THRESHOLD - learned),
  };
}

/** Cards the user can currently see in a channel (locked tiers filtered out). */
export function getUnlockedCards(channel, progress) {
  const { unlocked } = getUnlockState(channel, progress);
  return getCardsByChannel(channel).filter(
    c => c.level === 'Beginner' || unlocked
  );
}

export function getMixedFeed(viewedCardIds = [], progress = null) {
  const channels = ['Finance', 'Electronics', 'Robotics'];
  let feed = [];

  channels.forEach(channel => {
    const cards = progress
      ? getUnlockedCards(channel, progress)
      : getCardsByChannel(channel).filter(c => c.level === 'Beginner');
    feed.push(...cards);
  });

  const unviewed = feed.filter(c => !viewedCardIds.includes(c.id));
  const viewed = feed.filter(c => viewedCardIds.includes(c.id));

  return [...shuffle(unviewed), ...shuffle(viewed)];
}

export function getChannelFeed(channel, viewedCardIds = [], progress = null) {
  const cards = progress
    ? getUnlockedCards(channel, progress)
    : getCardsByChannel(channel).filter(c => c.level === 'Beginner');
  const unviewed = cards.filter(c => !viewedCardIds.includes(c.id));
  const viewed = cards.filter(c => viewedCardIds.includes(c.id));
  return [...unviewed, ...viewed];
}

export function getContinueFeed(viewedCardIds = []) {
  const unviewed = ALL_CARDS.filter(c => !viewedCardIds.includes(c.id));
  return unviewed.length > 0 ? unviewed : ALL_CARDS;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const CHANNEL_CONFIG = {
  Finance: {
    color: 'emerald',
    accent: '#10b981',
    accentLight: 'rgba(16,185,129,0.12)',
    accentBorder: 'rgba(16,185,129,0.3)',
    gradient: 'from-emerald-900/40 to-emerald-950/20',
    icon: '💰',
    description: 'Financial freedom starts with financial literacy.',
  },
  Electronics: {
    color: 'blue',
    accent: '#3b82f6',
    accentLight: 'rgba(59,130,246,0.12)',
    accentBorder: 'rgba(59,130,246,0.3)',
    gradient: 'from-blue-900/40 to-blue-950/20',
    icon: '⚡',
    description: 'Understand the language of circuits and components.',
  },
  Robotics: {
    color: 'purple',
    accent: '#a855f7',
    accentLight: 'rgba(168,85,247,0.12)',
    accentBorder: 'rgba(168,85,247,0.3)',
    gradient: 'from-purple-900/40 to-purple-950/20',
    icon: '🤖',
    description: 'Build machines that sense, decide, and act.',
  },
};
