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
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #08001A 0%, #0D0025 30%, #0A0020 60%, #05000F 100%)',
      fontFamily: "'Outfit', 'Inter', sans-serif",
    }}>
      {/* Fondo de imagen de portada */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'url(/assets/cecilia_payne_cover.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        opacity: 0.15,
        filter: 'blur(2px)',
      }} />

      {/* Gradiente de profundidad */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(8,0,26,0.6) 0%, rgba(8,0,26,0.2) 40%, rgba(8,0,26,0.7) 80%, rgba(5,0,15,0.95) 100%)',
      }} />

      {/* Nebulosa decorativa */}
      <div style={{
        position: 'absolute', top: '10%', right: '5%', width: 500, height: 500,
        background: 'radial-gradient(ellipse, rgba(155,89,182,0.12) 0%, transparent 70%)',
        borderRadius: '50%', zIndex: 2, filter: 'blur(40px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '15%', left: '5%', width: 400, height: 400,
        background: 'radial-gradient(ellipse, rgba(0,206,209,0.08) 0%, transparent 70%)',
        borderRadius: '50%', zIndex: 2, filter: 'blur(40px)',
      }} />
      <div style={{
        position: 'absolute', top: '40%', left: '40%', width: 300, height: 300,
        background: 'radial-gradient(ellipse, rgba(212,160,23,0.07) 0%, transparent 70%)',
        borderRadius: '50%', zIndex: 2, filter: 'blur(30px)',
      }} />

      {/* Partículas y bandas espectrales */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3 }}>
        <SpectralParticles />
        <SpectralBands />
      </div>

      {/* Botón volver */}
      <div style={{ position: 'fixed', top: '1.5rem', left: '1.5rem', zIndex: 100 }}>
        <Link href="/dashboard">
          <motion.div
            whileHover={{ scale: 1.08, x: -4 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(155,89,182,0.15)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(155,89,182,0.4)', borderRadius: '30px',
              padding: '0.5rem 1.2rem', color: '#C39BD3', cursor: 'pointer',
              fontSize: '0.85rem', fontWeight: 600,
            }}
          >
            <ChevronLeft size={18} /> Estación
          </motion.div>
        </Link>
      </div>

      {/* Contenido principal */}
      <div style={{ position: 'relative', zIndex: 10, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', paddingTop: '6rem', paddingBottom: '2rem', paddingInline: '2rem' }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Ícono de espectroscopía */}
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
              style={{ fontSize: '3.5rem', marginBottom: '1rem', display: 'inline-block', filter: 'drop-shadow(0 0 20px #9B59B6)' }}
            >
              🔭
            </motion.div>

            {/* Título */}
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #C39BD3 0%, #D4A017 40%, #00CED1 80%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: '0 0 0.5rem 0',
              lineHeight: 1.2,
              letterSpacing: '-1px',
              textShadow: 'none',
            }}>
              Cecilia Payne-Gaposchkin
            </h1>
            <h2 style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
              color: '#C39BD3',
              fontWeight: 400,
              margin: '0 0 1.5rem 0',
              opacity: 0.9,
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}>
              La Astrónoma que Descubrió de qué Están Hechas las Estrellas
            </h2>

            {/* Frase célebre */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                display: 'inline-block',
                background: 'rgba(155,89,182,0.1)',
                border: '1px solid rgba(155,89,182,0.3)',
                borderRadius: '16px',
                padding: '0.8rem 1.8rem',
                backdropFilter: 'blur(8px)',
                marginBottom: '2rem',
              }}
            >
              <p style={{ color: '#E8D5F5', fontSize: '0.95rem', fontStyle: 'italic', margin: 0, lineHeight: 1.5 }}>
                "El mayor reconocimiento que puede recibir una persona es haber hecho su trabajo de tal manera que le importe a otros."
              </p>
              <p style={{ color: '#9B59B6', fontSize: '0.8rem', margin: '0.4rem 0 0 0', fontWeight: 600 }}>— Cecilia Payne-Gaposchkin, 1976</p>
            </motion.div>

            {/* Progreso */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                background: 'rgba(155,89,182,0.12)', border: '1px solid rgba(155,89,182,0.3)',
                borderRadius: '30px', padding: '0.5rem 1.2rem', backdropFilter: 'blur(8px)',
              }}>
                <Sparkles size={18} color="#9B59B6" />
                <span style={{ color: '#C39BD3', fontSize: '0.9rem', fontWeight: 600 }}>
                  {completedCount} / {CECILIA_MODULES.length} Misiones
                </span>
              </div>
              {completedCount === CECILIA_MODULES.length && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                    background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)',
                    borderRadius: '30px', padding: '0.5rem 1.2rem',
                  }}
                >
                  <CheckCircle size={18} color="#00FF88" />
                  <span style={{ color: '#00FF88', fontSize: '0.9rem', fontWeight: 700 }}>¡Curso Completado!</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Mapa de misiones */}
        <div style={{ flex: 1, position: 'relative', minHeight: '400px' }}>
          <ConstellationLines />
          {CECILIA_MODULES.map((mod, idx) => (
            <CeciliaModuleNode
              key={mod.id}
              mod={mod}
              idx={idx}
              isCompleted={completedModules.includes(mod.id)}
            />
          ))}
        </div>

        {/* Footer informativo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            padding: '2rem 2rem 3rem',
            maxWidth: '900px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          {[
            { icon: '🇬🇧', label: 'Origen', value: 'Wendover, Inglaterra, 1900' },
            { icon: '⭐', label: 'Descubrimiento', value: 'Las estrellas son 90% hidrógeno' },
            { icon: '🏛️', label: 'Universidad', value: 'Harvard Observatory' },
            { icon: '🏆', label: 'Logro histórico', value: '1ª profesora titular en Harvard' },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(155,89,182,0.3)' }}
              style={{
                background: 'rgba(155,89,182,0.08)',
                border: '1px solid rgba(155,89,182,0.2)',
                borderRadius: '16px',
                padding: '1.2rem',
                backdropFilter: 'blur(8px)',
                textAlign: 'center',
                transition: 'all 0.3s',
              }}
            >
              <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{item.icon}</div>
              <div style={{ color: '#9B59B6', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, marginBottom: '0.3rem' }}>{item.label}</div>
              <div style={{ color: '#E8D5F5', fontSize: '0.85rem', lineHeight: 1.4 }}>{item.value}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
