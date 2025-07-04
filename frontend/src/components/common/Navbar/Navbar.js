import Link from 'next/link';
import { Crown } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Jumale Grocery
            </Link>
            <ul className="flex space-x-6">
              <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link></li>
              <li><Link href="/products" className="text-gray-600 hover:text-gray-900 transition-colors">Products</Link></li>
              <li><Link href="/cart" className="text-gray-600 hover:text-gray-900 transition-colors">Cart</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
} 