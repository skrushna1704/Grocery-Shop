'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Star, Plus } from 'lucide-react';
import Button from '@/components/ui/Button'; // Adjust path as needed

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Sample featured products - replace with your actual data
const featuredProducts = [
  {
    id: 1,
    name: "Fresh Organic Tomatoes",
    price: 45,
    originalPrice: 60,
    image: "https://images.unsplash.com/photo-1546470427-e9e20482e5ad?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 128,
    category: "Vegetables"
  },
  {
    id: 2,
    name: "Premium Basmati Rice",
    price: 180,
    originalPrice: 220,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 95,
    category: "Grains"
  },
  {
    id: 3,
    name: "Fresh Green Apples",
    price: 120,
    originalPrice: 150,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 203,
    category: "Fruits"
  },
  {
    id: 4,
    name: "Organic Milk",
    price: 65,
    originalPrice: 80,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 156,
    category: "Dairy"
  }
];

export default function FeaturedProductsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-green-200 to-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-700"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-6"
        >
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent font-semibold text-lg"
            >
              Featured Products
            </motion.span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Hand-picked{' '}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Fresh Products
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              Discover our carefully selected premium products, chosen for their exceptional quality and freshness
            </p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/products">
              <Button 
                variant="outline" 
                size="lg"
                className="group hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-600 hover:text-white hover:border-transparent transition-all duration-300"
              >
                View All Products
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {featuredProducts.map((product) => (
            <motion.div 
              key={product.id} 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                {/* Image Container */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Discount Badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </div>
                  
                  {/* Add to Cart Button */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-50 transition-colors duration-200">
                      <Plus className="w-5 h-5 text-green-600" />
                    </button>
                  </div>
                  
                  {/* Category Tag */}
                  <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                    {product.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
                      <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
                    </div>
                  </div>

                  {/* Progress bar animation */}
                  <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { number: '2000+', label: 'Products' },
            { number: '99%', label: 'Fresh Quality' },
            { number: '24/7', label: 'Availability' },
            { number: '50K+', label: 'Happy Customers' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}