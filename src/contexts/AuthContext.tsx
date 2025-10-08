import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem('cv-builder-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('cv-builder-user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - replace with actual API call
    if (email && password) {
      const mockUser: User = {
        id: '1',
        name: email.split('@')[0],
        email,
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face`
      };
      setUser(mockUser);
      localStorage.setItem('cv-builder-user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Mock register - replace with actual API call
    if (name && email && password) {
      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face`
      };
      setUser(mockUser);
      localStorage.setItem('cv-builder-user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cv-builder-user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}