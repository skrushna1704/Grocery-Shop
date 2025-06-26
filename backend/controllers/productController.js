import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { successResponse, errorResponse, generatePagination, generateSKU, calculateDiscountPrice } from '../utils/helpers.js';
import { uploadImage, uploadMultipleImages, deleteImage, deleteMultipleImages } from '../utils/cloudinaryService.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const category = req.query.category || '';
    const minPrice = req.query.minPrice || '';
    const maxPrice = req.query.maxPrice || '';
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder || 'desc';
    const status = req.query.status || 'active';

    // Build query
    const query = { status };
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Get total count
    const total = await Product.countDocuments(query);

    // Get pagination info
    const pagination = generatePagination(page, limit, total);

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Get products
    const products = await Product.find(query)
      .populate('category', 'name')
      .populate('subcategory', 'name')
      .sort(sort)
      .skip(pagination.skip)
      .limit(pagination.pageSize);

    res.json(successResponse('Products retrieved successfully', { products }, pagination));
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name')
      .populate('subcategory', 'name')
      .populate('reviews.user', 'name avatar');

    if (!product) {
      return res.status(404).json(errorResponse('Product not found'));
    }

    res.json(successResponse('Product retrieved successfully', { product }));
  } catch (error) {
    next(error);
  }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res, next) => {
  try {
    const productData = req.body;
    
    // Generate SKU
    const category = await Category.findById(productData.category);
    if (!category) {
      return res.status(400).json(errorResponse('Category not found'));
    }
    
    const sku = generateSKU(category.code || 'CAT', Date.now());
    productData.sku = sku;
    productData.createdBy = req.user.id;

    // Calculate discount price if discount percentage is provided
    if (productData.discountPercentage && productData.price) {
      productData.originalPrice = productData.price;
      productData.price = calculateDiscountPrice(productData.price, productData.discountPercentage);
    }

    const product = await Product.create(productData);

    const populatedProduct = await Product.findById(product._id)
      .populate('category', 'name')
      .populate('subcategory', 'name');

    res.status(201).json(successResponse('Product created successfully', { product: populatedProduct }));
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json(errorResponse('Product not found'));
    }

    const updateData = req.body;

    // Calculate discount price if discount percentage is provided
    if (updateData.discountPercentage !== undefined && updateData.price) {
      updateData.originalPrice = updateData.price;
      updateData.price = calculateDiscountPrice(updateData.price, updateData.discountPercentage);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate('category', 'name')
      .populate('subcategory', 'name');

    res.json(successResponse('Product updated successfully', { product: updatedProduct }));
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json(errorResponse('Product not found'));
    }

    // Delete images from Cloudinary
    const imageIds = [];
    if (product.mainImage && product.mainImage.public_id) {
      imageIds.push(product.mainImage.public_id);
    }
    if (product.images && product.images.length > 0) {
      product.images.forEach(img => {
        if (img.public_id) imageIds.push(img.public_id);
      });
    }

    if (imageIds.length > 0) {
      try {
        await deleteMultipleImages(imageIds);
      } catch (error) {
        console.error('Error deleting images:', error);
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json(successResponse('Product deleted successfully'));
  } catch (error) {
    next(error);
  }
};

// @desc    Upload product images
// @route   POST /api/products/:id/images
// @access  Private/Admin
export const uploadProductImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json(errorResponse('Please upload at least one image'));
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json(errorResponse('Product not found'));
    }

    // Upload images to Cloudinary
    const uploadedImages = await uploadMultipleImages(req.files, 'products');

    // Add images to product
    const newImages = uploadedImages.map(img => ({
      public_id: img.public_id,
      url: img.url,
      alt: product.name
    }));

    product.images.push(...newImages);

    // Set main image if not already set
    if (!product.mainImage) {
      product.mainImage = newImages[0];
    }

    await product.save();

    res.json(successResponse('Images uploaded successfully', { product }));
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product image
// @route   DELETE /api/products/:id/images/:imageId
// @access  Private/Admin
export const deleteProductImage = async (req, res, next) => {
  try {
    const { imageId } = req.params;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json(errorResponse('Product not found'));
    }

    // Find image index
    const imageIndex = product.images.findIndex(img => img._id.toString() === imageId);
    if (imageIndex === -1) {
      return res.status(404).json(errorResponse('Image not found'));
    }

    const image = product.images[imageIndex];

    // Delete from Cloudinary
    if (image.public_id) {
      try {
        await deleteImage(image.public_id);
      } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
      }
    }

    // Remove from product
    product.images.splice(imageIndex, 1);

    // Update main image if it was deleted
    if (product.mainImage && product.mainImage._id.toString() === imageId) {
      product.mainImage = product.images.length > 0 ? product.images[0] : null;
    }

    await product.save();

    res.json(successResponse('Image deleted successfully', { product }));
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 8;

    const products = await Product.find({ 
      isFeatured: true, 
      status: 'active' 
    })
      .populate('category', 'name')
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json(successResponse('Featured products retrieved successfully', { products }));
  } catch (error) {
    next(error);
  }
};

