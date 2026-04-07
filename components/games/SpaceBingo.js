'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Zap, Bot, User } from 'lucide-react';

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
  
  // Bots state
  const [bot1Board, setBot1Board] = useState([]);
  const [bot2Board, setBot2Board] = useState([]);
  const [bot1Score, setBot1Score] = useState(0);
  const [bot2Score, setBot2Score] = useState(0);

  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null); // 'player', 'bot1', 'bot2'
  const [generatorActive, setGeneratorActive] = useState(false);

  const initialize = () => {
    // Escoger 9 términos únicos para el tablero 3x3 (Jugador)
    const shuffledBoard = [...BINGO_TERMS].sort(() => 0.5 - Math.random()).slice(0, 9);
    setBoard(shuffledBoard);
    setStamped([]);
    
    // Generar tableros virtuales para los Bots (consumen mínimos recursos)
    setBot1Board([...BINGO_TERMS].sort(() => 0.5 - Math.random()).slice(0, 9));
    setBot2Board([...BINGO_TERMS].sort(() => 0.5 - Math.random()).slice(0, 9));
    setBot1Score(0);
    setBot2Score(0);
    setWinner(null);
    setGameOver(false);
    
    // Las cartas cantadas (baraja del caller)
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
        
        // Simular que los bots tachan automáticamente si lo tienen en su tablero interno
        if (bot1Board.includes(nextCall)) setBot1Score(prev => prev + 1);
        if (bot2Board.includes(nextCall)) setBot2Score(prev => prev + 1);

        setCallerQueue(nextQ);
        setCurrentCall(nextCall);

        if (nextQ.length === 0) setGeneratorActive(false);
      }, 4000); // Llama nueva carta cada 4 segundos
    }
    return () => clearInterval(interval);
  }, [generatorActive, gameOver, callerQueue, bot1Board, bot2Board]);

  // Chequear condiciones de victoria
  useEffect(() => {
    if (!gameOver) {
       if (stamped.length === 9) {
          setGameOver(true);
          setGeneratorActive(false);
          setWinner('player');
          if (onComplete) onComplete(50);
       } else if (bot1Score === 9) {
          setGameOver(true);
          setGeneratorActive(false);
          setWinner('bot1');
       } else if (bot2Score === 9) {
          setGameOver(true);
          setGeneratorActive(false);
          setWinner('bot2');
       }
    }
  }, [stamped, bot1Score, bot2Score, gameOver]);

  const handleStamp = (term) => {
    // Simplificación: Solo puedes sellar la CARTA ACTIVA en pantalla
    if (term === currentCall && !stamped.includes(term)) {
       setStamped(prev => [...prev, term]);
    }
  };

  if (board.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
         <button onClick={initialize} className="btn-primary" style={{ background: 'var(--gold-star)', color: 'black', padding: '1rem 2rem', fontSize: '1.2rem' }}>
           Generar Cartón y Buscar Oponentes
         </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', background: '#111', borderRadius: '20px', border: '2px solid rgba(255,215,0,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Competitor HUD */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '15px', marginBottom: '1.5rem' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: winner === 'bot1' ? 'var(--success)' : 'gray' }}>
           <Bot size={24} /> 
           <div>
             <div style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>Androide X-1</div>
             <div style={{ fontWeight: 'bold' }}>{bot1Score}/9 Atrapados</div>
           </div>
         </div>
         
         <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: winner === 'player' ? 'var(--gold-star)' : 'white', background: 'rgba(255,215,0,0.1)', padding: '0.5rem 1rem', borderRadius: '10px' }}>
           <User size={24} color="var(--gold-star)" /> 
           <div>
             <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--gold-star)' }}>Líder (Tú)</div>
             <div style={{ fontWeight: 'bold' }}>{stamped.length}/9 Atrapados</div>
           </div>
         </div>

         <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: winner === 'bot2' ? 'var(--success)' : 'gray' }}>
           <div>
             <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', textAlign: 'right' }}>Androide Y-2</div>
             <div style={{ fontWeight: 'bold' }}>{bot2Score}/9 Atrapados</div>
           </div>
           <Bot size={24} /> 
         </div>
      </div>

      {/* Caller Area */}
      <div style={{ width: '100%', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '2rem' }}>
         <AnimatePresence mode="wait">
            {gameOver ? (
               <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ color: winner === 'player' ? 'var(--gold-star)' : 'var(--error)', textAlign: 'center' }}>
                 <Award size={40} style={{ margin: '0 auto' }} color={winner === 'player' ? 'var(--gold-star)' : 'white'} />
                 <h2 style={{ margin: 0 }}>
                    {winner === 'player' ? '¡BINGO CÓSMICO! Tablero Completado.' : `BINGO GRITADO POR EL OPONENTE (${winner === 'bot1' ? 'X-1' : 'Y-2'}). ¡Perdiste!`}
                 </h2>
               </motion.div>
            ) : currentCall ? (
               <motion.div 
                 key={currentCall} 
                 initial={{ x: 100, opacity: 0, scale: 0.8 }} 
                 animate={{ x: 0, opacity: 1, scale: 1 }} 
                 exit={{ x: -100, opacity: 0, scale: 0.8 }}
                 style={{ padding: '0.8rem 2.5rem', background: 'var(--electric-blue)', color: 'black', borderRadius: '15px', fontWeight: '900', fontSize: '1.8rem', boxShadow: '0 10px 20px rgba(0,228,255,0.5)', border: '2px solid white' }}
               >
                 « {currentCall} »
               </motion.div>
            ) : (
               <div style={{ color: 'gray' }}>Esperando Transmisión de Vuelo...</div>
            )}
         </AnimatePresence>
      </div>

      {/* Board 3x3 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', width: '100%', maxWidth: '450px' }}>
         {board.map((item, idx) => {
           const isStamped = stamped.includes(item);
           return (
             <motion.div 
                key={idx}
                whileHover={{ scale: (isStamped || gameOver) ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleStamp(item)} // Solo sella si coincide con la carta actual cantada
                style={{
                  aspectRatio: '1/1', background: isStamped ? 'rgba(255,215,0,0.2)' : 'rgba(255,255,255,0.05)',
                  border: `2px solid ${isStamped ? 'var(--gold-star)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '1rem', textAlign: 'center', cursor: (isStamped || gameOver) ? 'default' : 'pointer', position: 'relative', overflow: 'hidden',
                  color: isStamped ? 'var(--gold-star)' : 'white'
                }}
             >
                {isStamped && (
                   <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ position: 'absolute', opacity: 0.2 }}>
                     <Zap size={60} color="var(--gold-star)" />
                   </motion.div>
                )}
                <span style={{ position: 'relative', zIndex: 1, fontWeight: 'bold', fontSize: 'clamp(0.7rem, 2vw, 1.1rem)' }}>
                  {item}
                </span>
             </motion.div>
           );
         })}
      </div>

      <div style={{ marginTop: '2rem', width: '100%', textAlign: 'center' }}>
         {gameOver ? (
           <button onClick={initialize} className="btn-primary" style={{ marginTop: '1rem', background: 'var(--electric-blue)', color: 'black' }}>
               Jugar Revancha
           </button>
         ) : (
           <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Compite contra los Androides. Marca la tarjeta en tu panel antes de que sea demasiado tarde.</p>
         )}
      </div>

    </div>
  );
}
