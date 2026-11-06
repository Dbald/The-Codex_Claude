import { useCallback, useEffect, useRef, useState } from 'react';
import {
  WORLD_SOURCE,
  applyWorldEvent,
  isWorldOrigin,
  loadWorldProgress,
  parseWorldEvent,
  setWorldLabels,
} from '../utils/worlds.js';

/**
 * A lesson whose activity is an interactive world, run inside The Codex.
 * The Codex owns the frame around it: course header, progress, field notes
 * and the way back. The world itself runs in the frame and reports progress.
 */
export default function WorldLesson({ world, onExit }) {
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

  return (
    <div className="flex flex-col h-svh" style={{ background: '#0a2a36', color: '#f2f7f8' }}>
      <header
        className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2 border-b"
        style={{ borderColor: '#1f4a59' }}
      >
        <button
          onClick={exit}
          className="flex items-center gap-2 rounded-full px-4 text-sm font-bold"
          style={{ minHeight: 44, border: '2px solid #f2f7f8' }}
        >
          <span aria-hidden="true">←</span> Save &amp; exit
        </button>

        <nav aria-label="Breadcrumb" className="flex-1 min-w-0 text-sm truncate" style={{ color: '#a9c3cb' }}>
          <span className="font-black text-white mr-2">THE CODEX</span>
          <span>{world.course}</span>
          <span aria-hidden="true" className="mx-2">/</span>
          <span className="font-bold text-white">{world.title}</span>
        </nav>

        <div className="flex items-center gap-3">
          <div
            role="progressbar"
            aria-label="Lesson progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            aria-valuetext={stepText}
            className="w-28 h-2 rounded-full overflow-hidden"
            style={{ background: '#143f4e' }}
          >
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: '#ffd166' }} />
          </div>
          <span className="text-xs whitespace-nowrap" style={{ color: '#a9c3cb' }}>
            {lesson.total ? `${lesson.index + 1} of ${lesson.total}` : '—'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLabels}
            aria-pressed={lesson.labels}
            className="rounded-full px-4 text-sm font-bold"
            style={{
              minHeight: 44,
              border: '1.5px solid #ffd166',
              background: lesson.labels ? '#ffd166' : 'transparent',
              color: lesson.labels ? '#0a2a36' : '#f2f7f8',
            }}
          >
            Labels {lesson.labels ? 'on' : 'off'}
          </button>
          <button
            onClick={() => setNotesOpen(o => !o)}
            aria-expanded={notesOpen}
            aria-controls="field-notes"
            className="rounded-full px-4 text-sm font-bold"
            style={{ minHeight: 44, border: '1.5px solid #2c5b6b' }}
          >
            Field notes <span className="ml-1 rounded-full px-2" style={{ background: '#2ec4b6', color: '#0a2a36' }}>{lesson.organisms.length}</span>
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
      </div>
    </div>
  );
}
