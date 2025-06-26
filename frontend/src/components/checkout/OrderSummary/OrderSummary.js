import React from 'react';
import { formatPrice } from '@/utils/formatters';
import styles from './OrderSummary.module.css';

const OrderSummary = ({ 
  cart, 
  shippingAddress, 
  paymentMethod, 
  onNotesChange,
  className = '' 
}) => {
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
  const total = subtotal + tax + shipping;

  const formatAddress = (address) => {
    if (!address) return 'No address provided';
    return `${address.firstName} ${address.lastName}\n${address.address}\n${address.city}, ${address.state} ${address.zipCode}\n${address.country}`;
  };

  const formatPaymentMethod = (payment) => {
    if (!payment) return 'No payment method selected';
    return `${payment.type} ending in ${payment.last4}`;
  };

  return (
    <div className={`${styles.orderSummary} ${className}`}>
      <h3 className={styles.orderSummaryTitle}>Order Summary</h3>
      
      {/* Order Items */}
      <div className={styles.orderSummarySection}>
        <h4 className={styles.orderSummarySectionTitle}>Items ({cart.length})</h4>
        <div className={styles.orderSummaryItems}>
          {cart.map((item, index) => (
            <div key={index} className={styles.orderSummaryItem}>
              <img
                src={item.image || '/images/placeholder-product.jpg'}
                alt={item.name}
                className={styles.orderSummaryItemImage}
              />
              <div className={styles.orderSummaryItemDetails}>
                <div className={styles.orderSummaryItemName}>{item.name}</div>
                <div className={styles.orderSummaryItemPrice}>
                  {formatPrice(item.price)} each
                </div>
                <div className={styles.orderSummaryItemQuantity}>
                  Quantity: {item.quantity}
                </div>
              </div>
              <div className={styles.orderSummaryItemTotal}>
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Address */}
      <div className={styles.orderSummarySection}>
        <h4 className={styles.orderSummarySectionTitle}>Shipping Address</h4>
        <div className={styles.orderSummaryAddress}>
          <pre className={styles.orderSummaryAddressText}>
            {formatAddress(shippingAddress)}
          </pre>
        </div>
      </div>

      {/* Payment Method */}
      <div className={styles.orderSummarySection}>
        <h4 className={styles.orderSummarySectionTitle}>Payment Method</h4>
        <div className={styles.orderSummaryPayment}>
          <div className={styles.orderSummaryPaymentText}>
            {formatPaymentMethod(paymentMethod)}
          </div>
        </div>
      </div>

      {/* Order Notes */}
      <div className={styles.orderSummarySection}>
        <h4 className={styles.orderSummarySectionTitle}>Order Notes (Optional)</h4>
        <div className={styles.orderSummaryNotes}>
          <label className={styles.orderSummaryNotesLabel}>
            Special instructions for delivery
          </label>
          <textarea
            className={styles.orderSummaryNotesTextarea}
            placeholder="Any special instructions for delivery, such as gate codes, building access, or delivery preferences..."
            onChange={(e) => onNotesChange?.(e.target.value)}
          />
        </div>
      </div>

      {/* Order Totals */}
      <div className={styles.orderSummaryTotals}>
        <div className={styles.orderSummaryTotalRow}>
          <span className={styles.orderSummaryTotalLabel}>Subtotal</span>
          <span className={styles.orderSummaryTotalValue}>
            {formatPrice(subtotal)}
          </span>
        </div>
        
        <div className={styles.orderSummaryTotalRow}>
          <span className={styles.orderSummaryTotalLabel}>Tax</span>
          <span className={styles.orderSummaryTotalValue}>
            {formatPrice(tax)}
          </span>
        </div>
        
        <div className={styles.orderSummaryTotalRow}>
          <span className={styles.orderSummaryTotalLabel}>Shipping</span>
          <span className={styles.orderSummaryTotalValue}>
            {shipping === 0 ? 'Free' : formatPrice(shipping)}
          </span>
        </div>
        
        <div className={styles.orderSummaryTotalRow}>
          <span className={styles.orderSummaryTotalLabel}>Total</span>
          <span className={`${styles.orderSummaryTotalValue} ${styles.orderSummaryGrandTotal}`}>
            {formatPrice(total)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary; 