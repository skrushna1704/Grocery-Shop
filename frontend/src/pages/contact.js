import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send,
  CheckCircle,
  AlertCircle,
  Sparkles,
  HeadphonesIcon,
  Globe,
  Users
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Alert from '@/components/ui/Alert';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Store',
      details: ['Pimpri(Kalgaon)', 'Maharashtra, India', 'PIN: 411017'],
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+91 9359881657', 'Customer Support', 'Mon-Sun: 9 AM - 9 PM'],
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['support@jumalegrocery.com', 'info@jumalegrocery.com', 'Response within 24 hours'],
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-50'
    },
    {
      icon: Clock,
      title: 'Delivery Hours',
      details: ['9:00 AM - 9:00 PM', 'All days of the week', '2-4 hour delivery'],
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-50'
    }
  ];

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    if (formData.phone && !/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear field-specific error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us - Jumale Grocery Shop</title>
        <meta 
          name="description" 
          content="Get in touch with Jumale Grocery Shop. Contact us for support, questions, or feedback. We're here to help with your grocery needs." 
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-green-200 bg-opacity-30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200 bg-opacity-20 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-100 bg-opacity-10 rounded-full blur-3xl"></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-20 text-green-300 opacity-60"
          >
            <MessageCircle className="w-12 h-12" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-32 right-32 text-blue-300 opacity-50"
          >
            <Sparkles className="w-16 h-16" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -25, 0], x: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-32 left-32 text-teal-300 opacity-40"
          >
            <HeadphonesIcon className="w-14 h-14" />
          </motion.div>
        </div>

        <div className="relative z-10 py-12">
          <div className="container mx-auto px-4">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 text-green-800 px-6 py-3 rounded-full text-sm font-medium mb-6">
                <Users className="w-5 h-5 text-green-600" />
                <span>We're Here to Help</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Get in{' '}
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Touch
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Have a question, suggestion, or need help? We'd love to hear from you. 
                Reach out and we'll get back to you as soon as possible.
              </p>
            </motion.div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-white border-opacity-20 text-center hover:shadow-2xl transition-all duration-500 h-full">
                      <div className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-3">{info.title}</h3>
                      <div className="space-y-2">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-sm text-gray-600">{detail}</p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white border-opacity-20 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                      <MessageCircle className="w-6 h-6 mr-3" />
                      Send us a Message
                    </h2>
                    <p className="text-green-100 mt-2">We'll respond within 24 hours</p>
                  </div>
                  
                  <div className="p-8">
                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl"
                      >
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          <div>
                            <h3 className="font-semibold text-green-800">Message Sent Successfully!</h3>
                            <p className="text-sm text-green-700 mt-1">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl"
                      >
                        <div className="flex items-center">
                          <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                          <div>
                            <h3 className="font-semibold text-red-800">Failed to Send Message</h3>
                            <p className="text-sm text-red-700 mt-1">Sorry, there was an error sending your message. Please try again or contact us directly.</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                          <input
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-gray-50 focus:bg-white ${
                              formErrors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                            }`}
                            placeholder="Your full name"
                            required
                          />
                          {formErrors.name && (
                            <p className="mt-2 text-sm text-red-600">{formErrors.name}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-gray-50 focus:bg-white ${
                              formErrors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                            }`}
                            placeholder="your@email.com"
                            required
                          />
                          {formErrors.email && (
                            <p className="mt-2 text-sm text-red-600">{formErrors.email}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number (Optional)</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-gray-50 focus:bg-white ${
                              formErrors.phone ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                            }`}
                            placeholder="9359881657"
                          />
                          {formErrors.phone && (
                            <p className="mt-2 text-sm text-red-600">{formErrors.phone}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
                          <input
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-gray-50 focus:bg-white ${
                              formErrors.subject ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                            }`}
                            placeholder="What is this about?"
                            required
                          />
                          {formErrors.subject && (
                            <p className="mt-2 text-sm text-red-600">{formErrors.subject}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={6}
                          className={`w-full px-4 py-3 border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-gray-50 focus:bg-white resize-none ${
                            formErrors.message ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                          }`}
                          placeholder="Tell us more about your question or feedback..."
                          required
                        />
                        {formErrors.message && (
                          <p className="mt-2 text-sm text-red-600">{formErrors.message}</p>
                        )}
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed text-lg"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                            Sending...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </div>
                        )}
                      </motion.button>
                    </form>
                  </div>
                </div>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="space-y-8"
              >
                {/* FAQ */}
                <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-lg border border-white border-opacity-20">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 rounded-t-3xl">
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <Globe className="w-5 h-5 mr-3" />
                      Frequently Asked Questions
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-5">
                      <div className="border-l-4 border-purple-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">What are your delivery hours?</h4>
                        <p className="text-sm text-gray-600">We deliver from 9:00 AM to 9:00 PM, all days of the week.</p>
                      </div>
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">What's your delivery area?</h4>
                        <p className="text-sm text-gray-600">We currently serve the entire Pimpri(Kalgaon) area.</p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Do you have a minimum order amount?</h4>
                        <p className="text-sm text-gray-600">Yes, we have a minimum order amount of ₹99. Orders above ₹500 get free delivery.</p>
                      </div>
                      <div className="border-l-4 border-orange-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">How can I track my order?</h4>
                        <p className="text-sm text-gray-600">You can track your order in real-time through your account dashboard or the link sent via SMS.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Contact */}
                <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-lg border border-white border-opacity-20">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 rounded-t-3xl">
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <HeadphonesIcon className="w-5 h-5 mr-3" />
                      Need Immediate Help?
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center space-x-4 p-4 bg-green-50 rounded-2xl border border-green-100 hover:shadow-md transition-all duration-300"
                      >
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Call us directly</p>
                          <p className="text-sm text-gray-600">+91 9359881657</p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center space-x-4 p-4 bg-blue-50 rounded-2xl border border-blue-100 hover:shadow-md transition-all duration-300"
                      >
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                          <MessageCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">WhatsApp us</p>
                          <p className="text-sm text-gray-600">Quick responses, anytime</p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center space-x-4 p-4 bg-red-50 rounded-2xl border border-red-100 hover:shadow-md transition-all duration-300"
                      >
                        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                          <Mail className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Email support</p>
                          <p className="text-sm text-gray-600">support@jumalegrocery.com</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Store Hours */}
                <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-lg border border-white border-opacity-20">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-t-3xl">
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <Clock className="w-5 h-5 mr-3" />
                      Store Hours
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                        <span className="text-gray-600 font-medium">Monday - Sunday</span>
                        <span className="font-bold text-gray-900 text-lg">9:00 AM - 9:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                        <span className="text-gray-600 font-medium">Customer Support</span>
                        <span className="font-bold text-green-700 text-lg">24/7 Available</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                        <span className="text-gray-600 font-medium">Emergency Orders</span>
                        <span className="font-bold text-blue-700 text-lg">Call for availability</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}