import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../Header';
import Footer from '../Footer';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import styles from './Layout.module.css';

const Layout = ({ 
  children, 
  title = 'Jumale Grocery Shop',
  description = 'Fresh groceries delivered to your doorstep in Pimpri(Kalgaon)',
  keywords = 'grocery, fresh, delivery, Pimpri(Kalgaon), vegetables, fruits',
  noHeader = false,
  noFooter = false,
  containerClass = '',
  pageClass = ''
}) => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { itemCount } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  // Handle route change loading
  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  // Generate dynamic title
  const getPageTitle = () => {
    if (title === 'Jumale Grocery Shop') {
      return title;
    }
    return `${title} | Jumale Grocery Shop`;
  };

  // Generate structured data
  const getStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Jumale Grocery Shop',
      description: description,
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://jumalegrocery.com',
      logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jumalegrocery.com'}/images/jumaleLogo.png`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-9876543210',
        contactType: 'customer service',
        areaServed: 'Pimpri(Kalgaon), Maharashtra, India'
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Pimpri(Kalgaon)',
        addressRegion: 'Maharashtra',
        addressCountry: 'India'
      }
    };

    // Add grocery store data for relevant pages
    if (router.pathname === '/' || router.pathname.includes('/products')) {
      return {
        ...baseData,
        '@type': 'GroceryStore',
        priceRange: '₹₹',
        servesCuisine: 'Indian',
        currenciesAccepted: 'INR',
        paymentAccepted: ['Cash', 'Credit Card', 'UPI']
      };
    }

    return baseData;
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };

  return (
    <>
      <Head>
        <title>{getPageTitle()}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph */}
        <meta property="og:title" content={getPageTitle()} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`} />
        <meta property="og:image" content="/images/jumaleLogo.png" />
        <meta property="og:site_name" content="Jumale Grocery Shop" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getPageTitle()} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="/images/jumaleLogo.png" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme */}
        <meta name="theme-color" content="#16a34a" />
        <meta name="msapplication-TileColor" content="#16a34a" />
        
        {/* Structured Data */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }}
        />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`} />
      </Head>

      <div className={`min-h-screen flex flex-col bg-gray-50 ${pageClass}`}>
        {/* Loading indicator */}
        {isLoading && (
          <div className="fixed top-0 left-0 w-full h-1 bg-primary-200 z-50">
            <div className="h-full bg-primary-500 animate-pulse" />
          </div>
        )}

        {/* Header */}
        {!noHeader && <Header />}

        {/* Main content */}
        <main className="flex-1">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={router.asPath}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className={containerClass}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        {!noFooter && <Footer />}

        {/* Cart floating indicator - only show if items in cart */}
        {itemCount > 0 && router.pathname !== '/cart' && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="fixed bottom-6 right-6 z-40 lg:hidden"
          >
            <button
              onClick={() => router.push('/cart')}
              className="bg-primary-500 text-white p-3 rounded-full shadow-lg hover:bg-primary-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6 0a1 1 0 100-2 1 1 0 000 2zm-8 0a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            </button>
          </motion.div>
        )}

        {/* Back to top button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-6 left-6 bg-white text-gray-600 p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors z-40 hidden lg:block"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      </div>
    </>
  );
};

export default Layout;