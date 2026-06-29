'use client';

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';

// ─── Node labels (space station components) ───────────────────────────────────
const NODE_LABELS = [
  { key: 'O2',    label: 'O₂',     color: '#00e5ff' },
  { key: 'PWR',   label: 'PWR',    color: '#ffd700' },
  { key: 'COMM',  label: 'COMM',   color: '#ff6b6b' },
  { key: 'NAV',   label: 'NAV',    color: '#7bed9f' },
  { key: 'LIFE',  label: 'LIFE',   color: '#cc66ff' },
  { key: 'DOCK',  label: 'DOCK',   color: '#ff8844' },
  { key: 'SOLAR', label: 'SOLAR',  color: '#ffee00' },
  { key: 'THRML', label: 'THRML',  color: '#44aaff' },
  { key: 'GYRO',  label: 'GYRO',   color: '#ff44aa' },
  { key: 'FUEL',  label: 'FUEL',   color: '#88ff44' },
  { key: 'SHIELD',label: 'SHLD',   color: '#aa88ff' },
  { key: 'AI',    label: 'A.I.',   color: '#ff6600' },
];

// ─── Line segment intersection check ──────────────────────────────────────────
function segmentsIntersect(p1, p2, p3, p4) {
  const d1x = p2.x - p1.x, d1y = p2.y - p1.y;
  const d2x = p4.x - p3.x, d2y = p4.y - p3.y;
  const cross = d1x * d2y - d1y * d2x;
  if (Math.abs(cross) < 1e-10) return false;
  const t = ((p3.x - p1.x) * d2y - (p3.y - p1.y) * d2x) / cross;
  const u = ((p3.x - p1.x) * d1y - (p3.y - p1.y) * d1x) / cross;
  return t > 0.01 && t < 0.99 && u > 0.01 && u < 0.99;
}

// ─── Count edge crossings ────────────────────────────────────────────────────
function countCrossings(nodes, edges) {
  let count = 0;
  for (let i = 0; i < edges.length; i++) {
    for (let j = i + 1; j < edges.length; j++) {
      const e1 = edges[i], e2 = edges[j];
      // Skip edges that share a node
      if (e1[0] === e2[0] || e1[0] === e2[1] || e1[1] === e2[0] || e1[1] === e2[1]) continue;
      if (segmentsIntersect(nodes[e1[0]], nodes[e1[1]], nodes[e2[0]], nodes[e2[1]])) {
        count++;
      }
    }
  }
  return count;
}

// ─── Check if a specific edge is crossed by any other ────────────────────────
function isEdgeCrossed(edgeIdx, nodes, edges) {
  const e1 = edges[edgeIdx];
  for (let j = 0; j < edges.length; j++) {
    if (j === edgeIdx) continue;
    const e2 = edges[j];
    if (e1[0] === e2[0] || e1[0] === e2[1] || e1[1] === e2[0] || e1[1] === e2[1]) continue;
    if (segmentsIntersect(nodes[e1[0]], nodes[e1[1]], nodes[e2[0]], nodes[e2[1]])) {
      return true;
    }
  }
  return false;
}

// ─── Generate a planar graph level ───────────────────────────────────────────
function generateLevel(numNodes) {
  const W = 700, H = 500, PAD = 60;

  // Place solution positions evenly in a circle
  const solutionPositions = [];
  const cx = W / 2, cy = H / 2;
  const radius = Math.min(W, H) / 2 - PAD;
  for (let i = 0; i < numNodes; i++) {
    const angle = (2 * Math.PI * i) / numNodes - Math.PI / 2;
    solutionPositions.push({
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    });
  }

  // Generate edges — connect each node to its neighbors + some cross-connections
  const edges = [];
  for (let i = 0; i < numNodes; i++) {
    edges.push([i, (i + 1) % numNodes]); // ring
  }
  // Add some diagonal edges to make it interesting
  const extraEdges = Math.max(1, Math.floor(numNodes * 0.6));
  for (let k = 0; k < extraEdges; k++) {
    let a, b, attempts = 0;
    do {
      a = Math.floor(Math.random() * numNodes);
      b = Math.floor(Math.random() * numNodes);
      attempts++;
    } while (
      (a === b || Math.abs(a - b) <= 1 || Math.abs(a - b) === numNodes - 1 ||
       edges.some(e => (e[0] === a && e[1] === b) || (e[0] === b && e[1] === a))) &&
      attempts < 50
    );
    if (attempts < 50) edges.push([a, b]);
  }

  // Scramble positions to create tangles (shuffle into inner area)
  const scrambled = solutionPositions.map(() => ({
    x: PAD + Math.random() * (W - PAD * 2),
    y: PAD + Math.random() * (H - PAD * 2),
  }));

  // Ensure there ARE crossings (re-shuffle if needed)
  let tries = 0;
  while (countCrossings(scrambled, edges) < 2 && tries < 20) {
    for (let i = 0; i < numNodes; i++) {
      scrambled[i] = {
        x: PAD + Math.random() * (W - PAD * 2),
        y: PAD + Math.random() * (H - PAD * 2),
      };
    }
    tries++;
  }

  return { nodes: scrambled, edges, width: W, height: H };
}

