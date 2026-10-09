import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Read } from './read/read';
import { Library } from './library/library';
import { Friends } from './friends/friends';
import { About } from './about/about';

export default function App() {
  return (
  <BrowserRouter>
    <div className="body">
      <header>
        <nav className="navbar navbar-expand-sm navbar-dark">
          <div className="container page-shell">
            <NavLink className="navbar-brand fw-semibold" to="/">NT Connect</NavLink>
            <menu className="navbar-nav ms-sm-auto mb-0 ps-0">
              <li className="nav-item">
                <NavLink className="nav-link active" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="read">Read</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="library">Library</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="friends">Friends</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="about">About</NavLink>
              </li>
            </menu>
          </div>
        </nav>
      </header>

      <main className="container page-shell">
        <div className="card hero-panel accent-top p-4 p-md-5">
          <h1 className="display-5 fw-bold">Welcome to NT Connect</h1>
          <p className="lead">Build a daily New Testament reading habit with friends.</p>
          <form className="row g-3 mt-2" method="post" action="read.html">
            <div className="col-12 col-md-6">
              <label className="visually-hidden" for="email">Email</label>
              <input id="email" className="form-control form-control-lg" type="email" placeholder="your@email.com" />
            </div>
            <div className="col-12 col-md-6">
              <label className="visually-hidden" for="password">Password</label>
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
          
      <footer className="py-3 text-white-50">
        <div className="container page-shell d-flex justify-content-between">
          <span>Peter Hill</span>
          <a href="https://github.com/CephasHill/startup">GitHub</a>
        </div>
      </footer>
    </div>
  </BrowserRouter>
  );
}