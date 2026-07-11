'use client';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { COURSE_CATALOG } from '@/lib/courseCatalog';
import { useEffect, useState } from 'react';

// ─── Módulos del Apollo 11 ─────────────────────────────────────────────────
const APOLLO_MODULES = [
  {
    id: 'apollo11_m1', titleEs: 'El Cohete Saturn V', link: '/course/apollo11_m1',
    color: '#FF6B35', coords: { left: '20%', top: '80%' },
    icon: '/assets/apollo11/m1_launch.png',
  },
  {
    id: 'apollo11_m2', titleEs: 'Rumbo a la Luna', link: '/course/apollo11_m2',
    color: '#00C2FF', coords: { left: '25%', top: '55%' },
    icon: '/assets/apollo11/m2_trajectory.png',
  },
  {
    id: 'apollo11_m3', titleEs: 'Descenso del Águila', link: '/course/apollo11_m3',
    color: '#C0E8FF', coords: { left: '40%', top: '35%' },
    icon: '/assets/apollo11/m3_eagle.png',
  },
  {
    id: 'apollo11_m4', titleEs: 'El Primer Paso', link: '/course/apollo11_m4',
    color: '#F5D020', coords: { left: '60%', top: '35%' },
    icon: '/assets/apollo11/m4_moonwalk.png',
  },
  {
    id: 'apollo11_m5', titleEs: 'Regreso a Órbita', link: '/course/apollo11_m5',
    color: '#A8FF78', coords: { left: '75%', top: '55%' },
    icon: '/assets/apollo11/m5_ascent.png',
  },
  {
    id: 'apollo11_m6', titleEs: 'Amerizaje y Triunfo', link: '/course/apollo11_m6',
    color: '#38B6FF', coords: { left: '80%', top: '80%' },
    icon: '/assets/apollo11/m6_splashdown.png',
  },
];



