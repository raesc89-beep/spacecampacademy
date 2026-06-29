'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Star configuration ───────────────────────────────────────────────────────
const STARS = [
  { id: 0, label: 'α', color: '#ff5566', glow: '#ff0033', dark: '#6a0020', neon: '#ff8899' },
  { id: 1, label: 'β', color: '#4da6ff', glow: '#0088ff', dark: '#002a5c', neon: '#88ccff' },
  { id: 2, label: 'γ', color: '#44ff99', glow: '#00ee66', dark: '#003322', neon: '#88ffcc' },
  { id: 3, label: 'δ', color: '#ffd700', glow: '#ffaa00', dark: '#5a3e00', neon: '#ffe866' },
  { id: 4, label: 'ε', color: '#00e5ff', glow: '#00ccee', dark: '#003344', neon: '#66f0ff' },
  { id: 5, label: 'ζ', color: '#cc66ff', glow: '#9900ff', dark: '#330050', neon: '#dd99ff' },
];

const PAUSE_MS          = 250;  // gap between flashes
const FLASH_MS_START    = 600;  // initial flash duration
const FLASH_MS_DECREMENT = 30; // decrease per round
const FLASH_MS_MIN      = 150;  // minimum flash duration

// Pattern length for a given round number (1-indexed)
function patternLenForRound(round) {
  if (round <= 3)  return 3;
  if (round <= 6)  return 4;
  if (round <= 9)  return 5;
  if (round <= 12) return 6;
  return 7 + (round - 13); // 13→7, 14→8, 15→9 …
}

// Flash duration for a given round number (1-indexed)
function flashMsForRound(round) {
  return Math.max(FLASH_MS_START - (round - 1) * FLASH_MS_DECREMENT, FLASH_MS_MIN);
}

// Format seconds → MM:SS
function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// Generate a random sequence of given length
function generateSequence(len) {
  return Array.from({ length: len }, () => Math.floor(Math.random() * 6));
}

// ─── Hexagon path (flat-top, 60×60) ─────────────────────────────────────────
function hexPoints(cx, cy, r) {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 180) * (60 * i - 30);
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(' ');
}

