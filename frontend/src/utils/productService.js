import api from './api'

// Product API service
export const productService = {
  // Get all products with filters
  getProducts: async (params = {}) => {
    console.log('🚀 productService.getProducts called with params:', params);
    const response = await api.get('/products', { params })
    console.log('📡 productService.getProducts response:', response.data);
    return response.data
  },

  // Get single product by ID
  getProduct: async (id) => {
    console.log('🚀 productService.getProduct called with id:', id);
    const response = await api.get(`/products/${id}`)
    console.log('📡 productService.getProduct response:', response.data);
    return response.data
  },

  // Get featured products
  getFeaturedProducts: async () => {
    console.log('🚀 productService.getFeaturedProducts called');
    const response = await api.get('/products/featured')
    console.log('📡 productService.getFeaturedProducts response:', response.data);
    return response.data
  },

  // Get best sellers
  getBestSellers: async () => {
    console.log('🚀 productService.getBestSellers called');
    const response = await api.get('/products/best-sellers')
    console.log('📡 productService.getBestSellers response:', response.data);
    return response.data
  },

  // Get new arrivals
  getNewArrivals: async () => {
    console.log('🚀 productService.getNewArrivals called');
    const response = await api.get('/products/new-arrivals')
    console.log('📡 productService.getNewArrivals response:', response.data);
    return response.data
  },

  // Add product review
  addReview: async (productId, reviewData) => {
    console.log('🚀 productService.addReview called with:', { productId, reviewData });
    const response = await api.post(`/products/${productId}/reviews`, reviewData)
    console.log('📡 productService.addReview response:', response.data);
    return response.data
  },

  // Search products
  searchProducts: async (searchTerm, params = {}) => {
    console.log('🚀 productService.searchProducts called with:', { searchTerm, params });
    const response = await api.get('/products', {
      params: { search: searchTerm, ...params }
    })
    console.log('📡 productService.searchProducts response:', response.data);
    return response.data
  }
}

// Helper function to transform backend product data to frontend format
export const transformProductData = (backendProduct) => {
  if (!backendProduct) return null

  console.log('🔄 Transforming product:', backendProduct.name, backendProduct);

  // Handle images properly - backend has mainImage.url and images array
  let imageUrls = []
  if (backendProduct.mainImage?.url) {
    imageUrls.push(backendProduct.mainImage.url)
  }
  if (backendProduct.images && Array.isArray(backendProduct.images)) {
    imageUrls = imageUrls.concat(backendProduct.images.map(img => img.url || img))
  }
  
  // If no images, use a placeholder
  if (imageUrls.length === 0) {
    imageUrls = ['/images/placeholder.jpg']
  }

  console.log('🖼️ Image URLs for', backendProduct.name, ':', imageUrls);

  const transformed = {
    id: backendProduct._id,
    name: backendProduct.name,
    price: backendProduct.price,
    originalPrice: backendProduct.originalPrice || backendProduct.price,
    images: imageUrls,
    rating: backendProduct.ratings?.average || 0,
    reviewCount: backendProduct.ratings?.count || 0,
    category: backendProduct.category?.name || backendProduct.category,
    unit: backendProduct.unit || 'pcs',
    inStock: backendProduct.stock > 0,
    stockQuantity: backendProduct.stock || 0,
    vendor: {
      id: backendProduct.createdBy?._id || backendProduct.createdBy,
      name: backendProduct.createdBy?.name || 'Jumale Kirana',
      rating: 4.5, // Default vendor rating
      location: 'Pimpri(Kalgaon)'
    },
    discount: backendProduct.discountPercentage || 0,
    tags: backendProduct.tags || [],
    description: backendProduct.description,
    shortDescription: backendProduct.shortDescription,
    brand: backendProduct.brand,
    weight: backendProduct.weight,
    dimensions: backendProduct.dimensions,
    nutritionalInfo: backendProduct.nutritionalInfo,
    ingredients: backendProduct.ingredients,
    allergens: backendProduct.allergens,
    expiryDate: backendProduct.expiryDate,
    manufacturingDate: backendProduct.manufacturingDate,
    barcode: backendProduct.barcode,
    sku: backendProduct.sku,
    status: backendProduct.status,
    isFeatured: backendProduct.isFeatured,
    isBestSeller: backendProduct.isBestSeller,
    isNewArrival: backendProduct.isNewArrival,
    reviews: backendProduct.reviews?.map(review => ({
      id: review._id,
      user: {
        name: review.user?.name || 'Anonymous',
        avatar: review.user?.avatar || '/images/avatars/default.jpg'
      },
      rating: review.rating,
      date: review.createdAt,
      title: review.comment?.substring(0, 50) + '...',
      comment: review.comment,
      helpful: 0, // Default helpful count
      verified: review.isVerified
    })) || [],
    variants: backendProduct.variants || [],
    seo: backendProduct.seo
  }

  console.log('✅ Transformed product:', transformed.name, transformed);
  return transformed
}

// Helper function to transform multiple products
export const transformProductsData = (backendProducts) => {
  if (!Array.isArray(backendProducts)) return []
  return backendProducts.map(transformProductData)
} 