import { createContext, useContext, useReducer, useEffect } from 'react';
import { storage } from '@/utils/storage';

// Cart state
const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
  shippingCost: 0,
  freeShippingThreshold: 500, // ₹500 for free shipping
  isLoading: false
};

// Cart actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload.items || [],
        total: action.payload.total || 0,
        itemCount: action.payload.itemCount || 0
      };
    
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        return {
          ...state,
          items: updatedItems
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload]
        };
      }
    }
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);
      
      return {
        ...state,
        items: updatedItems
      };
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0
      };
    
    case 'CALCULATE_TOTALS': {
      const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
      const subtotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      const shippingCost = subtotal >= state.freeShippingThreshold ? 0 : 50; // ₹50 shipping
      const total = subtotal + shippingCost;
      
      return {
        ...state,
        itemCount,
        total,
        shippingCost
      };
    }
    
    default:
      return state;
  }
};

// Create context
const CartContext = createContext();

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on app start
  useEffect(() => {
    const savedCart = storage.getCart();
    if (savedCart) {
      dispatch({ type: 'LOAD_CART', payload: savedCart });
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    const cartData = {
      items: state.items,
      total: state.total,
      itemCount: state.itemCount
    };
    storage.setCart(cartData);
    
    // Calculate totals whenever items change
    dispatch({ type: 'CALCULATE_TOTALS' });
  }, [state.items]);

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      unit: product.unit,
      vendor: product.vendor,
      quantity,
      inStock: product.inStock,
      stockQuantity: product.stockQuantity
    };

    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
    }
  };

  // Clear entire cart
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    storage.clearCart();
  };

  // Get item quantity by product ID
  const getItemQuantity = (productId) => {
    const item = state.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Check if item is in cart
  const isInCart = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  // Get cart subtotal (without shipping)
  const getSubtotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Check if eligible for free shipping
  const isEligibleForFreeShipping = () => {
    return getSubtotal() >= state.freeShippingThreshold;
  };

  // Get amount needed for free shipping
  const getAmountForFreeShipping = () => {
    const subtotal = getSubtotal();
    return subtotal < state.freeShippingThreshold 
      ? state.freeShippingThreshold - subtotal 
      : 0;
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
    isInCart,
    getSubtotal,
    isEligibleForFreeShipping,
    getAmountForFreeShipping
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};