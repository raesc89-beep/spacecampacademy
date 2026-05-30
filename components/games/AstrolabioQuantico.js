'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, CheckCircle, Clock, Star, Telescope } from 'lucide-react';

const PIECES = [
  { id: 0, label: 'Anillo Ecuatorial', targetAngle: 0, color: '#00E4FF', description: 'Marca el ecuador celestial' },
  { id: 1, label: 'Anillo Zodiacal', targetAngle: 45, color: '#FFD700', description: 'Posición de las constelaciones' },
  { id: 2, label: 'Anillo Meridiano', targetAngle: 90, color: '#9933FF', description: 'Calcula la longitud' },
  { id: 3, label: 'Puntero Solar', targetAngle: 135, color: '#FF6600', description: 'Traza el camino del Sol' },
  { id: 4, label: 'Araña Central', targetAngle: 180, color: '#00FF88', description: 'Núcleo del astrolabio' },
];

function shuffleAngle() {
  return Math.floor(Math.random() * 8) * 45; // multiples of 45° only
}

export default function AstrolabioQuantico({ onComplete }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const [pieces, setPieces] = useState(() =>
    PIECES.map(p => ({ ...p, currentAngle: shuffleAngle(), placed: false }))
  );
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [gameState, setGameState] = useState('playing'); // playing, won, lost
  const [message, setMessage] = useState('');
  const [hintsLeft, setHintsLeft] = useState(3);

  // Nebula background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let t = 0;
    const draw = () => {
      ctx.fillStyle = '#01020a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Animated nebula layers
      for (let i = 0; i < 4; i++) {
        const cx = canvas.width / 2 + Math.sin(t * 0.4 + i * 1.5) * 60;
        const cy = canvas.height / 2 + Math.cos(t * 0.3 + i * 1.2) * 40;
        const grad = ctx.createRadialGradient(cx, cy, 5, cx, cy, 120 + i * 30);
        const colors = ['rgba(0,80,140,0.25)', 'rgba(80,0,140,0.2)', 'rgba(0,120,80,0.2)', 'rgba(140,60,0,0.18)'];
        grad.addColorStop(0, colors[i]);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
      }
      // Stars
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      for (let s = 0; s < 60; s++) {
        const sx = ((s * 137.5) % canvas.width);
        const sy = ((s * 89.3 + 50) % canvas.height);
        const sz = Math.sin(t * 0.5 + s) * 0.5 + 0.5;
        ctx.globalAlpha = sz * 0.8;
        ctx.beginPath();
        ctx.arc(sx, sy, sz * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      t += 0.016;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { setGameState('lost'); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState]);

  // Win check
  useEffect(() => {
    if (pieces.every(p => p.placed) && gameState === 'playing') {
      setGameState('won');
      const bonus = Math.floor(timeLeft * 5 + score);
      if (onComplete) onComplete(bonus);
    }
  }, [pieces, gameState]);

  const rotatePiece = (id, delta) => {
    if (gameState !== 'playing') return;
    setPieces(prev => prev.map(p =>
      p.id === id ? { ...p, currentAngle: (p.currentAngle + delta + 360) % 360 } : p
    ));
  };

  const placePiece = (id) => {
    if (gameState !== 'playing') return;
    const piece = pieces.find(p => p.id === id);
    if (!piece || piece.placed) return;
    const diff = Math.abs(piece.currentAngle - piece.targetAngle) % 360;
    const tolerance = 22;
    if (diff <= tolerance || diff >= 360 - tolerance) {
      setPieces(prev => prev.map(p => p.id === id ? { ...p, placed: true, currentAngle: p.targetAngle } : p));
      const pts = Math.max(50, 150 - Math.floor(diff));
      setScore(s => s + pts);
      setMessage(`✅ ${piece.label} encajada! +${pts} pts`);
      setTimeout(() => setMessage(''), 2000);
    } else {
      setMessage(`❌ Ángulo incorrecto. Estás a ${Math.round(Math.min(diff, 360 - diff))}° del target.`);
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const useHint = () => {
    if (hintsLeft <= 0 || !selectedPiece) return;
    const piece = pieces.find(p => p.id === selectedPiece);
    if (!piece || piece.placed) return;
    setHintsLeft(h => h - 1);
    const diff = (piece.targetAngle - piece.currentAngle + 360) % 360;
    const delta = diff > 180 ? -(360 - diff) : diff;
    setMessage(`💡 Rota ${delta > 0 ? '+' : ''}${Math.round(delta)}° para encajar ${piece.label}`);
    setTimeout(() => setMessage(''), 3000);
  };

  const timerColor = timeLeft > 30 ? '#00FF88' : timeLeft > 10 ? '#FFD700' : '#FF4444';

  return (
    <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.8)', borderRadius: '20px', border: '1px solid rgba(0,228,255,0.3)', position: 'relative', overflow: 'hidden' }}>
      <canvas ref={canvasRef} width={700} height={200} style={{ position: 'absolute', inset: 0, width: '100%', height: '200px', opacity: 0.6, pointerEvents: 'none', borderRadius: '20px 20px 0 0' }} />
      
      {/* Header */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <Telescope color="#00E4FF" size={28} />
          <div>
            <h3 style={{ margin: 0, color: '#00E4FF', fontSize: '1.2rem' }}>Astrolabio Cuántico</h3>
            <p style={{ margin: 0, color: '#888', fontSize: '0.8rem' }}>Alinea los anillos del astrolabio al ángulo correcto</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', background: 'rgba(0,0,0,0.6)', padding: '6px 14px', borderRadius: '8px', border: '1px solid rgba(255,215,0,0.3)' }}>
            <Star size={14} color="#FFD700" style={{ display: 'inline', marginRight: 4 }} />
            <span style={{ color: '#FFD700', fontWeight: 'bold', fontFamily: 'monospace' }}>{score}</span>
          </div>
          <div style={{ textAlign: 'center', background: 'rgba(0,0,0,0.6)', padding: '6px 14px', borderRadius: '8px', border: `1px solid ${timerColor}44` }}>
            <Clock size={14} color={timerColor} style={{ display: 'inline', marginRight: 4 }} />
            <span style={{ color: timerColor, fontWeight: 'bold', fontFamily: 'monospace' }}>{timeLeft}s</span>
          </div>
          <button onClick={useHint} disabled={hintsLeft <= 0 || !selectedPiece} style={{ background: 'rgba(153,51,255,0.2)', border: '1px solid #9933FF', color: '#9933FF', padding: '6px 12px', borderRadius: '8px', cursor: hintsLeft > 0 && selectedPiece ? 'pointer' : 'not-allowed', fontSize: '0.8rem' }}>
            💡 Pista ({hintsLeft})
          </button>
        </div>
      </div>

      <AnimatePresence>
        {message && (
          <motion.div key={message} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ textAlign: 'center', padding: '0.6rem', background: 'rgba(0,0,0,0.7)', borderRadius: '8px', color: 'white', marginBottom: '1rem', fontSize: '0.95rem', border: '1px solid rgba(255,255,255,0.15)' }}>
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Astrolabe Visual */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
        {/* Central astrolabe display */}
        <div style={{ flexShrink: 0, position: 'relative', width: '200px', height: '200px' }}>
          {/* Outer ring decoration */}
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '3px solid rgba(0,228,255,0.3)', boxShadow: '0 0 30px rgba(0,228,255,0.1), inset 0 0 30px rgba(0,228,255,0.05)' }} />
          {/* Degree markers */}
          {[0,45,90,135,180,225,270,315].map(angle => (
            <div key={angle} style={{ position: 'absolute', top: '50%', left: '50%', width: '2px', height: '12px', background: 'rgba(0,228,255,0.4)', transformOrigin: '50% 100px', transform: `rotate(${angle}deg) translateX(-50%)` }} />
          ))}
          {/* Placed rings visualization */}
          {pieces.filter(p => p.placed).map((p, i) => (
            <div key={p.id} style={{ position: 'absolute', inset: `${i * 12}px`, borderRadius: '50%', border: `2px solid ${p.color}`, boxShadow: `0 0 10px ${p.color}55`, transform: `rotate(${p.currentAngle}deg)` }}>
              <div style={{ position: 'absolute', top: '-6px', left: '50%', transform: 'translateX(-50%)', width: '10px', height: '10px', background: p.color, borderRadius: '50%', boxShadow: `0 0 8px ${p.color}` }} />
            </div>
          ))}
          {/* Center dot */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '20px', height: '20px', borderRadius: '50%', background: 'radial-gradient(circle, #00E4FF, #00406A)', boxShadow: '0 0 15px #00E4FF' }} />
          {/* Progress label */}
          <div style={{ position: 'absolute', bottom: '-30px', left: '50%', transform: 'translateX(-50%)', color: '#888', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
            {pieces.filter(p => p.placed).length} / {pieces.length} anillos colocados
          </div>
        </div>

        {/* Piece Controls */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {pieces.map(piece => (
            <motion.div
              key={piece.id}
              onClick={() => !piece.placed && setSelectedPiece(piece.id === selectedPiece ? null : piece.id)}
              whileHover={!piece.placed ? { scale: 1.02 } : {}}
              style={{
                padding: '0.8rem 1rem',
                background: piece.placed ? 'rgba(0,255,136,0.08)' : selectedPiece === piece.id ? `rgba(${piece.color.replace('#','').match(/.{2}/g).map(h=>parseInt(h,16)).join(',')},0.15)` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${piece.placed ? '#00FF88' : selectedPiece === piece.id ? piece.color : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '10px',
                cursor: piece.placed ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                transition: 'all 0.2s',
                boxShadow: selectedPiece === piece.id && !piece.placed ? `0 0 15px ${piece.color}33` : 'none'
              }}
            >
              {/* Ring preview */}
              <div style={{ position: 'relative', width: '40px', height: '40px', flexShrink: 0 }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `2px solid ${piece.color}`, transform: `rotate(${piece.currentAngle}deg)`, boxShadow: `0 0 8px ${piece.color}44` }}>
                  <div style={{ position: 'absolute', top: '-4px', left: '50%', transform: 'translateX(-50%)', width: '7px', height: '7px', background: piece.color, borderRadius: '50%' }} />
                </div>
                {piece.placed && <CheckCircle color="#00FF88" size={18} style={{ position: 'absolute', inset: 0, margin: 'auto' }} />}
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ color: piece.placed ? '#00FF88' : 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>
                  {piece.placed ? '✓ ' : ''}{piece.label}
                </div>
                <div style={{ color: '#666', fontSize: '0.75rem' }}>{piece.description}</div>
                {!piece.placed && (
                  <div style={{ color: '#888', fontSize: '0.75rem', marginTop: '2px', fontFamily: 'monospace' }}>
                    Ángulo actual: {piece.currentAngle}°
                  </div>
                )}
              </div>

              {!piece.placed && (
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  <button onClick={(e) => { e.stopPropagation(); rotatePiece(piece.id, -45); }}
                    style={{ background: `rgba(${piece.color.replace('#','').match(/.{2}/g).map(h=>parseInt(h,16)).join(',')},0.2)`, border: `1px solid ${piece.color}`, color: piece.color, width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>
                    ↺
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); rotatePiece(piece.id, 45); }}
                    style={{ background: `rgba(${piece.color.replace('#','').match(/.{2}/g).map(h=>parseInt(h,16)).join(',')},0.2)`, border: `1px solid ${piece.color}`, color: piece.color, width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>
                    ↻
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); placePiece(piece.id); }}
                    style={{ background: `rgba(${piece.color.replace('#','').match(/.{2}/g).map(h=>parseInt(h,16)).join(',')},0.3)`, border: `2px solid ${piece.color}`, color: 'white', padding: '4px 10px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>
                    COLOCAR
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* End screens */}
      <AnimatePresence>
        {(gameState === 'won' || gameState === 'lost') && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ position: 'absolute', inset: 0, background: gameState === 'won' ? 'rgba(0,255,136,0.15)' : 'rgba(255,42,42,0.15)', backdropFilter: 'blur(8px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', zIndex: 20, textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{gameState === 'won' ? '🏆' : '⏰'}</div>
            <h2 style={{ color: gameState === 'won' ? '#00FF88' : '#FF4444', fontSize: '2rem', margin: '0 0 0.5rem' }}>
              {gameState === 'won' ? '¡Astrolabio Calibrado!' : 'Tiempo Agotado'}
            </h2>
            <p style={{ color: '#ccc', marginBottom: '1.5rem' }}>
              {gameState === 'won' ? `Has dominado las esferas celestes con ${score} puntos.` : `Completaste ${pieces.filter(p=>p.placed).length} de ${pieces.length} anillos.`}
            </p>
            <button onClick={() => window.location.reload()} style={{ background: gameState === 'won' ? '#00FF88' : '#FF4444', color: gameState === 'won' ? 'black' : 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
              Intentar de Nuevo
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
