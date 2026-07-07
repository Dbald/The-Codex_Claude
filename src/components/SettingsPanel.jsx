import { useEffect, useRef } from 'react';

const TEXT_SIZES = [
  { label: 'S', scale: 0.9 },
  { label: 'M', scale: 1 },
  { label: 'L', scale: 1.15 },
  { label: 'XL', scale: 1.3 },
];

function Toggle({ label, description, checked, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="w-full flex items-center justify-between gap-4 py-3.5 text-left"
      style={{ minHeight: 44 }}
    >
      <span>
        <span className="block text-sm font-semibold text-white">{label}</span>
        <span className="block text-xs text-slate-500 mt-0.5">{description}</span>
      </span>
      <span
        aria-hidden="true"
        className="flex-shrink-0 rounded-full transition-colors duration-200"
        style={{
          width: 52,
          height: 30,
          padding: 3,
          background: checked ? '#a78bfa' : 'rgba(255,255,255,0.12)',
        }}
      >
        <span
          className="block rounded-full bg-white transition-transform duration-200"
          style={{
            width: 24,
            height: 24,
            transform: checked ? 'translateX(22px)' : 'translateX(0)',
          }}
        />
      </span>
    </button>
  );
}

export default function SettingsPanel({ open, settings, onChange, onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement;
    panelRef.current?.focus();

    function onKey(e) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      // Trap Tab inside the dialog — aria-modal promises the background doesn't exist.
      const focusables = panelRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey) {
        if (active === first || active === panelRef.current) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        e.preventDefault();
        first.focus();
      }
    }

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  function set(key, value) {
    onChange({ ...settings, [key]: value });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <button
        aria-label="Close settings"
        onClick={onClose}
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      />

      {/* Sheet */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Accessibility and learning settings"
        tabIndex={-1}
        className="relative w-full max-w-lg rounded-t-3xl px-5 pt-3 pb-8 border-t"
        style={{ background: '#242d42', borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <div aria-hidden="true" className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-slate-700" />

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-white">Make it yours</h2>
          <button
            onClick={onClose}
            aria-label="Close settings"
            className="flex items-center justify-center rounded-full text-slate-400"
            style={{ width: 44, height: 44, background: 'rgba(148,163,184,0.15)' }}
          >
            ✕
          </button>
        </div>

        {/* Text size */}
        <div className="mb-2">
          <p id="text-size-label" className="text-sm font-semibold text-white mb-0.5">Text size</p>
          <p className="text-xs text-slate-500 mb-3">Everything in the app scales with it.</p>
          <div role="group" aria-labelledby="text-size-label" className="grid grid-cols-4 gap-2">
            {TEXT_SIZES.map(({ label, scale }) => {
              const active = settings.textScale === scale;
              return (
                <button
                  key={label}
                  onClick={() => set('textScale', scale)}
                  aria-pressed={active}
                  className="rounded-xl font-bold transition-all duration-200"
                  style={{
                    minHeight: 48,
                    fontSize: `${0.8 + (scale - 0.9) * 1.2}rem`,
                    background: active ? 'rgba(167,139,250,0.2)' : 'rgba(255,255,255,0.05)',
                    color: active ? '#a78bfa' : '#94a3b8',
                    border: `1px solid ${active ? '#a78bfa' : 'transparent'}`,
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="divide-y" style={{ borderColor: 'rgba(148,163,184,0.15)' }}>
          <Toggle
            label="Easy read mode"
            description="Lessons use simpler words and everyday examples."
            checked={settings.simpleMode}
            onChange={v => set('simpleMode', v)}
          />
          <Toggle
            label="High contrast"
            description="Brighter text that's easier to see."
            checked={settings.highContrast}
            onChange={v => set('highContrast', v)}
          />
          <Toggle
            label="Reduce motion"
            description="Turns off animations and celebrations."
            checked={settings.reduceMotion}
            onChange={v => set('reduceMotion', v)}
          />
        </div>
      </div>
    </div>
  );
}
