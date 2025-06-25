import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import styles from './Dropdown.module.css';

const Dropdown = ({
  trigger,
  children,
  placement = 'bottom',
  className = '',
  disabled = false,
  onOpenChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleEscape = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => {
    if (!disabled) {
      const newState = !isOpen;
      setIsOpen(newState);
      onOpenChange?.(newState);
    }
  };

  const getPlacementClasses = () => {
    const baseClasses = [styles.dropdownContent];
    
    switch (placement) {
      case 'top':
        baseClasses.push(styles.dropdownContentTop);
        break;
      case 'left':
        baseClasses.push(styles.dropdownContentLeft);
        break;
      case 'right':
        baseClasses.push(styles.dropdownContentRight);
        break;
      default:
        break;
    }
    
    return baseClasses.join(' ');
  };

  return (
    <div ref={dropdownRef} className={`${styles.dropdown} ${className}`}>
      <button
        type="button"
        onClick={toggleDropdown}
        disabled={disabled}
        className={`${styles.dropdownTrigger} ${isOpen ? styles.dropdownTriggerOpen : ''}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {trigger}
        <ChevronDownIcon 
          className={`${styles.dropdownIcon} ${isOpen ? styles.dropdownIconOpen : ''}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={getPlacementClasses()}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Dropdown Item Component
export const DropdownItem = ({ 
  children, 
  onClick, 
  disabled = false, 
  active = false,
  className = '' 
}) => {
  const handleClick = (e) => {
    if (!disabled && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`${styles.dropdownItem} ${active ? styles.dropdownItemActive : ''} ${disabled ? styles.dropdownItemDisabled : ''} ${className}`}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
    >
      {children}
    </div>
  );
};

// Dropdown Divider Component
export const DropdownDivider = () => (
  <div className={styles.dropdownDivider} role="separator" />
);

// Dropdown Header Component
export const DropdownHeader = ({ children, className = '' }) => (
  <div className={`${styles.dropdownHeader} ${className}`}>
    {children}
  </div>
);

export default Dropdown; 