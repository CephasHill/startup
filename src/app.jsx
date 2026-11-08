import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Home } from './home/home';
import { Login } from './login/login';
import { Read } from './read/read';
import { Library } from './library/library';
import { Friends } from './friends/friends';
import { About } from './about/about';
import { SettingsProvider } from './context/SettingsContext';
import { ProgressProvider } from './context/ProgressContext';

export default function App() {
  const [userEmail, setUserEmail] = React.useState(null);
  const [authError, setAuthError] = React.useState('');

  React.useEffect(() => {
    fetch('/api/auth/me')
      .then((response) => {
        if (response.status === 401) {
          return null;
        }
        if (!response.ok) {
          throw new Error('Unable to check authentication');
        }
        return response.json();
      })
      .then((user) => {
        setUserEmail(user ? user.email : null);
      })
      .catch((error) => {
        setUserEmail(null);
        setAuthError(error.message);
      });
  }, []);

  async function handleLogout() {
    try {
      const response = await fetch('/api/auth/logout', { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Logout failed');
      }
      setUserEmail(null);
      setAuthError('');
    } catch (error) {
      setAuthError(error.message);
    }
  }

  return (
  <BrowserRouter>
    <SettingsProvider>
      <ProgressProvider>
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
              <li className="nav-item">
                {userEmail ? (
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="signed-in-tooltip">Signed in as {userEmail}</Tooltip>}
                  >
                    <button
                      className="btn btn-link nav-link"
                      type="button"
                      onClick={handleLogout}
                      aria-label={`Log out from ${userEmail}`}
                    >
                      Log out
                    </button>
                  </OverlayTrigger>
                ) : (
                  <NavLink className="nav-link" to="/login">Log in</NavLink>
                )}
              </li>
            </menu>
            {authError && <p className="text-warning mb-0">{authError}</p>}
          </div>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onAuthenticated={setUserEmail} />} />
        <Route path="/read" element={<Read />} />
        <Route path="/read/:book/:chapter" element={<Read />} />
        <Route path="/library" element={<Library />} />
        <Route path="/library/:book" element={<Library />} />
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
      </ProgressProvider>
    </SettingsProvider>
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