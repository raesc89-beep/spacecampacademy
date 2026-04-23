'use client';
import { motion } from 'framer-motion';

export default function HubDecorations() {
  return (
    <>
      {/* Logo Agencia Mexicana de Divulgación Espacial Giratorio Arriba Derecha */}
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
            src="/assets/amde_logo.png"
            alt="Space Camp Logo"
            style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'normal' }} 
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
          {/* Premium Vector Spaceship */}
          <img src="/assets/shuttle_vector.png" alt="Travel Shuttle" style={{ width: '40px', objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(0,228,255,0.5))' }} />
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
          {/* Premium Vector UFO */}
          <img src="/assets/ufo_vector.png" alt="Alien UFO" style={{ width: '50px', objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(0,255,136,0.6))' }} />
        </motion.g>
      </motion.svg>
    </>
  );
}
