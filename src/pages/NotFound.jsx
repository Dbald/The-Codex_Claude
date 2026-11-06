import { Link } from '../utils/router.jsx';

export default function NotFound() {
  return (
    <div className="wrap" style={{ paddingBlock: 'clamp(4rem, 10vw, 7rem)' }}>
      <p className="kicker">Not found</p>
      <h1 className="wide display-lg" style={{ marginTop: '0.9rem' }}>
        That door doesn’t lead anywhere.
      </h1>
      <p className="lead" style={{ marginTop: '1.25rem' }}>
        The page may have moved, or the link may be mistyped.
      </p>
      <div className="cta-row">
        <Link to="/" className="btn btn-teal">
          Back to the homepage
        </Link>
        <Link to="/#trips" className="btn btn-outline">
          See the trips
        </Link>
      </div>
    </div>
  );
}
