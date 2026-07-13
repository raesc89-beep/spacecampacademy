'use client';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Gamepad2, Trophy, Star, X } from 'lucide-react';
import Link from 'next/link';
import MemoryGame from '@/components/games/MemoryGame';
import WordSearch from '@/components/games/WordSearch';
import AsteroidTrivia from '@/components/games/AsteroidTrivia';
import SpaceBingo from '@/components/games/SpaceBingo';
import SpaceTimelineDragDrop from '@/components/games/SpaceTimelineDragDrop';
import StarFinder from '@/components/games/StarFinder';
import LaikaFinder from '@/components/games/LaikaFinder';
import HamImpulse from '@/components/games/HamImpulse';
import AstrolabioQuantico from '@/components/games/AstrolabioQuantico';
import XenoPaleontologia from '@/components/games/XenoPaleontologia';
import GravedadCero from '@/components/games/GravedadCero';
import AsistenciaGravitacional from '@/components/games/AsistenciaGravitacional';
import ArcadeRanking, { saveArcadeScore } from '@/components/ArcadeRanking';
import { db } from '@/lib/firebase';
import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Map gameId -> gameName for display and Firestore ─── */
const GAME_NAMES = {
  memory:     'Memoria Fotográfica',
  words:      'Sopa Sideral',
  trivia:     'Trivia de Asteroides',
  bingo:      'Lotería Cósmica',
  timeline:   'Carrera Espacial',
  finder:     'Radar de Anomalías',
  laika:      'Encuentra a Laika',
  ham:        'Impulso de Ham',
  astrolabio: 'Astrolabio Cuántico',
  xeno:       'Xeno-Paleontología',
  gravedad:   'Conecta la Estación',
  slingshot:  'Asistencia Gravitacional',
};

/* ─── GAMES data array: all 16 games ─── */
const GAMES = [
  { id: 'memory', name: 'Memoria Fotográfica', desc: 'Empareja las holo-tarjetas planetarias usando tu radar.', emoji: '🪐', color: '#00FF88', btnText: 'INICIAR SIMULACIÓN', action: 'inline', category: 'cerebro' },
  { id: 'words', name: 'Sopa Sideral', desc: 'Busca lexemas ocultos en el rastreador ortogonal.', emoji: '🔤', color: '#00E4FF', btnText: 'INICIAR SIMULACIÓN', action: 'inline', category: 'cerebro' },
  { id: 'trivia', name: 'Trivia de Asteroides', desc: 'Dispara la respuesta correcta antes del impacto.', emoji: '☄️', color: '#FF64C8', btnText: 'DEFENDER ÓRBITA', action: 'inline', category: 'cerebro' },
  { id: 'bingo', name: 'Lotería Cósmica', desc: 'Marca la anomalía al instante que el Cómputo la canta.', emoji: '🎫', color: '#FFD700', btnText: 'EXTRAER TARJETA', action: 'inline', category: 'cerebro' },
  { id: 'timeline', name: 'Carrera Espacial', desc: 'Ordena la historia sideral arrastrando hitos NASA.', emoji: '🚀', color: '#8A2BE2', btnText: 'RECONSTRUIR', action: 'inline', category: 'accion' },
  { id: 'ham', name: 'Impulso de Ham', desc: 'Presiona en el momento exacto para salvar a Ham.', emoji: '🐵', color: '#00FF88', btnText: 'IGNICIÓN ORBITAL', action: 'inline', category: 'accion' },
  { id: 'gravedad', name: 'Conecta la Estación', desc: 'Lanza el cable a través de cinturones de asteroides para conectar la ISS.', emoji: '🔗', color: '#FF6060', btnText: '🚀 LANZAR CABLE', action: 'inline', category: 'accion' },
  { id: 'slingshot', name: 'Asistencia Gravitacional', desc: 'Usa la gravedad de los planetas para hacer slingshot.', emoji: '🛸', color: '#FFAA44', btnText: '🚀 LANZAR SONDA', action: 'inline', category: 'accion' },
  { id: 'astrolabio', name: 'Astrolabio Cuántico', desc: 'Alinea los anillos del astrolabio medieval.', emoji: '🔭', color: '#00E4FF', btnText: 'CALIBRAR ESFERAS', action: 'inline', category: 'ciencia' },
  { id: 'xeno', name: 'Xeno-Paleontología', desc: 'Excava fósiles alienígenas en el hielo marciano.', emoji: '🏺', color: '#88CCFF', btnText: 'EXCAVAR', action: 'inline', category: 'ciencia' },
  { id: 'finder', name: 'Radar de Anomalías', desc: 'Detecta señales en el radar cósmico antes de que se desvanezcan.', emoji: '📡', color: '#00FF88', btnText: '📡 ACTIVAR RADAR', action: 'inline', category: 'ciencia' },
  { id: 'laika', name: 'Encuentra a Laika', desc: 'Detecta a Laika perdida en la inmensidad gráfica.', emoji: '🐕‍🦺', color: '#FFD700', btnText: 'INICIAR BÚSQUEDA', action: 'inline', category: 'aventura' },
  { id: 'decoder', name: 'Interceptación Estelar', desc: 'Decodifica frecuencias alienígenas en la radio.', emoji: '📻', color: '#00FF88', btnText: 'ESCUCHAR FRECUENCIAS', action: 'link', href: '/minigames/decoder', category: 'aventura' },
  { id: 'creator', name: 'Génesis Planetario', desc: 'Simulador experimental. Construye un exoplaneta.', emoji: '🌍', color: '#ff5722', btnText: 'INICIAR MÁQUINA', action: 'link', href: '/minigames/creator', category: 'aventura' },
  { id: 'tardigrado', name: 'Supervivencia Criptobiótica', desc: 'Simula cuerpos blandos. Sobrevive con criptobiosis.', emoji: '🦠', color: '#00E4FF', btnText: 'INICIAR SIMULACIÓN', action: 'link', href: '/arcade/tardigrado', category: 'aventura' },
  { id: 'relatividad', name: 'Carreras Relativistas', desc: 'Acelera a velocidades luz. Observa el efecto Doppler.', emoji: '🚀', color: '#FF2A2A', btnText: 'ACELERAR MOTOR', action: 'link', href: '/arcade/relatividad', category: 'aventura' },
];

