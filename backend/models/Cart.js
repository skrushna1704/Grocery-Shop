import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1']
  },
  price: {
    type: Number,
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [cartItemSchema],
  subtotal: {
    type: Number,
    default: 0,
    min: [0, 'Subtotal cannot be negative']
  },
  tax: {
    type: Number,
    default: 0,
    min: [0, 'Tax cannot be negative']
  },
  shipping: {
    type: Number,
    default: 0,
    min: [0, 'Shipping cannot be negative']
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative']
  },
  total: {
    type: Number,
    default: 0,
    min: [0, 'Total cannot be negative']
  },
  coupon: {
    code: String,
    discount: Number,
    appliedAt: Date
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for item count
cartSchema.virtual('itemCount').get(function() {
  return this.items.length;
});

// Virtual for total quantity
cartSchema.virtual('totalQuantity').get(function() {
  return this.items.reduce((sum, item) => sum + item.quantity, 0);
});

// Virtual for is empty
cartSchema.virtual('isEmpty').get(function() {
  return this.items.length === 0;
});

// Indexes for better query performance
cartSchema.index({ user: 1 });
cartSchema.index({ 'items.product': 1 });

// Pre-save middleware to calculate totals
cartSchema.pre('save', function(next) {
  this.calculateTotals();
  this.lastUpdated = new Date();
  next();
});

// Static method to find cart by user
cartSchema.statics.findByUser = function(userId) {
  return this.findOne({ user: userId })
    .populate({
      path: 'items.product',
      select: 'name price stock unit mainImage status'
    });
};

// Static method to create or get cart for user
cartSchema.statics.getOrCreateCart = async function(userId) {
  let cart = await this.findOne({ user: userId })
    .populate({
      path: 'items.product',
      select: 'name price stock unit mainImage status'
    });

  if (!cart) {
    cart = new this({ user: userId });
    await cart.save();
  }

  return cart;
};

// Instance method to calculate totals
cartSchema.methods.calculateTotals = function() {
  this.subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Calculate tax (example: 5% GST)
  this.tax = this.subtotal * 0.05;
  
  // Calculate shipping (example: free shipping above 500, else 50)
  this.shipping = this.subtotal >= 500 ? 0 : 50;
  
  // Apply coupon discount
  const couponDiscount = this.coupon ? this.coupon.discount : 0;
  this.discount = couponDiscount;
  
  // Calculate total
  this.total = this.subtotal + this.tax + this.shipping - this.discount;
  
  return this;
};

// Instance method to add item to cart
cartSchema.methods.addItem = async function(productId, quantity = 1, price = null) {
  const Product = mongoose.model('Product');
  const product = await Product.findById(productId);
  
  if (!product) {
    throw new Error('Product not found');
  }
  
  if (product.status !== 'active') {
    throw new Error('Product is not available');
  }
  
  if (product.stock < quantity) {
    throw new Error('Insufficient stock');
  }
  
  const itemPrice = price || product.price;
  const existingItem = this.items.find(item => 
    item.product.toString() === productId.toString()
  );

  if (existingItem) {
    existingItem.quantity += quantity;
    existingItem.price = itemPrice; // Update price in case it changed
  } else {
    this.items.push({
      product: productId,
      quantity,
      price: itemPrice
    });
  }

  this.calculateTotals();
  return this.save();
};

// Instance method to update item quantity
cartSchema.methods.updateItemQuantity = async function(productId, quantity) {
  const Product = mongoose.model('Product');
  const product = await Product.findById(productId);
  
  if (!product) {
    throw new Error('Product not found');
  }
  
  if (quantity <= 0) {
    return this.removeItem(productId);
  }
  
  if (product.stock < quantity) {
    throw new Error('Insufficient stock');
  }
  
  const item = this.items.find(item => 
    item.product.toString() === productId.toString()
  );
  
  if (!item) {
    throw new Error('Item not found in cart');
  }
  
  item.quantity = quantity;
  item.price = product.price; // Update price in case it changed
  
  this.calculateTotals();
  return this.save();
};

// Instance method to remove item from cart
cartSchema.methods.removeItem = function(productId) {
  this.items = this.items.filter(item => 
    item.product.toString() !== productId.toString()
  );
  this.calculateTotals();
  return this.save();
};

// Instance method to clear cart
cartSchema.methods.clearCart = function() {
  this.items = [];
  this.coupon = null;
  this.calculateTotals();
  return this.save();
};

// Instance method to apply coupon
cartSchema.methods.applyCoupon = function(couponCode) {
  // This would typically validate the coupon with a Coupon model
  // For now, we'll use a simple example
  const validCoupons = {
    'WELCOME10': { discount: 10 },
    'SAVE20': { discount: 20 },
    'FREESHIP': { discount: 50 } // Free shipping
  };
  
  const coupon = validCoupons[couponCode];
  if (!coupon) {
    throw new Error('Invalid coupon code');
  }
  
  this.coupon = {
    code: couponCode,
    discount: coupon.discount,
    appliedAt: new Date()
  };
  
  this.calculateTotals();
  return this.save();
};

// Instance method to remove coupon
cartSchema.methods.removeCoupon = function() {
  this.coupon = null;
  this.calculateTotals();
  return this.save();
};

// Instance method to validate cart items
cartSchema.methods.validateItems = async function() {
  const Product = mongoose.model('Product');
  const errors = [];
  
  for (const item of this.items) {
    const product = await Product.findById(item.product);
    
    if (!product) {
      errors.push(`Product ${item.product} not found`);
      continue;
    }
    
    if (product.status !== 'active') {
      errors.push(`Product ${product.name} is not available`);
    }
    
    if (product.stock < item.quantity) {
      errors.push(`Insufficient stock for ${product.name}`);
    }
    
    if (product.price !== item.price) {
      errors.push(`Price changed for ${product.name}`);
    }
  }
  
  return errors;
};

// Instance method to convert cart to order items
cartSchema.methods.toOrderItems = function() {
  return this.items.map(item => ({
    product: item.product,
    name: item.product.name, // This would be populated
    price: item.price,
    quantity: item.quantity,
    unit: item.product.unit, // This would be populated
    image: item.product.mainImage, // This would be populated
    total: item.price * item.quantity
  }));
};

export default mongoose.model('Cart', cartSchema); 