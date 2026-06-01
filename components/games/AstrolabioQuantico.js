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

const WIN_ROUNDS = 3;       // must complete full-6 sequence this many times to win
const MAX_SEQ   = 6;        // maximum sequence length
const GAME_TIME = 60;       // seconds
const FLASH_MS  = 600;      // how long each star is lit during playback
const PAUSE_MS  = 250;      // gap between flashes

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
  // game phase: 'idle' | 'playing' | 'input' | 'wrong' | 'won' | 'lost'
  const [phase,        setPhase]        = useState('idle');
  const [sequence,     setSequence]     = useState([]);   // the current sequence to memorize
  const [inputSeq,     setInputSeq]     = useState([]);   // player's inputs this round
  const [litStar,      setLitStar]      = useState(null); // which star is currently highlighted
  const [score,        setScore]        = useState(0);    // max sequence length reached
  const [timeLeft,     setTimeLeft]     = useState(GAME_TIME);
  const [winStreak,    setWinStreak]    = useState(0);    // how many full-6 completions
  const [shakeStar,    setShakeStar]    = useState(null);
  const [statusMsg,    setStatusMsg]    = useState('');

  const timerRef    = useRef(null);
  const playbackRef = useRef(null);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const clearTimers = useCallback(() => {
    clearInterval(timerRef.current);
    clearTimeout(playbackRef.current);
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
        playbackRef.current = setTimeout(() => {
          setLitStar(null);
          i++;
          playbackRef.current = setTimeout(step, PAUSE_MS);
        }, FLASH_MS);
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
    const firstSeq = [Math.floor(Math.random() * 6)];
    setSequence(firstSeq);
    setScore(0);
    setWinStreak(0);
    setTimeLeft(GAME_TIME);

    // countdown timer
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setPhase('lost');
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    playSequence(firstSeq);
  }, [clearTimers, playSequence]);

  // Extend sequence by one random star
  const nextRound = useCallback((currentSeq) => {
    const nextSeq = [...currentSeq, Math.floor(Math.random() * 6)];
    setSequence(nextSeq);
    setScore(s => Math.max(s, nextSeq.length));
    setTimeout(() => playSequence(nextSeq), 700);
  }, [playSequence]);

  // Handle player clicking a star
  const handleStarClick = useCallback((starId) => {
    if (phase !== 'input') return;

    const newInput = [...inputSeq, starId];
    const pos      = newInput.length - 1;

    if (newInput[pos] !== sequence[pos]) {
      // Wrong!
      setShakeStar(starId);
      setStatusMsg('⚠ Error de Sistema — reiniciando secuencia…');
      setPhase('wrong');
      setTimeout(() => {
        setShakeStar(null);
        // Replay same sequence
        playSequence(sequence);
      }, 1200);
      return;
    }

    setInputSeq(newInput);

    if (newInput.length === sequence.length) {
      // Completed this sequence
      if (sequence.length === MAX_SEQ) {
        const newStreak = winStreak + 1;
        setWinStreak(newStreak);
        if (newStreak >= WIN_ROUNDS) {
          // WIN!
          clearTimers();
          setPhase('won');
          setStatusMsg('¡Sistema Online! ¡Misión Completa!');
          return;
        }
        // reset to length-1 sequence again
        setStatusMsg('¡Perfecto! Iniciando ciclo…');
        const freshSeq = [Math.floor(Math.random() * 6)];
        setSequence(freshSeq);
        setTimeout(() => playSequence(freshSeq), 800);
      } else {
        // Go to next (longer) sequence
        setStatusMsg('¡Correcto! Añadiendo señal…');
        nextRound(sequence);
      }
    }
  }, [phase, inputSeq, sequence, winStreak, clearTimers, playSequence, nextRound]);

  // Cleanup on unmount
  useEffect(() => () => clearTimers(), [clearTimers]);

  // ── Timer color ─────────────────────────────────────────────────────────────
  const timerColor = timeLeft > 20 ? '#00e5ff' : timeLeft > 10 ? '#ffd700' : '#ff4d4d';

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
          {winStreak > 0 && (
            <motion.span
              style={styles.streakBadge}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: 2, duration: 0.3 }}
            >
              {'★'.repeat(winStreak)}
            </motion.span>
          )}
        </div>
        <div style={{ ...styles.topItem, alignItems: 'flex-end' }}>
          <span style={styles.topLabel}>TIEMPO</span>
          <span style={{ ...styles.topValue, color: timerColor, textShadow: `0 0 12px ${timerColor}` }}>{timeLeft}s</span>
        </div>
      </div>

      {/* ── Instruction header ── */}
      <div style={styles.header}>
        <p style={styles.subtitle}>
          ✨ Memoriza la secuencia y repítela ✨
        </p>
        <AnimatePresence mode="wait">
          <motion.p
            key={statusMsg}
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              ...styles.statusMsg,
              color: statusMsg.includes('Error') ? '#ff6688' :
                     statusMsg.includes('Correcto') || statusMsg.includes('Perfecto') ? '#44ff99' :
                     statusMsg.includes('turno') ? '#ffd700' : '#a0c8ff'
            }}
          >
            {statusMsg}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* ── Round indicator ── */}
      {phase !== 'idle' && phase !== 'won' && phase !== 'lost' && (
        <div style={styles.roundRow}>
          {Array.from({ length: MAX_SEQ }, (_, i) => (
            <div
              key={i}
              style={{
                ...styles.roundDot,
                background: i < sequence.length ? '#00e5ff' : '#1a2a3a',
                boxShadow: i < sequence.length ? '0 0 8px #00e5ff' : 'none',
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
            Las estrellas parpadearán en secuencia.<br />
            ¡Memoriza y repite el patrón!<br />
            Completa 3 rondas perfectas de 6 para ganar.
          </p>
          <button style={styles.bigBtn} onClick={startGame}>
            INICIAR SISTEMA
          </button>
        </motion.div>
      )}

      {/* ── Win screen ── */}
      {phase === 'won' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          style={styles.overlay}
        >
          <p style={{ ...styles.overlayTitle, color: '#ffd700' }}>🏆 ¡MISIÓN COMPLETA!</p>
          <p style={styles.overlayText}>
            Secuencia maestra decodificada.<br />
            Puntuación final: <strong style={{ color: '#00e5ff' }}>{score}</strong>
          </p>
          <button style={{ ...styles.bigBtn, background: '#ffd700', color: '#000' }}
            onClick={() => onComplete && onComplete(score)}>
            CONTINUAR MISIÓN
          </button>
        </motion.div>
      )}

      {/* ── Lost screen ── */}
      {phase === 'lost' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={styles.overlay}
        >
          <p style={{ ...styles.overlayTitle, color: '#ff4d4d' }}>⏱ TIEMPO AGOTADO</p>
          <p style={styles.overlayText}>
            Mejor puntuación: <strong style={{ color: '#00e5ff' }}>{score}</strong>
          </p>
          <button style={{ ...styles.bigBtn, background: '#ff4d4d' }} onClick={startGame}>
            REINTENTAR
          </button>
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
  roundRow: {
    display:         'flex',
    gap:             '12px',
    margin:          '10px 0 6px',
    zIndex:          1,
  },
  roundDot: {
    width:           '14px',
    height:          '14px',
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
};
