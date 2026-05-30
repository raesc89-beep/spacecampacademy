'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Clock, Star, AlertTriangle } from 'lucide-react';

// Circuit nodes to connect in order
const CIRCUITS = [
  {
    name: 'Sistema de Oxígeno',
    color: '#00E4FF',
    nodes: [
      { id: 'O1', x: 120, y: 80, label: 'Sensor O₂' },
      { id: 'O2', x: 280, y: 140, label: 'Regulador' },
      { id: 'O3', x: 200, y: 220, label: 'Tanque' },
      { id: 'O4', x: 340, y: 280, label: 'Salida' },
    ]
  },
  {
    name: 'Sistema de Energía',
    color: '#FFD700',
    nodes: [
      { id: 'E1', x: 480, y: 100, label: 'Panel Solar' },
      { id: 'E2', x: 580, y: 160, label: 'Batería' },
      { id: 'E3', x: 520, y: 250, label: 'Inversor' },
      { id: 'E4', x: 650, y: 300, label: 'Grid' },
    ]
  },
  {
    name: 'Sistema de Datos',
    color: '#9933FF',
    nodes: [
      { id: 'D1', x: 150, y: 350, label: 'Antena' },
      { id: 'D2', x: 300, y: 390, label: 'Procesador' },
      { id: 'D3', x: 420, y: 370, label: 'Memoria' },
      { id: 'D4', x: 560, y: 420, label: 'Transmisor' },
    ]
  }
];

const ALL_NODES = CIRCUITS.flatMap(c => c.nodes.map(n => ({ ...n, circuit: c.name, circuitColor: c.color })));

