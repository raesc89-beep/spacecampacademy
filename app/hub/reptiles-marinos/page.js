'use client';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const MARINOS_MODULES = [
  { id: 'marinos_m1', title: 'Los Mares del Mesozoico', color: '#006994', link: '/course/marinos_m1', icon: '/assets/reptiles_marinos/marinos_m1.png', coords: { left: '12%', top: '18%' } },
  { id: 'marinos_m2', title: 'Los Ictiosaurios', color: '#20B2AA', link: '/course/marinos_m2', icon: '/assets/reptiles_marinos/marinos_m2.png', coords: { left: '30%', top: '35%' } },
  { id: 'marinos_m3', title: 'Los Plesiosaurios', color: '#4169E1', link: '/course/marinos_m3', icon: '/assets/reptiles_marinos/marinos_m3.png', coords: { left: '50%', top: '20%' } },
  { id: 'marinos_m4', title: 'Los Pliosaurios', color: '#191970', link: '/course/marinos_m4', icon: '/assets/reptiles_marinos/marinos_m4.png', coords: { left: '70%', top: '38%' } },
  { id: 'marinos_m5', title: 'El Mosasaurus', color: '#008B8B', link: '/course/marinos_m5', icon: '/assets/reptiles_marinos/marinos_m5.png', coords: { left: '88%', top: '22%' } },
  { id: 'marinos_m6', title: 'Tylosaurus', color: '#2F4F4F', link: '/course/marinos_m6', icon: '/assets/reptiles_marinos/marinos_m6.png', coords: { left: '15%', top: '55%' } },
  { id: 'marinos_m7', title: 'La Rama Evolutiva', color: '#5F9EA0', link: '/course/marinos_m7', icon: '/assets/reptiles_marinos/marinos_m7.png', coords: { left: '35%', top: '68%' } },
  { id: 'marinos_m8', title: 'Ecosistema Marino', color: '#00CED1', link: '/course/marinos_m8', icon: '/assets/reptiles_marinos/marinos_m8.png', coords: { left: '55%', top: '55%' } },
  { id: 'marinos_m9', title: 'La Gran Extinción', color: '#B22222', link: '/course/marinos_m9', icon: '/assets/reptiles_marinos/marinos_m9.png', coords: { left: '75%', top: '68%' } },
  { id: 'marinos_m10', title: 'Paleontología Marina', color: '#DAA520', link: '/course/marinos_m10', icon: '/assets/reptiles_marinos/marinos_m10.png', coords: { left: '88%', top: '55%' } },
];

