'use client';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// ─── Módulos del curso Agujeros de Gusano ─────────────────────────────────────
const WORMHOLE_MODULES = [
  { id: 'wormhole_m1', titleEs: 'Puente ER I', color: '#00FFCC', link: '/course/wormhole_m1', icon: '/assets/badges/gusano_badge.png', coords: { left: '15%', top: '20%' } },
  { id: 'wormhole_m2', titleEs: 'Puente ER II', color: '#00FFCC', link: '/course/wormhole_m2', icon: '/assets/badges/gusano_badge.png', coords: { left: '30%', top: '15%' } },
  { id: 'wormhole_m3', titleEs: 'Historia I', color: '#00FFCC', link: '/course/wormhole_m3', icon: '/assets/badges/gusano_badge.png', coords: { left: '50%', top: '12%' } },
  { id: 'wormhole_m4', titleEs: 'Historia II', color: '#00FFCC', link: '/course/wormhole_m4', icon: '/assets/badges/gusano_badge.png', coords: { left: '70%', top: '15%' } },
  { id: 'wormhole_m5', titleEs: 'Propiedades I', color: '#00FFCC', link: '/course/wormhole_m5', icon: '/assets/badges/gusano_badge.png', coords: { left: '85%', top: '25%' } },
  
  { id: 'wormhole_m6', titleEs: 'Propiedades II', color: '#00E4FF', link: '/course/wormhole_m6', icon: '/assets/badges/gusano_badge.png', coords: { left: '20%', top: '40%' } },
  { id: 'wormhole_m7', titleEs: '¿Cómo funciona? I', color: '#00E4FF', link: '/course/wormhole_m7', icon: '/assets/badges/gusano_badge.png', coords: { left: '40%', top: '35%' } },
  { id: 'wormhole_m8', titleEs: '¿Cómo funciona? II', color: '#00E4FF', link: '/course/wormhole_m8', icon: '/assets/badges/gusano_badge.png', coords: { left: '60%', top: '35%' } },
  { id: 'wormhole_m9', titleEs: '¿Qué pasa si caigo? I', color: '#00E4FF', link: '/course/wormhole_m9', icon: '/assets/badges/gusano_badge.png', coords: { left: '80%', top: '45%' } },

  { id: 'wormhole_m10', titleEs: '¿Qué pasa si caigo? II', color: '#9933FF', link: '/course/wormhole_m10', icon: '/assets/badges/gusano_badge.png', coords: { left: '15%', top: '65%' } },
  { id: 'wormhole_m11', titleEs: 'Teorías Modernas I', color: '#9933FF', link: '/course/wormhole_m11', icon: '/assets/badges/gusano_badge.png', coords: { left: '35%', top: '60%' } },
  { id: 'wormhole_m12', titleEs: 'Teorías Modernas II', color: '#9933FF', link: '/course/wormhole_m12', icon: '/assets/badges/gusano_badge.png', coords: { left: '55%', top: '60%' } },
  { id: 'wormhole_m13', titleEs: 'Paradoja Temporal', color: '#9933FF', link: '/course/wormhole_m13', icon: '/assets/badges/gusano_badge.png', coords: { left: '75%', top: '70%' } },
  
  { id: 'wormhole_m14', titleEs: 'Contacto I', color: '#FF00FF', link: '/course/wormhole_m14', icon: '/assets/badges/gusano_badge.png', coords: { left: '40%', top: '85%' } },
  { id: 'wormhole_m15', titleEs: 'Contacto II', color: '#FF00FF', link: '/course/wormhole_m15', icon: '/assets/badges/gusano_badge.png', coords: { left: '60%', top: '85%' } },
];

