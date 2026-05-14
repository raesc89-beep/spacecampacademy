'use client';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Módulos del curso ─────────────────────────────────────────────────────
const BTTF_MODULES = [
  {
    id: 'bttf_m1',
    title: 'El Condensador de Flujo',
    color: '#00FFFF', // Cyan glow
    link: '/course/bttf_m1',
    icon: '/assets/bttf/bttf_m1.png',
    coords: { left: '15%', top: '20%' },
  },
  {
    id: 'bttf_m2',
    title: 'Viajes en el Tiempo',
    color: '#FF00FF', // Magenta glow
    link: '/course/bttf_m2',
    icon: '/assets/bttf/bttf_m2.png',
    coords: { left: '40%', top: '15%' },
  },
  {
    id: 'bttf_m3',
    title: 'Paradojas Temporales',
    color: '#FFA500', // Orange glow
    link: '/course/bttf_m3',
    icon: '/assets/bttf/bttf_m3.png',
    coords: { left: '65%', top: '20%' },
  },
  {
    id: 'bttf_m4',
    title: 'Energía a 1.21 Gigawatts',
    color: '#FFFF00', // Yellow lightning
    link: '/course/bttf_m4',
    icon: '/assets/bttf/bttf_m4.png',
    coords: { left: '25%', top: '40%' },
  },
  {
    id: 'bttf_m5',
    title: 'Aeropatines y Antigravedad',
    color: '#00FF00', // Green hoverboard
    link: '/course/bttf_m5',
    icon: '/assets/bttf/bttf_m5.png',
    coords: { left: '50%', top: '35%' },
  },
  {
    id: 'bttf_m6',
    title: 'La Máquina del Tiempo',
    color: '#FF4500', // Fire trails
    link: '/course/bttf_m6',
    icon: '/assets/bttf/bttf_m6.png',
    coords: { left: '75%', top: '45%' },
  },
  {
    id: 'bttf_m7',
    title: 'Biotecnología del Futuro',
    color: '#8A2BE2', // Neon purple
    link: '/course/bttf_m7',
    icon: '/assets/bttf/bttf_m7.png',
    coords: { left: '35%', top: '60%' },
  },
];

// ─── Constelación de Nodos ──────────────────────────────────────────────────
function ConstellationLines() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}>
      {BTTF_MODULES.map((mod, i) => {
        if (i === BTTF_MODULES.length - 1) return null;
        const nextMod = BTTF_MODULES[i + 1];
        return (
          <line
            key={i}
            x1={mod.coords.left}
            y1={mod.coords.top}
            x2={nextMod.coords.left}
            y2={nextMod.coords.top}
            stroke="url(#lightning-grad)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            opacity="0.4"
          />
        );
      })}
      <defs>
        <linearGradient id="lightning-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00FFFF" />
          <stop offset="100%" stopColor="#00FFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─── Componente del Relámpago (Iluminación de Nubes) ──────────────────────
function LightningEffect() {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '60%', // Solo cubre la mitad superior donde están las nubes
      background: 'radial-gradient(circle at 40% 10%, rgba(150, 200, 255, 0.4) 0%, rgba(150, 200, 255, 0) 60%)',
      pointerEvents: 'none',
      zIndex: 1,
      mixBlendMode: 'screen',
      animation: 'lightningFlash 8s infinite',
    }} />
  );
}

// ─── Componente de Humo Realista ──────────────────────────────────────────
function SmokeEffect() {
  return (
    <div style={{
      position: 'absolute',
      bottom: '-10%', left: '-5%', width: '50%', height: '40%',
      pointerEvents: 'none',
      zIndex: 2,
      opacity: 0.9, // Aumentado para visibilidad
      mixBlendMode: 'normal', // Cambiado a normal para evitar invisibilidad en fondos oscuros
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at bottom left, rgba(220, 220, 220, 0.6) 0%, rgba(180, 180, 180, 0.25) 40%, transparent 70%)',
        filter: 'blur(30px)',
        animation: 'smokeDrift 12s infinite alternate ease-in-out',
      }} />
      <div style={{
        position: 'absolute', bottom: '0', left: '10%', width: '80%', height: '100%',
        background: 'radial-gradient(ellipse at bottom center, rgba(200, 200, 200, 0.5) 0%, rgba(150, 150, 150, 0.15) 50%, transparent 70%)',
        filter: 'blur(40px)',
        animation: 'smokeDrift2 18s infinite alternate ease-in-out',
      }} />
    </div>
  );
}

