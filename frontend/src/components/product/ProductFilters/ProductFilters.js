import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Search, 
  X,
  RotateCcw
} from 'lucide-react';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import { PRODUCT_CATEGORIES, FILTER_OPTIONS } from '@/utils/constants';
import styles from './ProductFilters.module.css';

const ProductFilters = ({ 
  filters, 
  onFilterChange, 
  onClearAll,
  className = '' 
}) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    rating: true,
    availability: true
  });

  const [priceInput, setPriceInput] = useState({
    min: filters.priceRange.min,
    max: filters.priceRange.max
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onFilterChange({
      ...filters,
      categories: newCategories
    });
  };

  const handlePriceRangeChange = (range) => {
    onFilterChange({
      ...filters,
      priceRange: range
    });
    setPriceInput(range);
  };

  const handleCustomPriceChange = () => {
    const min = Math.max(0, parseInt(priceInput.min) || 0);
    const max = Math.min(10000, parseInt(priceInput.max) || 10000);
    
    if (min <= max) {
      onFilterChange({
        ...filters,
        priceRange: { min, max }
      });
    }
  };

  const handleRatingChange = (rating) => {
    onFilterChange({
      ...filters,
      rating: filters.rating === rating ? 0 : rating
    });
  };

  const handleAvailabilityChange = (available) => {
    onFilterChange({
      ...filters,
      inStock: available
    });
  };

  const handleSearchChange = (search) => {
    onFilterChange({
      ...filters,
      search
    });
  };

  const FilterSection = ({ title, section, children }) => (
    <Card className="mb-4">
      <Card.Header padding="sm">
        <button
          onClick={() => toggleSection(section)}
          className="w-full flex items-center justify-between text-left"
        >
          <h3 className="font-semibold text-gray-900">{title}</h3>
          {expandedSections[section] ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
      </Card.Header>
      <AnimatePresence>
        {expandedSections[section] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <Card.Body padding="sm">
              {children}
            </Card.Body>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );

  const RatingStars = ({ rating, filled = false }) => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? 'text-yellow-400 fill-current'
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className={`${className}`}>
      {/* Search Filter */}
      <Card className="mb-4">
        <Card.Body padding="sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {filters.search && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </Card.Body>
      </Card>

      {/* Categories Filter */}
      <FilterSection title="Categories" section="categories">
        <div className="space-y-2">
          {Object.entries(PRODUCT_CATEGORIES).map(([key, value]) => (
            <label
              key={key}
              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
            >
              <input
                type="checkbox"
                checked={filters.categories.includes(value)}
                onChange={() => handleCategoryChange(value)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 capitalize flex-1">
                {value.replace('_', ' ')}
              </span>
              <span className="text-xs text-gray-500">
                {/* In a real app, this would show the actual count */}
                {Math.floor(Math.random() * 50) + 1}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price Range Filter */}
      <FilterSection title="Price Range" section="price">
        <div className="space-y-4">
          {/* Predefined ranges */}
          <div className="space-y-2">
            {FILTER_OPTIONS.PRICE_RANGES.map((range, index) => (
              <label
                key={index}
                className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
              >
                <input
                  type="radio"
                  name="priceRange"
                  checked={
                    filters.priceRange.min === range.min &&
                    (range.max === null ? filters.priceRange.max >= 1000 : filters.priceRange.max === range.max)
                  }
                  onChange={() => handlePriceRangeChange({
                    min: range.min,
                    max: range.max || 10000
                  })}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="text-sm text-gray-700">
                  {range.label}
                </span>
              </label>
            ))}
          </div>

          {/* Custom range */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm font-medium text-gray-700 mb-3">Custom Range</p>
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <input
                  type="number"
                  value={priceInput.min}
                  onChange={(e) => setPriceInput(prev => ({ ...prev, min: e.target.value }))}
                  onBlur={handleCustomPriceChange}
                  placeholder="Min"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <span className="text-gray-500">to</span>
              <div className="flex-1">
                <input
                  type="number"
                  value={priceInput.max}
                  onChange={(e) => setPriceInput(prev => ({ ...prev, max: e.target.value }))}
                  onBlur={handleCustomPriceChange}
                  placeholder="Max"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        </div>
      </FilterSection>

      {/* Rating Filter */}
      <FilterSection title="Customer Rating" section="rating">
        <div className="space-y-2">
          {FILTER_OPTIONS.RATINGS.map((ratingOption) => (
            <label
              key={ratingOption.value}
              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
            >
              <input
                type="radio"
                name="rating"
                checked={filters.rating === ratingOption.value}
                onChange={() => handleRatingChange(ratingOption.value)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <div className="flex items-center space-x-2">
                <RatingStars rating={ratingOption.value} />
                <span className="text-sm text-gray-700">
                  {ratingOption.label}
                </span>
              </div>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Availability Filter */}
      <FilterSection title="Availability" section="availability">
        <div className="space-y-2">
          <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => handleAvailabilityChange(e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">In Stock Only</span>
          </label>
        </div>
      </FilterSection>

      {/* Clear All Button */}
      <Button
        variant="outline"
        onClick={onClearAll}
        className="w-full mt-4"
        size="sm"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Clear All Filters
      </Button>
    </div>
  );
};

export default ProductFilters;