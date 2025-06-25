import { forwardRef } from 'react';
import styles from './Spinner.module.css';

const Spinner = forwardRef(({
  size = 'md',
  color = 'primary',
  className = '',
  ...props
}, ref) => {
  const spinnerClasses = [
    'spinner',
    `spinner-${size}`,
    `spinner-${color}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      className={spinnerClasses}
      role="status"
      aria-label="Loading"
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
});

Spinner.displayName = 'Spinner';

export default Spinner;