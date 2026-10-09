import React from 'react';

export function About() {
  return (
    <main className="container page-shell">
      <div className="card content-panel accent-top p-4 p-md-5">
        <div id="picture" className="picture-box mb-4">
          <img className="img-fluid rounded" width="400" src="placeholder.jpg" alt="Daily inspirational image placeholder" />
        </div>

      <p>
        Building a daily Bible reading habit is hard to do entirely alone. Daily New Testament takes structured New Testament reading plans and transforms them into a shared, social experience. Users can log in, read their daily chapters, track their streaks, and instantly share their favorite verses with a network of friends. By adding live streak updates and real-time verse sharing, the app takes what is typically a solitary activity and turns it into a supportive, community-driven habit.
      </p>

      <div className="quote verse bg-light p-3">
        <div>Words are cheap. Show me the code.</div>
        <div>- Linus Torvalds</div>
      </div>
      </div>
    </main>
  );
}