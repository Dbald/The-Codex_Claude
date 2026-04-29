import { useState } from 'react';
import { CHANNEL_CONFIG } from '../utils/feed.js';
import CardVisual from './CardVisual.jsx';

export default function QuizCard({ card, progress, onSave, onAnswer }) {
  const config = CHANNEL_CONFIG[card.channel];
  const isSaved = progress.savedCardIds.includes(card.id);
  const existingResult = progress.quizResults.find(r => r.cardId === card.id);

  const [selected, setSelected] = useState(existingResult?.selectedAnswer ?? null);
  const [revealed, setRevealed] = useState(!!existingResult);

  function handleSelect(option) {
    if (revealed) return;
    setSelected(option);
    setRevealed(true);
    onAnswer(card.id, option, option === card.answer);
  }

  const isCorrect = selected === card.answer;

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
            style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24' }}
          >
            Quiz
          </span>
        </div>
      </div>

      <CardVisual card={card} />

      <div className="px-5 pt-3 pb-4">
        <h2 className="text-lg font-bold text-white leading-tight">{card.question}</h2>
      </div>

      <div className="px-5 pb-4 flex flex-col gap-2.5">
        {card.options.map((option, i) => {
          let borderColor = 'rgba(255,255,255,0.08)';
          let bg = 'rgba(255,255,255,0.03)';
          let textColor = '#94a3b8';

          if (revealed) {
            if (option === card.answer) {
              borderColor = '#10b981';
              bg = 'rgba(16,185,129,0.12)';
              textColor = '#10b981';
            } else if (option === selected && option !== card.answer) {
              borderColor = '#ef4444';
              bg = 'rgba(239,68,68,0.12)';
              textColor = '#ef4444';
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
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border"
              style={{ borderColor, background: bg, color: textColor }}
            >
              <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
              {option}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div
          className="mx-5 mb-4 px-4 py-3 rounded-xl text-sm"
          style={{
            background: isCorrect ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
            border: `1px solid ${isCorrect ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
          }}
        >
          <p className="font-bold mb-1" style={{ color: isCorrect ? '#10b981' : '#ef4444' }}>
            {isCorrect ? '✓ Correct!' : '✗ Not quite.'}
          </p>
          <p className="text-slate-400 leading-relaxed">{card.explanation}</p>
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
      </div>
    </div>
  );
}
