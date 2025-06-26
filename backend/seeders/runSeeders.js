import { createAdminUser } from './adminSeeder.js';
import { seedCategories } from './categorySeeder.js';
import { seedProducts } from './productSeeder.js';
import { seedUsers } from './userSeeder.js';

const runAllSeeders = async () => {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Create admin user first
    console.log('👑 Creating admin user...');
    await createAdminUser();
    console.log('');

    // Create default categories
    console.log('📂 Creating default categories...');
    await seedCategories();
    console.log('');

    // Create sample products
    console.log('🛍️ Creating sample products...');
    await seedProducts();
    console.log('');

    // Create sample users
    console.log('👥 Creating sample users...');
    await seedUsers();
    console.log('');

    console.log('✅ All seeders completed successfully!');
    console.log('\n📋 Summary:');
    console.log('   • Admin user created');
    console.log('   • Default categories created');
    console.log('   • Sample products created');
    console.log('   • Sample users created');
    console.log('\n🚀 Your database is ready!');

  } catch (error) {
    console.error('❌ Error running seeders:', error);
    process.exit(1);
  }
};

// Run seeders if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllSeeders();
}

export default runAllSeeders; 