function WormholeNode({ mod, idx, isCompleted, isPlayable }) {
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
          animate={{ y: [0, -10, 0], scale: hovered ? 1.15 : 1 }}
          transition={{
            y: { repeat: Infinity, duration: 3 + Math.random() * 2, ease: 'easeInOut', delay: Math.random() * 2 },
            scale: { duration: 0.2 },
          }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}
        >
          <div style={{
            position: 'relative',
            width: 'clamp(60px, 6vw, 90px)',
            height: 'clamp(60px, 6vw, 90px)',
            borderRadius: '50%',
            boxShadow: hovered 
               ? `0 0 35px ${mod.color}ff, inset 0 0 15px ${mod.color}aa` 
               : `0 0 15px ${mod.color}88`,
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.8)'
          }}>
            <img
              src={mod.icon}
              alt={mod.titleEs}
              style={{
                width: '80%',
                height: '80%',
                objectFit: 'contain',
                transform: hovered ? 'scale(1.1)' : 'scale(1)',
                transition: 'transform 0.5s ease',
                filter: isCompleted ? 'brightness(1.2)' : 'brightness(0.7)'
              }}
            />
            {!hovered && !isPlayable && !isCompleted && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', borderRadius: '50%' }} />
            )}
            <div style={{
              position: 'absolute',
              inset: '-2px',
              borderRadius: '50%',
              border: `2px solid ${hovered ? 'white' : mod.color + '55'}`,
              opacity: hovered ? 1 : 0.5,
              transition: 'all 0.3s ease',
              pointerEvents: 'none'
            }} />
          </div>

          <div style={{
            color: 'white',
            fontSize: 'clamp(0.6rem, 0.9vw, 0.8rem)',
            textAlign: 'center',
            textShadow: `0 2px 4px ${mod.color}`,
            textTransform: 'uppercase',
            fontWeight: 700,
            background: 'rgba(0,0,0,0.7)',
            padding: '4px 10px',
            borderRadius: '20px',
            backdropFilter: 'blur(4px)',
            border: `1px solid ${mod.color}55`,
            whiteSpace: 'nowrap'
          }}>
            {idx + 1}. {mod.titleEs}
          </div>

          {isCompleted && (
            <div style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'rgba(0,0,0,0.9)', padding: '2px', borderRadius: '50%', border: '2px solid var(--success)', zIndex: 5 }}>
              <CheckCircle size={18} color="var(--success)" />
            </div>
          )}
        </motion.div>
      </div>
    </Link>
  );
}

export default function AgujerosGusanoHub() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  if (loading || !user) return <div style={{ height: '100vh', background: '#020308' }} />;

  const completedModules = userData?.completedModules || [];
  const completedCount = WORMHOLE_MODULES.filter(m => completedModules.includes(m.id)).length;
  const progressPercent = Math.round((completedCount / WORMHOLE_MODULES.length) * 100);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#020308', position: 'relative' }}>
      
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          opacity: 0.8
        }}
      >
        <source src="/assets/dashboard/wormhole_video.mp4" type="video/mp4" />
      </video>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 10%, rgba(0,0,0,0.8) 100%)', pointerEvents: 'none', zIndex: 1 }} />

      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 200 }}>
        <Link href="/dashboard/misiones" className="btn-secondary" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'rgba(0,0,0,0.6)', padding: '0.7rem 1.2rem',
          borderRadius: '30px', backdropFilter: 'blur(10px)', border: '1px solid rgba(0, 255, 204, 0.3)',
          color: '#00FFCC'
        }}>
          <ChevronLeft size={20} /> Volver a Misiones
        </Link>
      </div>

      <div style={{ position: 'absolute', top: '1.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 200, textAlign: 'center', background: 'rgba(0,0,0,0.7)', padding: '0.6rem 2.5rem', borderRadius: '40px', border: '1px solid #00FFCC' }}>
        <h1 style={{
          margin: 0, fontSize: 'clamp(1rem, 2.5vw, 1.8rem)',
          color: '#00FFCC', textShadow: '0 0 20px rgba(0, 255, 204, 0.8)',
          letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 900
        }}>
          Agujeros de Gusano
        </h1>
        <p style={{ margin: '0.2rem 0 0', color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
          El Puente Einstein-Rosen
        </p>
      </div>

      <main style={{ flex: 1, position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: '1600px', margin: '0 auto', zIndex: 2 }}>
          {WORMHOLE_MODULES.map((mod, index) => {
            const isPlayable = index === 0 || completedModules.includes(WORMHOLE_MODULES[index - 1]?.id) || completedModules.includes(mod.id);
            return (
              <WormholeNode 
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
        <div style={{ background: 'rgba(0,0,0,0.8)', padding: '1rem', borderRadius: '15px', border: '1px solid #00FFCC', width: '250px', backdropFilter: 'blur(10px)' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#00FFCC', textTransform: 'uppercase' }}>Progreso Científico</h3>
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} transition={{ duration: 1 }} style={{ height: '100%', background: '#00FFCC', boxShadow: '0 0 10px #00FFCC' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>
            <span>{completedCount} módulos</span>
            <span>{progressPercent}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
