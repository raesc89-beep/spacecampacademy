'use client';
import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import { AntigravityEngine } from '@/lib/antigravity/engine';
import { Rocket, FastForward, Play, Info, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RelativisticRacingGame() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const [gameState, setGameState] = useState('menu'); // menu, playing, won, lost
  const [velocityC, setVelocityC] = useState(0); // 0 to 0.99c
  const [distance, setDistance] = useState(0);
  const targetDistance = 10000;
  const [lorentz, setLorentz] = useState(1);

  // Game Loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    let interval = setInterval(() => {
      // Auto-accelerate slowly
      setVelocityC(prev => {
        const next = Math.min(prev + 0.01, 0.99);
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

    // Spawn obstacles based on speed (more speed = more obstacles per tick)
    if (Math.random() < 0.02 * gamma) {
      engine.registerRigidBody({
        type: 'anomaly',
        x: Math.random() * engine.width,
        y: -50,
        radius: Math.random() * 20 + 10,
        color: '#FF2A2A',
        vx: 0,
        vy: 2 + (velocityC * 20),
        update: function(dt) {
           this.y += this.vy * engine.effects.timeDilation * dt;
           
           // Collision detection with ship
           const ship = engine.entities.find(e => e.id === 'ship');
           if (ship) {
              const dist = Math.sqrt(Math.pow(this.x - ship.x, 2) + Math.pow(this.y - ship.y, 2));
              if (dist < this.radius + ship.radius) {
                 setGameState('lost');
                 engine.stop();
              }
           }

           if (this.y > engine.height + 100) {
              this.dead = true; // Mark for garbage collection
           }
        }
      });
    }

    // Clean dead entities
    engine.entities = engine.entities.filter(e => !e.dead);
    
    // Update distance
    setDistance(prev => {
      const newDist = prev + (velocityC * 100);
      if (newDist >= targetDistance) {
         setGameState('won');
         engine.stop();
      }
      return newDist;
    });

  }, [velocityC, gameState]);

  // Engine Setup
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const engine = new AntigravityEngine(canvasRef.current);
    engineRef.current = engine;
    
    engine.setEnvironment({ gravity: 0, fluidDensity: 0 });

    const ship = {
      id: 'ship',
      type: 'rigidbody',
      x: engine.width / 2,
      y: engine.height - 80,
      radius: 15,
      color: '#FFFFFF',
      update: function(dt) {
         // Keyboard movement
         if (engine.keys?.ArrowLeft) this.x -= 8 * dt;
         if (engine.keys?.ArrowRight) this.x += 8 * dt;

         // Clamp to screen
         if (this.x < 20) this.x = 20;
         if (this.x > engine.width - 20) this.x = engine.width - 20;
      },
      render: function(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - 20);
        ctx.lineTo(this.x - 15, this.y + 20);
        ctx.lineTo(this.x + 15, this.y + 20);
        ctx.closePath();
        ctx.fill();
        
        ctx.fillStyle = '#00E4FF';
        ctx.beginPath();
        ctx.moveTo(this.x - 10, this.y + 20);
        ctx.lineTo(this.x, this.y + 20 + Math.random() * 40);
        ctx.lineTo(this.x + 10, this.y + 20);
        ctx.closePath();
        ctx.fill();
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
  }, [gameState]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#020308', color: 'white' }}>
      <Navbar />
      
      <main style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <header style={{ textAlign: 'center', marginBottom: '1rem' }}>
           <h1 style={{ color: '#00E4FF', margin: '0 0 0.5rem 0', textShadow: '0 0 20px rgba(0,228,255,0.5)' }}>Carreras Relativistas</h1>
        </header>

        <div style={{ position: 'relative', width: '800px', height: '500px', border: '2px solid #00E4FF', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 0 30px rgba(0,228,255,0.2)' }}>
          <canvas 
            ref={canvasRef} 
            width={800} 
            height={500} 
            style={{ 
              width: '100%', 
              height: '100%',
              transform: `scale(${1 + velocityC * 0.5})`, // FOV Tunnel Vision
              transition: 'transform 0.1s linear'
            }} 
          />
          
          {/* Main Menu */}
          {gameState === 'menu' && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', zIndex: 10 }}>
              <Info size={48} color="#FF2A2A" style={{ marginBottom: '1rem' }} />
              <h2 style={{ color: 'white', marginBottom: '1rem' }}>Física de Altas Energías</h2>
              <p style={{ maxWidth: '500px', color: '#aaa', lineHeight: 1.6, marginBottom: '2rem' }}>
                Alcanza la baliza destino (10,000 UA). Tu nave acelerará automáticamente hasta un <strong style={{color:'#FF2A2A'}}>99% de la velocidad de la luz (0.99c)</strong>.
                <br/><br/>
                A mayores velocidades experimentarás contracción del campo visual (FOV) y efecto Doppler (Blueshift).
                Usa las <strong>Flechas Izquierda/Derecha</strong> o <strong>arrastra el ratón</strong> para esquivar Anomalías Rojas.
              </p>
              <button className="btn-primary" onClick={() => setGameState('playing')} style={{ background: '#FF2A2A', color: 'white', fontWeight: 'bold' }}>
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
              <p style={{ color: 'white', marginBottom: '2rem' }}>Alcanzaste la baliza sobreviviendo a los efectos de la relatividad especial.</p>
              <button className="btn-primary" onClick={() => window.location.reload()} style={{ background: '#00FF88', color: 'black' }}>Volver a Jugar</button>
            </div>
          )}

          {/* Lost */}
          {gameState === 'lost' && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,42,42,0.2)', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', zIndex: 10 }}>
              <AlertTriangle size={64} color="#FF2A2A" style={{ marginBottom: '1rem' }} />
              <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '1rem', textShadow: '0 0 20px #FF2A2A' }}>Colisión Crítica</h2>
              <p style={{ color: 'white', marginBottom: '2rem' }}>La nave fue destruida por una anomalía a altas velocidades.</p>
              <button className="btn-primary" onClick={() => window.location.reload()} style={{ background: '#FF2A2A', color: 'white' }}>Reintentar</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
