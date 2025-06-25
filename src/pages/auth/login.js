import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, loading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Reset form state when component mounts or route changes
  useEffect(() => {
    setFormData({
      email: '',
      password: ''
    });
    setShowPassword(false);
    setIsSubmitting(false);
    setFormErrors({});
    clearError();
  }, [router.asPath, clearError]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !loading) {
      const redirectTo = router.query.redirect || '/';
      router.replace(redirectTo);
    }
  }, [isAuthenticated, loading, router]);

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
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
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
        const redirectTo = router.query.redirect || '/';
        router.replace(redirectTo);
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
  };

  // Demo credentials for testing
  const demoCredentials = [
    { email: 'customer@example.com', password: 'password123', role: 'Customer' },
    { email: 'vendor@example.com', password: 'password123', role: 'Vendor' },
    { email: 'admin@example.com', password: 'password123', role: 'Admin' }
  ];

  const fillDemoCredentials = (demo) => {
    setFormData({
      email: demo.email,
      password: demo.password
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Sign In - Jumale Grocery Shop</title>
        <meta name="description" content="Sign in to your Jumale Grocery Shop account to access your orders, wishlist, and personalized shopping experience." />
      </Head>

      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* Logo */}
          <Link href="/" className="flex justify-center">
            <div className="flex items-center space-x-2">
              <Image
                src="/images/jumaleLogo.png"
                alt="Jumale Grocery Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
                priority
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">Jumale Grocery</h1>
              </div>
            </div>
          </Link>

          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link 
              href="/auth/register" 
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              create a new account
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <Card>
            <Card.Body>
              {/* Error Alert */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md"
                >
                  <div className="flex">
                    <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-medium text-red-800">
                        Sign in failed
                      </h3>
                      <p className="mt-1 text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Demo Credentials */}
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <h3 className="text-sm font-medium text-blue-800 mb-2">
                  Demo Credentials (For Testing)
                </h3>
                <div className="space-y-2">
                  {demoCredentials.map((demo, index) => (
                    <button
                      key={index}
                      onClick={() => fillDemoCredentials(demo)}
                      className="block w-full text-left text-xs text-blue-700 hover:text-blue-900 hover:bg-blue-100 p-2 rounded transition-colors"
                    >
                      <span className="font-medium">{demo.role}:</span> {demo.email}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <Input
                  label="Email address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={formErrors.email}
                  leftIcon={<Mail className="w-4 h-4" />}
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                />

                {/* Password Field */}
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={formErrors.password}
                  leftIcon={<Lock className="w-4 h-4" />}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />

                {/* Remember me and Forgot password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link 
                      href="/auth/forgot-password" 
                      className="font-medium text-primary-600 hover:text-primary-500"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  loading={isSubmitting}
                  disabled={!formData.email || !formData.password}
                >
                  {isSubmitting ? 'Signing in...' : 'Sign in'}
                </Button>
              </form>

              {/* Social Login (Placeholder) */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => alert('Google login not implemented yet')}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="ml-2">Google</span>
                  </Button>

                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => alert('Facebook login not implemented yet')}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="ml-2">Facebook</span>
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Terms */}
          <p className="mt-8 text-center text-xs text-gray-600">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="font-medium text-primary-600 hover:text-primary-500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="font-medium text-primary-600 hover:text-primary-500">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

// Use custom layout for auth pages
LoginPage.useCustomLayout = true;