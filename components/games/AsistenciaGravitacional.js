'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Clock, Star, AlertTriangle } from 'lucide-react';

// Orbital mechanics simulation
const PLANETS = [
  { id: 'sun', x: 400, y: 300, radius: 35, mass: 800, color: '#FFD700', name: 'Sol', glow: '#FF8C00' },
  { id: 'earth', x: 620, y: 300, radius: 16, mass: 80, color: '#4499FF', name: 'Tierra', glow: '#2266CC', orbitR: 220 },
  { id: 'mars', x: 400, y: 500, radius: 12, mass: 50, color: '#FF4422', name: 'Marte', glow: '#AA2200', orbitR: 200 },
  { id: 'jupiter', x: 120, y: 300, radius: 24, mass: 200, color: '#CC8844', name: 'Júpiter', glow: '#996622', orbitR: 280 },
];

const DATA_PACKETS = [
  { id: 0, x: 550, y: 150, collected: false, pts: 50 },
  { id: 1, x: 200, y: 200, collected: false, pts: 75 },
  { id: 2, x: 300, y: 480, collected: false, pts: 60 },
  { id: 3, x: 650, y: 450, collected: false, pts: 100 },
];

export default function AsistenciaGravitacional({ onComplete }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const probeRef = useRef(null);
  const stateRef = useRef({ gameState: 'aiming', fuel: 100, score: 0, packets: JSON.parse(JSON.stringify(DATA_PACKETS)), collisions: 0, trajectory: [], aimAngle: 0, power: 60 });
  const [displayState, setDisplayState] = useState({ gameState: 'aiming', fuel: 100, score: 0, packets: JSON.parse(JSON.stringify(DATA_PACKETS)), collisions: 0 });
  const [aimAngle, setAimAngle] = useState(45);
  const [power, setPower] = useState(60);
  const [message, setMessage] = useState('');

  const W = 800, H = 580;

  // Draw orbit lines & asteroids
  const drawBackground = (ctx, t) => {
    ctx.fillStyle = '#010208';
    ctx.fillRect(0, 0, W, H);

    // Stars
    for (let i = 0; i < 80; i++) {
      const sx = (i * 137.5 + 50) % W;
      const sy = (i * 89.3 + 30) % H;
      ctx.fillStyle = `rgba(255,255,255,${0.3 + Math.sin(t * 0.5 + i) * 0.2})`;
      ctx.beginPath(); ctx.arc(sx, sy, 1, 0, Math.PI * 2); ctx.fill();
    }

    // Planet orbit rings
    PLANETS.forEach(p => {
      if (!p.orbitR) return;
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(PLANETS[0].x, PLANETS[0].y, p.orbitR, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Asteroid belt (procedural)
    ctx.fillStyle = 'rgba(120,100,80,0.4)';
    for (let a = 0; a < 40; a++) {
      const angle = (a / 40) * Math.PI * 2 + t * 0.02;
      const r = 330 + Math.sin(a * 3.7) * 20;
      const ax = PLANETS[0].x + Math.cos(angle) * r;
      const ay = PLANETS[0].y + Math.sin(angle) * r;
      ctx.beginPath(); ctx.arc(ax, ay, 3 + (a % 3), 0, Math.PI * 2); ctx.fill();
    }
  };

  const drawPlanets = (ctx, t) => {
    PLANETS.forEach(planet => {
      // Glow
      const glow = ctx.createRadialGradient(planet.x, planet.y, planet.radius * 0.5, planet.x, planet.y, planet.radius * 2.5);
      glow.addColorStop(0, planet.glow + '55');
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(planet.x, planet.y, planet.radius * 2.5, 0, Math.PI * 2); ctx.fill();

      // Body
      const bodyGrad = ctx.createRadialGradient(planet.x - planet.radius * 0.3, planet.y - planet.radius * 0.3, planet.radius * 0.1, planet.x, planet.y, planet.radius);
      bodyGrad.addColorStop(0, '#ffffff55');
      bodyGrad.addColorStop(0.3, planet.color);
      bodyGrad.addColorStop(1, planet.glow);
      ctx.fillStyle = bodyGrad;
      ctx.beginPath(); ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2); ctx.fill();

      // Label
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.font = '11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(planet.name, planet.x, planet.y + planet.radius + 14);
    });
  };

  const drawDataPackets = (ctx, packets, t) => {
    packets.forEach(pkt => {
      if (pkt.collected) return;
      const pulse = Math.sin(t * 3 + pkt.id) * 0.3 + 0.7;
      ctx.save();
      ctx.globalAlpha = pulse;
      const pktGrad = ctx.createRadialGradient(pkt.x, pkt.y, 0, pkt.x, pkt.y, 16);
      pktGrad.addColorStop(0, '#00FF88');
      pktGrad.addColorStop(0.5, '#00AA55');
      pktGrad.addColorStop(1, 'rgba(0,255,136,0)');
      ctx.fillStyle = pktGrad;
      ctx.beginPath(); ctx.arc(pkt.x, pkt.y, 16, 0, Math.PI * 2); ctx.fill();

      ctx.strokeStyle = '#00FF88';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let a = 0; a < 6; a++) {
        const angle = (a / 6) * Math.PI * 2;
        ctx.moveTo(pkt.x, pkt.y);
        ctx.lineTo(pkt.x + Math.cos(angle) * 10, pkt.y + Math.sin(angle) * 10);
      }
      ctx.stroke();

      ctx.fillStyle = '#00FF88';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`+${pkt.pts}`, pkt.x, pkt.y + 4);
      ctx.restore();
    });
  };

  const drawProbe = (ctx, probe, t) => {
    if (!probe) return;
    ctx.save();
    ctx.translate(probe.x, probe.y);
    const angle = Math.atan2(probe.vy, probe.vx);
    ctx.rotate(angle);

    // Engine exhaust
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = `rgba(0,228,255,${0.3 + Math.random() * 0.3})`;
    ctx.beginPath();
    ctx.ellipse(-14, 0, 12 + Math.random() * 5, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    // Body
    ctx.fillStyle = '#C0C0C0';
    ctx.beginPath();
    ctx.ellipse(0, 0, 10, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Solar panels
    ctx.fillStyle = '#334488';
    ctx.fillRect(-5, -14, 10, 6);
    ctx.fillRect(-5, 8, 10, 6);
    ctx.strokeStyle = '#5566AA';
    ctx.lineWidth = 0.5;
    for (let s = 0; s < 4; s++) {
      ctx.beginPath();
      ctx.moveTo(-5 + s * 3, -14);
      ctx.lineTo(-5 + s * 3, -8);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-5 + s * 3, 8);
      ctx.lineTo(-5 + s * 3, 14);
      ctx.stroke();
    }

    ctx.restore();
  };

  const drawTrajectory = (ctx, trajectory) => {
    if (trajectory.length < 2) return;
    ctx.save();
    ctx.strokeStyle = 'rgba(0,228,255,0.35)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(trajectory[0].x, trajectory[0].y);
    trajectory.forEach(pt => ctx.lineTo(pt.x, pt.y));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  };

  const drawAimingUI = (ctx, t) => {
    const LAUNCH_X = 400, LAUNCH_Y = 540;
    const angleRad = (stateRef.current.aimAngle * Math.PI) / 180;
    const pw = stateRef.current.power / 100;

    // Launch platform
    ctx.fillStyle = '#334455';
    ctx.beginPath(); ctx.roundRect(LAUNCH_X - 25, LAUNCH_Y - 10, 50, 20, 6); ctx.fill();
    ctx.strokeStyle = '#00E4FF55'; ctx.lineWidth = 1; ctx.stroke();

    // Aim arrow
    const arrowLen = 40 + pw * 40;
    ctx.strokeStyle = `rgba(255,200,0,${0.7 + Math.sin(t * 4) * 0.3})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(LAUNCH_X, LAUNCH_Y);
    ctx.lineTo(LAUNCH_X + Math.cos(angleRad) * arrowLen, LAUNCH_Y + Math.sin(angleRad) * arrowLen);
    ctx.stroke();

    // Arrowhead
    const ax = LAUNCH_X + Math.cos(angleRad) * arrowLen;
    const ay = LAUNCH_Y + Math.sin(angleRad) * arrowLen;
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(ax - Math.cos(angleRad - 0.4) * 10, ay - Math.sin(angleRad - 0.4) * 10);
    ctx.lineTo(ax - Math.cos(angleRad + 0.4) * 10, ay - Math.sin(angleRad + 0.4) * 10);
    ctx.closePath(); ctx.fill();

    ctx.fillStyle = '#00E4FF';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('PLATAFORMA', LAUNCH_X, LAUNCH_Y + 30);
  };

  // Main game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let t = 0;

    const loop = () => {
      const st = stateRef.current;
      drawBackground(ctx, t);
      drawDataPackets(ctx, st.packets, t);
      drawPlanets(ctx, t);

      if (st.gameState === 'aiming') {
        drawAimingUI(ctx, t);
      }

      if (st.probe) {
        // Physics: gravity from each planet
        PLANETS.forEach(planet => {
          const dx = planet.x - st.probe.x;
          const dy = planet.y - st.probe.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const force = (planet.mass * 0.08) / (dist * dist + 100);
          st.probe.vx += (dx / dist) * force;
          st.probe.vy += (dy / dist) * force;

          // Collision
          if (dist < planet.radius + 6 && !st.hitCooldown) {
            st.probe = null;
            st.gameState = 'aiming';
            st.collisions++;
            st.fuel = Math.max(0, st.fuel - 20);
            setDisplayState(d => ({ ...d, collisions: st.collisions, fuel: st.fuel }));
            setMessage(`💥 Colisión con ${planet.name}! -20% combustible`);
            setTimeout(() => setMessage(''), 2000);
            probeRef.current = null;
            return;
          }
        });

        if (st.probe) {
          // Collect data packets
          st.packets.forEach(pkt => {
            if (pkt.collected) return;
            const dx = pkt.x - st.probe.x;
            const dy = pkt.y - st.probe.y;
            if (Math.sqrt(dx * dx + dy * dy) < 18) {
              pkt.collected = true;
              st.score += pkt.pts;
              setDisplayState(d => ({ ...d, score: st.score, packets: [...st.packets] }));
              setMessage(`📡 ¡Datos recibidos! +${pkt.pts} pts`);
              setTimeout(() => setMessage(''), 1500);
            }
          });

          st.probe.x += st.probe.vx;
          st.probe.y += st.probe.vy;
          st.trajectory.push({ x: st.probe.x, y: st.probe.y });
          if (st.trajectory.length > 120) st.trajectory.shift();

          // Out of bounds → land
          if (st.probe.x < -50 || st.probe.x > W + 50 || st.probe.y < -50 || st.probe.y > H + 50) {
            st.probe = null;
            st.gameState = 'aiming';
            probeRef.current = null;
          }
        }

        // Win: all collected
        if (st.packets.every(p => p.collected) && st.gameState !== 'won') {
          st.gameState = 'won';
          setDisplayState(d => ({ ...d, gameState: 'won', score: st.score }));
          if (onComplete) onComplete(st.score + Math.floor(st.fuel * 2));
        }

        // Fuel out
        if (st.fuel <= 0 && st.gameState !== 'lost') {
          st.gameState = 'lost';
          setDisplayState(d => ({ ...d, gameState: 'lost' }));
        }

        drawTrajectory(ctx, st.trajectory);
        if (st.probe) drawProbe(ctx, st.probe, t);
      }

      t += 0.016;
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const launch = () => {
    const st = stateRef.current;
    if (st.fuel <= 0 || st.gameState === 'won' || st.gameState === 'lost') return;
    const angleRad = (aimAngle * Math.PI) / 180;
    const speed = power * 0.08;
    st.probe = { x: 400, y: 540, vx: Math.cos(angleRad) * speed, vy: Math.sin(angleRad) * speed };
    st.gameState = 'flying';
    st.trajectory = [];
    st.fuel = Math.max(0, st.fuel - 10);
    stateRef.current.aimAngle = aimAngle;
    stateRef.current.power = power;
    setDisplayState(d => ({ ...d, fuel: st.fuel, gameState: 'flying' }));
  };

  const recall = () => {
    const st = stateRef.current;
    st.probe = null;
    st.gameState = 'aiming';
    setDisplayState(d => ({ ...d, gameState: 'aiming' }));
  };

  const fuelColor = displayState.fuel > 50 ? '#00FF88' : displayState.fuel > 25 ? '#FFD700' : '#FF4444';

  return (
    <div style={{ background: 'rgba(0,0,0,0.85)', borderRadius: '20px', border: '1px solid rgba(0,228,255,0.25)', overflow: 'hidden' }}>
      {/* HUD */}
      <div style={{ padding: '0.8rem 1.2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.2rem' }}>🛸</span>
          <span style={{ color: '#00E4FF', fontWeight: 'bold' }}>Asistencia Gravitacional</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.4)', padding: '4px 12px', borderRadius: '20px', border: `1px solid ${fuelColor}44` }}>
          <Zap size={14} color={fuelColor} />
          <span style={{ color: fuelColor, fontFamily: 'monospace', fontSize: '0.9rem' }}>{Math.round(displayState.fuel)}% FUEL</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.4)', padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(255,215,0,0.3)' }}>
          <Star size={14} color="#FFD700" />
          <span style={{ color: '#FFD700', fontFamily: 'monospace', fontSize: '0.9rem' }}>{displayState.score} pts</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.4)', padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(255,80,80,0.3)' }}>
          <AlertTriangle size={14} color="#FF5050" />
          <span style={{ color: '#FF5050', fontFamily: 'monospace', fontSize: '0.9rem' }}>{displayState.collisions} colisiones</span>
        </div>
        <div style={{ flex: 1, textAlign: 'right', color: '#888', fontSize: '0.8rem' }}>
          Paquetes: {displayState.packets?.filter(p => p.collected).length || 0} / {DATA_PACKETS.length}
        </div>
      </div>

      {message && (
        <div style={{ background: 'rgba(0,0,0,0.8)', color: 'white', padding: '6px 16px', textAlign: 'center', fontSize: '0.9rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {message}
        </div>
      )}

      <div style={{ position: 'relative' }}>
        <canvas ref={canvasRef} width={W} height={H} style={{ display: 'block', width: '100%' }} />

        {/* Controls overlay */}
        {displayState.gameState === 'aiming' && (
          <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '1rem', alignItems: 'center', background: 'rgba(0,0,0,0.8)', padding: '0.8rem 1.5rem', borderRadius: '12px', border: '1px solid rgba(0,228,255,0.3)', backdropFilter: 'blur(8px)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ color: '#00E4FF', fontSize: '0.75rem', fontFamily: 'monospace' }}>ÁNGULO: {aimAngle}°</label>
              <input type="range" min="-180" max="0" value={aimAngle} onChange={e => { setAimAngle(+e.target.value); stateRef.current.aimAngle = +e.target.value; }}
                style={{ width: '120px', accentColor: '#00E4FF' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ color: '#FFD700', fontSize: '0.75rem', fontFamily: 'monospace' }}>POTENCIA: {power}%</label>
              <input type="range" min="20" max="100" value={power} onChange={e => { setPower(+e.target.value); stateRef.current.power = +e.target.value; }}
                style={{ width: '120px', accentColor: '#FFD700' }} />
            </div>
            <button onClick={launch} style={{ background: 'linear-gradient(135deg, #00E4FF, #0066AA)', border: 'none', color: 'white', padding: '0.7rem 1.5rem', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.95rem', boxShadow: '0 0 15px rgba(0,228,255,0.4)' }}>
              🚀 LANZAR
            </button>
          </div>
        )}

        {displayState.gameState === 'flying' && (
          <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.8)', padding: '0.6rem 1.5rem', borderRadius: '12px', border: '1px solid rgba(255,215,0,0.3)' }}>
            <button onClick={recall} style={{ background: 'rgba(255,80,0,0.3)', border: '1px solid #FF5000', color: '#FF8844', padding: '6px 16px', borderRadius: '8px', cursor: 'pointer' }}>
              ⛔ Abortar Misión
            </button>
          </div>
        )}

        {/* End screens */}
        <AnimatePresence>
          {(displayState.gameState === 'won' || displayState.gameState === 'lost') && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ position: 'absolute', inset: 0, background: displayState.gameState === 'won' ? 'rgba(0,80,50,0.85)' : 'rgba(80,0,0,0.85)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', backdropFilter: 'blur(6px)' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '0.8rem' }}>{displayState.gameState === 'won' ? '🛸' : '💀'}</div>
              <h2 style={{ color: displayState.gameState === 'won' ? '#00FF88' : '#FF4444', margin: '0 0 0.5rem' }}>
                {displayState.gameState === 'won' ? '¡Slingshot Maestro!' : 'Sin Combustible'}
              </h2>
              <p style={{ color: '#ccc', marginBottom: '1.5rem', maxWidth: '400px' }}>
                {displayState.gameState === 'won'
                  ? `Recolectaste todos los paquetes de datos con ${displayState.score} puntos.`
                  : `Recolectaste ${displayState.packets?.filter(p => p.collected).length || 0} de ${DATA_PACKETS.length} paquetes.`}
              </p>
              <button onClick={() => window.location.reload()} style={{ background: displayState.gameState === 'won' ? '#00FF88' : '#FF4444', color: displayState.gameState === 'won' ? 'black' : 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
                Nueva Misión
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