// ─── Nodo de módulo ─────────────────────────────────────────────────────────
function ApolloModuleNode({ mod, idx, isCompleted, isPlayable }) {
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
          animate={{ y: [0, -10, 0], scale: hovered ? 1.18 : 1 }}
          transition={{
            y: { repeat: Infinity, duration: 3 + idx * 0.4, ease: 'easeInOut', delay: idx * 0.5 },
            scale: { duration: 0.2 },
          }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}
        >
          {/* Círculo de imagen */}
          <div style={{
            position: 'relative',
            width: 'clamp(72px, 7.5vw, 105px)',
            height: 'clamp(72px, 7.5vw, 105px)',
            borderRadius: '50%',
            boxShadow: hovered
              ? `0 0 45px ${mod.color}ff, inset 0 0 20px ${mod.color}99`
              : `0 0 18px ${mod.color}66`,
            transition: 'all 0.3s ease',
          }}>
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden',
              WebkitMaskImage: 'radial-gradient(circle at center, black 48%, transparent 72%)',
              maskImage: 'radial-gradient(circle at center, black 48%, transparent 72%)',
            }}>
              <img
                src={mod.icon} alt={mod.titleEs}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  transform: hovered ? 'scale(1.12)' : 'scale(1)',
                  transition: 'transform 0.4s ease',
                  filter: isCompleted ? 'brightness(1.1) saturate(1.2)' : 'brightness(0.9)',
                }}
              />
              {!hovered && !isPlayable && !isCompleted && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />
              )}
            </div>
            {/* Anillo exterior */}
            <div style={{
              position: 'absolute', inset: '-3px', borderRadius: '50%',
              border: `2px solid ${hovered ? 'white' : mod.color + '55'}`,
              opacity: hovered ? 1 : 0.4,
              transition: 'all 0.3s ease',
              pointerEvents: 'none',
            }} />
            {/* Número de módulo */}
            <div style={{
              position: 'absolute', top: '-8px', left: '-8px',
              width: '24px', height: '24px', borderRadius: '50%',
              background: mod.color, color: '#000',
              fontSize: '0.7rem', fontWeight: 800, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 8px ${mod.color}`,
            }}>{idx + 1}</div>
            {isCompleted && (
              <div style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'rgba(0,0,0,0.9)', padding: '2px', borderRadius: '50%', border: '1px solid #00ff88' }}>
                <CheckCircle size={16} color="#00ff88" />
              </div>
            )}
            {isPlayable && !isCompleted && (
              <div style={{ position: 'absolute', top: '-14px', right: '-10px', fontSize: '1.3rem', animation: 'pulse 1.5s infinite' }}>🚀</div>
            )}
          </div>

          {/* Label */}
          <div style={{
            color: 'white', fontSize: 'clamp(0.58rem, 0.9vw, 0.82rem)',
            textAlign: 'center', textShadow: `0 2px 8px ${mod.color}`,
            textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700,
            background: 'rgba(0,0,0,0.6)', padding: '4px 10px',
            borderRadius: '20px', backdropFilter: 'blur(4px)',
            border: `1px solid ${mod.color}44`, whiteSpace: 'nowrap',
          }}>
            {mod.titleEs}
          </div>
        </motion.div>

        {/* Tooltip */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              style={{
                position: 'absolute', top: '115%', left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(5, 8, 20, 0.97)',
                backdropFilter: 'blur(14px)',
                border: `1px solid ${mod.color}`,
                padding: '0.8rem 1.3rem', borderRadius: '12px',
                whiteSpace: 'nowrap', pointerEvents: 'none',
                boxShadow: `0 8px 32px ${mod.color}55`, zIndex: 100,
              }}
            >
              <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: mod.color }}>▶</span> {mod.titleEs}
              </h4>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: isCompleted ? '#00ff88' : mod.color, fontWeight: 600 }}>
                {isCompleted ? 'Misión Completada ✅' : 'Iniciar Misión 🚀'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Link>
  );
}

// ─── Hub Principal ─────────────────────────────────────────────────────────
export default function Apollo11Hub() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const modules = COURSE_CATALOG;

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  if (loading || !userData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020510', color: '#FF6B35', fontFamily: 'sans-serif' }}>
        Iniciando Cuenta Regresiva...
      </div>
    );
  }

  const completedIds = userData?.progress?.completedModules || [];
  const moduleIds = APOLLO_MODULES.map(m => m.id);
  let maxCompletedIdx = -1;
  moduleIds.forEach((id, idx) => {
    if (completedIds.some(c => c.toLowerCase() === id.toLowerCase())) maxCompletedIdx = idx;
  });
  const currentPlayableIdx = maxCompletedIdx + 1;
  const completedCount = moduleIds.filter(id => completedIds.some(c => c.toLowerCase() === id)).length;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#020510' }}>

      {/* Botón Volver */}
      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 200 }}>
        <Link href="/dashboard/misiones" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#FFF',
          textDecoration: 'none', background: 'rgba(0,0,0,0.65)', padding: '0.7rem 1.2rem',
          borderRadius: '30px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)',
          fontSize: '0.9rem', fontWeight: 600,
        }}>
          <ChevronLeft size={20} /> Mapa Estelar
        </Link>
      </div>

      {/* Título */}
      <div style={{
        position: 'absolute', top: '1.5rem', left: '50%', transform: 'translateX(-50%)',
        zIndex: 200, textAlign: 'center',
        background: 'rgba(0,0,0,0.6)', padding: '0.6rem 2.2rem',
        borderRadius: '40px', backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 107, 53, 0.4)',
      }}>
        <h1 style={{
          margin: 0, fontSize: 'clamp(1rem, 2.5vw, 1.8rem)',
          background: 'linear-gradient(90deg, #FF6B35, #FFD700, #FF6B35)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 900,
          animation: 'countdownPulse 3s ease-in-out infinite',
        }}>
          Misión Apollo 11
        </h1>
        <p style={{ margin: '0.2rem 0 0', color: 'rgba(255,200,100,0.9)', fontSize: 'clamp(0.6rem, 1.2vw, 0.85rem)', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600 }}>
          Un Pequeño Paso · Un Gran Salto Para la Humanidad
        </p>
      </div>

      {/* Canvas Principal */}
      <main style={{
        flex: 1, position: 'relative', width: '100vw', height: '100vh',
        background: `url('/assets/apollo11/vab_cape_canaveral_empty.png') center/cover no-repeat`,
      }}>
        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.85) 100%)',
          pointerEvents: 'none', zIndex: 1,
        }} />

        {/* Línea de escaneo CRT sutil */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
        }} />



        {/* Nodos de Módulos y Trayectoria */}
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: '1600px', margin: '0 auto' }}>
          {/* Trayectoria SVG conectando módulos */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 3, opacity: 0.45 }}>
            <defs>
              <linearGradient id="trajectoryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="50%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#38B6FF" />
              </linearGradient>
            </defs>
            <path
              d="M 20% 80% Q 22% 65% 25% 55% Q 30% 45% 40% 35% Q 50% 30% 60% 35% Q 70% 45% 75% 55% Q 78% 65% 80% 80%"
              fill="none" stroke="url(#trajectoryGrad)" strokeWidth="3"
              strokeDasharray="10 8" vectorEffect="non-scaling-stroke"
            />
          </svg>

          {APOLLO_MODULES.map((mod, idx) => (
            <ApolloModuleNode
              key={mod.id}
              mod={mod}
              idx={idx}
              isCompleted={idx <= maxCompletedIdx}
              isPlayable={idx === currentPlayableIdx}
            />
          ))}
        </div>

        {/* Indicador de Progreso */}
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.75)', border: '1px solid rgba(255, 107, 53, 0.5)',
          padding: '0.9rem 2.5rem', borderRadius: '40px', backdropFilter: 'blur(10px)',
          zIndex: 200, boxShadow: '0 0 30px rgba(255,107,53,0.2)',
          display: 'flex', alignItems: 'center', gap: '1.5rem',
        }}>
          <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
            Fases Completadas:
          </div>
          <div style={{
            background: 'rgba(255,107,53,0.15)', padding: '0.4rem 1.4rem',
            borderRadius: '20px', color: '#FF6B35', fontWeight: 800,
            fontSize: '1.2rem', textShadow: '0 0 10px rgba(255,107,53,0.8)',
          }}>
            {completedCount} / {APOLLO_MODULES.length}
          </div>
        </div>

        <style>{`
          @keyframes countdownPulse {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0.75; }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50%       { transform: scale(1.25); }
          }
        `}</style>
      </main>
    </div>
  );
}
