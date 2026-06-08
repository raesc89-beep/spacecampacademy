'use client';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const TESLA_MODULES = [
  { id: 'tesla_m1', title: 'El Nacimiento de un Genio', color: '#7B68EE', link: '/course/tesla_m1', icon: '/assets/tesla/tesla_m1.png', coords: { left: '12%', top: '35%' } },
  { id: 'tesla_m2', title: 'La Guerra de las Corrientes', color: '#FFD700', link: '/course/tesla_m2', icon: '/assets/tesla/tesla_m2.png', coords: { left: '28%', top: '22%' } },
  { id: 'tesla_m3', title: 'Motor de Inducción', color: '#00CED1', link: '/course/tesla_m3', icon: '/assets/tesla/tesla_m3.png', coords: { left: '45%', top: '45%' } },
  { id: 'tesla_m4', title: 'La Bobina de Tesla', color: '#9400D3', link: '/course/tesla_m4', icon: '/assets/tesla/tesla_m4.png', coords: { left: '62%', top: '22%' } },
  { id: 'tesla_m5', title: 'Wardenclyffe', color: '#4B0082', link: '/course/tesla_m5', icon: '/assets/tesla/tesla_m5.png', coords: { left: '78%', top: '40%' } },
  { id: 'tesla_m6', title: 'Radio, Rayos X y más', color: '#00BFFF', link: '/course/tesla_m6', icon: '/assets/tesla/tesla_m6.png', coords: { left: '88%', top: '60%' } },
  { id: 'tesla_m7', title: 'Iluminación del Mundo', color: '#FFD700', link: '/course/tesla_m7', icon: '/assets/tesla/tesla_m7.png', coords: { left: '18%', top: '65%' } },
  { id: 'tesla_m8', title: 'Genio y Soledad', color: '#696969', link: '/course/tesla_m8', icon: '/assets/tesla/tesla_m8.png', coords: { left: '38%', top: '72%' } },
  { id: 'tesla_m9', title: 'Teorías de Conspiración', color: '#FF4500', link: '/course/tesla_m9', icon: '/assets/tesla/tesla_m9.png', coords: { left: '58%', top: '72%' } },
  { id: 'tesla_m10', title: 'El Legado de Tesla', color: '#32CD32', link: '/course/tesla_m10', icon: '/assets/tesla/tesla_m10.png', coords: { left: '78%', top: '72%' } },
];

// Electric particles floating
function ElectricParticles() {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const p = Array.from({ length: 50 }, (_, i) => ({
      id: i, left: Math.random() * 100, top: Math.random() * 100,
      size: 1 + Math.random() * 3, delay: Math.random() * 5,
      duration: 2 + Math.random() * 3,
      color: ['#7B68EE', '#9400D3', '#00BFFF', '#FFD700', '#BA55D3'][Math.floor(Math.random() * 5)],
    }));
    setParticles(p);
  }, []);
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute', left: `${p.left}%`, top: `${p.top}%`,
          width: `${p.size}px`, height: `${p.size}px`, borderRadius: '50%',
          backgroundColor: p.color, boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
          animation: `sparkFloat ${p.duration}s ${p.delay}s ease-in-out infinite`,
        }} />
      ))}
      <style>{`
        @keyframes sparkFloat {
          0%, 100% { opacity: 0; transform: translateY(0) scale(0.5); }
          20% { opacity: 1; }
          80% { opacity: 0.8; }
          50% { transform: translateY(-20px) scale(1.2); }
        }
      `}</style>
    </div>
  );
}

// Electric arcs (Tesla Coil effect)
function ElectricArcs() {
  const [arcs, setArcs] = useState([]);
  
  const generateArc = useCallback(() => {
    const points = [];
    const startX = 20 + Math.random() * 60;
    const startY = 10 + Math.random() * 30;
    let x = startX, y = startY;
    const segments = 6 + Math.floor(Math.random() * 8);
    points.push(`M ${x} ${y}`);
    for (let i = 0; i < segments; i++) {
      x += -5 + Math.random() * 10;
      y += 3 + Math.random() * 6;
      points.push(`L ${x} ${y}`);
    }
    return {
      id: Date.now() + Math.random(),
      path: points.join(' '),
      color: ['#7B68EE', '#9400D3', '#BA55D3', '#00BFFF'][Math.floor(Math.random() * 4)],
      opacity: 0.3 + Math.random() * 0.5,
      width: 1 + Math.random() * 2,
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setArcs(prev => {
        const newArcs = [...prev, generateArc()];
        if (newArcs.length > 5) newArcs.shift();
        return newArcs;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [generateArc]);

  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 3 }}>
      {arcs.map(arc => (
        <g key={arc.id}>
          <path d={arc.path} fill="none" stroke={arc.color} strokeWidth={arc.width + 2}
            opacity={arc.opacity * 0.3} filter="url(#elecGlow)" style={{ animation: 'arcFlash 0.8s ease-out forwards' }} />
          <path d={arc.path} fill="none" stroke="white" strokeWidth={arc.width}
            opacity={arc.opacity} style={{ animation: 'arcFlash 0.8s ease-out forwards' }} />
        </g>
      ))}
      <defs>
        <filter id="elecGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <style>{`
        @keyframes arcFlash {
          0% { opacity: 1; }
          30% { opacity: 0.8; }
          60% { opacity: 0.3; }
          100% { opacity: 0; }
        }
      `}</style>
    </svg>
  );
}

// Electromagnetic pulse
function EMPulse() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
      animation: 'emPulse 8s ease-in-out infinite',
      background: 'radial-gradient(circle at 50% 40%, rgba(123, 104, 238, 0.08), transparent 60%)' }}>
      <style>{`
        @keyframes emPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}

// Circuit connection lines
function CircuitLines() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}>
      {TESLA_MODULES.map((mod, i) => {
        if (i === TESLA_MODULES.length - 1) return null;
        const next = TESLA_MODULES[i + 1];
        return (
          <g key={i}>
            <line x1={mod.coords.left} y1={mod.coords.top} x2={next.coords.left} y2={next.coords.top}
              stroke="url(#circuit-grad)" strokeWidth="1.5" strokeDasharray="4 8" opacity="0.4" />
            {/* Small circuit node at midpoint */}
            <circle cx={`${(parseFloat(mod.coords.left) + parseFloat(next.coords.left)) / 2}%`}
              cy={`${(parseFloat(mod.coords.top) + parseFloat(next.coords.top)) / 2}%`}
              r="3" fill="#7B68EE" opacity="0.5" style={{ animation: `circuitPulse 2s ${i * 0.3}s ease-in-out infinite` }} />
          </g>
        );
      })}
      <defs>
        <linearGradient id="circuit-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7B68EE" />
          <stop offset="50%" stopColor="#9400D3" />
          <stop offset="100%" stopColor="#7B68EE" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <style>{`
        @keyframes circuitPulse {
          0%, 100% { r: 2; opacity: 0.3; }
          50% { r: 5; opacity: 0.8; }
        }
      `}</style>
    </svg>
  );
}

