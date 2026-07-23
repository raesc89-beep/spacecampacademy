'use client';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import HubDecorations from '@/components/HubDecorations';

const SW_MODULES = [
  {
    id: 'starwars_sec_1',
    num: '01',
    title: 'Los Parsecs y el Corredor de Kessel',
    subtitle: 'Astrofísica & Relatividad',
    color: '#00CFFF',
    link: '/course/starwars_sec_1',
    icon: '/assets/starwars/module_1.png',
  },
  {
    id: 'starwars_sec_2',
    num: '02',
    title: 'Tatooine, Hoth y Degobha',
    subtitle: 'Exoplanetas & Climas Extremos',
    color: '#FF8C00',
    link: '/course/starwars_sec_2',
    icon: '/assets/starwars/module_2.png',
  },
  {
    id: 'starwars_sec_3',
    num: '03',
    title: 'C3PO y R2-D2',
    subtitle: 'Biomecatrónica e IA',
    color: '#7B68EE',
    link: '/course/starwars_sec_3',
    icon: '/assets/starwars/module_3.png',
  },
  {
    id: 'starwars_sec_4',
    num: '04',
    title: 'Entrelazamiento Cuántico',
    subtitle: 'Física Cuántica',
    color: '#FFE81F',
    link: '/course/starwars_sec_4',
    icon: '/assets/starwars/module_4.png',
  },
  {
    id: 'starwars_sec_5',
    num: '05',
    title: 'Xenobiología y Fauna',
    subtitle: 'Biología Alienígena',
    color: '#00FF88',
    link: '/course/starwars_sec_5',
    icon: '/assets/starwars/module_5.png',
  },
  {
    id: 'starwars_sec_6',
    num: '06',
    title: 'Física de Plasmas',
    subtitle: 'Sables de Luz & Energía',
    color: '#FF3333',
    link: '/course/starwars_sec_6',
    icon: '/assets/starwars/module_6.png',
  },
  {
    id: 'starwars_sec_7',
    num: '07',
    title: 'El Código Jedi',
    subtitle: 'Filosofía & Ética',
    color: '#00FFCC',
    link: '/course/starwars_sec_7',
    icon: '/assets/starwars/module_7.png',
  },
  {
    id: 'starwars_sec_8',
    num: '08',
    title: 'Cruceros Espaciales',
    subtitle: 'Ingeniería Aeroespacial',
    color: '#A0A0A0',
    link: '/course/starwars_sec_8',
    icon: '/assets/starwars/module_8.png',
  },
  {
    id: 'starwars_sec_9',
    num: '09',
    title: 'Traje de Darth Vader',
    subtitle: 'Tecnología Biomédica',
    color: '#FF0055',
    link: '/course/starwars_sec_9',
    icon: '/assets/starwars/module_9.png',
  },
];

// ─── Stars Component ─────────────────────────────────────────────────────────
function Stars() {
  const stars = Array.from({ length: 180 }, (_, i) => {
    let left, top;
    do {
      left = Math.random() * 100;
      top = Math.random() * 85;
    } while (left > 25 && left < 75 && top > 10 && top < 55);
    return {
      id: i,
      left,
      top,
      size: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.6 + 0.1,
      duration: Math.random() * 4 + 1.5,
      delay: Math.random() * 4,
    };
  });

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {stars.map(s => (
        <div key={s.id} style={{
          position: 'absolute',
          left: `${s.left}%`,
          top: `${s.top}%`,
          width: `${s.size}px`,
          height: `${s.size}px`,
          borderRadius: '50%',
          background: 'white',
          opacity: s.opacity,
          animation: `twinkle ${s.duration}s ease-in-out infinite alternate`,
          animationDelay: `${s.delay}s`,
          boxShadow: `0 0 ${s.size * 2}px rgba(255,255,255,0.6), 0 0 ${s.size * 3}px rgba(255,255,255,0.3)`,
        }} />
      ))}
    </div>
  );
}

