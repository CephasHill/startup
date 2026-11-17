import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAssignedReadings, getReadingDateKey } from '../data/readingPlan';

const progressStorageKey = 'nt-connect-progress';

function getSavedProgress() {
  return JSON.parse(localStorage.getItem(progressStorageKey) || 'null') || {};
}

function parseDateKey(dateKey) {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function getPreviousWeekday(date) {
  const previous = new Date(date);
  previous.setDate(previous.getDate() - 1);

  while (previous.getDay() === 0 || previous.getDay() === 6) {
    previous.setDate(previous.getDate() - 1);
  }

  return previous;
}

function calculateStreak(completedDates, readingDate) {
  const dates = new Set(completedDates);
  let cursor = parseDateKey(readingDate);

  if (cursor.getDay() === 0 || cursor.getDay() === 6) {
    cursor = getPreviousWeekday(cursor);
  }

  if (!dates.has(getReadingDateKey(cursor))) {
    cursor = getPreviousWeekday(cursor);
  }

  let streak = 0;
  while (dates.has(getReadingDateKey(cursor))) {
    streak += 1;
    cursor = getPreviousWeekday(cursor);
  }

  return streak;
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
  const [completedDates, setCompletedDates] = useState(savedProgress.completedDates || []);
  const [streak, setStreak] = useState(savedProgress.streak || 0);
  const [progressLoaded, setProgressLoaded] = useState(false);

  useEffect(() => {
    if (!authenticated) {
      setProgressLoaded(true);
      return;
    }

    setProgressLoaded(false);
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
        const serverCompletedDates = Array.isArray(progress.completedDates)
          ? progress.completedDates
          : serverProgress.length > 0
            ? [readingDate]
            : [];
        setCompletedReadings(serverProgress);
        setCompletedDates(serverCompletedDates);
        setStreak(calculateStreak(serverCompletedDates, readingDate));
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

    const todayIsComplete = assignedReadingIds.length > 0 &&
      assignedReadingIds.every((id) => completedReadings.includes(id));
    const nextCompletedDates = new Set(completedDates);

    if (todayIsComplete) {
      nextCompletedDates.add(readingDate);
    } else {
      nextCompletedDates.delete(readingDate);
    }

    const normalizedDates = Array.from(nextCompletedDates);
    const nextStreak = calculateStreak(normalizedDates, readingDate);

    if (normalizedDates.length !== completedDates.length ||
        normalizedDates.some((date) => !completedDates.includes(date))) {
      setCompletedDates(normalizedDates);
    }
    if (nextStreak !== streak) {
      setStreak(nextStreak);
    }
  }, [
    assignedReadingIds,
    completedDates,
    completedReadings,
    progressLoaded,
    readingDate,
    streak,
  ]);

  useEffect(() => {
    if (!progressLoaded) return;

    const currentProgress = getSavedProgress();
    const nextProgress = {
      ...currentProgress,
      completedReadings,
      completedDates,
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
