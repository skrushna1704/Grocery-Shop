import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Search,
  Eye,
  ArrowLeft,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const CustomersPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'shopkeeper') {
      router.push('/login');
      return;
    }
    fetchCustomers();
  }, [user, router]);

  const fetchCustomers = async () => {
    try {
      // TODO: Replace with actual API call
      const mockCustomers = [
        {
          id: 1,
          name: 'Rahul Sharma',
          email: 'rahul.sharma@email.com',
          phone: '+91 98765 43210',
          address: '123 Main Street, Mumbai, Maharashtra',
          totalOrders: 15,
          totalSpent: 8500,
          lastOrder: '2024-01-15T10:30:00Z',
          status: 'active'
        },
        {
          id: 2,
          name: 'Priya Patel',
          email: 'priya.patel@email.com',
          phone: '+91 87654 32109',
          address: '456 Oak Avenue, Pune, Maharashtra',
          totalOrders: 8,
          totalSpent: 4200,
          lastOrder: '2024-01-15T09:15:00Z',
          status: 'active'
        },
        {
          id: 3,
          name: 'Amit Kumar',
          email: 'amit.kumar@email.com',
          phone: '+91 76543 21098',
          address: '789 Pine Road, Nagpur, Maharashtra',
          totalOrders: 22,
          totalSpent: 12500,
          lastOrder: '2024-01-15T08:45:00Z',
          status: 'active'
        },
        {
          id: 4,
          name: 'Sneha Desai',
          email: 'sneha.desai@email.com',
          phone: '+91 65432 10987',
          address: '321 Elm Street, Aurangabad, Maharashtra',
          totalOrders: 5,
          totalSpent: 2800,
          lastOrder: '2024-01-14T16:20:00Z',
          status: 'active'
        },
        {
          id: 5,
          name: 'Vikram Singh',
          email: 'vikram.singh@email.com',
          phone: '+91 54321 09876',
          address: '654 Maple Drive, Nashik, Maharashtra',
          totalOrders: 0,
          totalSpent: 0,
          lastOrder: null,
          status: 'inactive'
        }
      ];
      setCustomers(mockCustomers);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
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
              <h1 className="text-2xl font-bold text-gray-900">Customers Management</h1>
            </div>
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
                  placeholder="Search customers by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Customers Grid */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Customers ({filteredCustomers.length})
            </h2>
          </div>
          
          {loading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading customers...</p>
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-600">No customers found.</p>
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCustomers.map((customer) => (
                  <div key={customer.id} className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                          <span className="text-yellow-600 font-semibold text-lg">
                            {customer.name.charAt(0)}
                          </span>
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {customer.status}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{customer.name}</h3>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-4 w-4 mr-2" />
                          {customer.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-4 w-4 mr-2" />
                          {customer.phone}
                        </div>
                        <div className="flex items-start text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-2">{customer.address}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <p className="text-gray-500">Total Orders</p>
                          <p className="font-medium text-gray-900">{customer.totalOrders}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Total Spent</p>
                          <p className="font-medium text-gray-900">₹{customer.totalSpent.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      {customer.lastOrder && (
                        <div className="text-sm text-gray-500 mb-4">
                          Last order: {new Date(customer.lastOrder).toLocaleDateString()}
                        </div>
                      )}
                      
                      <div className="flex justify-end">
                        <Link href={`/shopkeeper/customers/${customer.id}`} legacyBehavior>
                          <a className="text-yellow-600 hover:text-yellow-900 text-sm font-medium">
                            View Details
                          </a>
                        </Link>
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

export default CustomersPage; 