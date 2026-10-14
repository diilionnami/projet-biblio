import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function BookManager() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    author: '',
    publication_year: new Date().getFullYear(),
    isbn: '',
    available_copies: 1
  });

  const fetchData = async () => {
    try {
      const [booksRes, categoriesRes, authorsRes] = await Promise.all([
        axios.get('http://127.0.0.1:8000/api/books/'),
        axios.get('http://127.0.0.1:8000/api/categories/'),
        axios.get('http://127.0.0.1:8000/api/authors/')
      ]);
      setBooks(booksRes.data);
      setCategories(categoriesRes.data);
      setAuthors(authorsRes.data);
    } catch (error) {
      console.error("Erreur lors du chargement des données", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/books/', formData);
      alert('Livre enregistré avec succès !');
      setFormData({
        title: '',
        category: '',
        author: '',
        publication_year: new Date().getFullYear(),
        isbn: '',
        available_copies: 1
      });
      fetchData();
    } catch (error) {
      console.error("Erreur détaillée :", error.response?.data);
      alert("Erreur lors de l'enregistrement du livre.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce livre ?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/books/${id}/`);
        fetchData();
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
        Catalogue des Livres
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
          Ajouter un nouveau livre
        </h3>

        <form onSubmit={handleSubmit}>
          { }
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            marginBottom: '20px'
          }}>
            { }
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: '#4a5568', fontWeight: '500' }}>Titre :</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Ex: Apprendre Django et React"
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#ffffff', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            {}
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: '#4a5568', fontWeight: '500' }}>Catégorie :</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#ffffff', outline: 'none', cursor: 'pointer', boxSizing: 'border-box' }}
              >
                <option value="">-- Choisir une catégorie --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            { }
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: '#4a5568', fontWeight: '500' }}>Auteur :</label>
              <select
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#ffffff', outline: 'none', cursor: 'pointer', boxSizing: 'border-box' }}
              >
                <option value="">-- Choisir un auteur --</option>
                {authors.map((auth) => (
                  <option key={auth.id} value={auth.id}>{auth.name}</option>
                ))}
              </select>
            </div>

            { }
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: '#4a5568', fontWeight: '500' }}>Année de publication :</label>
              <input
                type="number"
                name="publication_year"
                value={formData.publication_year}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#ffffff', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            { }
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: '#4a5568', fontWeight: '500' }}>ISBN :</label>
              <input
                type="text"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                placeholder="Ex: 978-2-1234-5680-3"
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#ffffff', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            { }
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: '#4a5568', fontWeight: '500' }}>Copies disponibles :</label>
              <input
                type="number"
                name="available_copies"
                value={formData.available_copies}
                onChange={handleChange}
                min="1"
                required
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#ffffff', outline: 'none', boxSizing: 'border-box' }}
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
            Ajouter le livre
          </button>
        </form>
      </div>

      { }
      <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#2d3748', marginBottom: '16px' }}>
        Liste des livres enregistrés
      </h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
            <th style={{ padding: '12px' }}>Titre</th>
            <th style={{ padding: '12px' }}>Catégorie</th>
            <th style={{ padding: '12px' }}>Auteur</th>
            <th style={{ padding: '12px' }}>Année</th>
            <th style={{ padding: '12px' }}>ISBN</th>
            <th style={{ padding: '12px' }}>Dispo</th>
            <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px', fontWeight: '600', color: '#1a202c' }}>{book.title}</td>
                <td style={{ padding: '12px' }}>{book.category_name || book.category}</td>
                <td style={{ padding: '12px' }}>{book.author_name || book.author}</td>
                <td style={{ padding: '12px', color: '#64748b' }}>{book.publication_year}</td>
                <td style={{ padding: '12px', color: '#64748b' }}>{book.isbn || '-'}</td>
                <td style={{ padding: '12px', fontWeight: '600', color: '#0284c7' }}>{book.available_copies}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <button
                    onClick={() => handleDelete(book.id)}
                    style={{ backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ padding: '24px', textAlign: 'center', color: '#94a3b8' }}>
                Aucun livre dans le catalogue
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}