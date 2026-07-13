'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

// ═══════════════════════════════════════════════════════
//   CONECTA LA ESTACIÓN — Cable Launch Through Asteroid Belts
// ═══════════════════════════════════════════════════════

const CANVAS_W = 800;
const CANVAS_H = 500;
const MAX_LIVES = 5;
const TOTAL_CONNECTIONS = 4;

// Connection point positions on the ISS (right side)
const CONN_POINTS = [
  { id: 'O2',   label: 'O₂',   y: 100, color: '#00e5ff' },
  { id: 'PWR',  label: 'PWR',  y: 200, color: '#ffd700' },
  { id: 'COMM', label: 'COMM', y: 300, color: '#ff6b6b' },
  { id: 'NAV',  label: 'NAV',  y: 400, color: '#7bed9f' },
];

// Asteroid belt configuration per level
const BELT_CONFIGS = [
  { count: 5, speed: 1.2, gapSize: 120 },   // Belt 1 (leftmost)
  { count: 6, speed: -1.5, gapSize: 100 },   // Belt 2 (middle)
  { count: 7, speed: 1.8, gapSize: 90 },     // Belt 3 (rightmost)
];

function createAsteroid(beltX, canvasH, idx, total, speed) {
  const spacing = canvasH / total;
  return {
    x: beltX + (Math.random() - 0.5) * 30,
    y: idx * spacing + Math.random() * 20,
    radius: 12 + Math.random() * 16,
    speed: speed * (0.8 + Math.random() * 0.4),
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.03,
    vertices: Array.from({ length: 7 + Math.floor(Math.random() * 4) }, (_, i) => {
      const angle = (i / (7 + Math.floor(Math.random() * 4))) * Math.PI * 2;
      const variation = 0.6 + Math.random() * 0.4;
      return { angle, r: variation };
    }),
    shade: Math.floor(Math.random() * 3), // 0=dark, 1=med, 2=light
  };
}

function initBelts(canvasH) {
  const beltPositions = [250, 420, 590]; // x positions of the 3 belts
  return BELT_CONFIGS.map((cfg, beltIdx) => ({
    x: beltPositions[beltIdx],
    asteroids: Array.from({ length: cfg.count }, (_, i) =>
      createAsteroid(beltPositions[beltIdx], canvasH, i, cfg.count, cfg.speed)
    ),
    gapSize: cfg.gapSize,
    speed: cfg.speed,
  }));
}

