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
  ChevronDown
} from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import ProductFilters from '@/components/product/ProductFilters';
import Button from '@/components/ui/Button';
import { SORT_OPTIONS, PRODUCT_CATEGORIES } from '@/utils/constants';

// Mock products data
const mockProducts = [
  {
    id: 1,
    name: 'Fresh Organic Tomatoes',
    price: 45,
    originalPrice: 60,
    images: ['/images/products/tomatoes.jpg'],
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
    images: ['/images/products/bananas.jpg'],
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
    images: ['/images/products/milk.jpg'],
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
    images: ['/images/products/rice.jpg'],
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
    images: ['/images/products/spinach.jpg'],
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
    images: ['/images/products/carrots.jpg'],
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
    name: 'Fresh Apples Red',
    price: 80,
    originalPrice: 100,
    images: ['/images/products/apples.jpg'],
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
    images: ['/images/products/yogurt.jpg'],
    rating: 4.8,
    reviewCount: 92,
    category: 'dairy',
    unit: 'per 200g',
    inStock: true,
    stockQuantity: 22,
    vendor: { id: 3, name: 'Daily Fresh', rating: 4.9 },
    discount: 18,
    tags: ['thick', 'creamy', 'protein-rich']
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
        // For demo purposes, sorting by id (newer products have higher ids)
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
        // Relevance - keep original order
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

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-6">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <span className="hover:text-gray-700 cursor-pointer" onClick={() => router.push('/')}>
                Home
              </span>
              <span>/</span>
              <span className="text-gray-900">Products</span>
              {category && (
                <>
                  <span>/</span>
                  <span className="text-gray-900 capitalize">{category}</span>
                </>
              )}
            </nav>

            {/* Title and Results */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  {category 
                    ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products`
                    : search 
                    ? `Search Results for "${search}"`
                    : 'All Products'
                  }
                </h1>
                <p className="text-gray-600 mt-1">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                </p>
              </div>

              {/* View Toggle */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full justify-between"
                >
                  <span className="flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="ml-2 bg-primary-500 text-white text-xs rounded-full px-2 py-1">
                        {activeFilterCount}
                      </span>
                    )}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </Button>
              </div>

              {/* Filters */}
              <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
                <ProductFilters
                  filters={activeFilters}
                  onFilterChange={handleFilterChange}
                  onClearAll={clearAllFilters}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                {/* Active Filters */}
                {activeFilterCount > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Active filters:</span>
                    {activeFilters.search && (
                      <span className="inline-flex items-center px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-md">
                        "{activeFilters.search}"
                        <button
                          onClick={() => setActiveFilters(prev => ({ ...prev, search: '' }))}
                          className="ml-1 hover:text-primary-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {activeFilters.categories.map(cat => (
                      <span key={cat} className="inline-flex items-center px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-md capitalize">
                        {cat}
                        <button
                          onClick={() => setActiveFilters(prev => ({
                            ...prev,
                            categories: prev.categories.filter(c => c !== cat)
                          }))}
                          className="ml-1 hover:text-primary-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-red-600 hover:text-red-700"
                    >
                      Clear all
                    </Button>
                  </div>
                )}

                {/* Sort Dropdown */}
                <div className="flex items-center space-x-2">
                  <SortAsc className="w-4 h-4 text-gray-500" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {SORT_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Products Grid/List */}
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                </div>
              ) : filteredProducts.length > 0 ? (
                <motion.div
                  layout
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                      : 'space-y-4'
                  }
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ProductCard 
                        product={product} 
                        variant={viewMode === 'list' ? 'list' : 'default'} 
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or search terms to find what you're looking for.
                  </p>
                  <Button onClick={clearAllFilters}>
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}