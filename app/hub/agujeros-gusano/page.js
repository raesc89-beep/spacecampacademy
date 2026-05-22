'use client';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef, useMemo } from 'react';

// ─── Componente 3D WebGL del Agujero de Gusano ──────────────────────────────
function WormholeTunnel() {
  const meshRef = useRef();
  
  const tubeGeo = useMemo(() => {
    class CustomCurve extends THREE.Curve {
      getPoint(t, optionalTarget = new THREE.Vector3()) {
        const x = Math.cos(t * Math.PI * 2) * 2;
        const y = Math.sin(t * Math.PI * 2) * 2;
        const z = t * 100 - 50;
        return optionalTarget.set(x, y, z);
      }
    }
    const path = new CustomCurve();
    return new THREE.TubeGeometry(path, 100, 3, 30, false);
  }, []);

  useFrame((state, delta) => {
    meshRef.current.position.z = (state.clock.elapsedTime * 15) % 100;
    meshRef.current.rotation.z += delta * 0.2;
  });

  return (
    <mesh ref={meshRef} geometry={tubeGeo}>
      <meshBasicMaterial 
        color="#00FFCC" 
        wireframe={true} 
        transparent={true} 
        opacity={0.3}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

function Wormhole3D() {
  return (
    <Canvas camera={{ position: [0, 0, 0], fov: 90 }}>
      <WormholeTunnel />
    </Canvas>
  );
}

import { motion, AnimatePresence } from 'framer-motion';

// ─── Módulos del curso Agujeros de Gusano ─────────────────────────────────────
const WORMHOLE_MODULES = [
  { id: 'wormhole_m1', titleEs: 'Puente ER I', color: '#00FFCC', link: '/course/wormhole_m1', icon: '/assets/badges/gusano_badge.png', coords: { left: '15%', top: '20%' } },
  { id: 'wormhole_m2', titleEs: 'Puente ER II', color: '#00FFCC', link: '/course/wormhole_m2', icon: '/assets/badges/gusano_badge.png', coords: { left: '30%', top: '15%' } },
  { id: 'wormhole_m3', titleEs: 'Historia I', color: '#00FFCC', link: '/course/wormhole_m3', icon: '/assets/badges/gusano_badge.png', coords: { left: '50%', top: '12%' } },
  { id: 'wormhole_m4', titleEs: 'Historia II', color: '#00FFCC', link: '/course/wormhole_m4', icon: '/assets/badges/gusano_badge.png', coords: { left: '70%', top: '15%' } },
  { id: 'wormhole_m5', titleEs: 'Propiedades I', color: '#00FFCC', link: '/course/wormhole_m5', icon: '/assets/badges/gusano_badge.png', coords: { left: '85%', top: '25%' } },
  
  { id: 'wormhole_m6', titleEs: 'Propiedades II', color: '#00E4FF', link: '/course/wormhole_m6', icon: '/assets/badges/gusano_badge.png', coords: { left: '20%', top: '40%' } },
  { id: 'wormhole_m7', titleEs: '¿Cómo funciona? I', color: '#00E4FF', link: '/course/wormhole_m7', icon: '/assets/badges/gusano_badge.png', coords: { left: '40%', top: '35%' } },
  { id: 'wormhole_m8', titleEs: '¿Cómo funciona? II', color: '#00E4FF', link: '/course/wormhole_m8', icon: '/assets/badges/gusano_badge.png', coords: { left: '60%', top: '35%' } },
  { id: 'wormhole_m9', titleEs: '¿Qué pasa si caigo? I', color: '#00E4FF', link: '/course/wormhole_m9', icon: '/assets/badges/gusano_badge.png', coords: { left: '80%', top: '45%' } },

  { id: 'wormhole_m10', titleEs: '¿Qué pasa si caigo? II', color: '#9933FF', link: '/course/wormhole_m10', icon: '/assets/badges/gusano_badge.png', coords: { left: '15%', top: '65%' } },
  { id: 'wormhole_m11', titleEs: 'Teorías Modernas I', color: '#9933FF', link: '/course/wormhole_m11', icon: '/assets/badges/gusano_badge.png', coords: { left: '35%', top: '60%' } },
  { id: 'wormhole_m12', titleEs: 'Teorías Modernas II', color: '#9933FF', link: '/course/wormhole_m12', icon: '/assets/badges/gusano_badge.png', coords: { left: '55%', top: '60%' } },
  { id: 'wormhole_m13', titleEs: 'Paradoja Temporal', color: '#9933FF', link: '/course/wormhole_m13', icon: '/assets/badges/gusano_badge.png', coords: { left: '75%', top: '70%' } },
  
  { id: 'wormhole_m14', titleEs: 'Contacto I', color: '#FF00FF', link: '/course/wormhole_m14', icon: '/assets/badges/gusano_badge.png', coords: { left: '40%', top: '85%' } },
  { id: 'wormhole_m15', titleEs: 'Contacto II', color: '#FF00FF', link: '/course/wormhole_m15', icon: '/assets/badges/gusano_badge.png', coords: { left: '60%', top: '85%' } },
];

function Stars() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {Array.from({ length: 150 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 3}px`,
          height: `${Math.random() * 3}px`,
          borderRadius: '50%',
          background: Math.random() > 0.5 ? '#00FFCC' : '#FFFFFF',
          opacity: Math.random() * 0.7 + 0.3,
          animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 2}s`,
        }} />
      ))}
    </div>
  );
}

