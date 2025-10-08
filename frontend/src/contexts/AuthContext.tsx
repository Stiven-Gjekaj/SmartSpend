import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName?: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authApi.login({ email, password });
    const token = response.data.access_token || response.data.token;
    if (!token) {
      throw new Error('No token received from server');
    }
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const register = async (email: string, password: string, fullName?: string) => {
    const response = await authApi.register({ email, password, full_name: fullName });
    console.log('Register response:', response.data);
    const token = response.data.access_token || response.data.token;
    console.log('Extracted token:', token);
    if (!token) {
      console.error('No token in response. Full response:', response);
      throw new Error('No token received from server');
    }
    localStorage.setItem('token', token);
    console.log('Token saved to localStorage:', localStorage.getItem('token'));
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
