/** The Codex mark: four dots, one per trip colour plus ink. */
export default function BrandDots({ inkColor = 'var(--ink, #121417)' }) {
  return (
    <span className="brand__dots" aria-hidden="true">
      <span style={{ background: '#00756f' }} />
      <span style={{ background: '#2f3bd4' }} />
      <span style={{ background: '#ef6a1f' }} />
      <span style={{ background: inkColor }} />
    </span>
  );
}
