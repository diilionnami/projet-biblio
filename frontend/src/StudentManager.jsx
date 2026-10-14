import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function StudentManager() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    matricule: '',
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    departement: '',
    niveau: 'L1'
  });

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/students/');
      setStudents(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des étudiants", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/students/', formData);
      alert('Étudiant enregistré avec succès !');
      setFormData({
        matricule: '',
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        departement: '',
        niveau: 'L1'
      });
      fetchStudents();
    } catch (error) {
      console.error("Erreur détaillée :", error.response?.data);
      alert("Erreur lors de l'enregistrement de l'étudiant.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet étudiant ?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/students/${id}/`);
        fetchStudents();
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
        Gestion des Étudiants
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
          Enregistrer un nouvel étudiant
        </h3>

        <form onSubmit={handleSubmit}>
          { }
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            marginBottom: '24px'
          }}>
            { }
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: '#4a5568', fontWeight: '500' }}>Matricule :</label>
              <input
                type="text"
                name="matricule"
                value={formData.matricule}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#ffffff', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            { }
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: '#4a5568', fontWeight: '500' }}>Prénom :</label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#ffffff', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            { }
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: '#4a5568', fontWeight: '500' }}>Nom :</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#ffffff', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            { }
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: '#4a5568', fontWeight: '500' }}>Email :</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#ffffff', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            { }
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: '#4a5568', fontWeight: '500' }}>Téléphone :</label>
              <input
                type="text"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#ffffff', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            { }
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: '#4a5568', fontWeight: '500' }}>Département / Filière :</label>
              <input
                type="text"
                name="departement"
                value={formData.departement}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#ffffff', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            { }
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: '#4a5568', fontWeight: '500' }}>Niveau :</label>
              <select
                name="niveau"
                value={formData.niveau}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#ffffff', outline: 'none', cursor: 'pointer', boxSizing: 'border-box' }}
              >
                <option value="L1">L1</option>
                <option value="L2">L2</option>
                <option value="L3">L3</option>
                <option value="M1">M1</option>
                <option value="M2">M2</option>
              </select>
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
            Enregistrer l'étudiant
          </button>
        </form>
      </div>

      { }
      <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#2d3748', marginBottom: '16px' }}>
        Liste des étudiants
      </h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
            <th style={{ padding: '12px' }}>Matricule</th>
            <th style={{ padding: '12px' }}>Nom et Prénom</th>
            <th style={{ padding: '12px' }}>Email</th>
            <th style={{ padding: '12px' }}>Téléphone</th>
            <th style={{ padding: '12px' }}>Département</th>
            <th style={{ padding: '12px' }}>Niveau</th>
            <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px', fontWeight: '600' }}>{student.matricule}</td>
                <td style={{ padding: '12px' }}>{student.nom} {student.prenom}</td>
                <td style={{ padding: '12px', color: '#64748b' }}>{student.email || '-'}</td>
                <td style={{ padding: '12px', color: '#64748b' }}>{student.telephone || '-'}</td>
                <td style={{ padding: '12px' }}>{student.departement}</td>
                <td style={{ padding: '12px', fontWeight: '600', color: '#0284c7' }}>{student.niveau}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <button
                    onClick={() => handleDelete(student.id)}
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
                Aucun étudiant enregistré
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}