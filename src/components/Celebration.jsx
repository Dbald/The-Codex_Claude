const COLORS = ['#a78bfa', '#10b981', '#3b82f6', '#fbbf24', '#fb923c', '#f472b6'];

// Deterministic pseudo-random spread so pieces fan out differently each render position
const PIECES = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2;
  const dist = 60 + (i % 4) * 22;
  return {
    cx: `${Math.round(Math.cos(angle) * dist)}px`,
    cy: `${Math.round(Math.sin(angle) * dist - 30)}px`,
    cr: `${(i % 2 ? 1 : -1) * (180 + i * 40)}deg`,
    color: COLORS[i % COLORS.length],
    delay: `${(i % 5) * 0.03}s`,
  };
});

/**
 * One-shot confetti burst. Render with a changing `burstKey` to replay.
 * Purely decorative — hidden from screen readers; CSS disables it under reduced motion.
 */
export default function Celebration({ burstKey }) {
  if (burstKey == null) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-visible" key={burstKey}>
      {PIECES.map((p, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{
            '--cx': p.cx,
            '--cy': p.cy,
            '--cr': p.cr,
            background: p.color,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
