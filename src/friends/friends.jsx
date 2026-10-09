import React from 'react';

export function Friends() {
  return (
    <main className="container page-shell">
      <div className="card content-panel accent-top p-4 p-md-5">
        <h2>Friends</h2>

      <section aria-labelledby="friends-list-heading">
        <h3 id="friends-list-heading" className="section-title mt-4">Reading Friends</h3>
        <ul className="list-group mb-4">
          <li className="list-group-item d-flex justify-content-between">
            <strong>Alex Johnson</strong>
            <span>7 day reading streak</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <strong>Maria Smith</strong>
            <span>Completed today's reading</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <strong>Jordan Lee</strong>
            <span>3 day reading streak</span>
          </li>
        </ul>
      </section>

      <section aria-labelledby="updates-heading">
        <h3 id="updates-heading" className="section-title">Live Updates</h3>
        <p id="live-updates" className="alert alert-info">Friend activity and shared verses will appear here.</p>
      </section>
      </div>
    </main>
  );
}