function TeslaModuleNode({ mod, idx, isCompleted }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={mod.link} passHref>
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{ position: 'absolute', left: mod.coords.left, top: mod.coords.top, transform: 'translate(-50%, -50%)', cursor: 'pointer', zIndex: hovered ? 50 : 10 + idx }}>
        <motion.div
          animate={{ y: [0, -8, 0], scale: hovered ? 1.15 : 1 }}
          transition={{ y: { repeat: Infinity, duration: 4 + Math.random() * 2, ease: 'easeInOut', delay: Math.random() * 2 }, scale: { duration: 0.2 } }}
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

export default function TeslaHub() {
  const { user, progress } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const completedIds = progress?.completedModules || [];
  if (!mounted) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#080010', overflow: 'hidden' }}>
      <main style={{ flex: 1, position: 'relative', width: '100vw', height: '100vh',
        backgroundImage: "url('/assets/tesla/tesla_cover.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        
        {/* Dark vignette */}
        <div style={{ position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(8,0,16,0.7) 70%, rgba(8,0,16,0.95) 100%)',
          pointerEvents: 'none', zIndex: 1 }} />

        <EMPulse />
        <ElectricParticles />
        <ElectricArcs />
        <CircuitLines />

        {/* Header */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '2rem', zIndex: 100, pointerEvents: 'none' }}>
          <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/dashboard/misiones')}
            style={{ pointerEvents: 'auto', background: 'rgba(8,0,16,0.7)', border: '1px solid rgba(123, 104, 238, 0.4)', color: 'white',
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '30px', cursor: 'pointer',
              backdropFilter: 'blur(10px)', boxShadow: '0 4px 15px rgba(0,0,0,0.5)', fontFamily: 'var(--font-heading)' }}>
            <ChevronLeft size={20} /> Regresar al Comando
          </motion.button>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
            <div style={{ background: 'rgba(8,0,16,0.7)', padding: '1rem 2rem', borderRadius: '30px',
              border: '1px solid rgba(123, 104, 238, 0.3)', boxShadow: '0 0 20px rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', pointerEvents: 'auto' }}>
              <h1 style={{ color: 'white', margin: 0, fontSize: '2rem',
                textShadow: '0 0 10px rgba(123, 104, 238, 0.6), 0 0 20px rgba(148, 0, 211, 0.4)',
                letterSpacing: '2px', fontFamily: 'var(--font-heading)', textTransform: 'uppercase' }}>
                ⚡ NIKOLA TESLA
              </h1>
              <p style={{ color: '#BA55D3', margin: '0.2rem 0 0 0', fontSize: '0.9rem', textShadow: '0 2px 4px rgba(0,0,0,0.8)', letterSpacing: '1px' }}>
                El Mago de la Electricidad · 10 Módulos
              </p>
            </div>
          </motion.div>
        </div>

        {/* Module nodes */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
          {TESLA_MODULES.map((mod, idx) => (
            <div key={mod.id} style={{ pointerEvents: 'auto' }}>
              <TeslaModuleNode mod={mod} idx={idx} isCompleted={completedIds.includes(mod.id)} />
            </div>
          ))}
        </div>

        {/* Progress */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(8,0,16,0.8)', border: '1px solid rgba(123, 104, 238, 0.3)', padding: '1rem 2.5rem',
          borderRadius: '40px', backdropFilter: 'blur(10px)', zIndex: 200,
          boxShadow: '0 0 30px rgba(0,0,0,0.8), inset 0 0 20px rgba(123, 104, 238, 0.1)',
          display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ color: 'white', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>Progreso de Investigación:</div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1.5rem', borderRadius: '20px',
            color: '#BA55D3', fontWeight: 'bold', fontSize: '1.2rem', textShadow: '0 0 10px rgba(186, 85, 211, 0.5)' }}>
            {completedIds.filter(id => id.startsWith('tesla_m')).length} / {TESLA_MODULES.length}
          </div>
        </div>
      </main>
    </div>
  );
}
