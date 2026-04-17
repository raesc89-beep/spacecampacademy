'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle, AlertCircle } from 'lucide-react';

const CHALLENGES = [
  {
    riddle: "1. IGNICIÓN: El poderoso R-7 vuela hacia las estrellas despidiendo fuego. Localiza el ardiente motor del cohete.",
    imageUrl: "/assets/animales/laika_challenge_1.png", 
    targetX: 50, 
    targetY: 70, // Exhaust is usually at the bottom
    radius: 40 
  },
  {
    riddle: "2. ÓRBITA SOLITARIA: Laika orbita silenciosamente dentro de la fría cápsula metálica. ¿Dónde se encuentra el Sputnik sobre el horizonte?",
    imageUrl: "/assets/animales/laika_challenge_2.png", 
    targetX: 50, 
    targetY: 40, // Capsule usually central/upper
    radius: 40 
  },
  {
    riddle: "3. EL LEGADO ETERNO: En bronce heroico, su memoria vive. Señala el rostro de la valiente Laika en el monumento.",
    imageUrl: "/assets/animales/laika_challenge_3.png", 
    targetX: 50, 
    targetY: 40, // Face usually upper center
    radius: 40 
  }
];

export default function LaikaFinder({ onComplete }) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const CHALLENGE = CHALLENGES[Math.min(currentLevel, CHALLENGES.length - 1)];
  const [gameOver, setGameOver] = useState(false);
  const [clickDrops, setClickDrops] = useState([]);

  const handleClick = (e) => {
    if (gameOver) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const dropId = Date.now();
    setClickDrops(prev => [...prev, { id: dropId, x, y }]);
    setTimeout(() => {
       setClickDrops(prev => prev.filter(d => d.id !== dropId));
    }, 1000);

    const dist = Math.sqrt(Math.pow(x - CHALLENGE.targetX, 2) + Math.pow(y - CHALLENGE.targetY, 2));

    if (dist <= CHALLENGE.radius) {
      setGameOver(true);
      setTimeout(() => {
        if (currentLevel + 1 < CHALLENGES.length) {
          setCurrentLevel(prev => prev + 1);
          setGameOver(false);
          setClickDrops([]);
        } else {
          if (onComplete) onComplete(100);
        }
      }, 2000);
    }
  };

  return (
    <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.6)', borderRadius: '20px', border: '1px solid rgba(255, 184, 0, 0.3)' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h3 style={{ margin: 0, color: 'var(--gold-star)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
           <Search /> Radar Táctico Canino
        </h3>
        
        <div style={{ marginTop: '1rem', padding: '1.5rem', background: 'rgba(255, 184, 0, 0.1)', borderRadius: '12px', borderLeft: '4px solid var(--gold-star)' }}>
           <p style={{ margin: 0, fontStyle: 'italic', fontSize: '1.1rem', color: 'white' }}>
             « {CHALLENGE.riddle} »
           </p>
        </div>
      </header>

      {gameOver && (
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
          <CheckCircle size={32} />
          <h2 style={{ margin: 0 }}>
            {currentLevel + 1 === CHALLENGES.length ? '¡Misión Completa!' : '¡Objetivo Confirmado! Analizando Siguiente Sector...'}
          </h2>
        </motion.div>
      )}

      <div style={{ position: 'relative', width: '100%', borderRadius: '15px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.2)', cursor: gameOver ? 'default' : 'crosshair', minHeight: '300px', background: '#000' }}>
         <img 
           src={CHALLENGE.imageUrl} 
           draggable="false"
           onDragStart={(e) => e.preventDefault()}
           style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', pointerEvents: 'none' }} 
           alt="Laika en el Espacio" 
         />
         
         <div 
           onClick={handleClick} 
           style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} 
         >
            {gameOver && (
               <motion.div 
                 initial={{ scale: 0 }} animate={{ scale: 1 }}
                 style={{ 
                   position: 'absolute', top: `${CHALLENGE.targetY}%`, left: `${CHALLENGE.targetX}%`, transform: 'translate(-50%, -50%)',
                   width: '70px', height: '70px', border: '3px solid #00ff88', borderRadius: '50%', boxShadow: '0 0 20px #00ff88',
                   display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,255,136,0.2)'
                 }}
               >
                 <AlertCircle color="#00ff88" />
               </motion.div>
            )}

            <AnimatePresence>
               {clickDrops.map(drop => (
                  <motion.div 
                    key={drop.id}
                    initial={{ scale: 0, opacity: 1 }} animate={{ scale: 2, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}
                    style={{
                      position: 'absolute', top: `${drop.y}%`, left: `${drop.x}%`, transform: 'translate(-50%, -50%)',
                      width: '40px', height: '40px', border: '2px solid white', borderRadius: '50%', pointerEvents: 'none'
                    }}
                  />
               ))}
            </AnimatePresence>
         </div>
      </div>
      
    </div>
  );
}
