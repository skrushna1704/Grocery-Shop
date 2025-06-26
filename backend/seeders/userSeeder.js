import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Shopkeeper',
    email: 'shopkeeper@jumalekirana.com',
    password: 'Shop@123',
    phone: '9999999999',
    role: 'shopkeeper',
    isEmailVerified: true,
    addresses: [
      {
        type: 'home',
        addressLine1: '123 Shop Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400001',
        country: 'India',
        isDefault: true
      }
    ]
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    phone: '9876543211',
    role: 'user',
    isEmailVerified: true,
    addresses: [
      {
        type: 'home',
        addressLine1: '456 Main Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400002',
        country: 'India',
        isDefault: true
      }
    ]
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    phone: '9876543212',
    role: 'user',
    isEmailVerified: true,
    addresses: [
      {
        type: 'home',
        addressLine1: '321 Oak Avenue',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400004',
        country: 'India',
        isDefault: true
      }
    ]
  }
];

export const seedUsers = async () => {
  try {
    // Clear existing users
    await User.deleteMany({});

    // Hash passwords and create users
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return {
          ...user,
          password: hashedPassword
        };
      })
    );

    // Insert users
    const createdUsers = await User.insertMany(hashedUsers);

    console.log(`✅ ${createdUsers.length} users seeded successfully`);
    return createdUsers;
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    throw error;
  }
};

export default seedUsers; 