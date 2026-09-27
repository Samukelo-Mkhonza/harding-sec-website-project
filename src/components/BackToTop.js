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
    'bottom-right': 'bottom-5 right-5 md:bottom-8 md:right-8',
    'bottom-left': 'bottom-8 left-8',
    'bottom-center': 'bottom-8 left-1/2 -translate-x-1/2',
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      className={`fixed ${positionClasses[position]} z-40 w-12 h-12 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark hover:shadow-xl flex items-center justify-center transition-colors duration-200 animate-fade-in group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-neon focus-visible:ring-offset-2 print:hidden`}
      aria-label="Back to top"
    >
      <FaArrowUp className="text-lg group-hover:-translate-y-0.5 transition-transform duration-200" aria-hidden="true" />
    </button>
  );
};

export default BackToTop;
