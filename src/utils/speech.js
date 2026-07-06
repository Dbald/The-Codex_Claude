export function speechAvailable() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function speak(text, onEnd) {
  if (!speechAvailable()) return null;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }
  window.speechSynthesis.speak(utterance);
  return utterance;
}

export function stopSpeaking() {
  if (speechAvailable()) window.speechSynthesis.cancel();
}
