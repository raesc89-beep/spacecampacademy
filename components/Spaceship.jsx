import React from 'react';
import { motion } from 'framer-motion';

export default function Spaceship({ 
  color = '#a0a0a0', 
  hull = 'standard', 
  wings = 'basic', 
  engine = 'ion',
  size = 200,
  animate = false
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Glow Effects */}
        <filter id="engineGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={engine === 'nova' ? "4" : "2"} result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="coreGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* --- ENGINES (Propulsor y Fuego) --- */}
      <g style={{ transformOrigin: '50% 85%' }}>
        {engine === 'ion' && (
          <>
            <rect x="42" y="80" width="16" height="10" fill="#333" rx="2" />
            {(animate ? <motion.path d="M45,90 Q50,110 55,90 Z" fill="#00e4ff" filter="url(#engineGlow)"
                animate={{ d: ["M45,90 Q50,110 55,90 Z", "M44,90 Q50,120 56,90 Z", "M45,90 Q50,110 55,90 Z"] }}
                transition={{ duration: 0.5, repeat: Infinity }} />
              : <path d="M45,90 Q50,110 55,90 Z" fill="#00e4ff" filter="url(#engineGlow)" />
            )}
          </>
        )}
        
        {engine === 'plasma' && (
          <>
            <rect x="35" y="75" width="10" height="12" fill="#222" rx="2" />
            <rect x="55" y="75" width="10" height="12" fill="#222" rx="2" />
            {(animate ? <motion.path d="M36,87 Q40,115 44,87 M56,87 Q60,115 64,87" fill="none" stroke="#d500f9" strokeWidth="6" strokeLinecap="round" filter="url(#engineGlow)"
                animate={{ strokeWidth: [6, 8, 6], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 0.2, repeat: Infinity }} />
              : <path d="M36,87 Q40,115 44,87 M56,87 Q60,115 64,87" fill="none" stroke="#d500f9" strokeWidth="6" strokeLinecap="round" filter="url(#engineGlow)" />
            )}
          </>
        )}

        {engine === 'nova' && (
          <>
            <polygon points="30,70 70,70 65,85 35,85" fill="#111" />
            {(animate ? <motion.path d="M35,85 Q50,130 65,85 Z" fill="#ff7f00" filter="url(#engineGlow)"
                animate={{ d: ["M35,85 Q50,130 65,85 Z", "M30,85 Q50,150 70,85 Z", "M35,85 Q50,130 65,85 Z"] }}
                transition={{ duration: 0.3, repeat: Infinity }} />
              : <path d="M35,85 Q50,130 65,85 Z" fill="#ff7f00" filter="url(#engineGlow)" />
            )}
          </>
        )}
      </g>

      {/* --- WINGS (Alas) --- */}
      {wings === 'basic' && (
        <path d="M30,60 L15,80 L35,75 Z M70,60 L85,80 L65,75 Z" fill={color} opacity="0.8" />
      )}
      
      {wings === 'delta' && (
        <path d="M50,20 L5,85 L40,75 Z M50,20 L95,85 L60,75 Z" fill={color} opacity="0.6" />
      )}

      {wings === 'x-wing' && (
        <>
           <path d="M35,45 L5,35 L20,55 Z M65,45 L95,35 L80,55 Z" fill={color} opacity="0.9" />
           <path d="M30,65 L0,85 L25,80 Z M70,65 L100,85 L75,80 Z" fill={color} opacity="0.7" />
        </>
      )}

      {/* --- HULL (Chasis) --- */}
      {hull === 'standard' && (
        <>
          <ellipse cx="50" cy="50" rx="18" ry="35" fill={color} />
          <ellipse cx="50" cy="40" rx="10" ry="15" fill="#a0e0ff" filter="url(#coreGlow)" opacity="0.8" />
        </>
      )}
      
      {hull === 'sharp' && (
        <>
          <polygon points="50,10 65,80 35,80" fill={color} />
          <polygon points="50,25 58,60 42,60" fill="#a0e0ff" filter="url(#coreGlow)" opacity="0.8" />
        </>
      )}

      {hull === 'heavy' && (
        <>
          <rect x="30" y="25" width="40" height="55" rx="8" fill={color} />
          <polygon points="30,25 50,5 70,25" fill={color} />
          <rect x="40" y="20" width="20" height="25" rx="4" fill="#a0e0ff" filter="url(#coreGlow)" opacity="0.7" />
        </>
      )}
      
      {/* Detalle Central Luminoso común */}
      <circle cx="50" cy="65" r="4" fill="#fff" filter="url(#coreGlow)" opacity={animate ? 1 : 0.4} />
      {animate && (
        <motion.circle cx="50" cy="65" r="5" fill="#fff" filter="url(#coreGlow)" 
           animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, repeat: Infinity }} />
      )}
    </svg>
  );
}
