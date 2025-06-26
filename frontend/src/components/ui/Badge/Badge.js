import { forwardRef } from 'react';
import styles from './Badge.module.css';

const Badge = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}, ref) => {
  const badgeClasses = [
    'badge',
    `badge-${variant}`,
    `badge-${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <span
      ref={ref}
      className={badgeClasses}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

export default Badge;