'use client';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ChevronLeft, Star, Atom, Telescope, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// ─── Módulos del curso Cecilia Payne ─────────────────────────────────────────
const CECILIA_MODULES = [
  {
    id: 'cecilia_m1',
    title: 'Las Mujeres en la Ciencia',
    subtitle: 'Una historia de valentía',
    color: '#9B59B6',
    glowColor: 'rgba(155,89,182,0.5)',
    link: '/course/cecilia_m1',
    icon: '/assets/cecilia_payne/cecilia_m1.png',
    coords: { left: '12%', top: '55%' },
    symbol: '♀',
  },
  {
    id: 'cecilia_m2',
    title: '¿Quién Fue Cecilia Payne?',
    subtitle: 'La astrónoma pionera',
    color: '#8E44AD',
    glowColor: 'rgba(142,68,173,0.5)',
    link: '/course/cecilia_m2',
    icon: '/assets/cecilia_payne/cecilia_m2.png',
    coords: { left: '34%', top: '28%' },
    symbol: '🔭',
  },
  {
    id: 'cecilia_m3',
    title: 'Sus Descubrimientos',
    subtitle: 'Las estrellas son hidrógeno',
    color: '#D4A017',
    glowColor: 'rgba(212,160,23,0.5)',
    link: '/course/cecilia_m3',
    icon: '/assets/cecilia_payne/cecilia_m3.png',
    coords: { left: '62%', top: '45%' },
    symbol: 'H',
  },
  {
    id: 'cecilia_m4',
    title: 'Su Legado e Impacto',
    subtitle: 'Una estrella que nunca se apaga',
    color: '#00CED1',
    glowColor: 'rgba(0,206,209,0.5)',
    link: '/course/cecilia_m4',
    icon: '/assets/cecilia_payne/cecilia_m4.png',
    coords: { left: '84%', top: '62%' },
    symbol: '✨',
  },
];

// ─── Campo de partículas espectrales animadas ─────────────────────────────────
function SpectralParticles() {
  const particles = useRef(
    Array.from({ length: 60 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 0.5,
      dur: Math.random() * 5 + 3,
      delay: Math.random() * 5,
      color: ['#9B59B6', '#D4A017', '#00CED1', '#FFD700', '#E91E8C', '#fff'][Math.floor(Math.random() * 6)],
    }))
  ).current;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.1, 0.9, 0.1], scale: [1, 1.5, 1] }}
          transition={{ repeat: Infinity, duration: p.dur, delay: p.delay, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Bandas espectrales animadas ──────────────────────────────────────────────
function SpectralBands() {
  const bands = [
    { color: '#9B59B6', top: '15%', opacity: 0.08, speed: '18s' },
    { color: '#D4A017', top: '35%', opacity: 0.06, speed: '24s' },
    { color: '#00CED1', top: '55%', opacity: 0.07, speed: '20s' },
    { color: '#E91E8C', top: '75%', opacity: 0.05, speed: '28s' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {bands.map((b, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: b.top,
          left: 0,
          right: 0,
          height: '2px',
          background: b.color,
          opacity: b.opacity,
          animation: `spectralPulse ${b.speed} ease-in-out infinite ${i * 3}s`,
          boxShadow: `0 0 20px ${b.color}`,
        }} />
      ))}
      <style>{`
        @keyframes spectralPulse {
          0%, 100% { opacity: 0.03; transform: scaleX(0.8); }
          50% { opacity: 0.15; transform: scaleX(1.1); }
        }
      `}</style>
    </div>
  );
}

// ─── Líneas de constelación ───────────────────────────────────────────────────
function ConstellationLines() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}>
      <defs>
        <linearGradient id="cecilia-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9B59B6" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#D4A017" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00CED1" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {CECILIA_MODULES.map((mod, i) => {
        if (i === CECILIA_MODULES.length - 1) return null;
        const next = CECILIA_MODULES[i + 1];
        return (
          <line
            key={i}
            x1={mod.coords.left}
            y1={mod.coords.top}
            x2={next.coords.left}
            y2={next.coords.top}
            stroke="url(#cecilia-grad)"
            strokeWidth="1.5"
            strokeDasharray="6 8"
            opacity="0.5"
          />
        );
      })}
    </svg>
  );
}

