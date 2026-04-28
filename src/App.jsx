import { useState, useCallback } from 'react';
import AppShell from './components/AppShell.jsx';
import Home from './pages/Home.jsx';
import FeedPage from './pages/FeedPage.jsx';
import Saved from './pages/Saved.jsx';
import Progress from './pages/Progress.jsx';
import { loadProgress } from './utils/storage.js';
import {
  markCardViewed,
  toggleSaved,
  markLearned,
  markChallengeComplete,
  recordQuizResult,
} from './utils/progress.js';

export default function App() {
  const [page, setPage] = useState('home');
  const [feedChannel, setFeedChannel] = useState(null);
  const [progress, setProgress] = useState(() => loadProgress());

  const refreshProgress = useCallback(() => {
    setProgress(loadProgress());
  }, []);

  function handleNavigate(newPage) {
    setPage(newPage);
    setFeedChannel(null);
  }

  function handleStartSession() {
    setFeedChannel(null);
    setPage('feed');
  }

  function handleOpenChannel(channel) {
    setFeedChannel(channel);
    setPage('feed');
  }

  function handleBack() {
    setPage('home');
    setFeedChannel(null);
    refreshProgress();
  }

  function handleSave(cardId) {
    toggleSaved(cardId);
    refreshProgress();
  }

  function handleLearn(cardId) {
    markLearned(cardId);
    refreshProgress();
  }

  function handleComplete(cardId) {
    markChallengeComplete(cardId);
    refreshProgress();
  }

  function handleAnswer(cardId, selectedAnswer, isCorrect) {
    recordQuizResult(cardId, selectedAnswer, isCorrect);
    refreshProgress();
  }

  function handleView(cardId) {
    markCardViewed(cardId);
    refreshProgress();
  }

  const showNav = page !== 'feed';

  return (
    <AppShell currentPage={showNav ? page : null} onNavigate={handleNavigate} hideNav={!showNav}>
      {page === 'home' && (
        <Home
          progress={progress}
          onStartSession={handleStartSession}
          onOpenChannel={handleOpenChannel}
        />
      )}
      {page === 'feed' && (
        <FeedPage
          initialChannel={feedChannel}
          progress={progress}
          onSave={handleSave}
          onLearn={handleLearn}
          onComplete={handleComplete}
          onAnswer={handleAnswer}
          onView={handleView}
          onBack={handleBack}
        />
      )}
      {page === 'saved' && (
        <Saved
          progress={progress}
          onSave={handleSave}
          onLearn={handleLearn}
          onComplete={handleComplete}
          onAnswer={handleAnswer}
        />
      )}
      {page === 'progress' && (
        <Progress progress={progress} />
      )}
    </AppShell>
  );
}
