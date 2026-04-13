import React from 'react';
import { motion } from 'framer-motion';

export default function Spaceship({ 
  color = '#a0a0a0', 
  hull = 'standard', 
  wings = 'basic', 
  engine = 'ion',
  logo = 'none',
  size = 200,
  animate = false
}) {
  
  // Mapeo Dinámico de Chasis a Ilustraciones Premium
  let shipImage = '/assets/shuttle_vector.png'; // Fallback Base
  if (hull === 'heavy') shipImage = '/assets/heavy_cruiser_vector.png';
  if (hull === 'sharp') shipImage = '/assets/shuttle_vector.png'; // Reutilizamos pero con filtro
  if (hull === 'alien') shipImage = '/assets/alien_ship_vector.png';

  const renderLogo = () => {
    if (logo === 'nasa') {
      return <img src="/assets/logo_nasa_auth.png" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '25%', filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.5))', zIndex: 10 }} />;
    }
    if (logo === 'spacecamp') {
      // Sello con rellenado blanco original (sin transparencia corrupta)
      return <img src="/assets/main_logo.png" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '30%', zIndex: 10, background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />;
    }
    if (logo === 'lockheed') {
       return <img src="/assets/lockheed_logo.png" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '35%', zIndex: 10 }} />;
    }
    return null;
  };

  return (
    <motion.div 
       style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
       animate={animate ? { y: [-5, 5, -5] } : {}}
       transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
    >
        
        {/* Capa Base: Imagen de Alta Resolución del Chasis */}
        <img 
           src={shipImage} 
           alt="Spaceship Hull" 
           style={{ position: 'absolute', width: '90%', height: '90%', objectFit: 'contain', zIndex: 2, filter: `drop-shadow(0px 10px 15px ${color}88)` }} 
        />

        {/* Capa de Colorimetría: Tinte Dinámico Premium */}
        {/* Se usa mix-blend-mode sobre una silueta de máscara que tiñe metálicamente la nave sin arruinar brillos */}
        <div style={{
           position: 'absolute',
           width: '90%',
           height: '90%',
           maskImage: `url(${shipImage})`,
           WebkitMaskImage: `url(${shipImage})`,
           maskSize: 'contain',
           maskRepeat: 'no-repeat',
           maskPosition: 'center',
           background: color,
           mixBlendMode: 'multiply',
           opacity: 0.6,
           zIndex: 3,
           pointerEvents: 'none'
        }} />

        {/* Simulador Térmico del Engine */}
        {engine === 'plasma' && (
          <motion.div 
            style={{ position: 'absolute', bottom: '5%', width: '40%', height: '20%', background: 'radial-gradient(ellipse at center, rgba(0, 228, 255, 0.9) 0%, rgba(0,0,0,0) 70%)', zIndex: 1, filter: 'blur(8px)' }}
            animate={animate ? { opacity: [0.6, 1, 0.6], scale: [0.9, 1.1, 0.9] } : {}}
            transition={{ repeat: Infinity, duration: 0.5 }}
          />
        )}
        {engine === 'nova' && (
          <motion.div 
            style={{ position: 'absolute', bottom: '0%', width: '50%', height: '30%', background: 'radial-gradient(ellipse at center, rgba(255, 69, 0, 1) 0%, rgba(255, 215, 0, 0.6) 40%, rgba(0,0,0,0) 80%)', zIndex: 1, filter: 'blur(10px)' }}
            animate={animate ? { opacity: [0.8, 1, 0.8], scale: [1, 1.3, 1] } : {}}
            transition={{ repeat: Infinity, duration: 0.3 }}
          />
        )}
        {engine === 'ion' && (
          <motion.div 
            style={{ position: 'absolute', bottom: '5%', width: '30%', height: '15%', background: 'radial-gradient(ellipse at center, rgba(200, 200, 255, 0.8) 0%, rgba(0,0,0,0) 70%)', zIndex: 1, filter: 'blur(5px)' }}
          />
        )}

        {/* Insignia Adquirida Comprada */}
        {renderLogo()}

    </motion.div>
  );
}
