import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  title: {
    type: String,
    required: [true, 'Please provide a review title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  comment: {
    type: String,
    required: [true, 'Please provide a review comment'],
    trim: true,
    maxlength: [1000, 'Comment cannot be more than 1000 characters']
  },
  images: [{
    public_id: String,
    url: String,
    alt: String
  }],
  helpful: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    isHelpful: {
      type: Boolean,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  isApproved: {
    type: Boolean,
    default: true
  },
  isSpam: {
    type: Boolean,
    default: false
  },
  helpfulCount: {
    type: Number,
    default: 0
  },
  notHelpfulCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for helpful percentage
reviewSchema.virtual('helpfulPercentage').get(function() {
  const total = this.helpfulCount + this.notHelpfulCount;
  if (total === 0) return 0;
  return Math.round((this.helpfulCount / total) * 100);
});

// Indexes for better query performance
reviewSchema.index({ product: 1, createdAt: -1 });
reviewSchema.index({ user: 1 });
reviewSchema.index({ rating: 1 });
reviewSchema.index({ isApproved: 1 });
reviewSchema.index({ isVerified: 1 });

// Compound index to ensure one review per user per product
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

// Pre-save middleware to update helpful counts
reviewSchema.pre('save', function(next) {
  this.helpfulCount = this.helpful.filter(h => h.isHelpful).length;
  this.notHelpfulCount = this.helpful.filter(h => !h.isHelpful).length;
  next();
});

// Static method to find reviews by product
reviewSchema.statics.findByProduct = function(productId, options = {}) {
  const {
    page = 1,
    limit = 10,
    rating,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = options;

  const query = { 
    product: productId, 
    isApproved: true,
    isSpam: false
  };

  if (rating) {
    query.rating = rating;
  }

  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

  return this.find(query)
    .populate('user', 'name avatar')
    .populate('order', 'orderNumber')
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit);
};

// Static method to find reviews by user
reviewSchema.statics.findByUser = function(userId, options = {}) {
  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = options;

  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

  return this.find({ user: userId })
    .populate('product', 'name mainImage')
    .populate('order', 'orderNumber')
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit);
};

// Instance method to mark as helpful/not helpful
reviewSchema.methods.markHelpful = function(userId, isHelpful) {
  // Remove existing helpful mark from this user
  this.helpful = this.helpful.filter(h => 
    h.user.toString() !== userId.toString()
  );

  // Add new helpful mark
  this.helpful.push({
    user: userId,
    isHelpful
  });

  return this.save();
};

// Instance method to approve review
reviewSchema.methods.approve = function() {
  this.isApproved = true;
  return this.save();
};

// Instance method to reject review
reviewSchema.methods.reject = function() {
  this.isApproved = false;
  return this.save();
};

export default mongoose.model('Review', reviewSchema); 