import express from 'express';
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryTree,
  getCategoryProducts,
  getCategoryStats
} from '../controllers/categoryController.js';
import { protect, authorize } from '../middleware/auth.js';
import { uploadCategoryImage } from '../middleware/upload.js';
import {
  validateCategory,
  validateId,
  validatePagination,
  validateSearch
} from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', validatePagination, validateSearch, getCategories);
router.get('/tree', getCategoryTree);
router.get('/:id', validateId, getCategory);
router.get('/:id/products', validateId, getCategoryProducts);

// Admin routes
router.post('/', protect, authorize('admin'), validateCategory, createCategory);
router.put('/:id', protect, authorize('admin'), validateId, updateCategory);
router.delete('/:id', protect, authorize('admin'), validateId, deleteCategory);
router.post('/:id/image', protect, authorize('admin'), uploadCategoryImage);
router.get('/admin/stats', protect, authorize('admin'), getCategoryStats);

export default router; 