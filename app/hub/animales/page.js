'use client';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import HubDecorations from '@/components/HubDecorations';

import { COURSE_DATA } from '@/lib/courseData';

export default function AnimalesHub() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const [modules, setModules] = useState([]);

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  useEffect(() => {
    async function loadData() {
      setModules(COURSE_DATA);
    }
    loadData();
  }, []);

  if (loading || !userData || modules.length === 0) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a1a', color: 'white' }}>Iniciando HUD Orbital...</div>;
  }

  // Orden estricto del curso
  const courseOrder = ['animales_intro', 'animales_mamiferos', 'animales_albert_ham', 'animales_laika', 'animales_gatos'];

  // Coordenadas orgánicas distribuidas 
  const orbitalData = {
    animales_intro: { left: '20%', top: '50%', size: 'clamp(80px, 9vw, 120px)', img: '/assets/animales/hub_intro.png' },
    animales_mamiferos: { left: '35%', top: '30%', size: 'clamp(90px, 10vw, 140px)', img: '/assets/animales/hub_mamiferos.png' },
    animales_albert_ham: { left: '55%', top: '70%', size: 'clamp(100px, 11vw, 150px)', img: '/assets/animales/hub_albert_ham.png' },
    animales_laika: { left: '75%', top: '25%', size: 'clamp(110px, 12vw, 160px)', img: '/assets/animales/hub_laika.png' },
    animales_gatos: { left: '90%', top: '60%', size: 'clamp(80px, 9vw, 130px)', img: '/assets/animales/hub_gatos.png' }
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#0a0a1a' }}>
      
      {/* Botón Flotante */}
      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 100 }}>
         <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'white', textDecoration: 'none', background: 'rgba(0,0,0,0.5)', padding: '0.8rem 1.2rem', borderRadius: '30px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <ChevronLeft size={24} /> Volver al Catálogo
         </Link>
      </div>
      
      <main style={{ 
        flex: 1, position: 'relative', width: '100vw', height: '100vh', 
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', 
        background: 'url(https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=2560&auto=format&fit=crop) center center / cover' 
      }}>
        
        <HubDecorations />

        {/* Contenedor del Mapa 16:9 Máximo */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '1600px', aspectRatio: '16/9', maxHeight: '90vh' }}>
           
           {orderedModules.map((mod, idx) => {
              const coords = orbitalData[mod.id.toLowerCase()];
              if (!coords) return null;

              const isCompleted = idx <= maxCompletedIdx;
              const isPlayable = idx === currentPlayableIdx;
              const isLocked = (userData?.role !== 'admin') && (idx > currentPlayableIdx);
              
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
  const planetOpacity = isLocked ? 0.3 : 1;

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
             y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: idx * 0.5 }, 
             scale: { duration: 0.2 } 
           }}
           style={{ 
             width: '100%', 
             height: '100%', 
             position: 'relative',
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center',
             justifyContent: 'center',
             gap: '0.5rem'
           }}
        >
          {/* Avatar Circular del Animal Puro */}
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: `drop-shadow(0 0 20px ${isLocked ? 'transparent' : moduleInfo.color + '80'})`
          }}>
            <motion.img 
              src={imgUrl} 
              alt={moduleInfo.titleEs} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                filter: planetFilter,
                opacity: planetOpacity,
                transition: 'all 0.5s ease'
              }} 
            />
          </div>

          <div style={{
             fontFamily: 'var(--font-quantico)',
             color: isLocked ? 'rgba(255,255,255,0.4)' : 'white',
             fontSize: 'clamp(0.6rem, 1vw, 1rem)',
             textShadow: '0 2px 10px rgba(0,0,0,0.9)',
             textTransform: 'uppercase',
             letterSpacing: '1px',
             position: 'absolute',
             bottom: '-30px',
             whiteSpace: 'nowrap'
          }}>
             {isLocked ? '?????' : moduleInfo.titleEs}
          </div>

          {/* Indicadores flotantes encima del planeta visual */}
          {isLocked && <div style={{ position: 'absolute', padding: '0.4rem', borderRadius: '50%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}><Lock size={40} color="rgba(255,255,255,0.8)" /></div>}
          {isCompleted && <div style={{ position: 'absolute', bottom: '-5px', right: '-5px', background: 'rgba(0,0,0,0.8)', padding: '0.2rem', borderRadius: '50%', border: '1px solid var(--success)' }}><CheckCircle size={28} color="var(--success)" /></div>}
          {isPlayable && !isCompleted && !isLocked && <div style={{ position: 'absolute', top: '-15px', right: '-15px', padding: '0.2rem', animation: 'pulse 2s infinite', fontSize: '1.5rem' }}>✨</div>}

        </motion.div>

        {/* Tooltip Hover (Información Mágica) */}
        <AnimatePresence>
          {hovered && (
            <motion.div 
              initial={{ opacity: 0, y: 15, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              style={{
                position: 'absolute',
                top: '120%',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(4, 6, 14, 0.9)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${isLocked ? 'rgba(255,255,255,0.1)' : moduleInfo.color}`,
                padding: '0.8rem 1.2rem',
                borderRadius: '12px',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                boxShadow: `0 10px 30px ${isLocked ? 'rgba(0,0,0,0.8)' : moduleInfo.color + '40'}`,
                zIndex: 100
              }}
            >
               <h4 style={{ margin: 0, fontSize: '1.1rem', color: isLocked ? 'gray' : 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 {isLocked ? '?????' : `Misión ${moduleInfo.titleEs}`}
               </h4>
               <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.85rem', color: isCompleted ? 'var(--success)' : (isLocked ? 'var(--text-muted)' : 'var(--electric-blue)') }}>
                 {isLocked ? 'Espacio Inexplorado 🔒' : (isCompleted ? `Aterrizaje Exitoso ⭐` : 'Misión de Exploración Activa 🚀')}
               </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Link>
  );
}
