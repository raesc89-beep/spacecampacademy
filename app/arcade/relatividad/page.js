'use client';
import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import { AntigravityEngine } from '@/lib/antigravity/engine';
import { Rocket, FastForward, Play, Info, AlertTriangle, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Image Assets
const SHIP_IMG_SRC = '/assets/arcade/ship.png';
const OBSTACLES = [
  '/assets/arcade/obstacle_asteroid_1779748374804.png',
  '/assets/arcade/obstacle_debris_1779748391625.png',
  '/assets/arcade/obstacle_alien_1779748408664.png'
];

// Game has no fixed duration — survive as long as possible

export default function RelativisticDebrisDodger() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const [gameState, setGameState] = useState('menu'); // menu, playing, lost
  const [velocityC, setVelocityC] = useState(0.3);   // Fixed relativistic velocity display (0–0.99c)
  const [lorentz, setLorentz] = useState(1.048);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [health, setHealth] = useState(3);            // 3 hits = dead
  const [elapsedTime, setElapsedTime] = useState(0);

  // Refs to prevent stale closures in the high-frequency game loop
  const healthRef = useRef(3);
  const gameStateRef = useRef('menu');
  const elapsedTimeRef = useRef(0);

  useEffect(() => { healthRef.current = health; }, [health]);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { elapsedTimeRef.current = elapsedTime; }, [elapsedTime]);

  // Image cache
  const imgCache = useRef({});

  // Preload Images & Remove Solid Backgrounds (White for Ship, Black for Obstacles)
  useEffect(() => {
    const loadImages = async () => {
      const srcs = [SHIP_IMG_SRC, ...OBSTACLES];
      let loadedCount = 0;

      const cleanBackground = (img, isShip) => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width; canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          if (isShip) {
            // For the ship, make solid white or extremely bright pixels transparent
            if (r > 240 && g > 240 && b > 240) {
              data[i + 3] = 0;
            }
          } else {
            // For space obstacles, remove white/light backgrounds AND very dark pixels
            if ((r > 235 && g > 235 && b > 235) ||
                (r > 200 && g > 200 && b > 200 && Math.abs(r-g) < 15 && Math.abs(g-b) < 15)) {
              data[i + 3] = 0;
            } else if (r > 180 && g > 180 && b > 180 && Math.abs(r-g) < 20 && Math.abs(g-b) < 20) {
              // Soft edge for light gray transition
              data[i + 3] = Math.min(data[i + 3], Math.round(255 * (1 - (Math.min(r,g,b) - 180) / 55)));
            }
          }
        }
        ctx.putImageData(imgData, 0, 0);
        return canvas;
      };

      srcs.forEach(src => {
        const img = new Image();
        img.src = src;
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
          try {
            const isShip = (src === SHIP_IMG_SRC);
            imgCache.current[src] = cleanBackground(img, isShip);
          } catch (e) {
            imgCache.current[src] = img;
          }
          loadedCount++;
          if (loadedCount === srcs.length) setImagesLoaded(true);
        };
        img.onerror = () => {
          imgCache.current[src] = null;
          loadedCount++;
          if (loadedCount === srcs.length) setImagesLoaded(true);
        };
      });
    };
    loadImages();
  }, []);

  // Save telemetry when game ends
  useEffect(() => {
    if (gameState === 'lost') {
      fetch('/api/telemetry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'relatividad_debris_finished',
          data: {
            status: gameState,
            velocity_c: velocityC,
            time_survived: elapsedTime,
            hits_taken: 3 - health
          }
        })
      }).catch(err => console.error('Error logging telemetry:', err));
    }
  }, [gameState]);

  // Stopwatch timer while playing (counts UP)
  useEffect(() => {
    if (gameState !== 'playing') return;
    setElapsedTime(0);
    elapsedTimeRef.current = 0;
    const interval = setInterval(() => {
      setElapsedTime(prev => {
        const next = prev + 1;
        elapsedTimeRef.current = next;
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState]);

  // Lorentz factor display (based on velocityC)
  useEffect(() => {
    const v = Math.min(velocityC, 0.9999);
    const gamma = 1 / Math.sqrt(1 - v * v);
    setLorentz(gamma);
  }, [velocityC]);

  // Collision / damage handler
  const handleDamage = () => {
    if (healthRef.current <= 0) return;
    setHealth(prev => {
      const next = Math.max(0, prev - 1);
      healthRef.current = next;
      if (next <= 0) {
        setGameState('lost');
        if (engineRef.current) engineRef.current.stop();
      }
      return next;
    });

    // Camera shake on impact
    if (canvasRef.current) {
      canvasRef.current.style.transition = 'none';
      canvasRef.current.style.transform = 'translate(10px, 8px)';
      setTimeout(() => { if (canvasRef.current) canvasRef.current.style.transform = 'translate(-10px, -8px)'; }, 50);
      setTimeout(() => { if (canvasRef.current) canvasRef.current.style.transform = 'translate(6px, -4px)'; }, 100);
      setTimeout(() => {
        if (canvasRef.current) {
          canvasRef.current.style.transform = 'none';
          canvasRef.current.style.transition = 'transform 0.1s linear';
        }
      }, 150);
    }
  };

  // Engine & Canvas Setup
  useEffect(() => {
    if (!canvasRef.current || !imagesLoaded) return;

    const engine = new AntigravityEngine(canvasRef.current);
    engineRef.current = engine;
    engine.setEnvironment({ gravity: 0, fluidDensity: 0 });

    // Reset health & timer refs for new game session
    healthRef.current = 3;
    setHealth(3);

    // ─── SHIP — fixed Y, left/right only ───────────────────────────────────────
    const ship = {
      id: 'ship',
      type: 'rigidbody',
      x: engine.width / 2,
      y: engine.height - 80,
      radius: 32,
      isInvulnerable: false,
      isFlashing: false,
      update: function (dt) {
        if (engine.keys?.ArrowLeft || engine.keys?.a)  this.x -= 8 * dt;
        if (engine.keys?.ArrowRight || engine.keys?.d) this.x += 8 * dt;

        // Clamp X; Y is FIXED
        this.x = Math.max(50, Math.min(engine.width - 50, this.x));
        this.y = engine.height - 80;
      },
      render: function (ctx) {
        const img = imgCache.current[SHIP_IMG_SRC];

        // Invulnerability flash
        if (this.isFlashing && Math.floor(Date.now() / 100) % 2 === 0) return;

        ctx.save();
        ctx.translate(this.x, this.y);
        // Ship faces upward (towards incoming debris)
        ctx.rotate(-Math.PI / 2);

        // Glowing shield ring when invulnerable
        if (this.isInvulnerable) {
          ctx.strokeStyle = 'rgba(0, 228, 255, 0.9)';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(0, 0, 50, 0, Math.PI * 2);
          ctx.stroke();
          const sg = ctx.createRadialGradient(0, 0, 38, 0, 0, 52);
          sg.addColorStop(0, 'rgba(0, 228, 255, 0)');
          sg.addColorStop(1, 'rgba(0, 228, 255, 0.25)');
          ctx.fillStyle = sg;
          ctx.fill();
        }

        if (img) {
          ctx.drawImage(img, -40, -40, 80, 80);
        } else {
          // Fallback triangle
          ctx.fillStyle = '#00E4FF';
          ctx.beginPath();
          ctx.moveTo(40, 0);
          ctx.lineTo(-25, -20);
          ctx.lineTo(-25, 20);
          ctx.closePath();
          ctx.fill();
        }

        // Engine glow (pulses)
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = '#00E4FF';
        ctx.globalAlpha = 0.45 + Math.random() * 0.45;
        ctx.beginPath();
        ctx.arc(-35, 0, 12 + Math.random() * 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    };
    engine.registerRigidBody(ship);

    // ─── STARFIELD — stars fall straight DOWN ──────────────────────────────────
    // Each star has a 2D position that scrolls downward.
    // velocityC drives star speed + blueshift tint.
    const STAR_COUNT = 280;
    for (let i = 0; i < STAR_COUNT; i++) {
      engine.registerRigidBody({
        type: 'star',
        sx: Math.random() * engine.width,          // screen X
        sy: Math.random() * engine.height,         // screen Y (already positioned randomly)
        depth: Math.random() * 0.8 + 0.2,          // 0.2–1.0 — determines size & speed
        radius: 1,
        update: function (dt) {
          // Speed: base + velocity bonus
          const v = Math.min(velocityC, 0.9999);
          const gamma = 1 / Math.sqrt(1 - v * v);
          const speed = (1.2 + v * 10) * gamma * 0.3 * this.depth * dt;
          this.sy += speed;
          // Wrap back to top
          if (this.sy > engine.height + 5) {
            this.sy = -5;
            this.sx = Math.random() * engine.width;
            this.depth = Math.random() * 0.8 + 0.2;
          }
        },
        render: function (ctx) {
          const v = Math.min(velocityC, 0.9999);
          // Blueshift tint
          const rC = Math.round(255 * (1 - v * 0.85));
          const gC = Math.round(210 + 45 * v);
          const bC = 255;
          const alpha = 0.3 + this.depth * 0.7;
          const size = this.depth * 2.5;

          ctx.fillStyle = `rgba(${rC},${gC},${bC},${alpha})`;
          ctx.beginPath();
          ctx.arc(this.sx, this.sy, size, 0, Math.PI * 2);
          ctx.fill();

          // Draw a short streak for fast stars
          if (v > 0.35) {
            const streakLen = size * (v * 12 + 2);
            ctx.strokeStyle = `rgba(${rC},${gC},${bC},${alpha * 0.5})`;
            ctx.lineWidth = size * 0.8;
            ctx.beginPath();
            ctx.moveTo(this.sx, this.sy - streakLen);
            ctx.lineTo(this.sx, this.sy);
            ctx.stroke();
          }
        }
      });
    }

    // ─── ENGINE UPDATE OVERRIDE — background + spawning logic ──────────────────
    engine.update = (function (originalUpdate) {
      let gameTime = 0;       // seconds elapsed since game start
      let lastSpawnTime = 0;
      let nebulaTime = 0;

      return function (dt) {
        const ctx = this.ctx;
        if (ctx) {
          // Deep space void
          ctx.fillStyle = '#02030d';
          ctx.fillRect(0, 0, this.width, this.height);

          // Nebula clouds
          nebulaTime += dt * 0.003;
          ctx.save();
          ctx.globalCompositeOperation = 'screen';

          const x1 = this.width * 0.55 + Math.sin(nebulaTime * 0.7) * 180;
          const y1 = this.height * 0.4 + Math.cos(nebulaTime * 0.5) * 150;
          const g1 = ctx.createRadialGradient(x1, y1, 10, x1, y1, 420);
          g1.addColorStop(0, 'rgba(120, 0, 180, 0.55)');
          g1.addColorStop(0.4, 'rgba(80, 0, 120, 0.25)');
          g1.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = g1;
          ctx.fillRect(0, 0, this.width, this.height);

          const x2 = this.width * 0.35 - Math.sin(nebulaTime * 0.55) * 160;
          const y2 = this.height * 0.6 - Math.cos(nebulaTime * 0.65) * 130;
          const g2 = ctx.createRadialGradient(x2, y2, 10, x2, y2, 380);
          g2.addColorStop(0, 'rgba(0, 80, 150, 0.5)');
          g2.addColorStop(0.4, 'rgba(0, 40, 100, 0.22)');
          g2.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = g2;
          ctx.fillRect(0, 0, this.width, this.height);

          const x3 = this.width * 0.7 + Math.cos(nebulaTime * 0.4) * 100;
          const y3 = this.height * 0.7 + Math.sin(nebulaTime * 0.6) * 80;
          const g3 = ctx.createRadialGradient(x3, y3, 5, x3, y3, 260);
          g3.addColorStop(0, 'rgba(140, 40, 0, 0.4)');
          g3.addColorStop(0.5, 'rgba(80, 20, 0, 0.15)');
          g3.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = g3;
          ctx.fillRect(0, 0, this.width, this.height);

          ctx.restore();

          // Relativistic color tint overlay (blueshift wash at high v)
          const v = Math.min(velocityC, 0.9999);
          if (v > 0.4) {
            ctx.save();
            ctx.globalCompositeOperation = 'screen';
            ctx.fillStyle = `rgba(0, 80, 180, ${(v - 0.4) * 0.12})`;
            ctx.fillRect(0, 0, this.width, this.height);
            ctx.restore();
          }
        }

        // ── DEBRIS SPAWNING ──────────────────────────────────────────────────
        if (gameStateRef.current === 'playing') {
          gameTime += dt * 0.016; // dt is in frames (~60fps), convert to seconds

          // Spawn interval shrinks from 2 s → 0.3 s over 120 s
          const progress = Math.min(gameTime / 120, 1);
          const spawnInterval = Math.max(0.3, 2.0 - progress * 1.7);

          if (gameTime - lastSpawnTime > spawnInterval) {
            lastSpawnTime = gameTime;

            const imgSrc = OBSTACLES[Math.floor(Math.random() * OBSTACLES.length)];

            // Spawn from top at random X
            const startX = Math.random() * (this.width - 60) + 30;
            const startY = -55;

            // Downward velocity grows with time; slight horizontal drift
            const vy = 3 + gameTime * 0.03;
            const vx = (Math.random() - 0.5) * 1.8; // gentle horizontal drift

            this.registerRigidBody({
              type: 'anomaly',
              x: startX,
              y: startY,
              radius: 32,
              imgSrc: imgSrc,
              vx: vx,
              vy: vy,
              rotation: Math.random() * Math.PI * 2,
              angularVelocity: (Math.random() - 0.5) * 0.12,
              update: function (dt) {
                this.x += this.vx * dt * 0.016 * 60; // normalize to 60fps
                this.y += this.vy * dt * 0.016 * 60;
                this.rotation += this.angularVelocity * dt * 0.016 * 60;

                // Gentle drift correction – keep debris on screen horizontally
                if (this.x < -60 || this.x > engine.width + 60) this.dead = true;

                // Collision with ship
                const playerShip = engine.entities.find(e => e.id === 'ship');
                if (playerShip && !playerShip.isInvulnerable) {
                  const dx = this.x - playerShip.x;
                  const dy = this.y - playerShip.y;
                  const dist = Math.sqrt(dx * dx + dy * dy);
                  if (dist < playerShip.radius + this.radius - 10) {
                    this.dead = true;
                    playerShip.isInvulnerable = true;
                    playerShip.isFlashing = true;
                    handleDamage();
                    setTimeout(() => {
                      if (playerShip) {
                        playerShip.isInvulnerable = false;
                        playerShip.isFlashing = false;
                      }
                    }, 1500);
                  }
                }

                // Remove when off-screen bottom
                if (this.y > engine.height + 80) this.dead = true;
              },
              render: function (ctx) {
                const img = imgCache.current[this.imgSrc];
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);

                if (img) {
                  ctx.globalAlpha = 0.92;
                  ctx.drawImage(img, -this.radius, -this.radius, this.radius * 2, this.radius * 2);
                  ctx.globalAlpha = 1;
                } else {
                  // Fallback glowing asteroid
                  const og = ctx.createRadialGradient(0, 0, 2, 0, 0, this.radius);
                  og.addColorStop(0, '#FF8844');
                  og.addColorStop(0.6, '#CC4400');
                  og.addColorStop(1, 'rgba(80,20,0,0.5)');
                  ctx.fillStyle = og;
                  ctx.beginPath();
                  for (let a = 0; a < Math.PI * 2; a += 0.5) {
                    const noise = 0.7 + Math.random() * 0.3;
                    const rx = Math.cos(a) * this.radius * noise;
                    const ry = Math.sin(a) * this.radius * noise;
                    a === 0 ? ctx.moveTo(rx, ry) : ctx.lineTo(rx, ry);
                  }
                  ctx.closePath();
                  ctx.fill();
                }

                // Always draw a neon outline
                ctx.strokeStyle = 'rgba(255, 130, 0, 0.85)';
                ctx.lineWidth = 2;
                ctx.shadowColor = '#FF6600';
                ctx.shadowBlur = 10;
                ctx.beginPath();
                ctx.arc(0, 0, this.radius - 2, 0, Math.PI * 2);
                ctx.stroke();
                ctx.shadowBlur = 0;
                ctx.restore();
              }
            });
          }

          // ── CANVAS BOTTOM HINT ───────────────────────────────────────────────
          if (ctx) {
            ctx.save();
            ctx.font = 'bold 13px monospace';
            ctx.fillStyle = 'rgba(0, 228, 255, 0.45)';
            ctx.textAlign = 'center';
            ctx.fillText('← ESQUIVA →', this.width / 2, this.height - 10);
            ctx.restore();
          }
        }

        originalUpdate.call(this, dt);
        this.entities = this.entities.filter(e => !e.dead);
      };
    })(engine.update);

    // ─── INPUT ──────────────────────────────────────────────────────────────────
    engine.keys = {};
    const kd = (e) => { engine.keys[e.key] = true; };
    const ku = (e) => { engine.keys[e.key] = false; };
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);

    // Mouse / touch: follow cursor X (ship X only)
    const onMove = (e) => {
      if (gameStateRef.current !== 'playing') return;
      const rect = canvasRef.current.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const scaleX = engine.width / rect.width;
      const targetX = (clientX - rect.left) * scaleX;
      ship.x = Math.max(50, Math.min(engine.width - 50, targetX));
    };

    const canvas = canvasRef.current;
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('touchmove', onMove, { passive: true });

    if (gameState === 'playing') {
      engine.start();
    }

    return () => {
      window.removeEventListener('keydown', kd);
      window.removeEventListener('keyup', ku);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('touchmove', onMove);
      engine.stop();
    };
  }, [gameState, imagesLoaded]);

  // ─── Loading screen ───────────────────────────────────────────────────────────
  if (!imagesLoaded) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020308', color: '#00E4FF', fontFamily: 'monospace', fontSize: '1.1rem', letterSpacing: '0.08em' }}>
        CARGANDO CAMPO DE DEBRIS...
      </div>
    );
  }

  // ─── Health hearts helper ─────────────────────────────────────────────────────
  const renderHearts = () => {
    const hearts = [];
    for (let i = 0; i < 3; i++) {
      hearts.push(
        <span key={i} style={{ fontSize: '1.4rem', opacity: i < health ? 1 : 0.2, filter: i < health ? 'drop-shadow(0 0 6px #FF4466)' : 'none', transition: 'opacity 0.3s' }}>
          ♥
        </span>
      );
    }
    return hearts;
  };

  // ─── Main Render ──────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#020308', color: 'white' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <header style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <h1 style={{ color: '#00E4FF', margin: '0 0 0.3rem 0', textShadow: '0 0 20px rgba(0,228,255,0.5)', fontFamily: 'monospace', fontSize: '1.6rem', letterSpacing: '0.1em' }}>
            CAMPO DE DEBRIS RELATIVISTA
          </h1>
        </header>

        <div style={{
          position: 'relative',
          width: '800px',
          height: '500px',
          border: '2px solid #00E4FF',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 0 30px rgba(0,228,255,0.25)',
          background: '#02030d'
        }}>

          {/* Cerrar Máquina Button */}
          <button
            onClick={() => window.location.href = '/hub/arcade'}
            style={{
              position: 'absolute',
              top: '15px',
              left: '15px',
              zIndex: 30,
              background: 'rgba(255, 0, 0, 0.85)',
              color: 'white',
              border: '2px solid #ff5555',
              padding: '6px 12px',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '0.8rem',
              boxShadow: '0 0 15px rgba(255, 0, 0, 0.4)',
              transition: 'all 0.2s',
              fontFamily: 'monospace'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#ff0000';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.8)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 0, 0, 0.85)';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 0, 0, 0.4)';
            }}
          >
            ← CERRAR MÁQUINA
          </button>

          {/* Canvas — NO scale transform */}
          <canvas
            ref={canvasRef}
            width={800}
            height={500}
            style={{
              width: '100%',
              height: '100%',
              background: 'transparent'
            }}
          />

          {/* ── MENU ── */}
          {gameState === 'menu' && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.88)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', zIndex: 10 }}>
              <Rocket size={52} color="#00E4FF" style={{ marginBottom: '1rem', filter: 'drop-shadow(0 0 14px #00E4FF)' }} />
              <h2 style={{ color: 'white', marginBottom: '0.8rem', fontFamily: 'monospace', fontSize: '1.35rem', letterSpacing: '0.08em' }}>
                CAMPO DE DEBRIS RELATIVISTA
              </h2>
              <p style={{ maxWidth: '520px', color: '#aaa', lineHeight: 1.7, marginBottom: '2rem', fontSize: '0.95rem' }}>
                Guía tu nave entre los campos de debris espaciales a velocidades relativistas.{' '}
                <strong style={{ color: '#00FF66' }}>Sobrevive el mayor tiempo posible. Tu cronómetro marcará tu record.</strong>
                <br /><br />
                <strong>Controles:</strong><br />
                ← / → o <strong>A / D</strong> — mover izquierda / derecha<br />
                Mueve el ratón sobre el campo para seguir la posición<br /><br />
                Cada colisión consume <strong style={{ color: '#FF4466' }}>1 punto de integridad</strong>.{' '}
                Dispones de <strong style={{ color: '#FF4466' }}>3 impactos</strong> antes de la destrucción.
              </p>
              <button
                className="btn-primary"
                onClick={() => setGameState('playing')}
                style={{ background: '#00E4FF', color: 'black', fontWeight: 'bold', padding: '0.75rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '1rem', fontFamily: 'monospace', boxShadow: '0 0 20px rgba(0,228,255,0.5)' }}
              >
                <Play size={20} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                INICIAR MISIÓN
              </button>
            </div>
          )}

          {/* ── PLAYING HUD ── */}
          {gameState === 'playing' && (
            <>
              {/* Top Left: velocity + lorentz */}
              <div style={{
                position: 'absolute', top: 16, left: 16, zIndex: 5, pointerEvents: 'none',
                fontFamily: 'monospace', color: '#00E4FF', textShadow: '0 0 5px #00E4FF',
                background: 'rgba(0,0,0,0.65)', padding: '8px 14px', borderRadius: '8px',
                border: '1px solid rgba(0,228,255,0.35)'
              }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                  {(velocityC * 100).toFixed(0)}% c
                </div>
                <div style={{ fontSize: '0.78rem', opacity: 0.8 }}>γ = {lorentz.toFixed(3)}</div>
              </div>

              {/* Top Center: stopwatch */}
              <div style={{
                position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)',
                zIndex: 5, pointerEvents: 'none',
                fontFamily: 'monospace', color: '#00FF99',
                textShadow: '0 0 12px #00FF99',
                background: 'rgba(0,0,0,0.65)', padding: '8px 18px', borderRadius: '8px',
                border: '1px solid rgba(0,255,153,0.35)',
                fontSize: '1.4rem', fontWeight: 'bold', letterSpacing: '0.06em',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px'
              }}>
                <span style={{ fontSize: '0.6rem', opacity: 0.8, letterSpacing: '0.12em' }}>CRONÓMETRO</span>
                {String(Math.floor(elapsedTime / 60)).padStart(2, '0')}:{String(elapsedTime % 60).padStart(2, '0')}
              </div>

              {/* Top Right: hull integrity hearts */}
              <div style={{
                position: 'absolute', top: 16, right: 16, zIndex: 5, pointerEvents: 'none',
                background: 'rgba(0,0,0,0.65)', padding: '8px 14px', borderRadius: '8px',
                border: '1px solid rgba(255,68,102,0.35)', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px'
              }}>
                <div style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#FF4466', fontWeight: 'bold', letterSpacing: '0.06em' }}>
                  INTEGRIDAD CASCO
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {renderHearts()}
                </div>
              </div>
            </>
          )}


          {/* ── LOST SCREEN ── */}
          {gameState === 'lost' && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,42,42,0.2)', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', zIndex: 10 }}>
              <AlertTriangle size={64} color="#FF2A2A" style={{ marginBottom: '1rem', filter: 'drop-shadow(0 0 16px #FF2A2A)' }} />
              <h2 style={{ color: 'white', fontSize: '2.1rem', marginBottom: '1rem', textShadow: '0 0 20px #FF2A2A', fontFamily: 'monospace' }}>
                CASCO DESTRUIDO
              </h2>
              <p style={{ color: '#ccc', marginBottom: '0.5rem', maxWidth: '480px', lineHeight: 1.6 }}>
                El campo de debris superó la integridad estructural de la nave.
              </p>
              <p style={{ color: '#00FF99', marginBottom: '2rem', fontFamily: 'monospace', fontSize: '1.3rem', fontWeight: 'bold', textShadow: '0 0 10px #00FF99' }}>
                Tu record de supervivencia: {String(Math.floor(elapsedTime / 60)).padStart(2, '0')}:{String(elapsedTime % 60).padStart(2, '0')}
              </p>
              <button
                className="btn-primary"
                onClick={() => window.location.reload()}
                style={{ background: '#FF2A2A', color: 'white', fontWeight: 'bold', padding: '0.75rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '1rem', fontFamily: 'monospace' }}
              >
                Rearmar y Reintentar
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
