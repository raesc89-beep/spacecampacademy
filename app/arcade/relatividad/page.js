'use client';
import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import { AntigravityEngine } from '@/lib/antigravity/engine';
import { Rocket, FastForward, Play, Info, AlertTriangle } from 'lucide-react';
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
  
  // Image cache
  const imgCache = useRef({});

  // Preload Images & Remove White Backgrounds
  useEffect(() => {
    const loadImages = async () => {
       const srcs = [SHIP_IMG_SRC, ...OBSTACLES];
       let loadedCount = 0;
       
       const removeWhiteBg = (img) => {
         const canvas = document.createElement('canvas');
         canvas.width = img.width; canvas.height = img.height;
         const ctx = canvas.getContext('2d');
         ctx.drawImage(img, 0, 0);
         const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
         const data = imgData.data;
         for (let i = 0; i < data.length; i += 4) {
             // If pixel is very close to white, make transparent
             if (data[i] > 230 && data[i+1] > 230 && data[i+2] > 230) {
                 data[i+3] = 0; // alpha = 0
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
                imgCache.current[src] = removeWhiteBg(img);
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

  // Game Loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    let interval = setInterval(() => {
      // Faster acceleration
      setVelocityC(prev => {
        const next = Math.min(prev + 0.05, 0.99); // Increments faster
        return parseFloat(next.toFixed(2));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'playing' || !engineRef.current) return;
    const engine = engineRef.current;
    
    // Calculate Lorentz Factor
    const gamma = 1 / Math.sqrt(1 - Math.pow(velocityC, 2));
    setLorentz(gamma);
    
    // Apply visual relativistic effects
    engine.effects.timeDilation = gamma * 2;
    engine.effects.chromaticAberration = velocityC * 20;
    engine.effects.bloom = velocityC * 0.8;

    // Spawn obstacles based on speed
    if (Math.random() < 0.03 * gamma) {
      const imgSrc = OBSTACLES[Math.floor(Math.random() * OBSTACLES.length)];
      engine.registerRigidBody({
        type: 'anomaly',
        x: Math.random() * engine.width,
        y: -100,
        radius: 35,
        imgSrc: imgSrc,
        vx: 0,
        vy: 2 + (velocityC * 25),
        rotation: Math.random() * Math.PI * 2,
        angularVelocity: (Math.random() - 0.5) * 0.1,
        update: function(dt) {
           this.y += this.vy * engine.effects.timeDilation * dt;
           this.rotation += this.angularVelocity * engine.effects.timeDilation * dt;
           
           // Collision detection with ship
           const ship = engine.entities.find(e => e.id === 'ship');
           if (ship) {
              const dist = Math.sqrt(Math.pow(this.x - ship.x, 2) + Math.pow(this.y - ship.y, 2));
              if (dist < 30) {
                 setGameState('lost');
                 engine.stop();
              }
           }

           if (this.y > engine.height + 150) {
              this.dead = true; 
           }
        },
        render: function(ctx) {
           const img = imgCache.current[this.imgSrc];
           if (img) {
              ctx.save();
              ctx.translate(this.x, this.y);
              ctx.rotate(this.rotation);
              ctx.drawImage(img, -this.radius, -this.radius, this.radius * 2, this.radius * 2);
              ctx.restore();
           }
        }
      });
    }

    // Clean dead entities
    engine.entities = engine.entities.filter(e => !e.dead);
    
    // Update distance
    setDistance(prev => {
      const newDist = prev + (velocityC * 150);
      if (newDist >= targetDistance) {
         setGameState('won');
         engine.stop();
      }
      return newDist;
    });

  }, [velocityC, gameState]);

  // Engine Setup
  useEffect(() => {
    if (!canvasRef.current || !imagesLoaded) return;
    
    const engine = new AntigravityEngine(canvasRef.current);
    engineRef.current = engine;
    
    engine.setEnvironment({ gravity: 0, fluidDensity: 0 });

    const ship = {
      id: 'ship',
      type: 'rigidbody',
      x: engine.width / 2,
      y: engine.height - 100,
      radius: 35,
      update: function(dt) {
         // Keyboard movement
         if (engine.keys?.ArrowLeft) this.x -= 8 * dt;
         if (engine.keys?.ArrowRight) this.x += 8 * dt;

         // Clamp to screen
         if (this.x < 40) this.x = 40;
         if (this.x > engine.width - 40) this.x = engine.width - 40;
      },
      render: function(ctx) {
        const img = imgCache.current[SHIP_IMG_SRC];
        if (img) {
          ctx.save();
          ctx.translate(this.x, this.y);
          // Face up
          ctx.rotate(-Math.PI / 2);
          ctx.drawImage(img, -45, -45, 90, 90);
          
          // Engine glow
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

    // Starfield for relativistic effect
    for(let i=0; i<150; i++) {
      engine.registerRigidBody({
        type: 'star',
        x: Math.random() * engine.width,
        y: Math.random() * engine.height,
        z: Math.random() * 100 + 1,
        radius: 2,
        color: '#FFFFFF',
        update: function(dt) {
          const speed = engine.effects.timeDilation * (100 / this.z);
          this.y += speed * dt;
          if (this.y > engine.height) {
            this.y = 0;
            this.x = Math.random() * engine.width;
          }
          if (engine.effects.timeDilation > 5) {
            this.color = '#00E4FF'; // Blueshift
          } else {
            this.color = '#FFFFFF';
          }
        }
      });
    }

    // Input listeners
    engine.keys = {};
    const kd = (e) => engine.keys[e.key] = true;
    const ku = (e) => engine.keys[e.key] = false;
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);

    // Mouse drag support for mobile/desktop
    let isDragging = false;
    const onDown = () => isDragging = true;
    const onUp = () => isDragging = false;
    const onMove = (e) => {
      if (isDragging && gameState === 'playing') {
        const rect = canvasRef.current.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const targetX = clientX - rect.left;
        ship.x = targetX;
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
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020308', color: '#00E4FF' }}>Cargando Assets Estelares...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#020308', color: 'white' }}>
      <Navbar />
      
      <main style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <header style={{ textAlign: 'center', marginBottom: '1rem' }}>
           <h1 style={{ color: '#00E4FF', margin: '0 0 0.5rem 0', textShadow: '0 0 20px rgba(0,228,255,0.5)' }}>Carreras Relativistas</h1>
        </header>

        <div style={{ 
            position: 'relative', 
            width: '800px', 
            height: '500px', 
            border: '2px solid #00E4FF', 
            borderRadius: '12px', 
            overflow: 'hidden', 
            boxShadow: '0 0 30px rgba(0,228,255,0.2)',
            // Espacio de fondo dinámico real
            background: 'url(https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1000&auto=format&fit=crop) center / cover'
        }}>
          <canvas 
            ref={canvasRef} 
            width={800} 
            height={500} 
            style={{ 
              width: '100%', 
              height: '100%',
              transform: `scale(${1 + velocityC * 0.5})`, // FOV Tunnel Vision
              transition: 'transform 0.1s linear',
              background: 'transparent' // Dejar ver el fondo de nebulosa
            }} 
          />
          
          {/* Main Menu */}
          {gameState === 'menu' && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', zIndex: 10 }}>
              <Info size={48} color="#00E4FF" style={{ marginBottom: '1rem' }} />
              <h2 style={{ color: 'white', marginBottom: '1rem' }}>Física de Altas Energías</h2>
              <p style={{ maxWidth: '500px', color: '#aaa', lineHeight: 1.6, marginBottom: '2rem' }}>
                Alcanza la baliza destino (10,000 UA). Tu nave acelerará automáticamente hasta un <strong style={{color:'#00E4FF'}}>99% de la velocidad de la luz (0.99c)</strong>.
                <br/><br/>
                Esquiva asteroides, escombros espaciales y naves enemigas. A mayores velocidades experimentarás contracción del FOV y efecto Doppler.
              </p>
              <button className="btn-primary" onClick={() => setGameState('playing')} style={{ background: '#00E4FF', color: 'black', fontWeight: 'bold' }}>
                <Play size={20} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                ARRANCAR MOTOR WARP
              </button>
            </div>
          )}

          {/* Playing HUD */}
          {gameState === 'playing' && (
            <div style={{ position: 'absolute', top: 20, left: 20, right: 20, display: 'flex', justifyContent: 'space-between', zIndex: 5, pointerEvents: 'none' }}>
              <div style={{ fontFamily: 'monospace', color: '#00E4FF', textShadow: '0 0 5px #00E4FF', background: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>VELOCIDAD: {(velocityC * 100).toFixed(1)}% c</div>
                <div>LORENTZ (γ): {lorentz.toFixed(2)}</div>
              </div>
              <div style={{ fontFamily: 'monospace', color: '#00FF66', textShadow: '0 0 5px #00FF66', background: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '8px', fontSize: '1.2rem', fontWeight: 'bold', textAlign: 'right' }}>
                DISTANCIA<br/>
                {Math.floor(distance)} / 10000 UA
              </div>
            </div>
          )}

          {/* Won */}
          {gameState === 'won' && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,255,136,0.2)', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', zIndex: 10 }}>
              <FastForward size={64} color="#00FF88" style={{ marginBottom: '1rem' }} />
              <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '1rem', textShadow: '0 0 20px #00FF88' }}>¡Salto Cuántico Exitoso!</h2>
              <p style={{ color: 'white', marginBottom: '2rem' }}>Alcanzaste la baliza sobreviviendo a los efectos de la relatividad especial y la basura espacial.</p>
              <button className="btn-primary" onClick={() => window.location.reload()} style={{ background: '#00FF88', color: 'black' }}>Volver a Jugar</button>
            </div>
          )}

          {/* Lost */}
          {gameState === 'lost' && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,42,42,0.2)', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', zIndex: 10 }}>
              <AlertTriangle size={64} color="#FF2A2A" style={{ marginBottom: '1rem' }} />
              <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '1rem', textShadow: '0 0 20px #FF2A2A' }}>Colisión Crítica</h2>
              <p style={{ color: 'white', marginBottom: '2rem' }}>La nave sufrió daños catastróficos por colisión a velocidades sublumínicas.</p>
              <button className="btn-primary" onClick={() => window.location.reload()} style={{ background: '#FF2A2A', color: 'white' }}>Reintentar</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