export default function GravedadCero({ onComplete }) {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('ready'); // ready, playing, launching, hit, success, gameover
  const [lives, setLives] = useState(MAX_LIVES);
  const [connected, setConnected] = useState([]);
  const [currentTarget, setCurrentTarget] = useState(0);
  const [score, setScore] = useState(0);
  const [cable, setCable] = useState(null); // { startY, progress, hit }
  
  const gameRef = useRef({
    belts: [],
    stars: [],
    astronautBob: 0,
    cable: null,
    animId: null,
    lastTime: 0,
  });

  // Initialize stars
  useEffect(() => {
    gameRef.current.stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * CANVAS_W,
      y: Math.random() * CANVAS_H,
      r: Math.random() * 1.5 + 0.3,
      twinkleSpeed: Math.random() * 2 + 1,
      twinklePhase: Math.random() * Math.PI * 2,
      brightness: Math.random() * 0.5 + 0.3,
    }));
  }, []);

  // Initialize belts
  useEffect(() => {
    if (gameState === 'playing' || gameState === 'ready') {
      gameRef.current.belts = initBelts(CANVAS_H);
    }
  }, [gameState]);

  // Main game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const draw = (timestamp) => {
      gameRef.current.animId = requestAnimationFrame(draw);
      const dt = Math.min((timestamp - (gameRef.current.lastTime || timestamp)) / 16.67, 3);
      gameRef.current.lastTime = timestamp;

      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      // ── Background gradient ──
      const bgGrad = ctx.createLinearGradient(0, 0, CANVAS_W, CANVAS_H);
      bgGrad.addColorStop(0, '#040816');
      bgGrad.addColorStop(0.5, '#0a0e24');
      bgGrad.addColorStop(1, '#050a18');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // ── Stars with twinkling ──
      const t = timestamp * 0.001;
      for (const star of gameRef.current.stars) {
        const twinkle = star.brightness + 0.3 * Math.sin(t * star.twinkleSpeed + star.twinklePhase);
        ctx.globalAlpha = Math.max(0.1, Math.min(1, twinkle));
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // ── Astronaut (left side) ──
      const astroX = 60;
      const targetConn = CONN_POINTS[currentTarget] || CONN_POINTS[0];
      const astroY = targetConn.y;
      gameRef.current.astronautBob = Math.sin(t * 1.5) * 5;
      const bobY = astroY + gameRef.current.astronautBob;
      drawAstronaut(ctx, astroX, bobY, t);

      // ── ISS (right side) ──
      drawISS(ctx, CANVAS_W - 80, CANVAS_H / 2, connected, currentTarget, t);

      // ── Asteroid belts ──
      for (const belt of gameRef.current.belts) {
        for (const ast of belt.asteroids) {
          // Move asteroids
          ast.y += ast.speed * dt;
          ast.rotation += ast.rotSpeed * dt;
          // Wrap around
          if (ast.speed > 0 && ast.y > CANVAS_H + ast.radius * 2) {
            ast.y = -ast.radius * 2;
            ast.x = belt.x + (Math.random() - 0.5) * 30;
          }
          if (ast.speed < 0 && ast.y < -ast.radius * 2) {
            ast.y = CANVAS_H + ast.radius * 2;
            ast.x = belt.x + (Math.random() - 0.5) * 30;
          }
          drawAsteroid(ctx, ast);
        }
      }

      // ── Cable animation ──
      const cableData = gameRef.current.cable;
      if (cableData && cableData.active) {
        cableData.progress += 4 * dt;
        const endX = CANVAS_W - 110;
        const cableLen = endX - astroX;
        const currentX = astroX + Math.min(cableData.progress, cableLen);
        const cableY = cableData.startY;

        // Draw cable
        ctx.strokeStyle = targetConn.color;
        ctx.lineWidth = 3;
        ctx.shadowColor = targetConn.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(astroX + 15, cableY);
        ctx.lineTo(currentX, cableY);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Cable grapple hook at tip
        ctx.fillStyle = targetConn.color;
        ctx.beginPath();
        ctx.arc(currentX, cableY, 4, 0, Math.PI * 2);
        ctx.fill();

        // Check collision with asteroid belts
        if (!cableData.collisionChecked) {
          for (const belt of gameRef.current.belts) {
            const beltMinX = belt.x - 40;
            const beltMaxX = belt.x + 40;
            if (currentX >= beltMinX && currentX <= beltMaxX) {
              for (const ast of belt.asteroids) {
                const dx = currentX - ast.x;
                const dy = cableY - ast.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < ast.radius + 3) {
                  // HIT!
                  cableData.hit = true;
                  cableData.active = false;
                  cableData.collisionChecked = true;
                  // Explosion particles
                  cableData.particles = Array.from({ length: 12 }, () => ({
                    x: currentX,
                    y: cableY,
                    vx: (Math.random() - 0.5) * 6,
                    vy: (Math.random() - 0.5) * 6,
                    life: 1,
                    color: targetConn.color,
                  }));
                  setLives(prev => {
                    const newLives = prev - 1;
                    if (newLives <= 0) {
                      setTimeout(() => setGameState('gameover'), 800);
                    } else {
                      setTimeout(() => {
                        gameRef.current.cable = null;
                        setCable(null);
                      }, 1000);
                    }
                    return newLives;
                  });
                  break;
                }
              }
              if (cableData.hit) break;
            }
          }
        }

        // Check if cable reached ISS
        if (currentX >= endX && !cableData.hit && !cableData.collisionChecked) {
          cableData.collisionChecked = true;
          cableData.active = false;
          cableData.success = true;
          setConnected(prev => {
            const newConn = [...prev, targetConn.id];
            if (newConn.length >= TOTAL_CONNECTIONS) {
              setScore(s => {
                const finalScore = s + 50;
                setTimeout(() => {
                  setGameState('success');
                  if (onComplete) onComplete(finalScore);
                }, 1200);
                return finalScore;
              });
            } else {
              setScore(s => s + 25);
              setCurrentTarget(t => t + 1);
              setTimeout(() => {
                gameRef.current.cable = null;
                setCable(null);
              }, 800);
            }
            return newConn;
          });
        }

        // Draw explosion particles
        if (cableData.particles) {
          for (const p of cableData.particles) {
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.life -= 0.03 * dt;
            if (p.life > 0) {
              ctx.globalAlpha = p.life;
              ctx.fillStyle = p.color;
              ctx.beginPath();
              ctx.arc(p.x, p.y, 3 * p.life, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          ctx.globalAlpha = 1;
        }
      }

      // ── Connected cables (persistent) ──
      for (let i = 0; i < connected.length; i++) {
        const cp = CONN_POINTS.find(c => c.id === connected[i]);
        if (!cp) continue;
        ctx.strokeStyle = cp.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.5 + 0.2 * Math.sin(t * 2 + i);
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(astroX + 15, cp.y);
        ctx.lineTo(CANVAS_W - 110, cp.y);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      }

      // ── HUD ──
      drawHUD(ctx, lives, connected.length, score, gameState);
    };

    gameRef.current.animId = requestAnimationFrame(draw);
    return () => {
      if (gameRef.current.animId) cancelAnimationFrame(gameRef.current.animId);
    };
  }, [gameState, lives, connected, currentTarget, score]);

  // ── Launch cable ──
  const launchCable = useCallback(() => {
    if (gameState !== 'playing' || gameRef.current.cable?.active) return;
    const targetConn = CONN_POINTS[currentTarget];
    if (!targetConn) return;
    const cableData = {
      startY: targetConn.y + gameRef.current.astronautBob,
      progress: 0,
      active: true,
      hit: false,
      success: false,
      collisionChecked: false,
      particles: null,
    };
    gameRef.current.cable = cableData;
    setCable(cableData);
  }, [gameState, currentTarget]);

  const startGame = useCallback(() => {
    setGameState('playing');
    setLives(MAX_LIVES);
    setConnected([]);
    setCurrentTarget(0);
    setScore(0);
    setCable(null);
    gameRef.current.cable = null;
    gameRef.current.belts = initBelts(CANVAS_H);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
      {/* Title */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', margin: '0.5rem 0 0' }}>
          Lanza el cable a través de los cinturones de asteroides para conectar la estación
        </p>
      </div>

      {/* Canvas */}
      <div style={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 0 40px rgba(0,228,255,0.08)',
      }}>
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          onClick={gameState === 'playing' ? launchCable : undefined}
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
            background: 'rgba(0,0,0,0.7)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '1rem',
          }}>
            <div style={{ fontSize: '3rem' }}>🧑‍🚀</div>
            <h3 style={{ color: '#00e5ff', margin: 0, fontSize: '1.4rem' }}>Conecta la Estación</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '400px', textAlign: 'center', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Haz clic para lanzar el cable hacia la estación ISS. Debes atravesar 3 cinturones de asteroides sin chocar. Tienes {MAX_LIVES} vidas y debes conectar {TOTAL_CONNECTIONS} puntos.
            </p>
            <button
              onClick={startGame}
              style={{
                background: 'linear-gradient(135deg, #00e5ff, #007cf0)',
                color: '#040816',
                border: 'none',
                padding: '0.8rem 2.5rem',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: "'Outfit', sans-serif",
                boxShadow: '0 0 20px rgba(0,229,255,0.4)',
              }}
            >
              🚀 Iniciar Conexión
            </button>
          </div>
        )}

        {/* Game Over overlay */}
        {gameState === 'gameover' && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '1rem',
          }}>
            <div style={{ fontSize: '3rem' }}>💥</div>
            <h3 style={{ color: '#ff6b6b', margin: 0 }}>Conexión Perdida</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
              Has agotado tus {MAX_LIVES} vidas. Conectaste {connected.length}/{TOTAL_CONNECTIONS} puntos.
            </p>
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <button
                onClick={startGame}
                style={{
                  background: 'linear-gradient(135deg, #00e5ff, #007cf0)',
                  color: '#040816', border: 'none',
                  padding: '0.7rem 2rem', borderRadius: '10px',
                  fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer',
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                🔄 Reintentar
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

        {/* Success overlay */}
        {gameState === 'success' && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '1rem',
          }}>
            <div style={{ fontSize: '3rem' }}>🎉</div>
            <h3 style={{ color: '#7bed9f', margin: 0 }}>¡Estación Conectada!</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
              Todos los sistemas están en línea. Puntuación: {score}
            </p>
          </div>
        )}
      </div>

      {/* Lives display */}
      {gameState === 'playing' && (
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginRight: '0.5rem' }}>Vidas:</span>
          {Array.from({ length: MAX_LIVES }, (_, i) => (
            <span
              key={i}
              style={{
                fontSize: '1.2rem',
                opacity: i < lives ? 1 : 0.2,
                transition: 'opacity 0.3s',
              }}
            >
              ❤️
            </span>
          ))}
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginLeft: '1rem' }}>
            Conexión {currentTarget + 1}/{TOTAL_CONNECTIONS}
          </span>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//   DRAW HELPERS
