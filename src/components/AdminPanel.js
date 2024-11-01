// src/components/AdminPanel.js
import React, { useState, useEffect } from 'react';
import { loginAdmin, getUsers, getCodes, getAdminStats } from '../services/api';
//import './AdminPanel.css';

function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [codes, setCodes] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    // Verificar si ya hay una sesión activa
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersData, codesData, statsData] = await Promise.all([
        getUsers(),
        getCodes(),
        getAdminStats()
      ]);
      setUsers(usersData);
      setCodes(codesData);
      setStats(statsData);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      setError('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await loginAdmin({ username, password });
      localStorage.setItem('adminToken', response.token);
      setIsLoggedIn(true);
      setError('');
    } catch (err) {
      setError('Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Acceso Administrativo</h2>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label>Usuario:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Panel de Administración</h1>
        <button onClick={handleLogout} className="logout-button">
          Cerrar Sesión
        </button>
      </header>

      <nav className="admin-nav">
        <button
          className={activeTab === 'dashboard' ? 'active' : ''}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          Usuarios
        </button>
        <button
          className={activeTab === 'codes' ? 'active' : ''}
          onClick={() => setActiveTab('codes')}
        >
          Códigos
        </button>
      </nav>

      {loading ? (
        <div className="loading">Cargando...</div>
      ) : (
        <main className="admin-content">
          {activeTab === 'dashboard' && stats && (
            <section className="dashboard-section">
              <h2>Estadísticas Generales</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Usuarios Totales</h3>
                  <p>{stats.totalUsers}</p>
                </div>
                <div className="stat-card">
                  <h3>Códigos Totales</h3>
                  <p>{stats.totalCodes}</p>
                </div>
                <div className="stat-card">
                  <h3>Códigos Usados</h3>
                  <p>{stats.usedCodes}</p>
                </div>
                <div className="stat-card">
                  <h3>Total en Premios</h3>
                  <p>${stats.totalPrizeAmount.toLocaleString()}</p>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'users' && (
            <section className="users-section">
              <h2>Usuarios Registrados</h2>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Cédula</th>
                      <th>Correo</th>
                      <th>Fecha de Registro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.nombre}</td>
                        <td>{user.cedula}</td>
                        <td>{user.correo}</td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeTab === 'codes' && (
            <section className="codes-section">
              <h2>Códigos Utilizados</h2>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Premio</th>
                      <th>Usuario</th>
                      <th>Cédula</th>
                      <th>Fecha de Uso</th>
                    </tr>
                  </thead>
                  <tbody>
                    {codes.map((code) => (
                      <tr key={code._id}>
                        <td>{code.codigo}</td>
                        <td>${code.premio.toLocaleString()}</td>
                        <td>{code.usadoPor?.nombre || 'N/A'}</td>
                        <td>{code.usadoPor?.cedula || 'N/A'}</td>
                        <td>{code.fechaUso ? new Date(code.fechaUso).toLocaleDateString() : 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </main>
      )}
    </div>
  );
}

export default AdminPanel;