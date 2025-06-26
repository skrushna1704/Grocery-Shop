import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  Award, 
  Truck, 
  Leaf, 
  Heart,
  MapPin,
  Phone,
  Mail,
  Star,
  Shield,
  Clock
} from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { label: 'Happy Customers', value: '10,000+', icon: Users },
    { label: 'Products Available', value: '5,000+', icon: Target },
    { label: 'Years of Experience', value: '8+', icon: Award },
    { label: 'Daily Deliveries', value: '500+', icon: Truck }
  ];

  const features = [
    {
      icon: Leaf,
      title: 'Fresh & Organic',
      description: 'Quality produce directly from certified farms'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your satisfaction is our top priority'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick and reliable delivery service'
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'Every product meets our high standards'
    }
  ];

  return (
    <>
      <Head>
        <title>About Us - Jumale Grocery Shop</title>
        <meta 
          name="description" 
          content="Learn about Jumale Grocery Shop - your trusted partner for fresh, organic groceries in Pimpri(Kalgaon). Quality products, fast delivery, exceptional service." 
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-72 h-72 bg-green-200 bg-opacity-30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200 bg-opacity-20 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                About{' '}
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Jumale Grocery
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
                Since 2016, we've been Pimpri(Kalgaon)'s trusted grocery partner, 
                delivering fresh, quality products right to your doorstep.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                      className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white border-opacity-20"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop"
                      alt="Fresh groceries and vegetables"
                      className="rounded-3xl shadow-2xl w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      Founded with a simple mission: to make fresh, quality groceries accessible 
                      to every family in Pimpri(Kalgaon). What started as a small local initiative has 
                      grown into the region's most trusted grocery delivery service.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                        <Star className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Quality First</h3>
                        <p className="text-gray-600">Every product is carefully selected and quality-checked.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                        <Users className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Community Focused</h3>
                        <p className="text-gray-600">Supporting local farmers and serving our neighbors.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                        <Clock className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Always Reliable</h3>
                        <p className="text-gray-600">On-time delivery and consistent service you can trust.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white bg-opacity-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're committed to providing the best grocery shopping experience with these core values.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white border-opacity-20 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}