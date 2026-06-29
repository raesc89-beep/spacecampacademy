'use client';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// ─── Módulos del curso Entrenamiento Astronauta ────────────────────────────────
const ASTRO_MODULES = [
  {
    id: 'astro_train_m1',
    title: '¿Cómo se seleccionan?',
    subtitle: 'El proceso de selección',
    color: '#FF6B35',
    glowColor: 'rgba(255,107,53,0.5)',
    link: '/course/astro_train_m1',
    icon: '/assets/astronaut_training/astro_train_m1.png',
    coords: { left: '12%', top: '50%' },
    symbol: '📋',
  },
  {
    id: 'astro_train_m2',
    title: 'Entrenamiento físico',
    subtitle: 'Resistencia y preparación corporal',
    color: '#E74C3C',
    glowColor: 'rgba(231,76,60,0.5)',
    link: '/course/astro_train_m2',
    icon: '/assets/astronaut_training/astro_train_m2.png',
    coords: { left: '30%', top: '28%' },
    symbol: '💪',
  },
  {
    id: 'astro_train_m3',
    title: 'Entrenamiento técnico',
    subtitle: 'Sistemas y simuladores',
    color: '#3498DB',
    glowColor: 'rgba(52,152,219,0.5)',
    link: '/course/astro_train_m3',
    icon: '/assets/astronaut_training/astro_train_m3.png',
    coords: { left: '50%', top: '55%' },
    symbol: '🖥️',
  },
  {
    id: 'astro_train_m4',
    title: 'Supervivencia extrema',
    subtitle: 'Entrenamiento en condiciones límite',
    color: '#2ECC71',
    glowColor: 'rgba(46,204,113,0.5)',
    link: '/course/astro_train_m4',
    icon: '/assets/astronaut_training/astro_train_m4.png',
    coords: { left: '68%', top: '32%' },
    symbol: '🏔️',
  },
  {
    id: 'astro_train_m5',
    title: 'Vida en la ISS',
    subtitle: 'Vivir en microgravedad',
    color: '#9B59B6',
    glowColor: 'rgba(155,89,182,0.5)',
    link: '/course/astro_train_m5',
    icon: '/assets/astronaut_training/astro_train_m5.png',
    coords: { left: '82%', top: '55%' },
    symbol: '🛸',
  },
  {
    id: 'astro_train_m6',
    title: 'El futuro: Artemis y Marte',
    subtitle: 'Las próximas fronteras',
    color: '#FFD700',
    glowColor: 'rgba(255,215,0,0.5)',
    link: '/course/astro_train_m6',
    icon: '/assets/astronaut_training/astro_train_m6.png',
    coords: { left: '70%', top: '72%' },
    symbol: '🚀',
  },
];

