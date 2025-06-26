'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  ShieldCheck, 
  Clock, 
  DollarSign,
  Star,
  Heart 
} from 'lucide-react';

// Sample features - replace with your actual features
const features = [
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'Free delivery on orders above ₹500. Fast and reliable delivery to your doorstep.',
    color: 'from-green-400 to-emerald-600',
    bgColor: 'from-green-50 to-emerald-50',
    delay: 0.1
  },
  {
    icon: ShieldCheck,
    title: 'Quality Guarantee',
    description: 'Fresh, premium quality products with 100% satisfaction guarantee or money back.',
    color: 'from-blue-400 to-blue-600',
    bgColor: 'from-blue-50 to-cyan-50',
    delay: 0.2
  },
  {
    icon: Clock,
    title: '30-Min Delivery',
    description: 'Express delivery within 30 minutes for urgent grocery needs in select areas.',
    color: 'from-purple-400 to-purple-600',
    bgColor: 'from-purple-50 to-violet-50',
    delay: 0.3
  },
  {
    icon: DollarSign,
    title: 'Best Prices',
    description: 'Competitive prices with regular discounts and special offers for members.',
    color: 'from-orange-400 to-red-500',
    bgColor: 'from-orange-50 to-red-50',
    delay: 0.4
  },
  {
    icon: Star,
    title: 'Premium Quality',
    description: 'Handpicked products from trusted suppliers ensuring the highest quality standards.',
    color: 'from-yellow-400 to-amber-500',
    bgColor: 'from-yellow-50 to-amber-50',
    delay: 0.5
  },
  {
    icon: Heart,
    title: 'Customer Care',
    description: '24/7 customer support ready to help you with orders, returns, and queries.',
    color: 'from-pink-400 to-rose-500',
    bgColor: 'from-pink-50 to-rose-50',
    delay: 0.6
  }
];

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
    y: 50,
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

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: { 
    scale: 1, 
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.3
    }
  }
};

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-10 w-72 h-72 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-700"></div>
        <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%236366f1' fill-opacity='0.4'%3E%3Cpath d='m40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20h40zm0-40c0 11.046-8.954 20-20 20s-20-8.954-20-20h40z'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold text-lg mb-4"
          >
            Why Choose Us
          </motion.span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Experience the{' '}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Difference
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're committed to providing exceptional service and quality that exceeds your expectations
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon Container */}
                    <motion.div
                      variants={iconVariants}
                      className="relative mb-6"
                    >
                      <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      
                      {/* Floating elements */}
                      <div className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br ${feature.color} rounded-full opacity-60 group-hover:scale-125 transition-transform duration-500`} />
                      <div className={`absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-br ${feature.color} rounded-full opacity-40 group-hover:scale-150 transition-transform duration-700`} />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {feature.description}
                    </p>

                    {/* Animated Border */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100">
                      <div className={`h-full bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '50K+', label: 'Happy Customers' },
            { number: '5K+', label: 'Products' },
            { number: '99%', label: 'Satisfaction Rate' },
            { number: '24/7', label: 'Support' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
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