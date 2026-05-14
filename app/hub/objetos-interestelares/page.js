'use client';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Lock, CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import HubDecorations from '@/components/HubDecorations';
import { COURSE_DATA } from '@/lib/courseData';
import { useEffect, useState } from 'react';

export default function ObjetosInterestelaresHub() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const modules = COURSE_DATA;

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  if (loading || !userData || modules.length === 0) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a1a', color: 'white' }}>Iniciando Sensores de Espacio Profundo...</div>;
  }

  // Orden estricto de los módulos
  const planetOrder = ['interestelar_m1', 'interestelar_m2', 'interestelar_m3', 'interestelar_m4', 'interestelar_m5', 'interestelar_m6'];

  // Coordenadas orgánicas distribuidas a lo largo del Canvas
  const orbitalData = {
    'interestelar_m1': { left: '20%', top: '45%', size: 'clamp(70px, 9vw, 120px)', imgUrl: '/assets/interestelar/obj1.png' },
    'interestelar_m2': { left: '33%', top: '65%', size: 'clamp(60px, 8vw, 100px)', imgUrl: '/assets/interestelar/oumuamua.png' },
    'interestelar_m3': { left: '46%', top: '45%', size: 'clamp(70px, 9vw, 110px)', imgUrl: '/assets/interestelar/borisov.png' },
    'interestelar_m4': { left: '59%', top: '25%', size: 'clamp(75px, 9.5vw, 120px)', imgUrl: '/assets/interestelar/atlas.png' },
    'interestelar_m5': { left: '72%', top: '45%', size: 'clamp(65px, 8.5vw, 105px)', imgUrl: '/assets/interestelar/oort.png' },
    'interestelar_m6': { left: '85%', top: '65%', size: 'clamp(70px, 9vw, 120px)', imgUrl: '/assets/interestelar/voyager.png' }
  };

  // Determinar Índice de Progreso
  let maxCompletedIdx = -1;
  const completedIds = userData?.progress?.completedModules || [];
  planetOrder.forEach((p, idx) => {
      const isDone = completedIds.some(cid => cid.toLowerCase() === p);
      if (isDone) maxCompletedIdx = Math.max(maxCompletedIdx, idx);
  });
  
  // El usuario puede explorar hasta el siguiente planeta no completado
  const currentPlayableIdx = maxCompletedIdx + 1;

  // Filtrar los modulos
  const orderedModules = planetOrder.map(pid => modules.find(m => m.id.toLowerCase() === pid)).filter(Boolean);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#0a0a1a' }}>
      
      {/* Botón Flotante */}
      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 100 }}>
         <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'white', textDecoration: 'none', background: 'rgba(0,0,0,0.5)', padding: '0.8rem 1.2rem', borderRadius: '30px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <ChevronLeft size={24} /> Volver al Catálogo
         </Link>
      </div>

      {/* Titulo Central */}
      <div style={{
        position: 'absolute', top: '2rem', left: '50%', transform: 'translateX(-50%)',
        zIndex: 200, textAlign: 'center',
        background: 'rgba(0,0,0,0.6)', padding: '0.8rem 2.5rem',
        borderRadius: '40px', backdropFilter: 'blur(8px)',
        border: '1px solid rgba(0, 228, 255, 0.4)',
      }}>
        <h1 style={{
          margin: 0, fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
          background: 'linear-gradient(90deg, #00E4FF, #00FF88, #00E4FF)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 800,
        }}>
          Objetos Interestelares
        </h1>
        <p style={{ margin: '0.3rem 0 0', color: 'rgba(255,255,255,0.8)', fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Viajeros de las Estrellas
        </p>
      </div>
      
      {/* Nave tipo Sonda en Movimiento de Fondo */}
      <motion.img 
        src="/assets/shuttle_user.png" 
        alt="Sonda Exploradora"
        animate={{ x: ['-20vw', '120vw'], y: ['20vh', '5vh', '15vh', '-10vh'], rotate: [10, 5, 10] }}
        transition={{ repeat: Infinity, duration: 55, ease: "linear" }}
        style={{ position: 'absolute', top: '30%', left: 0, width: '40px', zIndex: 1, pointerEvents: 'none', filter: 'drop-shadow(0 0 10px rgba(0,228,255,0.6)) grayscale(50%)' }}
      />

      <main style={{ 
        flex: 1, position: 'relative', width: '100vw', height: '100vh', 
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', 
        background: 'url(https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=2560&auto=format&fit=crop) center center / cover' 
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%)', zIndex: 1 }} />
        
        {/* Galaxia Giratoria en el Centro */}
        <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '55vw', height: '55vw', maxWidth: '800px', maxHeight: '800px',
            pointerEvents: 'none', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}>
          <motion.img
            src="/assets/interestelar/galaxy_spin.png"
            alt="Spinning Galaxy"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 150, ease: "linear" }}
            style={{
              width: '100%', height: '100%', objectFit: 'contain',
              mixBlendMode: 'screen', opacity: 0.85,
              filter: 'contrast(1.1) brightness(1.1)',
            }}
          />
        </div>

        <HubDecorations />

        {/* Contenedor del Mapa 16:9 Máximo */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '1600px', aspectRatio: '16/9', maxHeight: '90vh', zIndex: 3 }}>
           
           {/* Conexiones Orgánicas */}
           <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2, opacity: 0.3 }}>
             {orderedModules.map((mod, i) => {
               if (i === orderedModules.length - 1) return null;
               const nextMod = orderedModules[i + 1];
               const currentCoords = orbitalData[mod.id.toLowerCase()];
               const nextCoords = orbitalData[nextMod.id.toLowerCase()];
               if (!currentCoords || !nextCoords) return null;
               
               // Renderizar líneas punteadas cian
               return (
                 <line key={i} x1={currentCoords.left} y1={currentCoords.top} x2={nextCoords.left} y2={nextCoords.top} stroke="#00E4FF" strokeWidth="2" strokeDasharray="6 6" />
               );
             })}
           </svg>

           {orderedModules.map((mod, idx) => {
              const coords = orbitalData[mod.id.toLowerCase()];
              if (!coords) return null;

              const isCompleted = idx <= maxCompletedIdx;
              const isPlayable = idx === currentPlayableIdx;
              const isLocked = false; // Bypass total para pruebas
              
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

        {/* Bottom CTA - Progress Indicator */}
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.7)',
          border: '1px solid rgba(0, 228, 255, 0.4)',
          padding: '1rem 2.5rem',
          borderRadius: '40px',
          backdropFilter: 'blur(10px)',
          zIndex: 200,
          boxShadow: '0 0 30px rgba(0,0,0,0.8), inset 0 0 20px rgba(0, 228, 255, 0.1)',
          display: 'flex', alignItems: 'center', gap: '1.5rem',
        }}>
          <div style={{ color: 'white', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>
            Misiones Completadas:
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '0.5rem 1.5rem',
            borderRadius: '20px',
            color: '#00E4FF',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            textShadow: '0 0 10px rgba(0, 228, 255, 0.5)'
          }}>
            {completedIds.filter(id => id.startsWith('interestelar')).length} / {planetOrder.length}
          </div>
        </div>

      </main>
    </div>
  );
}

