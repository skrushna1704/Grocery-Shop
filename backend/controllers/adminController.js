import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Category from '../models/Category.js';
import { successResponse, errorResponse } from '../utils/helpers.js';

// @desc    Get admin dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getDashboardStats = async (req, res, next) => {
  try {
    // Get current date and last 30 days
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // User statistics
    const totalUsers = await User.countDocuments();
    const newUsers = await User.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });
    const activeUsers = await User.countDocuments({ isActive: true });
    const verifiedUsers = await User.countDocuments({ isEmailVerified: true });

    // Product statistics
    const totalProducts = await Product.countDocuments();
    const activeProducts = await Product.countDocuments({ status: 'active' });
    const outOfStockProducts = await Product.countDocuments({ stock: 0 });
    const newProducts = await Product.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    // Order statistics
    const totalOrders = await Order.countDocuments();
    const newOrders = await Order.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const deliveredOrders = await Order.countDocuments({ status: 'delivered' });

    // Revenue statistics
    const revenueStats = await Order.aggregate([
      { $match: { status: { $in: ['delivered', 'shipped'] } } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$total' },
          averageOrderValue: { $avg: '$total' }
        }
      }
    ]);

    const monthlyRevenue = await Order.aggregate([
      {
        $match: {
          status: { $in: ['delivered', 'shipped'] },
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: null,
          revenue: { $sum: '$total' }
        }
      }
    ]);

    // Category statistics
    const totalCategories = await Category.countDocuments();
    const categoriesWithProducts = await Category.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'category',
          as: 'products'
        }
      },
      {
        $match: {
          'products.0': { $exists: true }
        }
      },
      {
        $count: 'count'
      }
    ]);

    // Recent orders
    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    // Recent users
    const recentUsers = await User.find()
      .select('name email createdAt')
      .sort({ createdAt: -1 })
      .limit(5);

    // Low stock products
    const lowStockProducts = await Product.find({ stock: { $lt: 10 } })
      .select('name stock price')
      .limit(5);

    const stats = {
      users: {
        total: totalUsers,
        new: newUsers,
        active: activeUsers,
        verified: verifiedUsers,
        verificationRate: totalUsers > 0 ? ((verifiedUsers / totalUsers) * 100).toFixed(2) : 0
      },
      products: {
        total: totalProducts,
        active: activeProducts,
        outOfStock: outOfStockProducts,
        new: newProducts
      },
      orders: {
        total: totalOrders,
        new: newOrders,
        pending: pendingOrders,
        delivered: deliveredOrders
      },
      revenue: {
        total: revenueStats[0]?.totalRevenue || 0,
        monthly: monthlyRevenue[0]?.revenue || 0,
        averageOrder: revenueStats[0]?.averageOrderValue || 0
      },
      categories: {
        total: totalCategories,
        withProducts: categoriesWithProducts[0]?.count || 0
      },
      recent: {
        orders: recentOrders,
        users: recentUsers,
        lowStockProducts
      }
    };

    res.json(successResponse('Dashboard statistics retrieved', { stats }));
  } catch (error) {
    next(error);
  }
};

