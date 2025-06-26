import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import Layout from '@/components/common/Layout';
import { storage } from '@/utils/storage';
import '@/styles/globals.css';

// Track page views for analytics
const trackPageView = (url) => {
  // Add your analytics tracking here
  // For example: gtag('config', 'GA_TRACKING_ID', { page_path: url });
  console.log('Page view:', url);
};

// Role-based routing component
const RoleBasedRouting = ({ children }) => {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    // Skip routing logic if still loading or not authenticated
    if (loading || !isAuthenticated) return;

    const currentPath = router.pathname;
    
    // If user is admin/shopkeeper and on customer pages, redirect to shopkeeper dashboard
    if (user?.role === 'admin' && currentPath === '/') {
      router.replace('/shopkeeper/dashboard');
      return;
    }

    // If user is customer and on shopkeeper pages, redirect to customer home
    if (user?.role === 'user' && currentPath.startsWith('/shopkeeper')) {
      router.replace('/');
      return;
    }

    // If user is admin and on login/register pages, redirect to shopkeeper dashboard
    if (user?.role === 'admin' && (currentPath === '/login' || currentPath === '/register')) {
      router.replace('/shopkeeper/dashboard');
      return;
    }

  }, [user, isAuthenticated, loading, router]);

  return children;
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Track page views
  useEffect(() => {
    const handleRouteChange = (url) => {
      trackPageView(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // Check for storage availability and warn if not available
  useEffect(() => {
    if (!storage.isStorageAvailable()) {
      console.warn('localStorage is not available. Some features may not work properly.');
    }
  }, []);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      console.log('Application is online');
      // You can add logic here to sync offline data or show a notification
    };

    const handleOffline = () => {
      console.log('Application is offline');
      // You can add logic here to show offline notification
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Get layout props from component if it exists
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  // Check if component needs custom layout
  const useCustomLayout = Component.useCustomLayout || false;

  // Create a more granular key for better remounting
  const componentKey = router.asPath;

  return (
    <>
      <Head>
        {/* Basic meta tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#16a34a" />
        
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        
        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </Head>

      {/* Context Providers */}
      <AuthProvider>
        <CartProvider>
          <RoleBasedRouting>
            {useCustomLayout ? (
              <Component key={componentKey} {...pageProps} />
            ) : (
              getLayout(<Component key={componentKey} {...pageProps} />)
            )}
          </RoleBasedRouting>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

// Error boundary for the entire app
MyApp.getInitialProps = async (appContext) => {
  // You can add global data fetching here if needed
  return {
    pageProps: {}
  };
};

export default MyApp;