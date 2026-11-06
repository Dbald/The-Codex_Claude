import { useEffect, useRef, useState } from 'react';
import courses from './data/courses.json';
import { useLocation, navigate, canGoBack } from './utils/router.jsx';
import { worldForLesson } from './utils/worlds.js';
import { loadSettings, saveSettings, applySettings } from './utils/settings.js';
import { setSoundEnabled } from './utils/sound.js';
import SettingsPanel from './components/SettingsPanel.jsx';
import NoticeHost from './components/site/NoticeHost.jsx';
import SiteNav from './components/site/SiteNav.jsx';
import SiteFooter from './components/site/SiteFooter.jsx';
import Landing from './pages/Landing.jsx';
import CourseOverview from './pages/CourseOverview.jsx';
import YourData from './pages/YourData.jsx';
import NotFound from './pages/NotFound.jsx';
import LearningApp from './LearningApp.jsx';
import WorldLesson from './pages/WorldLesson.jsx';
import './styles/site.css';

function match(pathname) {
  const p = pathname.replace(/\/+$/, '') || '/';
  if (p === '/') return { name: 'landing' };
  if (p === '/app') return { name: 'app' };
  if (p === '/your-data') return { name: 'data' };
  const lesson = p.match(/^\/trips\/([a-z0-9-]+)\/([a-z0-9-]+)$/);
  if (lesson) return { name: 'lesson', id: lesson[1], lesson: lesson[2] };
  const trip = p.match(/^\/trips\/([a-z0-9-]+)$/);
  if (trip) return { name: 'course', id: trip[1] };
  // Earlier links used /courses/:id
  const legacy = p.match(/^\/courses\/([a-z0-9-]+)$/);
  if (legacy) return { name: 'redirect', to: `/trips/${legacy[1]}` };
  return { name: 'notfound' };
}

function titleFor(route) {
  const suffix = 'The Codex';
  switch (route.name) {
    case 'landing':
      return 'The Codex — Field trips, minus the bus';
    case 'lesson': {
      const w = worldForLesson(route.id, route.lesson);
      return w ? `${w.title} · ${w.world} — ${suffix}` : `Not found — ${suffix}`;
    }
    case 'app':
      return `Learn — ${suffix}`;
    case 'data':
      return `Your data — ${suffix}`;
    case 'course': {
      const c = courses.find(x => x.id === route.id);
      if (!c) return `Not found — ${suffix}`;
      return c.courseTitle ? `${c.courseTitle} · ${c.world} — ${suffix}` : `${c.world} — ${suffix}`;
    }
    default:
      return `Not found — ${suffix}`;
  }
}

function prefersReducedMotion(settings) {
  return settings.reduceMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function App() {
  const location = useLocation();
  const route = match(location.pathname);

  const [settings, setSettings] = useState(() => loadSettings());
  const [settingsOpen, setSettingsOpen] = useState(false);
  const mainRef = useRef(null);
  const firstRender = useRef(true);
  const lastPath = useRef(location.pathname);

  useEffect(() => {
    applySettings(settings);
    saveSettings(settings);
    setSoundEnabled(settings.sound);
  }, [settings]);

  useEffect(() => {
    document.title = titleFor(route);
  }, [route.name, route.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll and focus on navigation. In-page anchors scroll to their section;
  // a new page starts at the top and moves focus to the content, so keyboard
  // and screen-reader users don't stay stranded in the old page's position.
  useEffect(() => {
    const pageChanged = location.pathname !== lastPath.current;
    lastPath.current = location.pathname;

    if (location.hash) {
      const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (el) {
        el.scrollIntoView({ behavior: prefersReducedMotion(settings) ? 'auto' : 'smooth', block: 'start' });
        return;
      }
    }

    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (pageChanged) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      mainRef.current?.focus({ preventScroll: true });
    }
  }, [location.key]); // eslint-disable-line react-hooks/exhaustive-deps

  // Old /courses/:id links forward to /trips/:id
  useEffect(() => {
    if (route.name === 'redirect') navigate(route.to, { replace: true });
  }, [route.name, route.to]);

  const settingsPanel = (
    <SettingsPanel
      open={settingsOpen}
      settings={settings}
      onChange={setSettings}
      onClose={() => setSettingsOpen(false)}
    />
  );

  if (route.name === 'redirect') return null;

  if (route.name === 'app') {
    return (
      <>
        <LearningApp settings={settings} onOpenSettings={() => setSettingsOpen(true)} />
        {settingsPanel}
        <NoticeHost />
      </>
    );
  }

  // A world lesson takes the whole screen and brings its own header.
  const world = route.name === 'lesson' ? worldForLesson(route.id, route.lesson) : null;
  if (world) {
    return (
      <>
        <WorldLesson
          world={world}
          onOpenSettings={() => setSettingsOpen(true)}
          onExit={() => (canGoBack() ? window.history.back() : navigate('/'))}
        />
        {settingsPanel}
        <NoticeHost />
      </>
    );
  }

  return (
    <div className="site">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <SiteNav onOpenSettings={() => setSettingsOpen(true)} />
      <main id="main-content" ref={mainRef} tabIndex={-1}>
        {route.name === 'landing' && <Landing />}
        {route.name === 'course' && <CourseOverview courseId={route.id} />}
        {route.name === 'data' && <YourData />}
        {(route.name === 'notfound' || route.name === 'lesson') && <NotFound />}
      </main>
      <SiteFooter />
      {settingsPanel}
      <NoticeHost />
    </div>
  );
}
