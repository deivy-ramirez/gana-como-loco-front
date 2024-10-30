import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Game from './components/Game';
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <div className="App">
        <h1>Bienvenido a Gana como Loco</h1>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/login" /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/login" 
            element={isAuthenticated ? <Game /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;