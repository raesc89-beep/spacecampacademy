'use client';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// ─── Módulos del curso La Ciencia de Arrival ──────────────────────────────────
const ARRIVAL_MODULES = [
  {
    id: 'arrival_m1',
    title: 'La Hipótesis Sapir-Whorf',
    subtitle: '¿El lenguaje moldea el pensamiento?',
    color: '#708090',
    glowColor: 'rgba(112,128,144,0.5)',
    link: '/course/arrival_m1',
    icon: '/assets/arrival_ciencia/arrival_m1.png',
    coords: { left: '14%', top: '55%' },
    symbol: '🧠',
  },
  {
    id: 'arrival_m2',
    title: 'Xenolingüística',
    subtitle: '¿Cómo hablaríamos con aliens?',
    color: '#4682B4',
    glowColor: 'rgba(70,130,180,0.5)',
    link: '/course/arrival_m2',
    icon: '/assets/arrival_ciencia/arrival_m2.png',
    coords: { left: '32%', top: '30%' },
    symbol: '👽',
  },
  {
    id: 'arrival_m3',
    title: 'Tiempo No Lineal',
    subtitle: 'La física del tiempo',
    color: '#9B59B6',
    glowColor: 'rgba(155,89,182,0.5)',
    link: '/course/arrival_m3',
    icon: '/assets/arrival_ciencia/arrival_m3.png',
    coords: { left: '52%', top: '58%' },
    symbol: '⏳',
  },
  {
    id: 'arrival_m4',
    title: 'Ted Chiang',
    subtitle: 'Story of Your Life',
    color: '#E74C3C',
    glowColor: 'rgba(231,76,60,0.5)',
    link: '/course/arrival_m4',
    icon: '/assets/arrival_ciencia/arrival_m4.png',
    coords: { left: '70%', top: '28%' },
    symbol: '📖',
  },
  {
    id: 'arrival_m5',
    title: 'El Principio de Fermat',
    subtitle: 'La luz y el camino mínimo',
    color: '#FFD700',
    glowColor: 'rgba(255,215,0,0.5)',
    link: '/course/arrival_m5',
    icon: '/assets/arrival_ciencia/arrival_m5.png',
    coords: { left: '86%', top: '50%' },
    symbol: '💡',
  },
  {
    id: 'arrival_m6',
    title: 'SETI Real',
    subtitle: '¿Estamos solos en el universo?',
    color: '#2ECC71',
    glowColor: 'rgba(46,204,113,0.5)',
    link: '/course/arrival_m6',
    icon: '/assets/arrival_ciencia/arrival_m6.png',
    coords: { left: '66%', top: '72%' },
    symbol: '📡',
  },
];

// ─── Niebla misteriosa ─────────────────────────────────────────────────────────
function MysteriousFog() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
        background: 'linear-gradient(to top, rgba(112,128,144,0.15) 0%, transparent 100%)',
        animation: 'fogDrift 20s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: '-20%', right: '-20%', height: '40%',
        background: 'linear-gradient(to top, rgba(70,130,180,0.1) 0%, transparent 100%)',
        animation: 'fogDrift 28s ease-in-out infinite 8s',
      }} />
      <style>{`
        @keyframes fogDrift {
          0%, 100% { transform: translateX(-5%); opacity: 0.4; }
          50% { transform: translateX(5%); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

// ─── Símbolos heptápodos flotantes ──────────────────────────────────────────────
function HeptapodSymbols() {
  const symbols = useRef(
    Array.from({ length: 15 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 80 + 10,
      size: Math.random() * 50 + 30,
      dur: Math.random() * 15 + 10,
      delay: Math.random() * 10,
      rotation: Math.random() * 360,
    }))
  ).current;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {symbols.map((s, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0, 0.08, 0], rotate: [s.rotation, s.rotation + 30, s.rotation] }}
          transition={{ repeat: Infinity, duration: s.dur, delay: s.delay, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            left: `${s.x}%`, top: `${s.y}%`,
            width: s.size, height: s.size,
            borderRadius: '50%',
            border: '2px solid rgba(112,128,144,0.3)',
            boxShadow: '0 0 15px rgba(112,128,144,0.1)',
          }}
        />
      ))}
    </div>
  );
}

// ─── Alien shell silhouette glow ─────────────────────────────────────────────
function ShellGlow() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <div style={{
        position: 'absolute', top: '10%', left: '40%',
        width: '300px', height: '500px',
        borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
        background: 'radial-gradient(ellipse, rgba(112,128,144,0.04) 0%, transparent 70%)',
        animation: 'shellPulse 8s ease-in-out infinite',
      }} />
      <style>{`
        @keyframes shellPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}

