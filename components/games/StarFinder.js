'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

// ═══════════════════════════════════════════════════════
//   RADAR DE ANOMALÍAS — Click the blips before they fade
// ═══════════════════════════════════════════════════════

const CANVAS_SIZE = 500;
const CENTER = CANVAS_SIZE / 2;
const RADAR_RADIUS = 210;
const TOTAL_ROUNDS = 10;

const ANOMALY_TYPES = [
  { type: 'star',       emoji: '⭐', label: 'Estrella',      color: '#00ff88', points: 10, duration: 3000, radius: 18 },
  { type: 'planet',     emoji: '🪐', label: 'Planeta',       color: '#ffd700', points: 20, duration: 2200, radius: 16 },
  { type: 'blackhole',  emoji: '🕳️', label: 'Agujero Negro', color: '#ff4444', points: 40, duration: 1500, radius: 14 },
];

function randomInCircle(maxR, minR = 40) {
  const angle = Math.random() * Math.PI * 2;
  const r = minR + Math.random() * (maxR - minR);
  return {
    x: CENTER + Math.cos(angle) * r,
    y: CENTER + Math.sin(angle) * r,
  };
}

export default function StarFinder({ onComplete }) {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('ready'); // ready, playing, finished
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [feedback, setFeedback] = useState(null); // { text, color, x, y }
  
  const gameRef = useRef({
    sweepAngle: 0,
    anomalies: [],    // active anomalies on screen
    rings: [],        // pulse ring animations
    particles: [],    // hit particles
    animId: null,
    lastSpawn: 0,
    roundTimer: null,
    spawnInterval: 2500,
  });

  // Main render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const draw = (timestamp) => {
      gameRef.current.animId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

      // ── Background ──
      const bgGrad = ctx.createRadialGradient(CENTER, CENTER, 0, CENTER, CENTER, CANVAS_SIZE / 2);
      bgGrad.addColorStop(0, '#0a1a0a');
      bgGrad.addColorStop(0.5, '#061208');
      bgGrad.addColorStop(1, '#020804');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

      // ── Radar grid circles ──
      for (let i = 1; i <= 4; i++) {
        const r = (RADAR_RADIUS / 4) * i;
        ctx.strokeStyle = `rgba(0,255,100,${0.06 + i * 0.02})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(CENTER, CENTER, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // ── Cross lines ──
      ctx.strokeStyle = 'rgba(0,255,100,0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(CENTER, CENTER - RADAR_RADIUS);
      ctx.lineTo(CENTER, CENTER + RADAR_RADIUS);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(CENTER - RADAR_RADIUS, CENTER);
      ctx.lineTo(CENTER + RADAR_RADIUS, CENTER);
      ctx.stroke();
      // Diagonal lines
      const diag = RADAR_RADIUS * 0.707;
      ctx.beginPath();
      ctx.moveTo(CENTER - diag, CENTER - diag);
      ctx.lineTo(CENTER + diag, CENTER + diag);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(CENTER + diag, CENTER - diag);
      ctx.lineTo(CENTER - diag, CENTER + diag);
      ctx.stroke();

      // ── Radar outer ring ──
      ctx.strokeStyle = 'rgba(0,255,100,0.25)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(CENTER, CENTER, RADAR_RADIUS, 0, Math.PI * 2);
      ctx.stroke();

      // ── Center dot ──
      ctx.fillStyle = 'rgba(0,255,100,0.6)';
      ctx.beginPath();
      ctx.arc(CENTER, CENTER, 3, 0, Math.PI * 2);
      ctx.fill();

      // ── Sweep line ──
      if (gameState === 'playing' || gameState === 'ready') {
        gameRef.current.sweepAngle += 0.02;
        const sweepAngle = gameRef.current.sweepAngle;
        
        // Sweep trail (gradient cone)
        const trailLength = 0.5; // radians
        for (let i = 0; i < 20; i++) {
          const a = sweepAngle - (trailLength * i / 20);
          const alpha = 0.15 * (1 - i / 20);
          ctx.strokeStyle = `rgba(0,255,100,${alpha})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(CENTER, CENTER);
          ctx.lineTo(
            CENTER + Math.cos(a) * RADAR_RADIUS,
            CENTER + Math.sin(a) * RADAR_RADIUS
          );
          ctx.stroke();
        }
        
        // Main sweep line
        ctx.strokeStyle = 'rgba(0,255,100,0.8)';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#00ff64';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(CENTER, CENTER);
        ctx.lineTo(
          CENTER + Math.cos(sweepAngle) * RADAR_RADIUS,
          CENTER + Math.sin(sweepAngle) * RADAR_RADIUS
        );
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // ── Anomalies ──
      const now = Date.now();
      gameRef.current.anomalies = gameRef.current.anomalies.filter(a => {
        const age = now - a.spawnTime;
        const lifeRatio = 1 - age / a.duration;
        if (lifeRatio <= 0) {
          // Expired — count as miss
          if (gameState === 'playing') {
            setMisses(p => p + 1);
          }
          return false;
        }

        // Pulsing blip
        const pulse = 0.8 + 0.2 * Math.sin(age * 0.01);
        const baseAlpha = Math.min(1, lifeRatio * 2) * pulse;
        
        // Outer glow
        ctx.fillStyle = a.color.replace(')', `,${baseAlpha * 0.15})`).replace('rgb', 'rgba');
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Inner blip
        ctx.fillStyle = a.color.replace(')', `,${baseAlpha * 0.7})`).replace('rgb', 'rgba');
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Bright core
        ctx.fillStyle = `rgba(255,255,255,${baseAlpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius * 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = `rgba(255,255,255,${baseAlpha * 0.8})`;
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(a.label, a.x, a.y + a.radius + 14);

        // Life bar
        const barW = a.radius * 2;
        const barH = 3;
        const barX = a.x - barW / 2;
        const barY = a.y - a.radius - 8;
        ctx.fillStyle = `rgba(255,255,255,${baseAlpha * 0.15})`;
        ctx.fillRect(barX, barY, barW, barH);
        ctx.fillStyle = a.color.replace(')', `,${baseAlpha * 0.8})`).replace('rgb', 'rgba');
        ctx.fillRect(barX, barY, barW * lifeRatio, barH);

        return true;
      });

      // ── Pulse rings (from hits) ──
      gameRef.current.rings = gameRef.current.rings.filter(ring => {
        ring.radius += 2;
        ring.alpha -= 0.03;
        if (ring.alpha <= 0) return false;
        ctx.strokeStyle = ring.color.replace(')', `,${ring.alpha})`).replace('rgb', 'rgba');
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
        ctx.stroke();
        return true;
      });

      // ── Hit particles ──
      gameRef.current.particles = gameRef.current.particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.025;
        if (p.life <= 0) return false;
        ctx.fillStyle = p.color.replace(')', `,${p.life})`).replace('rgb', 'rgba');
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2 * p.life, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      // ── HUD overlay ──
      if (gameState === 'playing') {
        // Score
        ctx.fillStyle = 'rgba(0,255,100,0.8)';
        ctx.font = 'bold 14px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`SCORE: ${score}`, 20, 25);
        
        // Round
        ctx.textAlign = 'right';
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fillText(`RONDA ${round}/${TOTAL_ROUNDS}`, CANVAS_SIZE - 20, 25);
        
        // Hit ratio
        const total = hits + misses;
        const ratio = total > 0 ? Math.round((hits / total) * 100) : 100;
        ctx.textAlign = 'left';
        ctx.fillStyle = ratio >= 70 ? 'rgba(0,255,100,0.6)' : 'rgba(255,100,100,0.6)';
        ctx.font = '11px monospace';
        ctx.fillText(`PRECISION: ${ratio}%`, 20, 42);
      }

      // ── Spawn anomalies ──
      if (gameState === 'playing' && now - gameRef.current.lastSpawn > gameRef.current.spawnInterval) {
        spawnAnomaly();
        gameRef.current.lastSpawn = now;
      }
    };

    gameRef.current.animId = requestAnimationFrame(draw);
    return () => {
      if (gameRef.current.animId) cancelAnimationFrame(gameRef.current.animId);
    };
  }, [gameState, score, round, hits, misses]);

  const spawnAnomaly = useCallback(() => {
    const difficulty = round / TOTAL_ROUNDS; // 0 to 1
    // Higher difficulty = more black holes
    let typeIdx;
    const roll = Math.random();
    if (roll < 0.2 + difficulty * 0.3) typeIdx = 2; // blackhole
    else if (roll < 0.5 + difficulty * 0.1) typeIdx = 1; // planet
    else typeIdx = 0; // star

    const type = ANOMALY_TYPES[typeIdx];
    const pos = randomInCircle(RADAR_RADIUS - 20);
    
    // Check no overlap with existing anomalies
    const tooClose = gameRef.current.anomalies.some(a => {
      const dx = a.x - pos.x;
      const dy = a.y - pos.y;
      return Math.sqrt(dx * dx + dy * dy) < 50;
    });
    if (tooClose) return;

    const durationMultiplier = Math.max(0.5, 1 - difficulty * 0.4);
    
    gameRef.current.anomalies.push({
      ...pos,
      type: type.type,
      label: type.label,
      color: `rgb(${hexToRgb(type.color)})`,
      points: type.points,
      radius: type.radius,
      duration: type.duration * durationMultiplier,
      spawnTime: Date.now(),
    });

    setRound(prev => {
      const next = prev + 1;
      if (next > TOTAL_ROUNDS) {
        // Game over after spawning enough
        setTimeout(() => {
          setGameState('finished');
          if (onComplete) onComplete(score);
        }, 3000);
      }
      // Increase spawn rate slightly
      gameRef.current.spawnInterval = Math.max(800, 2500 - next * 120);
      return next;
    });
  }, [round, score, onComplete]);

  const handleCanvasClick = useCallback((e) => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_SIZE / rect.width;
    const scaleY = CANVAS_SIZE / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    // Check if clicked on an anomaly
    let hitAnomaly = null;
    let hitIdx = -1;
    for (let i = gameRef.current.anomalies.length - 1; i >= 0; i--) {
      const a = gameRef.current.anomalies[i];
      const dx = clickX - a.x;
      const dy = clickY - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < a.radius * 2.5) {
        hitAnomaly = a;
        hitIdx = i;
        break;
      }
    }

    if (hitAnomaly) {
      // HIT!
      gameRef.current.anomalies.splice(hitIdx, 1);
      setScore(prev => prev + hitAnomaly.points);
      setHits(prev => prev + 1);

      // Pulse ring
      gameRef.current.rings.push({
        x: hitAnomaly.x,
        y: hitAnomaly.y,
        radius: hitAnomaly.radius,
        alpha: 0.8,
        color: hitAnomaly.color,
      });

      // Particles
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        gameRef.current.particles.push({
          x: hitAnomaly.x,
          y: hitAnomaly.y,
          vx: Math.cos(angle) * (2 + Math.random() * 3),
          vy: Math.sin(angle) * (2 + Math.random() * 3),
          life: 1,
          color: hitAnomaly.color,
        });
      }

      setFeedback({ text: `+${hitAnomaly.points}`, color: hitAnomaly.color, x: hitAnomaly.x, y: hitAnomaly.y });
      setTimeout(() => setFeedback(null), 800);
    }
  }, [gameState]);

  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setRound(0);
    setHits(0);
    setMisses(0);
    setFeedback(null);
    gameRef.current.anomalies = [];
    gameRef.current.rings = [];
    gameRef.current.particles = [];
    gameRef.current.lastSpawn = 0;
    gameRef.current.spawnInterval = 2500;
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', margin: 0, textAlign: 'center' }}>
        Detecta anomalías en el radar y haz clic antes de que desaparezcan
      </p>

      <div style={{
        position: 'relative',
        borderRadius: '50%',
        overflow: 'hidden',
        border: '2px solid rgba(0,255,100,0.2)',
        boxShadow: '0 0 40px rgba(0,255,100,0.1), inset 0 0 60px rgba(0,0,0,0.5)',
      }}>
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          onClick={handleCanvasClick}
          style={{
            display: 'block',
            cursor: gameState === 'playing' ? 'crosshair' : 'default',
            maxWidth: '100%',
            height: 'auto',
          }}
        />

        {/* Ready overlay */}
        {gameState === 'ready' && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '1rem', borderRadius: '50%',
          }}>
            <div style={{ fontSize: '3rem' }}>📡</div>
            <h3 style={{ color: '#00ff88', margin: 0, fontSize: '1.4rem' }}>Radar de Anomalías</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '300px', textAlign: 'center', fontSize: '0.85rem', lineHeight: 1.5, padding: '0 1rem' }}>
              El radar detecta señales. Haz clic en cada anomalía antes de que se desvanezca. Los agujeros negros valen más pero desaparecen más rápido.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              {ANOMALY_TYPES.map(t => (
                <div key={t.type} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: t.color }}>
                  <span>{t.emoji}</span>
                  <span>{t.points}pts</span>
                </div>
              ))}
            </div>
            <button
              onClick={startGame}
              style={{
                background: 'linear-gradient(135deg, #00ff88, #00cc66)',
                color: '#020804',
                border: 'none',
                padding: '0.8rem 2.5rem',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: "'Outfit', sans-serif",
                boxShadow: '0 0 20px rgba(0,255,100,0.4)',
                marginTop: '0.5rem',
              }}
            >
              📡 Activar Radar
            </button>
          </div>
        )}

        {/* Finished overlay */}
        {gameState === 'finished' && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '1rem', borderRadius: '50%',
          }}>
            <div style={{ fontSize: '3rem' }}>🏆</div>
            <h3 style={{ color: '#00ff88', margin: 0 }}>Escaneo Completado</h3>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
              <p style={{ color: '#ffd700', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>{score} pts</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', margin: 0 }}>
                {hits} aciertos • {misses} fallos • {hits + misses > 0 ? Math.round((hits / (hits + misses)) * 100) : 0}% precisión
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem' }}>
              <button
                onClick={startGame}
                style={{
                  background: 'linear-gradient(135deg, #00ff88, #00cc66)',
                  color: '#020804', border: 'none',
                  padding: '0.7rem 2rem', borderRadius: '10px',
                  fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer',
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                🔄 Otra Vez
              </button>
              <button
                onClick={() => onComplete && onComplete(score)}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white', border: '1px solid rgba(255,255,255,0.2)',
                  padding: '0.7rem 2rem', borderRadius: '10px',
                  fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                Salir
              </button>
            </div>
          </div>
        )}

        {/* Score popup */}
        {feedback && (
          <div style={{
            position: 'absolute',
            left: `${(feedback.x / CANVAS_SIZE) * 100}%`,
            top: `${(feedback.y / CANVAS_SIZE) * 100}%`,
            transform: 'translate(-50%, -50%)',
            color: feedback.color,
            fontSize: '1.5rem',
            fontWeight: 'bold',
            pointerEvents: 'none',
            textShadow: `0 0 10px ${feedback.color}`,
            animation: 'scoreFloat 0.8s ease-out forwards',
          }}>
            {feedback.text}
          </div>
        )}
      </div>

      {/* Legend */}
      {gameState === 'playing' && (
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {ANOMALY_TYPES.map(t => (
            <div key={t.type} style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.3rem 0.8rem', borderRadius: '20px',
              background: `${t.color}10`, border: `1px solid ${t.color}30`,
              fontSize: '0.75rem', color: t.color,
            }}>
              <span>{t.emoji}</span>
              <span>{t.label}</span>
              <span style={{ opacity: 0.6 }}>({t.points}pts)</span>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes scoreFloat {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -150%) scale(1.5); }
        }
      `}</style>
    </div>
  );
}

// ── Utility ──
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