// ─── Single hex star button ──────────────────────────────────────────────────
function StarButton({ star, isLit, isActive, onClick, shake }) {
  const size = 86;
  const r    = 36;
  const cx   = size / 2;
  const cy   = size / 2;

  return (
    <motion.div
      onClick={onClick}
      animate={shake ? { x: [0, -10, 10, -8, 8, -4, 4, 0] } : {}}
      transition={{ duration: 0.4 }}
      style={{ display: 'inline-block', cursor: isActive ? 'pointer' : 'default' }}
      whileHover={isActive ? { scale: 1.12, y: -4 } : {}}
      whileTap={isActive ? { scale: 0.92 } : {}}
    >
      <motion.svg
        width={size}
        height={size}
        animate={{
          scale: isLit ? 1.35 : 1,
          filter: isLit
            ? `drop-shadow(0 0 16px ${star.glow}) drop-shadow(0 0 32px ${star.color}) drop-shadow(0 0 48px ${star.neon})`
            : isActive
            ? `drop-shadow(0 0 6px ${star.dark}88) drop-shadow(0 0 2px ${star.color}44)`
            : `drop-shadow(0 0 3px ${star.dark})`,
        }}
        transition={{ duration: 0.18 }}
      >
        {/* Outer ring (lit only) */}
        {isLit && (
          <motion.polygon
            points={hexPoints(cx, cy, r + 8)}
            fill="none"
            stroke={star.neon}
            strokeWidth={1.5}
            opacity={0.5}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
          />
        )}
        {/* Main hex body */}
        <polygon
          points={hexPoints(cx, cy, r)}
          fill={isLit ? star.color : star.dark}
          stroke={isLit ? star.neon : star.color}
          strokeWidth={isLit ? 2.5 : 1.5}
        />
        {/* Inner hex shine */}
        <polygon
          points={hexPoints(cx, cy - 2, r * 0.55)}
          fill={isLit ? `${star.neon}44` : `${star.color}18`}
        />
        {/* Label */}
        <text
          x={cx}
          y={cy + 6}
          textAnchor="middle"
          fill={isLit ? '#fff' : star.color}
          fontSize={22}
          fontFamily="Georgia, serif"
          fontWeight="bold"
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          {star.label}
        </text>
      </motion.svg>
    </motion.div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function AstrolabioQuantico({ onComplete }) {
  // game phase: 'idle' | 'playing' | 'input' | 'lost'
  const [phase,          setPhase]          = useState('idle');
  const [sequence,       setSequence]       = useState([]);   // the current sequence to memorize
  const [inputSeq,       setInputSeq]       = useState([]);   // player's inputs this round
  const [litStar,        setLitStar]        = useState(null); // which star is currently highlighted
  const [completedRounds, setCompletedRounds] = useState(0);  // rounds successfully completed
  const [currentRound,   setCurrentRound]   = useState(1);    // current round number (1-indexed)
  const [elapsedTime,    setElapsedTime]    = useState(0);    // stopwatch in seconds
  const [score,          setScore]          = useState(0);    // running score
  const [shakeStar,      setShakeStar]      = useState(null);
  const [statusMsg,      setStatusMsg]      = useState('');
  const [flashMs,        setFlashMs]        = useState(FLASH_MS_START);

  const stopwatchRef = useRef(null);
  const playbackRef  = useRef(null);
  const flashMsRef   = useRef(FLASH_MS_START);
  const elapsedRef   = useRef(0);
  const completedRef = useRef(0);

  // Keep refs in sync
  useEffect(() => { flashMsRef.current = flashMs; }, [flashMs]);
  useEffect(() => { elapsedRef.current = elapsedTime; }, [elapsedTime]);
  useEffect(() => { completedRef.current = completedRounds; }, [completedRounds]);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const clearTimers = useCallback(() => {
    clearInterval(stopwatchRef.current);
    clearTimeout(playbackRef.current);
  }, []);

  // Calculate score from rounds and elapsed time
  const calcScore = useCallback((rounds, seconds) => {
    return (rounds * 100) + (seconds * 2);
  }, []);

  // Build and play back a sequence
  const playSequence = useCallback((seq) => {
    setPhase('playing');
    setStatusMsg('Observa…');
    setInputSeq([]);

    let i = 0;
    const step = () => {
      if (i < seq.length) {
        const starId = seq[i];
        setLitStar(starId);
        const duration = flashMsRef.current;
        playbackRef.current = setTimeout(() => {
          setLitStar(null);
          i++;
          playbackRef.current = setTimeout(step, PAUSE_MS);
        }, duration);
      } else {
        // done playing — let player input
        setPhase('input');
        setStatusMsg('¡Tu turno! Repite la secuencia');
      }
    };
    playbackRef.current = setTimeout(step, 400);
  }, []);

  // Start a brand-new game
  const startGame = useCallback(() => {
    clearTimers();

    // Reset everything
    const round = 1;
    const len = patternLenForRound(round);
    const speed = flashMsForRound(round);
    const firstSeq = generateSequence(len);

    setFlashMs(speed);
    flashMsRef.current = speed;
    setSequence(firstSeq);
    setCompletedRounds(0);
    completedRef.current = 0;
    setCurrentRound(round);
    setElapsedTime(0);
    elapsedRef.current = 0;
    setScore(0);

    // Start stopwatch (counts UP)
    stopwatchRef.current = setInterval(() => {
      setElapsedTime(t => {
        const newT = t + 1;
        elapsedRef.current = newT;
        // Update score in real-time
        setScore(calcScore(completedRef.current, newT));
        return newT;
      });
    }, 1000);

    playSequence(firstSeq);
  }, [clearTimers, playSequence, calcScore]);

  // Handle player clicking a star
  const handleStarClick = useCallback((starId) => {
    if (phase !== 'input') return;

    const newInput = [...inputSeq, starId];
    const pos      = newInput.length - 1;

    if (newInput[pos] !== sequence[pos]) {
      // WRONG — game over!
      clearTimers();
      setShakeStar(starId);
      setPhase('lost');
      // Final score uses current completedRounds and elapsed time
      const finalScore = calcScore(completedRef.current, elapsedRef.current);
      setScore(finalScore);
      setStatusMsg('⚠ Error — Fin de la Misión');
      setTimeout(() => setShakeStar(null), 800);
      return;
    }

    setInputSeq(newInput);

    if (newInput.length === sequence.length) {
      // Completed this round!
      const newCompleted = completedRounds + 1;
      setCompletedRounds(newCompleted);
      completedRef.current = newCompleted;

      // Update score immediately
      setScore(calcScore(newCompleted, elapsedRef.current));

      // Prepare next round
      const nextRound = currentRound + 1;
      const nextLen = patternLenForRound(nextRound);
      const nextSpeed = flashMsForRound(nextRound);

      setCurrentRound(nextRound);
      setFlashMs(nextSpeed);
      flashMsRef.current = nextSpeed;

      setStatusMsg(`¡Perfecto! Ronda ${nextRound} — ${nextLen} señales`);

      // Generate a completely new random sequence
      const freshSeq = generateSequence(nextLen);
      setSequence(freshSeq);
      setTimeout(() => playSequence(freshSeq), 800);
    }
  }, [phase, inputSeq, sequence, completedRounds, currentRound, clearTimers, playSequence, calcScore]);

  // Cleanup on unmount
  useEffect(() => () => clearTimers(), [clearTimers]);

  // ── Dynamic subtitle ─────────────────────────────────────────────────────────
  const patternLen = patternLenForRound(currentRound);
  const subtitleText = phase === 'idle'
    ? '✨ MEMORIZA Y REPITE LA SECUENCIA ✨'
    : `RONDA ${currentRound} · ${patternLen} SEÑALES · VEL: ${flashMs}ms`;

  // ── Layout ──────────────────────────────────────────────────────────────────
  return (
    <div style={styles.wrapper}>
      {/* Animated nebula background layers */}
      <div style={styles.nebula1} />
      <div style={styles.nebula2} />
      {/* Starfield dots */}
      <div style={styles.starfield} />
      {/* Scanline overlay */}
      <div style={styles.scanlines} />

      {/* ── Top bar ── */}
      <div style={styles.topBar}>
        <div style={styles.topItem}>
          <span style={styles.topLabel}>PUNTUACIÓN</span>
          <span style={{ ...styles.topValue, color: '#ffd700', textShadow: '0 0 12px #ffd700' }}>{score}</span>
        </div>
        <div style={{ ...styles.topItem, alignItems: 'center', gap: '6px' }}>
          <span style={styles.gameTitle}>COSMOS PIANO</span>
          {completedRounds > 0 && (
            <motion.span
              style={styles.streakBadge}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: 2, duration: 0.3 }}
            >
              {'★'.repeat(Math.min(completedRounds, 10))}
            </motion.span>
          )}
        </div>
        <div style={{ ...styles.topItem, alignItems: 'flex-end' }}>
          <span style={styles.topLabel}>TIEMPO</span>
          <span style={{ ...styles.topValue, color: '#00e5ff', textShadow: '0 0 12px #00e5ff' }}>
            {formatTime(elapsedTime)}
          </span>
        </div>
      </div>

      {/* ── Instruction header ── */}
      <div style={styles.header}>
        <AnimatePresence mode="wait">
          <motion.p
            key={subtitleText}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={styles.subtitle}
          >
            {subtitleText}
          </motion.p>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.p
            key={statusMsg}
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              ...styles.statusMsg,
              color: statusMsg.includes('Error') ? '#ff6688' :
                     statusMsg.includes('Perfecto') ? '#44ff99' :
                     statusMsg.includes('turno') ? '#ffd700' : '#a0c8ff'
            }}
          >
            {statusMsg}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* ── RONDA / PATRÓN indicator ── */}
      {phase !== 'idle' && phase !== 'lost' && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRound}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={styles.nivelBadge}
          >
            RONDA {currentRound} · PATRÓN: {patternLen}
          </motion.div>
        </AnimatePresence>
      )}

      {/* ── Round progress dots ── */}
      {phase !== 'idle' && phase !== 'lost' && (
        <div style={styles.roundRow}>
          {Array.from({ length: patternLen }, (_, i) => (
            <div
              key={i}
              style={{
                ...styles.roundDot,
                background: i < inputSeq.length ? '#44ff99' :
                             i < sequence.length ? '#00e5ff' : '#1a2a3a',
                boxShadow: i < inputSeq.length ? '0 0 8px #44ff99' :
                            i < sequence.length ? '0 0 8px #00e5ff' : 'none',
              }}
            />
          ))}
        </div>
      )}

      {/* ── Star grid ── */}
      <div style={styles.starGrid}>
        {STARS.map(star => (
          <StarButton
            key={star.id}
            star={star}
            isLit={litStar === star.id}
            isActive={phase === 'input'}
            shake={shakeStar === star.id}
            onClick={() => handleStarClick(star.id)}
          />
        ))}
      </div>

      {/* ── Idle / start screen ── */}
      {phase === 'idle' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={styles.overlay}
        >
          <p style={styles.overlayTitle}>🌌 COSMOS PIANO</p>
          <p style={styles.overlayText}>
            Memoriza y repite. La secuencia cambia cada ronda.<br />
            La dificultad aumenta progresivamente. ¡Sin límite de tiempo!<br />
            <span style={{ color: '#ffd700', fontSize: '12px' }}>
              Un error y la misión termina
            </span>
          </p>
          <button style={styles.bigBtn} onClick={startGame}>
            INICIAR SISTEMA
          </button>
        </motion.div>
      )}

      {/* ── Lost screen (game over on mistake) ── */}
      {phase === 'lost' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          style={styles.overlay}
        >
          <p style={{ ...styles.overlayTitle, color: '#ff4d4d' }}>⚠ FIN DE MISIÓN</p>
          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <span style={styles.statLabel}>RONDAS</span>
              <span style={{ ...styles.statValue, color: '#00e5ff' }}>{completedRounds}</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statLabel}>TIEMPO</span>
              <span style={{ ...styles.statValue, color: '#cc66ff' }}>{formatTime(elapsedTime)}</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statLabel}>MAX PATRÓN</span>
              <span style={{ ...styles.statValue, color: '#44ff99' }}>{patternLenForRound(currentRound)}</span>
            </div>
          </div>
          <p style={styles.overlayText}>
            Puntuación final: <strong style={{ color: '#ffd700', fontSize: '22px' }}>{score}</strong>
          </p>
          <p style={{ ...styles.overlayText, fontSize: '11px', color: '#5a7a9a' }}>
            ({completedRounds} × 100) + ({elapsedTime}s × 2) = {score}
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button style={{ ...styles.bigBtn, background: '#ff4d4d' }} onClick={startGame}>
              REINTENTAR
            </button>
            <button
              style={{ ...styles.bigBtn, background: '#ffd700', color: '#000' }}
              onClick={() => onComplete && onComplete(score)}
            >
              CONTINUAR
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = {
  wrapper: {
    position:        'relative',
    width:           '100%',
    minHeight:       '580px',
    background:      'linear-gradient(160deg, #010812 0%, #020f20 40%, #040a1c 70%, #08061a 100%)',
    borderRadius:    '20px',
    overflow:        'hidden',
    display:         'flex',
    flexDirection:   'column',
    alignItems:      'center',
    fontFamily:      "'Courier New', monospace",
    color:           '#c0d8ff',
    userSelect:      'none',
    boxShadow:       '0 0 60px rgba(0,80,200,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
    border:          '1px solid rgba(0,180,255,0.15)',
  },
  nebula1: {
    position:        'absolute',
    inset:           0,
    background:      'radial-gradient(ellipse 70% 50% at 20% 60%, rgba(80,0,180,0.18) 0%, transparent 70%)',
    pointerEvents:   'none',
    animation:       'none',
  },
  nebula2: {
    position:        'absolute',
    inset:           0,
    background:      'radial-gradient(ellipse 60% 45% at 80% 30%, rgba(0,80,160,0.16) 0%, transparent 65%)',
    pointerEvents:   'none',
  },
  scanlines: {
    position:        'absolute',
    inset:           0,
    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)',
    pointerEvents:   'none',
    zIndex:          0,
  },
  starfield: {
    position:        'absolute',
    inset:           0,
    backgroundImage: `
      radial-gradient(1px 1px at 8% 15%, #ffffffaa, transparent),
      radial-gradient(1.5px 1.5px at 22% 72%, #ffffff88, transparent),
      radial-gradient(1px 1px at 38% 8%, #ffffffbb, transparent),
      radial-gradient(1px 1px at 52% 55%, #ffffff66, transparent),
      radial-gradient(2px 2px at 65% 82%, #ffffff44, transparent),
      radial-gradient(1px 1px at 78% 18%, #ffffffcc, transparent),
      radial-gradient(1px 1px at 88% 48%, #ffffff88, transparent),
      radial-gradient(1.5px 1.5px at 14% 88%, #ffffff55, transparent),
      radial-gradient(1px 1px at 44% 34%, #ffffffaa, transparent),
      radial-gradient(1px 1px at 92% 70%, #ffffff77, transparent),
      radial-gradient(1px 1px at 5% 50%, #ffffff66, transparent),
      radial-gradient(1px 1px at 72% 40%, #ffffff99, transparent)
    `,
    pointerEvents:   'none',
    zIndex:          0,
  },
  topBar: {
    width:           '100%',
    display:         'flex',
    justifyContent:  'space-between',
    alignItems:      'center',
    padding:         '16px 24px 10px',
    borderBottom:    '1px solid rgba(0,150,255,0.2)',
    zIndex:          1,
    background:      'rgba(0,0,0,0.3)',
    backdropFilter:  'blur(8px)',
  },
  topItem: {
    display:         'flex',
    flexDirection:   'column',
    gap:             '3px',
    minWidth:        '90px',
  },
  topLabel: {
    fontSize:        '9px',
    letterSpacing:   '2.5px',
    color:           '#3a5a8a',
    textTransform:   'uppercase',
  },
  topValue: {
    fontSize:        '26px',
    fontWeight:      'bold',
    color:           '#00e5ff',
    lineHeight:      1,
    fontFamily:      'monospace',
  },
  gameTitle: {
    fontSize:        '15px',
    fontWeight:      'bold',
    letterSpacing:   '4px',
    background:      'linear-gradient(90deg, #00e5ff, #cc66ff, #ffd700)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  streakBadge: {
    fontSize:        '14px',
    color:           '#ffd700',
    marginTop:       '2px',
    letterSpacing:   '3px',
    textShadow:      '0 0 10px #ffd700',
  },
  header: {
    textAlign:       'center',
    padding:         '12px 16px 6px',
    zIndex:          1,
  },
  subtitle: {
    margin:          0,
    fontSize:        '11px',
    letterSpacing:   '2px',
    color:           '#3a6a9a',
    textTransform:   'uppercase',
  },
  statusMsg: {
    margin:          '8px 0 0',
    fontSize:        '15px',
    fontWeight:      'bold',
    minHeight:       '22px',
    textShadow:      '0 0 10px currentColor',
  },
  nivelBadge: {
    zIndex:          1,
    fontSize:        '11px',
    fontWeight:      'bold',
    letterSpacing:   '3px',
    color:           '#00e5ff',
    textShadow:      '0 0 12px #00e5ff88',
    background:      'rgba(0,229,255,0.08)',
    border:          '1px solid rgba(0,229,255,0.25)',
    borderRadius:    '20px',
    padding:         '4px 18px',
    marginTop:       '2px',
    textTransform:   'uppercase',
  },
  roundRow: {
    display:         'flex',
    gap:             '8px',
    margin:          '10px 0 4px',
    zIndex:          1,
    flexWrap:        'wrap',
    justifyContent:  'center',
    maxWidth:        '320px',
  },
  roundDot: {
    width:           '10px',
    height:          '10px',
    borderRadius:    '50%',
    transition:      'background 0.3s, box-shadow 0.3s',
    border:          '1px solid rgba(0,150,255,0.3)',
  },
  starGrid: {
    display:         'grid',
    gridTemplateColumns: 'repeat(3, 96px)',
    gridTemplateRows:    'repeat(2, 96px)',
    gap:             '16px',
    placeItems:      'center',
    margin:          '18px 0 8px',
    zIndex:          1,
  },
  overlay: {
    position:        'absolute',
    inset:           0,
    background:      'rgba(1, 6, 18, 0.92)',
    display:         'flex',
    flexDirection:   'column',
    alignItems:      'center',
    justifyContent:  'center',
    gap:             '18px',
    zIndex:          10,
    backdropFilter:  'blur(4px)',
    borderRadius:    '16px',
    padding:         '24px',
  },
  overlayTitle: {
    margin:          0,
    fontSize:        '26px',
    fontWeight:      'bold',
    color:           '#00e5ff',
    textAlign:       'center',
    letterSpacing:   '2px',
  },
  overlayText: {
    margin:          0,
    fontSize:        '14px',
    color:           '#8ab8d8',
    textAlign:       'center',
    lineHeight:      1.7,
  },
  bigBtn: {
    padding:         '12px 32px',
    fontSize:        '14px',
    fontWeight:      'bold',
    letterSpacing:   '2px',
    background:      '#00e5ff',
    color:           '#000d1a',
    border:          'none',
    borderRadius:    '8px',
    cursor:          'pointer',
    transition:      'transform 0.15s, opacity 0.15s',
  },
  statsGrid: {
    display:         'flex',
    gap:             '24px',
    justifyContent:  'center',
    flexWrap:        'wrap',
  },
  statItem: {
    display:         'flex',
    flexDirection:   'column',
    alignItems:      'center',
    gap:             '4px',
  },
  statLabel: {
    fontSize:        '9px',
    letterSpacing:   '2px',
    color:           '#3a5a8a',
    textTransform:   'uppercase',
  },
  statValue: {
    fontSize:        '28px',
    fontWeight:      'bold',
    fontFamily:      'monospace',
    lineHeight:      1,
  },
};
