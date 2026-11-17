import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAssignedReadings, getReadingDateKey } from '../data/readingPlan';

const progressStorageKey = 'nt-connect-progress';

function getSavedProgress() {
  return JSON.parse(localStorage.getItem(progressStorageKey) || 'null') || {};
}

export function ProgressProvider({ children, authenticated = false }) {
  const savedProgress = getSavedProgress();
  const readingDate = getReadingDateKey();
  const assignedReadingIds = getAssignedReadings().map((reading) => reading.id);
  const [completedReadings, setCompletedReadings] = useState(() => (
    savedProgress.readingDate === readingDate
      ? (savedProgress.completedReadings || []).filter((id) => assignedReadingIds.includes(id))
      : []
  ));
  const [streak, setStreak] = useState(savedProgress.streak || 0);
  const [progressLoaded, setProgressLoaded] = useState(false);

  useEffect(() => {
    if (!authenticated) {
      setProgressLoaded(true);
      return;
    }

    let cancelled = false;

    fetch('/api/progress')
      .then((response) => {
        if (response.status === 401) {
          return {};
        }
        if (!response.ok) {
          throw new Error('Unable to load reading progress');
        }
        return response.json();
      })
      .then((progress) => {
        if (cancelled) return;

        const serverProgress = progress.readingDate === readingDate
          ? (progress.completedReadings || []).filter((id) => assignedReadingIds.includes(id))
          : [];
        setCompletedReadings(serverProgress);
        setStreak(progress.streak || 0);
        setProgressLoaded(true);
      })
      .catch(() => {
        if (!cancelled) setProgressLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, [authenticated, readingDate]);

  useEffect(() => {
    if (!progressLoaded) return;

    const currentProgress = getSavedProgress();
    const nextProgress = {
      ...currentProgress,
      completedReadings,
      streak,
      readingDate,
    };

    localStorage.setItem(progressStorageKey, JSON.stringify(nextProgress));

    if (authenticated) {
      fetch('/api/progress', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(nextProgress),
      }).catch((error) => {
        console.error('Unable to save reading progress', error);
      });
    }
  }, [authenticated, completedReadings, progressLoaded, readingDate, streak]);

  return (
    <ProgressContext.Provider value={{ completedReadings, setCompletedReadings, streak }}>
      {children}
    </ProgressContext.Provider>
  );
}

const ProgressContext = createContext(null);

export function useProgress() {
  const progress = useContext(ProgressContext);

  if (!progress) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }

  return progress;
}
