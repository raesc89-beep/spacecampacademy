'use client';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const MARINOS_MODULES = [
  { id: 'marinos_m1',  title: 'Ictiosaurios: Los Delfines del Mesozoico', color: '#006994', link: '/course/marinos_m1',  icon: '/assets/reptiles_marinos/marinos_m1.png',  coords: { left: '12%', top: '18%' } },
  { id: 'marinos_m2',  title: 'Plesiosaurios: Los Cuellos del Abismo',    color: '#20B2AA', link: '/course/marinos_m2',  icon: '/assets/reptiles_marinos/marinos_m2.png',  coords: { left: '30%', top: '35%' } },
  { id: 'marinos_m3',  title: 'Mosasaurios: Los Depredadores Supremos',   color: '#4169E1', link: '/course/marinos_m3',  icon: '/assets/reptiles_marinos/marinos_m3.png',  coords: { left: '50%', top: '20%' } },
  { id: 'marinos_m4',  title: 'Tiburones Prehistóricos',                  color: '#191970', link: '/course/marinos_m4',  icon: '/assets/reptiles_marinos/marinos_m4.png',  coords: { left: '70%', top: '38%' } },
  { id: 'marinos_m5',  title: 'Amonites: Los Caracoles del Abismo',       color: '#008B8B', link: '/course/marinos_m5',  icon: '/assets/reptiles_marinos/marinos_m5.png',  coords: { left: '88%', top: '22%' } },
  { id: 'marinos_m6',  title: 'Notosaurios y Placodontos',                color: '#2F4F4F', link: '/course/marinos_m6',  icon: '/assets/reptiles_marinos/marinos_m6.png',  coords: { left: '15%', top: '55%' } },
  { id: 'marinos_m7',  title: 'Tortugas Marinas Prehistóricas',           color: '#5F9EA0', link: '/course/marinos_m7',  icon: '/assets/reptiles_marinos/marinos_m7.png',  coords: { left: '35%', top: '68%' } },
  { id: 'marinos_m8',  title: 'Criaturas de las Profundidades',           color: '#00CED1', link: '/course/marinos_m8',  icon: '/assets/reptiles_marinos/marinos_m8.png',  coords: { left: '55%', top: '55%' } },
  { id: 'marinos_m9',  title: 'Ecosistemas Marinos Prehistóricos',        color: '#B22222', link: '/course/marinos_m9',  icon: '/assets/reptiles_marinos/marinos_m9.png',  coords: { left: '75%', top: '68%' } },
  { id: 'marinos_m10', title: 'Paleontología Marina Moderna',             color: '#DAA520', link: '/course/marinos_m10', icon: '/assets/reptiles_marinos/marinos_m10.png', coords: { left: '88%', top: '55%' } },
];

