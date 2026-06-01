'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Star configuration ───────────────────────────────────────────────────────
const STARS = [
  { id: 0, label: 'α', color: '#ff4d4d', glow: '#ff0000', dark: '#7a0000' },
  { id: 1, label: 'β', color: '#4da6ff', glow: '#0088ff', dark: '#003d7a' },
  { id: 2, label: 'γ', color: '#4dff88', glow: '#00ff55', dark: '#007a2a' },
  { id: 3, label: 'δ', color: '#ffd700', glow: '#ffaa00', dark: '#7a5500' },
  { id: 4, label: 'ε', color: '#00e5ff', glow: '#00ccee', dark: '#005566' },
  { id: 5, label: 'ζ', color: '#cc66ff', glow: '#9900ff', dark: '#440077' },
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
  const size = 70;
  const r    = 32;
  const cx   = size / 2;
  const cy   = size / 2;

  return (
    <motion.div
      onClick={onClick}
      animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : {}}
      transition={{ duration: 0.35 }}
      style={{ display: 'inline-block', cursor: isActive ? 'pointer' : 'default' }}
      whileHover={isActive ? { scale: 1.08 } : {}}
      whileTap={isActive ? { scale: 0.95 } : {}}
    >
      <motion.svg
        width={size}
        height={size}
        animate={{
          scale: isLit ? 1.4 : 1,
          filter: isLit
            ? `drop-shadow(0 0 14px ${star.glow}) drop-shadow(0 0 28px ${star.color})`
            : `drop-shadow(0 0 4px ${star.dark})`,
        }}
        transition={{ duration: 0.15 }}
      >
        <polygon
          points={hexPoints(cx, cy, r)}
          fill={isLit ? star.color : star.dark}
          stroke={star.color}
          strokeWidth={isLit ? 2.5 : 1.5}
        />
        <text
          x={cx}
          y={cy + 5}
          textAnchor="middle"
          fill={isLit ? '#fff' : star.color}
          fontSize={18}
          fontFamily="monospace"
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
      {/* Starfield dots via CSS repeating gradient */}
      <div style={styles.starfield} />

      {/* ── Top bar ── */}
      <div style={styles.topBar}>
        <div style={styles.topItem}>
          <span style={styles.topLabel}>PUNTUACIÓN</span>
          <span style={styles.topValue}>{score}</span>
        </div>
        <div style={{ ...styles.topItem, alignItems: 'center' }}>
          <span style={styles.gameTitle}>COSMOS PIANO</span>
          {winStreak > 0 && (
            <span style={styles.streakBadge}>{'★'.repeat(winStreak)}</span>
          )}
        </div>
        <div style={{ ...styles.topItem, alignItems: 'flex-end' }}>
          <span style={styles.topLabel}>TIEMPO</span>
          <span style={{ ...styles.topValue, color: timerColor }}>{timeLeft}s</span>
        </div>
      </div>

      {/* ── Instruction header ── */}
      <div style={styles.header}>
        <p style={styles.subtitle}>
          Memoriza la secuencia y repítela
        </p>
        <AnimatePresence mode="wait">
          <motion.p
            key={statusMsg}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={styles.statusMsg}
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
    minHeight:       '520px',
    background:      'linear-gradient(160deg, #020d1a 0%, #041528 50%, #060e24 100%)',
    borderRadius:    '16px',
    overflow:        'hidden',
    display:         'flex',
    flexDirection:   'column',
    alignItems:      'center',
    fontFamily:      "'Courier New', monospace",
    color:           '#c0d8ff',
    userSelect:      'none',
  },
  starfield: {
    position:        'absolute',
    inset:           0,
    backgroundImage: `
      radial-gradient(1px 1px at 10% 20%, #ffffff55, transparent),
      radial-gradient(1px 1px at 30% 60%, #ffffff33, transparent),
      radial-gradient(1px 1px at 55% 15%, #ffffff44, transparent),
      radial-gradient(1px 1px at 70% 80%, #ffffff22, transparent),
      radial-gradient(1px 1px at 85% 40%, #ffffff55, transparent),
      radial-gradient(1px 1px at 20% 90%, #ffffff33, transparent),
      radial-gradient(1.5px 1.5px at 45% 50%, #ffffff22, transparent),
      radial-gradient(1px 1px at 90% 10%, #ffffff44, transparent)
    `,
    pointerEvents:   'none',
  },
  topBar: {
    width:           '100%',
    display:         'flex',
    justifyContent:  'space-between',
    alignItems:      'flex-start',
    padding:         '14px 20px 8px',
    borderBottom:    '1px solid #0a2040',
    zIndex:          1,
  },
  topItem: {
    display:         'flex',
    flexDirection:   'column',
    gap:             '2px',
    minWidth:        '80px',
  },
  topLabel: {
    fontSize:        '9px',
    letterSpacing:   '2px',
    color:           '#4a6a8a',
    textTransform:   'uppercase',
  },
  topValue: {
    fontSize:        '22px',
    fontWeight:      'bold',
    color:           '#00e5ff',
    lineHeight:      1,
  },
  gameTitle: {
    fontSize:        '14px',
    fontWeight:      'bold',
    letterSpacing:   '3px',
    color:           '#7ab8ff',
  },
  streakBadge: {
    fontSize:        '12px',
    color:           '#ffd700',
    marginTop:       '2px',
    letterSpacing:   '2px',
  },
  header: {
    textAlign:       'center',
    padding:         '10px 16px 4px',
    zIndex:          1,
  },
  subtitle: {
    margin:          0,
    fontSize:        '11px',
    letterSpacing:   '1.5px',
    color:           '#4a7aaa',
    textTransform:   'uppercase',
  },
  statusMsg: {
    margin:          '6px 0 0',
    fontSize:        '13px',
    color:           '#a0c8ff',
    minHeight:       '18px',
  },
  roundRow: {
    display:         'flex',
    gap:             '10px',
    margin:          '8px 0 4px',
    zIndex:          1,
  },
  roundDot: {
    width:           '12px',
    height:          '12px',
    borderRadius:    '50%',
    transition:      'background 0.3s, box-shadow 0.3s',
  },
  starGrid: {
    display:         'grid',
    gridTemplateColumns: 'repeat(3, 80px)',
    gridTemplateRows:    'repeat(2, 80px)',
    gap:             '12px',
    placeItems:      'center',
    margin:          '16px 0',
    zIndex:          1,
  },
  overlay: {
    position:        'absolute',
    inset:           0,
    background:      'rgba(2, 10, 24, 0.88)',
    display:         'flex',
    flexDirection:   'column',
    alignItems:      'center',
    justifyContent:  'center',
    gap:             '16px',
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
