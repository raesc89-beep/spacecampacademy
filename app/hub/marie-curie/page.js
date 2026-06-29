'use client';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// ─── Módulos del curso Marie Curie ─────────────────────────────────────────────
const CURIE_MODULES = [
  {
    id: 'curie_m1',
    title: 'Maria Skłodowska: la niña de Varsovia',
    subtitle: 'Infancia y primeros pasos',
    color: '#00FF88',
    glowColor: 'rgba(0,255,136,0.5)',
    link: '/course/curie_m1',
    icon: '/assets/marie_curie/curie_m1.png',
    coords: { left: '15%', top: '55%' },
    symbol: '🇵🇱',
  },
  {
    id: 'curie_m2',
    title: 'París, la Sorbona y Pierre',
    subtitle: 'Amor y ciencia en Francia',
    color: '#2ECC71',
    glowColor: 'rgba(46,204,113,0.5)',
    link: '/course/curie_m2',
    icon: '/assets/marie_curie/curie_m2.png',
    coords: { left: '35%', top: '30%' },
    symbol: '🗼',
  },
  {
    id: 'curie_m3',
    title: 'Polonio y Radio',
    subtitle: 'Los elementos que cambiaron el mundo',
    color: '#E8D44D',
    glowColor: 'rgba(232,212,77,0.5)',
    link: '/course/curie_m3',
    icon: '/assets/marie_curie/curie_m3.png',
    coords: { left: '55%', top: '58%' },
    symbol: '☢️',
  },
  {
    id: 'curie_m4',
    title: 'Dos Premios Nobel',
    subtitle: 'Física en 1903, Química en 1911',
    color: '#FFD700',
    glowColor: 'rgba(255,215,0,0.5)',
    link: '/course/curie_m4',
    icon: '/assets/marie_curie/curie_m4.png',
    coords: { left: '72%', top: '25%' },
    symbol: '🏅',
  },
  {
    id: 'curie_m5',
    title: 'Las Petites Curies y la WWI',
    subtitle: 'Radiología en el frente de batalla',
    color: '#E74C3C',
    glowColor: 'rgba(231,76,60,0.5)',
    link: '/course/curie_m5',
    icon: '/assets/marie_curie/curie_m5.png',
    coords: { left: '85%', top: '52%' },
    symbol: '🚑',
  },
  {
    id: 'curie_m6',
    title: 'Su legado e Irène Joliot-Curie',
    subtitle: 'La dinastía científica continúa',
    color: '#9B59B6',
    glowColor: 'rgba(155,89,182,0.5)',
    link: '/course/curie_m6',
    icon: '/assets/marie_curie/curie_m6.png',
    coords: { left: '65%', top: '72%' },
    symbol: '🔬',
  },
];

// ─── Partículas radiactivas flotantes ──────────────────────────────────────────
function RadioactiveParticles() {
  const particles = useRef(
    Array.from({ length: 90 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      dur: Math.random() * 6 + 3,
      delay: Math.random() * 5,
      color: ['#00FF88', '#2ECC71', '#7CFC00', '#39FF14', '#00FF88', '#ADFF2F'][Math.floor(Math.random() * 6)],
    }))
  ).current;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.1, 0.8, 0.1], scale: [1, 1.6, 1], y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: p.dur, delay: p.delay, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}, 0 0 ${p.size * 8}px ${p.color}44`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Viales brillantes simulando brillo de radio ───────────────────────────────
function GlowingVials() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <div style={{
        position: 'absolute',
        top: '30%', left: '15%',
        width: '350px', height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,255,136,0.1) 0%, rgba(0,255,136,0.03) 40%, transparent 70%)',
        animation: 'vialGlow 8s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        top: '55%', left: '65%',
        width: '300px', height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(46,204,113,0.08) 0%, rgba(46,204,113,0.02) 40%, transparent 70%)',
        animation: 'vialGlow 12s ease-in-out infinite 3s',
      }} />
      <div style={{
        position: 'absolute',
        top: '15%', left: '75%',
        width: '250px', height: '250px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,212,77,0.06) 0%, transparent 70%)',
        animation: 'vialGlow 10s ease-in-out infinite 6s',
      }} />
      <style>{`
        @keyframes vialGlow {
          0%, 100% { opacity: 0.3; transform: scale(1); filter: brightness(1); }
          50% { opacity: 1; transform: scale(1.2); filter: brightness(1.4); }
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
        <linearGradient id="curie-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00FF88" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#E8D44D" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#9B59B6" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {CURIE_MODULES.map((mod, i) => {
        if (i === CURIE_MODULES.length - 1) return null;
        const next = CURIE_MODULES[i + 1];
        return (
          <line
            key={i}
            x1={mod.coords.left} y1={mod.coords.top}
            x2={next.coords.left} y2={next.coords.top}
            stroke="url(#curie-grad)" strokeWidth="1.5"
            strokeDasharray="6 8" opacity="0.4"
          />
        );
      })}
    </svg>
  );
}

