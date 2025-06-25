// Specialized formatter functions for the grocery app

/**
 * Format price with Indian Rupee symbol
 * @param {number} price - Price amount
 * @param {boolean} showDecimals - Whether to show decimal places
 * @returns {string} Formatted price
 */
export const formatPrice = (price, showDecimals = true) => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '₹0';
  }

  if (showDecimals) {
    return `₹${price.toFixed(2)}`;
  }
  
  return `₹${Math.round(price)}`;
};

/**
 * Format discount percentage
 * @param {number} originalPrice - Original price
 * @param {number} salePrice - Sale price
 * @returns {string} Formatted discount percentage
 */
export const formatDiscount = (originalPrice, salePrice) => {
  if (!originalPrice || !salePrice || originalPrice <= salePrice) {
    return '';
  }

  const discount = Math.round(((originalPrice - salePrice) / originalPrice) * 100);
  return `${discount}% OFF`;
};

/**
 * Format product weight/quantity
 * @param {number} quantity - Quantity amount
 * @param {string} unit - Unit type (kg, gram, liter, etc.)
 * @returns {string} Formatted quantity
 */
export const formatQuantity = (quantity, unit) => {
  if (!quantity || !unit) return '';
  
  // Convert grams to kg for better readability
  if (unit === 'gram' && quantity >= 1000) {
    return `${(quantity / 1000).toFixed(1)} kg`;
  }
  
  // Convert ml to liter for better readability
  if (unit === 'ml' && quantity >= 1000) {
    return `${(quantity / 1000).toFixed(1)} L`;
  }
  
  return `${quantity} ${unit}`;
};

/**
 * Format order status for display
 * @param {string} status - Order status
 * @returns {Object} Formatted status with color and label
 */
export const formatOrderStatus = (status) => {
  const statusMap = {
    pending: { label: 'Order Placed', color: 'yellow', icon: '📦' },
    confirmed: { label: 'Confirmed', color: 'blue', icon: '✅' },
    processing: { label: 'Processing', color: 'orange', icon: '⏳' },
    shipped: { label: 'Shipped', color: 'purple', icon: '🚚' },
    delivered: { label: 'Delivered', color: 'green', icon: '✅' },
    cancelled: { label: 'Cancelled', color: 'red', icon: '❌' },
    refunded: { label: 'Refunded', color: 'gray', icon: '💰' }
  };

  return statusMap[status] || { label: 'Unknown', color: 'gray', icon: '❓' };
};

/**
 * Format delivery time slot
 * @param {string} timeSlot - Time slot (e.g., '09:00-12:00')
 * @returns {string} Formatted time slot
 */
export const formatTimeSlot = (timeSlot) => {
  if (!timeSlot) return '';
  
  const [start, end] = timeSlot.split('-');
  
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return `${formatTime(start)} - ${formatTime(end)}`;
};

/**
 * Format address for display
 * @param {Object} address - Address object
 * @returns {string} Formatted address
 */
export const formatAddress = (address) => {
  if (!address) return '';
  
  const parts = [
    address.addressLine1,
    address.addressLine2,
    address.city,
    address.state,
    address.pincode
  ].filter(Boolean);
  
  return parts.join(', ');
};

/**
 * Format phone number for display
 * @param {string} phone - Phone number
 * @returns {string} Formatted phone number
 */
export const formatPhone = (phone) => {
  if (!phone) return '';
  
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');
  
  // Format Indian mobile number
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  
  if (digits.length === 12 && digits.startsWith('91')) {
    const mobile = digits.slice(2);
    return `+91 ${mobile.slice(0, 5)} ${mobile.slice(5)}`;
  }
  
  return phone;
};

/**
 * Format rating display
 * @param {number} rating - Rating value
 * @param {number} maxRating - Maximum rating (default: 5)
 * @returns {Object} Formatted rating data
 */
export const formatRating = (rating, maxRating = 5) => {
  if (!rating || rating < 0) {
    return {
      value: 0,
      display: '0.0',
      stars: 0,
      percentage: 0
    };
  }

  const clampedRating = Math.min(rating, maxRating);
  
  return {
    value: clampedRating,
    display: clampedRating.toFixed(1),
    stars: Math.round(clampedRating),
    percentage: (clampedRating / maxRating) * 100
  };
};

