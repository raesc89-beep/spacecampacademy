'use client';
import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import { AntigravityEngine } from '@/lib/antigravity/engine';
import { Shield, ThermometerSnowflake, Zap } from 'lucide-react';

export default function TardigradeSurvivalGame() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const [gameState, setGameState] = useState('active'); // active, cryptobiosis
  const [environment, setEnvironment] = useState('normal'); // normal, radiation, freezing, vacuum

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const engine = new AntigravityEngine(canvasRef.current);
    engineRef.current = engine;

    // Define tardigrade entity
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
        if (this.x < 50 || this.x > engine.width - 50) this.vx *= -1;
        if (this.y < 50 || this.y > engine.height - 50) this.vy *= -1;
        
        // Random swim if active
        if (!this.isCryptobiotic) {
          if (Math.random() < 0.05) this.vx += (Math.random() - 0.5) * 2;
          if (Math.random() < 0.05) this.vy += (Math.random() - 0.5) * 2;
        }

        // Return nodes to original shape slowly
        if (this.nodes) {
          this.nodes.forEach(n => {
            n.x += (n.ox - n.x) * 0.1;
            n.y += (n.oy - n.y) * 0.1;
          });
        }
      }
    };

    engine.registerSoftBody(tardigrade);
    
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

  useEffect(() => {
    if (!engineRef.current) return;
    const engine = engineRef.current;
    const tardy = engine.entities.find(e => e.id === 'tardy');
    if (!tardy) return;

    if (gameState === 'cryptobiosis') {
      tardy.isCryptobiotic = true;
      tardy.color = '#888888'; // Tun state (grayish and shriveled)
      tardy.wobble = 0;
      tardy.radius = 20;
      tardy.nodes.forEach(n => { n.ox *= 0.5; n.oy *= 0.5; }); // Shrink
      engine.setEnvironment({ fluidDensity: 0.99, gravity: 0 }); // Freeze in place
    } else {
      tardy.isCryptobiotic = false;
      tardy.color = '#88ccff'; // Active state
      tardy.wobble = 5;
      tardy.radius = 40;
      tardy.nodes.forEach(n => { n.ox *= 2; n.oy *= 2; }); // Expand back
      engine.setEnvironment({ fluidDensity: 0.05, gravity: 0.1 }); // Normal fluid
    }
  }, [gameState]);

  const applyEnvironment = (type) => {
    if (!engineRef.current) return;
    const engine = engineRef.current;
    setEnvironment(type);

    if (type === 'radiation') {
      engine.effects.chromaticAberration = 15;
      engine.effects.bloom = 0.5;
    } else if (type === 'freezing') {
      engine.effects.chromaticAberration = 0;
      engine.effects.bloom = 0;
    } else if (type === 'vacuum') {
      engine.effects.chromaticAberration = 0;
      engine.effects.bloom = 0;
    } else {
      engine.effects.chromaticAberration = 0;
      engine.effects.bloom = 0;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#020308', color: 'white' }}>
      <Navbar />
      
      <main style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ color: '#00E4FF', textShadow: '0 0 20px rgba(0,228,255,0.5)' }}>Supervivencia Criptobiótica</h1>
        <p style={{ color: '#aaa', maxWidth: '600px', textAlign: 'center', marginBottom: '2rem' }}>
          Simulador de Tardígrados. Utiliza el motor Antigravity para renderizar cuerpos blandos. 
          Desencadena condiciones extremas y activa la criptobiosis para sobrevivir.
        </p>

        <div style={{ position: 'relative', width: '800px', height: '500px', border: '2px solid #00E4FF', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 0 30px rgba(0,228,255,0.2)' }}>
          <canvas 
            ref={canvasRef} 
            width={800} 
            height={500} 
            style={{ 
              width: '100%', 
              height: '100%',
              filter: environment === 'freezing' ? 'sepia(1) hue-rotate(180deg) saturate(2)' : 'none' 
            }} 
          />
          
          {/* Overlay UI */}
          <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => setGameState(gameState === 'active' ? 'cryptobiosis' : 'active')}
              style={{
                background: gameState === 'cryptobiosis' ? '#00FF66' : 'rgba(0,0,0,0.5)',
                color: gameState === 'cryptobiosis' ? 'black' : 'white',
                border: '1px solid #00FF66',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Shield size={16} />
              {gameState === 'cryptobiosis' ? 'ESTADO TON ACTIVO' : 'ACTIVAR CRIPTOBIOSIS'}
            </button>
          </div>
        </div>

        {/* Environmental Controls */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button className="btn-secondary" onClick={() => applyEnvironment('normal')} style={{ border: environment === 'normal' ? '2px solid #00E4FF' : '' }}>
            Entorno Normal
          </button>
          <button className="btn-secondary" onClick={() => applyEnvironment('radiation')} style={{ borderColor: '#FF2A2A', color: '#FF2A2A', border: environment === 'radiation' ? '2px solid #FF2A2A' : '' }}>
            <Zap size={16} style={{ display: 'inline', marginRight: 5 }} />
            Radiación Letal
          </button>
          <button className="btn-secondary" onClick={() => applyEnvironment('freezing')} style={{ borderColor: '#00E4FF', color: '#00E4FF', border: environment === 'freezing' ? '2px solid #00E4FF' : '' }}>
            <ThermometerSnowflake size={16} style={{ display: 'inline', marginRight: 5 }} />
            Cero Absoluto
          </button>
        </div>
      </main>
    </div>
  );
}
