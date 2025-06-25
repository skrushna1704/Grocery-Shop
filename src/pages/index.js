import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Truck, 
  Shield, 
  Clock, 
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/product/ProductCard';
import { useCart } from '@/context/CartContext';
import styles from '@/styles/Home.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Mock data for demonstration
const categories = [
  {
    id: 1,
    name: 'Fresh Vegetables',
    image: '/images/categories/vegetables.jpg',
    href: '/products/category/vegetables',
    color: 'bg-green-500'
  },
  {
    id: 2,
    name: 'Fresh Fruits',
    image: '/images/categories/fruits.jpg',
    href: '/products/category/fruits',
    color: 'bg-orange-500'
  },
  {
    id: 3,
    name: 'Dairy Products',
    image: '/images/categories/dairy.jpg',
    href: '/products/category/dairy',
    color: 'bg-blue-500'
  },
  {
    id: 4,
    name: 'Grains & Cereals',
    image: '/images/categories/grains.jpg',
    href: '/products/category/grains',
    color: 'bg-yellow-500'
  },
  {
    id: 5,
    name: 'Snacks',
    image: '/images/categories/snacks.jpg',
    href: '/products/category/snacks',
    color: 'bg-purple-500'
  },
  {
    id: 6,
    name: 'Beverages',
    image: '/images/categories/beverages.jpg',
    href: '/products/category/beverages',
    color: 'bg-red-500'
  }
];

const featuredProducts = [
  {
    id: 1,
    name: 'Fresh Organic Tomatoes',
    price: 45,
    originalPrice: 60,
    images: ['/images/products/tomatoes.jpg'],
    rating: 4.5,
    reviewCount: 128,
    category: 'vegetables',
    unit: 'per kg',
    inStock: true,
    stockQuantity: 50,
    vendor: { id: 1, name: 'Fresh Farm', rating: 4.8 },
    discount: 25
  },
  {
    id: 2,
    name: 'Organic Bananas',
    price: 35,
    originalPrice: 40,
    images: ['/images/products/bananas.jpg'],
    rating: 4.3,
    reviewCount: 89,
    category: 'fruits',
    unit: 'per dozen',
    inStock: true,
    stockQuantity: 30,
    vendor: { id: 2, name: 'Organic Valley', rating: 4.6 },
    discount: 12
  },
  {
    id: 3,
    name: 'Fresh Whole Milk',
    price: 28,
    originalPrice: 32,
    images: ['/images/products/milk.jpg'],
    rating: 4.7,
    reviewCount: 156,
    category: 'dairy',
    unit: 'per liter',
    inStock: true,
    stockQuantity: 25,
    vendor: { id: 3, name: 'Daily Fresh', rating: 4.9 },
    discount: 15
  },
  {
    id: 4,
    name: 'Basmati Rice Premium',
    price: 120,
    originalPrice: 150,
    images: ['/images/products/rice.jpg'],
    rating: 4.6,
    reviewCount: 203,
    category: 'grains',
    unit: 'per kg',
    inStock: true,
    stockQuantity: 40,
    vendor: { id: 4, name: 'Golden Grains', rating: 4.7 },
    discount: 20
  }
];

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Pimpri',
    rating: 5,
    comment: 'Amazing quality products and super fast delivery! Fresh vegetables exactly as shown.',
    avatar: '/images/avatars/user1.jpg'
  },
  {
    id: 2,
    name: 'Rajesh Patil',
    location: 'Chinchwad',
    rating: 5,
    comment: 'Best grocery service in the area. Always fresh products and excellent customer service.',
    avatar: '/images/avatars/user2.jpg'
  },
  {
    id: 3,
    name: 'Anjali Desai',
    location: 'Pimpri(Kalgaon)',
    rating: 4,
    comment: 'Great variety and competitive prices. The delivery is always on time.',
    avatar: '/images/avatars/user3.jpg'
  }
];

