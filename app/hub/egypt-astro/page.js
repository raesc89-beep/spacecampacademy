'use client';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Módulos del curso ─────────────────────────────────────────────────────
const EGYPT_MODULES = [
  // Top row (Sky) - BAJADOS para no encimar el título
  { id: 'egypt_m11', titleEs: 'Nilo de Nut',       color: '#9DD4F0', link: '/course/egypt_m11', icon: '/assets/egypt/m11_via_lactea.png',  coords: { left: '15%', top: '25%' } },
  { id: 'egypt_m6',  titleEs: 'Mapa del Universo', color: '#9B6BFF', link: '/course/egypt_m6',  icon: '/assets/egypt/m6_senenmut.png',     coords: { left: '35%', top: '22%' } },
  { id: 'egypt_m2',  titleEs: 'Los Decanos',       color: '#6A9FD4', link: '/course/egypt_m2',  icon: '/assets/egypt/m2_decanos.png',      coords: { left: '60%', top: '22%' } },
  { id: 'egypt_m14', titleEs: 'Apofis',            color: '#FF5252', link: '/course/egypt_m14', icon: '/assets/egypt/m14_apofis.png',      coords: { left: '85%', top: '25%' } },
  
  // Middle-Upper row (Sky/Horizon) - BAJADOS ligeramente
  { id: 'egypt_m9',  titleEs: 'Zodiaco Dendera',   color: '#D46A6A', link: '/course/egypt_m9',  icon: '/assets/egypt/m9_dendera.png',      coords: { left: '25%', top: '42%' } },
  { id: 'egypt_m4',  titleEs: 'Mesjetiu',          color: '#F5C842', link: '/course/egypt_m4',  icon: '/assets/egypt/m4_mesjetiu.png',     coords: { left: '50%', top: '38%' } },
  { id: 'egypt_m3',  titleEs: 'Sopdet y Sirio',    color: '#C0E8FF', link: '/course/egypt_m3',  icon: '/assets/egypt/m3_sopdet.png',       coords: { left: '75%', top: '45%' } },

  // Middle-Lower row (Horizon/Pyramids)
  { id: 'egypt_m10', titleEs: 'Daga Espacial',     color: '#B0C4DE', link: '/course/egypt_m10', icon: '/assets/egypt/m10_daga.png',        coords: { left: '12%', top: '55%' } },
  { id: 'egypt_m13', titleEs: '365 Días',          color: '#80D080', link: '/course/egypt_m13', icon: '/assets/egypt/m13_calendario.png',  coords: { left: '38%', top: '52%' } },
  { id: 'egypt_m15', titleEs: 'Ojo Satelital',     color: '#64B5F6', link: '/course/egypt_m15', icon: '/assets/egypt/m15_satelite.png',    coords: { left: '65%', top: '50%' } },
  { id: 'egypt_m8',  titleEs: 'Abu Simbel',        color: '#FF9A3C', link: '/course/egypt_m8',  icon: '/assets/egypt/m8_abu_simbel.png',   coords: { left: '88%', top: '58%' } },

  // Bottom row (Desert foreground)
  { id: 'egypt_m1',  titleEs: 'Nabta Playa',       color: '#D4A843', link: '/course/egypt_m1',  icon: '/assets/egypt/m1_nabta_playa.png',  coords: { left: '22%', top: '80%' } },
  { id: 'egypt_m7',  titleEs: 'Telescopios',       color: '#5EC4A0', link: '/course/egypt_m7',  icon: '/assets/egypt/m7_star_shafts.png',  coords: { left: '48%', top: '75%' } },
  { id: 'egypt_m5',  titleEs: 'Láser de Giza',     color: '#F0A500', link: '/course/egypt_m5',  icon: '/assets/egypt/m5_giza.png',         coords: { left: '72%', top: '80%' } },
  { id: 'egypt_m12', titleEs: 'Obeliscos',         color: '#E8C96A', link: '/course/egypt_m12', icon: '/assets/egypt/m12_obelisco.png',    coords: { left: '92%', top: '82%' } },
];

