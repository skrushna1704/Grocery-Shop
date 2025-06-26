import Head from "next/head";
import {
  Truck,
  Shield,
  Clock,
} from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CategoriesSection from "@/components/CategoriesSection/CategoriesSection";
import FeaturesSection from "@/components/CategoriesSection/FeaturesSection";
import HeroSection from "@/components/CategoriesSection/HeroSection";
import FeaturedProductsSection from "@/components/CategoriesSection/FeaturedProductsSection";
import TestimonialsSection from "@/components/CategoriesSection/TestimonialsSection";
import CTASection from "@/components/CategoriesSection/CTASection";


export default function Home() {

  return (
    <>
      <Head>
        <title>
          Jumale Grocery Shop - Fresh Groceries Delivered in Pimpri(Kalgaon)
        </title>
        <meta
          name="description"
          content="Order fresh groceries online in Pimpri(Kalgaon). Fast delivery, quality products, competitive prices. Vegetables, fruits, dairy, and more."
        />
        <meta
          name="keywords"
          content="grocery delivery, fresh vegetables, fruits, Pimpri(Kalgaon), online grocery, food delivery"
        />
      </Head>

      <HeroSection />

      <FeaturesSection />

      <CategoriesSection />

      <FeaturedProductsSection />

      <TestimonialsSection />

      <CTASection />
    </>
  );
}
