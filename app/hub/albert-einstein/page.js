'use client';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// ─── Módulos del curso Albert Einstein ─────────────────────────────────────────
const EINSTEIN_MODULES = [
  {
    id: 'einstein_m1',
    title: 'El joven Albert',
    subtitle: 'De Ulm a Zurich',
    color: '#FF4500',
    glowColor: 'rgba(255,69,0,0.5)',
    link: '/course/einstein_m1',
    icon: '/assets/albert_einstein/einstein_m1.png',
    coords: { left: '14%', top: '58%' },
    symbol: '👦',
  },
  {
    id: 'einstein_m2',
    title: 'Annus Mirabilis 1905',
    subtitle: 'El año milagroso',
    color: '#E74C3C',
    glowColor: 'rgba(231,76,60,0.5)',
    link: '/course/einstein_m2',
    icon: '/assets/albert_einstein/einstein_m2.png',
    coords: { left: '32%', top: '30%' },
    symbol: '📜',
  },
  {
    id: 'einstein_m3',
    title: 'E=mc²',
    subtitle: 'La ecuación más famosa',
    color: '#FFD700',
    glowColor: 'rgba(255,215,0,0.5)',
    link: '/course/einstein_m3',
    icon: '/assets/albert_einstein/einstein_m3.png',
    coords: { left: '52%', top: '55%' },
    symbol: '⚡',
  },
  {
    id: 'einstein_m4',
    title: 'Relatividad General',
    subtitle: 'La gravedad como geometría',
    color: '#9B59B6',
    glowColor: 'rgba(155,89,182,0.5)',
    link: '/course/einstein_m4',
    icon: '/assets/albert_einstein/einstein_m4.png',
    coords: { left: '70%', top: '28%' },
    symbol: '🌀',
  },
  {
    id: 'einstein_m5',
    title: 'El eclipse de 1919',
    subtitle: 'La prueba de la relatividad',
    color: '#3498DB',
    glowColor: 'rgba(52,152,219,0.5)',
    link: '/course/einstein_m5',
    icon: '/assets/albert_einstein/einstein_m5.png',
    coords: { left: '86%', top: '52%' },
    symbol: '🌑',
  },
  {
    id: 'einstein_m6',
    title: 'Princeton y su legado',
    subtitle: 'Los últimos años y el impacto eterno',
    color: '#2ECC71',
    glowColor: 'rgba(46,204,113,0.5)',
    link: '/course/einstein_m6',
    icon: '/assets/albert_einstein/einstein_m6.png',
    coords: { left: '68%', top: '72%' },
    symbol: '🏛️',
  },
];

// ─── Rejilla de espacio-tiempo deformada ───────────────────────────────────────
function SpacetimeGrid() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.12 }}>
        {/* Horizontal grid lines */}
        {Array.from({ length: 15 }, (_, i) => {
          const y = (i + 1) * (100 / 16);
          const warp = Math.sin((i / 15) * Math.PI) * 3;
          return (
            <path
              key={`h${i}`}
              d={`M 0 ${y}% Q 30% ${y - warp}%, 50% ${y + warp * 1.5}% T 100% ${y}%`}
              fill="none" stroke="#FF4500" strokeWidth="0.5"
              style={{ animation: `gridPulse ${6 + i * 0.3}s ease-in-out infinite ${i * 0.2}s` }}
            />
          );
        })}
        {/* Vertical grid lines */}
        {Array.from({ length: 20 }, (_, i) => {
          const x = (i + 1) * (100 / 21);
          const warp = Math.sin((i / 20) * Math.PI) * 2;
          return (
            <path
              key={`v${i}`}
              d={`M ${x}% 0 Q ${x + warp}% 40%, ${x - warp * 1.2}% 60% T ${x}% 100%`}
              fill="none" stroke="#E74C3C" strokeWidth="0.5"
              style={{ animation: `gridPulse ${8 + i * 0.2}s ease-in-out infinite ${i * 0.15}s` }}
            />
          );
        })}
      </svg>
      <style>{`
        @keyframes gridPulse {
          0%, 100% { opacity: 0.08; }
          50% { opacity: 0.25; }
        }
      `}</style>
    </div>
  );
}

