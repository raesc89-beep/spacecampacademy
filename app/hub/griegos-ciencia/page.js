'use client';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// ─── Módulos del curso Griegos en la Ciencia ───────────────────────────────────
const GRIEGOS_MODULES = [
  {
    id: 'griegos_m1',
    title: 'Tales de Mileto',
    subtitle: 'El primer filósofo natural',
    color: '#D4A017',
    glowColor: 'rgba(212,160,23,0.5)',
    link: '/course/griegos_m1',
    icon: '/assets/griegos_ciencia/griegos_m1.png',
    coords: { left: '12%', top: '55%' },
    symbol: '💧',
  },
  {
    id: 'griegos_m2',
    title: 'Pitágoras',
    subtitle: 'Los números y la armonía',
    color: '#E74C3C',
    glowColor: 'rgba(231,76,60,0.5)',
    link: '/course/griegos_m2',
    icon: '/assets/griegos_ciencia/griegos_m2.png',
    coords: { left: '30%', top: '30%' },
    symbol: '📐',
  },
  {
    id: 'griegos_m3',
    title: 'Aristóteles',
    subtitle: 'El maestro del saber',
    color: '#3498DB',
    glowColor: 'rgba(52,152,219,0.5)',
    link: '/course/griegos_m3',
    icon: '/assets/griegos_ciencia/griegos_m3.png',
    coords: { left: '50%', top: '58%' },
    symbol: '📚',
  },
  {
    id: 'griegos_m4',
    title: 'Arquímedes',
    subtitle: '¡Eureka! El genio de Siracusa',
    color: '#FFD700',
    glowColor: 'rgba(255,215,0,0.5)',
    link: '/course/griegos_m4',
    icon: '/assets/griegos_ciencia/griegos_m4.png',
    coords: { left: '68%', top: '28%' },
    symbol: '⚙️',
  },
  {
    id: 'griegos_m5',
    title: 'Eratóstenes',
    subtitle: 'Midió la Tierra con una sombra',
    color: '#2ECC71',
    glowColor: 'rgba(46,204,113,0.5)',
    link: '/course/griegos_m5',
    icon: '/assets/griegos_ciencia/griegos_m5.png',
    coords: { left: '85%', top: '52%' },
    symbol: '🌍',
  },
  {
    id: 'griegos_m6',
    title: 'Hipatia de Alejandría',
    subtitle: 'La última luz del mundo antiguo',
    color: '#9B59B6',
    glowColor: 'rgba(155,89,182,0.5)',
    link: '/course/griegos_m6',
    icon: '/assets/griegos_ciencia/griegos_m6.png',
    coords: { left: '70%', top: '72%' },
    symbol: '✨',
  },
];

// ─── Llamas de antorchas ───────────────────────────────────────────────────────
function TorchFlames() {
  const torches = useRef([
    { x: 5, y: 40, size: 40 },
    { x: 95, y: 35, size: 35 },
    { x: 5, y: 75, size: 30 },
    { x: 95, y: 70, size: 32 },
    { x: 48, y: 8, size: 28 },
  ]).current;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {torches.map((t, i) => (
        <div key={i} style={{ position: 'absolute', left: `${t.x}%`, top: `${t.y}%` }}>
          {/* Outer glow */}
          <div style={{
            position: 'absolute',
            width: t.size * 3, height: t.size * 4,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(255,165,0,0.12) 0%, rgba(255,100,0,0.05) 40%, transparent 70%)',
            transform: 'translate(-50%, -60%)',
            animation: `flameOuter ${2 + i * 0.3}s ease-in-out infinite ${i * 0.5}s`,
          }} />
          {/* Core flame */}
          <div style={{
            position: 'absolute',
            width: t.size, height: t.size * 1.8,
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            background: 'radial-gradient(ellipse at bottom, rgba(255,215,0,0.6) 0%, rgba(255,140,0,0.4) 40%, rgba(255,69,0,0.15) 70%, transparent 100%)',
            transform: 'translate(-50%, -70%)',
            animation: `flameCore ${1.5 + i * 0.2}s ease-in-out infinite ${i * 0.4}s`,
          }} />
        </div>
      ))}
      <style>{`
        @keyframes flameCore {
          0%, 100% { transform: translate(-50%, -70%) scaleY(1) scaleX(1); opacity: 0.7; }
          25% { transform: translate(-52%, -72%) scaleY(1.15) scaleX(0.9); opacity: 0.9; }
          50% { transform: translate(-48%, -75%) scaleY(1.25) scaleX(0.85); opacity: 1; }
          75% { transform: translate(-51%, -71%) scaleY(1.1) scaleX(0.95); opacity: 0.8; }
        }
        @keyframes flameOuter {
          0%, 100% { opacity: 0.4; transform: translate(-50%, -60%) scale(1); }
          50% { opacity: 0.7; transform: translate(-50%, -65%) scale(1.15); }
        }
      `}</style>
    </div>
  );
}

