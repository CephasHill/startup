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
                <NavLink className="nav-link" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/read">Read</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/library">Library</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/friends">Friends</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">About</NavLink>
              </li>
            </menu>
          </div>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/read" element={<Read />} />
        <Route path="/library" element={<Library />} />
        <Route path="/library/:book/:chapter" element={<Library />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
          
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

function NotFound() {
  return (
    <main className="container-fluid bg-secondary text-center">
      404: Return to sender. Address unknown.
    </main>
  );
}