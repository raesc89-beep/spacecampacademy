'use client';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import HubDecorations from '@/components/HubDecorations';

const SW_MODULES = [
  {
    id: 'starwars_sec_1',
    title: 'Los Parsecs y el Corredor de Kessel',
    color: '#00CFFF',
    link: '/course/starwars_sec_1',
    icon: '/assets/starwars/module_1.png',
    coords: { left: '10%', top: '35%' },
  },
  {
    id: 'starwars_sec_2',
    title: 'Tatooine, Hoth y Degobha',
    color: '#FF8C00',
    link: '/course/starwars_sec_2',
    icon: '/assets/starwars/module_2.png',
    coords: { left: '12%', top: '55%' },
  },
  {
    id: 'starwars_sec_3',
    title: 'C3PO y R2-D2, Biomecatrónica e IA',
    color: '#7B68EE',
    link: '/course/starwars_sec_3',
    icon: '/assets/starwars/module_3.png',
    coords: { left: '18%', top: '75%' },
  },
  {
    id: 'starwars_sec_4',
    title: 'Entrelazamiento Cuántico',
    color: '#FFE81F',
    link: '/course/starwars_sec_4',
    icon: '/assets/starwars/module_4.png',
    coords: { left: '30%', top: '85%' },
  },
  {
    id: 'starwars_sec_5',
    title: 'Xenobiología y Fauna',
    color: '#00FF88',
    link: '/course/starwars_sec_5',
    icon: '/assets/starwars/module_5.png',
    coords: { left: '50%', top: '88%' },
  },
  {
    id: 'starwars_sec_6',
    title: 'Física de Plasmas',
    color: '#FF3333',
    link: '/course/starwars_sec_6',
    icon: '/assets/starwars/module_6.png',
    coords: { left: '70%', top: '85%' },
  },
  {
    id: 'starwars_sec_7',
    title: 'El Código Jedi',
    color: '#00FFCC',
    link: '/course/starwars_sec_7',
    icon: '/assets/starwars/module_7.png',
    coords: { left: '82%', top: '75%' },
  },
  {
    id: 'starwars_sec_8',
    title: 'Cruceros Espaciales',
    color: '#A0A0A0',
    link: '/course/starwars_sec_8',
    icon: '/assets/starwars/module_8.png',
    coords: { left: '88%', top: '55%' },
  },
  {
    id: 'starwars_sec_9',
    title: 'Traje de Darth Vader',
    color: '#FF0055',
    link: '/course/starwars_sec_9',
    icon: '/assets/starwars/module_9.png',
    coords: { left: '90%', top: '35%' },
  },
];

// ─── Stars Component ─────────────────────────────────────────────────────────
function Stars() {
  const stars = Array.from({ length: 250 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 80,
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.9 + 0.1,
    duration: Math.random() * 4 + 1.5,
    delay: Math.random() * 4,
    color: Math.random() > 0.8 ? '#88ccff' : (Math.random() > 0.9 ? '#ffcc88' : 'white'),
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
          animation: `twinkle ${s.duration}s ease-in-out infinite alternate`,
          animationDelay: `${s.delay}s`,
          boxShadow: `0 0 ${s.size * 4}px ${s.color}, 0 0 ${s.size * 8}px ${s.color}`,
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
          style={{ width: '100px', transform: 'scaleX(-1)', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))' }}
        />
      </motion.div>
      {/* Nave 2: X-Wing (Persecución: el X-Wing huye) */}
      <motion.img 
        src="/assets/starwars/ship2.png" 
        alt="X-Wing"
        animate={{ x: ['-30vw', '130vw'], y: ['70vh', '10vh'], rotate: [-10, -25] }}
        transition={{ repeat: Infinity, duration: 25, repeatDelay: 20, ease: "linear", delay: 5 }}
        style={{ position: 'absolute', top: 0, left: 0, width: '160px', filter: 'drop-shadow(0 0 15px rgba(0,255,255,0.4))' }}
      />
      {/* Nave 3: TIE Fighter (Persecución: persigue al X-wing de cerca) */}
      <motion.img 
        src="/assets/starwars/ship3.png" 
        alt="TIE Fighter"
        animate={{ x: ['-20vw', '120vw'], y: ['75vh', '15vh'], rotate: [-5, -15] }}
        transition={{ repeat: Infinity, duration: 24, repeatDelay: 21, ease: "linear", delay: 7 }}
        style={{ position: 'absolute', top: 0, left: 0, width: '90px', filter: 'drop-shadow(0 0 10px rgba(255,50,50,0.6))' }}
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
            width: 'clamp(100px, 12vw, 150px)',
            height: 'clamp(100px, 12vw, 150px)',
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
            <div style={{ fontSize: 'clamp(0.65rem, 1vw, 0.85rem)', color: mod.color, fontWeight: 700, letterSpacing: '1px' }}>
              {mod.title}
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
              <h4 style={{ margin: 0, fontSize: '1rem', color: mod.color }}>⚡ Iniciar Misión</h4>
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
        <Link href="/dashboard/misiones" style={{
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
        backgroundColor: '#020308',
      }}>
        {/* Background Image with seamless faded edges */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('/assets/starwars/starwarshub_enhanced.png')",
          backgroundSize: 'contain',
          backgroundPosition: 'center 40%',
          backgroundRepeat: 'no-repeat',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 50% 40%, black 60%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse 70% 80% at 50% 40%, black 60%, transparent 100%)',
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

        {/* Ambient floating dust particles (Arqueoastronomia style) */}
        <HubDecorations />

        {/* Ambient Fog at the bottom */}
        <FogEffect />

        {/* Twinkling stars blended with background */}
        <Stars />
        <LaserBeams />
        <StarshipsAnim />

        {/* Constellation lines between modules */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2, opacity: 0.3 }}>
          {SW_MODULES.map((mod, i) => {
            if (i === SW_MODULES.length - 1) return null;
            const nextMod = SW_MODULES[i + 1];
            return (
              <line key={i} x1={mod.coords.left} y1={mod.coords.top} x2={nextMod.coords.left} y2={nextMod.coords.top} stroke="#FFE81F" strokeWidth="1" strokeDasharray="4 8" />
            );
          })}
        </svg>

        {/* Module nodes */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
          {SW_MODULES.map((mod, idx) => (
            <div key={mod.id} style={{ pointerEvents: 'auto' }}>
              <SWModuleNode
                mod={mod}
                idx={idx}
                isCompleted={completedIds.includes(mod.id)}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA - Progress Indicator */}
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.7)',
          border: '1px solid rgba(255, 232, 31, 0.3)',
          padding: '1rem 2.5rem',
          borderRadius: '40px',
          backdropFilter: 'blur(10px)',
          zIndex: 200,
          boxShadow: '0 0 30px rgba(0,0,0,0.8), inset 0 0 20px rgba(255, 232, 31, 0.1)',
          display: 'flex', alignItems: 'center', gap: '1.5rem',
        }}>
          <div style={{ color: 'white', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>
            Misiones Completadas:
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '0.5rem 1.5rem',
            borderRadius: '20px',
            color: '#FFE81F',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            textShadow: '0 0 10px rgba(255, 232, 31, 0.5)'
          }}>
            {completedIds.filter(id => id.startsWith('starwars_sec')).length} / {SW_MODULES.length}
          </div>
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
