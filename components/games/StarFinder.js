'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle, AlertCircle } from 'lucide-react';

const CHALLENGE = {
  riddle: "Mi ojo de cristal ha cartografiado los mares secos y las dunas de óxido. Mis seis ruedas han tallado surcos solitarios en la inmensidad marciana esperando volver a casa. Localízame en la tormenta rocosa.",
  imageUrl: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1000&auto=format&fit=crop", // Landscape marciano
  targetX: 75, // Porcentaje X (Aprox)
  targetY: 80, // Porcentaje Y (Aprox)
  radius: 8 // Tolerancia
};

export default function StarFinder({ onComplete }) {
  const [gameOver, setGameOver] = useState(false);
  const [clickDrops, setClickDrops] = useState([]); // Animaciones de click

  const handleClick = (e) => {
    if (gameOver) return;

    // Calcular posición porcentual del click respecto a la imagen (contenedor)
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Agregar drop visual de escaneo
    const dropId = Date.now();
    setClickDrops(prev => [...prev, { id: dropId, x, y }]);
    setTimeout(() => {
       setClickDrops(prev => prev.filter(d => d.id !== dropId));
    }, 1000);

    // Calcular distancia pitagórica
    const dist = Math.sqrt(Math.pow(x - CHALLENGE.targetX, 2) + Math.pow(y - CHALLENGE.targetY, 2));

    if (dist <= CHALLENGE.radius) {
      setGameOver(true);
      setTimeout(() => {
        if (onComplete) onComplete(20);
      }, 1500);
    }
  };

  return (
    <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.6)', borderRadius: '20px', border: '1px solid rgba(255, 100, 200, 0.3)' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h3 style={{ margin: 0, color: '#FF64C8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
           <Search /> Escáner de Óptica Profunda
        </h3>
        
        <div style={{ marginTop: '1rem', padding: '1.5rem', background: 'rgba(255,100,200,0.1)', borderRadius: '12px', borderLeft: '4px solid #FF64C8' }}>
           <p style={{ margin: 0, fontStyle: 'italic', fontSize: '1.1rem', color: 'white' }}>
             « {CHALLENGE.riddle} »
           </p>
        </div>
      </header>

      {gameOver && (
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
          <CheckCircle size={32} />
          <h2 style={{ margin: 0 }}>¡Anomalía Oculta Encontrada!</h2>
        </motion.div>
      )}

      <div style={{ position: 'relative', width: '100%', borderRadius: '15px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.2)', cursor: gameOver ? 'default' : 'crosshair' }}>
         <img 
           src={CHALLENGE.imageUrl} 
           draggable="false"
           onDragStart={(e) => e.preventDefault()}
           style={{ width: '100%', display: 'block', pointerEvents: 'none' }} 
           alt="Terreno Espacial" 
         />
         
         <div 
           onClick={handleClick} 
           style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} 
         >
            {/* Si ya ganó, mostramos dónde estaba el objetivo exactamente */}
            {gameOver && (
               <motion.div 
                 initial={{ scale: 0 }} animate={{ scale: 1 }}
                 style={{ 
                   position: 'absolute', top: `${CHALLENGE.targetY}%`, left: `${CHALLENGE.targetX}%`, transform: 'translate(-50%, -50%)',
                   width: '50px', height: '50px', border: '3px solid #00ff88', borderRadius: '50%', boxShadow: '0 0 20px #00ff88',
                   display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,255,136,0.2)'
                 }}
               >
                 <AlertCircle color="#00ff88" />
               </motion.div>
            )}

            {/* Scans Click Drops */}
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
