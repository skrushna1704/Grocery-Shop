import { forwardRef } from 'react';
import styles from './Card.module.css';

const Card = forwardRef(({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  hover = false,
  ...props
}, ref) => {
  const cardClasses = [
    'card',
    `card-${variant}`,
    `card-padding-${padding}`,
    hover && 'card-hover',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      className={cardClasses}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

// Card sub-components
const CardHeader = forwardRef(({ children, className = '', ...props }, ref) => (
  <div ref={ref} className={`card-header ${className}`} {...props}>
    {children}
  </div>
));

const CardBody = forwardRef(({ children, className = '', ...props }, ref) => (
  <div ref={ref} className={`card-body ${className}`} {...props}>
    {children}
  </div>
));

const CardFooter = forwardRef(({ children, className = '', ...props }, ref) => (
  <div ref={ref} className={`card-footer ${className}`} {...props}>
    {children}
  </div>
));

CardHeader.displayName = 'CardHeader';
CardBody.displayName = 'CardBody';
CardFooter.displayName = 'CardFooter';

// Export all components
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
export { CardHeader, CardBody, CardFooter };