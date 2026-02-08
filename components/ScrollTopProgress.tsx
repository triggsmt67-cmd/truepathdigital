
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

interface ScrollTopProgressProps {
  onBackToTop?: () => void;
}

const ScrollTopProgress: React.FC<ScrollTopProgressProps> = ({ onBackToTop }) => {
  const { scrollYProgress } = useScroll();
  const [showButton, setShowButton] = useState(false);

  // Smooth the progress for the stroke animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScrollVisibility = () => {
      // Show button after 400px of scrolling
      setShowButton(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScrollVisibility, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollVisibility);
  }, []);

  const handleClick = () => {
    if (onBackToTop) {
      onBackToTop();
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Linear Top Progress Bar (Subtle) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-[60] origin-left pointer-events-none"
        style={{ scaleX: smoothProgress }}
      />

      {/* Floating Circular Back-to-Top Button */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-8 right-8 z-[60]"
          >
            <button
              onClick={handleClick}
              className="relative group w-14 h-14 rounded-full bg-background/80 backdrop-blur-xl border border-white/10 flex items-center justify-center transition-all hover:border-primary/50 hover:shadow-[0_0_30px_rgba(255,107,0,0.3)] focus:outline-none"
              aria-label="Back to top"
            >
              {/* Progress Ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r="26"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="transparent"
                  className="text-white/5"
                />
                <motion.circle
                  cx="28"
                  cy="28"
                  r="26"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="transparent"
                  strokeDasharray="163.36" // 2 * PI * r (approx)
                  style={{
                    pathLength: smoothProgress,
                  }}
                  className="text-primary drop-shadow-[0_0_8px_rgba(255,107,0,0.6)]"
                />
              </svg>

              {/* Icon */}
              <ChevronUp className="w-6 h-6 text-white group-hover:text-primary transition-colors group-hover:-translate-y-1 duration-300" />

              {/* Outer Glow Ring */}
              <div className="absolute inset-[-4px] rounded-full border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-110" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollTopProgress;