// ═══════════════════════════════════════════════════════

function drawAstronaut(ctx, x, y, t) {
  ctx.save();
  ctx.translate(x, y);
  // Suit body
  ctx.fillStyle = '#e8e8e8';
  ctx.beginPath();
  ctx.ellipse(0, 0, 14, 18, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(0,228,255,0.4)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  // Helmet
  ctx.fillStyle = '#1a1a3e';
  ctx.beginPath();
  ctx.arc(0, -14, 11, 0, Math.PI * 2);
  ctx.fill();
  // Visor reflection
  ctx.fillStyle = 'rgba(0,228,255,0.3)';
  ctx.beginPath();
  ctx.arc(-2, -15, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  ctx.beginPath();
  ctx.arc(-4, -17, 3, 0, Math.PI * 2);
  ctx.fill();
  // Backpack
  ctx.fillStyle = '#555';
  ctx.fillRect(-8, -5, -6, 14);
  ctx.fillStyle = '#333';
  ctx.fillRect(-9, -2, -4, 4);
  // Right arm (reaching out)
  ctx.strokeStyle = '#e8e8e8';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(10, -4);
  ctx.lineTo(20, -2 + Math.sin(t * 3) * 2);
  ctx.stroke();
  // Legs
  ctx.beginPath();
  ctx.moveTo(-5, 16);
  ctx.lineTo(-7, 28 + Math.sin(t * 0.8) * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(5, 16);
  ctx.lineTo(7, 28 - Math.sin(t * 0.8) * 2);
  ctx.stroke();
  // Tether line from backpack
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 3]);
  ctx.beginPath();
  ctx.moveTo(-14, 5);
  ctx.lineTo(-40, 5 + Math.sin(t) * 10);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
}

function drawISS(ctx, x, y, connected, currentTarget, t) {
  ctx.save();
  ctx.translate(x, y);
  
  // Main body
  ctx.fillStyle = '#2a2a4a';
  ctx.fillRect(-25, -CANVAS_H / 2 + 40, 50, CANVAS_H - 80);
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 1;
  ctx.strokeRect(-25, -CANVAS_H / 2 + 40, 50, CANVAS_H - 80);

  // Solar panels
  const panelY = [-160, -80, 80, 160];
  for (const py of panelY) {
    // Left panel
    ctx.fillStyle = '#1a3366';
    ctx.fillRect(25, py - 15, 35, 30);
    ctx.strokeStyle = '#4488cc';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(25, py - 15 + i * 8);
      ctx.lineTo(60, py - 15 + i * 8);
      ctx.stroke();
    }
    // Small glow
    ctx.fillStyle = `rgba(68,136,204,${0.2 + 0.1 * Math.sin(t + py)})`;
    ctx.fillRect(27, py - 13, 31, 26);
  }

  // Connection points
  for (let i = 0; i < CONN_POINTS.length; i++) {
    const cp = CONN_POINTS[i];
    const cpLocalY = cp.y - CANVAS_H / 2;
    const isConnected = connected.includes(cp.id);
    const isCurrent = i === currentTarget && !isConnected;
    
    // Port circle
    ctx.fillStyle = isConnected ? cp.color : (isCurrent ? `${cp.color}60` : 'rgba(255,255,255,0.1)');
    ctx.beginPath();
    ctx.arc(-30, cpLocalY, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = cp.color;
    ctx.lineWidth = isCurrent ? 2 : 1;
    ctx.stroke();

    // Label
    ctx.fillStyle = isConnected ? cp.color : 'rgba(255,255,255,0.4)';
    ctx.font = 'bold 9px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(cp.label, -30, cpLocalY + 20);

    // Pulsing ring for current target
    if (isCurrent) {
      ctx.strokeStyle = cp.color;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.3 + 0.3 * Math.sin(t * 4);
      ctx.beginPath();
      ctx.arc(-30, cpLocalY, 14, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // Connected checkmark
    if (isConnected) {
      ctx.fillStyle = '#040816';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✓', -30, cpLocalY);
      ctx.textBaseline = 'alphabetic';
    }
  }
  ctx.restore();
}

function drawAsteroid(ctx, ast) {
  ctx.save();
  ctx.translate(ast.x, ast.y);
  ctx.rotate(ast.rotation);
  
  const colors = ['#3a3a4a', '#4a4a5a', '#5a5a6a'];
  ctx.fillStyle = colors[ast.shade];
  
  ctx.beginPath();
  const verts = ast.vertices;
  for (let i = 0; i < verts.length; i++) {
    const v = verts[i];
    const r = ast.radius * v.r;
    const angle = v.angle;
    const px = Math.cos(angle) * r;
    const py = Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  
  // Subtle edge highlight
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 1;
  ctx.stroke();
  
  // Craters
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.beginPath();
  ctx.arc(ast.radius * 0.2, ast.radius * 0.1, ast.radius * 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(-ast.radius * 0.3, -ast.radius * 0.2, ast.radius * 0.12, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.restore();
}

function drawHUD(ctx, lives, connected, score, gameState) {
  if (gameState !== 'playing') return;
  // Score
  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  ctx.font = 'bold 14px monospace';
  ctx.textAlign = 'right';
  ctx.fillText(`SCORE: ${score}`, CANVAS_W - 20, 25);
  
  // Connection status
  ctx.textAlign = 'left';
  ctx.fillStyle = '#00e5ff';
  ctx.font = 'bold 11px monospace';
  ctx.fillText(`CONEXIONES: ${connected}/${TOTAL_CONNECTIONS}`, 20, 25);
}
