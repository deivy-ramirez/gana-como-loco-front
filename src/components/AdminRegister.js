// src/components/AdminRegister.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerAdmin } from '../services/api';

function AdminRegister() {
  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    correo: '',
    password: '',
    fechaNacimiento: ''
  });
  const [error, setError] = useState('');
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
    try {
      await registerAdmin(formData);
      alert('Administrador registrado exitosamente');
      navigate('/admin');
    } catch (err) {
      setError('Error en el registro del administrador. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="register-container">
      <h2>Registro de Administrador</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Registrar Administrador</button>
      </form>
    </div>
  );
}

export default AdminRegister;