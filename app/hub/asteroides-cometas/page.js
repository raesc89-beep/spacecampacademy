'use client';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, CheckCircle, ChevronLeft, Rocket } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import { COURSE_DATA } from '@/lib/courseData';

export default function AsteroidsHub() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const modules = COURSE_DATA;

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  

  if (loading || !userData || modules.length === 0) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a1a', color: 'white' }}>Inicializando Campo de Asteroides...</div>;
  }

  // Orden estricto del curso
  const courseOrder = ['asteroides_intro', 'asteroides_meteoros', 'asteroides_cometas', 'asteroides_sondas', 'asteroides_apophis'];

  const orbitalData = {
    asteroides_intro: { left: '15%', top: '40%', size: 'clamp(100px, 12vw, 180px)', img: '/assets/asteroides/hub_intro_vector.png' },
    asteroides_meteoros: { left: '35%', top: '25%', size: 'clamp(120px, 14vw, 200px)', img: '/assets/asteroides/hub_meteoros_vector.png' },
    asteroides_cometas: { left: '55%', top: '65%', size: 'clamp(130px, 15vw, 220px)', img: '/assets/asteroides/hub_cometas_vector.png' },
    asteroides_sondas: { left: '75%', top: '30%', size: 'clamp(140px, 16vw, 240px)', img: '/assets/asteroides/hub_sondas_vector.png' },
    asteroides_apophis: { left: '85%', top: '70%', size: 'clamp(110px, 14vw, 200px)', img: '/assets/asteroides/hub_apophis_vector.png' }
  };

  // Determinar Índice de Progreso
  let maxCompletedIdx = -1;
  const completedIds = userData?.progress?.completedModules || [];
  courseOrder.forEach((p, idx) => {
      const isDone = completedIds.some(cid => cid.toLowerCase() === p);
      if (isDone) maxCompletedIdx = Math.max(maxCompletedIdx, idx);
  });
  
  const currentPlayableIdx = maxCompletedIdx + 1;

  // Filtrar los modulos a sólo los 5 ordenados
  const orderedModules = courseOrder.map(pid => modules.find(m => m.id.toLowerCase() === pid)).filter(Boolean);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#050a15' }}>
      
      {/* Estrellas Estáticas */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', background: 'transparent', backgroundImage: 'radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 40px 70px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 50px 160px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 90px 40px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 130px 80px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 160px 120px, #ffffff, rgba(0,0,0,0))', backgroundRepeat: 'repeat', backgroundSize: '200px 200px' }}></div>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', background: 'transparent', backgroundImage: 'radial-gradient(1px 1px at 10px 10px, rgba(255,255,255,0.5), rgba(0,0,0,0)), radial-gradient(1px 1px at 150px 150px, rgba(255,255,255,0.5), rgba(0,0,0,0))', backgroundRepeat: 'repeat', backgroundSize: '150px 150px' }}></div>
      
      {/* Nebulosa Decorativa */}
      <div style={{ position: 'absolute', top: '10%', right: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(40px)', pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(50px)', pointerEvents: 'none' }}></div>

      {/* Planetas Decorativos Lejanos */}
      <div style={{ position: 'absolute', top: '15%', right: '5%', width: '150px', height: '150px', borderRadius: '50%', background: 'linear-gradient(135deg, #1e3a8a, #0f172a)', boxShadow: 'inset -20px -20px 40px rgba(0,0,0,0.8), 0 0 20px rgba(30,58,138,0.5)', opacity: 0.6 }}></div>
      <div style={{ position: 'absolute', bottom: '15%', left: '5%', width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c2d12, #450a0a)', boxShadow: 'inset -10px -10px 20px rgba(0,0,0,0.8)', opacity: 0.5 }}></div>

      {/* Botón Flotante */}
      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 100 }}>
         <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'white', textDecoration: 'none', background: 'rgba(0,0,0,0.5)', padding: '0.8rem 1.2rem', borderRadius: '30px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <ChevronLeft size={24} /> Volver al Catálogo
         </Link>
      </div>
      
      <main style={{ 
        flex: 1, position: 'relative', width: '100vw', height: '100vh', 
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' 
      }}>
        
        {/* Contenedor del Mapa 16:9 Máximo */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '1600px', aspectRatio: '16/9', maxHeight: '90vh' }}>
           
           {orderedModules.map((mod, idx) => {
              const coords = orbitalData[mod.id.toLowerCase()];
              if (!coords) return null;

              const isCompleted = idx <= maxCompletedIdx;
              const isPlayable = idx === currentPlayableIdx;
              const isLocked = false; // Bypass total remoto
              
              return (
                <IsolatedPlanetNode 
                   key={mod.id}
                   moduleInfo={mod} 
                   idx={idx}
                   coords={coords} 
                   isCompleted={isCompleted} 
                   isPlayable={isPlayable}
                   isLocked={isLocked}
                />
              );
           })}

        </div>
      </main>
    </div>
  );
}

