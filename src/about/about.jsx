import React from 'react';

export function About() {
  const [verse, setVerse] = React.useState(null);
  const [verseError, setVerseError] = React.useState('');

  React.useEffect(() => {
    fetch('/api/verse/random')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load verse');
        }
        return response.json();
      })
      .then(setVerse)
      .catch(() => setVerseError('The daily verse is unavailable right now.'));
  }, []);

  return (
    <main className="container page-shell">
      <div className="card content-panel accent-top p-4 p-md-5">
        <p>
          Building a daily Bible reading habit is hard to do entirely alone. Daily New Testament takes structured New Testament reading plans and transforms them into a shared, social experience. Users can log in, read their daily chapters, track their streaks, and instantly share their favorite verses with a network of friends. By adding live streak updates and real-time verse sharing, the app takes what is typically a solitary activity and turns it into a supportive, community-driven habit.
        </p>

        <div className="quote verse bg-light p-3">
          <h2 className="h5">Random New Testament verse</h2>
          {verse && (
            <>
              <div>{verse.text}</div>
              <div className="mt-2">- {verse.reference} ({verse.translation})</div>
            </>
          )}
          {!verse && !verseError && <div>Loading a verse...</div>}
          {verseError && <div className="text-danger">{verseError}</div>}
        </div>
      </div>
    </main>
  );
}