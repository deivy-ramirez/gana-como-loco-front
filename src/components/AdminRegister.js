// src/components/AdminRegister.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerAdmin } from '../services/api';

function AdminRegister() {
  const [formData, setFormData] = useState({
    username: '', // Añade el campo username
    nombre: '',
    cedula: '',
    correo: '',
    password: '',
    fechaNacimiento: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Enviando datos:', formData); // Para debugging
      const response = await registerAdmin(formData);
      console.log('Respuesta:', response); // Para debugging
      alert('Administrador registrado exitosamente');
      navigate('/admin');
    } catch (err) {
      console.error('Error completo:', err); // Para debugging
      setError(err.message || 'Error en el registro del administrador');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Registro de Administrador</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Nombre de usuario"
          required
        />
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre completo"
          required
        />
        <input
          type="text"
          name="cedula"
          value={formData.cedula}
          onChange={handleChange}
          placeholder="Cédula"
          required
        />
        <input
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          placeholder="Correo electrónico"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Contraseña"
          required
        />
        <input
          type="date"
          name="fechaNacimiento"
          value={formData.fechaNacimiento}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar Administrador'}
        </button>
      </form>
    </div>
  );
}

export default AdminRegister;