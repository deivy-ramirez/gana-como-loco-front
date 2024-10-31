// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Game from './components/Game';
import AdminPanel from './components/AdminPanel';
import AdminRegister from './components/AdminRegister'; // Nuevo componente

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <div className="App">
        <h1>Bienvenido a Gana como Loco</h1>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/" element={isAuthenticated ? <Navigate to="/game" /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/game" 
            element={isAuthenticated ? <Game /> : <Navigate to="/" />} 
          />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/register" element={<AdminRegister />} /> {/* Nueva ruta */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;