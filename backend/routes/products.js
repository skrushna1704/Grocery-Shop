import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProductImage,
  getFeaturedProducts,
  getBestSellers,
  getNewArrivals,
  addProductReview,
  getProductStats
} from '../controllers/productController.js';
import { protect, authorize } from '../middleware/auth.js';
import { uploadProductImages } from '../middleware/upload.js';
import {
  validateProduct,
  validateId,
  validatePagination,
  validateSearch
} from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', validatePagination, validateSearch, getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/best-sellers', getBestSellers);
router.get('/new-arrivals', getNewArrivals);
router.get('/:id', validateId, getProduct);

// Protected routes
router.post('/:id/reviews', protect, addProductReview);

// Admin routes
router.post('/', protect, authorize('admin'), validateProduct, createProduct);
router.put('/:id', protect, authorize('admin'), validateId, updateProduct);
router.delete('/:id', protect, authorize('admin'), validateId, deleteProduct);
router.post('/:id/images', protect, authorize('admin'), uploadProductImages);
router.delete('/:id/images/:imageId', protect, authorize('admin'), deleteProductImage);
router.get('/admin/stats', protect, authorize('admin'), getProductStats);

export default router; 