import { useState } from 'react';
import { Link } from '../../utils/router.jsx';
import { lessonPath } from '../../utils/worlds.js';
import BrandDots from './BrandDots.jsx';

const LINKS = [
  { to: '/#trips', label: 'The trips' },
  { to: '/#route', label: 'How it works' },
  { to: '/#along', label: 'Families & schools' },
  { to: '/#guide', label: 'Your guide' },
];

function GearIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function SiteNav({ onOpenSettings }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="nav">
      <div className="wrap nav__inner">
        <Link to="/" className="brand" onClick={close} aria-label="The Codex — home">
          <BrandDots />
          <span className="brand__word">The Codex</span>
        </Link>

        <nav aria-label="Primary" className="nav__links">
          {LINKS.map(l => (
            <Link key={l.to} to={l.to}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="nav__actions">
          <button
            type="button"
            className="icon-btn nav__settings"
            onClick={onOpenSettings}
            aria-label="Accessibility and display settings"
          >
            <GearIcon />
          </button>
          <Link to={lessonPath('ocean-explorer')} className="btn btn-ink btn-sm">
            Start at the reef
          </Link>
          <button
            type="button"
            className="icon-btn nav__menu-btn"
            aria-expanded={open}
            aria-controls="site-drawer"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(o => !o)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="site-drawer" aria-label="Primary" className="wrap nav__drawer">
          {LINKS.map(l => (
            <Link key={l.to} to={l.to} onClick={close}>
              {l.label}
            </Link>
          ))}
          <button
            type="button"
            className="nav__drawer-btn"
            onClick={() => {
              close();
              onOpenSettings();
            }}
          >
            Accessibility &amp; display settings
          </button>
        </nav>
      )}
    </header>
  );
}