// ─── Starships Animation Component ─────────────────────────────────────────
function StarshipsAnim() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 5 }}>
      {/* Nave 1: Snowspeeder (Independiente, de derecha a izquierda) */}
      <motion.div 
        animate={{ x: ['120vw', '-20vw'], y: ['60vh', '40vh', '50vh', '20vh'], rotate: [5, -5, 5, -10] }}
        transition={{ repeat: Infinity, duration: 35, repeatDelay: 25, ease: "linear" }}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 5 }}
      >
        <img 
          src="/assets/starwars/ship1.png" 
          alt="Snowspeeder"
          style={{ width: '80px', transform: 'scaleX(-1)', filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.2))' }}
        />
      </motion.div>
      {/* Nave 2: X-Wing (Persecución: el X-Wing huye) */}
      <motion.img 
        src="/assets/starwars/ship2.png" 
        alt="X-Wing"
        animate={{ x: ['-30vw', '130vw'], y: ['70vh', '10vh'], rotate: [-10, -25] }}
        transition={{ repeat: Infinity, duration: 25, repeatDelay: 20, ease: "linear", delay: 5 }}
        style={{ position: 'absolute', top: 0, left: 0, width: '128px', filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.2))' }}
      />
      {/* Nave 3: TIE Fighter (Persecución: persigue al X-wing de cerca) */}
      <motion.img 
        src="/assets/starwars/ship3.png" 
        alt="TIE Fighter"
        animate={{ x: ['-20vw', '120vw'], y: ['75vh', '15vh'], rotate: [-5, -15] }}
        transition={{ repeat: Infinity, duration: 24, repeatDelay: 21, ease: "linear", delay: 7 }}
        style={{ position: 'absolute', top: 0, left: 0, width: '72px', filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.2))' }}
      />
    </div>
  );
}

// ─── Fog Effect Component ──────────────────────────────────────────────────
function FogEffect() {
  return (
    <div style={{
      position: 'absolute', bottom: '-10%', left: '-10%', width: '120%', height: '50%', pointerEvents: 'none', zIndex: 1,
      opacity: 0.6, mixBlendMode: 'screen',
      WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
      maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
    }}>
      <motion.img 
        src="/assets/bttf/smoke_effect.png" 
        alt="Fog"
        animate={{ x: ['-5%', '5%'] }}
        transition={{ repeat: Infinity, duration: 25, ease: "easeInOut", repeatType: 'reverse' }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(10px) sepia(1) hue-rotate(180deg) saturate(3) brightness(0.6)' }}
      />
    </div>
  );
}

// ─── Laser Beams (lightsaber effect) ─────────────────────────────────────────
function LaserBeams() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {[
        { color: '#FF2020', x1: '10%', y1: '60%', x2: '45%', y2: '35%', delay: '0s' },
        { color: '#4040FF', x1: '90%', y1: '55%', x2: '55%', y2: '32%', delay: '2s' },
      ].map((beam, i) => (
        <svg key={i} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.2 }}>
          <line x1={beam.x1} y1={beam.y1} x2={beam.x2} y2={beam.y2}
            stroke={beam.color} strokeWidth="2"
            style={{ animation: `laserPulse 4s ease-in-out infinite`, animationDelay: beam.delay }} />
        </svg>
      ))}
    </div>
  );
}

