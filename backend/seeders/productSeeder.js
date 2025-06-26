import Product from '../models/Product.js';
import Category from '../models/Category.js';

const products = [
  // Fruits & Vegetables
  {
    name: 'Fresh Apples',
    description: 'Sweet and juicy red apples, perfect for snacking or cooking',
    shortDescription: 'Fresh red apples',
    price: 120,
    originalPrice: 150,
    discountPercentage: 20,
    brand: 'Fresh Farm',
    stock: 50,
    unit: 'kg',
    weight: { value: 1, unit: 'kg' },
    status: 'active',
    isFeatured: true,
    tags: ['fresh', 'organic', 'healthy'],
    sku: 'APP-001',
    nutritionalInfo: {
      calories: 52,
      protein: 0.3,
      carbohydrates: 14,
      fat: 0.2,
      fiber: 2.4
    }
  },
  {
    name: 'Organic Tomatoes',
    description: 'Fresh organic tomatoes, perfect for salads and cooking',
    shortDescription: 'Organic red tomatoes',
    price: 80,
    brand: 'Organic Valley',
    stock: 30,
    unit: 'kg',
    weight: { value: 1, unit: 'kg' },
    status: 'active',
    tags: ['organic', 'fresh', 'vegetables'],
    sku: 'TOM-001'
  },
  {
    name: 'Bananas',
    description: 'Yellow ripe bananas, rich in potassium and energy',
    shortDescription: 'Fresh yellow bananas',
    price: 60,
    brand: 'Tropical Fresh',
    stock: 40,
    unit: 'dozen',
    weight: { value: 1.2, unit: 'kg' },
    status: 'active',
    tags: ['fresh', 'energy', 'potassium'],
    sku: 'BAN-001'
  },

  // Dairy & Bakery
  {
    name: 'Fresh Milk',
    description: 'Pure cow milk, rich in calcium and protein',
    shortDescription: 'Fresh cow milk',
    price: 60,
    brand: 'Amul',
    stock: 25,
    unit: 'l',
    weight: { value: 1, unit: 'l' },
    status: 'active',
    isFeatured: true,
    tags: ['dairy', 'calcium', 'protein'],
    sku: 'MILK-001'
  },
  {
    name: 'Whole Wheat Bread',
    description: 'Freshly baked whole wheat bread, healthy and nutritious',
    shortDescription: 'Fresh whole wheat bread',
    price: 35,
    brand: 'Britannia',
    stock: 20,
    unit: 'pack',
    weight: { value: 400, unit: 'g' },
    status: 'active',
    tags: ['bread', 'wheat', 'healthy'],
    sku: 'BREAD-001'
  },
  {
    name: 'Cheddar Cheese',
    description: 'Aged cheddar cheese, perfect for sandwiches and cooking',
    shortDescription: 'Aged cheddar cheese',
    price: 180,
    brand: 'Amul',
    stock: 15,
    unit: 'pack',
    weight: { value: 200, unit: 'g' },
    status: 'active',
    tags: ['cheese', 'dairy', 'protein'],
    sku: 'CHEESE-001'
  },

  // Beverages
  {
    name: 'Orange Juice',
    description: '100% pure orange juice, no added sugar',
    shortDescription: 'Pure orange juice',
    price: 120,
    brand: 'Tropicana',
    stock: 30,
    unit: 'l',
    weight: { value: 1, unit: 'l' },
    status: 'active',
    tags: ['juice', 'vitamin-c', 'natural'],
    sku: 'JUICE-001'
  },
  {
    name: 'Green Tea',
    description: 'Organic green tea bags, rich in antioxidants',
    shortDescription: 'Organic green tea',
    price: 150,
    brand: 'Lipton',
    stock: 50,
    unit: 'pack',
    weight: { value: 100, unit: 'g' },
    status: 'active',
    tags: ['tea', 'organic', 'antioxidants'],
    sku: 'TEA-001'
  },

  // Snacks & Munchies
  {
    name: 'Potato Chips',
    description: 'Crispy potato chips, classic salted flavor',
    shortDescription: 'Crispy potato chips',
    price: 20,
    brand: 'Lay\'s',
    stock: 100,
    unit: 'pack',
    weight: { value: 30, unit: 'g' },
    status: 'active',
    tags: ['chips', 'snacks', 'crispy'],
    sku: 'CHIPS-001'
  },
  {
    name: 'Mixed Nuts',
    description: 'Premium mixed nuts including almonds, cashews, and walnuts',
    shortDescription: 'Premium mixed nuts',
    price: 250,
    brand: 'Happilo',
    stock: 25,
    unit: 'pack',
    weight: { value: 200, unit: 'g' },
    status: 'active',
    isFeatured: true,
    tags: ['nuts', 'healthy', 'protein'],
    sku: 'NUTS-001'
  },

  // Staples
  {
    name: 'Basmati Rice',
    description: 'Premium long grain basmati rice, perfect for biryanis',
    shortDescription: 'Premium basmati rice',
    price: 120,
    brand: 'India Gate',
    stock: 40,
    unit: 'kg',
    weight: { value: 1, unit: 'kg' },
    status: 'active',
    tags: ['rice', 'basmati', 'staple'],
    sku: 'RICE-001'
  },
  {
    name: 'Whole Wheat Flour',
    description: 'Freshly ground whole wheat flour, perfect for rotis',
    shortDescription: 'Whole wheat flour',
    price: 45,
    brand: 'Aashirvaad',
    stock: 35,
    unit: 'kg',
    weight: { value: 1, unit: 'kg' },
    status: 'active',
    tags: ['flour', 'wheat', 'staple'],
    sku: 'FLOUR-001'
  },

  // Personal Care
  {
    name: 'Toothpaste',
    description: 'Fresh mint toothpaste with fluoride protection',
    shortDescription: 'Fresh mint toothpaste',
    price: 85,
    brand: 'Colgate',
    stock: 60,
    unit: 'pcs',
    weight: { value: 100, unit: 'g' },
    status: 'active',
    tags: ['toothpaste', 'oral-care', 'fresh'],
    sku: 'TOOTH-001'
  },
  {
    name: 'Shampoo',
    description: 'Gentle hair care shampoo for all hair types',
    shortDescription: 'Gentle hair care shampoo',
    price: 180,
    brand: 'Head & Shoulders',
    stock: 30,
    unit: 'pcs',
    weight: { value: 200, unit: 'ml' },
    status: 'active',
    tags: ['shampoo', 'hair-care', 'gentle'],
    sku: 'SHAMPOO-001'
  }
];

