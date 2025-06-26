import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package
} from 'lucide-react';

const AnalyticsPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [analytics, setAnalytics] = useState({
    revenue: {
      current: 45000,
      previous: 38000,
      change: 18.4
    },
    orders: {
      current: 150,
      previous: 120,
      change: 25.0
    },
    customers: {
      current: 89,
      previous: 75,
      change: 18.7
    },
    products: {
      current: 25,
      previous: 22,
      change: 13.6
    }
  });
  const [topProducts, setTopProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'shopkeeper') {
      router.push('/login');
      return;
    }
    fetchAnalytics();
  }, [user, router]);

  const fetchAnalytics = async () => {
    try {
      // TODO: Replace with actual API call
      const mockTopProducts = [
        { name: 'Basmati Rice', sales: 45, revenue: 5400 },
        { name: 'Toor Dal', sales: 32, revenue: 5760 },
        { name: 'Sugar', sales: 28, revenue: 1260 },
        { name: 'Cooking Oil', sales: 25, revenue: 3000 },
        { name: 'Wheat Flour', sales: 22, revenue: 770 }
      ];

      const mockRecentOrders = [
        { id: 'ORD001', customer: 'Rahul Sharma', amount: 420, status: 'pending' },
        { id: 'ORD002', customer: 'Priya Patel', amount: 85, status: 'confirmed' },
        { id: 'ORD003', customer: 'Amit Kumar', amount: 225, status: 'preparing' },
        { id: 'ORD004', customer: 'Sneha Desai', amount: 150, status: 'delivered' }
      ];

      setTopProducts(mockTopProducts);
      setRecentOrders(mockRecentOrders);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setLoading(false);
    }
  };

  const getChangeIcon = (change) => {
    if (change > 0) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (change < 0) {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  if (!user || user.role !== 'shopkeeper') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/shopkeeper/dashboard" legacyBehavior>
                <a className="flex items-center text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Dashboard
                </a>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <DollarSign className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">₹{analytics.revenue.current.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  {getChangeIcon(analytics.revenue.change)}
                  <span className={`text-sm font-medium ml-1 ${getChangeColor(analytics.revenue.change)}`}>
                    {analytics.revenue.change > 0 ? '+' : ''}{analytics.revenue.change}%
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-semibold text-gray-900">{analytics.orders.current}</p>
                <div className="flex items-center mt-1">
                  {getChangeIcon(analytics.orders.change)}
                  <span className={`text-sm font-medium ml-1 ${getChangeColor(analytics.orders.change)}`}>
                    {analytics.orders.change > 0 ? '+' : ''}{analytics.orders.change}%
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <Users className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-semibold text-gray-900">{analytics.customers.current}</p>
                <div className="flex items-center mt-1">
                  {getChangeIcon(analytics.customers.change)}
                  <span className={`text-sm font-medium ml-1 ${getChangeColor(analytics.customers.change)}`}>
                    {analytics.customers.change > 0 ? '+' : ''}{analytics.customers.change}%
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <Package className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-semibold text-gray-900">{analytics.products.current}</p>
                <div className="flex items-center mt-1">
                  {getChangeIcon(analytics.products.change)}
                  <span className={`text-sm font-medium ml-1 ${getChangeColor(analytics.products.change)}`}>
                    {analytics.products.change > 0 ? '+' : ''}{analytics.products.change}%
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Products */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Top Selling Products</h2>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-indigo-600 font-medium text-sm">{index + 1}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.sales} units sold</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">₹{product.revenue.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{order.id}</p>
                        <p className="text-xs text-gray-500">{order.customer}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">₹{order.amount}</p>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'preparing' ? 'bg-orange-100 text-orange-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Analytics */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Performance Overview</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">₹{Math.round(analytics.revenue.current / analytics.orders.current)}</p>
                <p className="text-sm text-gray-600">Average Order Value</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{Math.round(analytics.orders.current / analytics.customers.current)}</p>
                <p className="text-sm text-gray-600">Orders per Customer</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">₹{Math.round(analytics.revenue.current / analytics.customers.current)}</p>
                <p className="text-sm text-gray-600">Revenue per Customer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage; 