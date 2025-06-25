// Application constants

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3
};

// User Roles
export const USER_ROLES = {
  CUSTOMER: 'customer',
  VENDOR: 'vendor',
  ADMIN: 'admin'
};

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded'
};

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded'
};

// Payment Methods
export const PAYMENT_METHODS = {
  CASH_ON_DELIVERY: 'cod',
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  UPI: 'upi',
  NET_BANKING: 'net_banking',
  WALLET: 'wallet'
};

// Product Categories
export const PRODUCT_CATEGORIES = {
  VEGETABLES: 'vegetables',
  FRUITS: 'fruits',
  DAIRY: 'dairy',
  GRAINS: 'grains',
  SNACKS: 'snacks',
  BEVERAGES: 'beverages',
  SPICES: 'spices',
  MEAT: 'meat',
  SEAFOOD: 'seafood',
  BAKERY: 'bakery',
  FROZEN: 'frozen',
  PERSONAL_CARE: 'personal_care',
  HOUSEHOLD: 'household'
};

// Product Units
export const PRODUCT_UNITS = {
  KG: 'kg',
  GRAM: 'gram',
  LITER: 'liter',
  ML: 'ml',
  PIECE: 'piece',
  PACK: 'pack',
  DOZEN: 'dozen'
};

// Delivery Time Slots
export const DELIVERY_SLOTS = [
  { id: 'morning', label: '9:00 AM - 12:00 PM', value: '09:00-12:00' },
  { id: 'afternoon', label: '12:00 PM - 3:00 PM', value: '12:00-15:00' },
  { id: 'evening', label: '3:00 PM - 6:00 PM', value: '15:00-18:00' },
  { id: 'night', label: '6:00 PM - 9:00 PM', value: '18:00-21:00' }
];

// Shipping Configuration
export const SHIPPING_CONFIG = {
  FREE_SHIPPING_THRESHOLD: 500, // ₹500
  STANDARD_SHIPPING_COST: 50, // ₹50
  EXPRESS_SHIPPING_COST: 100, // ₹100
  MIN_ORDER_AMOUNT: 99 // ₹99
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  PAGE_SIZE_OPTIONS: [12, 24, 48],
  MAX_PAGE_BUTTONS: 5
};

// Sort Options
export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price_low_high', label: 'Price: Low to High' },
  { value: 'price_high_low', label: 'Price: High to Low' },
  { value: 'rating', label: 'Customer Rating' },
  { value: 'newest', label: 'Newest First' },
  { value: 'popularity', label: 'Popularity' },
  { value: 'discount', label: 'Discount' }
];

// Filter Options
export const FILTER_OPTIONS = {
  PRICE_RANGES: [
    { min: 0, max: 100, label: 'Under ₹100' },
    { min: 100, max: 300, label: '₹100 - ₹300' },
    { min: 300, max: 500, label: '₹300 - ₹500' },
    { min: 500, max: 1000, label: '₹500 - ₹1000' },
    { min: 1000, max: null, label: 'Above ₹1000' }
  ],
  RATINGS: [
    { value: 4, label: '4★ & above' },
    { value: 3, label: '3★ & above' },
    { value: 2, label: '2★ & above' },
    { value: 1, label: '1★ & above' }
  ],
  AVAILABILITY: [
    { value: 'in_stock', label: 'In Stock' },
    { value: 'out_of_stock', label: 'Out of Stock' }
  ]
};

// Form Validation
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[6-9]\d{9}$/,
  PINCODE: /^[1-9][0-9]{5}$/,
  NAME: /^[a-zA-Z\s]{2,50}$/,
  PASSWORD: {
    MIN_LENGTH: 8,
    REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
  }
};

// Image Configuration
export const IMAGE_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FORMATS: ['image/jpeg', 'image/png', 'image/webp'],
  PLACEHOLDER: '/images/placeholder.jpg',
  PRODUCT_SIZES: {
    THUMBNAIL: { width: 150, height: 150 },
    SMALL: { width: 300, height: 300 },
    MEDIUM: { width: 500, height: 500 },
    LARGE: { width: 800, height: 800 }
  }
};

// Animation Durations
export const ANIMATION = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
  PAGE_TRANSITION: 0.4
};

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px'
};

// Toast Configuration
export const TOAST_CONFIG = {
  DURATION: {
    SHORT: 3000,
    MEDIUM: 5000,
    LONG: 8000
  },
  POSITION: {
    TOP_RIGHT: 'top-right',
    TOP_LEFT: 'top-left',
    BOTTOM_RIGHT: 'bottom-right',
    BOTTOM_LEFT: 'bottom-left'
  }
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'jumale_auth_token',
  USER_DATA: 'jumale_user_data',
  CART_DATA: 'jumale_cart_data',
  THEME: 'jumale_theme',
  SEARCH_HISTORY: 'jumale_search_history',
  VIEWED_PRODUCTS: 'jumale_viewed_products'
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  AUTH_ERROR: 'Authentication failed. Please login again.',
  NOT_FOUND: 'The requested resource was not found.',
  PERMISSION_DENIED: 'You do not have permission to perform this action.',
  CART_ERROR: 'Unable to update cart. Please try again.',
  CHECKOUT_ERROR: 'Checkout failed. Please try again.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  PRODUCT_ADDED: 'Product added to cart successfully!',
  PRODUCT_REMOVED: 'Product removed from cart.',
  ORDER_PLACED: 'Order placed successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!',
  ADDRESS_ADDED: 'Address added successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully!'
};

// Service Area
export const SERVICE_AREA = {
  CITY: 'Pimpri(Kalgaon)',
  STATE: 'Maharashtra',
  COUNTRY: 'India',
  PINCODES: [
    '445102',
  ]
};

// Company Information
export const COMPANY_INFO = {
  NAME: 'Jumale Grocery Shop',
  TAGLINE: 'Fresh groceries delivered to your doorstep',
  EMAIL: 'support@jumalegrocery.com',
  PHONE: '+91 9359881657',
  ADDRESS: 'Pimpri(Kalgaon), Maharashtra, India',
  SOCIAL_MEDIA: {
    FACEBOOK: 'https://facebook.com/jumalegrocery',
    INSTAGRAM: 'https://instagram.com/jumalegrocery',
    TWITTER: 'https://twitter.com/jumalegrocery',
    WHATSAPP: 'https://wa.me/919876543210'
  }
};