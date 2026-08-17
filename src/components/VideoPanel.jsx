import { useEffect, useRef, useState } from 'react';
import { CHANNEL_CONFIG } from '../utils/feed.js';

/**
 * Full-bleed vertical video panel. Autoplays (muted) while it is the active
 * panel, pauses and rewinds when scrolled away, and hands off to the lesson
 * card when playback finishes.
 */
export default function VideoPanel({
  card,
  video,
  isActive,
  muted,
  onToggleMute,
  reduceMotion,
  progress,
  onSave,
  onLearn,
  onEnded,
  onAdvance,
}) {
  const config = CHANNEL_CONFIG[card.channel];
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [pct, setPct] = useState(0);
  const [failed, setFailed] = useState(false);

  const isSaved = progress.savedCardIds.includes(card.id);
  const isLearned = progress.learnedCardIds.includes(card.id);

  // Play only while this panel is the one on screen.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (isActive) {
      if (!reduceMotion) {
        el.play().catch(() => {
          /* autoplay blocked — the tap-to-play overlay covers this */
        });
      }
    } else {
      el.pause();
      el.currentTime = 0;
      setPct(0);
    }
  }, [isActive, reduceMotion]);

  useEffect(() => {
    const el = videoRef.current;
    if (el) el.muted = muted;
  }, [muted]);

  function togglePlay() {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  }

  function handleTime() {
    const el = videoRef.current;
    if (el?.duration) setPct((el.currentTime / el.duration) * 100);
  }

  const railBtn = active => ({
    width: 48,
    height: 48,
    background: active ? config.accentLight : 'rgba(0,0,0,0.45)',
    color: active ? config.accent : '#fff',
    backdropFilter: 'blur(8px)',
  });

  return (
    <section
      aria-label={`Video lesson: ${card.title}`}
      className="reel-panel relative flex items-center justify-center overflow-hidden"
      style={{ background: '#000' }}
    >
      {failed ? (
        <div className="px-8 text-center">
          <p className="text-4xl mb-3" aria-hidden="true">🎬</p>
          <p className="text-slate-300 text-sm">This video couldn’t load — swipe up for the lesson.</p>
        </div>
      ) : (
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          className="absolute inset-0 h-full w-full"
          style={{ objectFit: 'cover' }}
          playsInline
          muted={muted}
          preload={isActive ? 'auto' : 'metadata'}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={handleTime}
          onEnded={onEnded}
          onError={() => setFailed(true)}
        >
          {video.captions && (
            <track kind="captions" src={video.captions} srcLang="en" label="English" default />
          )}
        </video>
      )}

      {/* Tap surface: play/pause */}
      <button
        onClick={togglePlay}
        aria-label={playing ? 'Pause video' : 'Play video'}
        className="absolute inset-0 flex items-center justify-center"
        style={{ background: 'transparent' }}
      >
        {!playing && !failed && (
          <span
            aria-hidden="true"
            className="flex items-center justify-center rounded-full text-3xl"
            style={{ width: 76, height: 76, background: 'rgba(0,0,0,0.5)', color: '#fff', backdropFilter: 'blur(8px)' }}
          >
            ▶
          </span>
        )}
      </button>

      {/* Legibility scrim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{ height: '55%', background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}
      />

      {/* Action rail */}
      <div className="absolute right-3 bottom-32 flex flex-col gap-3">
        <button
          onClick={() => onSave(card.id)}
          aria-pressed={isSaved}
          aria-label={isSaved ? 'Remove from saved' : 'Save this lesson'}
          className="flex items-center justify-center rounded-full text-xl"
          style={railBtn(isSaved)}
        >
          {isSaved ? '★' : '☆'}
        </button>
        <button
          onClick={() => onLearn(card.id)}
          aria-pressed={isLearned}
          aria-label={isLearned ? 'Learned' : 'Mark as learned'}
          className="flex items-center justify-center rounded-full text-xl"
          style={railBtn(isLearned)}
        >
          {isLearned ? '✓' : '○'}
        </button>
        <button
          onClick={onToggleMute}
          aria-label={muted ? 'Unmute video' : 'Mute video'}
          className="flex items-center justify-center rounded-full text-lg"
          style={railBtn(false)}
        >
          {muted ? '🔇' : '🔊'}
        </button>
      </div>

      {/* Title block */}
      <div className="absolute inset-x-0 bottom-0 px-5 pb-16">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2"
          style={{ background: config.accentLight, color: config.accent, backdropFilter: 'blur(8px)' }}
        >
          <span aria-hidden="true">{config.icon}</span>
          <span>{card.channel}</span>
          <span className="opacity-60">· {card.level}</span>
        </div>
        <h2 className="text-xl font-black text-white leading-tight mb-1">{card.title}</h2>
        <p className="text-sm text-slate-200 leading-snug">{card.hook}</p>

        <button
          onClick={onAdvance}
          className="mt-3 flex items-center gap-2 text-xs font-semibold text-white/90"
        >
          <span className="swipe-hint" aria-hidden="true">↑</span> Swipe up for the lesson
        </button>
      </div>

      {/* Progress bar */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1" style={{ background: 'rgba(255,255,255,0.15)' }}>
        <div className="h-full" style={{ width: `${pct}%`, background: config.accent, transition: 'width 0.1s linear' }} />
      </div>
    </section>
  );
}
