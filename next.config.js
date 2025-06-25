/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['localhost', 'cloudinary.com'],
      unoptimized: true
    },
    env: {
      CUSTOM_KEY: 'jumale-grocery-shop',
    },
  }
  
  module.exports = nextConfig