import { useState } from 'react';
import { CHANNEL_CONFIG } from '../utils/feed.js';
import CardVisual from './CardVisual.jsx';
import Celebration from './Celebration.jsx';
import { playSound } from '../utils/sound.js';

export default function ChallengeCard({ card, progress, settings, onSave, onComplete }) {
  const config = CHANNEL_CONFIG[card.channel];
  const isSaved = progress.savedCardIds.includes(card.id);
  const isCompleted = progress.completedChallengeIds.includes(card.id);

  const [checkedSteps, setCheckedSteps] = useState(() => new Set());
  const [burst, setBurst] = useState(null);

  const steps = card.steps || [];
  const allStepsChecked = steps.length > 0 && checkedSteps.size === steps.length;

  function toggleStep(i) {
    setCheckedSteps(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
    playSound('check');
  }

  function handleComplete() {
    if (!isCompleted) {
      setBurst(Date.now());
      playSound('complete');
    }
    onComplete(card.id);
  }

  return (
    <article
      aria-label={`Challenge: ${card.title}`}
      className="relative flex flex-col rounded-2xl overflow-hidden border"
      style={{ borderColor: config.accentBorder, background: 'var(--surface)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-2">
        <div
          className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
          style={{ background: config.accentLight, color: config.accent }}
        >
          <span aria-hidden="true">{config.icon}</span>
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

      {/* Visual */}
      <CardVisual card={card} />

      {/* Title */}
      <div className="px-5 pt-3 pb-3">
        <h2 className="text-xl font-bold text-white leading-tight">{card.title}</h2>
      </div>

      {/* Prompt */}
      <div className="px-5 pb-4">
        <div className="bg-slate-800/50 rounded-xl px-4 py-4 border border-slate-700/40">
          <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2">Your Mission</p>
          <p className="text-slate-200 text-base leading-relaxed whitespace-pre-line">{card.prompt}</p>
        </div>
      </div>

      {/* Step-by-step breakdown */}
      {steps.length > 0 && (
        <div className="px-5 pb-4">
          <div
            className="rounded-xl px-4 py-4 border"
            style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Break it down</p>
              <span className="text-xs font-semibold" style={{ color: config.accent }}>
                {checkedSteps.size}/{steps.length}
              </span>
            </div>
            <ol className="flex flex-col gap-2">
              {steps.map((step, i) => {
                const checked = checkedSteps.has(i);
                return (
                  <li key={i}>
                    <button
                      onClick={() => toggleStep(i)}
                      aria-pressed={checked}
                      className="w-full flex items-start gap-3 text-left px-3 py-2.5 rounded-lg transition-all duration-200"
                      style={{
                        minHeight: 44,
                        background: checked ? config.accentLight : 'rgba(255,255,255,0.03)',
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="flex-shrink-0 flex items-center justify-center rounded-full text-xs font-bold transition-all duration-200 mt-0.5"
                        style={{
                          width: 24,
                          height: 24,
                          background: checked ? config.accent : 'rgba(255,255,255,0.08)',
                          color: checked ? '#fff' : 'var(--muted)',
                        }}
                      >
                        {checked ? '✓' : i + 1}
                      </span>
                      <span
                        className="text-sm leading-relaxed transition-all duration-200"
                        style={{
                          color: checked ? config.accent : '#cbd5e1',
                          textDecoration: checked ? 'line-through' : 'none',
                          opacity: checked ? 0.75 : 1,
                        }}
                      >
                        {step}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
            {/* Permanently-mounted live region — screen readers only announce
                changes inside a region that already exists in the DOM */}
            <p aria-live="polite" className="mt-3 text-sm font-semibold text-center" style={{ color: config.accent, minHeight: allStepsChecked && !isCompleted ? undefined : 0, margin: allStepsChecked && !isCompleted ? undefined : 0 }}>
              {allStepsChecked && !isCompleted ? 'All steps done — hit Mark Complete! 🎉' : ''}
            </p>
          </div>
        </div>
      )}

      {/* Why it matters */}
      {card.whyItMatters && (
        <div className="px-5 pb-4">
          <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Why It Matters</p>
          <p className="text-slate-400 text-sm leading-relaxed">{card.whyItMatters}</p>
        </div>
      )}

      {/* Completion criteria */}
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

      {/* Actions */}
      <div className="relative flex gap-3 px-5 py-4 border-t border-slate-800">
        <Celebration burstKey={burst} />
        <button
          onClick={() => { playSound(isSaved ? 'unsave' : 'save'); onSave(card.id); }}
          aria-pressed={isSaved}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
          style={{
            minHeight: 44,
            background: isSaved ? config.accentLight : 'rgba(255,255,255,0.05)',
            color: isSaved ? config.accent : '#94a3b8',
            border: `1px solid ${isSaved ? config.accentBorder : 'transparent'}`,
          }}
        >
          {isSaved ? '★ Saved' : '☆ Save'}
        </button>
        <button
          onClick={handleComplete}
          aria-pressed={isCompleted}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${isCompleted ? 'pop' : ''}`}
          style={{
            minHeight: 44,
            background: isCompleted ? config.accent : 'rgba(251,146,60,0.15)',
            color: isCompleted ? '#fff' : '#fb923c',
            border: `1px solid ${isCompleted ? 'transparent' : 'rgba(251,146,60,0.3)'}`,
          }}
        >
          {isCompleted ? '✓ Completed' : 'Mark Complete'}
        </button>
      </div>
    </article>
  );
}
