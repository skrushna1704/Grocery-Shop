import Category from '../models/Category.js';
import Product from '../models/Product.js';
import { successResponse, errorResponse, generatePagination } from '../utils/helpers.js';
import { uploadImage, deleteImage } from '../utils/cloudinaryService.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const parent = req.query.parent || '';

    // Build query
    const query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (parent === 'null' || parent === '') {
      query.parent = null;
    } else if (parent) {
      query.parent = parent;
    }

    // Get total count
    const total = await Category.countDocuments(query);

    // Get pagination info
    const pagination = generatePagination(page, limit, total);

    // Get categories
    const categories = await Category.find(query)
      .populate('parent', 'name')
      .populate('subcategories', 'name')
      .sort({ name: 1 })
      .skip(pagination.skip)
      .limit(pagination.pageSize);

    res.json(successResponse('Categories retrieved successfully', { categories }, pagination));
  } catch (error) {
    next(error);
  }
};

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
export const getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate('parent', 'name')
      .populate('subcategories', 'name');

    if (!category) {
      return res.status(404).json(errorResponse('Category not found'));
    }

    res.json(successResponse('Category retrieved successfully', { category }));
  } catch (error) {
    next(error);
  }
};

// @desc    Create category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = async (req, res, next) => {
  try {
    const categoryData = req.body;

    // Check if parent category exists
    if (categoryData.parent) {
      const parentCategory = await Category.findById(categoryData.parent);
      if (!parentCategory) {
        return res.status(400).json(errorResponse('Parent category not found'));
      }
    }

    // Check if category with same name already exists
    const existingCategory = await Category.findOne({ 
      name: categoryData.name,
      parent: categoryData.parent || null
    });

    if (existingCategory) {
      return res.status(400).json(errorResponse('Category with this name already exists'));
    }

    const category = await Category.create(categoryData);

    const populatedCategory = await Category.findById(category._id)
      .populate('parent', 'name')
      .populate('subcategories', 'name');

    res.status(201).json(successResponse('Category created successfully', { category: populatedCategory }));
  } catch (error) {
    next(error);
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json(errorResponse('Category not found'));
    }

    const updateData = req.body;

    // Check if parent category exists
    if (updateData.parent) {
      const parentCategory = await Category.findById(updateData.parent);
      if (!parentCategory) {
        return res.status(400).json(errorResponse('Parent category not found'));
      }

      // Prevent circular reference
      if (updateData.parent === req.params.id) {
        return res.status(400).json(errorResponse('Category cannot be its own parent'));
      }
    }

    // Check if category with same name already exists
    if (updateData.name) {
      const existingCategory = await Category.findOne({ 
        name: updateData.name,
        parent: updateData.parent || category.parent,
        _id: { $ne: req.params.id }
      });

      if (existingCategory) {
        return res.status(400).json(errorResponse('Category with this name already exists'));
      }
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate('parent', 'name')
      .populate('subcategories', 'name');

    res.json(successResponse('Category updated successfully', { category: updatedCategory }));
  } catch (error) {
    next(error);
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json(errorResponse('Category not found'));
    }

    // Check if category has children
    const hasChildren = await Category.exists({ parent: req.params.id });
    if (hasChildren) {
      return res.status(400).json(errorResponse('Cannot delete category with subcategories'));
    }

    // Check if category has products
    const hasProducts = await Product.exists({ category: req.params.id });
    if (hasProducts) {
      return res.status(400).json(errorResponse('Cannot delete category with products'));
    }

    // Delete image from Cloudinary if exists
    if (category.image && category.image.public_id) {
      try {
        await deleteImage(category.image.public_id);
      } catch (error) {
        console.error('Error deleting category image:', error);
      }
    }

    await Category.findByIdAndDelete(req.params.id);

    res.json(successResponse('Category deleted successfully'));
  } catch (error) {
    next(error);
  }
};

// @desc    Upload category image
// @route   POST /api/categories/:id/image
// @access  Private/Admin
export const uploadCategoryImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json(errorResponse('Please upload an image'));
    }

    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json(errorResponse('Category not found'));
    }

    // Delete old image from Cloudinary if exists
    if (category.image && category.image.public_id) {
      try {
        await deleteImage(category.image.public_id);
      } catch (error) {
        console.error('Error deleting old category image:', error);
      }
    }

    // Upload new image to Cloudinary
    const result = await uploadImage(req.file, 'categories');

    // Update category image
    category.image = {
      public_id: result.public_id,
      url: result.url
    };
    await category.save();

    const populatedCategory = await Category.findById(category._id)
      .populate('parent', 'name')
      .populate('subcategories', 'name');

    res.json(successResponse('Category image uploaded successfully', { category: populatedCategory }));
  } catch (error) {
    next(error);
  }
};

// @desc    Get category tree
// @route   GET /api/categories/tree
// @access  Public
export const getCategoryTree = async (req, res, next) => {
  try {
    const categories = await Category.find({ parent: null })
      .populate({
        path: 'subcategories',
        populate: {
          path: 'subcategories',
          select: 'name slug'
        }
      })
      .select('name slug description image')
      .sort({ name: 1 });

    res.json(successResponse('Category tree retrieved successfully', { categories }));
  } catch (error) {
    next(error);
  }
};

// @desc    Get category with products
// @route   GET /api/categories/:id/products
// @access  Public
export const getCategoryProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder || 'desc';

    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json(errorResponse('Category not found'));
    }

    // Get all subcategories
    const subcategories = await Category.find({ parent: req.params.id });
    const categoryIds = [req.params.id, ...subcategories.map(cat => cat._id)];

    // Build query
    const query = {
      category: { $in: categoryIds },
      status: 'active'
    };

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

    res.json(successResponse('Category products retrieved successfully', { 
      category,
      products 
    }, pagination));
  } catch (error) {
    next(error);
  }
};

// @desc    Get category statistics (Admin only)
// @route   GET /api/categories/stats
// @access  Private/Admin
export const getCategoryStats = async (req, res, next) => {
  try {
    const totalCategories = await Category.countDocuments();
    const parentCategories = await Category.countDocuments({ parent: null });
    const subCategories = await Category.countDocuments({ parent: { $ne: null } });
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

    const stats = {
      totalCategories,
      parentCategories,
      subCategories,
      categoriesWithProducts: categoriesWithProducts[0]?.count || 0,
      averageSubcategories: parentCategories > 0 ? (subCategories / parentCategories).toFixed(2) : 0
    };

    res.json(successResponse('Category statistics retrieved', { stats }));
  } catch (error) {
    next(error);
  }
}; 