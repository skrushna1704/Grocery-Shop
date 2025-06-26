import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  Users, 
  ShoppingBag, 
  Package, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  XCircle,
  Eye,
  Crown,
  LogOut,
  Settings,
  BarChart3,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/utils/api';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, logout, isAuthenticated, loading } = useAuth();
  const [pendingShopkeepers, setPendingShopkeepers] = useState([]);
  const [stats, setStats] = useState({});
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingShopkeepers, setLoadingShopkeepers] = useState(true);

  // Check if user is admin
  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== 'admin')) {
      router.replace('/admin/login');
    }
  }, [isAuthenticated, loading, user, router]);

  // Fetch dashboard data
  useEffect(() => {
    if (user?.role === 'admin') {
      fetchDashboardData();
      fetchPendingShopkeepers();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoadingStats(true);
      const response = await api.get('/admin/dashboard');
      if (response.data.success) {
        setStats(response.data.data.stats);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchPendingShopkeepers = async () => {
    try {
      setLoadingShopkeepers(true);
      const response = await api.get('/admin/pending-shopkeepers');
      if (response.data.success) {
        setPendingShopkeepers(response.data.data.shopkeepers);
      }
    } catch (error) {
      console.error('Error fetching pending shopkeepers:', error);
    } finally {
      setLoadingShopkeepers(false);
    }
  };

  const handleApproveShopkeeper = async (shopkeeperId) => {
    try {
      const response = await api.put(`/admin/approve-shopkeeper/${shopkeeperId}`);
      if (response.data.success) {
        // Refresh the list
        fetchPendingShopkeepers();
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error approving shopkeeper:', error);
    }
  };

  const handleRejectShopkeeper = async (shopkeeperId, reason = 'Application rejected') => {
    try {
      const response = await api.put(`/admin/reject-shopkeeper/${shopkeeperId}`, { reason });
      if (response.data.success) {
        // Refresh the list
        fetchPendingShopkeepers();
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error rejecting shopkeeper:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - Jumale Grocery Shop</title>
        <meta name="description" content="Admin dashboard for managing Jumale Grocery Shop." />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Crown className="w-8 h-8 text-purple-600" />
                  <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {loadingStats ? '...' : stats.users?.total || 0}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <ShoppingBag className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {loadingStats ? '...' : stats.products?.total || 0}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Package className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {loadingStats ? '...' : stats.orders?.total || 0}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{loadingStats ? '...' : (stats.revenue?.total || 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Pending Shopkeepers Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Pending Shopkeeper Approvals</h2>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-gray-600">
                    {pendingShopkeepers.length} pending
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6">
              {loadingShopkeepers ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-purple-200 border-t-purple-600"></div>
                </div>
              ) : pendingShopkeepers.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="text-gray-600">No pending shopkeeper approvals</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingShopkeepers.map((shopkeeper) => (
                    <div
                      key={shopkeeper._id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{shopkeeper.name}</h3>
                              <p className="text-sm text-gray-600">{shopkeeper.email}</p>
                              <p className="text-sm text-gray-500">{shopkeeper.phone}</p>
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-gray-600">
                            <span className="font-medium">Registered:</span>{' '}
                            {new Date(shopkeeper.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleApproveShopkeeper(shopkeeper._id)}
                            className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => handleRejectShopkeeper(shopkeeper._id)}
                            className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Reject</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Analytics</h3>
              </div>
              <p className="text-gray-600 mb-4">View detailed analytics and reports</p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                View Analytics
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Settings className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
              </div>
              <p className="text-gray-600 mb-4">Manage system settings and configuration</p>
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                Manage Settings
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
              </div>
              <p className="text-gray-600 mb-4">Monitor system health and performance</p>
              <button className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors">
                Check Health
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
} 