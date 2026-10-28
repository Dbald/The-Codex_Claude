// Dots ride the outer ring (angle in degrees, 0 = top, clockwise).
const DOTS = [
  { angle: 0, color: 'var(--violet)' },
  { angle: 96, color: 'var(--teal)' },
  { angle: 236, color: 'var(--yellow)' },
];

// Dotted ring: dash + gap sized to divide the circumference evenly (120 dots),
// so the drifting pattern has no seam.
const RING_R = 43.5;
const CIRCUMFERENCE = 2 * Math.PI * RING_R;
const DOT_PITCH = CIRCUMFERENCE / 120;

/**
 * The hero's circular doorway into the first world.
 *
 * Motion is done without rotating any box-sized element: a rotated square's
 * bounding box is up to √2 wider, which widened the page by ~60px on phones.
 * The dots orbit on a zero-size hub, and the dotted ring drifts via its dash
 * offset. All of it stops under reduced motion.
 */
export default function Portal({ src, alt, title, caption }) {
  return (
    <figure className="portal" style={{ margin: 0 }}>
      <div className="portal__ring" aria-hidden="true" />
      <svg className="portal__dotted" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        <circle
          cx="50"
          cy="50"
          r={RING_R}
          fill="none"
          stroke="rgba(142, 149, 255, 0.45)"
          strokeWidth="0.55"
          strokeLinecap="round"
          strokeDasharray={`0.01 ${DOT_PITCH - 0.01}`}
        />
      </svg>
      <div className="portal__hub" aria-hidden="true">
        {DOTS.map(d => (
          <span key={d.angle} className="portal__dot" style={{ '--a': `${d.angle}deg`, background: d.color }} />
        ))}
      </div>

      <div className="portal__window">
        <img src={src} alt={alt} width="765" height="667" fetchPriority="high" />
      </div>

      <div className="portal__chip" aria-hidden="true">
        PREDICT · CHANGE
        <br />
        OBSERVE · EXPLAIN
      </div>
      <figcaption className="portal__label">
        <strong>{title}</strong>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}
