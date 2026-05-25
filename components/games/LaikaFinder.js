'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle, AlertCircle, Radar, Crosshair, Target } from 'lucide-react';

const CHALLENGES = [
  {
    riddle: "1. CALLES DE MOSCÚ: Busca a Laika (un perro blanco con manchas), un módulo lunar plateado, y una enorme huella de perro en la nieve.",
    // using the timestamps from the recent generate_image calls
    imageUrl: "/assets/animales/laika_challenge_1_1779733797282.png", 
    targets: [
      { id: 'laika', name: 'Laika', x: 50, y: 50, radius: 20, found: false },
      { id: 'modulo', name: 'Módulo Lunar', x: 20, y: 70, radius: 20, found: false },
      { id: 'huella', name: 'Huella', x: 80, y: 80, radius: 20, found: false }
    ]
  },
  {
    riddle: "2. ÓRBITA TERRESTRE: Encuentra a un perro astronauta, una cápsula cónica, y una huella flotante entre la multitud espacial.",
    imageUrl: "/assets/animales/laika_challenge_2_1779733816425.png", 
    targets: [
      { id: 'laika', name: 'Perro Astronauta', x: 30, y: 40, radius: 20, found: false },
      { id: 'modulo', name: 'Cápsula Espacial', x: 70, y: 30, radius: 20, found: false },
      { id: 'huella', name: 'Huella Flotante', x: 50, y: 80, radius: 20, found: false }
    ]
  },
  {
    riddle: "3. COMANDO SOVIÉTICO: Entre el caos científico, localiza un casco de perro rojo, un módulo en miniatura y una huella en unos planos.",
    imageUrl: "/assets/animales/laika_challenge_3_1779733835882.png", 
    targets: [
      { id: 'laika', name: 'Casco Rojo', x: 60, y: 60, radius: 20, found: false },
      { id: 'modulo', name: 'Módulo Miniatura', x: 20, y: 40, radius: 20, found: false },
      { id: 'huella', name: 'Huella en Planos', x: 80, y: 30, radius: 20, found: false }
    ]
  },
  {
    riddle: "4. BOSQUE SIBERIANO: Encuentra un perro con traje espacial, la cápsula lunar estrellada entre los pinos y una huella gigante.",
    imageUrl: "/assets/animales/laika_challenge_4_1779733853895.png", 
    targets: [
      { id: 'laika', name: 'Perro en Traje', x: 45, y: 55, radius: 20, found: false },
      { id: 'modulo', name: 'Cápsula Estrellada', x: 75, y: 25, radius: 20, found: false },
      { id: 'huella', name: 'Huella Gigante', x: 20, y: 80, radius: 20, found: false }
    ]
  },
  {
    riddle: "5. PLAZA ROJA: Durante el desfile, ubica a Laika astronauta, un módulo lunar sobre un tanque y una huella de perro pintada.",
    imageUrl: "/assets/animales/laika_challenge_5_1779733871604.png", 
    targets: [
      { id: 'laika', name: 'Laika Astronauta', x: 80, y: 80, radius: 20, found: false },
      { id: 'modulo', name: 'Módulo en Tanque', x: 50, y: 85, radius: 20, found: false },
      { id: 'huella', name: 'Huella Pintada', x: 10, y: 90, radius: 20, found: false }
    ]
  }
];

