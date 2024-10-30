import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
          <Route exact path="/" component={isAuthenticated ? Game : Login} />
          <Route path="/register" component={Register} />
          <Route path="/game" component={isAuthenticated ? Game : Login} />
          <Route path="/admin-login" component={AdminLogin} />
          <Route 
            path="/admin" 
            render={() => isAdmin ? <AdminPanel /> : <Redirect to="/admin-login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;