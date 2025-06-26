import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  ArrowLeft
} from 'lucide-react';

const CategoriesPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'shopkeeper') {
      router.push('/login');
      return;
    }
    fetchCategories();
  }, [user, router]);

  const fetchCategories = async () => {
    try {
      // TODO: Replace with actual API call
      const mockCategories = [
        {
          id: 1,
          name: 'Grains',
          description: 'Rice, wheat, and other grains',
          productCount: 15,
          status: 'active',
          image: '/images/grains.jpg'
        },
        {
          id: 2,
          name: 'Pulses',
          description: 'Lentils, beans, and other pulses',
          productCount: 12,
          status: 'active',
          image: '/images/pulses.jpg'
        },
        {
          id: 3,
          name: 'Essentials',
          description: 'Sugar, salt, and other essentials',
          productCount: 8,
          status: 'active',
          image: '/images/essentials.jpg'
        },
        {
          id: 4,
          name: 'Spices',
          description: 'Various spices and seasonings',
          productCount: 20,
          status: 'active',
          image: '/images/spices.jpg'
        },
        {
          id: 5,
          name: 'Oils',
          description: 'Cooking oils and ghee',
          productCount: 6,
          status: 'inactive',
          image: '/images/oils.jpg'
        }
      ];
      setCategories(mockCategories);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category? This will also affect all products in this category.')) {
      try {
        // TODO: Replace with actual API call
        setCategories(categories.filter(c => c.id !== categoryId));
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user || user.role !== 'shopkeeper') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/shopkeeper/dashboard" legacyBehavior>
                <a className="flex items-center text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Dashboard
                </a>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Categories Management</h1>
            </div>
            <Link href="/shopkeeper/categories/add" legacyBehavior>
              <a className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </a>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Categories ({filteredCategories.length})
            </h2>
          </div>
          
          {loading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading categories...</p>
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-600">No categories found.</p>
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.map((category) => (
                  <div key={category.id} className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="h-12 w-12 flex-shrink-0">
                          <img
                            className="h-12 w-12 rounded-lg object-cover"
                            src={category.image || '/images/placeholder.jpg'}
                            alt={category.name}
                          />
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          category.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {category.status}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{category.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {category.productCount} products
                        </span>
                        
                        <div className="flex space-x-2">
                          <Link href={`/shopkeeper/categories/${category.id}`} legacyBehavior>
                            <a className="text-blue-600 hover:text-blue-900 p-1">
                              <Eye className="h-4 w-4" />
                            </a>
                          </Link>
                          <Link href={`/shopkeeper/categories/${category.id}/edit`} legacyBehavior>
                            <a className="text-green-600 hover:text-green-900 p-1">
                              <Edit className="h-4 w-4" />
                            </a>
                          </Link>
                          <button
                            onClick={() => handleDelete(category.id)}
                            className="text-red-600 hover:text-red-900 p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage; 