import React, { useEffect, useState } from 'react';

const mockUpdates = [
  {
    id: 'john-shared-verse',
    friend: 'John son of Zebedee',
    message: 'completed today\'s reading and shared a verse from John 1.',
  },
  {
    id: 'mary-reading',
    friend: 'Mary of Magdala',
    message: 'started today\'s reading.',
  },
  {
    id: 'simon-streak',
    friend: 'Simon Bar Jonah',
    message: 'reached an 8 day reading streak.',
  },
  {
    id: 'mary-completed',
    friend: 'Mary of Magdala',
    message: 'completed today\'s reading.',
  },
];

export function Friends() {
  const [updates, setUpdates] = useState([mockUpdates[0]]);

  useEffect(() => {
    let nextUpdateIndex = 1;

    const intervalId = setInterval(() => {
      const nextUpdate = {
        ...mockUpdates[nextUpdateIndex],
        id: `${mockUpdates[nextUpdateIndex].id}-${Date.now()}`,
      };

      setUpdates((currentUpdates) => [nextUpdate, ...currentUpdates].slice(0, 5));
      nextUpdateIndex = (nextUpdateIndex + 1) % mockUpdates.length;
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="container page-shell">
      <div className="card content-panel accent-top p-4 p-md-5">
        <h2>Friends</h2>

      <section aria-labelledby="friends-list-heading">
        <h3 id="friends-list-heading" className="section-title mt-4">Reading Friends</h3>
        <ul className="list-group mb-4">
          <li className="list-group-item d-flex justify-content-between">
            <strong>Simon Bar Jonah</strong>
            <span>7 day reading streak</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <strong>John son of Zebedee</strong>
            <span>Completed today's reading</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <strong>Mary of Magdala</strong>
            <span>3 day reading streak</span>
          </li>
        </ul>
      </section>

      <section aria-labelledby="updates-heading">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
          <h3 id="updates-heading" className="section-title mb-0">Live Updates</h3>
          <span className="badge text-bg-success">Mock live feed</span>
        </div>
        <ul id="live-updates" className="list-group mt-3" aria-live="polite">
          {updates.map((update, index) => (
            <li className="list-group-item" key={update.id}>
              <strong>{update.friend}</strong> {update.message}
              {index === 0 && <span className="d-block small text-secondary">Just now</span>}
            </li>
          ))}
        </ul>
      </section>
      </div>
    </main>
  );
}