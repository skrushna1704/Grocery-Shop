import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Star, 
  ArrowRight,
  Search,
  Filter,
  Grid3X3,
  List,
  X,
  Sparkles,
  TrendingUp,
  Package
} from 'lucide-react';

// Enhanced categories data with proper images
const categories = [
  {
    id: 1,
    name: 'Fresh Fruits & Vegetables',
    slug: 'fresh-fruits-vegetables',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
    description: 'Fresh and organic fruits and vegetables sourced daily',
    productCount: 45,
    featured: true,
    color: 'from-green-400 to-emerald-600'
  },
  {
    id: 2,
    name: 'Dairy & Eggs',
    slug: 'dairy-eggs',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop',
    description: 'Fresh dairy products and farm eggs',
    productCount: 32,
    featured: true,
    color: 'from-blue-400 to-cyan-600'
  },
  {
    id: 3,
    name: 'Meat & Fish',
    slug: 'meat-fish',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop',
    description: 'Premium quality meat and fresh fish',
    productCount: 28,
    featured: true,
    color: 'from-red-400 to-rose-600'
  },
  {
    id: 4,
    name: 'Bakery & Bread',
    slug: 'bakery-bread',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
    description: 'Freshly baked bread and pastries daily',
    productCount: 23,
    featured: false,
    color: 'from-amber-400 to-orange-600'
  },
  {
    id: 5,
    name: 'Pantry Essentials',
    slug: 'pantry-essentials',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop',
    description: 'Basic pantry items and cooking staples',
    productCount: 67,
    featured: false,
    color: 'from-yellow-400 to-amber-600'
  },
  {
    id: 6,
    name: 'Beverages',
    slug: 'beverages',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop',
    description: 'Soft drinks, juices, and hot beverages',
    productCount: 41,
    featured: false,
    color: 'from-purple-400 to-indigo-600'
  },
  {
    id: 7,
    name: 'Snacks & Chips',
    slug: 'snacks-chips',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=300&fit=crop',
    description: 'Delicious snacks and crispy chips',
    productCount: 38,
    featured: false,
    color: 'from-pink-400 to-purple-600'
  },
  {
    id: 8,
    name: 'Frozen Foods',
    slug: 'frozen-foods',
    image: 'https://images.unsplash.com/photo-1476887334197-56adbf254e1a?w=400&h=300&fit=crop',
    description: 'Convenient frozen meals and ingredients',
    productCount: 29,
    featured: false,
    color: 'from-cyan-400 to-blue-600'
  },
  {
    id: 9,
    name: 'Personal Care',
    slug: 'personal-care',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop',
    description: 'Hygiene and personal care products',
    productCount: 52,
    featured: false,
    color: 'from-teal-400 to-green-600'
  },
  {
    id: 10,
    name: 'Household & Cleaning',
    slug: 'household-cleaning',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    description: 'Cleaning supplies and household items',
    productCount: 44,
    featured: false,
    color: 'from-indigo-400 to-purple-600'
  },
  {
    id: 11,
    name: 'Baby & Kids',
    slug: 'baby-kids',
    image: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=400&h=300&fit=crop',
    description: 'Baby food, diapers, and kids products',
    productCount: 36,
    featured: false,
    color: 'from-rose-400 to-pink-600'
  },
  {
    id: 12,
    name: 'Pet Supplies',
    slug: 'pet-supplies',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
    description: 'Pet food and supplies for your furry friends',
    productCount: 25,
    featured: false,
    color: 'from-emerald-400 to-teal-600'
  }
];

