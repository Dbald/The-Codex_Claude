// Small synthesised UI sound kit. Tones are generated with the Web Audio API
// rather than shipped as audio files: no network cost, no repo weight, and no
// latency between the tap and the sound.

let ctx = null;
let enabled = true;

export function setSoundEnabled(value) {
  enabled = !!value;
}

export function isSoundEnabled() {
  return enabled;
}

function audio() {
  if (typeof window === 'undefined') return null;
  const Ctor = window.AudioContext || window.webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) {
    try {
      ctx = new Ctor();
    } catch {
      return null;
    }
  }
  // Browsers start the context suspended until a user gesture; every sound
  // here is triggered by one, so resuming on demand is safe.
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

/** A single shaped tone. Envelope keeps it soft — UI sound, not an alarm. */
function tone(ac, { freq, at = 0, dur = 0.09, gain = 0.16, type = 'sine', slideTo }) {
  const osc = ac.createOscillator();
  const amp = ac.createGain();
  const t0 = ac.currentTime + at;

  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);

  amp.gain.setValueAtTime(0.0001, t0);
  amp.gain.exponentialRampToValueAtTime(gain, t0 + 0.012);
  amp.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

  osc.connect(amp).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

const NOTE = { C5: 523.25, E5: 659.25, G5: 783.99, A5: 880, C6: 1046.5, E6: 1318.5 };

const SOUNDS = {
  // Neutral tick for navigation and selection
  tap: ac => tone(ac, { freq: 620, dur: 0.05, gain: 0.09, type: 'triangle' }),

  // Toggling something on / off
  save: ac => {
    tone(ac, { freq: NOTE.C5, dur: 0.07, gain: 0.13 });
    tone(ac, { freq: NOTE.G5, at: 0.06, dur: 0.11, gain: 0.13 });
  },
  unsave: ac => {
    tone(ac, { freq: NOTE.G5, dur: 0.07, gain: 0.1 });
    tone(ac, { freq: NOTE.C5, at: 0.06, dur: 0.1, gain: 0.1 });
  },

  // Marking a lesson learned — small rising arpeggio
  learn: ac => {
    tone(ac, { freq: NOTE.C5, dur: 0.08, gain: 0.14 });
    tone(ac, { freq: NOTE.E5, at: 0.07, dur: 0.08, gain: 0.14 });
    tone(ac, { freq: NOTE.G5, at: 0.14, dur: 0.16, gain: 0.15 });
  },

  correct: ac => {
    tone(ac, { freq: NOTE.E5, dur: 0.08, gain: 0.15 });
    tone(ac, { freq: NOTE.A5, at: 0.07, dur: 0.08, gain: 0.15 });
    tone(ac, { freq: NOTE.E6, at: 0.14, dur: 0.2, gain: 0.14 });
  },

  // Gentle, never harsh — a wrong answer is part of learning
  wrong: ac => {
    tone(ac, { freq: 300, dur: 0.1, gain: 0.11, type: 'triangle' });
    tone(ac, { freq: 226, at: 0.09, dur: 0.16, gain: 0.1, type: 'triangle' });
  },

  // Ticking a step on a challenge checklist
  check: ac => tone(ac, { freq: NOTE.A5, dur: 0.06, gain: 0.1, type: 'triangle' }),

  // Finishing a challenge
  complete: ac => {
    tone(ac, { freq: NOTE.C5, dur: 0.09, gain: 0.14 });
    tone(ac, { freq: NOTE.E5, at: 0.08, dur: 0.09, gain: 0.14 });
    tone(ac, { freq: NOTE.G5, at: 0.16, dur: 0.09, gain: 0.14 });
    tone(ac, { freq: NOTE.C6, at: 0.24, dur: 0.26, gain: 0.15 });
  },

  // Unlocking a whole tier — the biggest moment in the app
  unlock: ac => {
    tone(ac, { freq: NOTE.C5, dur: 0.1, gain: 0.15 });
    tone(ac, { freq: NOTE.G5, at: 0.09, dur: 0.1, gain: 0.15 });
    tone(ac, { freq: NOTE.C6, at: 0.18, dur: 0.12, gain: 0.15 });
    tone(ac, { freq: NOTE.E6, at: 0.28, dur: 0.34, gain: 0.16 });
  },

  // Moving between panels in Watch mode
  swipe: ac => tone(ac, { freq: 420, slideTo: 700, dur: 0.11, gain: 0.07, type: 'sine' }),
};

export function playSound(name) {
  if (!enabled) return;
  const fn = SOUNDS[name];
  if (!fn) return;
  const ac = audio();
  if (!ac) return;
  try {
    fn(ac);
  } catch {
    // never let a sound break an interaction
  }
}
