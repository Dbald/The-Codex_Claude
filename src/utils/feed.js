import financeCards from '../data/finance.json';
import electronicsCards from '../data/electronics.json';
import roboticsCards from '../data/robotics.json';

export const ALL_CARDS = [...financeCards, ...electronicsCards, ...roboticsCards];

export function getCardsByChannel(channel) {
  return ALL_CARDS.filter(card => card.channel === channel);
}

export function getMixedFeed(viewedCardIds = []) {
  const channels = ['Finance', 'Electronics', 'Robotics'];
  let feed = [];

  channels.forEach(channel => {
    const cards = getCardsByChannel(channel);
    feed.push(...cards);
  });

  const unviewed = feed.filter(c => !viewedCardIds.includes(c.id));
  const viewed = feed.filter(c => viewedCardIds.includes(c.id));

  return [...shuffle(unviewed), ...shuffle(viewed)];
}

export function getChannelFeed(channel, viewedCardIds = []) {
  const cards = getCardsByChannel(channel);
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
