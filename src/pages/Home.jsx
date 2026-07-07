import ChannelCard from '../components/ChannelCard.jsx';
import { ALL_CARDS } from '../utils/feed.js';

const STAT_TILES = [
  { key: 'streak', label: 'Day streak', icon: '🔥', color: '#fb923c', bg: 'rgba(251,146,60,0.12)' },
  { key: 'viewed', label: 'Cards viewed', icon: '👁', color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
  { key: 'learned', label: 'Learned', icon: '✓', color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
];

export default function Home({ progress, onStartSession, onOpenChannel }) {
  const streak = progress.streak.current;
  const totalViewed = progress.viewedCardIds.length;
  const totalLearned = progress.learnedCardIds.length;
  const values = { streak, viewed: totalViewed, learned: totalLearned };

  const continueChannels = ['Finance', 'Electronics', 'Robotics'].filter(ch => {
    return ALL_CARDS.some(c => c.channel === ch && progress.viewedCardIds.includes(c.id));
  });

  return (
    <div className="px-4 py-6 max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-white tracking-tight leading-none mb-1">
          The Codex
        </h1>
        <p className="text-slate-400 text-sm">What are you sharpening today?</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {STAT_TILES.map(tile => (
          <div
            key={tile.key}
            className="flex flex-col items-center gap-1.5 px-2 py-4 rounded-2xl border text-center"
            style={{ background: 'var(--surface)', borderColor: 'rgba(148,163,184,0.15)' }}
          >
            <span
              aria-hidden="true"
              className={`flex items-center justify-center rounded-full text-base ${tile.key === 'streak' && streak > 0 ? 'flame-pulse' : ''}`}
              style={{ width: 34, height: 34, background: tile.bg, color: tile.color }}
            >
              {tile.icon}
            </span>
            <p className="text-2xl font-black text-white leading-none">{values[tile.key]}</p>
            <p className="text-xs text-slate-400">{tile.label}</p>
          </div>
        ))}
      </div>

      {/* Mixed feed CTA */}
      <button
        onClick={() => onStartSession()}
        className="w-full text-left rounded-2xl p-5 mb-6 hover-lift transition-all duration-200 active:scale-[0.99]"
        style={{
          background: 'linear-gradient(135deg, #5b21b6 0%, #312e81 55%, #1e2440 100%)',
          border: '1px solid rgba(167,139,250,0.4)',
          boxShadow: '0 8px 32px rgba(91,33,182,0.25)',
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-violet-300 mb-1">Today's Growth Scroll</div>
            <h2 className="text-xl font-black text-white mb-1">Mixed Feed</h2>
            <p className="text-slate-300 text-sm">Finance · Electronics · Robotics</p>
          </div>
          <div
            aria-hidden="true"
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
            style={{ background: 'rgba(167,139,250,0.25)' }}
          >
            ✦
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm font-semibold text-violet-300">Set your intention →</span>
        </div>
      </button>

      {/* Channels */}
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Learning Channels</p>
        <div className="flex flex-col gap-3">
          {['Finance', 'Electronics', 'Robotics'].map(channel => (
            <ChannelCard
              key={channel}
              channel={channel}
              progress={progress}
              onClick={() => onOpenChannel(channel)}
            />
          ))}
        </div>
      </div>

      {/* Continue learning */}
      {continueChannels.length > 0 && (
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Continue Learning</p>
          <div className="flex flex-col gap-2">
            {continueChannels.map(channel => {
              const channelCards = ALL_CARDS.filter(c => c.channel === channel);
              const unviewed = channelCards.filter(c => !progress.viewedCardIds.includes(c.id));
              return (
                <button
                  key={channel}
                  onClick={() => onOpenChannel(channel)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl border text-left hover-lift"
                  style={{ background: 'var(--surface)', borderColor: 'rgba(148,163,184,0.15)', minHeight: 48 }}
                >
                  <span className="text-sm text-slate-200 font-medium">{channel}</span>
                  <span className="text-xs text-slate-400">
                    {unviewed.length > 0 ? `${unviewed.length} cards left →` : 'All seen ✓'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="h-4" />
    </div>
  );
}
