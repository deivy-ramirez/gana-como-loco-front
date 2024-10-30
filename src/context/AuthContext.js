import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const storedData = localStorage.getItem('authData');
    return storedData ? JSON.parse(storedData) : null;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return !!localStorage.getItem('adminKey');
  });

  useEffect(() => {
    if (authData) {
      localStorage.setItem('authData', JSON.stringify(authData));
    } else {
      localStorage.removeItem('authData');
    }
  }, [authData]);

  const isAuthenticated = !!authData;

  const login = (data) => {
    setAuthData(data);
  };

  const logout = () => {
    setAuthData(null);
    setIsAdmin(false);
    localStorage.removeItem('adminKey');
  };

  const adminLogin = (adminKey) => {
    localStorage.setItem('adminKey', adminKey);
    setIsAdmin(true);
  };

  return (
    <AuthContext.Provider value={{ authData, isAuthenticated, isAdmin, login, logout, adminLogin }}>
      {children}
    </AuthContext.Provider>
  );
};