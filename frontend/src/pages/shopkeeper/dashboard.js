import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Box,
  List,
  ShoppingCart,
  Users,
  BarChart2,
  Settings,
  LogOut,
  Plus
} from 'lucide-react';

const ShopkeeperDashboard = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    if (!user || user.role !== 'shopkeeper') {
      router.push('/login');
      return;
    }
    // TODO: Fetch dashboard stats from API
    fetchDashboardStats();
  }, [user, router]);

  const fetchDashboardStats = async () => {
    try {
      // TODO: Replace with actual API calls
      setStats({
        totalProducts: 25,
        totalOrders: 150,
        totalCustomers: 89,
        totalRevenue: 45000
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };



  if (!user || user.role !== 'shopkeeper') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Box className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <Users className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalCustomers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <BarChart2 className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">₹{stats.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/shopkeeper/products/add" legacyBehavior>
                <a className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors">
                  <Plus className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="font-medium">Add Product</span>
                </a>
              </Link>
              
              <Link href="/shopkeeper/categories/add" legacyBehavior>
                <a className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-green-300 transition-colors">
                  <Plus className="h-5 w-5 text-green-600 mr-3" />
                  <span className="font-medium">Add Category</span>
                </a>
              </Link>
              
              <Link href="/shopkeeper/orders" legacyBehavior>
                <a className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-purple-300 transition-colors">
                  <ShoppingCart className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="font-medium">View Orders</span>
                </a>
              </Link>
              
              <Link href="/shopkeeper/customers" legacyBehavior>
                <a className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-yellow-300 transition-colors">
                  <Users className="h-5 w-5 text-yellow-600 mr-3" />
                  <span className="font-medium">View Customers</span>
                </a>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Management</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/shopkeeper/products" legacyBehavior>
                <a className="group">
                  <div className="p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">Products</h3>
                        <p className="text-sm text-gray-600 mt-1">Manage your product catalog</p>
                      </div>
                      <Box className="h-8 w-8 text-gray-400 group-hover:text-blue-600" />
                    </div>
                  </div>
                </a>
              </Link>

              <Link href="/shopkeeper/categories" legacyBehavior>
                <a className="group">
                  <div className="p-6 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 group-hover:text-green-600">Categories</h3>
                        <p className="text-sm text-gray-600 mt-1">Organize your products</p>
                      </div>
                      <List className="h-8 w-8 text-gray-400 group-hover:text-green-600" />
                    </div>
                  </div>
                </a>
              </Link>

              <Link href="/shopkeeper/orders" legacyBehavior>
                <a className="group">
                  <div className="p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 group-hover:text-purple-600">Orders</h3>
                        <p className="text-sm text-gray-600 mt-1">Track and manage orders</p>
                      </div>
                      <ShoppingCart className="h-8 w-8 text-gray-400 group-hover:text-purple-600" />
                    </div>
                  </div>
                </a>
              </Link>

              <Link href="/shopkeeper/customers" legacyBehavior>
                <a className="group">
                  <div className="p-6 border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 group-hover:text-yellow-600">Customers</h3>
                        <p className="text-sm text-gray-600 mt-1">View customer information</p>
                      </div>
                      <Users className="h-8 w-8 text-gray-400 group-hover:text-yellow-600" />
                    </div>
                  </div>
                </a>
              </Link>

              <Link href="/shopkeeper/analytics" legacyBehavior>
                <a className="group">
                  <div className="p-6 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600">Analytics</h3>
                        <p className="text-sm text-gray-600 mt-1">View sales and performance</p>
                      </div>
                      <BarChart2 className="h-8 w-8 text-gray-400 group-hover:text-indigo-600" />
                    </div>
                  </div>
                </a>
              </Link>

              <Link href="/shopkeeper/settings" legacyBehavior>
                <a className="group">
                  <div className="p-6 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-600">Settings</h3>
                        <p className="text-sm text-gray-600 mt-1">Manage your account</p>
                      </div>
                      <Settings className="h-8 w-8 text-gray-400 group-hover:text-gray-600" />
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopkeeperDashboard;