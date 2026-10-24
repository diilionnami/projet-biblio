import axios from 'axios';

// Instance Axios pointant vers ton backend Django sur Render
const API = axios.create({
  baseURL: 'https://projet-biblio-bibliotheque.onrender.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;