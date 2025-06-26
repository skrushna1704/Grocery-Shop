import Head from 'next/head';
import Link from 'next/link';
import { CheckCircle, Truck, ShoppingBag, Clock } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/router';
export default function OrderSuccessPage() {
  const {  clearCart } = useCart();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Thank You for Your Order! - Jumale Grocery Shop</title>
        <meta name="description" content="Your order was placed successfully. Thank you for shopping with Jumale Grocery Shop!" />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank you for your order!</h1>
          <p className="text-gray-700 mb-6">
            Your order has been placed successfully.<br />
            We appreciate your business and will deliver your groceries soon.
          </p>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Truck className="w-6 h-6 text-primary-500" />
            <span className="text-sm text-gray-700">Estimated delivery: <strong>2-4 hours</strong></span>
          </div>
          <div className="flex items-center justify-center space-x-3 mb-6">
            <ShoppingBag className="w-6 h-6 text-primary-500" />
            <span className="text-sm text-gray-700">You will receive a confirmation call soon.</span>
          </div>
          {/* Placeholder for order summary or order number if available */}
          {/* <div className="mb-6">
            <span className="text-gray-500 text-sm">Order #123456</span>
          </div> */}
          <Link href="/" className="inline-block mt-4">
            <button className="px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors" onClick={()=>{
              router.replace('/');
              clearCart();
            }}>
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </>
  );
} 