// ─── Burbujas flotantes (entrenamiento subacuático) ────────────────────────────
function FloatingBubbles() {
  const bubbles = useRef(
    Array.from({ length: 60 }, () => ({
      x: Math.random() * 100,
      size: Math.random() * 6 + 2,
      dur: Math.random() * 8 + 6,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.3 + 0.1,
    }))
  ).current;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {bubbles.map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${b.x}%`,
            bottom: '-5%',
            width: b.size,
            height: b.size,
            borderRadius: '50%',
            background: `radial-gradient(circle at 35% 35%, rgba(255,107,53,${b.opacity}), rgba(255,107,53,${b.opacity * 0.3}))`,
            border: `1px solid rgba(255,107,53,${b.opacity * 0.5})`,
            animation: `bubbleRise ${b.dur}s ease-in-out infinite ${b.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes bubbleRise {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-110vh) scale(0.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ─── Luces de estado parpadeantes ──────────────────────────────────────────────
function StatusLights() {
  const lights = useRef(
    Array.from({ length: 20 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      dur: Math.random() * 2 + 0.5,
      delay: Math.random() * 4,
      color: ['#FF6B35', '#E74C3C', '#2ECC71', '#3498DB', '#FFD700'][Math.floor(Math.random() * 5)],
    }))
  ).current;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {lights.map((l, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${l.x}%`,
            top: `${l.y}%`,
            width: l.size,
            height: l.size,
            borderRadius: '50%',
            background: l.color,
            boxShadow: `0 0 ${l.size * 3}px ${l.color}`,
            animation: `statusBlink ${l.dur}s ease-in-out infinite ${l.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes statusBlink {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ─── Líneas de constelación ────────────────────────────────────────────────────
function ConstellationLines() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}>
      <defs>
        <linearGradient id="astro-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#3498DB" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {ASTRO_MODULES.map((mod, i) => {
        if (i === ASTRO_MODULES.length - 1) return null;
        const next = ASTRO_MODULES[i + 1];
        return (
          <line
            key={i}
            x1={mod.coords.left} y1={mod.coords.top}
            x2={next.coords.left} y2={next.coords.top}
            stroke="url(#astro-grad)" strokeWidth="1.5"
            strokeDasharray="6 8" opacity="0.4"
          />
        );
      })}
    </svg>
  );
}

// ─── Nodo de módulo ───────────────────────────────────────────────────────────
function AstroModuleNode({ mod, idx, isCompleted }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={mod.link} passHref>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'absolute',
          left: mod.coords.left, top: mod.coords.top,
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          zIndex: hovered ? 50 : 10 + idx,
        }}
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 5 + idx * 0.5, ease: 'easeInOut', delay: idx * 0.4 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}
        >
          {!isCompleted && (
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut', delay: idx * 0.3 }}
              style={{
                position: 'absolute', width: 90, height: 90, borderRadius: '50%',
                border: `2px solid ${mod.color}`,
                top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              }}
            />
          )}

          <motion.div
            animate={{ scale: hovered ? 1.18 : 1, boxShadow: hovered ? `0 0 40px ${mod.glowColor}, 0 0 80px ${mod.glowColor}` : `0 0 20px ${mod.glowColor}` }}
            transition={{ duration: 0.25 }}
            style={{
              width: 74, height: 74, borderRadius: '50%',
              border: `3px solid ${isCompleted ? '#00FF88' : mod.color}`,
              overflow: 'hidden',
              background: `radial-gradient(circle at 40% 40%, ${mod.color}22, rgba(0,0,0,0.85))`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 20px ${mod.glowColor}`,
            }}
          >
            {isCompleted ? (
              <CheckCircle size={32} color="#00FF88" />
            ) : (
              <img src={mod.icon} alt={mod.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            )}
          </motion.div>

          <div style={{
            background: isCompleted ? 'rgba(0,255,136,0.15)' : `${mod.color}22`,
            border: `1px solid ${isCompleted ? '#00FF88' : mod.color}`,
            borderRadius: '12px', padding: '0.2rem 0.6rem',
            fontSize: '0.65rem', color: isCompleted ? '#00FF88' : mod.color,
            fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase',
          }}>M-{idx + 1}</div>

          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              style={{
                position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                marginTop: '0.8rem', background: 'rgba(10,6,8,0.95)',
                border: `1px solid ${mod.color}`, borderRadius: '14px',
                padding: '0.8rem 1.2rem', minWidth: '180px', textAlign: 'center',
                backdropFilter: 'blur(12px)', boxShadow: `0 8px 32px ${mod.glowColor}`, zIndex: 100,
              }}
            >
              <div style={{ fontSize: '1.4rem', marginBottom: '0.2rem' }}>{mod.symbol}</div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.82rem', lineHeight: 1.3, marginBottom: '0.2rem' }}>{mod.title}</div>
              <div style={{ color: mod.color, fontSize: '0.72rem', opacity: 0.9 }}>{mod.subtitle}</div>
              {isCompleted && <div style={{ color: '#00FF88', fontSize: '0.7rem', marginTop: '0.3rem' }}>✓ Completada</div>}
            </motion.div>
          )}
        </motion.div>
      </div>
    </Link>
  );
}

// ─── Componente principal del Hub ──────────────────────────────────────────────
export default function AstronautTrainingHub() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const [completedModules, setCompletedModules] = useState([]);

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  useEffect(() => {
    if (userData?.progress?.completedModules) {
      setCompletedModules(userData.progress.completedModules);
    }
  }, [userData]);

  if (loading || !userData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0A0608', color: '#FF6B35' }}>
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          Inicializando protocolo de entrenamiento...
        </motion.div>
      </div>
    );
  }

  const completedCount = ASTRO_MODULES.filter(m => completedModules.includes(m.id)).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#0A0608', overflow: 'hidden' }}>
      <main style={{
        flex: 1, position: 'relative', width: '100vw', height: '100vh',
        backgroundColor: '#0A0608',
        backgroundImage: "url('/assets/astronaut_training/astro_train_cover.png')",
        backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat',
      }}>
        {/* Vignette overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at center, rgba(10,6,8,0) 0%, rgba(10,6,8,0.5) 70%, rgba(10,6,8,0.9) 100%)',
          pointerEvents: 'none', zIndex: 1
        }} />

        {/* Atmospheric layers */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
          <FloatingBubbles />
          <StatusLights />
        </div>

        <ConstellationLines />

        {/* Header */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          padding: '2rem', zIndex: 100, pointerEvents: 'none'
        }}>
          <motion.button
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/dashboard/misiones')}
            style={{
              pointerEvents: 'auto', background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,107,53,0.4)', color: 'white',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.75rem 1.5rem', borderRadius: '30px', cursor: 'pointer',
              backdropFilter: 'blur(10px)', boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            <ChevronLeft size={20} /> Regresar al Comando
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}
          >
            <div style={{
              background: 'rgba(0,0,0,0.7)', padding: '1rem 2rem', borderRadius: '30px',
              border: '1px solid rgba(255,107,53,0.3)', boxShadow: '0 0 20px rgba(0,0,0,0.8)',
              backdropFilter: 'blur(8px)', pointerEvents: 'auto'
            }}>
              <h1 style={{
                color: 'white', margin: 0, fontSize: '2rem',
                textShadow: '0 0 10px rgba(255,107,53,0.6), 0 0 20px rgba(255,107,53,0.4)',
                letterSpacing: '2px', fontFamily: "'Outfit', sans-serif", textTransform: 'uppercase'
              }}>
                ENTRENAMIENTO ASTRONAUTA
              </h1>
              <p style={{
                color: '#FFB088', margin: '0.2rem 0 0 0', fontSize: '0.9rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.8)', letterSpacing: '1px'
              }}>
                Los Pasos para Llegar al Espacio · 6 Módulos
              </p>
            </div>
          </motion.div>
        </div>

        {/* Module nodes */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
          {ASTRO_MODULES.map((mod, idx) => (
            <div key={mod.id} style={{ pointerEvents: 'auto' }}>
              <AstroModuleNode mod={mod} idx={idx} isCompleted={completedModules.includes(mod.id)} />
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,107,53,0.3)',
          padding: '1rem 2.5rem', borderRadius: '40px', backdropFilter: 'blur(10px)',
          zIndex: 200, boxShadow: '0 0 30px rgba(0,0,0,0.8), inset 0 0 20px rgba(255,107,53,0.1)',
          display: 'flex', alignItems: 'center', gap: '1.5rem',
        }}>
          <div style={{ color: 'white', fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem' }}>
            Progreso de Exploración:
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1.5rem', borderRadius: '20px',
            color: '#FFB088', fontWeight: 'bold', fontSize: '1.2rem',
            textShadow: '0 0 10px rgba(255,107,53,0.5)'
          }}>
            {completedCount} / {ASTRO_MODULES.length}
          </div>
        </div>
      </main>
    </div>
  );
}
