import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, Minus, Trash2, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Button from '../../ui/Button';
import styles from './CartItem.module.css';

const CartItem = ({ 
  item, 
  variant = 'default', // 'default' | 'drawer' | 'page'
  showRemove = true,
  showWishlist = true,
  className = ''
}) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [imageError, setImageError] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      handleRemove();
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    // Add small delay for animation
    setTimeout(() => {
      removeFromCart(item.id);
    }, 200);
  };

  const handleMoveToWishlist = () => {
    // Implement wishlist functionality
    console.log('Move to wishlist:', item.id);
    removeFromCart(item.id);
  };

  const itemTotal = item.price * item.quantity;
  const savings = item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0;

  const containerClasses = [
    'cart-item',
    `cart-item-${variant}`,
    isRemoving && 'cart-item-removing',
    className
  ].filter(Boolean).join(' ');

  if (variant === 'drawer') {
    return (
      <motion.div
        layout
        initial={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        className={`flex space-x-3 p-3 bg-white rounded-lg border border-gray-200 ${isRemoving ? 'opacity-50' : ''}`}
      >
        {/* Product Image */}
        <div className="flex-shrink-0">
          <Link href={`/products/${item.id}`}>
            <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
              <Image
                src={imageError ? '/images/placeholder.jpg' : item.image}
                alt={item.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            </div>
          </Link>
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <Link href={`/products/${item.id}`}>
            <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-primary-600">
              {item.name}
            </h3>
          </Link>
          <p className="text-xs text-gray-500 mt-1">{item.unit}</p>
          
          {/* Price */}
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-sm font-semibold text-gray-900">
              ₹{item.price}
            </span>
            {item.originalPrice && item.originalPrice > item.price && (
              <span className="text-xs text-gray-500 line-through">
                ₹{item.originalPrice}
              </span>
            )}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50"
                disabled={isRemoving}
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-sm font-medium w-8 text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50"
                disabled={isRemoving || item.quantity >= item.stockQuantity}
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
            
            {showRemove && (
              <button
                onClick={handleRemove}
                className="text-red-500 hover:text-red-700 p-1"
                disabled={isRemoving}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Default/Page variant
  return (
    <motion.div
      layout
      initial={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`${containerClasses} ${isRemoving ? 'opacity-50' : ''}`}
    >
      <div className="flex space-x-4 py-6">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <Link href={`/products/${item.id}`}>
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-lg overflow-hidden hover:opacity-75 transition-opacity">
              <Image
                src={imageError ? '/images/placeholder.jpg' : item.image}
                alt={item.name}
                width={96}
                height={96}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            </div>
          </Link>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between">
            <div className="pr-4">
              <Link href={`/products/${item.id}`}>
                <h3 className="text-base font-medium text-gray-900 hover:text-primary-600 transition-colors">
                  {item.name}
                </h3>
              </Link>
              <p className="text-sm text-gray-500 mt-1">
                By {item.vendor?.name} • {item.unit}
              </p>
              
              {/* Stock Status */}
              {item.stockQuantity <= 10 && (
                <p className="text-sm text-orange-600 mt-1">
                  Only {item.stockQuantity} left in stock
                </p>
              )}
            </div>

            {/* Price and Total */}
            <div className="text-right">
              <div className="text-base font-semibold text-gray-900">
                ₹{itemTotal.toFixed(2)}
              </div>
              {item.originalPrice && item.originalPrice > item.price && (
                <div className="text-sm text-gray-500 line-through">
                  ₹{(item.originalPrice * item.quantity).toFixed(2)}
                </div>
              )}
              {savings > 0 && (
                <div className="text-sm text-green-600">
                  You save ₹{savings.toFixed(2)}
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-3">
              {/* Quantity Controls */}
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                  disabled={isRemoving}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                  disabled={isRemoving || item.quantity >= item.stockQuantity}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Unit Price */}
              <div className="text-sm text-gray-600">
                ₹{item.price.toFixed(2)} each
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {showWishlist && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMoveToWishlist}
                  disabled={isRemoving}
                >
                  <Heart className="w-4 h-4 mr-1" />
                  Save for later
                </Button>
              )}
              
              {showRemove && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemove}
                  disabled={isRemoving}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;