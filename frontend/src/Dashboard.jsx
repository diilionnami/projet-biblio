import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BorrowManager.css';

const API_URL = 'http://127.0.0.1:8000/api/';

export default function Dashboard() {
  const [stats, setStats] = useState({
    books: 0,
    students: 0,
    borrows: 0,
    penalties: 0
  });
  const [recentBorrows, setRecentBorrows] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const booksRes = await axios.get(`${API_URL}books/`);
      const studentsRes = await axios.get(`${API_URL}students/`);
      const borrowsRes = await axios.get(`${API_URL}borrows/`);
      const penaltiesRes = await axios.get(`${API_URL}penalties/`);

      setStats({
        books: booksRes.data.length,
        students: studentsRes.data.length,
        borrows: borrowsRes.data.length,
        penalties: penaltiesRes.data.length
      });

      
      setRecentBorrows(borrowsRes.data.slice(-5).reverse());
    } catch (err) {
      console.error("Erreur lors du chargement des données du tableau de bord", err);
    }
  };

  const maxGoal = 50; 
  const getPercent = (val) => Math.min(Math.round((val / maxGoal) * 100), 100);

  return (
    <div className="borrow-container">
      <h2>Tableau de bord - Bibliothèque Universitaire</h2>

      { }
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '20px', marginTop: '20px', marginBottom: '30px' }}>
        
        <div style={{ background: '#3b82f6', color: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '0.95rem', fontWeight: 'normal' }}>Total Livres</h4>
          <p style={{ margin: 0, fontSize: '2.2rem', fontWeight: 'bold' }}>{stats.books}</p>
        </div>

        <div style={{ background: '#10b981', color: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '0.95rem', fontWeight: 'normal' }}>Étudiants Inscrits</h4>
          <p style={{ margin: 0, fontSize: '2.2rem', fontWeight: 'bold' }}>{stats.students}</p>
        </div>

        <div style={{ background: '#f59e0b', color: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '0.95rem', fontWeight: 'normal' }}>Emprunts en cours</h4>
          <p style={{ margin: 0, fontSize: '2.2rem', fontWeight: 'bold' }}>{stats.borrows}</p>
        </div>

        <div style={{ background: '#ef4444', color: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '0.95rem', fontWeight: 'normal' }}>Pénalités Actives</h4>
          <p style={{ margin: 0, fontSize: '2.2rem', fontWeight: 'bold' }}>{stats.penalties}</p>
        </div>

      </div>

      { }
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        
        { }
        <div className="borrow-form" style={{ padding: '25px', margin: 0 }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>Indicateurs d'activité</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '5px' }}>
              <span>Volume de Livres</span>
              <span style={{ fontWeight: 'bold' }}>{stats.books}</span>
            </div>
            <div style={{ background: '#e2e8f0', borderRadius: '4px', height: '10px', overflow: 'hidden' }}>
              <div style={{ background: '#3b82f6', width: `${getPercent(stats.books)}%`, height: '100%', transition: 'width 0.5s' }}></div>
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '5px' }}>
              <span>Fréquentation Étudiants</span>
              <span style={{ fontWeight: 'bold' }}>{stats.students}</span>
            </div>
            <div style={{ background: '#e2e8f0', borderRadius: '4px', height: '10px', overflow: 'hidden' }}>
              <div style={{ background: '#10b981', width: `${getPercent(stats.students)}%`, height: '100%', transition: 'width 0.5s' }}></div>
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '5px' }}>
              <span>Taux d'Emprunts</span>
              <span style={{ fontWeight: 'bold' }}>{stats.borrows}</span>
            </div>
            <div style={{ background: '#e2e8f0', borderRadius: '4px', height: '10px', overflow: 'hidden' }}>
              <div style={{ background: '#f59e0b', width: `${getPercent(stats.borrows)}%`, height: '100%', transition: 'width 0.5s' }}></div>
            </div>
          </div>
        </div>

        { }
        <div className="borrow-form" style={{ padding: '25px', margin: 0 }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '15px' }}>Derniers Emprunts Enregistrés</h3>
          {recentBorrows.length === 0 ? (
            <p style={{ color: '#888', fontSize: '0.9rem' }}>Aucun emprunt récent.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {recentBorrows.map((b, idx) => (
                <li key={idx} style={{ padding: '10px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span>Livre ID : <strong>{b.book}</strong></span>
                  <span style={{ color: '#64748b' }}>Date : {b.borrow_date || 'N/A'}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}