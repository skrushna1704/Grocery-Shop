import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Settings, 
  ShoppingBag,
  Truck,
  Clock,
  Star,
  ChevronRight,
  Calendar,
  TrendingUp,
  Gift,
  Bell
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

// Mock data
const mockOrders = [
  {
    id: 'ORD-2024-001',
    date: '2024-01-20',
    status: 'delivered',
    total: 456.50,
    items: 5,
    estimatedDelivery: '2024-01-21',
    items_detail: [
      { name: 'Fresh Tomatoes', quantity: 2, image: '/images/products/tomatoes.jpg' },
      { name: 'Organic Bananas', quantity: 1, image: '/images/products/bananas.jpg' }
    ]
  },
  {
    id: 'ORD-2024-002',
    date: '2024-01-18',
    status: 'shipped',
    total: 234.75,
    items: 3,
    estimatedDelivery: '2024-01-22',
    items_detail: [
      { name: 'Fresh Milk', quantity: 2, image: '/images/products/milk.jpg' }
    ]
  },
  {
    id: 'ORD-2024-003',
    date: '2024-01-15',
    status: 'processing',
    total: 125.00,
    items: 2,
    estimatedDelivery: '2024-01-23',
    items_detail: [
      { name: 'Basmati Rice', quantity: 1, image: '/images/products/rice.jpg' }
    ]
  }
];

const mockWishlist = [
  {
    id: 1,
    name: 'Premium Apples',
    price: 120,
    originalPrice: 150,
    image: '/images/products/apples.jpg',
    inStock: true
  },
  {
    id: 2,
    name: 'Organic Honey',
    price: 299,
    originalPrice: 350,
    image: '/images/products/honey.jpg',
    inStock: true
  }
];

const mockAddresses = [
  {
    id: 1,
    title: 'Home',
    address: 'Flat 101, Green Heights, Sector 15, Pimpri, Pimpri(Kalgaon) - 411017',
    isDefault: true
  },
  {
    id: 2,
    title: 'Office',
    address: 'Tech Park, Phase 2, Hinjewadi, Pune - 411057',
    isDefault: false
  }
];

