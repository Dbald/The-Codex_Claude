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

const TIERS = ['Beginner', 'Intermediate'];
const byId = (a, b) => a.id.localeCompare(b.id);

/**
 * Fixed curriculum order: within each tier, a quiz lands after every second
 * lesson, then that tier's challenges close it out.
 *
 * This is deliberately deterministic — it never depends on what has been
 * viewed or learned. A feed that reorders itself between visits makes it
 * impossible to know how far along you are, or to pick up where you stopped.
 */
function curriculumOrder(cards) {
  const out = [];
  for (const tier of TIERS) {
    const tierCards = cards.filter(c => c.level === tier);
    const lessons = tierCards.filter(c => c.type === 'lesson').sort(byId);
    const quizzes = tierCards.filter(c => c.type === 'quiz').sort(byId);
    const challenges = tierCards.filter(c => c.type === 'challenge').sort(byId);

    let q = 0;
    lessons.forEach((lesson, i) => {
      out.push(lesson);
      if ((i + 1) % 2 === 0 && q < quizzes.length) out.push(quizzes[q++]);
    });
    while (q < quizzes.length) out.push(quizzes[q++]);
    out.push(...challenges);
  }
  return out;
}

function availableCards(channel, progress) {
  return progress
    ? getUnlockedCards(channel, progress)
    : getCardsByChannel(channel).filter(c => c.level === 'Beginner');
}

export function getChannelFeed(channel, progress = null) {
  return curriculumOrder(availableCards(channel, progress));
}

/** Mixed rotates the three channels in a fixed round-robin — varied, but stable. */
export function getMixedFeed(progress = null) {
  const lanes = ['Finance', 'Electronics', 'Robotics'].map(ch =>
    curriculumOrder(availableCards(ch, progress))
  );
  const out = [];
  const longest = Math.max(...lanes.map(l => l.length));
  for (let i = 0; i < longest; i++) {
    for (const lane of lanes) {
      if (lane[i]) out.push(lane[i]);
    }
  }
  return out;
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