// ─── Ecuaciones flotantes ──────────────────────────────────────────────────────
function FloatingEquations() {
  const equations = useRef([
    { text: 'E=mc²', x: 8, y: 15, size: 1.4, dur: 30, delay: 0 },
    { text: 'Gμν + Λgμν = 8πTμν', x: 75, y: 20, size: 0.9, dur: 38, delay: 5 },
    { text: 'ds² = −c²dt² + dx²', x: 20, y: 80, size: 0.85, dur: 35, delay: 8 },
    { text: 'E² = (pc)² + (mc²)²', x: 85, y: 75, size: 0.8, dur: 42, delay: 3 },
    { text: 'Rμν − ½gμνR = Tμν', x: 45, y: 12, size: 0.9, dur: 36, delay: 12 },
    { text: 'λ = h/p', x: 60, y: 85, size: 1.1, dur: 28, delay: 7 },
    { text: 'ΔxΔp ≥ ℏ/2', x: 30, y: 45, size: 0.75, dur: 40, delay: 15 },
    { text: 't′ = γ(t − vx/c²)', x: 90, y: 40, size: 0.8, dur: 33, delay: 10 },
  ]).current;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {equations.map((eq, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, 15, -10, 5, 0],
            y: [0, -20, 10, -15, 0],
            opacity: [0.06, 0.15, 0.08, 0.12, 0.06],
          }}
          transition={{ repeat: Infinity, duration: eq.dur, delay: eq.delay, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            left: `${eq.x}%`,
            top: `${eq.y}%`,
            fontSize: `${eq.size}rem`,
            color: '#FF4500',
            fontFamily: "'Georgia', serif",
            fontStyle: 'italic',
            textShadow: '0 0 15px rgba(255,69,0,0.3)',
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}
        >
          {eq.text}
        </motion.div>
      ))}
    </div>
  );
}

// ─── Líneas de constelación ────────────────────────────────────────────────────
function ConstellationLines() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}>
      <defs>
        <linearGradient id="einstein-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF4500" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#FFD700" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#9B59B6" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {EINSTEIN_MODULES.map((mod, i) => {
        if (i === EINSTEIN_MODULES.length - 1) return null;
        const next = EINSTEIN_MODULES[i + 1];
        return (
          <line
            key={i}
            x1={mod.coords.left} y1={mod.coords.top}
            x2={next.coords.left} y2={next.coords.top}
            stroke="url(#einstein-grad)" strokeWidth="1.5"
            strokeDasharray="6 8" opacity="0.4"
          />
        );
      })}
    </svg>
  );
}

// ─── Nodo de módulo ───────────────────────────────────────────────────────────
function EinsteinModuleNode({ mod, idx, isCompleted }) {
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
                marginTop: '0.8rem', background: 'rgba(10,5,21,0.95)',
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
export default function AlbertEinsteinHub() {
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
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0A0515', color: '#FF4500' }}>
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          Curvando el espacio-tiempo...
        </motion.div>
      </div>
    );
  }

  const completedCount = EINSTEIN_MODULES.filter(m => completedModules.includes(m.id)).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#0A0515', overflow: 'hidden' }}>
      <main style={{
        flex: 1, position: 'relative', width: '100vw', height: '100vh',
        backgroundColor: '#0A0515',
        backgroundImage: "url('/assets/albert_einstein/einstein_cover.png')",
        backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat',
      }}>
        {/* Vignette overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at center, rgba(10,5,21,0) 0%, rgba(10,5,21,0.5) 70%, rgba(10,5,21,0.9) 100%)',
          pointerEvents: 'none', zIndex: 1
        }} />

        {/* Atmospheric layers */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
          <SpacetimeGrid />
          <FloatingEquations />
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
              border: '1px solid rgba(255,69,0,0.4)', color: 'white',
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
              border: '1px solid rgba(255,69,0,0.3)', boxShadow: '0 0 20px rgba(0,0,0,0.8)',
              backdropFilter: 'blur(8px)', pointerEvents: 'auto'
            }}>
              <h1 style={{
                color: 'white', margin: 0, fontSize: '2rem',
                textShadow: '0 0 10px rgba(255,69,0,0.6), 0 0 20px rgba(255,69,0,0.4)',
                letterSpacing: '2px', fontFamily: "'Outfit', sans-serif", textTransform: 'uppercase'
              }}>
                ALBERT EINSTEIN
              </h1>
              <p style={{
                color: '#FFB088', margin: '0.2rem 0 0 0', fontSize: '0.9rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.8)', letterSpacing: '1px'
              }}>
                Su Obra, Vida y Legado · 6 Módulos
              </p>
            </div>
          </motion.div>
        </div>

        {/* Module nodes */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
          {EINSTEIN_MODULES.map((mod, idx) => (
            <div key={mod.id} style={{ pointerEvents: 'auto' }}>
              <EinsteinModuleNode mod={mod} idx={idx} isCompleted={completedModules.includes(mod.id)} />
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,69,0,0.3)',
          padding: '1rem 2.5rem', borderRadius: '40px', backdropFilter: 'blur(10px)',
          zIndex: 200, boxShadow: '0 0 30px rgba(0,0,0,0.8), inset 0 0 20px rgba(255,69,0,0.1)',
          display: 'flex', alignItems: 'center', gap: '1.5rem',
        }}>
          <div style={{ color: 'white', fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem' }}>
            Progreso de Exploración:
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1.5rem', borderRadius: '20px',
            color: '#FFB088', fontWeight: 'bold', fontSize: '1.2rem',
            textShadow: '0 0 10px rgba(255,69,0,0.5)'
          }}>
            {completedCount} / {EINSTEIN_MODULES.length}
          </div>
        </div>
      </main>
    </div>
  );
}
