'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle, AlertCircle, Radar, Crosshair, Clock, Timer } from 'lucide-react';

const CHALLENGES = [
  {
    riddle: "CALLES DE MOSCÚ: Haz clic sobre Laika (el perro callejero), el satélite Sputnik en el techo, y la huella gigante en la nieve.",
    imageUrl: "/assets/animales/laika_challenge_1_1779733797282.png",
    targets: [
      { id: 'laika', name: 'Laika', x: 72, y: 88, radius: 8, found: false },
      { id: 'modulo', name: 'Satélite Sputnik', x: 32, y: 26, radius: 8, found: false },
      { id: 'huella', name: 'Huella en la Nieve', x: 38, y: 78, radius: 8, found: false }
    ]
  },
  {
    riddle: "ÓRBITA TERRESTRE: Encuentra al perro astronauta flotando en el espacio, una cápsula espacial cónica, y la tarjeta con huella de perro.",
    imageUrl: "/assets/animales/laika_challenge_2_1779733816425.png",
    targets: [
      { id: 'laika', name: 'Perro Astronauta', x: 22, y: 52, radius: 8, found: false },
      { id: 'modulo', name: 'Cápsula Espacial', x: 72, y: 68, radius: 8, found: false },
      { id: 'huella', name: 'Tarjeta con Huella', x: 48, y: 42, radius: 8, found: false }
    ]
  },
  {
    riddle: "COMANDO SOVIÉTICO: Localiza a Laika con su casco espacial, el módulo miniatura en los planos, y la huella de perro en los esquemas.",
    imageUrl: "/assets/animales/laika_challenge_3_1779733835882.png",
    targets: [
      { id: 'laika', name: 'Laika con Casco', x: 10, y: 45, radius: 8, found: false },
      { id: 'modulo', name: 'Módulo en los Planos', x: 35, y: 62, radius: 8, found: false },
      { id: 'huella', name: 'Huella en Esquemas', x: 42, y: 72, radius: 8, found: false }
    ]
  },
  {
    riddle: "BOSQUE SIBERIANO: Entre los pinos nevados halla al astronauta, la cápsula estrellada marcada LUNAR, y la huella gigante en la nieve.",
    imageUrl: "/assets/animales/laika_challenge_4_1779733853895.png",
    targets: [
      { id: 'laika', name: 'Astronauta en el Bosque', x: 38, y: 52, radius: 8, found: false },
      { id: 'modulo', name: 'Cápsula LUNAR', x: 73, y: 72, radius: 8, found: false },
      { id: 'huella', name: 'Huella Gigante', x: 72, y: 25, radius: 8, found: false }
    ]
  },
  {
    riddle: "PLAZA ROJA: Durante el desfile épico ubica a Laika astronauta con su letrero, el módulo sobre un tanque, y la huella roja pintada.",
    imageUrl: "/assets/animales/laika_challenge_5_1779733871604.png",
    targets: [
      { id: 'laika', name: 'Laika Astronauta', x: 18, y: 88, radius: 8, found: false },
      { id: 'modulo', name: 'Módulo en Tanque', x: 57, y: 62, radius: 8, found: false },
      { id: 'huella', name: 'Huella Roja', x: 22, y: 93, radius: 8, found: false }
    ]
  }
];

