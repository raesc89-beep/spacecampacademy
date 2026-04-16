'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Power, Zap } from 'lucide-react';

export default function HamImpulse({ onComplete }) {
  const [powerPhase, setPowerPhase] = useState(0); // Oscillating between 0 and 100
  const [direction, setDirection] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [result, setResult] = useState(null); // 'perfect', 'good', 'fail'

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setPowerPhase(prev => {
          let next = prev + (4 * direction);
          if (next >= 100) {
             setDirection(-1);
             return 100;
          }
          if (next <= 0) {
             setDirection(1);
             return 0;
          }
          return next;
        });
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isPlaying, direction]);

  const handleLaunch = () => {
    if (!isPlaying) return;
    setIsPlaying(false);
    
    // Evaluate power
    // Perfect is 45-55, Good is 30-70, Fail otherwise
    let res = 'fail';
    let bonus = 0;
    
    if (powerPhase >= 45 && powerPhase <= 55) {
       res = 'perfect';
       bonus = 50;
    } else if (powerPhase >= 30 && powerPhase <= 70) {
       res = 'good';
       bonus = 20;
    } else {
       res = 'fail';
       bonus = 0;
    }
    
    setResult(res);
    
    setTimeout(() => {
       if (res !== 'fail' && onComplete) onComplete(bonus);
       if (res === 'fail') {
         // Reset after fail to try again
         setTimeout(() => {
           setResult(null);
           setIsPlaying(true);
         }, 2000);
       }
    }, 1500);
  };

  return (
    <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.6)', borderRadius: '20px', border: '1px solid rgba(0, 255, 136, 0.3)', textAlign: 'center' }}>
      
      <header style={{ marginBottom: '2rem' }}>
        <h3 style={{ margin: 0, color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
           <Rocket /> Comando de Impulso Mercury
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem' }}>
          Ham cuenta contigo. Detén el indicador de potencia exactamente en la zona verde central para lograr el salto orbital perfecto y evitar velocidad excesiva.
        </p>
      </header>

      {/* Meter Bar */}
      <div style={{ position: 'relative', width: '100%', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', overflow: 'hidden', border: '2px solid white', margin: '3rem 0' }}>
         
         {/* Zones */}
         <div style={{ position: 'absolute', top: 0, bottom: 0, left: '0%', width: '30%', background: 'rgba(255, 51, 102, 0.5)' }}></div>
         <div style={{ position: 'absolute', top: 0, bottom: 0, right: '0%', width: '30%', background: 'rgba(255, 51, 102, 0.5)' }}></div>
         <div style={{ position: 'absolute', top: 0, bottom: 0, left: '30%', right: '30%', background: 'rgba(255, 184, 0, 0.5)' }}></div>
         <div style={{ position: 'absolute', top: 0, bottom: 0, left: '45%', width: '10%', background: 'rgba(0, 255, 136, 0.8)', boxShadow: '0 0 10px #00ff88' }}></div>
         
         {/* Cursor */}
         <motion.div 
           style={{ 
             position: 'absolute', top: '-10%', bottom: '-10%', left: `${powerPhase}%`, width: '4px', background: 'white',
             transform: 'translateX(-50%)', boxShadow: '0 0 10px white', zIndex: 10
           }}
         />
      </div>

      <button 
        onClick={handleLaunch}
        disabled={!isPlaying}
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
        <Power size={28} /> {isPlaying ? '¡IGNICIÓN!' : 'CALCULANDO...'}
      </button>

      {/* Result Msg */}
      <AnimatePresence>
        {result && (
           <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} style={{ marginTop: '2rem' }}>
              {result === 'perfect' && <div style={{ color: 'var(--success)', fontSize: '1.5rem', fontWeight: 'bold' }}>¡ÓRBITA PERFECTA! Ham está a salvo. +50 Polvo Estelar.</div>}
              {result === 'good' && <div style={{ color: 'var(--gold-star)', fontSize: '1.5rem', fontWeight: 'bold' }}>¡LANZAMIENTO EXITOSO! Exceso ligero pero controlado. +20 Polvo Estelar.</div>}
              {result === 'fail' && <div style={{ color: 'var(--danger)', fontSize: '1.5rem', fontWeight: 'bold' }}>¡FALLO LETAL! Exceso de velocidad catastrófico. Reiniciando simulación...</div>}
           </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
