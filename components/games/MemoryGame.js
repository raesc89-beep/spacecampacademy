'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, RotateCcw } from 'lucide-react';

// Generamos las cartas a partir de las imágenes reales de planetas de Space Camp
const cardTypes = [
  { id: 'earth', img: '/assets/cartoon_earth.png', bg: '#2A82D7' },
  { id: 'mars', img: '/assets/cartoon_mars.png', bg: '#E25A3D' },
  { id: 'jupiter', img: '/assets/cartoon_jupiter.png', bg: '#D29A6A' },
  { id: 'saturn', img: '/assets/cartoon_saturn.png', bg: '#E8D08D' },
  { id: 'pluto', img: '/assets/cartoon_pluto.png', bg: '#D1A3B4' },
  { id: 'sun', img: '/assets/cartoon_sun.png', bg: '#FFB800' },
];

export default function MemoryGame({ onComplete }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);

  // Inicializar juego mezclando el mazo
  const initializeGame = () => {
    const shuffledCards = [...cardTypes, ...cardTypes]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, uniqueId: Math.random() }));
    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
    setDisabled(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleClick = (index) => {
    if (disabled || flipped.includes(index) || solved.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      setMoves((m) => m + 1);
      
      const [firstIndex, secondIndex] = newFlipped;
      if (cards[firstIndex].id === cards[secondIndex].id) {
        // Coinciden!
        const newSolved = [...solved, firstIndex, secondIndex];
        setSolved(newSolved);
        setFlipped([]);
        setDisabled(false);

        // Si terminó el juego completo
        if (newSolved.length === cards.length) {
          setTimeout(() => {
            if(onComplete) onComplete(Math.max(10 - moves, 1)); // Otorga Polvo Estelar basado en habilidad
          }, 1000);
        }
      } else {
        // No coinciden, voltear de regreso
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '2rem 0', background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <h3 style={{ margin: '0 0 1rem 0', color: 'var(--electric-blue)' }}>Misión de Recalibración Cognitiva</h3>
      <p style={{ color: 'var(--text-muted)' }}>Encuentra los pares planetarios para reactivar el radar. Fallos ociapan energía.</p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem', color: 'var(--gold-star)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Star size={18} /> Intentos del Radar: {moves}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', maxWidth: '600px', margin: '0 auto' }}>
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || solved.includes(index);
          return (
            <motion.div
              key={card.uniqueId}
              onClick={() => handleClick(index)}
              initial={false}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
              style={{
                width: '100%',
                aspectRatio: '1',
                background: isFlipped ? card.bg : 'var(--dark-bg)',
                border: isFlipped ? 'none' : '2px solid rgba(255,255,255,0.2)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: isFlipped ? `0 0 15px ${card.bg}` : 'none',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Cara Frontal (Ocultar si no está volteada usando react condicional en lugar de CSS complejo para evitar bugs Z-index) */}
              {isFlipped ? (
                <img src={card.img} alt={card.id} style={{ width: '80%', height: '80%', objectFit: 'contain', transform: 'rotateY(180deg)' }} />
              ) : (
                <Star size={30} color="rgba(255,255,255,0.2)" />
              )}
            </motion.div>
          );
        })}
      </div>

      {solved.length === cards.length && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }}
          style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(0,255,136,0.1)', borderRadius: '12px', border: '1px solid var(--success)', color: 'var(--success)' }}
        >
          <h2 style={{ margin: 0 }}>¡Radar Estelar Calibrado!</h2>
          <p>Has asegurado las conexiones planetarias en {moves} intentos.</p>
        </motion.div>
      )}

      {solved.length < cards.length && (
        <button onClick={initializeGame} style={{ marginTop: '2rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <RotateCcw size={16} /> Reiniciar Sistema
        </button>
      )}
    </div>
  );
}
