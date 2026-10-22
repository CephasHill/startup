import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAssignedReadings, getReadingDateKey } from '../data/readingPlan';

const progressStorageKey = 'nt-connect-progress';

function getSavedProgress() {
  return JSON.parse(localStorage.getItem(progressStorageKey) || 'null') || {};
}

export function ProgressProvider({ children }) {
  const savedProgress = getSavedProgress();
  const readingDate = getReadingDateKey();
  const assignedReadingIds = getAssignedReadings().map((reading) => reading.id);
  const [completedReadings, setCompletedReadings] = useState(() => (
    savedProgress.readingDate === readingDate
      ? (savedProgress.completedReadings || []).filter((id) => assignedReadingIds.includes(id))
      : []
  ));
  const [streak] = useState(savedProgress.streak || 0);

  useEffect(() => {
    const currentProgress = getSavedProgress();

    localStorage.setItem(
      progressStorageKey,
      JSON.stringify({
        ...currentProgress,
        completedReadings,
        streak,
        readingDate,
      })
    );
  }, [completedReadings, readingDate, streak]);

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
