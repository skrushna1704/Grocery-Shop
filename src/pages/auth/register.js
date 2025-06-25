import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  AlertCircle, 
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Image from 'next/image';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated, loading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Reset form state when component mounts or route changes
  useEffect(() => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
    setIsSubmitting(false);
    setFormErrors({});
    setAcceptTerms(false);
    clearError();
  }, [router.asPath, clearError]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.replace('/');
    }
  }, [isAuthenticated, loading, router]);

  // Clear field-specific errors when user starts typing
  useEffect(() => {
    Object.keys(formData).forEach(field => {
      if (formErrors[field] && formData[field]) {
        setFormErrors(prev => ({ ...prev, [field]: '' }));
      }
    });
  }, [formData, formErrors]);

  const validateForm = () => {
    const errors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      errors.firstName = 'First name must be at least 2 characters';
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      errors.lastName = 'Last name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!formData.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit Indian phone number';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else {
      if (formData.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
      }
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // Terms acceptance
    if (!acceptTerms) {
      errors.terms = 'You must accept the terms and conditions';
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
      const { confirmPassword, ...registrationData } = formData;
      const result = await register(registrationData);
      
      if (result.success) {
        router.replace('/');
      }
    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format phone number
    if (name === 'phone') {
      const formattedPhone = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({
        ...prev,
        [name]: formattedPhone
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

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
        <title>Create Account - Jumale Grocery Shop</title>
        <meta name="description" content="Create your Jumale Grocery Shop account to start shopping for fresh groceries with fast delivery in Pimpri(Kalgaon)." />
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
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link 
              href="/auth/login" 
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Sign in here
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
                        Registration failed
                      </h3>
                      <p className="mt-1 text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={formErrors.firstName}
                    placeholder="John"
                    required
                    autoComplete="given-name"
                  />
                  <Input
                    label="Last Name"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={formErrors.lastName}
                    placeholder="Doe"
                    required
                    autoComplete="family-name"
                  />
                </div>

                {/* Email Field */}
                <Input
                  label="Email address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={formErrors.email}
                  leftIcon={<Mail className="w-4 h-4" />}
                  placeholder="john@example.com"
                  required
                  autoComplete="email"
                />

                {/* Phone Field */}
                <Input
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={formErrors.phone}
                  leftIcon={<Phone className="w-4 h-4" />}
                  placeholder="9876543210"
                  required
                  autoComplete="tel"
                  helperText="10-digit Indian mobile number"
                />

                {/* Password Field */}
                <div>
                  <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    error={formErrors.password}
                    leftIcon={<Lock className="w-4 h-4" />}
                    placeholder="Create a strong password"
                    required
                    autoComplete="new-password"
                  />
                  
                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${strengthColors[passwordStrength - 1] || 'bg-gray-300'}`}
                            style={{ width: `${(passwordStrength / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600">
                          {strengthLabels[passwordStrength - 1] || 'Too Short'}
                        </span>
                      </div>
                      
                      {/* Password Requirements */}
                      <div className="mt-2 space-y-1">
                        <div className={`flex items-center text-xs ${formData.password.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          At least 8 characters
                        </div>
                        <div className={`flex items-center text-xs ${/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Contains uppercase, lowercase, and number
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={formErrors.confirmPassword}
                  leftIcon={<Lock className="w-4 h-4" />}
                  placeholder="Confirm your password"
                  required
                  autoComplete="new-password"
                />

                {/* Terms and Conditions */}
                <div>
                  <div className="flex items-start">
                    <input
                      id="accept-terms"
                      name="accept-terms"
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="accept-terms" className="ml-2 block text-sm text-gray-900">
                      I agree to the{' '}
                      <Link href="/terms" className="font-medium text-primary-600 hover:text-primary-500" target="_blank">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="font-medium text-primary-600 hover:text-primary-500" target="_blank">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  {formErrors.terms && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.terms}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  loading={isSubmitting}
                  disabled={!acceptTerms || Object.keys(formData).some(key => !formData[key])}
                >
                  {isSubmitting ? 'Creating account...' : 'Create account'}
                </Button>
              </form>

              {/* Social Registration */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => alert('Google signup not implemented yet')}
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
                    onClick={() => alert('Facebook signup not implemented yet')}
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

          {/* Benefits */}
          <div className="mt-8">
            <Card>
              <Card.Body padding="sm">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Why create an account?
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Track your orders in real-time
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Save multiple delivery addresses
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Get personalized recommendations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Exclusive offers and early access
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

// Use custom layout for auth pages
RegisterPage.useCustomLayout = true;