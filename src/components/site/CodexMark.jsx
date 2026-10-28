/** The Codex door mark: an arched doorway with a handle. */
export default function CodexMark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M5 21V10a7 7 0 0 1 14 0v11"
        fill="none"
        stroke="#ffc24b"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3 21h18" stroke="#ffc24b" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="15" cy="15" r="1.4" fill="#ffc24b" />
    </svg>
  );
}
