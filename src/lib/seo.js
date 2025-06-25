// SEO utilities
export const seo = {
  // Default meta tags
  default: {
    title: 'Jumale Grocery Shop - Fresh Groceries Delivered',
    description: 'Get fresh groceries delivered to your doorstep. Quality products, fast delivery, and great prices.',
    keywords: 'grocery, fresh food, online grocery, delivery, vegetables, fruits, dairy',
    image: '/images/jumaleLogo.png',
    url: 'https://jumale-grocery-shop.com',
  },

  // Generate meta tags for a page
  generateMetaTags: (pageMeta = {}) => {
    const meta = { ...seo.default, ...pageMeta }
    
    return [
      // Basic meta tags
      { name: 'description', content: meta.description },
      { name: 'keywords', content: meta.keywords },
      { name: 'author', content: 'Jumale Grocery Shop' },
      
      // Open Graph tags
      { property: 'og:title', content: meta.title },
      { property: 'og:description', content: meta.description },
      { property: 'og:image', content: meta.image },
      { property: 'og:url', content: meta.url },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Jumale Grocery Shop' },
      
      // Twitter Card tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: meta.title },
      { name: 'twitter:description', content: meta.description },
      { name: 'twitter:image', content: meta.image },
      
      // Additional meta tags
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ]
  },

  // Generate structured data for products
  generateProductStructuredData: (product) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: product.image,
      sku: product.sku,
      brand: {
        '@type': 'Brand',
        name: product.brand || 'Jumale'
      },
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'INR',
        availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        seller: {
          '@type': 'Organization',
          name: 'Jumale Grocery Shop'
        }
      }
    }
  },

  // Generate structured data for organization
  generateOrganizationStructuredData: () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Jumale Grocery Shop',
      url: 'https://jumale-grocery-shop.com',
      logo: 'https://jumale-grocery-shop.com/images/logo.png',
      description: 'Your trusted source for fresh groceries delivered to your doorstep.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Grocery Street',
        addressLocality: 'Mumbai',
        addressRegion: 'Maharashtra',
        postalCode: '400001',
        addressCountry: 'IN'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-1234567890',
        contactType: 'customer service'
      }
    }
  }
} 