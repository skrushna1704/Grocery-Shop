import { useState, useEffect } from 'react';

/**
 * Custom hook for managing products data
 * @param {Object} options - Configuration options
 * @returns {Object} Products state and methods
 */
export const useProducts = (options = {}) => {
  const {
    category = null,
    search = '',
    sortBy = 'relevance',
    filters = {},
    pageSize = 12,
    autoFetch = true
  } = options;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Mock products for demonstration
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
      vendor: { id: 1, name: 'Fresh Farm', rating: 4.8 }
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
      vendor: { id: 2, name: 'Organic Valley', rating: 4.6 }
    }
    // Add more mock products as needed
  ];

  // Fetch products function
  const fetchProducts = async (page = 1, reset = true) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      let filteredProducts = [...mockProducts];

      // Apply category filter
      if (category) {
        filteredProducts = filteredProducts.filter(product => 
          product.category === category
        );
      }

      // Apply search filter
      if (search) {
        const searchTerm = search.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm)
        );
      }

      // Apply additional filters
      if (filters.priceRange) {
        filteredProducts = filteredProducts.filter(product =>
          product.price >= filters.priceRange.min &&
          product.price <= filters.priceRange.max
        );
      }

      if (filters.rating) {
        filteredProducts = filteredProducts.filter(product =>
          product.rating >= filters.rating
        );
      }

      if (filters.inStock) {
        filteredProducts = filteredProducts.filter(product =>
          product.inStock
        );
      }

      // Apply sorting
      switch (sortBy) {
        case 'price_low_high':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price_high_low':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          filteredProducts.sort((a, b) => b.id - a.id);
          break;
        case 'popularity':
          filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
        default:
          // Keep original order for relevance
          break;
      }

      // Pagination
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

      if (reset) {
        setProducts(paginatedProducts);
      } else {
        setProducts(prev => [...prev, ...paginatedProducts]);
      }

      setTotalCount(filteredProducts.length);
      setCurrentPage(page);
      setHasMore(endIndex < filteredProducts.length);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  // Fetch more products (for infinite scroll)
  const fetchMore = () => {
    if (!loading && hasMore) {
      fetchProducts(currentPage + 1, false);
    }
  };

  // Refresh products
  const refresh = () => {
    setCurrentPage(1);
    fetchProducts(1, true);
  };

  // Auto-fetch on dependency changes
  useEffect(() => {
    if (autoFetch) {
      refresh();
    }
  }, [category, search, sortBy, JSON.stringify(filters), pageSize]);

  // Get product by ID
  const getProductById = (id) => {
    return mockProducts.find(product => product.id === parseInt(id));
  };

  // Search products
  const searchProducts = (query) => {
    return mockProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Get products by category
  const getProductsByCategory = (categoryName) => {
    return mockProducts.filter(product => product.category === categoryName);
  };

  // Get featured products
  const getFeaturedProducts = (limit = 4) => {
    return mockProducts
      .filter(product => product.rating >= 4.5)
      .slice(0, limit);
  };

  // Get related products
  const getRelatedProducts = (productId, limit = 4) => {
    const product = getProductById(productId);
    if (!product) return [];

    return mockProducts
      .filter(p => p.id !== productId && p.category === product.category)
      .slice(0, limit);
  };

  return {
    // State
    products,
    loading,
    error,
    totalCount,
    currentPage,
    hasMore,

    // Methods
    fetchProducts,
    fetchMore,
    refresh,
    getProductById,
    searchProducts,
    getProductsByCategory,
    getFeaturedProducts,
    getRelatedProducts,

    // Pagination helpers
    totalPages: Math.ceil(totalCount / pageSize),
    isEmpty: products.length === 0 && !loading,
    isFirstPage: currentPage === 1,
    isLastPage: !hasMore
  };
};

export default useProducts;