// Format seconds to MM:SS
const formatTime = (totalSeconds) => {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export default function LaikaFinder({ onComplete }) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [challenges, setChallenges] = useState(JSON.parse(JSON.stringify(CHALLENGES)));
  const [levelDone, setLevelDone] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, visible: false });
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const msgTimerRef = useRef(null);
  const timerIntervalRef = useRef(null);

  const currentChallenge = challenges[Math.min(currentLevel, challenges.length - 1)];
  const allFound = currentChallenge.targets.every(t => t.found);
  const foundCount = currentChallenge.targets.filter(t => t.found).length;

  // Chronometer — starts when player first clicks, runs until game is complete
  useEffect(() => {
    if (gameStarted && !gameFinished) {
      timerIntervalRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [gameStarted, gameFinished]);

  const showMsg = (text, type, duration) => {
    if (msgTimerRef.current) clearTimeout(msgTimerRef.current);
    setMessage(text);
    setMessageType(type || 'info');
    if ((duration || 2000) > 0) {
      msgTimerRef.current = setTimeout(() => setMessage(''), duration || 2000);
    }
  };

  useEffect(() => {
    if (allFound && !levelDone) {
      setLevelDone(true);
      setShowHelp(false);
      const pts = Math.max(100, 300 - hintsUsed * 50);
      setScore(s => s + pts);
      showMsg('¡Nivel Completado! +' + pts + ' pts', 'success', 3000);
      setTimeout(() => {
        if (currentLevel + 1 < challenges.length) {
          setCurrentLevel(prev => prev + 1);
          setLevelDone(false);
          setHintsUsed(0);
          setMessage('');
        } else {
          // Game complete — stop chronometer
          setGameFinished(true);
          const finalScore = Math.round(score + pts);
          showMsg(`¡Misión Completada! Tiempo: ${formatTime(elapsedTime)} — ${finalScore} pts`, 'success', -1);
          if (onComplete) onComplete(finalScore);
        }
      }, 2800);
    }
  }, [allFound]);

  const getClickCoords = (clientX, clientY) => {
    const rect = imgRef.current.getBoundingClientRect();
    const clickX = ((clientX - rect.left) / rect.width) * 100;
    const clickY = ((clientY - rect.top) / rect.height) * 100;
    return { clickX, clickY };
  };

  const processClick = (clientX, clientY) => {
    if (levelDone || allFound || gameFinished) return;

    // Start chronometer on first click
    if (!gameStarted) setGameStarted(true);

    const { clickX, clickY } = getClickCoords(clientX, clientY);
    let found = false;
    const newChallenges = JSON.parse(JSON.stringify(challenges));
    newChallenges[currentLevel].targets.forEach(target => {
      if (!target.found) {
        const dist = Math.sqrt(Math.pow(clickX - target.x, 2) + Math.pow(clickY - target.y, 2));
        if (dist <= target.radius) {
          target.found = true;
          found = true;
          showMsg('¡Encontraste: ' + target.name + '!', 'success', 2500);
        }
      }
    });
    if (found) {
      setChallenges(newChallenges);
    } else {
      showMsg('Nada aquí... sigue buscando.', 'error', 1200);
    }
  };

  const handleImageClick = (e) => {
    processClick(e.clientX, e.clientY);
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    const touch = e.changedTouches[0];
    processClick(touch.clientX, touch.clientY);
  };

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    setCursorPos({ x: e.clientX - containerRect.left, y: e.clientY - containerRect.top, visible: true });
  };

  const activateSonar = () => {
    if (showHelp || levelDone || allFound || gameFinished) return;
    if (!gameStarted) setGameStarted(true);
    setHintsUsed(h => h + 1);
    setShowHelp(true);
    showMsg('Escaneando zona de búsqueda...', 'info', 3500);
    setTimeout(() => setShowHelp(false), 3500);
  };

  const msgColor = messageType === 'success' ? '#00FF88' : messageType === 'error' ? '#FF4444' : '#00E4FF';

  return (
    <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.75)', borderRadius: '20px', border: '1px solid rgba(255, 184, 0, 0.4)' }}>
      <header style={{ marginBottom: '1.2rem', textAlign: 'center' }}>
        <h3 style={{ margin: 0, color: 'var(--gold-star)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
           <Search size={20}/> Misión Laika — Nivel {currentLevel + 1} / {challenges.length}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
           <span style={{ color: '#FFD700', fontSize: '0.9rem', fontWeight: 'bold' }}>Score: {score}</span>
           <span style={{ color: '#aaa', fontSize: '0.85rem' }}>Pistas: {hintsUsed}</span>
           {/* Chronometer */}
           <span style={{
             display: 'flex', alignItems: 'center', gap: '0.4rem',
             color: gameFinished ? '#00FF88' : '#00E4FF',
             fontSize: '1rem', fontWeight: 'bold', fontFamily: 'monospace',
             background: 'rgba(0,228,255,0.1)',
             padding: '4px 12px', borderRadius: '8px',
             border: `1px solid ${gameFinished ? 'rgba(0,255,136,0.4)' : 'rgba(0,228,255,0.3)'}`,
             textShadow: `0 0 8px ${gameFinished ? '#00FF88' : '#00E4FF'}`,
             animation: gameStarted && !gameFinished ? 'none' : 'none'
           }}>
             <Timer size={14} />
             {formatTime(elapsedTime)}
           </span>
        </div>
        <div style={{ marginTop: '1rem', padding: '1rem 1.5rem', background: 'rgba(255, 184, 0, 0.08)', borderRadius: '12px', borderLeft: '4px solid var(--gold-star)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
           <div style={{ flex: 1, textAlign: 'left' }}>
             <p style={{ margin: '0 0 0.8rem 0', fontStyle: 'italic', fontSize: '1rem', color: 'white' }}>{currentChallenge.riddle}</p>
             <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {currentChallenge.targets.map(t => (
                   <span key={t.id} style={{ padding: '4px 12px', borderRadius: '20px', background: t.found ? 'rgba(0,255,136,0.3)' : 'rgba(255,255,255,0.1)', border: '1px solid ' + (t.found ? '#00FF88' : 'rgba(255,255,255,0.2)'), color: t.found ? '#00FF88' : '#ccc', fontWeight: 'bold', fontSize: '0.82rem', transition: 'all 0.3s' }}>
                     {t.found ? '✓' : '○'} {t.name}
                   </span>
                ))}
             </div>
           </div>
           <button onClick={activateSonar} disabled={showHelp || levelDone || allFound || gameFinished} style={{ background: showHelp ? 'rgba(255,184,0,0.4)' : 'rgba(255, 184, 0, 0.15)', border: '1px solid var(--gold-star)', color: 'var(--gold-star)', padding: '0.7rem 1.2rem', borderRadius: '10px', cursor: showHelp ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
             <Radar size={16} /> Pista Sonar
           </button>
        </div>
      </header>

      <AnimatePresence>
        {message && (
          <motion.div key={message} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}
            style={{ textAlign: 'center', marginBottom: '0.8rem', color: msgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.1rem', padding: '0.5rem', background: 'rgba(0,0,0,0.4)', borderRadius: '8px' }}>
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      {!gameStarted && (
        <div style={{ textAlign: 'center', marginBottom: '0.8rem', color: '#00E4FF', fontSize: '0.9rem', fontWeight: 'bold', padding: '0.5rem', background: 'rgba(0,228,255,0.08)', borderRadius: '8px', border: '1px solid rgba(0,228,255,0.2)' }}>
          <Clock size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }}/>
          El cronómetro empezará cuando hagas tu primer clic. ¡El jugador más rápido lidera el ranking!
        </div>
      )}

      <div style={{ textAlign: 'center', marginBottom: '0.8rem', color: '#888', fontSize: '0.85rem' }}>
        <Crosshair size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }}/>
        Haz <strong style={{color:'#fff'}}>clic</strong> directamente sobre los elementos en la imagen
      </div>

      <div
        ref={containerRef}
        onClick={handleImageClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setCursorPos(c => ({ ...c, visible: false }))}
        onTouchEnd={handleTouchEnd}
        style={{ position: 'relative', borderRadius: '15px', overflow: 'hidden', border: '2px solid rgba(255,184,0,0.4)', background: '#111', lineHeight: 0, minHeight: '400px', cursor: 'none', boxShadow: '0 0 30px rgba(255,184,0,0.15)' }}
      >
         <img ref={imgRef} src={currentChallenge.imageUrl} draggable="false" onDragStart={e => e.preventDefault()}
           style={{ width: '100%', height: 'auto', display: 'block', userSelect: 'none' }}
           alt={'Reto Laika ' + (currentLevel + 1)}
         />

         {cursorPos.visible && (
           <div style={{ position: 'absolute', left: cursorPos.x, top: cursorPos.y, transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 50 }}>
             <div style={{ width: '40px', height: '40px', border: '2px solid #FFD700', borderRadius: '50%', position: 'absolute', top: '-20px', left: '-20px', boxShadow: '0 0 10px rgba(255,215,0,0.6)' }}/>
             <div style={{ position: 'absolute', width: '20px', height: '2px', background: '#FFD700', top: '-1px', left: '-10px' }}/>
             <div style={{ position: 'absolute', width: '2px', height: '20px', background: '#FFD700', top: '-10px', left: '-1px' }}/>
             <div style={{ width: '6px', height: '6px', background: '#FFD700', borderRadius: '50%', position: 'absolute', top: '-3px', left: '-3px' }}/>
           </div>
         )}

         <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
            <AnimatePresence>
               {showHelp && !levelDone && currentChallenge.targets.map(target => !target.found && (
                  <motion.div key={target.id + '-sonar'} initial={{ scale: 2.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ duration: 0.6, type: 'spring' }}
                    style={{ position: 'absolute', top: target.y + '%', left: target.x + '%', transform: 'translate(-50%, -50%)', width: (target.radius * 2.8) + '%', paddingTop: (target.radius * 2.8) + '%', border: '3px dashed rgba(255, 215, 0, 0.9)', borderRadius: '50%', pointerEvents: 'none', background: 'radial-gradient(circle, rgba(255,215,0,0.25) 0%, rgba(255,215,0,0) 70%)', boxShadow: '0 0 20px rgba(255,215,0,0.3)' }}
                  />
               ))}
            </AnimatePresence>

            <AnimatePresence>
              {currentChallenge.targets.map(target => target.found && (
                 <motion.div key={target.id + '-found'} initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', bounce: 0.5 }}
                   style={{ position: 'absolute', top: target.y + '%', left: target.x + '%', transform: 'translate(-50%, -50%)', width: '52px', height: '52px', border: '3px solid #00FF88', borderRadius: '50%', boxShadow: '0 0 25px #00FF88', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,255,136,0.2)' }}>
                   <CheckCircle color="#00FF88" size={28} />
                 </motion.div>
              ))}
            </AnimatePresence>

            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: 'rgba(0,0,0,0.4)' }}>
               <div style={{ width: (foundCount / currentChallenge.targets.length * 100) + '%', height: '100%', background: 'linear-gradient(to right, #FFD700, #00FF88)', transition: 'width 0.5s ease' }}/>
            </div>
         </div>
      </div>
    </div>
  );
}
