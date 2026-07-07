import { useState } from 'react';
import SessionSelector from '../components/SessionSelector.jsx';
import Feed from '../components/Feed.jsx';
import { getChannelFeed, getMixedFeed } from '../utils/feed.js';

export default function FeedPage({ initialChannel, progress, settings, onSave, onLearn, onComplete, onAnswer, onView, onBack }) {
  // Card order is frozen when the session starts. Rebuilding it per render
  // would reshuffle the feed under the user every time progress updates.
  const [session, setSession] = useState(
    initialChannel ? { channel: initialChannel, duration: 10 } : null
  );
  const [cards, setCards] = useState(() =>
    initialChannel ? buildFeed(initialChannel, progress.viewedCardIds) : []
  );

  function buildFeed(channel, viewedCardIds) {
    if (channel === 'Mixed') {
      return getMixedFeed(viewedCardIds);
    }
    return getChannelFeed(channel, viewedCardIds);
  }

  function handleStart(sessionConfig) {
    setCards(buildFeed(sessionConfig.channel, progress.viewedCardIds));
    setSession(sessionConfig);
  }

  if (!session) {
    return <SessionSelector onStart={handleStart} onBack={onBack} />;
  }

  return (
    <Feed
      cards={cards}
      progress={progress}
      settings={settings}
      channel={session.channel}
      onSave={onSave}
      onLearn={onLearn}
      onComplete={onComplete}
      onAnswer={onAnswer}
      onView={onView}
      onBack={onBack}
    />
  );
}
