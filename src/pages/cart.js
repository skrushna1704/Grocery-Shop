import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  ArrowRight, 
  ArrowLeft, 
  Truck, 
  Shield, 
  Tag,
  Plus
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import CartItem from '@/components/cart/CartItem';
import ProductCard from '@/components/product/ProductCard';

// Mock recommended products
const recommendedProducts = [
  {
    id: 101,
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
    vendor: { id: 1, name: 'Fresh Farm', rating: 4.8 }
  },
  {
    id: 102,
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
    vendor: { id: 2, name: 'Organic Valley', rating: 4.6 }
  }
];

export default function CartPage() {
  const { 
    items, 
    total, 
    itemCount, 
    getSubtotal, 
    isEligibleForFreeShipping, 
    getAmountForFreeShipping, 
    shippingCost,
    clearCart 
  } = useCart();
  const { isAuthenticated } = useAuth();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const subtotal = getSubtotal();
  const freeShippingAmount = getAmountForFreeShipping();

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    
    setIsApplyingCoupon(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock coupon validation
      const validCoupons = {
        'SAVE10': { discount: 10, type: 'percentage' },
        'FLAT50': { discount: 50, type: 'flat' },
        'WELCOME': { discount: 15, type: 'percentage' }
      };

      if (validCoupons[couponCode.toUpperCase()]) {
        setAppliedCoupon({
          code: couponCode.toUpperCase(),
          ...validCoupons[couponCode.toUpperCase()]
        });
        setCouponCode('');
      } else {
        alert('Invalid coupon code');
      }
      setIsApplyingCoupon(false);
    }, 1000);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    
    if (appliedCoupon.type === 'percentage') {
      return (subtotal * appliedCoupon.discount) / 100;
    } else {
      return appliedCoupon.discount;
    }
  };

  const discount = calculateDiscount();
  const finalTotal = Math.max(0, subtotal - discount + shippingCost);

  if (items.length === 0) {
    return (
      <>
        <Head>
          <title>Shopping Cart - Jumale Grocery Shop</title>
          <meta name="description" content="Your shopping cart is empty. Browse our fresh products and add them to cart." />
        </Head>

        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm p-8"
              >
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="w-12 h-12 text-gray-400" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Your cart is empty
                </h1>
                <p className="text-gray-600 mb-8">
                  Looks like you haven&apos;t added any items to your cart yet. Start shopping to fill it up!
                </p>
                <div className="space-y-4">
                  <Link href="/products">
                    <Button size="lg">
                      <Plus className="w-5 h-5 mr-2" />
                      Start Shopping
                    </Button>
                  </Link>
                  <Link href="/" className="block text-primary-600 hover:text-primary-700">
                    Continue browsing
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Shopping Cart ({itemCount} items) - Jumale Grocery Shop</title>
        <meta name="description" content={`Review your cart with ${itemCount} items. Total: ₹${total.toFixed(2)}`} />
      </Head>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <Link href="/" className="hover:text-gray-700">Home</Link>
              <span>/</span>
              <span className="text-gray-900">Shopping Cart</span>
            </nav>
            
            <div className="flex items-center justify-between">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
              </h1>
              <Link href="/products">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <Card.Body padding="none">
                  {/* Free Shipping Progress */}
                  {!isEligibleForFreeShipping() && freeShippingAmount > 0 && (
                    <div className="p-6 bg-primary-50 border-b border-primary-100">
                      <div className="flex items-center text-sm text-primary-700 mb-3">
                        <Truck className="w-5 h-5 mr-2" />
                        <span className="font-medium">
                          Add ₹{freeShippingAmount.toFixed(2)} more for FREE delivery!
                        </span>
                      </div>
                      <div className="w-full bg-primary-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min((subtotal / 500) * 100, 100)}%`
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Cart Items List */}
                  <div className="divide-y divide-gray-200">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="px-6"
                      >
                        <CartItem item={item} variant="page" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Clear Cart */}
                  <div className="p-6 border-t border-gray-200">
                    <Button
                      variant="ghost"
                      onClick={clearCart}
                      className="text-red-600 hover:text-red-700"
                    >
                      Clear Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Summary Card */}
              <Card>
                <Card.Header>
                  <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
                </Card.Header>
                <Card.Body>
                  <div className="space-y-4">
                    {/* Subtotal */}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                      <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                    </div>

                    {/* Discount */}
                    {appliedCoupon && discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({appliedCoupon.code})</span>
                        <span>-₹{discount.toFixed(2)}</span>
                      </div>
                    )}

                    {/* Shipping */}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      {isEligibleForFreeShipping() ? (
                        <span className="font-medium text-green-600">FREE</span>
                      ) : (
                        <span className="font-medium">₹{shippingCost.toFixed(2)}</span>
                      )}
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>₹{finalTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </Card.Body>
                <Card.Footer>
                  <div className="space-y-3">
                    <Link href="/checkout">
                      <Button fullWidth size="lg">
                        Proceed to Checkout
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    
                    {/* Security badges */}
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 mr-1" />
                        <span>Secure checkout</span>
                      </div>
                    </div>
                  </div>
                </Card.Footer>
              </Card>

              {/* Coupon Card */}
              <Card>
                <Card.Header>
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <Tag className="w-5 h-5 mr-2" />
                    Apply Coupon
                  </h3>
                </Card.Header>
                <Card.Body>
                  {appliedCoupon ? (
                    <div className="bg-green-50 border border-green-200 rounded-md p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-green-800 font-medium">
                            {appliedCoupon.code} applied!
                          </span>
                          <p className="text-green-700 text-sm">
                            You saved ₹{discount.toFixed(2)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={removeCoupon}
                          className="text-green-700"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Enter coupon code"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                          onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                        />
                        <Button
                          onClick={handleApplyCoupon}
                          disabled={!couponCode.trim() || isApplyingCoupon}
                          loading={isApplyingCoupon}
                          size="sm"
                        >
                          Apply
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">
                        Try: SAVE10, FLAT50, WELCOME
                      </p>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </div>
          </div>

          {/* Recommended Products */}
          {recommendedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                You might also like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}