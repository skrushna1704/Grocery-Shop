import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CartDrawer from '../CartDrawer/CartDrawer';
import styles from './CartIcon.module.css';

const CartIcon = ({ 
  showDrawer = false,
  variant = 'default',
  size = 'md',
  className = ''
}) => {
  const { itemCount, total } = useCart();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleCartClick = (e) => {
    if (showDrawer) {
      e.preventDefault();
      setIsDrawerOpen(true);
    }
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-7 h-7'
  };

  const containerClasses = [
    'relative inline-flex items-center',
    variant === 'button' && 'p-2 rounded-md hover:bg-gray-100 transition-colors',
    className
  ].filter(Boolean).join(' ');

  const cartContent = (
    <div className={containerClasses}>
      <ShoppingCart className={`${iconSizes[size]} text-gray-600`} />
      
      {/* Item count badge */}
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium min-w-[1.25rem]"
          >
            {itemCount > 99 ? '99+' : itemCount}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Total amount (optional) */}
      {variant === 'detailed' && total > 0 && (
        <div className="ml-2 hidden lg:block">
          <div className="text-sm font-medium text-gray-900">
            ₹{total.toFixed(2)}
          </div>
          <div className="text-xs text-gray-500">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {showDrawer ? (
        <button
          onClick={handleCartClick}
          className="focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md"
          aria-label={`Shopping cart with ${itemCount} items`}
        >
          {cartContent}
        </button>
      ) : (
        <Link
          href="/cart"
          className="focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md"
          aria-label={`Shopping cart with ${itemCount} items`}
        >
          {cartContent}
        </Link>
      )}

      {/* Cart Drawer */}
      {showDrawer && (
        <CartDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      )}
    </>
  );
};

export default CartIcon;