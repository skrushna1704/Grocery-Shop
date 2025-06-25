import { storage } from '@/utils/storage'

// Token management
export const tokenManager = {
  // Set auth token
  setToken: (token) => {
    return storage.set('token', token)
  },

  // Get auth token
  getToken: () => {
    return storage.get('token')
  },

  // Remove auth token
  removeToken: () => {
    return storage.remove('token')
  },

  // Check if token exists
  hasToken: () => {
    return storage.has('token')
  }
}

// User management
export const userManager = {
  // Set user data
  setUser: (user) => {
    return storage.set('user', user)
  },

  // Get user data
  getUser: () => {
    return storage.get('user')
  },

  // Remove user data
  removeUser: () => {
    return storage.remove('user')
  },

  // Check if user is logged in
  isLoggedIn: () => {
    return storage.has('token') && storage.has('user')
  }
}

// Auth utilities
export const auth = {
  // Login user
  login: (token, user) => {
    tokenManager.setToken(token)
    userManager.setUser(user)
  },

  // Logout user
  logout: () => {
    tokenManager.removeToken()
    userManager.removeUser()
  },

  // Get current user
  getCurrentUser: () => {
    return userManager.getUser()
  },

  // Check authentication status
  isAuthenticated: () => {
    return userManager.isLoggedIn()
  },

  // Get auth headers for API requests
  getAuthHeaders: () => {
    const token = tokenManager.getToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
  }
} 