// Mock featured products for each category
const getFeaturedProducts = (categoryId) => {
  const products = [
    {
      id: 1,
      name: 'Organic Bananas',
      price: 35,
      originalPrice: 40,
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=200&fit=crop',
      rating: 4.5,
      reviewCount: 128,
      inStock: true,
      discount: 15
    },
    {
      id: 2,
      name: 'Fresh Strawberries',
      price: 120,
      originalPrice: 150,
      image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300&h=200&fit=crop',
      rating: 4.8,
      reviewCount: 89,
      inStock: true,
      discount: 17
    },
    {
      id: 3,
      name: 'Organic Spinach',
      price: 25,
      originalPrice: 30,
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=200&fit=crop',
      rating: 4.3,
      reviewCount: 67,
      inStock: true,
      discount: 13
    },
    {
      id: 4,
      name: 'Fresh Tomatoes',
      price: 45,
      originalPrice: 60,
      image: 'https://images.unsplash.com/photo-1546470427-e9e20482e5ad?w=300&h=200&fit=crop',
      rating: 4.6,
      reviewCount: 156,
      inStock: true,
      discount: 17
    }
  ];
  
  return products.slice(0, 4);
};

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCategories = [...filteredCategories].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'productCount':
        return b.productCount - a.productCount;
      case 'featured':
        return b.featured - a.featured;
      default:
        return 0;
    }
  });

  const featuredCategories = categories.filter(cat => cat.featured);
  const regularCategories = sortedCategories.filter(cat => !cat.featured);

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
    hidden: { opacity: 0, y: 30, scale: 0.9 },
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

  return (
    <>
      <Head>
        <title>Categories - Jumale Grocery Shop</title>
        <meta name="description" content="Browse all product categories at Jumale Grocery Shop. Find fresh groceries, household items, and more." />
        <meta name="keywords" content="categories, groceries, fresh food, household items, online grocery" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        {/* Enhanced Search and Filters */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
            >
              {/* Search Bar */}
              <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 text-lg"
                />
              </div>
              
              {/* Controls */}
              <div className="flex items-center space-x-4">
                {/* View Toggle */}
                <div className="flex items-center bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      viewMode === 'grid' 
                        ? 'bg-white text-green-600 shadow-md' 
                        : 'text-gray-600 hover:bg-white hover:bg-opacity-50'
                    }`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      viewMode === 'list' 
                        ? 'bg-white text-green-600 shadow-md' 
                        : 'text-gray-600 hover:bg-white hover:bg-opacity-50'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 bg-white min-w-[160px]"
                >
                  <option value="name">Sort by Name</option>
                  <option value="productCount">Sort by Product Count</option>
                  <option value="featured">Sort by Featured</option>
                </select>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Featured Categories */}
          {featuredCategories.length > 0 && (
            <section className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>Featured Categories</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Most Popular{' '}
                  <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Categories
                  </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Our customers' favorite product categories with the best deals
                </p>
              </motion.div>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {featuredCategories.map((category) => (
                  <motion.div
                    key={category.id}
                    className="group cursor-pointer"
                    variants={itemVariants}
                    whileHover={{ y: -10 }}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
                      {/* Image Container */}
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                        
                        {/* Featured Badge */}
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-current" />
                          <span>Featured</span>
                        </div>

                        {/* Product Count */}
                        <div className="absolute bottom-4 right-4 bg-white bg-opacity-95 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-medium text-gray-700">
                          <TrendingUp className="w-4 h-4 inline mr-1 text-green-600" />
                          {category.productCount} products
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                          {category.name}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {category.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Package className="w-4 h-4" />
                            <span>{category.productCount} items</span>
                          </div>
                          
                          <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                            <span>Explore</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </button>
                        </div>

                        {/* Progress bar animation */}
                        <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full bg-gradient-to-r ${category.color} transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out`}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </section>
          )}

          {/* All Categories */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                All{' '}
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Categories
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Browse all available product categories and find exactly what you need
              </p>
            </motion.div>
            
            <motion.div 
              className={`${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                  : 'space-y-6'
              }`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {sortedCategories.map((category) => (
                <motion.div
                  key={category.id}
                  className="group cursor-pointer"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedCategory(category)}
                >
                  <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 overflow-hidden ${
                    viewMode === 'list' ? 'flex flex-row h-32' : 'flex flex-col'
                  }`}>
                    {/* Image Container */}
                    <div className={`relative overflow-hidden ${
                      viewMode === 'list' ? 'w-32 h-full flex-shrink-0' : 'w-full h-48'
                    }`}>
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                      
                      {category.featured && (
                        <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                          <Star className="w-3 h-3 inline" />
                        </div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className={`p-4 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-center' : ''}`}>
                      <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                        {category.name}
                      </h3>
                      <p className={`text-gray-600 mb-3 ${viewMode === 'list' ? 'text-sm' : ''}`}>
                        {category.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Package className="w-4 h-4" />
                          <span>{category.productCount}</span>
                        </div>
                        
                        <button className="inline-flex items-center space-x-1 text-green-600 hover:text-green-700 font-medium text-sm">
                          <span>View</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
        </div>

        {/* Enhanced Category Details Modal */}
        <AnimatePresence>
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedCategory(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="relative">
                  <img
                    src={selectedCategory.image}
                    alt={selectedCategory.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${selectedCategory.color} opacity-30`}></div>
                  
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </button>
                  
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-3xl font-bold mb-2">{selectedCategory.name}</h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Package className="w-5 h-5" />
                        <span>{selectedCategory.productCount} products</span>
                      </div>
                      {selectedCategory.featured && (
                        <div className="flex items-center space-x-1 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                          <Star className="w-4 h-4 fill-current" />
                          <span>Featured</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Modal Body */}
                <div className="p-8">
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    {selectedCategory.description}
                  </p>
                  
                  {/* Featured Products */}
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Sparkles className="w-6 h-6 text-yellow-500 mr-2" />
                      Featured Products
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {getFeaturedProducts(selectedCategory.id).map((product) => (
                        <div key={product.id} className="bg-gray-50 rounded-2xl p-4 hover:shadow-lg transition-shadow duration-300">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-32 object-cover rounded-xl mb-4"
                          />
                          <h5 className="font-semibold text-gray-900 mb-2">{product.name}</h5>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-green-600">₹{product.price}</span>
                              <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span>{product.rating}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <div className="mt-8 text-center">
                    <button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                      Explore All {selectedCategory.name}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Categories;