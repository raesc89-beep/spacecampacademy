'use client';
import { motion } from 'framer-motion';

export default function AnimatedMainLogo({ size = 40 }) {
  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, rotate: 180 }}
      transition={{ type: 'spring', stiffness: 200, damping: 10 }}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        boxShadow: '0 0 15px rgba(0, 228, 255, 0.4)'
      }}
    >
      <motion.img 
        src="/assets/main_logo.png" 
        alt="Space Camp Academy Logo" 
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  );
}
