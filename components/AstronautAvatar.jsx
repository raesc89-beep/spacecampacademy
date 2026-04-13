import React from 'react';
import { motion } from 'framer-motion';

export default function AstronautAvatar({ 
  skinTone = '#fcd9b8', 
  suitColor = '#ffffff', 
  visorColor = '#00e4ff', 
  accentColor = '#ff3366',
  size = 250,
  animate = false
}) {
  // Generar gradientes para dar volumen al traje
  const shade = '#d0d0d0'; // Sombra universal para partes blancas
  const suitShade = suitColor === '#ffffff' ? shade : suitColor;

  return (
    <motion.svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 250" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      animate={animate ? { y: [-5, 5, -5] } : {}}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
    >
      <defs>
        <radialGradient id="visorGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={visorColor} />
          <stop offset="100%" stopColor="#001133" />
        </radialGradient>
        <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={suitShade} stopOpacity={0.8} />
          <stop offset="50%" stopColor={suitColor} />
          <stop offset="100%" stopColor={suitShade} stopOpacity={0.8} />
        </linearGradient>
      </defs>

      {/* Backpack (Soporte Vital) */}
      <rect x="50" y="80" width="100" height="110" rx="15" fill={suitShade} opacity="0.9" />
      <rect x="60" y="90" width="80" height="90" rx="10" fill={suitColor} />

      {/* Brazos */}
      {/* Brazo Izquierdo */}
      <motion.g animate={animate ? { rotate: [-5, 5, -5] } : {}} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} style={{ transformOrigin: '70px 105px' }}>
         <path d="M 60 100 Q 30 130 40 180" fill="none" stroke={suitColor} strokeWidth="25" strokeLinecap="round" />
         {/* Guante */}
         <circle cx="43" cy="180" r="15" fill={accentColor} />
      </motion.g>

      {/* Brazo Derecho */}
      <motion.g animate={animate ? { rotate: [5, -5, 5] } : {}} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} style={{ transformOrigin: '130px 105px' }}>
         <path d="M 140 100 Q 170 130 160 180" fill="none" stroke={suitColor} strokeWidth="25" strokeLinecap="round" />
         {/* Guante */}
         <circle cx="157" cy="180" r="15" fill={accentColor} />
      </motion.g>

      {/* Piernas */}
      <path d="M 80 160 L 80 230" fill="none" stroke={suitColor} strokeWidth="30" strokeLinecap="round" />
      <path d="M 120 160 L 120 230" fill="none" stroke={suitColor} strokeWidth="30" strokeLinecap="round" />
      
      {/* Botas */}
      <path d="M 60 235 L 95 235 L 95 210 Q 77 210 60 235" fill={accentColor} />
      <path d="M 140 235 L 105 235 L 105 210 Q 123 210 140 235" fill={accentColor} />

      {/* Torso */}
      <ellipse cx="100" cy="135" rx="35" ry="45" fill="url(#suitGrad)" />
      {/* Panel de Control Pecho */}
      <rect x="85" y="110" width="30" height="25" rx="5" fill="#222" />
      <circle cx="92" cy="120" r="4" fill="#00ffcc" />
      <circle cx="108" cy="120" r="4" fill="#ff3366" />

      {/* Cuello */}
      <rect x="80" y="80" width="40" height="15" rx="5" fill="#555" />

      {/* Cabeza / Casco */}
      <g>
        {/* Base Casco */}
        <ellipse cx="100" cy="55" rx="45" ry="50" fill="url(#suitGrad)" />
        <ellipse cx="100" cy="55" rx="45" ry="50" fill="transparent" stroke={suitShade} strokeWidth="5" />
        
        {/* Adorno superior (antena/orejas) */}
        <path d="M 60 30 L 50 15 L 55 10 Z" fill={accentColor} />
        <path d="M 140 30 L 150 15 L 145 10 Z" fill={accentColor} />

        {/* Visor */}
        <ellipse cx="100" cy="55" rx="35" ry="30" fill="url(#visorGlow)" stroke="#111" strokeWidth="3" />
        
        {/* Rostro dentro del visor (Si queremos dar un hint de piel, esto solo se muestra levemente si usamos una máscara) */}
        {/* Para que la piel sea notoria vamos a cambiar un poco el visor para que sea transparente y veamos la piel. */}
        <ellipse cx="100" cy="55" rx="35" ry="30" fill={skinTone} opacity="0.35" />
        
        {/* Brillo del cristal */}
        <ellipse cx="85" cy="40" rx="10" ry="5" fill="rgba(255,255,255,0.4)" transform="rotate(-30 85 40)" />
      </g>
    </motion.svg>
  );
}
