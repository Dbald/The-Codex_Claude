import { useEffect, useState } from 'react';
import { subscribeNotice } from '../../utils/notice.js';

/** Single polite live region for site-wide notices. Always mounted, so it announces. */
export default function NoticeHost() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    let timer;
    const unsubscribe = subscribeNotice(msg => {
      setMessage(msg);
      clearTimeout(timer);
      timer = setTimeout(() => setMessage(null), 4000);
    });
    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div aria-live="polite" role="status">
      {message && <div className="notice">{message}</div>}
    </div>
  );
}