// Floating bubbles
function Bubbles() {
  const [bubbles, setBubbles] = useState([]);
  useEffect(() => {
    const b = Array.from({ length: 40 }, (_, i) => ({
      id: i, left: Math.random() * 100, delay: Math.random() * 12,
      duration: 8 + Math.random() * 10, size: 2 + Math.random() * 6,
      opacity: 0.1 + Math.random() * 0.3,
    }));
    setBubbles(b);
  }, []);
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, overflow: 'hidden' }}>
      {bubbles.map(b => (
        <div key={b.id} style={{
          position: 'absolute', left: `${b.left}%`, bottom: '-5%',
          width: `${b.size}px`, height: `${b.size}px`, borderRadius: '50%',
          border: '1px solid rgba(100, 200, 255, 0.3)',
          background: 'radial-gradient(circle at 30% 30%, rgba(150, 220, 255, 0.3), transparent)',
          animation: `bubbleRise ${b.duration}s ${b.delay}s linear infinite`,
        }} />
      ))}
      <style>{`
        @keyframes bubbleRise {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-110vh) translateX(${Math.random() > 0.5 ? '' : '-'}20px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// Bioluminescent particles
function BiolumParticles() {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const p = Array.from({ length: 30 }, (_, i) => ({
      id: i, left: Math.random() * 100, top: Math.random() * 100,
      size: 2 + Math.random() * 4, delay: Math.random() * 6,
      duration: 3 + Math.random() * 4,
      color: ['#00FFCC', '#00CED1', '#20B2AA', '#7FFFD4', '#48D1CC'][Math.floor(Math.random() * 5)],
    }));
    setParticles(p);
  }, []);
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute', left: `${p.left}%`, top: `${p.top}%`,
          width: `${p.size}px`, height: `${p.size}px`, borderRadius: '50%',
          backgroundColor: p.color, boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          animation: `biolumPulse ${p.duration}s ${p.delay}s ease-in-out infinite`,
        }} />
      ))}
      <style>{`
        @keyframes biolumPulse {
          0%, 100% { opacity: 0.1; transform: scale(0.8); }
          50% { opacity: 0.8; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}

// Swimming Ichthyosaurs animation
function SwimmingIchthyosaurs() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2, overflow: 'hidden' }}>
      {/* Ichthyosaur 1 - large, slow, deep */}
      <div style={{ position: 'absolute', top: '70%', animation: 'swimRight 35s -5s linear infinite' }}>
        <svg width="180" height="60" viewBox="0 0 180 60" style={{ opacity: 0.25, filter: 'blur(1px)' }}>
          <g fill="none" stroke="rgba(0, 180, 220, 0.6)" strokeWidth="2">
            {/* Body */}
            <ellipse cx="80" cy="30" rx="60" ry="18" fill="rgba(0, 100, 140, 0.3)" />
            {/* Snout */}
            <path d="M140,30 Q170,28 180,30 Q170,32 140,30" fill="rgba(0, 100, 140, 0.3)" />
            {/* Tail fin */}
            <path d="M20,30 Q5,15 0,5 Q15,20 20,30 Q15,40 0,55 Q5,45 20,30" fill="rgba(0, 100, 140, 0.3)" />
            {/* Dorsal fin */}
            <path d="M85,12 Q95,0 105,12" fill="rgba(0, 100, 140, 0.3)" />
            {/* Pectoral fin */}
            <path d="M100,38 Q110,50 95,55 Q100,45 100,38" fill="rgba(0, 100, 140, 0.3)" />
            {/* Eye */}
            <circle cx="145" cy="28" r="5" fill="rgba(0, 200, 255, 0.5)" />
            <circle cx="146" cy="27" r="2" fill="rgba(255, 255, 255, 0.6)" />
          </g>
        </svg>
      </div>

      {/* Ichthyosaur 2 - medium, faster */}
      <div style={{ position: 'absolute', top: '40%', animation: 'swimLeft 25s -10s linear infinite' }}>
        <svg width="120" height="40" viewBox="0 0 180 60" style={{ opacity: 0.2, transform: 'scaleX(-1)' }}>
          <g fill="none" stroke="rgba(0, 200, 180, 0.5)" strokeWidth="2">
            <ellipse cx="80" cy="30" rx="60" ry="18" fill="rgba(0, 120, 100, 0.25)" />
            <path d="M140,30 Q170,28 180,30 Q170,32 140,30" fill="rgba(0, 120, 100, 0.25)" />
            <path d="M20,30 Q5,15 0,5 Q15,20 20,30 Q15,40 0,55 Q5,45 20,30" fill="rgba(0, 120, 100, 0.25)" />
            <path d="M85,12 Q95,0 105,12" fill="rgba(0, 120, 100, 0.25)" />
            <path d="M100,38 Q110,50 95,55 Q100,45 100,38" fill="rgba(0, 120, 100, 0.25)" />
            <circle cx="145" cy="28" r="5" fill="rgba(0, 230, 200, 0.4)" />
            <circle cx="146" cy="27" r="2" fill="rgba(255, 255, 255, 0.5)" />
          </g>
        </svg>
      </div>

      {/* Ichthyosaur 3 - small, background */}
      <div style={{ position: 'absolute', top: '85%', animation: 'swimRight 45s -20s linear infinite' }}>
        <svg width="80" height="28" viewBox="0 0 180 60" style={{ opacity: 0.12, filter: 'blur(2px)' }}>
          <g fill="none" stroke="rgba(0, 160, 200, 0.4)" strokeWidth="2">
            <ellipse cx="80" cy="30" rx="60" ry="18" fill="rgba(0, 80, 120, 0.2)" />
            <path d="M140,30 Q170,28 180,30 Q170,32 140,30" fill="rgba(0, 80, 120, 0.2)" />
            <path d="M20,30 Q5,15 0,5 Q15,20 20,30 Q15,40 0,55 Q5,45 20,30" fill="rgba(0, 80, 120, 0.2)" />
            <circle cx="145" cy="28" r="5" fill="rgba(0, 180, 255, 0.3)" />
          </g>
        </svg>
      </div>

      {/* Ichthyosaur 4 - mid-depth, opposite direction */}
      <div style={{ position: 'absolute', top: '55%', animation: 'swimLeft 30s -15s linear infinite' }}>
        <svg width="140" height="48" viewBox="0 0 180 60" style={{ opacity: 0.18, transform: 'scaleX(-1)' }}>
          <g fill="none" stroke="rgba(0, 150, 200, 0.5)" strokeWidth="2">
            <ellipse cx="80" cy="30" rx="60" ry="18" fill="rgba(0, 90, 130, 0.25)" />
            <path d="M140,30 Q170,28 180,30 Q170,32 140,30" fill="rgba(0, 90, 130, 0.25)" />
            <path d="M20,30 Q5,15 0,5 Q15,20 20,30 Q15,40 0,55 Q5,45 20,30" fill="rgba(0, 90, 130, 0.25)" />
            <path d="M85,12 Q95,0 105,12" fill="rgba(0, 90, 130, 0.25)" />
            <path d="M100,38 Q110,50 95,55 Q100,45 100,38" fill="rgba(0, 90, 130, 0.25)" />
            <circle cx="145" cy="28" r="5" fill="rgba(0, 200, 240, 0.4)" />
            <circle cx="146" cy="27" r="2" fill="rgba(255, 255, 255, 0.5)" />
          </g>
        </svg>
      </div>

      <style>{`
        @keyframes swimRight {
          0% { left: -15%; transform: translateY(0); }
          25% { transform: translateY(-15px); }
          50% { transform: translateY(10px); }
          75% { transform: translateY(-8px); }
          100% { left: 110%; transform: translateY(0); }
        }
        @keyframes swimLeft {
          0% { right: -15%; transform: translateY(0); }
          25% { transform: translateY(10px); }
          50% { transform: translateY(-12px); }
          75% { transform: translateY(8px); }
          100% { right: 110%; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// Water wave overlay
function WaterWaves() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '120px', pointerEvents: 'none', zIndex: 4, overflow: 'hidden' }}>
      <svg viewBox="0 0 1440 120" style={{ position: 'absolute', top: 0, width: '200%', animation: 'waveMove 12s linear infinite' }}>
        <path d="M0,60 C180,30 360,90 540,60 C720,30 900,90 1080,60 C1260,30 1440,90 1440,60 L1440,0 L0,0 Z"
          fill="rgba(0,20,40,0.6)" />
        <path d="M0,80 C180,50 360,110 540,80 C720,50 900,110 1080,80 C1260,50 1440,110 1440,80 L1440,0 L0,0 Z"
          fill="rgba(0,10,30,0.4)" />
      </svg>
      <style>{`
        @keyframes waveMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

// Connection lines
function OceanTrail() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}>
      {MARINOS_MODULES.map((mod, i) => {
        if (i === MARINOS_MODULES.length - 1) return null;
        const next = MARINOS_MODULES[i + 1];
        return (
          <line key={i} x1={mod.coords.left} y1={mod.coords.top} x2={next.coords.left} y2={next.coords.top}
            stroke="url(#ocean-grad)" strokeWidth="1.5" strokeDasharray="6 10" opacity="0.35" />
        );
      })}
      <defs>
        <linearGradient id="ocean-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#006994" />
          <stop offset="100%" stopColor="#00CED1" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function MarinoModuleNode({ mod, idx, isCompleted }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={mod.link} passHref>
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{ position: 'absolute', left: mod.coords.left, top: mod.coords.top, transform: 'translate(-50%, -50%)', cursor: 'pointer', zIndex: hovered ? 50 : 10 + idx }}>
        <motion.div
          animate={{ y: [0, -10, 0], scale: hovered ? 1.15 : 1 }}
          transition={{ y: { repeat: Infinity, duration: 5 + Math.random() * 3, ease: 'easeInOut', delay: Math.random() * 2 }, scale: { duration: 0.2 } }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ position: 'relative', width: 'clamp(80px, 10vw, 120px)', height: 'clamp(80px, 10vw, 120px)', borderRadius: '50%',
            boxShadow: hovered ? `0 0 40px ${mod.color}ff, inset 0 0 20px ${mod.color}aa` : `0 0 20px ${mod.color}88`,
            transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%',
              WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 70%)',
              maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 70%)', overflow: 'hidden' }}>
              <img src={mod.icon} alt={mod.title} style={{ width: '100%', height: '100%', objectFit: 'cover',
                transform: hovered ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.5s ease' }} />
            </div>
            <div style={{ position: 'absolute', inset: '-2px', borderRadius: '50%',
              border: `2px solid ${hovered ? 'white' : mod.color + '55'}`, opacity: hovered ? 0.8 : 0.3,
              transition: 'all 0.3s ease', pointerEvents: 'none' }} />
          </div>
          <div style={{ color: 'white', textAlign: 'center', textShadow: `0 2px 8px ${mod.color}, 0 4px 16px rgba(0,0,0,0.9)`,
            background: 'rgba(0,0,0,0.65)', padding: '4px 14px', borderRadius: '20px', backdropFilter: 'blur(6px)',
            border: `1px solid ${hovered ? mod.color : mod.color + '44'}`, transition: 'all 0.3s ease' }}>
            <div style={{ fontSize: 'clamp(0.6rem, 0.9vw, 0.8rem)', color: mod.color, fontWeight: 700, letterSpacing: '1px' }}>{mod.title}</div>
          </div>
          {isCompleted && (
            <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
              style={{ position: 'absolute', top: -8, right: -8, background: '#FFD700', borderRadius: '50%', padding: '4px', boxShadow: '0 0 10px #FFD700', zIndex: 10 }}>
              <CheckCircle size={16} color="black" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </Link>
  );
}

export default function ReptilesMarinos() {
  const { user, progress } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const completedIds = progress?.completedModules || [];
  if (!mounted) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#001020', overflow: 'hidden' }}>
      <main style={{ flex: 1, position: 'relative', width: '100vw', height: '100vh',
        backgroundImage: "url('/assets/reptiles_marinos/reptiles_marinos_cover.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        
        {/* Deep ocean vignette */}
        <div style={{ position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center top, rgba(0,20,40,0) 0%, rgba(0,10,30,0.7) 60%, rgba(0,5,15,0.95) 100%)',
          pointerEvents: 'none', zIndex: 1 }} />

        {/* Light rays from surface */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
          background: 'linear-gradient(180deg, rgba(0,150,200,0.08) 0%, transparent 40%)',
          animation: 'lightRays 8s ease-in-out infinite alternate' }} />

        <WaterWaves />
        <Bubbles />
        <BiolumParticles />
        <SwimmingIchthyosaurs />
        <OceanTrail />

        {/* Header */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '2rem', zIndex: 100, pointerEvents: 'none' }}>
          <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/dashboard/misiones')}
            style={{ pointerEvents: 'auto', background: 'rgba(0,10,30,0.7)', border: '1px solid rgba(0, 105, 148, 0.4)', color: 'white',
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '30px', cursor: 'pointer',
              backdropFilter: 'blur(10px)', boxShadow: '0 4px 15px rgba(0,0,0,0.5)', fontFamily: 'var(--font-heading)' }}>
            <ChevronLeft size={20} /> Regresar al Comando
          </motion.button>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
            <div style={{ background: 'rgba(0,10,30,0.7)', padding: '1rem 2rem', borderRadius: '30px',
              border: '1px solid rgba(0, 105, 148, 0.3)', boxShadow: '0 0 20px rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', pointerEvents: 'auto' }}>
              <h1 style={{ color: 'white', margin: 0, fontSize: '1.8rem',
                textShadow: '0 0 10px rgba(0, 206, 209, 0.6), 0 0 20px rgba(0, 105, 148, 0.4)',
                letterSpacing: '2px', fontFamily: 'var(--font-heading)', textTransform: 'uppercase' }}>
                🌊 REPTILES MARINOS
              </h1>
              <p style={{ color: '#00CED1', margin: '0.2rem 0 0 0', fontSize: '0.9rem', textShadow: '0 2px 4px rgba(0,0,0,0.8)', letterSpacing: '1px' }}>
                Leviatanes del Abismo · 10 Módulos
              </p>
            </div>
          </motion.div>
        </div>

        {/* Module nodes */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
          {MARINOS_MODULES.map((mod, idx) => (
            <div key={mod.id} style={{ pointerEvents: 'auto' }}>
              <MarinoModuleNode mod={mod} idx={idx} isCompleted={completedIds.includes(mod.id)} />
            </div>
          ))}
        </div>

        {/* Progress */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(0,10,30,0.8)', border: '1px solid rgba(0, 105, 148, 0.3)', padding: '1rem 2.5rem',
          borderRadius: '40px', backdropFilter: 'blur(10px)', zIndex: 200,
          boxShadow: '0 0 30px rgba(0,0,0,0.8), inset 0 0 20px rgba(0, 105, 148, 0.1)',
          display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ color: 'white', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>Profundidad Explorada:</div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1.5rem', borderRadius: '20px',
            color: '#00CED1', fontWeight: 'bold', fontSize: '1.2rem', textShadow: '0 0 10px rgba(0, 206, 209, 0.5)' }}>
            {completedIds.filter(id => id.startsWith('marinos_m')).length} / {MARINOS_MODULES.length}
          </div>
        </div>
      </main>

      <style>{`
        @keyframes lightRays {
          0% { opacity: 0.3; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
