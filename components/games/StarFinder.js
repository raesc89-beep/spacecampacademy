'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle, AlertCircle } from 'lucide-react';

const CHALLENGES = [
  {
    riddle: "1. TORMENTA EN ROJO: Un rover marciano ha quedado enterrado bajo la arena carmesí. Búscalo cerca del horizonte pálido.",
    imageUrl: "/assets/mars_dust_storm.png",
    targetX: 85, targetY: 45, radius: 10
  },
  {
    riddle: "2. NEBULOSA EN SOMBRAS: Entre los densos polvos, busca un peculiar punto anómalo azul celeste cerca de la esquina inferior derecha.",
    imageUrl: "/assets/finder_nebula.png",
    targetX: 85, targetY: 80, radius: 10
  },
  {
    riddle: "3. CAOS CINTURÓN: Miles de rocas orbitan sin control. Encuentra una roca brillante que destaca magnéticamente en el cuadrante superior izquierdo.",
    imageUrl: "/assets/finder_asteroid.png",
    targetX: 15, targetY: 20, radius: 10
  },
  {
    riddle: "4. NÚCLEO GALÁCTICO: En el ruidoso y destellante polvo espiral, ubica el nodo de energía pura concentrada cerca del centro denso.",
    imageUrl: "/assets/finder_galaxy.png",
    targetX: 50, targetY: 50, radius: 10
  },
  {
    riddle: "5. HORIZONTE DE SUCESOS: La luz se dobla. Busca el fotón refractado justo en el ecuador derecho, a punto de cruzar el espaguetizado.",
    imageUrl: "/assets/black_hole_event_horizon.png",
    targetX: 80, targetY: 50, radius: 10
  }
];

export default function StarFinder({ onComplete }) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [clickDrops, setClickDrops] = useState([]); // Visual feedback on click
  const [status, setStatus] = useState('searching'); // 'searching', 'found', 'transitioning'

  const CHALLENGE = CHALLENGES[currentLevel];

  const handleClick = (e) => {
    if (status !== 'searching') return;
    
    // Bounds tracking
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Visual ping
    setClickDrops(prev => [...prev, { id: Date.now(), x, y }]);

    // Distance calc
    const dx = x - CHALLENGE.targetX;
    const dy = y - CHALLENGE.targetY;
    const distance = Math.sqrt(dx*dx + dy*dy);

    if (distance <= CHALLENGE.radius) {
       setStatus('found');
       setTimeout(() => {
          if (currentLevel + 1 < CHALLENGES.length) {
             setStatus('transitioning');
             setTimeout(() => {
                setCurrentLevel(currentLevel + 1);
                setStatus('searching');
                setClickDrops([]);
             }, 800);
          } else {
             if (onComplete) onComplete(150); // Winner
          }
       }, 2000);
    }
  };

  return (
    <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.6)', borderRadius: '20px', border: '1px solid #FF450050' }}>
      
      <header style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <h3 style={{ margin: 0, color: '#FF4500', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
           <Search /> Buscador Cósmico Optico
        </h3>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginTop: '1rem' }}>
           {CHALLENGES.map((_, i) => (
              <div key={i} style={{ width: '30px', height: '6px', background: i <= currentLevel ? '#FF4500' : 'rgba(255, 69, 0, 0.2)', borderRadius: '3px' }}/>
           ))}
        </div>

        <p style={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem', marginTop: '1.5rem', background: 'rgba(255, 69, 0, 0.1)', padding: '1rem', borderRadius: '10px' }}>
          {CHALLENGE.riddle}
        </p>
      </header>

      {/* RENDER BOX */}
      <div style={{ position: 'relative', width: '100%', borderRadius: '10px', overflow: 'hidden', cursor: status === 'searching' ? 'crosshair' : 'default', border: '2px solid rgba(255, 69, 0, 0.5)' }}>
         <AnimatePresence mode="wait">
            <motion.img 
              key={currentLevel}
              src={CHALLENGE.imageUrl} 
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              draggable="false"
              onDragStart={(e) => e.preventDefault()}
              style={{ width: '100%', display: 'block', pointerEvents: 'none' }} 
              alt="Terreno Espacial" 
            />
         </AnimatePresence>
         
         <div onClick={handleClick} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
            {status !== 'searching' && (
               <motion.div 
                 initial={{ scale: 0 }} animate={{ scale: 1 }}
                 style={{ 
                   position: 'absolute', top: `${CHALLENGE.targetY}%`, left: `${CHALLENGE.targetX}%`, transform: 'translate(-50%, -50%)',
                   width: '40px', height: '40px', border: '3px solid #00ff88', borderRadius: '50%', boxShadow: '0 0 20px #00ff88',
                   display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,255,136,0.3)'
                 }}
               >
                 <CheckCircle color="#00ff88" />
               </motion.div>
            )}

            <AnimatePresence>
               {clickDrops.map(drop => (
                  <motion.div 
                    key={drop.id}
                    initial={{ scale: 0, opacity: 1 }} animate={{ scale: 2, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}
                    style={{
                      position: 'absolute', top: `${drop.y}%`, left: `${drop.x}%`, transform: 'translate(-50%, -50%)',
                      width: '40px', height: '40px', border: '2px solid rgba(255, 69, 0, 0.8)', borderRadius: '50%', pointerEvents: 'none'
                    }}
                  />
               ))}
            </AnimatePresence>
         </div>
      </div>
      
    </div>
  );
}
