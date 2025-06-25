import { createContext, useContext, useReducer, useEffect } from 'react';
import { storage } from '@/utils/storage';

// Auth state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null
};

// Auth actions
const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = storage.getToken();
        const user = storage.getUser();
        
        if (token && user) {
          dispatch({ type: 'AUTH_SUCCESS', payload: user });
        } else {
          dispatch({ type: 'AUTH_ERROR', payload: null });
        }
      } catch (error) {
        dispatch({ type: 'AUTH_ERROR', payload: 'Authentication check failed' });
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Simulate API call - replace with actual API call
      const mockUser = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: credentials.email,
        phone: '+91 9876543210',
        role: 'customer',
        addresses: [],
        preferences: {},
        createdAt: new Date(),
        lastLogin: new Date()
      };

      const mockToken = 'mock-jwt-token-' + Date.now();

      // Store in localStorage
      storage.setToken(mockToken);
      storage.setUser(mockUser);

      dispatch({ type: 'AUTH_SUCCESS', payload: mockUser });
      return { success: true, user: mockUser };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Register function
  const register = async (userData) => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Simulate API call - replace with actual API call
      const newUser = {
        id: Date.now().toString(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        role: 'customer',
        addresses: [],
        preferences: {},
        createdAt: new Date(),
        lastLogin: new Date()
      };

      const mockToken = 'mock-jwt-token-' + Date.now();

      // Store in localStorage
      storage.setToken(mockToken);
      storage.setUser(newUser);

      dispatch({ type: 'AUTH_SUCCESS', payload: newUser });
      return { success: true, user: newUser };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = () => {
    storage.removeToken();
    storage.removeUser();
    dispatch({ type: 'LOGOUT' });
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      const updatedUser = { ...state.user, ...userData };
      storage.setUser(updatedUser);
      dispatch({ type: 'AUTH_SUCCESS', payload: updatedUser });
      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, error: 'Profile update failed' };
    }
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};