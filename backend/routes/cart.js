import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getCartCount,
  mergeGuestCart
} from '../controllers/cartController.js';
import { protect } from '../middleware/auth.js';
import { validateId } from '../middleware/validation.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Cart routes
router.get('/', getCart);
router.get('/count', getCartCount);
router.post('/items', addToCart);
router.put('/items/:itemId', validateId, updateCartItem);
router.delete('/items/:itemId', validateId, removeFromCart);
router.delete('/', clearCart);
router.post('/merge', mergeGuestCart);

export default router; 