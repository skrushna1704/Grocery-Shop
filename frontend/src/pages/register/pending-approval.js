import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Mail, 
  Shield, 
  CheckCircle,
  ArrowLeft,
  Home
} from 'lucide-react';
import Image from 'next/image';

export default function PendingApproval() {
  const router = useRouter();

  // Redirect if user is already authenticated
  useEffect(() => {
    // You can add logic here to check if user is already approved
  }, []);

  return (
    <>
      <Head>
        <title>Pending Approval - Jumale Grocery Shop</title>
        <meta name="description" content="Your shopkeeper account is pending approval from our admin team." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Link href="/" className="flex items-center justify-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-2xl p-3 shadow-lg">
                  <Image
                    src="/images/jumaleLogo.png"
                    alt="Jumale Grocery Logo"
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain"
                    priority
                  />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Jumale Grocery
                </h1>
              </div>
            </Link>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8"
          >
            {/* Icon */}
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Pending Approval
              </h2>
              <p className="text-gray-600">
                Your shopkeeper account is under review
              </p>
            </div>

            {/* Status Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-blue-800 mb-1">
                    Account Status: Pending
                  </h3>
                  <p className="text-sm text-blue-700">
                    Our admin team will review your application within 24-48 hours.
                  </p>
                </div>
              </div>
            </div>

            {/* What happens next */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900">What happens next?</h3>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-semibold text-blue-600">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Review Process</p>
                    <p className="text-sm text-gray-600">Our team will verify your details and business information</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-semibold text-blue-600">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email Notification</p>
                    <p className="text-sm text-gray-600">You'll receive an email once your account is approved</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Start Managing</p>
                    <p className="text-sm text-gray-600">Once approved, you can access your shopkeeper dashboard</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-gray-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-1">
                    Need help?
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Contact our support team if you have any questions:
                  </p>
                  <a 
                    href="mailto:support@jumalekirana.com" 
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    support@jumalekirana.com
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link 
                href="/login"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Link>
              
              <Link 
                href="/"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center"
              >
                <Home className="w-4 h-4 mr-2" />
                Go to Homepage
              </Link>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <p className="text-sm text-gray-500">
              Thank you for choosing Jumale Grocery Shop
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
} 