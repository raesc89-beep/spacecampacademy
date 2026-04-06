'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, RotateCcw, Target } from 'lucide-react';

const WORDS = ["METANO", "PLUTON", "GRAVEDAD", "COMETA", "ASTEROIDE", "ORBITA", "ECLIPSE", "VACIO"];
const GRID_SIZE = 12;

function generateGrid(words) {
  let grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
  let placedWords = [];

  // Función auxiliar para colocar palabra
  words.forEach(word => {
    let placed = false;
    let attempts = 0;
    while (!placed && attempts < 100) {
      attempts++;
      const dir = Math.floor(Math.random() * 3); // 0: horiz, 1: vert, 2: diag
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);

      let canPlace = true;
      if (dir === 0) { // Horizontal
        if (col + word.length > GRID_SIZE) canPlace = false;
        else {
          for (let i = 0; i < word.length; i++) {
            if (grid[row][col + i] !== '' && grid[row][col + i] !== word[i]) canPlace = false;
          }
        }
        if (canPlace) {
          for (let i = 0; i < word.length; i++) grid[row][col + i] = word[i];
          placed = true;
        }
      } else if (dir === 1) { // Vertical
        if (row + word.length > GRID_SIZE) canPlace = false;
        else {
          for (let i = 0; i < word.length; i++) {
            if (grid[row + i][col] !== '' && grid[row + i][col] !== word[i]) canPlace = false;
          }
        }
        if (canPlace) {
          for (let i = 0; i < word.length; i++) grid[row + i][col] = word[i];
          placed = true;
        }
      } else { // Diagonal
        if (row + word.length > GRID_SIZE || col + word.length > GRID_SIZE) canPlace = false;
        else {
          for (let i = 0; i < word.length; i++) {
            if (grid[row + i][col + i] !== '' && grid[row + i][col + i] !== word[i]) canPlace = false;
          }
        }
        if (canPlace) {
          for (let i = 0; i < word.length; i++) grid[row + i][col + i] = word[i];
          placed = true;
        }
      }
    }
    if (placed) placedWords.push(word);
  });

  // Rellenar espacios vacíos
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === '') {
        grid[r][c] = letters.charAt(Math.floor(Math.random() * letters.length));
      }
    }
  }

  return { grid, placedWords };
}

export default function WordSearch({ onComplete }) {
  const [grid, setGrid] = useState([]);
  const [targetWords, setTargetWords] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [selection, setSelection] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);

  const initialize = () => {
    // Seleccionar 5 palabras aleatorias
    const sessionWords = [...WORDS].sort(() => 0.5 - Math.random()).slice(0, 5);
    const result = generateGrid(sessionWords);
    setGrid(result.grid);
    setTargetWords(result.placedWords);
    setFoundWords([]);
    setSelection([]);
  };

  useEffect(() => {
    initialize();
  }, []);

  const handlePointerDown = (r, c) => {
    setIsSelecting(true);
    setSelection([{ r, c }]);
  };

  const handlePointerEnter = (r, c) => {
    if (!isSelecting) return;
    // Logica simple: lineas rectas solamente (horizontal o vertical)
    const start = selection[0];
    if (start.r === r || start.c === c || Math.abs(start.r - r) === Math.abs(start.c - c)) {
      // Reconstruir la ruta
      let newSelection = [];
      const dr = Math.sign(r - start.r);
      const dc = Math.sign(c - start.c);
      const steps = Math.max(Math.abs(r - start.r), Math.abs(c - start.c));
      
      for(let i = 0; i <= steps; i++) {
        newSelection.push({ r: start.r + dr * i, c: start.c + dc * i });
      }
      setSelection(newSelection);
    }
  };

  const handlePointerUp = () => {
    if (!isSelecting) return;
    setIsSelecting(false);
    
    // Extraer palabra formada
    let formedWord = selection.map(pos => grid[pos.r][pos.c]).join('');
    let reversedWord = formedWord.split('').reverse().join('');
    
    let match = targetWords.find(w => w === formedWord || w === reversedWord);
    
    if (match && !foundWords.includes(match)) {
      const newFound = [...foundWords, match];
      setFoundWords(newFound);
      if (newFound.length === targetWords.length) {
        setTimeout(() => {
          if (onComplete) onComplete(10); // Bono de 10 estrellas
        }, 1000);
      }
    }
    
    setSelection([]); // Limpiar selección tras intentar
  };

  const isCellSelected = (r, c) => selection.some(pos => pos.r === r && pos.c === c);

  return (
    <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.4)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <h3 style={{ margin: '0 0 1rem 0', color: 'var(--electric-blue)' }}>Descifrador de Transmisiones (Sopa Sideral)</h3>
      <p style={{ color: 'var(--text-muted)' }}>Arrastra el láser para conectar las letras y encontrar las anomalías léxicas.</p>
      
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {targetWords.map(word => (
          <div key={word} style={{ 
            padding: '0.5rem 1rem', 
            background: foundWords.includes(word) ? 'rgba(0,255,136,0.2)' : 'rgba(255,255,255,0.05)', 
            color: foundWords.includes(word) ? 'var(--success)' : 'white',
            borderRadius: '20px', border: `1px solid ${foundWords.includes(word) ? 'var(--success)' : 'rgba(255,255,255,0.2)'}`,
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            textDecoration: foundWords.includes(word) ? 'line-through' : 'none'
          }}>
            {foundWords.includes(word) && <Target size={14} />} {word}
          </div>
        ))}
      </div>

      <div 
        style={{ display: 'inline-grid', gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, gap: '4px', touchAction: 'none' }}
        onPointerLeave={handlePointerUp}
      >
        {grid.map((row, r) => (
          row.map((letter, c) => (
            <motion.div 
              key={`${r}-${c}`}
              onPointerDown={() => handlePointerDown(r, c)}
              onPointerEnter={() => handlePointerEnter(r, c)}
              onPointerUp={handlePointerUp}
              whileHover={{ scale: 1.1 }}
              style={{
                width: '40px', height: '40px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: isCellSelected(r, c) ? 'var(--electric-blue)' : 'rgba(255,255,255,0.05)',
                color: isCellSelected(r, c) ? 'black' : 'white',
                fontWeight: isCellSelected(r, c) ? 'bold' : 'normal',
                borderRadius: '8px', cursor: 'pointer', userSelect: 'none',
                boxShadow: isCellSelected(r, c) ? '0 0 10px var(--electric-blue)' : 'none'
              }}
            >
              {letter}
            </motion.div>
          ))
        ))}
      </div>

      {foundWords.length === targetWords.length && targetWords.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(0,255,136,0.1)', border: '1px solid var(--success)', borderRadius: '12px', color: 'var(--success)' }}>
          ¡Transmisión descifrada con éxito! Radar restaurado.
        </motion.div>
      )}

      {foundWords.length < targetWords.length && (
         <div style={{ marginTop: '2rem' }}>
           <button onClick={initialize} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
             <RotateCcw size={16} /> Generar Nueva Secuencia
           </button>
         </div>
      )}
    </div>
  );
}
