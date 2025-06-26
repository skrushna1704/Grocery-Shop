import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { successResponse, errorResponse, calculateTotal } from '../utils/helpers.js';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id })
      .populate('items.product', 'name price images stock status discountPercentage');

    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }

    // Filter out products that are no longer available
    const validItems = cart.items.filter(item => 
      item.product && 
      item.product.status === 'active' && 
      item.product.stock > 0
    );

    // Update cart with valid items
    if (validItems.length !== cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    // Calculate totals
    const subtotal = calculateTotal(validItems);
    const total = subtotal;

    res.json(successResponse('Cart retrieved successfully', {
      cart: {
        ...cart.toObject(),
        subtotal,
        total
      }
    }));
  } catch (error) {
    next(error);
  }
};

// @desc    Add item to cart
// @route   POST /api/cart/items
// @access  Private
export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    // Validate product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json(errorResponse('Product not found'));
    }

    if (product.status !== 'active') {
      return res.status(400).json(errorResponse('Product is not available'));
    }

    if (product.stock < quantity) {
      return res.status(400).json(errorResponse('Insufficient stock'));
    }

    // Get or create cart
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }

    // Check if product already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;
      
      if (newQuantity > product.stock) {
        return res.status(400).json(errorResponse('Insufficient stock'));
      }
      
      cart.items[existingItemIndex].quantity = newQuantity;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity,
        price: product.price
      });
    }

    await cart.save();

    // Populate product details
    const populatedCart = await Cart.findById(cart._id)
      .populate('items.product', 'name price images stock status discountPercentage');

    // Calculate totals
    const subtotal = calculateTotal(populatedCart.items);
    const total = subtotal;

    res.json(successResponse('Item added to cart successfully', {
      cart: {
        ...populatedCart.toObject(),
        subtotal,
        total
      }
    }));
  } catch (error) {
    next(error);
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/items/:itemId
// @access  Private
export const updateCartItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json(errorResponse('Quantity must be at least 1'));
    }

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json(errorResponse('Cart not found'));
    }

    const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json(errorResponse('Item not found in cart'));
    }

    // Check stock availability
    const product = await Product.findById(cart.items[itemIndex].product);
    if (!product || product.status !== 'active') {
      return res.status(400).json(errorResponse('Product is not available'));
    }

    if (product.stock < quantity) {
      return res.status(400).json(errorResponse('Insufficient stock'));
    }

    // Update quantity
    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    // Populate product details
    const populatedCart = await Cart.findById(cart._id)
      .populate('items.product', 'name price images stock status discountPercentage');

    // Calculate totals
    const subtotal = calculateTotal(populatedCart.items);
    const total = subtotal;

    res.json(successResponse('Cart item updated successfully', {
      cart: {
        ...populatedCart.toObject(),
        subtotal,
        total
      }
    }));
  } catch (error) {
    next(error);
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/items/:itemId
// @access  Private
export const removeFromCart = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json(errorResponse('Cart not found'));
    }

    const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json(errorResponse('Item not found in cart'));
    }

    // Remove item
    cart.items.splice(itemIndex, 1);
    await cart.save();

    // Populate product details
    const populatedCart = await Cart.findById(cart._id)
      .populate('items.product', 'name price images stock status discountPercentage');

    // Calculate totals
    const subtotal = calculateTotal(populatedCart.items);
    const total = subtotal;

    res.json(successResponse('Item removed from cart successfully', {
      cart: {
        ...populatedCart.toObject(),
        subtotal,
        total
      }
    }));
  } catch (error) {
    next(error);
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json(errorResponse('Cart not found'));
    }

    cart.items = [];
    await cart.save();

    res.json(successResponse('Cart cleared successfully', {
      cart: {
        ...cart.toObject(),
        subtotal: 0,
        total: 0
      }
    }));
  } catch (error) {
    next(error);
  }
};

// @desc    Get cart count
// @route   GET /api/cart/count
// @access  Private
export const getCartCount = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    
    const count = cart ? cart.items.reduce((total, item) => total + item.quantity, 0) : 0;

    res.json(successResponse('Cart count retrieved', { count }));
  } catch (error) {
    next(error);
  }
};

// @desc    Move items from guest cart to user cart
// @route   POST /api/cart/merge
// @access  Private
export const mergeGuestCart = async (req, res, next) => {
  try {
    const { guestItems } = req.body;

    if (!guestItems || !Array.isArray(guestItems)) {
      return res.status(400).json(errorResponse('Invalid guest items'));
    }

    // Get or create user cart
    let userCart = await Cart.findOne({ user: req.user.id });
    if (!userCart) {
      userCart = await Cart.create({ user: req.user.id, items: [] });
    }

    // Process each guest item
    for (const guestItem of guestItems) {
      const { productId, quantity } = guestItem;

      // Validate product
      const product = await Product.findById(productId);
      if (!product || product.status !== 'active' || product.stock < quantity) {
        continue; // Skip invalid items
      }

      // Check if product already exists in user cart
      const existingItemIndex = userCart.items.findIndex(
        item => item.product.toString() === productId
      );

      if (existingItemIndex > -1) {
        // Update quantity
        const newQuantity = userCart.items[existingItemIndex].quantity + quantity;
        if (newQuantity <= product.stock) {
          userCart.items[existingItemIndex].quantity = newQuantity;
        }
      } else {
        // Add new item
        userCart.items.push({
          product: productId,
          quantity,
          price: product.price
        });
      }
    }

    await userCart.save();

    // Populate product details
    const populatedCart = await Cart.findById(userCart._id)
      .populate('items.product', 'name price images stock status discountPercentage');

    // Calculate totals
    const subtotal = calculateTotal(populatedCart.items);
    const total = subtotal;

    res.json(successResponse('Guest cart merged successfully', {
      cart: {
        ...populatedCart.toObject(),
        subtotal,
        total
      }
    }));
  } catch (error) {
    next(error);
  }
}; 