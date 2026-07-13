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
  { id: 'O2',   label: 'O₂',   y: 120, color: '#00e5ff' },
  { id: 'PWR',  label: 'PWR',  y: 210, color: '#ffd700' },
  { id: 'COMM', label: 'COMM', y: 300, color: '#ff6b6b' },
  { id: 'NAV',  label: 'NAV',  y: 390, color: '#7bed9f' },
];

// Asteroid belt configuration
const BELT_CONFIGS = [
  { count: 5, speed: 1.2, gapSize: 120 },
  { count: 6, speed: -1.5, gapSize: 100 },
  { count: 7, speed: 1.8, gapSize: 90 },
];

function createAsteroid(beltX, canvasH, idx, total, speed) {
  const spacing = canvasH / total;
  const numVerts = 8 + Math.floor(Math.random() * 5);
  return {
    x: beltX + (Math.random() - 0.5) * 30,
    y: idx * spacing + Math.random() * 20,
    radius: 14 + Math.random() * 16,
    speed: speed * (0.8 + Math.random() * 0.4),
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.025,
    vertices: Array.from({ length: numVerts }, (_, i) => {
      const angle = (i / numVerts) * Math.PI * 2;
      const variation = 0.55 + Math.random() * 0.45;
      return { angle, r: variation };
    }),
    shade: Math.floor(Math.random() * 3),
    craters: Array.from({ length: 2 + Math.floor(Math.random() * 3) }, () => ({
      cx: (Math.random() - 0.5) * 0.5,
      cy: (Math.random() - 0.5) * 0.5,
      cr: 0.08 + Math.random() * 0.18,
    })),
  };
}

