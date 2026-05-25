'use client';
import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import { AntigravityEngine } from '@/lib/antigravity/engine';
import { Shield, Droplets, Zap, Play, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TardigradeSurvivalGame() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const [gameState, setGameState] = useState('menu'); // menu, playing, won, lost
  const [cryptobiosis, setCryptobiosis] = useState(false);
  const [hydration, setHydration] = useState(100);
  const [energy, setEnergy] = useState(100);
  const [biomass, setBiomass] = useState(0);
  const targetBiomass = 500;
  const [timeSurvived, setTimeSurvived] = useState(0);
  const [warning, setWarning] = useState('');

  // Save telemetry when game ends
  useEffect(() => {
    if (gameState === 'won' || gameState === 'lost') {
       fetch('/api/telemetry', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           event: 'tardigrade_game_finished',
           data: {
             status: gameState,
             biomass_collected: biomass,
             time_survived: timeSurvived
           }
         })
       }).catch(err => console.error('Error logging telemetry:', err));
    }
  }, [gameState]);

  // Game Loop timers
  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      setTimeSurvived(prev => prev + 1);
      
      if (!cryptobiosis) {
         setEnergy(prev => Math.max(0, prev - 2));
      }

      // Environmental Hydration changes
      setHydration(prev => {
         let next = prev;
         // Randomly dry up or rehydrate
         if (Math.random() < 0.1) next -= 15;
         else next += 5;
         
         if (next > 100) next = 100;
         if (next < 0) next = 0;
         return next;
      });

    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, cryptobiosis]);

  // Warning and Death checks
  useEffect(() => {
    if (gameState !== 'playing') return;

    if (hydration < 30) {
      setWarning('¡Nivel de agua crítico! Peligro de desecación.');
    } else {
      setWarning('');
    }

    if (energy <= 0) {
      setGameState('lost');
    }
    
    if (hydration <= 0 && !cryptobiosis) {
       // Dies of dehydration if not in cryptobiosis
       setGameState('lost');
    }

    if (biomass >= targetBiomass) {
       setGameState('won');
    }

  }, [energy, hydration, biomass, cryptobiosis, gameState]);

  // Engine Setup
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const engine = new AntigravityEngine(canvasRef.current);
    engineRef.current = engine;

    // The Tardigrade (Soft-body)
    const tardigrade = {
      id: 'tardy',
      type: 'softbody',
      x: engine.width / 2,
      y: engine.height / 2,
      wobble: 5,
      radius: 30,
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
        
        // Mouse/Touch Dragging for movement
        if (engine.mouseIsDown && !this.isCryptobiotic) {
          const dx = engine.mouseX - this.x;
          const dy = engine.mouseY - this.y;
          this.vx += dx * 0.05;
          this.vy += dy * 0.05;
        }

        // Apply friction
        this.vx *= 0.9;
        this.vy *= 0.9;

        // Shape restoration
        if (this.nodes) {
          this.nodes.forEach(n => {
            n.x += (n.ox - n.x) * 0.1;
            n.y += (n.oy - n.y) * 0.1;
          });
        }
      },
      render: function(ctx) {
        ctx.beginPath();
        if (this.nodes && this.nodes.length > 0) {
           ctx.moveTo(this.x + this.nodes[0].x, this.y + this.nodes[0].y);
           for(let i=1; i<this.nodes.length; i++) {
              ctx.lineTo(this.x + this.nodes[i].x, this.y + this.nodes[i].y);
           }
        }
        ctx.closePath();
        ctx.fillStyle = this.color || '#00FF66';
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();

        // Draw cute eyes if active
        if (!this.isCryptobiotic) {
          ctx.fillStyle = 'black';
          ctx.beginPath(); ctx.arc(this.x - 10, this.y - 10, 3, 0, Math.PI*2); ctx.fill();
          ctx.beginPath(); ctx.arc(this.x + 10, this.y - 10, 3, 0, Math.PI*2); ctx.fill();
        }
      }
    };

    engine.registerSoftBody(tardigrade);

    // Spawner for Food (Algae/Bacteria)
    setInterval(() => {
       if (gameState !== 'playing' || engine.entities.filter(e => e.type === 'food').length > 15) return;
       engine.registerRigidBody({
          type: 'food',
          x: Math.random() * engine.width,
          y: Math.random() * engine.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: 5,
          color: '#00E4FF',
          update: function(dt) {
             const player = engine.entities.find(e => e.id === 'tardy');
             if (player && !player.isCryptobiotic) {
                const dist = Math.sqrt(Math.pow(this.x - player.x, 2) + Math.pow(this.y - player.y, 2));
                if (dist < player.radius + this.radius) {
                   this.dead = true;
                   setBiomass(b => Math.min(b + 20, targetBiomass));
                   setEnergy(e => Math.min(e + 10, 100));
                }
             }
          }
       });
    }, 1000);

    // Spawner for Predators (Nematodes)
    setInterval(() => {
       if (gameState !== 'playing' || engine.entities.filter(e => e.type === 'predator').length > 3) return;
       engine.registerRigidBody({
          type: 'predator',
          x: Math.random() > 0.5 ? 0 : engine.width,
          y: Math.random() * engine.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          radius: 15,
          color: '#FF2A2A',
          update: function(dt) {
             // Chasing AI
             const player = engine.entities.find(e => e.id === 'tardy');
             if (player && !player.isCryptobiotic) {
                const dx = player.x - this.x;
                const dy = player.y - this.y;
                const mag = Math.sqrt(dx*dx + dy*dy);
                if (mag > 0) {
                   this.vx += (dx / mag) * 0.5;
                   this.vy += (dy / mag) * 0.5;
                }
                
                // Speed limit
                const speed = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
                if (speed > 3) {
                   this.vx = (this.vx / speed) * 3;
                   this.vy = (this.vy / speed) * 3;
                }

                // Attack
                if (mag < player.radius + this.radius) {
                   setEnergy(e => Math.max(0, e - 2)); // High damage over time while touching
                }
             }

             // Bounce
             if (this.x < 0 || this.x > engine.width) this.vx *= -1;
             if (this.y < 0 || this.y > engine.height) this.vy *= -1;
          },
          render: function(ctx) {
            // Draw worm-like predator
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.ellipse(this.x, this.y, this.radius * 2, this.radius, Math.atan2(this.vy, this.vx), 0, Math.PI*2);
            ctx.fill();
          }
       });
    }, 4000);

    // Clean dead entities
    engine.update = (function(originalUpdate) {
      return function(dt) {
         originalUpdate.call(this, dt);
         this.entities = this.entities.filter(e => !e.dead);
      };
    })(engine.update);

    // Input listeners
    const onDown = (e) => {
      engine.mouseIsDown = true;
      const rect = canvasRef.current.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      engine.mouseX = clientX - rect.left;
      engine.mouseY = clientY - rect.top;
    };
    const onMove = (e) => {
      if (engine.mouseIsDown) {
         const rect = canvasRef.current.getBoundingClientRect();
         const clientX = e.touches ? e.touches[0].clientX : e.clientX;
         const clientY = e.touches ? e.touches[0].clientY : e.clientY;
         engine.mouseX = clientX - rect.left;
         engine.mouseY = clientY - rect.top;
      }
    };
    const onUp = () => engine.mouseIsDown = false;

    const canvas = canvasRef.current;
    canvas.addEventListener('mousedown', onDown);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseup', onUp);
    canvas.addEventListener('touchstart', onDown);
    canvas.addEventListener('touchmove', onMove);
    canvas.addEventListener('touchend', onUp);

    if (gameState === 'playing') {
      engine.start();
    }

    return () => {
      canvas.removeEventListener('mousedown', onDown);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseup', onUp);
      canvas.removeEventListener('touchstart', onDown);
      canvas.removeEventListener('touchmove', onMove);
      canvas.removeEventListener('touchend', onUp);
      engine.stop();
    };
  }, [gameState]);

  // Sync Environment and State
  useEffect(() => {
    if (!engineRef.current) return;
    const engine = engineRef.current;
    const tardy = engine.entities.find(e => e.id === 'tardy');
    if (!tardy) return;

    if (cryptobiosis) {
      tardy.isCryptobiotic = true;
      tardy.color = '#8B5A2B'; // Brown/Sepia tun state
      tardy.wobble = 0;
      tardy.radius = 20;
      if (tardy.nodes) tardy.nodes.forEach(n => { n.ox = n.ox/2; n.oy = n.oy/2; });
      engine.effects.sepia = 1;
    } else {
      tardy.isCryptobiotic = false;
      tardy.color = '#00FF66'; // Active state
      tardy.wobble = 5;
      tardy.radius = 30;
      if (tardy.nodes) {
         // Reset nodes shape
         const numNodes = tardy.nodes.length;
         for(let i=0; i<numNodes; i++) {
           const angle = (i / numNodes) * Math.PI * 2;
           tardy.nodes[i].ox = Math.cos(angle) * tardy.radius;
           tardy.nodes[i].oy = Math.sin(angle) * tardy.radius;
         }
      }
      engine.effects.sepia = 0;
    }

  }, [cryptobiosis]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#020308', color: 'white' }}>
      <Navbar />
      
      <main style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <header style={{ textAlign: 'center', marginBottom: '1rem' }}>
           <h1 style={{ color: '#00E4FF', margin: '0 0 0.5rem 0', textShadow: '0 0 20px rgba(0,228,255,0.5)' }}>Tardígrado: Supervivencia Microbiana</h1>
        </header>

        <div style={{ position: 'relative', width: '800px', height: '500px', border: '2px solid #00FF66', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 0 30px rgba(0,255,102,0.2)', backgroundColor: '#041512' }}>
          
          <canvas 
            ref={canvasRef} 
            width={800} 
            height={500} 
            style={{ 
              width: '100%', 
              height: '100%',
              filter: cryptobiosis ? 'sepia(1) brightness(0.6)' : 'none',
              transition: 'filter 0.5s',
              cursor: 'pointer'
            }} 
          />
          
          {/* Main Menu */}
          {gameState === 'menu' && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', zIndex: 10 }}>
              <Info size={48} color="#00FF66" style={{ marginBottom: '1rem' }} />
              <h2 style={{ color: 'white', marginBottom: '1rem' }}>Microcosmos de Supervivencia</h2>
              <p style={{ maxWidth: '600px', color: '#aaa', lineHeight: 1.6, marginBottom: '2rem' }}>
                Tu objetivo es alimentarte de algas y bacterias azules para conseguir <strong style={{color:'#00E4FF'}}>500 de Biomasa</strong> antes de quedarte sin energía.
                <br/><br/>
                <strong>Instrucciones:</strong><br/>
                - Arrastra el ratón / Dedo por la pantalla para nadar hacia la comida.<br/>
                - ¡Evita a los Depredadores Rojos (Nematodos)! Drenarán tu energía al contacto.<br/>
                - Si el agua se seca (Hidratación cae) o te acorrala un depredador, presiona <strong>CRIPTOBIOSIS</strong> para hacerte invulnerable, pero no podrás moverte ni comer.
              </p>
              <button className="btn-primary" onClick={() => setGameState('playing')} style={{ background: '#00FF66', color: 'black', fontWeight: 'bold' }}>
                <Play size={20} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                INICIAR SIMULACIÓN ESTUDIANTIL
              </button>
            </div>
          )}

          {/* Playing HUD */}
          {gameState === 'playing' && (
            <>
              <div style={{ position: 'absolute', top: 20, left: 20, right: 20, display: 'flex', justifyContent: 'space-between', zIndex: 5, pointerEvents: 'none' }}>
                {/* Biomasa */}
                <div style={{ fontFamily: 'monospace', color: '#00E4FF', background: 'rgba(0,0,0,0.6)', padding: '10px', borderRadius: '8px', border: '1px solid #00E4FF' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>BIOMASA: {biomass} / {targetBiomass}</div>
                  <div>TIEMPO: {timeSurvived}s</div>
                </div>

                {/* Vitals */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                   {/* Energia */}
                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(0,0,0,0.6)', padding: '5px 15px', borderRadius: '20px', border: `1px solid ${energy > 30 ? '#00FF66' : '#FF2A2A'}` }}>
                      <Zap size={16} color={energy > 30 ? '#00FF66' : '#FF2A2A'} />
                      <div style={{ width: '100px', height: '10px', background: '#222', borderRadius: '5px', overflow: 'hidden' }}>
                         <div style={{ width: `${energy}%`, height: '100%', background: energy > 30 ? '#00FF66' : '#FF2A2A', transition: 'width 0.2s' }}></div>
                      </div>
                   </div>
                   {/* Hidratacion */}
                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(0,0,0,0.6)', padding: '5px 15px', borderRadius: '20px', border: `1px solid ${hydration > 30 ? '#00E4FF' : '#FF2A2A'}` }}>
                      <Droplets size={16} color={hydration > 30 ? '#00E4FF' : '#FF2A2A'} />
                      <div style={{ width: '100px', height: '10px', background: '#222', borderRadius: '5px', overflow: 'hidden' }}>
                         <div style={{ width: `${hydration}%`, height: '100%', background: hydration > 30 ? '#00E4FF' : '#FF2A2A', transition: 'width 0.2s' }}></div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Warning Alert */}
              <AnimatePresence>
                {warning && (
                  <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translateX(-50%)', background: 'rgba(255, 42, 42, 0.8)', padding: '10px 20px', borderRadius: '8px', color: 'white', fontWeight: 'bold', zIndex: 10 }}>
                    {warning}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Criptobiosis Action Button */}
              <div style={{ position: 'absolute', bottom: 20, right: 20, zIndex: 10 }}>
                <button 
                  onMouseDown={() => setCryptobiosis(true)}
                  onMouseUp={() => setCryptobiosis(false)}
                  onMouseLeave={() => setCryptobiosis(false)}
                  onTouchStart={() => setCryptobiosis(true)}
                  onTouchEnd={() => setCryptobiosis(false)}
                  style={{
                    background: cryptobiosis ? '#8B5A2B' : 'rgba(0,0,0,0.8)',
                    color: 'white',
                    border: cryptobiosis ? '2px solid #FFA500' : '2px solid #555',
                    padding: '20px',
                    borderRadius: '50%',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: cryptobiosis ? '0 0 30px #FFA500' : '0 4px 10px rgba(0,0,0,0.5)',
                    transition: 'all 0.1s',
                    width: '100px',
                    height: '100px'
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                     <Shield size={32} style={{ margin: '0 auto 5px' }} color={cryptobiosis ? 'white' : '#aaa'} />
                     <span style={{ fontSize: '0.7rem' }}>CRIPTO<br/>BIOSIS</span>
                  </div>
                </button>
              </div>
            </>
          )}

          {/* Won */}
          {gameState === 'won' && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,255,136,0.3)', backdropFilter: 'blur(5px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', zIndex: 20 }}>
              <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '1rem', textShadow: '0 0 20px #00FF88' }}>¡Evolución Exitosa!</h2>
              <p style={{ color: 'white', marginBottom: '2rem' }}>El espécimen acumuló {biomass} biomasa y prosperó en su microhábitat.</p>
              <button className="btn-primary" onClick={() => window.location.reload()} style={{ background: '#00FF88', color: 'black' }}>Sincronizar Progreso y Continuar</button>
            </div>
          )}

          {/* Lost */}
          {gameState === 'lost' && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,42,42,0.3)', backdropFilter: 'blur(5px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', zIndex: 20 }}>
              <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '1rem', textShadow: '0 0 20px #FF2A2A' }}>Fallo Biológico</h2>
              <p style={{ color: 'white', marginBottom: '2rem' }}>El espécimen sucumbió ante los extremos ambientales o depredadores.</p>
              <button className="btn-primary" onClick={() => window.location.reload()} style={{ background: '#FF2A2A', color: 'white' }}>Reiniciar Simulación</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
