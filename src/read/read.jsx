import React, { useEffect, useState } from 'react';
import { ChapterReader } from '../components/ChapterReader';
import { loadGospel } from '../data/bible';

export function Read() {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadChapters() {
      setLoading(true);
      setError('');

      try {
        const data = await loadGospel('john');

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

    loadChapters();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <main className="container page-shell">Loading chapter...</main>;
  }

  if (error) {
    return <main className="container page-shell">{error}</main>;
  }

  const chapterData = chapters.find((item) => item.chapter === 1);

  if (!chapterData) {
    return (
      <main className="container page-shell">
        Chapter not found.
      </main>
    );
  }

  return <ChapterReader chapter={chapterData} />;
}