'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Zap } from 'lucide-react';

const BINGO_TERMS = [
  "SUPERNOVA", "AGUJERO NEGRO", "QUASAR", "PULSAR", "VIA LACTEA", 
  "ANDROMEDA", "ENANA BLANCA", "GIGANTE ROJA", "COMETA HALLEY", "CINTURON KUIPER",
  "EXOPLANETA", "CONSTELACION", "AÑO LUZ", "NEBULOSA", "MATERIA OSCURA"
];

export default function SpaceBingo({ onComplete }) {
  const [board, setBoard] = useState([]);
  const [callerQueue, setCallerQueue] = useState([]);
  const [currentCall, setCurrentCall] = useState(null);
  const [stamped, setStamped] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [generatorActive, setGeneratorActive] = useState(false);

  const initialize = () => {
    // Escoger 9 términos únicos para el tablero 3x3
    const shuffledBoard = [...BINGO_TERMS].sort(() => 0.5 - Math.random()).slice(0, 9);
    setBoard(shuffledBoard);
    setStamped([]);
    setGameOver(false);
    
    // Las cartas cantadas deben incluir las 9 ganadoras + algunas perdedoras para distracción
    const distractions = [...BINGO_TERMS].filter(t => !shuffledBoard.includes(t)).slice(0, 6);
    const fullQueue = [...shuffledBoard, ...distractions].sort(() => 0.5 - Math.random());
    setCallerQueue(fullQueue);
    setCurrentCall(null);
    setGeneratorActive(true);
  };

  // Caller Effect loop
  useEffect(() => {
    let interval;
    if (generatorActive && !gameOver && callerQueue.length > 0) {
      interval = setInterval(() => {
        const nextQ = [...callerQueue];
        const nextCall = nextQ.pop();
        setCallerQueue(nextQ);
        setCurrentCall(nextCall);

        if (nextQ.length === 0) setGeneratorActive(false);
      }, 4000); // Llama nueva carta cada 4 segundos
    }
    return () => clearInterval(interval);
  }, [generatorActive, gameOver, callerQueue]);

  useEffect(() => {
    // Chequear condición de victoria (Línea o Full)
    if (stamped.length === 9) { // Para simplificar, requerimos "Tablero Lleno" (Blackout) en la lotería
       setGameOver(true);
       setGeneratorActive(false);
       if (onComplete) onComplete(50);
    }
  }, [stamped]);

  const handleStamp = (term) => {
    // Solo puedes sellar si es la carta actualmente cantada, o ya cantada
    // Simplificación: Solo puedes sellar la CARTA ACTIVA en pantalla
    if (term === currentCall && !stamped.includes(term)) {
       setStamped(prev => [...prev, term]);
    }
  };

  if (board.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
         <button onClick={initialize} className="btn-primary" style={{ background: 'var(--gold-star)', color: 'black', padding: '1rem 2rem', fontSize: '1.2rem' }}>
           Generar Cartón de Lotería
         </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', background: '#111', borderRadius: '20px', border: '2px solid rgba(255,215,0,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Caller Area */}
      <div style={{ width: '100%', height: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '2rem' }}>
         <AnimatePresence mode="wait">
            {gameOver ? (
               <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ color: 'var(--gold-star)', textAlign: 'center' }}>
                 <Award size={48} style={{ margin: '0 auto' }} />
                 <h2 style={{ margin: 0 }}>¡BINGO CÓSMICO! Tablero Completado.</h2>
               </motion.div>
            ) : currentCall ? (
               <motion.div 
                 key={currentCall} 
                 initial={{ x: 100, opacity: 0, rotate: 10 }} 
                 animate={{ x: 0, opacity: 1, rotate: 0 }} 
                 exit={{ x: -100, opacity: 0, rotate: -10 }}
                 style={{ padding: '1rem 3rem', background: 'var(--electric-blue)', color: 'black', borderRadius: '15px', fontWeight: '900', fontSize: '2rem', boxShadow: '0 10px 20px rgba(0,228,255,0.5)', border: '2px solid white' }}
               >
                 « {currentCall} »
               </motion.div>
            ) : (
               <div style={{ color: 'gray' }}>Esperando Transmisión de Vuelo...</div>
            )}
         </AnimatePresence>
      </div>

      {/* Board 3x3 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', width: '100%', maxWidth: '500px' }}>
         {board.map((item, idx) => {
           const isStamped = stamped.includes(item);
           return (
             <motion.div 
                key={idx}
                whileHover={{ scale: isStamped ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleStamp(item)} // Solo sella si coincide con la carta actual cantada
                style={{
                  aspectRatio: '1/1', background: isStamped ? 'rgba(255,215,0,0.2)' : 'rgba(255,255,255,0.05)',
                  border: `2px solid ${isStamped ? 'var(--gold-star)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '1rem', textAlign: 'center', cursor: 'pointer', position: 'relative', overflow: 'hidden',
                  color: isStamped ? 'var(--gold-star)' : 'white'
                }}
             >
                {isStamped && (
                   <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ position: 'absolute', opacity: 0.2 }}>
                     <Zap size={80} color="var(--gold-star)" />
                   </motion.div>
                )}
                <span style={{ position: 'relative', zIndex: 1, fontWeight: 'bold', fontSize: 'clamp(0.8rem, 2vw, 1.2rem)' }}>
                  {item}
                </span>
             </motion.div>
           );
         })}
      </div>

      <div style={{ marginTop: '2rem', width: '100%', textAlign: 'center' }}>
         <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Atrapa el panel marcándolo exactamente cuando aparezca cantado en el visualizador.</p>
         {gameOver && (
           <button onClick={initialize} className="btn-primary" style={{ marginTop: '1rem' }}>Siguiente Ronda de Lotería</button>
         )}
      </div>

    </div>
  );
}
