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

export const verifyCode = async (codigo, userId) => {
  const response = await axios.post(`${API_URL}/game/verify-code`, { codigo, userId });
  return response.data;
};

export const loginAdmin = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/admin/login`, credentials);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Error en el inicio de sesión');
    }
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

export const getUsers = async (username, password) => {
  const response = await axios.get(`${API_URL}/admin/users`, {
    headers: { username, password }
  });
  return response.data;
};

export const getCodes = async (username, password) => {
  const response = await axios.get(`${API_URL}/admin/codes`, {
    headers: { username, password }
  });
  return response.data;
};

export const getStats = async (username, password) => {
  const response = await axios.get(`${API_URL}/admin/stats`, {
    headers: { username, password }
  });
  return response.data;
};