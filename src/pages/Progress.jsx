import { ALL_CARDS, CHANNEL_CONFIG } from '../utils/feed.js';
import { getChannelStats } from '../utils/progress.js';
import ProgressBar from '../components/ProgressBar.jsx';

export default function Progress({ progress }) {
  const stats = getChannelStats(progress, ALL_CARDS);

  const totalQuizzes = progress.quizResults.length;
  const correctQuizzes = progress.quizResults.filter(r => r.isCorrect).length;
  const accuracy = totalQuizzes > 0 ? Math.round((correctQuizzes / totalQuizzes) * 100) : 0;
  const totalChallenges = progress.completedChallengeIds.length;
  const streak = progress.streak.current;
  const learnedTotal = progress.learnedCardIds.length;

  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-black text-white mb-1">Your Codex</h1>
      <p className="text-slate-500 text-sm mb-6">Evidence of your growth.</p>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="flex flex-col items-center justify-center px-2 py-4 rounded-2xl border text-center" style={{ background: '#111118', borderColor: 'rgba(255,255,255,0.06)' }}>
          <p className="text-3xl font-black text-white">{streak}</p>
          <p className="text-xs text-slate-500 mt-0.5">Day streak</p>
          {streak > 0 && <span className="text-base mt-0.5">🔥</span>}
        </div>
        <div className="flex flex-col items-center justify-center px-2 py-4 rounded-2xl border text-center" style={{ background: '#111118', borderColor: 'rgba(255,255,255,0.06)' }}>
          <p className="text-3xl font-black text-white">{learnedTotal}</p>
          <p className="text-xs text-slate-500 mt-0.5">Lessons learned</p>
        </div>
        <div className="flex flex-col items-center justify-center px-2 py-4 rounded-2xl border text-center" style={{ background: '#111118', borderColor: 'rgba(255,255,255,0.06)' }}>
          <p className="text-3xl font-black text-white">{progress.viewedCardIds.length}</p>
          <p className="text-xs text-slate-500 mt-0.5">Cards viewed</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Channel Progress</p>
        <div className="flex flex-col gap-3">
          {stats.map(({ channel, learned, quizzed, challenged }) => {
            const config = CHANNEL_CONFIG[channel];
            const lessons = ALL_CARDS.filter(c => c.channel === channel && c.type === 'lesson');
            const quizzes = ALL_CARDS.filter(c => c.channel === channel && c.type === 'quiz');
            const challenges = ALL_CARDS.filter(c => c.channel === channel && c.type === 'challenge');
            return (
              <div key={channel} className="rounded-2xl p-4 border" style={{ background: '#111118', borderColor: config.accentBorder }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{config.icon}</span>
                    <span className="font-bold text-white">{channel}</span>
                  </div>
                  <span className="text-xs font-semibold" style={{ color: config.accent }}>{learned}/{lessons.length} lessons</span>
                </div>
                <div className="space-y-2.5">
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Lessons</span><span>{learned}/{lessons.length}</span></div>
                    <ProgressBar value={learned} max={lessons.length} color={config.accent} />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Quizzes</span><span>{quizzed}/{quizzes.length}</span></div>
                    <ProgressBar value={quizzed} max={quizzes.length} color={config.accent} height={4} />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Challenges</span><span>{challenged}/{challenges.length}</span></div>
                    <ProgressBar value={challenged} max={challenges.length} color={config.accent} height={4} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Quiz Performance</p>
        <div className="rounded-2xl p-4 border" style={{ background: '#111118', borderColor: 'rgba(251,191,36,0.2)' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-white">Quizzes Completed</span>
            <span className="text-xl font-black text-white">{totalQuizzes}</span>
          </div>
          {totalQuizzes > 0 ? (
            <>
              <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                <span>Accuracy</span>
                <span style={{ color: accuracy >= 70 ? '#10b981' : '#ef4444' }}>{accuracy}%</span>
              </div>
              <ProgressBar value={correctQuizzes} max={totalQuizzes} color={accuracy >= 70 ? '#10b981' : '#ef4444'} />
              <p className="text-xs text-slate-400 mt-2">{correctQuizzes} correct · {totalQuizzes - correctQuizzes} incorrect</p>
            </>
          ) : (
            <p className="text-sm text-slate-400">No quizzes completed yet. Start a feed to answer some!</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Challenges</p>
        <div className="rounded-2xl p-4 border" style={{ background: '#111118', borderColor: 'rgba(251,146,60,0.2)' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-white">Completed</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-white">{totalChallenges}</span>
              <span className="text-slate-400 text-sm">/ 9</span>
            </div>
          </div>
          <ProgressBar value={totalChallenges} max={9} color="#fb923c" height={6} />
        </div>
      </div>

      <div className="h-8" />
    </div>
  );
}
