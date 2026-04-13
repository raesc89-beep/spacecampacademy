'use client';
import { motion } from 'framer-motion';

export default function HubDecorations() {
  return (
    <>
      {/* Logo Space Camp Academy Giratorio Arriba Derecha */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          width: '80px',
          height: '80px',
          zIndex: 50,
          pointerEvents: 'none',
          borderRadius: '50%',
          overflow: 'hidden',
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(5px)'
        }}
      >
         <img 
            src="/assets/space_camp_logo.png" 
            alt="Space Camp Logo"
            style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'screen' }} 
         />
      </motion.div>

      {/* Nave Espacial con Curva Bézier */}
      <motion.svg
        viewBox="0 0 100 100"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}
      >
        <motion.path
          d="M -10,80 Q 30,20 60,70 T 110,40"
          fill="transparent"
          stroke="transparent"
          id="shipPath"
        />
        <motion.g
          animate={{ offsetDistance: ["0%", "100%"] }}
          transition={{ duration: 35, ease: "linear", repeat: Infinity, repeatDelay: 10 }}
          style={{ offsetPath: "path('M -10,80 Q 30,20 60,70 T 110,40')", offsetRotate: "auto" }}
        >
          {/* Simple Vector Spaceship */}
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
             <path d="M12 2L2 22l10-4 10 4L12 2z" fill="var(--electric-blue)" opacity="0.8"/>
             <path d="M12 22V18" stroke="orange" strokeWidth="3" opacity="0.8"/>
          </svg>
        </motion.g>
      </motion.svg>

      {/* UFO Errático */}
      <motion.svg
        viewBox="0 0 100 100"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}
      >
        <motion.g
          animate={{ offsetDistance: ["100%", "0%"] }}
          transition={{ duration: 45, ease: "easeInOut", repeat: Infinity, repeatDelay: 15 }}
          style={{ offsetPath: "path('M 110,10 Q 50,50 80,90 T -10,50')", offsetRotate: "auto" }}
        >
          {/* Simple Vector UFO */}
          <svg width="50" height="30" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="1.5">
             <ellipse cx="12" cy="14" rx="10" ry="4" fill="rgba(0,255,136,0.3)"/>
             <path d="M7 13c0-3 2.5-6 5-6s5 3 5 6" fill="rgba(255,255,255,0.8)"/>
          </svg>
        </motion.g>
      </motion.svg>
    </>
  );
}
