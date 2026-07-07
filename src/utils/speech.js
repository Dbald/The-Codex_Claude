let currentOwner = null;

export function speechAvailable() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function speak(text, onEnd, owner = null) {
  if (!speechAvailable()) return null;
  window.speechSynthesis.cancel();
  currentOwner = owner;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }
  window.speechSynthesis.speak(utterance);
  return utterance;
}

// With an owner, only cancels if that owner started the current playback —
// so one card unmounting can't cut off another card's narration.
export function stopSpeaking(owner = null) {
  if (!speechAvailable()) return;
  if (owner !== null && owner !== currentOwner) return;
  currentOwner = null;
  window.speechSynthesis.cancel();
}
