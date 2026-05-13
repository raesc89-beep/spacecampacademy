'use client';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const SW_MODULES = [
  {
    id: 'starwars_sec_1',
    title: 'Módulo 1',
    subtitle: 'Los Parsecs y el Corredor de Kessel',
    color: '#00CFFF',
    link: '/course/ciencia_star_wars',
    icon: '/assets/starwars/module_1.png',
    coords: { left: '12%', top: '20%' },
  },
  {
    id: 'starwars_sec_2',
    title: 'Módulo 2',
    subtitle: 'Tatooine, Hoth y Degobha',
    color: '#FF8C00',
    link: '/course/ciencia_star_wars',
    icon: '/assets/starwars/module_2.png',
    coords: { left: '32%', top: '15%' },
  },
  {
    id: 'starwars_sec_3',
    title: 'Módulo 3',
    subtitle: 'C3PO y R2-D2, Biomecatrónica e IA',
    color: '#7B68EE',
    link: '/course/ciencia_star_wars',
    icon: '/assets/starwars/module_3.png',
    coords: { left: '52%', top: '22%' },
  },
  {
    id: 'starwars_sec_4',
    title: 'Módulo 4',
    subtitle: 'Entrelazamiento Cuántico',
    color: '#FFE81F',
    link: '/course/ciencia_star_wars',
    icon: '/assets/starwars/module_4.png',
    coords: { left: '18%', top: '35%' },
  },
  {
    id: 'starwars_sec_5',
    title: 'Módulo 5',
    subtitle: 'Xenobiología y Fauna',
    color: '#00FF88',
    link: '/course/ciencia_star_wars',
    icon: '/assets/starwars/module_5.png',
    coords: { left: '38%', top: '35%' },
  },
  {
    id: 'starwars_sec_6',
    title: 'Módulo 6',
    subtitle: 'Física de Plasmas',
    color: '#FF3333',
    link: '/course/ciencia_star_wars',
    icon: '/assets/starwars/module_6.png',
    coords: { left: '58%', top: '38%' },
  },
  {
    id: 'starwars_sec_7',
    title: 'Módulo 7',
    subtitle: 'El Código Jedi',
    color: '#00FFCC',
    link: '/course/ciencia_star_wars',
    icon: '/assets/starwars/module_7.png',
    coords: { left: '25%', top: '50%' },
  },
  {
    id: 'starwars_sec_8',
    title: 'Módulo 8',
    subtitle: 'Cruceros Espaciales',
    color: '#A0A0A0',
    link: '/course/ciencia_star_wars',
    icon: '/assets/starwars/module_8.png',
    coords: { left: '45%', top: '52%' },
  },
  {
    id: 'starwars_sec_9',
    title: 'Módulo 9',
    subtitle: 'Traje de Darth Vader',
    color: '#FF0055',
    link: '/course/ciencia_star_wars',
    icon: '/assets/starwars/module_9.png',
    coords: { left: '65%', top: '54%' },
  },
];

// ─── Stars Component ─────────────────────────────────────────────────────────
function Stars() {
  const stars = Array.from({ length: 180 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 70,
    size: Math.random() * 2.5 + 0.5,
    opacity: Math.random() * 0.8 + 0.2,
    duration: Math.random() * 5 + 2,
    delay: Math.random() * 4,
    color: Math.random() > 0.8 ? '#88ccff' : 'white',
  }));

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
          background: s.color,
          opacity: s.opacity,
          animation: `twinkle ${s.duration}s ease-in-out infinite`,
          animationDelay: `${s.delay}s`,
          boxShadow: s.size > 1.8 ? `0 0 ${s.size * 3}px ${s.color}` : 'none',
        }} />
      ))}
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