// ─── Format time MM:SS ───────────────────────────────────────────────────────
function fmtTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

// ─── Floating animation offsets (zero gravity effect) ─────────────────────────
function useFloatOffsets(count) {
  const [offsets, setOffsets] = useState(() =>
    Array.from({ length: count }, () => ({
      dx: 0, dy: 0,
      ax: Math.random() * 3 + 1, ay: Math.random() * 3 + 1.5,
      px: Math.random() * Math.PI * 2, py: Math.random() * Math.PI * 2,
    }))
  );
  const frameRef = useRef(null);
  const startRef = useRef(Date.now());

  useEffect(() => {
    const animate = () => {
      const t = (Date.now() - startRef.current) / 1000;
      setOffsets(prev => prev.map(o => ({
        ...o,
        dx: Math.sin(t * 0.5 + o.px) * o.ax,
        dy: Math.cos(t * 0.7 + o.py) * o.ay,
      })));
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  // Resize array when count changes
  useEffect(() => {
    setOffsets(prev => {
      if (prev.length >= count) return prev.slice(0, count);
      const extra = Array.from({ length: count - prev.length }, () => ({
        dx: 0, dy: 0,
        ax: Math.random() * 3 + 1, ay: Math.random() * 3 + 1.5,
        px: Math.random() * Math.PI * 2, py: Math.random() * Math.PI * 2,
      }));
      return [...prev, ...extra];
    });
    startRef.current = Date.now();
  }, [count]);

  return offsets;
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function GravedadCero({ onComplete }) {
  const [phase, setPhase] = useState('intro');     // intro | playing | levelComplete
  const [level, setLevel] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [elapsed, setElapsed] = useState(0);        // seconds
  const [levelStartTime, setLevelStartTime] = useState(0);

  // Level data
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [boardW, setBoardW] = useState(700);
  const [boardH, setBoardH] = useState(500);

  // Drag state
  const [dragging, setDragging] = useState(null);   // node index or null
  const containerRef = useRef(null);
  const timerRef = useRef(null);

  // Float animation
  const numNodes = 4 + level;  // Level 1 = 5 nodes, Level 2 = 6, etc.
  const floatOffsets = useFloatOffsets(nodes.length);

  // ── Crossings count ────────────────────────────────────────────────────────
  const crossings = useMemo(() => {
    if (nodes.length === 0 || edges.length === 0) return 999;
    return countCrossings(nodes, edges);
  }, [nodes, edges]);

  // ── Edge crossed status ────────────────────────────────────────────────────
  const edgeCrossed = useMemo(() => {
    return edges.map((_, idx) => isEdgeCrossed(idx, nodes, edges));
  }, [nodes, edges]);

  // ── Timer ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase === 'playing') {
      timerRef.current = setInterval(() => {
        setElapsed(e => e + 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [phase]);

  // ── Check level complete ───────────────────────────────────────────────────
  useEffect(() => {
    if (phase === 'playing' && crossings === 0 && nodes.length > 0) {
      clearInterval(timerRef.current);
      const levelTime = elapsed - levelStartTime;
      const levelScore = Math.max(100, level * 1000 - levelTime * 5);
      setTotalScore(prev => prev + levelScore);
      setPhase('levelComplete');
    }
  }, [crossings, phase, nodes.length]);

  // ── Start level ────────────────────────────────────────────────────────────
  const startLevel = useCallback((lvl) => {
    const n = 4 + lvl;
    const { nodes: newNodes, edges: newEdges, width, height } = generateLevel(n);
    setNodes(newNodes);
    setEdges(newEdges);
    setBoardW(width);
    setBoardH(height);
    setLevel(lvl);
    setLevelStartTime(elapsed);
    setPhase('playing');
  }, [elapsed]);

  const startGame = useCallback(() => {
    setElapsed(0);
    setTotalScore(0);
    setLevelStartTime(0);
    startLevel(1);
  }, [startLevel]);

  const nextLevel = useCallback(() => {
    startLevel(level + 1);
  }, [level, startLevel]);

  // ── Get pointer position relative to SVG ───────────────────────────────────
  const getPos = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const scaleX = boardW / rect.width;
    const scaleY = boardH / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  }, [boardW, boardH]);

  // ── Drag handlers ──────────────────────────────────────────────────────────
  const onPointerDown = useCallback((idx, e) => {
    e.preventDefault();
    setDragging(idx);
  }, []);

  const onPointerMove = useCallback((e) => {
    if (dragging === null) return;
    e.preventDefault();
    const pos = getPos(e);
    setNodes(prev => {
      const next = [...prev];
      next[dragging] = { x: Math.max(20, Math.min(boardW - 20, pos.x)), y: Math.max(20, Math.min(boardH - 20, pos.y)) };
      return next;
    });
  }, [dragging, getPos, boardW, boardH]);

  const onPointerUp = useCallback(() => {
    setDragging(null);
  }, []);

  // ── Global pointer listeners ───────────────────────────────────────────────
  useEffect(() => {
    if (dragging !== null) {
      const moveH = (e) => onPointerMove(e);
      const upH = () => onPointerUp();
      window.addEventListener('mousemove', moveH);
      window.addEventListener('mouseup', upH);
      window.addEventListener('touchmove', moveH, { passive: false });
      window.addEventListener('touchend', upH);
      return () => {
        window.removeEventListener('mousemove', moveH);
        window.removeEventListener('mouseup', upH);
        window.removeEventListener('touchmove', moveH);
        window.removeEventListener('touchend', upH);
      };
    }
  }, [dragging, onPointerMove, onPointerUp]);

  // ─── INTRO SCREEN ──────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div style={{
        width: '100%', height: '100%', minHeight: '500px',
        background: 'radial-gradient(ellipse at 30% 30%, #0a1628 0%, #060a12 60%, #020308 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        color: 'white', fontFamily: 'sans-serif', gap: '1.2rem', padding: '2rem',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background particles */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.3, pointerEvents: 'none' }}>
          {Array.from({ length: 40 }, (_, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`, height: `${1 + Math.random() * 2}px`,
              borderRadius: '50%', background: 'white',
              animation: `twinkle ${2 + Math.random() * 3}s ${Math.random() * 3}s ease-in-out infinite alternate`,
            }} />
          ))}
        </div>

        <div style={{ fontSize: '4rem', marginBottom: '0.3rem' }}>🛸</div>
        <h1 style={{
          fontSize: '1.8rem', margin: 0, textAlign: 'center',
          background: 'linear-gradient(90deg, #00e5ff, #cc66ff)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          fontWeight: 800, letterSpacing: '2px',
        }}>
          DESENREDA LA ESTACIÓN
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', textAlign: 'center', maxWidth: '400px', lineHeight: 1.6 }}>
          Los módulos de la estación espacial están enredados. Arrastra los nodos para que
          <span style={{ color: '#00e5ff' }}> ninguna línea se cruce</span>.
          ¡Niveles progresivos, cada vez más difícil!
        </p>
        <button
          onClick={startGame}
          style={{
            background: 'linear-gradient(135deg, #00e5ff, #cc66ff)',
            color: '#000', border: 'none', padding: '1rem 3rem',
            borderRadius: '14px', fontSize: '1.1rem', fontWeight: 800,
            cursor: 'pointer', letterSpacing: '1px',
            boxShadow: '0 0 30px rgba(0,228,255,0.3)',
            marginTop: '0.5rem',
          }}
        >
          INICIAR MISIÓN
        </button>

        <style>{`
          @keyframes twinkle {
            0% { opacity: 0.2; }
            100% { opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  // ─── LEVEL COMPLETE SCREEN ─────────────────────────────────────────────────
  if (phase === 'levelComplete') {
    const levelTime = elapsed - levelStartTime;
    const levelScore = Math.max(100, level * 1000 - levelTime * 5);
    return (
      <div style={{
        width: '100%', height: '100%', minHeight: '500px',
        background: 'radial-gradient(ellipse at 50% 40%, #0a2030 0%, #060a12 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        color: 'white', fontFamily: 'sans-serif', gap: '1rem', padding: '2rem',
      }}>
        <div style={{ fontSize: '4rem' }}>✨</div>
        <h2 style={{ color: '#00e5ff', margin: 0, fontSize: '1.6rem', textShadow: '0 0 20px #00e5ff' }}>
          ¡Nivel {level} Completado!
        </h2>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ background: 'rgba(0,228,255,0.1)', border: '1px solid rgba(0,228,255,0.3)', borderRadius: '12px', padding: '0.7rem 1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.2rem' }}>TIEMPO</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#00e5ff', fontFamily: 'monospace' }}>{fmtTime(levelTime)}</div>
          </div>
          <div style={{ background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.3)', borderRadius: '12px', padding: '0.7rem 1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.2rem' }}>PUNTAJE NIVEL</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#FFD700', fontFamily: 'monospace' }}>+{levelScore}</div>
          </div>
          <div style={{ background: 'rgba(204,102,255,0.1)', border: '1px solid rgba(204,102,255,0.3)', borderRadius: '12px', padding: '0.7rem 1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.2rem' }}>TOTAL</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#cc66ff', fontFamily: 'monospace' }}>{totalScore}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem' }}>
          <button onClick={nextLevel} style={{
            background: 'linear-gradient(135deg, #00e5ff, #00aadd)', color: '#000',
            border: 'none', padding: '0.8rem 2rem', borderRadius: '10px',
            fontWeight: 800, cursor: 'pointer', fontSize: '1rem',
          }}>
            SIGUIENTE NIVEL →
          </button>
          <button onClick={() => { if (onComplete) onComplete(totalScore); }} style={{
            background: 'transparent', color: '#cc66ff',
            border: '1px solid rgba(204,102,255,0.4)', padding: '0.8rem 2rem',
            borderRadius: '10px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem',
          }}>
            Finalizar ({totalScore} pts)
          </button>
        </div>
      </div>
    );
  }

  // ─── PLAYING SCREEN ────────────────────────────────────────────────────────
  return (
    <div style={{
      width: '100%', height: '100%', minHeight: '500px',
      background: 'radial-gradient(ellipse at 40% 20%, #0a1628 0%, #060a12 60%, #020308 100%)',
      display: 'flex', flexDirection: 'column',
      color: 'white', fontFamily: 'sans-serif',
      position: 'relative', overflow: 'hidden',
      userSelect: 'none',
    }}>
      {/* HUD */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0.8rem 1.2rem',
        background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0,228,255,0.15)', flexShrink: 0, zIndex: 10,
      }}>
        <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>NIVEL</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#00e5ff' }}>{level}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>CRUCES</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: crossings > 0 ? '#ff6b6b' : '#7bed9f' }}>{crossings}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>NODOS</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#cc66ff' }}>{nodes.length}</div>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>DESENREDA LA ESTACIÓN</div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>Arrastra los módulos</div>
        </div>
        <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>TIEMPO</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffd700', fontFamily: 'monospace' }}>{fmtTime(elapsed)}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>PUNTAJE</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#cc66ff', fontFamily: 'monospace' }}>{totalScore}</div>
          </div>
        </div>
      </div>

      {/* Game board */}
      <div
        ref={containerRef}
        style={{
          flex: 1, position: 'relative', cursor: dragging !== null ? 'grabbing' : 'default',
          touchAction: 'none',
        }}
        onMouseMove={onPointerMove}
        onMouseUp={onPointerUp}
        onTouchMove={onPointerMove}
        onTouchEnd={onPointerUp}
      >
        <svg
          viewBox={`0 0 ${boardW} ${boardH}`}
          style={{ width: '100%', height: '100%', display: 'block' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid dots background */}
          <defs>
            <pattern id="grid-dots" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="0.5" fill="rgba(255,255,255,0.06)" />
            </pattern>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <rect width={boardW} height={boardH} fill="url(#grid-dots)" />

          {/* Edges */}
          {edges.map((edge, idx) => {
            const n1 = nodes[edge[0]];
            const n2 = nodes[edge[1]];
            if (!n1 || !n2) return null;
            const fo1 = (dragging === edge[0]) ? { dx: 0, dy: 0 } : (floatOffsets[edge[0]] || { dx: 0, dy: 0 });
            const fo2 = (dragging === edge[1]) ? { dx: 0, dy: 0 } : (floatOffsets[edge[1]] || { dx: 0, dy: 0 });
            const crossed = edgeCrossed[idx];
            return (
              <line
                key={`e-${idx}`}
                x1={n1.x + fo1.dx} y1={n1.y + fo1.dy}
                x2={n2.x + fo2.dx} y2={n2.y + fo2.dy}
                stroke={crossed ? '#ff4444' : '#00e5ff'}
                strokeWidth={crossed ? 2.5 : 2}
                strokeOpacity={crossed ? 0.8 : 0.5}
                strokeLinecap="round"
                style={{
                  filter: crossed ? 'none' : 'url(#glow)',
                  transition: 'stroke 0.3s ease, stroke-opacity 0.3s ease',
                }}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node, idx) => {
            const label = NODE_LABELS[idx % NODE_LABELS.length];
            const isDragging = dragging === idx;
            const fo = isDragging ? { dx: 0, dy: 0 } : (floatOffsets[idx] || { dx: 0, dy: 0 });
            const nx = node.x + fo.dx;
            const ny = node.y + fo.dy;
            return (
              <g
                key={`n-${idx}`}
                transform={`translate(${nx}, ${ny})`}
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                onMouseDown={(e) => onPointerDown(idx, e)}
                onTouchStart={(e) => onPointerDown(idx, e)}
              >
                {/* Outer glow */}
                <circle r={isDragging ? 26 : 22} fill="none"
                  stroke={label.color} strokeWidth="1.5"
                  strokeOpacity={isDragging ? 0.8 : 0.3}
                  style={{ transition: 'all 0.2s' }}
                />
                {/* Main circle */}
                <circle r={18}
                  fill={isDragging ? label.color + '44' : 'rgba(10,20,40,0.9)'}
                  stroke={label.color}
                  strokeWidth={isDragging ? 2.5 : 1.5}
                  style={{ transition: 'all 0.2s', filter: isDragging ? `drop-shadow(0 0 10px ${label.color})` : 'none' }}
                />
                {/* Label */}
                <text
                  textAnchor="middle" dominantBaseline="central"
                  fill={label.color} fontSize="9" fontWeight="700"
                  fontFamily="monospace" style={{ pointerEvents: 'none' }}
                >
                  {label.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Crossings progress bar */}
      <div style={{
        padding: '0.5rem 1.2rem 0.8rem',
        background: 'rgba(0,0,0,0.5)', flexShrink: 0,
        display: 'flex', alignItems: 'center', gap: '1rem',
      }}>
        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>
          {crossings > 0 ? `${crossings} cruce${crossings > 1 ? 's' : ''} restante${crossings > 1 ? 's' : ''}` : '¡Sin cruces!'}
        </span>
        <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: '3px',
            background: crossings > 0
              ? 'linear-gradient(90deg, #ff4444, #ff8844)'
              : 'linear-gradient(90deg, #7bed9f, #00e5ff)',
            width: crossings > 0 ? `${Math.max(5, 100 - crossings * 10)}%` : '100%',
            transition: 'all 0.5s ease',
            boxShadow: crossings === 0 ? '0 0 10px #00e5ff' : 'none',
          }} />
        </div>
        <button onClick={() => { if (onComplete) onComplete(totalScore); }} style={{
          background: 'rgba(204,102,255,0.15)', color: '#cc66ff',
          border: '1px solid rgba(204,102,255,0.3)', padding: '0.4rem 1rem',
          borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700,
          cursor: 'pointer', whiteSpace: 'nowrap',
        }}>
          Finalizar
        </button>
      </div>

      <style>{`
        @keyframes twinkle {
          0% { opacity: 0.2; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
