// src/components/AdminPanel.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginAdmin, getUsers, getCodes, getStats } from '../services/api';

function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [codes, setCodes] = useState([]);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginAdmin(username, password);
      setIsLoggedIn(true);
      fetchData();
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  const fetchData = async () => {
    try {
      const usersData = await getUsers(username, password);
      const codesData = await getCodes(username, password);
      const statsData = await getStats(username, password);
      setUsers(usersData);
      setCodes(codesData);
      setStats(statsData);
    } catch (err) {
      setError('Error al obtener datos');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <h2>Login Administrador</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuario"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <h2>Panel de Administrador</h2>
      <button onClick={() => navigate('/')}>Volver al Inicio</button>

      {/* Enlace para registrar un nuevo administrador */}
      <Link to="/admin/register">
        <button>Registrar Nuevo Administrador</button>
      </Link>

      <h3>Estadísticas</h3>
      {stats && (
        <ul>
          <li>Total de códigos: {stats.totalCodes}</li>
          <li>Códigos usados: {stats.usedCodes}</li>
          <li>Códigos disponibles: {stats.availableCodes}</li>
          <li>Códigos ganadores usados: {stats.winningCodesUsed}</li>
        </ul>
      )}

      <h3>Usuarios Registrados</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cédula</th>
            <th>Correo</th>
            <th>Fecha de Nacimiento</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.nombre}</td>
              <td>{user.cedula}</td>
              <td>{user.correo}</td>
              <td>{new Date(user.fechaNacimiento).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Códigos Usados</h3>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Premio</th>
            <th>Ganador</th>
            <th>Usuario</th>
            <th>Cédula</th>
            <th>Fecha de Uso</th>
          </tr>
        </thead>
        <tbody>
          {codes.map((code) => (
            <tr key={code.codigo}>
              <td>{code .codigo}</td>
              <td>{code.premio}</td>
              <td>{code.ganador ? 'Sí' : 'No'}</td>
              <td>{code.usuario.nombre}</td>
              <td>{code.usuario.cedula}</td>
              <td>{new Date(code.fechaUso).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;