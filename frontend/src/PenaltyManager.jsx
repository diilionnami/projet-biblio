import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BorrowManager.css';

const API_URL = 'http://127.0.0.1:8000/api/';

export default function PenaltyManager() {
  const [penalties, setPenalties] = useState([]);
  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    student: '',
    amount: '',
    reason: ''
  });

  useEffect(() => {
    fetchPenalties();
    fetchStudents();
  }, []);

  const fetchPenalties = async () => {
    try {
      const response = await axios.get(`${API_URL}penalties/`);
      setPenalties(response.data);
    } catch (err) {
      console.error("Erreur lors du chargement des pénalités", err);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}penalties/`, formData);
      alert("Pénalité enregistrée avec succès !");
      setFormData({
        student: '',
        amount: '',
        reason: ''
      });
      fetchPenalties();
    } catch (err) {
      console.error("Erreur:", err.response?.data);
      alert("Erreur lors de l'enregistrement de la pénalité.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette pénalité ?")) {
      try {
        await axios.delete(`${API_URL}penalties/${id}/`);
        alert("Pénalité supprimée !");
        fetchPenalties();
      } catch (err) {
        console.error("Erreur lors de la suppression", err);
      }
    }
  };

  return (
    <div className="borrow-container">
      <h2>Gestion des Pénalités</h2>

      { }
      <form onSubmit={handleSubmit} className="borrow-form" style={{ padding: '25px', marginBottom: '30px' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>Enregistrer une pénalité</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          
          <div className="form-group" style={{ marginBottom: '10px', gridColumn: '1 / -1' }}>
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
            <label style={{ fontSize: '0.9rem', display: 'block', marginBottom: '5px' }}>Montant (Ar) :</label>
            <input 
              type="number" 
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              required
              style={{ width: '100%', padding: '8px', fontSize: '0.95rem', boxSizing: 'border-box' }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '10px' }}>
            <label style={{ fontSize: '0.9rem', display: 'block', marginBottom: '5px' }}>Motif :</label>
            <input 
              type="text" 
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              required
              style={{ width: '100%', padding: '8px', fontSize: '0.95rem', boxSizing: 'border-box' }}
            />
          </div>

        </div>

        <button type="submit" className="btn-submit" style={{ marginTop: '20px', padding: '10px 20px' }}>Valider</button>
      </form>

      <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Liste des Pénalités ({penalties.length})</h3>
      <table className="borrow-table">
        <thead>
          <tr>
            <th>Étudiant</th>
            <th>Montant</th>
            <th>Motif</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {penalties.length === 0 ? (
            <tr><td colSpan="4" style={{ textAlign: 'center', color: '#888' }}>Aucune pénalité enregistrée</td></tr>
          ) : (
            penalties.map(p => {
              const studentObj = students.find(s => s.id === p.student);
              return (
                <tr key={p.id}>
                  <td>{studentObj ? `${studentObj.last_name} ${studentObj.first_name}` : p.student}</td>
                  <td>{p.amount} Ar</td>
                  <td>{p.reason}</td>
                  <td>
                    <button 
                      onClick={() => handleDelete(p.id)} 
                      style={{ background: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}
                    >
                      Supprimer
                    </button>
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