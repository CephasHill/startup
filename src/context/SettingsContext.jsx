import React, { createContext, useContext, useState } from 'react';
import { BIBLE_VERSIONS, getSavedBibleVersion, saveBibleVersion } from '../data/bible';

const progressStorageKey = 'nt-connect-progress';
const defaultPlan = '5x5 Weekday Plan';

const SettingsContext = createContext(null);

function getSavedPlan() {
  const savedProgress = JSON.parse(localStorage.getItem(progressStorageKey) || 'null') || {};

  return savedProgress.plan === defaultPlan ? savedProgress.plan : defaultPlan;
}

export function SettingsProvider({ children }) {
  const [bibleVersion, setBibleVersionState] = useState(getSavedBibleVersion);
  const [plan, setPlan] = useState(getSavedPlan);

  const setBibleVersion = (version) => {
    if (BIBLE_VERSIONS.some((availableVersion) => availableVersion.value === version)) {
      setBibleVersionState(version);
      saveBibleVersion(version);
    }
  };

  return (
    <SettingsContext.Provider value={{ bibleVersion, setBibleVersion, plan, setPlan }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const settings = useContext(SettingsContext);

  if (!settings) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }

  return settings;
}
