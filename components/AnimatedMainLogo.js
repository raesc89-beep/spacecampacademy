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
        height: `${size}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: 'drop-shadow(0 0 15px rgba(0, 228, 255, 0.4))'
      }}
    >
      <motion.img 
        src="/assets/amde_logo.png" 
        alt="AMDE Logo" 
        style={{ width: 'auto', height: '100%', objectFit: 'contain' }}
      />
    </motion.div>
  );
}
