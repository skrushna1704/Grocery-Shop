'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Add custom CSS for line clamping
const customStyles = `
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const categories = [
  {
    id: 1,
    name: 'Fresh Vegetables',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    fallbackImage: '/images/placeholder.jpg',
    href: '/products/category/vegetables',
    color: 'from-green-400 to-green-600',
    icon: '🥬',
    description: 'Fresh & Crispy'
  },
  {
    id: 2,
    name: 'Fresh Fruits',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    fallbackImage: '/images/placeholder.jpg',
    href: '/products/category/fruits',
    color: 'from-orange-400 to-orange-600',
    icon: '🍎',
    description: 'Sweet & Juicy'
  },
  {
    id: 3,
    name: 'Dairy Products',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    fallbackImage: '/images/placeholder.jpg',
    href: '/products/category/dairy',
    color: 'from-blue-400 to-blue-600',
    icon: '🥛',
    description: 'Rich & Creamy'
  },
  {
    id: 4,
    name: 'Grains & Cereals',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    fallbackImage: '/images/placeholder.jpg',
    href: '/products/category/grains',
    color: 'from-yellow-400 to-yellow-600',
    icon: '🌾',
    description: 'Wholesome & Nutritious'
  },
  {
    id: 5,
    name: 'Snacks',
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    fallbackImage: '/images/placeholder.jpg',
    href: '/products/category/snacks',
    color: 'from-purple-400 to-purple-600',
    icon: '🍿',
    description: 'Tasty & Crunchy'
  },
  {
    id: 6,
    name: 'Beverages',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    fallbackImage: '/images/placeholder.jpg',
    href: '/products/category/beverages',
    color: 'from-red-400 to-red-600',
    icon: '☕',
    description: 'Refreshing & Pure'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Custom Image Component with proper error handling
const CategoryImage = ({ src, alt, fallbackImage, className }) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [imageError, setImageError] = useState(false);

  const handleError = () => {
    if (!imageError) {
      setImageError(true);
      setImageSrc(fallbackImage);
    }
  };

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      className={className}
      onError={handleError}
      priority={false}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
};

export default function CategoriesSection() {
  return (
    <>
      <style jsx>{customStyles}</style>
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background decorations - Fixed SVG encoding */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f1f5f9' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent font-semibold text-lg mb-4"
          >
            Categories
          </motion.span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Shop by{' '}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Category
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully curated selection of fresh, quality products organized for your shopping convenience
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 lg:gap-8"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link href={category.href} className="group block">
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-80 flex flex-col">
                  {/* Image container with overlay */}
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <CategoryImage
                      src={category.image}
                      alt={category.name}
                      fallbackImage={category.fallbackImage}
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                    
                    {/* Icon overlay */}
                    <div className="absolute top-4 right-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {category.icon}
                      </div>
                    </div>

                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                      <div className="bg-white bg-opacity-90 px-4 py-2 rounded-full transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="text-sm font-semibold text-gray-900">Shop Now →</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-green-600 transition-colors duration-300 line-clamp-1">
                        {category.name}
                      </h3>
                      <p className="text-gray-500 text-sm font-medium line-clamp-2">
                        {category.description}
                      </p>
                    </div>
                    
                    {/* Progress bar animation */}
                    <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${category.color} transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out`} />
                    </div>
                  </div>

                  {/* Border glow effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`} />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <span>View All Products</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
    </>
  );
}