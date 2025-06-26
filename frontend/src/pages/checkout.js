import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  MapPin, 
  CreditCard, 
  Clock, 
  Shield, 
  ArrowLeft,
  Plus,
  Edit,
  Check,
  AlertCircle,
  Truck
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import { DELIVERY_SLOTS, PAYMENT_METHODS } from '@/utils/constants';
import PaymentForm from '@/components/checkout/PaymentForm/PaymentForm';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, itemCount, getSubtotal, shippingCost, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderNotes, setOrderNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState({
    fullName: user?.firstName + ' ' + user?.lastName || '',
    phone: user?.phone || '',
    addressLine1: '',
    addressLine2: '',
    city: 'Pimpri(kalgaon)',
    state: 'Maharashtra',
    pincode: '445102',
    landmark: '',
    isDefault: false
  });
  const [addressErrors, setAddressErrors] = useState({});

  // Mock saved addresses
  const [savedAddresses] = useState([
    {
      id: 1,
      fullName: 'Sanjay Nimbarte',
      phone: '9999999999',
      addressLine1: 'Behind ZP Marathi School',
      addressLine2: 'Pimpri(kalgaon)',
      city: 'Pimpri(kalgaon)',
      state: 'Maharashtra',
      pincode: '445102',
      landmark: 'Near Mumbai Nagpur Highway',
      isDefault: true
    }
  ]);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.replace('/cart');
    }
  }, [items, router]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(`/login?redirect=${encodeURIComponent('/checkout')}`);
    }
  }, [isAuthenticated, router]);

  // Set default address if available
  useEffect(() => {
    const defaultAddress = savedAddresses.find(addr => addr.isDefault);
    if (defaultAddress && !deliveryAddress) {
      setDeliveryAddress(defaultAddress);
    }
  }, [savedAddresses, deliveryAddress]);

  const subtotal = getSubtotal();

  const validateAddressForm = () => {
    const errors = {};

    if (!addressForm.fullName.trim()) errors.fullName = 'Full name is required';
    if (!addressForm.phone.trim()) errors.phone = 'Phone number is required';
    else if (!/^[6-9]\d{9}$/.test(addressForm.phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!addressForm.addressLine1.trim()) errors.addressLine1 = 'Address is required';
    if (!addressForm.pincode.trim()) errors.pincode = 'Pincode is required';
    else if (!/^[1-9][0-9]{5}$/.test(addressForm.pincode)) {
      errors.pincode = 'Please enter a valid 6-digit pincode';
    }

    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (validateAddressForm()) {
      const newAddress = {
        id: Date.now(),
        ...addressForm
      };
      setDeliveryAddress(newAddress);
      setShowAddressForm(false);
      setCurrentStep(2);
    }
  };

  const handlePlaceOrder = async () => {
    if (!deliveryAddress || !selectedSlot) {
      alert('Please complete all required information');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear cart and redirect to success page
      router.replace('/order-success');
      if(router.pathname === '/order-success'){
        clearCart();
      }
    } catch (error) {
      console.error('Order placement failed:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const steps = [
    { id: 1, title: 'Delivery Address', icon: MapPin },
    { id: 2, title: 'Delivery Time', icon: Clock },
    { id: 3, title: 'Payment', icon: CreditCard },
    { id: 4, title: 'Review Order', icon: ShoppingBag }
  ];

  if (!isAuthenticated || items.length === 0) {
    return <div className="min-h-screen bg-gray-50 py-8"></div>;
  }

  return (
    <>
      <Head>
        <title>Checkout - Jumale Grocery Shop</title>
        <meta name="description" content="Complete your order with secure checkout. Fast delivery to your doorstep." />
      </Head>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link href="/cart">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Cart
                </Button>
              </Link>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Checkout</h1>
            </div>
            <div className="text-sm text-gray-600">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} • ₹{total.toFixed(2)}
            </div>
          </div>

          {/* Progress Steps */}
          <Card className="mb-8">
            <Card.Body padding="sm">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;
                  
                  return (
                    <div key={step.id} className="flex items-center">
                      <div className={`flex items-center space-x-2 ${
                        index !== steps.length - 1 ? 'flex-1' : ''
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isCompleted 
                            ? 'bg-green-500 text-white' 
                            : isActive 
                            ? 'bg-primary-500 text-white' 
                            : 'bg-gray-300 text-gray-600'
                        }`}>
                          {isCompleted ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Icon className="w-4 h-4" />
                          )}
                        </div>
                        <span className={`text-sm font-medium ${
                          isActive ? 'text-primary-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          {step.title}
                        </span>
                      </div>
                      {index !== steps.length - 1 && (
                        <div className={`flex-1 h-px mx-4 ${
                          currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </Card.Body>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Delivery Address */}
              {currentStep === 1 && (
                <Card>
                  <Card.Header>
                    <h2 className="text-lg font-semibold text-gray-900">Delivery Address</h2>
                  </Card.Header>
                  <Card.Body>
                    {!showAddressForm ? (
                      <div className="space-y-4">
                        {/* Saved Addresses */}
                        {savedAddresses.map((address) => (
                          <div
                            key={address.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                              deliveryAddress?.id === address.id
                                ? 'border-primary-500 bg-primary-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setDeliveryAddress(address)}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="font-medium text-gray-900">{address.fullName}</span>
                                  {address.isDefault && (
                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                      Default
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-700 text-sm mb-1">
                                  {address.addressLine1}, {address.addressLine2}
                                </p>
                                <p className="text-gray-700 text-sm mb-1">
                                  {address.city}, {address.state} - {address.pincode}
                                </p>
                                <p className="text-gray-600 text-sm">Phone: {address.phone}</p>
                                {address.landmark && (
                                  <p className="text-gray-600 text-sm">Landmark: {address.landmark}</p>
                                )}
                              </div>
                              <button className="text-primary-600 hover:text-primary-700 text-sm">
                                <Edit className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}

                        {/* Add New Address Button */}
                        <button
                          onClick={() => setShowAddressForm(true)}
                          className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-primary-400 hover:bg-primary-50 transition-colors"
                        >
                          <Plus className="w-5 h-5 mx-auto mb-2 text-gray-400" />
                          <span className="text-sm text-gray-600">Add New Address</span>
                        </button>

                        {deliveryAddress && (
                          <Button
                            onClick={() => setCurrentStep(2)}
                            className="w-full mt-6"
                          >
                            Continue to Delivery Time
                          </Button>
                        )}
                      </div>
                    ) : (
                      /* Add Address Form */
                      <form onSubmit={handleAddressSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Input
                            label="Full Name"
                            value={addressForm.fullName}
                            onChange={(e) => setAddressForm(prev => ({ ...prev, fullName: e.target.value }))}
                            error={addressErrors.fullName}
                            required
                          />
                          <Input
                            label="Phone Number"
                            value={addressForm.phone}
                            onChange={(e) => setAddressForm(prev => ({ ...prev, phone: e.target.value }))}
                            error={addressErrors.phone}
                            required
                          />
                        </div>

                        <Input
                          label="Address Line 1"
                          value={addressForm.addressLine1}
                          onChange={(e) => setAddressForm(prev => ({ ...prev, addressLine1: e.target.value }))}
                          error={addressErrors.addressLine1}
                          placeholder="House/Flat/Building name"
                          required
                        />

                        <Input
                          label="Address Line 2"
                          value={addressForm.addressLine2}
                          onChange={(e) => setAddressForm(prev => ({ ...prev, addressLine2: e.target.value }))}
                          placeholder="Area, Colony, Street"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <Input
                            label="City"
                            value={addressForm.city}
                            onChange={(e) => setAddressForm(prev => ({ ...prev, city: e.target.value }))}
                            disabled
                          />
                          <Input
                            label="State"
                            value={addressForm.state}
                            onChange={(e) => setAddressForm(prev => ({ ...prev, state: e.target.value }))}
                            disabled
                          />
                          <Input
                            label="Pincode"
                            value={addressForm.pincode}
                            onChange={(e) => setAddressForm(prev => ({ ...prev, pincode: e.target.value }))}
                            error={addressErrors.pincode}
                            required
                          />
                        </div>

                        <Input
                          label="Landmark (Optional)"
                          value={addressForm.landmark}
                          onChange={(e) => setAddressForm(prev => ({ ...prev, landmark: e.target.value }))}
                          placeholder="Nearby landmark"
                        />

                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="default-address"
                            checked={addressForm.isDefault}
                            onChange={(e) => setAddressForm(prev => ({ ...prev, isDefault: e.target.checked }))}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <label htmlFor="default-address" className="text-sm text-gray-700">
                            Make this my default address
                          </label>
                        </div>

                        <div className="flex space-x-3">
                          <Button type="submit" className="flex-1">
                            Save Address
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowAddressForm(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    )}
                  </Card.Body>
                </Card>
              )}

              {/* Step 2: Delivery Time */}
              {currentStep === 2 && (
                <Card>
                  <Card.Header>
                    <h2 className="text-lg font-semibold text-gray-900">Choose Delivery Time</h2>
                  </Card.Header>
                  <Card.Body>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {DELIVERY_SLOTS.map((slot) => (
                          <div
                            key={slot.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                              selectedSlot === slot.id
                                ? 'border-primary-500 bg-primary-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setSelectedSlot(slot.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="font-medium text-gray-900">{slot.label}</span>
                                <p className="text-sm text-gray-600">Available today</p>
                              </div>
                              <div className={`w-4 h-4 rounded-full border-2 ${
                                selectedSlot === slot.id
                                  ? 'border-primary-500 bg-primary-500'
                                  : 'border-gray-300'
                              }`}>
                                {selectedSlot === slot.id && (
                                  <div className="w-full h-full rounded-full bg-white scale-50"></div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-blue-900">Delivery Information</h4>
                            <p className="text-sm text-blue-700 mt-1">
                              Our delivery team will call you 30 minutes before delivery. 
                              Please ensure someone is available to receive the order.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <Button
                          onClick={() => setCurrentStep(1)}
                          variant="outline"
                        >
                          Back
                        </Button>
                        <Button
                          onClick={() => setCurrentStep(3)}
                          disabled={!selectedSlot}
                          className="flex-1"
                        >
                          Continue to Payment
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <Card>
                  <Card.Header>
                    <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
                  </Card.Header>
                  <Card.Body>
                    <PaymentForm
                      onSubmit={(paymentData) => {
                        setPaymentMethod(paymentData.type);
                        setCurrentStep(4);
                      }}
                      onCancel={() => setCurrentStep(2)}
                    />
                    <div className="space-y-3 mt-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Order Notes (Optional)
                      </label>
                      <textarea
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        placeholder="Any special instructions for delivery..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                      />
                    </div>
                  </Card.Body>
                </Card>
              )}

              {/* Step 4: Review Order */}
              {currentStep === 4 && (
                <Card>
                  <Card.Header>
                    <h2 className="text-lg font-semibold text-gray-900">Review Your Order</h2>
                  </Card.Header>
                  <Card.Body>
                    <div className="space-y-6">
                      {/* Delivery Details Summary */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Delivery Address</h4>
                          <p className="text-sm text-gray-600">
                            {deliveryAddress?.fullName}<br />
                            {deliveryAddress?.addressLine1}<br />
                            {deliveryAddress?.city} - {deliveryAddress?.pincode}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Delivery Time</h4>
                          <p className="text-sm text-gray-600">
                            {DELIVERY_SLOTS.find(slot => slot.id === selectedSlot)?.label}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Payment Method</h4>
                          <p className="text-sm text-gray-600">Cash on Delivery</p>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                        <div className="space-y-3">
                          {items.map((item) => (
                            <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                              <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden">
                                <Image
                                  src={item.image || '/images/placeholder.jpg'}
                                  alt={item.name}
                                  width={48}
                                  height={48}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900">{item.name}</h5>
                                <p className="text-sm text-gray-600">{item.unit}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <Button
                          onClick={() => setCurrentStep(3)}
                          variant="outline"
                        >
                          Back
                        </Button>
                        <Button
                          onClick={handlePlaceOrder}
                          loading={isProcessing}
                          className="flex-1"
                        >
                          {isProcessing ? 'Processing...' : 'Place Order'}
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <Card.Header>
                  <h3 className="font-semibold text-gray-900">Order Summary</h3>
                </Card.Header>
                <Card.Body>
                  <div className="space-y-4">
                    {/* Items */}
                    <div className="space-y-3">
                      {items.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-md overflow-hidden">
                            <Image
                              src={item.image || '/images/placeholder.jpg'}
                              alt={item.name}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                            <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                      {items.length > 3 && (
                        <p className="text-sm text-gray-600 text-center">
                          +{items.length - 3} more items
                        </p>
                      )}
                    </div>

                    <div className="border-t border-gray-200 pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                        <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Delivery Charges</span>
                        {shippingCost > 0 ? (
                          <span className="font-medium">₹{shippingCost.toFixed(2)}</span>
                        ) : (
                          <span className="font-medium text-green-600">FREE</span>
                        )}
                      </div>
                      <div className="flex justify-between text-base font-semibold pt-2 border-t border-gray-200">
                        <span>Total</span>
                        <span>₹{total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Truck className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">
                          {shippingCost === 0 ? 'FREE Delivery' : `Delivery: ₹${shippingCost}`}
                        </span>
                      </div>
                      <p className="text-xs text-green-700 mt-1">
                        {shippingCost === 0 
                          ? 'Your order qualifies for free delivery!'
                          : `Add ₹${(500 - subtotal).toFixed(2)} more for free delivery`
                        }
                      </p>
                    </div>

                    {/* Security */}
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4" />
                      <span>Secure checkout guaranteed</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}