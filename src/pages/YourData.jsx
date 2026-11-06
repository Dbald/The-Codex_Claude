import { useState } from 'react';
import { clearProgress } from '../utils/storage.js';
import { playSound } from '../utils/sound.js';

export default function YourData() {
  const [stage, setStage] = useState('idle'); // idle → confirm → done

  function reset() {
    clearProgress();
    // The reef lesson keeps its own progress (steps, creatures found, labels).
    try {
      localStorage.removeItem('codex_worlds');
    } catch {
      // storage unavailable — nothing to erase
    }
    playSound('tap');
    setStage('done');
  }

  return (
    <div className="wrap" style={{ paddingBlock: 'clamp(3rem, 7vw, 5rem)' }}>
      <article className="prose">
        <p className="kicker">Privacy</p>
        <h1 className="wide display-lg" style={{ marginTop: '0.9rem' }}>
          Your data on The Codex
        </h1>
        <p style={{ marginTop: '1.25rem' }}>
          A plain description of what this app does with your information. It is not a legal privacy policy.
        </p>

        <h2>What’s stored, and where</h2>
        <p>
          Your progress — cards you’ve saved, lessons you’ve marked learned, quiz answers, cards you’ve viewed, your
          streak, where you stopped in each feed, and how far you got in a world lesson (the step you reached, the
          creatures you logged, and whether labels were on) — is stored in <strong>this browser, on this device</strong>.
          So are your settings: text size, contrast, motion, sound, and whether videos start muted.
        </p>

        <h2>What isn’t</h2>
        <p>
          There are no accounts and no sign-in. The app doesn’t send your progress anywhere, and it doesn’t use
          analytics or advertising trackers. Like any website, the hosting provider may keep standard server logs.
        </p>

        <h2>If you sign up</h2>
        <p>
          The early-access and “Notify me” forms send what you type — such as your name and email — to our sign-up list,
          which is stored by our hosting provider, Netlify. We use it only to email you about The Codex, and never sell or
          share it. These forms are meant for parents, teachers and librarians.
        </p>

        <h2>The 3D worlds</h2>
        <p>
          Ocean Explorer runs inside The Codex but is its own app, loaded from its own address. It tells The Codex which
          step you’re on and which creatures you’ve found, so your progress can be shown here.
        </p>

        <h2>What that means for you</h2>
        <ul>
          <li>Your progress won’t follow you to another device or another browser.</li>
          <li>Clearing your browser’s site data erases it.</li>
          <li>Private or incognito windows don’t keep it after they close.</li>
        </ul>

        <h2>Start over</h2>
        <p>Erase your saved progress on this device. Your display settings stay as they are.</p>

        <div aria-live="polite" style={{ marginTop: '1rem' }}>
          {stage === 'idle' && (
            <button type="button" className="btn btn-outline" onClick={() => setStage('confirm')}>
              Reset my progress
            </button>
          )}
          {stage === 'confirm' && (
            <div className="callout" style={{ display: 'grid', gap: '1rem' }}>
              <span>
                <strong>Erase all progress on this device?</strong> This can’t be undone.
              </span>
              <div className="cta-row" style={{ marginTop: 0 }}>
                <button type="button" className="btn btn-teal" onClick={reset}>
                  Yes, erase it
                </button>
                <button type="button" className="btn btn-outline" onClick={() => setStage('idle')}>
                  Cancel
                </button>
              </div>
            </div>
          )}
          {stage === 'done' && <p style={{ color: 'var(--teal)', fontWeight: 700 }}>Your progress has been erased.</p>}
        </div>
      </article>
    </div>
  );
}
