import { useState, useRef, useEffect } from 'react';
import { CHANNEL_CONFIG } from '../utils/feed.js';
import CardVisual from './CardVisual.jsx';
import Celebration from './Celebration.jsx';

export default function QuizCard({ card, progress, settings, onSave, onAnswer }) {
  const config = CHANNEL_CONFIG[card.channel];
  const isSaved = progress.savedCardIds.includes(card.id);
  const existingResult = progress.quizResults.find(r => r.cardId === card.id);

  const [selected, setSelected] = useState(existingResult?.selectedAnswer ?? null);
  const [revealed, setRevealed] = useState(!!existingResult);
  const [showHint, setShowHint] = useState(false);
  const [burst, setBurst] = useState(null);
  const [attempt, setAttempt] = useState(0);

  const isCorrect = selected === card.answer;
  const explanation = settings?.simpleMode && card.simpleExplanation ? card.simpleExplanation : card.explanation;

  const resultRef = useRef(null);
  const optionsRef = useRef(null);
  const interactedRef = useRef(false);

  // Answering disables the focused option button, which would silently drop
  // keyboard focus to <body> — move it to the result instead. On retry, move
  // it back to the first option.
  useEffect(() => {
    if (!interactedRef.current) return;
    if (revealed) {
      resultRef.current?.focus();
    } else {
      optionsRef.current?.querySelector('button')?.focus();
    }
  }, [revealed, attempt]);

  function handleSelect(option) {
    if (revealed) return;
    interactedRef.current = true;
    setSelected(option);
    setRevealed(true);
    if (option === card.answer) setBurst(Date.now());
    onAnswer(card.id, option, option === card.answer);
  }

  function handleRetry() {
    interactedRef.current = true;
    setSelected(null);
    setRevealed(false);
    setShowHint(false);
    setAttempt(a => a + 1);
  }

  return (
    <article
      aria-label={`Quiz: ${card.question}`}
      className="relative flex flex-col rounded-2xl overflow-hidden border"
      style={{ borderColor: config.accentBorder, background: '#111118' }}
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
            style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24' }}
          >
            Quiz
          </span>
        </div>
      </div>

      {/* Visual */}
      <CardVisual card={card} />

      {/* Question */}
      <div className="px-5 pt-3 pb-3">
        <h2 className="text-lg font-bold text-white leading-tight">{card.question}</h2>
      </div>

      {/* Hint — the toggle stays mounted and the hint lands in a persistent
          live region so screen readers actually announce it */}
      {card.hint && !revealed && (
        <div className="px-5 pb-3">
          <button
            onClick={() => setShowHint(v => !v)}
            aria-expanded={showHint}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200"
            style={{
              minHeight: 40,
              background: 'rgba(251,191,36,0.08)',
              color: '#fbbf24',
              border: '1px solid rgba(251,191,36,0.25)',
            }}
          >
            <span aria-hidden="true">💡</span> {showHint ? 'Hide hint' : 'Need a hint?'}
          </button>
          <div aria-live="polite">
            {showHint && (
              <div
                className="mt-2 px-4 py-3 rounded-xl text-sm leading-relaxed"
                style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.25)', color: '#fde68a' }}
              >
                <span aria-hidden="true">💡 </span>{card.hint}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Options */}
      <div key={attempt} ref={optionsRef} role="group" aria-label="Answer choices" className="px-5 pb-4 flex flex-col gap-2.5">
        {card.options.map((option, i) => {
          let borderColor = 'rgba(255,255,255,0.08)';
          let bg = 'rgba(255,255,255,0.03)';
          let textColor = '#94a3b8';
          let anim = '';

          if (revealed) {
            if (option === card.answer) {
              borderColor = '#10b981';
              bg = 'rgba(16,185,129,0.12)';
              textColor = '#10b981';
              if (option === selected) anim = 'pop';
            } else if (option === selected && option !== card.answer) {
              borderColor = '#ef4444';
              bg = 'rgba(239,68,68,0.12)';
              textColor = '#ef4444';
              anim = 'shake';
            }
          } else if (selected === option) {
            borderColor = config.accent;
            bg = config.accentLight;
            textColor = config.accent;
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(option)}
              disabled={revealed}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border ${anim}`}
              style={{ minHeight: 48, borderColor, background: bg, color: textColor }}
            >
              <span className="font-bold mr-2" aria-hidden="true">{String.fromCharCode(65 + i)}.</span>
              {option}
            </button>
          );
        })}
      </div>

      {/* Result + Explanation (live region so screen readers announce it) */}
      <div aria-live="polite" className="relative">
        <Celebration burstKey={burst} />
        {revealed && (
          <div
            ref={resultRef}
            tabIndex={-1}
            className="mx-5 mb-4 px-4 py-3 rounded-xl text-sm"
            style={{
              background: isCorrect ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
              border: `1px solid ${isCorrect ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
            }}
          >
            <p className="font-bold mb-1" style={{ color: isCorrect ? '#10b981' : '#ef4444' }}>
              {isCorrect ? '✓ Correct! Nice work.' : '✗ Not quite.'}
            </p>
            <p className="text-slate-400 leading-relaxed">{explanation}</p>
            {!isCorrect && (
              <button
                onClick={handleRetry}
                className="mt-3 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  minHeight: 44,
                  background: config.accentLight,
                  color: config.accent,
                  border: `1px solid ${config.accentBorder}`,
                }}
              >
                ↻ Try again
              </button>
            )}
          </div>
        )}
      </div>

      {/* Save button */}
      <div className="flex gap-3 px-5 py-4 border-t border-slate-800">
        <button
          onClick={() => onSave(card.id)}
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
      </div>
    </article>
  );
}
