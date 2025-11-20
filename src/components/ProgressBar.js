import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ProgressBar Component
 * Linear progress indicator for page transitions and loading states
 * 
 * @param {boolean} isLoading - Whether to show the progress bar
 * @param {string} color - Progress bar color (default: primary brand color)
 * @param {string} height - Height of the progress bar
 * @param {string} position - Position (top or bottom)
 */
const ProgressBar = ({
  isLoading = false,
  color = '#19467E',
  height = '3px',
  position = 'top',
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      
      // Animate to 90% over 2 seconds
      const timer1 = setTimeout(() => {
        setProgress(90);
      }, 100);

      return () => clearTimeout(timer1);
    } else if (progress > 0) {
      // Jump to 100% when loading completes
      setProgress(100);
      
      // Reset after fade out
      const timer2 = setTimeout(() => {
        setProgress(0);
      }, 500);

      return () => clearTimeout(timer2);
    }
  }, [isLoading, progress]);

  const positionStyles = position === 'top'
    ? { top: 0, left: 0, right: 0 }
    : { bottom: 0, left: 0, right: 0 };

  return (
    <AnimatePresence>
      {progress > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            ...positionStyles,
            height,
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        >
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{
              duration: progress === 100 ? 0.2 : 2,
              ease: progress === 100 ? 'easeOut' : 'easeInOut',
            }}
            style={{
              height: '100%',
              backgroundColor: color,
              boxShadow: `0 0 10px ${color}`,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProgressBar;