// Componente Independiente Flotante (Botón 2D)
function IsolatedPlanetNode({ moduleInfo, idx, coords, isCompleted, isPlayable, isLocked }) {
  const [hovered, setHovered] = useState(false);
  
  const imgUrl = coords.img;

  const planetFilter = isLocked ? 'grayscale(80%) blur(2px) contrast(1.5)' : 'contrast(1.2)';
  const planetOpacity = isLocked ? 0.4 : 1;

  const targetLink = isLocked ? '#' : `/course/${moduleInfo.id}`;

  return (
    <Link href={targetLink} passHref>
      <div 
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ 
          position: 'absolute', 
          left: coords.left, 
          top: coords.top, 
          width: coords.size, 
          height: coords.size, 
          transform: 'translate(-50%, -50%)', 
          cursor: isLocked ? 'not-allowed' : 'pointer',
          zIndex: hovered ? 50 : (10 + idx)
        }}
      >
        <motion.div 
           animate={{ 
             y: isLocked ? 0 : [0, -10, 0], // Levitación suave si está desbloqueado
             scale: hovered && !isLocked ? 1.15 : 1
           }}
           transition={{ 
             y: { repeat: Infinity, duration: 4 + (idx % 3), ease: 'easeInOut' },
             scale: { type: 'spring', stiffness: 300 }
           }}
           style={{ width: '100%', height: '100%', position: 'relative' }}
        >
          {/* Sombra Brillante (Glow) detrás del planeta si está completado o jugable */}
          {!isLocked && (
            <div style={{ position: 'absolute', top: '10%', left: '10%', right: '10%', bottom: '10%', borderRadius: '50%', background: moduleInfo.color, filter: 'blur(20px)', opacity: hovered ? 0.8 : 0.4, transition: 'opacity 0.3s' }}></div>
          )}

          {/* Render del Planeta / Botón Visual */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div style={{
            width: '100%', height: '100%', 
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: `0 0 25px ${isLocked ? 'rgba(255,255,255,0.1)' : moduleInfo.color + 'aa'}`,
            position: 'absolute', top: 0, left: 0,
            zIndex: 2,
            mixBlendMode: 'multiply'
          }}>
             <img 
               src={imgUrl} 
               alt={moduleInfo.titleEs}
               style={{ 
                 width: '100%', 
                 height: '100%', 
                 objectFit: 'contain',
                 filter: planetFilter, 
                 opacity: planetOpacity
               }}
               draggable="false"
             />
          </div>

          {/* Anillos de pulsación (Jugable) */}
          {isPlayable && !hovered && (
             <motion.div 
               animate={{ scale: [1, 1.3], opacity: [0.6, 0] }}
               transition={{ repeat: Infinity, duration: 1.5 }}
               style={{ position: 'absolute', top: '-10%', left: '-10%', right: '-10%', bottom: '-10%', borderRadius: '50%', border: `3px solid ${moduleInfo.color}`, zIndex: 1 }}
             />
          )}

          {/* Badge "Completado" */}
          {isCompleted && (
            <div style={{ position: 'absolute', bottom: '-5%', right: '-5%', background: 'var(--success)', borderRadius: '50%', padding: '0.4rem', border: '3px solid #000', zIndex: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <CheckCircle size={28} color="#000" />
            </div>
          )}
          
          {/* Candado "Bloqueado" */}
          {isLocked && (
             <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0,0,0,0.6)', borderRadius: '50%', padding: '1rem', backdropFilter: 'blur(4px)', zIndex: 5 }}>
                <Lock size={32} color="rgba(255,255,255,0.5)" />
             </div>
          )}
        </motion.div>

        {/* Tooltip de Info */}
        <AnimatePresence>
          {hovered && (
             <motion.div 
               initial={{ opacity: 0, y: 10, scale: 0.9 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               exit={{ opacity: 0, y: 10, scale: 0.9 }}
               style={{ 
                 position: 'absolute', top: '110%', left: '50%', translateX: '-50%',
                 background: 'rgba(10, 15, 30, 0.95)', border: `2px solid ${moduleInfo.color}`,
                 padding: '1rem', borderRadius: '12px', minWidth: '240px',
                 backdropFilter: 'blur(10px)', color: 'white', display: 'flex', flexDirection: 'column', gap: '0.5rem', pointerEvents: 'none', zIndex: 100, textAlign: 'center'
               }}
             >
                <div style={{ fontSize: '0.8rem', color: moduleInfo.color, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Misión {idx + 1}</div>
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{moduleInfo.titleEs}</h3>
                <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>{isLocked ? 'Comienza las misiones previas para debloquear esta etapa.' : 'Haz clic para entrar a explorar.'}</div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Link>
  );
}
