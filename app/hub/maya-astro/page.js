'use client';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Módulos del curso ─────────────────────────────────────────────────────
const MAYA_MODULES = [
  // Top row (Sky - Milky Way)
  { id: 'maya_m9',  titleEs: 'Wakah Chan',        color: '#2980B9', link: '/course/maya_m9',  icon: '/assets/maya/maya_m9.png',  coords: { left: '10%', top: '18%' } },
  { id: 'maya_m7',  titleEs: 'Venus',             color: '#8E44AD', link: '/course/maya_m7',  icon: '/assets/maya/maya_m7.png',  coords: { left: '32%', top: '12%' } },
  { id: 'maya_m8',  titleEs: 'Eclipses',          color: '#111111', link: '/course/maya_m8',  icon: '/assets/maya/maya_m8.png',  coords: { left: '55%', top: '15%' } },
  
  // Middle-Upper row (Horizon/Pyramid top)
  { id: 'maya_m10', titleEs: 'Pléyades',          color: '#8E44AD', link: '/course/maya_m10', icon: '/assets/maya/maya_m10.png', coords: { left: '22%', top: '33%' } },
  { id: 'maya_m15', titleEs: 'Códice Dresde',     color: '#1A5F7A', link: '/course/maya_m15', icon: '/assets/maya/maya_m15.png', coords: { left: '45%', top: '28%' } },
  { id: 'maya_m14', titleEs: 'Edzná Cenit',       color: '#F39C12', link: '/course/maya_m14', icon: '/assets/maya/maya_m14.png', coords: { left: '70%', top: '32%' } },
  { id: 'maya_m4',  titleEs: 'Tzolk\'in',         color: '#4A90E2', link: '/course/maya_m4',  icon: '/assets/maya/maya_m4.png',  coords: { left: '88%', top: '40%' } },

  // Middle-Lower row (Jungle/Ruins)
  { id: 'maya_m11', titleEs: 'Palenque',          color: '#27AE60', link: '/course/maya_m11', icon: '/assets/maya/maya_m11.png', coords: { left: '8%', top: '52%' } },
  { id: 'maya_m2',  titleEs: 'Kukulcán',          color: '#8E2B2B', link: '/course/maya_m2',  icon: '/assets/maya/maya_m2.png',  coords: { left: '35%', top: '48%' } },
  { id: 'maya_m3',  titleEs: 'Haab',              color: '#D3882C', link: '/course/maya_m3',  icon: '/assets/maya/maya_m3.png',  coords: { left: '60%', top: '52%' } },
  { id: 'maya_m13', titleEs: 'Uaxactún',          color: '#F39C12', link: '/course/maya_m13', icon: '/assets/maya/maya_m13.png', coords: { left: '82%', top: '60%' } },

  // Bottom row (Foreground)
  { id: 'maya_m6',  titleEs: '7 Muñecas',         color: '#F1C40F', link: '/course/maya_m6',  icon: '/assets/maya/maya_m6.png',  coords: { left: '20%', top: '75%' } },
  { id: 'maya_m1',  titleEs: 'El Caracol',        color: '#1A5F7A', link: '/course/maya_m1',  icon: '/assets/maya/maya_m1.png',  coords: { left: '48%', top: '68%' } },
  { id: 'maya_m5',  titleEs: 'Rueda Calendárica', color: '#E65100', link: '/course/maya_m5',  icon: '/assets/maya/maya_m5.png',  coords: { left: '72%', top: '75%' } },
  { id: 'maya_m12', titleEs: 'Copán',             color: '#E74C3C', link: '/course/maya_m12', icon: '/assets/maya/maya_m12.png', coords: { left: '92%', top: '82%' } },
];

