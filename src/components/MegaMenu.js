import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MegaMenu Component
 * Multi-column dropdown navigation for complex site structure
 * 
 * @param {Array} items - Menu items with columns
 * @param {number} columns - Number of columns (default: 3)
 * @param {boolean} showIcons - Show icons for menu items
 */
const MegaMenu = ({ items = [], columns = 3, showIcons = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = (menuId) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Delay opening by 200ms
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
      setActiveMenu(menuId);
    }, 200);
  };

  const handleMouseLeave = () => {
    // Clear timeout if mouse leaves before delay completes
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    setIsOpen(false);
    setActiveMenu(null);
  };

  // Keyboard navigation
  const handleKeyDown = (e, menuId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
      setActiveMenu(menuId);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setActiveMenu(null);
    }
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {items.map((item, index) => (
        <div
          key={index}
          className="relative inline-block"
          onMouseEnter={() => handleMouseEnter(item.id)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Trigger Button */}
          <button
            className="flex items-center gap-2 px-4 py-2 text-white font-medium rounded-lg transition-all duration-200 hover:bg-white/10"
            onKeyDown={(e) => handleKeyDown(e, item.id)}
            aria-expanded={isOpen && activeMenu === item.id}
            aria-haspopup="true"
          >
            {showIcons && item.icon && (
              <i className={item.icon}></i>
            )}
            <span>{item.label}</span>
            <i className={`fas fa-chevron-down text-xs transition-transform duration-200 ${
              isOpen && activeMenu === item.id ? 'rotate-180' : ''
            }`}></i>
          </button>

          {/* Mega Menu Dropdown */}
          <AnimatePresence>
            {isOpen && activeMenu === item.id && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl overflow-hidden z-50"
                style={{ minWidth: '600px' }}
              >
                <div className={`grid grid-cols-${columns} gap-6 p-6`}>
                  {item.columns && item.columns.map((column, colIndex) => (
                    <div key={colIndex} className="space-y-4">
                      {/* Column Header */}
                      {column.title && (
                        <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider border-b border-neutral-200 pb-2">
                          {column.title}
                        </h3>
                      )}

                      {/* Column Links */}
                      <div className="space-y-2">
                        {column.links && column.links.map((link, linkIndex) => (
                          <Link
                            key={linkIndex}
                            to={link.href}
                            className="block group"
                            onClick={() => {
                              setIsOpen(false);
                              setActiveMenu(null);
                            }}
                          >
                            <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-primary/5 transition-colors duration-200">
                              {showIcons && link.icon && (
                                <i className={`${link.icon} text-primary mt-1`}></i>
                              )}
                              <div className="flex-1">
                                <div className="font-semibold text-neutral-900 group-hover:text-primary transition-colors duration-200">
                                  {link.label}
                                </div>
                                {link.description && (
                                  <div className="text-sm text-neutral-600 mt-1">
                                    {link.description}
                                  </div>
                                )}
                              </div>
                              <i className="fas fa-arrow-right text-xs text-neutral-400 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 mt-1"></i>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Optional Featured Section */}
                {item.featured && (
                  <div className="bg-primary/5 p-6 border-t border-neutral-200">
                    <div className="flex items-center gap-4">
                      {item.featured.image && (
                        <img
                          src={item.featured.image}
                          alt={item.featured.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-bold text-neutral-900 mb-1">
                          {item.featured.title}
                        </h4>
                        <p className="text-sm text-neutral-600 mb-2">
                          {item.featured.description}
                        </p>
                        <Link
                          to={item.featured.href}
                          className="text-sm font-semibold text-primary hover:underline"
                          onClick={() => {
                            setIsOpen(false);
                            setActiveMenu(null);
                          }}
                        >
                          {item.featured.linkText || 'Learn More'} →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default MegaMenu;
