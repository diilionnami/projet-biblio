import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BorrowManager.css'; 

const API_URL = 'http://127.0.0.1:8000/api/';

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}categories/`);
      setCategories(response.data);
    } catch (err) {
      console.error("Erreur lors du chargement des catégories", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}categories/`, formData);
      alert("Catégorie ajoutée avec succès !");
      setFormData({ name: '', description: '' });
      fetchCategories();
    } catch (err) {
      console.error("Erreur:", err.response?.data);
      alert("Erreur lors de l'ajout de la catégorie.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette catégorie ?")) {
      try {
        await axios.delete(`${API_URL}categories/${id}/`);
        fetchCategories();
      } catch (err) {
        console.error("Erreur lors de la suppression", err);
      }
    }
  };

  return (
    <div className="borrow-container">
      <h2>Gestion des Catégories</h2>

      <form onSubmit={handleSubmit} className="borrow-form">
        <h3>Ajouter une nouvelle catégorie</h3>
        <div className="form-group">
          <label>Nom de la catégorie :</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Description :</label>
          <input 
            type="text" 
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>
        <button type="submit" className="btn-submit">Enregistrer</button>
      </form>

      <h3>Liste des Catégories ({categories.length})</h3>
      <table className="borrow-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr><td colSpan="3" style={{ textAlign: 'center', color: '#888' }}>Aucune catégorie trouvée</td></tr>
          ) : (
            categories.map(c => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.description || '-'}</td>
                <td>
                  <button onClick={() => handleDelete(c.id)} className="btn-delete">Supprimer</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}