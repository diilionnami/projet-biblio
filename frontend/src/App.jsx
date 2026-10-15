import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import BookManager from './BookManager';
import StudentManager from './StudentManager';
import BorrowManager from './BorrowManager';
import CategoryManager from './CategoryManager';
import AuthorManager from './AuthorManager';
import PenaltyManager from './PenaltyManager';
import './App.css';

function SidebarNav() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div style={{ width: '260px', background: '#1e3a8a', color: 'white', minHeight: '100vh', padding: '20px 15px', display: 'flex', flexDirection: 'column', gap: '8px', boxSizing: 'border-box' }}>
      
      {} 
      <div style={{ paddingLeft: '10px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          { }
          <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ color: '#60a5fa' }}>
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
            <path d="M6 12v5c3 3 9 3 12 0v-5"/>
          </svg>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 'bold', margin: '0', color: 'white', letterSpacing: '0.5px' }}>Bibliothèque</h1>
        </div>
        { }
        <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.25)', width: '100%', marginBottom: '10px' }}></div>
        <span style={{ fontSize: '0.85rem', color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Gestion de Bibliothèque Universitaire</span>
      </div>

      <Link to="/" style={linkStyle(isActive('/'))}>
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
        Tableau de bord
      </Link>

      <Link to="/books" style={linkStyle(isActive('/books'))}>
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h12M6 10h12"/></svg>
        Catalogue des Livres
      </Link>

      <Link to="/students" style={linkStyle(isActive('/students'))}>
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        Gestion des Étudiants
      </Link>

      <Link to="/borrows" style={linkStyle(isActive('/borrows'))}>
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
        Emprunts & Retours
      </Link>

      <Link to="/categories" style={linkStyle(isActive('/categories'))}>
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/></svg>
        Catégories
      </Link>

      <Link to="/authors" style={linkStyle(isActive('/authors'))}>
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        Auteurs
      </Link>

      <Link to="/penalties" style={linkStyle(isActive('/penalties'))}>
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        Pénalités
      </Link>
    </div>
  );
}

const linkStyle = (active) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '10px 14px',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '6px',
  background: active ? '#3b82f6' : 'transparent',
  fontWeight: active ? '500' : 'normal',
  fontSize: '0.95rem',
  transition: 'background 0.2s'
});

export default function App() {
  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
        <SidebarNav />
        <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/books" element={<BookManager />} />
            <Route path="/students" element={<StudentManager />} />
            <Route path="/borrows" element={<BorrowManager />} />
            <Route path="/categories" element={<CategoryManager />} />
            <Route path="/authors" element={<AuthorManager />} />
            <Route path="/penalties" element={<PenaltyManager />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}