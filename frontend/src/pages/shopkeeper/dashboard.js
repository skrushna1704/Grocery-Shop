import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Users, 
  Package, 
  TrendingUp, 
  DollarSign,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus,
  Settings,
  BarChart3,
  FileText,
  Truck
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ShopkeeperLayout from '@/components/common/ShopkeeperLayout';

// Mock data for shopkeeper dashboard
const mockStats = {
  totalSales: 125000,
  totalOrders: 156,
  totalProducts: 89,
  totalCustomers: 234,
  pendingOrders: 12,
  lowStockItems: 8,
  todaySales: 8500,
  monthlyGrowth: 15.5
};

const mockRecentOrders = [
  {
    id: 'ORD-2024-001',
    customer: 'Rahul Sharma',
    amount: 1250,
    status: 'pending',
    items: 5,
    date: '2024-01-20 14:30'
  },
  {
    id: 'ORD-2024-002',
    customer: 'Priya Patel',
    amount: 890,
    status: 'confirmed',
    items: 3,
    date: '2024-01-20 13:15'
  },
  {
    id: 'ORD-2024-003',
    customer: 'Amit Kumar',
    amount: 2100,
    status: 'processing',
    items: 8,
    date: '2024-01-20 12:45'
  }
];

const mockLowStockItems = [
  { name: 'Fresh Tomatoes', currentStock: 5, minStock: 10 },
  { name: 'Organic Bananas', currentStock: 3, minStock: 8 },
  { name: 'Basmati Rice', currentStock: 2, minStock: 5 },
  { name: 'Fresh Milk', currentStock: 4, minStock: 12 }
];

export default function ShopkeeperDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== 'admin')) {
      router.replace('/login?redirect=/shopkeeper/dashboard');
    }
  }, [isAuthenticated, loading, user, router]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'confirmed': return 'info';
      case 'processing': return 'primary';
      case 'delivered': return 'success';
      case 'cancelled': return 'error';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'processing': return <Package className="w-4 h-4" />;
      case 'delivered': return <Truck className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-600 mb-4"></div>
          <p className="text-gray-600">Loading Shopkeeper Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return (
    <ShopkeeperLayout title="Dashboard">
      <Head>
        <title>Shopkeeper Dashboard - Jumale Grocery Shop</title>
        <meta name="description" content="Manage your grocery shop operations, orders, and inventory." />
      </Head>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Sales</p>
                <p className="text-2xl font-bold">₹{mockStats.totalSales.toLocaleString()}</p>
                <p className="text-blue-100 text-sm">+{mockStats.monthlyGrowth}% this month</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-200" />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Total Orders</p>
                <p className="text-2xl font-bold">{mockStats.totalOrders}</p>
                <p className="text-green-100 text-sm">{mockStats.pendingOrders} pending</p>
              </div>
              <ShoppingBag className="w-8 h-8 text-green-200" />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Products</p>
                <p className="text-2xl font-bold">{mockStats.totalProducts}</p>
                <p className="text-purple-100 text-sm">{mockStats.lowStockItems} low stock</p>
              </div>
              <Package className="w-8 h-8 text-purple-200" />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Customers</p>
                <p className="text-2xl font-bold">{mockStats.totalCustomers}</p>
                <p className="text-orange-100 text-sm">Active customers</p>
              </div>
              <Users className="w-8 h-8 text-orange-200" />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => router.push('/shopkeeper/products')}
              >
                <Package className="w-4 h-4 mr-2" />
                Manage Products
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => router.push('/shopkeeper/orders')}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                View Orders
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => router.push('/shopkeeper/customers')}
              >
                <Users className="w-4 h-4 mr-2" />
                Customer List
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => router.push('/shopkeeper/analytics')}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
            <div className="space-y-3">
              {mockRecentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{order.customer}</p>
                    <p className="text-sm text-gray-600">{order.id} • {order.items} items</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">₹{order.amount}</p>
                    <Badge variant={getStatusColor(order.status)} className="text-xs">
                      {getStatusIcon(order.status)}
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="link" 
              className="w-full mt-3"
              onClick={() => router.push('/shopkeeper/orders')}
            >
              View All Orders
            </Button>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Low Stock Alert</h3>
            <div className="space-y-3">
              {mockLowStockItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-red-600">
                      {item.currentStock} left (min: {item.minStock})
                    </p>
                  </div>
                  <Button size="sm" variant="outline" className="text-red-600 border-red-300">
                    Restock
                  </Button>
                </div>
              ))}
            </div>
            <Button 
              variant="link" 
              className="w-full mt-3"
              onClick={() => router.push('/shopkeeper/inventory')}
            >
              View Inventory
            </Button>
          </Card>
        </motion.div>
      </div>

      {/* Today&apos;s Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Today&apos;s Summary</h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">₹{mockStats.todaySales.toLocaleString()}</p>
              <p className="text-gray-600">Today&apos;s Sales</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">8</p>
              <p className="text-gray-600">Orders Today</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">12</p>
              <p className="text-gray-600">New Customers</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </ShopkeeperLayout>
  );
} 