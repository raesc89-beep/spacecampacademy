'use client';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Módulos del curso ─────────────────────────────────────────────────────
const INTERSTELLAR_MODULES = [
  {
    id: 'interstellar_m1',
    title: 'Einstein y la Red Invisible',
    color: '#00E4FF', 
    link: '/course/interstellar_m1',
    icon: '/assets/interstellar/interstellar_m1.png',
    coords: { left: '15%', top: '35%' },
  },
  {
    id: 'interstellar_m2',
    title: 'Gargantúa',
    color: '#FF3366',
    link: '/course/interstellar_m2',
    icon: '/assets/interstellar/interstellar_m2.png',
    coords: { left: '35%', top: '25%' },
  },
  {
    id: 'interstellar_m3',
    title: 'El Tiempo es Elástico',
    color: '#33FF66',
    link: '/course/interstellar_m3',
    icon: '/assets/interstellar/interstellar_m3.png',
    coords: { left: '55%', top: '35%' },
  },
  {
    id: 'interstellar_m4',
    title: 'Agujeros de Gusano',
    color: '#9933FF',
    link: '/course/interstellar_m4',
    icon: '/assets/interstellar/interstellar_m4.png',
    coords: { left: '75%', top: '55%' },
  },
  {
    id: 'interstellar_m5',
    title: 'El Teseracto y la 5D',
    color: '#FFD700',
    link: '/course/interstellar_m5',
    icon: '/assets/interstellar/interstellar_m5.png',
    coords: { left: '50%', top: '65%' },
  }
];

// ─── Constelación de Nodos ──────────────────────────────────────────────────
function ConstellationLines() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}>
      {INTERSTELLAR_MODULES.map((mod, i) => {
        if (i === INTERSTELLAR_MODULES.length - 1) return null;
        const nextMod = INTERSTELLAR_MODULES[i + 1];
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

// ─── Componente de Iluminación de Nubes (sin cable) ──────────────────────
function LightningEffect() {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
      background: 'radial-gradient(ellipse at 35% 15%, rgba(150, 220, 255, 0.25) 0%, rgba(150, 220, 255, 0) 65%)',
      pointerEvents: 'none', zIndex: 1, mixBlendMode: 'screen',
      animation: 'lightningFlash 8s infinite',
    }} />
  );
}

// ─── Componente de Humo Realista (Eliminado para Interstellar) ──────────


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
@keyframes cablePulse {
  0% { stroke-dashoffset: 255; opacity: 0.2; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { stroke-dashoffset: 0; opacity: 0.2; }
}
@keyframes gravitationalLensing {
  0% { transform: translate(-50%, -50%) rotate(0deg) scale(1); border-radius: 50% 55% 45% 50%; }
  50% { transform: translate(-50%, -50%) rotate(180deg) scale(1.05); border-radius: 45% 50% 55% 45%; }
  100% { transform: translate(-50%, -50%) rotate(360deg) scale(1); border-radius: 50% 55% 45% 50%; }
}
@keyframes accretionSpin {
  0% { transform: translate(-50%, -50%) scaleY(0.25) rotate(0deg); }
  100% { transform: translate(-50%, -50%) scaleY(0.25) rotate(360deg); }
}
`;

// ─── Nodo de Módulo ────────────────────────────────────────────────────────
function InterstellarModuleNode({ mod, idx, isCompleted, isPlayable }) {
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
export default function InterstellarHub() {
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
        backgroundColor: '#000000',
        overflow: 'hidden'
      }}>
        {/* Video Background de Gargantúa */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            opacity: 0.9,
            filter: 'contrast(1.1) brightness(0.8)'
          }}
        >
          <source src="/assets/interstellar/blackhole.mp4" type="video/mp4" />
        </video>

        {/* Capas de oscurecimiento y niebla para mejorar lectura de botones */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.85) 100%)',
          pointerEvents: 'none', zIndex: 1
        }} />

        {/* Estrellas Brillantes y Partículas Flotando */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'url(https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=2560&auto=format&fit=crop) center center / cover',
          opacity: 0.5,
          mixBlendMode: 'screen',
          pointerEvents: 'none', zIndex: 2
        }} />


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
            Regresar al Comando
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
                LA CIENCIA DE INTERSTELLAR
              </h1>
              <p style={{
                color: '#00FFFF',
                margin: '0.2rem 0 0 0',
                fontSize: '0.9rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                letterSpacing: '1px'
              }}>
                Astrofísica · Gravedad · 5 Módulos
              </p>
            </div>
          </motion.div>
        </div>

        {/* Nodos de los módulos */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
          {INTERSTELLAR_MODULES.map((mod, idx) => (
            <div key={mod.id} style={{ pointerEvents: 'auto' }}>
              <InterstellarModuleNode
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
            Progreso de Exploración:
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
            {completedIds.filter(id => id.startsWith('interstellar_m')).length} / {INTERSTELLAR_MODULES.length}
          </div>
        </div>
      </main>
    </div>
  );
}
