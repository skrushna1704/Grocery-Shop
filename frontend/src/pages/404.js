import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft, ShoppingBag } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found - Jumale Grocery Shop</title>
        <meta name="description" content="Sorry, the page you're looking for doesn't exist. Return to Jumale Grocery Shop homepage." />
      </Head>

      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* 404 Illustration */}
            <div className="mb-8">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative"
              >
                {/* Large 404 */}
                <div className="text-9xl font-bold text-primary-200 select-none">
                  404
                </div>
                
                {/* Floating vegetables around 404 */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-4 left-8 text-4xl"
                >
                  🥕
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute top-12 right-12 text-3xl"
                >
                  🍅
                </motion.div>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="absolute bottom-8 left-16 text-3xl"
                >
                  🥬
                </motion.div>
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                  className="absolute bottom-4 right-8 text-3xl"
                >
                  🍋
                </motion.div>
              </motion.div>
            </div>

            {/* Error Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Oops! Page Not Found
              </h1>
              <p className="text-lg text-gray-600 mb-2">
                Looks like this page got lost in our grocery aisles!
              </p>
              <p className="text-gray-500">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Home className="w-5 h-5 mr-2" />
                    Go Home
                  </Button>
                </Link>
                
                <Link href="/products">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Browse Products
                  </Button>
                </Link>
              </div>

              {/* Search Suggestion */}
              <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Looking for something specific?
                </h3>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Search for products..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          window.location.href = `/products?search=${encodeURIComponent(e.target.value)}`;
                        }
                      }}
                    />
                  </div>
                  <Button
                    onClick={() => {
                      const input = document.querySelector('input[type="text"]');
                      if (input.value.trim()) {
                        window.location.href = `/products?search=${encodeURIComponent(input.value)}`;
                      }
                    }}
                  >
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Popular Categories */}
              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-3">Or explore these popular categories:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    { name: 'Vegetables', href: '/products/category/vegetables' },
                    { name: 'Fruits', href: '/products/category/fruits' },
                    { name: 'Dairy', href: '/products/category/dairy' },
                    { name: 'Grains', href: '/products/category/grains' }
                  ].map((category) => (
                    <Link key={category.name} href={category.href}>
                      <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm hover:bg-primary-200 transition-colors cursor-pointer">
                        {category.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Help Section */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                  Still can&apos;t find what you&apos;re looking for?{' '}
                  <Link href="/contact" className="text-primary-600 hover:text-primary-700 font-medium">
                    Contact our support team
                  </Link>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Back to Previous Page */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Go back to previous page
          </button>
        </motion.div>
      </div>
    </>
  );
}