import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleSubmit = (event, action) => {
    event.preventDefault();
    setMessage(`${action} is mocked for this deliverable. Welcome to NT Connect!`);
    if (action === 'Log in') {
      navigate('/');
    }
  };

  return (
    <main className="container page-shell">
      <div className="card hero-panel accent-top p-4 p-md-5">
        <h1 className="display-5 fw-bold">Log in to NT Connect</h1>
        <p className="lead">Pick up where you left off and keep your reading streak going.</p>
        <form className="row g-3 mt-2" onSubmit={(event) => handleSubmit(event, 'Log in')}>
          <div className="col-12 col-md-6">
            <label className="visually-hidden" htmlFor="email">Email</label>
            <input id="email" className="form-control form-control-lg" type="email" placeholder="your@email.com" />
          </div>
          <div className="col-12 col-md-6">
            <label className="visually-hidden" htmlFor="password">Password</label>
            <input id="password" className="form-control form-control-lg" type="password" placeholder="password" />
          </div>
          <div className="col-12">
            <button className="btn btn-primary btn-lg me-2" type="submit">Log in</button>
            <button className="btn btn-outline-secondary btn-lg" type="button" onClick={() => setMessage('Account creation is mocked for this deliverable.')}>Create account</button>
          </div>
        </form>
        {message && <p className="alert alert-info mt-4 mb-0" role="status">{message}</p>}
        <p className="mt-4 mb-0">Building a daily Bible reading habit is hard to do entirely alone. NT Connect turns structured reading plans into a supportive, community-driven experience with streaks, shared verses, and friends.</p>
      </div>
    </main>
  );
}