import express from 'express';
import {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  addAddress,
  updateAddress,
  deleteAddress,
  deactivateAccount,
  deleteUser,
  getUserStats
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';
import { uploadAvatar } from '../middleware/upload.js';
import {
  validateUserUpdate,
  validateId,
  validatePagination
} from '../middleware/validation.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// User profile routes
router.put('/profile', validateUserUpdate, updateProfile);
router.put('/avatar', uploadAvatar, updateAvatar);
router.put('/deactivate', deactivateAccount);

// Address routes
router.post('/addresses', addAddress);
router.put('/addresses/:addressId', updateAddress);
router.delete('/addresses/:addressId', deleteAddress);

// Admin routes
router.get('/', authorize('admin'), validatePagination, getUsers);
router.get('/stats', authorize('admin'), getUserStats);
router.get('/:id', validateId, getUser);
router.delete('/:id', authorize('admin'), validateId, deleteUser);

export default router; 