export default function GravedadCero({ onComplete }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const [connections, setConnections] = useState([]); // [{from, to, color}]
  const [dragging, setDragging] = useState(null); // node id being dragged from
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [oxygen, setOxygen] = useState(100);
  const [timeLeft, setTimeLeft] = useState(120);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('playing');
  const [message, setMessage] = useState('');
  const [sparks, setSparks] = useState([]);

  const W = 800, H = 520;

  // Oxygen timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    const timer = setInterval(() => {
      setOxygen(prev => {
        const next = Math.max(0, prev - 0.8);
        if (next <= 0) setGameState('lost');
        return next;
      });
      setTimeLeft(prev => {
        if (prev <= 1) { setGameState('lost'); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState]);

  // Win check
  useEffect(() => {
    const totalRequired = CIRCUITS.reduce((s, c) => s + (c.nodes.length - 1), 0);
    if (connections.length >= totalRequired && gameState === 'playing') {
      // Verify all circuits complete
      let allDone = true;
      CIRCUITS.forEach(circuit => {
        for (let i = 0; i < circuit.nodes.length - 1; i++) {
          const from = circuit.nodes[i].id;
          const to = circuit.nodes[i + 1].id;
          if (!connections.find(c => c.from === from && c.to === to)) {
            allDone = false;
          }
        }
      });
      if (allDone) {
        setGameState('won');
        const bonus = Math.floor(score + oxygen * 2 + timeLeft * 3);
        if (onComplete) onComplete(bonus);
      }
    }
  }, [connections]);

  // Background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let t = 0;
    const draw = () => {
      // Space station interior
      ctx.fillStyle = '#06080d';
      ctx.fillRect(0, 0, W, H);

      // Grid floor
      ctx.strokeStyle = 'rgba(0,228,255,0.07)';
      ctx.lineWidth = 1;
      for (let gx = 0; gx <= W; gx += 40) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
      }
      for (let gy = 0; gy <= H; gy += 40) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
      }

      // Emergency lighting flicker (red tint when O2 < 30)
      t += 0.016;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const getNodeAt = (x, y) => {
    return ALL_NODES.find(n => Math.sqrt((n.x - x) ** 2 + (n.y - y) ** 2) < 22);
  };

  const handleMouseDown = (e) => {
    if (gameState !== 'playing') return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = W / rect.width;
    const scaleY = H / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    const node = getNodeAt(x, y);
    if (node) setDragging(node.id);
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = W / rect.width;
    const scaleY = H / rect.height;
    setMousePos({ x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY });
  };

  const handleMouseUp = (e) => {
    if (!dragging || gameState !== 'playing') { setDragging(null); return; }
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = W / rect.width;
    const scaleY = H / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    const target = getNodeAt(x, y);

    if (target && target.id !== dragging) {
      const fromNode = ALL_NODES.find(n => n.id === dragging);
      if (fromNode.circuit === target.circuit) {
        // Valid: same circuit
        const circuit = CIRCUITS.find(c => c.name === fromNode.circuit);
        const fromIdx = circuit.nodes.findIndex(n => n.id === dragging);
        const toIdx = circuit.nodes.findIndex(n => n.id === target.id);
        
        if (Math.abs(fromIdx - toIdx) === 1) {
          // Adjacent nodes — valid connection
          const alreadyExists = connections.find(c => 
            (c.from === dragging && c.to === target.id) || (c.from === target.id && c.to === dragging)
          );
          if (!alreadyExists) {
            setConnections(prev => [...prev, { from: dragging, to: target.id, color: fromNode.circuitColor }]);
            setScore(s => s + 75);
            setMessage(`⚡ Conexión ${fromNode.label} → ${target.label} establecida! +75`);
            setTimeout(() => setMessage(''), 2000);
            // Add sparks
            setSparks(prev => [...prev, { x: target.x, y: target.y, id: Date.now() }]);
            setTimeout(() => setSparks(prev => prev.filter(s => s.id !== Date.now())), 600);
          }
        } else {
          setMessage('❌ Conecta nodos adyacentes en orden');
          setTimeout(() => setMessage(''), 1500);
        }
      } else {
        setMessage('⚠️ Error de circuito: nodos incompatibles');
        setTimeout(() => setMessage(''), 1500);
        setScore(s => Math.max(0, s - 20));
      }
    }
    setDragging(null);
  };

  const oxygenColor = oxygen > 50 ? '#00E4FF' : oxygen > 25 ? '#FFD700' : '#FF2200';
  const timeColor = timeLeft > 60 ? '#00FF88' : timeLeft > 30 ? '#FFD700' : '#FF4444';

  const getNodeInfo = (id) => ALL_NODES.find(n => n.id === id);

  const totalConnections = CIRCUITS.reduce((s, c) => s + (c.nodes.length - 1), 0);

  return (
    <div style={{ background: 'rgba(0,0,0,0.9)', borderRadius: '20px', border: '1px solid rgba(255,80,80,0.3)', overflow: 'hidden' }}>
      {/* HUD */}
      <div style={{ padding: '0.8rem 1.2rem', display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(80,0,0,0.2)', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '1.1rem', color: '#FF5050', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <AlertTriangle size={18}/> Reparación de Emergencia
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.4)', padding: '4px 12px', borderRadius: '20px', border: `1px solid ${oxygenColor}55` }}>
          <span style={{ fontSize: '0.8rem' }}>O₂</span>
          <div style={{ width: '80px', height: '8px', background: '#111', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${oxygen}%`, height: '100%', background: oxygenColor, transition: 'width 0.3s, background 0.5s' }}/>
          </div>
          <span style={{ color: oxygenColor, fontFamily: 'monospace', fontSize: '0.8rem' }}>{Math.round(oxygen)}%</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.4)', padding: '4px 12px', borderRadius: '20px', border: `1px solid ${timeColor}44` }}>
          <Clock size={14} color={timeColor} />
          <span style={{ color: timeColor, fontFamily: 'monospace' }}>{timeLeft}s</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.4)', padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(255,215,0,0.3)' }}>
          <Star size={14} color="#FFD700" />
          <span style={{ color: '#FFD700', fontFamily: 'monospace' }}>{score}</span>
        </div>
        <div style={{ color: '#888', fontSize: '0.8rem', marginLeft: 'auto' }}>
          Conexiones: {connections.length} / {totalConnections}
        </div>
      </div>

      {message && (
        <div style={{ background: 'rgba(0,0,0,0.8)', color: 'white', padding: '5px 16px', textAlign: 'center', fontSize: '0.88rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {message}
        </div>
      )}

      {/* Instructions */}
      <div style={{ background: 'rgba(255,80,0,0.07)', padding: '6px 16px', fontSize: '0.78rem', color: '#FF9944', borderBottom: '1px solid rgba(255,80,0,0.2)', textAlign: 'center' }}>
        ⚡ Arrastra desde un nodo al siguiente en orden para reconectar cada circuito. Completa los 3 sistemas antes de que se acabe el O₂.
      </div>

      {/* Canvas + SVG Overlay */}
      <div style={{ position: 'relative' }} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
        <canvas ref={canvasRef} width={W} height={H} style={{ display: 'block', width: '100%', cursor: dragging ? 'grabbing' : 'default' }} />

        {/* SVG overlay for connections and nodes */}
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Established connections */}
          {connections.map((conn, i) => {
            const from = getNodeInfo(conn.from);
            const to = getNodeInfo(conn.to);
            if (!from || !to) return null;
            return (
              <g key={i}>
                <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={conn.color} strokeWidth="3" opacity="0.8" />
                <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="white" strokeWidth="1" opacity="0.3" />
                {/* Electric spark effect */}
                <circle cx={(from.x + to.x) / 2} cy={(from.y + to.y) / 2} r="4" fill={conn.color} opacity="0.6">
                  <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.5s" repeatCount="indefinite" />
                </circle>
              </g>
            );
          })}

          {/* Active drag line */}
          {dragging && (() => {
            const from = getNodeInfo(dragging);
            if (!from) return null;
            return (
              <line x1={from.x} y1={from.y} x2={mousePos.x} y2={mousePos.y}
                stroke={from.circuitColor} strokeWidth="2" strokeDasharray="6,4" opacity="0.7" />
            );
          })()}

          {/* Nodes */}
          {ALL_NODES.map(node => {
            const isConnected = connections.some(c => c.from === node.id || c.to === node.id);
            const isDraggingFrom = dragging === node.id;
            return (
              <g key={node.id}>
                {/* Glow */}
                <circle cx={node.x} cy={node.y} r="28" fill={node.circuitColor} opacity="0.08" />
                {/* Border */}
                <circle cx={node.x} cy={node.y} r="20" fill="#060a10" stroke={node.circuitColor} strokeWidth={isDraggingFrom ? 3 : 2} opacity={isConnected ? 1 : 0.75} />
                {/* Inner fill when connected */}
                {isConnected && <circle cx={node.x} cy={node.y} r="15" fill={node.circuitColor} opacity="0.2" />}
                {/* Check mark */}
                {isConnected && (
                  <text x={node.x} y={node.y + 4} textAnchor="middle" fill={node.circuitColor} fontSize="12" fontWeight="bold">✓</text>
                )}
                {!isConnected && (
                  <text x={node.x} y={node.y + 4} textAnchor="middle" fill={node.circuitColor} fontSize="10">⚡</text>
                )}
                {/* Label */}
                <text x={node.x} y={node.y + 34} textAnchor="middle" fill={node.circuitColor} fontSize="10" fontFamily="monospace" opacity="0.85">{node.label}</text>
              </g>
            );
          })}

          {/* Circuit labels */}
          {CIRCUITS.map((c, i) => (
            <text key={i} x={c.nodes[0].x - 10} y={c.nodes[0].y - 30} fill={c.color} fontSize="11" fontFamily="monospace" fontWeight="bold" opacity="0.7">
              — {c.name}
            </text>
          ))}
        </svg>

        {/* Spark particles */}
        {sparks.map(spark => (
          <div key={spark.id} style={{ position: 'absolute', left: `${(spark.x / W) * 100}%`, top: `${(spark.y / H) * 100}%`, width: '30px', height: '30px', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
            {[0,1,2,3,4,5].map(i => (
              <div key={i} style={{
                position: 'absolute', top: '50%', left: '50%',
                width: '3px', height: '12px',
                background: '#FFD700',
                transformOrigin: '50% 0%',
                transform: `rotate(${i * 60}deg) translateX(-50%)`,
                borderRadius: '2px',
                animation: 'fadeOut 0.4s forwards'
              }} />
            ))}
          </div>
        ))}

        {/* End screens */}
        <AnimatePresence>
          {(gameState === 'won' || gameState === 'lost') && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ position: 'absolute', inset: 0, background: gameState === 'won' ? 'rgba(0,50,30,0.9)' : 'rgba(50,0,0,0.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', backdropFilter: 'blur(6px)' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>{gameState === 'won' ? '✅' : '💀'}</div>
              <h2 style={{ color: gameState === 'won' ? '#00FF88' : '#FF4444', fontSize: '2rem', margin: '0 0 0.8rem' }}>
                {gameState === 'won' ? '¡Estación Reparada!' : gameState === 'lost' && oxygen <= 0 ? '¡Sin Oxígeno!' : 'Tiempo Agotado'}
              </h2>
              <p style={{ color: '#ccc', maxWidth: '360px', marginBottom: '1.5rem' }}>
                {gameState === 'won' ? `Reparaste todos los sistemas con ${score} puntos.` : `Completaste ${connections.length} de ${totalConnections} conexiones.`}
              </p>
              <button onClick={() => window.location.reload()} style={{ background: gameState === 'won' ? '#00FF88' : '#FF4444', color: gameState === 'won' ? 'black' : 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
                Nueva Emergencia
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <style>{`@keyframes fadeOut { to { opacity: 0; transform: scale(1.5) rotate(0deg); } }`}</style>
    </div>
  );
}
