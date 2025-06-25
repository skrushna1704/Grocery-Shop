// Validation utility functions for the grocery app

import { VALIDATION_RULES } from './constants';

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {Object} Validation result
 */
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return { isValid: false, error: 'Email is required' };
  }

  const trimmedEmail = email.trim();
  
  if (!trimmedEmail) {
    return { isValid: false, error: 'Email is required' };
  }

  if (!VALIDATION_RULES.EMAIL.test(trimmedEmail)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  return { isValid: true, error: null };
};

/**
 * Validate Indian phone number
 * @param {string} phone - Phone number to validate
 * @returns {Object} Validation result
 */
export const validatePhone = (phone) => {
  if (!phone || typeof phone !== 'string') {
    return { isValid: false, error: 'Phone number is required' };
  }

  const cleanedPhone = phone.replace(/\D/g, '');
  
  if (!cleanedPhone) {
    return { isValid: false, error: 'Phone number is required' };
  }

  if (!VALIDATION_RULES.PHONE.test(cleanedPhone)) {
    return { isValid: false, error: 'Please enter a valid 10-digit Indian mobile number' };
  }

  return { isValid: true, error: null };
};

/**
 * Validate password
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with strength info
 */
export const validatePassword = (password) => {
  if (!password || typeof password !== 'string') {
    return { 
      isValid: false, 
      error: 'Password is required',
      strength: 0,
      suggestions: []
    };
  }

  const suggestions = [];
  let strength = 0;

  // Length check
  if (password.length < VALIDATION_RULES.PASSWORD.MIN_LENGTH) {
    return {
      isValid: false,
      error: `Password must be at least ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} characters long`,
      strength: 0,
      suggestions: [`Use at least ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} characters`]
    };
  }

  // Strength calculations
  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password)) {
    strength++;
  } else {
    suggestions.push('Add lowercase letters');
  }
  
  if (/[A-Z]/.test(password)) {
    strength++;
  } else {
    suggestions.push('Add uppercase letters');
  }
  
  if (/\d/.test(password)) {
    strength++;
  } else {
    suggestions.push('Add numbers');
  }
  
  if (/[^A-Za-z0-9]/.test(password)) {
    strength++;
  } else {
    suggestions.push('Add special characters');
  }

  // Strong password requirement
  const isStrong = VALIDATION_RULES.PASSWORD.REGEX.test(password);
  
  if (!isStrong) {
    return {
      isValid: false,
      error: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      strength,
      suggestions
    };
  }

  return { 
    isValid: true, 
    error: null, 
    strength,
    suggestions: []
  };
};

/**
 * Validate name (first name, last name)
 * @param {string} name - Name to validate
 * @param {string} fieldName - Field name for error messages
 * @returns {Object} Validation result
 */
export const validateName = (name, fieldName = 'Name') => {
  if (!name || typeof name !== 'string') {
    return { isValid: false, error: `${fieldName} is required` };
  }

  const trimmedName = name.trim();
  
  if (!trimmedName) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  if (trimmedName.length < 2) {
    return { isValid: false, error: `${fieldName} must be at least 2 characters long` };
  }

  if (trimmedName.length > 50) {
    return { isValid: false, error: `${fieldName} must be less than 50 characters` };
  }

  if (!VALIDATION_RULES.NAME.test(trimmedName)) {
    return { isValid: false, error: `${fieldName} can only contain letters and spaces` };
  }

  return { isValid: true, error: null };
};

/**
 * Validate Indian pincode
 * @param {string} pincode - Pincode to validate
 * @returns {Object} Validation result
 */
export const validatePincode = (pincode) => {
  if (!pincode || typeof pincode !== 'string') {
    return { isValid: false, error: 'Pincode is required' };
  }

  const cleanedPincode = pincode.trim().replace(/\s/g, '');
  
  if (!cleanedPincode) {
    return { isValid: false, error: 'Pincode is required' };
  }

  if (!VALIDATION_RULES.PINCODE.test(cleanedPincode)) {
    return { isValid: false, error: 'Please enter a valid 6-digit pincode' };
  }

  return { isValid: true, error: null };
};

/**
 * Validate address
 * @param {Object} address - Address object to validate
 * @returns {Object} Validation result
 */
export const validateAddress = (address) => {
  const errors = {};

  // Full name validation
  const nameValidation = validateName(address.fullName, 'Full name');
  if (!nameValidation.isValid) {
    errors.fullName = nameValidation.error;
  }

  // Phone validation
  const phoneValidation = validatePhone(address.phone);
  if (!phoneValidation.isValid) {
    errors.phone = phoneValidation.error;
  }

  // Address line 1 validation
  if (!address.addressLine1 || !address.addressLine1.trim()) {
    errors.addressLine1 = 'Address is required';
  } else if (address.addressLine1.trim().length < 5) {
    errors.addressLine1 = 'Address must be at least 5 characters long';
  }

  // City validation
  if (!address.city || !address.city.trim()) {
    errors.city = 'City is required';
  }

  // State validation
  if (!address.state || !address.state.trim()) {
    errors.state = 'State is required';
  }

  // Pincode validation
  const pincodeValidation = validatePincode(address.pincode);
  if (!pincodeValidation.isValid) {
    errors.pincode = pincodeValidation.error;
  }

  const isValid = Object.keys(errors).length === 0;

  return { isValid, errors };
};

