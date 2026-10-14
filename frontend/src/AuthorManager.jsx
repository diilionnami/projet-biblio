import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AuthorManager() {
  const [authors, setAuthors] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    biography: ''
  });

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/authors/');
      setAuthors(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des auteurs", error);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/authors/', formData);
      alert('Auteur enregistré avec succès !');
      setFormData({ name: '', biography: '' });
      fetchAuthors();
    } catch (error) {
      console.error("Erreur détaillée :", error.response?.data);
      alert("Erreur lors de l'enregistrement de l'auteur.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet auteur ?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/authors/${id}/`);
        fetchAuthors();
      } catch (error) {
        console.error("Erreur lors de la suppression", error);
      }
    }
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '30px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      maxWidth: '1100px',
      margin: '20px auto',
      fontFamily: 'sans-serif'
    }}>
      { }
      <h2 style={{
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#1a202c',
        borderBottom: '1px solid #e2e8f0',
        paddingBottom: '12px',
        marginBottom: '24px'
      }}>
        Gestion des Auteurs
      </h2>

      { }
      <div style={{
        backgroundColor: '#f8fafc',
        padding: '28px',
        borderRadius: '10px',
        border: '1px solid #f1f5f9',
        marginBottom: '32px'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#2d3748',
          marginBottom: '22px'
        }}>
          Ajouter un nouvel auteur
        </h3>

        <form onSubmit={handleSubmit}>
          { }
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '20px',
            marginBottom: '20px'
          }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: '#4a5568', fontWeight: '500' }}>
                Nom et Prénom de l'auteur :
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Ex: Rabe Rakoto"
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#ffffff', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: '#4a5568', fontWeight: '500' }}>
                Biographie :
              </label>
              <textarea
                name="biography"
                value={formData.biography}
                onChange={handleChange}
                rows="3"
                placeholder="Ex: Auteur et chercheur spécialisé..."
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#ffffff', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
              />
            </div>
          </div>

          { }
          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#0056b3',
              color: '#ffffff',
              fontWeight: 'bold',
              padding: '12px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '15px'
            }}
          >
            Enregistrer l'auteur
          </button>
        </form>
      </div>

      { }
      <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#2d3748', marginBottom: '16px' }}>
        Liste des Auteurs ({authors.length})
      </h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
            <th style={{ padding: '12px', width: '35%' }}>Nom et Prénom</th>
            <th style={{ padding: '12px', width: '50%' }}>Biographie</th>
            <th style={{ padding: '12px', textAlign: 'center', width: '15%' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.length > 0 ? (
            authors.map((author) => (
              <tr key={author.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px', fontWeight: '600', color: '#1a202c' }}>{author.name}</td>
                <td style={{ padding: '12px', color: '#64748b' }}>{author.biography || 'Aucune biographie'}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <button
                    onClick={() => handleDelete(author.id)}
                    style={{ backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ padding: '24px', textAlign: 'center', color: '#94a3b8' }}>
                Aucun auteur trouvé
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}