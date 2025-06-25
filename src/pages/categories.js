import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Star, 
  ArrowRight,
  Search,
  Filter
} from 'lucide-react';
import Layout from '@/components/common/Layout/Layout';
import SearchBar from '@/components/common/SearchBar/SearchBar';
import ProductCard from '@/components/product/ProductCard/ProductCard';
import ProductFilters from '@/components/product/ProductFilters/ProductFilters';
import { formatPrice } from '@/utils/formatters';
import styles from '@/styles/Categories.module.css';

// Mock categories data
const categories = [
  {
    id: 1,
    name: 'Fresh Fruits & Vegetables',
    slug: 'fresh-fruits-vegetables',
    image: '/images/categories/fruits-vegetables.jpg',
    description: 'Fresh and organic fruits and vegetables',
    productCount: 45,
    featured: true
  },
  {
    id: 2,
    name: 'Dairy & Eggs',
    slug: 'dairy-eggs',
    image: '/images/categories/dairy-eggs.jpg',
    description: 'Fresh dairy products and farm eggs',
    productCount: 32,
    featured: true
  },
  {
    id: 3,
    name: 'Meat & Fish',
    slug: 'meat-fish',
    image: '/images/categories/meat-fish.jpg',
    description: 'Premium quality meat and fresh fish',
    productCount: 28,
    featured: true
  },
  {
    id: 4,
    name: 'Bakery & Bread',
    slug: 'bakery-bread',
    image: '/images/categories/bakery-bread.jpg',
    description: 'Freshly baked bread and pastries',
    productCount: 23,
    featured: false
  },
  {
    id: 5,
    name: 'Pantry Essentials',
    slug: 'pantry-essentials',
    image: '/images/categories/pantry-essentials.jpg',
    description: 'Basic pantry items and staples',
    productCount: 67,
    featured: false
  },
  {
    id: 6,
    name: 'Beverages',
    slug: 'beverages',
    image: '/images/categories/beverages.jpg',
    description: 'Soft drinks, juices, and hot beverages',
    productCount: 41,
    featured: false
  },
  {
    id: 7,
    name: 'Snacks & Chips',
    slug: 'snacks-chips',
    image: '/images/categories/snacks-chips.jpg',
    description: 'Delicious snacks and crispy chips',
    productCount: 38,
    featured: false
  },
  {
    id: 8,
    name: 'Frozen Foods',
    slug: 'frozen-foods',
    image: '/images/categories/frozen-foods.jpg',
    description: 'Convenient frozen meals and ingredients',
    productCount: 29,
    featured: false
  },
  {
    id: 9,
    name: 'Personal Care',
    slug: 'personal-care',
    image: '/images/categories/personal-care.jpg',
    description: 'Hygiene and personal care products',
    productCount: 52,
    featured: false
  },
  {
    id: 10,
    name: 'Household & Cleaning',
    slug: 'household-cleaning',
    image: '/images/categories/household-cleaning.jpg',
    description: 'Cleaning supplies and household items',
    productCount: 44,
    featured: false
  },
  {
    id: 11,
    name: 'Baby & Kids',
    slug: 'baby-kids',
    image: '/images/categories/baby-kids.jpg',
    description: 'Baby food, diapers, and kids products',
    productCount: 36,
    featured: false
  },
  {
    id: 12,
    name: 'Pet Supplies',
    slug: 'pet-supplies',
    image: '/images/categories/pet-supplies.jpg',
    description: 'Pet food and supplies',
    productCount: 25,
    featured: false
  }
];

