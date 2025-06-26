import crypto from 'crypto';
import User from '../models/User.js';
import { successResponse, errorResponse, generateRandomString } from '../utils/helpers.js';
import { sendWelcomeEmail, sendEmailVerification, sendPasswordResetEmail } from '../utils/emailService.js';
import config from '../config/config.js';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, name, email, password, phone, role = 'user' } = req.body;

    // Handle both name formats (firstName+lastName or name)
    let fullName = name;
    if (firstName && lastName) {
      fullName = `${firstName} ${lastName}`.trim();
    }

    if (!fullName) {
      return res.status(400).json(errorResponse('Name is required'));
    }

    // Validate role
    const validRoles = Object.values(config.USER_ROLES);
    if (!validRoles.includes(role)) {
      return res.status(400).json(errorResponse('Invalid role specified'));
    }

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json(errorResponse('User already exists with this email'));
    }

    // For shopkeeper registration, check if there's already an approved shopkeeper
    if (role === 'admin') {
      const existingShopkeeper = await User.findOne({ 
        role: 'admin', 
        isActive: true,
        status: 'approved'
      });
      
      if (existingShopkeeper) {
        return res.status(400).json(errorResponse('A shopkeeper already exists for this store. Please contact support.'));
      }
    }

    // Create user with role-specific settings
    const userData = {
      name: fullName,
      email,
      password,
      phone,
      role
    };

    // Set status based on role
    if (role === 'admin') {
      userData.status = 'pending_approval';
      userData.isActive = false; // Shopkeepers need approval
    } else {
      userData.status = 'active';
      userData.isActive = true; // Customers can login immediately
    }

    const user = await User.create(userData);

    // Generate email verification token
    const verificationToken = user.generateEmailVerificationToken();
    await user.save();

    // Send welcome email
    try {
      await sendWelcomeEmail(email, fullName);
    } catch (emailError) {
      console.error('Welcome email failed:', emailError);
    }

    // Send email verification
    try {
      const verificationUrl = `${req.protocol}://${req.get('host')}/api/auth/verify-email/${verificationToken}`;
      await sendEmailVerification(email, fullName, verificationUrl);
    } catch (emailError) {
      console.error('Verification email failed:', emailError);
    }

    // For shopkeepers, send notification to admin
    if (role === 'admin') {
      try {
        // Send notification to admin about new shopkeeper registration
        // This would typically send an email to admin or create a notification
        console.log(`New shopkeeper registration: ${email} - ${fullName}`);
      } catch (notificationError) {
        console.error('Admin notification failed:', notificationError);
      }
    }

    // Generate token only for customers (shopkeepers need approval)
    let token = null;
    if (role !== 'admin') {
      token = user.generateAuthToken();
    }

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    const responseData = {
      user: userResponse,
      requiresApproval: role === 'admin'
    };

    if (token) {
      responseData.token = token;
    }

    res.status(201).json(successResponse(
      role === 'admin' 
        ? 'Shopkeeper registration submitted successfully. Please wait for admin approval.' 
        : 'User registered successfully', 
      responseData
    ));
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findByEmail(email).select('+password');
    console.log('DEBUG: User found for email', email, ':', user);

    if (!user) {
      return res.status(401).json(errorResponse('Invalid credentials'));
    }

    // Check if user is active
    if (!user.isActive) {
      console.log('DEBUG: User is not active:', user.email);
      return res.status(401).json(errorResponse('Account is deactivated'));
    }

    // Check approval status for shopkeepers
    if (user.role === 'admin' && user.status !== 'approved') {
      console.log('DEBUG: Admin status not approved:', user.status);
      if (user.status === 'pending_approval') {
        return res.status(401).json(errorResponse('Your shopkeeper account is pending approval. Please wait for admin approval.'));
      } else if (user.status === 'rejected') {
        return res.status(401).json(errorResponse('Your shopkeeper account has been rejected. Please contact support.'));
      }
    }

    // Check password
    console.log('DEBUG: Entered password:', password);
    console.log('DEBUG: User password hash:', user.password);
    const isPasswordValid = await user.comparePassword(password);
    console.log('DEBUG: Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json(errorResponse('Invalid credentials'));
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = user.generateAuthToken();

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json(successResponse('Login successful', {
      user: userResponse,
      token
    }));
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res, next) => {
  try {
    // In a stateless JWT setup, logout is handled client-side
    // You could implement a blacklist for tokens if needed
    res.json(successResponse('Logged out successfully'));
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(successResponse('User profile retrieved', { user }));
  } catch (error) {
    next(error);
  }
};

// @desc    Verify email
// @route   GET /api/auth/verify-email/:token
// @access  Public
export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;

    // Hash the token
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Find user with this token
    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json(errorResponse('Invalid or expired verification token'));
    }

    // Mark email as verified
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpire = undefined;
    await user.save();

    res.json(successResponse('Email verified successfully'));
  } catch (error) {
    next(error);
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json(errorResponse('User not found'));
    }

    // Generate reset token
    const resetToken = user.generatePasswordResetToken();
    await user.save();

    // Send reset email
    try {
      const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;
      await sendPasswordResetEmail(email, user.name, resetUrl);
    } catch (emailError) {
      console.error('Password reset email failed:', emailError);
      return res.status(500).json(errorResponse('Email could not be sent'));
    }

    res.json(successResponse('Password reset email sent'));
  } catch (error) {
    next(error);
  }
};

// @desc    Reset password
// @route   POST /api/auth/reset-password/:token
// @access  Public
export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Hash the token
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Find user with this token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json(errorResponse('Invalid or expired reset token'));
    }

    // Set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json(successResponse('Password reset successful'));
  } catch (error) {
    next(error);
  }
};

// @desc    Update password
// @route   PUT /api/auth/update-password
// @access  Private
export const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      return res.status(401).json(errorResponse('Current password is incorrect'));
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json(successResponse('Password updated successfully'));
  } catch (error) {
    next(error);
  }
};

// @desc    Resend email verification
// @route   POST /api/auth/resend-verification
// @access  Private
export const resendVerification = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.isEmailVerified) {
      return res.status(400).json(errorResponse('Email is already verified'));
    }

    // Generate new verification token
    const verificationToken = user.generateEmailVerificationToken();
    await user.save();

    // Send verification email
    try {
      const verificationUrl = `${req.protocol}://${req.get('host')}/api/auth/verify-email/${verificationToken}`;
      await sendEmailVerification(user.email, user.name, verificationUrl);
    } catch (emailError) {
      console.error('Verification email failed:', emailError);
      return res.status(500).json(errorResponse('Email could not be sent'));
    }

    res.json(successResponse('Verification email sent'));
  } catch (error) {
    next(error);
  }
}; 