export const seedProducts = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});

    // Get categories for reference
    const categories = await Category.find({});
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.name] = cat._id;
    });

    // Add category references to products
    const productsWithCategories = products.map(product => {
      let categoryId;
      
      // Assign category based on product name/description
      if (product.name.toLowerCase().includes('apple') || 
          product.name.toLowerCase().includes('tomato') || 
          product.name.toLowerCase().includes('banana')) {
        categoryId = categoryMap['Fruits & Vegetables'];
      } else if (product.name.toLowerCase().includes('milk') || 
                 product.name.toLowerCase().includes('bread') || 
                 product.name.toLowerCase().includes('cheese')) {
        categoryId = categoryMap['Dairy & Bakery'];
      } else if (product.name.toLowerCase().includes('juice') || 
                 product.name.toLowerCase().includes('tea')) {
        categoryId = categoryMap['Beverages'];
      } else if (product.name.toLowerCase().includes('chips') || 
                 product.name.toLowerCase().includes('nuts')) {
        categoryId = categoryMap['Snacks & Munchies'];
      } else if (product.name.toLowerCase().includes('rice') || 
                 product.name.toLowerCase().includes('flour')) {
        categoryId = categoryMap['Staples'];
      } else if (product.name.toLowerCase().includes('toothpaste') || 
                 product.name.toLowerCase().includes('shampoo')) {
        categoryId = categoryMap['Personal Care'];
      } else {
        categoryId = categoryMap['Fruits & Vegetables']; // Default
      }

      return {
        ...product,
        category: categoryId,
        createdBy: null // Will be set when admin creates products
      };
    });

    // Insert products
    const createdProducts = await Product.insertMany(productsWithCategories);

    console.log(`✅ ${createdProducts.length} products seeded successfully`);
    return createdProducts;
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    throw error;
  }
};

export default seedProducts; 