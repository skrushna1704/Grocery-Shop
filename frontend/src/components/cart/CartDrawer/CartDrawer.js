import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Truck, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Button from '../../ui/Button';
import CartItem from '../CartItem/CartItem';
import styles from './CartDrawer.module.css';

const CartDrawer = ({ isOpen, onClose }) => {
  const { 
    items, 
    total, 
    itemCount, 
    getSubtotal, 
    isEligibleForFreeShipping, 
    getAmountForFreeShipping,
    shippingCost 
  } = useCart();

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close drawer on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const subtotal = getSubtotal();
  const freeShippingAmount = getAmountForFreeShipping();

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const drawerVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
    exit: { x: '100%' }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-primary-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Shopping Cart ({itemCount})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Free shipping progress */}
            {!isEligibleForFreeShipping() && freeShippingAmount > 0 && (
              <div className="p-4 bg-primary-50 border-b border-primary-100">
                <div className="flex items-center text-sm text-primary-700 mb-2">
                  <Truck className="w-4 h-4 mr-2" />
                  <span>Add ₹{freeShippingAmount} more for FREE delivery!</span>
                </div>
                <div className="w-full bg-primary-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min((subtotal / 500) * 100, 100)}%`
                    }}
                  />
                </div>
              </div>
            )}

            {items.length > 0 ? (
              <>
                {/* Cart items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      variant="drawer"
                    />
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 p-4 space-y-4">
                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                    </div>
                    {shippingCost > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium">₹{shippingCost.toFixed(2)}</span>
                      </div>
                    )}
                    {isEligibleForFreeShipping() && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Shipping</span>
                        <span className="font-medium">FREE</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-semibold pt-2 border-t border-gray-200">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="space-y-2">
                    <Link href="/cart" onClick={onClose}>
                      <Button variant="outline" fullWidth>
                        View Cart
                      </Button>
                    </Link>
                    <Link href="/checkout" onClick={onClose}>
                      <Button fullWidth>
                        Checkout
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>

                  {/* Continue shopping */}
                  <Link
                    href="/products"
                    onClick={onClose}
                    className="block text-center text-sm text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </>
            ) : (
              /* Empty cart */
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-600 mb-6">
                  Looks like you haven&apos;t added any items to your cart yet.
                </p>
                <Link href="/products" onClick={onClose}>
                  <Button>
                    Start Shopping
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;