const features = [
  {
    icon: Truck,
    title: 'Free Fast Delivery',
    description: 'Free delivery on orders above ₹500. Get your groceries delivered in 2-4 hours.'
  },
  {
    icon: Shield,
    title: 'Quality Guarantee',
    description: 'We ensure the highest quality products. 100% fresh or your money back.'
  },
  {
    icon: Clock,
    title: '24/7 Service',
    description: 'Order anytime, anywhere. Our service is available round the clock.'
  }
];

export default function Home() {
  const { addToCart } = useCart();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      <Head>
        <title>Jumale Grocery Shop - Fresh Groceries Delivered in Pimpri(Kalgaon)</title>
        <meta 
          name="description" 
          content="Order fresh groceries online in Pimpri(Kalgaon). Fast delivery, quality products, competitive prices. Vegetables, fruits, dairy, and more." 
        />
        <meta 
          name="keywords" 
          content="grocery delivery, fresh vegetables, fruits, Pimpri(Kalgaon), online grocery, food delivery" 
        />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-50 to-green-50 overflow-hidden">
        <div className="container mx-auto px-4 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Fresh Groceries
                  <span className="text-primary-600 block">Delivered Fast</span>
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 max-w-lg">
                  Get the freshest vegetables, fruits, and groceries delivered to your doorstep in Pimpri(Kalgaon). Quality guaranteed, prices unbeatable.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size='lg' className="w-full sm:w-auto">
                    Shop Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-primary-500" />
                  <span>Free delivery above ₹500</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary-500" />
                  <span>2-4 hour delivery</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3500, disableOnInteraction: false }}
                  loop
                  className="rounded-2xl shadow-2xl"
                  style={{ width: 600, height: 500 }}
                >
                  <SwiperSlide>
                    <Image
                      src="/images/banner1.jpg"
                      alt="Banner 1"
                      width={600}
                      height={500}
                      className="rounded-2xl object-cover w-full h-full"
                      priority
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src="/images/banner2.png"
                      alt="Banner 2"
                      width={600}
                      height={500}
                      className="rounded-2xl object-cover w-full h-full"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src="/images/banner3.png"
                      alt="Banner 3"
                      width={600}
                      height={500}
                      className="rounded-2xl object-cover w-full h-full"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src="/images/banner4.jpeg"
                      alt="Banner 4"
                      width={600}
                      height={500}
                      className="rounded-2xl object-cover w-full h-full"
                    />
                  </SwiperSlide>
                </Swiper>
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg z-20"
                >
                  <ShoppingCart className="w-8 h-8 text-primary-500" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-4 -left-4 bg-secondary-500 rounded-full p-4 shadow-lg z-20"
                >
                  <Star className="w-8 h-8 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of fresh products categorized for your convenience
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {categories.map((category) => (
              <motion.div key={category.id} variants={itemVariants}>
                <Link href={category.href} className="group block">
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 text-center">
                    <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}>
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={32}
                        height={32}
                        className="w-8 h-8 object-cover rounded"
                        onError={(e) => {
                          e.target.src = '/images/placeholder.jpg';
                        }}
                      />
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm">{category.name}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-center mb-12"
          >
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-lg text-gray-600">
                Hand-picked fresh products just for you
              </p>
            </div>
            <Link href="/products">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600">
              Trusted by thousands of families in Pimpri(Kalgaon)
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-white rounded-xl p-8 shadow-sm text-center"
              >
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg text-gray-700 mb-6">
                  "{testimonials[currentTestimonial].comment}"
                </blockquote>
                <div className="flex items-center justify-center space-x-3">
                  <Image
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = '/images/placeholder.jpg';
                    }}
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</p>
                    <p className="text-sm text-gray-600">{testimonials[currentTestimonial].location}</p>
                  </div>
                </div>
              </motion.div>

              {/* Navigation buttons */}
              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-gray-900"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-primary-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-white"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Start Shopping?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of satisfied customers and get fresh groceries delivered to your doorstep today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Browse Products
                  <ShoppingCart className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="lg" variant="outline" className=" text-black w-full sm:w-auto border-white hover:bg-white hover:text-primary-600">
                  Create Account
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}