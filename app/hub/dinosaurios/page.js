'use client';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const DINOS_MODULES = [
  { id: 'dinos_m1', title: 'El Amanecer del Triásico', color: '#8B4513', link: '/course/dinos_m1', icon: '/assets/dinosaurios/dinos_m1.png', coords: { left: '10%', top: '30%' } },
  { id: 'dinos_m2', title: 'Gigantes del Jurásico', color: '#CD853F', link: '/course/dinos_m2', icon: '/assets/dinosaurios/dinos_m2.png', coords: { left: '25%', top: '55%' } },
  { id: 'dinos_m3', title: 'Tyrannosaurus Rex: El Rey Supremo', color: '#228B22', link: '/course/dinos_m3', icon: '/assets/dinosaurios/dinos_m3.png', coords: { left: '38%', top: '28%' } },
  { id: 'dinos_m4', title: 'Velociraptores: Cazadores Inteligentes', color: '#B22222', link: '/course/dinos_m4', icon: '/assets/dinosaurios/dinos_m4.png', coords: { left: '52%', top: '58%' } },
  { id: 'dinos_m5', title: 'Pterosaurios: Los Señores del Cielo', color: '#2E8B57', link: '/course/dinos_m5', icon: '/assets/dinosaurios/dinos_m5.png', coords: { left: '65%', top: '30%' } },
  { id: 'dinos_m6', title: 'Dinosaurios Acorazados', color: '#DC143C', link: '/course/dinos_m6', icon: '/assets/dinosaurios/dinos_m6.png', coords: { left: '78%', top: '55%' } },
  { id: 'dinos_m7', title: 'Nidos y Crías de Dinosaurio', color: '#4682B4', link: '/course/dinos_m7', icon: '/assets/dinosaurios/dinos_m7.png', coords: { left: '88%', top: '28%' } },
  { id: 'dinos_m8', title: 'El Mundo del Cretácico', color: '#DAA520', link: '/course/dinos_m8', icon: '/assets/dinosaurios/dinos_m8.png', coords: { left: '15%', top: '75%' } },
  { id: 'dinos_m9', title: 'El Asteroide que Cambió Todo', color: '#FF4500', link: '/course/dinos_m9', icon: '/assets/dinosaurios/dinos_m9.png', coords: { left: '45%', top: '78%' } },
  { id: 'dinos_m10', title: 'Paleontología del Futuro', color: '#9370DB', link: '/course/dinos_m10', icon: '/assets/dinosaurios/dinos_m10.png', coords: { left: '75%', top: '78%' } },
];

