import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Power } from 'lucide-react';

export default function HamImpulse({ onComplete }) {
  const [powerPhase, setPowerPhase] = useState(0); 
  const directionRef = useRef(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [result, setResult] = useState(null); 
  const [successCount, setSuccessCount] = useState(0);
  const [speed, setSpeed] = useState(30);

  const REQUIRED_WINS = 4;

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setPowerPhase(prev => {
          let next = prev + (4 * directionRef.current);
          if (next >= 100) { directionRef.current = -1; return 100; }
          if (next <= 0) { directionRef.current = 1; return 0; }
          return next;
        });
      }, speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  const handleLaunch = () => {
    if (!isPlaying) return;
    setIsPlaying(false);
    
    let res = 'fail';
    if (powerPhase >= 40 && powerPhase <= 60) {
       res = 'perfect';
    } else {
       res = 'fail';
    }
    
    setResult(res);
    
    setTimeout(() => {
       if (res === 'perfect') {
         const newCount = successCount + 1;
         setSuccessCount(newCount);
         
         if (newCount >= REQUIRED_WINS) {
           if (onComplete) onComplete(100);
         } else {
           // Continue to next phase, increase speed
           setResult(null);
           setSpeed(prev => Math.max(10, prev - 6)); // Gets faster
           setIsPlaying(true);
         }
       } else {
         // Fail resets the current phase
         setTimeout(() => {
           setResult(null);
           setIsPlaying(true);
         }, 2000);
       }
    }, 1500);
  };

  // Calculate ship takeoff based on success count
  const takeoffY = -(successCount * 25); // Move up 25px per success

  return (
    <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.6)', borderRadius: '20px', border: '1px solid rgba(0, 255, 136, 0.3)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      
      <header style={{ marginBottom: '2rem' }}>
        <h3 style={{ margin: 0, color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
           <Rocket /> Secuencia de Despegue Mercury-Redstone
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem' }}>
          Ham necesita tu ayuda para salir de la atmósfera. Acierta 4 veces en el centro para dar el impulso final. ¡Cuidado, cada intento será más rápido!
        </p>
        <div style={{ marginTop: '1rem', color: 'white', fontWeight: 'bold' }}>
          Fase de despegue: {successCount} / {REQUIRED_WINS}
        </div>
      </header>

      {/* Ham Ship Animation */}
      <div style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', marginBottom: '2rem', position: 'relative' }}>
         {/* Launch Pad Base */}
         <div style={{ position: 'absolute', bottom: 0, width: '150px', height: '10px', background: 'rgba(255,255,255,0.2)', borderRadius: '5px' }}></div>
         
         {/* Ship */}
         <motion.div 
           animate={{ y: takeoffY }}
           transition={{ type: 'spring', stiffness: 50 }}
           style={{ zIndex: 10, position: 'relative' }}
         >
           <img src="/assets/animales/ham_ship_3d.png" alt="Ham Ship" style={{ width: '120px', height: 'auto' }} />
           {successCount > 0 && (
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }}
               style={{ position: 'absolute', bottom: '-40px', left: '50%', transform: 'translateX(-50%)', width: '30px', height: '50px', background: 'linear-gradient(to bottom, #00ff88, transparent)', borderRadius: '50%' }}
             />
           )}
         </motion.div>
      </div>

      {/* Meter Bar */}
      <div style={{ position: 'relative', width: '100%', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', overflow: 'hidden', border: '2px solid white', margin: '2rem 0' }}>
         <div style={{ position: 'absolute', top: 0, bottom: 0, left: '0%', width: '40%', background: 'rgba(255, 51, 102, 0.5)' }}></div>
         <div style={{ position: 'absolute', top: 0, bottom: 0, right: '0%', width: '40%', background: 'rgba(255, 51, 102, 0.5)' }}></div>
         <div style={{ position: 'absolute', top: 0, bottom: 0, left: '40%', width: '20%', background: 'rgba(0, 255, 136, 0.8)', boxShadow: '0 0 10px #00ff88' }}></div>
         
         <motion.div 
           style={{ 
             position: 'absolute', top: '-10%', bottom: '-10%', left: `${powerPhase}%`, width: '6px', background: 'white',
             transform: 'translateX(-50%)', boxShadow: '0 0 10px white', zIndex: 10, borderRadius: '3px'
           }}
         />
      </div>

      <button 
        onClick={handleLaunch}
        disabled={!isPlaying || successCount >= REQUIRED_WINS}
        style={{
          background: isPlaying ? 'var(--success)' : 'gray',
          color: 'black',
          border: 'none',
          padding: '1.2rem 3rem',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          borderRadius: '30px',
          cursor: isPlaying ? 'pointer' : 'not-allowed',
          boxShadow: isPlaying ? '0 0 30px rgba(0, 255, 136, 0.5)' : 'none',
          display: 'inline-flex', alignItems: 'center', gap: '0.8rem'
        }}
      >
        <Power size={28} /> {isPlaying ? '¡IMPULSO!' : 'CALCULANDO...'}
      </button>

      {/* Result Msg */}
      <AnimatePresence>
        {result && (
           <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} style={{ marginTop: '2rem', minHeight: '30px' }}>
              {result === 'perfect' && successCount + 1 < REQUIRED_WINS && <div style={{ color: 'var(--success)', fontSize: '1.5rem', fontWeight: 'bold' }}>¡Impulso exitoso! Aumentando velocidad...</div>}
              {result === 'perfect' && successCount + 1 >= REQUIRED_WINS && <div style={{ color: 'var(--success)', fontSize: '1.5rem', fontWeight: 'bold' }}>¡ÓRBITA ALCANZADA! Ham está en el espacio. +100 Polvo Estelar.</div>}
              {result === 'fail' && <div style={{ color: 'var(--danger)', fontSize: '1.5rem', fontWeight: 'bold' }}>Fallo de ignición. Reintentando fase...</div>}
           </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
