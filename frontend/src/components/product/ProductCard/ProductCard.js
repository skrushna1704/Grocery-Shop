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

const ProductCard = ({ 
  product, 
  showQuickAdd = true,
  showWishlist = true,
  className = '' 
}) => {
  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const cartQuantity = getItemQuantity(product.id);
  const isInCart = cartQuantity > 0;

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />);
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
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden ${className}`}
    >
      <Link href={`/products/${product.id}`} className="block group">
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={imageError ? '/images/placeholder.jpg' : product.images[0]}
            alt={product.name}
            fill
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {discountPercentage > 0 && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              {discountPercentage}% OFF
            </div>
          )}
          {showWishlist && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Toggle wishlist for product:', product.id);
              }}
              className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-50 transition-colors duration-200"
            >
              <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
            </button>
          )}
          {showQuickAdd && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              className="absolute bottom-3 right-3"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Quick view for:', product.id);
                }}
                className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-50 transition-colors duration-200"
              >
                <Eye className="w-5 h-5 text-gray-600 hover:text-blue-500" />
              </button>
            </motion.div>
          )}
        </div>

        <div className="p-6 flex flex-col justify-between">
          <div>
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

            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
              )}
              <span className="text-xs text-gray-500">{product.unit}</span>
            </div>

            {product.price >= 500 && (
              <div className="flex items-center text-xs text-green-600 mb-2">
                <Truck className="w-3 h-3 mr-1" />
                <span>Free Delivery</span>
              </div>
            )}

            <div className="text-xs text-gray-500 mb-4">
              by <span className="font-medium text-gray-700">{product.vendor.name}</span>
            </div>
          </div>

          <div>
            {!isInCart ? (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart(product, 1);
                }}
                disabled={!product.inStock}
                fullWidth
                size="sm"
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                Add to Cart
              </Button>
            ) : (
              <div className="flex items-center justify-between bg-primary-50 rounded-md p-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateQuantity(product.id, cartQuantity - 1);
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-primary-600 hover:bg-primary-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-semibold text-primary-700 min-w-[2rem] text-center">
                  {cartQuantity}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateQuantity(product.id, cartQuantity + 1);
                  }}
                  disabled={cartQuantity >= product.stockQuantity}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-primary-600 hover:bg-primary-100 transition-colors disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}

            {product.inStock && product.stockQuantity <= 10 && (
              <p className="text-xs text-orange-600 text-center mt-2">
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
