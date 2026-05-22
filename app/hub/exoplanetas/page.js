'use client';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const EXO_MODULES = [
  { id: 'exoplanetas_m1', titleEs: 'Fundamentos y Tránsito', color: '#9370DB', link: '/course/exoplanetas_m1', icon: '/assets/badges/exoplanetas_badge.png', coords: { left: '20%', top: '30%' } },
  { id: 'exoplanetas_m2', titleEs: 'Tipos de Mundos', color: '#ffcc00', link: '/course/exoplanetas_m2', icon: '/assets/badges/exoplanetas_badge.png', coords: { left: '40%', top: '60%' } },
  { id: 'exoplanetas_m3', titleEs: 'Búsqueda y Telescopios', color: '#00ffcc', link: '/course/exoplanetas_m3', icon: '/assets/badges/exoplanetas_badge.png', coords: { left: '60%', top: '30%' } },
  { id: 'exoplanetas_m4', titleEs: 'Atmósferas y Biofirmas', color: '#ff00ff', link: '/course/exoplanetas_m4', icon: '/assets/badges/exoplanetas_badge.png', coords: { left: '80%', top: '60%' } },
];

function ExoNode({ mod, idx, isCompleted, isPlayable }) {
  return (
    <Link href={mod.link} passHref>
      <motion.div
        whileHover={{ scale: 1.15, y: -10 }}
        style={{
          position: 'absolute',
          left: mod.coords.left,
          top: mod.coords.top,
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          zIndex: 10 + idx,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem'
        }}
      >
        <div style={{
          position: 'relative',
          width: 'clamp(80px, 8vw, 110px)',
          height: 'clamp(80px, 8vw, 110px)',
          borderRadius: '50%',
          boxShadow: `0 0 25px ${mod.color}aa, inset 0 0 15px ${mod.color}88`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.8)',
          border: `2px solid ${mod.color}`
        }}>
          <img
            src={mod.icon}
            alt={mod.titleEs}
            style={{ width: '80%', height: '80%', objectFit: 'contain', filter: isCompleted ? 'brightness(1.2)' : 'brightness(0.7)' }}
          />
          {!isPlayable && !isCompleted && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', borderRadius: '50%' }} />
          )}
        </div>

        <div style={{
          color: 'white',
          fontSize: 'clamp(0.7rem, 1vw, 0.9rem)',
          textAlign: 'center',
          textShadow: `0 2px 4px ${mod.color}`,
          textTransform: 'uppercase',
          fontWeight: 700,
          background: 'rgba(0,0,0,0.7)',
          padding: '6px 14px',
          borderRadius: '20px',
          backdropFilter: 'blur(4px)',
          border: `1px solid ${mod.color}55`,
          whiteSpace: 'nowrap'
        }}>
          {idx + 1}. {mod.titleEs}
        </div>

        {isCompleted && (
          <div style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'rgba(0,0,0,0.9)', padding: '2px', borderRadius: '50%', border: '2px solid var(--success)', zIndex: 5 }}>
            <CheckCircle size={22} color="var(--success)" />
          </div>
        )}
      </motion.div>
    </Link>
  );
}

export default function ExoplanetasHub() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  if (loading || !user) return <div style={{ height: '100vh', background: '#020308' }} />;

  const completedModules = userData?.completedModules || [];
  const completedCount = EXO_MODULES.filter(m => completedModules.includes(m.id)).length;
  const progressPercent = Math.round((completedCount / EXO_MODULES.length) * 100);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#020308', position: 'relative' }}>
      
      {/* Animated Starry Background */}
      <style>{`
        @keyframes scrollStars {
          from { background-position: 0 0; }
          to { background-position: -10000px 5000px; }
        }
        @keyframes scrollStarsSlow {
          from { background-position: 0 0; }
          to { background-position: -5000px 2500px; }
        }
      `}</style>
      
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'url("https://source.unsplash.com/1600x900/?stars,galaxy,space")',
        animation: 'scrollStars 150s linear infinite',
        opacity: 0.6, backgroundSize: 'cover'
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'url("https://source.unsplash.com/1600x900/?milky-way,stars")',
        animation: 'scrollStarsSlow 200s linear infinite',
        opacity: 0.4, backgroundSize: 'cover', mixBlendMode: 'screen'
      }} />

      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.85) 100%)', pointerEvents: 'none', zIndex: 1 }} />

      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 200 }}>
        <Link href="/dashboard/misiones" className="btn-secondary" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'rgba(0,0,0,0.6)', padding: '0.7rem 1.2rem',
          borderRadius: '30px', backdropFilter: 'blur(10px)', border: '1px solid rgba(147, 112, 219, 0.5)',
          color: '#9370DB'
        }}>
          <ChevronLeft size={20} /> Volver a Misiones
        </Link>
      </div>

      <div style={{ position: 'absolute', top: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 200, textAlign: 'center' }}>
        <h1 style={{
          margin: 0, fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
          color: '#9370DB', textShadow: '0 0 25px rgba(147, 112, 219, 0.9)',
          letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 900
        }}>
          Exoplanetas
        </h1>
        <p style={{ margin: '0.5rem 0 0', color: 'rgba(255,255,255,0.9)', fontSize: '1rem', letterSpacing: '3px', textTransform: 'uppercase', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
          Mundos Extraños
        </p>
      </div>

      <main style={{ flex: 1, position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: '1400px', margin: '0 auto', zIndex: 2 }}>
          {EXO_MODULES.map((mod, index) => {
            const isPlayable = index === 0 || completedModules.includes(EXO_MODULES[index - 1]?.id) || completedModules.includes(mod.id);
            return (
              <ExoNode 
                key={mod.id} 
                mod={mod} 
                idx={index} 
                isCompleted={completedModules.includes(mod.id)} 
                isPlayable={isPlayable}
              />
            );
          })}
        </div>
      </main>
      
      <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', zIndex: 200 }}>
        <div style={{ background: 'rgba(0,0,0,0.8)', padding: '1.2rem', borderRadius: '15px', border: '1px solid #9370DB', width: '280px', backdropFilter: 'blur(10px)' }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '1rem', color: '#9370DB', textTransform: 'uppercase' }}>Progreso de Búsqueda</h3>
          <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} transition={{ duration: 1 }} style={{ height: '100%', background: '#9370DB', boxShadow: '0 0 12px #9370DB' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', fontWeight: 'bold' }}>
            <span>{completedCount} / {EXO_MODULES.length} módulos</span>
            <span>{progressPercent}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