// ─── Estrellas de fondo animadas ─────────────────────────────────────────
function Stars() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {Array.from({ length: 150 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 50}%`, // Más estrellas en el cielo
          width: `${Math.random() * 2 + 1}px`,
          height: `${Math.random() * 2 + 1}px`,
          borderRadius: '50%',
          background: 'white',
          opacity: Math.random() * 0.7 + 0.3,
          animation: `twinkle ${Math.random() * 4 + 2}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 3}s`,
        }} />
      ))}
    </div>
  );
}

// ─── Lluvia de Cometas ─────────────────────────────────────────────────────
function Comets() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {Array.from({ length: 5 }).map((_, i) => {
        const width = Math.random() * 80 + 60;
        const top = Math.random() * 25; // Solo en el 25% superior de la pantalla (cielo)
        const left = (Math.random() * 40) - 20; // Empiezan desde la izquierda o ligeramente fuera
        const duration = Math.random() * 5 + 4;
        const delay = Math.random() * 10;
        return (
          <div key={i} style={{
            position: 'absolute',
            left: `${left}%`,
            top: `${top}%`,
            width: `${width}px`,
            height: '2px',
            background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(100,255,150,0.8) 20%, rgba(0,0,0,0) 100%)',
            borderRadius: '50%',
            boxShadow: '0 0 10px rgba(255,255,255,0.8)',
            transform: 'rotate(15deg) scale(0)',
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
function MayaModuleNode({ mod, idx, isCompleted, isPlayable }) {
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
            {/* Anillo de energía exterior */}
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
            fontWeight: hovered ? 'bold' : '600',
            transition: 'all 0.3s ease',
            whiteSpace: 'nowrap',
            background: 'rgba(0,0,0,0.3)',
            padding: '4px 10px',
            borderRadius: '12px',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            border: `1px solid ${hovered ? mod.color : 'transparent'}`,
          }}>
            {mod.titleEs}
          </div>

          {/* Sello de Completado */}
          {isCompleted && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              style={{
                position: 'absolute',
                top: -8, right: -8,
                background: '#4CAF50',
                borderRadius: '50%',
                padding: '4px',
                boxShadow: '0 0 10px #4CAF50',
                zIndex: 10,
              }}
            >
              <CheckCircle size={16} color="white" />
            </motion.div>
          )}

          {/* Partículas al hacer hover */}
          <AnimatePresence>
            {hovered && (
              <>
                {Array.from({ length: 4 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                    animate={{ 
                      opacity: 0, 
                      scale: Math.random() * 1.5 + 0.5,
                      x: (Math.random() - 0.5) * 60,
                      y: (Math.random() - 0.5) * 60
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 + Math.random(), ease: "easeOut" }}
                    style={{
                      position: 'absolute',
                      width: 6, height: 6,
                      borderRadius: '50%',
                      background: mod.color,
                      top: '50%', left: '50%',
                      boxShadow: `0 0 8px ${mod.color}`,
                      pointerEvents: 'none'
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </Link>
  );
}

// ─── Estilos Globales para animaciones ─────────────────────────────────────
const globalStyles = `
@keyframes twinkle {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.5); boxShadow: 0 0 8px rgba(255,255,255,0.8); }
}
@keyframes shootingStar {
  0% { transform: rotate(15deg) translateX(0) scale(1); opacity: 1; }
  15% { transform: rotate(15deg) translateX(1500px) scale(0); opacity: 0; }
  100% { transform: rotate(15deg) translateX(1500px) scale(0); opacity: 0; }
}
@keyframes floatUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes fireFlicker {
  0% { opacity: 0.8; transform: scale(0.9) translateY(0); filter: drop-shadow(0 0 5px rgba(255,123,0,0.8)); }
  25% { opacity: 1; transform: scale(1.1) translateY(-1px); filter: drop-shadow(0 0 12px rgba(255,69,0,0.9)); }
  50% { opacity: 0.9; transform: scale(0.95) translateY(0); filter: drop-shadow(0 0 6px rgba(255,123,0,0.8)); }
  75% { opacity: 1; transform: scale(1.05) translateY(-2px); filter: drop-shadow(0 0 15px rgba(255,69,0,1)); }
  100% { opacity: 0.8; transform: scale(0.9) translateY(0); filter: drop-shadow(0 0 5px rgba(255,123,0,0.8)); }
}
`;

// ─── Antorchas Lejanas en Pirámides ────────────────────────────────────────
function JungleTorches() {
  // Posiciones calculadas para alinearse con los puntos de luz de la imagen real
  const torches = [
    // Ruinas en primer plano (inferior izquierda)
    { left: '26.5%', top: '86.5%', size: 5, delay: 0.1 },
    // Luces lejanas en la jungla (izquierda)
    { left: '18.5%', top: '64%', size: 3, delay: 0.4 },
    { left: '41%', top: '63%', size: 3, delay: 0.7 },
    // Bases de las pirámides (horizonte)
    { left: '55.5%', top: '46.5%', size: 4, delay: 0.2 },
    { left: '64.5%', top: '48.5%', size: 4, delay: 0.8 },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
      {torches.map((t, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: t.left,
          top: t.top,
          width: `${t.size}px`,
          height: `${t.size}px`,
          background: 'radial-gradient(circle, #fff7a1 0%, #ff7b00 40%, #ff2a00 80%, transparent 100%)',
          borderRadius: '50%',
          animation: `fireFlicker ${0.4 + Math.random() * 0.4}s infinite alternate`,
          animationDelay: `${t.delay}s`,
          mixBlendMode: 'screen'
        }} />
      ))}
    </div>
  );
}

export default function MayaHub() {
  const { user, progress } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const completedModules = progress?.completedModules || [];
  
  // En lógica normal de curso, se desbloquea si el anterior está completo.
  // Aquí los mostramos todos interactivos para la demo.
  const getPlayableState = (idx) => true;

  if (!mounted) return null;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#050a12' }}>
      <style>{globalStyles}</style>

      {/* Imagen de Fondo (Pirámide Maya y Selva) */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/assets/maya/maya_hub_bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        filter: 'brightness(0.9) contrast(1.1)',
        zIndex: 0
      }} />

      {/* Capa de atmósfera selvática / niebla sutil en la parte inferior */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,30,10,0.8) 0%, rgba(5,20,30,0.2) 40%, rgba(0,0,0,0) 100%)',
        pointerEvents: 'none', zIndex: 0
      }} />

      {/* Estrellas, Cometas y Antorchas Lejanas */}
      <Stars />
      <Comets />
      <JungleTorches />

      {/* Header UI - Botón Volver y Título */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        padding: '2rem', zIndex: 100, pointerEvents: 'none'
      }}>
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/dashboard')}
          style={{
            pointerEvents: 'auto',
            background: 'rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            borderRadius: '30px',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
            fontFamily: 'var(--font-heading)'
          }}
        >
          <ChevronLeft size={20} />
          Volver a la Academia
        </motion.button>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'right' }}
        >
          <h1 style={{
            color: 'white',
            margin: 0,
            fontSize: '3rem',
            textShadow: '0 0 20px rgba(46, 204, 113, 0.6), 0 0 40px rgba(46, 204, 113, 0.4)',
            letterSpacing: '2px',
            fontFamily: 'var(--font-heading)',
            pointerEvents: 'auto'
          }}>
            Arqueoastronomía Maya
          </h1>
          <p style={{
            color: '#a0e8bc',
            margin: '0.5rem 0 0 0',
            fontSize: '1.2rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.8)'
          }}>
            Misterios de la Selva Estelar
          </p>
        </motion.div>
      </div>

      {/* Renderizado de Módulos (Nodos) */}
      {MAYA_MODULES.map((mod, idx) => (
        <MayaModuleNode
          key={mod.id}
          mod={mod}
          idx={idx}
          isPlayable={getPlayableState(idx)}
          isCompleted={completedModules.includes(mod.id)}
        />
      ))}

      {/* UI Inferior - Progreso */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.7)',
        border: '1px solid rgba(46, 204, 113, 0.3)',
        padding: '1rem 2.5rem',
        borderRadius: '40px',
        backdropFilter: 'blur(10px)',
        zIndex: 100,
        boxShadow: '0 0 30px rgba(0,0,0,0.8), inset 0 0 20px rgba(46, 204, 113, 0.1)',
        display: 'flex', alignItems: 'center', gap: '1.5rem',
      }}>
        <div style={{ color: 'white', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>
          Misiones Completadas:
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '0.5rem 1.5rem',
          borderRadius: '20px',
          color: '#2ecc71',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          textShadow: '0 0 10px rgba(46, 204, 113, 0.5)'
        }}>
          {completedModules.filter(m => m.startsWith('maya_')).length} / {MAYA_MODULES.length}
        </div>
      </div>
    </div>
  );
}
