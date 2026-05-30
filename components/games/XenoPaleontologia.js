'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Star, Search, Crosshair } from 'lucide-react';

// Fossil shapes defined as polygon paths (relative to center)
const FOSSILS = [
  {
    name: 'Trilobites Marciano',
    path: [[-20,0],[-15,-15],[-5,-22],[10,-20],[20,-8],[18,10],[8,22],[-8,20],[-18,8]],
    color: '#8B6914',
    glow: '#CC9900',
    hint: 'Crustáceo primitivo con segmentos repetitivos',
    pts: 300
  },
  {
    name: 'Helioida Polar',
    path: [[0,-25],[8,-8],[24,-8],[12,5],[18,22],[0,12],[-18,22],[-12,5],[-24,-8],[-8,-8]],
    color: '#6B4A8B',
    glow: '#AA66FF',
    hint: 'Coral espiral hexagonal de alta mar',
    pts: 400
  },
  {
    name: 'Bacilomorfo Cristalino',
    path: [[-8,-28],[8,-28],[12,-10],[8,10],[12,28],[-12,28],[-8,10],[-12,-10]],
    color: '#2A6B4A',
    glow: '#44AA77',
    hint: 'Bacteria fosilizada de forma elongada',
    pts: 250
  }
];

export default function XenoPaleontologia({ onComplete }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const [gameState, setGameState] = useState('digging'); // digging, won, lost
  const [timeLeft, setTimeLeft] = useState(60);
  const [integrity, setIntegrity] = useState(100);
  const [score, setScore] = useState(0);
  const [currentFossil] = useState(() => FOSSILS[Math.floor(Math.random() * FOSSILS.length)]);
  const [revealed, setRevealed] = useState(false);
  const [message, setMessage] = useState('');
  const [hintsUsed, setHintsUsed] = useState(0);

  const iceRef = useRef(null); // offscreen canvas for ice texture
  const W = 700, H = 420;
  const FOSSIL_CX = W / 2, FOSSIL_CY = H / 2;
  const BRUSH_RADIUS = 22;

  // Build ice canvas
  useEffect(() => {
    const offscreen = document.createElement('canvas');
    offscreen.width = W;
    offscreen.height = H;
    const ctx = offscreen.getContext('2d');

    // Base ice gradient
    const grad = ctx.createRadialGradient(W/2, H/2, 50, W/2, H/2, W/2);
    grad.addColorStop(0, '#b8d8f0');
    grad.addColorStop(0.5, '#7ab0d4');
    grad.addColorStop(1, '#4a82aa');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Ice cracks
    ctx.strokeStyle = 'rgba(200,230,255,0.6)';
    ctx.lineWidth = 1.5;
    for (let c = 0; c < 25; c++) {
      const cx = Math.random() * W;
      const cy = Math.random() * H;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      let x = cx, y = cy;
      for (let s = 0; s < 5; s++) {
        x += (Math.random() - 0.5) * 60;
        y += (Math.random() - 0.5) * 60;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // Ice bubbles
    for (let b = 0; b < 40; b++) {
      const bx = Math.random() * W, by = Math.random() * H;
      const br = Math.random() * 5 + 2;
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.beginPath(); ctx.arc(bx, by, br, 0, Math.PI * 2); ctx.fill();
    }

    iceRef.current = offscreen;
  }, []);

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Deep background
      ctx.fillStyle = '#0a1520';
      ctx.fillRect(0, 0, W, H);

      // Draw fossil underneath (slightly blurred look)
      ctx.save();
      ctx.globalAlpha = 0.5;
      ctx.translate(FOSSIL_CX, FOSSIL_CY);
      ctx.fillStyle = currentFossil.color;
      ctx.shadowColor = currentFossil.glow;
      ctx.shadowBlur = 20;
      ctx.beginPath();
      currentFossil.path.forEach(([px, py], i) => i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py));
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Ice layer
      if (iceRef.current) {
        ctx.drawImage(iceRef.current, 0, 0);
      }

      // Glitter/sparkle on ice surface
      t += 0.016;
      for (let g = 0; g < 15; g++) {
        const gx = (g * 53 + 20) % W;
        const gy = (g * 37 + 15) % H;
        const ga = Math.sin(t * 2 + g) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(255,255,255,${ga * 0.6})`;
        ctx.beginPath(); ctx.arc(gx, gy, 2, 0, Math.PI * 2); ctx.fill();
      }

      // Excavation scanning line
      const scanY = (Math.sin(t * 0.8) * 0.5 + 0.5) * H;
      ctx.strokeStyle = 'rgba(0,228,255,0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, scanY); ctx.lineTo(W, scanY); ctx.stroke();

      // Instruction overlay
      if (gameState === 'digging') {
        ctx.fillStyle = 'rgba(0,10,30,0.55)';
        ctx.fillRect(10, 10, 220, 50);
        ctx.fillStyle = '#00E4FF';
        ctx.font = '11px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('🔬 Arrastra para excavar el hielo', 18, 28);
        ctx.fillText('⚠️ Cuidado: daña el fósil = -integridad', 18, 44);
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [gameState, currentFossil]);

  // Timer
  useEffect(() => {
    if (gameState !== 'digging') return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { setGameState('lost'); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState]);

  const dig = (e) => {
    if (gameState !== 'digging' || !iceRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = W / rect.width;
    const scaleY = H / rect.height;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top) * scaleY;

    // Erase from ice canvas
    const ctx = iceRef.current.getContext('2d');
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    const grad = ctx.createRadialGradient(mx, my, 0, mx, my, BRUSH_RADIUS);
    grad.addColorStop(0, 'rgba(0,0,0,1)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(mx, my, BRUSH_RADIUS, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // Check if digging near fossil (integrity damage)
    const dxFossil = mx - FOSSIL_CX;
    const dyFossil = my - FOSSIL_CY;
    const distFossil = Math.sqrt(dxFossil * dxFossil + dyFossil * dyFossil);
    
    if (distFossil < 30) {
      setIntegrity(prev => {
        const next = Math.max(0, prev - 3);
        if (next <= 0) setGameState('lost');
        return next;
      });
    }

    // Check how much ice remains over fossil area
    const sampleCtx = iceRef.current.getContext('2d');
    const sampleData = sampleCtx.getImageData(FOSSIL_CX - 25, FOSSIL_CY - 25, 50, 50).data;
    let transparentPixels = 0;
    const totalPixels = 50 * 50;
    for (let i = 3; i < sampleData.length; i += 4) {
      if (sampleData[i] < 50) transparentPixels++;
    }
    const revealPercent = transparentPixels / totalPixels;
    
    if (revealPercent > 0.7 && !revealed) {
      setRevealed(true);
      const pts = Math.floor(currentFossil.pts * (integrity / 100) + timeLeft * 2);
      setScore(pts);
      setMessage(`🏺 ¡${currentFossil.name} descubierto! Integridad: ${Math.round(integrity)}%`);
      setTimeout(() => {
        setGameState('won');
        if (onComplete) onComplete(pts);
      }, 2000);
    }
  };

  const isDragging = useRef(false);
  const handleDown = (e) => { isDragging.current = true; dig(e); };
  const handleMove = (e) => { if (isDragging.current) dig(e); };
  const handleUp = () => { isDragging.current = false; };

  const integrityColor = integrity > 60 ? '#00FF88' : integrity > 30 ? '#FFD700' : '#FF4444';
  const timeColor = timeLeft > 30 ? '#00FF88' : timeLeft > 15 ? '#FFD700' : '#FF4444';

  return (
    <div style={{ background: 'rgba(0,0,0,0.9)', borderRadius: '20px', border: '1px solid rgba(100,180,255,0.3)', overflow: 'hidden' }}>
      {/* HUD */}
      <div style={{ padding: '0.8rem 1.2rem', display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,20,40,0.5)', flexWrap: 'wrap' }}>
        <span style={{ color: '#88CCFF', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          🔬 Xeno-Paleontología
        </span>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.4)', padding: '4px 12px', borderRadius: '20px', border: `1px solid ${integrityColor}44` }}>
          <span style={{ fontSize: '0.75rem', color: '#aaa' }}>INTEGRIDAD</span>
          <div style={{ width: '70px', height: '8px', background: '#111', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${integrity}%`, height: '100%', background: integrityColor, transition: 'width 0.2s, background 0.5s' }}/>
          </div>
          <span style={{ color: integrityColor, fontFamily: 'monospace', fontSize: '0.8rem' }}>{Math.round(integrity)}%</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.4)', padding: '4px 12px', borderRadius: '20px', border: `1px solid ${timeColor}44` }}>
          <Clock size={14} color={timeColor} />
          <span style={{ color: timeColor, fontFamily: 'monospace' }}>{timeLeft}s</span>
        </div>

        <div style={{ background: 'rgba(100,180,255,0.1)', border: '1px solid rgba(100,180,255,0.3)', borderRadius: '8px', padding: '3px 10px' }}>
          <span style={{ color: '#88CCFF', fontSize: '0.8rem' }}>Objetivo: <strong>{currentFossil.name}</strong></span>
        </div>

        <div style={{ color: '#888', fontSize: '0.78rem', marginLeft: 'auto', fontStyle: 'italic' }}>
          💡 {currentFossil.hint}
        </div>
      </div>

      {message && (
        <div style={{ background: 'rgba(0,80,40,0.8)', color: '#00FF88', padding: '5px 16px', textAlign: 'center', fontSize: '0.9rem', borderBottom: '1px solid rgba(0,255,136,0.2)' }}>
          {message}
        </div>
      )}

      {/* Canvas */}
      <div style={{ position: 'relative' }}>
        <canvas
          ref={canvasRef}
          width={W} height={H}
          style={{ display: 'block', width: '100%', cursor: 'crosshair' }}
          onMouseDown={handleDown}
          onMouseMove={handleMove}
          onMouseUp={handleUp}
          onMouseLeave={handleUp}
        />

        {/* End screens */}
        <AnimatePresence>
          {(gameState === 'won' || gameState === 'lost') && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ position: 'absolute', inset: 0, background: gameState === 'won' ? 'rgba(0,40,20,0.9)' : 'rgba(30,5,0,0.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', backdropFilter: 'blur(6px)' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '0.8rem' }}>{gameState === 'won' ? '🏺' : '❄️'}</div>
              <h2 style={{ color: gameState === 'won' ? '#00FF88' : '#FF8844', margin: '0 0 0.5rem' }}>
                {gameState === 'won' ? `¡${currentFossil.name} Descubierto!` : integrity <= 0 ? 'Fósil Destruido' : 'Tiempo Agotado'}
              </h2>
              <p style={{ color: '#ccc', maxWidth: '380px', marginBottom: '0.5rem' }}>
                {gameState === 'won' ? `Integridad preservada: ${Math.round(integrity)}%` : `El fósil no pudo ser recuperado.`}
              </p>
              {gameState === 'won' && (
                <div style={{ background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)', borderRadius: '10px', padding: '0.5rem 1.5rem', marginBottom: '1rem' }}>
                  <span style={{ color: '#FFD700', fontFamily: 'monospace', fontSize: '1.2rem', fontWeight: 'bold' }}>⭐ {score} pts</span>
                </div>
              )}
              <button onClick={() => window.location.reload()} style={{ background: gameState === 'won' ? '#00FF88' : '#FF8844', color: 'black', border: 'none', padding: '0.8rem 2rem', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
                Nueva Excavación
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
