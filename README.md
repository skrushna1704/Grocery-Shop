# Jumale Grocery Shop

A modern e-commerce platform for grocery shopping built with Next.js.

## Features

- 🛒 Shopping cart functionality
- 🔍 Product search and filtering
- 👤 User authentication and profiles
- 💳 Secure checkout process
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Next.js pages and API routes
├── context/       # React context providers
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
├── lib/           # Third-party library configurations
└── styles/        # Global styles and CSS modules
```

## Technologies Used

- Next.js 14
- React 18
- Tailwind CSS
- Axios
- JavaScript

## License

MIT 

# Jumale Grocery Shop - Frontend Application

A comprehensive multi-vendor online grocery platform built with Next.js, designed specifically for Pimpri(Kalgaon), Maharashtra, India. This platform connects local grocery vendors with customers through a modern, responsive web application.

## 🚀 Features

### Core Functionality
- **Multi-role System**: Customer, Vendor, and Admin interfaces
- **Product Catalog**: Browse and search through thousands of fresh products
- **Shopping Cart**: Persistent cart with quantity management
- **User Authentication**: Secure login/register with JWT tokens
- **Order Management**: Complete checkout flow with order tracking
- **Responsive Design**: Optimized for mobile, tablet, and desktop

### Customer Features
- Browse products by category
- Advanced search and filtering
- Shopping cart with localStorage persistence
- User dashboard with order history
- Wishlist management
- Address book for deliveries
- Real-time order tracking

### Vendor Features (Future Implementation)
- Vendor registration and verification
- Product management dashboard
- Order fulfillment interface
- Sales analytics
- Inventory management

### Admin Features (Future Implementation)
- Platform oversight dashboard
- User and vendor management
- Content moderation
- Analytics and reporting

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 with Pages Directory
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Context API (AuthContext, CartContext)
- **UI Components**: Custom component library
- **Icons**: Lucide React
- **Forms**: React Hook Form with Yup validation
- **HTTP Client**: Axios for API communication
- **Animations**: Framer Motion

### Development Tools
- **Language**: JavaScript
- **Package Manager**: npm/yarn
- **Code Quality**: ESLint
- **Build Tool**: Next.js built-in bundler

## 📁 Project Structure

```
jumale-grocery-shop/
├── public/                 # Static assets
│   ├── images/            # Images and icons
│   ├── favicon.ico        # Favicon
│   └── manifest.json      # PWA manifest
├── src/
│   ├── components/        # Reusable components
│   │   ├── common/        # Common components (Header, Footer, Layout)
│   │   ├── ui/           # UI components (Button, Input, Card, etc.)
│   │   ├── product/      # Product-related components
│   │   ├── cart/         # Cart-related components
│   │   ├── checkout/     # Checkout components
│   │   ├── user/         # User profile components
│   │   └── admin/        # Admin components
│   ├── context/          # React Context providers
│   │   ├── AuthContext.js
│   │   └── CartContext.js
│   ├── hooks/            # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useCart.js
│   │   ├── useDebounce.js
│   │   ├── useLocalStorage.js
│   │   └── useProducts.js
│   ├── lib/              # Library configurations
│   ├── pages/            # Next.js pages
│   │   ├── api/          # API routes
│   │   ├── auth/         # Authentication pages
│   │   ├── products/     # Product pages
│   │   ├── user/         # User dashboard pages
│   │   └── admin/        # Admin pages
│   ├── styles/           # CSS and styling
│   │   ├── globals.css   # Global styles
│   │   └── components/   # Component-specific styles
│   └── utils/            # Utility functions
│       ├── constants.js  # App constants
│       ├── helpers.js    # Helper functions
│       └── storage.js    # localStorage utilities
├── tailwind.config.js    # Tailwind CSS configuration
├── next.config.js        # Next.js configuration
└── package.json          # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/jumale-grocery-shop.git
   cd jumale-grocery-shop
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Demo Credentials

For testing purposes, use these demo credentials:

### Customer Account
- **Email**: customer@example.com
- **Password**: password123

### Vendor Account
- **Email**: vendor@example.com
- **Password**: password123

### Admin Account
- **Email**: admin@example.com
- **Password**: password123

## 🎨 Design System

### Color Palette
- **Primary Green**: #16a34a (Fresh, natural feel)
- **Secondary Yellow**: #f59e0b (Warm, inviting accent)
- **Success**: #22c55e
- **Warning**: #f59e0b
- **Error**: #ef4444

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold weights (600-800)
- **Body Text**: Regular and medium weights (400-500)

