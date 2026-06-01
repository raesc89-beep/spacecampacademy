'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

// ─── Game constants ───────────────────────────────────────────────────────────
const CANVAS_W    = 480;
const CANVAS_H    = 320;
const PROBE_X     = 90;          // fixed horizontal position of probe
const GRAVITY     = 0.35;        // pixels/frame² pulling down (full)
const GRAVITY_HOLD = 0.06;       // gentle gravity while holding (float mode)
const BOOST_VY    = -5.5;        // upward velocity on single tap (reduced slightly for balance)
const WALL_SPEED  = 2.8;         // pixels/frame walls scroll left
const WALL_W      = 22;          // wall thickness
const WALL_GAP_START = 130;      // initial gap size (px)
const WALL_GAP_MIN   = 70;       // minimum gap size
const GAP_SHRINK     = 5;        // gap shrinks by this per successful pass
const WIN_PASSES  = 10;          // passes needed to win
const PROBE_R     = 10;          // collision radius of probe

// ─── Main component ───────────────────────────────────────────────────────────
export default function AsistenciaGravitacional({ onComplete }) {
  const canvasRef     = useRef(null);
  const gameStateRef  = useRef(null); // holds mutable game state
  const rafRef        = useRef(null);

  // React state: only for screen switching (start / playing / gameover / won)
  const [screen, setScreen] = useState('start'); // 'start' | 'playing' | 'gameover' | 'won'
  const [finalScore, setFinalScore] = useState(0);

  // ── Initialize game state ─────────────────────────────────────────────────
  const initState = useCallback(() => {
    const gapSize = WALL_GAP_START;
    return {
      probeY:    CANVAS_H / 2,
      probeVY:   0,
      isHeld:    false,           // true while mouse/touch is held down
      walls:     [makeWall(CANVAS_W + 60, gapSize)],
      passes:    0,
      gapSize,
      score:     0,
      ticks:     0,
      alive:     true,
      stars:     makeStars(80),
    };
  }, []);

  // ── Helpers ───────────────────────────────────────────────────────────────
  function makeWall(x, gapSize) {
    const gapTop = 30 + Math.random() * (CANVAS_H - gapSize - 60);
    return { x, gapTop, gapBottom: gapTop + gapSize, passed: false };
  }

  function makeStars(n) {
    return Array.from({ length: n }, () => ({
      x:  Math.random() * CANVAS_W,
      y:  Math.random() * CANVAS_H,
      r:  Math.random() * 1.5 + 0.3,
      a:  Math.random() * 0.6 + 0.2,
      sp: Math.random() * 0.4 + 0.1, // parallax speed
    }));
  }

  // ── Game loop ─────────────────────────────────────────────────────────────
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const gs  = gameStateRef.current;
    if (!gs || !gs.alive) return;

    gs.ticks++;

    // ── Physics ──────────────────────────────────────────────────────────
    const currentGravity = gs.isHeld ? GRAVITY_HOLD : GRAVITY;
    gs.probeVY += currentGravity;
    // Clamp fall speed when holding so it floats gently
    if (gs.isHeld && gs.probeVY > 1.5) gs.probeVY = 1.5;
    gs.probeY  += gs.probeVY;

    // ── Move stars (parallax) ─────────────────────────────────────────────
    gs.stars.forEach(s => {
      s.x -= s.sp;
      if (s.x < 0) s.x = CANVAS_W;
    });

    // ── Move walls ────────────────────────────────────────────────────────
    gs.walls.forEach(w => { w.x -= WALL_SPEED; });

    // Spawn new wall when last one is far enough in
    const last = gs.walls[gs.walls.length - 1];
    if (last.x < CANVAS_W - 180) {
      gs.walls.push(makeWall(CANVAS_W + 40, gs.gapSize));
    }

    // Remove walls that left screen
    gs.walls = gs.walls.filter(w => w.x + WALL_W > -10);

    // ── Collision & pass detection ────────────────────────────────────────
    const probeTop    = gs.probeY - PROBE_R;
    const probeBottom = gs.probeY + PROBE_R;

    // Top/bottom boundary
    if (probeTop <= 0 || probeBottom >= CANVAS_H) {
      endGame(gs, false);
      return;
    }

    for (const w of gs.walls) {
      const probeRight = PROBE_X + PROBE_R;
      const probeLeft  = PROBE_X - PROBE_R;

      // Overlapping horizontally?
      if (probeRight > w.x && probeLeft < w.x + WALL_W) {
        // Hit top block or bottom block?
        if (probeTop < w.gapTop || probeBottom > w.gapBottom) {
          endGame(gs, false);
          return;
        }
      }

      // Passed through gap
      if (!w.passed && w.x + WALL_W < PROBE_X - PROBE_R) {
        w.passed    = true;
        gs.passes++;
        gs.score   += 10;
        gs.gapSize  = Math.max(WALL_GAP_MIN, gs.gapSize - GAP_SHRINK);

        if (gs.passes >= WIN_PASSES) {
          endGame(gs, true);
          return;
        }
      }
    }

    // ── Draw ─────────────────────────────────────────────────────────────
    drawFrame(ctx, gs);

    rafRef.current = requestAnimationFrame(gameLoop);
  }, []); // eslint-disable-line

  function endGame(gs, didWin) {
    gs.alive = false;
    cancelAnimationFrame(rafRef.current);
    setFinalScore(gs.score);
    if (didWin) {
      setScreen('won');
    } else {
      setScreen('gameover');
    }
  }

  // ── Draw everything ───────────────────────────────────────────────────────
  function drawFrame(ctx, gs) {
    // Background
    const bg = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
    bg.addColorStop(0,   '#010a18');
    bg.addColorStop(1,   '#020d22');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Stars
    gs.stars.forEach(s => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,220,255,${s.a})`;
      ctx.fill();
    });

    // Walls
    gs.walls.forEach(w => {
      // Top block
      drawWallBlock(ctx, w.x, 0, WALL_W, w.gapTop);
      // Bottom block
      drawWallBlock(ctx, w.x, w.gapBottom, WALL_W, CANVAS_H - w.gapBottom);
      // Gap edge glow
      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth   = 2;
      ctx.shadowColor = '#00e5ff';
      ctx.shadowBlur  = 8;
      ctx.beginPath();
      ctx.moveTo(w.x,         w.gapTop);
      ctx.lineTo(w.x + WALL_W, w.gapTop);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(w.x,          w.gapBottom);
      ctx.lineTo(w.x + WALL_W, w.gapBottom);
      ctx.stroke();
      ctx.shadowBlur = 0;
    });

    // Probe (glowing rocket triangle)
    drawProbe(ctx, PROBE_X, gs.probeY, gs.probeVY);

    // HUD
    ctx.shadowBlur  = 0;
    ctx.fillStyle   = 'rgba(0,229,255,0.9)';
    ctx.font        = 'bold 14px monospace';
    ctx.textAlign   = 'left';
    ctx.fillText(`SCORE: ${gs.score}`, 12, 22);
    ctx.fillText(`PASES: ${gs.passes}/${WIN_PASSES}`, 12, 40);

    // Mini gap indicator bar (right side)
    const barH   = 60;
    const barX   = CANVAS_W - 18;
    const barY   = 10;
    ctx.fillStyle = '#0a2040';
    ctx.fillRect(barX, barY, 8, barH);
    const fillH  = (barH * gs.gapSize) / WALL_GAP_START;
    ctx.fillStyle = '#00e5ff';
    ctx.fillRect(barX, barY + barH - fillH, 8, fillH);
    ctx.fillStyle = 'rgba(200,220,255,0.5)';
    ctx.font      = '8px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('GAP', barX + 4, barY + barH + 12);
  }

  function drawWallBlock(ctx, x, y, w, h) {
    if (h <= 0) return;
    // Main fill
    const grad = ctx.createLinearGradient(x, y, x + w, y);
    grad.addColorStop(0,   '#071e38');
    grad.addColorStop(0.5, '#0a2a4a');
    grad.addColorStop(1,   '#071e38');
    ctx.fillStyle   = grad;
    ctx.fillRect(x, y, w, h);
    // Edge lines
    ctx.strokeStyle = '#0e3a60';
    ctx.lineWidth   = 1;
    ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
    // Circuit dots pattern
    ctx.fillStyle = 'rgba(0,229,255,0.06)';
    for (let dy = 10; dy < h; dy += 14) {
      for (let dx = 5; dx < w; dx += 10) {
        ctx.fillRect(x + dx, y + dy, 2, 2);
      }
    }
  }

  function drawProbe(ctx, x, y, vy) {
    const tilt = Math.max(-0.5, Math.min(0.5, vy * 0.04));
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(tilt);

    // Engine glow
    ctx.shadowColor = '#00e5ff';
    ctx.shadowBlur  = 18;

    // Main body (triangle rocket)
    ctx.beginPath();
    ctx.moveTo(14, 0);          // nose
    ctx.lineTo(-10, -9);        // left wing
    ctx.lineTo(-6,  0);         // inner left
    ctx.lineTo(-10,  9);        // right wing
    ctx.closePath();
    const bodyGrad = ctx.createLinearGradient(-10, 0, 14, 0);
    bodyGrad.addColorStop(0,   '#1a5a8a');
    bodyGrad.addColorStop(0.5, '#3a9adf');
    bodyGrad.addColorStop(1,   '#00e5ff');
    ctx.fillStyle   = bodyGrad;
    ctx.fill();

    // Thruster flame (behind probe)
    ctx.shadowColor = '#ff9900';
    ctx.shadowBlur  = 12;
    ctx.beginPath();
    ctx.moveTo(-6,  -5);
    ctx.lineTo(-6 - (8 + Math.random() * 6), 0);
    ctx.lineTo(-6,   5);
    ctx.closePath();
    const flameGrad = ctx.createLinearGradient(-6, 0, -18, 0);
    flameGrad.addColorStop(0,   '#ff6600');
    flameGrad.addColorStop(0.5, '#ffaa00');
    flameGrad.addColorStop(1,   'rgba(255,200,0,0)');
    ctx.fillStyle   = flameGrad;
    ctx.fill();

    // Cockpit window
    ctx.shadowBlur  = 6;
    ctx.shadowColor = '#00ffff';
    ctx.beginPath();
    ctx.arc(4, 0, 4, 0, Math.PI * 2);
    ctx.fillStyle   = '#001a2a';
    ctx.fill();
    ctx.strokeStyle = '#00e5ff';
    ctx.lineWidth   = 1;
    ctx.stroke();

    ctx.restore();
  }

  // ── Start / restart game ──────────────────────────────────────────────────
  const startGame = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    gameStateRef.current = initState();
    setScreen('playing');

    // Draw first frame immediately, then kick off loop
    requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(gameLoop);
    });
  }, [initState, gameLoop]);

  // ── Input: boost on tap, float on hold ───────────────────────────────────
  const handleBoostDown = useCallback(() => {
    const gs = gameStateRef.current;
    if (!gs || !gs.alive) return;
    gs.isHeld  = true;
    gs.probeVY = BOOST_VY; // initial upward kick on press
  }, []);

  const handleBoostUp = useCallback(() => {
    const gs = gameStateRef.current;
    if (!gs) return;
    gs.isHeld = false;
  }, []);

  // Draw first static frame on mount so canvas isn't blank before start
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || screen !== 'start') return;
    const ctx = canvas.getContext('2d');
    // Draw a simple space background preview
    const bg = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
    bg.addColorStop(0, '#010a18');
    bg.addColorStop(1, '#020d22');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    makeStars(60).forEach(s => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,220,255,${s.a})`;
      ctx.fill();
    });
    // Probe preview
    drawProbe(ctx, PROBE_X, CANVAS_H / 2, 0);
  }, [screen]); // eslint-disable-line

  // Cleanup RAF on unmount
  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={styles.wrapper}>
      {/* Canvas (always mounted so refs work) */}
      <div style={styles.canvasWrapper}>
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          style={styles.canvas}
          onMouseDown={screen === 'playing' ? handleBoostDown : undefined}
          onMouseUp={screen === 'playing' ? handleBoostUp : undefined}
          onMouseLeave={screen === 'playing' ? handleBoostUp : undefined}
          onTouchStart={screen === 'playing' ? (e) => { e.preventDefault(); handleBoostDown(); } : undefined}
          onTouchEnd={screen === 'playing' ? (e) => { e.preventDefault(); handleBoostUp(); } : undefined}
        />

        {/* ── Start overlay ── */}
        {screen === 'start' && (
          <div style={styles.overlay}>
            <p style={styles.overlayTitle}>🚀 SURFEA LA GRAVEDAD</p>
            <p style={styles.overlayText}>
              Toca / haz clic para impulsar la sonda.<br />
              ¡Pasa por las 10 anillas para ganar!
            </p>
            <div style={styles.tapHint}>TAP PARA VOLAR</div>
            <button style={styles.bigBtn} onClick={startGame}>
              INICIAR VUELO
            </button>
          </div>
        )}

        {/* ── Game over overlay ── */}
        {screen === 'gameover' && (
          <div style={styles.overlay}>
            <p style={{ ...styles.overlayTitle, color: '#ff4d4d' }}>💥 ¡IMPACTO DETECTADO!</p>
            <p style={styles.overlayText}>
              Puntuación: <strong style={{ color: '#00e5ff' }}>{finalScore}</strong>
            </p>
            <button style={{ ...styles.bigBtn, background: '#ff4d4d' }} onClick={startGame}>
              REINTENTAR
            </button>
          </div>
        )}

        {/* ── Win overlay ── */}
        {screen === 'won' && (
          <div style={styles.overlay}>
            <p style={{ ...styles.overlayTitle, color: '#ffd700' }}>🏆 ¡MISIÓN COMPLETA!</p>
            <p style={styles.overlayText}>
              ¡{WIN_PASSES} anillas superadas!<br />
              Puntuación: <strong style={{ color: '#00e5ff' }}>{finalScore}</strong>
            </p>
            <button
              style={{ ...styles.bigBtn, background: '#ffd700', color: '#000d1a' }}
              onClick={() => onComplete && onComplete(finalScore)}
            >
              CONTINUAR MISIÓN
            </button>
          </div>
        )}
      </div>

      {/* Controls hint (below canvas) */}
      {screen === 'playing' && (
        <p style={styles.hint}>MANTÉN PRESIONADO → FLOTAR &nbsp;|&nbsp; SUELTA → CAER</p>
      )}
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = {
  wrapper: {
    display:         'flex',
    flexDirection:   'column',
    alignItems:      'center',
    width:           '100%',
    padding:         '16px',
    fontFamily:      "'Courier New', monospace",
    color:           '#c0d8ff',
    background:      'linear-gradient(160deg, #020d1a 0%, #041528 100%)',
    borderRadius:    '16px',
    userSelect:      'none',
  },
  canvasWrapper: {
    position:        'relative',
    display:         'inline-block',
    borderRadius:    '12px',
    overflow:        'hidden',
    border:          '1.5px solid #0a2a4a',
    boxShadow:       '0 0 24px rgba(0,100,200,0.3)',
    maxWidth:        '100%',
  },
  canvas: {
    display:         'block',
    maxWidth:        '100%',
    cursor:          'pointer',
    touchAction:     'none',
  },
  overlay: {
    position:        'absolute',
    inset:           0,
    background:      'rgba(1,10,24,0.88)',
    backdropFilter:  'blur(6px)',
    display:         'flex',
    flexDirection:   'column',
    alignItems:      'center',
    justifyContent:  'center',
    gap:             '14px',
    padding:         '24px',
  },
  overlayTitle: {
    margin:          0,
    fontSize:        '22px',
    fontWeight:      'bold',
    color:           '#00e5ff',
    textAlign:       'center',
    letterSpacing:   '2px',
  },
  overlayText: {
    margin:          0,
    fontSize:        '13px',
    color:           '#7ab8ff',
    textAlign:       'center',
    lineHeight:      1.7,
  },
  tapHint: {
    fontSize:        '28px',
    fontWeight:      'bold',
    color:           '#00e5ff',
    letterSpacing:   '4px',
    textShadow:      '0 0 20px #00e5ff',
    animation:       'none',
  },
  bigBtn: {
    padding:         '11px 28px',
    fontSize:        '13px',
    fontWeight:      'bold',
    letterSpacing:   '2px',
    background:      '#00e5ff',
    color:           '#000d1a',
    border:          'none',
    borderRadius:    '8px',
    cursor:          'pointer',
  },
  hint: {
    margin:          '10px 0 0',
    fontSize:        '10px',
    letterSpacing:   '2px',
    color:           '#2a5070',
    textTransform:   'uppercase',
  },
};
