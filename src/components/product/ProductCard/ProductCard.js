import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Plus, 
  Minus,
  Eye,
  Truck
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Button from '../../ui/Button';
import Badge from '../../ui/Badge';
import styles from './ProductCard.module.css';

const ProductCard = ({ 
  product, 
  variant = 'default', 
  showQuickAdd = true,
  showWishlist = true,
  className = '' 
}) => {
  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  const { isAuthenticated } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const cartQuantity = getItemQuantity(product.id);
  const isInCart = cartQuantity > 0;

  // Calculate discount percentage
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleQuantityChange = (e, newQuantity) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, newQuantity);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Implement wishlist functionality
    console.log('Toggle wishlist for product:', product.id);
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

  const cardVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`product-card ${className}`}
    >
      <Link href={`/products/${product.id}`} className="block">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-t-lg">
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-2 left-2 z-10">
              <Badge variant="error" className="text-xs font-semibold">
                {discountPercentage}% OFF
              </Badge>
            </div>
          )}

          {/* Wishlist Button */}
          {showWishlist && (
            <button
              onClick={handleWishlistToggle}
              className="absolute top-2 right-2 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
            </button>
          )}

          {/* Product Image */}
          <motion.div
            variants={imageVariants}
            className="relative w-full h-full"
          >
            <Image
              src={imageError ? '/images/placeholder.jpg' : product.images[0]}
              alt={product.name}
              fill
              className={`object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(true);
              }}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </motion.div>

          {/* Quick View Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              y: isHovered ? 0 : 10 
            }}
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
          >
            <Button
              size="sm"
              variant="secondary"
              className="shadow-md"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Implement quick view
                console.log('Quick view for:', product.id);
              }}
            >
              <Eye className="w-4 h-4 mr-1" />
              Quick View
            </Button>
          </motion.div>

          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold bg-red-600 px-3 py-1 rounded">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Vendor */}
          <p className="text-xs text-gray-500 mb-1">{product.vendor.name}</p>

          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-2">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-gray-500">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="price-current">₹{product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="price-original">₹{product.originalPrice}</span>
            )}
            <span className="text-xs text-gray-500">{product.unit}</span>
          </div>

          {/* Free Delivery Info */}
          {product.price >= 500 && (
            <div className="flex items-center text-xs text-green-600 mb-3">
              <Truck className="w-3 h-3 mr-1" />
              <span>Free Delivery</span>
            </div>
          )}

          {/* Add to Cart / Quantity Controls */}
          <div className="space-y-2">
            {!isInCart ? (
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                fullWidth
                size="sm"
                className="text-sm"
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                Add to Cart
              </Button>
            ) : (
              <div className="flex items-center justify-between bg-primary-50 rounded-md p-2">
                <button
                  onClick={(e) => handleQuantityChange(e, cartQuantity - 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-primary-600 hover:bg-primary-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-semibold text-primary-700 min-w-[2rem] text-center">
                  {cartQuantity}
                </span>
                <button
                  onClick={(e) => handleQuantityChange(e, cartQuantity + 1)}
                  disabled={cartQuantity >= product.stockQuantity}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-primary-600 hover:bg-primary-100 transition-colors disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Stock info */}
            {product.inStock && product.stockQuantity <= 10 && (
              <p className="text-xs text-orange-600 text-center">
                Only {product.stockQuantity} left in stock
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;