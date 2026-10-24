import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import BookManager from './BookManager';
import StudentManager from './StudentManager';
import BorrowManager from './BorrowManager';
import CategoryManager from './CategoryManager';
import AuthorManager from './AuthorManager';
import PenaltyManager from './PenaltyManager';
import './App.css';

const NAV_ITEMS = [
  { to: '/', icon: '📊', label: 'Tableau de bord' },
  { to: '/books', icon: '📚', label: 'Catalogue des Livres' },
  { to: '/students', icon: '🧑‍🎓', label: 'Gestion des Étudiants' },
  { to: '/borrows', icon: '📖', label: 'Emprunts & Retours' },
  { to: '/categories', icon: '📁', label: 'Catégories' },
  { to: '/authors', icon: '✍️', label: 'Auteurs' },
  { to: '/penalties', icon: '💰', label: 'Pénalités' },
];

function SidebarNav({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>

      <nav className={`sidebar ${isOpen ? 'open' : ''}`} aria-label="Navigation principale">
        <div className="sidebar-brand">
          <div className="brand-row">
            <span className="brand-icon" aria-hidden="true">🎓</span>
            <span className="brand-title">BiblioUniv</span>
          </div>
          <div className="brand-line"></div>
          <span className="brand-subtitle">Gestion Universitaire</span>
        </div>

        <div className="sidebar-links">
          {NAV_ITEMS.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={`sidebar-link ${active ? 'active' : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                <span className="sidebar-icon" aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  useEffect(() => {
    const onKeyDown = (e) => { if (e.key === 'Escape') setSidebarOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (e) => { if (e.matches) setSidebarOpen(false); };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <Router>
      <div className="app-container">

        { }
        <header className="mobile-header">
          <div className="mobile-brand">
            <span aria-hidden="true">🎓</span>
            <span>BiblioUniv</span>
          </div>
          <button
            className="menu-toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={sidebarOpen}
          >
            ☰
          </button>
        </header>

        <SidebarNav isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/books" element={<BookManager />} />
            <Route path="/students" element={<StudentManager />} />
            <Route path="/borrows" element={<BorrowManager />} />
            <Route path="/categories" element={<CategoryManager />} />
            <Route path="/authors" element={<AuthorManager />} />
            <Route path="/penalties" element={<PenaltyManager />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}