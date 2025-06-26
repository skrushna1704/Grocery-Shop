import User from '../models/User.js';
import { successResponse, errorResponse, generatePagination, removeSensitiveFields } from '../utils/helpers.js';
import { uploadImage, deleteImage } from '../utils/cloudinaryService.js';

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';

    // Build query
    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    // Get total count
    const total = await User.countDocuments(query);

    // Get pagination info
    const pagination = generatePagination(page, limit, total);

    // Get users
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(pagination.skip)
      .limit(pagination.pageSize);

    res.json(successResponse('Users retrieved successfully', { users }, pagination));
  } catch (error) {
    next(error);
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json(errorResponse('User not found'));
    }

    res.json(successResponse('User retrieved successfully', { user }));
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, addresses } = req.body;
    
    const updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (addresses) updateData.addresses = addresses;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.json(successResponse('Profile updated successfully', { user }));
  } catch (error) {
    next(error);
  }
};

// @desc    Update user avatar
// @route   PUT /api/users/avatar
// @access  Private
export const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json(errorResponse('Please upload an image'));
    }

    const user = await User.findById(req.user.id);

    // Delete old avatar from Cloudinary if exists
    if (user.avatar && user.avatar.public_id) {
      try {
        await deleteImage(user.avatar.public_id);
      } catch (error) {
        console.error('Error deleting old avatar:', error);
      }
    }

    // Upload new avatar to Cloudinary
    const result = await uploadImage(req.file, 'avatars');

    // Update user avatar
    user.avatar = {
      public_id: result.public_id,
      url: result.url
    };
    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    res.json(successResponse('Avatar updated successfully', { user: userResponse }));
  } catch (error) {
    next(error);
  }
};

// @desc    Add address
// @route   POST /api/users/addresses
// @access  Private
export const addAddress = async (req, res, next) => {
  try {
    const { type, addressLine1, addressLine2, city, state, postalCode, country, isDefault } = req.body;

    const user = await User.findById(req.user.id);

    // If this is the default address, unset other defaults
    if (isDefault) {
      user.addresses.forEach(addr => {
        addr.isDefault = false;
      });
    }

    // Add new address
    user.addresses.push({
      type,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country: country || 'India',
      isDefault
    });

    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json(successResponse('Address added successfully', { user: userResponse }));
  } catch (error) {
    next(error);
  }
};

// @desc    Update address
// @route   PUT /api/users/addresses/:addressId
// @access  Private
export const updateAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const updateData = req.body;

    const user = await User.findById(req.user.id);
    const addressIndex = user.addresses.findIndex(addr => addr._id.toString() === addressId);

    if (addressIndex === -1) {
      return res.status(404).json(errorResponse('Address not found'));
    }

    // If setting as default, unset other defaults
    if (updateData.isDefault) {
      user.addresses.forEach(addr => {
        addr.isDefault = false;
      });
    }

    // Update address
    user.addresses[addressIndex] = {
      ...user.addresses[addressIndex].toObject(),
      ...updateData
    };

    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    res.json(successResponse('Address updated successfully', { user: userResponse }));
  } catch (error) {
    next(error);
  }
};

// @desc    Delete address
// @route   DELETE /api/users/addresses/:addressId
// @access  Private
export const deleteAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;

    const user = await User.findById(req.user.id);
    const addressIndex = user.addresses.findIndex(addr => addr._id.toString() === addressId);

    if (addressIndex === -1) {
      return res.status(404).json(errorResponse('Address not found'));
    }

    // Remove address
    user.addresses.splice(addressIndex, 1);

    // If no default address exists, set the first one as default
    if (user.addresses.length > 0 && !user.addresses.some(addr => addr.isDefault)) {
      user.addresses[0].isDefault = true;
    }

    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    res.json(successResponse('Address deleted successfully', { user: userResponse }));
  } catch (error) {
    next(error);
  }
};

// @desc    Deactivate account
// @route   PUT /api/users/deactivate
// @access  Private
export const deactivateAccount = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    user.isActive = false;
    await user.save();

    res.json(successResponse('Account deactivated successfully'));
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json(errorResponse('User not found'));
    }

    // Delete avatar from Cloudinary if exists
    if (user.avatar && user.avatar.public_id) {
      try {
        await deleteImage(user.avatar.public_id);
      } catch (error) {
        console.error('Error deleting avatar:', error);
      }
    }

    await User.findByIdAndDelete(req.params.id);

    res.json(successResponse('User deleted successfully'));
  } catch (error) {
    next(error);
  }
};

// @desc    Get user statistics (Admin only)
// @route   GET /api/users/stats
// @access  Private/Admin
export const getUserStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const verifiedUsers = await User.countDocuments({ isEmailVerified: true });
    const todayUsers = await User.countDocuments({
      createdAt: { $gte: new Date().setHours(0, 0, 0, 0) }
    });

    const stats = {
      totalUsers,
      activeUsers,
      verifiedUsers,
      todayUsers,
      verificationRate: totalUsers > 0 ? ((verifiedUsers / totalUsers) * 100).toFixed(2) : 0
    };

    res.json(successResponse('User statistics retrieved', { stats }));
  } catch (error) {
    next(error);
  }
}; 