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

export default function SolarSystemMap() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const [modules, setModules] = useState([]);

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  useEffect(() => {
    async function loadData() {
      const q = collection(db, "modules");
      const snap = await getDocs(q);
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Orden de fallback si algo falla, pero usaremos el orden canónico del S.S. abajo
      setModules(data);
    }
    loadData();
  }, []);

  if (loading || !userData || modules.length === 0) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a1a', color: 'white' }}>Iniciando HUD Orbital...</div>;
  }

  // Orden estricto del Sistema Solar (IDs exactos de Firebase)
  const planetOrder = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];

  // Coordenadas orgánicas distribuidas a lo largo del "Canvas" de la galaxia
  const orbitalData = {
    mercury: { left: '18%', top: '55%', size: 'clamp(40px, 5vw, 70px)' },
    venus: { left: '28%', top: '35%', size: 'clamp(50px, 6vw, 90px)' },
    earth: { left: '38%', top: '65%', size: 'clamp(55px, 6.5vw, 95px)' },
    mars: { left: '48%', top: '40%', size: 'clamp(45px, 5vw, 80px)' },
    jupiter: { left: '60%', top: '50%', size: 'clamp(90px, 12vw, 170px)' },
    saturn: { left: '72%', top: '25%', size: 'clamp(110px, 14vw, 200px)' },
    uranus: { left: '85%', top: '60%', size: 'clamp(70px, 8vw, 120px)' },
    neptune: { left: '92%', top: '30%', size: 'clamp(65px, 7.5vw, 110px)' },
    pluto: { left: '96%', top: '80%', size: 'clamp(35px, 4vw, 60px)' }
  };

  // Determinar Índice de Progreso
  let maxCompletedIdx = -1;
  const completedIds = userData?.progress?.completedModules || [];
  planetOrder.forEach((p, idx) => {
      // Find original strictly matching casing if needed, but db ids are usually lowercase
      const isDone = completedIds.some(cid => cid.toLowerCase() === p);
      if (isDone) maxCompletedIdx = Math.max(maxCompletedIdx, idx);
  });
  
  // El usuario puede explorar hasta el siguiente planeta no completado
  // (Para demostración o admin, podrías sobrescribir esto, pero aquí aplicamos "Niebla" estricta)
  const currentPlayableIdx = maxCompletedIdx + 1;

  // Filtrar los modulos a sólo los 9 ordenados
  const orderedModules = planetOrder.map(pid => modules.find(m => m.id.toLowerCase() === pid)).filter(Boolean);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#0a0a1a' }}>
      
      {/* Botón Flotante */}
      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 100 }}>
         <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'white', textDecoration: 'none', background: 'rgba(0,0,0,0.5)', padding: '0.8rem 1.2rem', borderRadius: '30px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <ChevronLeft size={24} /> Volver al Catálogo
         </Link>
      </div>
      
      <main style={{ flex: 1, position: 'relative', width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'url(/assets/spiral_galaxy_bg.png) center center / cover' }}>
        
        {/* Contenedor del Mapa 16:9 Máximo */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '1600px', aspectRatio: '16/9', maxHeight: '90vh' }}>
           
           {/* El Sol Masivo Generado por IA */}
           <motion.div 
             animate={{ rotate: 360 }} 
             transition={{ duration: 250, repeat: Infinity, ease: "linear" }}
             style={{ 
               position: 'absolute', 
               left: '-25%', 
               top: '-15%', 
               height: '130%', 
               aspectRatio: '1/1', 
               pointerEvents: 'none',
               zIndex: 0
             }} 
           >
             <img 
               src="/assets/cartoon_sun.png" 
               style={{ 
                 width: '100%', 
                 height: '100%', 
                 objectFit: 'cover', 
                 opacity: 0.9,
               }} 
             />
           </motion.div>

           {orderedModules.map((mod, idx) => {
              const coords = orbitalData[mod.id.toLowerCase()];
              if (!coords) return null;

              const isCompleted = idx <= maxCompletedIdx;
              const isPlayable = idx === currentPlayableIdx;
              const isLocked = idx > currentPlayableIdx;
              
              // Niebla de Guerra: Si está muy por delante, es invisible. Si es el SIGUIENTE bloqueado, es sombra.
              // Para ser fieles a la Niebla, haremos TODO lo bloqueado como sombras oscuras.
              
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

           {/* El Nuevo Exoplaneta Arcade / Minijuegos */}
           <IsolatedPlanetNode 
              key="arcade"
              moduleInfo={{ id: 'arcade', titleEs: 'Recreativos (Arcade)', color: '#FF00FF' }} 
              idx={100}
              coords={{ left: '15%', top: '85%', size: 'clamp(60px, 7vw, 100px)' }} 
              isCompleted={false} 
              isPlayable={true}
              isLocked={false}
              customHref="/hub/arcade"
           />

        </div>

      </main>
    </div>
  );
}

// Componente Independiente Flotante (Botón 2D)
function IsolatedPlanetNode({ moduleInfo, idx, coords, isCompleted, isPlayable, isLocked, customHref }) {
  const [hovered, setHovered] = useState(false);
  
  // Archivo gráfico individual
  const imgUrl = `/assets/cartoon_${moduleInfo.id.toLowerCase()}.png`;

  // El estilo de misterio: En lugar de saturar de sombras físicas que causan los cuadros negros, 
  // hacemos el planeta fantasmal/borroso cuando está inexplorado.
  const planetFilter = isLocked ? 'grayscale(80%) blur(2px) contrast(1.5)' : 'contrast(1.2)';
  const planetOpacity = isLocked ? 0.3 : 1;

  const targetLink = isLocked ? '#' : (customHref || `/course/${moduleInfo.id}`);

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
          {/* El Planeta Crudo NATIVAMENTE Transparente */}
          <img 
            src={imgUrl} 
            alt={moduleInfo.titleEs} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain',
              filter: planetFilter,
              opacity: planetOpacity,
              transition: 'all 0.5s ease'
            }} 
          />
          <div style={{
             fontFamily: 'var(--font-quantico)',
             color: isLocked ? 'rgba(255,255,255,0.4)' : 'white',
             fontSize: 'clamp(0.6rem, 1vw, 1rem)',
             textShadow: '0 2px 10px rgba(0,0,0,0.9)',
             textTransform: 'uppercase',
             letterSpacing: '1px'
          }}>
             {isLocked ? '?????' : moduleInfo.titleEs}
          </div>

          {/* Indicadores flotantes encima del planeta visual */}
          {isLocked && <div style={{ position: 'absolute', padding: '0.4rem', borderRadius: '50%' }}><Lock size={28} color="rgba(255,255,255,0.8)" /></div>}
          {isCompleted && <div style={{ position: 'absolute', bottom: '-10px', right: '-10px', background: 'rgba(0,0,0,0.8)', padding: '0.2rem', borderRadius: '50%', border: '1px solid var(--success)' }}><CheckCircle size={20} color="var(--success)" /></div>}
          {isPlayable && !isCompleted && !isLocked && <div style={{ position: 'absolute', top: '-15px', right: '-15px', padding: '0.2rem', animation: 'pulse 2s infinite' }}>✨</div>}

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
                boxShadow: `0 10px 30px ${isLocked ? 'rgba(0,0,0,0.8)' : moduleInfo.color + '40'}`
              }}
            >
               <h4 style={{ margin: 0, fontSize: '1.1rem', color: isLocked ? 'gray' : 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 {isLocked ? '?????' : (moduleInfo.id === 'arcade' ? 'Zona Arcade' : `Misión ${moduleInfo.titleEs}`)}
               </h4>
               <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.85rem', color: isCompleted ? 'var(--success)' : (isLocked ? 'var(--text-muted)' : 'var(--electric-blue)') }}>
                 {isLocked ? 'Espacio Inexplorado 🔒' : (moduleInfo.id === 'arcade' ? '¡Minijuegos Activos! 👾' : (isCompleted ? `Aterrizaje Exitoso ⭐` : 'Misión de Exploración Activa 🚀'))}
               </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Link>
  );
}