// Volcanic ash particles
function VolcanicAsh() {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const p = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 6 + Math.random() * 8,
      size: 1 + Math.random() * 3,
      opacity: 0.2 + Math.random() * 0.4,
      drift: -20 + Math.random() * 40,
    }));
    setParticles(p);
  }, []);
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2, overflow: 'hidden' }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute', left: `${p.left}%`, top: '-5%',
          width: `${p.size}px`, height: `${p.size}px`,
          borderRadius: '50%', backgroundColor: `rgba(200, 160, 120, ${p.opacity})`,
          animation: `ashFall ${p.duration}s ${p.delay}s linear infinite`,
        }} />
      ))}
      <style>{`
        @keyframes ashFall {
          0% { transform: translateY(-10px) translateX(0px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.5; }
          100% { transform: translateY(110vh) translateX(30px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// Lightning flash effect
function VolcanicLightning() {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3,
      animation: 'volcanicFlash 12s ease-in-out infinite',
      background: 'radial-gradient(circle at 30% 20%, rgba(255, 100, 0, 0.15), transparent 60%)',
    }}>
      <style>{`
        @keyframes volcanicFlash {
          0%, 88% { opacity: 0; }
          89% { opacity: 0.8; }
          90% { opacity: 0; }
          91% { opacity: 1; }
          92% { opacity: 0; }
          93% { opacity: 0.5; }
          94%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// Footprint trail connecting modules
function FootprintTrail() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 4 }}>
      {DINOS_MODULES.map((mod, i) => {
        if (i === DINOS_MODULES.length - 1) return null;
        const next = DINOS_MODULES[i + 1];
        return (
          <line key={i} x1={mod.coords.left} y1={mod.coords.top} x2={next.coords.left} y2={next.coords.top}
            stroke="url(#trail-grad)" strokeWidth="2" strokeDasharray="8 12" opacity="0.4" />
        );
      })}
      <defs>
        <linearGradient id="trail-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B4513" />
          <stop offset="100%" stopColor="#FF4500" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function DinoModuleNode({ mod, idx, isCompleted }) {
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

export default function DinosauriosHub() {
  const { user, progress } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const completedIds = progress?.completedModules || [];
  if (!mounted) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#0a0500', overflow: 'hidden' }}>
      <main style={{ flex: 1, position: 'relative', width: '100vw', height: '100vh',
        backgroundImage: "url('/assets/dinosaurios/dinosaurios_cover.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        
        {/* Vignette */}
        <div style={{ position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.95) 100%)',
          pointerEvents: 'none', zIndex: 1 }} />
        
        {/* Heat haze overlay */}
        <div style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(139,69,19,0.05) 0%, rgba(255,69,0,0.08) 100%)',
          pointerEvents: 'none', zIndex: 1, animation: 'heatHaze 8s ease-in-out infinite' }} />
        
        <VolcanicAsh />
        <VolcanicLightning />
        <FootprintTrail />

        {/* Header */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '2rem', zIndex: 100, pointerEvents: 'none' }}>
          <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/dashboard/misiones')}
            style={{ pointerEvents: 'auto', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(139, 69, 19, 0.4)', color: 'white',
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '30px', cursor: 'pointer',
              backdropFilter: 'blur(10px)', boxShadow: '0 4px 15px rgba(0,0,0,0.5)', fontFamily: 'var(--font-heading)' }}>
            <ChevronLeft size={20} /> Regresar al Comando
          </motion.button>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.7)', padding: '1rem 2rem', borderRadius: '30px',
              border: '1px solid rgba(139, 69, 19, 0.3)', boxShadow: '0 0 20px rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', pointerEvents: 'auto' }}>
              <h1 style={{ color: 'white', margin: 0, fontSize: '2rem',
                textShadow: '0 0 10px rgba(139, 69, 19, 0.6), 0 0 20px rgba(255, 69, 0, 0.4)',
                letterSpacing: '2px', fontFamily: 'var(--font-heading)', textTransform: 'uppercase' }}>
                🦕 DINOSAURIOS
              </h1>
              <p style={{ color: '#CD853F', margin: '0.2rem 0 0 0', fontSize: '0.9rem', textShadow: '0 2px 4px rgba(0,0,0,0.8)', letterSpacing: '1px' }}>
                La Era de los Titanes · 10 Módulos
              </p>
            </div>
          </motion.div>
        </div>

        {/* Module nodes */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
          {DINOS_MODULES.map((mod, idx) => (
            <div key={mod.id} style={{ pointerEvents: 'auto' }}>
              <DinoModuleNode mod={mod} idx={idx} isCompleted={completedIds.includes(mod.id)} />
            </div>
          ))}
        </div>

        {/* Progress */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(139, 69, 19, 0.3)', padding: '1rem 2.5rem',
          borderRadius: '40px', backdropFilter: 'blur(10px)', zIndex: 200,
          boxShadow: '0 0 30px rgba(0,0,0,0.8), inset 0 0 20px rgba(139, 69, 19, 0.1)',
          display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ color: 'white', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>Progreso de Exploración:</div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1.5rem', borderRadius: '20px',
            color: '#CD853F', fontWeight: 'bold', fontSize: '1.2rem', textShadow: '0 0 10px rgba(139, 69, 19, 0.5)' }}>
            {completedIds.filter(id => id.startsWith('dinos_m')).length} / {DINOS_MODULES.length}
          </div>
        </div>
      </main>

      <style>{`
        @keyframes heatHaze {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
