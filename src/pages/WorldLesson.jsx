import { useCallback, useEffect, useRef, useState } from 'react';
import {
  WORLD_SOURCE,
  applyWorldEvent,
  isWorldOrigin,
  loadWorldProgress,
  parseWorldEvent,
  setWorldLabels,
} from '../utils/worlds.js';
import { Link } from '../utils/router.jsx';
import BrandDots from '../components/site/BrandDots.jsx';

/**
 * A lesson whose activity is an interactive world, run inside The Codex.
 * The Codex owns the frame around it: course header, progress, field notes
 * and the way back. The world itself runs in the frame and reports progress.
 */
export default function WorldLesson({ world, onExit, onOpenSettings }) {
  const frameRef = useRef(null);
  const [lesson, setLesson] = useState(() => loadWorldProgress(world.lesson));
  const [notesOpen, setNotesOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [waited, setWaited] = useState(false);
  const lessonRef = useRef(lesson);

  useEffect(() => {
    lessonRef.current = lesson;
  }, [lesson]);

  // If the world never says hello (an older deploy without Codex support), stop showing "Connecting".
  useEffect(() => {
    const t = setTimeout(() => setWaited(true), 8000);
    return () => clearTimeout(t);
  }, []);

  const send = useCallback(msg => {
    frameRef.current?.contentWindow?.postMessage({ source: WORLD_SOURCE, ...msg }, world.origin);
  }, [world.origin]);

  useEffect(() => {
    function onMessage(e) {
      if (e.source !== frameRef.current?.contentWindow) return;
      if (!isWorldOrigin(world, e.origin)) return;
      const ev = parseWorldEvent(e.data);
      if (!ev) return;
      if (ev.type === 'ready') {
        setConnected(true);
        // The Codex remembers the class's label choice; tell the world.
        e.source.postMessage({ source: WORLD_SOURCE, type: 'set_labels', on: lessonRef.current.labels }, e.origin);
        return;
      }
      setLesson(prev => applyWorldEvent(world.lesson, prev, ev));
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [world]);

  function toggleLabels() {
    const on = !lesson.labels;
    setLesson(prev => setWorldLabels(world.lesson, prev, on));
    send({ type: 'set_labels', on });
  }

  function exit() {
    send({ type: 'pause_narration' });
    onExit();
  }

  const pct = lesson.total ? Math.round(((lesson.index + 1) / lesson.total) * 100) : 0;
  const stepText = lesson.total ? `Step ${lesson.index + 1} of ${lesson.total}: ${lesson.label}` : 'Getting the world ready…';

  const iconBtn = active => ({
    width: 44,
    height: 44,
    border: `1.5px solid ${active ? '#ffd166' : '#2c5b6b'}`,
    background: active ? '#ffd166' : 'transparent',
    color: active ? '#0b2a33' : '#f2f7f8',
  });

  return (
    <div className="flex flex-col h-svh" style={{ background: '#0b2a33', color: '#f2f7f8', fontFamily: "'Archivo Variable', system-ui, sans-serif" }}>
      <header
        className="flex flex-wrap items-center gap-x-5 gap-y-2 px-4 py-2.5 border-b"
        style={{ borderColor: '#1f4a59' }}
      >
        <Link to="/" className="flex items-center gap-2.5 shrink-0" style={{ color: '#fff', textDecoration: 'none' }} aria-label="The Codex — home">
          <BrandDots inkColor="#f2f7f8" />
          {/* On phones the dots carry the brand, leaving room for the lesson name */}
          <span className="hidden sm:inline font-extrabold text-lg">The Codex</span>
        </Link>

        <nav aria-label="Breadcrumb" className="flex-1 min-w-0 text-sm truncate" style={{ color: '#a9c3cb' }}>
          <span className="hidden md:inline">{world.course}</span>
          <span aria-hidden="true" className="hidden md:inline mx-2">/</span>
          <span className="font-bold text-white" aria-current="page">{world.title}</span>
        </nav>

        <div className="flex items-center gap-3">
          <div
            role="progressbar"
            aria-label="Lesson progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            aria-valuetext={stepText}
            className="w-24 sm:w-36 h-2 rounded-full overflow-hidden"
            style={{ background: '#1d4655' }}
          >
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: '#ffd166' }} />
          </div>
          <span className="text-sm whitespace-nowrap tabular-nums" style={{ color: '#a9c3cb' }}>
            {lesson.total ? `${lesson.index + 1} of ${lesson.total}` : '—'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLabels}
            aria-pressed={lesson.labels}
            aria-label="Creature labels"
            title={`Creature labels ${lesson.labels ? 'on' : 'off'}`}
            className="flex items-center justify-center rounded-full"
            style={iconBtn(lesson.labels)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M3 12V4h8l10 10-8 8L3 12z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <circle cx="7.5" cy="8" r="1.5" fill="currentColor" />
            </svg>
          </button>
          <button
            onClick={() => setNotesOpen(o => !o)}
            aria-expanded={notesOpen}
            aria-controls="field-notes"
            aria-label={`Field notes, ${lesson.organisms.length} logged`}
            title="Field notes"
            className="relative flex items-center justify-center rounded-full"
            style={iconBtn(notesOpen)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M5 7h14M5 12h14M5 17h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {lesson.organisms.length > 0 && (
              <span
                aria-hidden="true"
                className="absolute -top-1 -right-1 flex items-center justify-center rounded-full text-[0.65rem] font-extrabold"
                style={{ minWidth: 18, height: 18, padding: '0 4px', background: '#2ec4b6', color: '#0b2a33' }}
              >
                {lesson.organisms.length}
              </span>
            )}
          </button>
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              aria-label="Accessibility and display settings"
              title="Settings"
              className="flex items-center justify-center rounded-full"
              style={iconBtn(false)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          )}
          <button
            onClick={exit}
            className="flex items-center rounded-full px-4 text-sm font-bold"
            style={{ minHeight: 44, border: '2px solid #f2f7f8' }}
          >
            Save &amp; exit
          </button>
        </div>
      </header>

      <p className="sr-only" aria-live="polite">{stepText}</p>

      <div className="relative flex-1 min-h-0 flex">
        <iframe
          ref={frameRef}
          src={world.src}
          title={`${world.world}: ${world.title}`}
          allow="fullscreen; autoplay; xr-spatial-tracking"
          allowFullScreen
          className="flex-1 min-w-0 h-full border-0 block"
        />

        {notesOpen && (
          <aside
            id="field-notes"
            aria-label="Field notes"
            className="absolute right-0 top-0 bottom-0 w-full sm:w-80 overflow-auto p-5 border-l"
            style={{ background: '#0d3442', borderColor: '#1f4a59' }}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-extrabold uppercase tracking-widest" style={{ color: '#a9c3cb' }}>
                Field notes · from the reef
              </h2>
              <button onClick={() => setNotesOpen(false)} aria-label="Close field notes" className="rounded-full" style={{ width: 44, height: 44 }}>✕</button>
            </div>
            {lesson.organisms.length === 0 ? (
              <p className="text-sm" style={{ color: '#a9c3cb' }}>Nothing yet. Tap a creature in the reef and it will be logged here.</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {lesson.organisms.map(o => (
                  <li key={o.id} className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm" style={{ background: '#11404f' }}>
                    <span aria-hidden="true" className="w-2 h-2 rounded-full shrink-0" style={{ background: '#2ec4b6' }} />
                    {o.title}
                  </li>
                ))}
              </ul>
            )}
            {lesson.prediction && (
              <p className="mt-4 text-sm" style={{ color: '#a9c3cb' }}>Class prediction recorded.</p>
            )}
          </aside>
        )}

        {lesson.completed && (
          <div
            role="status"
            className="absolute left-4 bottom-4 flex flex-wrap items-center gap-3 rounded-2xl px-4 py-3"
            style={{ background: '#ffd166', color: '#0a2a36', maxWidth: 'calc(100% - 2rem)' }}
          >
            <span className="font-extrabold">Lesson complete. Nice work, explorers.</span>
            <button
              onClick={exit}
              className="rounded-full px-4 text-sm font-bold"
              style={{ minHeight: 44, background: '#0a2a36', color: '#ffffff' }}
            >
              Back to The Codex
            </button>
          </div>
        )}

        {!connected && !waited && (
          <p className="absolute left-4 top-4 text-xs rounded-full px-3 py-1 pointer-events-none" style={{ background: 'rgba(10,42,54,0.85)', color: '#a9c3cb' }}>
            Connecting to {world.world}…
          </p>
        )}

        {/* The world never said hello: it may have failed to load, or be an
            older deploy that runs fine but can't talk to The Codex. Either way,
            offer a way through rather than leaving a learner stuck. */}
        {!connected && waited && (
          <p
            className="absolute left-4 bottom-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm rounded-2xl px-4 py-2.5"
            style={{ background: 'rgba(11,42,51,0.94)', color: '#f2f7f8', border: '1px solid #2c5b6b', maxWidth: 'calc(100% - 2rem)' }}
          >
            <span>Not loading?</span>
            <a href={`${world.origin}/`} target="_blank" rel="noopener noreferrer" className="font-bold underline" style={{ color: '#ffd166' }}>
              Open {world.world} in a new tab
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