// ─── Constellation lines ────────────────────────────────────────────────────────
function ConstellationLines() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}>
      <defs>
        <linearGradient id="arrival-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#708090" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#4682B4" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#9B59B6" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {ARRIVAL_MODULES.map((mod, i) => {
        if (i === ARRIVAL_MODULES.length - 1) return null;
        const next = ARRIVAL_MODULES[i + 1];
        return (
          <line key={i}
            x1={mod.coords.left} y1={mod.coords.top}
            x2={next.coords.left} y2={next.coords.top}
            stroke="url(#arrival-grad)" strokeWidth="1.5"
            strokeDasharray="6 8" opacity="0.35"
          />
        );
      })}
    </svg>
  );
}

// ─── Module Node ──────────────────────────────────────────────────────────────
function ArrivalModuleNode({ mod, idx, isCompleted }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={mod.link} passHref>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'absolute', left: mod.coords.left, top: mod.coords.top,
          transform: 'translate(-50%, -50%)', cursor: 'pointer',
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
                marginTop: '0.8rem', background: 'rgba(8,8,20,0.95)',
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

// ─── Main Hub Component ───────────────────────────────────────────────────────
export default function ArrivalCienciaHub() {
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
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0A0A12', color: '#708090' }}>
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          Decodificando logogramas heptápodos...
        </motion.div>
      </div>
    );
  }

  const completedCount = ARRIVAL_MODULES.filter(m => completedModules.includes(m.id)).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#0A0A12', overflow: 'hidden' }}>
      <main style={{
        flex: 1, position: 'relative', width: '100vw', height: '100vh',
        backgroundColor: '#0A0A12',
        backgroundImage: "url('/assets/arrival_ciencia/arrival_cover.png')",
        backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at center, rgba(10,10,18,0) 0%, rgba(10,10,18,0.5) 70%, rgba(10,10,18,0.9) 100%)',
          pointerEvents: 'none', zIndex: 1
        }} />

        <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
          <MysteriousFog />
          <HeptapodSymbols />
          <ShellGlow />
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
              border: '1px solid rgba(112,128,144,0.4)', color: 'white',
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
              border: '1px solid rgba(112,128,144,0.3)', boxShadow: '0 0 20px rgba(0,0,0,0.8)',
              backdropFilter: 'blur(8px)', pointerEvents: 'auto'
            }}>
              <h1 style={{
                color: 'white', margin: 0, fontSize: '1.8rem',
                textShadow: '0 0 10px rgba(112,128,144,0.6), 0 0 20px rgba(70,130,180,0.4)',
                letterSpacing: '2px', fontFamily: "'Outfit', sans-serif", textTransform: 'uppercase'
              }}>
                LA CIENCIA DE ARRIVAL
              </h1>
              <p style={{
                color: '#A9B7C6', margin: '0.2rem 0 0 0', fontSize: '0.9rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.8)', letterSpacing: '1px'
              }}>
                Lingüística, Física y Primer Contacto · 6 Módulos
              </p>
            </div>
          </motion.div>
        </div>

        {/* Module nodes */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
          {ARRIVAL_MODULES.map((mod, idx) => (
            <div key={mod.id} style={{ pointerEvents: 'auto' }}>
              <ArrivalModuleNode mod={mod} idx={idx} isCompleted={completedModules.includes(mod.id)} />
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(112,128,144,0.3)',
          padding: '1rem 2.5rem', borderRadius: '40px', backdropFilter: 'blur(10px)',
          zIndex: 200, boxShadow: '0 0 30px rgba(0,0,0,0.8), inset 0 0 20px rgba(112,128,144,0.1)',
          display: 'flex', alignItems: 'center', gap: '1.5rem',
        }}>
          <div style={{ color: 'white', fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem' }}>
            Progreso de Exploración:
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1.5rem', borderRadius: '20px',
            color: '#A9B7C6', fontWeight: 'bold', fontSize: '1.2rem',
            textShadow: '0 0 10px rgba(112,128,144,0.5)'
          }}>
            {completedCount} / {ARRIVAL_MODULES.length}
          </div>
        </div>
      </main>
    </div>
  );
}
