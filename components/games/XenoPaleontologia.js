'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Star } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// Custom draw helpers
// ─────────────────────────────────────────────────────────────

function drawAmonitaAlenigena(ctx, cx, cy, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy);

  // Outer spiral (arc with growing radius)
  ctx.strokeStyle = '#8B4513';
  ctx.lineWidth = 3;
  ctx.shadowColor = '#D4692A';
  ctx.shadowBlur = 18;
  ctx.beginPath();
  for (let a = 0; a <= Math.PI * 1.833; a += 0.05) {
    const r = 8 + (a / (Math.PI * 1.833)) * 24;
    const x = Math.cos(a - Math.PI / 2) * r;
    const y = Math.sin(a - Math.PI / 2) * r;
    if (a === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Outer ring (full circle at r=32)
  ctx.beginPath();
  ctx.arc(0, 0, 32, 0, Math.PI * 2);
  ctx.stroke();

  // Ammonite septa (8 chamber lines from center)
  ctx.strokeStyle = '#A0522D';
  ctx.lineWidth = 1.2;
  ctx.shadowBlur = 6;
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const r1 = 10;
    const r2 = 32;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * r1, Math.sin(angle) * r1);
    ctx.lineTo(Math.cos(angle) * r2, Math.sin(angle) * r2);
    ctx.stroke();
  }

  // Ridge bumps around outer edge every 15 degrees
  ctx.fillStyle = '#8B4513';
  ctx.shadowColor = '#D4692A';
  ctx.shadowBlur = 8;
  for (let deg = 0; deg < 360; deg += 15) {
    const rad = (deg * Math.PI) / 180;
    const bx = Math.cos(rad) * 33;
    const by = Math.sin(rad) * 33;
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.lineTo(bx + Math.cos(rad) * 5, by + Math.sin(rad) * 5);
    ctx.lineTo(bx + Math.cos(rad + 0.25) * 2, by + Math.sin(rad + 0.25) * 2);
    ctx.closePath();
    ctx.fill();
  }

  // Iridescent highlight arc
  ctx.strokeStyle = 'rgba(180,80,200,0.45)';
  ctx.lineWidth = 2;
  ctx.shadowColor = '#9B59B6';
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.arc(0, 0, 22, -Math.PI * 0.8, Math.PI * 0.2);
  ctx.stroke();

  // Alien eyes near center
  ctx.shadowColor = '#00FFFF';
  ctx.shadowBlur = 12;
  ctx.fillStyle = '#00FFFF';
  ctx.beginPath(); ctx.arc(-4, -3, 3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(4, -3, 3, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#003333';
  ctx.beginPath(); ctx.arc(-4, -3, 1.2, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(4, -3, 1.2, 0, Math.PI * 2); ctx.fill();

  ctx.restore();
}

function drawEsqueletoAlenigena(ctx, cx, cy, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy);
  ctx.strokeStyle = '#C8C8C8';
  ctx.fillStyle = '#C8C8C8';
  ctx.lineWidth = 2;
  ctx.shadowColor = '#00FFFF';
  ctx.shadowBlur = 14;

  // Skull (elongated oval)
  ctx.beginPath();
  ctx.ellipse(0, -38, 18, 22, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Eye sockets
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.shadowBlur = 0;
  ctx.beginPath(); ctx.ellipse(-7, -42, 7, 5, -0.2, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(7, -42, 7, 5, 0.2, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = '#C8C8C8';
  ctx.shadowColor = '#00FFFF';
  ctx.shadowBlur = 14;

  // Neck
  ctx.fillRect(-2, -16, 4, 14);

  // Spine
  ctx.fillRect(-1.5, -2, 3, 50);

  // Ribcage – 6 ribs each side
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 6; i++) {
    const y = 4 + i * 7;
    const spread = 14 - i * 1.5;
    // Left rib
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.quadraticCurveTo(-spread * 1.3, y + 4, -spread, y + 10);
    ctx.stroke();
    // Right rib
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.quadraticCurveTo(spread * 1.3, y + 4, spread, y + 10);
    ctx.stroke();
  }

  // Pelvis ellipse
  ctx.beginPath();
  ctx.ellipse(0, 52, 11, 5, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Leg bones (femurs) at 20-degree angles
  const legAngle = Math.PI / 9; // 20 degrees
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-4, 57);
  ctx.lineTo(-4 - Math.sin(legAngle) * 26, 57 + Math.cos(legAngle) * 26);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(4, 57);
  ctx.lineTo(4 + Math.sin(legAngle) * 26, 57 + Math.cos(legAngle) * 26);
  ctx.stroke();

  // Arm bones from upper ribs
  ctx.beginPath(); ctx.moveTo(-1, 2); ctx.lineTo(-26, 14); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(1, 2); ctx.lineTo(26, 14); ctx.stroke();

  // Fingers – 3 per hand, 12px
  const handL = { x: -26, y: 14 };
  const handR = { x: 26, y: 14 };
  for (let f = -1; f <= 1; f++) {
    ctx.beginPath();
    ctx.moveTo(handL.x, handL.y);
    ctx.lineTo(handL.x - 12, handL.y + f * 5 + 6);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(handR.x, handR.y);
    ctx.lineTo(handR.x + 12, handR.y + f * 5 + 6);
    ctx.stroke();
  }

  ctx.restore();
}

function drawBallenaAlenigena(ctx, cx, cy, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy);

  // Main body arc
  ctx.fillStyle = '#1A4A6B';
  ctx.shadowColor = '#00DDFF';
  ctx.shadowBlur = 20;
  ctx.beginPath();
  ctx.ellipse(0, 0, 65, 28, 0, 0, Math.PI * 2);
  ctx.fill();

  // Bioluminescent stripes
  ctx.lineWidth = 2;
  for (let i = 0; i < 8; i++) {
    const yOff = -18 + i * 5;
    const halfW = Math.sqrt(Math.max(0, 1 - (yOff / 28) ** 2)) * 65;
    ctx.strokeStyle = `rgba(0,220,255,${0.2 + (i % 2) * 0.25})`;
    ctx.shadowColor = '#00DDFF';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(-halfW, yOff);
    ctx.lineTo(halfW, yOff);
    ctx.stroke();
  }

  // Fan tail (fluke) – 5 finger-like extensions on the right
  ctx.fillStyle = '#133655';
  ctx.shadowColor = '#00DDFF';
  ctx.shadowBlur = 12;
  const flukeAngles = [-50, -25, 0, 25, 50];
  flukeAngles.forEach(deg => {
    const rad = (deg * Math.PI) / 180;
    ctx.beginPath();
    ctx.moveTo(62, 0);
    ctx.lineTo(62 + Math.sin(rad) * 22, Math.cos(rad) * 22);
    ctx.lineTo(62 + Math.sin(rad) * 18, Math.cos(rad) * 18);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  });

  // Dorsal fin
  ctx.fillStyle = '#1A4A6B';
  ctx.shadowColor = '#00DDFF';
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.moveTo(10, -28);
  ctx.lineTo(30, -50);
  ctx.lineTo(45, -28);
  ctx.closePath();
  ctx.fill();

  // Pectoral fins
  ctx.beginPath();
  ctx.ellipse(-20, 15, 18, 7, 0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(-20, -15, 18, 7, -0.4, 0, Math.PI * 2);
  ctx.fill();

  // 4 tendrils hanging below
  ctx.strokeStyle = 'rgba(0,200,255,0.7)';
  ctx.lineWidth = 1.5;
  ctx.shadowColor = '#00DDFF';
  ctx.shadowBlur = 8;
  [-30, -10, 10, 30].forEach((xOff, i) => {
    ctx.beginPath();
    ctx.moveTo(xOff, 28);
    ctx.quadraticCurveTo(xOff + (i % 2 === 0 ? -8 : 8), 50, xOff, 65);
    ctx.stroke();
  });

  // Bio-luminescent spots
  ctx.shadowColor = '#00FFFF';
  ctx.shadowBlur = 14;
  const spots = [[-40,-12],[-25,5],[-10,-18],[5,10],[20,-5],[35,8],
                 [-50,0],[0,-22],[15,18],[-30,18],[45,5],[-15,0]];
  spots.forEach(([sx, sy]) => {
    ctx.fillStyle = `rgba(0,255,220,0.8)`;
    ctx.beginPath(); ctx.arc(sx, sy, 2.5, 0, Math.PI * 2); ctx.fill();
  });

  // Large eye with cross-shaped alien pupil
  ctx.shadowColor = '#00FFFF';
  ctx.shadowBlur = 16;
  ctx.fillStyle = '#88EEFF';
  ctx.beginPath(); ctx.arc(-42, -6, 10, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#001830';
  // Cross pupil
  ctx.fillRect(-42 - 1, -6 - 7, 2, 14);
  ctx.fillRect(-42 - 7, -6 - 1, 14, 2);

  ctx.restore();
}

function drawCraneoAlenigena(ctx, cx, cy, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy);
  ctx.fillStyle = '#8B7355';
  ctx.strokeStyle = '#8B7355';
  ctx.shadowColor = '#FFD700';
  ctx.shadowBlur = 18;
  ctx.lineWidth = 2;

  // Cranium – rounded rectangle
  ctx.beginPath();
  ctx.roundRect(-27, -40, 54, 38, 12);
  ctx.fill();

  // Massive single eye socket
  ctx.fillStyle = 'rgba(0,0,0,0.75)';
  ctx.shadowBlur = 0;
  ctx.beginPath();
  ctx.ellipse(0, -26, 18, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#8B7355';
  ctx.shadowColor = '#FFD700';
  ctx.shadowBlur = 18;

  // Snout / pointed forward jaw
  ctx.beginPath();
  ctx.moveTo(-14, -2);
  ctx.lineTo(16, -2);
  ctx.lineTo(44, -14);
  ctx.lineTo(16, -20);
  ctx.lineTo(-14, -20);
  ctx.closePath();
  ctx.fill();

  // 6 teeth pointing downward
  ctx.fillStyle = '#EEE8D5';
  ctx.shadowColor = '#FFD700';
  ctx.shadowBlur = 6;
  for (let i = 0; i < 6; i++) {
    const tx = -10 + i * 7;
    ctx.beginPath();
    ctx.moveTo(tx, -2);
    ctx.lineTo(tx + 3, 10);
    ctx.lineTo(tx + 6, -2);
    ctx.closePath();
    ctx.fill();
  }

  // Horn ridge on top – 3 horns
  ctx.fillStyle = '#8B7355';
  ctx.shadowColor = '#FFD700';
  ctx.shadowBlur = 12;
  [-16, 0, 16].forEach(hx => {
    ctx.beginPath();
    ctx.moveTo(hx - 5, -40);
    ctx.lineTo(hx, -56);
    ctx.lineTo(hx + 5, -40);
    ctx.closePath();
    ctx.fill();
  });

  // Temporal fenestrae (two oval holes)
  ctx.fillStyle = 'rgba(0,0,0,0.55)';
  ctx.shadowBlur = 0;
  ctx.beginPath(); ctx.ellipse(-18, -34, 5, 3, -0.3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(18, -34, 5, 3, 0.3, 0, Math.PI * 2); ctx.fill();

  // Crack lines
  ctx.strokeStyle = 'rgba(0,0,0,0.5)';
  ctx.lineWidth = 1.2;
  ctx.shadowBlur = 0;
  [
    [[-10,-38],[0,-20],[8,-5]],
    [[10,-38],[4,-25]],
    [[-20,-15],[-5,-8],[5,-2]],
    [[20,-35],[12,-22]]
  ].forEach(pts => {
    ctx.beginPath();
    pts.forEach(([px,py], i) => i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py));
    ctx.stroke();
  });

  ctx.restore();
}

function drawPecesAlenigenas(ctx, cx, cy, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy);

  const drawFish = (fx, fy, size, angle) => {
    ctx.save();
    ctx.translate(fx, fy);
    ctx.rotate(angle);

    // Body
    ctx.fillStyle = 'rgba(42, 90, 74, 0.85)';
    ctx.strokeStyle = '#2A5A4A';
    ctx.shadowColor = '#44FFAA';
    ctx.shadowBlur = 16;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(0, 0, size, size * 0.45, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Crescent tail
    ctx.fillStyle = '#1E3D2F';
    ctx.shadowColor = '#44FFAA';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(size, 0);
    ctx.quadraticCurveTo(size + size * 0.5, -size * 0.55, size + size * 0.35, 0);
    ctx.quadraticCurveTo(size + size * 0.5, size * 0.55, size, 0);
    ctx.fill();

    // 6 fan fins (top & bottom, 3 per side)
    ctx.strokeStyle = 'rgba(68,255,170,0.6)';
    ctx.lineWidth = 1;
    for (let f = 0; f < 3; f++) {
      const fx2 = -size * 0.6 + f * size * 0.45;
      // top fin
      ctx.beginPath(); ctx.moveTo(fx2, -size * 0.45); ctx.lineTo(fx2, -size * 0.45 - size * 0.35); ctx.stroke();
      // bottom fin
      ctx.beginPath(); ctx.moveTo(fx2, size * 0.45); ctx.lineTo(fx2, size * 0.45 + size * 0.35); ctx.stroke();
    }

    // Skeleton lines inside (transparent body effect)
    ctx.strokeStyle = 'rgba(68,255,170,0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-size * 0.8, 0); ctx.lineTo(size * 0.8, 0); ctx.stroke();
    for (let b = -3; b <= 3; b++) {
      const bx = b * (size * 0.22);
      ctx.beginPath(); ctx.moveTo(bx, 0); ctx.lineTo(bx - size * 0.08, -size * 0.38); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(bx, 0); ctx.lineTo(bx + size * 0.08, size * 0.38); ctx.stroke();
    }

    // Glowing internal organs
    [[-size*0.3, 0, '#00FFAA'], [0, -size*0.08, '#AA44FF'], [size*0.25, 0, '#00FFAA']].forEach(([ox, oy, oc]) => {
      ctx.fillStyle = oc;
      ctx.shadowColor = oc;
      ctx.shadowBlur = 10;
      ctx.beginPath(); ctx.ellipse(ox, oy, size * 0.12, size * 0.09, 0, 0, Math.PI * 2); ctx.fill();
    });

    // 3 eyes (vertical column)
    ctx.shadowColor = '#44FFAA';
    ctx.shadowBlur = 12;
    ctx.fillStyle = '#AAFFDD';
    [-size*0.22, 0, size*0.22].forEach(ey => {
      ctx.beginPath(); ctx.arc(-size * 0.5, ey, size * 0.1, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#001a10';
      ctx.beginPath(); ctx.arc(-size * 0.5, ey, size * 0.05, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#AAFFDD';
    });

    // Whisker tendrils (4 per fish)
    ctx.strokeStyle = 'rgba(68,255,170,0.7)';
    ctx.lineWidth = 1;
    [-size*0.33, -size*0.11, size*0.11, size*0.33].forEach((wy, wi) => {
      ctx.beginPath();
      ctx.moveTo(-size * 0.8, wy);
      ctx.quadraticCurveTo(-size * 1.1, wy + (wi % 2 === 0 ? -size*0.2 : size*0.2), -size * 1.35, wy + (wi % 2 === 0 ? -size*0.05 : size*0.05));
      ctx.stroke();
    });

    // Geometric diamond scale pattern
    ctx.strokeStyle = 'rgba(68,255,170,0.25)';
    ctx.lineWidth = 0.7;
    for (let si = -2; si <= 2; si++) {
      for (let sj = -1; sj <= 1; sj++) {
        const sx = si * size * 0.28;
        const sy = sj * size * 0.28;
        const sd = size * 0.13;
        ctx.beginPath();
        ctx.moveTo(sx, sy - sd); ctx.lineTo(sx + sd, sy);
        ctx.lineTo(sx, sy + sd); ctx.lineTo(sx - sd, sy);
        ctx.closePath(); ctx.stroke();
      }
    }

    ctx.restore();
  };

  // Lead fish (large, center)
  drawFish(0, 0, 35, 0);
  // Escort fish top-left
  drawFish(-55, -30, 20, -0.18);
  // Escort fish bottom-left
  drawFish(-55, 30, 20, 0.18);

  ctx.restore();
}

// ─────────────────────────────────────────────────────────────
// FOSSILS array (8 total — 3 original + 5 new)
// ─────────────────────────────────────────────────────────────
const FOSSILS = [
  {
    name: 'Trilobites Marciano',
    path: [[-20,0],[-15,-15],[-5,-22],[10,-20],[20,-8],[18,10],[8,22],[-8,20],[-18,8]],
    color: '#8B6914',
    glow: '#CC9900',
    hint: 'Crustáceo primitivo con segmentos repetitivos',
    pts: 300
  },
  {
    name: 'Helioida Polar',
    path: [[0,-25],[8,-8],[24,-8],[12,5],[18,22],[0,12],[-18,22],[-12,5],[-24,-8],[-8,-8]],
    color: '#6B4A8B',
    glow: '#AA66FF',
    hint: 'Coral espiral hexagonal de alta mar',
    pts: 400
  },
  {
    name: 'Bacilomorfo Cristalino',
    path: [[-8,-28],[8,-28],[12,-10],[8,10],[12,28],[-12,28],[-8,10],[-12,-10]],
    color: '#2A6B4A',
    glow: '#44AA77',
    hint: 'Bacteria fosilizada de forma elongada',
    pts: 250
  },
  {
    name: 'Amonita Alienígena',
    color: '#8B4513',
    glow: '#D4692A',
    hint: 'Cefalópodo espiral con textura nacarada alienígena',
    pts: 450,
    customDraw: drawAmonitaAlenigena
  },
  {
    name: 'Esqueleto Alienígena',
    color: '#C8C8C8',
    glow: '#00FFFF',
    hint: 'Esqueleto del Gris clásico, ahora fosilizado en hielo alienígena',
    pts: 500,
    customDraw: drawEsqueletoAlenigena
  },
  {
    name: 'Ballena Alienígena',
    color: '#1A4A6B',
    glow: '#00DDFF',
    hint: 'Cetáceo bioluminiscente del mundo Pandora alienígena',
    pts: 600,
    customDraw: drawBallenaAlenigena
  },
  {
    name: 'Cráneo de Dinosaurio Alienígena',
    color: '#8B7355',
    glow: '#FFD700',
    hint: 'Cráneo fosilizado de depredador bípedo del planeta Kepler-442b',
    pts: 550,
    customDraw: drawCraneoAlenigena
  },
  {
    name: 'Peces Alienígenas',
    color: '#2A5A4A',
    glow: '#44FFAA',
    hint: 'Banco de peces cristalinos de la nebulosa de Orión',
    pts: 480,
    customDraw: drawPecesAlenigenas
  }
];

const TOTAL_LEVELS = FOSSILS.length;

export default function XenoPaleontologia({ onComplete }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [gameState, setGameState] = useState('digging'); // digging | won | lost | complete
  const [timeLeft, setTimeLeft] = useState(60);
  const [integrity, setIntegrity] = useState(100);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [message, setMessage] = useState('');

  const currentFossil = FOSSILS[currentLevel];

  const iceRef = useRef(null);
  const W = 700, H = 420;
  const FOSSIL_CX = W / 2, FOSSIL_CY = H / 2;
  const BRUSH_RADIUS = 22;

  // Build / rebuild ice canvas whenever the level changes
  const buildIce = useCallback(() => {
    const offscreen = document.createElement('canvas');
    offscreen.width = W;
    offscreen.height = H;
    const ctx = offscreen.getContext('2d');

    const grad = ctx.createRadialGradient(W/2, H/2, 50, W/2, H/2, W/2);
    grad.addColorStop(0, '#b8d8f0');
    grad.addColorStop(0.5, '#7ab0d4');
    grad.addColorStop(1, '#4a82aa');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = 'rgba(200,230,255,0.6)';
    ctx.lineWidth = 1.5;
    for (let c = 0; c < 25; c++) {
      const cx = Math.random() * W;
      const cy = Math.random() * H;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      let x = cx, y = cy;
      for (let s = 0; s < 5; s++) {
        x += (Math.random() - 0.5) * 60;
        y += (Math.random() - 0.5) * 60;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    for (let b = 0; b < 40; b++) {
      const bx = Math.random() * W, by = Math.random() * H;
      const br = Math.random() * 5 + 2;
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.beginPath(); ctx.arc(bx, by, br, 0, Math.PI * 2); ctx.fill();
    }

    iceRef.current = offscreen;
  }, []);

  useEffect(() => { buildIce(); }, [buildIce, currentLevel]);

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0a1520';
      ctx.fillRect(0, 0, W, H);

      // Draw fossil underneath (blurred preview)
      ctx.save();
      ctx.globalAlpha = 0.5;
      if (currentFossil.customDraw) {
        currentFossil.customDraw(ctx, FOSSIL_CX, FOSSIL_CY, 0.5);
        ctx.globalAlpha = 1; // customDraw manages its own alpha
      } else {
        ctx.translate(FOSSIL_CX, FOSSIL_CY);
        ctx.fillStyle = currentFossil.color;
        ctx.shadowColor = currentFossil.glow;
        ctx.shadowBlur = 20;
        ctx.beginPath();
        currentFossil.path.forEach(([px, py], i) => i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py));
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // Ice layer
      if (iceRef.current) ctx.drawImage(iceRef.current, 0, 0);

      // Sparkles
      t += 0.016;
      for (let g = 0; g < 15; g++) {
        const gx = (g * 53 + 20) % W;
        const gy = (g * 37 + 15) % H;
        const ga = Math.sin(t * 2 + g) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(255,255,255,${ga * 0.6})`;
        ctx.beginPath(); ctx.arc(gx, gy, 2, 0, Math.PI * 2); ctx.fill();
      }

      // Scanning line
      const scanY = (Math.sin(t * 0.8) * 0.5 + 0.5) * H;
      ctx.strokeStyle = 'rgba(0,228,255,0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, scanY); ctx.lineTo(W, scanY); ctx.stroke();

      // Level indicator
      ctx.fillStyle = 'rgba(0,10,30,0.65)';
      ctx.fillRect(W - 140, 10, 130, 36);
      ctx.fillStyle = '#00E4FF';
      ctx.font = 'bold 13px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`NIVEL ${currentLevel + 1} / ${TOTAL_LEVELS}`, W - 18, 33);

      // Instruction overlay
      if (gameState === 'digging') {
        ctx.fillStyle = 'rgba(0,10,30,0.55)';
        ctx.fillRect(10, 10, 220, 50);
        ctx.fillStyle = '#00E4FF';
        ctx.font = '11px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('🔬 Arrastra para excavar el hielo', 18, 28);
        ctx.fillText('⚠️ Cuidado: daña el fósil = -integridad', 18, 44);
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [gameState, currentFossil, currentLevel]);

  // Timer
  useEffect(() => {
    if (gameState !== 'digging') return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { setGameState('lost'); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState]);

  const dig = (e) => {
    if (gameState !== 'digging' || !iceRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = W / rect.width;
    const scaleY = H / rect.height;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top) * scaleY;

    // Erase ice
    const ctx = iceRef.current.getContext('2d');
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    const grad = ctx.createRadialGradient(mx, my, 0, mx, my, BRUSH_RADIUS);
    grad.addColorStop(0, 'rgba(0,0,0,1)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(mx, my, BRUSH_RADIUS, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // Integrity damage if digging near fossil center
    const dxF = mx - FOSSIL_CX, dyF = my - FOSSIL_CY;
    if (Math.sqrt(dxF * dxF + dyF * dyF) < 30) {
      setIntegrity(prev => {
        const next = Math.max(0, prev - 3);
        if (next <= 0) setGameState('lost');
        return next;
      });
    }

    // Reveal detection
    const sampleData = iceRef.current.getContext('2d').getImageData(FOSSIL_CX - 25, FOSSIL_CY - 25, 50, 50).data;
    let transparentPixels = 0;
    for (let i = 3; i < sampleData.length; i += 4) {
      if (sampleData[i] < 50) transparentPixels++;
    }
    const revealPercent = transparentPixels / (50 * 50);

    if (revealPercent > 0.7 && !revealed) {
      setRevealed(true);
      const pts = Math.floor(currentFossil.pts * (integrity / 100) + timeLeft * 2);
      setScore(pts);
      setTotalScore(prev => prev + pts);
      setMessage(`🏺 ¡${currentFossil.name} descubierto! Integridad: ${Math.round(integrity)}%`);
      setTimeout(() => setGameState('won'), 2000);
    }
  };

  const advanceLevel = () => {
    const nextLevel = currentLevel + 1;
    if (nextLevel >= TOTAL_LEVELS) {
      setGameState('complete');
      if (onComplete) onComplete(totalScore + score);
    } else {
      setCurrentLevel(nextLevel);
      setGameState('digging');
      setTimeLeft(60);
      setIntegrity(100);
      setRevealed(false);
      setMessage('');
      setScore(0);
    }
  };

  const isDragging = useRef(false);
  const handleDown = (e) => { isDragging.current = true; dig(e); };
  const handleMove = (e) => { if (isDragging.current) dig(e); };
  const handleUp = () => { isDragging.current = false; };

  const integrityColor = integrity > 60 ? '#00FF88' : integrity > 30 ? '#FFD700' : '#FF4444';
  const timeColor = timeLeft > 30 ? '#00FF88' : timeLeft > 15 ? '#FFD700' : '#FF4444';

  return (
    <div style={{ background: 'rgba(0,0,0,0.9)', borderRadius: '20px', border: '1px solid rgba(100,180,255,0.3)', overflow: 'hidden' }}>
      {/* HUD */}
      <div style={{ padding: '0.8rem 1.2rem', display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,20,40,0.5)', flexWrap: 'wrap' }}>
        <span style={{ color: '#88CCFF', fontWeight: 'bold' }}>🔬 Xeno-Paleontología</span>

        {/* Level badge */}
        <div style={{ background: 'rgba(0,228,255,0.12)', border: '1px solid rgba(0,228,255,0.4)', borderRadius: '20px', padding: '4px 12px' }}>
          <span style={{ color: '#00E4FF', fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 'bold' }}>
            NIVEL {currentLevel + 1} / {TOTAL_LEVELS}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.4)', padding: '4px 12px', borderRadius: '20px', border: `1px solid ${integrityColor}44` }}>
          <span style={{ fontSize: '0.75rem', color: '#aaa' }}>INTEGRIDAD</span>
          <div style={{ width: '70px', height: '8px', background: '#111', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${integrity}%`, height: '100%', background: integrityColor, transition: 'width 0.2s, background 0.5s' }}/>
          </div>
          <span style={{ color: integrityColor, fontFamily: 'monospace', fontSize: '0.8rem' }}>{Math.round(integrity)}%</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.4)', padding: '4px 12px', borderRadius: '20px', border: `1px solid ${timeColor}44` }}>
          <Clock size={14} color={timeColor} />
          <span style={{ color: timeColor, fontFamily: 'monospace' }}>{timeLeft}s</span>
        </div>

        <div style={{ background: 'rgba(100,180,255,0.1)', border: '1px solid rgba(100,180,255,0.3)', borderRadius: '8px', padding: '3px 10px' }}>
          <span style={{ color: '#88CCFF', fontSize: '0.8rem' }}>Objetivo: <strong>{currentFossil.name}</strong></span>
        </div>

        <div style={{ color: '#888', fontSize: '0.78rem', marginLeft: 'auto', fontStyle: 'italic' }}>
          💡 {currentFossil.hint}
        </div>
      </div>

      {message && (
        <div style={{ background: 'rgba(0,80,40,0.8)', color: '#00FF88', padding: '5px 16px', textAlign: 'center', fontSize: '0.9rem', borderBottom: '1px solid rgba(0,255,136,0.2)' }}>
          {message}
        </div>
      )}

      {/* Canvas */}
      <div style={{ position: 'relative' }}>
        <canvas
          ref={canvasRef}
          width={W} height={H}
          style={{ display: 'block', width: '100%', cursor: 'crosshair' }}
          onMouseDown={handleDown}
          onMouseMove={handleMove}
          onMouseUp={handleUp}
          onMouseLeave={handleUp}
        />

        <AnimatePresence>
          {/* Level won */}
          {gameState === 'won' && (
            <motion.div key="won" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ position: 'absolute', inset: 0, background: 'rgba(0,40,20,0.92)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', backdropFilter: 'blur(6px)' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '0.8rem' }}>🏺</div>
              <h2 style={{ color: '#00FF88', margin: '0 0 0.5rem' }}>¡{currentFossil.name} Descubierto!</h2>
              <p style={{ color: '#ccc', maxWidth: '380px', marginBottom: '0.5rem' }}>
                Integridad preservada: {Math.round(integrity)}%
              </p>
              <div style={{ background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)', borderRadius: '10px', padding: '0.5rem 1.5rem', marginBottom: '1rem' }}>
                <span style={{ color: '#FFD700', fontFamily: 'monospace', fontSize: '1.2rem', fontWeight: 'bold' }}>⭐ +{score} pts</span>
              </div>
              {currentLevel + 1 < TOTAL_LEVELS ? (
                <button onClick={advanceLevel}
                  style={{ background: '#00FF88', color: 'black', border: 'none', padding: '0.8rem 2rem', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>
                  Siguiente Fósil →
                </button>
              ) : (
                <button onClick={advanceLevel}
                  style={{ background: '#FFD700', color: 'black', border: 'none', padding: '0.8rem 2rem', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>
                  🎉 ¡Ver Resultado Final!
                </button>
              )}
            </motion.div>
          )}

          {/* Lost */}
          {gameState === 'lost' && (
            <motion.div key="lost" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ position: 'absolute', inset: 0, background: 'rgba(30,5,0,0.92)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', backdropFilter: 'blur(6px)' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '0.8rem' }}>❄️</div>
              <h2 style={{ color: '#FF8844', margin: '0 0 0.5rem' }}>
                {integrity <= 0 ? 'Fósil Destruido' : 'Tiempo Agotado'}
              </h2>
              <p style={{ color: '#ccc', maxWidth: '380px', marginBottom: '1rem' }}>El fósil no pudo ser recuperado.</p>
              <button onClick={() => window.location.reload()}
                style={{ background: '#FF8844', color: 'black', border: 'none', padding: '0.8rem 2rem', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
                Reintentar
              </button>
            </motion.div>
          )}

          {/* Grand victory */}
          {gameState === 'complete' && (
            <motion.div key="complete" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(0,60,40,0.97) 0%, rgba(0,10,30,0.97) 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', backdropFilter: 'blur(10px)', gap: '0.6rem' }}>
              <div style={{ fontSize: '4rem' }}>🌌</div>
              <h2 style={{ color: '#FFD700', margin: '0', fontSize: '1.8rem', textShadow: '0 0 20px #FFD700' }}>
                ¡Expedición Completada!
              </h2>
              <p style={{ color: '#88CCFF', fontSize: '1rem', maxWidth: '420px' }}>
                Has desenterrado todos los {TOTAL_LEVELS} fósiles del planeta alienígena.
                La ciencia xenopaleontológica avanza gracias a ti.
              </p>
              <div style={{ background: 'rgba(255,215,0,0.12)', border: '1px solid rgba(255,215,0,0.4)', borderRadius: '14px', padding: '0.8rem 2rem', margin: '0.5rem 0' }}>
                <span style={{ color: '#FFD700', fontFamily: 'monospace', fontSize: '1.6rem', fontWeight: 'bold' }}>
                  ⭐ {totalScore} pts totales
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.4rem' }}>
                <button onClick={() => { if (onComplete) onComplete(totalScore); }}
                  style={{ background: '#FFD700', color: 'black', border: 'none', padding: '0.8rem 2rem', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>
                  Continuar Misión 🚀
                </button>
                <button onClick={() => window.location.reload()}
                  style={{ background: 'transparent', color: '#88CCFF', border: '1px solid rgba(100,180,255,0.4)', padding: '0.8rem 2rem', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>
                  Nueva Expedición
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
