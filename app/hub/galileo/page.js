'use client';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Módulos del curso ─────────────────────────────────────────────────────
const GALILEO_MODULES = [
  { id: 'galileo_m1', title: 'El Telescopio Revolucionario', color: '#FFD700', link: '/course/galileo_m1', icon: '/assets/galileo/galileo_m1.png', coords: { left: '12%', top: '50%' } },
  { id: 'galileo_m2', title: 'Las Lunas de Júpiter', color: '#00E4FF', link: '/course/galileo_m2', icon: '/assets/galileo/galileo_m2.png', coords: { left: '32%', top: '28%' } },
  { id: 'galileo_m3', title: 'El Péndulo y el Tiempo', color: '#FF6B35', link: '/course/galileo_m3', icon: '/assets/galileo/galileo_m3.png', coords: { left: '54%', top: '48%' } },
  { id: 'galileo_m4', title: 'Física del Movimiento', color: '#A8FF78', link: '/course/galileo_m4', icon: '/assets/galileo/galileo_m4.png', coords: { left: '74%', top: '28%' } },
  { id: 'galileo_m5', title: 'El Legado de Galileo', color: '#FF9FFF', link: '/course/galileo_m5', icon: '/assets/galileo/galileo_m5.png', coords: { left: '87%', top: '60%' } },
];

// ─── Constelación de Nodos ──────────────────────────────────────────────────
function ConstellationLines() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}>
      {GALILEO_MODULES.map((mod, i) => {
        if (i === GALILEO_MODULES.length - 1) return null;
        const nextMod = GALILEO_MODULES[i + 1];
        return (
          <line
            key={i}
            x1={mod.coords.left}
            y1={mod.coords.top}
            x2={nextMod.coords.left}
            y2={nextMod.coords.top}
            stroke="url(#galileo-grad)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            opacity="0.6"
          />
        );
      })}
      <defs>
        <linearGradient id="galileo-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
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
`;

// ─── Nodo de Módulo ────────────────────────────────────────────────────────
function GalileoModuleNode({ mod, idx, isCompleted, isPlayable }) {
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
                background: '#FFD700',
                borderRadius: '50%',
                padding: '4px',
                boxShadow: '0 0 10px #FFD700',
                zIndex: 10,
              }}
            >
              <CheckCircle size={16} color="black" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </Link>
  );
}

// ─── HUB Principal ──────────────────────────────────────────────────────────
export default function GalileoHub() {
  const { user, progress } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const completedIds = progress?.completedModules || [];

  const getPlayableState = (idx) => true;

  if (!mounted) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#050a12', overflow: 'hidden' }}>
      <style>{globalStyles}</style>

      {/* Main canvas */}
      <main style={{
        flex: 1, position: 'relative', width: '100vw', height: '100vh',
        backgroundColor: '#000000',
        backgroundImage: "url('/assets/galileo/galileo_cover.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}>
        {/* Capas de oscurecimiento */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0.9) 100%)',
          pointerEvents: 'none', zIndex: 1
        }} />

        {/* Estrellas Brillantes */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'url(https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=2560&auto=format&fit=crop) center center / cover',
          opacity: 0.3,
          mixBlendMode: 'screen',
          pointerEvents: 'none', zIndex: 0
        }} />

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
            onClick={() => router.push('/dashboard/misiones')}
            style={{
              pointerEvents: 'auto',
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(255, 215, 0, 0.4)',
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
            Regresar al Hub
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
              border: '1px solid rgba(255, 215, 0, 0.3)',
              boxShadow: '0 0 20px rgba(0,0,0,0.8)',
              backdropFilter: 'blur(8px)',
              pointerEvents: 'auto'
            }}>
              <h1 style={{
                color: 'white',
                margin: 0,
                fontSize: '2rem',
                textShadow: '0 0 10px rgba(255, 215, 0, 0.6), 0 0 20px rgba(255, 215, 0, 0.4)',
                letterSpacing: '2px',
                fontFamily: 'var(--font-heading)',
                textTransform: 'uppercase'
              }}>
                GALILEO GALILEI
              </h1>
              <p style={{
                color: '#FFD700',
                margin: '0.2rem 0 0 0',
                fontSize: '0.9rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                letterSpacing: '1px'
              }}>
                Padre de la Astronomía Moderna · 5 Módulos
              </p>
            </div>
          </motion.div>
        </div>

        {/* Nodos de los módulos */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
          {GALILEO_MODULES.map((mod, idx) => (
            <div key={mod.id} style={{ pointerEvents: 'auto' }}>
              <GalileoModuleNode
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
          border: '1px solid rgba(255, 215, 0, 0.3)',
          padding: '1rem 2.5rem',
          borderRadius: '40px',
          backdropFilter: 'blur(10px)',
          zIndex: 200,
          boxShadow: '0 0 30px rgba(0,0,0,0.8), inset 0 0 20px rgba(255, 215, 0, 0.1)',
          display: 'flex', alignItems: 'center', gap: '1.5rem',
        }}>
          <div style={{ color: 'white', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>
            Progreso:
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '0.5rem 1.5rem',
            borderRadius: '20px',
            color: '#FFD700',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            textShadow: '0 0 10px rgba(255, 215, 0, 0.5)'
          }}>
            {completedIds.filter(id => id.startsWith('galileo_m')).length} / {GALILEO_MODULES.length} módulos
          </div>
        </div>
      </main>
    </div>
  );
}
