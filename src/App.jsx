import { useState, useEffect, useCallback } from 'react';
import AppShell from './components/AppShell.jsx';
import SettingsPanel from './components/SettingsPanel.jsx';
import Home from './pages/Home.jsx';
import FeedPage from './pages/FeedPage.jsx';
import Saved from './pages/Saved.jsx';
import Progress from './pages/Progress.jsx';
import { loadProgress } from './utils/storage.js';
import { loadSettings, saveSettings, applySettings } from './utils/settings.js';
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
  const [settings, setSettings] = useState(() => loadSettings());
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [feedMode, setFeedMode] = useState(null);

  useEffect(() => {
    applySettings(settings);
    saveSettings(settings);
  }, [settings]);

  const refreshProgress = useCallback(() => {
    setProgress(loadProgress());
  }, []);

  function handleNavigate(newPage) {
    setPage(newPage);
    setFeedChannel(null);
    setFeedMode(null);
  }

  function handleStartSession() {
    setFeedChannel(null);
    setFeedMode(null);
    setPage('feed');
  }

  function handleOpenChannel(channel) {
    setFeedChannel(channel);
    setPage('feed');
  }

  function handleBack() {
    setPage('home');
    setFeedChannel(null);
    setFeedMode(null);
    refreshProgress();
  }

  const handleSave = useCallback(cardId => {
    toggleSaved(cardId);
    refreshProgress();
  }, [refreshProgress]);

  const handleLearn = useCallback(cardId => {
    markLearned(cardId);
    refreshProgress();
  }, [refreshProgress]);

  const handleComplete = useCallback(cardId => {
    markChallengeComplete(cardId);
    refreshProgress();
  }, [refreshProgress]);

  const handleAnswer = useCallback((cardId, selectedAnswer, isCorrect) => {
    recordQuizResult(cardId, selectedAnswer, isCorrect);
    refreshProgress();
  }, [refreshProgress]);

  const handleView = useCallback(cardId => {
    markCardViewed(cardId);
    refreshProgress();
  }, [refreshProgress]);

  const showNav = page !== 'feed';
  const fullBleed = page === 'feed' && feedMode === 'watch';

  return (
    <AppShell
      currentPage={showNav ? page : null}
      onNavigate={handleNavigate}
      hideNav={!showNav}
      fullBleed={fullBleed}
      onOpenSettings={() => setSettingsOpen(true)}
    >
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
          settings={settings}
          onSave={handleSave}
          onLearn={handleLearn}
          onComplete={handleComplete}
          onAnswer={handleAnswer}
          onView={handleView}
          onBack={handleBack}
          onModeChange={setFeedMode}
        />
      )}
      {page === 'saved' && (
        <Saved
          progress={progress}
          settings={settings}
          onSave={handleSave}
          onLearn={handleLearn}
          onComplete={handleComplete}
          onAnswer={handleAnswer}
        />
      )}
      {page === 'progress' && (
        <Progress progress={progress} />
      )}

      <SettingsPanel
        open={settingsOpen}
        settings={settings}
        onChange={setSettings}
        onClose={() => setSettingsOpen(false)}
      />
    </AppShell>
  );
}