/**
 * Validate credit card number (basic validation)
 * @param {string} cardNumber - Card number to validate
 * @returns {Object} Validation result
 */
export const validateCardNumber = (cardNumber) => {
  if (!cardNumber || typeof cardNumber !== 'string') {
    return { isValid: false, error: 'Card number is required' };
  }

  const cleanedNumber = cardNumber.replace(/\s/g, '');
  
  if (!cleanedNumber) {
    return { isValid: false, error: 'Card number is required' };
  }

  // Basic length check (13-19 digits for most cards)
  if (!/^\d{13,19}$/.test(cleanedNumber)) {
    return { isValid: false, error: 'Please enter a valid card number' };
  }

  // Luhn algorithm check
  let sum = 0;
  let isEven = false;
  
  for (let i = cleanedNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanedNumber.charAt(i));
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }

  if (sum % 10 !== 0) {
    return { isValid: false, error: 'Please enter a valid card number' };
  }

  return { isValid: true, error: null };
};

/**
 * Validate CVV
 * @param {string} cvv - CVV to validate
 * @returns {Object} Validation result
 */
export const validateCVV = (cvv) => {
  if (!cvv || typeof cvv !== 'string') {
    return { isValid: false, error: 'CVV is required' };
  }

  const cleanedCVV = cvv.trim();
  
  if (!cleanedCVV) {
    return { isValid: false, error: 'CVV is required' };
  }

  if (!/^\d{3,4}$/.test(cleanedCVV)) {
    return { isValid: false, error: 'CVV must be 3 or 4 digits' };
  }

  return { isValid: true, error: null };
};

/**
 * Validate expiry date (MM/YY format)
 * @param {string} expiry - Expiry date to validate
 * @returns {Object} Validation result
 */
export const validateExpiryDate = (expiry) => {
  if (!expiry || typeof expiry !== 'string') {
    return { isValid: false, error: 'Expiry date is required' };
  }

  const cleanedExpiry = expiry.trim();
  
  if (!cleanedExpiry) {
    return { isValid: false, error: 'Expiry date is required' };
  }

  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!expiryRegex.test(cleanedExpiry)) {
    return { isValid: false, error: 'Please enter expiry date in MM/YY format' };
  }

  const [month, year] = cleanedExpiry.split('/');
  const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
  const currentDate = new Date();
  
  // Set to end of month for expiry
  expiryDate.setMonth(expiryDate.getMonth() + 1, 0);
  
  if (expiryDate < currentDate) {
    return { isValid: false, error: 'Card has expired' };
  }

  return { isValid: true, error: null };
};

/**
 * Validate search query
 * @param {string} query - Search query to validate
 * @returns {Object} Validation result
 */
export const validateSearchQuery = (query) => {
  if (!query || typeof query !== 'string') {
    return { isValid: false, error: 'Search query is required' };
  }

  const trimmedQuery = query.trim();
  
  if (!trimmedQuery) {
    return { isValid: false, error: 'Search query is required' };
  }

  if (trimmedQuery.length < 2) {
    return { isValid: false, error: 'Search query must be at least 2 characters' };
  }

  if (trimmedQuery.length > 100) {
    return { isValid: false, error: 'Search query is too long' };
  }

  return { isValid: true, error: null };
};

/**
 * Validate quantity
 * @param {number} quantity - Quantity to validate
 * @param {number} maxQuantity - Maximum allowed quantity
 * @returns {Object} Validation result
 */
export const validateQuantity = (quantity, maxQuantity = 50) => {
  if (typeof quantity !== 'number' || isNaN(quantity)) {
    return { isValid: false, error: 'Quantity must be a number' };
  }

  if (quantity < 1) {
    return { isValid: false, error: 'Quantity must be at least 1' };
  }

  if (quantity > maxQuantity) {
    return { isValid: false, error: `Quantity cannot exceed ${maxQuantity}` };
  }

  if (!Number.isInteger(quantity)) {
    return { isValid: false, error: 'Quantity must be a whole number' };
  }

  return { isValid: true, error: null };
};

/**
 * Validate file upload
 * @param {File} file - File to validate
 * @param {Object} options - Validation options
 * @returns {Object} Validation result
 */
export const validateFileUpload = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
    required = false
  } = options;

  if (!file) {
    if (required) {
      return { isValid: false, error: 'File is required' };
    }
    return { isValid: true, error: null };
  }

  if (file.size > maxSize) {
    const maxSizeMB = maxSize / (1024 * 1024);
    return { isValid: false, error: `File size must be less than ${maxSizeMB}MB` };
  }

  if (!allowedTypes.includes(file.type)) {
    const typeList = allowedTypes.map(type => type.split('/')[1]).join(', ');
    return { isValid: false, error: `Only ${typeList} files are allowed` };
  }

  return { isValid: true, error: null };
};

/**
 * Validate form data against multiple rules
 * @param {Object} data - Form data to validate
 * @param {Object} rules - Validation rules
 * @returns {Object} Validation result with all errors
 */
export const validateForm = (data, rules) => {
  const errors = {};
  let isValid = true;

  for (const [field, validators] of Object.entries(rules)) {
    const value = data[field];
    
    for (const validator of validators) {
      const result = validator(value);
      if (!result.isValid) {
        errors[field] = result.error;
        isValid = false;
        break; // Stop at first error for this field
      }
    }
  }

  return { isValid, errors };
};