export default function LaikaFinder({ onComplete }) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [challenges, setChallenges] = useState(JSON.parse(JSON.stringify(CHALLENGES)));
  const [gameOver, setGameOver] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [message, setMessage] = useState('');
  
  const containerRef = useRef(null);

  const currentChallenge = challenges[Math.min(currentLevel, challenges.length - 1)];
  const allFound = currentChallenge.targets.every(t => t.found);

  useEffect(() => {
    if (allFound && !gameOver) {
      setGameOver(true);
      setShowHelp(false);
      setMessage('¡Nivel Completado!');
      setTimeout(() => {
        if (currentLevel + 1 < challenges.length) {
          setCurrentLevel(prev => prev + 1);
          setGameOver(false);
          setMessage('');
        } else {
          if (onComplete) onComplete(200);
        }
      }, 2500);
    }
  }, [allFound, currentLevel, challenges, gameOver, onComplete]);

  const handleDragEnd = (event, info) => {
    if (gameOver) return;
    
    // Get container dimensions
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate relative drop coordinates (percentages)
    const dropX = ((info.point.x - rect.left) / rect.width) * 100;
    const dropY = ((info.point.y - rect.top) / rect.height) * 100;

    let foundSomething = false;

    const newChallenges = [...challenges];
    const currentTargets = newChallenges[currentLevel].targets;

    currentTargets.forEach(target => {
      if (!target.found) {
        const dist = Math.sqrt(Math.pow(dropX - target.x, 2) + Math.pow(dropY - target.y, 2));
        if (dist <= target.radius) {
          target.found = true;
          foundSomething = true;
          setMessage(`¡Encontraste: ${target.name}!`);
          setTimeout(() => setMessage(''), 2000);
        }
      }
    });

    if (foundSomething) {
      setChallenges(newChallenges);
    } else {
      setMessage('Anomalía no detectada aquí...');
      setTimeout(() => setMessage(''), 1000);
    }
  };

  const activateSonar = () => {
    setShowHelp(true);
    setMessage('Escaneando cuadrícula de búsqueda...');
    setTimeout(() => {
      setShowHelp(false);
      setMessage('');
    }, 3000);
  };

  return (
    <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.6)', borderRadius: '20px', border: '1px solid rgba(255, 184, 0, 0.3)' }}>
      <header style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <h3 style={{ margin: 0, color: 'var(--gold-star)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
           <Search /> Radar Seek-n-Drop ({currentLevel + 1}/5)
        </h3>
        
        <div style={{ marginTop: '1rem', padding: '1.5rem', background: 'rgba(255, 184, 0, 0.1)', borderRadius: '12px', borderLeft: '4px solid var(--gold-star)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
           <div style={{ flex: 1, textAlign: 'left' }}>
             <p style={{ margin: 0, fontStyle: 'italic', fontSize: '1.1rem', color: 'white' }}>
               « {currentChallenge.riddle} »
             </p>
             <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                {currentChallenge.targets.map(t => (
                   <span key={t.id} style={{ 
                     padding: '4px 12px', 
                     borderRadius: '20px', 
                     background: t.found ? 'var(--success)' : 'rgba(255,255,255,0.2)',
                     color: t.found ? 'black' : 'white',
                     fontWeight: 'bold',
                     fontSize: '0.85rem'
                   }}>
                     {t.found ? '✓' : '•'} {t.name}
                   </span>
                ))}
             </div>
           </div>
           
           <button onClick={activateSonar} disabled={showHelp || gameOver || allFound} style={{ background: 'rgba(255, 184, 0, 0.2)', border: '1px solid var(--gold-star)', color: 'var(--gold-star)', padding: '0.8rem 1.5rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
             <Radar size={18} /> Asistencia Sonar
           </button>
        </div>
      </header>

      {message && (
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ textAlign: 'center', marginBottom: '1rem', color: gameOver ? 'var(--success)' : 'var(--electric-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', fontWeight: 'bold', fontSize: '1.2rem' }}>
          {gameOver ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
          <h2 style={{ margin: 0 }}>{message}</h2>
        </motion.div>
      )}

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        
        {/* Herramientas (Arrastrables) */}
        <div style={{ width: '100px', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
           <p style={{ margin: 0, fontSize: '0.8rem', color: '#aaa', textAlign: 'center' }}>Arrastra el Escáner a la imagen</p>
           <motion.div
             drag
             dragSnapToOrigin
             onDragEnd={handleDragEnd}
             whileHover={{ scale: 1.1 }}
             whileDrag={{ scale: 1.2, filter: 'drop-shadow(0 0 20px #00e4ff)' }}
             style={{
               width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(0, 228, 255, 0.2)', 
               border: '3px solid #00e4ff', display: 'flex', alignItems: 'center', justifyContent: 'center',
               cursor: 'grab', zIndex: 50, boxShadow: 'inset 0 0 10px #00e4ff'
             }}
           >
             <Crosshair color="#00e4ff" size={30} />
           </motion.div>
        </div>

        {/* Imagen Contenedor */}
        <div ref={containerRef} style={{ position: 'relative', flex: 1, borderRadius: '15px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.2)', background: '#000', lineHeight: 0, minHeight: '400px' }}>
           <img 
             src={currentChallenge.imageUrl} 
             draggable="false"
             onDragStart={(e) => e.preventDefault()}
             style={{ width: '100%', height: 'auto', display: 'block', pointerEvents: 'none' }} 
             alt={`Reto Laika ${currentLevel + 1}`} 
           />
           
           <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
              {/* Sonar Help Circles */}
              <AnimatePresence>
                 {showHelp && !gameOver && currentChallenge.targets.map(target => !target.found && (
                    <motion.div 
                      key={target.id}
                      initial={{ scale: 2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ duration: 0.5 }}
                      style={{
                        position: 'absolute', top: `${target.y}%`, left: `${target.x}%`, transform: 'translate(-50%, -50%)',
                        width: `${target.radius * 2.5}%`, paddingTop: `${target.radius * 2.5}%`, 
                        border: '4px dashed rgba(255, 184, 0, 0.8)', borderRadius: '50%', pointerEvents: 'none',
                        background: 'radial-gradient(circle, rgba(255,184,0,0.2) 0%, rgba(255,184,0,0) 70%)'
                      }}
                    />
                 ))}
              </AnimatePresence>

              {/* Found Targets Indicators */}
              <AnimatePresence>
                {currentChallenge.targets.map(target => target.found && (
                   <motion.div 
                     key={target.id}
                     initial={{ scale: 0 }} animate={{ scale: 1 }}
                     style={{ 
                       position: 'absolute', top: `${target.y}%`, left: `${target.x}%`, transform: 'translate(-50%, -50%)',
                       width: '50px', height: '50px', border: '3px solid #00ff88', borderRadius: '50%', boxShadow: '0 0 20px #00ff88',
                       display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,255,136,0.3)', backdropFilter: 'blur(2px)'
                     }}
                   >
                     <Target color="#00ff88" size={24} />
                   </motion.div>
                ))}
              </AnimatePresence>
           </div>
        </div>
      </div>
    </div>
  );
}
