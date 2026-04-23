'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle, AlertCircle, Radar } from 'lucide-react';

const CHALLENGES = [
  {
    riddle: "1. CALLES DE MOSCÚ: En este denso día de invierno en los años 50 en Rusia, busca a la perrita callejera blanca y marrón (Laika).",
    imageUrl: "/assets/animales/laika_challenge_1.png", 
    targetX: 45, targetY: 55, radius: 40 
  },
  {
    riddle: "2. ÓRBITA TERRESTRE: Encuentra la cápsula cónica Sputnik 2 entre la basura espacial.",
    imageUrl: "/assets/animales/laika_challenge_2.png", 
    targetX: 75, targetY: 25, radius: 35 
  },
  {
    riddle: "3. COMANDO SOVIÉTICO: Entre los científicos y las gigantescas computadoras retro, localiza un pequeño casco espacial canino con una estrella roja.",
    imageUrl: "/assets/animales/laika_challenge_3.png", 
    targetX: 20, targetY: 80, radius: 35 
  },
  {
    riddle: "4. BOSQUE SIBERIANO: La cápsula ha aterrizado en la nieve profunda. Busca el paracaídas de aterrizaje rojo y blanco escondido en las ramas.",
    imageUrl: "/assets/animales/laika_challenge_4.png", 
    targetX: 80, targetY: 80, radius: 35 
  },
  {
    riddle: "5. PLAZA ROJA: Durante el gran desfile de la victoria, alguien dejó caer un hueso de oro macizo. ¡Encuéntralo entre la multitud!",
    imageUrl: "/assets/animales/laika_challenge_5.png", 
    targetX: 50, targetY: 85, radius: 35 
  }
];

export default function LaikaFinder({ onComplete }) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const CHALLENGE = CHALLENGES[Math.min(currentLevel, CHALLENGES.length - 1)];
  const [gameOver, setGameOver] = useState(false);
  const [clickDrops, setClickDrops] = useState([]);
  const [showHelp, setShowHelp] = useState(false);

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
      setShowHelp(false);
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

  const activateSonar = () => {
    setShowHelp(true);
    setTimeout(() => setShowHelp(false), 2000);
  };

  return (
    <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.6)', borderRadius: '20px', border: '1px solid rgba(255, 184, 0, 0.3)' }}>
      <header style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <h3 style={{ margin: 0, color: 'var(--gold-star)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
           <Search /> Radar de Observación Profunda ({currentLevel + 1}/5)
        </h3>
        
        <div style={{ marginTop: '1rem', padding: '1.5rem', background: 'rgba(255, 184, 0, 0.1)', borderRadius: '12px', borderLeft: '4px solid var(--gold-star)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <p style={{ margin: 0, fontStyle: 'italic', fontSize: '1.1rem', color: 'white', flex: 1, textAlign: 'left' }}>
             « {CHALLENGE.riddle} »
           </p>
           <button onClick={activateSonar} disabled={showHelp || gameOver} style={{ background: 'rgba(255, 184, 0, 0.2)', border: '1px solid var(--gold-star)', color: 'var(--gold-star)', padding: '0.8rem 1.5rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
             <Radar size={18} /> Asistencia Sonar
           </button>
        </div>
      </header>

      {gameOver && (
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
          <CheckCircle size={32} />
          <h2 style={{ margin: 0 }}>
            {currentLevel + 1 === CHALLENGES.length ? '¡Misión Completa!' : '¡Objetivo Encontrado! Siguiente Desafío...'}
          </h2>
        </motion.div>
      )}

      <div style={{ position: 'relative', width: '100%', borderRadius: '15px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.2)', cursor: gameOver ? 'default' : 'crosshair', minHeight: '300px', background: '#000' }}>
         <img 
           src={CHALLENGE.imageUrl} 
           draggable="false"
           onDragStart={(e) => e.preventDefault()}
           style={{ width: '100%', height: 'auto', display: 'block', pointerEvents: 'none' }} 
           alt={`Reto Laika ${currentLevel + 1}`} 
         />
         
         <div 
           onClick={handleClick} 
           style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} 
         >
            {/* Sonar Help Circle */}
            <AnimatePresence>
               {showHelp && !gameOver && (
                  <motion.div 
                    initial={{ scale: 2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ duration: 0.5 }}
                    style={{
                      position: 'absolute', top: `${CHALLENGE.targetY}%`, left: `${CHALLENGE.targetX}%`, transform: 'translate(-50%, -50%)',
                      width: `${CHALLENGE.radius * 3}%`, paddingTop: `${CHALLENGE.radius * 3}%`, 
                      border: '4px dashed rgba(255, 184, 0, 0.8)', borderRadius: '50%', pointerEvents: 'none',
                      background: 'radial-gradient(circle, rgba(255,184,0,0.2) 0%, rgba(255,184,0,0) 70%)'
                    }}
                  />
               )}
            </AnimatePresence>

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
