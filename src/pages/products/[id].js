import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Star, 
  Heart, 
  Share2, 
  Plus, 
  Minus, 
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Flag
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ProductCard from '@/components/product/ProductCard';

// Mock product data
const mockProduct = {
  id: 1,
  name: 'Fresh Organic Tomatoes',
  price: 45,
  originalPrice: 60,
  images: [
    '/images/products/tomatoes-1.jpg',
    '/images/products/tomatoes-2.jpg',
    '/images/products/tomatoes-3.jpg',
    '/images/products/tomatoes-4.jpg'
  ],
  rating: 4.5,
  reviewCount: 128,
  category: 'vegetables',
  subcategory: 'fresh-vegetables',
  unit: 'per kg',
  inStock: true,
  stockQuantity: 50,
  vendor: { 
    id: 1, 
    name: 'Fresh Farm', 
    rating: 4.8,
    location: 'Pimpri(Kalgaon)',
    established: 2015
  },
  description: 'Premium quality organic tomatoes, freshly harvested from our certified organic farms. These tomatoes are rich in vitamins, minerals, and antioxidants. Perfect for cooking, salads, and sauces.',
  nutritionalInfo: {
    calories: 18,
    protein: 0.9,
    carbs: 3.9,
    fiber: 1.2,
    vitamin_c: 28,
    potassium: 237
  },
  features: [
    'Certified Organic',
    'Pesticide Free',
    'Rich in Lycopene',
    'Freshly Harvested',
    'Farm to Table'
  ],
  tags: ['organic', 'fresh', 'local', 'healthy'],
  shelfLife: '5-7 days',
  storage: 'Store in a cool, dry place',
  origin: 'Maharashtra, India'
};

// Mock reviews
const mockReviews = [
  {
    id: 1,
    user: { name: 'Priya Sharma', avatar: '/images/avatars/user1.jpg' },
    rating: 5,
    date: '2024-01-15',
    title: 'Excellent quality tomatoes!',
    comment: 'Very fresh and tasty tomatoes. Perfect for cooking. Will definitely order again.',
    helpful: 12,
    verified: true
  },
  {
    id: 2,
    user: { name: 'Rajesh Patil', avatar: '/images/avatars/user2.jpg' },
    rating: 4,
    date: '2024-01-10',
    title: 'Good quality but slightly expensive',
    comment: 'Good quality organic tomatoes but a bit pricey compared to market rates. However, the freshness is worth it.',
    helpful: 8,
    verified: true
  },
  {
    id: 3,
    user: { name: 'Anjali Desai', avatar: '/images/avatars/user3.jpg' },
    rating: 5,
    date: '2024-01-08',
    title: 'Best tomatoes I have bought online',
    comment: 'Amazing quality! These tomatoes were so fresh and flavorful. Great for making pasta sauce.',
    helpful: 15,
    verified: false
  }
];