/* ─── Category filter definitions ─── */
const CATEGORIES = [
  { key: 'todos', label: '🎮 Todos' },
  { key: 'cerebro', label: '🧠 Cerebro' },
  { key: 'accion', label: '🚀 Acción' },
  { key: 'ciencia', label: '🔬 Ciencia' },
  { key: 'aventura', label: '🐾 Aventura' },
];

/* ─── Glitch keyframes injected once ─── */
const glitchCSS = `
@keyframes glitch {
  0%, 100% { text-shadow: 0 0 20px #FF00FF, 0 0 40px #FF00FF; }
  20% { text-shadow: -2px 0 #00E4FF, 2px 0 #FF00FF, 0 0 20px #FF00FF; }
  40% { text-shadow: 2px 0 #FF00FF, -2px 0 #00E4FF, 0 0 30px #FF00FF; }
  60% { text-shadow: -1px 2px #FFD700, 1px -1px #00E4FF, 0 0 20px #FF00FF; }
  80% { text-shadow: 1px -2px #00E4FF, -1px 1px #FF00FF, 0 0 25px #FF00FF; }
}
@keyframes neonPulse {
  0%, 100% { filter: drop-shadow(0 0 15px rgba(255,0,255,0.8)); }
  50% { filter: drop-shadow(0 0 30px rgba(255,0,255,1)) drop-shadow(0 0 60px rgba(255,0,255,0.4)); }
}
@keyframes borderGlow {
  0% { border-color: rgba(255,255,255,0.08); }
  50% { border-color: rgba(255,0,255,0.35); }
  100% { border-color: rgba(255,255,255,0.08); }
}
`;

/* ═══════════════════════════════════════════════════════
   STARFIELD CANVAS BACKGROUND COMPONENT
   ═══════════════════════════════════════════════════════ */
function StarfieldCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    /* Respect reduced motion */
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    /* Stars */
    const STAR_COLORS = ['#ffffff', '#00E4FF', '#FF00FF', '#FFD700'];
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.5 + Math.random() * 2.5,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      phase: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 1.5,
    }));

    /* Nebulae */
    const nebulae = [
      { x: w * 0.2, y: h * 0.3, radius: 280, color: [255, 0, 255], vx: 0.12, vy: 0.08 },
      { x: w * 0.75, y: h * 0.6, radius: 320, color: [0, 228, 255], vx: -0.09, vy: 0.06 },
      { x: w * 0.5, y: h * 0.15, radius: 250, color: [255, 215, 0], vx: 0.07, vy: -0.05 },
    ];

    /* Shooting star state */
    let shootingStar = null;
    let lastShootTime = performance.now();
    const SHOOT_INTERVAL = 8000;

    function spawnShootingStar(now) {
      const startX = Math.random() * w;
      const startY = Math.random() * h * 0.4;
      const angle = Math.PI / 6 + Math.random() * (Math.PI / 4);
      shootingStar = {
        x: startX,
        y: startY,
        angle,
        speed: 12 + Math.random() * 8,
        length: 80 + Math.random() * 60,
        life: 1,
        decay: 0.015 + Math.random() * 0.01,
      };
      lastShootTime = now;
    }

    let animId;
    const FPS_INTERVAL = 1000 / 30;
    let lastFrameTime = 0;

    function draw(now) {
      animId = requestAnimationFrame(draw);
      if (now - lastFrameTime < FPS_INTERVAL) return;
      lastFrameTime = now;

      ctx.clearRect(0, 0, w, h);

      /* Nebulae */
      if (!prefersReduced) {
        for (const n of nebulae) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -n.radius) n.x = w + n.radius;
          if (n.x > w + n.radius) n.x = -n.radius;
          if (n.y < -n.radius) n.y = h + n.radius;
          if (n.y > h + n.radius) n.y = -n.radius;
          const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius);
          grad.addColorStop(0, `rgba(${n.color[0]},${n.color[1]},${n.color[2]},0.06)`);
          grad.addColorStop(1, `rgba(${n.color[0]},${n.color[1]},${n.color[2]},0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      /* Stars */
      const t = now * 0.001;
      for (const s of stars) {
        const twinkle = prefersReduced ? 0.8 : 0.4 + 0.6 * ((Math.sin(t * s.speed + s.phase) + 1) / 2);
        ctx.globalAlpha = twinkle;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      /* Shooting star */
      if (!prefersReduced) {
        if (!shootingStar && now - lastShootTime > SHOOT_INTERVAL) {
          spawnShootingStar(now);
        }
        if (shootingStar) {
          const ss = shootingStar;
          ss.x += Math.cos(ss.angle) * ss.speed;
          ss.y += Math.sin(ss.angle) * ss.speed;
          ss.life -= ss.decay;
          if (ss.life <= 0 || ss.x > w + 100 || ss.y > h + 100) {
            shootingStar = null;
          } else {
            const tailX = ss.x - Math.cos(ss.angle) * ss.length;
            const tailY = ss.y - Math.sin(ss.angle) * ss.length;
            const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
            grad.addColorStop(0, `rgba(255,255,255,0)`);
            grad.addColorStop(1, `rgba(255,255,255,${ss.life})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(tailX, tailY);
            ctx.lineTo(ss.x, ss.y);
            ctx.stroke();
            /* bright head */
            ctx.fillStyle = `rgba(255,255,255,${ss.life})`;
            ctx.beginPath();
            ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function ArcadeExoplanet() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const [activeGame, setActiveGame] = useState(null);
  const [activeRankGame, setActiveRankGame] = useState('global');
  const [activeCategory, setActiveCategory] = useState('todos');
  const [showRanking, setShowRanking] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const styleInjected = useRef(false);

  /* Inject keyframe CSS once */
  useEffect(() => {
    if (styleInjected.current) return;
    styleInjected.current = true;
    const tag = document.createElement('style');
    tag.textContent = glitchCSS;
    document.head.appendChild(tag);
    return () => { try { document.head.removeChild(tag); } catch (_) {} };
  }, []);

  /* Default ranking visibility based on screen width */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShowRanking(window.innerWidth >= 1200);
    }
  }, []);

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  if (loading || !userData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#070B19', color: 'white', fontFamily: "'Outfit', sans-serif" }}>
        Aterrizando en Zona Arcade...
      </div>
    );
  }

  const userStars = userData?.progress?.stars || 0;

  const launchGame = (gameKey) => {
    setActiveGame(gameKey);
    setActiveRankGame(gameKey);
  };

  const handleComplete = (gameKey, score, alertMsg) => {
    saveArcadeScore(
      db,
      gameKey,
      GAME_NAMES[gameKey] || gameKey,
      user?.uid,
      userData?.name || 'Jugador',
      score
    );
    if (alertMsg) alert(alertMsg);
    setActiveGame(null);
  };

  /* Filter games by category */
  const filteredGames = activeCategory === 'todos'
    ? GAMES
    : GAMES.filter((g) => g.category === activeCategory);

  /* ─── helpers for card colors ─── */
  const rgba = (hex, a) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${a})`;
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#070B19', fontFamily: "'Outfit', sans-serif" }}>

      {/* ── Starfield Canvas Background ── */}
      <StarfieldCanvas />

      {/* ── Back Button ── */}
      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 100 }}>
        <Link
          href="/dashboard"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'white',
            textDecoration: 'none', background: 'rgba(255,0,255,0.15)',
            padding: '0.65rem 1.1rem', borderRadius: '30px',
            backdropFilter: 'blur(10px)', border: '1px solid rgba(255,0,255,0.4)',
            fontSize: '0.85rem', transition: 'background 0.2s',
          }}
        >
          <ChevronLeft size={20} /> Estación Orbital
        </Link>
      </div>

      {/* ── Main Content ── */}
      <main style={{ flex: 1, padding: '5rem 1.5rem 2rem 1.5rem', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* ── Header ── */}
        <header style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            style={{ animation: 'neonPulse 2s ease-in-out infinite' }}
          >
            <Gamepad2 size={52} color="#FF00FF" />
          </motion.div>
          <h1
            style={{
              fontSize: '2.4rem', margin: '0.6rem 0 0.3rem 0', color: 'white',
              animation: 'glitch 3s infinite', letterSpacing: '0.05em',
            }}
          >
            Cibernética Arcade
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', margin: 0 }}>
            Centro de Reclutamiento Sensorial y Simulaciones
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.4)', padding: '0.4rem 1.2rem', borderRadius: '20px', marginTop: '0.8rem', color: '#FFD700', fontSize: '0.85rem' }}>
            <Trophy size={15} /> Puntuación Total: {userStars} <Star size={12} />
          </div>
        </header>

        {/* ── Category Filter Tabs ── */}
        {!activeGame && (
          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <motion.button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    position: 'relative',
                    background: isActive ? 'rgba(255,0,255,0.2)' : 'rgba(255,255,255,0.04)',
                    border: isActive ? '1px solid rgba(255,0,255,0.6)' : '1px solid rgba(255,255,255,0.08)',
                    color: isActive ? '#FF00FF' : 'rgba(255,255,255,0.6)',
                    padding: '0.45rem 1rem',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: isActive ? 700 : 500,
                    transition: 'all 0.25s ease',
                  }}
                >
                  {cat.label}
                  {isActive && (
                    <motion.div
                      layoutId="tabUnderline"
                      style={{
                        position: 'absolute', bottom: -2, left: '20%', right: '20%', height: 2,
                        background: '#FF00FF', borderRadius: 2,
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </motion.button>
              );
            })}
            {/* Game count badge */}
            <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginLeft: '0.3rem' }}>
              {filteredGames.length} juegos
            </span>
          </div>
        )}

        {/* ── Ranking Toggle Button ── */}
        {!activeGame && (
          <button
            onClick={() => setShowRanking((p) => !p)}
            style={{
              position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 100,
              background: showRanking ? 'rgba(255,215,0,0.2)' : 'rgba(255,255,255,0.06)',
              border: showRanking ? '1px solid rgba(255,215,0,0.5)' : '1px solid rgba(255,255,255,0.12)',
              color: showRanking ? '#FFD700' : 'rgba(255,255,255,0.5)',
              width: 44, height: 44, borderRadius: '50%', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(10px)', transition: 'all 0.3s ease',
            }}
          >
            <Trophy size={20} />
          </button>
        )}

        {/* ── Layout: content + optional ranking sidebar ── */}
        <div style={{ display: 'flex', gap: '1.5rem', width: '100%', maxWidth: '1400px', alignItems: 'flex-start' }}>

          {/* ── Main Content Area ── */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* ── Game Grid (no active game) ── */}
            {!activeGame ? (
              <motion.div
                layout
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
                  gap: '1rem',
                  width: '100%',
                }}
              >
                <AnimatePresence mode="popLayout">
                  {filteredGames.map((game, idx) => {
                    const isHovered = hoveredCard === game.id;
                    const isLink = game.action === 'link';

                    return (
                      <motion.div
                        key={game.id}
                        layout
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: idx * 0.04, duration: 0.35, ease: 'easeOut' }}
                        onMouseEnter={() => setHoveredCard(game.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          backdropFilter: 'blur(12px)',
                          borderRadius: '20px',
                          border: `1px solid ${rgba(game.color, isHovered ? 0.6 : 0.2)}`,
                          padding: '1rem',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                          cursor: 'default',
                          transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.25s ease',
                          transform: isHovered ? 'scale(1.05) rotate(1deg)' : 'scale(1) rotate(0deg)',
                          boxShadow: isHovered
                            ? `0 0 25px ${rgba(game.color, 0.35)}, inset 0 0 30px ${rgba(game.color, 0.05)}`
                            : `0 0 0 transparent`,
                          animation: isHovered ? 'borderGlow 2s ease-in-out infinite' : 'none',
                        }}
                      >
                        {/* Icon */}
                        <div
                          style={{
                            width: 44, height: 44, borderRadius: 12,
                            background: rgba(game.color, 0.12),
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginBottom: '0.6rem',
                            boxShadow: `0 0 12px ${rgba(game.color, 0.25)}`,
                            fontSize: '1.4rem',
                            transition: 'box-shadow 0.3s',
                          }}
                        >
                          {game.emoji}
                        </div>

                        {/* Title */}
                        <h3
                          style={{
                            color: game.color, margin: '0 0 0.25rem 0',
                            fontSize: '0.9rem', fontWeight: 700, lineHeight: 1.2,
                          }}
                        >
                          {game.name}
                        </h3>

                        {/* Description – max 2 lines */}
                        <p
                          style={{
                            color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem',
                            margin: '0 0 0.65rem 0', lineHeight: 1.35,
                            display: '-webkit-box', WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical', overflow: 'hidden',
                          }}
                        >
                          {game.desc}
                        </p>

                        {/* Button / Link */}
                        {isLink ? (
                          <Link
                            href={game.href}
                            style={{
                              display: 'block', width: '100%', textAlign: 'center',
                              background: game.color,
                              color: ['#FFD700', '#00FF88', '#00E4FF', '#FFAA44', '#88CCFF'].includes(game.color) ? '#070B19' : 'white',
                              padding: '0.45rem 0.8rem', borderRadius: 10,
                              fontWeight: 700, fontSize: '0.75rem',
                              textDecoration: 'none', fontFamily: "'Outfit', sans-serif",
                              boxShadow: `0 0 14px ${rgba(game.color, 0.35)}`,
                              transition: 'box-shadow 0.3s',
                              letterSpacing: '0.03em',
                            }}
                          >
                            {game.btnText}
                          </Link>
                        ) : (
                          <button
                            onClick={() => launchGame(game.id)}
                            style={{
                              width: '100%', border: 'none', cursor: 'pointer',
                              background: game.color,
                              color: ['#FFD700', '#00FF88', '#00E4FF', '#FFAA44', '#88CCFF'].includes(game.color) ? '#070B19' : 'white',
                              padding: '0.45rem 0.8rem', borderRadius: 10,
                              fontWeight: 700, fontSize: '0.75rem',
                              fontFamily: "'Outfit', sans-serif",
                              boxShadow: `0 0 14px ${rgba(game.color, 0.35)}`,
                              transition: 'box-shadow 0.3s',
                              letterSpacing: '0.03em',
                            }}
                          >
                            {game.btnText}
                          </button>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            ) : (
              /* ── Active Game View ── */
              <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <h2 style={{ color: ['memory', 'ham'].includes(activeGame) ? 'var(--success)' : (['words'].includes(activeGame) ? 'var(--electric-blue)' : (['trivia'].includes(activeGame) ? '#FF64C8' : 'var(--gold-star)')), margin: 0 }}>
                     Simulador: {
                       activeGame === 'memory'     ? 'Memoria Fotográfica' :
                       activeGame === 'words'      ? 'Sopa Sideral' :
                       activeGame === 'trivia'     ? 'Defensa y Trivia' :
                       activeGame === 'laika'      ? 'Radar Biológico Táctico' :
                       activeGame === 'ham'        ? 'Control de Impulso Mercury' :
                       activeGame === 'astrolabio' ? 'Cosmos Piano' :
                       activeGame === 'xeno'       ? 'Xeno-Paleontología' :
                       activeGame === 'gravedad'   ? 'Conecta la Estación' :
                       activeGame === 'slingshot'  ? 'Surfea la Gravedad' :
                       activeGame === 'bingo'      ? 'Bingo Espacial' :
                       activeGame === 'timeline'   ? 'Línea del Tiempo' :
                       activeGame === 'finder'     ? 'Radar de Anomalías' :
                       'Simulador'
                     }
                  </h2>
                  <button
                    onClick={() => { setActiveGame(null); setActiveRankGame('global'); }}
                    style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    Cerrar Máquina
                  </button>
                </div>

                {activeGame === 'memory' && (
                   <MemoryGame onComplete={(score) => handleComplete('memory', score, `¡Nivel Excedido! Has demostrado alta competencia recolectando ${score} estrellas base.`)} />
                )}

                {activeGame === 'words' && (
                   <WordSearch onComplete={(score) => handleComplete('words', score, `¡Lexemas decodificados! Logro desbloqueado con ${score} estrellas.`)} />
                )}

                {activeGame === 'trivia' && (
                   <AsteroidTrivia onComplete={(score) => handleComplete('trivia', score, `¡Sobreviviste a la lluvia! Nave a salvo. Has juntado ${score} Puntuación.`)} />
                )}

                {activeGame === 'bingo' && (
                   <SpaceBingo onComplete={(score) => handleComplete('bingo', score, `¡BINGO EN EL VACÍO! Has marcado todo el panel obteniendo ${score} monedas de recompensa especial.`)} />
                )}

                {activeGame === 'timeline' && (
                   <SpaceTimelineDragDrop onComplete={(score) => handleComplete('timeline', score, `¡Historia Recuperada! Has alineado el tiempo ganando ${score} monedas.`)} />
                )}

                {activeGame === 'finder' && (
                   <StarFinder onComplete={(score) => handleComplete('finder', score, `¡Objeto Detectado! Optica calibrada. Recibes ${score} monedas.`)} />
                )}

                {activeGame === 'laika' && (
                   <LaikaFinder onComplete={(score) => handleComplete('laika', score, `¡Visualización Confirmada! Encontramos a Laika. Recibes ${score} monedas.`)} />
                )}

                {activeGame === 'ham' && (
                   <HamImpulse onComplete={(score) => handleComplete('ham', score, `¡Misión Terminada! Recibes recompensa de comandante: ${score} monedas.`)} />
                )}

                {activeGame === 'astrolabio' && (
                   <AstrolabioQuantico onComplete={(score) => { handleComplete('astrolabio', score ?? 0, null); }} />
                )}

                {activeGame === 'xeno' && (
                   <XenoPaleontologia onComplete={(score) => { handleComplete('xeno', score ?? 0, null); }} />
                )}

                {activeGame === 'gravedad' && (
                   <GravedadCero onComplete={(score) => { handleComplete('gravedad', score ?? 0, null); }} />
                )}

                {activeGame === 'slingshot' && (
                   <AsistenciaGravitacional onComplete={(score) => { handleComplete('slingshot', score ?? 0, null); }} />
                )}
              </div>
            )}
          </div>

          {/* ── Collapsible Ranking Sidebar ── */}
          <AnimatePresence>
            {showRanking && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{ overflow: 'hidden', flexShrink: 0 }}
              >
                <div style={{ width: 280, position: 'sticky', top: '5rem' }}>
                  <ArcadeRanking
                    gameId={activeRankGame}
                    gameName={GAME_NAMES[activeRankGame] || ''}
                    currentUserId={user?.uid}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </main>
    </div>
  );
}
