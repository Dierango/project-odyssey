import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loginUser, registerUser, getCurrentUser } from '../services/api';

interface User {
  id: number;
  email: string;
  is_active: boolean;
  // Optional display fields for frontend
  name?: string;
  avatar?: string | null;
  memberSince?: string;
  securityScore?: number;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check for existing authentication on app start
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('access_token');
      const savedUser = localStorage.getItem('user_data');
      
      if (token && savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          setUser(userData);
        } catch (error) {
          console.error('Error parsing saved user data:', error);
          localStorage.removeItem('access_token');
          localStorage.removeItem('user_data');
        }
      }
    };

    checkAuth();
  }, []);

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user_data', JSON.stringify(updatedUser));
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      console.log('UserContext: Starting login for', email);
      const response = await loginUser(email, password);
      console.log('UserContext: Login API response:', response);
      
      // Store token
      localStorage.setItem('access_token', response.access_token);
      console.log('UserContext: Token stored');
      
      // Get user data from backend
      try {
        console.log('UserContext: Fetching user data...');
        const userData = await getCurrentUser();
        console.log('UserContext: User data received:', userData);
        
        // Add display fields for frontend compatibility
        const enhancedUserData: User = {
          ...userData,
          name: userData.email.split('@')[0], // Use email prefix as name
          memberSince: new Date().getFullYear().toString(),
          securityScore: 75,
        };
        setUser(enhancedUserData);
        localStorage.setItem('user_data', JSON.stringify(enhancedUserData));
        console.log('UserContext: User set successfully');
      } catch (userError) {
        console.warn('UserContext: Failed to fetch user data, using minimal data:', userError);
        // If user data fetch fails, create minimal user data
        const userData: User = {
          id: 1,
          email: email,
          is_active: true,
          name: email.split('@')[0],
          memberSince: new Date().getFullYear().toString(),
          securityScore: 75,
        };
        setUser(userData);
        localStorage.setItem('user_data', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('UserContext: Login failed:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, name?: string): Promise<void> => {
    try {
      console.log('UserContext: Starting registration for', email);
      const response = await registerUser(email, password);
      console.log('UserContext: Registration successful, response:', response);
      
      // Auto-login after registration
      console.log('UserContext: Starting auto-login after registration');
      await login(email, password);
      console.log('UserContext: Auto-login completed');
    } catch (error) {
      console.error('UserContext: Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data');
  };

  const value: UserContextType = {
    user,
    setUser,
    updateUser,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
