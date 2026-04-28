import { useState } from 'react';
import SessionSelector from '../components/SessionSelector.jsx';
import Feed from '../components/Feed.jsx';
import { getChannelFeed, getMixedFeed } from '../utils/feed.js';

export default function FeedPage({ initialChannel, progress, onSave, onLearn, onComplete, onAnswer, onView, onBack }) {
  const [session, setSession] = useState(
    initialChannel ? { channel: initialChannel, duration: 10 } : null
  );

  function handleStart(sessionConfig) {
    setSession(sessionConfig);
  }

  function buildFeed(channel) {
    if (channel === 'Mixed') {
      return getMixedFeed(progress.viewedCardIds);
    }
    return getChannelFeed(channel, progress.viewedCardIds);
  }

  if (!session) {
    return <SessionSelector onStart={handleStart} onBack={onBack} />;
  }

  const cards = buildFeed(session.channel);

  return (
    <Feed
      cards={cards}
      progress={progress}
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
