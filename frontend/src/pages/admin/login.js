import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, AlertCircle, Shield, Crown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, loading, error, clearError, user } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Reset form state when component mounts
  useEffect(() => {
    setFormData({
      email: '',
      password: ''
    });
    setShowPassword(false);
    setIsSubmitting(false);
    setFormErrors({});
    clearError();
    // eslint-disable-next-line
  }, []); // Only run once on mount

  // Redirect if already authenticated as admin
  useEffect(() => {
    if (isAuthenticated && !loading && user) {
      if (user.role === 'admin') {
        router.replace('/admin/dashboard');
      } else {
        // If user is not admin, redirect to regular dashboard
        router.replace('/');
      }
    }
  }, [isAuthenticated, loading, user, router]);

  // Clear field-specific errors when user starts typing
  useEffect(() => {
    if (formErrors.email && formData.email) {
      setFormErrors(prev => ({ ...prev, email: '' }));
    }
    if (formErrors.password && formData.password) {
      setFormErrors(prev => ({ ...prev, password: '' }));
    }
  }, [formData, formErrors]);

  const validateForm = () => {
    const errors = {};

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    clearError();

    try {
      const result = await login(formData);
      
      if (result.success) {
        // Check if user is admin
        if (result.user.role === 'admin') {
          router.replace('/admin/dashboard');
        } else {
          // If not admin, show error
          setFormErrors({ general: 'Access denied. Admin privileges required.' });
        }
      }
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field-specific errors when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Check if form is valid for button state
  const isFormValid = formData.email.trim() && formData.password && !isSubmitting;

  // Debug logging
  useEffect(() => {
    console.log('Form state:', {
      email: formData.email,
      password: formData.password ? '***' : '',
      isFormValid,
      isSubmitting,
      errors: formErrors
    });
  }, [formData, isFormValid, isSubmitting, formErrors]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600 mb-4"></div>
          <p className="text-purple-200">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Login - Jumale Grocery Shop</title>
        <meta name="description" content="Admin login for Jumale Grocery Shop management system." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 bg-opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-violet-500 bg-opacity-20 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500 bg-opacity-10 rounded-full blur-3xl"></div>
        </div>

        <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative z-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-violet-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                    Jumale Grocery
                  </h1>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mt-8"
            >
              <div className="flex items-center justify-center mb-4">
                <Crown className="w-8 h-8 text-purple-400 mr-3" />
                <h2 className="text-3xl font-bold text-white">
                  Admin Portal
                </h2>
              </div>
              <p className="text-lg text-purple-200">
                Access your management dashboard
              </p>
            </motion.div>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20">
                <div className="px-8 py-10">
                  {/* Error Alert */}
                  {(error || formErrors.general) && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-2xl"
                    >
                      <div className="flex">
                        <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="text-sm font-semibold text-red-200">
                            Login failed
                          </h3>
                          <p className="mt-1 text-sm text-red-100">{error || formErrors.general}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-semibold text-purple-200 mb-2">
                        Admin Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="w-5 h-5 text-purple-300" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 bg-white/10 border-2 border-purple-300/30 rounded-2xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 transition-all duration-300 text-lg text-white placeholder-purple-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder="Enter admin email"
                          required
                          autoComplete="email"
                          disabled={isSubmitting}
                        />
                      </div>
                      {formErrors.email && (
                        <p className="mt-2 text-sm text-red-300">{formErrors.email}</p>
                      )}
                    </div>

                    {/* Password Field */}
                    <div>
                      <label className="block text-sm font-semibold text-purple-200 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="w-5 h-5 text-purple-300" />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-12 py-4 bg-white/10 border-2 border-purple-300/30 rounded-2xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 transition-all duration-300 text-lg text-white placeholder-purple-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder="Enter password"
                          required
                          autoComplete="current-password"
                          disabled={isSubmitting}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5 text-purple-300 hover:text-purple-200" />
                          ) : (
                            <Eye className="w-5 h-5 text-purple-300 hover:text-purple-200" />
                          )}
                        </button>
                      </div>
                      {formErrors.password && (
                        <p className="mt-2 text-sm text-red-300">{formErrors.password}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={!isFormValid}
                      whileHover={isFormValid ? { scale: 1.02 } : {}}
                      whileTap={isFormValid ? { scale: 0.98 } : {}}
                      className={`w-full font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg text-lg ${
                        isFormValid 
                          ? 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white hover:shadow-xl' 
                          : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                      }`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                          Signing in...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Shield className="w-5 h-5 mr-2" />
                          {isFormValid ? 'Access Admin Panel' : 'Fill in all fields'}
                        </div>
                      )}
                    </motion.button>
                  </form>

                  {/* Back to Main Site */}
                  <div className="mt-6 text-center">
                    <Link 
                      href="/" 
                      className="text-purple-300 hover:text-purple-200 transition-colors duration-200 text-sm"
                    >
                      ← Back to Main Site
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
} 