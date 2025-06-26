import React, { useState } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/formatters';
import styles from './CartSummary.module.css';

const CartSummary = ({ 
  onCheckout, 
  onContinueShopping, 
  showPromoCode = true,
  className = '' 
}) => {
  const { cart, applyPromoCode, removePromoCode, promoCode, promoDiscount } = useCart();
  const [promoInput, setPromoInput] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
  const total = subtotal + tax + shipping - (promoDiscount || 0);

  const handleApplyPromo = async () => {
    if (!promoInput.trim()) return;
    
    setIsApplyingPromo(true);
    try {
      await applyPromoCode(promoInput.trim());
      setPromoInput('');
    } catch (error) {
      console.error('Failed to apply promo code:', error);
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const handleRemovePromo = () => {
    removePromoCode();
  };

  if (cart.length === 0) {
    return (
      <div className={`${styles.cartSummary} ${className}`}>
        <div className={styles.cartSummaryEmpty}>
          <ShoppingBagIcon className={styles.cartSummaryEmptyIcon} />
          <p className={styles.cartSummaryEmptyText}>Your cart is empty</p>
          {onContinueShopping && (
            <button
              onClick={onContinueShopping}
              className={styles.cartSummaryEmptyButton}
            >
              Continue Shopping
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.cartSummary} ${className}`}>
      <h3 className={styles.cartSummaryTitle}>Order Summary</h3>
      
      <div className={styles.cartSummarySection}>
        <div className={styles.cartSummaryRow}>
          <span className={styles.cartSummaryLabel}>Subtotal ({cart.length} items)</span>
          <span className={`${styles.cartSummaryValue} ${styles.cartSummarySubtotal}`}>
            {formatPrice(subtotal)}
          </span>
        </div>
        
        {promoDiscount > 0 && (
          <div className={styles.cartSummaryRow}>
            <span className={styles.cartSummaryLabel}>Discount</span>
            <span className={`${styles.cartSummaryValue} ${styles.cartSummaryDiscount}`}>
              -{formatPrice(promoDiscount)}
            </span>
          </div>
        )}
        
        <div className={styles.cartSummaryRow}>
          <span className={styles.cartSummaryLabel}>Tax</span>
          <span className={`${styles.cartSummaryValue} ${styles.cartSummaryTax}`}>
            {formatPrice(tax)}
          </span>
        </div>
        
        <div className={styles.cartSummaryRow}>
          <span className={styles.cartSummaryLabel}>Shipping</span>
          <span className={`${styles.cartSummaryValue} ${styles.cartSummaryShipping}`}>
            {shipping === 0 ? 'Free' : formatPrice(shipping)}
          </span>
        </div>
        
        <div className={styles.cartSummaryRow}>
          <span className={styles.cartSummaryLabel}>Total</span>
          <span className={`${styles.cartSummaryValue} ${styles.cartSummaryTotal}`}>
            {formatPrice(total)}
          </span>
        </div>
      </div>

      {showPromoCode && (
        <div className={styles.cartSummaryPromo}>
          {promoCode ? (
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-600">Promo code applied: {promoCode}</span>
              <button
                onClick={handleRemovePromo}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ) : (
            <div>
              <input
                type="text"
                placeholder="Enter promo code"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                className={styles.cartSummaryPromoInput}
                onKeyPress={(e) => e.key === 'Enter' && handleApplyPromo()}
              />
              <button
                onClick={handleApplyPromo}
                disabled={isApplyingPromo || !promoInput.trim()}
                className={styles.cartSummaryPromoButton}
              >
                {isApplyingPromo ? 'Applying...' : 'Apply'}
              </button>
            </div>
          )}
        </div>
      )}

      <div className={styles.cartSummaryActions}>
        {onCheckout && (
          <button
            onClick={onCheckout}
            disabled={cart.length === 0}
            className={`${styles.cartSummaryButton} ${cart.length === 0 ? styles.cartSummaryButtonDisabled : ''}`}
          >
            Proceed to Checkout
          </button>
        )}
        
        {onContinueShopping && (
          <button
            onClick={onContinueShopping}
            className={styles.cartSummaryButtonSecondary}
          >
            Continue Shopping
          </button>
        )}
      </div>
    </div>
  );
};

export default CartSummary; 