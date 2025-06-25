import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import styles from './Button.module.css';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  animate = true,
  ...props
}, ref) => {
  const baseClasses = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth && 'w-full',
    disabled && 'opacity-50 cursor-not-allowed',
    loading && 'cursor-wait',
    className
  ].filter(Boolean).join(' ');

  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  const buttonContent = (
    <>
      {loading && (
        <div className="mr-2">
          <div className="spinner w-4 h-4" />
        </div>
      )}
      {leftIcon && !loading && (
        <span className="mr-2">{leftIcon}</span>
      )}
      <span className={loading ? 'opacity-70' : ''}>
        {children}
      </span>
      {rightIcon && !loading && (
        <span className="ml-2">{rightIcon}</span>
      )}
    </>
  );

  if (animate) {
    return (
      <motion.button
        ref={ref}
        type={type}
        className={baseClasses}
        disabled={disabled || loading}
        onClick={handleClick}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        transition={{ duration: 0.1 }}
        {...props}
      >
        {buttonContent}
      </motion.button>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      className={baseClasses}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {buttonContent}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;