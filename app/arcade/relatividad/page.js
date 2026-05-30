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

export default function RelativisticRacingGame() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const [gameState, setGameState] = useState('menu'); // menu, playing, won, lost
  const [velocityC, setVelocityC] = useState(0); // 0 to 0.99c
  const [distance, setDistance] = useState(0);
  const targetDistance = 10000;
  const [lorentz, setLorentz] = useState(1);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [health, setHealth] = useState(100); // 100% Structural Integrity
  
  // Refs to prevent stale closures in the high-frequency physics game loop
  const velocityRef = useRef(0);
  const healthRef = useRef(100);
  const gameStateRef = useRef('menu');
  
  // Sync state values to refs
  useEffect(() => {
    velocityRef.current = velocityC;
  }, [velocityC]);

  useEffect(() => {
    healthRef.current = health;
  }, [health]);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

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
             const g = data[i+1];
             const b = data[i+2];
             
             if (isShip) {
                 // For the ship, make solid white or extremely bright pixels transparent
                 if (r > 240 && g > 240 && b > 240) {
                     data[i+3] = 0; // alpha = 0
                 }
             } else {
                 // For space obstacles, make solid black or extremely dark pixels transparent
                 if (r < 25 && g < 25 && b < 25) {
                     data[i+3] = 0; // alpha = 0
                 }
             }
         }
         ctx.putImageData(imgData, 0, 0);
         return canvas;
       };

       srcs.forEach(src => {
          const img = new Image();
          img.src = src;
          img.crossOrigin = "Anonymous";
          img.onload = () => {
             try {
                const isShip = (src === SHIP_IMG_SRC);
                imgCache.current[src] = cleanBackground(img, isShip);
             } catch(e) {
                // Fallback if canvas taint issues
                imgCache.current[src] = img;
             }
             loadedCount++;
             if (loadedCount === srcs.length) setImagesLoaded(true);
          };
       });
    };
    loadImages();
  }, []);

  // Save telemetry when game ends
  useEffect(() => {
    if (gameState === 'won' || gameState === 'lost') {
       fetch('/api/telemetry', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           event: 'relativity_game_finished',
           data: {
             status: gameState,
             max_velocity: velocityC,
             distance_traveled: Math.floor(distance)
           }
         })
       }).catch(err => console.error('Error logging telemetry:', err));
    }
  }, [gameState]);

  // Real-time speed acceleration timer
  useEffect(() => {
    if (gameState !== 'playing') return;

    let interval = setInterval(() => {
      setVelocityC(prev => {
        const next = Math.min(prev + 0.05, 0.99); // Accelerate faster
        return parseFloat(next.toFixed(2));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState]);

  // Adjust special relativistic constants (Lorentz Gamma, Time Dilation, etc.)
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    // Calculate Lorentz Factor
    const gamma = 1 / Math.sqrt(1 - Math.pow(velocityC, 2));
    setLorentz(gamma);
    
    if (engineRef.current) {
       const engine = engineRef.current;
       engine.effects.timeDilation = gamma * 2;
       engine.effects.chromaticAberration = velocityC * 20;
       engine.effects.bloom = velocityC * 0.8;
    }

    // Update distance
    const distInterval = setInterval(() => {
      setDistance(prev => {
        const newDist = prev + (velocityC * 25);
        if (newDist >= targetDistance) {
           setGameState('won');
           if (engineRef.current) engineRef.current.stop();
        }
        return newDist;
      });
    }, 100);

    return () => clearInterval(distInterval);
  }, [velocityC, gameState]);

  // Synchronous collision/damage handler from canvas loop to React state
  const handleDamage = () => {
    if (healthRef.current <= 0) return;
    setHealth(prev => {
      const nextH = Math.max(0, prev - 34); // 3-hit health system
      if (nextH <= 0) {
         setGameState('lost');
         if (engineRef.current) engineRef.current.stop();
      }
      return nextH;
    });
    
    // Physical camera shake/canvas vibration effect on impact
    if (canvasRef.current) {
       canvasRef.current.style.transition = 'none';
       canvasRef.current.style.transform = 'translate(10px, 10px)';
       setTimeout(() => { if (canvasRef.current) canvasRef.current.style.transform = 'translate(-10px, -10px)'; }, 50);
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

    // The Spacecraft with full 2D movement and organic glowing shield
    const ship = {
      id: 'ship',
      type: 'rigidbody',
      x: engine.width / 2,
      y: engine.height - 100,
      radius: 35,
      isInvulnerable: false,
      isFlashing: false,
      update: function(dt) {
         // Smooth Keyboard movement in 2D (UP/DOWN/LEFT/RIGHT + WASD)
         if (engine.keys?.ArrowLeft || engine.keys?.a) this.x -= 8 * dt;
         if (engine.keys?.ArrowRight || engine.keys?.d) this.x += 8 * dt;
         if (engine.keys?.ArrowUp || engine.keys?.w) this.y -= 8 * dt;
         if (engine.keys?.ArrowDown || engine.keys?.s) this.y += 8 * dt;

         // Clamp to visible canvas borders
         if (this.x < 40) this.x = 40;
         if (this.x > engine.width - 40) this.x = engine.width - 40;
         if (this.y < 60) this.y = 60;
         if (this.y > engine.height - 60) this.y = engine.height - 60;
      },
      render: function(ctx) {
        const img = imgCache.current[SHIP_IMG_SRC];
        if (img) {
          // Flashing effect during invulnerability frame
          if (this.isFlashing && Math.floor(Date.now() / 100) % 2 === 0) {
             return;
          }
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(-Math.PI / 2); // Rotate to face upwards (vertical travel)

          // Glowing energy shield visual effect
          if (this.isInvulnerable) {
             ctx.strokeStyle = 'rgba(0, 228, 255, 0.9)';
             ctx.lineWidth = 3;
             ctx.beginPath();
             ctx.arc(0, 0, 52, 0, Math.PI * 2);
             ctx.stroke();
             
             const shieldGrad = ctx.createRadialGradient(0, 0, 40, 0, 0, 55);
             shieldGrad.addColorStop(0, 'rgba(0, 228, 255, 0)');
             shieldGrad.addColorStop(1, 'rgba(0, 228, 255, 0.25)');
             ctx.fillStyle = shieldGrad;
             ctx.fill();
          }

          ctx.drawImage(img, -45, -45, 90, 90);
          
          // Propulsion engine glow (pulses)
          ctx.globalCompositeOperation = 'lighter';
          ctx.fillStyle = '#00E4FF';
          ctx.globalAlpha = 0.5 + Math.random() * 0.5;
          ctx.beginPath();
          ctx.arc(-40, 0, 15 + Math.random()*10, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.restore();
        }
      }
    };
    engine.registerRigidBody(ship);

    // 3D Hyperspace Starfield — z-depth projection creates Star Wars hyperspace effect
    const STAR_COUNT = 300;
    // Center of the projection (hyperspace tunnel perspective)
    const CX = engine.width / 2;
    const CY = engine.height / 2;

    for(let i = 0; i < STAR_COUNT; i++) {
      engine.registerRigidBody({
        type: 'star',
        // 3D position: x3d/y3d are spread around center, z is depth (larger = farther)
        x3d: (Math.random() - 0.5) * engine.width * 2.5,
        y3d: (Math.random() - 0.5) * engine.height * 2.5,
        z: Math.random() * 800 + 1,
        zPrev: 0,  // for streak rendering
        radius: 1,
        update: function(dt) {
           // Speed: how fast z decreases (stars approach) based on velocity factor
           const gamma = 1 / Math.sqrt(1 - Math.pow(velocityRef.current, 2));
           const starSpeed = (0.5 + velocityRef.current * 12) * gamma * 0.4 * dt;
           this.zPrev = this.z;
           this.z -= starSpeed;
           // Reset star when it reaches the viewer
           if (this.z <= 1) {
              this.z = 800;
              this.zPrev = 800;
              this.x3d = (Math.random() - 0.5) * engine.width * 2.5;
              this.y3d = (Math.random() - 0.5) * engine.height * 2.5;
           }
        },
        render: function(ctx) {
           // Project 3D coords to 2D screen (perspective division)
           const scale = 400; // focal length
           const px = (this.x3d / this.z) * scale + CX;
           const py = (this.y3d / this.z) * scale + CY;
           const pxPrev = (this.x3d / this.zPrev) * scale + CX;
           const pyPrev = (this.y3d / this.zPrev) * scale + CY;
           
           // Size based on depth
           const size = Math.max(0.5, (1 - this.z / 800) * 3);
           
           // Color: white at low speed, cyan blueshift at high speed
           const v = velocityRef.current;
           const r = Math.round(255 * (1 - v * 0.8));
           const g = Math.round(220 + 35 * v);
           const b = 255;
           const alpha = Math.min(1, (1 - this.z / 800) * 1.5 + 0.1);
           
           // Only draw if on screen
           if (px < -20 || px > engine.width + 20 || py < -20 || py > engine.height + 20) return;

           if (v > 0.2 && this.zPrev > 0 && Math.abs(px - pxPrev) + Math.abs(py - pyPrev) > 1) {
              // Draw streak line (hyperspace effect)
              ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
              ctx.lineWidth = size;
              ctx.beginPath();
              ctx.moveTo(pxPrev, pyPrev);
              ctx.lineTo(px, py);
              ctx.stroke();
           } else {
              // Draw dot at low speed
              ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
              ctx.beginPath();
              ctx.arc(px, py, size, 0, Math.PI * 2);
              ctx.fill();
           }
        }
      });
    }

    // Overriding engine update loop to render cosmic background directly on canvas and manage spawns at 60fps
    engine.update = (function(originalUpdate) {
      let time = 0;
      let lastSpawnTime = 0;
      let nebulaTime = 0;
      return function(dt) {
         if (this.ctx) {
             const ctx = this.ctx;
             
             // Draw solid deep space void
             ctx.fillStyle = '#02030d';
             ctx.fillRect(0, 0, this.width, this.height);
             
             // === ENHANCED NEBULA BACKGROUND ===
             nebulaTime += dt * 0.003;
             ctx.save();
             ctx.globalCompositeOperation = 'screen';
             
             // Deep magenta nebula cloud
             const x1 = this.width * 0.55 + Math.sin(nebulaTime * 0.7) * 180;
             const y1 = this.height * 0.4 + Math.cos(nebulaTime * 0.5) * 150;
             const grad1 = ctx.createRadialGradient(x1, y1, 10, x1, y1, 420);
             grad1.addColorStop(0, 'rgba(120, 0, 180, 0.55)');
             grad1.addColorStop(0.4, 'rgba(80, 0, 120, 0.25)');
             grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
             ctx.fillStyle = grad1;
             ctx.fillRect(0, 0, this.width, this.height);

             // Cyan/electric-blue nebula
             const x2 = this.width * 0.35 - Math.sin(nebulaTime * 0.55) * 160;
             const y2 = this.height * 0.6 - Math.cos(nebulaTime * 0.65) * 130;
             const grad2 = ctx.createRadialGradient(x2, y2, 10, x2, y2, 380);
             grad2.addColorStop(0, 'rgba(0, 80, 150, 0.5)');
             grad2.addColorStop(0.4, 'rgba(0, 40, 100, 0.22)');
             grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
             ctx.fillStyle = grad2;
             ctx.fillRect(0, 0, this.width, this.height);
             
             // Warm orange cloud (distant star formation)
             const x3 = this.width * 0.7 + Math.cos(nebulaTime * 0.4) * 100;
             const y3 = this.height * 0.7 + Math.sin(nebulaTime * 0.6) * 80;
             const grad3 = ctx.createRadialGradient(x3, y3, 5, x3, y3, 260);
             grad3.addColorStop(0, 'rgba(140, 40, 0, 0.4)');
             grad3.addColorStop(0.5, 'rgba(80, 20, 0, 0.15)');
             grad3.addColorStop(1, 'rgba(0, 0, 0, 0)');
             ctx.fillStyle = grad3;
             ctx.fillRect(0, 0, this.width, this.height);
             
             ctx.restore();
         }

         // Spawning logic integrated inside 60fps loop instead of stale React effect
         if (gameStateRef.current === 'playing') {
            time += dt * 0.016; // Increment game time in seconds
            
            const currentV = velocityRef.current;
            const currentGamma = 1 / Math.sqrt(1 - Math.pow(currentV, 2));
            
            // Relativistic spawning speed (higher speeds increase frequencies)
            const spawnIntervalThreshold = Math.max(0.25, 1.4 / currentGamma);
            
            if (time - lastSpawnTime > spawnIntervalThreshold) {
               lastSpawnTime = time;
               
               // Random obstacle asset choice
               const imgSrc = OBSTACLES[Math.floor(Math.random() * OBSTACLES.length)];
               
               // Diagonal trajectory vectors
               const startFromTop = Math.random() > 0.35;
               let startX, startY, vx, vy;
               
               if (startFromTop) {
                  startX = Math.random() * this.width;
                  startY = -60;
                  vx = (Math.random() - 0.5) * 6; // Wide diagonal drifting
                  vy = 3 + (currentV * 18);       // High relativistic downward speeds
               } else {
                  const fromLeft = Math.random() > 0.5;
                  startX = fromLeft ? -60 : this.width + 60;
                  startY = Math.random() * (this.height * 0.45);
                  vx = fromLeft ? (2 + Math.random() * 5) : (-2 - Math.random() * 5);
                  vy = 3 + (currentV * 18);
               }

               // Register obstacle with dynamic spin and diagonal physics
               this.registerRigidBody({
                 type: 'anomaly',
                 x: startX,
                 y: startY,
                 radius: 35,
                 imgSrc: imgSrc,
                 vx: vx,
                 vy: vy,
                 rotation: Math.random() * Math.PI * 2,
                 angularVelocity: (Math.random() - 0.5) * 0.18, // Spin
                 update: function(dt) {
                    this.x += this.vx * this.effects.timeDilation * dt * 0.12;
                    this.y += this.vy * this.effects.timeDilation * dt * 0.12;
                    this.rotation += this.angularVelocity * this.effects.timeDilation * dt * 0.12;
                    
                    // Direct target collision detection
                    const playerShip = engine.entities.find(e => e.id === 'ship');
                    if (playerShip) {
                       const dist = Math.sqrt(Math.pow(this.x - playerShip.x, 2) + Math.pow(this.y - playerShip.y, 2));
                       
                       // Collision threshold with buffer
                       if (dist < playerShip.radius + this.radius - 12) {
                          this.dead = true; // Remove obstacle on impact
                          
                          // Strike damage system
                          if (!playerShip.isInvulnerable) {
                             playerShip.isInvulnerable = true;
                             playerShip.isFlashing = true;
                             
                             // Trigger damage via synchronous callback
                             handleDamage();
                             
                             setTimeout(() => {
                                playerShip.isInvulnerable = false;
                                playerShip.isFlashing = false;
                             }, 1500);
                          }
                       }
                    }

                    // Destroy obstacles that leave screen bounds
                    if (this.y > engine.height + 150 || this.x < -150 || this.x > engine.width + 150) {
                       this.dead = true; 
                    }
                 },
                 render: function(ctx) {
                    const img = imgCache.current[this.imgSrc];
                    ctx.save();
                    ctx.translate(this.x, this.y);
                    ctx.rotate(this.rotation);
                    if (img) {
                       // Draw the obstacle image with transparency
                       ctx.globalAlpha = 0.9;
                       ctx.drawImage(img, -this.radius, -this.radius, this.radius * 2, this.radius * 2);
                       ctx.globalAlpha = 1;
                    } else {
                       // Bright fallback so obstacles are ALWAYS visible even if image fails
                       const obsGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, this.radius);
                       obsGrad.addColorStop(0, '#FF8844');
                       obsGrad.addColorStop(0.6, '#CC4400');
                       obsGrad.addColorStop(1, 'rgba(80,20,0,0.5)');
                       ctx.fillStyle = obsGrad;
                       ctx.beginPath();
                       // Irregular asteroid shape
                       for (let a = 0; a < Math.PI * 2; a += 0.5) {
                          const noise = 0.7 + Math.random() * 0.3;
                          const rx = Math.cos(a) * this.radius * noise;
                          const ry = Math.sin(a) * this.radius * noise;
                          a === 0 ? ctx.moveTo(rx, ry) : ctx.lineTo(rx, ry);
                       }
                       ctx.closePath();
                       ctx.fill();
                    }
                    // ALWAYS draw glowing neon outline so obstacle is visible regardless of image
                    ctx.strokeStyle = 'rgba(255, 120, 0, 0.9)';
                    ctx.lineWidth = 2.5;
                    ctx.shadowColor = '#FF6600';
                    ctx.shadowBlur = 12;
                    ctx.beginPath();
                    ctx.arc(0, 0, this.radius - 2, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.shadowBlur = 0;
                    ctx.restore();
                 }
               });
            }
         }

         originalUpdate.call(this, dt);
         this.entities = this.entities.filter(e => !e.dead);
      };
    })(engine.update);

    // Input listeners
    engine.keys = {};
    const kd = (e) => engine.keys[e.key] = true;
    const ku = (e) => engine.keys[e.key] = false;
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);

    // Mouse drag support for fluid 2D movement
    let isDragging = false;
    const onDown = () => isDragging = true;
    const onUp = () => isDragging = false;
    const onMove = (e) => {
      if (isDragging && gameStateRef.current === 'playing') {
        const rect = canvasRef.current.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const targetX = clientX - rect.left;
        const targetY = clientY - rect.top;
        
        // Drag control with boundary clamp
        ship.x = Math.max(40, Math.min(engine.width - 40, targetX));
        ship.y = Math.max(60, Math.min(engine.height - 60, targetY));
      }
    };

    const canvas = canvasRef.current;
    canvas.addEventListener('mousedown', onDown);
    canvas.addEventListener('mouseup', onUp);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('touchstart', onDown);
    canvas.addEventListener('touchend', onUp);
    canvas.addEventListener('touchmove', onMove);

    if (gameState === 'playing') {
       engine.start();
    }

    return () => {
      window.removeEventListener('keydown', kd);
      window.removeEventListener('keyup', ku);
      canvas.removeEventListener('mousedown', onDown);
      canvas.removeEventListener('mouseup', onUp);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('touchstart', onDown);
      canvas.removeEventListener('touchend', onUp);
      canvas.removeEventListener('touchmove', onMove);
      engine.stop();
    };
  }, [gameState, imagesLoaded]);

  if (!imagesLoaded) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020308', color: '#00E4FF', fontFamily: 'monospace' }}>CARGANDO VEHÍCULOS Y AMBIENTE ESTELAR...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#020308', color: 'white' }}>
      <Navbar />
      
      <main style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <header style={{ textAlign: 'center', marginBottom: '1rem' }}>
           <h1 style={{ color: '#00E4FF', margin: '0 0 0.5rem 0', textShadow: '0 0 20px rgba(0,228,255,0.5)', fontFamily: 'monospace' }}>CARRERAS RELATIVISTAS</h1>
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
          
          {/* Botón Cerrar Máquina */}
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

          <canvas 
            ref={canvasRef} 
            width={800} 
            height={500} 
            style={{ 
              width: '100%', 
              height: '100%',
              transform: `scale(${1 + velocityC * 0.3})`, // FOV Special Relativistic Effect
              transition: 'transform 0.1s linear',
              background: 'transparent'
            }} 
          />
          
          {/* Main Menu */}
          {gameState === 'menu' && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', zIndex: 10 }}>
              <Info size={48} color="#00E4FF" style={{ marginBottom: '1rem' }} />
              <h2 style={{ color: 'white', marginBottom: '1rem', fontFamily: 'monospace' }}>Mecánica Especial de Altas Energías</h2>
              <p style={{ maxWidth: '560px', color: '#aaa', lineHeight: 1.6, marginBottom: '2rem', fontSize: '0.95rem' }}>
                Tu objetivo es guiar la astronave hasta la baliza final a <strong style={{color:'#00FF66'}}>10,000 UA</strong>.
                <br/><br/>
                Acelerarás automáticamente hasta alcanzar el <strong style={{color:'#00E4FF'}}>99% de la velocidad de la luz (0.99c)</strong>, deformando el tejido espaciotemporal.
                <br/><br/>
                <strong>Instrucciones:</strong><br/>
                - Utiliza las flechas del teclado / teclas <strong>WASD</strong> (o arrastra por pantalla) para esquivar en <strong>2D</strong>.<br/>
                - Evita asteroides, escombros orbitarios y patrullas alienígenas.<br/>
                - Cada colisión restará <strong>34% de integridad estructural</strong>. Soporta hasta 3 choques antes de colapsar.
              </p>
              <button className="btn-primary" onClick={() => setGameState('playing')} style={{ background: '#00E4FF', color: 'black', fontWeight: 'bold' }}>
                <Play size={20} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                ACTIVAR CONDUCCIÓN RELATIVISTA
              </button>
            </div>
          )}

          {/* Playing HUD */}
          {gameState === 'playing' && (
            <div style={{ position: 'absolute', top: 20, left: 20, right: 20, display: 'flex', justifyContent: 'space-between', zIndex: 5, pointerEvents: 'none' }}>
              
              {/* Telemetry */}
              <div style={{ fontFamily: 'monospace', color: '#00E4FF', textShadow: '0 0 5px #00E4FF', background: 'rgba(0,0,0,0.6)', padding: '10px 15px', borderRadius: '8px', border: '1px solid rgba(0, 228, 255, 0.4)' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>VELOCIDAD: {(velocityC * 100).toFixed(0)}% c</div>
                <div style={{ fontSize: '0.85rem', opacity: 0.85 }}>LORENTZ (γ): {lorentz.toFixed(2)}</div>
              </div>
              
              {/* Health/Shield Integrity HUD */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', background: 'rgba(0,0,0,0.6)', padding: '10px 15px', borderRadius: '8px', border: '1px solid rgba(255, 50, 50, 0.4)', width: '200px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 'bold', color: health > 35 ? '#ff5555' : '#ff1111' }}>
                  <span>INTEGRIDAD CASCO</span>
                  <span>{Math.round(health)}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#222', borderRadius: '4px', overflow: 'hidden', border: '1px solid #444' }}>
                  <div style={{ width: `${health}%`, height: '100%', background: health > 50 ? '#00FF66' : health > 30 ? '#FFA500' : '#FF2A2A', transition: 'width 0.3s ease' }} />
                </div>
              </div>

              {/* Space Beacon Target Progress */}
              <div style={{ fontFamily: 'monospace', color: '#00FF66', textShadow: '0 0 5px #00FF66', background: 'rgba(0,0,0,0.6)', padding: '10px 15px', borderRadius: '8px', border: '1px solid rgba(0, 255, 102, 0.4)', fontSize: '1.1rem', fontWeight: 'bold', textAlign: 'right' }}>
                DISTANCIA<br/>
                {Math.floor(distance)} / 10000 UA
              </div>
            </div>
          )}

          {/* Won Screen */}
          {gameState === 'won' && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,255,136,0.2)', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', zIndex: 10 }}>
              <FastForward size={64} color="#00FF88" style={{ marginBottom: '1rem' }} />
              <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '1rem', textShadow: '0 0 20px #00FF88', fontFamily: 'monospace' }}>¡SALTO HIPERESPACIAL COMPLETADO!</h2>
              <p style={{ color: 'white', marginBottom: '2rem', maxWidth: '500px' }}>Alcanzaste las coordenadas destino manipulando con éxito la relatividad especial y la contracción de Lorentz.</p>
              <button className="btn-primary" onClick={() => window.location.reload()} style={{ background: '#00FF88', color: 'black' }}>Sincronizar Logro Estudiantil</button>
            </div>
          )}

          {/* Lost Screen */}
          {gameState === 'lost' && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,42,42,0.25)', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', zIndex: 10 }}>
              <AlertTriangle size={64} color="#FF2A2A" style={{ marginBottom: '1rem' }} />
              <h2 style={{ color: 'white', fontSize: '2.3rem', marginBottom: '1rem', textShadow: '0 0 20px #FF2A2A', fontFamily: 'monospace' }}>FUSIÓN DE CASCO DETECTADA</h2>
              <p style={{ color: 'white', marginBottom: '2rem', maxWidth: '500px' }}>La integridad de la nave bajó al 0% debido a colisiones masivas de escombros espaciales sublumínicos.</p>
              <button className="btn-primary" onClick={() => window.location.reload()} style={{ background: '#FF2A2A', color: 'white' }}>Rearmar y Reintentar</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