### Components
All UI components are built with:
- Consistent spacing using Tailwind's spacing scale
- Proper focus states for accessibility
- Mobile-first responsive design
- Dark mode support (planned)

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Development helpers
npm run dev:clean    # Clean .next and start dev server
npm run analyze      # Analyze bundle size
```

## 📦 Key Dependencies

### Core
- `next@14.0.0` - React framework
- `react@18.0.0` - UI library
- `tailwindcss@3.3.0` - CSS framework

### UI & Interactions
- `framer-motion@10.16.0` - Animation library
- `lucide-react@0.294.0` - Icon library
- `react-hook-form@7.48.0` - Form handling

### State & Data
- `axios@1.6.0` - HTTP client
- `yup@1.3.0` - Schema validation

## 🌐 Pages Overview

### Public Pages
- `/` - Homepage with hero, features, and products
- `/products` - Product catalog with filters and search
- `/products/[id]` - Individual product details
- `/cart` - Shopping cart and checkout preview
- `/about` - About us and company information
- `/contact` - Contact form and information

### Authentication
- `/auth/login` - User login
- `/auth/register` - User registration
- `/auth/forgot-password` - Password reset

### User Dashboard
- `/user/dashboard` - User overview and quick actions
- `/user/profile` - Profile management
- `/user/orders` - Order history and tracking
- `/user/addresses` - Address book management

### Checkout Flow
- `/checkout` - Multi-step checkout process
- `/order-success` - Order confirmation

## 🎯 Business Features

### Shopping Experience
- **Product Discovery**: Category browsing, search, and filters
- **Cart Management**: Add/remove items with quantity controls
- **Checkout Flow**: Guest and registered user checkout
- **Order Tracking**: Real-time order status updates

### Local Focus
- **Delivery Area**: Pimpri(Kalgaon), Maharashtra
- **Local Vendors**: Support for regional grocery suppliers
- **Cultural Adaptation**: INR currency, local address formats

### Quality Assurance
- **Fresh Guarantee**: Quality promise on all products
- **Free Delivery**: On orders above ₹500
- **Easy Returns**: 7-day return policy

## 🔒 Security Features

- JWT-based authentication
- Form validation and sanitization
- CORS protection
- Environment variable protection
- Input validation on all forms

## 📱 Progressive Web App (PWA)

The application includes PWA features:
- Offline functionality (planned)
- Push notifications (planned)
- App-like experience on mobile devices
- Fast loading with service workers (planned)

## 🚀 Performance Optimizations

- **Next.js Image Optimization**: Automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Components and images load on demand
- **Caching**: localStorage for cart and user preferences
- **Bundle Analysis**: Webpack bundle analyzer integration

## 🔧 Development Guidelines

### Component Structure
```javascript
// Component template
import { useState } from 'react';
import styles from './Component.module.css';

const Component = ({ prop1, prop2 }) => {
  const [state, setState] = useState();

  return (
    <div className={styles.component}>
      {/* Component JSX */}
    </div>
  );
};

export default Component;
```

### Naming Conventions
- **Components**: PascalCase (`ProductCard`)
- **Files**: PascalCase for components, camelCase for utilities
- **CSS Classes**: kebab-case in modules, utility classes in JSX
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE

### State Management
- Use Context API for global state (auth, cart)
- Local state for component-specific data
- Custom hooks for reusable stateful logic

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Environment Variables
Ensure these are set in production:
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://api.your-domain.com
```

### Deployment Platforms
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Digital Ocean**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful commit messages
- Add comments for complex logic

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for beautiful icons
- **Framer Motion** for smooth animations

## 📞 Support

If you need help with setup or have questions:

- **Email**: support@jumalegrocery.com
- **Phone**: +91 9876543210
- **GitHub Issues**: [Create an issue](https://github.com/your-username/jumale-grocery-shop/issues)

## 🗺 Roadmap

### Phase 1: MVP (Current)
- ✅ Frontend application with core features
- ✅ User authentication and cart management
- ✅ Product catalog and checkout flow
- ✅ Responsive design

### Phase 2: Backend Integration
- 🔄 REST API development
- 🔄 Database integration
- 🔄 Payment gateway integration
- 🔄 Order management system

### Phase 3: Advanced Features
- 📋 Vendor management portal
- 📋 Real-time order tracking
- 📋 Push notifications
- 📋 Advanced analytics

### Phase 4: Mobile App
- 📋 React Native mobile application
- 📋 Offline functionality
- 📋 Enhanced mobile experience

---

**Built with ❤️ for the Pimpri(Kalgaon) community**