import User from '../models/User.js';
import config from '../config/config.js';

export const createAdminUser = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin', status: 'approved' });
    
    if (existingAdmin) {
      console.log('✅ Admin user already exists');
      return existingAdmin;
    }

    // Create default admin user
    const adminData = {
      name: 'System Admin',
      email: 'admin@jumalekirana.com',
      password: 'Admin@123', // Change this in production
      phone: '1234567890',
      role: 'admin',
      status: 'approved',
      isActive: true,
      isEmailVerified: true,
      approvedAt: new Date(),
      approvedBy: null // Self-approved
    };

    const admin = await User.create(adminData);
    
    console.log('✅ Admin user created successfully');
    console.log('📧 Email: admin@jumalekirana.com');
    console.log('🔑 Password: Admin@123');
    console.log('⚠️  Please change the password after first login!');
    
    return admin;
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    throw error;
  }
};

export default createAdminUser; 