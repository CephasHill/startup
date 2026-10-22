import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const assignedReadings = [
  { id: 'john-1', label: 'John 1', detail: 'The Word became flesh', to: '/library/john/1' },
  { id: 'matthew-1', label: 'Matthew 1', detail: 'The genealogy of Jesus', to: '/library/matthew/1' },
  { id: 'mark-1', label: 'Mark 1', detail: 'The beginning of the gospel', to: '/library/mark/1' },
  { id: 'luke-1', label: 'Luke 1', detail: 'The birth of John foretold', to: '/library/luke/1' },
  { id: 'john-2', label: 'John 2', detail: 'Jesus performs His first miracle', to: '/library/john/2' },
];

export function Home() {
  const savedProgress = JSON.parse(localStorage.getItem('nt-connect-progress') || 'null');
  const today = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date());
  const [completedReadings, setCompletedReadings] = useState(
    savedProgress?.completedReadings || ['john-1']
  );
  const [plan, setPlan] = useState(savedProgress?.plan || '5x5 Weekday Plan');
  const [streak] = useState(savedProgress?.streak || 7);

  useEffect(() => {
    localStorage.setItem(
      'nt-connect-progress',
      JSON.stringify({ completedReadings, plan, streak })
    );
  }, [completedReadings, plan, streak]);

  const toggleReading = (readingId) => {
    setCompletedReadings((current) =>
      current.includes(readingId)
        ? current.filter((id) => id !== readingId)
        : [...current, readingId]
    );
  };

  return (
    <main className="container page-shell">
      <div className="card content-panel accent-top p-4 p-md-5">
        <div className="d-flex flex-wrap justify-content-between align-items-start gap-3">
          <div>
            <p className="text-uppercase text-secondary small fw-semibold mb-2">{today}</p>
            <h1 className="mb-2">Welcome back to NT Connect</h1>
            <p className="lead mb-0">Keep building your daily New Testament reading habit.</p>
          </div>
          <div className="streak-card text-center p-3 rounded">
            <span className="d-block display-6 fw-bold">{streak}</span>
            <span className="small">day streak</span>
          </div>
        </div>

        <section aria-labelledby="progress-heading">
          <h2 id="progress-heading" className="section-title mt-5">Your progress</h2>
          <div className="d-flex justify-content-between mb-2">
            <span>{completedReadings.length} of {assignedReadings.length} chapters completed</span>
            <strong>{Math.round((completedReadings.length / assignedReadings.length) * 100)}%</strong>
          </div>
          <progress
            className="w-100"
            value={completedReadings.length}
            max={assignedReadings.length}
            aria-label="Today's reading progress"
          />
        </section>

        <section aria-labelledby="plan-heading">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-5">
            <h2 id="plan-heading" className="section-title mb-0">Current plan</h2>
            <label className="visually-hidden" htmlFor="reading-plan">Current reading plan</label>
            <select
              className="form-select plan-select"
              id="reading-plan"
              value={plan}
              onChange={(event) => setPlan(event.target.value)}
            >
              <option>5x5 Weekday Plan</option>
              <option>90-Day Sprint</option>
            </select>
          </div>
          <p className="mt-2 mb-0">Today's assigned readings are ready when you are.</p>
        </section>

        <section aria-labelledby="assigned-heading">
          <h2 id="assigned-heading" className="section-title mt-4">Today's assigned readings</h2>
          <div className="list-group">
            {assignedReadings.map((reading) => {
              const completed = completedReadings.includes(reading.id);

              return (
                <div className="list-group-item d-flex align-items-center gap-3" key={reading.id}>
                  <input
                    className="form-check-input mt-0"
                    type="checkbox"
                    id={reading.id}
                    checked={completed}
                    onChange={() => toggleReading(reading.id)}
                  />
                  <div className="flex-grow-1">
                    <label className={`d-block fw-semibold ${completed ? 'text-decoration-line-through text-secondary' : ''}`} htmlFor={reading.id}>
                      {reading.label}
                    </label>
                    <span className="small text-secondary">{reading.detail}</span>
                  </div>
                  <Link className="btn btn-sm btn-outline-primary" to={reading.to}>Read</Link>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