// Componente Independiente Flotante (Botón 2D)
function IsolatedPlanetNode({ moduleInfo, idx, coords, isCompleted, isPlayable, isLocked }) {
  const [hovered, setHovered] = useState(false);
  const imgUrl = coords.imgUrl;

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
             y: isLocked ? 0 : [0, -10, 0],
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
          {/* Imagen del Módulo con borde circular suave para que parezcan ventanas/lentes */}
          <div style={{
            width: '100%', height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            border: `2px solid ${hovered ? '#00E4FF' : 'rgba(255,255,255,0.2)'}`,
            boxShadow: hovered ? '0 0 20px rgba(0,228,255,0.8)' : '0 0 10px rgba(0,0,0,0.8)',
            transition: 'all 0.3s ease',
          }}>
            <motion.img 
              src={imgUrl} 
              alt={moduleInfo.title} 
              animate={{ rotate: 0 }}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                filter: planetFilter,
                opacity: planetOpacity,
                transition: 'all 0.5s ease',
              }} 
            />
          </div>
          
          <div style={{
             fontFamily: 'var(--font-quantico)',
             color: isLocked ? 'rgba(255,255,255,0.4)' : 'white',
             fontSize: 'clamp(0.65rem, 1.2vw, 1rem)',
             textShadow: '0 2px 10px rgba(0,0,0,0.9)',
             textTransform: 'uppercase',
             letterSpacing: '1px',
             background: 'rgba(0,0,0,0.6)',
             padding: '4px 12px',
             borderRadius: '20px',
             backdropFilter: 'blur(4px)',
             border: `1px solid ${hovered ? '#00E4FF' : 'rgba(255,255,255,0.1)'}`,
             whiteSpace: 'nowrap',
             position: 'absolute',
             bottom: '-30px',
          }}>
             {isLocked ? '?????' : moduleInfo.title}
          </div>

          {/* Indicadores flotantes */}
          {isLocked && <div style={{ position: 'absolute', padding: '0.4rem', borderRadius: '50%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}><Lock size={28} color="rgba(255,255,255,0.8)" /></div>}
          {isCompleted && <div style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'rgba(0,0,0,0.8)', padding: '0.2rem', borderRadius: '50%', border: '1px solid var(--success)' }}><CheckCircle size={20} color="var(--success)" /></div>}
          {isPlayable && !isCompleted && !isLocked && <div style={{ position: 'absolute', top: '-15px', right: '-15px', padding: '0.2rem', animation: 'pulse 2s infinite' }}>✨</div>}

        </motion.div>

        {/* Tooltip Hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div 
              initial={{ opacity: 0, y: 15, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              style={{
                position: 'absolute',
                top: '140%',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(4, 6, 14, 0.95)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${isLocked ? 'rgba(255,255,255,0.1)' : '#00E4FF'}`,
                padding: '0.8rem 1.4rem',
                borderRadius: '14px',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                boxShadow: `0 10px 30px ${isLocked ? 'rgba(0,0,0,0.8)' : 'rgba(0,228,255,0.4)'}`
              }}
            >
               <h4 style={{ margin: 0, fontSize: '1rem', color: isLocked ? 'gray' : 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 {isLocked ? '?????' : `Objeto: ${moduleInfo.title}`}
               </h4>
               <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.85rem', color: isCompleted ? 'var(--success)' : (isLocked ? 'var(--text-muted)' : '#00E4FF') }}>
                 {isLocked ? 'Espacio Inexplorado 🔒' : (isCompleted ? `Aterrizaje Exitoso ⭐` : 'Analizando Anomalía 🚀')}
               </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Link>
  );
}
