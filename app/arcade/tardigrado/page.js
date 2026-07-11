'use client';
import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import { AntigravityEngine } from '@/lib/antigravity/engine';
import { Shield, Droplets, Zap, Play, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function TardigradeSurvivalGame() {
  const router = useRouter();
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
  }, [gameState, biomass, timeSurvived]);

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
        // Wrap-around boundaries (Efecto Pac-Man) instead of bouncing
        if (this.x < -this.radius) this.x = engine.width + this.radius;
        if (this.x > engine.width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = engine.height + this.radius;
        if (this.y > engine.height + this.radius) this.y = -this.radius;
        
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
              // Smooth bezier curve for amoeba look
              const curr = this.nodes[i];
              const next = this.nodes[(i + 1) % this.nodes.length];
              const cx = this.x + (curr.x + next.x) / 2;
              const cy = this.y + (curr.y + next.y) / 2;
              ctx.quadraticCurveTo(this.x + curr.x, this.y + curr.y, cx, cy);
           }
        }
        ctx.closePath();
        
        // Organic radial gradient
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        grad.addColorStop(0, this.color || '#00FF66');
        grad.addColorStop(1, 'rgba(0, 100, 50, 0.8)');
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#00FF66';
        ctx.stroke();

        // Draw nucleus/vacuole if active
        if (!this.isCryptobiotic) {
          ctx.fillStyle = 'rgba(0, 200, 255, 0.5)';
          ctx.beginPath(); ctx.arc(this.x - 5, this.y - 5, 8, 0, Math.PI*2); ctx.fill();
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.beginPath(); ctx.arc(this.x - 7, this.y - 7, 2, 0, Math.PI*2); ctx.fill();
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
             // Wrap-around boundaries (Efecto Pac-Man)
             if (this.x < -10) this.x = engine.width + 10;
             if (this.x > engine.width + 10) this.x = -10;
             if (this.y < -10) this.y = engine.height + 10;
             if (this.y > engine.height + 10) this.y = -10;
          }
       });
    }, 1000);

    // Spawner for Predators (Nematodes) — spawn from all 4 borders
    setInterval(() => {
       if (gameState !== 'playing' || engine.entities.filter(e => e.type === 'predator').length > 6) return;
       
       // Random spawn from any of the 4 borders
       const border = Math.floor(Math.random() * 4);
       let startX, startY;
       if (border === 0) { startX = Math.random() * engine.width; startY = -20; } // top
       else if (border === 1) { startX = engine.width + 20; startY = Math.random() * engine.height; } // right
       else if (border === 2) { startX = Math.random() * engine.width; startY = engine.height + 20; } // bottom
       else { startX = -20; startY = Math.random() * engine.height; } // left

       // Individual speed variation (2.5 to 4.0) to prevent synchronization
       const individualSpeed = 2.5 + Math.random() * 1.5;
       // Unique wander phase so each nematode wanders independently
       const wanderPhase = Math.random() * Math.PI * 2;

       engine.registerRigidBody({
          type: 'predator',
          x: startX,
          y: startY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          radius: 15,
          color: '#FF2A2A',
          maxSpeed: individualSpeed,
          wanderPhase: wanderPhase,
          update: function(dt) {
             const player = engine.entities.find(e => e.id === 'tardy');

             if (player && player.isCryptobiotic) {
                // === WANDER behavior during cryptobiosis (no longer chase) ===
                this.wanderPhase = (this.wanderPhase || 0) + dt * 0.04;
                this.vx += Math.cos(this.wanderPhase) * 0.3;
                this.vy += Math.sin(this.wanderPhase) * 0.3;
             } else if (player) {
                // === CHASE player when active ===
                const dx = player.x - this.x;
                const dy = player.y - this.y;
                const mag = Math.sqrt(dx*dx + dy*dy);
                if (mag > 0) {
                   this.vx += (dx / mag) * 0.4;
                   this.vy += (dy / mag) * 0.4;
                }
                // Attack on contact
                if (mag < player.radius + this.radius) {
                   setEnergy(e => Math.max(0, e - 2));
                }
             }

             // === ANTI-FLOCKING: separation force from other predators ===
             const siblings = engine.entities.filter(e => e.type === 'predator' && e !== this);
             siblings.forEach(sibling => {
                const sdx = this.x - sibling.x;
                const sdy = this.y - sibling.y;
                const sdist = Math.sqrt(sdx * sdx + sdy * sdy);
                const separationRadius = 60; // minimum distance between predators
                if (sdist < separationRadius && sdist > 0) {
                   const repulse = (separationRadius - sdist) / separationRadius;
                   this.vx += (sdx / sdist) * repulse * 1.5;
                   this.vy += (sdy / sdist) * repulse * 1.5;
                }
             });

             // Speed limit with individual variation
             const speed = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
             const maxSpd = this.maxSpeed || 3;
             if (speed > maxSpd) {
                this.vx = (this.vx / speed) * maxSpd;
                this.vy = (this.vy / speed) * maxSpd;
             }

             // Wrap-around boundaries (Efecto Pac-Man)
             if (this.x < -this.radius * 2) this.x = engine.width + this.radius * 2;
             if (this.x > engine.width + this.radius * 2) this.x = -this.radius * 2;
             if (this.y < -this.radius * 2) this.y = engine.height + this.radius * 2;
             if (this.y > engine.height + this.radius * 2) this.y = -this.radius * 2;

             // Despawn after lifetime — always running to guarantee rotation
             this.lifetime = (this.lifetime || 0) + dt * 0.016;
             if (this.lifetime > 18) {
                this.dead = true;
             }
          },
          render: function(ctx) {
            const angle = Math.atan2(this.vy, this.vx);
            // Nematode body — elongated worm
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(angle);
            
            // Main body gradient
            const bodyGrad = ctx.createLinearGradient(-this.radius * 2, 0, this.radius * 2, 0);
            bodyGrad.addColorStop(0, '#AA0000');
            bodyGrad.addColorStop(0.5, '#FF2A2A');
            bodyGrad.addColorStop(1, '#660000');
            ctx.fillStyle = bodyGrad;
            ctx.beginPath();
            ctx.ellipse(0, 0, this.radius * 2.2, this.radius * 0.8, 0, 0, Math.PI*2);
            ctx.fill();
            
            // Segmentation lines (worm segments)
            ctx.strokeStyle = 'rgba(255,80,80,0.5)';
            ctx.lineWidth = 1;
            for (let seg = -1; seg <= 1; seg++) {
               ctx.beginPath();
               ctx.moveTo(seg * this.radius * 0.7, -this.radius * 0.7);
               ctx.lineTo(seg * this.radius * 0.7, this.radius * 0.7);
               ctx.stroke();
            }
            
            // Head with teeth
            ctx.fillStyle = '#FF6666';
            ctx.beginPath();
            ctx.arc(this.radius * 2, 0, this.radius * 0.6, 0, Math.PI * 2);
            ctx.fill();

            // Teeth
            ctx.fillStyle = 'white';
            for (let t = -1; t <= 1; t++) {
               ctx.beginPath();
               ctx.moveTo(this.radius * 2.5, t * 4);
               ctx.lineTo(this.radius * 2.5 + 6, t * 4 - 2);
               ctx.lineTo(this.radius * 2.5 + 6, t * 4 + 2);
               ctx.closePath();
               ctx.fill();
            }
            ctx.restore();
          }
       });
    }, 1500);

    // === HEALING MICROORGANISM SPAWNER — 3 distinct organism types ===
    const HEAL_TYPES = [
      { name: 'Paramecio',  color: '#00FF88', glow: '#00AA55', healAmt: 18, speed: 2.0, shape: 'ellipse' },
      { name: 'Euglena',    color: '#AAFF00', glow: '#66AA00', healAmt: 25, speed: 1.5, shape: 'flagella' },
      { name: 'Clorela',    color: '#44FFDD', glow: '#00BBAA', healAmt: 12, speed: 2.8, shape: 'sphere'   },
    ];

    setInterval(() => {
       if (gameState !== 'playing' || engine.entities.filter(e => e.type === 'healing').length > 4) return;
       
       const hType = HEAL_TYPES[Math.floor(Math.random() * HEAL_TYPES.length)];
       
       engine.registerRigidBody({
          type: 'healing',
          x: Math.random() * engine.width,
          y: Math.random() * engine.height,
          vx: (Math.random() - 0.5) * hType.speed,
          vy: (Math.random() - 0.5) * hType.speed,
          radius: hType.shape === 'sphere' ? 9 : 12,
          color: hType.color,
          healAmt: hType.healAmt,
          shape: hType.shape,
          glowColor: hType.glow,
          lifePhase: Math.random() * Math.PI * 2, // unique phase per organism
          update: function(dt) {
             const player = engine.entities.find(e => e.id === 'tardy');
             if (player) {
                const dist = Math.sqrt(Math.pow(this.x - player.x, 2) + Math.pow(this.y - player.y, 2));
                if (dist < player.radius + this.radius + 5) {
                   this.dead = true;
                   setEnergy(e => Math.min(e + this.healAmt, 100));
                }
             }

             // Shape-specific movement
             this.lifePhase = (this.lifePhase || 0) + dt * 0.025;
             if (this.shape === 'ellipse') {
                // Paramecio: smooth zig-zag
                this.vy += Math.sin(this.lifePhase) * 0.3;
             } else if (this.shape === 'flagella') {
                // Euglena: corkscrew spiral
                this.vx += Math.cos(this.lifePhase * 1.5) * 0.25;
                this.vy += Math.sin(this.lifePhase * 1.5) * 0.25;
             } else {
                // Clorela: random tumble
                if (Math.random() < 0.01) {
                   this.vx = (Math.random() - 0.5) * this.radius * 0.4;
                   this.vy = (Math.random() - 0.5) * this.radius * 0.4;
                }
             }

             // Speed cap
             const sp = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
             const maxSp = hType ? hType.speed : 2.5;
             if (sp > maxSp) { this.vx = (this.vx/sp)*maxSp; this.vy = (this.vy/sp)*maxSp; }

             // Pulsating radius
             this.radius = (this.shape === 'sphere' ? 9 : 12) + Math.sin(this.lifePhase * 3) * 2;

             // Wrap-around
             if (this.x < -20) this.x = engine.width + 20;
             if (this.x > engine.width + 20) this.x = -20;
             if (this.y < -20) this.y = engine.height + 20;
             if (this.y > engine.height + 20) this.y = -20;

             // Lifetime
             this.lifetime = (this.lifetime || 0) + dt * 0.016;
             if (this.lifetime > 22) this.dead = true;
          },
          render: function(ctx) {
             ctx.save();
             ctx.translate(this.x, this.y);
             const angle = Math.atan2(this.vy, this.vx);
             const lp = this.lifePhase || 0;

             // Outer glow
             const glowGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius * 2.2);
             glowGrad.addColorStop(0, this.glowColor + 'BB');
             glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
             ctx.fillStyle = glowGrad;
             ctx.beginPath();
             ctx.arc(0, 0, this.radius * 2.2, 0, Math.PI * 2);
             ctx.fill();

             if (this.shape === 'ellipse') {
                // === PARAMECIO: elongated oval with cilia ===
                ctx.rotate(angle);
                const cellGrad = ctx.createLinearGradient(-this.radius*1.6, 0, this.radius*1.6, 0);
                cellGrad.addColorStop(0, 'rgba(0,200,100,0.6)');
                cellGrad.addColorStop(0.5, 'rgba(0,255,136,0.9)');
                cellGrad.addColorStop(1, 'rgba(0,150,70,0.5)');
                ctx.fillStyle = cellGrad;
                ctx.beginPath();
                ctx.ellipse(0, 0, this.radius * 1.6, this.radius * 0.7, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = 'rgba(0,255,136,0.8)';
                ctx.lineWidth = 1;
                ctx.stroke();
                // Cilia
                ctx.strokeStyle = 'rgba(0,255,136,0.5)';
                ctx.lineWidth = 0.7;
                for (let c = -4; c <= 4; c++) {
                   const cx = c * this.radius * 0.35;
                   ctx.beginPath();
                   ctx.moveTo(cx, this.radius * 0.7);
                   ctx.lineTo(cx + Math.sin(lp * 2 + c) * 4, this.radius * 0.7 + 6);
                   ctx.stroke();
                   ctx.beginPath();
                   ctx.moveTo(cx, -this.radius * 0.7);
                   ctx.lineTo(cx + Math.sin(lp * 2 + c + 1) * 4, -this.radius * 0.7 - 6);
                   ctx.stroke();
                }
                // Nucleus
                ctx.fillStyle = 'rgba(100,255,200,0.7)';
                ctx.beginPath();
                ctx.arc(0, 0, this.radius * 0.35, 0, Math.PI * 2);
                ctx.fill();

             } else if (this.shape === 'flagella') {
                // === EUGLENA: teardrop with long flagella ===
                const tearGrad = ctx.createRadialGradient(-2, -2, 0, 0, 0, this.radius);
                tearGrad.addColorStop(0, 'rgba(200,255,0,0.9)');
                tearGrad.addColorStop(0.6, 'rgba(100,200,0,0.7)');
                tearGrad.addColorStop(1, 'rgba(50,100,0,0.3)');
                ctx.rotate(angle);
                ctx.fillStyle = tearGrad;
                ctx.beginPath();
                ctx.ellipse(0, 0, this.radius * 0.75, this.radius * 1.3, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = 'rgba(180,255,0,0.8)';
                ctx.lineWidth = 1;
                ctx.stroke();
                // Flagellum
                ctx.strokeStyle = 'rgba(150,255,0,0.7)';
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.moveTo(0, this.radius * 1.3);
                for (let fp = 1; fp <= 8; fp++) {
                   const fy = this.radius * 1.3 + fp * 5;
                   const fx = Math.sin(lp * 3 + fp * 0.6) * 8;
                   ctx.lineTo(fx, fy);
                }
                ctx.stroke();
                // Chloroplast
                ctx.fillStyle = 'rgba(50,200,0,0.8)';
                ctx.beginPath();
                ctx.ellipse(0, -2, this.radius * 0.5, this.radius * 0.25, 0, 0, Math.PI * 2);
                ctx.fill();

             } else {
                // === CLORELA: glowing sphere with internal structure ===
                const sphGrad = ctx.createRadialGradient(-this.radius*0.3, -this.radius*0.3, 0, 0, 0, this.radius);
                sphGrad.addColorStop(0, 'rgba(200,255,240,0.95)');
                sphGrad.addColorStop(0.4, 'rgba(60,220,200,0.8)');
                sphGrad.addColorStop(1, 'rgba(0,100,120,0.5)');
                ctx.fillStyle = sphGrad;
                ctx.beginPath();
                ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = 'rgba(100,255,240,0.9)';
                ctx.lineWidth = 1.5;
                ctx.stroke();
                // Internal cross-wall
                ctx.strokeStyle = 'rgba(0,200,180,0.5)';
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.moveTo(-this.radius * 0.8, 0); ctx.lineTo(this.radius * 0.8, 0);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(0, -this.radius * 0.8); ctx.lineTo(0, this.radius * 0.8);
                ctx.stroke();
                // Pyrenoid (bright center dot)
                ctx.fillStyle = 'rgba(255,255,255,0.9)';
                ctx.beginPath();
                ctx.arc(0, 0, this.radius * 0.2, 0, Math.PI * 2);
                ctx.fill();
             }

             // +HP label floating upward
             ctx.restore();
             ctx.save();
             ctx.translate(this.x, this.y - this.radius - 8);
             ctx.globalAlpha = 0.7 + Math.sin(lp * 2) * 0.3;
             ctx.fillStyle = this.color;
             ctx.font = 'bold 10px monospace';
             ctx.textAlign = 'center';
             ctx.fillText(`+${this.healAmt}`, 0, 0);
             ctx.restore();
          }

       });
    }, 1800);

    // === OVERRIDE render() (not update) so background draws BEFORE entities ===
    // The engine.loop() calls update() THEN render(). render() does ctx.fillRect('#020308')
    // which erases any background drawn in update(). So we override render() instead.
    let bgTime = 0;
    engine.render = (function(originalRender) {
      return function() {
         const ctx = this.ctx;
         const W = this.width, H = this.height;
         bgTime += 0.016; // ~60fps frame increment

         // === DEEP OCEAN GRADIENT BASE ===
         const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
         bgGrad.addColorStop(0, '#001A10');
         bgGrad.addColorStop(0.4, '#003020');
         bgGrad.addColorStop(1,  '#001A2A');
         ctx.fillStyle = bgGrad;
         ctx.fillRect(0, 0, W, H);

         // === BIOLUMINESCENT LIGHT RAYS ===
         ctx.save();
         ctx.globalCompositeOperation = 'screen';
         for (let r = 0; r < 6; r++) {
             const rx = W * (0.1 + r * 0.15) + Math.sin(bgTime * 0.3 + r) * 25;
             const rayGrad = ctx.createLinearGradient(rx, 0, rx + 30, H * 0.75);
             rayGrad.addColorStop(0, `rgba(0, 200, 100, ${0.06 + Math.sin(bgTime + r) * 0.03})`);
             rayGrad.addColorStop(1, 'rgba(0, 100, 50, 0)');
             ctx.fillStyle = rayGrad;
             ctx.beginPath();
             ctx.moveTo(rx - 8, 0);
             ctx.lineTo(rx + 35, H * 0.75);
             ctx.lineTo(rx + 15, H * 0.75);
             ctx.lineTo(rx - 25, 0);
             ctx.closePath();
             ctx.fill();
         }
         ctx.restore();

         // === FLOATING ALGAE STRANDS ===
         ctx.save();
         for (let a = 0; a < 8; a++) {
             const baseX = W * (a / 8) + 20;
             const waveAmp = 18 + a * 4;
             ctx.strokeStyle = `rgba(0, ${130 + a * 10}, ${50 + a * 8}, 0.6)`;
             ctx.lineWidth = 2.5;
             ctx.lineCap = 'round';
             ctx.beginPath();
             const segments = 12;
             for (let s = 0; s <= segments; s++) {
                 const sy = H - s * (H / segments);
                 const sx = baseX + Math.sin(bgTime * 0.5 + s * 0.7 + a) * waveAmp;
                 s === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
             }
             ctx.stroke();
         }
         ctx.restore();

         // === DIATOM MICROORGANISMS ===
         for (let d = 0; d < 15; d++) {
             const dx = ((d * 137.5 + bgTime * 8) % W);
             const dy = ((d * 79.3 + bgTime * 4 + 50) % H);
             const dr = 6 + (d % 4) * 4;
             const dAlpha = 0.25 + Math.sin(bgTime * 1.5 + d) * 0.1;
             const dColors = ['rgba(0,220,150', 'rgba(100,220,200', 'rgba(50,180,120'];
             const dc = dColors[d % 3];
             ctx.save();
             ctx.translate(dx, dy);
             ctx.rotate(bgTime * 0.2 + d);
             ctx.globalAlpha = dAlpha;
             ctx.strokeStyle = `${dc},0.9)`;
             ctx.lineWidth = 1.5;
             ctx.beginPath();
             for (let h = 0; h < 6; h++) {
                 const angle = (h / 6) * Math.PI * 2;
                 h === 0 ? ctx.moveTo(Math.cos(angle) * dr, Math.sin(angle) * dr)
                         : ctx.lineTo(Math.cos(angle) * dr, Math.sin(angle) * dr);
             }
             ctx.closePath();
             ctx.stroke();
             ctx.strokeStyle = `${dc},0.4)`;
             ctx.beginPath();
             ctx.arc(0, 0, dr * 0.5, 0, Math.PI * 2);
             ctx.stroke();
             ctx.restore();
         }

         // === FLOATING BUBBLES ===
         for (let b = 0; b < 20; b++) {
             const bPhase = (bgTime * (0.4 + b * 0.02) + b * 0.5) % 1;
             const bx = W * ((b * 53.7) % 1) + Math.sin(bgTime * 0.3 + b) * 30;
             const by = H - bPhase * H;
             const br = 2 + (b % 4) * 1.5;
             ctx.save();
             ctx.globalAlpha = 0.4 + Math.sin(bgTime + b) * 0.15;
             ctx.strokeStyle = 'rgba(100,255,180,0.9)';
             ctx.lineWidth = 1;
             ctx.beginPath();
             ctx.arc(bx, by, br, 0, Math.PI * 2);
             ctx.stroke();
             ctx.fillStyle = 'rgba(255,255,255,0.5)';
             ctx.beginPath();
             ctx.arc(bx - br * 0.3, by - br * 0.3, br * 0.3, 0, Math.PI * 2);
             ctx.fill();
             ctx.restore();
         }

         // === BACKGROUND MICRO-ORGANISM SILHOUETTES ===
         ctx.save();
         ctx.globalAlpha = 0.12;
         ctx.fillStyle = '#00FF88';
         for (let m = 0; m < 8; m++) {
             const mx = ((m * 110 + bgTime * 6) % W);
             const my = ((m * 70 + bgTime * 3) % H);
             ctx.beginPath();
             const blobR = 20 + m * 5;
             for (let p = 0; p < 8; p++) {
                 const angle = (p / 8) * Math.PI * 2;
                 const rad = blobR + Math.sin(bgTime * 2 + p * 1.3 + m) * 8;
                 const bpx = mx + Math.cos(angle) * rad;
                 const bpy = my + Math.sin(angle) * rad;
                 p === 0 ? ctx.moveTo(bpx, bpy) : ctx.lineTo(bpx, bpy);
             }
             ctx.closePath();
             ctx.fill();
         }
         ctx.restore();

         // Now call the original render (draws all entities on top of background)
         originalRender.call(this);
      };
    })(engine.render);

    // Also keep update override just for entity cleanup
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
           <h1 style={{ color: '#00E4FF', margin: '0 0 0.5rem 0', textShadow: '0 0 20px rgba(0,228,255,0.5)' }}>Ameba Espacial: Supervivencia Microbiana</h1>
        </header>

        <div style={{ position: 'relative', width: '800px', height: '500px', border: '2px solid #00FF66', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 0 30px rgba(0,255,102,0.2)', backgroundColor: '#041512' }}>
          
          {/* Botón Cerrar Máquina */}
          <button 
            onClick={() => router.push('/hub/arcade')}
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
              <button className="btn-primary" onClick={() => { setGameState('menu'); setHydration(100); setEnergy(100); setBiomass(0); setTimeSurvived(0); setCryptobiosis(false); setWarning(''); }} style={{ background: '#00FF88', color: 'black' }}>Sincronizar Progreso y Continuar</button>
            </div>
          )}

          {/* Lost */}
          {gameState === 'lost' && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,42,42,0.3)', backdropFilter: 'blur(5px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', zIndex: 20 }}>
              <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '1rem', textShadow: '0 0 20px #FF2A2A' }}>Fallo Biológico</h2>
              <p style={{ color: 'white', marginBottom: '2rem' }}>El espécimen sucumbió ante los extremos ambientales o depredadores.</p>
              <button className="btn-primary" onClick={() => { setGameState('menu'); setHydration(100); setEnergy(100); setBiomass(0); setTimeSurvived(0); setCryptobiosis(false); setWarning(''); }} style={{ background: '#FF2A2A', color: 'white' }}>Reiniciar Simulación</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