// Mock related products
const relatedProducts = [
  {
    id: 2,
    name: 'Fresh Onions',
    price: 30,
    originalPrice: 35,
    images: ['/images/products/onions.jpg'],
    rating: 4.3,
    reviewCount: 89,
    category: 'vegetables',
    unit: 'per kg',
    inStock: true,
    stockQuantity: 40,
    vendor: { id: 1, name: 'Fresh Farm', rating: 4.8 }
  },
  {
    id: 3,
    name: 'Green Bell Peppers',
    price: 80,
    originalPrice: 100,
    images: ['/images/products/bell-peppers.jpg'],
    rating: 4.6,
    reviewCount: 67,
    category: 'vegetables',
    unit: 'per kg',
    inStock: true,
    stockQuantity: 25,
    vendor: { id: 1, name: 'Fresh Farm', rating: 4.8 }
  }
];

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState(mockReviews);
  const [sortReviews, setSortReviews] = useState('newest');

  // Simulate API call
  useEffect(() => {
    if (id) {
      setLoading(true);
      // Simulate API delay
      setTimeout(() => {
        setProduct(mockProduct);
        setLoading(false);
      }, 500);
    }
  }, [id]);

  const cartQuantity = getItemQuantity(product?.id || 0);
  const isInCart = cartQuantity > 0;

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setQuantity(1);
    }
  };

  const handleUpdateCartQuantity = (newQuantity) => {
    if (product) {
      updateQuantity(product.id, newQuantity);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-200 rounded-lg h-96"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Link href="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <Head>
        <title>{product.name} - Jumale Grocery Shop</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.images[0]} />
        <meta property="og:type" content="product" />
        <meta property="product:price:amount" content={product.price} />
        <meta property="product:price:currency" content="INR" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-gray-700">Products</Link>
            <span>/</span>
            <Link href={`/products/category/${product.category}`} className="hover:text-gray-700 capitalize">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-white rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={product.images[selectedImage] || '/images/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {discountPercentage > 0 && (
                  <div className="absolute top-4 left-4">
                    <Badge variant="error" className="text-sm font-semibold">
                      {discountPercentage}% OFF
                    </Badge>
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-primary-500' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image || '/images/placeholder.jpg'}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Title and Rating */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-600">({product.reviewCount} reviews)</span>
                  </div>
                  <Badge variant="success" size="sm">
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </Badge>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                )}
                <span className="text-sm text-gray-600">{product.unit}</span>
                {discountPercentage > 0 && (
                  <span className="text-lg font-semibold text-green-600">
                    Save ₹{product.originalPrice - product.price}
                  </span>
                )}
              </div>

              {/* Vendor Info */}
              <div className="flex items-center space-x-3 p-4 bg-gray-100 rounded-lg">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-sm">
                    {product.vendor.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{product.vendor.name}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      {renderStars(product.vendor.rating)}
                    </div>
                    <span>•</span>
                    <span>{product.vendor.location}</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature, index) => (
                    <Badge key={index} variant="primary" size="sm">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-16 text-center font-medium">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                        disabled={quantity >= product.stockQuantity}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {product.stockQuantity <= 10 && (
                    <div className="text-sm text-orange-600">
                      Only {product.stockQuantity} left in stock
                    </div>
                  )}
                </div>

                {!isInCart ? (
                  <Button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart - ₹{(product.price * quantity).toFixed(2)}
                  </Button>
                ) : (
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => handleUpdateCartQuantity(cartQuantity - 1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-16 text-center font-medium">{cartQuantity}</span>
                      <button
                        onClick={() => handleUpdateCartQuantity(cartQuantity + 1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                        disabled={cartQuantity >= product.stockQuantity}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-sm text-green-600 font-medium">
                      ₹{(product.price * cartQuantity).toFixed(2)} in cart
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button variant="outline" className="flex-1">
                    <Heart className="w-4 h-4 mr-2" />
                    Wishlist
                  </Button>
                  <Button variant="outline" onClick={handleShare}>
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Delivery Info */}
              <Card>
                <Card.Body padding="sm">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Truck className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">Free Delivery</p>
                        <p className="text-sm text-gray-600">On orders above ₹500</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">Quality Guarantee</p>
                        <p className="text-sm text-gray-600">Fresh or your money back</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RotateCcw className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="font-medium text-gray-900">Easy Returns</p>
                        <p className="text-sm text-gray-600">7-day return policy</p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>

          {/* Product Details Tabs */}
          <Card className="mb-12">
            <Card.Header>
              <div className="flex space-x-8 border-b border-gray-200">
                {[
                  { id: 'description', label: 'Description' },
                  { id: 'nutrition', label: 'Nutrition Facts' },
                  { id: 'reviews', label: `Reviews (${product.reviewCount})` }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </Card.Header>
            <Card.Body>
              {activeTab === 'description' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">About this product</h3>
                    <p className="text-gray-700 leading-relaxed">{product.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Storage</h4>
                      <p className="text-gray-600">{product.storage}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Shelf Life</h4>
                      <p className="text-gray-600">{product.shelfLife}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Origin</h4>
                      <p className="text-gray-600">{product.origin}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'nutrition' && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Nutritional Information (per 100g)</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary-600">{product.nutritionalInfo.calories}</div>
                      <div className="text-sm text-gray-600">Calories</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary-600">{product.nutritionalInfo.protein}g</div>
                      <div className="text-sm text-gray-600">Protein</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary-600">{product.nutritionalInfo.carbs}g</div>
                      <div className="text-sm text-gray-600">Carbs</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary-600">{product.nutritionalInfo.fiber}g</div>
                      <div className="text-sm text-gray-600">Fiber</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary-600">{product.nutritionalInfo.vitamin_c}mg</div>
                      <div className="text-sm text-gray-600">Vitamin C</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary-600">{product.nutritionalInfo.potassium}mg</div>
                      <div className="text-sm text-gray-600">Potassium</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {/* Reviews Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900 mb-1">{product.rating}</div>
                      <div className="flex justify-center items-center mb-2">
                        {renderStars(product.rating)}
                      </div>
                      <div className="text-sm text-gray-600">Based on {product.reviewCount} reviews</div>
                    </div>
                    
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const count = Math.floor(Math.random() * 50) + 1;
                        const percentage = (count / product.reviewCount) * 100;
                        return (
                          <div key={star} className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <span className="text-sm text-gray-600">{star}</span>
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            </div>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-yellow-400 h-2 rounded-full"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600 w-8">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                            <Image
                              src={review.user.avatar || '/images/placeholder.jpg'}
                              alt={review.user.name}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-gray-900">{review.user.name}</span>
                              {review.verified && (
                                <Badge variant="success" size="xs">Verified</Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="flex items-center">
                                {renderStars(review.rating)}
                              </div>
                              <span className="text-sm text-gray-600">{formatDate(review.date)}</span>
                            </div>
                            <h4 className="font-medium text-gray-900 mb-1">{review.title}</h4>
                            <p className="text-gray-700 mb-3">{review.comment}</p>
                            <div className="flex items-center space-x-4">
                              <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900">
                                <ThumbsUp className="w-4 h-4" />
                                <span>Helpful ({review.helpful})</span>
                              </button>
                              <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900">
                                <Flag className="w-4 h-4" />
                                <span>Report</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Write Review Button */}
                  {isAuthenticated && (
                    <div className="text-center">
                      <Button variant="outline">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Write a Review
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}