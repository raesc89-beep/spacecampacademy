'use client';
import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import { AntigravityEngine } from '@/lib/antigravity/engine';
import { Shield, ThermometerSnowflake, Zap, Play, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TardigradeSurvivalGame() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const [gameState, setGameState] = useState('menu'); // menu, playing, won, lost
  const [cryptobiosis, setCryptobiosis] = useState(false);
  const [environment, setEnvironment] = useState('normal'); 
  const [timeLeft, setTimeLeft] = useState(30);
  const [energy, setEnergy] = useState(100);
  const [warning, setWarning] = useState('');

  // Game Loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('won');
          return 0;
        }
        return prev - 1;
      });

      // Random environmental disasters every 5-8 seconds
      if (Math.random() < 0.15) {
        const events = ['radiation', 'freezing'];
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        setEnvironment(randomEvent);
        setWarning(`¡Peligro! ${randomEvent === 'radiation' ? 'Tormenta de Radiación' : 'Ola de Frío Extremo'}`);
        setTimeout(() => {
           setEnvironment('normal');
           setWarning('');
        }, 3000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState]);

  // Engine Setup
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const engine = new AntigravityEngine(canvasRef.current);
    engineRef.current = engine;

    const tardigrade = {
      id: 'tardy',
      x: canvasRef.current.width / 2,
      y: canvasRef.current.height / 2,
      wobble: 5,
      radius: 40,
      generateNodes: function() {
        const nodes = [];
        const numNodes = 12;
        for(let i=0; i<numNodes; i++) {
          const angle = (i / numNodes) * Math.PI * 2;
          nodes.push({
            ox: Math.cos(angle) * this.radius,
            oy: Math.sin(angle) * this.radius,
            x: Math.cos(angle) * this.radius,
            y: Math.sin(angle) * this.radius
          });
        }
        return nodes;
      },
      update: function(dt) {
        // Bounce off walls
        if (this.x < 50) { this.x = 50; this.vx *= -1; }
        if (this.x > engine.width - 50) { this.x = engine.width - 50; this.vx *= -1; }
        if (this.y < 50) { this.y = 50; this.vy *= -1; }
        if (this.y > engine.height - 50) { this.y = engine.height - 50; this.vy *= -1; }
        
        // Random swim if active
        if (!this.isCryptobiotic) {
          if (Math.random() < 0.05) this.vx += (Math.random() - 0.5) * 2;
          if (Math.random() < 0.05) this.vy += (Math.random() - 0.5) * 2;
        }

        // Mouse Dragging logic applied directly
        if (engine.mouseIsDown && this.isCryptobiotic) {
          const dx = engine.mouseX - this.x;
          const dy = engine.mouseY - this.y;
          this.vx += dx * 0.01;
          this.vy += dy * 0.01;
        }

        if (this.nodes) {
          this.nodes.forEach(n => {
            n.x += (n.ox - n.x) * 0.1;
            n.y += (n.oy - n.y) * 0.1;
          });
        }
      }
    };

    engine.registerSoftBody(tardigrade);

    // Add interactivity to the engine wrapper (Monkey patch for dragging)
    canvasRef.current.addEventListener('mousedown', (e) => {
      engine.mouseIsDown = true;
      const rect = canvasRef.current.getBoundingClientRect();
      engine.mouseX = e.clientX - rect.left;
      engine.mouseY = e.clientY - rect.top;
    });
    canvasRef.current.addEventListener('mousemove', (e) => {
      if (engine.mouseIsDown) {
        const rect = canvasRef.current.getBoundingClientRect();
        engine.mouseX = e.clientX - rect.left;
        engine.mouseY = e.clientY - rect.top;
      }
    });
    canvasRef.current.addEventListener('mouseup', () => engine.mouseIsDown = false);
    
    // Some food particles
    for(let i=0; i<20; i++) {
      engine.registerRigidBody({
        x: Math.random() * engine.width,
        y: Math.random() * engine.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: 3,
        color: '#00FF66'
      });
    }

    engine.start();

    return () => {
      engine.stop();
    };
  }, []);

  // Sync Environment and State
  useEffect(() => {
    if (!engineRef.current) return;
    const engine = engineRef.current;
    const tardy = engine.entities.find(e => e.id === 'tardy');
    if (!tardy) return;

    if (cryptobiosis) {
      tardy.isCryptobiotic = true;
      tardy.color = '#888888'; // Tun state
      tardy.wobble = 0;
      tardy.radius = 20;
      tardy.nodes.forEach(n => { n.ox *= 0.5; n.oy *= 0.5; });
      engine.setEnvironment({ fluidDensity: 0.99, gravity: 0 });
    } else {
      tardy.isCryptobiotic = false;
      tardy.color = '#88ccff'; // Active state
      tardy.wobble = 5;
      tardy.radius = 40;
      tardy.nodes.forEach(n => { n.ox *= 2; n.oy *= 2; });
      engine.setEnvironment({ fluidDensity: 0.05, gravity: 0.1 });
    }

    if (environment === 'radiation') {
      engine.effects.chromaticAberration = 15;
      engine.effects.bloom = 0.5;
    } else if (environment === 'freezing') {
      engine.effects.chromaticAberration = 0;
      engine.effects.bloom = 0;
    } else {
      engine.effects.chromaticAberration = 0;
      engine.effects.bloom = 0;
    }
  }, [cryptobiosis, environment]);

  // Check Death Condition
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    if (environment !== 'normal' && !cryptobiosis) {
       setEnergy(prev => prev - 5);
       if (energy <= 0) {
         setGameState('lost');
       }
    } else if (cryptobiosis) {
       setEnergy(prev => prev - 1); // Cryptobiosis slowly drains energy
       if (energy <= 0) {
         setGameState('lost');
       }
    }
  }, [environment, cryptobiosis, energy, gameState]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#020308', color: 'white' }}>
      <Navbar />
      
      <main style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <header style={{ textAlign: 'center', marginBottom: '1rem' }}>
           <h1 style={{ color: '#00E4FF', margin: '0 0 0.5rem 0', textShadow: '0 0 20px rgba(0,228,255,0.5)' }}>Supervivencia Criptobiótica</h1>
        </header>

        <div style={{ position: 'relative', width: '800px', height: '500px', border: '2px solid #00E4FF', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 0 30px rgba(0,228,255,0.2)' }}>
          <canvas 
            ref={canvasRef} 
            width={800} 
            height={500} 
            style={{ 
              width: '100%', 
              height: '100%',
              filter: environment === 'freezing' ? 'sepia(1) hue-rotate(180deg) saturate(2)' : 'none',
              cursor: cryptobiosis ? 'grab' : 'crosshair'
            }} 
          />
          
          {/* Overlay UI */}
          {gameState === 'menu' && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
              <Info size={48} color="#00E4FF" style={{ marginBottom: '1rem' }} />
              <h2 style={{ color: 'white', marginBottom: '1rem' }}>Instrucciones de Supervivencia</h2>
              <p style={{ maxWidth: '500px', color: '#aaa', lineHeight: 1.6, marginBottom: '2rem' }}>
                Sobrevive 30 segundos. El entorno cambiará bruscamente (Radiación o Frío Extremo). 
                Activa la <strong>Criptobiosis (Estado Ton)</strong> para protegerte, pero cuidado: consume energía.
                Cuando estés en estado Ton, puedes <strong>arrastrar al tardígrado con el ratón</strong> para moverlo.
              </p>
              <button className="btn-primary" onClick={() => setGameState('playing')} style={{ background: '#00E4FF', color: 'black', fontWeight: 'bold' }}>
                <Play size={20} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                INICIAR SIMULACIÓN
              </button>
            </div>
          )}

          {gameState === 'playing' && (
            <>
              {/* HUD */}
              <div style={{ position: 'absolute', top: 20, left: 20, display: 'flex', gap: '2rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.5)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #00E4FF' }}>
                  <span style={{ color: '#00E4FF', fontWeight: 'bold' }}>TIEMPO: {timeLeft}s</span>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.5)', padding: '0.5rem 1rem', borderRadius: '8px', border: `1px solid ${energy > 30 ? '#00FF66' : '#FF2A2A'}` }}>
                  <span style={{ color: energy > 30 ? '#00FF66' : '#FF2A2A', fontWeight: 'bold' }}>ENERGÍA: {energy}%</span>
                </div>
              </div>

              {/* Warning */}
              <AnimatePresence>
                {warning && (
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', background: 'rgba(255, 42, 42, 0.8)', padding: '1rem 2rem', borderRadius: '12px', color: 'white', fontWeight: 'bold', border: '2px solid white', textShadow: '0 2px 4px black' }}>
                    {warning}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Control */}
              <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)' }}>
                <button 
                  onMouseDown={() => setCryptobiosis(true)}
                  onMouseUp={() => setCryptobiosis(false)}
                  onMouseLeave={() => setCryptobiosis(false)}
                  onTouchStart={() => setCryptobiosis(true)}
                  onTouchEnd={() => setCryptobiosis(false)}
                  style={{
                    background: cryptobiosis ? '#00FF66' : 'rgba(0,0,0,0.8)',
                    color: cryptobiosis ? 'black' : 'white',
                    border: '2px solid #00FF66',
                    padding: '12px 24px',
                    borderRadius: '30px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: cryptobiosis ? '0 0 20px #00FF66' : 'none',
                    transition: 'all 0.1s'
                  }}
                >
                  <Shield size={24} />
                  {cryptobiosis ? 'ESTADO TON ACTIVO (Mantenido)' : 'MANTENER PARA CRIPTOBIOSIS'}
                </button>
              </div>
            </>
          )}

          {gameState === 'won' && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,255,136,0.2)', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <Shield size={64} color="#00FF88" style={{ marginBottom: '1rem' }} />
              <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '1rem', textShadow: '0 0 20px #00FF88' }}>¡Tardígrado Sobrevivió!</h2>
              <p style={{ color: 'white', marginBottom: '2rem' }}>Has superado los extremos del universo demostrando la resiliencia criptobiótica.</p>
              <button className="btn-primary" onClick={() => window.location.reload()} style={{ background: '#00FF88', color: 'black' }}>Volver a Jugar</button>
            </div>
          )}

          {gameState === 'lost' && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,42,42,0.2)', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <Zap size={64} color="#FF2A2A" style={{ marginBottom: '1rem' }} />
              <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '1rem', textShadow: '0 0 20px #FF2A2A' }}>Tardígrado Eliminado</h2>
              <p style={{ color: 'white', marginBottom: '2rem' }}>La energía vital se agotó debido a la radiación o el uso excesivo de criptobiosis.</p>
              <button className="btn-primary" onClick={() => window.location.reload()} style={{ background: '#FF2A2A', color: 'white' }}>Reintentar</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