function initBelts(canvasH) {
  const beltPositions = [250, 420, 590];
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
  const [gameState, setGameState] = useState('ready');
  const [lives, setLives] = useState(MAX_LIVES);
  const [connected, setConnected] = useState([]);
  const [currentTarget, setCurrentTarget] = useState(0);
  const [score, setScore] = useState(0);
  const [cable, setCable] = useState(null);

  const gameRef = useRef({
    belts: [],
    stars: [],
    astronautBob: 0,
    cable: null,
    animId: null,
    lastTime: 0,
    dockGlow: 0,
  });

  // Initialize stars
  useEffect(() => {
    gameRef.current.stars = Array.from({ length: 140 }, () => ({
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
      bgGrad.addColorStop(0, '#020610');
      bgGrad.addColorStop(0.3, '#080d22');
      bgGrad.addColorStop(0.7, '#0a0e28');
      bgGrad.addColorStop(1, '#040818');
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
      const astroX = 70;
      const targetConn = CONN_POINTS[currentTarget] || CONN_POINTS[0];
      const astroY = targetConn.y;
      gameRef.current.astronautBob = Math.sin(t * 1.2) * 6;
      const bobY = astroY + gameRef.current.astronautBob;
      const tiltAngle = Math.sin(t * 0.8) * 0.04;
      drawAstronaut(ctx, astroX, bobY, t, tiltAngle);

      // ── ISS (right side) ──
      drawISS(ctx, CANVAS_W - 75, CANVAS_H / 2, connected, currentTarget, t);

      // ── Asteroid belts ──
      for (const belt of gameRef.current.belts) {
        for (const ast of belt.asteroids) {
          ast.y += ast.speed * dt;
          ast.rotation += ast.rotSpeed * dt;
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
        cableData.progress += 4.5 * dt;
        const endX = CANVAS_W - 115;
        const cableLen = endX - astroX;
        const currentX = astroX + Math.min(cableData.progress, cableLen);
        const cableY = cableData.startY;

        // Glowing cable line
        ctx.save();
        ctx.strokeStyle = 'rgba(0,228,255,0.15)';
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(astroX + 20, cableY);
        ctx.lineTo(currentX, cableY);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(0,228,255,0.35)';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(astroX + 20, cableY);
        ctx.lineTo(currentX, cableY);
        ctx.stroke();

        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(astroX + 20, cableY);
        ctx.lineTo(currentX, cableY);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Cable grapple tip
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(currentX, cableY, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Small triangle tip
        ctx.fillStyle = '#00e5ff';
        ctx.beginPath();
        ctx.moveTo(currentX + 6, cableY);
        ctx.lineTo(currentX - 2, cableY - 4);
        ctx.lineTo(currentX - 2, cableY + 4);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

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
                  cableData.hit = true;
                  cableData.active = false;
                  cableData.collisionChecked = true;
                  cableData.hitX = currentX;
                  cableData.hitY = cableY;
                  // Explosion particles — fiery colors
                  cableData.particles = Array.from({ length: 24 }, () => ({
                    x: currentX,
                    y: cableY,
                    vx: (Math.random() - 0.5) * 8,
                    vy: (Math.random() - 0.5) * 8,
                    life: 1,
                    maxLife: 1,
                    size: 2 + Math.random() * 4,
                    color: ['#ff4500', '#ff6b35', '#ffa500', '#ffcc00', '#fff'][Math.floor(Math.random() * 5)],
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
          cableData.dockGlowPhase = 0;
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
              setCurrentTarget(ct => ct + 1);
              setTimeout(() => {
                gameRef.current.cable = null;
                setCable(null);
              }, 800);
            }
            return newConn;
          });
        }
      }

      // Draw explosion particles
      if (cableData && cableData.particles) {
        for (const p of cableData.particles) {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.vx *= 0.97;
          p.vy *= 0.97;
          p.life -= 0.025 * dt;
          if (p.life > 0) {
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
        // Shockwave ring
        if (cableData.hit && cableData.hitX) {
          const elapsed = 1 - (cableData.particles[0]?.life || 0);
          if (elapsed < 0.6) {
            const ringR = elapsed * 60;
            ctx.strokeStyle = 'rgba(255,140,0,' + (0.5 - elapsed * 0.8) + ')';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(cableData.hitX, cableData.hitY, ringR, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }

      // Draw docking glow animation
      if (cableData && cableData.success) {
        cableData.dockGlowPhase = (cableData.dockGlowPhase || 0) + 0.06 * dt;
        if (cableData.dockGlowPhase < 3) {
          const glowAlpha = Math.sin(cableData.dockGlowPhase * 4) * 0.4;
          if (glowAlpha > 0) {
            const cp = CONN_POINTS.find(c => c.id === targetConn.id);
            if (cp) {
              ctx.save();
              const gx = CANVAS_W - 115;
              const gy = cp.y;
              const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, 30);
              grad.addColorStop(0, `rgba(123,237,159,${glowAlpha})`);
              grad.addColorStop(1, 'rgba(123,237,159,0)');
              ctx.fillStyle = grad;
              ctx.beginPath();
              ctx.arc(gx, gy, 30, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            }
          }
        }
      }

      // ── Connected cables (persistent) ──
      for (let i = 0; i < connected.length; i++) {
        const cp = CONN_POINTS.find(c => c.id === connected[i]);
        if (!cp) continue;
        ctx.save();
        // Faint outer glow
        ctx.strokeStyle = `${cp.color}18`;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(astroX + 20, cp.y);
        ctx.lineTo(CANVAS_W - 115, cp.y);
        ctx.stroke();
        // Inner cable
        ctx.strokeStyle = cp.color;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.5 + 0.2 * Math.sin(t * 2 + i);
        ctx.setLineDash([8, 5]);
        ctx.beginPath();
        ctx.moveTo(astroX + 20, cp.y);
        ctx.lineTo(CANVAS_W - 115, cp.y);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
        ctx.restore();
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
      hitX: 0,
      hitY: 0,
      dockGlowPhase: 0,
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
//   DRAW ASTRONAUT — Detailed cartoon vector style
// ═══════════════════════════════════════════════════════

function drawAstronaut(ctx, x, y, t, tilt) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(tilt);

  // === Life Support Backpack ===
  ctx.fillStyle = '#c8c8c8';
  ctx.beginPath();
  ctx.roundRect(-22, -14, 10, 28, 3);
  ctx.fill();
  ctx.fillStyle = '#a0a0a0';
  ctx.beginPath();
  ctx.roundRect(-20, -10, 6, 8, 2);
  ctx.fill();
  ctx.fillStyle = '#888';
  ctx.beginPath();
  ctx.roundRect(-20, 2, 6, 8, 2);
  ctx.fill();
  // Backpack tubes
  ctx.strokeStyle = '#999';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-16, -14);
  ctx.quadraticCurveTo(-14, -22, -6, -22);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-16, -10);
  ctx.quadraticCurveTo(-12, -18, -4, -19);
  ctx.stroke();
  // Small red indicator light
  ctx.fillStyle = '#ff3333';
  ctx.beginPath();
  ctx.arc(-17, 13, 1.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = `rgba(255,50,50,${0.3 + 0.3 * Math.sin(t * 3)})`;
  ctx.beginPath();
  ctx.arc(-17, 13, 3, 0, Math.PI * 2);
  ctx.fill();

  // === Left Leg ===
  ctx.fillStyle = '#eaeaea';
  ctx.beginPath();
  ctx.moveTo(-8, 16);
  ctx.lineTo(-12, 32 + Math.sin(t * 0.7) * 2);
  ctx.lineTo(-6, 36 + Math.sin(t * 0.7) * 2);
  ctx.lineTo(-1, 36 + Math.sin(t * 0.7) * 2);
  ctx.lineTo(-2, 16);
  ctx.closePath();
  ctx.fill();
  // Orange stripe on left leg
  ctx.fillStyle = '#e87b35';
  ctx.fillRect(-10, 24 + Math.sin(t * 0.7) * 1, 7, 3);
  // Boot
  ctx.fillStyle = '#d0d0d0';
  ctx.beginPath();
  ctx.roundRect(-13, 33 + Math.sin(t * 0.7) * 2, 10, 5, 2);
  ctx.fill();
  ctx.fillStyle = '#b0b0b0';
  ctx.fillRect(-13, 35 + Math.sin(t * 0.7) * 2, 10, 2);

  // === Right Leg ===
  ctx.fillStyle = '#eaeaea';
  ctx.beginPath();
  ctx.moveTo(2, 16);
  ctx.lineTo(4, 32 - Math.sin(t * 0.7) * 2);
  ctx.lineTo(10, 36 - Math.sin(t * 0.7) * 2);
  ctx.lineTo(14, 36 - Math.sin(t * 0.7) * 2);
  ctx.lineTo(8, 16);
  ctx.closePath();
  ctx.fill();
  // Orange stripe on right leg
  ctx.fillStyle = '#e87b35';
  ctx.fillRect(3, 24 - Math.sin(t * 0.7) * 1, 7, 3);
  // Boot
  ctx.fillStyle = '#d0d0d0';
  ctx.beginPath();
  ctx.roundRect(4, 33 - Math.sin(t * 0.7) * 2, 10, 5, 2);
  ctx.fill();
  ctx.fillStyle = '#b0b0b0';
  ctx.fillRect(4, 35 - Math.sin(t * 0.7) * 2, 10, 2);

  // === Torso ===
  ctx.fillStyle = '#f0f0f0';
  ctx.beginPath();
  ctx.moveTo(-12, -12);
  ctx.quadraticCurveTo(-14, 4, -10, 18);
  ctx.lineTo(10, 18);
  ctx.quadraticCurveTo(14, 4, 12, -12);
  ctx.closePath();
  ctx.fill();
  // Torso outline
  ctx.strokeStyle = 'rgba(0,0,0,0.1)';
  ctx.lineWidth = 0.8;
  ctx.stroke();
  // Chest panel / control unit
  ctx.fillStyle = '#d8d8d8';
  ctx.beginPath();
  ctx.roundRect(-6, -4, 12, 10, 2);
  ctx.fill();
  ctx.strokeStyle = '#bbb';
  ctx.lineWidth = 0.5;
  ctx.stroke();
  // Small indicator lights on chest
  ctx.fillStyle = '#00e5ff';
  ctx.beginPath();
  ctx.arc(-2, 0, 1.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#7bed9f';
  ctx.beginPath();
  ctx.arc(2, 0, 1.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffd700';
  ctx.beginPath();
  ctx.arc(0, 3, 1.5, 0, Math.PI * 2);
  ctx.fill();
  // Orange stripe across upper torso
  ctx.fillStyle = '#e87b35';
  ctx.fillRect(-11, -8, 22, 3);
  // USA-style flag patch (small rectangle on right chest)
  ctx.fillStyle = '#cc2233';
  ctx.fillRect(5, -6, 5, 3);
  ctx.fillStyle = '#335599';
  ctx.fillRect(5, -6, 2, 1.5);

  // === Left Arm ===
  const leftArmWave = Math.sin(t * 0.6) * 3;
  ctx.fillStyle = '#eaeaea';
  ctx.beginPath();
  ctx.moveTo(-12, -8);
  ctx.lineTo(-18, 4 + leftArmWave);
  ctx.lineTo(-22, 12 + leftArmWave);
  ctx.lineTo(-16, 14 + leftArmWave);
  ctx.lineTo(-12, 6 + leftArmWave);
  ctx.lineTo(-9, -4);
  ctx.closePath();
  ctx.fill();
  // Orange stripe on left arm
  ctx.save();
  ctx.fillStyle = '#e87b35';
  ctx.translate(-15, 2 + leftArmWave);
  ctx.rotate(-0.15);
  ctx.fillRect(-4, -1.5, 8, 3);
  ctx.restore();
  // Glove
  ctx.fillStyle = '#d0d0d0';
  ctx.beginPath();
  ctx.arc(-20, 14 + leftArmWave, 4, 0, Math.PI * 2);
  ctx.fill();

  // === Right Arm (reaching toward station) ===
  const rightArmReach = Math.sin(t * 2) * 2;
  ctx.fillStyle = '#eaeaea';
  ctx.beginPath();
  ctx.moveTo(12, -8);
  ctx.lineTo(18, -4 + rightArmReach);
  ctx.lineTo(24, -1 + rightArmReach);
  ctx.lineTo(22, 4 + rightArmReach);
  ctx.lineTo(16, 2 + rightArmReach);
  ctx.lineTo(9, -4);
  ctx.closePath();
  ctx.fill();
  // Orange stripe on right arm
  ctx.save();
  ctx.fillStyle = '#e87b35';
  ctx.translate(18, 0 + rightArmReach);
  ctx.rotate(0.2);
  ctx.fillRect(-4, -1.5, 8, 3);
  ctx.restore();
  // Glove
  ctx.fillStyle = '#d0d0d0';
  ctx.beginPath();
  ctx.arc(24, 1 + rightArmReach, 4, 0, Math.PI * 2);
  ctx.fill();

  // === Helmet ===
  // Outer helmet shell (white)
  ctx.fillStyle = '#f5f5f5';
  ctx.beginPath();
  ctx.arc(0, -18, 15, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,0.08)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Orange helmet rim / details
  ctx.strokeStyle = '#e87b35';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, -18, 15, Math.PI * 0.85, Math.PI * 0.15, true);
  ctx.stroke();
  // Orange chin strap
  ctx.strokeStyle = '#e87b35';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, -18, 14, Math.PI * 0.7, Math.PI * 0.3, true);
  ctx.stroke();

  // Visor glass (teal/blue gradient)
  ctx.save();
  const visorGrad = ctx.createLinearGradient(-9, -26, 9, -12);
  visorGrad.addColorStop(0, '#1a6b7a');
  visorGrad.addColorStop(0.4, '#0d8b9f');
  visorGrad.addColorStop(0.7, '#1a6b7a');
  visorGrad.addColorStop(1, '#0a4d5a');
  ctx.fillStyle = visorGrad;
  ctx.beginPath();
  ctx.ellipse(1, -18, 10, 10, 0, 0, Math.PI * 2);
  ctx.fill();

  // Visor rim
  ctx.strokeStyle = '#bbb';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.ellipse(1, -18, 10, 10, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Visor shine reflection (curved highlight)
  ctx.strokeStyle = 'rgba(255,255,255,0.5)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(-2, -21, 6, -Math.PI * 0.8, -Math.PI * 0.2);
  ctx.stroke();
  // Small reflection dot
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.beginPath();
  ctx.arc(-5, -22, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // === Antenna on helmet ===
  ctx.strokeStyle = '#ccc';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(8, -30);
  ctx.lineTo(12, -38);
  ctx.stroke();
  ctx.fillStyle = '#ff3333';
  ctx.beginPath();
  ctx.arc(12, -38, 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// ═══════════════════════════════════════════════════════
//   DRAW ISS — Detailed space station with modules
// ═══════════════════════════════════════════════════════

function drawISS(ctx, x, y, connected, currentTarget, t) {
  ctx.save();
  ctx.translate(x, y);

  const stationTop = -CANVAS_H / 2 + 50;
  const stationBottom = CANVAS_H / 2 - 50;
  const stationH = stationBottom - stationTop;

  // === Main Truss (horizontal backbone, drawn vertically here) ===
  ctx.fillStyle = '#8a8a9a';
  ctx.fillRect(-4, stationTop, 8, stationH);
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 0.5;
  ctx.strokeRect(-4, stationTop, 8, stationH);
  // Truss cross-beams
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 0.5;
  for (let ty = stationTop; ty < stationBottom; ty += 20) {
    ctx.beginPath();
    ctx.moveTo(-4, ty);
    ctx.lineTo(4, ty + 20);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(4, ty);
    ctx.lineTo(-4, ty + 20);
    ctx.stroke();
  }

  // === Habitat Modules (cylindrical modules along the truss) ===
  const modules = [
    { y: -130, w: 36, h: 50, color: '#d0d0d8', name: 'Lab' },
    { y: -50, w: 32, h: 60, color: '#c8ccd4', name: 'Hab' },
    { y: 40, w: 38, h: 55, color: '#d4d0cc', name: 'Node' },
    { y: 120, w: 30, h: 45, color: '#ccd0d8', name: 'Dock' },
  ];

  for (const mod of modules) {
    // Module body with 3D cylinder effect
    const mGrad = ctx.createLinearGradient(-mod.w / 2, 0, mod.w / 2, 0);
    mGrad.addColorStop(0, '#888890');
    mGrad.addColorStop(0.2, mod.color);
    mGrad.addColorStop(0.5, '#f0f0f2');
    mGrad.addColorStop(0.8, mod.color);
    mGrad.addColorStop(1, '#888890');
    ctx.fillStyle = mGrad;
    ctx.beginPath();
    ctx.roundRect(-mod.w / 2, mod.y - mod.h / 2, mod.w, mod.h, 4);
    ctx.fill();

    // Module outline
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // Ribbing lines for cylinder detail
    ctx.strokeStyle = 'rgba(0,0,0,0.08)';
    ctx.lineWidth = 0.5;
    for (let ry = mod.y - mod.h / 2 + 8; ry < mod.y + mod.h / 2; ry += 10) {
      ctx.beginPath();
      ctx.moveTo(-mod.w / 2 + 2, ry);
      ctx.lineTo(mod.w / 2 - 2, ry);
      ctx.stroke();
    }

    // Module windows (small portholes)
    ctx.fillStyle = 'rgba(100,200,255,0.3)';
    ctx.strokeStyle = 'rgba(200,220,255,0.3)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.arc(mod.w / 2 - 6, mod.y, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  // === Solar Panel Arrays (4 pairs) ===
  const panelPositions = [
    { y: -160, side: 1 },
    { y: -80, side: 1 },
    { y: 60, side: 1 },
    { y: 140, side: 1 },
  ];

  for (const pp of panelPositions) {
    drawSolarPanel(ctx, 20, pp.y, 48, 22, t, pp.y);
    drawSolarPanel(ctx, -20, pp.y, -48, 22, t, pp.y + 50);
  }

  // === Docking Port (circular connector on left face) ===
  // Main ring
  ctx.strokeStyle = '#bbb';
  ctx.lineWidth = 2;
  ctx.fillStyle = '#333';
  ctx.beginPath();
  ctx.arc(-22, 0, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  // Inner ring
  ctx.strokeStyle = '#999';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(-22, 0, 5, 0, Math.PI * 2);
  ctx.stroke();
  // Docking guide lights
  ctx.fillStyle = `rgba(0,229,255,${0.4 + 0.3 * Math.sin(t * 3)})`;
  ctx.beginPath();
  ctx.arc(-22, -10, 1.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(-22, 10, 1.5, 0, Math.PI * 2);
  ctx.fill();

  // === Radiator Panels (thin white panels) ===
  ctx.fillStyle = '#e8e8e8';
  ctx.globalAlpha = 0.4;
  ctx.fillRect(6, -180, 3, 20);
  ctx.fillRect(6, 160, 3, 20);
  ctx.globalAlpha = 1;

  // === Connection Points (on the left side of the station) ===
  for (let i = 0; i < CONN_POINTS.length; i++) {
    const cp = CONN_POINTS[i];
    const cpLocalY = cp.y - CANVAS_H / 2;
    const isConnected = connected.includes(cp.id);
    const isCurrent = i === currentTarget && !isConnected;

    // Connection port housing
    ctx.fillStyle = '#444';
    ctx.beginPath();
    ctx.roundRect(-42, cpLocalY - 10, 14, 20, 3);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // Port circle
    ctx.beginPath();
    ctx.arc(-35, cpLocalY, 6, 0, Math.PI * 2);
    if (isConnected) {
      ctx.fillStyle = cp.color;
      ctx.fill();
      // Connected glow
      ctx.save();
      ctx.shadowColor = cp.color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.restore();
    } else if (isCurrent) {
      ctx.fillStyle = `${cp.color}40`;
      ctx.fill();
      ctx.strokeStyle = cp.color;
      ctx.lineWidth = 2;
      ctx.stroke();
    } else {
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Inner port detail
    ctx.beginPath();
    ctx.arc(-35, cpLocalY, 3, 0, Math.PI * 2);
    ctx.strokeStyle = isConnected ? '#fff' : 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // Label
    ctx.fillStyle = isConnected ? cp.color : 'rgba(255,255,255,0.5)';
    ctx.font = 'bold 8px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(cp.label, -35, cpLocalY + 18);

    // Pulsing ring for current target
    if (isCurrent) {
      const pulseR = 12 + 3 * Math.sin(t * 4);
      ctx.strokeStyle = cp.color;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.2 + 0.3 * Math.sin(t * 4);
      ctx.beginPath();
      ctx.arc(-35, cpLocalY, pulseR, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // Connected checkmark
    if (isConnected) {
      ctx.fillStyle = '#040816';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✓', -35, cpLocalY);
      ctx.textBaseline = 'alphabetic';
    }
  }

  ctx.restore();
}

// Helper: Draw a single solar panel
function drawSolarPanel(ctx, startX, startY, length, height, t, seed) {
  const endX = startX + length;
  const panelX = Math.min(startX, endX);
  const panelW = Math.abs(length);

  // Panel arm/strut
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(startX + length * 0.3, startY);
  ctx.stroke();

  // Solar panel body — dark blue with cell grid
  const panelGrad = ctx.createLinearGradient(panelX, startY - height / 2, panelX, startY + height / 2);
  panelGrad.addColorStop(0, '#0d2855');
  panelGrad.addColorStop(0.5, '#1a3f7a');
  panelGrad.addColorStop(1, '#0d2855');
  ctx.fillStyle = panelGrad;
  ctx.fillRect(panelX, startY - height / 2, panelW, height);

  // Panel frame
  ctx.strokeStyle = '#4477aa';
  ctx.lineWidth = 0.8;
  ctx.strokeRect(panelX, startY - height / 2, panelW, height);

  // Solar cell grid lines
  ctx.strokeStyle = 'rgba(80,140,220,0.3)';
  ctx.lineWidth = 0.3;
  const cellSize = 6;
  for (let gx = panelX; gx <= panelX + panelW; gx += cellSize) {
    ctx.beginPath();
    ctx.moveTo(gx, startY - height / 2);
    ctx.lineTo(gx, startY + height / 2);
    ctx.stroke();
  }
  for (let gy = startY - height / 2; gy <= startY + height / 2; gy += cellSize) {
    ctx.beginPath();
    ctx.moveTo(panelX, gy);
    ctx.lineTo(panelX + panelW, gy);
    ctx.stroke();
  }

  // Subtle reflective shimmer
  ctx.fillStyle = `rgba(100,170,255,${0.05 + 0.03 * Math.sin(t * 1.5 + seed)})`;
  ctx.fillRect(panelX + 1, startY - height / 2 + 1, panelW - 2, height - 2);
}

// ═══════════════════════════════════════════════════════
//   DRAW ASTEROID — Rocky irregular shapes with depth
// ═══════════════════════════════════════════════════════

function drawAsteroid(ctx, ast) {
  ctx.save();
  ctx.translate(ast.x, ast.y);
  ctx.rotate(ast.rotation);

  const baseColors = [
    ['#3a3530', '#4a4540', '#5a5550'],  // dark brown-gray
    ['#4a4640', '#5a5650', '#6a6560'],  // medium brown
    ['#504838', '#605848', '#706858'],  // warm brown
  ];
  const colors = baseColors[ast.shade];
  const r = ast.radius;

  // Shadow/depth underneath
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  const verts = ast.vertices;
  for (let i = 0; i < verts.length; i++) {
    const v = verts[i];
    const vr = r * v.r;
    const px = Math.cos(v.angle) * vr + 2;
    const py = Math.sin(v.angle) * vr + 2;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();

  // Main body with gradient
  const astGrad = ctx.createRadialGradient(-r * 0.2, -r * 0.2, 0, 0, 0, r);
  astGrad.addColorStop(0, colors[2]);
  astGrad.addColorStop(0.6, colors[1]);
  astGrad.addColorStop(1, colors[0]);
  ctx.fillStyle = astGrad;

  ctx.beginPath();
  for (let i = 0; i < verts.length; i++) {
    const v = verts[i];
    const vr = r * v.r;
    const px = Math.cos(v.angle) * vr;
    const py = Math.sin(v.angle) * vr;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();

  // Edge highlight (lit side)
  ctx.strokeStyle = 'rgba(255,240,220,0.12)';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  for (let i = 0; i < Math.floor(verts.length / 2); i++) {
    const v = verts[i];
    const vr = r * v.r;
    const px = Math.cos(v.angle) * vr;
    const py = Math.sin(v.angle) * vr;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();

  // Dark edge (shadow side)
  ctx.strokeStyle = 'rgba(0,0,0,0.2)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = Math.floor(verts.length / 2); i < verts.length; i++) {
    const v = verts[i];
    const vr = r * v.r;
    const px = Math.cos(v.angle) * vr;
    const py = Math.sin(v.angle) * vr;
    if (i === Math.floor(verts.length / 2)) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();

  // Craters with depth
  for (const crater of ast.craters) {
    const cx = r * crater.cx;
    const cy = r * crater.cy;
    const cr = r * crater.cr;

    // Crater shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.arc(cx, cy, cr, 0, Math.PI * 2);
    ctx.fill();

    // Crater rim highlight
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.arc(cx - cr * 0.15, cy - cr * 0.15, cr, -Math.PI * 0.6, Math.PI * 0.2);
    ctx.stroke();
  }

  // Surface texture specks
  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  ctx.beginPath();
  ctx.arc(-r * 0.25, -r * 0.3, r * 0.08, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(r * 0.15, -r * 0.15, r * 0.05, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// ═══════════════════════════════════════════════════════
//   DRAW HUD
// ═══════════════════════════════════════════════════════

function drawHUD(ctx, lives, connectedCount, score, gameState) {
  if (gameState !== 'playing') return;

  // Score (top right)
  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  ctx.font = 'bold 14px monospace';
  ctx.textAlign = 'right';
  ctx.fillText(`SCORE: ${score}`, CANVAS_W - 20, 25);

  // Connection status (top left)
  ctx.textAlign = 'left';
  ctx.fillStyle = '#00e5ff';
  ctx.font = 'bold 11px monospace';
  ctx.fillText(`CONEXIONES: ${connectedCount}/${TOTAL_CONNECTIONS}`, 20, 25);

  // Lives as small dots (top center)
  ctx.textAlign = 'center';
  for (let i = 0; i < MAX_LIVES; i++) {
    const lx = CANVAS_W / 2 - (MAX_LIVES * 12) / 2 + i * 12 + 6;
    ctx.fillStyle = i < lives ? '#ff4444' : 'rgba(255,68,68,0.2)';
    ctx.beginPath();
    ctx.arc(lx, 20, 4, 0, Math.PI * 2);
    ctx.fill();
    if (i < lives) {
      ctx.fillStyle = 'rgba(255,68,68,0.3)';
      ctx.beginPath();
      ctx.arc(lx, 20, 6, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
