/**
 * Google Antigravity v1.22.2 (WebAssembly/WebGL Wrapper)
 * 
 * This is a lightweight physics and rendering engine wrapper 
 * designed for Space Camp Academy mini-games.
 */

export class AntigravityEngine {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d'); // Using 2D context for simplified WebGL-like softbody rendering
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    
    this.entities = [];
    this.physics = {
      gravity: 0.1,
      friction: 0.98,
      fluidDensity: 0.05
    };
    
    this.isRunning = false;
    this.lastTime = performance.now();
    this.animationFrameId = null;
    
    // Shader effects simulation
    this.effects = {
      chromaticAberration: 0,
      bloom: 0,
      timeDilation: 1.0
    };
  }

  // Soft-Body Physics Entity Registration
  registerSoftBody(entity) {
    this.entities.push({
      type: 'softbody',
      ...entity,
      vx: 0,
      vy: 0,
      nodes: entity.generateNodes ? entity.generateNodes() : []
    });
  }

  // Rigidbody Physics Entity Registration
  registerRigidBody(entity) {
    this.entities.push({
      type: 'rigidbody',
      ...entity,
      vx: entity.vx || 0,
      vy: entity.vy || 0
    });
  }

  // Add environment modifiers
  setEnvironment(params) {
    this.physics = { ...this.physics, ...params };
  }

  // Update physics and logic at 60 FPS
  update(dt) {
    const timeScale = dt * this.effects.timeDilation;
    
    this.entities.forEach(ent => {
      // Apply basic physics
      if (ent.y !== undefined) {
        ent.vy += this.physics.gravity * timeScale;
        
        // Fluid drag (Cryptobiosis mechanic)
        ent.vx *= (1 - this.physics.fluidDensity * timeScale);
        ent.vy *= (1 - this.physics.fluidDensity * timeScale);
        
        ent.x += ent.vx * timeScale;
        ent.y += ent.vy * timeScale;
      }
      
      // Update soft body nodes
      if (ent.type === 'softbody' && ent.nodes) {
        ent.nodes.forEach(node => {
          node.x += (Math.random() - 0.5) * ent.wobble;
          node.y += (Math.random() - 0.5) * ent.wobble;
        });
      }

      // Execute custom logic
      if (ent.update) ent.update(timeScale);
    });
  }

  // Render loop using canvas API to simulate WebGL shaders
  render() {
    // Clear screen
    this.ctx.fillStyle = '#020308';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Render entities
    this.entities.forEach(ent => {
      this.ctx.save();
      
      // Apply Relativistic effects (Doppler / Chromatic Aberration)
      if (this.effects.chromaticAberration > 0) {
        this.ctx.shadowColor = 'rgba(255, 0, 0, 0.8)';
        this.ctx.shadowBlur = this.effects.chromaticAberration;
        this.ctx.shadowOffsetX = this.effects.chromaticAberration / 2;
      }

      if (ent.render) {
        ent.render(this.ctx);
      } else if (ent.type === 'rigidbody') {
        this.ctx.fillStyle = ent.color || '#fff';
        this.ctx.beginPath();
        this.ctx.arc(ent.x, ent.y, ent.radius || 10, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (ent.type === 'softbody') {
        this.ctx.fillStyle = ent.color || '#88ccff';
        this.ctx.beginPath();
        if (ent.nodes && ent.nodes.length > 0) {
          this.ctx.moveTo(ent.x + ent.nodes[0].x, ent.y + ent.nodes[0].y);
          ent.nodes.forEach(n => this.ctx.lineTo(ent.x + n.x, ent.y + n.y));
        } else {
          this.ctx.arc(ent.x, ent.y, ent.radius || 15, 0, Math.PI * 2);
        }
        this.ctx.fill();
      }
      
      this.ctx.restore();
    });
    
    // Global Bloom / Post Processing
    if (this.effects.bloom > 0) {
      this.ctx.fillStyle = `rgba(0, 228, 255, ${this.effects.bloom * 0.1})`;
      this.ctx.fillRect(0, 0, this.width, this.height);
    }
  }

  loop(timestamp) {
    if (!this.isRunning) return;
    
    const dt = Math.min((timestamp - this.lastTime) / 16.666, 3); // Normalize to 60fps, cap at 3x to prevent huge spikes
    this.lastTime = timestamp;
    
    this.update(dt);
    this.render();
    
    this.animationFrameId = requestAnimationFrame((ts) => this.loop(ts));
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.animationFrameId = requestAnimationFrame((ts) => this.loop(ts));
  }

  stop() {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