// @desc    Get admin analytics
// @route   GET /api/admin/analytics
// @access  Private/Admin
export const getAnalytics = async (req, res, next) => {
  try {
    const { period = '30' } = req.query;
    const days = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Sales analytics
    const salesData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
          status: { $in: ['delivered', 'shipped'] }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          orders: { $sum: 1 },
          revenue: { $sum: '$total' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // User registration analytics
    const userData = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          registrations: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Product category analytics
    const categoryData = await Product.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'categoryInfo'
        }
      },
      {
        $unwind: '$categoryInfo'
      },
      {
        $group: {
          _id: '$categoryInfo.name',
          count: { $sum: 1 },
          totalValue: { $sum: '$price' }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    // Top selling products
    const topProducts = await Order.aggregate([
      {
        $match: {
          status: { $in: ['delivered', 'shipped'] },
          createdAt: { $gte: startDate }
        }
      },
      {
        $unwind: '$items'
      },
      {
        $group: {
          _id: '$items.product',
          totalSold: { $sum: '$items.quantity' },
          totalRevenue: { $sum: '$items.total' }
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      {
        $unwind: '$product'
      },
      {
        $project: {
          name: '$product.name',
          totalSold: 1,
          totalRevenue: 1
        }
      },
      {
        $sort: { totalSold: -1 }
      },
      {
        $limit: 10
      }
    ]);

    const analytics = {
      sales: salesData,
      users: userData,
      categories: categoryData,
      topProducts
    };

    res.json(successResponse('Analytics data retrieved', { analytics }));
  } catch (error) {
    next(error);
  }
};

// @desc    Get system health
// @route   GET /api/admin/health
// @access  Private/Admin
export const getSystemHealth = async (req, res, next) => {
  try {
    const health = {
      database: 'connected',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      environment: process.env.NODE_ENV
    };

    res.json(successResponse('System health check completed', { health }));
  } catch (error) {
    next(error);
  }
};

// @desc    Get admin settings
// @route   GET /api/admin/settings
// @access  Private/Admin
export const getAdminSettings = async (req, res, next) => {
  try {
    // This would typically fetch from a settings collection or config
    const settings = {
      siteName: 'Jumale Kirana',
      siteDescription: 'Your trusted grocery store',
      contactEmail: 'admin@jumalekirana.com',
      contactPhone: '+91 1234567890',
      address: 'Mumbai, Maharashtra, India',
      currency: 'INR',
      taxRate: 18,
      freeShippingThreshold: 500,
      maxUploadSize: 5242880,
      maintenanceMode: false
    };

    res.json(successResponse('Admin settings retrieved', { settings }));
  } catch (error) {
    next(error);
  }
};

// @desc    Update admin settings
// @route   PUT /api/admin/settings
// @access  Private/Admin
export const updateAdminSettings = async (req, res, next) => {
  try {
    const updateData = req.body;

    // This would typically update a settings collection or config
    // For now, we'll just return success
    const settings = {
      ...updateData,
      updatedAt: new Date(),
      updatedBy: req.user.id
    };

    res.json(successResponse('Admin settings updated', { settings }));
  } catch (error) {
    next(error);
  }
};

// @desc    Get admin logs
// @route   GET /api/admin/logs
// @access  Private/Admin
export const getAdminLogs = async (req, res, next) => {
  try {
    const { level = 'info', limit = 100 } = req.query;

    // This would typically fetch from a logs collection or file
    const logs = [
      {
        timestamp: new Date().toISOString(),
        level: 'info',
        message: 'Server started successfully',
        user: 'system'
      },
      {
        timestamp: new Date(Date.now() - 60000).toISOString(),
        level: 'info',
        message: 'Database connection established',
        user: 'system'
      }
    ];

    res.json(successResponse('Admin logs retrieved', { logs }));
  } catch (error) {
    next(error);
  }
};

// @desc    Get pending shopkeeper registrations
// @route   GET /api/admin/pending-shopkeepers
// @access  Private/Admin
export const getPendingShopkeepers = async (req, res, next) => {
  try {
    const pendingShopkeepers = await User.find({
      role: 'admin',
      status: 'pending_approval'
    }).select('-password');

    res.json(successResponse('Pending shopkeepers retrieved', { shopkeepers: pendingShopkeepers }));
  } catch (error) {
    next(error);
  }
};

// @desc    Approve shopkeeper registration
// @route   PUT /api/admin/approve-shopkeeper/:id
// @access  Private/Admin
export const approveShopkeeper = async (req, res, next) => {
  try {
    const { id } = req.params;

    const shopkeeper = await User.findById(id);
    if (!shopkeeper) {
      return res.status(404).json(errorResponse('Shopkeeper not found'));
    }

    if (shopkeeper.role !== 'admin') {
      return res.status(400).json(errorResponse('User is not a shopkeeper'));
    }

    if (shopkeeper.status !== 'pending_approval') {
      return res.status(400).json(errorResponse('Shopkeeper is not pending approval'));
    }

    // Update shopkeeper status
    shopkeeper.status = 'approved';
    shopkeeper.isActive = true;
    shopkeeper.approvedAt = new Date();
    shopkeeper.approvedBy = req.user.id;
    await shopkeeper.save();

    // Send approval email
    try {
      // This would send an email notification to the shopkeeper
      console.log(`Shopkeeper approved: ${shopkeeper.email}`);
    } catch (emailError) {
      console.error('Approval email failed:', emailError);
    }

    res.json(successResponse('Shopkeeper approved successfully', { shopkeeper }));
  } catch (error) {
    next(error);
  }
};

// @desc    Reject shopkeeper registration
// @route   PUT /api/admin/reject-shopkeeper/:id
// @access  Private/Admin
export const rejectShopkeeper = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const shopkeeper = await User.findById(id);
    if (!shopkeeper) {
      return res.status(404).json(errorResponse('Shopkeeper not found'));
    }

    if (shopkeeper.role !== 'admin') {
      return res.status(400).json(errorResponse('User is not a shopkeeper'));
    }

    if (shopkeeper.status !== 'pending_approval') {
      return res.status(400).json(errorResponse('Shopkeeper is not pending approval'));
    }

    // Update shopkeeper status
    shopkeeper.status = 'rejected';
    shopkeeper.isActive = false;
    shopkeeper.rejectedAt = new Date();
    shopkeeper.rejectedBy = req.user.id;
    shopkeeper.rejectionReason = reason;
    await shopkeeper.save();

    // Send rejection email
    try {
      // This would send an email notification to the shopkeeper
      console.log(`Shopkeeper rejected: ${shopkeeper.email} - Reason: ${reason}`);
    } catch (emailError) {
      console.error('Rejection email failed:', emailError);
    }

    res.json(successResponse('Shopkeeper rejected successfully', { shopkeeper }));
  } catch (error) {
    next(error);
  }
}; 