// ─── Símbolos zodiacales rotando ───────────────────────────────────────────────
function ZodiacConstellations() {
  const symbols = useRef([
    { char: '♈', x: 18, y: 12, size: 1.8, dur: 50 },
    { char: '♉', x: 82, y: 15, size: 1.5, dur: 55 },
    { char: '♊', x: 10, y: 85, size: 1.3, dur: 48 },
    { char: '♌', x: 88, y: 82, size: 1.6, dur: 52 },
    { char: '♎', x: 40, y: 8, size: 1.2, dur: 45 },
    { char: '♏', x: 60, y: 90, size: 1.4, dur: 58 },
    { char: '♐', x: 92, y: 50, size: 1.1, dur: 42 },
    { char: '♒', x: 5, y: 55, size: 1.3, dur: 46 },
    { char: '♓', x: 50, y: 5, size: 1.0, dur: 60 },
    { char: '☿', x: 75, y: 88, size: 1.2, dur: 53 },
  ]).current;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {symbols.map((s, i) => (
        <motion.div
          key={i}
          animate={{
            rotate: [0, 360],
            opacity: [0.05, 0.18, 0.05],
          }}
          transition={{
            rotate: { repeat: Infinity, duration: s.dur, ease: 'linear' },
            opacity: { repeat: Infinity, duration: s.dur / 3, ease: 'easeInOut' },
          }}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            fontSize: `${s.size}rem`,
            color: '#D4A017',
            textShadow: '0 0 12px rgba(212,160,23,0.4)',
            userSelect: 'none',
          }}
        >
          {s.char}
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
        <linearGradient id="griegos-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4A017" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#FFD700" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#9B59B6" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {GRIEGOS_MODULES.map((mod, i) => {
        if (i === GRIEGOS_MODULES.length - 1) return null;
        const next = GRIEGOS_MODULES[i + 1];
        return (
          <line
            key={i}
            x1={mod.coords.left} y1={mod.coords.top}
            x2={next.coords.left} y2={next.coords.top}
            stroke="url(#griegos-grad)" strokeWidth="1.5"
            strokeDasharray="6 8" opacity="0.4"
          />
        );
      })}
    </svg>
  );
}

// ─── Nodo de módulo ───────────────────────────────────────────────────────────
function GriegosModuleNode({ mod, idx, isCompleted }) {
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
                marginTop: '0.8rem', background: 'rgba(10,8,8,0.95)',
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
export default function GriegosCienciaHub() {
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
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0A0808', color: '#D4A017' }}>
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          Consultando los oráculos de Delfos...
        </motion.div>
      </div>
    );
  }

  const completedCount = GRIEGOS_MODULES.filter(m => completedModules.includes(m.id)).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#0A0808', overflow: 'hidden' }}>
      <main style={{
        flex: 1, position: 'relative', width: '100vw', height: '100vh',
        backgroundColor: '#0A0808',
        backgroundImage: "url('/assets/griegos_ciencia/griegos_cover.png')",
        backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat',
      }}>
        {/* Vignette overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at center, rgba(10,8,8,0) 0%, rgba(10,8,8,0.5) 70%, rgba(10,8,8,0.9) 100%)',
          pointerEvents: 'none', zIndex: 1
        }} />

        {/* Atmospheric layers */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
          <TorchFlames />
          <ZodiacConstellations />
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
              border: '1px solid rgba(212,160,23,0.4)', color: 'white',
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
              border: '1px solid rgba(212,160,23,0.3)', boxShadow: '0 0 20px rgba(0,0,0,0.8)',
              backdropFilter: 'blur(8px)', pointerEvents: 'auto'
            }}>
              <h1 style={{
                color: 'white', margin: 0, fontSize: '2rem',
                textShadow: '0 0 10px rgba(212,160,23,0.6), 0 0 20px rgba(212,160,23,0.4)',
                letterSpacing: '2px', fontFamily: "'Outfit', sans-serif", textTransform: 'uppercase'
              }}>
                LOS GRIEGOS EN LA CIENCIA
              </h1>
              <p style={{
                color: '#F0D060', margin: '0.2rem 0 0 0', fontSize: '0.9rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.8)', letterSpacing: '1px'
              }}>
                Los Padres de la Ciencia Occidental · 6 Módulos
              </p>
            </div>
          </motion.div>
        </div>

        {/* Module nodes */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
          {GRIEGOS_MODULES.map((mod, idx) => (
            <div key={mod.id} style={{ pointerEvents: 'auto' }}>
              <GriegosModuleNode mod={mod} idx={idx} isCompleted={completedModules.includes(mod.id)} />
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(212,160,23,0.3)',
          padding: '1rem 2.5rem', borderRadius: '40px', backdropFilter: 'blur(10px)',
          zIndex: 200, boxShadow: '0 0 30px rgba(0,0,0,0.8), inset 0 0 20px rgba(212,160,23,0.1)',
          display: 'flex', alignItems: 'center', gap: '1.5rem',
        }}>
          <div style={{ color: 'white', fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem' }}>
            Progreso de Exploración:
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1.5rem', borderRadius: '20px',
            color: '#F0D060', fontWeight: 'bold', fontSize: '1.2rem',
            textShadow: '0 0 10px rgba(212,160,23,0.5)'
          }}>
            {completedCount} / {GRIEGOS_MODULES.length}
          </div>
        </div>
      </main>
    </div>
  );
}
