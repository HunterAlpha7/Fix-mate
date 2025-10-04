import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../data/database';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  userType: 'customer' | 'provider' | null;
  setAuthData: (user: User | null, userType: 'customer' | 'provider' | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<'customer' | 'provider' | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuthData = (newUser: User | null, newUserType: 'customer' | 'provider' | null) => {
    setUser(newUser);
    setUserType(newUserType);
    setIsAuthenticated(!!newUser);
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      userType,
      setAuthData,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}