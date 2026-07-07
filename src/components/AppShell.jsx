export default function AppShell({ currentPage, onNavigate, hideNav, onOpenSettings, children }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: '◈' },
    { id: 'saved', label: 'Saved', icon: '★' },
    { id: 'progress', label: 'Progress', icon: '◉' },
  ];

  return (
    <div className="flex flex-col min-h-svh" style={{ background: '#0a0a0f' }}>
      <a href="#main-content" className="skip-link">Skip to content</a>

      <header
        className="sticky top-0 z-30 flex items-center justify-between px-5 py-3 border-b"
        style={{ background: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(16px)', borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg font-black tracking-tight text-white">THE CODEX</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-xs text-slate-400 font-medium tracking-widest uppercase">
            Scroll with purpose
          </span>
          <button
            onClick={onOpenSettings}
            aria-label="Accessibility and learning settings"
            className="flex items-center justify-center rounded-full text-slate-400 transition-colors duration-200"
            style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.05)' }}
          >
            <span aria-hidden="true" className="text-lg">⚙</span>
          </button>
        </div>
      </header>

      <main id="main-content" className="flex-1 overflow-auto">
        {children}
      </main>

      {!hideNav && (
        <nav
          aria-label="Main navigation"
          className="sticky bottom-0 z-30 flex items-center border-t px-4 py-2"
          style={{ background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(16px)', borderColor: 'rgba(255,255,255,0.06)' }}
        >
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              aria-current={currentPage === item.id ? 'page' : undefined}
              className="flex-1 flex flex-col items-center gap-1 py-2 transition-all duration-200"
              style={{ color: currentPage === item.id ? '#a78bfa' : 'var(--muted)', minHeight: 52 }}
            >
              <span aria-hidden="true" className="text-xl leading-none">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
