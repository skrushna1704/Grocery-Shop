import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './AddressForm.module.css';

const addressSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zipCode: yup.string().required('ZIP code is required'),
  country: yup.string().required('Country is required'),
  isDefault: yup.boolean(),
  notes: yup.string()
});

const AddressForm = ({ 
  initialData = {}, 
  onSubmit, 
  onCancel, 
  title = 'Shipping Address',
  showDefaultCheckbox = true,
  className = '' 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US',
      isDefault: false,
      notes: '',
      ...initialData
    }
  });

  const watchedValues = watch();

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error('Failed to save address:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    reset();
    onCancel?.();
  };

  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'MX', name: 'Mexico' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'IN', name: 'India' },
    { code: 'AU', name: 'Australia' }
  ];

  const states = [
    { code: 'AL', name: 'Alabama' },
    { code: 'AK', name: 'Alaska' },
    { code: 'AZ', name: 'Arizona' },
    { code: 'AR', name: 'Arkansas' },
    { code: 'CA', name: 'California' },
    { code: 'CO', name: 'Colorado' },
    { code: 'CT', name: 'Connecticut' },
    { code: 'DE', name: 'Delaware' },
    { code: 'FL', name: 'Florida' },
    { code: 'GA', name: 'Georgia' },
    { code: 'HI', name: 'Hawaii' },
    { code: 'ID', name: 'Idaho' },
    { code: 'IL', name: 'Illinois' },
    { code: 'IN', name: 'Indiana' },
    { code: 'IA', name: 'Iowa' },
    { code: 'KS', name: 'Kansas' },
    { code: 'KY', name: 'Kentucky' },
    { code: 'LA', name: 'Louisiana' },
    { code: 'ME', name: 'Maine' },
    { code: 'MD', name: 'Maryland' },
    { code: 'MA', name: 'Massachusetts' },
    { code: 'MI', name: 'Michigan' },
    { code: 'MN', name: 'Minnesota' },
    { code: 'MS', name: 'Mississippi' },
    { code: 'MO', name: 'Missouri' },
    { code: 'MT', name: 'Montana' },
    { code: 'NE', name: 'Nebraska' },
    { code: 'NV', name: 'Nevada' },
    { code: 'NH', name: 'New Hampshire' },
    { code: 'NJ', name: 'New Jersey' },
    { code: 'NM', name: 'New Mexico' },
    { code: 'NY', name: 'New York' },
    { code: 'NC', name: 'North Carolina' },
    { code: 'ND', name: 'North Dakota' },
    { code: 'OH', name: 'Ohio' },
    { code: 'OK', name: 'Oklahoma' },
    { code: 'OR', name: 'Oregon' },
    { code: 'PA', name: 'Pennsylvania' },
    { code: 'RI', name: 'Rhode Island' },
    { code: 'SC', name: 'South Carolina' },
    { code: 'SD', name: 'South Dakota' },
    { code: 'TN', name: 'Tennessee' },
    { code: 'TX', name: 'Texas' },
    { code: 'UT', name: 'Utah' },
    { code: 'VT', name: 'Vermont' },
    { code: 'VA', name: 'Virginia' },
    { code: 'WA', name: 'Washington' },
    { code: 'WV', name: 'West Virginia' },
    { code: 'WI', name: 'Wisconsin' },
    { code: 'WY', name: 'Wyoming' }
  ];

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={`${styles.addressForm} ${className}`}>
      <h3 className={styles.addressFormTitle}>{title}</h3>
      
      <div className={styles.addressFormSection}>
        <div className={styles.addressFormRow}>
          <div className={styles.addressFormField}>
            <label className={`${styles.addressFormLabel} ${styles.addressFormLabelRequired}`}>
              First Name
            </label>
            <input
              type="text"
              {...register('firstName')}
              className={`${styles.addressFormInput} ${errors.firstName ? styles.addressFormInputError : ''}`}
              placeholder="Enter first name"
            />
            {errors.firstName && (
              <p className={styles.addressFormError}>{errors.firstName.message}</p>
            )}
          </div>
          
          <div className={styles.addressFormField}>
            <label className={`${styles.addressFormLabel} ${styles.addressFormLabelRequired}`}>
              Last Name
            </label>
            <input
              type="text"
              {...register('lastName')}
              className={`${styles.addressFormInput} ${errors.lastName ? styles.addressFormInputError : ''}`}
              placeholder="Enter last name"
            />
            {errors.lastName && (
              <p className={styles.addressFormError}>{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className={styles.addressFormRow}>
          <div className={styles.addressFormField}>
            <label className={`${styles.addressFormLabel} ${styles.addressFormLabelRequired}`}>
              Email
            </label>
            <input
              type="email"
              {...register('email')}
              className={`${styles.addressFormInput} ${errors.email ? styles.addressFormInputError : ''}`}
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className={styles.addressFormError}>{errors.email.message}</p>
            )}
          </div>
          
          <div className={styles.addressFormField}>
            <label className={`${styles.addressFormLabel} ${styles.addressFormLabelRequired}`}>
              Phone
            </label>
            <input
              type="tel"
              {...register('phone')}
              className={`${styles.addressFormInput} ${errors.phone ? styles.addressFormInputError : ''}`}
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <p className={styles.addressFormError}>{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className={styles.addressFormField}>
          <label className={`${styles.addressFormLabel} ${styles.addressFormLabelRequired}`}>
            Address
          </label>
          <input
            type="text"
            {...register('address')}
            className={`${styles.addressFormInput} ${errors.address ? styles.addressFormInputError : ''}`}
            placeholder="Enter street address"
          />
          {errors.address && (
            <p className={styles.addressFormError}>{errors.address.message}</p>
          )}
        </div>

        <div className={styles.addressFormRow}>
          <div className={styles.addressFormField}>
            <label className={`${styles.addressFormLabel} ${styles.addressFormLabelRequired}`}>
              City
            </label>
            <input
              type="text"
              {...register('city')}
              className={`${styles.addressFormInput} ${errors.city ? styles.addressFormInputError : ''}`}
              placeholder="Enter city"
            />
            {errors.city && (
              <p className={styles.addressFormError}>{errors.city.message}</p>
            )}
          </div>
          
          <div className={styles.addressFormField}>
            <label className={`${styles.addressFormLabel} ${styles.addressFormLabelRequired}`}>
              State
            </label>
            <select
              {...register('state')}
              className={`${styles.addressFormSelect} ${errors.state ? styles.addressFormInputError : ''}`}
            >
              <option value="">Select state</option>
              {states.map(state => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className={styles.addressFormError}>{errors.state.message}</p>
            )}
          </div>
        </div>

        <div className={styles.addressFormRow}>
          <div className={styles.addressFormField}>
            <label className={`${styles.addressFormLabel} ${styles.addressFormLabelRequired}`}>
              ZIP Code
            </label>
            <input
              type="text"
              {...register('zipCode')}
              className={`${styles.addressFormInput} ${errors.zipCode ? styles.addressFormInputError : ''}`}
              placeholder="Enter ZIP code"
            />
            {errors.zipCode && (
              <p className={styles.addressFormError}>{errors.zipCode.message}</p>
            )}
          </div>
          
          <div className={styles.addressFormField}>
            <label className={`${styles.addressFormLabel} ${styles.addressFormLabelRequired}`}>
              Country
            </label>
            <select
              {...register('country')}
              className={`${styles.addressFormSelect} ${errors.country ? styles.addressFormInputError : ''}`}
            >
              {countries.map(country => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className={styles.addressFormError}>{errors.country.message}</p>
            )}
          </div>
        </div>

        {showDefaultCheckbox && (
          <div className={styles.addressFormCheckbox}>
            <input
              type="checkbox"
              {...register('isDefault')}
              className={styles.addressFormCheckboxInput}
            />
            <label className={styles.addressFormCheckboxLabel}>
              Set as default address
            </label>
          </div>
        )}

        <div className={styles.addressFormField}>
          <label className={styles.addressFormLabel}>
            Delivery Notes (Optional)
          </label>
          <textarea
            {...register('notes')}
            className={styles.addressFormTextarea}
            placeholder="Any special instructions for delivery..."
          />
          <p className={styles.addressFormHelp}>
            Add any special instructions for delivery, such as gate codes or building access.
          </p>
        </div>
      </div>

      <div className={styles.addressFormActions}>
        {onCancel && (
          <button
            type="button"
            onClick={handleCancel}
            className={styles.addressFormButtonSecondary}
          >
            Cancel
          </button>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${styles.addressFormButton} ${isSubmitting ? styles.addressFormButtonDisabled : ''}`}
        >
          {isSubmitting ? 'Saving...' : 'Save Address'}
        </button>
      </div>
    </form>
  );
};

export default AddressForm; 