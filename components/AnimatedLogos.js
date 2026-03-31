'use client';
import { motion } from 'framer-motion';

export default function AnimatedLogos({ size = 50, showAll = true }) {
  const containerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'inline-block',
    boxShadow: '0 0 10px rgba(0,228,255,0.3)',
    border: '2px solid rgba(255,255,255,0.1)',
  };

  const imageStyle = {
    width: '300%', // 3 logos side-by-side
    height: '100%',
    objectFit: 'cover',
  };

  const animateProps = {
    whileHover: { scale: 1.1, rotate: 15, boxShadow: '0 0 20px rgba(0,228,255,0.8)' },
    transition: { type: 'spring', stiffness: 300 }
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      
      {/* Logo 1: AMDE (Left side of banner) */}
      <motion.div style={containerStyle} {...animateProps}>
        <img src="/assets/partner_banner.png" style={{ ...imageStyle, objectPosition: 'left' }} alt="AMDE Logo" />
      </motion.div>

      {/* Logo 2: GENIUS (Center of banner) */}
      {showAll && (
        <motion.div style={containerStyle} {...animateProps}>
          <img src="/assets/partner_banner.png" style={{ ...imageStyle, objectPosition: 'center' }} alt="Genius Logo" />
        </motion.div>
      )}

      {/* Logo 3: Space Academy Camp (Right side of banner) */}
      {showAll && (
        <motion.div style={containerStyle} {...animateProps}>
          <img src="/assets/partner_banner.png" style={{ ...imageStyle, objectPosition: 'right' }} alt="Space Academy Camp Logo" />
        </motion.div>
      )}

    </div>
  );
}