// ─── Nodo de módulo ───────────────────────────────────────────────────────────
function CurieModuleNode({ mod, idx, isCompleted }) {
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
                marginTop: '0.8rem', background: 'rgba(8,13,8,0.95)',
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
export default function MarieCurieHub() {
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
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#080D08', color: '#00FF88' }}>
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          Analizando muestras radiactivas...
        </motion.div>
      </div>
    );
  }

  const completedCount = CURIE_MODULES.filter(m => completedModules.includes(m.id)).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#080D08', overflow: 'hidden' }}>
      <main style={{
        flex: 1, position: 'relative', width: '100vw', height: '100vh',
        backgroundColor: '#080D08',
        backgroundImage: "url('/assets/marie_curie/curie_cover.png')",
        backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat',
      }}>
        {/* Vignette overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at center, rgba(8,13,8,0) 0%, rgba(8,13,8,0.5) 70%, rgba(8,13,8,0.9) 100%)',
          pointerEvents: 'none', zIndex: 1
        }} />

        {/* Atmospheric layers */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
          <RadioactiveParticles />
          <GlowingVials />
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
              border: '1px solid rgba(0,255,136,0.4)', color: 'white',
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
              border: '1px solid rgba(0,255,136,0.3)', boxShadow: '0 0 20px rgba(0,0,0,0.8)',
              backdropFilter: 'blur(8px)', pointerEvents: 'auto'
            }}>
              <h1 style={{
                color: 'white', margin: 0, fontSize: '2rem',
                textShadow: '0 0 10px rgba(0,255,136,0.6), 0 0 20px rgba(0,255,136,0.4)',
                letterSpacing: '2px', fontFamily: "'Outfit', sans-serif", textTransform: 'uppercase'
              }}>
                MARIE CURIE
              </h1>
              <p style={{
                color: '#88FFB8', margin: '0.2rem 0 0 0', fontSize: '0.9rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.8)', letterSpacing: '1px'
              }}>
                Sus Descubrimientos y Legado · 6 Módulos
              </p>
            </div>
          </motion.div>
        </div>

        {/* Module nodes */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
          {CURIE_MODULES.map((mod, idx) => (
            <div key={mod.id} style={{ pointerEvents: 'auto' }}>
              <CurieModuleNode mod={mod} idx={idx} isCompleted={completedModules.includes(mod.id)} />
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(0,255,136,0.3)',
          padding: '1rem 2.5rem', borderRadius: '40px', backdropFilter: 'blur(10px)',
          zIndex: 200, boxShadow: '0 0 30px rgba(0,0,0,0.8), inset 0 0 20px rgba(0,255,136,0.1)',
          display: 'flex', alignItems: 'center', gap: '1.5rem',
        }}>
          <div style={{ color: 'white', fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem' }}>
            Progreso de Exploración:
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1.5rem', borderRadius: '20px',
            color: '#88FFB8', fontWeight: 'bold', fontSize: '1.2rem',
            textShadow: '0 0 10px rgba(0,255,136,0.5)'
          }}>
            {completedCount} / {CURIE_MODULES.length}
          </div>
        </div>
      </main>
    </div>
  );
}
