'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { CheckCircle, ChevronLeft, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// erratic, realistic plasma UAP (Unidentified Anomalous Phenomenon) component
function UAP() {
  const [key, setKey] = useState(0);
  const [color, setColor] = useState('#ffffff');
  const [glowColor, setGlowColor] = useState('rgba(255,255,255,0.8)');
  const [path, setPath] = useState({ x: [], y: [] });

  const colors = [
    { main: '#ffffff', glow: 'rgba(255, 255, 255, 0.9)' }, // Blanco brillante
    { main: '#ffaa00', glow: 'rgba(255, 170, 0, 0.9)' },   // Ámbar
    { main: '#00d2ff', glow: 'rgba(0, 210, 255, 0.9)' }   // Azul eléctrico
  ];

  useEffect(() => {
    const triggerUAP = () => {
      // Pick random color
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setColor(randomColor.main);
      setGlowColor(randomColor.glow);

      // Erratic, non-conventional path crossing the screen and stopping instantly (hypersonic changes)
      const startFromLeft = Math.random() > 0.5;
      
      const xKeyframes = startFromLeft 
        ? ['-10%', '25%', '20%', '55%', '50%', '85%', '80%', '115%'] 
        : ['110%', '75%', '80%', '45%', '50%', '15%', '20%', '-15%'];

      const yKeyframes = [
        `${Math.random() * 40 + 20}%`,
        `${Math.random() * 40 + 20}%`,
        `${Math.random() * 40 + 20}%`,
        `${Math.random() * 40 + 20}%`,
        `${Math.random() * 40 + 20}%`,
        `${Math.random() * 40 + 20}%`,
        `${Math.random() * 40 + 20}%`,
        `${Math.random() * 40 + 20}%`
      ];

      setPath({ x: xKeyframes, y: yKeyframes });
      setKey(prev => prev + 1);
    };

    triggerUAP();

    // Trigger UAP flight dynamically at different intervals (between 9s and 15s)
    const interval = setInterval(() => {
      triggerUAP();
    }, 9000 + Math.random() * 6000);

    return () => clearInterval(interval);
  }, []);

  if (path.x.length === 0) return null;

  return (
    <motion.div
      key={key}
      animate={{
        left: path.x,
        top: path.y,
        scale: [0, 1.8, 1, 2, 1, 1.5, 0],
      }}
      transition={{
        duration: 5.5,
        ease: [0.19, 1, 0.22, 1],
        times: [0, 0.12, 0.28, 0.44, 0.6, 0.82, 1]
      }}
      style={{
        position: 'absolute',
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        backgroundColor: color,
        boxShadow: `0 0 20px 8px ${color}, 0 0 50px 20px ${glowColor}, 0 0 90px 35px rgba(255,255,255,0.3)`,
        zIndex: 20,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
      }}
    >
      {/* Inner bright core */}
      <div style={{
        position: 'absolute',
        inset: '6px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, white 0%, transparent 100%)',
        opacity: 0.9,
      }} />

      {/* Pulsating corona ring 1 */}
      <motion.div
        animate={{ scale: [1, 2.5, 1], opacity: [0.8, 0, 0.8] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: -8,
          borderRadius: '50%',
          border: `2px solid ${color}`,
          filter: 'blur(1px)'
        }}
      />

      {/* Pulsating corona ring 2 — offset phase */}
      <motion.div
        animate={{ scale: [1, 3.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.3, ease: 'easeOut', delay: 0.4 }}
        style={{
          position: 'absolute',
          inset: -4,
          borderRadius: '50%',
          border: `1.5px solid ${glowColor}`,
          filter: 'blur(2px)'
        }}
      />

      {/* Rotating spoke rays */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        style={{ position: 'absolute', inset: 0 }}
      >
        {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
          <div key={deg} style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: '28px', height: '2px',
            background: `linear-gradient(to right, ${color}, transparent)`,
            transformOrigin: '0 50%',
            transform: `rotate(${deg}deg) translateY(-50%)`,
            opacity: 0.6,
            filter: 'blur(1px)',
          }} />
        ))}
      </motion.div>
    </motion.div>
  );
}


const AREA51_MODULES = [
  { id: 'area51_m1', titleEs: '¿Qué es el Área 51?', color: '#00FF00', link: '/course/area51_m1', icon: '/assets/badges/spy_badge.png', coords: { left: '15%', top: '40%' } },
  { id: 'area51_m2', titleEs: 'Aviones Secretos', color: '#00FF00', link: '/course/area51_m2', icon: '/assets/badges/spy_badge.png', coords: { left: '35%', top: '25%' } },
  { id: 'area51_m3', titleEs: 'El Origen del Mito', color: '#00FF00', link: '/course/area51_m3', icon: '/assets/badges/spy_badge.png', coords: { left: '55%', top: '50%' } },
  { id: 'area51_m4', titleEs: 'Ciencia vs. Ficción', color: '#00FF00', link: '/course/area51_m4', icon: '/assets/badges/spy_badge.png', coords: { left: '75%', top: '30%' } },
  { id: 'area51_m5', titleEs: 'Detección de Camelos', color: '#00FF00', link: '/course/area51_m5', icon: '/assets/badges/spy_badge.png', coords: { left: '85%', top: '65%' } },
];

