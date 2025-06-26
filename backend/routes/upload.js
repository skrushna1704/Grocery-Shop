import express from 'express';
import {
  uploadSingleImage,
  uploadMultipleImages,
  deleteUploadedImage,
  getUploadStats
} from '../controllers/uploadController.js';
import { protect, authorize } from '../middleware/auth.js';
import { uploadSingle, uploadMultiple } from '../middleware/upload.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Upload routes
router.post('/image', uploadSingle('image'), uploadSingleImage);
router.post('/images', uploadMultiple('images', 5), uploadMultipleImages);
router.delete('/image/:publicId', deleteUploadedImage);

// Admin routes
router.get('/stats', authorize('admin'), getUploadStats);

export default router; 