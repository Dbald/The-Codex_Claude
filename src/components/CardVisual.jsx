const FINANCE = (accent) => (
  <svg viewBox="0 0 320 100" width="100%" style={{ display: 'block' }}>
    <defs>
      <linearGradient id="fin-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={accent} stopOpacity="0.08" />
        <stop offset="100%" stopColor={accent} stopOpacity="0.02" />
      </linearGradient>
    </defs>
    <rect width="320" height="100" fill="url(#fin-bg)" />
    <rect x="60" y="65" width="18" height="20" rx="3" fill={accent} opacity="0.4" />
    <rect x="86" y="50" width="18" height="35" rx="3" fill={accent} opacity="0.6" />
    <rect x="112" y="38" width="18" height="47" rx="3" fill={accent} opacity="0.8" />
    <rect x="138" y="25" width="18" height="60" rx="3" fill={accent} />
    <polyline points="69,62 95,47 121,35 147,22" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.9" />
    <ellipse cx="230" cy="72" rx="22" ry="6" fill={accent} opacity="0.7" />
    <ellipse cx="230" cy="60" rx="22" ry="6" fill={accent} opacity="0.8" />
    <ellipse cx="230" cy="48" rx="22" ry="6" fill={accent} />
    <rect x="208" y="48" width="44" height="12" fill={accent} opacity="0.85" />
    <rect x="208" y="60" width="44" height="12" fill={accent} opacity="0.75" />
    <text x="230" y="53" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fff" opacity="0.9">$</text>
    <line x1="50" y1="85" x2="175" y2="85" stroke={accent} strokeWidth="1" opacity="0.2" />
    <line x1="50" y1="60" x2="175" y2="60" stroke={accent} strokeWidth="1" opacity="0.1" />
    <line x1="50" y1="35" x2="175" y2="35" stroke={accent} strokeWidth="1" opacity="0.1" />
  </svg>
);

const ELECTRONICS = (accent) => (
  <svg viewBox="0 0 320 100" width="100%" style={{ display: 'block' }}>
    <defs>
      <linearGradient id="elec-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={accent} stopOpacity="0.08" />
        <stop offset="100%" stopColor={accent} stopOpacity="0.02" />
      </linearGradient>
    </defs>
    <rect width="320" height="100" fill="url(#elec-bg)" />
    <rect x="60" y="25" width="200" height="55" rx="4" fill="none" stroke={accent} strokeWidth="2" opacity="0.4" />
    <line x1="120" y1="25" x2="130" y2="25" stroke={accent} strokeWidth="2" opacity="0.8" />
    <polyline points="130,25 133,18 137,32 141,18 145,32 149,18 153,32 157,25 160,25" fill="none" stroke={accent} strokeWidth="2" opacity="0.8" />
    <line x1="160" y1="25" x2="200" y2="25" stroke={accent} strokeWidth="2" opacity="0.8" />
    <line x1="60" y1="40" x2="60" y2="60" stroke={accent} strokeWidth="2.5" opacity="0.9" />
    <line x1="60" y1="45" x2="52" y2="45" stroke={accent} strokeWidth="4" opacity="0.9" />
    <line x1="60" y1="55" x2="54" y2="55" stroke={accent} strokeWidth="2" opacity="0.9" />
    <polygon points="260,35 260,65 285,50" fill={accent} opacity="0.7" />
    <line x1="285" y1="35" x2="285" y2="65" stroke={accent} strokeWidth="2.5" opacity="0.9" />
    <line x1="290" y1="42" x2="300" y2="36" stroke={accent} strokeWidth="1.5" opacity="0.6" />
    <line x1="290" y1="50" x2="302" y2="50" stroke={accent} strokeWidth="1.5" opacity="0.6" />
    <line x1="290" y1="58" x2="300" y2="64" stroke={accent} strokeWidth="1.5" opacity="0.6" />
    <circle cx="60" cy="25" r="3" fill={accent} opacity="0.8" />
    <circle cx="260" cy="25" r="3" fill={accent} opacity="0.8" />
    <circle cx="60" cy="80" r="3" fill={accent} opacity="0.8" />
    <circle cx="260" cy="80" r="3" fill={accent} opacity="0.8" />
  </svg>
);

const ROBOTICS = (accent) => (
  <svg viewBox="0 0 320 100" width="100%" style={{ display: 'block' }}>
    <defs>
      <linearGradient id="rob-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={accent} stopOpacity="0.08" />
        <stop offset="100%" stopColor={accent} stopOpacity="0.02" />
      </linearGradient>
    </defs>
    <rect width="320" height="100" fill="url(#rob-bg)" />
    <rect x="120" y="25" width="80" height="55" rx="6" fill="none" stroke={accent} strokeWidth="2" opacity="0.8" />
    <rect x="128" y="33" width="64" height="39" rx="3" fill={accent} opacity="0.08" />
    <text x="160" y="56" textAnchor="middle" fontSize="11" fontWeight="bold" fill={accent} opacity="0.9">MCU</text>
    <line x1="100" y1="35" x2="120" y2="35" stroke={accent} strokeWidth="1.5" opacity="0.7" />
    <line x1="100" y1="45" x2="120" y2="45" stroke={accent} strokeWidth="1.5" opacity="0.7" />
    <line x1="100" y1="55" x2="120" y2="55" stroke={accent} strokeWidth="1.5" opacity="0.7" />
    <line x1="100" y1="65" x2="120" y2="65" stroke={accent} strokeWidth="1.5" opacity="0.7" />
    <line x1="100" y1="75" x2="120" y2="75" stroke={accent} strokeWidth="1.5" opacity="0.7" />
    <line x1="200" y1="35" x2="220" y2="35" stroke={accent} strokeWidth="1.5" opacity="0.7" />
    <line x1="200" y1="45" x2="220" y2="45" stroke={accent} strokeWidth="1.5" opacity="0.7" />
    <line x1="200" y1="55" x2="220" y2="55" stroke={accent} strokeWidth="1.5" opacity="0.7" />
    <line x1="200" y1="65" x2="220" y2="65" stroke={accent} strokeWidth="1.5" opacity="0.7" />
    <line x1="200" y1="75" x2="220" y2="75" stroke={accent} strokeWidth="1.5" opacity="0.7" />
    <polyline points="55,70 55,40 68,40 68,70 81,70 81,40 94,40 94,70" fill="none" stroke={accent} strokeWidth="2" opacity="0.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="265" cy="52" r="22" fill="none" stroke={accent} strokeWidth="2" opacity="0.7" />
    <text x="265" y="57" textAnchor="middle" fontSize="13" fontWeight="bold" fill={accent} opacity="0.9">M</text>
    <polygon points="285,48 290,55 280,56" fill={accent} opacity="0.6" />
  </svg>
);

const CHANNEL_VISUALS = { Finance: FINANCE, Electronics: ELECTRONICS, Robotics: ROBOTICS };

export default function CardVisual({ card }) {
  const accent =
    card.channel === 'Finance' ? '#10b981' :
    card.channel === 'Electronics' ? '#3b82f6' :
    '#a78bfa';

  const render = CHANNEL_VISUALS[card.channel];
  if (!render) return null;

  return (
    <div style={{ marginBottom: 0, overflow: 'hidden' }}>
      {render(accent)}
    </div>
  );
}
