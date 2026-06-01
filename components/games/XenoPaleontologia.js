'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Star, Trophy, X, ChevronRight } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// Custom draw helpers — original 5
// ─────────────────────────────────────────────────────────────

function drawAmonitaAlenigena(ctx, cx, cy, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy);

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

  ctx.beginPath();
  ctx.arc(0, 0, 32, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = '#A0522D';
  ctx.lineWidth = 1.2;
  ctx.shadowBlur = 6;
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * 10, Math.sin(angle) * 10);
    ctx.lineTo(Math.cos(angle) * 32, Math.sin(angle) * 32);
    ctx.stroke();
  }

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

  ctx.strokeStyle = 'rgba(180,80,200,0.45)';
  ctx.lineWidth = 2;
  ctx.shadowColor = '#9B59B6';
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.arc(0, 0, 22, -Math.PI * 0.8, Math.PI * 0.2);
  ctx.stroke();

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

  ctx.beginPath();
  ctx.ellipse(0, -38, 18, 22, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.shadowBlur = 0;
  ctx.beginPath(); ctx.ellipse(-7, -42, 7, 5, -0.2, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(7, -42, 7, 5, 0.2, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = '#C8C8C8';
  ctx.shadowColor = '#00FFFF';
  ctx.shadowBlur = 14;

  ctx.fillRect(-2, -16, 4, 14);
  ctx.fillRect(-1.5, -2, 3, 50);

  ctx.lineWidth = 1.5;
  for (let i = 0; i < 6; i++) {
    const y = 4 + i * 7;
    const spread = 14 - i * 1.5;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.quadraticCurveTo(-spread * 1.3, y + 4, -spread, y + 10);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.quadraticCurveTo(spread * 1.3, y + 4, spread, y + 10);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.ellipse(0, 52, 11, 5, 0, 0, Math.PI * 2);
  ctx.stroke();

  const legAngle = Math.PI / 9;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-4, 57);
  ctx.lineTo(-4 - Math.sin(legAngle) * 26, 57 + Math.cos(legAngle) * 26);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(4, 57);
  ctx.lineTo(4 + Math.sin(legAngle) * 26, 57 + Math.cos(legAngle) * 26);
  ctx.stroke();

  ctx.beginPath(); ctx.moveTo(-1, 2); ctx.lineTo(-26, 14); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(1, 2); ctx.lineTo(26, 14); ctx.stroke();

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

  ctx.fillStyle = '#1A4A6B';
  ctx.shadowColor = '#00DDFF';
  ctx.shadowBlur = 20;
  ctx.beginPath();
  ctx.ellipse(0, 0, 65, 28, 0, 0, Math.PI * 2);
  ctx.fill();

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

  ctx.fillStyle = '#1A4A6B';
  ctx.shadowColor = '#00DDFF';
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.moveTo(10, -28);
  ctx.lineTo(30, -50);
  ctx.lineTo(45, -28);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(-20, 15, 18, 7, 0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(-20, -15, 18, 7, -0.4, 0, Math.PI * 2);
  ctx.fill();

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

  ctx.shadowColor = '#00FFFF';
  ctx.shadowBlur = 14;
  const spots = [[-40,-12],[-25,5],[-10,-18],[5,10],[20,-5],[35,8],
                 [-50,0],[0,-22],[15,18],[-30,18],[45,5],[-15,0]];
  spots.forEach(([sx, sy]) => {
    ctx.fillStyle = `rgba(0,255,220,0.8)`;
    ctx.beginPath(); ctx.arc(sx, sy, 2.5, 0, Math.PI * 2); ctx.fill();
  });

  ctx.shadowColor = '#00FFFF';
  ctx.shadowBlur = 16;
  ctx.fillStyle = '#88EEFF';
  ctx.beginPath(); ctx.arc(-42, -6, 10, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#001830';
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

  ctx.beginPath();
  ctx.roundRect(-27, -40, 54, 38, 12);
  ctx.fill();

  ctx.fillStyle = 'rgba(0,0,0,0.75)';
  ctx.shadowBlur = 0;
  ctx.beginPath();
  ctx.ellipse(0, -26, 18, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#8B7355';
  ctx.shadowColor = '#FFD700';
  ctx.shadowBlur = 18;

  ctx.beginPath();
  ctx.moveTo(-14, -2);
  ctx.lineTo(16, -2);
  ctx.lineTo(44, -14);
  ctx.lineTo(16, -20);
  ctx.lineTo(-14, -20);
  ctx.closePath();
  ctx.fill();

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

  ctx.fillStyle = 'rgba(0,0,0,0.55)';
  ctx.shadowBlur = 0;
  ctx.beginPath(); ctx.ellipse(-18, -34, 5, 3, -0.3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(18, -34, 5, 3, 0.3, 0, Math.PI * 2); ctx.fill();

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

    ctx.fillStyle = 'rgba(42, 90, 74, 0.85)';
    ctx.strokeStyle = '#2A5A4A';
    ctx.shadowColor = '#44FFAA';
    ctx.shadowBlur = 16;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(0, 0, size, size * 0.45, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#1E3D2F';
    ctx.shadowColor = '#44FFAA';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(size, 0);
    ctx.quadraticCurveTo(size + size * 0.5, -size * 0.55, size + size * 0.35, 0);
    ctx.quadraticCurveTo(size + size * 0.5, size * 0.55, size, 0);
    ctx.fill();

    ctx.strokeStyle = 'rgba(68,255,170,0.6)';
    ctx.lineWidth = 1;
    for (let f = 0; f < 3; f++) {
      const fx2 = -size * 0.6 + f * size * 0.45;
      ctx.beginPath(); ctx.moveTo(fx2, -size * 0.45); ctx.lineTo(fx2, -size * 0.45 - size * 0.35); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(fx2, size * 0.45); ctx.lineTo(fx2, size * 0.45 + size * 0.35); ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(68,255,170,0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-size * 0.8, 0); ctx.lineTo(size * 0.8, 0); ctx.stroke();
    for (let b = -3; b <= 3; b++) {
      const bx = b * (size * 0.22);
      ctx.beginPath(); ctx.moveTo(bx, 0); ctx.lineTo(bx - size * 0.08, -size * 0.38); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(bx, 0); ctx.lineTo(bx + size * 0.08, size * 0.38); ctx.stroke();
    }

    [[-size*0.3, 0, '#00FFAA'], [0, -size*0.08, '#AA44FF'], [size*0.25, 0, '#00FFAA']].forEach(([ox, oy, oc]) => {
      ctx.fillStyle = oc;
      ctx.shadowColor = oc;
      ctx.shadowBlur = 10;
      ctx.beginPath(); ctx.ellipse(ox, oy, size * 0.12, size * 0.09, 0, 0, Math.PI * 2); ctx.fill();
    });

    ctx.shadowColor = '#44FFAA';
    ctx.shadowBlur = 12;
    ctx.fillStyle = '#AAFFDD';
    [-size*0.22, 0, size*0.22].forEach(ey => {
      ctx.beginPath(); ctx.arc(-size * 0.5, ey, size * 0.1, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#001a10';
      ctx.beginPath(); ctx.arc(-size * 0.5, ey, size * 0.05, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#AAFFDD';
    });

    ctx.strokeStyle = 'rgba(68,255,170,0.7)';
    ctx.lineWidth = 1;
    [-size*0.33, -size*0.11, size*0.11, size*0.33].forEach((wy, wi) => {
      ctx.beginPath();
      ctx.moveTo(-size * 0.8, wy);
      ctx.quadraticCurveTo(-size * 1.1, wy + (wi % 2 === 0 ? -size*0.2 : size*0.2), -size * 1.35, wy + (wi % 2 === 0 ? -size*0.05 : size*0.05));
      ctx.stroke();
    });

    ctx.restore();
  };

  drawFish(0, 0, 35, 0);
  drawFish(-55, -30, 20, -0.18);
  drawFish(-55, 30, 20, 0.18);

  ctx.restore();
}

// ─────────────────────────────────────────────────────────────
// New custom draw functions (fossils 9–22)
// ─────────────────────────────────────────────────────────────

function drawMedusaCibernetica(ctx, cx, cy, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy);

  // Dome
  ctx.strokeStyle = '#00aaff';
  ctx.fillStyle = 'rgba(0,40,80,0.6)';
  ctx.shadowColor = '#00aaff';
  ctx.shadowBlur = 20;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 40, Math.PI, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Circuit lines inside dome
  ctx.strokeStyle = 'rgba(0,170,255,0.6)';
  ctx.lineWidth = 1;
  ctx.shadowBlur = 6;
  [[-25, -5], [-10, -20], [10, -18], [20, -8]].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.stroke();
  });
  // Horizontal circuit lines
  ctx.beginPath(); ctx.moveTo(-30, -10); ctx.lineTo(-15, -10); ctx.lineTo(-15, -20); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(15, -15); ctx.lineTo(28, -15); ctx.lineTo(28, -5); ctx.stroke();

  // Central neural cluster
  ctx.fillStyle = '#00aaff';
  ctx.shadowBlur = 14;
  ctx.beginPath(); ctx.arc(0, -5, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.arc(0, -5, 2, 0, Math.PI * 2); ctx.fill();

  // 12 curved tentacles below
  ctx.strokeStyle = '#00aaff';
  ctx.lineWidth = 1.5;
  ctx.shadowBlur = 10;
  for (let i = 0; i < 12; i++) {
    const startX = -44 + i * 8;
    const curve = (i % 2 === 0 ? -15 : 15);
    ctx.beginPath();
    ctx.moveTo(startX, 0);
    ctx.bezierCurveTo(startX + curve, 20, startX - curve, 45, startX + (i % 3 - 1) * 5, 65);
    ctx.stroke();
    // Glowing node at tip (6 of 12)
    if (i % 2 === 0) {
      ctx.fillStyle = '#00ffff';
      ctx.shadowColor = '#00ffff';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(startX + (i % 3 - 1) * 5, 65, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#00aaff';
      ctx.shadowBlur = 10;
    }
  }

  ctx.restore();
}

function drawHongoEstelar(ctx, cx, cy, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy);
  ctx.shadowColor = '#aa44ff';
  ctx.shadowBlur = 18;

  // Hexagonal cap
  ctx.fillStyle = '#4a2a6a';
  ctx.strokeStyle = '#aa44ff';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 6;
    const x = Math.cos(a) * 40;
    const y = Math.sin(a) * 22 - 20;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Rings of spores
  [30, 22, 14].forEach((r, ri) => {
    for (let s = 0; s < 8 - ri * 2; s++) {
      const a = (s / (8 - ri * 2)) * Math.PI * 2;
      ctx.fillStyle = `rgba(170,68,255,${0.5 + ri * 0.15})`;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(Math.cos(a) * r, Math.sin(a) * r - 20, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // Gill lines underneath cap
  ctx.strokeStyle = 'rgba(170,68,255,0.5)';
  ctx.lineWidth = 1;
  ctx.shadowBlur = 4;
  for (let g = -35; g <= 35; g += 7) {
    ctx.beginPath();
    ctx.moveTo(g, -4);
    ctx.lineTo(g * 0.85, 2);
    ctx.stroke();
  }

  // Stipe (stem)
  ctx.fillStyle = '#4a2a6a';
  ctx.strokeStyle = '#aa44ff';
  ctx.lineWidth = 2;
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.roundRect(-4, 2, 8, 35, 3);
  ctx.fill();
  ctx.stroke();

  // Mycelium root network
  ctx.strokeStyle = 'rgba(170,68,255,0.5)';
  ctx.lineWidth = 1;
  ctx.shadowBlur = 6;
  const roots = [[-30,55],[-18,60],[0,62],[15,58],[28,52],[-8,65],[10,66]];
  roots.forEach(([rx, ry]) => {
    ctx.beginPath();
    ctx.moveTo(0, 37);
    ctx.quadraticCurveTo(rx * 0.4, 48, rx, ry);
    ctx.stroke();
  });

  ctx.restore();
}

function drawEscorpionGalactico(ctx, cx, cy, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy);
  ctx.shadowColor = '#ff6622';
  ctx.shadowBlur = 18;
  ctx.fillStyle = '#5a2a0a';
  ctx.strokeStyle = '#ff6622';
  ctx.lineWidth = 2;

  // Oval body
  ctx.beginPath();
  ctx.ellipse(0, 10, 22, 14, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // 5 tail segments curling up and over
  const tailSegs = [
    [20, 5], [35, -5], [42, -20], [38, -38], [28, -50]
  ];
  ctx.strokeStyle = '#ff6622';
  ctx.lineWidth = 7;
  ctx.lineCap = 'round';
  ctx.shadowBlur = 12;
  for (let i = 0; i < tailSegs.length - 1; i++) {
    ctx.strokeStyle = `rgba(255,102,34,${0.9 - i * 0.1})`;
    ctx.lineWidth = 8 - i;
    ctx.beginPath();
    ctx.moveTo(tailSegs[i][0], tailSegs[i][1]);
    ctx.lineTo(tailSegs[i + 1][0], tailSegs[i + 1][1]);
    ctx.stroke();
    // Segment joint
    ctx.fillStyle = '#ff6622';
    ctx.beginPath();
    ctx.arc(tailSegs[i + 1][0], tailSegs[i + 1][1], 4 - i * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }
  // Triangular stinger
  ctx.fillStyle = '#ffaa44';
  ctx.shadowBlur = 16;
  ctx.beginPath();
  ctx.moveTo(28, -50);
  ctx.lineTo(18, -62);
  ctx.lineTo(36, -58);
  ctx.closePath();
  ctx.fill();

  // Large oval pincers
  ctx.fillStyle = '#5a2a0a';
  ctx.strokeStyle = '#ff6622';
  ctx.lineWidth = 2;
  ctx.shadowBlur = 10;
  // Left claw
  ctx.beginPath(); ctx.ellipse(-32, -5, 16, 8, -0.4, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(-44, -12, 10, 6, -0.6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  // Right claw
  ctx.beginPath(); ctx.ellipse(-32, 18, 16, 8, 0.4, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(-44, 24, 10, 6, 0.6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

  // 6 thin legs with joints
  ctx.strokeStyle = '#ff6622';
  ctx.lineWidth = 1.5;
  const legPositions = [[-8, 0], [0, 8], [8, 16]];
  legPositions.forEach(([ly, ky], i) => {
    // left leg
    ctx.beginPath(); ctx.moveTo(-10, ky); ctx.lineTo(-22, ky + 10); ctx.lineTo(-28, ky + 22); ctx.stroke();
    ctx.beginPath(); ctx.arc(-22, ky + 10, 2, 0, Math.PI * 2); ctx.fill && (ctx.fillStyle = '#ff6622', ctx.beginPath(), ctx.arc(-22, ky + 10, 2, 0, Math.PI * 2), ctx.fill());
    // right leg
    ctx.beginPath(); ctx.moveTo(10, ky); ctx.lineTo(18, ky + 12); ctx.lineTo(24, ky + 24); ctx.stroke();
  });

  // 4 eye dots
  ctx.fillStyle = '#ffaa44';
  ctx.shadowColor = '#ffaa44';
  ctx.shadowBlur = 10;
  [[-8,-6],[8,-6],[-4,-10],[4,-10]].forEach(([ex, ey]) => {
    ctx.beginPath(); ctx.arc(ex, ey, 2.5, 0, Math.PI * 2); ctx.fill();
  });

  ctx.restore();
}

function drawGusanoOrbital(ctx, cx, cy, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy);
  ctx.shadowColor = '#44ee44';
  ctx.shadowBlur = 14;

  // 18 circles in S-curve
  const segments = [];
  for (let i = 0; i < 18; i++) {
    const t = i / 17;
    const x = Math.sin(t * Math.PI * 1.5) * 28 - 20;
    const y = -60 + t * 120;
    segments.push([x, y]);
  }

  // Draw body segments
  segments.forEach(([x, y], i) => {
    ctx.fillStyle = i === 0 ? '#3a6a3a' : '#2a4a2a';
    ctx.strokeStyle = '#44ee44';
    ctx.lineWidth = 1.5;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(x, y, i === 0 ? 12 : 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // 4 small spines per segment
    const spineAngles = [0, Math.PI / 2, Math.PI, Math.PI * 1.5];
    spineAngles.forEach(sa => {
      const sr = i === 0 ? 12 : 8;
      ctx.strokeStyle = 'rgba(68,238,68,0.7)';
      ctx.lineWidth = 1;
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.moveTo(x + Math.cos(sa) * sr, y + Math.sin(sa) * sr);
      ctx.lineTo(x + Math.cos(sa) * (sr + 5), y + Math.sin(sa) * (sr + 5));
      ctx.stroke();
    });
  });

  // Head: concentric circles for mouth + teeth
  const [hx, hy] = segments[0];
  ctx.strokeStyle = '#44ee44';
  ctx.lineWidth = 1.5;
  ctx.shadowBlur = 12;
  [6, 9].forEach(r => {
    ctx.beginPath(); ctx.arc(hx, hy, r, 0, Math.PI * 2); ctx.stroke();
  });
  // Teeth triangles (6)
  for (let t = 0; t < 6; t++) {
    const ta = (t / 6) * Math.PI * 2;
    ctx.fillStyle = '#88ff88';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.moveTo(hx + Math.cos(ta) * 9, hy + Math.sin(ta) * 9);
    ctx.lineTo(hx + Math.cos(ta + 0.25) * 13, hy + Math.sin(ta + 0.25) * 13);
    ctx.lineTo(hx + Math.cos(ta - 0.25) * 13, hy + Math.sin(ta - 0.25) * 13);
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore();
}

function drawCoralSupernova(ctx, cx, cy, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy);
  ctx.shadowColor = '#ff2266';
  ctx.shadowBlur = 18;
  ctx.strokeStyle = '#ff2266';
  ctx.fillStyle = '#6a0a2a';
  ctx.lineWidth = 2.5;

  // Central trunk
  ctx.beginPath();
  ctx.moveTo(0, 30);
  ctx.lineTo(0, 0);
  ctx.stroke();

  // 7 main branches with 2-3 forks
  const drawBranch = (x, y, angle, length, depth) => {
    if (depth === 0) {
      // Star shape at tip
      ctx.fillStyle = '#ff2266';
      ctx.shadowBlur = 16;
      for (let s = 0; s < 5; s++) {
        const sa = (s / 5) * Math.PI * 2 - Math.PI / 2;
        const sa2 = ((s + 0.5) / 5) * Math.PI * 2 - Math.PI / 2;
        if (s === 0) ctx.beginPath();
        ctx.lineTo ? null : null;
      }
      // Draw 5-pointed star
      ctx.beginPath();
      for (let s = 0; s < 10; s++) {
        const sa = (s / 10) * Math.PI * 2 - Math.PI / 2;
        const r = s % 2 === 0 ? 7 : 3;
        const px = x + Math.cos(sa) * r;
        const py = y + Math.sin(sa) * r;
        if (s === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();

      // Texture dots
      ctx.shadowBlur = 4;
      return;
    }
    const ex = x + Math.cos(angle) * length;
    const ey = y + Math.sin(angle) * length;
    ctx.strokeStyle = `rgba(255,34,102,${0.6 + depth * 0.1})`;
    ctx.lineWidth = depth;
    ctx.shadowBlur = depth * 4;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(ex, ey); ctx.stroke();

    // Texture dots along branch
    ctx.fillStyle = 'rgba(255,100,150,0.5)';
    [0.3, 0.6].forEach(t => {
      ctx.beginPath();
      ctx.arc(x + Math.cos(angle) * length * t, y + Math.sin(angle) * length * t, 1.5, 0, Math.PI * 2);
      ctx.fill();
    });

    drawBranch(ex, ey, angle - 0.4, length * 0.65, depth - 1);
    drawBranch(ex, ey, angle + 0.4, length * 0.65, depth - 1);
  };

  for (let b = 0; b < 7; b++) {
    const angle = (b / 7) * Math.PI * 2 - Math.PI / 2;
    drawBranch(0, 0, angle, 28, 2);
  }

  ctx.restore();
}

function drawPterodactiloAlien(ctx, cx, cy, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy);
  ctx.strokeStyle = '#8888ff';
  ctx.fillStyle = '#3a3a6a';
  ctx.shadowColor = '#8888ff';
  ctx.shadowBlur = 16;
  ctx.lineWidth = 2;

  // Skull with long beak
  ctx.beginPath();
  ctx.ellipse(-5, -30, 12, 10, -0.2, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();
  // Long beak
  ctx.beginPath();
  ctx.moveTo(-15, -33);
  ctx.lineTo(-45, -38);
  ctx.lineTo(-45, -34);
  ctx.lineTo(-15, -27);
  ctx.closePath();
  ctx.fill(); ctx.stroke();
  // Crest on head
  ctx.beginPath();
  ctx.moveTo(-3, -40);
  ctx.lineTo(12, -55);
  ctx.lineTo(18, -42);
  ctx.fill();

  // Eye socket
  ctx.fillStyle = 'rgba(0,0,0,0.8)';
  ctx.beginPath(); ctx.arc(-8, -32, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#8888ff';
  ctx.shadowBlur = 8;
  ctx.beginPath(); ctx.arc(-8, -32, 2, 0, Math.PI * 2); ctx.fill();

  // Neck + spine
  ctx.fillStyle = '#3a3a6a';
  ctx.strokeStyle = '#8888ff';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(0, -22); ctx.lineTo(5, 20); ctx.stroke();

  // Left wing membrane (stretched polygon)
  ctx.fillStyle = 'rgba(58,58,106,0.7)';
  ctx.strokeStyle = '#8888ff';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, -18);
  ctx.lineTo(-70, -10);
  ctx.lineTo(-55, 10);
  ctx.lineTo(-20, 15);
  ctx.lineTo(0, 5);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Right wing membrane
  ctx.beginPath();
  ctx.moveTo(0, -18);
  ctx.lineTo(70, -10);
  ctx.lineTo(55, 10);
  ctx.lineTo(20, 15);
  ctx.lineTo(0, 5);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Finger bones in wings (left: 3)
  ctx.strokeStyle = 'rgba(136,136,255,0.7)';
  ctx.lineWidth = 1;
  [[-60, -8], [-45, 5], [-30, 12]].forEach(([fx, fy]) => {
    ctx.beginPath(); ctx.moveTo(0, -15); ctx.lineTo(fx, fy); ctx.stroke();
  });
  // Right fingers
  [[60, -8], [45, 5], [30, 12]].forEach(([fx, fy]) => {
    ctx.beginPath(); ctx.moveTo(0, -15); ctx.lineTo(fx, fy); ctx.stroke();
  });

  // Leg bones
  ctx.strokeStyle = '#8888ff';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(2, 20); ctx.lineTo(-10, 40); ctx.lineTo(-14, 55); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(8, 20); ctx.lineTo(18, 40); ctx.lineTo(22, 55); ctx.stroke();

  // Tail spike
  ctx.fillStyle = '#8888ff';
  ctx.beginPath();
  ctx.moveTo(5, 20);
  ctx.lineTo(25, 30);
  ctx.lineTo(5, 28);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawCangrejoDimensional(ctx, cx, cy, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy);
  ctx.shadowColor = '#88ff44';
  ctx.shadowBlur = 18;
  ctx.fillStyle = '#3a5a2a';
  ctx.strokeStyle = '#88ff44';
  ctx.lineWidth = 2;

  // Oval carapace with hex pattern
  ctx.beginPath();
  ctx.ellipse(0, 0, 35, 22, 0, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();

  // Hex pattern on shell
  ctx.strokeStyle = 'rgba(136,255,68,0.4)';
  ctx.lineWidth = 1;
  ctx.shadowBlur = 4;
  const hexCenters = [[0,0],[-16,-5],[16,-5],[-8,10],[8,10],[0,-14]];
  hexCenters.forEach(([hx, hy]) => {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const ha = (i / 6) * Math.PI * 2;
      const hpx = hx + Math.cos(ha) * 10;
      const hpy = hy + Math.sin(ha) * 6;
      if (i === 0) ctx.moveTo(hpx, hpy); else ctx.lineTo(hpx, hpy);
    }
    ctx.closePath(); ctx.stroke();
  });

  // 2 large asymmetric claws
  ctx.fillStyle = '#3a5a2a';
  ctx.strokeStyle = '#88ff44';
  ctx.lineWidth = 2;
  ctx.shadowBlur = 12;
  // Left big claw
  ctx.beginPath(); ctx.ellipse(-52, -12, 18, 10, -0.5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(-62, -20, 10, 5, -0.8, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-45, -5); ctx.lineTo(-55, -14); ctx.stroke();
  // Right smaller claw
  ctx.beginPath(); ctx.ellipse(45, -8, 12, 7, 0.4, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(52, -15, 8, 4, 0.6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

  // 5 pairs of legs at sides
  ctx.strokeStyle = '#88ff44';
  ctx.lineWidth = 1.5;
  ctx.shadowBlur = 6;
  for (let i = 0; i < 5; i++) {
    const ly = -12 + i * 7;
    // left
    ctx.beginPath(); ctx.moveTo(-35, ly); ctx.lineTo(-50, ly + 5); ctx.lineTo(-58, ly + 15); ctx.stroke();
    // right
    ctx.beginPath(); ctx.moveTo(35, ly); ctx.lineTo(50, ly + 5); ctx.lineTo(58, ly + 15); ctx.stroke();
  }

  // Eye stalks
  ctx.strokeStyle = '#88ff44';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(-10, -22); ctx.lineTo(-14, -34); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(10, -22); ctx.lineTo(14, -34); ctx.stroke();
  ctx.fillStyle = '#aaffaa';
  ctx.shadowColor = '#88ff44';
  ctx.shadowBlur = 10;
  ctx.beginPath(); ctx.arc(-14, -36, 4, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(14, -36, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#001a00';
  ctx.beginPath(); ctx.arc(-14, -36, 2, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(14, -36, 2, 0, Math.PI * 2); ctx.fill();

  ctx.restore();
}

function drawPlanctronGigante(ctx, cx, cy, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy);
  ctx.shadowColor = '#44ffee';
  ctx.shadowBlur = 14;

  // 10 diamond shapes in oval formation
  const positions = [
    [-40, -20], [-20, -28], [0, -32], [20, -28], [40, -20],
    [-40, 20], [-20, 28], [0, 32], [20, 28], [40, 20]
  ];

  positions.forEach(([px, py], idx) => {
    const shimmer = Math.sin(idx * 0.7) * 0.2 + 0.8;
    ctx.fillStyle = `rgba(42,90,90,${shimmer * 0.9})`;
    ctx.strokeStyle = '#44ffee';
    ctx.lineWidth = 1.5;
    ctx.shadowBlur = 10;

    // Diamond shape (20x12)
    ctx.beginPath();
    ctx.moveTo(px, py - 10);
    ctx.lineTo(px + 10, py);
    ctx.lineTo(px, py + 10);
    ctx.lineTo(px - 10, py);
    ctx.closePath();
    ctx.fill(); ctx.stroke();

    // 4 hair-like appendages
    ctx.strokeStyle = 'rgba(68,255,238,0.5)';
    ctx.lineWidth = 0.8;
    [[-12,0],[12,0],[0,-12],[0,12]].forEach(([hx, hy]) => {
      ctx.beginPath();
      ctx.moveTo(px + hx * 0.8, py + hy * 0.8);
      ctx.lineTo(px + hx * 1.6, py + hy * 1.6);
      ctx.stroke();
    });

    // Eye dot
    ctx.fillStyle = '#00ffee';
    ctx.shadowColor = '#44ffee';
    ctx.shadowBlur = 8;
    ctx.beginPath(); ctx.arc(px - 3, py - 2, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#001a18';
    ctx.beginPath(); ctx.arc(px - 3, py - 2, 1, 0, Math.PI * 2); ctx.fill();
  });

  ctx.restore();
}

function drawLombrizEstelar(ctx, cx, cy, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy);
  ctx.shadowColor = '#aaff22';
  ctx.shadowBlur = 18;

  // Large oval body with wavy outline
  ctx.fillStyle = '#4a6a1a';
  ctx.strokeStyle = '#aaff22';
  ctx.lineWidth = 2;

  // Wavy outline
  ctx.beginPath();
  const steps = 60;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const wave = Math.sin(t * 4) * 4;
    const x = Math.cos(t) * (50 + wave);
    const y = Math.sin(t) * (28 + wave * 0.5);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Central vein
  ctx.strokeStyle = '#ccff44';
  ctx.lineWidth = 2;
  ctx.shadowBlur = 8;
  ctx.beginPath(); ctx.moveTo(-48, 0); ctx.lineTo(48, 0); ctx.stroke();

  // 8 side veins
  ctx.strokeStyle = 'rgba(170,255,34,0.6)';
  ctx.lineWidth = 1;
  ctx.shadowBlur = 4;
  [-35, -22, -10, 8, 20, 32].forEach((vx, i) => {
    const sign = i % 2 === 0 ? 1 : -1;
    ctx.beginPath();
    ctx.moveTo(vx, 0);
    ctx.quadraticCurveTo(vx + 4, sign * 12, vx + 2, sign * 22);
    ctx.stroke();
    // Mirror
    ctx.beginPath();
    ctx.moveTo(vx, 0);
    ctx.quadraticCurveTo(vx + 4, -sign * 12, vx + 2, -sign * 22);
    ctx.stroke();
  });

  // Surface texture dots
  ctx.fillStyle = 'rgba(170,255,34,0.4)';
  ctx.shadowBlur = 0;
  for (let d = 0; d < 20; d++) {
    const tx = (d * 37 - 40) % 90 - 45;
    const ty = (d * 23) % 50 - 25;
    if (Math.abs(tx / 50) ** 2 + Math.abs(ty / 28) ** 2 < 0.85) {
      ctx.beginPath(); ctx.arc(tx, ty, 1.5, 0, Math.PI * 2); ctx.fill();
    }
  }

  ctx.restore();
}

function drawEscupulaVortex(ctx, cx, cy, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy);
  ctx.shadowColor = '#22aaff';
  ctx.shadowBlur = 20;
  ctx.fillStyle = '#1a4a6a';
  ctx.strokeStyle = '#22aaff';
  ctx.lineWidth = 2;

  // Cone shape (45px tall, 30px base) — point at top
  ctx.beginPath();
  ctx.moveTo(0, -35);
  ctx.lineTo(-30, 20);
  ctx.lineTo(30, 20);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // 6 spiral ridge lines from top to edge
  ctx.strokeStyle = 'rgba(34,170,255,0.6)';
  ctx.lineWidth = 1.2;
  ctx.shadowBlur = 6;
  for (let r = 0; r < 6; r++) {
    const baseX = -25 + r * 10;
    ctx.beginPath();
    ctx.moveTo(0, -35);
    ctx.bezierCurveTo(
      baseX * 0.3, -10,
      baseX * 0.7, 5,
      baseX, 20
    );
    ctx.stroke();
  }

  // 2 orbital rings (ellipses) around middle
  ctx.strokeStyle = '#22aaff';
  ctx.lineWidth = 2;
  ctx.shadowBlur = 14;
  ctx.beginPath(); ctx.ellipse(0, 0, 38, 8, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, 10, 30, 6, 0.3, 0, Math.PI * 2); ctx.stroke();

  // Glow dots on rings
  ctx.fillStyle = '#66ccff';
  ctx.shadowColor = '#22aaff';
  ctx.shadowBlur = 12;
  [0, Math.PI/2, Math.PI, Math.PI*1.5].forEach(a => {
    ctx.beginPath(); ctx.arc(Math.cos(a) * 38, Math.sin(a) * 8, 3, 0, Math.PI * 2); ctx.fill();
  });

  ctx.restore();
}

function drawMantisFotonica(ctx, cx, cy, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy);
  ctx.shadowColor = '#44ffaa';
  ctx.shadowBlur = 16;
  ctx.fillStyle = '#2a5a3a';
  ctx.strokeStyle = '#44ffaa';
  ctx.lineWidth = 2;

  // Abdomen (5 segments below)
  for (let s = 0; s < 5; s++) {
    const sy = 15 + s * 12;
    const w = 12 - s;
    ctx.beginPath();
    ctx.ellipse(0, sy, w, 5, 0, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
  }

  // Thorax
  ctx.beginPath();
  ctx.ellipse(0, 5, 10, 8, 0, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();

  // Triangular head
  ctx.beginPath();
  ctx.moveTo(-14, -10);
  ctx.lineTo(14, -10);
  ctx.lineTo(0, -25);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Large compound eye circles
  ctx.fillStyle = '#88ffcc';
  ctx.shadowColor = '#44ffaa';
  ctx.shadowBlur = 12;
  ctx.beginPath(); ctx.arc(-9, -16, 6, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(9, -16, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#001a0d';
  ctx.beginPath(); ctx.arc(-9, -16, 3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(9, -16, 3, 0, Math.PI * 2); ctx.fill();

  // 2 raptorial forelegs (L-shape, folded)
  ctx.strokeStyle = '#44ffaa';
  ctx.lineWidth = 2;
  ctx.shadowBlur = 8;
  // Left
  ctx.beginPath(); ctx.moveTo(-10, 0); ctx.lineTo(-30, -15); ctx.lineTo(-25, 5); ctx.stroke();
  // Right
  ctx.beginPath(); ctx.moveTo(10, 0); ctx.lineTo(30, -15); ctx.lineTo(25, 5); ctx.stroke();

  // 2 walking legs
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(-8, 10); ctx.lineTo(-22, 25); ctx.lineTo(-18, 38); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(8, 10); ctx.lineTo(22, 25); ctx.lineTo(18, 38); ctx.stroke();

  // Folded wing outline
  ctx.strokeStyle = 'rgba(68,255,170,0.4)';
  ctx.lineWidth = 1;
  ctx.shadowBlur = 4;
  ctx.beginPath();
  ctx.moveTo(-8, -5);
  ctx.quadraticCurveTo(-28, 10, -18, 30);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(8, -5);
  ctx.quadraticCurveTo(28, 10, 18, 30);
  ctx.stroke();

  ctx.restore();
}

function drawPulpoCristalos(ctx, cx, cy, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy);
  ctx.shadowColor = '#cc44ff';
  ctx.shadowBlur = 20;
  ctx.fillStyle = '#3a1a5a';
  ctx.strokeStyle = '#cc44ff';
  ctx.lineWidth = 2;

  // 8 arms extending out in star pattern (bezier)
  for (let a = 0; a < 8; a++) {
    const angle = (a / 8) * Math.PI * 2;
    const ex = Math.cos(angle) * 40;
    const ey = Math.sin(angle) * 40;
    const cx1 = Math.cos(angle + 0.3) * 20;
    const cy1 = Math.sin(angle + 0.3) * 20;
    const cx2 = Math.cos(angle - 0.3) * 35;
    const cy2 = Math.sin(angle - 0.3) * 35;

    ctx.strokeStyle = `rgba(204,68,255,0.8)`;
    ctx.lineWidth = 4 - a * 0.2;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(cx1, cy1, cx2, cy2, ex, ey);
    ctx.stroke();

    // Facet lines on arms
    ctx.strokeStyle = 'rgba(220,150,255,0.4)';
    ctx.lineWidth = 1;
    for (let f = 0; f < 3; f++) {
      const ft = (f + 1) / 4;
      const fx = Math.cos(angle) * 40 * ft;
      const fy = Math.sin(angle) * 40 * ft;
      ctx.beginPath();
      ctx.moveTo(fx - Math.cos(angle + Math.PI/2) * 3, fy - Math.sin(angle + Math.PI/2) * 3);
      ctx.lineTo(fx + Math.cos(angle + Math.PI/2) * 3, fy + Math.sin(angle + Math.PI/2) * 3);
      ctx.stroke();
    }

    // Sucker dots along arm
    ctx.fillStyle = 'rgba(220,150,255,0.7)';
    ctx.shadowBlur = 4;
    for (let s = 1; s <= 4; s++) {
      const st = s / 5;
      ctx.beginPath();
      ctx.arc(Math.cos(angle) * 40 * st, Math.sin(angle) * 40 * st, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 20-sided polygon body center
  ctx.fillStyle = '#3a1a5a';
  ctx.strokeStyle = '#cc44ff';
  ctx.lineWidth = 2;
  ctx.shadowBlur = 16;
  ctx.beginPath();
  for (let i = 0; i < 20; i++) {
    const a = (i / 20) * Math.PI * 2;
    const r = 14 + (i % 2) * 3;
    const px = Math.cos(a) * r;
    const py = Math.sin(a) * r;
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Eye
  ctx.fillStyle = '#ee88ff';
  ctx.shadowColor = '#cc44ff';
  ctx.shadowBlur = 12;
  ctx.beginPath(); ctx.arc(0, 0, 5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#1a001a';
  ctx.beginPath(); ctx.arc(0, 0, 2.5, 0, Math.PI * 2); ctx.fill();

  ctx.restore();
}

function drawSerpienteAnular(ctx, cx, cy, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy);
  ctx.shadowColor = '#ffcc22';
  ctx.shadowBlur = 18;

  // Thick body as arc (ouroboros — circle with gap)
  ctx.strokeStyle = '#5a4a0a';
  ctx.lineWidth = 14;
  ctx.lineCap = 'butt';
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.arc(0, 0, 32, 0.3, Math.PI * 2 - 0.1);
  ctx.stroke();

  // Scale triangles along body
  ctx.fillStyle = '#ffcc22';
  ctx.shadowBlur = 6;
  for (let s = 0; s < 30; s++) {
    const sa = 0.3 + (s / 30) * (Math.PI * 2 - 0.4);
    const sx = Math.cos(sa) * 32;
    const sy = Math.sin(sa) * 32;
    const perpA = sa + Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(sx + Math.cos(sa) * 8, sy + Math.sin(sa) * 8);
    ctx.lineTo(sx + Math.cos(perpA) * 5, sy + Math.sin(perpA) * 5);
    ctx.lineTo(sx - Math.cos(perpA) * 5, sy - Math.sin(perpA) * 5);
    ctx.closePath();
    ctx.fill();
  }

  // Outer glow ring
  ctx.strokeStyle = 'rgba(255,204,34,0.3)';
  ctx.lineWidth = 2;
  ctx.shadowBlur = 14;
  ctx.beginPath(); ctx.arc(0, 0, 39, 0, Math.PI * 2); ctx.stroke();

  // Triangular head at tail end of arc
  const headA = Math.PI * 2 - 0.1;
  const hx = Math.cos(headA) * 32;
  const hy = Math.sin(headA) * 32;
  ctx.fillStyle = '#5a4a0a';
  ctx.strokeStyle = '#ffcc22';
  ctx.lineWidth = 2;
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.ellipse(hx, hy, 10, 7, headA, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();

  // Forked tongue
  ctx.strokeStyle = '#ff4444';
  ctx.lineWidth = 1.5;
  ctx.shadowColor = '#ff4444';
  ctx.shadowBlur = 8;
  const tongueA = headA;
  const tx = hx + Math.cos(tongueA) * 12;
  const ty = hy + Math.sin(tongueA) * 12;
  ctx.beginPath();
  ctx.moveTo(hx, hy);
  ctx.lineTo(tx, ty);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(tx, ty);
  ctx.lineTo(tx + Math.cos(tongueA + 0.4) * 7, ty + Math.sin(tongueA + 0.4) * 7);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(tx, ty);
  ctx.lineTo(tx + Math.cos(tongueA - 0.4) * 7, ty + Math.sin(tongueA - 0.4) * 7);
  ctx.stroke();

  // Alien eyes on head
  ctx.fillStyle = '#ffee44';
  ctx.shadowColor = '#ffcc22';
  ctx.shadowBlur = 10;
  const eyePerp = headA + Math.PI / 2;
  ctx.beginPath(); ctx.arc(hx + Math.cos(eyePerp) * 4, hy + Math.sin(eyePerp) * 4, 2.5, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(hx - Math.cos(eyePerp) * 4, hy - Math.sin(eyePerp) * 4, 2.5, 0, Math.PI * 2); ctx.fill();

  ctx.restore();
}

function drawEstrellaEstelar(ctx, cx, cy, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy);
  ctx.shadowColor = '#ff66aa';
  ctx.shadowBlur = 18;
  ctx.fillStyle = '#5a2a4a';
  ctx.strokeStyle = '#ff66aa';
  ctx.lineWidth = 2;

  // 7-armed star polygon
  const outerR = 42;
  const innerR = 18;
  ctx.beginPath();
  for (let i = 0; i < 14; i++) {
    const angle = (i / 14) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    const px = Math.cos(angle) * r;
    const py = Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Sucker dots (2 rows on each arm)
  ctx.fillStyle = '#ff99cc';
  ctx.shadowBlur = 6;
  for (let arm = 0; arm < 7; arm++) {
    const armAngle = (arm / 7) * Math.PI * 2 - Math.PI / 2;
    [0.4, 0.65, 0.88].forEach(t => {
      const r1 = innerR + (outerR - innerR) * t;
      // Row 1
      ctx.beginPath();
      ctx.arc(
        Math.cos(armAngle) * r1 + Math.cos(armAngle + Math.PI/2) * 3,
        Math.sin(armAngle) * r1 + Math.sin(armAngle + Math.PI/2) * 3,
        2, 0, Math.PI * 2
      );
      ctx.fill();
      // Row 2
      ctx.beginPath();
      ctx.arc(
        Math.cos(armAngle) * r1 - Math.cos(armAngle + Math.PI/2) * 3,
        Math.sin(armAngle) * r1 - Math.sin(armAngle + Math.PI/2) * 3,
        2, 0, Math.PI * 2
      );
      ctx.fill();
    });

    // Claw triangles at arm tips
    const tipX = Math.cos(armAngle) * outerR;
    const tipY = Math.sin(armAngle) * outerR;
    ctx.fillStyle = '#ffaacc';
    ctx.shadowBlur = 8;
    const perpA = armAngle + Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(tipX, tipY);
    ctx.lineTo(tipX + Math.cos(armAngle) * 8 + Math.cos(perpA) * 4, tipY + Math.sin(armAngle) * 8 + Math.sin(perpA) * 4);
    ctx.lineTo(tipX + Math.cos(armAngle) * 8 - Math.cos(perpA) * 4, tipY + Math.sin(armAngle) * 8 - Math.sin(perpA) * 4);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#ff99cc';
  }

  // Central mouth disk
  ctx.fillStyle = '#3a1a2a';
  ctx.strokeStyle = '#ff66aa';
  ctx.lineWidth = 2;
  ctx.shadowBlur = 10;
  ctx.beginPath(); ctx.arc(0, 0, innerR, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = 'rgba(255,102,170,0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(0, 0, innerR * 0.6, 0, Math.PI * 2); ctx.stroke();

  ctx.restore();
}

// ─────────────────────────────────────────────────────────────
// FOSSILS array — 22 total
// ─────────────────────────────────────────────────────────────
const FOSSILS = [
  {
    name: 'Trilobites Marciano',
    path: [[-20,0],[-15,-15],[-5,-22],[10,-20],[20,-8],[18,10],[8,22],[-8,20],[-18,8]],
    color: '#8B6914', glow: '#CC9900',
    hint: 'Crustáceo primitivo con segmentos repetitivos', pts: 300
  },
  {
    name: 'Helioida Polar',
    path: [[0,-25],[8,-8],[24,-8],[12,5],[18,22],[0,12],[-18,22],[-12,5],[-24,-8],[-8,-8]],
    color: '#6B4A8B', glow: '#AA66FF',
    hint: 'Coral espiral hexagonal de alta mar', pts: 400
  },
  {
    name: 'Bacilomorfo Cristalino',
    path: [[-8,-28],[8,-28],[12,-10],[8,10],[12,28],[-12,28],[-8,10],[-12,-10]],
    color: '#2A6B4A', glow: '#44AA77',
    hint: 'Bacteria fosilizada de forma elongada', pts: 250
  },
  {
    name: 'Amonita Alienígena',
    color: '#8B4513', glow: '#D4692A',
    hint: 'Cefalópodo espiral con textura nacarada alienígena',
    pts: 450, customDraw: drawAmonitaAlenigena
  },
  {
    name: 'Esqueleto Alienígena',
    color: '#C8C8C8', glow: '#00FFFF',
    hint: 'Esqueleto del Gris clásico, ahora fosilizado en hielo alienígena',
    pts: 500, customDraw: drawEsqueletoAlenigena
  },
  {
    name: 'Ballena Alienígena',
    color: '#1A4A6B', glow: '#00DDFF',
    hint: 'Cetáceo bioluminiscente del mundo Pandora alienígena',
    pts: 600, customDraw: drawBallenaAlenigena
  },
  {
    name: 'Cráneo de Dinosaurio Alienígena',
    color: '#8B7355', glow: '#FFD700',
    hint: 'Cráneo fosilizado de depredador bípedo del planeta Kepler-442b',
    pts: 550, customDraw: drawCraneoAlenigena
  },
  {
    name: 'Peces Alienígenas',
    color: '#2A5A4A', glow: '#44FFAA',
    hint: 'Banco de peces cristalinos de la nebulosa de Orión',
    pts: 480, customDraw: drawPecesAlenigenas
  },
  {
    name: 'Medusa Cibernética',
    color: '#0a3a5a', glow: '#00aaff',
    hint: 'Medusa alienígena con patrón de circuitos y tentáculos eléctricos',
    pts: 520, customDraw: drawMedusaCibernetica
  },
  {
    name: 'Hongo Estelar',
    color: '#4a2a6a', glow: '#aa44ff',
    hint: 'Hongo espacial con cap hexagonal y red de micelio alienígena',
    pts: 380, customDraw: drawHongoEstelar
  },
  {
    name: 'Escorpión Galáctico',
    color: '#5a2a0a', glow: '#ff6622',
    hint: 'Escorpión alienígena con cola curva y aguijón venenoso estelar',
    pts: 580, customDraw: drawEscorpionGalactico
  },
  {
    name: 'Gusano Orbital',
    color: '#2a4a2a', glow: '#44ee44',
    hint: 'Gusano espacial con 18 segmentos y boca circular dentada',
    pts: 290, customDraw: drawGusanoOrbital
  },
  {
    name: 'Coral Supernova',
    color: '#6a0a2a', glow: '#ff2266',
    hint: 'Coral alienígena ramificado con pólipos en forma de estrella',
    pts: 460, customDraw: drawCoralSupernova
  },
  {
    name: 'Pterodáctilo Alien',
    color: '#3a3a6a', glow: '#8888ff',
    hint: 'Reptil volador alienígena con huesos huecos y cresta cefálica',
    pts: 610, customDraw: drawPterodactiloAlien
  },
  {
    name: 'Cangrejo Dimensional',
    color: '#3a5a2a', glow: '#88ff44',
    hint: 'Cangrejo alienígena con patrón hexagonal en caparazón y garras asimétricas',
    pts: 490, customDraw: drawCangrejoDimensional
  },
  {
    name: 'Plancton Gigante',
    color: '#2a5a5a', glow: '#44ffee',
    hint: 'Colonia de plancton alienígena en formación de diamantes',
    pts: 320, customDraw: drawPlanctronGigante
  },
  {
    name: 'Lombriz Estelar',
    color: '#4a6a1a', glow: '#aaff22',
    hint: 'Organismo plano con red de venas visibles y borde ondulante',
    pts: 340, customDraw: drawLombrizEstelar
  },
  {
    name: 'Escúpula Vortex',
    color: '#1a4a6a', glow: '#22aaff',
    hint: 'Organismo en forma de trompo con crestas espirales y anillos orbitales',
    pts: 540, customDraw: drawEscupulaVortex
  },
  {
    name: 'Mantis Fotónica',
    color: '#2a5a3a', glow: '#44ffaa',
    hint: 'Mantis alienígena con ojos compuestos y patas raptoras plegadas',
    pts: 630, customDraw: drawMantisFotonica
  },
  {
    name: 'Pulpo Crístalos',
    color: '#3a1a5a', glow: '#cc44ff',
    hint: 'Pulpo cristalino con 8 brazos facetados y cuerpo geodésico',
    pts: 570, customDraw: drawPulpoCristalos
  },
  {
    name: 'Serpiente Anular',
    color: '#5a4a0a', glow: '#ffcc22',
    hint: 'Serpiente ouroboros alienígena con escamas y lengua bífida',
    pts: 410, customDraw: drawSerpienteAnular
  },
  {
    name: 'Estrella Estelar',
    color: '#5a2a4a', glow: '#ff66aa',
    hint: 'Estrella de mar alienígena con 7 brazos y ventosas en cada uno',
    pts: 450, customDraw: drawEstrellaEstelar
  }
];

const TOTAL_LEVELS = FOSSILS.length;

// ─────────────────────────────────────────────────────────────
// Difficulty helper
// ─────────────────────────────────────────────────────────────
function getTimeForLevel(level) {
  if (level < 4) return 45;
  return Math.max(20, 45 - (level - 3) * 5);
}

// ─────────────────────────────────────────────────────────────
// Stars rating helper
// ─────────────────────────────────────────────────────────────
function getDifficultyStars(pts) {
  if (pts < 300) return 1;
  if (pts < 400) return 2;
  if (pts < 500) return 3;
  if (pts < 580) return 4;
  return 5;
}

// ─────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────
export default function XenoPaleontologia({ onComplete }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const [currentLevel, setCurrentLevel] = useState(0);
  // gameState: 'digging' | 'discovering' | 'vitrina' | 'won' | 'lost' | 'complete'
  const [gameState, setGameState] = useState('digging');
  const [timeLeft, setTimeLeft] = useState(getTimeForLevel(0));
  const [integrity, setIntegrity] = useState(100);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [message, setMessage] = useState('');
  const [showMuseum, setShowMuseum] = useState(false);

  // Museum state (localStorage persisted)
  const [museum, setMuseum] = useState(() => {
    try { return JSON.parse(localStorage.getItem('xenoMuseum') || '[]'); }
    catch { return []; }
  });

  const addToMuseum = (fossil) => {
    const alreadyIn = museum.some(m => m.id === fossil.name);
    if (alreadyIn) return;
    const updated = [...museum, {
      id: fossil.name,
      name: fossil.name,
      pts: fossil.pts,
      discoveredAt: Date.now()
    }];
    setMuseum(updated);
    try { localStorage.setItem('xenoMuseum', JSON.stringify(updated)); } catch {}
  };

  // Discovery animation state
  const discoverAnimRef = useRef({ startTime: null, particles: [] });
  const discoveryScoreRef = useRef(0);

  const currentFossil = FOSSILS[currentLevel];

  const iceRef = useRef(null);
  const W = 700, H = 420;
  const FOSSIL_CX = W / 2, FOSSIL_CY = H / 2;
  const BRUSH_RADIUS = 18;

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
      const icx = Math.random() * W;
      const icy = Math.random() * H;
      ctx.beginPath();
      ctx.moveTo(icx, icy);
      let x = icx, y = icy;
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

  // Init particles for discovery animation
  const initParticles = () => {
    const particles = [];
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 80 + Math.random() * 140;
      particles.push({
        x: FOSSIL_CX, y: FOSSIL_CY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: `hsl(${Math.random() * 60 + 30}, 100%, 70%)`,
        life: 1, decay: 0.6 + Math.random() * 0.4, size: 3 + Math.random() * 4
      });
    }
    return particles;
  };

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

      // Draw fossil underneath (blurred preview) — always draw in all states
      ctx.save();
      if (currentFossil.customDraw) {
        currentFossil.customDraw(ctx, FOSSIL_CX, FOSSIL_CY, 0.45);
      } else {
        ctx.globalAlpha = 0.45;
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
      if (iceRef.current && gameState === 'digging') ctx.drawImage(iceRef.current, 0, 0);

      // Sparkles (digging mode)
      t += 0.016;
      if (gameState === 'digging') {
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
      }

      // ── DISCOVERY ANIMATION ──
      if (gameState === 'discovering') {
        const now = performance.now();
        if (!discoverAnimRef.current.startTime) {
          discoverAnimRef.current.startTime = now;
          discoverAnimRef.current.particles = initParticles();
        }
        const elapsed = (now - discoverAnimRef.current.startTime) / 1000; // seconds
        const progress = Math.min(elapsed / 3, 1);

        // Flash effect: white overlay fades from 0.8 to 0
        const flashAlpha = Math.max(0, 0.8 - elapsed * 0.5);
        if (flashAlpha > 0) {
          ctx.fillStyle = `rgba(255,255,255,${flashAlpha})`;
          ctx.fillRect(0, 0, W, H);
        }

        // Fossil zooms in (scale 1x to 1.8x over 1.5s)
        const scale = 1 + Math.min(elapsed / 1.5, 1) * 0.8;
        ctx.save();
        ctx.translate(FOSSIL_CX, FOSSIL_CY);
        ctx.scale(scale, scale);
        ctx.translate(-FOSSIL_CX, -FOSSIL_CY);
        if (currentFossil.customDraw) {
          currentFossil.customDraw(ctx, FOSSIL_CX, FOSSIL_CY, 1);
        } else {
          ctx.globalAlpha = 1;
          ctx.translate(FOSSIL_CX, FOSSIL_CY);
          ctx.fillStyle = currentFossil.color;
          ctx.shadowColor = currentFossil.glow;
          ctx.shadowBlur = 30;
          ctx.beginPath();
          currentFossil.path.forEach(([px, py], i) => i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py));
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();

        // Particle explosion
        const dt = 0.016;
        discoverAnimRef.current.particles.forEach(p => {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.vy += 30 * dt;
          p.life -= p.decay * dt;
          if (p.life > 0) {
            ctx.save();
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        });

        // '¡FÓSIL DESCUBIERTO!' text in gold, flashing
        const textAlpha = elapsed > 0.5 ? 0.7 + Math.sin(elapsed * 8) * 0.3 : 0;
        if (textAlpha > 0) {
          ctx.save();
          ctx.globalAlpha = textAlpha;
          ctx.font = 'bold 38px monospace';
          ctx.textAlign = 'center';
          ctx.fillStyle = '#FFD700';
          ctx.shadowColor = '#FFD700';
          ctx.shadowBlur = 24;
          ctx.fillText('¡FÓSIL DESCUBIERTO!', W / 2, H / 2 - 80);
          ctx.font = 'bold 22px monospace';
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 12;
          ctx.fillText(currentFossil.name, W / 2, H / 2 - 45);
          ctx.restore();
        }

        // After 3 seconds → vitrina
        if (elapsed >= 3) {
          discoverAnimRef.current.startTime = null;
          setGameState('vitrina');
        }
      }

      // Level indicator (enhanced — shown in digging)
      if (gameState === 'digging') {
        const stars = getDifficultyStars(currentFossil.pts);
        ctx.fillStyle = 'rgba(0,10,30,0.65)';
        ctx.fillRect(W - 160, 10, 150, 36);
        ctx.fillStyle = '#00E4FF';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(`NIVEL ${currentLevel + 1} / ${TOTAL_LEVELS}`, W - 18, 33);

        // Instruction overlay
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

    // Integrity damage if digging near fossil center — 5% per frame
    const dxF = mx - FOSSIL_CX, dyF = my - FOSSIL_CY;
    if (Math.sqrt(dxF * dxF + dyF * dyF) < 30) {
      setIntegrity(prev => {
        const next = Math.max(0, prev - 5);
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
      discoveryScoreRef.current = pts;
      setScore(pts);
      setTotalScore(prev => prev + pts);
      setMessage(`🏺 ¡${currentFossil.name} descubierto! Integridad: ${Math.round(integrity)}%`);
      // Start discovery animation
      discoverAnimRef.current.startTime = null;
      setGameState('discovering');
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
      setTimeLeft(getTimeForLevel(nextLevel));
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
  const timeColor = timeLeft > 20 ? '#00FF88' : timeLeft > 10 ? '#FFD700' : '#FF4444';
  const stars = getDifficultyStars(currentFossil.pts);

  return (
    <div style={{ background: 'rgba(0,0,0,0.9)', borderRadius: '20px', border: '1px solid rgba(100,180,255,0.3)', overflow: 'hidden', position: 'relative' }}>

      {/* Museum Overlay */}
      <AnimatePresence>
        {showMuseum && (
          <motion.div key="museum-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute', inset: 0, zIndex: 100,
              background: 'rgba(0,5,20,0.97)',
              backdropFilter: 'blur(12px)',
              display: 'flex', flexDirection: 'column',
              borderRadius: '20px', overflow: 'hidden'
            }}>
            {/* Museum header */}
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(100,180,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ margin: 0, color: '#FFD700', fontFamily: 'monospace', fontSize: '1.3rem', textShadow: '0 0 16px #FFD700' }}>
                  🏛️ Mi Museo Xeno-Paleontológico
                </h2>
                <p style={{ margin: '4px 0 0', color: '#88CCFF', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                  {museum.length} / {TOTAL_LEVELS} fósiles coleccionados
                </p>
              </div>
              <button onClick={() => setShowMuseum(false)}
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={18} />
              </button>
            </div>

            {/* Progress bar */}
            <div style={{ padding: '0.5rem 1.5rem', background: 'rgba(0,20,40,0.5)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={{ flex: 1, height: '6px', background: '#111', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${(museum.length / TOTAL_LEVELS) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #00E4FF, #FFD700)', transition: 'width 0.5s', borderRadius: '3px' }} />
                </div>
                <span style={{ color: '#FFD700', fontFamily: 'monospace', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                  {Math.round((museum.length / TOTAL_LEVELS) * 100)}%
                </span>
              </div>
            </div>

            {/* Fossil grid */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.8rem', alignContent: 'start' }}>
              {FOSSILS.map((fossil, idx) => {
                const collected = museum.find(m => m.id === fossil.name);
                const collectedDate = collected ? new Date(collected.discoveredAt).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' }) : null;
                return (
                  <div key={fossil.name} style={{
                    background: collected ? 'rgba(0,40,20,0.8)' : 'rgba(20,20,40,0.6)',
                    border: `1px solid ${collected ? 'rgba(0,255,136,0.4)' : 'rgba(100,100,150,0.3)'}`,
                    borderRadius: '12px', padding: '0.8rem', textAlign: 'center',
                    opacity: collected ? 1 : 0.5,
                    transition: 'all 0.3s'
                  }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>
                      {collected ? '🏺' : '❓'}
                    </div>
                    <div style={{ color: collected ? '#00FF88' : '#556', fontFamily: 'monospace', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '0.3rem', lineHeight: 1.3 }}>
                      {collected ? fossil.name : `Fósil #${idx + 1}`}
                    </div>
                    {collected && (
                      <>
                        <div style={{ color: '#FFD700', fontFamily: 'monospace', fontSize: '0.75rem' }}>⭐ {collected.pts} pts</div>
                        <div style={{ color: '#88CCFF', fontSize: '0.65rem', marginTop: '0.2rem' }}>📅 {collectedDate}</div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HUD */}
      <div style={{ padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,20,40,0.5)', flexWrap: 'wrap' }}>
        <span style={{ color: '#88CCFF', fontWeight: 'bold', fontSize: '0.9rem' }}>🔬 Xeno-Paleontología</span>

        {/* Level badge */}
        <div style={{ background: 'rgba(0,228,255,0.12)', border: '1px solid rgba(0,228,255,0.4)', borderRadius: '20px', padding: '3px 10px' }}>
          <span style={{ color: '#00E4FF', fontFamily: 'monospace', fontSize: '0.78rem', fontWeight: 'bold' }}>
            NIVEL {currentLevel + 1} / {TOTAL_LEVELS}
          </span>
        </div>

        {/* Difficulty stars */}
        <div style={{ display: 'flex', gap: '2px' }}>
          {[1,2,3,4,5].map(s => (
            <Star key={s} size={12} fill={s <= stars ? '#FFD700' : 'none'} color={s <= stars ? '#FFD700' : '#444'} />
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.4)', padding: '3px 10px', borderRadius: '20px', border: `1px solid ${integrityColor}44` }}>
          <span style={{ fontSize: '0.7rem', color: '#aaa' }}>INTEGRIDAD</span>
          <div style={{ width: '60px', height: '7px', background: '#111', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${integrity}%`, height: '100%', background: integrityColor, transition: 'width 0.2s, background 0.5s' }}/>
          </div>
          <span style={{ color: integrityColor, fontFamily: 'monospace', fontSize: '0.78rem' }}>{Math.round(integrity)}%</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.4)', padding: '3px 10px', borderRadius: '20px', border: `1px solid ${timeColor}44` }}>
          <Clock size={13} color={timeColor} />
          <span style={{ color: timeColor, fontFamily: 'monospace', fontSize: '0.8rem' }}>{timeLeft}s</span>
        </div>

        <div style={{ background: 'rgba(100,180,255,0.1)', border: '1px solid rgba(100,180,255,0.3)', borderRadius: '8px', padding: '2px 8px' }}>
          <span style={{ color: '#88CCFF', fontSize: '0.75rem' }}>🦴 <strong>{currentFossil.name}</strong></span>
        </div>

        <div style={{ color: '#888', fontSize: '0.72rem', fontStyle: 'italic', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          💡 {currentFossil.hint}
        </div>

        {/* Museum button */}
        <button onClick={() => setShowMuseum(true)}
          style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(255,215,0,0.12)', border: '1px solid rgba(255,215,0,0.4)', borderRadius: '20px', padding: '4px 12px', cursor: 'pointer', color: '#FFD700', fontFamily: 'monospace', fontSize: '0.75rem', fontWeight: 'bold', flexShrink: 0 }}>
          <Trophy size={13} />
          MI MUSEO
          {museum.length > 0 && (
            <span style={{ background: '#FFD700', color: '#000', borderRadius: '10px', padding: '1px 6px', fontSize: '0.65rem', fontWeight: 'bold' }}>
              {museum.length}
            </span>
          )}
        </button>
      </div>

      {/* Level progress bar */}
      <div style={{ padding: '4px 12px', background: 'rgba(0,15,35,0.6)', borderBottom: '1px solid rgba(0,228,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#00E4FF', fontFamily: 'monospace', fontSize: '0.7rem', whiteSpace: 'nowrap' }}>
            ===[NIVEL {currentLevel + 1} / {TOTAL_LEVELS}]===
          </span>
          <div style={{ flex: 1, height: '5px', background: '#0a1a30', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${((currentLevel) / TOTAL_LEVELS) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #00E4FF, #8888ff)', transition: 'width 0.5s', boxShadow: '0 0 8px #00E4FF' }} />
          </div>
          <div style={{ display: 'flex', gap: '1px', flexShrink: 0 }}>
            {[1,2,3,4,5].map(s => (
              <Star key={s} size={10} fill={s <= stars ? currentFossil.glow : 'none'} color={s <= stars ? currentFossil.glow : '#333'} />
            ))}
          </div>
        </div>
      </div>

      {message && gameState === 'digging' && (
        <div style={{ background: 'rgba(0,80,40,0.8)', color: '#00FF88', padding: '4px 14px', textAlign: 'center', fontSize: '0.85rem', borderBottom: '1px solid rgba(0,255,136,0.2)' }}>
          {message}
        </div>
      )}

      {/* Canvas */}
      <div style={{ position: 'relative' }}>
        <canvas
          ref={canvasRef}
          width={W} height={H}
          style={{ display: 'block', width: '100%', cursor: gameState === 'digging' ? 'crosshair' : 'default' }}
          onMouseDown={handleDown}
          onMouseMove={handleMove}
          onMouseUp={handleUp}
          onMouseLeave={handleUp}
        />

        <AnimatePresence>
          {/* VITRINA overlay */}
          {gameState === 'vitrina' && (
            <motion.div key="vitrina"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,5,20,0.85)',
                backdropFilter: 'blur(8px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
              {/* Glass case */}
              <div style={{
                background: 'linear-gradient(160deg, rgba(20,40,80,0.95) 0%, rgba(5,15,35,0.98) 100%)',
                border: '2px solid rgba(100,200,255,0.5)',
                borderRadius: '24px',
                padding: '2rem',
                width: '480px',
                maxWidth: '90%',
                textAlign: 'center',
                boxShadow: '0 0 60px rgba(0,150,255,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Glass shine */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '60px', background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)', borderRadius: '24px 24px 0 0', pointerEvents: 'none' }} />

                <div style={{ fontSize: '0.75rem', letterSpacing: '3px', color: '#00E4FF', fontFamily: 'monospace', marginBottom: '0.5rem', opacity: 0.7 }}>
                  ◈ VITRINA DE DESCUBRIMIENTO ◈
                </div>

                {/* Fossil canvas preview */}
                <div style={{ margin: '0 auto 1rem', width: '180px', height: '180px', position: 'relative' }}>
                  <canvas
                    width={180} height={180}
                    ref={el => {
                      if (!el) return;
                      const vctx = el.getContext('2d');
                      vctx.clearRect(0, 0, 180, 180);
                      vctx.fillStyle = 'rgba(0,10,30,0.6)';
                      vctx.beginPath();
                      vctx.roundRect(0, 0, 180, 180, 16);
                      vctx.fill();
                      vctx.save();
                      vctx.scale(1.5, 1.5);
                      vctx.translate(-30, -30);
                      if (currentFossil.customDraw) {
                        currentFossil.customDraw(vctx, 90, 90, 1);
                      } else {
                        vctx.translate(90, 90);
                        vctx.fillStyle = currentFossil.color;
                        vctx.shadowColor = currentFossil.glow;
                        vctx.shadowBlur = 20;
                        vctx.beginPath();
                        currentFossil.path.forEach(([px, py], i) => i === 0 ? vctx.moveTo(px, py) : vctx.lineTo(px, py));
                        vctx.closePath();
                        vctx.fill();
                      }
                      vctx.restore();
                    }}
                    style={{ borderRadius: '16px', border: `1px solid ${currentFossil.glow}55` }}
                  />
                  {/* Glow ring */}
                  <div style={{ position: 'absolute', inset: -8, borderRadius: '24px', border: `2px solid ${currentFossil.glow}44`, pointerEvents: 'none', boxShadow: `0 0 20px ${currentFossil.glow}33` }} />
                </div>

                <h2 style={{ color: '#FFD700', margin: '0 0 0.3rem', fontSize: '1.3rem', textShadow: '0 0 16px #FFD700', fontFamily: 'monospace' }}>
                  {currentFossil.name}
                </h2>

                <p style={{ color: '#88CCFF', fontSize: '0.82rem', margin: '0 0 0.6rem', fontStyle: 'italic' }}>
                  "{currentFossil.hint}"
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '2px', marginBottom: '0.8rem' }}>
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={14} fill={s <= stars ? '#FFD700' : 'none'} color={s <= stars ? '#FFD700' : '#444'} />
                  ))}
                </div>

                <div style={{ background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.3)', borderRadius: '10px', padding: '0.5rem 1rem', marginBottom: '1.2rem', display: 'inline-block' }}>
                  <span style={{ color: '#FFD700', fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 'bold' }}>
                    ⭐ +{score} pts
                  </span>
                  <span style={{ color: '#aaa', fontSize: '0.75rem', marginLeft: '8px' }}>
                    Integridad: {Math.round(integrity)}%
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => { addToMuseum(currentFossil); }}
                    style={{
                      background: museum.some(m => m.id === currentFossil.name) ? 'rgba(0,255,136,0.15)' : 'rgba(255,215,0,0.2)',
                      border: museum.some(m => m.id === currentFossil.name) ? '1px solid rgba(0,255,136,0.5)' : '1px solid rgba(255,215,0,0.5)',
                      color: museum.some(m => m.id === currentFossil.name) ? '#00FF88' : '#FFD700',
                      padding: '0.7rem 1.4rem', borderRadius: '10px', cursor: 'pointer',
                      fontWeight: 'bold', fontFamily: 'monospace', fontSize: '0.85rem',
                      display: 'flex', alignItems: 'center', gap: '6px'
                    }}>
                    <Trophy size={15} />
                    {museum.some(m => m.id === currentFossil.name) ? '✓ En Museo' : 'Añadir a Mi Museo'}
                  </button>

                  <button
                    onClick={() => {
                      addToMuseum(currentFossil);
                      advanceLevel();
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #00E4FF, #0080CC)',
                      border: 'none',
                      color: 'white',
                      padding: '0.7rem 1.4rem', borderRadius: '10px', cursor: 'pointer',
                      fontWeight: 'bold', fontFamily: 'monospace', fontSize: '0.85rem',
                      display: 'flex', alignItems: 'center', gap: '6px',
                      boxShadow: '0 0 16px rgba(0,228,255,0.4)'
                    }}>
                    Siguiente Fósil <ChevronRight size={16} />
                  </button>
                </div>
              </div>
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
