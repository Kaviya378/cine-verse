import React from 'react';
import { motion, Variants } from 'framer-motion';

export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 }
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

export const FadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={fadeIn}
    transition={{ delay, duration: 0.6, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

export const Stagger: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <motion.div initial="hidden" animate="visible" variants={staggerContainer} className={className}>
    {children}
  </motion.div>
);

export default FadeIn;
