import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@jumalekirana.com',
    password: 'admin123',
    phone: '9876543210',
    role: 'admin',
    isEmailVerified: true,
    isActive: true,
    addresses: [
      {
        type: 'home',
        addressLine1: '123 Admin Street',
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
    isActive: true,
    addresses: [
      {
        type: 'home',
        addressLine1: '456 Main Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400002',
        country: 'India',
        isDefault: true
      },
      {
        type: 'work',
        addressLine1: '789 Office Building',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400003',
        country: 'India',
        isDefault: false
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
    isActive: true,
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
  },
  {
    name: 'Bob Johnson',
    email: 'bob@example.com',
    password: 'password123',
    phone: '9876543213',
    role: 'user',
    isEmailVerified: false,
    isActive: true,
    addresses: [
      {
        type: 'home',
        addressLine1: '654 Pine Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400005',
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