function WormholeNode({ mod, idx, isCompleted, isPlayable }) {
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
          animate={{ y: [0, -10, 0], scale: hovered ? 1.15 : 1 }}
          transition={{
            y: { repeat: Infinity, duration: 3 + Math.random() * 2, ease: 'easeInOut', delay: Math.random() * 2 },
            scale: { duration: 0.2 },
          }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}
        >
          <div style={{
            position: 'relative',
            width: 'clamp(60px, 6vw, 90px)',
            height: 'clamp(60px, 6vw, 90px)',
            borderRadius: '50%',
            boxShadow: hovered 
               ? `0 0 35px ${mod.color}ff, inset 0 0 15px ${mod.color}aa` 
               : `0 0 15px ${mod.color}88`,
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.8)'
          }}>
            <img
              src={mod.icon}
              alt={mod.titleEs}
              style={{
                width: '80%',
                height: '80%',
                objectFit: 'contain',
                transform: hovered ? 'scale(1.1)' : 'scale(1)',
                transition: 'transform 0.5s ease',
                filter: isCompleted ? 'brightness(1.2)' : 'brightness(0.7)'
              }}
            />
            {!hovered && !isPlayable && !isCompleted && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', borderRadius: '50%' }} />
            )}
            <div style={{
              position: 'absolute',
              inset: '-2px',
              borderRadius: '50%',
              border: `2px solid ${hovered ? 'white' : mod.color + '55'}`,
              opacity: hovered ? 1 : 0.5,
              transition: 'all 0.3s ease',
              pointerEvents: 'none'
            }} />
          </div>

          <div style={{
            color: 'white',
            fontSize: 'clamp(0.6rem, 0.9vw, 0.8rem)',
            textAlign: 'center',
            textShadow: `0 2px 4px ${mod.color}`,
            textTransform: 'uppercase',
            fontWeight: 700,
            background: 'rgba(0,0,0,0.7)',
            padding: '4px 10px',
            borderRadius: '20px',
            backdropFilter: 'blur(4px)',
            border: `1px solid ${mod.color}55`,
            whiteSpace: 'nowrap'
          }}>
            {idx + 1}. {mod.titleEs}
          </div>

          {isCompleted && (
            <div style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'rgba(0,0,0,0.9)', padding: '2px', borderRadius: '50%', border: '2px solid var(--success)', zIndex: 5 }}>
              <CheckCircle size={18} color="var(--success)" />
            </div>
          )}
          {isPlayable && !isCompleted && (
            <div style={{ position: 'absolute', top: '-10px', right: '-5px', fontSize: '1.4rem', animation: 'pulse 1.5s infinite', zIndex: 5 }}>💫</div>
          )}
        </motion.div>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10 }}
              style={{
                position: 'absolute', top: '120%', left: '50%', transform: 'translateX(-50%)',
                background: 'rgba(5, 5, 15, 0.95)', backdropFilter: 'blur(12px)',
                border: `1px solid ${mod.color}`, padding: '0.8rem 1.2rem',
                borderRadius: '12px', whiteSpace: 'nowrap', pointerEvents: 'none',
                boxShadow: `0 8px 32px ${mod.color}66`, zIndex: 100,
              }}
            >
              <h4 style={{ margin: 0, fontSize: '1rem', color: 'white' }}><span style={{color: mod.color}}>✦</span> {mod.titleEs}</h4>
              <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.85rem', color: isCompleted ? 'var(--success)' : mod.color, fontWeight: 600 }}>
                {isCompleted ? 'Atajo Cruzado ✅' : 'Entrar al Agujero 🌀'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Link>
  );
}

