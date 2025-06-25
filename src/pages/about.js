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
  Clock
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function AboutPage() {
  const stats = [
    { label: 'Happy Customers', value: '10,000+', icon: Users },
    { label: 'Products Available', value: '5,000+', icon: Target },
    { label: 'Years of Experience', value: '8+', icon: Award },
    { label: 'Daily Deliveries', value: '500+', icon: Truck }
  ];

  const values = [
    {
      icon: Leaf,
      title: 'Organic & Fresh',
      description: 'We source only the freshest organic produce directly from certified farms, ensuring quality and nutrition in every product.'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Our customers are at the heart of everything we do. We strive to exceed expectations with every order and interaction.'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick and reliable delivery service ensuring your groceries reach you fresh and on time, every time.'
    }
  ];

  const team = [
    {
      name: 'Raj Jumale',
      role: 'Founder & CEO',
      image: '/images/team/raj.jpg',
      description: 'Passionate about bringing fresh, quality groceries to every household in Pimpri(Kalgaon).'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Operations',
      image: '/images/team/priya.jpg',
      description: 'Ensures smooth operations and maintains our high standards of quality and service.'
    },
    {
      name: 'Amit Patil',
      role: 'Customer Experience Lead',
      image: '/images/team/amit.jpg',
      description: 'Dedicated to making every customer interaction exceptional and memorable.'
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

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-primary-600 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white"
              >
                <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                  Fresh Groceries, 
                  <span className="block text-secondary-400">Delivered with Care</span>
                </h1>
                <p className="text-xl mb-8 text-primary-100">
                  Since 2016, we've been Pimpri(Kalgaon)'s trusted grocery partner, 
                  delivering fresh, quality products right to your doorstep.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="secondary" size="lg">
                    Our Story
                  </Button>
                  <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary-600">
                    Contact Us
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <Image
                  src="/images/about-hero.jpg"
                  alt="Fresh groceries and vegetables"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl"
                  onError={(e) => {
                    e.target.src = '/images/placeholder.jpg';
                  }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Founded in 2016 with a simple mission: to make fresh, quality groceries accessible 
                  to every family in Pimpri(Kalgaon). What started as a small local initiative has 
                  grown into the region's most trusted grocery delivery service.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <Image
                    src="/images/our-story.jpg"
                    alt="Our journey"
                    width={500}
                    height={400}
                    className="rounded-lg shadow-lg"
                    onError={(e) => {
                      e.target.src = '/images/placeholder.jpg';
                    }}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">From Local Market to Digital Platform</h3>
                    <p className="text-gray-600">
                      We began by understanding the challenges families face in accessing fresh groceries. 
                      Long queues, limited variety, and time constraints motivated us to create a better solution.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Community-Centered Approach</h3>
                    <p className="text-gray-600">
                      By partnering with local farmers and suppliers, we've built a sustainable ecosystem 
                      that benefits everyone - from producers to consumers.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Technology Meets Tradition</h3>
                    <p className="text-gray-600">
                      We've combined traditional market values with modern technology to create 
                      an experience that's both convenient and personal.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These core values guide everything we do and help us deliver the best possible 
                experience to our customers.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Card className="h-full text-center hover:shadow-lg transition-shadow">
                      <Card.Body>
                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Icon className="w-8 h-8 text-primary-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                        <p className="text-gray-600">{value.description}</p>
                      </Card.Body>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The passionate people behind Jumale Grocery Shop who work tirelessly to bring 
                you the best grocery shopping experience.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <Card.Body>
                      <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/images/placeholder.jpg';
                          }}
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                      <p className="text-gray-600">{member.description}</p>
                    </Card.Body>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="py-16 bg-primary-600">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">Get in Touch</h2>
                <p className="text-xl mb-8 text-primary-100">
                  Have questions or want to know more? We're here to help!
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div className="flex flex-col items-center">
                    <MapPin className="w-8 h-8 mb-3 text-secondary-400" />
                    <h3 className="font-semibold mb-2">Visit Us</h3>
                    <p className="text-primary-100">Pimpri(Kalgaon), Maharashtra</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <Phone className="w-8 h-8 mb-3 text-secondary-400" />
                    <h3 className="font-semibold mb-2">Call Us</h3>
                    <p className="text-primary-100">+91 9876543210</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <Mail className="w-8 h-8 mb-3 text-secondary-400" />
                    <h3 className="font-semibold mb-2">Email Us</h3>
                    <p className="text-primary-100">support@jumalegrocery.com</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="secondary" size="lg">
                    Contact Support
                  </Button>
                  <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary-600">
                    Start Shopping
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}