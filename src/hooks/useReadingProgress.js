import { useState } from 'react';

const progressStorageKey = 'nt-connect-progress';

function getSavedProgress() {
  return JSON.parse(localStorage.getItem(progressStorageKey) || 'null') || {};
}

export function useReadingProgress(assignedReadings, readingDate) {
  const [completedReadings, setCompletedReadings] = useState(() => {
    const savedProgress = getSavedProgress();

    return savedProgress.readingDate === readingDate
      ? (savedProgress.completedReadings || []).filter((id) =>
        assignedReadings.some((reading) => reading.id === id)
      )
      : [];
  });

  return [completedReadings, setCompletedReadings];
}
