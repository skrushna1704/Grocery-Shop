import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  Filter, 
  SortAsc, 
  Grid3X3, 
  List, 
  Search,
  X,
  ChevronDown,
  Star,
  ShoppingCart,
  Heart,
  Eye
} from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import ProductFilters from '@/components/product/ProductFilters';
import Button from '@/components/ui/Button';
import { SORT_OPTIONS, PRODUCT_CATEGORIES } from '@/utils/constants';

// Enhanced mock products data with 20 items and proper images
const mockProducts = [
  {
    id: 1,
    name: 'Fresh Organic Tomatoes',
    price: 45,
    originalPrice: 60,
    images: ['https://images.unsplash.com/photo-1546470427-e9e20482e5ad?w=400&h=300&fit=crop'],
    rating: 4.5,
    reviewCount: 128,
    category: 'vegetables',
    unit: 'per kg',
    inStock: true,
    stockQuantity: 50,
    vendor: { id: 1, name: 'Fresh Farm', rating: 4.8 },
    discount: 25,
    tags: ['organic', 'fresh', 'local']
  },
  {
    id: 2,
    name: 'Organic Bananas',
    price: 35,
    originalPrice: 40,
    images: ['https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop'],
    rating: 4.3,
    reviewCount: 89,
    category: 'fruits',
    unit: 'per dozen',
    inStock: true,
    stockQuantity: 30,
    vendor: { id: 2, name: 'Organic Valley', rating: 4.6 },
    discount: 12,
    tags: ['organic', 'ripe', 'sweet']
  },
  {
    id: 3,
    name: 'Fresh Whole Milk',
    price: 28,
    originalPrice: 32,
    images: ['https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop'],
    rating: 4.7,
    reviewCount: 156,
    category: 'dairy',
    unit: 'per liter',
    inStock: true,
    stockQuantity: 25,
    vendor: { id: 3, name: 'Daily Fresh', rating: 4.9 },
    discount: 15,
    tags: ['fresh', 'full-fat', 'pasteurized']
  },
  {
    id: 4,
    name: 'Basmati Rice Premium',
    price: 120,
    originalPrice: 150,
    images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop'],
    rating: 4.6,
    reviewCount: 203,
    category: 'grains',
    unit: 'per kg',
    inStock: true,
    stockQuantity: 40,
    vendor: { id: 4, name: 'Golden Grains', rating: 4.7 },
    discount: 20,
    tags: ['premium', 'aged', 'aromatic']
  },
  {
    id: 5,
    name: 'Fresh Green Spinach',
    price: 25,
    originalPrice: 30,
    images: ['https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop'],
    rating: 4.4,
    reviewCount: 67,
    category: 'vegetables',
    unit: 'per bunch',
    inStock: true,
    stockQuantity: 20,
    vendor: { id: 1, name: 'Fresh Farm', rating: 4.8 },
    discount: 16,
    tags: ['fresh', 'green', 'nutritious']
  },
  {
    id: 6,
    name: 'Organic Carrots',
    price: 40,
    originalPrice: 50,
    images: ['https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400&h=300&fit=crop'],
    rating: 4.6,
    reviewCount: 89,
    category: 'vegetables',
    unit: 'per kg',
    inStock: true,
    stockQuantity: 15,
    vendor: { id: 2, name: 'Organic Valley', rating: 4.6 },
    discount: 20,
    tags: ['organic', 'crunchy', 'sweet']
  },
  {
    id: 7,
    name: 'Fresh Red Apples',
    price: 80,
    originalPrice: 100,
    images: ['https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop'],
    rating: 4.5,
    reviewCount: 134,
    category: 'fruits',
    unit: 'per kg',
    inStock: true,
    stockQuantity: 35,
    vendor: { id: 5, name: 'Fruit Paradise', rating: 4.7 },
    discount: 20,
    tags: ['fresh', 'crispy', 'red']
  },
  {
    id: 8,
    name: 'Greek Yogurt',
    price: 45,
    originalPrice: 55,
    images: ['https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop'],
    rating: 4.8,
    reviewCount: 92,
    category: 'dairy',
    unit: 'per 200g',
    inStock: true,
    stockQuantity: 22,
    vendor: { id: 3, name: 'Daily Fresh', rating: 4.9 },
    discount: 18,
    tags: ['thick', 'creamy', 'protein-rich']
  },
  {
    id: 9,
    name: 'Fresh Broccoli',
    price: 55,
    originalPrice: 70,
    images: ['https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=300&fit=crop'],
    rating: 4.3,
    reviewCount: 76,
    category: 'vegetables',
    unit: 'per piece',
    inStock: true,
    stockQuantity: 18,
    vendor: { id: 1, name: 'Fresh Farm', rating: 4.8 },
    discount: 21,
    tags: ['fresh', 'green', 'healthy']
  },
  {
    id: 10,
    name: 'Orange Juice',
    price: 85,
    originalPrice: 100,
    images: ['https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=300&fit=crop'],
    rating: 4.6,
    reviewCount: 112,
    category: 'beverages',
    unit: 'per liter',
    inStock: true,
    stockQuantity: 28,
    vendor: { id: 6, name: 'Pure Juice Co', rating: 4.5 },
    discount: 15,
    tags: ['fresh', 'vitamin-c', 'natural']
  },
  {
    id: 11,
    name: 'Whole Wheat Bread',
    price: 35,
    originalPrice: 42,
    images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop'],
    rating: 4.4,
    reviewCount: 95,
    category: 'bakery',
    unit: 'per loaf',
    inStock: true,
    stockQuantity: 45,
    vendor: { id: 7, name: 'Baker\'s Choice', rating: 4.6 },
    discount: 16,
    tags: ['whole-wheat', 'soft', 'healthy']
  },
  {
    id: 12,
    name: 'Fresh Strawberries',
    price: 120,
    originalPrice: 150,
    images: ['https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=300&fit=crop'],
    rating: 4.7,
    reviewCount: 143,
    category: 'fruits',
    unit: 'per 250g',
    inStock: true,
    stockQuantity: 12,
    vendor: { id: 5, name: 'Fruit Paradise', rating: 4.7 },
    discount: 20,
    tags: ['fresh', 'sweet', 'seasonal']
  },
  {
    id: 13,
    name: 'Farm Fresh Eggs',
    price: 65,
    originalPrice: 75,
    images: ['https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=300&fit=crop'],
    rating: 4.8,
    reviewCount: 187,
    category: 'dairy',
    unit: 'per dozen',
    inStock: true,
    stockQuantity: 33,
    vendor: { id: 8, name: 'Country Farm', rating: 4.9 },
    discount: 13,
    tags: ['farm-fresh', 'organic', 'protein']
  },
  {
    id: 14,
    name: 'Red Onions',
    price: 30,
    originalPrice: 38,
    images: ['https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop'],
    rating: 4.2,
    reviewCount: 54,
    category: 'vegetables',
    unit: 'per kg',
    inStock: true,
    stockQuantity: 42,
    vendor: { id: 1, name: 'Fresh Farm', rating: 4.8 },
    discount: 21,
    tags: ['fresh', 'sharp', 'cooking']
  },
  {
    id: 15,
    name: 'Green Grapes',
    price: 90,
    originalPrice: 110,
    images: ['https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&h=300&fit=crop'],
    rating: 4.5,
    reviewCount: 98,
    category: 'fruits',
    unit: 'per kg',
    inStock: true,
    stockQuantity: 26,
    vendor: { id: 5, name: 'Fruit Paradise', rating: 4.7 },
    discount: 18,
    tags: ['fresh', 'sweet', 'seedless']
  },
  {
    id: 16,
    name: 'Olive Oil Extra Virgin',
    price: 250,
    originalPrice: 300,
    images: ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop'],
    rating: 4.9,
    reviewCount: 167,
    category: 'oils',
    unit: 'per 500ml',
    inStock: true,
    stockQuantity: 15,
    vendor: { id: 9, name: 'Mediterranean Co', rating: 4.8 },
    discount: 16,
    tags: ['extra-virgin', 'cold-pressed', 'premium']
  },
  {
    id: 17,
    name: 'Fresh Lemons',
    price: 45,
    originalPrice: 55,
    images: ['https://images.unsplash.com/photo-1590502593747-42a996133562?w=400&h=300&fit=crop'],
    rating: 4.4,
    reviewCount: 73,
    category: 'fruits',
    unit: 'per kg',
    inStock: true,
    stockQuantity: 38,
    vendor: { id: 5, name: 'Fruit Paradise', rating: 4.7 },
    discount: 18,
    tags: ['fresh', 'citrus', 'vitamin-c']
  },
  {
    id: 18,
    name: 'Quinoa Seeds',
    price: 180,
    originalPrice: 220,
    images: ['https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=300&fit=crop'],
    rating: 4.6,
    reviewCount: 125,
    category: 'grains',
    unit: 'per 500g',
    inStock: true,
    stockQuantity: 19,
    vendor: { id: 4, name: 'Golden Grains', rating: 4.7 },
    discount: 18,
    tags: ['superfood', 'protein', 'gluten-free']
  },
  {
    id: 19,
    name: 'Fresh Mushrooms',
    price: 75,
    originalPrice: 90,
    images: ['https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?w=400&h=300&fit=crop'],
    rating: 4.3,
    reviewCount: 86,
    category: 'vegetables',
    unit: 'per 250g',
    inStock: true,
    stockQuantity: 21,
    vendor: { id: 10, name: 'Forest Fresh', rating: 4.5 },
    discount: 16,
    tags: ['fresh', 'earthy', 'umami']
  },
  {
    id: 20,
    name: 'Honey Pure',
    price: 150,
    originalPrice: 180,
    images: ['https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop'],
    rating: 4.8,
    reviewCount: 201,
    category: 'sweeteners',
    unit: 'per 500g',
    inStock: true,
    stockQuantity: 27,
    vendor: { id: 11, name: 'Pure Honey Co', rating: 4.9 },
    discount: 16,
    tags: ['pure', 'natural', 'raw']
  }
];

