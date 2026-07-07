import { useEffect, useRef } from 'react';
import LessonCard from './LessonCard.jsx';
import QuizCard from './QuizCard.jsx';
import ChallengeCard from './ChallengeCard.jsx';
import { CHANNEL_CONFIG } from '../utils/feed.js';

export default function Feed({ cards, progress, settings, channel, onSave, onLearn, onComplete, onAnswer, onView, onBack }) {
  const observerRef = useRef(null);
  const cardRefs = useRef({});
  // Keep the latest onView without making it an effect dependency —
  // a changing identity would recreate the observer, whose initial entry
  // delivery re-fires onView and loops render → observe → render forever.
  const onViewRef = useRef(onView);
  useEffect(() => {
    onViewRef.current = onView;
  });
  const notifiedIdsRef = useRef(new Set());

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const cardId = entry.target.dataset.cardId;
            if (cardId && !notifiedIdsRef.current.has(cardId)) {
              notifiedIdsRef.current.add(cardId);
              onViewRef.current(cardId);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.values(cardRefs.current).forEach(el => {
      if (el) observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [cards]);

  const config = channel !== 'Mixed' ? CHANNEL_CONFIG[channel] : null;

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full px-5 text-center py-20">
        <p className="text-4xl mb-4">✓</p>
        <h2 className="text-xl font-bold text-white mb-2">All caught up!</h2>
        <p className="text-slate-500 text-sm mb-6">You’ve seen all the cards in this channel.</p>
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl text-sm font-semibold"
          style={{ background: 'rgba(255,255,255,0.08)', color: '#94a3b8' }}
        >
          ← Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div
        className="sticky top-0 z-20 flex items-center justify-between px-5 py-3 border-b"
        style={{ background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <button
          onClick={onBack}
          className="text-slate-500 hover:text-slate-300 transition-colors text-sm"
        >
          ← Home
        </button>
        <div
          className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
          style={{
            background: config ? config.accentLight : 'rgba(167,139,250,0.12)',
            color: config ? config.accent : '#a78bfa',
          }}
        >
          {config ? `${config.icon} ${channel}` : '✦ Mixed Feed'}
        </div>
        <div className="text-xs text-slate-400">{cards.length} cards</div>
      </div>

      <div className="px-4 py-4 flex flex-col gap-5 pb-8">
        {cards.map((card, i) => {
          const ref = el => { cardRefs.current[card.id] = el; };
          return (
            <div
              key={card.id}
              ref={ref}
              data-card-id={card.id}
              className="card-enter"
              style={{ animationDelay: `${Math.min(i, 4) * 0.06}s` }}
            >
              {card.type === 'lesson' && (
                <LessonCard card={card} progress={progress} settings={settings} onSave={onSave} onLearn={onLearn} />
              )}
              {card.type === 'quiz' && (
                <QuizCard card={card} progress={progress} settings={settings} onSave={onSave} onAnswer={onAnswer} />
              )}
              {card.type === 'challenge' && (
                <ChallengeCard card={card} progress={progress} settings={settings} onSave={onSave} onComplete={onComplete} />
              )}
            </div>
          );
        })}

        <div className="text-center py-6">
          <p className="text-slate-400 text-sm">End of feed</p>
          <button
            onClick={onBack}
            className="mt-3 px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-500 border border-slate-800 hover:border-slate-700 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