// ─── Estrellas de fondo animadas ─────────────────────────────────────────
function Stars() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {Array.from({ length: 100 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 60}%`, // Más estrellas en el cielo, menos en la arena
          width: `${Math.random() * 2 + 1}px`,
          height: `${Math.random() * 2 + 1}px`,
          borderRadius: '50%',
          background: 'white',
          background: 'white',
          opacity: Math.random() * 0.7 + 0.3,
          animation: `twinkle ${Math.random() * 4 + 2}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 3}s`,
        }} />
      ))}
    </div>
  );
}

// ─── Efecto del Río Nilo Fluyendo con SVG Displacement ────────────────
function NileRiver() {
  return (
    <div style={{
      position: 'absolute',
      top: 0, bottom: 0, left: 0, right: 0,
      pointerEvents: 'none', zIndex: 2,
      // El río azul en la imagen ocupa aprox. del 28% al 52% del alto
      WebkitMaskImage: 'linear-gradient(to bottom, transparent 28%, black 33%, black 50%, transparent 55%)',
      maskImage: 'linear-gradient(to bottom, transparent 28%, black 33%, black 50%, transparent 55%)'
    }}>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="water-distortion" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.025" numOctaves="3" result="noise">
            <animate attributeName="baseFrequency" values="0.008 0.025; 0.012 0.04; 0.008 0.025" dur="8s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      {/* Misma imagen con exactamente los mismos parámetros que el main */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/assets/egypt/hub_background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        filter: 'url(#water-distortion)',
      }}></div>
    </div>
  );
}

// ─── Lluvia de Cometas ─────────────────────────────────────────────────────
function Comets() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {Array.from({ length: 7 }).map((_, i) => {
        // Evaluate on server
        const width = Math.random() * 80 + 60;
        const top = Math.random() * -30;
        const left = Math.random() * 100;
        const duration = Math.random() * 5 + 3;
        const delay = Math.random() * 8;
        return (
          <div key={i} style={{
            position: 'absolute',
            left: `${left}%`,
            top: `${top}%`,
            width: `${width}px`,
            height: '2px',
            background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(100,200,255,0.8) 20%, rgba(0,0,0,0) 100%)',
            borderRadius: '50%',
            boxShadow: '0 0 10px rgba(255,255,255,0.8)',
            transform: 'rotate(-35deg) scale(0)',
            opacity: 0,
            animation: `shootingStar ${duration}s ease-in infinite`,
            animationDelay: `${delay}s`,
          }} />
        );
      })}
    </div>
  );
}

// ─── Nodo de módulo circular y moderno ────────────────────────────────────
function EgyptModuleNode({ mod, idx, isCompleted, isPlayable }) {
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
          animate={{ y: [0, -8, 0], scale: hovered ? 1.15 : 1 }}
          transition={{
            y: { repeat: Infinity, duration: 4 + Math.random() * 2, ease: 'easeInOut', delay: Math.random() * 2 },
            scale: { duration: 0.2 },
          }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}
        >
          {/* Contenedor Circular de la Imagen con Difuminado */}
          <div style={{
            position: 'relative',
            width: 'clamp(70px, 7vw, 100px)',
            height: 'clamp(70px, 7vw, 100px)',
            borderRadius: '50%',
            boxShadow: hovered 
               ? `0 0 40px ${mod.color}ff, inset 0 0 20px ${mod.color}aa` 
               : `0 0 20px ${mod.color}88`,
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 70%)',
              maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 70%)',
              overflow: 'hidden'
            }}>
              <img
                src={mod.icon}
                alt={mod.titleEs}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: hovered ? 'scale(1.1)' : 'scale(1)',
                  transition: 'transform 0.5s ease',
                }}
              />
              {!hovered && !isPlayable && !isCompleted && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
              )}
            </div>
            {/* Anillo de energía exterior para enmarcar el difuminado */}
            <div style={{
              position: 'absolute',
              inset: '-2px',
              borderRadius: '50%',
              border: `2px solid ${hovered ? 'white' : mod.color + '55'}`,
              opacity: hovered ? 0.8 : 0.3,
              transition: 'all 0.3s ease',
              pointerEvents: 'none'
            }} />
          </div>

          {/* Nombre Moderno */}
          <div style={{
            color: 'white',
            fontSize: 'clamp(0.6rem, 1vw, 0.85rem)',
            textAlign: 'center',
            textShadow: `0 2px 4px ${mod.color}, 0 4px 10px rgba(0,0,0,0.9)`,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: 700,
            lineHeight: 1.2,
            background: 'rgba(0,0,0,0.5)',
            padding: '4px 12px',
            borderRadius: '20px',
            backdropFilter: 'blur(4px)',
            border: `1px solid ${mod.color}55`
          }}>
            {mod.titleEs}
          </div>

          {/* Indicadores de Progreso */}
          {isCompleted && (
            <div style={{ position: 'absolute', top: '0px', right: '0px', background: 'rgba(0,0,0,0.85)', padding: '0.2rem', borderRadius: '50%', border: '2px solid var(--success)', zIndex: 5, boxShadow: '0 0 10px var(--success)' }}>
              <CheckCircle size={18} color="var(--success)" />
            </div>
          )}
          {isPlayable && !isCompleted && (
            <div style={{ position: 'absolute', top: '-10px', right: '-5px', fontSize: '1.4rem', animation: 'pulse 1.5s infinite', zIndex: 5 }}>✨</div>
          )}
        </motion.div>

        {/* Tooltip Dinámico */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10 }}
              style={{
                position: 'absolute',
                top: '120%',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(8, 4, 18, 0.95)',
                backdropFilter: 'blur(12px)',
                border: `1px solid ${mod.color}`,
                padding: '0.8rem 1.2rem',
                borderRadius: '12px',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                boxShadow: `0 8px 32px ${mod.color}66`,
                zIndex: 100,
              }}
            >
              <h4 style={{ margin: 0, fontSize: '1rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{color: mod.color}}>✦</span> {mod.titleEs}
              </h4>
              <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.85rem', color: isCompleted ? 'var(--success)' : 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                {isCompleted ? 'Misión Completada ✅' : 'Iniciar Exploración 🚀'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Link>
  );
}

// ─── Componente Principal del Hub ──────────────────────────────────────────
export default function EgyptAstroHub() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  if (loading || !userData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#04060E', color: '#D4A843', fontFamily: 'sans-serif' }}>
        Iniciando Observatorio de Kemet...
      </div>
    );
  }

  const completedIds = userData?.progress?.completedModules || [];
  const moduleIds = EGYPT_MODULES.map(m => m.id);
  let maxCompletedIdx = -1;
  moduleIds.forEach((id, idx) => {
    if (completedIds.some(c => c.toLowerCase() === id.toLowerCase())) maxCompletedIdx = idx;
  });
  const currentPlayableIdx = maxCompletedIdx + 1;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#04060E' }}>

      {/* ── Botón Volver ── */}
      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 200 }}>
        <Link href="/dashboard" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#FFF',
          textDecoration: 'none', background: 'rgba(0,0,0,0.6)', padding: '0.7rem 1.2rem',
          borderRadius: '30px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)',
          fontSize: '0.9rem', fontWeight: 600, transition: 'all 0.3s',
        }} className="hover:bg-white/10 hover:border-white/50">
          <ChevronLeft size={20} /> Mapa Estelar
        </Link>
      </div>

      {/* ── Título Centralizado ── */}
      <div style={{ position: 'absolute', top: '1.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 200, textAlign: 'center', background: 'rgba(0,0,0,0.5)', padding: '0.5rem 2rem', borderRadius: '40px', backdropFilter: 'blur(5px)' }}>
        <h1 style={{
          margin: 0, fontSize: 'clamp(1rem, 2.5vw, 1.8rem)',
          background: 'linear-gradient(90deg, #D4A843, #F5E6B0, #D4A843)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          textShadow: '0px 2px 10px rgba(0,0,0,0.8)', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 800,
        }}>
          Arqueoastronomía Egipcia
        </h1>
        <p style={{ margin: '0.2rem 0 0', color: '#D4A843', fontSize: 'clamp(0.6rem,1.2vw,0.85rem)', letterSpacing: '2px', fontWeight: 600 }}>
          El Cielo de los Faraones · 15 Misterios Cósmicos
        </p>
      </div>

      {/* ── Canvas Principal (Fondo Panorámico) ── */}
      <main style={{
        flex: 1, position: 'relative', width: '100vw', height: '100vh',
        background: `url('/assets/egypt/hub_background.png') center/cover no-repeat`,
      }}>
        {/* Filtro Oscuro Dinámico (Vignette) */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0.9) 100%)',
          pointerEvents: 'none'
        }} />

        {/* Efectos de Estrellas, Río y Cometas */}
        <Stars />
        <NileRiver />
        <Comets />

        {/* Nodos de los Módulos y Red Estelar */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '1600px', aspectRatio: '16/9', maxHeight: '100vh', margin: '0 auto' }}>
          
          {/* Red de Líneas Estelares (Conectando Módulos) */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.35 }}>
            {/* Conexiones del Cielo */}
            <line x1="15%" y1="15%" x2="35%" y2="10%" stroke="#FFF" strokeWidth="1" strokeDasharray="3 6" />
            <line x1="35%" y1="10%" x2="60%" y2="12%" stroke="#FFF" strokeWidth="1" strokeDasharray="3 6" />
            <line x1="60%" y1="12%" x2="85%" y2="18%" stroke="#FFF" strokeWidth="1" strokeDasharray="3 6" />
            <line x1="35%" y1="10%" x2="50%" y2="28%" stroke="#FFF" strokeWidth="1" strokeDasharray="3 6" />
            <line x1="60%" y1="12%" x2="75%" y2="35%" stroke="#FFF" strokeWidth="1" strokeDasharray="3 6" />

            {/* Conexiones del Horizonte */}
            <line x1="25%" y1="32%" x2="50%" y2="28%" stroke="#FFF" strokeWidth="1" strokeDasharray="3 6" />
            <line x1="50%" y1="28%" x2="75%" y2="35%" stroke="#FFF" strokeWidth="1" strokeDasharray="3 6" />
            
            <line x1="12%" y1="55%" x2="25%" y2="32%" stroke="#FFF" strokeWidth="1" strokeDasharray="3 6" />
            <line x1="38%" y1="52%" x2="50%" y2="28%" stroke="#FFF" strokeWidth="1" strokeDasharray="3 6" />
            <line x1="65%" y1="50%" x2="75%" y2="35%" stroke="#FFF" strokeWidth="1" strokeDasharray="3 6" />
            <line x1="88%" y1="58%" x2="75%" y2="35%" stroke="#FFF" strokeWidth="1" strokeDasharray="3 6" />

            {/* Conexiones de la Arena */}
            <line x1="22%" y1="80%" x2="12%" y2="55%" stroke="#D4A843" strokeWidth="1" strokeDasharray="3 6" />
            <line x1="22%" y1="80%" x2="48%" y2="75%" stroke="#D4A843" strokeWidth="1" strokeDasharray="3 6" />
            <line x1="48%" y1="75%" x2="38%" y2="52%" stroke="#D4A843" strokeWidth="1" strokeDasharray="3 6" />
            <line x1="48%" y1="75%" x2="72%" y2="80%" stroke="#D4A843" strokeWidth="1" strokeDasharray="3 6" />
            <line x1="72%" y1="80%" x2="65%" y2="50%" stroke="#D4A843" strokeWidth="1" strokeDasharray="3 6" />
            <line x1="72%" y1="80%" x2="92%" y2="82%" stroke="#D4A843" strokeWidth="1" strokeDasharray="3 6" />
            <line x1="92%" y1="82%" x2="88%" y2="58%" stroke="#D4A843" strokeWidth="1" strokeDasharray="3 6" />
          </svg>
          {EGYPT_MODULES.map((mod, idx) => (
            <EgyptModuleNode
              key={mod.id}
              mod={mod}
              idx={idx}
              isCompleted={idx <= maxCompletedIdx}
              isPlayable={idx === currentPlayableIdx}
            />
          ))}
        </div>



      </main>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.3); opacity: 1; }
        }
      
        @keyframes waterFlow {
          0% { transform: scaleY(1) translateY(0); filter: hue-rotate(0deg); opacity: 0.5; }
          100% { transform: scaleY(1.05) translateY(10px); filter: hue-rotate(15deg); opacity: 0.9; }
        }
        @keyframes shootingStar { 
          0% { transform: translate(0, 0) rotate(-35deg) scale(0); opacity: 0; } 
          10% { opacity: 1; transform: translate(-50px, 35px) rotate(-35deg) scale(1); }
          30% { opacity: 0; transform: translate(-300px, 210px) rotate(-35deg) scale(0.2); } 
          100% { opacity: 0; transform: translate(-300px, 210px) rotate(-35deg) scale(0); } 
        }
      `}</style>
    </div>
  );
}
