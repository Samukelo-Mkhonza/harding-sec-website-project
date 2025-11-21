import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';
import useScrollPosition from '../hooks/useScrollPosition';
import { SCROLL_THRESHOLDS } from '../utils/constants';

/**
 * BackToTop Component
 * Floating button that appears when user scrolls down
 * and smoothly scrolls back to top when clicked
 * 
 * @param {number} threshold - Scroll position to show button (default: 500px)
 * @param {string} position - Position (bottom-right, bottom-left, bottom-center)
 */
const BackToTop = ({ 
  threshold = SCROLL_THRESHOLDS.BACK_TO_TOP,
  position = 'bottom-right'
}) => {
  const scrollY = useScrollPosition();
  const isVisible = scrollY > threshold;

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Position classes
  const positionClasses = {
    'bottom-right': 'bottom-8 right-8',
    'bottom-left': 'bottom-8 left-8',
    'bottom-center': 'bottom-8 left-1/2 -translate-x-1/2',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleScrollToTop}
          className={`fixed ${positionClasses[position]} z-50 w-12 h-12 bg-primary text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 group`}
          aria-label="Back to top"
        >
          <FaArrowUp className="text-lg group-hover:-translate-y-1 transition-transform duration-200" />
          
          {/* Ripple effect on hover */}
          <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
