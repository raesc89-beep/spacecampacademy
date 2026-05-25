'use client';
import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import { AntigravityEngine } from '@/lib/antigravity/engine';
import { Rocket, FastForward } from 'lucide-react';

export default function RelativisticRacingGame() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const [velocityC, setVelocityC] = useState(0); // 0 to 0.99c

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const engine = new AntigravityEngine(canvasRef.current);
    engineRef.current = engine;
    
    engine.setEnvironment({ gravity: 0, fluidDensity: 0 });

    // The player's ship
    const ship = {
      id: 'ship',
      type: 'rigidbody',
      x: engine.width / 2,
      y: engine.height - 50,
      radius: 20,
      color: '#FFFFFF',
      render: function(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - 20);
        ctx.lineTo(this.x - 15, this.y + 20);
        ctx.lineTo(this.x + 15, this.y + 20);
        ctx.closePath();
        ctx.fill();
        
        // Engine thrust
        ctx.fillStyle = '#00E4FF';
        ctx.beginPath();
        ctx.moveTo(this.x - 10, this.y + 20);
        ctx.lineTo(this.x, this.y + 20 + Math.random() * 30);
        ctx.lineTo(this.x + 10, this.y + 20);
        ctx.closePath();
        ctx.fill();
      }
    };
    engine.registerRigidBody(ship);

    // Starfield for relativistic effect
    for(let i=0; i<100; i++) {
      engine.registerRigidBody({
        type: 'rigidbody',
        x: Math.random() * engine.width,
        y: Math.random() * engine.height,
        z: Math.random() * 100 + 1, // depth
        radius: 2,
        color: '#FFFFFF',
        update: function(dt) {
          // Relativistic speed makes stars move down the screen faster
          const speed = engine.effects.timeDilation * (100 / this.z);
          this.y += speed;
          if (this.y > engine.height) {
            this.y = 0;
            this.x = Math.random() * engine.width;
          }
          
          // Doppler effect coloring
          if (engine.effects.timeDilation > 5) {
            this.color = '#00E4FF'; // Blueshift approaching
          } else {
            this.color = '#FFFFFF';
          }
        }
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
    
    // Lorentz factor (simplified for effect)
    const lorentz = 1 / Math.sqrt(1 - Math.pow(velocityC, 2));
    
    // Apply relativistic effects to the engine wrapper
    engine.effects.timeDilation = lorentz * 2; // Speeds up the stars
    engine.effects.chromaticAberration = velocityC * 20; // Red/blue shift distortion
    engine.effects.bloom = velocityC * 0.8;
    
  }, [velocityC]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#020308', color: 'white' }}>
      <Navbar />
      
      <main style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ color: '#00E4FF', textShadow: '0 0 20px rgba(0,228,255,0.5)' }}>Carreras Relativistas</h1>
        <p style={{ color: '#aaa', maxWidth: '600px', textAlign: 'center', marginBottom: '2rem' }}>
          Motor Antigravity v1.22.2. Acelera tu nave cerca de la velocidad de la luz (c). 
          Observa la dilatación del tiempo, el efecto Doppler (blueshift) y la aberración cromática.
        </p>

        <div style={{ position: 'relative', width: '800px', height: '500px', border: '2px solid #00E4FF', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 0 30px rgba(0,228,255,0.2)' }}>
          <canvas 
            ref={canvasRef} 
            width={800} 
            height={500} 
            style={{ 
              width: '100%', 
              height: '100%',
              // Simulating FOV contraction (tunnel vision) at high speeds
              transform: `scale(${1 + velocityC * 0.5})`,
              transition: 'transform 0.1s linear'
            }} 
          />
          
          {/* HUD Info */}
          <div style={{ position: 'absolute', top: 20, left: 20, fontFamily: 'monospace', color: '#00E4FF', textShadow: '0 0 5px #00E4FF' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              VELOCIDAD: {(velocityC * 100).toFixed(1)}% c
            </div>
            <div>
              LORENTZ (γ): {(1 / Math.sqrt(1 - Math.pow(velocityC, 2))).toFixed(2)}
            </div>
          </div>
        </div>

        {/* Speed Control */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '2rem', width: '600px' }}>
          <Rocket size={24} color="#00E4FF" />
          <input 
            type="range" 
            min="0" 
            max="0.99" 
            step="0.01" 
            value={velocityC} 
            onChange={(e) => setVelocityC(parseFloat(e.target.value))}
            style={{ flex: 1, accentColor: '#00E4FF' }}
          />
          <FastForward size={24} color={velocityC > 0.8 ? '#FF2A2A' : '#00E4FF'} />
        </div>
      </main>
    </div>
  );
}
