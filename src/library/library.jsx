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
        <h2>Reading Library</h2>

      <section aria-labelledby="progress-heading">
        <h3 id="progress-heading" className="section-title mt-4">Your Progress</h3>
        <dl>
          <dt>Current plan</dt>
          <dd>5x5 Weekday Plan</dd>
          <dt>Reading streak</dt>
          <dd>7 days</dd>
          <dt>Today's progress</dt>
          <dd>1 of 5 chapters completed</dd>
        </dl>
        <progress className="w-100" value="1" max="5" aria-label="Reading Progress">1 of 5 chapters completed</progress>
      </section>

      <section aria-labelledby="settings-heading">
        <h3 id="settings-heading" className="section-title mt-4">Reading Settings</h3>
        <form className="row g-3 align-items-end">
          <div className="col-md-5">
            <label className="form-label" htmlFor="reading-plan">Reading plan</label>
            <select className="form-select" id="reading-plan" name="reading-plan">
              <option>5x5 Weekday Plan</option>
              <option>90-Day Sprint</option>
            </select>
          </div>

          <div className="col-md-5">
            <label className="form-label" htmlFor="translation">Translation</label>
            <select className="form-select" id="translation" name="translation">
              <option>Berean Standard Bible</option>
              <option>King James Version</option>
            </select>
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100" type="submit">Save</button>
          </div>
        </form>
      </section>

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

      <section aria-labelledby="bookmarks-heading">
        <h3 id="bookmarks-heading" className="section-title mt-4">Saved Bookmarks</h3>
        <ul className="list-group">
          <li className="list-group-item">John 1:1 - saved verse placeholder</li>
          <li className="list-group-item">John 1:14 - saved verse placeholder</li>
        </ul>
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