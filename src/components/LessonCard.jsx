import { useState, useEffect } from 'react';
import { CHANNEL_CONFIG } from '../utils/feed.js';
import CardVisual from './CardVisual.jsx';
import LessonWidget from './LessonWidget.jsx';
import Celebration from './Celebration.jsx';
import { speechAvailable, speak, stopSpeaking } from '../utils/speech.js';

export default function LessonCard({ card, progress, settings, onSave, onLearn }) {
  const config = CHANNEL_CONFIG[card.channel];
  const isSaved = progress.savedCardIds.includes(card.id);
  const isLearned = progress.learnedCardIds.includes(card.id);

  const hasSimple = !!card.simple;
  const [simpleView, setSimpleView] = useState(!!settings?.simpleMode && hasSimple);
  const [speaking, setSpeaking] = useState(false);
  const [burst, setBurst] = useState(null);

  // Follow the global setting when it changes
  useEffect(() => {
    if (hasSimple) setSimpleView(!!settings?.simpleMode);
  }, [settings?.simpleMode, hasSimple]);

  useEffect(() => () => stopSpeaking(card.id), [card.id]);

  const text = simpleView && hasSimple ? { ...card, ...card.simple } : card;

  function handleListen() {
    if (speaking) {
      stopSpeaking(card.id);
      setSpeaking(false);
      return;
    }
    const script = [card.title, text.hook, text.explanation, text.example && `For example: ${text.example}`, text.whyItMatters && `Why it matters: ${text.whyItMatters}`]
      .filter(Boolean)
      .join('. ');
    speak(script, () => setSpeaking(false), card.id);
    setSpeaking(true);
  }

  function handleLearn() {
    if (!isLearned) setBurst(Date.now());
    onLearn(card.id);
  }

  return (
    <article
      aria-label={`Lesson: ${card.title}`}
      className={`relative flex flex-col rounded-2xl overflow-hidden border bg-gradient-to-b ${config.gradient}`}
      style={{ borderColor: config.accentBorder, background: '#111118' }}
    >
      {/* Channel badge */}
      <div className="flex items-center justify-between px-5 pt-5 pb-2">
        <div
          className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
          style={{ background: config.accentLight, color: config.accent }}
        >
          <span aria-hidden="true">{config.icon}</span>
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

      {/* Visual */}
      <CardVisual card={card} />

      {/* Content */}
      <div className="flex-1 px-5 pt-3 pb-2">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h2 className="text-xl font-bold text-white leading-tight">{card.title}</h2>
          {speechAvailable() && (
            <button
              onClick={handleListen}
              aria-label={speaking ? 'Stop reading aloud' : 'Read this lesson aloud'}
              aria-pressed={speaking}
              className="flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-200"
              style={{
                width: 44,
                height: 44,
                background: speaking ? config.accentLight : 'rgba(255,255,255,0.05)',
                color: speaking ? config.accent : '#94a3b8',
                border: `1px solid ${speaking ? config.accentBorder : 'transparent'}`,
              }}
            >
              <span aria-hidden="true">{speaking ? '⏹' : '🔊'}</span>
            </button>
          )}
        </div>

        {/* Reading level toggle */}
        {hasSimple && (
          <div
            role="group"
            aria-label="Reading level"
            className="inline-flex rounded-full p-1 mb-4"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            {[
              { key: false, label: 'Standard' },
              { key: true, label: '✨ Easy read' },
            ].map(({ key, label }) => (
              <button
                key={label}
                onClick={() => setSimpleView(key)}
                aria-pressed={simpleView === key}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                style={{
                  minHeight: 32,
                  background: simpleView === key ? config.accentLight : 'transparent',
                  color: simpleView === key ? config.accent : 'var(--muted)',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Hook */}
        <div
          className="text-base font-semibold mb-4 px-4 py-3 rounded-xl border-l-4"
          style={{ borderColor: config.accent, background: config.accentLight, color: config.accent }}
        >
          {text.hook}
        </div>

        {/* Explanation */}
        <div className="mb-4">
          <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Explanation</p>
          <p className="text-slate-200 text-base leading-relaxed">{text.explanation}</p>
        </div>

        {/* Interactive widget */}
        <LessonWidget card={card} accent={config.accent} />

        {/* Example */}
        {text.example && (
          <div className="mb-4 bg-slate-800/60 rounded-xl px-4 py-3 border border-slate-700/50">
            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Example</p>
            <p className="text-slate-300 text-sm leading-relaxed">{text.example}</p>
          </div>
        )}

        {/* Why it matters */}
        {text.whyItMatters && (
          <div className="mb-4">
            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Why It Matters</p>
            <p className="text-slate-300 text-sm leading-relaxed">{text.whyItMatters}</p>
          </div>
        )}

        {/* Challenge teaser */}
        {card.challenge && (
          <div className="mb-2 bg-slate-900/60 rounded-xl px-4 py-3 border border-slate-700/30">
            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Quick Challenge</p>
            <p className="text-slate-400 text-sm leading-relaxed italic">{card.challenge}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="relative flex gap-3 px-5 py-4 border-t border-slate-800">
        <Celebration burstKey={burst} />
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
        <button
          onClick={handleLearn}
          aria-pressed={isLearned}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${isLearned ? 'pop' : ''}`}
          style={{
            minHeight: 44,
            background: isLearned ? config.accent : 'rgba(255,255,255,0.05)',
            color: isLearned ? '#fff' : '#94a3b8',
          }}
        >
          {isLearned ? '✓ Learned' : 'Mark Learned'}
        </button>
      </div>
    </article>
  );
}
