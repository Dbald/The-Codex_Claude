import { useState } from 'react';
import { ALL_CARDS, CHANNEL_CONFIG } from '../utils/feed.js';
import LessonCard from '../components/LessonCard.jsx';
import QuizCard from '../components/QuizCard.jsx';
import ChallengeCard from '../components/ChallengeCard.jsx';

const FILTERS = ['All', 'Finance', 'Electronics', 'Robotics'];

export default function Saved({ progress, settings, onSave, onLearn, onComplete, onAnswer }) {
  const [filter, setFilter] = useState('All');

  const savedCards = ALL_CARDS.filter(card => progress.savedCardIds.includes(card.id));
  const filtered = filter === 'All' ? savedCards : savedCards.filter(c => c.channel === filter);

  return (
    <div className="px-4 py-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-black text-white mb-1">Saved</h1>
      <p className="text-slate-500 text-sm mb-5">Cards you’ve saved for review.</p>

      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {FILTERS.map(f => {
          const config = f !== 'All' ? CHANNEL_CONFIG[f] : null;
          const isActive = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
              style={{
                background: isActive ? (config ? config.accentLight : 'rgba(167,139,250,0.15)') : 'rgba(255,255,255,0.04)',
                color: isActive ? (config ? config.accent : '#a78bfa') : 'var(--muted)',
                border: `1px solid ${isActive ? (config ? config.accentBorder : '#a78bfa') : 'transparent'}`,
              }}
            >
              {config ? `${config.icon} ${f}` : f}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-4xl mb-4">★</p>
          <h2 className="text-xl font-bold text-white mb-2">Nothing saved yet</h2>
          <p className="text-slate-500 text-sm">
            {filter !== 'All'
              ? `No saved cards in ${filter}.`
              : 'Tap the Save button on any card to keep it here.'}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-5">
        {filtered.map(card => {
          if (card.type === 'lesson') return <LessonCard key={card.id} card={card} progress={progress} settings={settings} onSave={onSave} onLearn={onLearn} />;
          if (card.type === 'quiz') return <QuizCard key={card.id} card={card} progress={progress} settings={settings} onSave={onSave} onAnswer={onAnswer} />;
          if (card.type === 'challenge') return <ChallengeCard key={card.id} card={card} progress={progress} settings={settings} onSave={onSave} onComplete={onComplete} />;
          return null;
        })}
      </div>

      <div className="h-8" />
    </div>
  );
}
