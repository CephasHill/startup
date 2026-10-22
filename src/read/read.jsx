import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChapterReader } from '../components/ChapterReader';
import {
  BIBLE_VERSIONS,
  getSavedBibleVersion,
  loadGospel,
  saveBibleVersion,
} from '../data/bible';
import { getAssignedReadings, getReadingDateKey } from '../data/readingPlan';

const progressStorageKey = 'nt-connect-progress';

function getSavedProgress() {
  return JSON.parse(localStorage.getItem(progressStorageKey) || 'null') || {};
}

export function Read() {
  const { book, chapter } = useParams();
  const navigate = useNavigate();
  const assignedReadings = getAssignedReadings();
  const readingDate = getReadingDateKey();
  const currentReading = assignedReadings.find(
    (reading) => reading.book === book && reading.chapter === Number(chapter)
  ) || assignedReadings[0];
  const currentIndex = assignedReadings.findIndex((reading) => reading.id === currentReading.id);
  const previousReading = assignedReadings[currentIndex - 1];
  const nextReading = assignedReadings[currentIndex + 1];
  const [chapters, setChapters] = useState([]);
  const [bibleVersion, setBibleVersion] = useState(getSavedBibleVersion);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const savedProgress = getSavedProgress();
  const [completedReadings, setCompletedReadings] = useState(
    savedProgress.readingDate === readingDate
      ? (savedProgress.completedReadings || []).filter((id) =>
        assignedReadings.some((reading) => reading.id === id)
      )
      : []
  );

  useEffect(() => {
    if (!book || Number(chapter) !== currentReading.chapter || book !== currentReading.book) {
      navigate(`/read/${currentReading.book}/${currentReading.chapter}`, { replace: true });
    }
  }, [book, chapter, currentReading, navigate]);

  useEffect(() => {
    let cancelled = false;

    async function loadChapter() {
      setLoading(true);
      setError('');

      try {
        const data = await loadGospel(currentReading.book, bibleVersion);

        if (!cancelled) {
          setChapters(data);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadChapter();

    return () => {
      cancelled = true;
    };
  }, [bibleVersion, currentReading.book]);

  useEffect(() => {
    const savedProgress = getSavedProgress();
    localStorage.setItem(
      progressStorageKey,
      JSON.stringify({ ...savedProgress, completedReadings, readingDate })
    );
  }, [completedReadings]);

  const chapterData = chapters.find((item) => item.chapter === currentReading.chapter);
  const isCompleted = completedReadings.includes(currentReading.id);

  const toggleCompleted = () => {
    setCompletedReadings((current) =>
      current.includes(currentReading.id)
        ? current.filter((id) => id !== currentReading.id)
        : [...current, currentReading.id]
    );
  };

  const changeBibleVersion = (event) => {
    const nextVersion = event.target.value;
    setBibleVersion(nextVersion);
    saveBibleVersion(nextVersion);
  };

  if (loading) {
    return <main className="container page-shell">Loading chapter...</main>;
  }

  if (error) {
    return <main className="container page-shell"><p className="alert alert-danger">{error}</p></main>;
  }

  if (!chapterData) {
    return <main className="container page-shell"><p className="alert alert-warning">Chapter not found.</p></main>;
  }

  return (
    <main className="container page-shell reader-main">
      <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
        {previousReading ? (
          <Link className="btn btn-outline-primary" to={`/read/${previousReading.book}/${previousReading.chapter}`}>
            &larr; Previous
          </Link>
        ) : <span />}
        <div className="d-flex flex-column align-items-center gap-1">
          <span className="text-secondary text-center">Reading {currentIndex + 1} of {assignedReadings.length}</span>
          <label className="translation-picker translation-picker-compact" htmlFor="read-bible-version">
            <span>Version</span>
            <select
              id="read-bible-version"
              value={bibleVersion}
              onChange={changeBibleVersion}
            >
              {BIBLE_VERSIONS.map((version) => (
                <option key={version.value} value={version.value}>{version.label}</option>
              ))}
            </select>
          </label>
        </div>
        {nextReading ? (
          <Link className="btn btn-outline-primary" to={`/read/${nextReading.book}/${nextReading.chapter}`}>
            Next &rarr;
          </Link>
        ) : <span />}
      </div>

      <ChapterReader chapter={chapterData} />

      <div className="card p-3 mt-3">
        <label className="d-flex align-items-center gap-3 mb-0">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isCompleted}
            onChange={toggleCompleted}
          />
          <span>
            <strong>Mark {currentReading.label} as complete</strong>
            <span className="d-block text-secondary small">Your progress will be saved to this browser.</span>
          </span>
        </label>
      </div>
    </main>
  );
}
