import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import {
  TrendingUp,
  TrendingDown,
  Package,
  ShoppingCart,
  Users,
  IndianRupee,
  Plus,
  Eye,
  Clock,
  Star,
  AlertTriangle,
  CheckCircle,
  Activity,
  Calendar,
  Filter,
  Download
} from 'lucide-react';
import ShopkeeperLayout from '@/components/shopkeeper/Layout/ShopkeeperLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

// Mock data for dashboard
const mockStats = {
  totalProducts: 156,
  totalOrders: 342,
  totalCustomers: 189,
  totalRevenue: 125600,
  monthlyGrowth: {
    products: 12,
    orders: 18,
    customers: 24,
    revenue: 15
  }
};

const mockRecentOrders = [
  {
    id: 'ORD-001',
    customer: 'Priya Sharma',
    items: 3,
    total: 450,
    status: 'pending',
    timestamp: '2 hours ago'
  },
  {
    id: 'ORD-002',
    customer: 'Rahul Patil',
    items: 2,
    total: 280,
    status: 'completed',
    timestamp: '4 hours ago'
  },
  {
    id: 'ORD-003',
    customer: 'Anita Desai',
    items: 5,
    total: 720,
    status: 'processing',
    timestamp: '6 hours ago'
  },
  {
    id: 'ORD-004',
    customer: 'Suresh Kumar',
    items: 1,
    total: 150,
    status: 'pending',
    timestamp: '8 hours ago'
  }
];

const mockTopProducts = [
  { name: 'Fresh Organic Tomatoes', sales: 45, revenue: 2025, growth: 12 },
  { name: 'Basmati Rice Premium', sales: 38, revenue: 4560, growth: 8 },
  { name: 'Fresh Whole Milk', sales: 52, revenue: 1456, growth: 15 },
  { name: 'Organic Bananas', sales: 34, revenue: 1190, growth: -3 }
];

const mockAlerts = [
  { type: 'warning', message: '5 products are low in stock', action: 'View Products' },
  { type: 'info', message: '12 new orders need attention', action: 'View Orders' },
  { type: 'success', message: 'Monthly target achieved!', action: 'View Analytics' }
];

export default function ShopkeeperDashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState(mockStats);
  const [recentOrders, setRecentOrders] = useState(mockRecentOrders);
  const [topProducts, setTopProducts] = useState(mockTopProducts);
  const [alerts, setAlerts] = useState(mockAlerts);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    if (!loading && (!isAuthenticated || (user && user.role !== 'shopkeeper'))) {
      router.push('/auth/login');
    }
  }, [user, isAuthenticated, loading, router]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'info':
        return <Activity className="h-5 w-5 text-blue-600" />;
      default:
        return <Activity className="h-5 w-5 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!isAuthenticated || (user && user.role !== 'shopkeeper')) {
    return null;
  }

  return (
    <ShopkeeperLayout>
      <Head>
        <title>Shopkeeper Dashboard - Jumale Grocery Shop</title>
        <meta name="description" content="Manage your store, products, orders and customers" />
      </Head>

      {/* Header */}
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-bold leading-7 text-gray-900 sm:truncate sm:text-4xl">
            Welcome back, {user?.firstName || 'Shopkeeper'}! 👋
          </h1>
          <p className="mt-2 text-gray-600">
            Here's what's happening with your store today.
          </p>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0 space-x-3">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="1d">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 3 months</option>
          </select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="mb-8 space-y-3">
          {alerts.map((alert, index) => (
            <div key={index} className={`rounded-lg border p-4 ${
              alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
              alert.type === 'success' ? 'bg-green-50 border-green-200' :
              'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {getAlertIcon(alert.type)}
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    {alert.message}
                  </span>
                </div>
                <Button variant="ghost" size="sm">
                  {alert.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="overflow-hidden">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500">
                  <Package className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Products</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{stats.totalProducts}</div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      stats.monthlyGrowth.products > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stats.monthlyGrowth.products > 0 ? (
                        <TrendingUp className="h-4 w-4 flex-shrink-0 self-center" />
                      ) : (
                        <TrendingDown className="h-4 w-4 flex-shrink-0 self-center" />
                      )}
                      <span className="ml-1">{Math.abs(stats.monthlyGrowth.products)}%</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500">
                  <ShoppingCart className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{stats.totalOrders}</div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      stats.monthlyGrowth.orders > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stats.monthlyGrowth.orders > 0 ? (
                        <TrendingUp className="h-4 w-4 flex-shrink-0 self-center" />
                      ) : (
                        <TrendingDown className="h-4 w-4 flex-shrink-0 self-center" />
                      )}
                      <span className="ml-1">{Math.abs(stats.monthlyGrowth.orders)}%</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Customers</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{stats.totalCustomers}</div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      stats.monthlyGrowth.customers > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stats.monthlyGrowth.customers > 0 ? (
                        <TrendingUp className="h-4 w-4 flex-shrink-0 self-center" />
                      ) : (
                        <TrendingDown className="h-4 w-4 flex-shrink-0 self-center" />
                      )}
                      <span className="ml-1">{Math.abs(stats.monthlyGrowth.customers)}%</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-500">
                  <IndianRupee className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">₹{stats.totalRevenue.toLocaleString()}</div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      stats.monthlyGrowth.revenue > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stats.monthlyGrowth.revenue > 0 ? (
                        <TrendingUp className="h-4 w-4 flex-shrink-0 self-center" />
                      ) : (
                        <TrendingDown className="h-4 w-4 flex-shrink-0 self-center" />
                      )}
                      <span className="ml-1">{Math.abs(stats.monthlyGrowth.revenue)}%</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Card>
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <div key={order.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{order.id}</p>
                        <p className="text-sm text-gray-500">{order.customer}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">₹{order.total}</p>
                        <p className="text-sm text-gray-500">{order.items} items</p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <div className="text-right">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {order.timestamp}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Top Products */}
        <div>
          <Card>
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Top Products</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </p>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-gray-500">{product.sales} sold</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-sm font-medium text-gray-900">₹{product.revenue}</span>
                      </div>
                    </div>
                    <div className={`flex items-center ml-4 ${
                      product.growth > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {product.growth > 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <span className="ml-1 text-sm font-medium">
                        {Math.abs(product.growth)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <Card>
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Button variant="outline" className="h-20 flex-col">
                <Plus className="h-6 w-6 mb-2" />
                Add Product
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <ShoppingCart className="h-6 w-6 mb-2" />
                View Orders
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Users className="h-6 w-6 mb-2" />
                Customers
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Star className="h-6 w-6 mb-2" />
                Reviews
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </ShopkeeperLayout>
  );
}