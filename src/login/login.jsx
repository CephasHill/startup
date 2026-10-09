import React from 'react';

export function Login() {
  return (
    <main className="container page-shell">
      <div className="card hero-panel accent-top p-4 p-md-5">
        <h1 className="display-5 fw-bold">Welcome to NT Connect</h1>
        <p className="lead">Build a daily New Testament reading habit with friends.</p>
        <form className="row g-3 mt-2" method="post" action="/read">
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
            <button className="btn btn-outline-secondary btn-lg" type="submit">Create account</button>
          </div>
        </form>
        <p className="mt-4 mb-0">Building a daily Bible reading habit is hard to do entirely alone. NT Connect turns structured reading plans into a supportive, community-driven experience with streaks, shared verses, and friends.</p>
      </div>
    </main>
  );
}