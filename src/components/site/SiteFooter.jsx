import { Link } from '../../utils/router.jsx';
import { SITE } from '../../config/site.js';
import SmartLink from './SmartLink.jsx';

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <p style={{ margin: 0 }}>© 2026 The Codex · a Devinci Global studio</p>
        <nav aria-label="Footer">
          <SmartLink href={SITE.aboutUrl} notice="The About page isn’t published yet.">
            About
          </SmartLink>
          <Link to="/your-data">Privacy</Link>
          <SmartLink href={SITE.contactUrl} notice="A contact route isn’t connected yet.">
            Contact
          </SmartLink>
        </nav>
      </div>
    </footer>
  );
}