// ─── Module Card — Imperial Command Deck ──────────────────────────────────────
function SWModuleCard({ mod, idx, isCompleted }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={mod.link} style={{ textDecoration: 'none' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.08, duration: 0.5, ease: 'easeOut' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '0.9rem',
          padding: '0.7rem 1rem',
          background: hovered 
            ? `linear-gradient(135deg, ${mod.color}18, rgba(255,255,255,0.04))`
            : 'rgba(2,3,8,0.75)',
          border: `1px solid ${hovered ? mod.color + '55' : 'rgba(120,180,255,0.12)'}`,
          borderRadius: '10px',
          backdropFilter: 'blur(12px)',
          cursor: 'pointer',
          transition: 'all 0.35s ease',
          transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
          boxShadow: hovered 
            ? `0 4px 20px ${mod.color}22, 0 0 1px ${mod.color}44, inset 0 0 20px ${mod.color}08`
            : '0 2px 8px rgba(0,0,0,0.3)',
          overflow: 'hidden',
        }}
      >
        {/* Scanline decoration */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: `linear-gradient(90deg, transparent, ${mod.color}${hovered ? '40' : '15'}, transparent)`,
          transition: 'all 0.3s ease',
        }} />

        {/* Module number — tiny badge */}
        <div style={{
          position: 'absolute', top: '4px', right: '8px',
          fontSize: '0.55rem', fontFamily: "'Orbitron', sans-serif",
          color: mod.color, opacity: 0.5, letterSpacing: '1px',
          fontWeight: 600,
        }}>
          {mod.num}
        </div>

        {/* Thumbnail */}
        <div style={{
          position: 'relative', flexShrink: 0,
          width: '48px', height: '48px', borderRadius: '8px',
          overflow: 'hidden',
          border: `1px solid ${hovered ? mod.color + '44' : 'rgba(120,180,255,0.15)'}`,
          transition: 'border 0.3s ease',
        }}>
          <img
            src={mod.icon}
            alt={mod.title}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transform: hovered ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.5s ease',
              filter: hovered ? 'brightness(1.15) saturate(1.1)' : 'brightness(0.8) saturate(0.8)',
            }}
          />
          {/* Completed badge */}
          {isCompleted && (
            <div style={{
              position: 'absolute', top: '-1px', right: '-1px',
              background: '#FFE81F', borderRadius: '0 7px 0 6px',
              width: '16px', height: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '9px', color: '#000', fontWeight: 'bold',
            }}>✓</div>
          )}
        </div>

        {/* Text content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '0.65rem',
            fontWeight: 700,
            color: hovered ? '#fff' : 'rgba(255,255,255,0.88)',
            letterSpacing: '0.5px',
            lineHeight: 1.3,
            transition: 'color 0.3s ease',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {mod.title}
          </div>
          <div style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '0.5rem',
            color: mod.color,
            opacity: hovered ? 0.9 : 0.55,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            marginTop: '2px',
            transition: 'opacity 0.3s ease',
            fontWeight: 500,
          }}>
            {mod.subtitle}
          </div>
        </div>

        {/* Arrow */}
        <ChevronRight 
          size={14} 
          style={{ 
            color: hovered ? mod.color : 'rgba(255,255,255,0.2)',
            transition: 'all 0.3s ease',
            transform: hovered ? 'translateX(2px)' : 'translateX(0)',
            flexShrink: 0,
          }} 
        />
      </motion.div>
    </Link>
  );
}

