const SETTINGS_KEY = 'codex_settings';

export const defaultSettings = {
  textScale: 1,        // 0.9 | 1 | 1.15 | 1.3
  simpleMode: false,   // plain-language lesson text by default
  reduceMotion: false, // kill animations (system preference also respected via CSS)
  highContrast: false, // brighter text on dark surfaces
};

export function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { ...defaultSettings };
    return { ...defaultSettings, ...JSON.parse(raw) };
  } catch {
    return { ...defaultSettings };
  }
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // storage full or unavailable
  }
}

export function applySettings(settings) {
  const root = document.documentElement;
  root.style.fontSize = `${settings.textScale * 100}%`;
  root.dataset.reduceMotion = settings.reduceMotion ? 'true' : 'false';
  root.dataset.contrast = settings.highContrast ? 'high' : 'normal';
}
