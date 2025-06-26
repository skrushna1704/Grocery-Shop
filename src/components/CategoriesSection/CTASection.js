'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingCart, UserPlus, ArrowRight, Sparkles, Gift, Clock } from 'lucide-react';
import Button from '@/components/ui/Button'; // Adjust path as needed

export default function CTASection() {
  return (
    <section className="py-20 pb-32 relative overflow-hidden">
      {/* Animated Background - Updated to match website theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-blue-600 to-teal-700">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full flex items-center justify-center"
        >
          <ShoppingCart className="w-10 h-10 text-white" />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-32 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full flex items-center justify-center"
        >
          <Gift className="w-8 h-8 text-white" />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, -25, 0],
            x: [0, 10, 0]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-32 left-20 w-24 h-24 bg-white bg-opacity-10 rounded-full flex items-center justify-center"
        >
          <Sparkles className="w-12 h-12 text-white" />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute bottom-20 right-10 w-18 h-18 bg-white bg-opacity-10 rounded-full flex items-center justify-center"
        >
          <Clock className="w-9 h-9 text-white" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3 mb-8"
          >
            <Sparkles className="w-5 h-5 text-green-300" />
            <span className="font-semibold">Limited Time Offer</span>
            <Sparkles className="w-5 h-5 text-green-300" />
          </motion.div>

          {/* Main Heading */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-4xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            Ready to Start{' '}
            <span className="bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent">
              Shopping?
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xl lg:text-2xl mb-4 opacity-90 leading-relaxed max-w-3xl mx-auto"
          >
            Join thousands of satisfied customers and get fresh groceries delivered to your doorstep today.
          </motion.p>

          {/* Special Offer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mb-10"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-400 to-blue-400 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
              <Gift className="w-6 h-6" />
              <span>Get ₹100 OFF on your first order above ₹999!</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 gap-x-6 justify-center items-center mb-12"
          >
            <Link href="/products" className="group">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-green-600 text-white hover:bg-green-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold flex items-center"
              >
                Browse Products
              </Button>
            </Link>
            
            <Link href="/register" className="group">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-2 border-green-600 text-white hover:bg-green-600 hover:text-white backdrop-blur-sm bg-white bg-opacity-10 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold flex items-center"
              >
                Create Account
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            {[
              {
                icon: Clock,
                title: "30-Min Delivery",
                description: "Express delivery in select areas"
              },
              {
                icon: ShoppingCart,
                title: "5000+ Products",
                description: "Wide variety to choose from"
              },
              {
                icon: Gift,
                title: "Daily Offers",
                description: "Fresh deals every day"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm opacity-80">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 }}
            className="mt-12 text-sm opacity-70"
          >
            No credit card required • Free account setup • Cancel anytime
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-24 md:h-32">
          <path
            d="M0 100L48 87.5C96 75 192 50 288 37.5C384 25 480 25 576 31.25C672 37.5 768 50 864 56.25C960 62.5 1056 62.5 1152 56.25C1248 50 1344 37.5 1392 31.25L1440 25V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}