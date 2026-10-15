import React, { useEffect, useState } from 'react';
import API from './services/api';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction pour récupérer les données depuis Django REST Framework
    async function fetchData() {
      try {
        setLoading(true);
        // Adapte les endpoints ('books/', 'students/') selon tes URLs d'API Django
        const [booksRes, studentsRes] = await Promise.all([
          API.get('books/'),
          API.get('students/')
        ]);
        
        setBooks(booksRes.data);
        setStudents(studentsRes.data);
        setError(null);
      } catch (err) {
        console.error("Erreur lors de la récupération des données :", err);
        setError("Impossible de charger les données depuis le serveur.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Chargement des données de la bibliothèque...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="container" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>📚 Gestion de Bibliothèque</h1>
      <p style={{ color: 'green' }}>Connecté au backend Django sur Render avec succès !</p>

      <div className="section" style={{ marginTop: '30px' }}>
        <h2>Liste des Livres</h2>
        {books.length === 0 ? (
          <p>Aucun livre disponible pour le moment.</p>
        ) : (
          <ul>
            {books.map((book) => (
              <li key={book.id || book.pk}>
                <strong>{book.title || book.titre}</strong> - Auteur : {book.author || book.auteur}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="section" style={{ marginTop: '30px' }}>
        <h2>Liste des Étudiants</h2>
        {students.length === 0 ? (
          <p>Aucun étudiant enregistré.</p>
        ) : (
          <ul>
            {students.map((student) => (
              <li key={student.id || student.pk}>
                {student.name || student.nom} ({student.email || 'Pas d\'email'})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;