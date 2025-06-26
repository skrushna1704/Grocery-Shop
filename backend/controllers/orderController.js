import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { successResponse, errorResponse, generatePagination, generateOrderNumber, calculateTotal, calculateTax, calculateShippingCost } from '../utils/helpers.js';
import { sendOrderConfirmationEmail } from '../utils/emailService.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, paymentMethod, couponCode } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json(errorResponse('Order must contain at least one item'));
    }

    // Validate and get products
    const productIds = items.map(item => item.product);
    const products = await Product.find({ _id: { $in: productIds } });

    if (products.length !== items.length) {
      return res.status(400).json(errorResponse('Some products not found'));
    }

    // Check stock and calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = products.find(p => p._id.toString() === item.product);
      
      if (!product || product.status !== 'active') {
        return res.status(400).json(errorResponse(`Product ${product?.name || 'Unknown'} is not available`));
      }

      if (product.stock < item.quantity) {
        return res.status(400).json(errorResponse(`Insufficient stock for ${product.name}`));
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        total: itemTotal,
        image: product.mainImage?.url || product.images[0]?.url
      });

      // Update product stock
      product.stock -= item.quantity;
      await product.save();
    }

    // Calculate tax and shipping
    const tax = calculateTax(subtotal);
    const shippingCost = calculateShippingCost(subtotal);
    const total = subtotal + tax + shippingCost;

    // Create order
    const order = await Order.create({
      orderNumber: generateOrderNumber(),
      user: req.user.id,
      items: orderItems,
      subtotal,
      tax,
      shippingCost,
      total,
      shippingAddress,
      paymentMethod,
      status: 'pending'
    });

    // Clear user cart
    await Cart.findOneAndUpdate(
      { user: req.user.id },
      { items: [] }
    );

    // Send order confirmation email
    try {
      const orderDetails = orderItems.map(item => 
        `${item.name} - ${item.quantity} x ₹${item.price} = ₹${item.total}`
      ).join('<br>');

      await sendOrderConfirmationEmail(
        req.user.email,
        req.user.name,
        order.orderNumber,
        orderDetails
      );
    } catch (emailError) {
      console.error('Order confirmation email failed:', emailError);
    }

    const populatedOrder = await Order.findById(order._id)
      .populate('user', 'name email phone');

    res.status(201).json(successResponse('Order created successfully', { order: populatedOrder }));
  } catch (error) {
    next(error);
  }
};

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
export const getUserOrders = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status || '';

    // Build query
    const query = { user: req.user.id };
    if (status) {
      query.status = status;
    }

    // Get total count
    const total = await Order.countDocuments(query);

    // Get pagination info
    const pagination = generatePagination(page, limit, total);

    // Get orders
    const orders = await Order.find(query)
      .populate('items.product', 'name images')
      .sort({ createdAt: -1 })
      .skip(pagination.skip)
      .limit(pagination.pageSize);

    res.json(successResponse('Orders retrieved successfully', { orders }, pagination));
  } catch (error) {
    next(error);
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('items.product', 'name images description');

    if (!order) {
      return res.status(404).json(errorResponse('Order not found'));
    }

    // Check if user owns this order or is admin
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json(errorResponse('Not authorized to access this order'));
    }

    res.json(successResponse('Order retrieved successfully', { order }));
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
export const cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json(errorResponse('Order not found'));
    }

    // Check if user owns this order or is admin
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json(errorResponse('Not authorized to cancel this order'));
    }

    // Check if order can be cancelled
    if (!['pending', 'confirmed'].includes(order.status)) {
      return res.status(400).json(errorResponse('Order cannot be cancelled at this stage'));
    }

    // Update order status
    order.status = 'cancelled';
    order.cancelledAt = new Date();
    order.cancelledBy = req.user.id;
    await order.save();

    // Restore product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity }
      });
    }

    const populatedOrder = await Order.findById(order._id)
      .populate('user', 'name email phone')
      .populate('items.product', 'name images');

    res.json(successResponse('Order cancelled successfully', { order: populatedOrder }));
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders (Admin only)
// @route   GET /api/orders/admin/all
// @access  Private/Admin
export const getAllOrders = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status || '';
    const search = req.query.search || '';

    // Build query
    const query = {};
    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: 'i' } },
        { 'user.name': { $regex: search, $options: 'i' } }
      ];
    }

    // Get total count
    const total = await Order.countDocuments(query);

    // Get pagination info
    const pagination = generatePagination(page, limit, total);

    // Get orders
    const orders = await Order.find(query)
      .populate('user', 'name email phone')
      .populate('items.product', 'name images')
      .sort({ createdAt: -1 })
      .skip(pagination.skip)
      .limit(pagination.pageSize);

    res.json(successResponse('Orders retrieved successfully', { orders }, pagination));
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status (Admin only)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json(errorResponse('Order not found'));
    }

    // Validate status transition
    const validTransitions = {
      pending: ['confirmed', 'cancelled'],
      confirmed: ['processing', 'cancelled'],
      processing: ['shipped', 'cancelled'],
      shipped: ['delivered'],
      delivered: [],
      cancelled: [],
      refunded: []
    };

    if (!validTransitions[order.status].includes(status)) {
      return res.status(400).json(errorResponse(`Cannot change status from ${order.status} to ${status}`));
    }

    // Update order status
    order.status = status;
    
    // Add status-specific timestamps
    switch (status) {
      case 'confirmed':
        order.confirmedAt = new Date();
        break;
      case 'processing':
        order.processingAt = new Date();
        break;
      case 'shipped':
        order.shippedAt = new Date();
        break;
      case 'delivered':
        order.deliveredAt = new Date();
        break;
      case 'cancelled':
        order.cancelledAt = new Date();
        order.cancelledBy = req.user.id;
        break;
    }

    await order.save();

    const populatedOrder = await Order.findById(order._id)
      .populate('user', 'name email phone')
      .populate('items.product', 'name images');

    res.json(successResponse('Order status updated successfully', { order: populatedOrder }));
  } catch (error) {
    next(error);
  }
};

// @desc    Get order statistics (Admin only)
// @route   GET /api/orders/stats
// @access  Private/Admin
export const getOrderStats = async (req, res, next) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const confirmedOrders = await Order.countDocuments({ status: 'confirmed' });
    const processingOrders = await Order.countDocuments({ status: 'processing' });
    const shippedOrders = await Order.countDocuments({ status: 'shipped' });
    const deliveredOrders = await Order.countDocuments({ status: 'delivered' });
    const cancelledOrders = await Order.countDocuments({ status: 'cancelled' });

    // Calculate total revenue
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

    const stats = {
      totalOrders,
      pendingOrders,
      confirmedOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue: revenueStats[0]?.totalRevenue || 0,
      averageOrderValue: revenueStats[0]?.averageOrderValue || 0
    };

    res.json(successResponse('Order statistics retrieved', { stats }));
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by order number
// @route   GET /api/orders/number/:orderNumber
// @access  Private
export const getOrderByNumber = async (req, res, next) => {
  try {
    const { orderNumber } = req.params;

    const order = await Order.findOne({ orderNumber })
      .populate('user', 'name email phone')
      .populate('items.product', 'name images description');

    if (!order) {
      return res.status(404).json(errorResponse('Order not found'));
    }

    // Check if user owns this order or is admin
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json(errorResponse('Not authorized to access this order'));
    }

    res.json(successResponse('Order retrieved successfully', { order }));
  } catch (error) {
    next(error);
  }
}; 