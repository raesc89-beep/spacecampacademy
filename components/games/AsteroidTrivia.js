'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, AlertTriangle } from 'lucide-react';

const TRIVIA_QUESTIONS = [
  { q: '¿Cuál es la galaxia más cercana a la Vía Láctea?', options: ['Andrómeda', 'Sombrero', 'Triángulo', 'Ojo Negro'], a: 0 },
  { q: '¿Qué planeta tiene una gran mancha roja?', options: ['Marte', 'Júpiter', 'Saturno', 'Venus'], a: 1 },
  { q: '¿Cómo se llama la fuerza que evita que flotemos hacia el espacio?', options: ['Magnetismo', 'Fricción', 'Gravedad', 'Inercia'], a: 2 },
  { q: '¿Cuál es el exoplaneta más cercano a nosotros?', options: ['Proxima b', 'Kepler-186f', 'TRAPPIST-1e', 'HD 209458 b'], a: 0 },
  { q: '¿De qué está hecho principalmente el Sol?', options: ['Lava fundida', 'Rocas ígneas', 'Hidrógeno y Helio', 'Fuego y Oxígeno'], a: 2 },
  { q: '¿Qué astrónomo descubrió las 4 lunas mayores de Júpiter?', options: ['Newton', 'Kepler', 'Galileo', 'Copérnico'], a: 2 },
  { q: '¿En qué año el humano pisó la Luna?', options: ['1972', '1969', '1965', '1958'], a: 1 },
  { q: '¿Qué telescopio espacial famoso se lanzó en 1990?', options: ['James Webb', 'Chandra', 'Kepler', 'Hubble'], a: 3 }
];

export default function AsteroidTrivia({ onComplete }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  const initialize = () => {
    // Shuffle and pick 5
    const shuffled = [...TRIVIA_QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, 5);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setGameOver(false);
    setSelectedAnswer(null);
  };

  useEffect(() => {
    initialize();
  }, []);

  const handleAnswer = (idx) => {
    if (selectedAnswer !== null) return; // Prevent double clicking
    setSelectedAnswer(idx);

    const isCorrect = idx === questions[currentIndex].a;
    if (isCorrect) setScore(prev => prev + 1);

    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setGameOver(true);
        if (onComplete) onComplete(score + (isCorrect ? 1 : 0));
      }
    }, 1500);
  };

  if (questions.length === 0) return <div>Iniciando Radar...</div>;

  const currentQ = questions[currentIndex];

  return (
    <div style={{ padding: '2rem', background: 'radial-gradient(circle at center, rgba(30,10,60,0.8), rgba(0,0,0,1))', borderRadius: '20px', border: '1px solid rgba(255,100,200,0.3)', color: 'white' }}>
      
      {gameOver ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h2 style={{ color: 'var(--gold-star)', fontSize: '2rem' }}>¡Lluvia de Asteroides Sobrevivida!</h2>
          <p style={{ fontSize: '1.2rem' }}>Puntuación de Impacto: {score} / {questions.length}</p>
          <button onClick={initialize} className="btn-primary" style={{ marginTop: '2rem', background: 'var(--electric-blue)', color: 'black' }}>
            Recargar Láser (Jugar de nuevo)
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', color: 'var(--text-muted)' }}>
             <span>Radar de Amenazas: {currentIndex + 1} / {questions.length}</span>
             <span>Precisión: {score} Aciertos</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
               key={currentIndex}
               initial={{ opacity: 0, scale: 0.8, y: -50 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
               style={{ width: '100%', maxWidth: '600px' }}
            >
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', marginBottom: '2rem' }}>
                <AlertTriangle size={32} color="#FFD700" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.5rem', margin: 0, textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>
                  {currentQ.q}
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {currentQ.options.map((opt, idx) => {
                  let bgColor = 'rgba(0,0,0,0.5)';
                  let borderColor = 'rgba(255,100,200,0.5)';
                  
                  if (selectedAnswer !== null) {
                    if (idx === currentQ.a) {
                      bgColor = 'rgba(0,255,136,0.3)'; // Right answer glows green
                      borderColor = 'var(--success)';
                    } else if (idx === selectedAnswer) {
                      bgColor = 'rgba(255,50,50,0.3)'; // Wrong picked glows red
                      borderColor = 'red';
                    } else {
                      bgColor = 'rgba(255,255,255,0.02)'; // Fade others
                      borderColor = 'rgba(255,255,255,0.05)';
                    }
                  }

                  return (
                    <motion.button
                      key={idx}
                      whileHover={selectedAnswer === null ? { scale: 1.05, boxShadow: '0 0 15px rgba(255,100,200,0.5)' } : {}}
                      whileTap={selectedAnswer === null ? { scale: 0.95 } : {}}
                      onClick={() => handleAnswer(idx)}
                      disabled={selectedAnswer !== null}
                      style={{
                        padding: '1.5rem', background: bgColor, color: 'white',
                        border: `2px solid ${borderColor}`, borderRadius: '12px',
                        cursor: selectedAnswer === null ? 'crosshair' : 'default',
                        fontSize: '1.1rem', fontWeight: 'bold', letterSpacing: '1px',
                        transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: '0.8rem'
                      }}
                    >
                      <Target size={18} color={selectedAnswer !== null && idx === currentQ.a ? "var(--success)" : "rgba(255,255,255,0.5)"} /> {opt}
                    </motion.button>
                  );
                })}
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      )}

    </div>
  );
}
