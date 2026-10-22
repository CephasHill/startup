import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChapterReader } from '../components/ChapterReader';
import { NEW_TESTAMENT_BOOKS, loadGospel } from '../data/bible';

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

  useEffect(() => {
    let cancelled = false;

    async function loadSelectedBook() {
      setLoading(true);
      setError('');

      try {
        const data = await loadGospel(selectedBook.slug);

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
  }, [selectedBook.slug]);

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

        {menuOpen && (
          <div className="library-navigator mt-4" id="library-navigator">
            <aside className="library-books" aria-label="Bible books">
              <h2 className="section-title">New Testament</h2>
              <div className="list-group">
                {NEW_TESTAMENT_BOOKS.map((item) => (
                  <Link
                    className={`list-group-item list-group-item-action ${item.slug === selectedBook.slug ? 'active' : ''}`}
                    key={item.slug}
                    to={`/library/${item.slug}/1`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </aside>

            <section className="library-chapters" aria-labelledby="chapter-picker-heading">
              <div className="d-flex justify-content-between align-items-center gap-3">
                <h2 id="chapter-picker-heading" className="mb-0">{selectedBook.name}</h2>
                <span className="text-secondary">{selectedBook.chapters} chapters</span>
              </div>
              <div className="chapter-grid mt-3">
                {Array.from({ length: selectedBook.chapters }, (_, index) => {
                  const chapterNumber = index + 1;

                  return (
                    <Link
                      className={`chapter-button ${activeChapter === chapterNumber ? 'active' : ''}`}
                      key={chapterNumber}
                      to={`/library/${selectedBook.slug}/${chapterNumber}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {chapterNumber}
                    </Link>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {loading && <p className="mt-4">Loading chapter...</p>}
        {error && <p className="alert alert-danger mt-4">{error}</p>}
        {!loading && !error && selectedChapter && (
          <div className="mt-4">
            <ChapterReader chapter={selectedChapter} />
          </div>
        )}
        {!loading && !error && !selectedChapter && (
          <p className="alert alert-warning mt-4">Chapter not found.</p>
        )}
      </div>
    </main>
  );
}
