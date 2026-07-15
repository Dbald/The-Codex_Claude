import { CHANNEL_CONFIG, getUnlockedCards, getUnlockState } from '../utils/feed.js';
import ProgressBar from './ProgressBar.jsx';

export default function ChannelCard({ channel, progress, onClick }) {
  const config = CHANNEL_CONFIG[channel];
  const unlock = getUnlockState(channel, progress);
  const availableCards = getUnlockedCards(channel, progress);
  const lessons = availableCards.filter(c => c.type === 'lesson');
  const learned = lessons.filter(c => progress.learnedCardIds.includes(c.id));
  const quizzes = availableCards.filter(c => c.type === 'quiz');
  const quizzed = quizzes.filter(c => progress.quizResults.some(r => r.cardId === c.id));

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl p-5 hover-lift active:scale-[0.98] border"
      style={{
        background: 'var(--surface)',
        borderColor: config.accentBorder,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="flex items-center justify-center rounded-xl text-xl"
            style={{ width: 42, height: 42, background: config.accentLight }}
          >
            {config.icon}
          </span>
          <div>
            <h3 className="text-base font-bold text-white">{channel}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{config.description}</p>
          </div>
        </div>
        <div
          className="text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
          style={{ background: config.accentLight, color: config.accent }}
        >
          {availableCards.length} cards
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>Lessons learned</span>
          <span style={{ color: config.accent }}>{learned.length}/{lessons.length}</span>
        </div>
        <ProgressBar value={learned.length} max={lessons.length} color={config.accent} />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>Quizzes done</span>
          <span style={{ color: config.accent }}>{quizzed.length}/{quizzes.length}</span>
        </div>
      </div>

      {/* Level 2 progression */}
      {unlock.unlocked ? (
        <div
          className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold"
          style={{ background: config.accentLight, color: config.accent }}
        >
          <span aria-hidden="true">🏆</span> Level 2 unlocked — 18 new cards in your feed!
        </div>
      ) : (
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-500">
              <span aria-hidden="true">🔒</span> Level 2 · {unlock.remaining} more lesson{unlock.remaining !== 1 ? 's' : ''} to unlock
            </span>
            <span className="text-slate-500">{unlock.learned}/{unlock.threshold}</span>
          </div>
          <ProgressBar value={unlock.learned} max={unlock.threshold} color="#fbbf24" height={4} />
        </div>
      )}
    </button>
  );
}
