import ChannelCard from '../components/ChannelCard.jsx';
import { ALL_CARDS } from '../utils/feed.js';

export default function Home({ progress, onStartSession, onOpenChannel }) {
  const streak = progress.streak.current;
  const totalViewed = progress.viewedCardIds.length;
  const totalLearned = progress.learnedCardIds.length;

  const continueChannels = ['Finance', 'Electronics', 'Robotics'].filter(ch => {
    return ALL_CARDS.some(c => c.channel === ch && progress.viewedCardIds.includes(c.id));
  });

  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-white tracking-tight leading-none mb-1">
          The Codex
        </h1>
        <p className="text-slate-500 text-sm">What are you sharpening today?</p>
      </div>

      <div
        className="flex items-center gap-4 mb-6 px-4 py-3 rounded-2xl border"
        style={{ background: '#111118', borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="flex-1">
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">Streak</p>
          <p className="text-xl font-black text-white">
            {streak > 0 ? `${streak} day${streak !== 1 ? 's' : ''}` : 'Start today'}
            {streak > 0 && <span aria-hidden="true" className="ml-1 text-base flame-pulse">🔥</span>}
          </p>
        </div>
        <div className="w-px h-8 bg-slate-800" />
        <div className="flex-1 text-center">
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">Viewed</p>
          <p className="text-xl font-black text-white">{totalViewed}</p>
        </div>
        <div className="w-px h-8 bg-slate-800" />
        <div className="flex-1 text-right">
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">Learned</p>
          <p className="text-xl font-black text-white">{totalLearned}</p>
        </div>
      </div>

      <button
        onClick={() => onStartSession()}
        className="w-full text-left rounded-2xl p-5 mb-6 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
        style={{ background: 'linear-gradient(135deg, #4c1d95 0%, #1e1b4b 60%, #0f172a 100%)', border: '1px solid rgba(167,139,250,0.3)' }}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-1">Today’s Growth Scroll</div>
            <h2 className="text-xl font-black text-white mb-1">Mixed Feed</h2>
            <p className="text-slate-400 text-sm">Finance · Electronics · Robotics</p>
          </div>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ background: 'rgba(167,139,250,0.2)' }}
          >
            ✦
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="text-xs font-semibold text-violet-400">Set your intention →</span>
        </div>
      </button>

      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Learning Channels</p>
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

      {continueChannels.length > 0 && (
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Continue Learning</p>
          <div className="flex flex-col gap-2">
            {continueChannels.map(channel => {
              const channelCards = ALL_CARDS.filter(c => c.channel === channel);
              const unviewed = channelCards.filter(c => !progress.viewedCardIds.includes(c.id));
              return (
                <button
                  key={channel}
                  onClick={() => onOpenChannel(channel)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-colors hover:border-slate-700"
                  style={{ background: '#111118', borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  <span className="text-sm text-slate-300 font-medium">{channel}</span>
                  <span className="text-xs text-slate-600">
                    {unviewed.length > 0 ? `${unviewed.length} cards left` : 'All seen ✓'}
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
