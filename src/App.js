import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Game from './components/Game';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Game /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/game" element={isAuthenticated ? <Game /> : <Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route 
            path="/admin" 
            element={isAdmin ? <AdminPanel /> : <Navigate to="/admin-login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
