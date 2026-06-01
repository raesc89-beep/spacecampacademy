'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

// ─── Port configuration ───────────────────────────────────────────────────────
// label: display text, color: wire + port color, key: unique id
const PORTS = [
  { key: 'O2',   label: 'O₂',   color: '#00e5ff' },
  { key: 'PWR',  label: 'PWR',  color: '#ffd700' },
  { key: 'COMM', label: 'COMM', color: '#ff6b6b' },
  { key: 'NAV',  label: 'NAV',  color: '#7bed9f' },
  { key: 'LIFE', label: 'LIFE', color: '#cc66ff' },
];

const GAME_TIME = 90; // seconds

// Shuffle an array (Fisher-Yates)
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function GravedadCero({ onComplete }) {
  // game state
  const [started,     setStarted]     = useState(false);
  const [gameOver,    setGameOver]    = useState(false);
  const [won,         setWon]         = useState(false);
  const [timeLeft,    setTimeLeft]    = useState(GAME_TIME);
  const [score,       setScore]       = useState(0);

  // port order on the right side (scrambled)
  const [rightOrder,  setRightOrder]  = useState(() => shuffle(PORTS));

  // connections: map of leftKey -> rightKey (only correct ones survive)
  const [connections, setConnections] = useState({}); // { portKey: portKey }

  // flash state for ✓ CONECTADO messages
  const [flashKey,    setFlashKey]    = useState(null);

  // shake for wrong port
  const [shakeKey,    setShakeKey]    = useState(null);

  // drag state (refs so SVG line can follow without re-rendering each frame)
  const dragging       = useRef(false);
  const dragFromKey    = useRef(null);   // the left port key being dragged
  const dragFromPos    = useRef({ x: 0, y: 0 }); // starting SVG coords
  const dragCurrentPos = useRef({ x: 0, y: 0 }); // current mouse SVG coords
  const svgRef         = useRef(null);
  const containerRef   = useRef(null);

  // We store the live SVG line element ref so we can update it without React re-renders
  const liveLine       = useRef(null);

  const timerRef       = useRef(null);

  // ── Start game ────────────────────────────────────────────────────────────
  const startGame = useCallback(() => {
    setStarted(true);
    setGameOver(false);
    setWon(false);
    setConnections({});
    setTimeLeft(GAME_TIME);
    setScore(0);
    setRightOrder(shuffle(PORTS));
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setGameOver(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => () => clearInterval(timerRef.current), []);

  // ── Port DOM position helpers ─────────────────────────────────────────────
  // We tag each port circle with a data-port-key attribute
  // and read its center position relative to the SVG overlay.
  const getPortCenter = useCallback((portKey, side) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const el = svgRef.current.parentElement.querySelector(
      `[data-port="${side}-${portKey}"]`
    );
    if (!el) return { x: 0, y: 0 };
    const svgRect  = svgRef.current.getBoundingClientRect();
    const portRect = el.getBoundingClientRect();
    return {
      x: portRect.left + portRect.width / 2 - svgRect.left,
      y: portRect.top  + portRect.height / 2 - svgRect.top,
    };
  }, []);

  // ── Mouse / Touch drag helpers ────────────────────────────────────────────
  const svgCoordsFromEvent = useCallback((e) => {
    const svgRect = svgRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - svgRect.left, y: clientY - svgRect.top };
  }, []);

  const updateLiveLine = useCallback(() => {
    if (!liveLine.current) return;
    const { x: x1, y: y1 } = dragFromPos.current;
    const { x: x2, y: y2 } = dragCurrentPos.current;
    liveLine.current.setAttribute('x1', x1);
    liveLine.current.setAttribute('y1', y1);
    liveLine.current.setAttribute('x2', x2);
    liveLine.current.setAttribute('y2', y2);
    liveLine.current.setAttribute('stroke', dragColorRef.current);
  }, []);

  const dragColorRef = useRef('#fff');

  const onLeftPortDown = useCallback((e, portKey) => {
    if (!started || gameOver || won) return;
    if (connections[portKey]) return; // already connected
    e.preventDefault();
    dragging.current    = true;
    dragFromKey.current = portKey;
    dragColorRef.current = PORTS.find(p => p.key === portKey)?.color || '#fff';

    const from = getPortCenter(portKey, 'left');
    dragFromPos.current    = from;
    dragCurrentPos.current = svgCoordsFromEvent(e);
    updateLiveLine();
    if (liveLine.current) liveLine.current.style.display = '';
  }, [started, gameOver, won, connections, getPortCenter, svgCoordsFromEvent, updateLiveLine]);

  const onMouseMove = useCallback((e) => {
    if (!dragging.current) return;
    dragCurrentPos.current = svgCoordsFromEvent(e);
    updateLiveLine();
  }, [svgCoordsFromEvent, updateLiveLine]);

  const onTouchMove = useCallback((e) => {
    if (!dragging.current) return;
    e.preventDefault();
    dragCurrentPos.current = svgCoordsFromEvent(e);
    updateLiveLine();
  }, [svgCoordsFromEvent, updateLiveLine]);

  const onRightPortUp = useCallback((e, portKey) => {
    if (!dragging.current) return;
    dragging.current = false;
    if (liveLine.current) liveLine.current.style.display = 'none';

    const fromKey = dragFromKey.current;
    if (!fromKey) return;

    // Check if portKey matches fromKey (same system)
    if (portKey === fromKey) {
      // Correct!
      setConnections(prev => {
        const next = { ...prev, [fromKey]: portKey };
        const allDone = PORTS.every(p => next[p.key]);
        if (allDone) {
          clearInterval(timerRef.current);
          setWon(true);
          setScore(prev => prev); // score computed separately
        }
        return next;
      });
      setFlashKey(fromKey);
      setTimeout(() => setFlashKey(null), 1200);
      setScore(s => s + 1);
    } else {
      // Wrong!
      setShakeKey(portKey);
      setTimeout(() => setShakeKey(null), 400);
    }

    dragFromKey.current = null;
  }, []);

  const onGlobalUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    dragFromKey.current = null;
    if (liveLine.current) liveLine.current.style.display = 'none';
  }, []);

  // Attach global listeners to capture mouseup anywhere
  useEffect(() => {
    window.addEventListener('mouseup',   onGlobalUp);
    window.addEventListener('touchend',  onGlobalUp);
    return () => {
      window.removeEventListener('mouseup',  onGlobalUp);
      window.removeEventListener('touchend', onGlobalUp);
    };
  }, [onGlobalUp]);

  // ── Render connected lines ────────────────────────────────────────────────
  // We compute line positions on each render for connected ports
  // (positions are stable since layout doesn't change)

  const timerColor = timeLeft > 30 ? '#00e5ff' : timeLeft > 15 ? '#ffd700' : '#ff4d4d';
  const connectedCount = Object.keys(connections).length;

  // ── Screens ───────────────────────────────────────────────────────────────
  if (!started) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.circuitBg} />
        <div style={styles.startScreen}>
          <p style={styles.startIcon}>🛰️</p>
          <h2 style={styles.startTitle}>CONECTA LA ESTACIÓN</h2>
          <p style={styles.startDesc}>
            Los sistemas de la estación espacial están desconectados.<br />
            Arrastra cada puerto izquierdo hasta su gemelo en la derecha.<br />
            ¡Tienes {GAME_TIME} segundos!
          </p>
          <button style={styles.bigBtn} onClick={startGame}>
            CONECTAR SISTEMAS
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={styles.wrapper}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      onMouseUp={onGlobalUp}
      onTouchEnd={onGlobalUp}
    >
      <div style={styles.circuitBg} />

      {/* ── Top bar ── */}
      <div style={styles.topBar}>
        <div style={styles.topSection}>
          <span style={styles.topLabel}>SISTEMAS</span>
          <span style={styles.topValue}>{connectedCount}/{PORTS.length}</span>
        </div>
        <h2 style={styles.gameTitle}>CONECTA LA ESTACIÓN</h2>
        <div style={{ ...styles.topSection, alignItems: 'flex-end' }}>
          <span style={styles.topLabel}>TIEMPO</span>
          <span style={{ ...styles.topValue, color: timerColor }}>{timeLeft}s</span>
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div style={styles.progressTrack}>
        <div style={{ ...styles.progressFill, width: `${(connectedCount / PORTS.length) * 100}%` }} />
      </div>

      {/* ── Game area ── */}
      <div style={styles.gameArea}>
        {/* Left ports */}
        <div style={styles.portColumn}>
          <p style={styles.columnLabel}>ORIGEN</p>
          {PORTS.map(port => {
            const connected = !!connections[port.key];
            return (
              <div
                key={port.key}
                style={styles.portRow}
              >
                <div style={styles.portLabel}>{port.label}</div>
                <div
                  data-port={`left-${port.key}`}
                  onMouseDown={e => onLeftPortDown(e, port.key)}
                  onTouchStart={e => onLeftPortDown(e, port.key)}
                  style={{
                    ...styles.portCircle,
                    background:  connected ? port.color : '#0a1a2a',
                    borderColor: port.color,
                    boxShadow:   connected ? `0 0 10px ${port.color}` : `0 0 4px ${port.color}44`,
                    cursor:      connected ? 'default' : 'grab',
                    transform:   shakeKey === port.key ? 'translateX(6px)' : 'translateX(0)',
                    transition:  'transform 0.1s, background 0.3s, box-shadow 0.3s',
                  }}
                >
                  {connected ? '✓' : ''}
                </div>
              </div>
            );
          })}
        </div>

        {/* SVG overlay for lines */}
        <div style={styles.svgContainer}>
          <ConnectedLines
            connections={connections}
            svgRef={svgRef}
            liveLine={liveLine}
            getPortCenter={getPortCenter}
          />
          {/* Flash messages */}
          {flashKey && (
            <div style={styles.flashMsg}>
              ✓ CONECTADO
            </div>
          )}
        </div>

        {/* Right ports (scrambled) */}
        <div style={styles.portColumn}>
          <p style={styles.columnLabel}>DESTINO</p>
          {rightOrder.map(port => {
            const connected = !!connections[port.key];
            return (
              <div key={port.key} style={styles.portRow}>
                <div
                  data-port={`right-${port.key}`}
                  onMouseUp={e => onRightPortUp(e, port.key)}
                  onTouchEnd={e => onRightPortUp(e, port.key)}
                  style={{
                    ...styles.portCircle,
                    background:  connected ? port.color : '#0a1a2a',
                    borderColor: port.color,
                    boxShadow:   connected
                      ? `0 0 10px ${port.color}`
                      : shakeKey === port.key
                        ? `0 0 14px #ff4d4d`
                        : `0 0 4px ${port.color}44`,
                    cursor:      'crosshair',
                    transform:   shakeKey === port.key ? 'translateX(-6px)' : 'translateX(0)',
                    transition:  'transform 0.1s, background 0.3s, box-shadow 0.3s',
                  }}
                >
                  {connected ? '✓' : ''}
                </div>
                <div style={styles.portLabel}>{port.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Instructions ── */}
      <p style={styles.hint}>
        Arrastra desde un puerto ORIGEN hasta su DESTINO correspondiente
      </p>

      {/* ── Won overlay ── */}
      {won && (
        <div style={styles.overlay}>
          <p style={{ ...styles.overlayTitle, color: '#7bed9f' }}>✅ ¡ESTACIÓN OPERATIVA!</p>
          <p style={styles.overlayText}>
            Todos los sistemas conectados.<br />
            Tiempo restante: <strong style={{ color: '#00e5ff' }}>{timeLeft}s</strong><br />
            Puntuación: <strong style={{ color: '#ffd700' }}>{timeLeft * 10}</strong>
          </p>
          <button
            style={{ ...styles.bigBtn, background: '#7bed9f', color: '#001a00' }}
            onClick={() => onComplete && onComplete(timeLeft * 10)}
          >
            CONTINUAR MISIÓN
          </button>
        </div>
      )}

      {/* ── Game over overlay ── */}
      {gameOver && !won && (
        <div style={styles.overlay}>
          <p style={{ ...styles.overlayTitle, color: '#ff4d4d' }}>⏱ TIEMPO AGOTADO</p>
          <p style={styles.overlayText}>
            Sistemas conectados: <strong style={{ color: '#00e5ff' }}>{connectedCount}/{PORTS.length}</strong>
          </p>
          <button style={{ ...styles.bigBtn, background: '#ff4d4d' }} onClick={startGame}>
            REINTENTAR
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Connected lines component ────────────────────────────────────────────────
// Separate component so we can attach svgRef and liveLine ref cleanly
function ConnectedLines({ connections, svgRef, liveLine, getPortCenter }) {
  // We re-read positions on every render (layout is stable)
  const lines = Object.entries(connections).map(([key]) => {
    const port  = PORTS.find(p => p.key === key);
    const left  = getPortCenter(key, 'left');
    const right = getPortCenter(key, 'right');
    return { key, color: port?.color || '#fff', left, right };
  });

  return (
    <svg
      ref={svgRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Static connected lines */}
      {lines.map(({ key, color, left, right }) => (
        <line
          key={key}
          x1={left.x}  y1={left.y}
          x2={right.x} y2={right.y}
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
          filter="url(#glow)"
          style={{ transition: 'stroke-dashoffset 0.4s' }}
        />
      ))}

      {/* Live drag line (hidden when not dragging) */}
      <line
        ref={liveLine}
        x1={0} y1={0} x2={0} y2={0}
        stroke="#fff"
        strokeWidth={2.5}
        strokeDasharray="8 5"
        strokeLinecap="round"
        style={{ display: 'none' }}
      />
    </svg>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = {
  wrapper: {
    position:        'relative',
    width:           '100%',
    minHeight:       '520px',
    background:      'linear-gradient(135deg, #010d1a 0%, #030e20 100%)',
    borderRadius:    '16px',
    overflow:        'hidden',
    display:         'flex',
    flexDirection:   'column',
    alignItems:      'center',
    fontFamily:      "'Courier New', monospace",
    color:           '#c0d8ff',
    userSelect:      'none',
  },
  circuitBg: {
    position:        'absolute',
    inset:           0,
    // Subtle circuit-board grid lines
    backgroundImage: `
      linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)
    `,
    backgroundSize:  '32px 32px',
    pointerEvents:   'none',
  },
  topBar: {
    width:           '100%',
    display:         'flex',
    justifyContent:  'space-between',
    alignItems:      'center',
    padding:         '12px 20px',
    borderBottom:    '1px solid #0a2040',
    zIndex:          1,
  },
  topSection: {
    display:         'flex',
    flexDirection:   'column',
    minWidth:        '70px',
  },
  topLabel: {
    fontSize:        '9px',
    letterSpacing:   '2px',
    color:           '#3a6080',
    textTransform:   'uppercase',
  },
  topValue: {
    fontSize:        '22px',
    fontWeight:      'bold',
    color:           '#00e5ff',
  },
  gameTitle: {
    margin:          0,
    fontSize:        '13px',
    fontWeight:      'bold',
    letterSpacing:   '3px',
    color:           '#7ab8ff',
    textAlign:       'center',
  },
  progressTrack: {
    width:           'calc(100% - 40px)',
    height:          '4px',
    background:      '#0a2040',
    borderRadius:    '2px',
    margin:          '8px 20px',
    overflow:        'hidden',
  },
  progressFill: {
    height:          '100%',
    background:      'linear-gradient(90deg, #00e5ff, #7bed9f)',
    borderRadius:    '2px',
    transition:      'width 0.4s ease',
  },
  gameArea: {
    display:         'flex',
    alignItems:      'stretch',
    justifyContent:  'space-between',
    width:           'calc(100% - 20px)',
    flex:            1,
    position:        'relative',
    padding:         '8px 0',
    gap:             '0',
    zIndex:          1,
  },
  portColumn: {
    display:         'flex',
    flexDirection:   'column',
    gap:             '12px',
    alignItems:      'flex-start',
    padding:         '0 8px',
    width:           '110px',
    flexShrink:      0,
  },
  columnLabel: {
    margin:          '0 0 4px',
    fontSize:        '9px',
    letterSpacing:   '2px',
    color:           '#3a6080',
    textTransform:   'uppercase',
    textAlign:       'center',
    width:           '100%',
  },
  portRow: {
    display:         'flex',
    alignItems:      'center',
    gap:             '8px',
    width:           '100%',
    justifyContent:  'flex-start',
  },
  portLabel: {
    fontSize:        '12px',
    fontWeight:      'bold',
    color:           '#7ab8ff',
    letterSpacing:   '1px',
    minWidth:        '36px',
  },
  portCircle: {
    width:           '36px',
    height:          '36px',
    borderRadius:    '50%',
    border:          '2px solid',
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'center',
    fontSize:        '14px',
    color:           '#fff',
    fontWeight:      'bold',
    flexShrink:      0,
    userSelect:      'none',
    WebkitUserSelect: 'none',
  },
  svgContainer: {
    flex:            1,
    position:        'relative',
    minWidth:        0,
  },
  flashMsg: {
    position:        'absolute',
    top:             '50%',
    left:            '50%',
    transform:       'translate(-50%, -50%)',
    background:      'rgba(0,255,100,0.15)',
    border:          '1px solid #7bed9f',
    color:           '#7bed9f',
    padding:         '6px 14px',
    borderRadius:    '6px',
    fontSize:        '12px',
    fontWeight:      'bold',
    letterSpacing:   '1px',
    pointerEvents:   'none',
    animation:       'fadeOut 1.2s forwards',
  },
  hint: {
    margin:          '4px 0 12px',
    fontSize:        '10px',
    color:           '#3a6080',
    textAlign:       'center',
    letterSpacing:   '0.5px',
    zIndex:          1,
  },
  overlay: {
    position:        'absolute',
    inset:           0,
    background:      'rgba(1, 10, 24, 0.9)',
    display:         'flex',
    flexDirection:   'column',
    alignItems:      'center',
    justifyContent:  'center',
    gap:             '16px',
    zIndex:          20,
    backdropFilter:  'blur(4px)',
    borderRadius:    '16px',
    padding:         '24px',
  },
  overlayTitle: {
    margin:          0,
    fontSize:        '24px',
    fontWeight:      'bold',
    textAlign:       'center',
    letterSpacing:   '2px',
  },
  overlayText: {
    margin:          0,
    fontSize:        '14px',
    color:           '#8ab8d8',
    textAlign:       'center',
    lineHeight:      1.8,
  },
  startScreen: {
    display:         'flex',
    flexDirection:   'column',
    alignItems:      'center',
    justifyContent:  'center',
    gap:             '16px',
    flex:            1,
    padding:         '32px 24px',
    zIndex:          1,
    textAlign:       'center',
  },
  startIcon: {
    fontSize:        '48px',
    margin:          0,
  },
  startTitle: {
    margin:          0,
    fontSize:        '22px',
    fontWeight:      'bold',
    letterSpacing:   '3px',
    color:           '#00e5ff',
  },
  startDesc: {
    margin:          0,
    fontSize:        '13px',
    color:           '#7ab8ff',
    lineHeight:      1.7,
    maxWidth:        '340px',
  },
  bigBtn: {
    padding:         '12px 32px',
    fontSize:        '13px',
    fontWeight:      'bold',
    letterSpacing:   '2px',
    background:      '#00e5ff',
    color:           '#000d1a',
    border:          'none',
    borderRadius:    '8px',
    cursor:          'pointer',
    transition:      'transform 0.15s',
  },
};
