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

// (No inline SVG — using PNG images for creatures instead)

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

// ── Criaturas marinas nadando con trayectorias curvas (estilo Sistema Solar) ──
function SwimmingCreatures() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5, overflow: 'hidden' }}>
      {/* Ictiosaurio — trayectoria curva izq→der, profundidad media */}
      <motion.img
        src="/assets/reptiles_marinos/ichthyosaurus_swim.png"
        alt="Ictiosaurio"
        draggable={false}
        animate={{
          x: ['-20vw', '25vw', '50vw', '75vw', '120vw'],
          y: ['5vh', '-3vh', '8vh', '-2vh', '4vh'],
        }}
        transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
        style={{
          position: 'absolute', top: '30%', left: 0,
          width: '220px', height: 'auto',
          filter: 'drop-shadow(0 4px 20px rgba(0,100,150,0.5))',
          opacity: 0.75,
        }}
      />
      {/* Criatura marina GIF animada — trayectoria curva sinuosa der→izq */}
      <motion.img
        src="/assets/reptiles_marinos/marine_creature.gif"
        alt="Reptil Marino"
        draggable={false}
        animate={{
          x: ['130vw', '95vw', '60vw', '30vw', '-5vw', '-30vw'],
          y: ['3vh', '-6vh', '10vh', '-4vh', '7vh', '0vh'],
        }}
        transition={{ repeat: Infinity, duration: 52, ease: 'linear' }}
        style={{
          position: 'absolute', top: '45%', left: 0,
          width: '280px', height: 'auto',
          filter: 'drop-shadow(0 4px 25px rgba(0,120,180,0.6))',
          opacity: 0.8,
        }}
      />
      {/* Ictiosaurio pequeño lejano — trayectoria der→izq, profundo, borroso */}
      <motion.img
        src="/assets/reptiles_marinos/ichthyosaurus_swim.png"
        alt="Ictiosaurio lejano"
        draggable={false}
        animate={{
          x: ['120vw', '80vw', '50vw', '20vw', '-25vw'],
          y: ['0vh', '6vh', '-4vh', '5vh', '2vh'],
        }}
        transition={{ repeat: Infinity, duration: 55, ease: 'linear' }}
        style={{
          position: 'absolute', top: '65%', left: 0,
          width: '140px', height: 'auto',
          filter: 'blur(2px) drop-shadow(0 4px 15px rgba(0,80,120,0.4))',
          opacity: 0.35,
          transform: 'scaleX(-1)',
        }}
      />
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
        <SwimmingCreatures />
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
