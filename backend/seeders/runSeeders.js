import dotenv from 'dotenv';
dotenv.config();
import connectDB from '../config/database.js';
import { seedCategories } from './categorySeeder.js';
import { seedProducts } from './productSeeder.js';
import { seedUsers } from './userSeeder.js';

const runAllSeeders = async () => {
  console.log('DEBUG: Running all seeders');
  try {
    dotenv.config();
    await connectDB();
    console.log('🌱 Starting database seeding...\n');

    // Create sample users first (including shopkeeper)
    console.log('👥 Creating sample users...');
    const users = await seedUsers();
    console.log('');

    // Create default categories (with shopkeeper as createdBy)
    console.log('📂 Creating default categories...');
    await seedCategories(users);
    console.log('');

    // Create sample products
    console.log('🛍️ Creating sample products...');
    await seedProducts(users);
    console.log('');

    console.log('✅ All seeders completed successfully!');
    console.log('\n📋 Summary:');
    console.log('   • Shopkeeper user created');
    console.log('   • Default categories created');
    console.log('   • Sample products created');
    console.log('   • Sample users created');
    console.log('\n🚀 Your database is ready!');

  } catch (error) {
    console.error('❌ Error running seeders:', error);
    process.exit(1);
  }
};

runAllSeeders();

// if (process.argv[1] && import.meta.url.endsWith(process.argv[1])) {
//   runAllSeeders();
// }

export default runAllSeeders; 