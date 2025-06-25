import React, { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import OrderSummary from '../OrderSummary';
import styles from './CheckoutForm.module.css';

const CheckoutForm = ({ onComplete, className = '' }) => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const [formData, setFormData] = useState({
    shippingAddress: null,
    billingAddress: null,
    paymentMethod: null,
    orderNotes: ''
  });

  const steps = [
    {
      id: 1,
      title: 'Shipping Address',
      description: 'Enter your shipping address',
      component: 'shipping'
    },
    {
      id: 2,
      title: 'Payment Method',
      description: 'Choose your payment method',
      component: 'payment'
    },
    {
      id: 3,
      title: 'Review Order',
      description: 'Review your order details',
      component: 'review'
    }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'pending';
  };

  const getStepNumberClass = (stepId) => {
    const status = getStepStatus(stepId);
    switch (status) {
      case 'completed':
        return `${styles.checkoutFormStepNumber} ${styles.checkoutFormStepCompleted}`;
      case 'current':
        return `${styles.checkoutFormStepNumber} ${styles.checkoutFormStepCurrent}`;
      default:
        return `${styles.checkoutFormStepNumber} ${styles.checkoutFormStepPending}`;
    }
  };

  const handleShippingSubmit = (address) => {
    setFormData(prev => ({ ...prev, shippingAddress: address }));
    setCurrentStep(2);
    setError(null);
  };

  const handlePaymentSubmit = (paymentMethod) => {
    setFormData(prev => ({ ...prev, paymentMethod }));
    setCurrentStep(3);
    setError(null);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  };

  const handleCompleteOrder = async () => {
    if (!formData.shippingAddress || !formData.paymentMethod) {
      setError('Please complete all required steps before placing your order.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const orderData = {
        items: cart,
        shippingAddress: formData.shippingAddress,
        billingAddress: formData.billingAddress || formData.shippingAddress,
        paymentMethod: formData.paymentMethod,
        orderNotes: formData.orderNotes,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        userId: user?.id,
        orderDate: new Date().toISOString()
      };

      // Here you would typically send the order to your API
      console.log('Order submitted:', orderData);
      
      setSuccess('Order placed successfully! You will receive a confirmation email shortly.');
      clearCart();
      
      // Call the completion callback
      onComplete?.(orderData);
      
    } catch (err) {
      setError('Failed to place order. Please try again.');
      console.error('Order submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <AddressForm
            title="Shipping Address"
            onSubmit={handleShippingSubmit}
            initialData={formData.shippingAddress}
          />
        );
      case 2:
        return (
          <PaymentForm
            onSubmit={handlePaymentSubmit}
            initialData={formData.paymentMethod}
          />
        );
      case 3:
        return (
          <OrderSummary
            cart={cart}
            shippingAddress={formData.shippingAddress}
            paymentMethod={formData.paymentMethod}
            onNotesChange={(notes) => setFormData(prev => ({ ...prev, orderNotes: notes }))}
          />
        );
      default:
        return null;
    }
  };

  if (cart.length === 0) {
    return (
      <div className={`${styles.checkoutForm} ${className}`}>
        <div className={styles.checkoutFormSection}>
          <div className={styles.checkoutFormLoading}>
            <p className={styles.checkoutFormLoadingText}>Your cart is empty</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.checkoutForm} ${className}`}>
      {error && (
        <div className={styles.checkoutFormError}>
          <h4 className={styles.checkoutFormErrorTitle}>Error</h4>
          <p className={styles.checkoutFormErrorMessage}>{error}</p>
        </div>
      )}

      {success && (
        <div className={styles.checkoutFormSuccess}>
          <h4 className={styles.checkoutFormSuccessTitle}>Success!</h4>
          <p className={styles.checkoutFormSuccessMessage}>{success}</p>
        </div>
      )}

      <div className={styles.checkoutFormSection}>
        <h2 className={styles.checkoutFormTitle}>Checkout</h2>
        <p className={styles.checkoutFormSubtitle}>
          Complete your purchase in {steps.length} simple steps
        </p>

        {steps.map((step) => (
          <div key={step.id} className={styles.checkoutFormStep}>
            <div className={styles.checkoutFormStepHeader}>
              <div className={getStepNumberClass(step.id)}>
                {getStepStatus(step.id) === 'completed' ? (
                  <CheckIcon className="w-4 h-4" />
                ) : (
                  step.id
                )}
              </div>
              <div>
                <h3 className={styles.checkoutFormStepTitle}>{step.title}</h3>
                <p className={styles.checkoutFormStepDescription}>{step.description}</p>
              </div>
            </div>
            
            {currentStep === step.id && (
              <div className={styles.checkoutFormStepContent}>
                {renderStepContent()}
              </div>
            )}
          </div>
        ))}

        <div className={styles.checkoutFormNavigation}>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className={styles.checkoutFormButtonSecondary}
            >
              Back
            </button>
          )}
          
          {currentStep < steps.length && (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className={styles.checkoutFormButton}
              disabled={!formData.shippingAddress && currentStep === 1}
            >
              Continue
            </button>
          )}
          
          {currentStep === steps.length && (
            <button
              type="button"
              onClick={handleCompleteOrder}
              disabled={isSubmitting || !formData.shippingAddress || !formData.paymentMethod}
              className={`${styles.checkoutFormButton} ${isSubmitting ? styles.checkoutFormButtonDisabled : ''}`}
            >
              {isSubmitting ? 'Placing Order...' : 'Place Order'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm; 