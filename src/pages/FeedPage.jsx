import { useState } from 'react';
import SessionSelector from '../components/SessionSelector.jsx';
import Feed from '../components/Feed.jsx';
import ReelsFeed from '../components/ReelsFeed.jsx';
import { getChannelFeed, getMixedFeed } from '../utils/feed.js';

export default function FeedPage({ initialChannel, progress, settings, onSave, onLearn, onComplete, onAnswer, onView, onBack, onModeChange }) {
  // Card order is frozen when the session starts. Rebuilding it per render
  // would reshuffle the feed under the user every time progress updates.
  const [session, setSession] = useState(() => {
    if (!initialChannel) return null;
    onModeChange?.('watch');
    return { channel: initialChannel, duration: 10, mode: 'watch' };
  });
  const [cards, setCards] = useState(() =>
    initialChannel ? buildFeed(initialChannel, progress) : []
  );

  function buildFeed(channel, prog) {
    if (channel === 'Mixed') {
      return getMixedFeed(prog.viewedCardIds, prog);
    }
    return getChannelFeed(channel, prog.viewedCardIds, prog);
  }

  function handleStart(sessionConfig) {
    setCards(buildFeed(sessionConfig.channel, progress));
    setSession(sessionConfig);
    onModeChange?.(sessionConfig.mode);
  }

  if (!session) {
    return <SessionSelector onStart={handleStart} onBack={onBack} />;
  }

  const shared = {
    cards,
    progress,
    settings,
    channel: session.channel,
    onSave,
    onLearn,
    onComplete,
    onAnswer,
    onView,
    onBack,
  };

  return session.mode === 'read' ? <Feed {...shared} /> : <ReelsFeed {...shared} />;
}
