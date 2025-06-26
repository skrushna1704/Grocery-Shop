import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  Package, 
  Plus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Eye,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ShopkeeperLayout from '@/components/common/ShopkeeperLayout';

// Mock products data
const mockProducts = [
  {
    id: 1,
    name: 'Fresh Tomatoes',
    category: 'Vegetables',
    price: 40,
    stock: 25,
    status: 'active',
    image: '/images/products/tomatoes.jpg',
    description: 'Fresh red tomatoes from local farms'
  },
  {
    id: 2,
    name: 'Organic Bananas',
    category: 'Fruits',
    price: 60,
    stock: 5,
    status: 'low_stock',
    image: '/images/products/bananas.jpg',
    description: 'Organic yellow bananas'
  },
  {
    id: 3,
    name: 'Basmati Rice',
    category: 'Grains',
    price: 120,
    stock: 0,
    status: 'out_of_stock',
    image: '/images/products/rice.jpg',
    description: 'Premium quality basmati rice'
  },
  {
    id: 4,
    name: 'Fresh Milk',
    category: 'Dairy',
    price: 55,
    stock: 15,
    status: 'active',
    image: '/images/products/milk.jpg',
    description: 'Fresh cow milk'
  }
];

export default function ShopkeeperProducts() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== 'admin')) {
      router.replace('/login?redirect=/shopkeeper/products');
    }
  }, [isAuthenticated, loading, user, router]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'low_stock': return 'warning';
      case 'out_of_stock': return 'error';
      case 'inactive': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'low_stock': return <AlertCircle className="w-4 h-4" />;
      case 'out_of_stock': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];
  const statuses = ['all', 'active', 'low_stock', 'out_of_stock', 'inactive'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-600 mb-4"></div>
          <p className="text-gray-600">Loading Products...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return (
    <ShopkeeperLayout title="Products">
      <Head>
        <title>Products Management - Jumale Grocery Shop</title>
        <meta name="description" content="Manage your grocery products, inventory, and pricing." />
      </Head>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product inventory</p>
        </div>
        <Button onClick={() => router.push('/shopkeeper/products/add')} className="mt-4 sm:mt-0">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status.replace('_', ' ')}
              </option>
            ))}
          </select>

          {/* Clear Filters */}
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedStatus('all');
            }}
          >
            <Filter className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
        </div>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              {/* Product Image */}
              <div className="relative h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black bg-opacity-20"></div>
                <Badge 
                  variant={getStatusColor(product.status)} 
                  className="absolute top-2 right-2"
                >
                  {getStatusIcon(product.status)}
                  {product.status.replace('_', ' ')}
                </Badge>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-green-600">₹{product.price}</span>
                  <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {product.category}
                  </span>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => router.push(`/shopkeeper/products/${product.id}`)}
                    >
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => router.push(`/shopkeeper/products/${product.id}/edit`)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all' 
              ? 'Try adjusting your filters or search terms.'
              : 'Get started by adding your first product.'
            }
          </p>
          <Button onClick={() => router.push('/shopkeeper/products/add')}>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </motion.div>
      )}

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <p className="text-2xl font-bold text-blue-600">{products.length}</p>
          <p className="text-gray-600">Total Products</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-green-600">
            {products.filter(p => p.status === 'active').length}
          </p>
          <p className="text-gray-600">Active Products</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-orange-600">
            {products.filter(p => p.status === 'low_stock').length}
          </p>
          <p className="text-gray-600">Low Stock</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-red-600">
            {products.filter(p => p.status === 'out_of_stock').length}
          </p>
          <p className="text-gray-600">Out of Stock</p>
        </Card>
      </div>
    </ShopkeeperLayout>
  );
} 