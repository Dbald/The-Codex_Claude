import { CHANNEL_CONFIG } from '../utils/feed.js';

export default function LessonCard({ card, progress, onSave, onLearn }) {
  const config = CHANNEL_CONFIG[card.channel];
  const isSaved = progress.savedCardIds.includes(card.id);
  const isLearned = progress.learnedCardIds.includes(card.id);

  return (
    <div
      className={`relative flex flex-col rounded-2xl overflow-hidden border bg-gradient-to-b ${config.gradient}`}
      style={{ borderColor: config.accentBorder, background: '#111118' }}
    >
      <div className="flex items-center justify-between px-5 pt-5 pb-2">
        <div
          className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
          style={{ background: config.accentLight, color: config.accent }}
        >
          <span>{config.icon}</span>
          <span>{card.channel}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-slate-500 uppercase tracking-widest">{card.level}</span>
          {isLearned && (
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: config.accentLight, color: config.accent }}>
              ✓ Learned
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 px-5 pb-2">
        <h2 className="text-xl font-bold text-white mb-3 leading-tight">{card.title}</h2>

        <div
          className="text-base font-semibold mb-4 px-4 py-3 rounded-xl border-l-4"
          style={{ borderColor: config.accent, background: config.accentLight, color: config.accent }}
        >
          {card.hook}
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Explanation</p>
          <p className="text-slate-200 text-base leading-relaxed">{card.explanation}</p>
        </div>

        {card.example && (
          <div className="mb-4 bg-slate-800/60 rounded-xl px-4 py-3 border border-slate-700/50">
            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Example</p>
            <p className="text-slate-300 text-sm leading-relaxed">{card.example}</p>
          </div>
        )}

        {card.whyItMatters && (
          <div className="mb-4">
            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Why It Matters</p>
            <p className="text-slate-300 text-sm leading-relaxed">{card.whyItMatters}</p>
          </div>
        )}

        {card.challenge && (
          <div className="mb-2 bg-slate-900/60 rounded-xl px-4 py-3 border border-slate-700/30">
            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Quick Challenge</p>
            <p className="text-slate-400 text-sm leading-relaxed italic">{card.challenge}</p>
          </div>
        )}
      </div>

      <div className="flex gap-3 px-5 py-4 border-t border-slate-800">
        <button
          onClick={() => onSave(card.id)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
          style={{
            background: isSaved ? config.accentLight : 'rgba(255,255,255,0.05)',
            color: isSaved ? config.accent : '#94a3b8',
            border: `1px solid ${isSaved ? config.accentBorder : 'transparent'}`,
          }}
        >
          {isSaved ? '★ Saved' : '☆ Save'}
        </button>
        <button
          onClick={() => onLearn(card.id)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
          style={{
            background: isLearned ? config.accent : 'rgba(255,255,255,0.05)',
            color: isLearned ? '#fff' : '#94a3b8',
          }}
        >
          {isLearned ? '✓ Learned' : 'Mark Learned'}
        </button>
      </div>
    </div>
  );
}
