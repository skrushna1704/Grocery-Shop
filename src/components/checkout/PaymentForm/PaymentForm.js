import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CreditCard, Lock, Banknote, QrCode, Wallet, IndianRupee } from 'lucide-react';
import styles from './PaymentForm.module.css';

const paymentSchema = yup.object().shape({
  cardNumber: yup.string()
    .matches(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, 'Card number must be 16 digits')
    .required('Card number is required'),
  cardholderName: yup.string().required('Cardholder name is required'),
  expiryMonth: yup.string().required('Expiry month is required'),
  expiryYear: yup.string().required('Expiry year is required'),
  cvv: yup.string()
    .matches(/^\d{3,4}$/, 'CVV must be 3 or 4 digits')
    .required('CVV is required')
});

const PaymentForm = ({ 
  initialData = {}, 
  onSubmit, 
  onCancel, 
  className = '' 
}) => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    resolver: yupResolver(paymentSchema),
    defaultValues: {
      cardNumber: '',
      cardholderName: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      ...initialData
    }
  });

  const watchedValues = watch();

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const paymentData = {
        type: selectedMethod,
        ...data,
        last4: data.cardNumber.replace(/\s/g, '').slice(-4)
      };
      await onSubmit(paymentData);
      reset();
    } catch (error) {
      console.error('Failed to save payment method:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    reset();
    onCancel?.();
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    e.target.value = formatted;
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return { value: month.toString().padStart(2, '0'), label: month.toString().padStart(2, '0') };
  });

  const paymentMethods = [
    {
      id: 'card',
      title: 'Credit / Debit Card',
      description: 'Pay securely with your card',
      icon: CreditCard
    },
    {
      id: 'cod',
      title: 'Cash on Delivery',
      description: 'Pay with cash when your order is delivered',
      icon: IndianRupee
    },
    {
      id: 'upi',
      title: 'UPI',
      description: 'Pay using UPI apps like Google Pay, PhonePe, etc.',
      icon: QrCode
    },
    {
      id: 'net_banking',
      title: 'Net Banking',
      description: 'Pay using your bank account',
      icon: Banknote
    },
    {
      id: 'wallet',
      title: 'Wallet',
      description: 'Pay using your favorite wallet',
      icon: Wallet
    }
  ];

  return (
    <div className={`${styles.paymentForm} ${className}`}>
      <h3 className={styles.paymentFormTitle}>Payment Method</h3>
      
      <div className={styles.paymentFormSection}>
        {/* Payment Method Selection */}
        <div className="space-y-3 mb-6">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div
                key={method.id}
                className={`${styles.paymentFormMethod} ${
                  selectedMethod === method.id ? styles.paymentFormMethodSelected : ''
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className={styles.paymentFormMethodHeader}>
                  <Icon 
                    className={`${styles.paymentFormMethodIcon} ${
                      selectedMethod === method.id ? styles.paymentFormMethodIconSelected : ''
                    }`} 
                  />
                  <div>
                    <div className={styles.paymentFormMethodTitle}>{method.title}</div>
                    <div className={styles.paymentFormMethodDescription}>{method.description}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Card Details Form */}
        {selectedMethod === 'card' && (
          <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.paymentFormFields}>
            <div className={styles.paymentFormField}>
              <label className={`${styles.paymentFormLabel} ${styles.paymentFormLabelRequired}`}>
                Card Number
              </label>
              <input
                type="text"
                {...register('cardNumber')}
                className={`${styles.paymentFormInput} ${errors.cardNumber ? styles.paymentFormInputError : ''}`}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                onChange={handleCardNumberChange}
              />
              {errors.cardNumber && (
                <p className={styles.paymentFormError}>{errors.cardNumber.message}</p>
              )}
            </div>

            <div className={styles.paymentFormField}>
              <label className={`${styles.paymentFormLabel} ${styles.paymentFormLabelRequired}`}>
                Cardholder Name
              </label>
              <input
                type="text"
                {...register('cardholderName')}
                className={`${styles.paymentFormInput} ${errors.cardholderName ? styles.paymentFormInputError : ''}`}
                placeholder="John Doe"
              />
              {errors.cardholderName && (
                <p className={styles.paymentFormError}>{errors.cardholderName.message}</p>
              )}
            </div>

            <div className={styles.paymentFormRow}>
              <div className={styles.paymentFormField}>
                <label className={`${styles.paymentFormLabel} ${styles.paymentFormLabelRequired}`}>
                  Expiry Month
                </label>
                <select
                  {...register('expiryMonth')}
                  className={`${styles.paymentFormSelect} ${errors.expiryMonth ? styles.paymentFormInputError : ''}`}
                >
                  <option value="">MM</option>
                  {months.map(month => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
                {errors.expiryMonth && (
                  <p className={styles.paymentFormError}>{errors.expiryMonth.message}</p>
                )}
              </div>
              
              <div className={styles.paymentFormField}>
                <label className={`${styles.paymentFormLabel} ${styles.paymentFormLabelRequired}`}>
                  Expiry Year
                </label>
                <select
                  {...register('expiryYear')}
                  className={`${styles.paymentFormSelect} ${errors.expiryYear ? styles.paymentFormInputError : ''}`}
                >
                  <option value="">YYYY</option>
                  {years.map(year => (
                    <option key={year} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.expiryYear && (
                  <p className={styles.paymentFormError}>{errors.expiryYear.message}</p>
                )}
              </div>
            </div>

            <div className={styles.paymentFormField}>
              <label className={`${styles.paymentFormLabel} ${styles.paymentFormLabelRequired}`}>
                CVV
              </label>
              <input
                type="text"
                {...register('cvv')}
                className={`${styles.paymentFormInput} ${errors.cvv ? styles.paymentFormInputError : ''}`}
                placeholder="123"
                maxLength="4"
              />
              {errors.cvv && (
                <p className={styles.paymentFormError}>{errors.cvv.message}</p>
              )}
              <p className={styles.paymentFormHelp}>
                The 3 or 4 digit security code on the back of your card
              </p>
            </div>

            <div className={styles.paymentFormSecurity}>
              <Lock className={styles.paymentFormSecurityIcon} />
              <span>Your payment information is secure and encrypted</span>
            </div>

            <div className={styles.paymentFormActions}>
              {onCancel && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className={styles.paymentFormButtonSecondary}
                >
                  Cancel
                </button>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${styles.paymentFormButton} ${isSubmitting ? styles.paymentFormButtonDisabled : ''}`}
              >
                {isSubmitting ? 'Saving...' : 'Save Payment Method'}
              </button>
            </div>
          </form>
        )}
        {selectedMethod !== 'card' && (
          <div className="p-4 bg-green-50 rounded-md border border-green-200 text-green-800 mb-4">
            <p>
              <strong>{paymentMethods.find(m => m.id === selectedMethod)?.title} selected.</strong><br />
            </p>
            <div className={styles.paymentFormActions}>
              {onCancel && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className={styles.paymentFormButtonSecondary}
                >
                  Cancel
                </button>
              )}
              <button
                type="button"
                onClick={() => onSubmit && onSubmit({ type: selectedMethod })}
                className={styles.paymentFormButton}
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm; 