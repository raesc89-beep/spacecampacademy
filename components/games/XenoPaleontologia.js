'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Star, Trophy, ChevronRight, ChevronLeft, Pickaxe } from 'lucide-react';


// ─────────────────────────────────────────────────────────────
// FOSSILS array — 8 total
// ─────────────────────────────────────────────────────────────
const FOSSILS = [
  {
    name: 'Amonita Alienígena',
    imagePath: '/assets/fossils/fossil_amonita.png',
    color: '#8B4513', glow: '#D4692A',
    hint: 'Cefalópodo espiral con caparazón bio-luminiscente que emitía luz en océanos de amoníaco.',
    pts: 350,
    era: 'Período Amónico Tardío — ~890M a.a.',
    classification: 'Phylum: Mollusca Exo-Helical / Clase: Cephalopoda Luminis',
    location: 'Cráter Valles Marineris-7, Marte',
    description: 'La Amonita Alienígena (Luminus spiralis marcianus) es quizás el fósil más estudiado de la xenopaleontología moderna. Su caparazón en espiral logarítmica perfecta contiene nano-cristales de apatita fluorescente que, según el Dr. Sagan Institute (2031), habrían producido luz visible en el espectro violeta bajo la presión de los océanos de amoníaco de Marte primitivo. Los científicos debaten si esta bioluminiscencia era de cortejo o de evasión depredatoria. El especimen más completo mide 34 cm de diámetro.',
  },
  {
    name: 'Esqueleto del Visitante',
    imagePath: '/assets/fossils/fossil_esqueleto.png',
    color: '#C8C8C8', glow: '#00FFFF',
    hint: 'Restos óseos de un humanoide de cráneo grande, adaptado a gravedad cero y telepatía.',
    pts: 500,
    era: 'Era Antropoide Cósmica — ~2,400M a.a.',
    classification: 'Phylum: Chordata / Orden: Hominidae Gravitas Nullum',
    location: 'Meseta Hellas, Marte — Profundidad 3.2 km',
    description: 'El Esqueleto del Visitante (Homo gravitas nullum) fue descubierto en 2029 durante la misión Ares IV. Su cráneo de 48 cm, tres veces mayor que el Homo sapiens moderno, alberga cavidades consistentes con lóbulos electromagnéticos no presentes en ninguna especie terrestre conocida. Los huesos presentan una densidad de 0.3 g/cm³, incompatible con existencia en gravedad planetaria, sugiriendo origen en hábitat orbital o microgravedad prolongada. La controversia científica sobre su autenticidad extraterrestre persiste.',
  },
  {
    name: 'Leviatán del Vacío',
    imagePath: '/assets/fossils/fossil_ballena.png',
    color: '#1A4A6B', glow: '#00DDFF',
    hint: 'Gigantesca criatura que filtraba polvo estelar para alimentarse en nebulosas frías.',
    pts: 600,
    era: 'Cenozoico Nebular — ~4,100M a.a.',
    classification: 'Phylum: Megachordata Vacuum / Familia: Stellivore Balaenidae',
    location: 'Nebulosa de Orión, muestra carbonácea recuperada',
    description: 'El Leviatán del Vacío (Stellivore magnus) es la criatura fosilizada más grande jamás catalogada en el registro xenopaleontológico. Los modelos computacionales de la ESA (2033) sugieren que esta entidad de 400 metros de longitud habitó en regiones de alta densidad de polvo estelar de la nebulosa primitiva, filtrando partículas de carbono y silicio con un aparato branquial de microtubos de grafeno orgánico. Su sistema nervioso descentralizado, con 47 ganglios autónomos, le habría permitido sobrevivir en el vacío casi perfecto del espacio interestelar.',
  },
  {
    name: 'Hongo de Esporas Cuánticas',
    imagePath: '/assets/fossils/fossil_hongo.png',
    color: '#4a2a6a', glow: '#aa44ff',
    hint: 'Fósil de flora fúngica capaz de interconectar biomas enteros a través de micelio cuántico.',
    pts: 300,
    era: 'Arcaico Fúngico Cuántico — ~3,800M a.a.',
    classification: 'Reino: Mycota Quantalis / Clase: Entanglomycetes',
    location: 'Europa (luna de Júpiter), bajo la costra de hielo',
    description: 'El Hongo de Esporas Cuánticas (Quantalis micelium europa) fue detectado mediante radar de penetración glacial en 2028. Su micelio —red de filamentos— muestra propiedades de entrelazamiento cuántico: partículas esporas separadas por kilómetros mantienen coherencia cuántica a temperaturas de -170°C. El Dr. Penrose Xu (MIT Quantum Biology, 2032) propone que esta red conectaba biomas subglaciales enteros de Europa, actuando como un cerebro distribuido de alcance planetario. Las esporas conservadas muestran ADN en triple hélice, único en todo el registro biológico conocido.',
  },
  {
    name: 'Artrópodo Magmático',
    imagePath: '/assets/fossils/fossil_escorpion.png',
    color: '#5a2a0a', glow: '#ff6622',
    hint: 'Depredador blindado que nadaba en ríos de lava, con una cola de aguijón termo-tóxico.',
    pts: 450,
    era: 'Volcánico Superior — ~1,200M a.a.',
    classification: 'Phylum: Arthropoda Ignis / Orden: Scorpionida Pyroclastica',
    location: 'Volcán Olympus Mons, Marte — Flujo de lava solidificada',
    description: 'El Artrópodo Magmático (Pyroclasticus ferrum ignis) desafió todos los supuestos sobre biología extremófila. Su exoesqueleto, compuesto por una aleación orgánica de titanio y cromo biogénico de 12 mm de grosor, le permitía soportar temperaturas de 1,100°C. La cola de aguijón liberaba un compuesto termoquímico que disolvía silicatos minerales, convirtiendo la roca volcánica en nutrientes asimilables. Los análisis de isótopos de oxígeno sugieren que no respiraba en el sentido convencional, sino que realizaba fotosíntesis termoquímica usando el calor como fuente de energía primaria.',
  },
  {
    name: 'Gusano Devorador de Rocas',
    imagePath: '/assets/fossils/fossil_gusano.png',
    color: '#2a4a2a', glow: '#44ee44',
    hint: 'Colosal anélido subterráneo con fauces circulares dentadas para triturar cuarzo alienígena.',
    pts: 550,
    era: 'Litosférico Profundo — ~2,900M a.a.',
    classification: 'Phylum: Annelida Lithos / Familia: Lithophagidae Colossalis',
    location: 'Ceres (cinturón de asteroides) — Núcleo mineral',
    description: 'El Gusano Devorador de Rocas (Lithophagus titanus) fue recuperado del núcleo mineral de Ceres durante la misión DAWN-2 (2031). Este anélido de 200 metros de longitud presentaba un aparato bucal radular con 4,800 dientes de diamante orgánico capaces de triturar cuarzo con una fuerza equivalente a 50,000 Newtons. Los análisis geomorfológicos de Ceres revelan extensas galerías tubulares de entre 3 y 8 metros de diámetro que este organismo habría excavado a lo largo de millones de años, creando una red subterránea comparable en complejidad a las colmenas de termitas terrestres.',
  },
  {
    name: 'Cazador Atmosférico',
    imagePath: '/assets/fossils/fossil_pterodactilo.png',
    color: '#3a3a6a', glow: '#8888ff',
    hint: 'Reptil volador fosilizado con alas cristalinas para surcar tormentas de gas tóxico.',
    pts: 480,
    era: 'Paleozoico Atmosférico — ~670M a.a.',
    classification: 'Clase: Reptilia Crystalloptera / Orden: Pterodactylia Toxica',
    location: 'Atmosfera alta de Venus — Muestra en gel ámbar sulfúrico',
    description: 'El Cazador Atmosférico (Crystalloptera venusianus) es el único organismo fosilizado encontrado en suspensión atmosférica. Atrapado en ámbar sulfúrico a 48 km de altitud venusiana, sus alas de 6 metros de envergadura estaban construidas con membranas de silicato cristalizado piezoeléctrico que convertían las diferencias de presión atmosférica en impulsos eléctricos para orientación —similar al radar biológico. La atmósfera primitiva de Venus, antes de su efecto invernadero catastrófico, habría sido habitable en sus capas superiores donde las temperaturas eran de 20-37°C.',
  },
  {
    name: 'Cefalópodo del Cristal',
    imagePath: '/assets/fossils/fossil_pulpo.png',
    color: '#3a1a5a', glow: '#cc44ff',
    hint: 'Entidad cefalópoda con tentáculos cristalinos que manipulaba las ondas gravitacionales.',
    pts: 520,
    era: 'Criogénico Cuántico — ~3,100M a.a.',
    classification: 'Phylum: Cephalopoda Crystallis / Clase: Gravitomanipulata',
    location: 'Encélado (luna de Saturno) — Océano subsuperficial',
    description: 'El Cefalópodo del Cristal (Gravitomanipulator enceladus) representa el organismo más enigmático del registro xenopaleontológico. Sus ocho tentáculos, compuestos de calcita piezoelectrónica pura, habrían funcionado como antenas gravitacionales capaces de detectar y potencialmente manipular perturbaciones en el espacio-tiempo local. El Dr. Kip Thorne Institute (2034) publicó modelos teóricos demostrando que colonias de millones de estos organismos podrían haber generado micro-ondas gravitacionales detectables. Su sistema nervioso no tiene análogo en ningún árbol evolutivo terrestre.',
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
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const loadedImagesRef = useRef({});

  useEffect(() => {
    let loadedCount = 0;
    FOSSILS.forEach(f => {
      const img = new window.Image();
      img.src = f.imagePath;
      img.onload = () => {
        loadedImagesRef.current[f.name] = img;
        loadedCount++;
        if (loadedCount === FOSSILS.length) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        console.error('Error loading fossil image:', f.imagePath);
        loadedCount++;
        if (loadedCount === FOSSILS.length) {
          setImagesLoaded(true);
        }
      };
    });
  }, []);

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
  const [museumIdx, setMuseumIdx] = useState(0); // current specimen in museum viewer

  // Museum state (localStorage persisted)
  const [museum, setMuseum] = useState(() => {
    try { return JSON.parse(localStorage.getItem('xenoMuseum') || '[]'); }
    catch { return []; }
  });

  // Reset game to initial state (avoids window.location.reload)
  const resetGame = useCallback(() => {
    setCurrentLevel(0);
    setGameState('digging');
    setTimeLeft(getTimeForLevel(0));
    setIntegrity(100);
    setScore(0);
    setTotalScore(0);
    setRevealed(false);
    setMessage('');
    setShowMuseum(false);
    setMuseumIdx(0);
  }, []);

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

      // Draw fossil underneath — FIXED: use preloaded image, no path.forEach
      ctx.save();
      ctx.globalAlpha = 0.45;
      ctx.translate(FOSSIL_CX, FOSSIL_CY);
      ctx.shadowColor = currentFossil.glow;
      ctx.shadowBlur = 24;
      const previewImg = loadedImagesRef.current[currentFossil.name];
      if (previewImg) {
        ctx.drawImage(previewImg, -90, -90, 180, 180);
      } else {
        // Fallback circle if image not loaded yet
        ctx.fillStyle = currentFossil.color;
        ctx.beginPath();
        ctx.arc(0, 0, 60, 0, Math.PI * 2);
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
        const currentImage = loadedImagesRef.current[currentFossil.name];
        if (currentImage) {
          ctx.globalCompositeOperation = 'source-over';
          ctx.shadowColor = currentFossil.glow;
          ctx.shadowBlur = 40;
          const iw = 180, ih = 180;
          ctx.drawImage(currentImage, -iw/2, -ih/2, iw, ih);
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

      {/* Museum Overlay — Single Specimen Viewer */}
      <AnimatePresence>
        {showMuseum && (() => {
          const currentSlot = FOSSILS[museumIdx];
          const currentCollected = museum.find(m => m.id === currentSlot.name);
          const collectedDate = currentCollected
            ? new Date(currentCollected.discoveredAt).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })
            : null;
          const prevIdx = (museumIdx - 1 + FOSSILS.length) % FOSSILS.length;
          const nextIdx = (museumIdx + 1) % FOSSILS.length;
          const gR = parseInt(currentSlot.glow.slice(1,3),16);
          const gG = parseInt(currentSlot.glow.slice(3,5),16);
          const gB = parseInt(currentSlot.glow.slice(5,7),16);

          return (
            <motion.div key="museum-overlay"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              style={{
                position: 'absolute', inset: 0, zIndex: 100,
                display: 'flex', flexDirection: 'column',
                borderRadius: '20px', overflow: 'hidden',
                background: 'linear-gradient(180deg, #060414 0%, #0A0820 55%, #06101A 100%)',
                fontFamily: "'Georgia', serif",
              }}
            >
              {/* Header */}
              <div style={{
                padding: '0.8rem 1.2rem',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: '1px solid rgba(100,60,200,0.3)',
                background: 'rgba(10,5,30,0.85)',
                backdropFilter: 'blur(12px)',
                zIndex: 2, position: 'relative',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ fontSize: '1.4rem' }}>🏛️</div>
                  <div>
                    <div style={{ color: '#C8A84A', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 'bold', textShadow: '0 0 12px rgba(200,168,74,0.5)' }}>
                      Museo Xeno-Paleontológico
                    </div>
                    <div style={{ color: 'rgba(200,168,74,0.45)', fontSize: '0.6rem', letterSpacing: '0.06em' }}>
                      COLECCIÓN PRIVADA · {museum.length}/{TOTAL_LEVELS} ESPECÍMENES
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    {FOSSILS.map((f, i) => {
                      const has = museum.some(m => m.id === f.name);
                      return (
                        <button key={i} onClick={() => setMuseumIdx(i)}
                          style={{
                            width: i === museumIdx ? 12 : 8, height: i === museumIdx ? 12 : 8,
                            borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0,
                            background: i === museumIdx ? '#C8A84A' : has ? f.glow : 'rgba(255,255,255,0.12)',
                            transition: 'all 0.25s',
                            boxShadow: i === museumIdx ? `0 0 8px ${currentSlot.glow}` : 'none',
                          }}
                        />
                      );
                    })}
                  </div>
                  <button onClick={() => setShowMuseum(false)}
                    style={{
                      background: 'rgba(100,60,200,0.2)', border: '1px solid rgba(100,60,200,0.5)',
                      color: '#C8A84A', borderRadius: '8px', width: 32, height: 32,
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
                    }}>
                    <Pickaxe size={14} />
                  </button>
                </div>
              </div>

              {/* Specimen display zone */}
              <div style={{
                flex: '0 0 auto', position: 'relative', height: '260px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
              }}>
                {currentCollected && (
                  <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    background: `radial-gradient(ellipse at 50% 70%, rgba(${gR},${gG},${gB},0.18) 0%, transparent 70%)`,
                  }} />
                )}
                <div style={{
                  position: 'absolute', top: '0.7rem', left: '50%', transform: 'translateX(-50%)',
                  padding: '3px 14px',
                  background: 'rgba(0,0,0,0.75)', border: `1px solid ${currentSlot.glow}44`,
                  borderRadius: '20px', color: currentSlot.glow,
                  fontFamily: 'monospace', fontSize: '0.62rem', letterSpacing: '0.12em',
                  textTransform: 'uppercase', zIndex: 3,
                }}>
                  XP-{String(museumIdx + 1).padStart(3, '0')} · {museumIdx + 1} / {FOSSILS.length}
                </div>
                <button onClick={() => setMuseumIdx(prevIdx)}
                  style={{
                    position: 'absolute', left: '0.8rem',
                    background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(200,168,74,0.35)',
                    borderRadius: '50%', width: 42, height: 42, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#C8A84A', transition: 'all 0.2s', zIndex: 4,
                  }}>
                  <ChevronLeft size={20} />
                </button>
                <AnimatePresence mode="wait">
                  <motion.div key={museumIdx}
                    initial={{ opacity: 0, scale: 0.82, x: 30 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.82, x: -30 }}
                    transition={{ type: 'spring', damping: 22, stiffness: 220 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                  >
                    {currentCollected ? (
                      <>
                        <img
                          src={currentSlot.imagePath}
                          alt={currentSlot.name}
                          style={{
                            width: '200px', height: '200px', objectFit: 'contain',
                            filter: `drop-shadow(0 6px 20px ${currentSlot.glow}90) drop-shadow(0 0 50px ${currentSlot.glow}30)`,
                            mixBlendMode: 'screen',
                          }}
                          onError={e => { e.currentTarget.style.opacity = '0'; }}
                        />
                        <div style={{
                          width: '180px', height: '6px', marginTop: '-6px',
                          background: `linear-gradient(90deg, transparent 0%, ${currentSlot.glow}60 25%, rgba(200,168,74,0.8) 50%, ${currentSlot.glow}60 75%, transparent 100%)`,
                          borderRadius: '2px',
                          boxShadow: `0 0 20px ${currentSlot.glow}80, 0 0 40px ${currentSlot.glow}30`,
                        }} />
                        <div style={{ width: '130px', height: '3px', marginTop: '2px', background: 'linear-gradient(90deg, transparent, rgba(200,168,74,0.3), transparent)', borderRadius: '1px' }} />
                      </>
                    ) : (
                      <div style={{
                        width: '180px', height: '200px',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        border: '2px dashed rgba(100,100,150,0.25)', borderRadius: '14px', background: 'rgba(8,6,20,0.7)',
                      }}>
                        <div style={{ fontSize: '3rem', opacity: 0.25, marginBottom: '0.5rem' }}>?</div>
                        <div style={{ color: 'rgba(100,100,150,0.45)', fontFamily: 'monospace', fontSize: '0.65rem', letterSpacing: '0.1em' }}>SIN DESCUBRIR</div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
                <button onClick={() => setMuseumIdx(nextIdx)}
                  style={{
                    position: 'absolute', right: '0.8rem',
                    background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(200,168,74,0.35)',
                    borderRadius: '50%', width: 42, height: 42, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#C8A84A', transition: 'all 0.2s', zIndex: 4,
                  }}>
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Info panel */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '0.8rem 1.2rem 1rem', background: 'rgba(5,3,15,0.95)', borderTop: `1px solid ${currentSlot.glow}33` }}>
                {currentCollected ? (
                  <>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.7rem' }}>
                      {[
                        { icon: '⚗️', label: `${currentSlot.pts} pts base` },
                        { icon: '⏳', label: currentSlot.era },
                        { icon: '📍', label: currentSlot.location },
                      ].map((tag, i) => (
                        <div key={i} style={{
                          background: i === 0 ? `rgba(${gR},${gG},${gB},0.15)` : i === 1 ? 'rgba(200,168,74,0.1)' : 'rgba(80,50,160,0.15)',
                          border: `1px solid ${i === 0 ? currentSlot.glow + '44' : i === 1 ? 'rgba(200,168,74,0.3)' : 'rgba(80,50,160,0.3)'}`,
                          borderRadius: '6px', padding: '3px 8px',
                          display: 'flex', alignItems: 'center', gap: '4px',
                        }}>
                          <span style={{ fontSize: '0.65rem' }}>{tag.icon}</span>
                          <span style={{ color: 'rgba(220,200,180,0.75)', fontSize: '0.62rem', lineHeight: 1.3 }}>{tag.label}</span>
                        </div>
                      ))}
                    </div>
                    <h3 style={{ margin: '0 0 2px', color: '#C8A84A', fontSize: '1rem', letterSpacing: '0.04em', textShadow: `0 0 14px ${currentSlot.glow}55` }}>
                      {currentSlot.name}
                    </h3>
                    <div style={{ color: 'rgba(200,168,74,0.55)', fontSize: '0.63rem', fontStyle: 'italic', marginBottom: '0.6rem' }}>
                      {currentSlot.classification}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.7rem' }}>
                      <span style={{ color: '#FFD700', fontSize: '0.85rem' }}>
                        {'★'.repeat(getDifficultyStars(currentSlot.pts))}{'☆'.repeat(5 - getDifficultyStars(currentSlot.pts))}
                      </span>
                      <span style={{ color: 'rgba(255,215,0,0.5)', fontFamily: 'monospace', fontSize: '0.68rem' }}>{currentCollected.pts} pts obtenidos</span>
                      <span style={{ marginLeft: 'auto', color: 'rgba(200,168,74,0.35)', fontSize: '0.6rem' }}>{collectedDate}</span>
                    </div>
                    <div style={{
                      background: 'rgba(3,2,10,0.8)', border: `1px solid rgba(${gR},${gG},${gB},0.15)`,
                      borderRadius: '8px', padding: '0.7rem 0.9rem',
                      color: 'rgba(215,205,185,0.82)', fontSize: '0.7rem', lineHeight: 1.75, fontFamily: "'Georgia', serif",
                    }}>
                      {currentSlot.description}
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'rgba(80,80,120,0.5)' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.7rem', opacity: 0.35 }}>🔒</div>
                    <div style={{ fontSize: '0.82rem', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>Espécimen no recuperado</div>
                    <div style={{ fontSize: '0.68rem', opacity: 0.7, lineHeight: 1.6 }}>Completa una excavación para añadir este fósil a tu colección</div>
                  </div>
                )}
              </div>

              {/* Footer progress */}
              <div style={{ padding: '0.5rem 1.2rem', borderTop: '1px solid rgba(80,50,160,0.2)', background: 'rgba(4,3,12,0.9)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={{ flex: 1, height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${(museum.length / TOTAL_LEVELS) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #5533AA, #C8A84A)', transition: 'width 0.6s', borderRadius: '2px', boxShadow: '0 0 6px rgba(200,168,74,0.4)' }} />
                </div>
                <span style={{ color: 'rgba(200,168,74,0.5)', fontFamily: 'monospace', fontSize: '0.65rem', whiteSpace: 'nowrap' }}>
                  {museum.length}/{TOTAL_LEVELS} · {museum.reduce((a, m) => a + (m.pts || 0), 0)} pts
                </span>
              </div>
            </motion.div>
          );
        })()}
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
                      const currentImage = loadedImagesRef.current[currentFossil.name];
                      if (currentImage) {
                        vctx.globalCompositeOperation = 'source-over';
                        vctx.shadowColor = currentFossil.glow;
                        vctx.shadowBlur = 30;
                        const iw = 150, ih = 150;
                        vctx.translate(90, 90);
                        vctx.drawImage(currentImage, -iw/2, -ih/2, iw, ih);
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
              <button onClick={resetGame}
                style={{ background: '#FF8844', color: 'black', border: 'none', padding: '0.8rem 2rem', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
                Reintentar
              </button>
              <button onClick={() => { if (onComplete) onComplete(0); }}
                style={{ background: 'transparent', color: '#88CCFF', border: '1px solid rgba(100,180,255,0.4)', padding: '0.8rem 2rem', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', marginTop: '0.5rem' }}>
                Volver al Arcade
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
                <button onClick={resetGame}
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
