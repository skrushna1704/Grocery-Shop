// Storage utility functions for localStorage operations
// Handles JSON serialization/deserialization and error handling

const STORAGE_KEYS = {
  AUTH_TOKEN: 'jumale_auth_token',
  USER_DATA: 'jumale_user_data',
  CART_DATA: 'jumale_cart_data',
  THEME: 'jumale_theme',
  SEARCH_HISTORY: 'jumale_search_history',
  VIEWED_PRODUCTS: 'jumale_viewed_products'
};

// Generic storage functions
const setItem = (key, value) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error(`Error setting localStorage item ${key}:`, error);
  }
};

const getItem = (key, defaultValue = null) => {
  try {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    }
    return defaultValue;
  } catch (error) {
    console.error(`Error getting localStorage item ${key}:`, error);
    return defaultValue;
  }
};

const removeItem = (key) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  } catch (error) {
    console.error(`Error removing localStorage item ${key}:`, error);
  }
};

const clearAll = () => {
  try {
    if (typeof window !== 'undefined') {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    }
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

// Authentication storage
const setToken = (token) => setItem(STORAGE_KEYS.AUTH_TOKEN, token);
const getToken = () => getItem(STORAGE_KEYS.AUTH_TOKEN);
const removeToken = () => removeItem(STORAGE_KEYS.AUTH_TOKEN);

const setUser = (user) => setItem(STORAGE_KEYS.USER_DATA, user);
const getUser = () => getItem(STORAGE_KEYS.USER_DATA);
const removeUser = () => removeItem(STORAGE_KEYS.USER_DATA);

// Cart storage
const setCart = (cartData) => setItem(STORAGE_KEYS.CART_DATA, cartData);
const getCart = () => getItem(STORAGE_KEYS.CART_DATA, { items: [], total: 0, itemCount: 0 });
const clearCart = () => removeItem(STORAGE_KEYS.CART_DATA);

// Theme storage
const setTheme = (theme) => setItem(STORAGE_KEYS.THEME, theme);
const getTheme = () => getItem(STORAGE_KEYS.THEME, 'light');

// Search history storage
const setSearchHistory = (searches) => setItem(STORAGE_KEYS.SEARCH_HISTORY, searches);
const getSearchHistory = () => getItem(STORAGE_KEYS.SEARCH_HISTORY, []);
const addToSearchHistory = (searchTerm) => {
  const history = getSearchHistory();
  const updatedHistory = [searchTerm, ...history.filter(term => term !== searchTerm)].slice(0, 10);
  setSearchHistory(updatedHistory);
};
const clearSearchHistory = () => removeItem(STORAGE_KEYS.SEARCH_HISTORY);

// Recently viewed products storage
const setViewedProducts = (products) => setItem(STORAGE_KEYS.VIEWED_PRODUCTS, products);
const getViewedProducts = () => getItem(STORAGE_KEYS.VIEWED_PRODUCTS, []);
const addViewedProduct = (product) => {
  const viewed = getViewedProducts();
  const updatedViewed = [product, ...viewed.filter(p => p.id !== product.id)].slice(0, 20);
  setViewedProducts(updatedViewed);
};
const clearViewedProducts = () => removeItem(STORAGE_KEYS.VIEWED_PRODUCTS);

// Check if localStorage is available
const isStorageAvailable = () => {
  try {
    if (typeof window === 'undefined') return false;
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
};

// Get storage usage info
const getStorageInfo = () => {
  if (!isStorageAvailable()) return null;

  const used = new Blob(Object.values(localStorage)).size;
  const available = 5 * 1024 * 1024; // 5MB typical limit
  
  return {
    used,
    available,
    percentage: (used / available) * 100
  };
};

export const storage = {
  // Generic functions
  setItem,
  getItem,
  removeItem,
  clearAll,
  
  // Authentication
  setToken,
  getToken,
  removeToken,
  setUser,
  getUser,
  removeUser,
  
  // Cart
  setCart,
  getCart,
  clearCart,
  
  // Theme
  setTheme,
  getTheme,
  
  // Search history
  setSearchHistory,
  getSearchHistory,
  addToSearchHistory,
  clearSearchHistory,
  
  // Viewed products
  setViewedProducts,
  getViewedProducts,
  addViewedProduct,
  clearViewedProducts,
  
  // Utility
  isStorageAvailable,
  getStorageInfo,
  
  // Constants
  STORAGE_KEYS
};