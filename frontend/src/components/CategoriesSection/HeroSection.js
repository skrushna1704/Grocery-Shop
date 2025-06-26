'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ArrowRight, Truck, Clock, ShoppingCart, Star } from 'lucide-react';
import Button from '@/components/ui/Button'; // Adjust path as needed

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function HeroSection() {
  return (
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
  );
}