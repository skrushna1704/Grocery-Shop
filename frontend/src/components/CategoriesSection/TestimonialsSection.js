'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

// Sample testimonials data - replace with your actual data
const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Pimpri Colony",
    rating: 5,
    comment: "Amazing quality products! The vegetables are always fresh and delivery is super fast. Jumale Grocery has become my go-to for all grocery needs.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Rahul Patil",
    location: "Kalgaon",
    rating: 5,
    comment: "Excellent service and competitive prices. The app is user-friendly and customer support is very responsive. Highly recommend to everyone!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Sneha Desai",
    location: "Pimpri Station",
    rating: 5,
    comment: "The best grocery delivery service in Pimpri! Fresh fruits, quality products, and timely delivery. Very satisfied with their service.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "Amit Kumar",
    location: "Sector 27",
    rating: 4,
    comment: "Great variety of products and reasonable prices. The delivery boys are very polite and professional. Keep up the good work!",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  }
];

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-blue-200 to-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-gradient-to-r from-green-200 to-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      {/* Floating Quote Icons */}
      <div className="absolute top-20 left-20 text-blue-200 opacity-30">
        <Quote className="w-16 h-16" />
      </div>
      <div className="absolute bottom-20 right-20 text-purple-200 opacity-30 transform rotate-180">
        <Quote className="w-16 h-16" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold text-lg mb-4"
          >
            Customer Reviews
          </motion.span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            What Our{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Customers Say
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by thousands of families in Pimpri(Kalgaon) for their daily grocery needs
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative"
              >
                <div className="bg-white rounded-3xl p-10 lg:p-12 shadow-2xl border border-gray-100 relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50"></div>
                  
                  {/* Quote Icon */}
                  <div className="absolute top-6 left-6 text-blue-200">
                    <Quote className="w-12 h-12" />
                  </div>

                  <div className="relative z-10">
                    {/* Rating Stars */}
                    <div className="flex justify-center mb-6">
                      <div className="flex space-x-1 bg-yellow-50 px-4 py-2 rounded-full">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed text-center font-medium">
                      &quot;{testimonials[currentTestimonial].comment}&quot;
                    </blockquote>

                    {/* Customer Info */}
                    <div className="flex items-center justify-center space-x-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg border-4 border-white">
                          <Image
                            src={testimonials[currentTestimonial].avatar}
                            alt={testimonials[currentTestimonial].name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = '/images/placeholder.jpg';
                            }}
                          />
                        </div>
                        {/* Online indicator */}
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-gray-900 text-lg">{testimonials[currentTestimonial].name}</p>
                        <p className="text-blue-600 font-medium">{testimonials[currentTestimonial].location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 z-20"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 z-20"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-10 space-x-3">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            {[
              { number: '10K+', label: 'Reviews', icon: '⭐' },
              { number: '4.8/5', label: 'Average Rating', icon: '📊' },
              { number: '98%', label: 'Satisfaction Rate', icon: '❤️' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}