export default function UserDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const { itemCount } = useCart();
  const [activeTab, setActiveTab] = useState('overview');
  const [orders] = useState(mockOrders);
  const [wishlist] = useState(mockWishlist);
  const [addresses] = useState(mockAddresses);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/login?redirect=/user/dashboard');
    }
  }, [isAuthenticated, loading, router]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'success';
      case 'shipped': return 'info';
      case 'processing': return 'warning';
      case 'cancelled': return 'error';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return '✓';
      case 'shipped': return '🚚';
      case 'processing': return '⏳';
      case 'cancelled': return '❌';
      default: return '📦';
    }
  };

  const quickStats = {
    totalOrders: orders.length,
    totalSpent: orders.reduce((sum, order) => sum + order.total, 0),
    wishlistItems: wishlist.length,
    savedAddresses: addresses.length
  };

  const recentOrders = orders.slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Head>
        <title>My Dashboard - Jumale Grocery Shop</title>
        <meta name="description" content="Manage your account, orders, and preferences on Jumale Grocery Shop." />
      </Head>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Welcome back, {user?.firstName}!
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage your account and track your orders
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/products">
                  <Button>
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card hover>
                <Card.Body>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">{quickStats.totalOrders}</p>
                      <p className="text-sm text-gray-600">Total Orders</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card hover>
                <Card.Body>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">₹{quickStats.totalSpent.toFixed(0)}</p>
                      <p className="text-sm text-gray-600">Total Spent</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card hover>
                <Card.Body>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <Heart className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">{quickStats.wishlistItems}</p>
                      <p className="text-sm text-gray-600">Wishlist Items</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card hover>
                <Card.Body>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">{quickStats.savedAddresses}</p>
                      <p className="text-sm text-gray-600">Saved Addresses</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Orders */}
              <Card>
                <Card.Header>
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                    <Link href="/user/orders">
                      <Button variant="ghost" size="sm">
                        View All
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </Card.Header>
                <Card.Body padding="none">
                  <div className="space-y-0">
                    {recentOrders.map((order, index) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <span className="text-xl">{getStatusIcon(order.status)}</span>
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{order.id}</h3>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(order.date).toLocaleDateString()}</span>
                                <span>•</span>
                                <span>{order.items} items</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={getStatusColor(order.status)} className="mb-2">
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                            <p className="font-semibold text-gray-900">₹{order.total}</p>
                          </div>
                        </div>
                        
                        {/* Order Items Preview */}
                        <div className="mt-4 flex items-center space-x-2">
                          {order.items_detail.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="w-8 h-8 bg-gray-200 rounded overflow-hidden">
                              <Image
                                src={item.image || '/images/placeholder.jpg'}
                                alt={item.name}
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                          {order.items > 3 && (
                            <span className="text-xs text-gray-500">+{order.items - 3} more</span>
                          )}
                        </div>

                        {order.status === 'shipped' && (
                          <div className="mt-3 flex items-center text-sm text-blue-600">
                            <Truck className="w-4 h-4 mr-1" />
                            <span>Expected delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </Card.Body>
              </Card>

              {/* Quick Actions */}
              <Card>
                <Card.Header>
                  <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                </Card.Header>
                <Card.Body>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link href="/user/orders">
                      <div className="p-4 text-center border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors cursor-pointer">
                        <Package className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                        <span className="text-sm font-medium text-gray-900">My Orders</span>
                      </div>
                    </Link>
                    
                    <Link href="/user/wishlist">
                      <div className="p-4 text-center border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors cursor-pointer">
                        <Heart className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                        <span className="text-sm font-medium text-gray-900">Wishlist</span>
                      </div>
                    </Link>
                    
                    <Link href="/user/addresses">
                      <div className="p-4 text-center border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors cursor-pointer">
                        <MapPin className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                        <span className="text-sm font-medium text-gray-900">Addresses</span>
                      </div>
                    </Link>
                    
                    <Link href="/user/profile">
                      <div className="p-4 text-center border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors cursor-pointer">
                        <Settings className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                        <span className="text-sm font-medium text-gray-900">Settings</span>
                      </div>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile Card */}
              <Card>
                <Card.Body>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-10 h-10 text-primary-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{user?.email}</p>
                    <Link href="/user/profile">
                      <Button variant="outline" size="sm" fullWidth>
                        Edit Profile
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>

              {/* Wishlist Preview */}
              <Card>
                <Card.Header>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Wishlist</h3>
                    <Link href="/user/wishlist">
                      <Button variant="ghost" size="sm">
                        View All
                      </Button>
                    </Link>
                  </div>
                </Card.Header>
                <Card.Body padding="none">
                  <div className="space-y-3 p-6">
                    {wishlist.slice(0, 2).map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                          <Image
                            src={item.image || '/images/placeholder.jpg'}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-semibold text-gray-900">₹{item.price}</span>
                            {item.originalPrice && (
                              <span className="text-xs text-gray-500 line-through">₹{item.originalPrice}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>

              {/* Loyalty Points */}
              <Card>
                <Card.Body>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Gift className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Loyalty Points</h3>
                    <p className="text-2xl font-bold text-primary-600 mb-2">1,250</p>
                    <p className="text-xs text-gray-600 mb-4">
                      Earn 1 point for every ₹10 spent
                    </p>
                    <Button variant="outline" size="sm" fullWidth>
                      Redeem Points
                    </Button>
                  </div>
                </Card.Body>
              </Card>

              {/* Notifications */}
              <Card>
                <Card.Header>
                  <div className="flex items-center space-x-2">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                </Card.Header>
                <Card.Body padding="none">
                  <div className="space-y-3 p-6">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Order Delivered</p>
                        <p className="text-xs text-gray-600">Your order #ORD-2024-001 has been delivered</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Special Offer</p>
                        <p className="text-xs text-gray-600">20% off on organic vegetables this weekend</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}