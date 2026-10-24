import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BorrowManager.css';

const API_URL = 'http://127.0.0.1:8000/api/';

export default function BorrowManager() {
  const [borrows, setBorrows] = useState([]);
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);

  const [formData, setFormData] = useState({
    student: '',
    book: '',
    due_date: ''
  });

  useEffect(() => {
    fetchBorrows();
    fetchStudents();
    fetchBooks();
  }, []);

  const fetchBorrows = async () => {
    try {
      const response = await axios.get(`${API_URL}borrows/`);
      setBorrows(response.data);
    } catch (err) {
      console.error("Erreur lors du chargement des emprunts", err);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_URL}students/`);
      setStudents(response.data);
    } catch (err) {
      console.error("Erreur lors du chargement des étudiants", err);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}books/`);
      setBooks(response.data);
    } catch (err) {
      console.error("Erreur lors du chargement des livres", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}borrows/`, formData);
      alert("Emprunt validé avec succès !");
      setFormData({
        student: '',
        book: '',
        due_date: ''
      });
      fetchBorrows();
      fetchBooks(); 
    } catch (err) {
      console.error("Erreur:", err.response?.data);
      alert("Erreur lors de la validation de l'emprunt.");
    }
  };

  const handleReturn = async (id) => {
    try {
      await axios.post(`${API_URL}borrows/${id}/return_book/`);
      alert("Livre marqué comme retourné !");
      fetchBorrows();
      fetchBooks();
    } catch (err) {
      console.error("Erreur lors du retour", err);
      alert("Erreur lors du retour du livre.");
    }
  };

  return (
    <div className="borrow-container">
      <h2>Gestion des Emprunts et Retours</h2>

      { }
      <form onSubmit={handleSubmit} className="borrow-form" style={{ padding: '25px', marginBottom: '30px' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>Nouvel Emprunt</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          
          <div className="form-group" style={{ marginBottom: '10px' }}>
            <label style={{ fontSize: '0.9rem', display: 'block', marginBottom: '5px' }}>Étudiant :</label>
            <select 
              value={formData.student} 
              onChange={(e) => setFormData({...formData, student: e.target.value})}
              required
              style={{ width: '100%', padding: '8px', fontSize: '0.95rem', boxSizing: 'border-box' }}
            >
              <option value="">-- Choisir un étudiant --</option>
              {students.map(s => (
                <option key={s.id} value={s.id}>{s.last_name} {s.first_name} ({s.matricule})</option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: '10px' }}>
            <label style={{ fontSize: '0.9rem', display: 'block', marginBottom: '5px' }}>Livre :</label>
            <select 
              value={formData.book} 
              onChange={(e) => setFormData({...formData, book: e.target.value})}
              required
              style={{ width: '100%', padding: '8px', fontSize: '0.95rem', boxSizing: 'border-box' }}
            >
              <option value="">-- Choisir un livre --</option>
              {books.map(b => (
                <option key={b.id} value={b.id}>{b.title} (Dispo: {b.copies_available})</option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: '10px' }}>
            <label style={{ fontSize: '0.9rem', display: 'block', marginBottom: '5px' }}>Date de retour prévue :</label>
            <input 
              type="date" 
              value={formData.due_date}
              onChange={(e) => setFormData({...formData, due_date: e.target.value})}
              required
              style={{ width: '100%', padding: '8px', fontSize: '0.95rem', boxSizing: 'border-box' }}
            />
          </div>

        </div>

        <button type="submit" className="btn-submit" style={{ marginTop: '20px', padding: '10px 20px' }}>Valider l'emprunt</button>
      </form>

      <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Historique des Emprunts</h3>
      <table className="borrow-table">
        <thead>
          <tr>
            <th>Étudiant</th>
            <th>Livre</th>
            <th>Date d'emprunt</th>
            <th>Retour prévu</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {borrows.length === 0 ? (
            <tr><td colSpan="6" style={{ textAlign: 'center', color: '#888' }}>Aucun emprunt enregistré</td></tr>
          ) : (
            borrows.map(b => {
              const studentObj = students.find(s => s.id === b.student);
              const bookObj = books.find(book => book.id === b.book);
              return (
                <tr key={b.id}>
                  <td>{studentObj ? `${studentObj.last_name} ${studentObj.first_name}` : b.student}</td>
                  <td>{bookObj ? bookObj.title : b.book}</td>
                  <td>{b.borrow_date}</td>
                  <td>{b.due_date}</td>
                  <td>
                    <span style={{ color: b.returned ? '#10b981' : '#f59e0b', fontWeight: 'bold' }}>
                      {b.returned ? 'Retourné' : 'En cours'}
                    </span>
                  </td>
                  <td>
                    {!b.returned ? (
                      <button 
                        onClick={() => handleReturn(b.id)} 
                        style={{ background: '#10b981', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}
                      >
                        Marquer comme retourné
                      </button>
                    ) : (
                      <span style={{ color: '#888', fontSize: '0.85rem' }}>Clôturé</span>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}