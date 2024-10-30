import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
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
        <Switch>
          <Route exact path="/" component={isAuthenticated ? Game : Login} />
          <Route path="/register" component={Register} />
          <Route path="/game" component={isAuthenticated ? Game : Login} />
          <Route path="/admin-login" component={AdminLogin} />
          <Route 
            path="/admin" 
            render={() => isAdmin ? <AdminPanel /> : <Redirect to="/admin-login" />} 
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;