// @desc    Get best sellers
// @route   GET /api/products/best-sellers
// @access  Public
export const getBestSellers = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 8;

    const products = await Product.find({ 
      isBestSeller: true, 
      status: 'active' 
    })
      .populate('category', 'name')
      .limit(limit)
      .sort({ 'ratings.average': -1 });

    res.json(successResponse('Best sellers retrieved successfully', { products }));
  } catch (error) {
    next(error);
  }
};

// @desc    Get new arrivals
// @route   GET /api/products/new-arrivals
// @access  Public
export const getNewArrivals = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 8;
    const days = parseInt(req.query.days) || 30;

    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - days);

    const products = await Product.find({ 
      isNewArrival: true, 
      status: 'active',
      createdAt: { $gte: dateThreshold }
    })
      .populate('category', 'name')
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json(successResponse('New arrivals retrieved successfully', { products }));
  } catch (error) {
    next(error);
  }
};

// @desc    Add product review
// @route   POST /api/products/:id/reviews
// @access  Private
export const addProductReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json(errorResponse('Product not found'));
    }

    // Check if user already reviewed this product
    const existingReview = product.reviews.find(
      review => review.user.toString() === req.user.id
    );

    if (existingReview) {
      return res.status(400).json(errorResponse('You have already reviewed this product'));
    }

    // Add review
    product.reviews.push({
      user: req.user.id,
      rating,
      comment
    });

    // Update average rating
    const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
    product.ratings.average = totalRating / product.reviews.length;
    product.ratings.count = product.reviews.length;

    await product.save();

    const updatedProduct = await Product.findById(req.params.id)
      .populate('category', 'name')
      .populate('reviews.user', 'name avatar');

    res.status(201).json(successResponse('Review added successfully', { product: updatedProduct }));
  } catch (error) {
    next(error);
  }
};

// @desc    Get product statistics (Admin only)
// @route   GET /api/products/stats
// @access  Private/Admin
export const getProductStats = async (req, res, next) => {
  try {
    const totalProducts = await Product.countDocuments();
    const activeProducts = await Product.countDocuments({ status: 'active' });
    const outOfStockProducts = await Product.countDocuments({ stock: 0 });
    const featuredProducts = await Product.countDocuments({ isFeatured: true });
    const todayProducts = await Product.countDocuments({
      createdAt: { $gte: new Date().setHours(0, 0, 0, 0) }
    });

    const stats = {
      totalProducts,
      activeProducts,
      outOfStockProducts,
      featuredProducts,
      todayProducts,
      activeRate: totalProducts > 0 ? ((activeProducts / totalProducts) * 100).toFixed(2) : 0
    };

    res.json(successResponse('Product statistics retrieved', { stats }));
  } catch (error) {
    next(error);
  }
}; 