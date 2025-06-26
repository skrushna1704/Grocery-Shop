import { createContext, useContext, useReducer, useEffect } from 'react';
import { storage } from '@/utils/storage';
import api from '@/utils/api';

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
    const checkAuth = async () => {
      try {
        const token = storage.getToken();
        const user = storage.getUser();
        
        if (token && user) {
          // Verify token with backend
          try {
            const response = await api.get('/auth/me');
            if (response.data.success) {
              dispatch({ type: 'AUTH_SUCCESS', payload: response.data.data.user });
            } else {
              // Token is invalid, clear storage
              storage.removeToken();
              storage.removeUser();
              dispatch({ type: 'AUTH_ERROR', payload: null });
            }
          } catch (error) {
            // Token verification failed, clear storage
            storage.removeToken();
            storage.removeUser();
            dispatch({ type: 'AUTH_ERROR', payload: null });
          }
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
      const response = await api.post('/auth/login', credentials);
      
      if (response.data.success) {
        const { user, token } = response.data.data;
        
        // Store in localStorage
        storage.setToken(token);
        storage.setUser(user);

        dispatch({ type: 'AUTH_SUCCESS', payload: user });
        return { success: true, user };
      } else {
        dispatch({ type: 'AUTH_ERROR', payload: response.data.message });
        return { success: false, error: response.data.message };
      }
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
      // Map frontend role names to backend role names
      const mappedUserData = {
        ...userData,
        role: userData.role === 'customer' ? 'user' : 
              userData.role === 'shopkeeper' ? 'admin' : userData.role
      };

      const response = await api.post('/auth/register', mappedUserData);
      
      if (response.data.success) {
        const { user, token, requiresApproval } = response.data.data;
        
        // Only store in localStorage if customer (shopkeepers need approval)
        if (!requiresApproval && token) {
          storage.setToken(token);
          storage.setUser(user);
          dispatch({ type: 'AUTH_SUCCESS', payload: user });
        }

        return { 
          success: true, 
          user,
          requiresApproval: requiresApproval || false
        };
      } else {
        dispatch({ type: 'AUTH_ERROR', payload: response.data.message });
        return { success: false, error: response.data.message };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Call logout endpoint
      await api.post('/auth/logout');
    } catch (error) {
      // Even if logout API fails, clear local storage
      console.error('Logout API error:', error);
    }
    
    // Clear local storage
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
      const response = await api.put('/users/profile', userData);
      
      if (response.data.success) {
        const updatedUser = response.data.data.user;
        storage.setUser(updatedUser);
        dispatch({ type: 'AUTH_SUCCESS', payload: updatedUser });
        return { success: true, user: updatedUser };
      } else {
        return { success: false, error: response.data.message };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Profile update failed';
      return { success: false, error: errorMessage };
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