function Area51Node({ mod, idx, isCompleted, isPlayable }) {
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
          borderRadius: '15%',
          boxShadow: `0 0 25px ${mod.color}aa, inset 0 0 15px ${mod.color}88`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,10,0,0.85)',
          border: `2px solid ${mod.color}`,
          transform: 'rotate(45deg)'
        }}>
          <div style={{ transform: 'rotate(-45deg)' }}>
            <ShieldAlert size={40} color={isCompleted ? '#fff' : mod.color} style={{ filter: isCompleted ? 'brightness(1.2)' : 'brightness(0.7)' }} />
          </div>
          {!isPlayable && !isCompleted && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', borderRadius: '15%' }} />
          )}
        </div>

        <div style={{
          color: '#00FF00',
          fontSize: 'clamp(0.7rem, 1vw, 0.9rem)',
          textAlign: 'center',
          textShadow: `0 2px 4px #000`,
          textTransform: 'uppercase',
          fontWeight: 700,
          background: 'rgba(0,20,0,0.8)',
          padding: '6px 14px',
          borderRadius: '4px',
          border: `1px solid ${mod.color}55`,
          whiteSpace: 'nowrap',
          marginTop: '10px'
        }}>
          [{idx + 1}] {mod.titleEs}
        </div>

        {isCompleted && (
          <div style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'rgba(0,0,0,0.9)', padding: '2px', borderRadius: '50%', border: '2px solid var(--success)', zIndex: 5 }}>
            <CheckCircle size={22} color="var(--success)" />
          </div>
        )}
      </motion.div>
    </Link>
  );
}

export default function Area51Hub() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  if (loading || !user) return <div style={{ height: '100vh', background: '#020308' }} />;

  const completedModules = userData?.completedModules || [];
  const completedCount = AREA51_MODULES.filter(m => completedModules.includes(m.id)).length;
  const progressPercent = Math.round((completedCount / AREA51_MODULES.length) * 100);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#020308', position: 'relative' }}>
      
      {/* Erratic Glowing Plasma UAP */}
      <UAP />
      
      {/* Animated Background */}
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes panBg {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      
      {/* Base Image */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'url("/assets/area51/area51_hub_bg.png")',
        backgroundSize: '110% auto',
        backgroundPosition: 'center',
        animation: 'panBg 40s ease-in-out infinite',
        opacity: 0.7
      }} />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        backgroundImage: 'linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        opacity: 0.3
      }} />

      {/* CRT Scanline */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '10px',
        background: 'rgba(0, 255, 0, 0.3)',
        boxShadow: '0 0 20px rgba(0, 255, 0, 0.5)',
        zIndex: 2, pointerEvents: 'none',
        animation: 'scanline 6s linear infinite'
      }} />

      {/* Vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.9) 100%)', pointerEvents: 'none', zIndex: 3 }} />

      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 200 }}>
        <Link href="/dashboard/misiones" className="btn-secondary" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'rgba(0,20,0,0.8)', padding: '0.7rem 1.2rem',
          borderRadius: '4px', border: '1px solid #00FF00',
          color: '#00FF00', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '1px'
        }}>
          <ChevronLeft size={20} /> ACCESO A MISIONES
        </Link>
      </div>

      <div style={{ position: 'absolute', top: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 200, textAlign: 'center' }}>
        <h1 style={{
          margin: 0, fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
          color: '#00FF00', textShadow: '0 0 20px rgba(0, 255, 0, 0.8)',
          letterSpacing: '6px', textTransform: 'uppercase', fontWeight: 900, fontFamily: 'monospace'
        }}>
          ÁREA 51
        </h1>
        <p style={{ margin: '0.5rem 0 0', color: 'rgba(0, 255, 0, 0.7)', fontSize: '1rem', letterSpacing: '4px', textTransform: 'uppercase', fontFamily: 'monospace' }}>
          ARCHIVOS DESCLASIFICADOS
        </p>
      </div>

      <main style={{ flex: 1, position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: '1400px', margin: '0 auto', zIndex: 10 }}>
          {AREA51_MODULES.map((mod, index) => {
            const isPlayable = index === 0 || completedModules.includes(AREA51_MODULES[index - 1]?.id) || completedModules.includes(mod.id);
            return (
              <Area51Node 
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
        <div style={{ background: 'rgba(0,20,0,0.9)', padding: '1.2rem', borderRadius: '4px', border: '1px solid #00FF00', width: '280px' }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '1rem', color: '#00FF00', textTransform: 'uppercase', fontFamily: 'monospace' }}>DESENCRIPTANDO...</h3>
          <div style={{ width: '100%', height: '10px', background: 'rgba(0, 255, 0, 0.1)', overflow: 'hidden' }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} transition={{ duration: 1 }} style={{ height: '100%', background: '#00FF00', boxShadow: '0 0 12px #00FF00' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '0.9rem', color: 'rgba(0,255,0,0.8)', fontFamily: 'monospace' }}>
            <span>{completedCount} / {AREA51_MODULES.length} ARCHIVOS</span>
            <span>{progressPercent}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
