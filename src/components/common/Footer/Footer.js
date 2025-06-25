import Link from 'next/link';
import Image from 'next/image';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Truck,
  Shield,
  Headphones
} from 'lucide-react';
import { COMPANY_INFO } from '@/utils/constants';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' }
    ],
    shop: [
      { name: 'All Products', href: '/products' },
      { name: 'Vegetables', href: '/products/category/vegetables' },
      { name: 'Fruits', href: '/products/category/fruits' },
      { name: 'Dairy', href: '/products/category/dairy' },
      { name: 'Grains', href: '/products/category/grains' }
    ],
    account: [
      { name: 'My Account', href: '/user/profile' },
      { name: 'Order History', href: '/user/orders' },
      { name: 'Wishlist', href: '/user/wishlist' },
      { name: 'Address Book', href: '/user/addresses' },
      { name: 'Track Order', href: '/track-order' }
    ],
    help: [
      { name: 'FAQ', href: '/faq' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Return Policy', href: '/returns' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' }
    ]
  };

  const features = [
    {
      icon: Truck,
      title: 'Free Delivery',
      description: 'On orders above ₹500'
    },
    {
      icon: Shield,
      title: 'Quality Guarantee',
      description: 'Fresh & premium quality'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Dedicated customer service'
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Features section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/images/jumaleLogo.png"
                alt="Jumale Grocery Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
                priority
              />
              <span className="text-xl font-bold text-white">Jumale Grocery</span>
            </div>
            
            <p className="text-gray-400 mb-6 max-w-md">
              Your trusted grocery partner in Pimpri(Kalgaon). We deliver fresh, 
              quality groceries right to your doorstep with the convenience you deserve.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span className="text-gray-400">{COMPANY_INFO.ADDRESS}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span className="text-gray-400">{COMPANY_INFO.PHONE}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span className="text-gray-400">{COMPANY_INFO.EMAIL}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span className="text-gray-400">24/7 Delivery Available</span>
              </div>
            </div>
          </div>

          {/* Footer links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Help</h3>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter subscription */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md">
            <h3 className="font-semibold text-white mb-2">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get special offers, free giveaways, and updates.
            </p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors duration-200 font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {currentYear} {COMPANY_INFO.NAME}. All rights reserved.
            </div>

            {/* Social links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Follow us:</span>
              <div className="flex space-x-3">
                <a
                  href={COMPANY_INFO.SOCIAL_MEDIA.FACEBOOK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={COMPANY_INFO.SOCIAL_MEDIA.INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-pink-600 transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={COMPANY_INFO.SOCIAL_MEDIA.TWITTER}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-400 transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Payment methods */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">We accept:</span>
              <div className="flex space-x-2">
                <div className="w-8 h-5 bg-gray-800 rounded text-xs flex items-center justify-center text-gray-400">
                  UPI
                </div>
                <div className="w-8 h-5 bg-gray-800 rounded text-xs flex items-center justify-center text-gray-400">
                  COD
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;