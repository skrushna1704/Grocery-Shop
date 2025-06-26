import Category from '../models/Category.js';

const categories = [
  {
    name: 'Fruits & Vegetables',
    slug: 'fruits-vegetables',
    description: 'Fresh fruits and vegetables',
    code: 'FV',
    isActive: true
  },
  {
    name: 'Dairy & Bakery',
    slug: 'dairy-bakery',
    description: 'Milk, cheese, bread and bakery items',
    code: 'DB',
    isActive: true
  },
  {
    name: 'Beverages',
    slug: 'beverages',
    description: 'Soft drinks, juices, tea, coffee',
    code: 'BV',
    isActive: true
  },
  {
    name: 'Snacks & Munchies',
    slug: 'snacks-munchies',
    description: 'Chips, nuts, chocolates, candies',
    code: 'SM',
    isActive: true
  },
  {
    name: 'Staples',
    slug: 'staples',
    description: 'Rice, wheat, pulses, oil',
    code: 'ST',
    isActive: true
  },
  {
    name: 'Personal Care',
    slug: 'personal-care',
    description: 'Soap, shampoo, toothpaste, cosmetics',
    code: 'PC',
    isActive: true
  },
  {
    name: 'Household',
    slug: 'household',
    description: 'Cleaning supplies, detergents, utensils',
    code: 'HH',
    isActive: true
  },
  {
    name: 'Baby Care',
    slug: 'baby-care',
    description: 'Baby food, diapers, baby care products',
    code: 'BC',
    isActive: true
  },
  {
    name: 'Pet Care',
    slug: 'pet-care',
    description: 'Pet food and care products',
    code: 'PET',
    isActive: true
  },
  {
    name: 'Organic',
    slug: 'organic',
    description: 'Organic fruits, vegetables and products',
    code: 'ORG',
    isActive: true
  }
];

export const seedCategories = async (users = null) => {
  try {
    // Clear existing categories
    await Category.deleteMany({});

    // Get shopkeeper user for createdBy field
    let shopkeeperUser = null;
    if (users) {
      shopkeeperUser = users.find(user => user.role === 'shopkeeper');
    }
    
    // If no shopkeeper found, create a default one or skip createdBy
    if (!shopkeeperUser) {
      console.warn('⚠️ No shopkeeper user found, categories will be created without createdBy field');
    }

    // Add createdBy field to categories if shopkeeper exists
    const categoriesWithCreatedBy = categories.map(category => ({
      ...category,
      createdBy: shopkeeperUser ? shopkeeperUser._id : undefined
    }));

    // Insert categories
    const createdCategories = await Category.insertMany(categoriesWithCreatedBy);

    console.log(`✅ ${createdCategories.length} categories seeded successfully`);
    return createdCategories;
  } catch (error) {
    console.error('❌ Error seeding categories:', error);
    throw error;
  }
};

export default seedCategories; 