// Mock featured products for each category
const getFeaturedProducts = (categoryId) => {
  const products = [
    {
      id: 1,
      name: 'Organic Bananas',
      price: 2.99,
      originalPrice: 3.49,
      image: '/images/products/bananas.jpg',
      rating: 4.5,
      reviewCount: 128,
      inStock: true,
      discount: 15
    },
    {
      id: 2,
      name: 'Fresh Strawberries',
      price: 4.99,
      originalPrice: 5.99,
      image: '/images/products/strawberries.jpg',
      rating: 4.8,
      reviewCount: 89,
      inStock: true,
      discount: 17
    },
    {
      id: 3,
      name: 'Organic Spinach',
      price: 3.49,
      originalPrice: 3.99,
      image: '/images/products/spinach.jpg',
      rating: 4.3,
      reviewCount: 67,
      inStock: true,
      discount: 13
    },
    {
      id: 4,
      name: 'Fresh Tomatoes',
      price: 2.49,
      originalPrice: 2.99,
      image: '/images/products/tomatoes.jpg',
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
  const regularCategories = categories.filter(cat => !cat.featured);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      <Head>
        <title>Categories - Jumale Kirana</title>
        <meta name="description" content="Browse all product categories at Jumale Kirana. Find fresh groceries, household items, and more." />
        <meta name="keywords" content="categories, groceries, fresh food, household items, online grocery" />
      </Head>

      {/* <Layout> */}
        <div className={styles.categoriesPage}>
          {/* Hero Section */}
          <section className={styles.heroSection}>
            <div className={styles.heroContent}>
              <motion.h1 
                className={styles.heroTitle}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Browse Categories
              </motion.h1>
              <motion.p 
                className={styles.heroSubtitle}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Discover our wide range of products organized by categories
              </motion.p>
            </div>
          </section>

          {/* Search and Filters */}
          <section className={styles.searchSection}>
            <div className={styles.searchContainer}>
              <SearchBar
                placeholder="Search categories..."
                value={searchTerm}
                onChange={setSearchTerm}
                className={styles.searchBar}
              />
              
              <div className={styles.filterControls}>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={styles.filterButton}
                >
                  <Filter className="w-5 h-5" />
                  Filters
                </button>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={styles.sortSelect}
                >
                  <option value="name">Sort by Name</option>
                  <option value="productCount">Sort by Product Count</option>
                  <option value="featured">Sort by Featured</option>
                </select>
              </div>
            </div>
          </section>

          {/* Featured Categories */}
          {featuredCategories.length > 0 && (
            <section className={styles.featuredSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Featured Categories</h2>
                <p className={styles.sectionDescription}>
                  Our most popular product categories
                </p>
              </div>
              
              <motion.div 
                className={styles.categoriesGrid}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {featuredCategories.map((category) => (
                  <motion.div
                    key={category.id}
                    className={styles.categoryCard}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={styles.categoryImageContainer}>
                      <img
                        src={category.image}
                        alt={category.name}
                        className={styles.categoryImage}
                        onError={(e) => {
                          e.target.src = '/images/placeholder-category.jpg';
                        }}
                      />
                      <div className={styles.categoryOverlay}>
                        <div className={styles.categoryBadge}>
                          <Star className="w-4 h-4" />
                          Featured
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.categoryContent}>
                      <h3 className={styles.categoryName}>{category.name}</h3>
                      <p className={styles.categoryDescription}>
                        {category.description}
                      </p>
                      <div className={styles.categoryMeta}>
                        <span className={styles.productCount}>
                          {category.productCount} products
                        </span>
                        <button className={styles.exploreButton}>
                          Explore
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </section>
          )}

          {/* All Categories */}
          <section className={styles.allCategoriesSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>All Categories</h2>
              <p className={styles.sectionDescription}>
                Browse all available product categories
              </p>
            </div>
            
            <motion.div 
              className={styles.categoriesGrid}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {sortedCategories.map((category) => (
                <motion.div
                  key={category.id}
                  className={styles.categoryCard}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={styles.categoryImageContainer}>
                    <img
                      src={category.image}
                      alt={category.name}
                      className={styles.categoryImage}
                      onError={(e) => {
                        e.target.src = '/images/placeholder-category.jpg';
                      }}
                    />
                  </div>
                  
                  <div className={styles.categoryContent}>
                    <h3 className={styles.categoryName}>{category.name}</h3>
                    <p className={styles.categoryDescription}>
                      {category.description}
                    </p>
                    <div className={styles.categoryMeta}>
                      <span className={styles.productCount}>
                        {category.productCount} products
                      </span>
                      <button className={styles.exploreButton}>
                        Explore
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Category Details Modal */}
          {selectedCategory && (
            <div className={styles.modalOverlay}>
              <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                  <h3 className={styles.modalTitle}>{selectedCategory.name}</h3>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={styles.closeButton}
                  >
                    ×
                  </button>
                </div>
                
                <div className={styles.modalBody}>
                  <p className={styles.modalDescription}>
                    {selectedCategory.description}
                  </p>
                  
                  <div className={styles.featuredProducts}>
                    <h4 className={styles.featuredProductsTitle}>
                      Featured Products
                    </h4>
                    <div className={styles.productsGrid}>
                      {getFeaturedProducts(selectedCategory.id).map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      {/* </Layout> */}
    </>
  );
};

export default Categories; 