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
    subtitle: 'Gravedad · Curvatura · Geodésicas',
    color: '#00E4FF', 
    link: '/course/interstellar_m1',
    icon: '/assets/interstellar/interstellar_m1.jpg',
    coords: { left: '15%', top: '35%' },
  },
  {
    id: 'interstellar_m2',
    title: 'Gargantúa',
    subtitle: 'Agujeros Negros · Horizonte de Sucesos',
    color: '#FF6B35',
    link: '/course/interstellar_m2',
    icon: '/assets/interstellar/interstellar_m2.jpg',
    coords: { left: '35%', top: '22%' },
  },
  {
    id: 'interstellar_m3',
    title: 'El Tiempo es Elástico',
    subtitle: 'Dilatación Temporal · Paradoja de Gemelos',
    color: '#4FFFB0',
    link: '/course/interstellar_m3',
    icon: '/assets/interstellar/interstellar_m3.jpg',
    coords: { left: '58%', top: '35%' },
  },
  {
    id: 'interstellar_m4',
    title: 'Agujeros de Gusano',
    subtitle: 'Puentes Einstein-Rosen · Materia Exótica',
    color: '#B366FF',
    link: '/course/interstellar_m4',
    icon: '/assets/interstellar/interstellar_m4.jpg',
    coords: { left: '78%', top: '50%' },
  },
  {
    id: 'interstellar_m5',
    title: 'El Teseracto y la 5D',
    subtitle: 'Dimensiones Extra · Teoría de Cuerdas',
    color: '#FFD700',
    link: '/course/interstellar_m5',
    icon: '/assets/interstellar/interstellar_m5.jpg',
    coords: { left: '48%', top: '62%' },
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

// ─── Nodo de Módulo (Rediseño Cinematográfico Interstellar) ──────────────
function InterstellarModuleNode({ mod, idx, isCompleted, isPlayable }) {
  const [hovered, setHovered] = useState(false);
  const moduleNum = idx + 1;

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
          animate={{ y: [0, -6, 0], scale: hovered ? 1.12 : 1 }}
          transition={{
            y: { repeat: Infinity, duration: 5 + idx * 0.5, ease: 'easeInOut' },
            scale: { duration: 0.3, ease: 'easeOut' },
          }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
        >
          {/* Contenedor principal del nodo */}
          <div style={{
            position: 'relative',
            width: 'clamp(90px, 10vw, 130px)',
            height: 'clamp(90px, 10vw, 130px)',
          }}>
            {/* Anillo exterior - Disco de Acreción */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: '-6px',
                borderRadius: '50%',
                border: `2px solid ${hovered ? mod.color : mod.color + '44'}`,
                boxShadow: hovered
                  ? `0 0 25px ${mod.color}88, inset 0 0 15px ${mod.color}44`
                  : `0 0 8px ${mod.color}33`,
                transition: 'all 0.4s ease',
                pointerEvents: 'none',
              }}
            />
            
            {/* Segundo anillo - Ergosfera */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: '-12px',
                borderRadius: '50%',
                border: `1px dashed ${hovered ? mod.color + '66' : mod.color + '22'}`,
                transition: 'all 0.4s ease',
                pointerEvents: 'none',
              }}
            />

            {/* Imagen del módulo */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              overflow: 'hidden',
              border: `2.5px solid ${hovered ? mod.color : mod.color + '88'}`,
              boxShadow: hovered
                ? `0 0 50px ${mod.color}cc, 0 0 100px ${mod.color}44, inset 0 0 30px rgba(0,0,0,0.5)`
                : `0 0 20px ${mod.color}66, inset 0 0 20px rgba(0,0,0,0.4)`,
              transition: 'all 0.4s ease',
            }}>
              <img
                src={mod.icon}
                alt={mod.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: hovered ? 'scale(1.15)' : 'scale(1.05)',
                  transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  filter: hovered ? 'brightness(1.2) saturate(1.3)' : 'brightness(0.85) saturate(0.9)',
                }}
              />
              {/* Viñeta interior */}
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: `radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.6) 100%)`,
                pointerEvents: 'none',
              }} />
              {/* Overlay oscuro si no es playable */}
              {!isPlayable && !isCompleted && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', borderRadius: '50%' }} />
              )}
            </div>

            {/* Número de módulo */}
            <div style={{
              position: 'absolute',
              bottom: '-2px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: hovered ? mod.color : 'rgba(0,0,0,0.8)',
              color: hovered ? '#000' : mod.color,
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem',
              fontWeight: 800,
              border: `1.5px solid ${mod.color}`,
              transition: 'all 0.3s ease',
              zIndex: 5,
              fontFamily: 'var(--font-heading)',
            }}>
              {moduleNum}
            </div>

            {/* Completado Badge */}
            {isCompleted && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                style={{
                  position: 'absolute',
                  top: -4, right: -4,
                  background: mod.color,
                  borderRadius: '50%',
                  padding: '3px',
                  boxShadow: `0 0 15px ${mod.color}`,
                  zIndex: 10,
                  border: '2px solid rgba(0,0,0,0.5)',
                }}
              >
                <CheckCircle size={14} color="black" />
              </motion.div>
            )}
          </div>

          {/* Label con título y subtítulo */}
          <motion.div 
            animate={{ opacity: hovered ? 1 : 0.85 }}
            style={{
              textAlign: 'center',
              background: hovered ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.6)',
              padding: hovered ? '6px 16px' : '4px 12px',
              borderRadius: '16px',
              backdropFilter: 'blur(8px)',
              border: `1px solid ${hovered ? mod.color + 'aa' : mod.color + '33'}`,
              transition: 'all 0.3s ease',
              maxWidth: 'clamp(100px, 12vw, 160px)',
              boxShadow: hovered ? `0 4px 20px rgba(0,0,0,0.8), 0 0 15px ${mod.color}22` : 'none',
            }}
          >
            <div style={{
              fontSize: 'clamp(0.6rem, 0.9vw, 0.8rem)',
              color: mod.color,
              fontWeight: 700,
              letterSpacing: '0.5px',
              lineHeight: 1.3,
              fontFamily: 'var(--font-heading)',
            }}>
              {mod.title}
            </div>
            {hovered && mod.subtitle && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                style={{
                  fontSize: '0.55rem',
                  color: 'rgba(255,255,255,0.6)',
                  marginTop: '2px',
                  letterSpacing: '0.3px',
                }}
              >
                {mod.subtitle}
              </motion.div>
            )}
          </motion.div>

          {/* Partículas gravitacionales al hover */}
          <AnimatePresence>
            {hovered && (
              <>
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0.8, scale: 0 }}
                    animate={{
                      opacity: 0,
                      scale: 1.5,
                      x: Math.cos((i / 6) * Math.PI * 2) * 60,
                      y: Math.sin((i / 6) * Math.PI * 2) * 60,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.08 }}
                    style={{
                      position: 'absolute',
                      width: 3, height: 3,
                      borderRadius: '50%',
                      background: mod.color,
                      top: '35%', left: '50%',
                      boxShadow: `0 0 8px ${mod.color}`,
                      pointerEvents: 'none',
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