// ─── Nodo de módulo ───────────────────────────────────────────────────────────
function CeciliaModuleNode({ mod, idx, isCompleted }) {
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
          zIndex: hovered ? 50 : 10 + idx,
        }}
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 5 + idx * 0.5, ease: 'easeInOut', delay: idx * 0.4 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}
        >
          {/* Anillo pulsante exterior */}
          {!isCompleted && (
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut', delay: idx * 0.3 }}
              style={{
                position: 'absolute',
                width: 90,
                height: 90,
                borderRadius: '50%',
                border: `2px solid ${mod.color}`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          )}

          {/* Icono del módulo */}
          <motion.div
            animate={{ scale: hovered ? 1.18 : 1, boxShadow: hovered ? `0 0 40px ${mod.glowColor}, 0 0 80px ${mod.glowColor}` : `0 0 20px ${mod.glowColor}` }}
            transition={{ duration: 0.25 }}
            style={{
              width: 74,
              height: 74,
              borderRadius: '50%',
              border: `3px solid ${isCompleted ? '#00FF88' : mod.color}`,
              overflow: 'hidden',
              background: `radial-gradient(circle at 40% 40%, ${mod.color}22, rgba(0,0,0,0.85))`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 20px ${mod.glowColor}`,
            }}
          >
            {isCompleted ? (
              <CheckCircle size={32} color="#00FF88" />
            ) : (
              <img
                src={mod.icon}
                alt={mod.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
          </motion.div>

          {/* Número de misión */}
          <div style={{
            background: isCompleted ? 'rgba(0,255,136,0.15)' : `${mod.color}22`,
            border: `1px solid ${isCompleted ? '#00FF88' : mod.color}`,
            borderRadius: '12px',
            padding: '0.2rem 0.6rem',
            fontSize: '0.65rem',
            color: isCompleted ? '#00FF88' : mod.color,
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            M-{idx + 1}
          </div>

          {/* Tooltip */}
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginTop: '0.8rem',
                background: 'rgba(8,8,20,0.95)',
                border: `1px solid ${mod.color}`,
                borderRadius: '14px',
                padding: '0.8rem 1.2rem',
                minWidth: '180px',
                textAlign: 'center',
                backdropFilter: 'blur(12px)',
                boxShadow: `0 8px 32px ${mod.glowColor}`,
                zIndex: 100,
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

// ─── Componente principal del Hub ─────────────────────────────────────────────
export default function CeciliaPayneHub() {
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
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050010', color: '#9B59B6' }}>
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          Calibrando espectrógrafo...
        </motion.div>
      </div>
    );
  }

  const completedCount = CECILIA_MODULES.filter(m => completedModules.includes(m.id)).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#08001A', overflow: 'hidden' }}>

      {/* Main canvas */}
      <main style={{
        flex: 1, position: 'relative', width: '100vw', height: '100vh',
        backgroundColor: '#08001A',
        backgroundImage: "url('/assets/cecilia_payne_cover.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}>
        {/* Capas de oscurecimiento */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at center, rgba(8,0,26,0) 0%, rgba(8,0,26,0.6) 80%, rgba(8,0,26,0.9) 100%)',
          pointerEvents: 'none', zIndex: 1
        }} />

        {/* Estrellas de fondo */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'url(https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=2560&auto=format&fit=crop) center center / cover',
          opacity: 0.25,
          mixBlendMode: 'screen',
          pointerEvents: 'none', zIndex: 0
        }} />

        {/* Partículas y bandas espectrales */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
          <SpectralParticles />
          <SpectralBands />
        </div>

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
              border: '1px solid rgba(155,89,182,0.4)',
              color: 'white',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              borderRadius: '30px',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
              fontFamily: "'Outfit', sans-serif",
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
              border: '1px solid rgba(155,89,182,0.3)',
              boxShadow: '0 0 20px rgba(0,0,0,0.8)',
              backdropFilter: 'blur(8px)',
              pointerEvents: 'auto'
            }}>
              <h1 style={{
                color: 'white',
                margin: 0,
                fontSize: '2rem',
                textShadow: '0 0 10px rgba(155,89,182,0.6), 0 0 20px rgba(155,89,182,0.4)',
                letterSpacing: '2px',
                fontFamily: "'Outfit', sans-serif",
                textTransform: 'uppercase'
              }}>
                CECILIA PAYNE
              </h1>
              <p style={{
                color: '#C39BD3',
                margin: '0.2rem 0 0 0',
                fontSize: '0.9rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                letterSpacing: '1px'
              }}>
                La Astrónoma Pionera · 4 Módulos
              </p>
            </div>
          </motion.div>
        </div>

        {/* Nodos de los módulos */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
          {CECILIA_MODULES.map((mod, idx) => (
            <div key={mod.id} style={{ pointerEvents: 'auto' }}>
              <CeciliaModuleNode
                mod={mod}
                idx={idx}
                isCompleted={completedModules.includes(mod.id)}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA - Progress Indicator */}
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.7)',
          border: '1px solid rgba(155,89,182,0.3)',
          padding: '1rem 2.5rem',
          borderRadius: '40px',
          backdropFilter: 'blur(10px)',
          zIndex: 200,
          boxShadow: '0 0 30px rgba(0,0,0,0.8), inset 0 0 20px rgba(155,89,182,0.1)',
          display: 'flex', alignItems: 'center', gap: '1.5rem',
        }}>
          <div style={{ color: 'white', fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem' }}>
            Progreso de Exploración:
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '0.5rem 1.5rem',
            borderRadius: '20px',
            color: '#C39BD3',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            textShadow: '0 0 10px rgba(155,89,182,0.5)'
          }}>
            {completedCount} / {CECILIA_MODULES.length}
          </div>
        </div>
      </main>
    </div>
  );
}
