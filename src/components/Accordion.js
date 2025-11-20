import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AccordionItem = ({ item, isExpanded, onToggle, animated }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      const element = contentRef.current;
      const rect = element.getBoundingClientRect();
      const isBelow = rect.bottom > window.innerHeight;
      
      if (isBelow) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [isExpanded]);

  return (
    <div className="border-b border-neutral-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-neutral-50 transition-colors duration-200"
        aria-expanded={isExpanded}
      >
        <span className="font-semibold text-neutral-900">{item.title}</span>
        <motion.i
          className="fas fa-chevron-down text-primary"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </button>
      
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            ref={contentRef}
            initial={animated ? { height: 0, opacity: 0 } : false}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 text-neutral-700">
              {item.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Accordion = ({
  items = [],
  mode = 'single',
  defaultExpanded = [],
  animated = true,
  className = '',
}) => {
  const [expandedItems, setExpandedItems] = useState(defaultExpanded);

  const handleToggle = (itemId) => {
    if (mode === 'single') {
      setExpandedItems(expandedItems.includes(itemId) ? [] : [itemId]);
    } else {
      setExpandedItems(
        expandedItems.includes(itemId)
          ? expandedItems.filter(id => id !== itemId)
          : [...expandedItems, itemId]
      );
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % items.length;
      document.querySelector(`[data-accordion-index="${nextIndex}"]`)?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + items.length) % items.length;
      document.querySelector(`[data-accordion-index="${prevIndex}"]`)?.focus();
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {items.map((item, index) => (
        <div key={item.id} data-accordion-index={index} onKeyDown={(e) => handleKeyDown(e, index)}>
          <AccordionItem
            item={item}
            isExpanded={expandedItems.includes(item.id)}
            onToggle={() => handleToggle(item.id)}
            animated={animated}
          />
        </div>
      ))}
    </div>
  );
};

export default Accordion;
