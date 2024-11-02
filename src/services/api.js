import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://gana-como-loco-back.vercel.app/api';

export const login = async (correo, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { correo, password });
  return response.data;
};

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const verificarCodigo = async (codigo) => {
  try {
    // Obtener el userId del localStorage o de donde lo tengas almacenado
    const userId = localStorage.getItem('userId'); // o como lo tengas guardado

    const response = await fetch('/api/game/verify-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        codigo: codigo,
        userId: userId
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      // Manejar respuesta exitosa
      console.log('Premio:', data.premio);
    } else {
      // Manejar error
      console.error('Error:', data.message);
    }
  } catch (error) {
    console.error('Error al verificar código:', error);
  }
};

export const loginAdmin = async (credentials) => {
  try {
    console.log('Attempting login with:', credentials);
    const response = await axios.post(`${API_URL}/admin/login`, credentials);
    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const registerAdmin = async (adminData) => {
  try {
    const response = await axios.post(`${API_URL}/admin/register`, adminData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Error al registrar administrador');
    }
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/users`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

export const getCodes = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/codes`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener códigos:', error);
    throw error;
  }
};

export const getAdminStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/stats`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    throw error;
  }
};