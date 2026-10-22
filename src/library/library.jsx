import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChapterReader } from '../components/ChapterReader';
import { GOSPELS, loadGospel } from '../data/bible';

export function Library() {
  const { book, chapter } = useParams();
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(Boolean(book));
  const [error, setError] = useState('');

  useEffect(() => {
    if (!book) {
      setChapters([]);
      setLoading(false);
      setError('');
      return undefined;
    }

    let cancelled = false;

    async function loadSelectedGospel() {
      setLoading(true);
      setError('');

      try {
        const data = await loadGospel(book);

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

    loadSelectedGospel();

    return () => {
      cancelled = true;
    };
  }, [book]);

  const selectedChapter = chapters.find(
    (item) => item.chapter === Number(chapter)
  );

  return (
    <main className="container page-shell">
      <div className="card content-panel accent-top p-4 p-md-5">
        <h1>Bible Library</h1>
        <p className="lead">Browse the New Testament and read any chapter outside your daily plan.</p>

      <section aria-labelledby="chapters-heading">
        <h3 id="chapters-heading" className="section-title mt-4">Gospel Chapters</h3>
        <div className="row g-4">
          {GOSPELS.map((gospel) => (
            <section className="col-12 col-md-6" key={gospel.slug}>
              <h4>{gospel.name}</h4>
              <div className="d-flex flex-wrap gap-2">
                {Array.from({ length: gospel.chapters }, (_, index) => {
                  const chapterNumber = index + 1;

                  return (
                    <Link
                      className="btn btn-outline-primary"
                      key={chapterNumber}
                      to={`/library/${gospel.slug}/${chapterNumber}`}
                    >
                      {chapterNumber}
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </section>

      {book && loading && <p className="mt-4">Loading chapter...</p>}
      {book && error && <p className="alert alert-danger mt-4">{error}</p>}
      {book && !loading && !error && selectedChapter && (
        <div className="mt-4">
          <ChapterReader chapter={selectedChapter} />
        </div>
      )}
      {book && !loading && !error && !selectedChapter && (
        <p className="alert alert-warning mt-4">Chapter not found.</p>
      )}
      </div>
    </main>
  );
}