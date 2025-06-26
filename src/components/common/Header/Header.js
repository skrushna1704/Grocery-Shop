import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from 'next/image';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  MapPin,
  Phone,
  ChevronDown,
  Heart,
  LogOut,
  Package,
  Settings,
  ShoppingBag,
  Leaf,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import SearchBar from "../SearchBar/SearchBar";
import Button from "@/components/ui/Button/Button";

const Header = () => {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount, total } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigation items
  const navigationItems = [
    { name: "Home", href: "/", current: router.pathname === "/" },
    {
      name: "Products",
      href: "/products",
      current: router.pathname.startsWith("/products"),
    },
    {
      name: "Categories",
      href: "/categories",
      current: router.pathname.startsWith("/categories"),
    },
    { name: "About", href: "/about", current: router.pathname === "/about" },
    {
      name: "Contact",
      href: "/contact",
      current: router.pathname === "/contact",
    },
  ];

  const userMenuItems = [
    { name: "My Profile", href: "/user/profile", icon: User },
    { name: "My Orders", href: "/user/orders", icon: Package },
    { name: "Wishlist", href: "/user/wishlist", icon: Heart },
    { name: "Settings", href: "/user/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
    router.push("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-all duration-200 ${
        isScrolled ? "shadow-lg" : "shadow-sm"
      }`}
    >
      {/* Top bar with contact info */}
      <div className="bg-green-600 text-white text-sm py-2 hidden lg:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Delivery to Pimpri(Kalgaon)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+91 93599881657</span>
            </div>
          </div>
          <div className="text-sm flex items-center space-x-1">
            <Leaf className="w-4 h-4" />
            <span>Free delivery on orders above ₹500</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/images/jumaleLogo.png"
                alt="Jumale Grocery Logo"
                width={48}
                height={48}
                className="w-12 h-12 lg:w-14 lg:h-14 object-contain"
                priority
              />
              <div className="hidden sm:block">
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                  Jumale Grocery
                </h1>
                <p className="text-xs text-green-600 font-medium -mt-1">
                  Fresh & Fast Delivery
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Properly spaced */}
          <nav className="hidden lg:flex items-center space-x-1 ml-12">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  item.current
                    ? "text-green-600 bg-green-50"
                    : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:block flex-1 max-w-lg mx-8">
            <SearchBar />
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Search icon - Mobile */}
            <button
              onClick={toggleSearch}
              className="lg:hidden p-2 text-gray-600 hover:text-green-600 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-600 hover:text-green-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                >
                  {itemCount}
                </motion.span>
              )}
            </Link>

            {/* User menu */}
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-1 p-2 text-gray-600 hover:text-green-600 transition-colors"
                  aria-label="User menu"
                >
                  <User className="w-6 h-6" />
                  <ChevronDown className="w-4 h-4 hidden lg:block" />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                    >
                      <div className="py-1">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>

                        {userMenuItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <Icon className="w-4 h-4 mr-3" />
                              {item.name}
                            </Link>
                          );
                        })}

                        <div className="border-t border-gray-100">
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4 mr-3" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden lg:inline-flex"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="hidden lg:inline-flex">
                    Sign Up
                  </Button>
                </Link>
                <Link
                  href="/login"
                  className="lg:hidden p-2 text-gray-600 hover:text-green-600 transition-colors"
                >
                  <User className="w-6 h-6" />
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-gray-600 hover:text-green-600 transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-gray-200 bg-white"
          >
            <div className="container mx-auto px-4 py-4">
              <SearchBar onClose={() => setIsSearchOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-gray-200 bg-white"
            ref={mobileMenuRef}
          >
            <div className="px-4 py-4 space-y-4">
              {/* Navigation items */}
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      item.current
                        ? "bg-green-50 text-green-600"
                        : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Auth buttons for mobile */}
              {!isAuthenticated && (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Link href="/login" className="block">
                    <Button
                      variant="ghost"
                      fullWidth
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register" className="block">
                    <Button
                      fullWidth
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}

              {/* User menu items for mobile */}
              {isAuthenticated && (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>

                  {userMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center px-3 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon className="w-4 h-4 mr-3" />
                        {item.name}
                      </Link>
                    );
                  })}

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