// ── Plesiosaurio SVG realista ──────────────────────────────────────────────────
function PlesiosauroSvg({ scale = 1, flip = false }) {
  return (
    <svg width={420 * scale} height={180 * scale} viewBox="0 0 420 180" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? 'scaleX(-1)' : 'none', filter: 'drop-shadow(0 0 12px rgba(0,180,255,0.35))' }}>
      {/* Neck */}
      <path d="M280,82 C305,55 330,30 348,18 C358,10 372,14 370,26 C368,36 352,42 336,55 C318,70 300,85 290,92"
        stroke="rgba(80,160,200,0.85)" strokeWidth="14" strokeLinecap="round" fill="none"/>
      <path d="M280,82 C305,55 330,30 348,18 C358,10 372,14 370,26 C368,36 352,42 336,55 C318,70 300,85 290,92"
        stroke="rgba(140,210,240,0.4)" strokeWidth="6" strokeLinecap="round" fill="none"/>
      {/* Head */}
      <ellipse cx="370" cy="22" rx="18" ry="10" fill="rgba(70,140,180,0.9)" />
      <path d="M370,14 Q395,12 408,18 Q395,22 370,22 Z" fill="rgba(60,130,170,0.9)" />
      <path d="M370,22 Q395,24 408,18" stroke="rgba(100,170,200,0.6)" strokeWidth="1.5" fill="none" />
      <circle cx="382" cy="17" r="4" fill="rgba(0,220,255,0.9)" />
      <circle cx="383" cy="16" r="1.8" fill="white" opacity="0.8" />
      <circle cx="383.5" cy="16.2" r="0.8" fill="#000" />
      <path d="M388,20 L390,23 M393,19 L395,22 M398,18 L400,21" stroke="rgba(230,230,200,0.6)" strokeWidth="1" />
      {/* Body */}
      <ellipse cx="200" cy="95" rx="110" ry="42" fill="rgba(55,120,160,0.88)" />
      <ellipse cx="200" cy="104" rx="85" ry="22" fill="rgba(100,175,210,0.35)" />
      <ellipse cx="180" cy="78" rx="60" ry="14" fill="rgba(140,210,240,0.25)" />
      {[...Array(8)].map((_, i) => (
        <ellipse key={i} cx={140 + i * 18} cy={88 + (i % 3) * 6} rx={4 + (i % 2) * 2} ry={3}
          fill="rgba(80,190,220,0.18)" />
      ))}
      {/* Tail */}
      <path d="M90,95 Q60,88 30,72 Q12,60 5,50 Q15,55 25,65 Q50,82 75,90 Q60,95 30,108 Q12,112 5,108 Q15,102 30,98 Q60,100 90,95"
        fill="rgba(55,120,160,0.88)" />
      {/* Front flippers */}
      <path d="M240,108 Q255,135 245,155 Q235,165 228,158 Q230,142 235,120 Z" fill="rgba(50,110,150,0.82)" />
      <path d="M155,108 Q140,135 150,155 Q160,165 167,158 Q165,142 160,120 Z" fill="rgba(50,110,150,0.82)" />
      {/* Rear flippers */}
      <path d="M135,100 Q115,122 120,142 Q128,152 135,145 Q133,128 135,108 Z" fill="rgba(45,105,145,0.75)" />
      <path d="M260,100 Q280,122 275,142 Q267,152 260,145 Q262,128 260,108 Z" fill="rgba(45,105,145,0.75)" />
    </svg>
  );
}

