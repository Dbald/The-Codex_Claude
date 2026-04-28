import { CHANNEL_CONFIG, ALL_CARDS } from '../utils/feed.js';
import ProgressBar from './ProgressBar.jsx';

export default function ChannelCard({ channel, progress, onClick }) {
  const config = CHANNEL_CONFIG[channel];
  const channelCards = ALL_CARDS.filter(c => c.channel === channel);
  const lessons = channelCards.filter(c => c.type === 'lesson');
  const learned = lessons.filter(c => progress.learnedCardIds.includes(c.id));
  const quizzes = channelCards.filter(c => c.type === 'quiz');
  const quizzed = quizzes.filter(c => progress.quizResults.some(r => r.cardId === c.id));

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl p-5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] border"
      style={{
        background: '#111118',
        borderColor: config.accentBorder,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-2xl mb-1">{config.icon}</div>
          <h3 className="text-base font-bold text-white">{channel}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{config.description}</p>
        </div>
        <div
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ background: config.accentLight, color: config.accent }}
        >
          {channelCards.length} cards
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
    </button>
  );
}
