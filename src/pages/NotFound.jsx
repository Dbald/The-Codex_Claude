import { Link } from '../utils/router.jsx';

export default function NotFound() {
  return (
    <div className="wrap" style={{ paddingBlock: 'clamp(4rem, 10vw, 7rem)' }}>
      <p className="eyebrow">Not found</p>
      <h1 className="display-2" style={{ marginTop: '0.9rem' }}>
        That door doesn’t lead anywhere.
      </h1>
      <p className="lead" style={{ marginTop: '1.25rem' }}>
        The page may have moved, or the link may be mistyped.
      </p>
      <div className="cta-row">
        <Link to="/" className="btn btn-primary">
          Back to the homepage
        </Link>
        <Link to="/#worlds" className="btn btn-ghost">
          See the worlds
        </Link>
      </div>
    </div>
  );
}