// ── Burbujas realistas ─────────────────────────────────────────────────────────
function Bubbles() {
  const [bubbles, setBubbles] = useState([]);
  useEffect(() => {
    setBubbles(Array.from({ length: 55 }, (_, i) => ({
      id: i, left: Math.random() * 100,
      delay: Math.random() * 18, duration: 10 + Math.random() * 14,
      size: 2 + Math.random() * 7, opacity: 0.08 + Math.random() * 0.35,
      drift: Math.round((Math.random() - 0.5) * 40),
    })));
  }, []);
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 4, overflow: 'hidden' }}>
      {bubbles.map(b => (
        <div key={b.id} style={{
          position: 'absolute', left: `${b.left}%`, bottom: '-5%',
          width: `${b.size}px`, height: `${b.size}px`, borderRadius: '50%',
          border: `1px solid rgba(140,210,255,${b.opacity * 0.8})`,
          background: `radial-gradient(circle at 30% 30%, rgba(180,230,255,${b.opacity}), transparent)`,
          animation: `bubbleRise ${b.duration}s ${b.delay}s linear infinite`,
          '--drift': `${b.drift}px`,
        }} />
      ))}
      <style>{`
        @keyframes bubbleRise {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          5%   { opacity: 1; }
          90%  { opacity: 0.4; }
          100% { transform: translateY(-110vh) translateX(var(--drift, 20px)); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ── Partículas bioluminiscentes ─────────────────────────────────────────────────
function BiolumParticles() {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    setParticles(Array.from({ length: 40 }, (_, i) => ({
      id: i, left: Math.random() * 100, top: Math.random() * 100,
      size: 2 + Math.random() * 5, delay: Math.random() * 8, duration: 4 + Math.random() * 5,
      color: ['#00FFCC','#00CED1','#20B2AA','#7FFFD4','#48D1CC','#00E5FF'][Math.floor(Math.random() * 6)],
    })));
  }, []);
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3 }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute', left: `${p.left}%`, top: `${p.top}%`,
          width: `${p.size}px`, height: `${p.size}px`, borderRadius: '50%',
          backgroundColor: p.color,
          boxShadow: `0 0 ${p.size * 4}px ${p.color}, 0 0 ${p.size * 8}px ${p.color}40`,
          animation: `biolumPulse ${p.duration}s ${p.delay}s ease-in-out infinite`,
        }} />
      ))}
      <style>{`
        @keyframes biolumPulse {
          0%, 100% { opacity: 0.05; transform: scale(0.7); }
          50%       { opacity: 0.9;  transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
}

// ── Rayos de luz volumétricos ───────────────────────────────────────────────────
function GodsRays() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2, overflow: 'hidden' }}>
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute', top: '-10%', left: `${10 + i * 11}%`,
          width: `${3 + (i % 3)}%`, height: '80%',
          background: 'linear-gradient(180deg, rgba(100,200,255,0.12) 0%, rgba(0,150,200,0.05) 50%, transparent 100%)',
          transform: `rotate(${-8 + i * 2}deg)`, transformOrigin: 'top center',
          animation: `rayShimmer ${6 + i * 1.3}s ${i * 0.7}s ease-in-out infinite alternate`,
          borderRadius: '0 0 50% 50%',
        }} />
      ))}
      <style>{`
        @keyframes rayShimmer {
          0%   { opacity: 0.3; }
          100% { opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}

// ── 4 Plesiosaurios nadando en el fondo ────────────────────────────────────────
function SwimmingPlesiosaurs() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5, overflow: 'hidden' }}>
      {/* Grande, fondo profundo, lento — izq → der */}
      <div style={{ position: 'absolute', top: '60%', animation: 'plesiRight 42s -8s linear infinite', opacity: 0.55, filter: 'blur(1.5px)' }}>
        <PlesiosauroSvg scale={0.9} />
      </div>
      {/* Mediano, profundidad media, vel media — der → izq */}
      <div style={{ position: 'absolute', top: '32%', animation: 'plesiLeft 30s -15s linear infinite', opacity: 0.7 }}>
        <PlesiosauroSvg scale={0.65} flip={true} />
      </div>
      {/* Pequeño, muy profundo, muy lento */}
      <div style={{ position: 'absolute', top: '78%', animation: 'plesiRight 58s -25s linear infinite', opacity: 0.28, filter: 'blur(3px)' }}>
        <PlesiosauroSvg scale={0.5} />
      </div>
      {/* Cercano al frente, cerca de la superficie — der → izq */}
      <div style={{ position: 'absolute', top: '20%', animation: 'plesiLeft 22s -5s linear infinite', opacity: 0.45, filter: 'blur(0.5px)' }}>
        <PlesiosauroSvg scale={0.42} flip={true} />
      </div>
      <style>{`
        @keyframes plesiRight {
          0%   { left: -25%; transform: translateY(0); }
          25%  { transform: translateY(-18px); }
          50%  { transform: translateY(10px); }
          75%  { transform: translateY(-12px); }
          100% { left: 115%; transform: translateY(0); }
        }
        @keyframes plesiLeft {
          0%   { right: -25%; transform: translateY(0); }
          25%  { transform: translateY(14px); }
          50%  { transform: translateY(-16px); }
          75%  { transform: translateY(10px); }
          100% { right: 115%; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ── Superficie del agua ─────────────────────────────────────────────────────────
function WaterSurface() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '140px', pointerEvents: 'none', zIndex: 6, overflow: 'hidden' }}>
      <svg viewBox="0 0 1440 140" style={{ position: 'absolute', top: 0, width: '200%', animation: 'waveScroll 14s linear infinite' }}>
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#001828" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#001828" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,70 C200,35 400,105 600,70 C800,35 1000,105 1200,70 C1350,42 1440,85 1440,70 L1440,0 L0,0 Z"
          fill="url(#waveGrad)" />
        <path d="M0,90 C220,55 440,125 660,90 C880,55 1100,125 1320,90 L1440,80 L1440,0 L0,0 Z"
          fill="rgba(0,12,28,0.5)" />
      </svg>
      <style>{`
        @keyframes waveScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}

// ── Líneas de conexión ───────────────────────────────────────────────────────────
function OceanTrail() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 8 }}>
      <defs>
        <linearGradient id="ocean-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#006994" />
          <stop offset="100%" stopColor="#00CED1" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {MARINOS_MODULES.map((mod, i) => {
        if (i === MARINOS_MODULES.length - 1) return null;
        const next = MARINOS_MODULES[i + 1];
        return <line key={i} x1={mod.coords.left} y1={mod.coords.top} x2={next.coords.left} y2={next.coords.top}
          stroke="url(#ocean-grad)" strokeWidth="1.5" strokeDasharray="6 10" opacity="0.4" />;
      })}
    </svg>
  );
}

// ── Nodo de módulo ─────────────────────────────────────────────────────────────
function MarinoModuleNode({ mod, idx, isCompleted }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={mod.link} passHref>
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{ position: 'absolute', left: mod.coords.left, top: mod.coords.top, transform: 'translate(-50%,-50%)', cursor: 'pointer', zIndex: hovered ? 50 : 10 + idx }}>
        <motion.div
          animate={{ y: [0,-10,0], scale: hovered ? 1.15 : 1 }}
          transition={{ y: { repeat: Infinity, duration: 5 + idx * 0.4, ease: 'easeInOut', delay: idx * 0.3 }, scale: { duration: 0.2 } }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            position: 'relative', width: 'clamp(80px,10vw,120px)', height: 'clamp(80px,10vw,120px)', borderRadius: '50%',
            boxShadow: hovered ? `0 0 40px ${mod.color}ff,0 0 80px ${mod.color}44,inset 0 0 20px ${mod.color}aa` : `0 0 20px ${mod.color}88,0 0 40px ${mod.color}22`,
            transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%',
              WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 70%)',
              maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 70%)', overflow: 'hidden' }}>
              <img src={mod.icon} alt={mod.title} style={{ width: '100%', height: '100%', objectFit: 'cover',
                transform: hovered ? 'scale(1.12)' : 'scale(1)', transition: 'transform 0.5s ease' }} />
            </div>
            <div style={{ position: 'absolute', inset: '-3px', borderRadius: '50%',
              border: `2px solid ${hovered ? 'rgba(255,255,255,0.7)' : mod.color + '55'}`, transition: 'all 0.3s ease', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: '4px', borderRadius: '50%', border: `1px solid ${mod.color}33`, pointerEvents: 'none' }} />
          </div>
          <div style={{ color: 'white', textAlign: 'center',
            textShadow: `0 2px 8px ${mod.color},0 4px 16px rgba(0,0,0,0.9)`,
            background: 'rgba(0,8,22,0.72)', padding: '4px 14px', borderRadius: '20px',
            backdropFilter: 'blur(8px)', border: `1px solid ${hovered ? mod.color : mod.color+'44'}`,
            transition: 'all 0.3s ease', maxWidth: 'clamp(120px,15vw,180px)' }}>
            <div style={{ fontSize: 'clamp(0.55rem,0.85vw,0.78rem)', color: mod.color, fontWeight: 700, letterSpacing: '0.5px' }}>{mod.title}</div>
          </div>
          {isCompleted && (
            <motion.div initial={{ scale:0, rotate:-180 }} animate={{ scale:1, rotate:0 }}
              style={{ position:'absolute', top:-8, right:-8, background:'#FFD700', borderRadius:'50%', padding:'4px', boxShadow:'0 0 12px #FFD700', zIndex:10 }}>
              <CheckCircle size={16} color="black" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </Link>
  );
}

// ── Main Page ───────────────────────────────────────────────────────────────────
export default function ReptilesMarinos() {
  const { user, progress } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const completedIds = progress?.completedModules || [];
  if (!mounted) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#000f1e', overflow: 'hidden' }}>
      <main style={{ flex: 1, position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>

        {/* FONDO HD UNDERWATER */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: "url('/assets/reptiles_marinos/underwater_bg_hd.png')",
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'saturate(1.15) brightness(0.75)',
        }} />
        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'radial-gradient(ellipse 120% 100% at 50% 0%, rgba(0,30,60,0) 0%, rgba(0,15,35,0.55) 55%, rgba(0,5,15,0.92) 100%)',
          pointerEvents: 'none',
        }} />
        {/* Color overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(180deg, rgba(0,40,80,0.3) 0%, rgba(0,20,50,0.2) 40%, rgba(0,10,30,0.5) 100%)',
          pointerEvents: 'none',
        }} />

        <GodsRays />
        <WaterSurface />
        <Bubbles />
        <BiolumParticles />
        <SwimmingPlesiosaurs />
        <OceanTrail />

        {/* HEADER */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '2rem', zIndex: 100, pointerEvents: 'none' }}>
          <motion.button initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
            whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
            onClick={() => router.push('/dashboard/misiones')}
            style={{ pointerEvents:'auto', background:'rgba(0,10,30,0.75)', border:'1px solid rgba(0,150,200,0.45)', color:'white',
              display:'flex', alignItems:'center', gap:'0.5rem', padding:'0.75rem 1.5rem', borderRadius:'30px', cursor:'pointer',
              backdropFilter:'blur(12px)', boxShadow:'0 4px 20px rgba(0,0,0,0.6)', fontFamily:'var(--font-heading)' }}>
            <ChevronLeft size={20} /> Regresar al Comando
          </motion.button>
          <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }}
            style={{ textAlign:'right', display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'0.5rem' }}>
            <div style={{ background:'rgba(0,10,30,0.78)', padding:'1rem 2rem', borderRadius:'30px',
              border:'1px solid rgba(0,150,200,0.3)', boxShadow:'0 0 30px rgba(0,0,0,0.8)', backdropFilter:'blur(12px)' }}>
              <h1 style={{ color:'white', margin:0, fontSize:'1.8rem',
                textShadow:'0 0 15px rgba(0,206,209,0.7),0 0 30px rgba(0,100,150,0.5)',
                letterSpacing:'2px', fontFamily:'var(--font-heading)', textTransform:'uppercase' }}>
                🌊 REPTILES MARINOS
              </h1>
              <p style={{ color:'#00CED1', margin:'0.2rem 0 0 0', fontSize:'0.9rem', letterSpacing:'1px' }}>
                Leviatanes del Abismo · 10 Módulos
              </p>
            </div>
          </motion.div>
        </div>

        {/* MÓDULOS */}
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:10 }}>
          {MARINOS_MODULES.map((mod, idx) => (
            <div key={mod.id} style={{ pointerEvents:'auto' }}>
              <MarinoModuleNode mod={mod} idx={idx} isCompleted={completedIds.includes(mod.id)} />
            </div>
          ))}
        </div>

        {/* PROGRESS */}
        <div style={{ position:'absolute', bottom:'2rem', left:'50%', transform:'translateX(-50%)',
          background:'rgba(0,8,22,0.82)', border:'1px solid rgba(0,150,200,0.35)',
          padding:'1rem 2.5rem', borderRadius:'40px', backdropFilter:'blur(12px)', zIndex:200,
          boxShadow:'0 0 30px rgba(0,0,0,0.8)', display:'flex', alignItems:'center', gap:'1.5rem' }}>
          <div style={{ color:'white', fontFamily:'var(--font-heading)', fontSize:'1.1rem' }}>Profundidad Explorada:</div>
          <div style={{ background:'rgba(0,206,209,0.12)', padding:'0.5rem 1.5rem', borderRadius:'20px',
            color:'#00CED1', fontWeight:'bold', fontSize:'1.2rem', textShadow:'0 0 12px rgba(0,206,209,0.6)',
            border:'1px solid rgba(0,206,209,0.25)' }}>
            {completedIds.filter(id => id.startsWith('marinos_m')).length} / {MARINOS_MODULES.length}
          </div>
        </div>

      </main>
    </div>
  );
}