export default function WormholeHub() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  if (loading || !userData) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020308', color: '#00FFCC' }}>Conectando a la red espaciotemporal...</div>;
  }

  const completedIds = userData?.progress?.completedModules || [];
  const moduleIds = WORMHOLE_MODULES.map(m => m.id);
  let maxCompletedIdx = -1;
  moduleIds.forEach((id, idx) => {
    if (completedIds.some(c => c.toLowerCase() === id.toLowerCase())) maxCompletedIdx = idx;
  });
  const currentPlayableIdx = maxCompletedIdx + 1;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#020308' }}>
      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 200 }}>
        <Link href="/dashboard/misiones" className="btn-secondary" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'rgba(0,0,0,0.6)', padding: '0.7rem 1.2rem',
          borderRadius: '30px', backdropFilter: 'blur(10px)', border: '1px solid rgba(0, 255, 204, 0.3)',
          color: '#00FFCC'
        }}>
          <ChevronLeft size={20} /> Base de Misiones
        </Link>
      </div>

      <div style={{ position: 'absolute', top: '1.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 200, textAlign: 'center', background: 'rgba(0,0,0,0.7)', padding: '0.6rem 2.5rem', borderRadius: '40px', border: '1px solid #00FFCC' }}>
        <h1 style={{
          margin: 0, fontSize: 'clamp(1rem, 2.5vw, 1.8rem)',
          color: '#00FFCC', textShadow: '0 0 20px rgba(0, 255, 204, 0.8)',
          letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 900
        }}>
          Agujeros de Gusano
        </h1>
        <p style={{ margin: '0.2rem 0 0', color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
          El Puente Einstein-Rosen
        </p>
      </div>

      <main style={{
        flex: 1, position: 'relative', width: '100vw', height: '100vh',
        background: `url('/assets/dashboard/agujeros_gusano_cover.png') center/cover no-repeat`,
        overflow: 'hidden'
      }}>
        {/* WebGL 3D Wormhole Effect */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Wormhole3D />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 10%, rgba(0,0,0,0.9) 100%)', pointerEvents: 'none', zIndex: 1 }} />
        
        <Stars />

        {/* Nodes and SVG Lines */}
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: '1600px', margin: '0 auto', zIndex: 2 }}>
          
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.4 }}>
            <defs>
              <linearGradient id="wormholeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00FFCC" />
                <stop offset="50%" stopColor="#00E4FF" />
                <stop offset="100%" stopColor="#9933FF" />
              </linearGradient>
            </defs>
            <polyline 
              points="15%,20% 30%,15% 50%,12% 70%,15% 85%,25% 80%,45% 60%,35% 40%,35% 20%,40% 15%,65% 35%,60% 55%,60% 75%,70% 60%,85% 40%,85%" 
              fill="none" 
              stroke="url(#wormholeGrad)" 
              strokeWidth="2" 
              strokeDasharray="6 8" 
            />
          </svg>

          {WORMHOLE_MODULES.map((mod, idx) => (
            <WormholeNode
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
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.3); opacity: 1; }
        }
        @keyframes wormholeSpin {
          0% { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
          50% { transform: translate(-50%, -50%) rotate(180deg) scale(1.1); }
          100% { transform: translate(-50%, -50%) rotate(360deg) scale(1); }
        }
      `}</style>
    </div>
  );
}
