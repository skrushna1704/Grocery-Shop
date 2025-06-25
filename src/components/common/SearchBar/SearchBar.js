import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { storage } from '@/utils/storage';
import styles from './SearchBar.module.css';

const SearchBar = ({ onClose, placeholder = "Search for fresh vegetables, fruits..." }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [trendingSearches, setTrendingSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const debouncedQuery = useDebounce(query, 300);

  // Mock trending searches
  const mockTrendingSearches = [
    'Fresh Tomatoes',
    'Organic Bananas',
    'Basmati Rice',
    'Fresh Milk',
    'Green Vegetables',
    'Seasonal Fruits'
  ];

  // Mock suggestions based on search
  const mockSuggestions = [
    { id: 1, name: 'Fresh Tomatoes', category: 'Vegetables', image: '/images/products/tomatoes.jpg' },
    { id: 2, name: 'Organic Bananas', category: 'Fruits', image: '/images/products/bananas.jpg' },
    { id: 3, name: 'Basmati Rice', category: 'Grains', image: '/images/products/rice.jpg' },
    { id: 4, name: 'Fresh Milk', category: 'Dairy', image: '/images/products/milk.jpg' },
    { id: 5, name: 'Green Vegetables', category: 'Vegetables', image: '/images/products/vegetables.jpg' }
  ];

  // Load recent searches and trending on mount
  useEffect(() => {
    const recent = storage.getSearchHistory();
    setRecentSearches(recent);
    setTrendingSearches(mockTrendingSearches);
  }, []);

  // Handle debounced search
  useEffect(() => {
    if (debouncedQuery.length > 0) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const filtered = mockSuggestions.filter(item =>
          item.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(debouncedQuery.toLowerCase())
        );
        setSuggestions(filtered);
        setLoading(false);
      }, 200);
    } else {
      setSuggestions([]);
      setLoading(false);
    }
  }, [debouncedQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery) => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      // Add to search history
      storage.addToSearchHistory(trimmedQuery);
      setRecentSearches(storage.getSearchHistory());
      
      // Navigate to search results
      router.push(`/products?search=${encodeURIComponent(trimmedQuery)}`);
      
      // Close search and reset
      setIsOpen(false);
      setQuery('');
      onClose?.();
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 0) {
      setIsOpen(true);
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleSuggestionClick = (suggestion) => {
    handleSearch(suggestion.name);
  };

  const handleRecentSearchClick = (search) => {
    setQuery(search);
    handleSearch(search);
  };

  const handleTrendingSearchClick = (search) => {
    setQuery(search);
    handleSearch(search);
  };

  const clearQuery = () => {
    setQuery('');
    setSuggestions([]);
    inputRef.current?.focus();
  };

  const clearRecentSearches = () => {
    storage.clearSearchHistory();
    setRecentSearches([]);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Search Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder={placeholder}
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              onClick={clearQuery}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>

      {/* Search Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto"
          >
            {/* Loading state */}
            {loading && query && (
              <div className="p-4 text-center">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
                <p className="mt-2 text-sm text-gray-500">Searching...</p>
              </div>
            )}

            {/* Search Suggestions */}
            {!loading && suggestions.length > 0 && (
              <div className="p-2">
                <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Products
                </h3>
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full flex items-center px-3 py-2 hover:bg-gray-50 rounded-md text-left"
                  >
                    <div className="w-10 h-10 bg-gray-200 rounded-md mr-3 flex-shrink-0">
                      <img
                        src={suggestion.image}
                        alt={suggestion.name}
                        className="w-full h-full object-cover rounded-md"
                        onError={(e) => {
                          e.target.src = '/images/placeholder.jpg';
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {suggestion.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        in {suggestion.category}
                      </p>
                    </div>
                    <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  </button>
                ))}
              </div>
            )}

            {/* No results */}
            {!loading && query && suggestions.length === 0 && (
              <div className="p-4 text-center">
                <p className="text-sm text-gray-500">No products found for "{query}"</p>
                <button
                  onClick={() => handleSearch(query)}
                  className="mt-2 text-sm text-primary-600 hover:text-primary-700"
                >
                  Search anyway
                </button>
              </div>
            )}

            {/* Recent Searches */}
            {!query && recentSearches.length > 0 && (
              <div className="p-2 border-t border-gray-100">
                <div className="flex items-center justify-between px-3 py-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Recent Searches
                  </h3>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-primary-600 hover:text-primary-700"
                  >
                    Clear all
                  </button>
                </div>
                {recentSearches.slice(0, 5).map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearchClick(search)}
                    className="w-full flex items-center px-3 py-2 hover:bg-gray-50 rounded-md text-left"
                  >
                    <Clock className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700 flex-1 truncate">{search}</span>
                    <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  </button>
                ))}
              </div>
            )}

            {/* Trending Searches */}
            {!query && trendingSearches.length > 0 && (
              <div className="p-2 border-t border-gray-100">
                <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Trending
                </h3>
                {trendingSearches.slice(0, 6).map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleTrendingSearchClick(search)}
                    className="w-full flex items-center px-3 py-2 hover:bg-gray-50 rounded-md text-left"
                  >
                    <TrendingUp className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700 flex-1 truncate">{search}</span>
                    <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  </button>
                ))}
              </div>
            )}

            {/* Empty state */}
            {!query && recentSearches.length === 0 && trendingSearches.length === 0 && (
              <div className="p-4 text-center">
                <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Start typing to search for products</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;