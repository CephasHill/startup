import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChapterReader } from '../components/ChapterReader';
import {
  BIBLE_VERSIONS,
  NEW_TESTAMENT_BOOKS,
  getSavedBibleVersion,
  loadGospel,
  saveBibleVersion,
} from '../data/bible';

const lastLibraryChapterKey = 'nt-connect-last-library-chapter';

function getLastLibraryChapter() {
  return JSON.parse(localStorage.getItem(lastLibraryChapterKey) || 'null')
    || { book: 'john', chapter: 1 };
}

export function Library() {
  const { book, chapter } = useParams();
  const lastChapter = getLastLibraryChapter();
  const activeBookSlug = book || lastChapter.book;
  const selectedBook = NEW_TESTAMENT_BOOKS.find((item) => item.slug === activeBookSlug)
    || NEW_TESTAMENT_BOOKS.find((item) => item.slug === 'john');
  const activeChapter = Number(chapter || (book ? 1 : lastChapter.chapter));
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [browseBookSlug, setBrowseBookSlug] = useState(activeBookSlug);
  const [bibleVersion, setBibleVersion] = useState(getSavedBibleVersion);

  useEffect(() => {
    setBrowseBookSlug(activeBookSlug);
  }, [activeBookSlug]);

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    }

    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  const browseBook = NEW_TESTAMENT_BOOKS.find((item) => item.slug === browseBookSlug)
    || selectedBook;

  useEffect(() => {
    let cancelled = false;

    async function loadSelectedBook() {
      setLoading(true);
      setError('');

      try {
        const data = await loadGospel(selectedBook.slug, bibleVersion);

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

    loadSelectedBook();

    return () => {
      cancelled = true;
    };
  }, [bibleVersion, selectedBook.slug]);

  const changeBibleVersion = (event) => {
    const nextVersion = event.target.value;
    setBibleVersion(nextVersion);
    saveBibleVersion(nextVersion);
  };

  useEffect(() => {
    if (activeChapter >= 1 && activeChapter <= selectedBook.chapters) {
      localStorage.setItem(
        lastLibraryChapterKey,
        JSON.stringify({ book: selectedBook.slug, chapter: activeChapter })
      );
    }
  }, [activeChapter, selectedBook.slug, selectedBook.chapters]);

  const selectedChapter = chapters.find((item) => item.chapter === activeChapter);

  return (
    <main className="container page-shell">
      <div className="card content-panel accent-top p-4 p-md-5">
        <div className="library-reading-header">
          <div>
            <p className="section-title mb-1">Bible Library</p>
            <h1 className="mb-0">{selectedBook.name} {activeChapter}</h1>
          </div>
          <div className="d-flex flex-wrap align-items-center gap-2">
            <label className="visually-hidden" htmlFor="bible-version">Bible version</label>
            <select
              className="form-select"
              id="bible-version"
              value={bibleVersion}
              onChange={changeBibleVersion}
            >
              {BIBLE_VERSIONS.map((version) => (
                <option key={version.value} value={version.value}>{version.label}</option>
              ))}
            </select>
            <button
              className="btn btn-outline-primary"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="library-navigator"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? 'Close navigator' : 'Browse Bible'}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="library-overlay" onClick={() => setMenuOpen(false)}>
            <div
              className="library-navigator"
              id="library-navigator"
              role="dialog"
              aria-modal="true"
              aria-label="Bible navigator"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="library-navigator-header">
                <h2 className="mb-0">Browse Bible</h2>
                <button
                  className="library-close"
                  type="button"
                  aria-label="Close Bible navigator"
                  onClick={() => setMenuOpen(false)}
                >
                  &times;
                </button>
              </div>

              <div className="library-navigator-content">
                <aside className="library-books" aria-label="Bible books">
                  <h3 className="section-title">New Testament</h3>
                  <div className="list-group">
                    {NEW_TESTAMENT_BOOKS.map((item) => (
                      <button
                        className={`list-group-item list-group-item-action text-start ${item.slug === browseBook.slug ? 'active' : ''}`}
                        key={item.slug}
                        type="button"
                        onClick={() => setBrowseBookSlug(item.slug)}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </aside>

                <section className="library-chapters" aria-labelledby="chapter-picker-heading">
                  <div className="d-flex justify-content-between align-items-center gap-3">
                    <h3 id="chapter-picker-heading" className="mb-0">{browseBook.name}</h3>
                    <span className="text-secondary">{browseBook.chapters} chapters</span>
                  </div>
                  <div className="chapter-grid mt-3">
                    {Array.from({ length: browseBook.chapters }, (_, index) => {
                      const chapterNumber = index + 1;

                      return (
                        <Link
                          className={`chapter-button ${browseBook.slug === selectedBook.slug && activeChapter === chapterNumber ? 'active' : ''}`}
                          key={chapterNumber}
                          to={`/library/${browseBook.slug}/${chapterNumber}`}
                        >
                          {chapterNumber}
                        </Link>
                      );
                    })}
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}

        {loading && <p className="mt-4">Loading chapter...</p>}
        {error && <p className="alert alert-danger mt-4">{error}</p>}
        {!loading && !error && selectedChapter && (
          <div className="mt-4">
            <ChapterReader chapter={selectedChapter} showHeading={false} />
          </div>
        )}
        {!loading && !error && !selectedChapter && (
          <p className="alert alert-warning mt-4">Chapter not found.</p>
        )}
      </div>
    </main>
  );
}
