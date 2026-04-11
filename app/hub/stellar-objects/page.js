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

export default function StellarObjectsMap() {
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

  // Orden estricto de las Anomalías Cósmicas
  const planetOrder = ['black_hole', 'quasar', 'pulsar', 'red_dwarf', 'white_dwarf', 'wormhole'];

  // Coordenadas orgánicas distribuidas a lo largo del "Canvas" de la galaxia profunda
  const orbitalData = {
    black_hole: { left: '30%', top: '50%', size: 'clamp(150px, 20vw, 300px)' },
    quasar: { left: '70%', top: '25%', size: 'clamp(90px, 12vw, 180px)' },
    pulsar: { left: '85%', top: '75%', size: 'clamp(70px, 10vw, 140px)' },
    red_dwarf: { left: '15%', top: '20%', size: 'clamp(50px, 8vw, 120px)' },
    white_dwarf: { left: '50%', top: '80%', size: 'clamp(30px, 5vw, 80px)' },
    wormhole: { left: '55%', top: '40%', size: 'clamp(120px, 16vw, 240px)' }
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
      
      <main style={{ 
        flex: 1, position: 'relative', width: '100vw', height: '100vh', 
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', 
        background: 'url(https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=2560&auto=format&fit=crop) center center / cover' 
      }}>
        
        {/* Contenedor del Mapa 16:9 Máximo */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '1600px', aspectRatio: '16/9', maxHeight: '90vh' }}>
           
           {orderedModules.map((mod, idx) => {
              const coords = orbitalData[mod.id.toLowerCase()];
              if (!coords) return null;

              const isCompleted = idx <= maxCompletedIdx;
              const isPlayable = idx === currentPlayableIdx;
              const isLocked = idx > currentPlayableIdx;
              
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
function IsolatedPlanetNode({ moduleInfo, idx, coords, isCompleted, isPlayable, isLocked, customHref }) {
  const [hovered, setHovered] = useState(false);
  
  // Archivo gráfico individual
  const imgUrl = `/assets/${moduleInfo.id.toLowerCase()}_icon.png`;

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
          {/* La Anomalía Estelar NATIVAMENTE Transparente con Filtro Screen */}
          <motion.img 
            src={imgUrl} 
            alt={moduleInfo.titleEs} 
            animate={{ rotate: 360 }}
            transition={{ duration: 80 + (idx * 20), ease: "linear", repeat: Infinity }}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain',
              mixBlendMode: 'normal', /* Se removió el screen porque ya se pre-procesaron como PNGs nativos Alfa */
              filter: planetFilter,
              opacity: planetOpacity,
              transition: 'all 0.5s ease',
              borderRadius: '50%'
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
