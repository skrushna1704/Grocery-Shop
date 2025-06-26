import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Please provide a coupon code'],
    unique: true,
    uppercase: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Please provide a coupon name'],
    trim: true,
    maxlength: [100, 'Coupon name cannot be more than 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  type: {
    type: String,
    enum: ['percentage', 'fixed', 'free_shipping'],
    required: true
  },
  value: {
    type: Number,
    required: [true, 'Please provide a coupon value'],
    min: [0, 'Coupon value cannot be negative']
  },
  minimumOrderAmount: {
    type: Number,
    default: 0,
    min: [0, 'Minimum order amount cannot be negative']
  },
  maximumDiscount: {
    type: Number,
    min: [0, 'Maximum discount cannot be negative']
  },
  usageLimit: {
    type: Number,
    default: null,
    min: [1, 'Usage limit must be at least 1']
  },
  usedCount: {
    type: Number,
    default: 0,
    min: [0, 'Used count cannot be negative']
  },
  perUserLimit: {
    type: Number,
    default: 1,
    min: [1, 'Per user limit must be at least 1']
  },
  validFrom: {
    type: Date,
    required: [true, 'Please provide a valid from date']
  },
  validUntil: {
    type: Date,
    required: [true, 'Please provide a valid until date']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  applicableCategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  applicableProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  excludedCategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  excludedProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  userRestrictions: {
    newUsersOnly: {
      type: Boolean,
      default: false
    },
    existingUsersOnly: {
      type: Boolean,
      default: false
    },
    specificUsers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  usageHistory: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true
    },
    discountAmount: {
      type: Number,
      required: true
    },
    usedAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for is expired
couponSchema.virtual('isExpired').get(function() {
  return new Date() > this.validUntil;
});

// Virtual for is valid
couponSchema.virtual('isValid').get(function() {
  const now = new Date();
  return this.isActive && 
         now >= this.validFrom && 
         now <= this.validUntil &&
         (!this.usageLimit || this.usedCount < this.usageLimit);
});

// Virtual for remaining usage
couponSchema.virtual('remainingUsage').get(function() {
  if (!this.usageLimit) return null;
  return Math.max(0, this.usageLimit - this.usedCount);
});

// Virtual for usage percentage
couponSchema.virtual('usagePercentage').get(function() {
  if (!this.usageLimit) return 0;
  return Math.round((this.usedCount / this.usageLimit) * 100);
});

// Indexes for better query performance
couponSchema.index({ code: 1 });
couponSchema.index({ isActive: 1 });
couponSchema.index({ validFrom: 1, validUntil: 1 });
couponSchema.index({ type: 1 });

// Pre-save middleware to validate dates
couponSchema.pre('save', function(next) {
  if (this.validFrom >= this.validUntil) {
    return next(new Error('Valid from date must be before valid until date'));
  }
  next();
});

// Static method to find valid coupons
couponSchema.statics.findValid = function() {
  const now = new Date();
  return this.find({
    isActive: true,
    validFrom: { $lte: now },
    validUntil: { $gte: now },
    $or: [
      { usageLimit: null },
      { $expr: { $lt: ['$usedCount', '$usageLimit'] } }
    ]
  });
};

// Static method to find coupon by code
couponSchema.statics.findByCode = function(code) {
  return this.findOne({ 
    code: code.toUpperCase(),
    isActive: true
  });
};

// Static method to find active coupons
couponSchema.statics.findActive = function() {
  const now = new Date();
  return this.find({
    isActive: true,
    validFrom: { $lte: now },
    validUntil: { $gte: now }
  });
};

// Static method to find expired coupons
couponSchema.statics.findExpired = function() {
  const now = new Date();
  return this.find({
    validUntil: { $lt: now }
  });
};

// Instance method to validate coupon for user
couponSchema.methods.validateForUser = function(userId, orderAmount = 0) {
  const now = new Date();
  
  // Check if coupon is active and valid
  if (!this.isActive) {
    throw new Error('Coupon is not active');
  }
  
  if (now < this.validFrom || now > this.validUntil) {
    throw new Error('Coupon is not valid at this time');
  }
  
  // Check usage limit
  if (this.usageLimit && this.usedCount >= this.usageLimit) {
    throw new Error('Coupon usage limit exceeded');
  }
  
  // Check minimum order amount
  if (orderAmount < this.minimumOrderAmount) {
    throw new Error(`Minimum order amount of ₹${this.minimumOrderAmount} required`);
  }
  
  // Check per user limit
  const userUsageCount = this.usageHistory.filter(
    usage => usage.user.toString() === userId.toString()
  ).length;
  
  if (userUsageCount >= this.perUserLimit) {
    throw new Error('Coupon usage limit for this user exceeded');
  }
  
  return true;
};

// Instance method to calculate discount
couponSchema.methods.calculateDiscount = function(orderAmount) {
  let discount = 0;
  
  switch (this.type) {
    case 'percentage':
      discount = (orderAmount * this.value) / 100;
      break;
    case 'fixed':
      discount = this.value;
      break;
    case 'free_shipping':
      // This would be handled separately in shipping calculation
      discount = 0;
      break;
    default:
      discount = 0;
  }
  
  // Apply maximum discount limit
  if (this.maximumDiscount && discount > this.maximumDiscount) {
    discount = this.maximumDiscount;
  }
  
  // Ensure discount doesn't exceed order amount
  if (discount > orderAmount) {
    discount = orderAmount;
  }
  
  return Math.round(discount * 100) / 100; // Round to 2 decimal places
};

// Instance method to use coupon
couponSchema.methods.useCoupon = function(userId, orderId, discountAmount) {
  this.usedCount += 1;
  this.usageHistory.push({
    user: userId,
    order: orderId,
    discountAmount,
    usedAt: new Date()
  });
  
  return this.save();
};

// Instance method to deactivate coupon
couponSchema.methods.deactivate = function() {
  this.isActive = false;
  return this.save();
};

// Instance method to activate coupon
couponSchema.methods.activate = function() {
  this.isActive = true;
  return this.save();
};

// Instance method to extend validity
couponSchema.methods.extendValidity = function(newValidUntil) {
  if (newValidUntil <= this.validFrom) {
    throw new Error('New valid until date must be after valid from date');
  }
  
  this.validUntil = newValidUntil;
  return this.save();
};

export default mongoose.model('Coupon', couponSchema); 