export default function ProductsPage() {
  const router = useRouter();
  const { category, search, sort } = router.query;
  
  const [products, setProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState(sort || 'relevance');
  const [activeFilters, setActiveFilters] = useState({
    categories: category ? [category] : [],
    priceRange: { min: 0, max: 1000 },
    rating: 0,
    inStock: true,
    search: search || ''
  });

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (activeFilters.search) {
      const searchTerm = activeFilters.search.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        product.vendor.name.toLowerCase().includes(searchTerm)
      );
    }

    // Apply category filter
    if (activeFilters.categories.length > 0) {
      filtered = filtered.filter(product =>
        activeFilters.categories.includes(product.category)
      );
    }

    // Apply price range filter
    filtered = filtered.filter(product =>
      product.price >= activeFilters.priceRange.min &&
      product.price <= activeFilters.priceRange.max
    );

    // Apply rating filter
    if (activeFilters.rating > 0) {
      filtered = filtered.filter(product =>
        product.rating >= activeFilters.rating
      );
    }

    // Apply stock filter
    if (activeFilters.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price_low_high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high_low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'popularity':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'discount':
        filtered.sort((a, b) => {
          const aDiscount = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) * 100 : 0;
          const bDiscount = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) * 100 : 0;
          return bDiscount - aDiscount;
        });
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products, activeFilters, sortBy]);

  // Update URL when filters change
  useEffect(() => {
    const query = { ...router.query };
    
    if (activeFilters.search) {
      query.search = activeFilters.search;
    } else {
      delete query.search;
    }
    
    if (activeFilters.categories.length === 1) {
      query.category = activeFilters.categories[0];
    } else {
      delete query.category;
    }
    
    if (sortBy !== 'relevance') {
      query.sort = sortBy;
    } else {
      delete query.sort;
    }

    router.replace({ pathname: router.pathname, query }, undefined, { shallow: true });
  }, [activeFilters, sortBy]);

  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
  };

  const clearAllFilters = () => {
    setActiveFilters({
      categories: [],
      priceRange: { min: 0, max: 1000 },
      rating: 0,
      inStock: true,
      search: ''
    });
    setSortBy('relevance');
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (activeFilters.categories.length > 0) count++;
    if (activeFilters.rating > 0) count++;
    if (activeFilters.priceRange.min > 0 || activeFilters.priceRange.max < 1000) count++;
    if (activeFilters.search) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <>
      <Head>
        <title>
          {category 
            ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products - Jumale Grocery Shop`
            : search 
            ? `Search results for "${search}" - Jumale Grocery Shop`
            : 'All Products - Jumale Grocery Shop'
          }
        </title>
        <meta 
          name="description" 
          content={
            category 
              ? `Shop fresh ${category} online. Quality products, fast delivery in Pimpri(Kalgaon).`
              : 'Browse all fresh grocery products. Vegetables, fruits, dairy, grains and more with fast delivery.'
          } 
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        {/* Enhanced Header */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-2 py-4">
            {/* Breadcrumb
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
              <motion.span 
                className="hover:text-green-600 cursor-pointer transition-colors duration-200" 
                onClick={() => router.push('/')}
                whileHover={{ scale: 1.05 }}
              >
                Home
              </motion.span>
              <span>/</span>
              <span className="text-gray-900 font-medium">Products</span>
              {category && (
                <>
                  <span>/</span>
                  <span className="text-green-600 capitalize font-medium">{category}</span>
                </>
              )}
            </nav> */}

            {/* Enhanced Title and Results */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-green-700 to-blue-600 bg-clip-text text-transparent mb-3">
                  {category 
                    ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products`
                    : search 
                    ? `Search Results for "${search}"`
                    : 'All Products'
                  }
                </h1> */}
                <div className="flex items-center space-x-4">
                  <p className="text-gray-600 text-lg">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                  </p>
                  <div className="hidden sm:flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>In Stock</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>Rated Products</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced View Toggle */}
              <motion.div 
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="text-sm font-medium text-gray-700 hidden sm:block">View:</span>
                <div className="flex items-center bg-gray-100 rounded-xl p-1 shadow-inner">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      viewMode === 'grid' 
                        ? 'bg-white text-green-600 shadow-md' 
                        : 'text-gray-600 hover:bg-white hover:bg-opacity-50'
                    }`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      viewMode === 'list' 
                        ? 'bg-white text-green-600 shadow-md' 
                        : 'text-gray-600 hover:bg-white hover:bg-opacity-50'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Enhanced Filters Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-6">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full justify-between bg-white border-2 border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-300"
                >
                  <span className="flex items-center">
                    <Filter className="w-5 h-5 mr-3 text-green-600" />
                    <span className="font-medium">Filters</span>
                    {activeFilterCount > 0 && (
                      <span className="ml-3 bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs font-bold rounded-full px-3 py-1">
                        {activeFilterCount}
                      </span>
                    )}
                  </span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
                </Button>
              </div>

              {/* Filters */}
              <motion.div 
                className={`lg:block ${showFilters ? 'block' : 'hidden'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <ProductFilters
                    filters={activeFilters}
                    onFilterChange={handleFilterChange}
                    onClearAll={clearAllFilters}
                  />
                </div>
              </motion.div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Enhanced Toolbar */}
              <div className="flex flex-col space-y-4 mb-8">
                {/* Active Filters */}
                {activeFilterCount > 0 && (
                  <motion.div 
                    className="flex flex-wrap items-center gap-3"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-sm font-medium text-gray-700">Active filters:</span>
                    {activeFilters.search && (
                      <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 text-blue-800 text-sm font-medium rounded-full border border-blue-200">
                        "{activeFilters.search}"
                        <button
                          onClick={() => setActiveFilters(prev => ({ ...prev, search: '' }))}
                          className="ml-2 hover:text-blue-900 transition-colors duration-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    )}
                    {activeFilters.categories.map(cat => (
                      <span key={cat} className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 text-green-800 text-sm font-medium rounded-full border border-green-200 capitalize">
                        {cat}
                        <button
                          onClick={() => setActiveFilters(prev => ({
                            ...prev,
                            categories: prev.categories.filter(c => c !== cat)
                          }))}
                          className="ml-2 hover:text-green-900 transition-colors duration-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 font-medium"
                    >
                      Clear all
                    </Button>
                  </motion.div>
                )}

                {/* Sort Dropdown */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <SortAsc className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm min-w-[160px]"
                    >
                      {SORT_OPTIONS?.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      )) || [
                        { value: 'relevance', label: 'Relevance' },
                        { value: 'price_low_high', label: 'Price: Low to High' },
                        { value: 'price_high_low', label: 'Price: High to Low' },
                        { value: 'rating', label: 'Customer Rating' },
                        { value: 'newest', label: 'Newest First' },
                        { value: 'popularity', label: 'Most Popular' },
                        { value: 'discount', label: 'Highest Discount' }
                      ].map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    Showing {filteredProducts.length} of {products.length} products
                  </div>
                </div>
              </div>

              {/* Enhanced Products Grid/List */}
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-600 mb-4"></div>
                    <p className="text-gray-600">Loading products...</p>
                  </div>
                </div>
              ) : filteredProducts.length > 0 ? (
                <motion.div
                  layout
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8'
                      : 'space-y-6'
                  }
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.5 }}
                      whileHover={{ y: -5 }}
                      className="group"
                    >
                      {/* Enhanced Product Card */}
                      <div className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden ${
                        viewMode === 'list' ? 'flex flex-row h-48' : 'flex flex-col h-96'
                      }`}>
                        {/* Image Container */}
                        <div className={`relative overflow-hidden ${
                          viewMode === 'list' ? 'w-48 h-full flex-shrink-0' : 'w-full h-48'
                        }`}>
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          
                          {/* Discount Badge */}
                          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                          </div>
                          
                          {/* Hover Actions */}
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                            <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-50 transition-colors duration-200">
                              <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                            </button>
                            <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-50 transition-colors duration-200">
                              <Eye className="w-5 h-5 text-gray-600 hover:text-blue-500" />
                            </button>
                          </div>
                          
                          {/* Stock Status */}
                          <div className="absolute bottom-3 left-3 bg-white bg-opacity-95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                            <div className="flex items-center space-x-1">
                              <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                              <span className={product.inStock ? 'text-green-700' : 'text-red-700'}>
                                {product.inStock ? `${product.stockQuantity} in stock` : 'Out of stock'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className={`p-6 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full capitalize">
                                {product.category}
                              </span>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                                <span className="text-xs text-gray-500">({product.reviewCount})</span>
                              </div>
                            </div>
                            
                            <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
                              {product.name}
                            </h3>
                            
                            <p className="text-sm text-gray-600 mb-3">{product.unit}</p>
                            
                            <div className="flex items-center space-x-2 mb-4">
                              <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
                              <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
                            </div>
                            
                            <div className="text-xs text-gray-500 mb-4">
                              by <span className="font-medium text-gray-700">{product.vendor.name}</span>
                              <span className="ml-2 inline-flex items-center">
                                <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                                {product.vendor.rating}
                              </span>
                            </div>
                          </div>
                          
                          <Button 
                            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                            disabled={!product.inStock}
                          >
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  className="text-center py-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="bg-white rounded-3xl shadow-lg p-12 max-w-md mx-auto">
                    <Search className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      No products found
                    </h3>
                    <p className="text-gray-600 mb-8 text-lg">
                      Try adjusting your filters or search terms to find what you're looking for.
                    </p>
                    <Button 
                      onClick={clearAllFilters}
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-medium"
                    >
                      Clear all filters
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}