import { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  X 
} from 'lucide-react';
import styles from './Alert.module.css';

const Alert = forwardRef(({
  children,
  variant = 'info',
  size = 'md',
  icon = true,
  closable = false,
  onClose,
  className = '',
  animate = true,
  ...props
}, ref) => {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info
  };

  const IconComponent = icons[variant];

  const alertClasses = [
    'alert',
    `alert-${variant}`,
    `alert-${size}`,
    className
  ].filter(Boolean).join(' ');

  const alertContent = (
    <div className={alertClasses} ref={ref} {...props}>
      <div className="flex">
        {icon && IconComponent && (
          <div className="flex-shrink-0">
            <IconComponent className="alert-icon" />
          </div>
        )}
        <div className="flex-1">
          {children}
        </div>
        {closable && (
          <div className="flex-shrink-0 ml-auto pl-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              <span className="sr-only">Dismiss</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        {alertContent}
      </motion.div>
    );
  }

  return alertContent;
});

Alert.displayName = 'Alert';

// Alert sub-components
const AlertTitle = forwardRef(({ children, className = '', ...props }, ref) => (
  <h3 ref={ref} className={`alert-title ${className}`} {...props}>
    {children}
  </h3>
));

const AlertDescription = forwardRef(({ children, className = '', ...props }, ref) => (
  <div ref={ref} className={`alert-description ${className}`} {...props}>
    {children}
  </div>
));

AlertTitle.displayName = 'AlertTitle';
AlertDescription.displayName = 'AlertDescription';

// Export all components
Alert.Title = AlertTitle;
Alert.Description = AlertDescription;

export default Alert;
export { AlertTitle, AlertDescription };