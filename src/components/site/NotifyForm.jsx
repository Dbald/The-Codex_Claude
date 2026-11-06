import { useState } from 'react';
import { playSound } from '../../utils/sound.js';

/**
 * One-field sign-up. Posts into the same Netlify form as the full page at
 * /early-access/ (form "codex-early-access"), so every sign-up lands in one
 * inbox, tagged with where it came from.
 */
export default function NotifyForm({ source = 'homepage-notify' }) {
  const [state, setState] = useState('idle'); // idle | sending | done | error

  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    setState('sending');
    const body = new URLSearchParams({
      'form-name': 'codex-early-access',
      'bot-field': form.elements['bot-field'].value,
      email: form.elements.email.value,
      interest_early: 'yes',
      // The notice under the field is the consent statement for this form.
      consent: 'yes',
      source,
    });
    try {
      const res = await fetch('/early-access/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState('done');
      playSound('complete');
    } catch {
      setState('error');
    }
  }

  return (
    <form className="notify" onSubmit={submit} noValidate={false}>
      <label htmlFor="notify-email">Get word when the full reef course opens</label>
      {state === 'done' ? null : (
        <div className="notify__row">
          <input
            id="notify-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            aria-describedby="notify-fine"
          />
          <button type="submit" className="btn btn-ink" disabled={state === 'sending'}>
            {state === 'sending' ? 'Sending…' : 'Notify me'}
          </button>
        </div>
      )}
      {/* Honeypot: hidden from people, filled in by bots */}
      <p className="visually-hidden" aria-hidden="true">
        <label>
          Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <p id="notify-fine" className="notify__fine">
        For parents, teachers and librarians. We’ll only email about the reef course, and never sell or share your
        details.
      </p>
      <div aria-live="polite">
        {state === 'done' && <p className="notify__status">You’re on the list. We’ll be in touch when it opens.</p>}
        {state === 'error' && (
          <p className="notify__status">That didn’t go through. Check your connection and try again.</p>
        )}
      </div>
    </form>
  );
}
