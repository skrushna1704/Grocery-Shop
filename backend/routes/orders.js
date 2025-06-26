import express from 'express';
import {
  createOrder,
  getUserOrders,
  getOrder,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
  getOrderStats,
  getOrderByNumber
} from '../controllers/orderController.js';
import { protect, authorize } from '../middleware/auth.js';
import {
  validateOrder,
  validateId,
  validatePagination
} from '../middleware/validation.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// User order routes
router.post('/', validateOrder, createOrder);
router.get('/', validatePagination, getUserOrders);
router.get('/number/:orderNumber', getOrderByNumber);
router.get('/:id', validateId, getOrder);
router.put('/:id/cancel', validateId, cancelOrder);

// Admin routes
router.get('/admin/all', authorize('admin'), validatePagination, getAllOrders);
router.put('/:id/status', authorize('admin'), validateId, updateOrderStatus);
router.get('/admin/stats', authorize('admin'), getOrderStats);

export default router; 