/**
 * Format order date for display
 * @param {Date|string} date - Order date
 * @returns {string} Formatted date
 */
export const formatOrderDate = (date) => {
  if (!date) return '';
  
  const orderDate = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInHours = (now - orderDate) / (1000 * 60 * 60);
  
  if (diffInHours < 24) {
    return `Today, ${orderDate.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })}`;
  }
  
  if (diffInHours < 48) {
    return `Yesterday, ${orderDate.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })}`;
  }
  
  return orderDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

/**
 * Format savings amount
 * @param {number} originalPrice - Original price
 * @param {number} salePrice - Sale price
 * @param {number} quantity - Quantity
 * @returns {string} Formatted savings
 */
export const formatSavings = (originalPrice, salePrice, quantity = 1) => {
  if (!originalPrice || !salePrice || originalPrice <= salePrice) {
    return '';
  }

  const savings = (originalPrice - salePrice) * quantity;
  return `You save ₹${savings.toFixed(2)}`;
};

/**
 * Format delivery charge
 * @param {number} charge - Delivery charge
 * @param {boolean} isFree - Whether delivery is free
 * @returns {string} Formatted delivery charge
 */
export const formatDeliveryCharge = (charge, isFree = false) => {
  if (isFree || charge === 0) {
    return 'FREE';
  }
  
  return formatPrice(charge);
};

/**
 * Format cart summary
 * @param {Array} items - Cart items
 * @returns {Object} Formatted cart summary
 */
export const formatCartSummary = (items) => {
  if (!items || items.length === 0) {
    return {
      itemCount: 0,
      subtotal: 0,
      formattedSubtotal: '₹0.00',
      formattedItemCount: '0 items'
    };
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return {
    itemCount,
    subtotal,
    formattedSubtotal: formatPrice(subtotal),
    formattedItemCount: `${itemCount} ${itemCount === 1 ? 'item' : 'items'}`
  };
};

/**
 * Format search results count
 * @param {number} count - Number of results
 * @param {string} query - Search query
 * @returns {string} Formatted results text
 */
export const formatSearchResults = (count, query = '') => {
  if (count === 0) {
    return query ? `No results found for "${query}"` : 'No results found';
  }
  
  const resultText = count === 1 ? 'result' : 'results';
  const queryText = query ? ` for "${query}"` : '';
  
  return `${count} ${resultText}${queryText}`;
};

/**
 * Format nutritional information
 * @param {Object} nutrition - Nutrition data
 * @param {string} servingSize - Serving size (default: '100g')
 * @returns {Object} Formatted nutrition data
 */
export const formatNutrition = (nutrition, servingSize = '100g') => {
  if (!nutrition) return {};

  return {
    servingSize,
    calories: `${nutrition.calories || 0} kcal`,
    protein: `${nutrition.protein || 0}g`,
    carbs: `${nutrition.carbs || 0}g`,
    fat: `${nutrition.fat || 0}g`,
    fiber: `${nutrition.fiber || 0}g`,
    sugar: `${nutrition.sugar || 0}g`,
    sodium: `${nutrition.sodium || 0}mg`
  };
};

/**
 * Format availability status
 * @param {boolean} inStock - Whether item is in stock
 * @param {number} stockQuantity - Stock quantity
 * @returns {Object} Formatted availability data
 */
export const formatAvailability = (inStock, stockQuantity = 0) => {
  if (!inStock || stockQuantity === 0) {
    return {
      status: 'out-of-stock',
      label: 'Out of Stock',
      color: 'red',
      canOrder: false
    };
  }

  if (stockQuantity <= 5) {
    return {
      status: 'low-stock',
      label: `Only ${stockQuantity} left`,
      color: 'orange',
      canOrder: true
    };
  }

  return {
    status: 'in-stock',
    label: 'In Stock',
    color: 'green',
    canOrder: true
  };
};