// ─── Estilos Globales para animaciones ─────────────────────────────────────
const globalStyles = `
@keyframes lightningFlash {
  0%, 90% { opacity: 0; }
  91% { opacity: 0.8; }
  92% { opacity: 0; }
  93% { opacity: 1; }
  94% { opacity: 0; }
  95% { opacity: 0.6; }
  96%, 100% { opacity: 0; }
}
@keyframes smokeDrift {
  0% { transform: scale(1) translate(0, 0) rotate(0deg); opacity: 0.5; }
  50% { transform: scale(1.15) translate(5%, -5%) rotate(3deg); opacity: 0.8; }
  100% { transform: scale(1.05) translate(10%, -2%) rotate(-2deg); opacity: 0.4; }
}
@keyframes smokeDrift2 {
  0% { transform: scale(1) translate(0, 0); opacity: 0.4; }
  50% { transform: scale(1.2) translate(-5%, -8%); opacity: 0.7; }
  100% { transform: scale(1.1) translate(-2%, -3%); opacity: 0.5; }
}
@keyframes floatUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

// ─── Nodo de Módulo ────────────────────────────────────────────────────────
function BTTFModuleNode({ mod, idx, isCompleted, isPlayable }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={mod.link} passHref>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'absolute',
          left: mod.coords.left,
          top: mod.coords.top,
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          zIndex: hovered ? 50 : (10 + idx),
        }}
      >
        <motion.div
          animate={{ y: [0, -8, 0], scale: hovered ? 1.15 : 1 }}
          transition={{
            y: { repeat: Infinity, duration: 4 + Math.random() * 2, ease: 'easeInOut', delay: Math.random() * 2 },
            scale: { duration: 0.2 },
          }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}
        >
          {/* Avatar / Icono */}
          <div style={{
            position: 'relative',
            width: 'clamp(100px, 12vw, 150px)',
            height: 'clamp(100px, 12vw, 150px)',
            borderRadius: '50%',
            boxShadow: hovered 
               ? `0 0 40px ${mod.color}ff, inset 0 0 20px ${mod.color}aa` 
               : `0 0 20px ${mod.color}88`,
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 70%)',
              maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 70%)',
              overflow: 'hidden'
            }}>
              <img
                src={mod.icon}
                alt={mod.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: hovered ? 'scale(1.1)' : 'scale(1)',
                  transition: 'transform 0.5s ease',
                }}
              />
              {!hovered && !isPlayable && !isCompleted && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
              )}
            </div>
            {/* Anillo de energía exterior */}
            <div style={{
              position: 'absolute',
              inset: '-2px',
              borderRadius: '50%',
              border: `2px solid ${hovered ? 'white' : mod.color + '55'}`,
              opacity: hovered ? 0.8 : 0.3,
              transition: 'all 0.3s ease',
              pointerEvents: 'none'
            }} />
          </div>

          {/* Label */}
          <div style={{
            color: 'white',
            textAlign: 'center',
            textShadow: `0 2px 8px ${mod.color}, 0 4px 16px rgba(0,0,0,0.9)`,
            background: 'rgba(0,0,0,0.65)',
            padding: '4px 14px',
            borderRadius: '20px',
            backdropFilter: 'blur(6px)',
            border: `1px solid ${hovered ? mod.color : mod.color + '44'}`,
            transition: 'all 0.3s ease',
          }}>
            <div style={{ fontSize: 'clamp(0.65rem, 1vw, 0.85rem)', color: mod.color, fontWeight: 700, letterSpacing: '1px' }}>
              {mod.title}
            </div>
          </div>

          {/* Completado Badge */}
          {isCompleted && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              style={{
                position: 'absolute',
                top: -8, right: -8,
                background: '#00FFFF',
                borderRadius: '50%',
                padding: '4px',
                boxShadow: '0 0 10px #00FFFF',
                zIndex: 10,
              }}
            >
              <CheckCircle size={16} color="black" />
            </motion.div>
          )}

          {/* Partículas de Relámpago al hacer hover */}
          <AnimatePresence>
            {hovered && (
              <>
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                    animate={{ 
                      opacity: 0, 
                      scale: Math.random() * 2 + 0.5,
                      x: (Math.random() - 0.5) * 80,
                      y: (Math.random() - 0.5) * 80
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 + Math.random() * 0.5, ease: "easeOut" }}
                    style={{
                      position: 'absolute',
                      width: 4, height: 12,
                      borderRadius: '2px',
                      background: mod.color,
                      top: '50%', left: '50%',
                      boxShadow: `0 0 10px ${mod.color}`,
                      pointerEvents: 'none',
                      transform: `rotate(${Math.random() * 360}deg)`
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </Link>
  );
}

// ─── HUB Principal ──────────────────────────────────────────────────────────
export default function BTTFHub() {
  const { user, progress } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const completedIds = progress?.completedModules || [];
  
  // En lógica normal de curso, se desbloquea si el anterior está completo.
  // Aquí los mostramos todos interactivos.
  const getPlayableState = (idx) => true;

  if (!mounted) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#050a12', overflow: 'hidden' }}>
      <style>{globalStyles}</style>

      {/* Main canvas */}
      <main style={{
        flex: 1, position: 'relative', width: '100vw', height: '100vh',
        backgroundImage: "url('/assets/bttf/bttf_bg_v2.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}>
        {/* Capas de oscurecimiento y niebla */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(5,10,20,0.7) 0%, rgba(5,10,20,0.3) 50%, rgba(5,10,20,0.8) 100%)',
          pointerEvents: 'none', zIndex: 1
        }} />

        {/* Efecto de Trueno Ligero en las Nubes */}
        <LightningEffect />
        
        {/* Efecto de Humo en la calle (esquina inferior izquierda) */}
        <SmokeEffect />

        {/* Constelaciones */}
        <ConstellationLines />

        {/* Header UI - Botón Volver y Título */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          padding: '2rem', zIndex: 100, pointerEvents: 'none'
        }}>
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/dashboard')}
            style={{
              pointerEvents: 'auto',
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(0, 255, 255, 0.4)',
              color: 'white',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              borderRadius: '30px',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
              fontFamily: 'var(--font-heading)'
            }}
          >
            <ChevronLeft size={20} />
            Línea de Tiempo Principal
          </motion.button>

          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}
          >
            <div style={{
              background: 'rgba(0,0,0,0.7)',
              padding: '1rem 2rem',
              borderRadius: '30px',
              border: '1px solid rgba(0, 255, 255, 0.3)',
              boxShadow: '0 0 20px rgba(0,0,0,0.8)',
              backdropFilter: 'blur(8px)',
              pointerEvents: 'auto'
            }}>
              <h1 style={{
                color: 'white',
                margin: 0,
                fontSize: '2rem',
                textShadow: '0 0 10px rgba(0, 255, 255, 0.6), 0 0 20px rgba(0, 255, 255, 0.4)',
                letterSpacing: '2px',
                fontFamily: 'var(--font-heading)',
                textTransform: 'uppercase'
              }}>
                LA CIENCIA DE VOLVER AL FUTURO
              </h1>
              <p style={{
                color: '#00FFFF',
                margin: '0.2rem 0 0 0',
                fontSize: '0.9rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                letterSpacing: '1px'
              }}>
                Física Cuántica · Energía · 7 Módulos
              </p>
            </div>
          </motion.div>
        </div>

        {/* Nodos de los módulos */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
          {BTTF_MODULES.map((mod, idx) => (
            <div key={mod.id} style={{ pointerEvents: 'auto' }}>
              <BTTFModuleNode
                mod={mod}
                idx={idx}
                isPlayable={getPlayableState(idx)}
                isCompleted={completedIds.includes(mod.id)}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA - Progress Indicator */}
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.7)',
          border: '1px solid rgba(0, 255, 255, 0.3)',
          padding: '1rem 2.5rem',
          borderRadius: '40px',
          backdropFilter: 'blur(10px)',
          zIndex: 200,
          boxShadow: '0 0 30px rgba(0,0,0,0.8), inset 0 0 20px rgba(0, 255, 255, 0.1)',
          display: 'flex', alignItems: 'center', gap: '1.5rem',
        }}>
          <div style={{ color: 'white', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>
            Módulos Temporales:
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '0.5rem 1.5rem',
            borderRadius: '20px',
            color: '#00FFFF',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            textShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
          }}>
            {completedIds.filter(id => id.startsWith('bttf_m')).length} / {BTTF_MODULES.length}
          </div>
        </div>
      </main>
    </div>
  );
}