// ─── Main Hub ─────────────────────────────────────────────────────────────────
export default function StarWarsHub() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  if (loading || !userData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020308', color: '#FFE81F', fontFamily: "'Orbitron', sans-serif" }}>
        Iniciando Computadora de Navegación Galáctica...
      </div>
    );
  }

  const completedIds = userData?.progress?.completedModules || [];
  const completedCount = completedIds.filter(id => id.startsWith('starwars_sec')).length;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#020308' }}>

      {/* Back button */}
      <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 200 }}>
        <Link href="/dashboard/misiones" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#FFE81F',
          textDecoration: 'none', background: 'rgba(0,0,0,0.7)', padding: '0.5rem 1rem',
          borderRadius: '30px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,232,31,0.3)',
          fontSize: '0.7rem', fontWeight: 600, fontFamily: "'Orbitron', sans-serif",
          letterSpacing: '1px', transition: 'all 0.3s',
        }}>
          <ChevronLeft size={16} /> MAPA ESTELAR
        </Link>
      </div>

      {/* Main canvas */}
      <main style={{
        flex: 1, position: 'relative', width: '100vw', height: '100vh',
        backgroundColor: '#020308',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Background Image with seamless faded edges */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('/assets/starwars/death_star_hub.jpg')",
          backgroundSize: '55%',
          backgroundPosition: 'center 35%',
          backgroundRepeat: 'no-repeat',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 38%, black 40%, transparent 85%)',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 38%, black 40%, transparent 85%)',
          zIndex: 0,
        }} />
        {/* Dark overlay gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(2,3,8,0.25) 0%, rgba(2,3,8,0.15) 40%, rgba(2,3,8,0.6) 80%, rgba(2,3,8,0.95) 100%)',
          pointerEvents: 'none', zIndex: 0,
        }} />
        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 35%, rgba(2,3,8,0.5) 80%, rgba(2,3,8,0.8) 100%)',
          pointerEvents: 'none', zIndex: 0,
        }} />

        {/* Ambient floating dust particles */}
        <HubDecorations />

        {/* Ambient Fog at the bottom */}
        <FogEffect />

        {/* Twinkling stars blended with background */}
        <Stars />
        <StarshipsAnim />

        {/* ─── Title ────────────────────────────────────────────────── */}
        <div style={{
          position: 'relative', zIndex: 100, textAlign: 'center',
          marginBottom: '1.5rem',
        }}>
          <h1 style={{
            margin: 0, fontSize: 'clamp(0.85rem, 2.2vw, 1.5rem)',
            fontFamily: "'Orbitron', sans-serif",
            background: 'linear-gradient(90deg, #FFE81F, #FFA500, #FFE81F)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 900,
          }}>
            La Ciencia de Star Wars
          </h1>
          <p style={{
            margin: '0.3rem 0 0', color: 'rgba(255,232,31,0.5)',
            fontSize: 'clamp(0.45rem, 0.9vw, 0.6rem)', letterSpacing: '3px',
            fontFamily: "'Orbitron', sans-serif", fontWeight: 400,
            textTransform: 'uppercase',
          }}>
            Astrofísica · Biomecatrónica · Cuántica · 9 Módulos
          </p>
          {/* Progress inline */}
          <div style={{
            marginTop: '0.6rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            background: 'rgba(0,0,0,0.5)', padding: '0.35rem 1rem',
            borderRadius: '20px', border: '1px solid rgba(255,232,31,0.15)',
            backdropFilter: 'blur(6px)',
          }}>
            <span style={{
              fontFamily: "'Orbitron', sans-serif", fontSize: '0.5rem',
              color: 'rgba(255,255,255,0.5)', letterSpacing: '1px', fontWeight: 500,
            }}>
              MISIONES
            </span>
            {/* Mini progress bar */}
            <div style={{
              width: '80px', height: '3px', background: 'rgba(255,255,255,0.1)',
              borderRadius: '2px', overflow: 'hidden',
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(completedCount / SW_MODULES.length) * 100}%` }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                style={{
                  height: '100%', borderRadius: '2px',
                  background: 'linear-gradient(90deg, #FFE81F, #FFA500)',
                }}
              />
            </div>
            <span style={{
              fontFamily: "'Orbitron', sans-serif", fontSize: '0.55rem',
              color: '#FFE81F', fontWeight: 700, letterSpacing: '1px',
            }}>
              {completedCount}/{SW_MODULES.length}
            </span>
          </div>
        </div>

        {/* ─── Module Grid ────────────────────────────────────────── */}
        <div style={{
          position: 'relative', zIndex: 100,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 280px))',
          gap: '0.6rem',
          padding: '0 1.5rem',
          maxWidth: '900px',
          width: '100%',
        }}>
          {SW_MODULES.map((mod, idx) => (
            <SWModuleCard
              key={mod.id}
              mod={mod}
              idx={idx}
              isCompleted={completedIds.includes(mod.id)}
            />
          ))}
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');

        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          15% { opacity: 0.9; transform: scale(1.5); }
          25% { opacity: 0.3; transform: scale(1.1); }
          50% { opacity: 1; transform: scale(1.8); }
          65% { opacity: 0.4; transform: scale(1.2); }
          80% { opacity: 0.8; transform: scale(1.4); }
        }
        @keyframes laserPulse {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.5; }
        }

        /* Responsive: 2 cols on tablet, 1 col on mobile */
        @media (max-width: 768px) {
          div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          div[style*="grid-template-columns: repeat(3"],
          div[style*="grid-template-columns: repeat(2"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