// ─── Module Node ──────────────────────────────────────────────────────────────
function SWModuleNode({ mod, idx, isCompleted }) {
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
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4 + idx * 0.7, ease: 'easeInOut' }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.7rem' }}
        >
          {/* Circular image with blur vignette */}
          <div style={{
            position: 'relative',
            width: 'clamp(80px, 8vw, 110px)',
            height: 'clamp(80px, 8vw, 110px)',
            borderRadius: '50%',
            boxShadow: hovered
              ? `0 0 50px ${mod.color}cc, 0 0 20px ${mod.color}88, inset 0 0 20px ${mod.color}44`
              : `0 0 25px ${mod.color}66, 0 0 8px ${mod.color}44`,
            transition: 'all 0.35s ease',
          }}>
            {/* Image with radial mask for edge blur */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0) 75%)',
              maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0) 75%)',
              overflow: 'hidden',
            }}>
              <img
                src={mod.icon}
                alt={mod.subtitle}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  transform: hovered ? 'scale(1.12)' : 'scale(1)',
                  transition: 'transform 0.5s ease',
                  filter: hovered ? 'brightness(1.15)' : 'brightness(0.85)',
                }}
              />
            </div>
            {/* Outer energy ring */}
            <div style={{
              position: 'absolute', inset: '-3px', borderRadius: '50%',
              border: `2px solid ${hovered ? mod.color + 'ff' : mod.color + '55'}`,
              boxShadow: hovered ? `0 0 15px ${mod.color}` : 'none',
              transition: 'all 0.3s ease',
              pointerEvents: 'none',
            }} />
            {/* Completed badge */}
            {isCompleted && (
              <div style={{
                position: 'absolute', top: '0px', right: '0px',
                background: '#00ff88', borderRadius: '50%',
                width: '22px', height: '22px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px', zIndex: 5,
                boxShadow: '0 0 10px #00ff88',
              }}>✓</div>
            )}
          </div>

          {/* Label */}
          <div style={{
            color: 'white',
            textAlign: 'center',
            textShadow: `0 2px 8px ${mod.color}, 0 4px 16px rgba(0,0,0,0.9)`,
            background: 'rgba(0,0,0,0.65)',
            padding: '4px 14px',
            borderRadius: '20px',
            backdropFilter: 'blur(6px)',
            border: `1px solid ${hovered ? mod.color : mod.color + '44'}`,
            transition: 'all 0.3s ease',
          }}>
            <div style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.75rem)', color: mod.color, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
              {mod.title}
            </div>
            <div style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.7rem)', color: 'rgba(255,255,255,0.85)', fontWeight: 500, lineHeight: 1.2 }}>
              {mod.subtitle}
            </div>
          </div>
        </motion.div>

        {/* Tooltip */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10 }}
              style={{
                position: 'absolute',
                top: '115%', left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(4, 6, 20, 0.95)',
                backdropFilter: 'blur(14px)',
                border: `1px solid ${mod.color}`,
                padding: '0.8rem 1.4rem',
                borderRadius: '14px',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                boxShadow: `0 8px 32px ${mod.color}55`,
                zIndex: 100,
              }}
            >
              <h4 style={{ margin: 0, fontSize: '1rem', color: mod.color }}>⚡ {mod.subtitle}</h4>
              <p style={{ margin: '0.3rem 0 0', fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)' }}>
                Iniciar Módulo →
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020308', color: '#FFE81F', fontFamily: 'sans-serif' }}>
        Iniciando Computadora de Navegación Galáctica...
      </div>
    );
  }

  const completedIds = userData?.progress?.completedModules || [];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#020308' }}>

      {/* Back button */}
      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 200 }}>
        <Link href="/dashboard" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#FFE81F',
          textDecoration: 'none', background: 'rgba(0,0,0,0.7)', padding: '0.7rem 1.2rem',
          borderRadius: '30px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,232,31,0.3)',
          fontSize: '0.9rem', fontWeight: 600, transition: 'all 0.3s',
        }}>
          <ChevronLeft size={20} /> Mapa Estelar
        </Link>
      </div>

      {/* Title */}
      <div style={{
        position: 'absolute', top: '1.5rem', left: '50%', transform: 'translateX(-50%)',
        zIndex: 200, textAlign: 'center',
        background: 'rgba(0,0,0,0.6)', padding: '0.6rem 2.5rem',
        borderRadius: '40px', backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,232,31,0.2)',
      }}>
        <h1 style={{
          margin: 0, fontSize: 'clamp(1rem, 2.5vw, 1.8rem)',
          background: 'linear-gradient(90deg, #FFE81F, #FFA500, #FFE81F)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 800,
        }}>
          La Ciencia de Star Wars
        </h1>
        <p style={{ margin: '0.2rem 0 0', color: 'rgba(255,232,31,0.7)', fontSize: 'clamp(0.6rem, 1.2vw, 0.82rem)', letterSpacing: '2px' }}>
          Astrofísica · Biomecatrónica · Cuántica · 9 Módulos
        </p>
      </div>

      {/* Main canvas */}
      <main style={{
        flex: 1, position: 'relative', width: '100vw', height: '100vh',
        backgroundImage: "url('/assets/starwars/star_wars_cover.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}>
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

        {/* Twinkling stars blended with background */}
        <Stars />
        <LaserBeams />

        {/* Constellation lines between modules */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2, opacity: 0.3 }}>
          <line x1="12%" y1="20%" x2="32%" y2="15%" stroke="#FFE81F" strokeWidth="1" strokeDasharray="4 8" />
          <line x1="32%" y1="15%" x2="52%" y2="22%" stroke="#FFE81F" strokeWidth="1" strokeDasharray="4 8" />
          
          <line x1="12%" y1="20%" x2="18%" y2="35%" stroke="#FFE81F" strokeWidth="1" strokeDasharray="4 8" />
          <line x1="32%" y1="15%" x2="38%" y2="35%" stroke="#FFE81F" strokeWidth="1" strokeDasharray="4 8" />
          <line x1="52%" y1="22%" x2="58%" y2="38%" stroke="#FFE81F" strokeWidth="1" strokeDasharray="4 8" />
          
          <line x1="18%" y1="35%" x2="38%" y2="35%" stroke="#FFE81F" strokeWidth="1" strokeDasharray="4 8" />
          <line x1="38%" y1="35%" x2="58%" y2="38%" stroke="#FFE81F" strokeWidth="1" strokeDasharray="4 8" />
          
          <line x1="18%" y1="35%" x2="25%" y2="50%" stroke="#FFE81F" strokeWidth="1" strokeDasharray="4 8" />
          <line x1="38%" y1="35%" x2="45%" y2="52%" stroke="#FFE81F" strokeWidth="1" strokeDasharray="4 8" />
          <line x1="58%" y1="38%" x2="65%" y2="54%" stroke="#FFE81F" strokeWidth="1" strokeDasharray="4 8" />
          
          <line x1="25%" y1="50%" x2="45%" y2="52%" stroke="#FFE81F" strokeWidth="1" strokeDasharray="4 8" />
          <line x1="45%" y1="52%" x2="65%" y2="54%" stroke="#FFE81F" strokeWidth="1" strokeDasharray="4 8" />
        </svg>

        {/* Module nodes */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '1600px', aspectRatio: '16/9', maxHeight: '100vh', margin: '0 auto' }}>
          {SW_MODULES.map((mod, idx) => (
            <SWModuleNode
              key={mod.id}
              mod={mod}
              idx={idx}
              isCompleted={completedIds.includes(mod.id)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{
          position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)',
          zIndex: 200, textAlign: 'center',
        }}>
          <Link href="/course/ciencia_star_wars" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.8rem',
            background: 'linear-gradient(135deg, #FFE81F, #FFA500)',
            color: '#000', padding: '1rem 2.5rem',
            borderRadius: '50px', fontWeight: 800, fontSize: '1.1rem',
            textDecoration: 'none', letterSpacing: '1px',
            boxShadow: '0 0 40px rgba(255,232,31,0.5)',
            transition: 'all 0.3s ease',
          }}>
            ⚡ Iniciar Misión Galáctica
          </Link>
        </div>
      </main>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.6); }
        }
        @keyframes laserPulse {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
