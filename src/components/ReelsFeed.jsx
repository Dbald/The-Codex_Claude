import { useEffect, useMemo, useRef, useState } from 'react';
import VideoPanel from './VideoPanel.jsx';
import LessonCard from './LessonCard.jsx';
import QuizCard from './QuizCard.jsx';
import ChallengeCard from './ChallengeCard.jsx';
import { CHANNEL_CONFIG, getUnlockState } from '../utils/feed.js';
import { getVideo } from '../utils/video.js';
import { loadMuted, saveMuted } from '../utils/video.js';

/**
 * Full-screen vertical feed. Each card becomes one snap panel, or two when a
 * video exists: watch → card → next. Video end and "Mark Learned" both
 * auto-advance, so a whole session can be done without lifting a thumb.
 */
export default function ReelsFeed({
  cards,
  progress,
  settings,
  channel,
  onSave,
  onLearn,
  onComplete,
  onAnswer,
  onView,
  onBack,
}) {
  const scrollerRef = useRef(null);
  const panelRefs = useRef([]);
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(() => loadMuted());

  const reduceMotion = !!settings?.reduceMotion;

  // Video panel + card panel per card (video only when one has been recorded).
  const panels = useMemo(() => {
    const out = [];
    for (const card of cards) {
      const video = card.type === 'lesson' ? getVideo(card.id) : null;
      if (video) out.push({ key: `${card.id}-video`, kind: 'video', card, video });
      out.push({ key: `${card.id}-card`, kind: 'card', card });
    }
    return out;
  }, [cards]);

  // Track the panel on screen: drives playback and view-tracking.
  const onViewRef = useRef(onView);
  useEffect(() => {
    onViewRef.current = onView;
  });
  const seen = useRef(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            setActive(idx);
            const cardId = entry.target.dataset.cardId;
            if (cardId && !seen.current.has(cardId)) {
              seen.current.add(cardId);
              onViewRef.current(cardId);
            }
          }
        }
      },
      { threshold: 0.6 }
    );
    panelRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, [panels]);

  function goTo(index) {
    const el = panelRefs.current[index];
    if (!el) return;
    el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }

  function advance() {
    goTo(Math.min(active + 1, panels.length - 1));
  }

  function toggleMute() {
    setMuted(m => {
      saveMuted(!m);
      return !m;
    });
  }

  // Marking learned from a card panel moves you on, after the confetti lands.
  function handleLearnAndAdvance(cardId) {
    const wasLearned = progress.learnedCardIds.includes(cardId);
    onLearn(cardId);
    if (!wasLearned) setTimeout(advance, 900);
  }

  // Keyboard parity with the swipe gesture.
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        goTo(active + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        goTo(active - 1);
      } else if (e.key === 'Escape') {
        onBack();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, onBack]);

  const config = channel !== 'Mixed' ? CHANNEL_CONFIG[channel] : null;
  const activeCard = panels[active]?.card;
  const lockState = activeCard && channel !== 'Mixed' ? getUnlockState(channel, progress) : null;

  if (panels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-svh px-6 text-center">
        <p className="text-4xl mb-4" aria-hidden="true">✓</p>
        <h2 className="text-xl font-bold text-white mb-2">All caught up!</h2>
        <button onClick={onBack} className="mt-2 px-6 py-3 rounded-xl text-sm font-semibold" style={{ background: 'rgba(255,255,255,0.08)', color: '#cbd5e1' }}>
          ← Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="relative" style={{ background: '#000' }}>
      {/* Floating chrome */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-center justify-between px-4 py-3">
        <button
          onClick={onBack}
          className="pointer-events-auto flex items-center justify-center rounded-full text-sm font-semibold"
          style={{ minWidth: 44, height: 44, padding: '0 14px', background: 'rgba(0,0,0,0.5)', color: '#fff', backdropFilter: 'blur(8px)' }}
        >
          ← Home
        </button>
        <div
          className="rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-widest"
          style={{
            background: 'rgba(0,0,0,0.5)',
            color: config ? config.accent : '#a78bfa',
            backdropFilter: 'blur(8px)',
          }}
        >
          {config ? `${config.icon} ${channel}` : '✦ Mixed'}
        </div>
      </div>

      {/* Position indicator */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed right-1.5 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-1"
      >
        {panels.slice(0, 24).map((_, i) => (
          <span
            key={i}
            className="block rounded-full transition-all duration-200"
            style={{
              width: 3,
              height: i === active ? 16 : 6,
              background: i === active ? (config ? config.accent : '#a78bfa') : 'rgba(255,255,255,0.3)',
            }}
          />
        ))}
      </div>

      <div ref={scrollerRef} className="reels-scroller">
        {panels.map((panel, i) => {
          const setRef = el => {
            panelRefs.current[i] = el;
          };

          if (panel.kind === 'video') {
            return (
              <div key={panel.key} ref={setRef} data-index={i} data-card-id={panel.card.id}>
                <VideoPanel
                  card={panel.card}
                  video={panel.video}
                  isActive={active === i}
                  muted={muted}
                  onToggleMute={toggleMute}
                  reduceMotion={reduceMotion}
                  progress={progress}
                  onSave={onSave}
                  onLearn={onLearn}
                  onEnded={advance}
                  onAdvance={advance}
                />
              </div>
            );
          }

          const { card } = panel;
          return (
            <div
              key={panel.key}
              ref={setRef}
              data-index={i}
              data-card-id={card.id}
              className="reel-panel reel-card-panel"
            >
              {/* Top padding clears the floating Home / channel chrome */}
              <div className="w-full max-w-lg mx-auto px-4 pt-20 pb-10">
                {card.type === 'lesson' && (
                  <LessonCard card={card} progress={progress} settings={settings} onSave={onSave} onLearn={handleLearnAndAdvance} />
                )}
                {card.type === 'quiz' && (
                  <QuizCard card={card} progress={progress} settings={settings} onSave={onSave} onAnswer={onAnswer} />
                )}
                {card.type === 'challenge' && (
                  <ChallengeCard card={card} progress={progress} settings={settings} onSave={onSave} onComplete={onComplete} />
                )}

                {i < panels.length - 1 ? (
                  <button
                    onClick={advance}
                    className="mt-4 w-full rounded-xl py-3 text-sm font-semibold"
                    style={{ background: 'rgba(255,255,255,0.06)', color: '#cbd5e1', minHeight: 48 }}
                  >
                    Next <span aria-hidden="true">↑</span>
                  </button>
                ) : (
                  <div className="mt-4 text-center">
                    {lockState && !lockState.unlocked ? (
                      <p className="text-sm text-slate-300 leading-relaxed">
                        <span aria-hidden="true">🔓</span> {lockState.remaining} more lesson
                        {lockState.remaining !== 1 ? 's' : ''} to unlock 18 Level 2 cards
                      </p>
                    ) : (
                      <p className="text-sm text-slate-300">That’s the whole feed. Nice work. 🏆</p>
                    )}
                    <button
                      onClick={onBack}
                      className="mt-3 w-full rounded-xl py-3 text-sm font-semibold"
                      style={{ background: 'rgba(255,255,255,0.06)', color: '#cbd5e1', minHeight: 48 }}
                    >
                      ← Back to Home
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
