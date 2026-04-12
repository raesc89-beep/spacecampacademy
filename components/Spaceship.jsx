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
  // Generate a darker variant of the base color for shading
  const darkenColor = (hex, percent = 40) => {
    let r = parseInt(hex.substring(1,3), 16);
    let g = parseInt(hex.substring(3,5), 16);
    let b = parseInt(hex.substring(5,7), 16);
    r = Math.floor(r * (100 - percent) / 100);
    g = Math.floor(g * (100 - percent) / 100);
    b = Math.floor(b * (100 - percent) / 100);
    return '#' + r.toString(16).padStart(2,'0') + g.toString(16).padStart(2,'0') + b.toString(16).padStart(2,'0');
  };

  const shade = darkenColor(color, 40);
  const darkShade = darkenColor(color, 60);

  const renderLogo = () => {
    if (logo === 'nasa') {
      return (
         <g transform="translate(42, 45) scale(0.15)">
           <circle cx="50" cy="50" r="45" fill="#0b3d91" />
           <path d="M 10 50 Q 50 10 90 50" stroke="#fc3d21" strokeWidth="6" fill="none" />
           <text x="50" y="55" fontSize="30" fill="white" textAnchor="middle" fontWeight="bold" fontFamily="sans-serif">NASA</text>
         </g>
      );
    }
    if (logo === 'spacecamp') {
      return (
         <g transform="translate(43, 46) scale(0.14)">
           <circle cx="50" cy="50" r="45" fill="#111" stroke="#ff3366" strokeWidth="4" />
           <text x="50" y="55" fontSize="24" fill="#00e4ff" textAnchor="middle" fontWeight="bold" fontFamily="sans-serif">SC</text>
         </g>
      );
    }
    if (logo === 'lockheed') {
      return (
         <g transform="translate(42, 46) scale(0.16)">
           <polygon points="50,10 70,50 30,50" fill="#a0a0a0" />
           <polygon points="50,90 70,50 30,50" fill="#e0e0e0" />
           <circle cx="50" cy="50" r="5" fill="#00e4ff" />
         </g>
      );
    }
    return null;
  };

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cockpitGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00e4ff" />
          <stop offset="100%" stopColor="#0055ff" />
        </radialGradient>
        
        <linearGradient id="hullGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={shade} />
          <stop offset="50%" stopColor={color} />
          <stop offset="100%" stopColor={shade} />
        </linearGradient>

        <linearGradient id="bodyDetails" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
        </linearGradient>

        <filter id="engineGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={engine === 'nova' ? "4" : "2"} result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* --- WINGS (Alas - Detrás del chasis) --- */}
      {wings === 'basic' && (
        <g stroke={darkShade} strokeWidth="1">
           {/* Left Wing */}
           <path d="M 40 50 L 15 85 L 45 80 Z" fill={color} />
           <path d="M 40 50 L 15 85 L 45 80 Z" fill="url(#bodyDetails)" />
           {/* Right Wing */}
           <path d="M 60 50 L 85 85 L 55 80 Z" fill={color} />
           <path d="M 60 50 L 85 85 L 55 80 Z" fill="url(#bodyDetails)" />
        </g>
      )}
      
      {wings === 'delta' && (
        <g stroke={darkShade} strokeWidth="1">
           {/* Aerodynamic swept back wings */}
           <path d="M 50 30 L 5 80 L 35 85 L 50 65 Z" fill={color} />
           <path d="M 50 30 L 5 80 L 35 85 L 50 65 Z" fill="url(#bodyDetails)" />
           <path d="M 50 30 L 95 80 L 65 85 L 50 65 Z" fill={color} />
           <path d="M 50 30 L 95 80 L 65 85 L 50 65 Z" fill="url(#bodyDetails)" />
        </g>
      )}

      {wings === 'x-wing' && (
        <g stroke={darkShade} strokeWidth="1">
           {/* Upper X */}
           <path d="M 45 40 L 5 25 L 30 55 Z" fill={shade} />
           <path d="M 55 40 L 95 25 L 70 55 Z" fill={shade} />
           {/* Lower X */}
           <path d="M 40 60 L 0 85 L 35 80 Z" fill={color} />
           <path d="M 40 60 L 0 85 L 35 80 Z" fill="url(#bodyDetails)" />
           <path d="M 60 60 L 100 85 L 65 80 Z" fill={color} />
           <path d="M 60 60 L 100 85 L 65 80 Z" fill="url(#bodyDetails)" />
           {/* Wing Blasters */}
           <rect x="0" y="80" width="4" height="15" fill="#333" />
           <rect x="96" y="80" width="4" height="15" fill="#333" />
        </g>
      )}

      {/* --- ENGINES (Propulsión y Escape térmico) --- */}
      <g style={{ transformOrigin: '50% 85%' }}>
        {engine === 'ion' && (
          <>
            <path d="M 40 80 L 60 80 L 55 90 L 45 90 Z" fill="#222" stroke="#111" />
            <rect x="42" y="88" width="16" height="4" fill="#000" />
            {(animate ? <motion.path d="M45,92 Q50,110 55,92 Z" fill="#00e4ff" filter="url(#engineGlow)"
                animate={{ d: ["M45,92 Q50,110 55,92 Z", "M44,92 Q50,115 56,92 Z", "M45,92 Q50,110 55,92 Z"] }}
                transition={{ duration: 0.5, repeat: Infinity }} />
              : <path d="M45,92 Q50,110 55,92 Z" fill="#00e4ff" filter="url(#engineGlow)" />
            )}
          </>
        )}
        
        {engine === 'plasma' && (
          <>
            <path d="M 33 75 L 43 75 L 40 85 L 36 85 Z" fill="#222" />
            <path d="M 57 75 L 67 75 L 64 85 L 60 85 Z" fill="#222" />
            {(animate ? <motion.path d="M38,85 Q40,115 42,85 M58,85 Q60,115 62,85" fill="none" stroke="#d500f9" strokeWidth="5" strokeLinecap="round" filter="url(#engineGlow)"
                animate={{ strokeWidth: [5, 7, 5], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 0.2, repeat: Infinity }} />
              : <path d="M38,85 Q40,115 42,85 M58,85 Q60,115 62,85" fill="none" stroke="#d500f9" strokeWidth="5" strokeLinecap="round" filter="url(#engineGlow)" />
            )}
          </>
        )}

        {engine === 'nova' && (
          <>
            <path d="M 30 70 L 70 70 L 60 90 L 40 90 Z" fill="#151515" />
            <rect x="35" y="85" width="30" height="5" fill="#ff7f00" filter="url(#engineGlow)" />
            {(animate ? <motion.path d="M35,90 Q50,140 65,90 Z" fill="#ff4500" filter="url(#engineGlow)"
                animate={{ d: ["M35,90 Q50,140 65,90 Z", "M30,90 Q50,160 70,90 Z", "M35,90 Q50,140 65,90 Z"] }}
                transition={{ duration: 0.3, repeat: Infinity }} />
              : <path d="M35,90 Q50,140 65,90 Z" fill="#ff4500" filter="url(#engineGlow)" />
            )}
          </>
        )}
      </g>

      {/* --- HULL (Chasis Corporal) --- */}
      {hull === 'standard' && (
        <g stroke={darkShade} strokeWidth="1">
          {/* Main Body */}
          <ellipse cx="50" cy="45" rx="18" ry="40" fill="url(#hullGrad)" />
          {/* Armor plates */}
          <path d="M 35 45 Q 50 85 65 45" fill="none" stroke={shade} strokeWidth="2" />
          <path d="M 32 45 Q 50 5 68 45" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          {/* Cockpit Window */}
          <ellipse cx="50" cy="30" rx="8" ry="14" fill="url(#cockpitGlow)" stroke="#111" strokeWidth="2" />
          <path d="M 45 25 L 55 25" stroke="rgba(255,255,255,0.8)" strokeWidth="1" />
        </g>
      )}
      
      {hull === 'sharp' && (
        <g stroke={darkShade} strokeWidth="1">
          <path d="M 50 5 L 68 75 L 50 85 L 32 75 Z" fill="url(#hullGrad)" />
          {/* Internal armor lines */}
          <path d="M 50 5 L 50 85" stroke={shade} strokeWidth="2" />
          <path d="M 36 60 L 64 60" stroke={shade} strokeWidth="1" />
          {/* Cockpit Window */}
          <polygon points="50,20 56,40 44,40" fill="url(#cockpitGlow)" stroke="#111" strokeWidth="2" />
        </g>
      )}

      {hull === 'heavy' && (
        <g stroke={darkShade} strokeWidth="1">
          {/* Front Nose */}
          <polygon points="35,25 50,5 65,25" fill="url(#hullGrad)" />
          {/* Main Block */}
          <rect x="35" y="25" width="30" height="55" rx="4" fill="url(#hullGrad)" />
          {/* Heavy plating */}
          <line x1="35" y1="40" x2="65" y2="40" stroke={shade} strokeWidth="3" />
          <line x1="35" y1="60" x2="65" y2="60" stroke={shade} strokeWidth="3" />
          {/* Quad Cockpit Window */}
          <rect x="42" y="15" width="16" height="10" rx="2" fill="url(#cockpitGlow)" stroke="#111" strokeWidth="1.5" />
          <rect x="42" y="27" width="16" height="6" rx="2" fill="url(#cockpitGlow)" stroke="#111" strokeWidth="1.5" />
        </g>
      )}
      
      {/* Detalle Central: Logo Rendering */}
      {renderLogo()}

    </svg>
  );
}
