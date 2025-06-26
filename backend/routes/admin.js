import express from 'express';
import {
  getDashboardStats,
  getAnalytics,
  getSystemHealth,
  getAdminSettings,
  updateAdminSettings,
  getAdminLogs,
  getPendingShopkeepers,
  approveShopkeeper,
  rejectShopkeeper
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected and require admin access
router.use(protect);
router.use(authorize('admin'));

// Dashboard routes
router.get('/dashboard', getDashboardStats);
router.get('/analytics', getAnalytics);

// System routes
router.get('/health', getSystemHealth);
router.get('/settings', getAdminSettings);
router.put('/settings', updateAdminSettings);
router.get('/logs', getAdminLogs);

// Shopkeeper management routes
router.get('/pending-shopkeepers', getPendingShopkeepers);
router.put('/approve-shopkeeper/:id', approveShopkeeper);
router.put('/reject-shopkeeper/:id', rejectShopkeeper);

export default router; 