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
  AlertCircle
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
      color: 'text-blue-600'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+91 9876543210', 'Customer Support', 'Mon-Sun: 9 AM - 9 PM'],
      color: 'text-green-600'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['support@jumalegrocery.com', 'info@jumalegrocery.com', 'Response within 24 hours'],
      color: 'text-red-600'
    },
    {
      icon: Clock,
      title: 'Delivery Hours',
      details: ['9:00 AM - 9:00 PM', 'All days of the week', '2-4 hour delivery'],
      color: 'text-purple-600'
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

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have a question, suggestion, or need help? We'd love to hear from you. 
              Reach out and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow">
                    <Card.Body>
                      <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4`}>
                        <Icon className={`w-6 h-6 ${info.color}`} />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-3">{info.title}</h3>
                      <div className="space-y-1">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-sm text-gray-600">{detail}</p>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <Card.Header>
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Send us a Message
                  </h2>
                </Card.Header>
                <Card.Body>
                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <Alert variant="success" className="mb-6" icon={true}>
                      <Alert.Title>Message Sent Successfully!</Alert.Title>
                      <Alert.Description>
                        Thank you for contacting us. We'll get back to you within 24 hours.
                      </Alert.Description>
                    </Alert>
                  )}

                  {submitStatus === 'error' && (
                    <Alert variant="error" className="mb-6" icon={true}>
                      <Alert.Title>Failed to Send Message</Alert.Title>
                      <Alert.Description>
                        Sorry, there was an error sending your message. Please try again or contact us directly.
                      </Alert.Description>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        error={formErrors.name}
                        placeholder="Your full name"
                        required
                      />
                      <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        error={formErrors.email}
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Phone Number (Optional)"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        error={formErrors.phone}
                        placeholder="9876543210"
                      />
                      <Input
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        error={formErrors.subject}
                        placeholder="What is this about?"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                          formErrors.message ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Tell us more about your question or feedback..."
                        required
                      />
                      {formErrors.message && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      loading={isSubmitting}
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full"
                    >
                      {isSubmitting ? 'Sending...' : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Card.Body>
              </Card>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              {/* FAQ */}
              <Card>
                <Card.Header>
                  <h3 className="font-semibold text-gray-900">Frequently Asked Questions</h3>
                </Card.Header>
                <Card.Body>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">What are your delivery hours?</h4>
                      <p className="text-sm text-gray-600">We deliver from 9:00 AM to 9:00 PM, all days of the week.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">What's your delivery area?</h4>
                      <p className="text-sm text-gray-600">We currently serve the entire Pimpri(Kalgaon) area.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Do you have a minimum order amount?</h4>
                      <p className="text-sm text-gray-600">Yes, we have a minimum order amount of ₹99. Orders above ₹500 get free delivery.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">How can I track my order?</h4>
                      <p className="text-sm text-gray-600">You can track your order in real-time through your account dashboard or the link sent via SMS.</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Quick Contact */}
              <Card>
                <Card.Header>
                  <h3 className="font-semibold text-gray-900">Need Immediate Help?</h3>
                </Card.Header>
                <Card.Body>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">Call us directly</p>
                        <p className="text-sm text-gray-600">+91 9876543210</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">WhatsApp us</p>
                        <p className="text-sm text-gray-600">Quick responses, anytime</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-medium text-gray-900">Email support</p>
                        <p className="text-sm text-gray-600">support@jumalegrocery.com</p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Store Hours */}
              <Card>
                <Card.Header>
                  <h3 className="font-semibold text-gray-900">Store Hours</h3>
                </Card.Header>
                <Card.Body>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Sunday</span>
                      <span className="font-medium text-gray-900">9:00 AM - 9:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Customer Support</span>
                      <span className="font-medium text-gray-900">24/7 Available</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Emergency Orders</span>
                      <span className="font-medium text-gray-900">Call for availability</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}