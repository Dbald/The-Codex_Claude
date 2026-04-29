import { CHANNEL_CONFIG } from '../utils/feed.js';
import CardVisual from './CardVisual.jsx';

export default function ChallengeCard({ card, progress, onSave, onComplete }) {
  const config = CHANNEL_CONFIG[card.channel];
  const isSaved = progress.savedCardIds.includes(card.id);
  const isCompleted = progress.completedChallengeIds.includes(card.id);

  return (
    <div
      className="relative flex flex-col rounded-2xl overflow-hidden border"
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
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 uppercase tracking-widest">{card.level}</span>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-semibold"
            style={{ background: 'rgba(251,146,60,0.12)', color: '#fb923c' }}
          >
            Challenge
          </span>
          {isCompleted && (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{ background: config.accentLight, color: config.accent }}
            >
              ✓ Done
            </span>
          )}
        </div>
      </div>

      <CardVisual card={card} />

      <div className="px-5 pt-3 pb-3">
        <h2 className="text-xl font-bold text-white leading-tight">{card.title}</h2>
      </div>

      <div className="px-5 pb-4">
        <div className="bg-slate-800/50 rounded-xl px-4 py-4 border border-slate-700/40">
          <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2">Your Mission</p>
          <p className="text-slate-200 text-base leading-relaxed whitespace-pre-line">{card.prompt}</p>
        </div>
      </div>

      {card.whyItMatters && (
        <div className="px-5 pb-4">
          <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Why It Matters</p>
          <p className="text-slate-400 text-sm leading-relaxed">{card.whyItMatters}</p>
        </div>
      )}

      {card.completionCriteria && (
        <div
          className="mx-5 mb-4 px-4 py-3 rounded-xl text-sm"
          style={{
            background: 'rgba(251,146,60,0.06)',
            border: '1px solid rgba(251,146,60,0.2)',
          }}
        >
          <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: '#fb923c' }}>
            Completion criteria
          </p>
          <p className="text-slate-400">{card.completionCriteria}</p>
        </div>
      )}

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
          onClick={() => onComplete(card.id)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
          style={{
            background: isCompleted ? config.accent : 'rgba(251,146,60,0.15)',
            color: isCompleted ? '#fff' : '#fb923c',
            border: `1px solid ${isCompleted ? 'transparent' : 'rgba(251,146,60,0.3)'}`,
          }}
        >
          {isCompleted ? '✓ Completed' : 'Mark Complete'}
        </button>
      </div>
    </div>
  );
}
