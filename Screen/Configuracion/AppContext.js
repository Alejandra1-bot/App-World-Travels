import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tema de colores para la app
  const colors = {
    background: '#E0F2FE',
    card: '#FFFFFF',
    text: '#0F172A',
    subtext: '#64748B',
    border: '#CBD5E1',
    inputBg: '#F8FAFC',
    tabBar: '#FFFFFF',
    tabBarActive: '#0A74DA',
    tabBarInactive: '#64748B',
  };

  // Verificar autenticación al iniciar
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const role = await AsyncStorage.getItem('userRole');
      const id = await AsyncStorage.getItem('userId');

      if (token && role) {
        setIsAuthenticated(true);
        setUserRole(role);
        setUserId(id);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (token, role, userId) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userRole', role);
      if (userId) {
        await AsyncStorage.setItem('userId', userId.toString());
      }
      setIsAuthenticated(true);
      setUserRole(role);
      setUserId(userId);
    } catch (error) {
      console.error('Error saving auth data:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userRole');
      await AsyncStorage.removeItem('userId');
      setIsAuthenticated(false);
      setUserRole(null);
      setUserId(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const value = {
    isAuthenticated,
    userRole,
    userId,
    colors,
    login,
    logout,
    loading,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};