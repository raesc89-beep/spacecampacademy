'use client';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Gamepad2, Trophy, Star } from 'lucide-react';
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
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Map gameId -> gameName for display and Firestore
const GAME_NAMES = {
  memory:     'Memoria Fotográfica',
  words:      'Sopa Sideral',
  trivia:     'Trivia de Asteroides',
  bingo:      'Lotería Cósmica',
  timeline:   'Carrera Espacial',
  finder:     'Buscador Cósmico',
  laika:      'Encuentra a Laika',
  ham:        'Impulso de Ham',
  astrolabio: 'Astrolabio Cuántico',
  xeno:       'Xeno-Paleontología',
  gravedad:   'Reparación en Gravedad Cero',
  slingshot:  'Asistencia Gravitacional',
};

export default function ArcadeExoplanet() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const [activeGame, setActiveGame] = useState(null); // 'memory', 'words', etc.
  const [activeRankGame, setActiveRankGame] = useState('global');

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  if (loading || !userData) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a1a', color: 'white' }}>Aterrizando en Zona Arcade...</div>;
  }

  const userStars = userData?.progress?.stars || 0;

  // Helper: launch a game and update the rank sidebar
  const launchGame = (gameKey) => {
    setActiveGame(gameKey);
    setActiveRankGame(gameKey);
  };

  // Helper: handle game completion
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

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#050014' }}>
      
      {/* Botón Flotante para abandonar el Exoplaneta */}
      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 100 }}>
         <Link href="/dashboard/misiones" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'white', textDecoration: 'none', background: 'rgba(255,0,255,0.2)', padding: '0.8rem 1.2rem', borderRadius: '30px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,0,255,0.5)' }}>
             <ChevronLeft size={24} /> Estación Orbital
         </Link>
      </div>

      {/* Cyber Neon Background Effect */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% -20%, rgba(255, 0, 255, 0.15), rgba(0,0,0,1))', zIndex: 0, pointerEvents: 'none' }}></div>

      <main className="layout-container" style={{ flex: 1, padding: '6rem 2rem 2rem 2rem', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
             <Gamepad2 size={64} color="#FF00FF" style={{ filter: 'drop-shadow(0 0 15px rgba(255,0,255,0.8))' }} />
          </motion.div>
          <h1 style={{ fontSize: '3rem', margin: '1rem 0 0.5rem 0', color: 'white', textShadow: '0 0 20px #FF00FF' }}>Cibernética Arcade</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Centro de Reclutamiento Sensorial y Simulaciones</p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,215,0,0.1)', border: '1px solid var(--gold-star)', padding: '0.5rem 1.5rem', borderRadius: '20px', marginTop: '1rem', color: 'var(--gold-star)' }}>
             <Trophy size={18} /> Puntuación Gamer TotaL: {userStars} <Star size={14}/>
          </div>
        </header>

        {/* ── Two-column layout: Ranking sidebar + Game content ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '280px 1fr',
            gap: '2rem',
            width: '100%',
            maxWidth: '1300px',
            alignItems: 'start',
          }}
        >
          {/* ── LEFT: Sticky Ranking Panel ── */}
          <ArcadeRanking
            gameId={activeRankGame}
            gameName={GAME_NAMES[activeRankGame] || ''}
            currentUserId={user?.uid}
          />

          {/* ── RIGHT: Game Grid or Active Game ── */}
          <div>
            {/* Console Machine Selection */}
            {!activeGame ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', width: '100%' }}>
                
                {/* Máquina 1: Memorama */}
                <div className="glass-card" style={{ border: '1px solid rgba(0, 255, 136, 0.4)', background: 'rgba(0, 255, 136, 0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
                   <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'rgba(0, 255, 136, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: '0 0 20px rgba(0,255,136,0.3)' }}>
                      <img src="/assets/cartoon_earth.png" width="50" style={{ filter: 'drop-shadow(0 0 5px white)' }} />
                   </div>
                   <h2 style={{ color: 'var(--success)', margin: '0 0 0.5rem 0' }}>Memoria Fotográfica</h2>
                   <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Empareja las holo-tarjetas planetarias gastando la menor cantidad de energía posible en tu radar.</p>
                   <button onClick={() => launchGame('memory')} className="btn-primary" style={{ background: 'var(--success)', color: 'black', width: '100%', boxShadow: '0 0 20px rgba(0,255,136,0.4)', fontWeight: 'bold' }}>
                     INICIAR SIMULACIÓN
                   </button>
                </div>

                {/* Máquina 2: Sopa Sideral */}
                <div className="glass-card" style={{ border: '1px solid rgba(0, 228, 255, 0.4)', background: 'rgba(0, 228, 255, 0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
                   <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'rgba(0, 228, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: '0 0 20px rgba(0,228,255,0.3)' }}>
                      <span style={{ fontSize: '2.5rem' }}>🔤</span>
                   </div>
                   <h2 style={{ color: 'var(--electric-blue)', margin: '0 0 0.5rem 0' }}>Sopa Sideral</h2>
                   <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Busca anomalías intergalácticas y lexemas ocultos en tiempo récord utilizando el rastreador ortogonal.</p>
                   <button onClick={() => launchGame('words')} className="btn-primary" style={{ background: 'var(--electric-blue)', color: 'black', width: '100%', boxShadow: '0 0 20px rgba(0,228,255,0.4)', fontWeight: 'bold' }}>
                     INICIAR SIMULACIÓN
                   </button>
                </div>

                {/* Máquina 3: Trivia de Asteroides */}
                <div className="glass-card" style={{ border: '1px solid rgba(255, 100, 200, 0.4)', background: 'rgba(255, 100, 200, 0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
                   <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'rgba(255, 100, 200, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: '0 0 20px rgba(255,100,200,0.3)' }}>
                      <span style={{ fontSize: '2.5rem' }}>☄️</span>
                   </div>
                   <h2 style={{ color: '#FF64C8', margin: '0 0 0.5rem 0' }}>Trivia de Asteroides</h2>
                   <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Reflejos y mente: Dispara a la respuesta correcta antes del impacto crítico.</p>
                   <button onClick={() => launchGame('trivia')} className="btn-primary" style={{ background: '#FF64C8', color: 'white', width: '100%', boxShadow: '0 0 20px rgba(255,100,200,0.5)', fontWeight: 'bold' }}>
                     DEFENDER ÓRBITA
                   </button>
                </div>

                {/* Máquina 4: Lotería Cósmica */}
                <div className="glass-card" style={{ border: '1px solid rgba(255, 215, 0, 0.4)', background: 'rgba(255, 215, 0, 0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
                   <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'rgba(255, 215, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: '0 0 20px rgba(255,215,0,0.3)' }}>
                      <span style={{ fontSize: '2.5rem' }}>🎫</span>
                   </div>
                   <h2 style={{ color: 'var(--gold-star)', margin: '0 0 0.5rem 0' }}>Lotería Cósmica</h2>
                   <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Reflejos auditivos y visuales. Marca la anomalía espacial al instante que el Cómputo la canta.</p>
                   <button onClick={() => launchGame('bingo')} className="btn-primary" style={{ background: 'var(--gold-star)', color: 'black', width: '100%', boxShadow: '0 0 20px rgba(255,215,0,0.4)', fontWeight: 'bold' }}>
                     EXTRAER TARJETA
                   </button>
                </div>

                {/* Máquina 5: Línea Temporal NASA */}
                <div className="glass-card" style={{ border: '1px solid rgba(138, 43, 226, 0.4)', background: 'rgba(138, 43, 226, 0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
                   <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'rgba(138, 43, 226, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: '0 0 20px rgba(138,43,226,0.3)' }}>
                      <span style={{ fontSize: '2.5rem' }}>🚀</span>
                   </div>
                   <h2 style={{ color: '#8A2BE2', margin: '0 0 0.5rem 0' }}>Carrera Espacial</h2>
                   <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Ordena la historia sideral en esta prueba de Arrastrar y Soltar hitos de la NASA.</p>
                   <button onClick={() => launchGame('timeline')} className="btn-primary" style={{ background: '#8A2BE2', color: 'white', width: '100%', boxShadow: '0 0 20px rgba(138,43,226,0.4)', fontWeight: 'bold' }}>
                     RECONSTRUIR
                   </button>
                </div>

                {/* Máquina 6: Radar Óptico */}
                <div className="glass-card" style={{ border: '1px solid rgba(255, 69, 0, 0.4)', background: 'rgba(255, 69, 0, 0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
                   <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'rgba(255, 69, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: '0 0 20px rgba(255,69,0,0.3)' }}>
                      <span style={{ fontSize: '2.5rem' }}>🔎</span>
                   </div>
                   <h2 style={{ color: '#FF4500', margin: '0 0 0.5rem 0' }}>Buscador Cósmico</h2>
                   <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Agudiza tu visión. Descifra el acertijo y encuentra el objeto escondido en el polvo espacial.</p>
                   <button onClick={() => launchGame('finder')} className="btn-primary" style={{ background: '#FF4500', color: 'white', width: '100%', boxShadow: '0 0 20px rgba(255,69,0,0.4)', fontWeight: 'bold' }}>
                     ESCANEAR
                   </button>
                </div>

                {/* Máquina 7: Radar Biológico Laika */}
                <div className="glass-card" style={{ border: '1px solid rgba(255, 184, 0, 0.4)', background: 'rgba(255, 184, 0, 0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
                   <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'rgba(255, 184, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: '0 0 20px rgba(255,184,0,0.3)' }}>
                      <span style={{ fontSize: '2.5rem' }}>🐕‍🦺</span>
                   </div>
                   <h2 style={{ color: 'var(--gold-star)', margin: '0 0 0.5rem 0' }}>Encuentra a Laika</h2>
                   <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Afina tu óptica estelar. Detecta a Laika perdida en la inmensidad gráfica y trae a la heroína a casa.</p>
                   <button onClick={() => launchGame('laika')} className="btn-primary" style={{ background: 'var(--gold-star)', color: 'black', width: '100%', boxShadow: '0 0 20px rgba(255,184,0,0.4)', fontWeight: 'bold' }}>
                     INICIAR BÚSQUEDA
                   </button>
                </div>

                {/* Máquina 8: Impulso Mercury Ham */}
                <div className="glass-card" style={{ border: '1px solid rgba(0, 255, 136, 0.4)', background: 'rgba(0, 255, 136, 0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
                   <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'rgba(0, 255, 136, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: '0 0 20px rgba(0,255,136,0.3)' }}>
                      <span style={{ fontSize: '2.5rem' }}>🐵</span>
                   </div>
                   <h2 style={{ color: 'var(--success)', margin: '0 0 0.5rem 0' }}>Impulso de Ham</h2>
                   <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Pilota el motor suborbital. Presiona en el momento exacto para salvar a Ham de una altitud catastrófica.</p>
                   <button onClick={() => launchGame('ham')} className="btn-primary" style={{ background: 'var(--success)', color: 'black', width: '100%', boxShadow: '0 0 20px rgba(0,255,136,0.4)', fontWeight: 'bold' }}>
                     IGNICIÓN ORBITAL
                   </button>
                </div>

                {/* Máquina 9: Interceptación Estelar */}
                <div className="glass-card" style={{ border: '1px solid rgba(0, 255, 136, 0.4)', background: 'rgba(0, 255, 136, 0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
                   <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'rgba(0, 255, 136, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: '0 0 20px rgba(0,255,136,0.3)' }}>
                      <span style={{ fontSize: '2.5rem' }}>📻</span>
                   </div>
                   <h2 style={{ color: 'var(--success)', margin: '0 0 0.5rem 0' }}>Interceptación Estelar</h2>
                   <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Decodifica frecuencias alienígenas en la radio espacial para ganar logros.</p>
                   <Link href="/minigames/decoder" className="btn-primary" style={{ background: 'var(--success)', color: 'black', width: '100%', boxShadow: '0 0 20px rgba(0,255,136,0.4)', fontWeight: 'bold', display: 'block' }}>
                     ESCUCHAR FRECUENCIAS
                   </Link>
                </div>

                {/* Máquina 10: Génesis Planetario */}
                <div className="glass-card" style={{ border: '1px solid rgba(255, 87, 34, 0.4)', background: 'rgba(255, 87, 34, 0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
                   <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'rgba(255, 87, 34, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: '0 0 20px rgba(255,87,34,0.3)' }}>
                      <span style={{ fontSize: '2.5rem' }}>🌍</span>
                   </div>
                   <h2 style={{ color: '#ff5722', margin: '0 0 0.5rem 0' }}>Génesis Planetario</h2>
                   <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Simulador experimental físico. Construye un exoplaneta desde cero.</p>
                   <Link href="/minigames/creator" className="btn-primary" style={{ background: '#ff5722', color: 'white', width: '100%', boxShadow: '0 0 20px rgba(255,87,34,0.4)', fontWeight: 'bold', display: 'block' }}>
                     INICIAR MÁQUINA
                   </Link>
                </div>

                {/* Máquina 11: Supervivencia Criptobiótica */}
                <div className="glass-card" style={{ border: '1px solid rgba(0, 228, 255, 0.4)', background: 'rgba(0, 228, 255, 0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
                   <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'rgba(0, 228, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: '0 0 20px rgba(0,228,255,0.3)' }}>
                      <span style={{ fontSize: '2.5rem' }}>🦠</span>
                   </div>
                   <h2 style={{ color: '#00E4FF', margin: '0 0 0.5rem 0' }}>Supervivencia Criptobiótica</h2>
                   <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Utiliza WebGL para simular cuerpos blandos. Sobrevive a condiciones extremas con criptobiosis.</p>
                   <Link href="/arcade/tardigrado" className="btn-primary" style={{ background: '#00E4FF', color: 'black', width: '100%', boxShadow: '0 0 20px rgba(0,228,255,0.4)', fontWeight: 'bold', display: 'block' }}>
                     INICIAR SIMULACIÓN
                   </Link>
                </div>

                {/* Máquina 12: Carreras Relativistas */}
                <div className="glass-card" style={{ border: '1px solid rgba(255, 42, 42, 0.4)', background: 'rgba(255, 42, 42, 0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
                   <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'rgba(255, 42, 42, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: '0 0 20px rgba(255,42,42,0.3)' }}>
                      <span style={{ fontSize: '2.5rem' }}>🚀</span>
                   </div>
                   <h2 style={{ color: '#FF2A2A', margin: '0 0 0.5rem 0' }}>Carreras Relativistas</h2>
                   <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Acelera a velocidades luz y observa la aberración cromática y el efecto Doppler.</p>
                   <Link href="/arcade/relatividad" className="btn-primary" style={{ background: '#FF2A2A', color: 'white', width: '100%', boxShadow: '0 0 20px rgba(255,42,42,0.4)', fontWeight: 'bold', display: 'block' }}>
                     ACELERAR MOTOR
                   </Link>
                </div>

                {/* Máquina 13: Astrolabio Cuántico */}
                <div className="glass-card" style={{ border: '1px solid rgba(0,228,255,0.45)', background: 'rgba(0,228,255,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
                   <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'rgba(0,228,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: '0 0 20px rgba(0,228,255,0.35)' }}>
                      <span style={{ fontSize: '2.5rem' }}>🔭</span>
                   </div>
                   <h2 style={{ color: '#00E4FF', margin: '0 0 0.5rem 0' }}>Astrolabio Cuántico</h2>
                   <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Alinea los anillos del astrolabio medieval a sus ángulos correctos para descifrar el firmamento. ¡Trabaja rápido!</p>
                   <button onClick={() => launchGame('astrolabio')} className="btn-primary" style={{ background: '#00E4FF', color: 'black', width: '100%', boxShadow: '0 0 20px rgba(0,228,255,0.45)', fontWeight: 'bold' }}>
                     CALIBRAR ESFERAS
                   </button>
                </div>

                {/* Máquina 14: Xeno-Paleontología */}
                <div className="glass-card" style={{ border: '1px solid rgba(100,180,255,0.45)', background: 'rgba(100,180,255,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
                   <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'rgba(100,180,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: '0 0 20px rgba(100,180,255,0.35)' }}>
                      <span style={{ fontSize: '2.5rem' }}>🏺</span>
                   </div>
                   <h2 style={{ color: '#88CCFF', margin: '0 0 0.5rem 0' }}>Xeno-Paleontología</h2>
                   <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Excava con el rayo láser para revelar fósiles alienígenas atrapados en el hielo marciano. ¡Cuidado con la integridad!</p>
                   <button onClick={() => launchGame('xeno')} className="btn-primary" style={{ background: '#88CCFF', color: 'black', width: '100%', boxShadow: '0 0 20px rgba(100,180,255,0.45)', fontWeight: 'bold' }}>
                     EXCAVAR
                   </button>
                </div>

                {/* Máquina 15: Gravedad Cero */}
                <div className="glass-card" style={{ border: '1px solid rgba(255,80,80,0.45)', background: 'rgba(255,80,80,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
                   <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'rgba(255,80,80,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: '0 0 20px rgba(255,80,80,0.35)' }}>
                      <span style={{ fontSize: '2.5rem' }}>⚡</span>
                   </div>
                   <h2 style={{ color: '#FF6060', margin: '0 0 0.5rem 0' }}>Reparación en Gravedad Cero</h2>
                   <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>¡Emergencia! Reconecta los circuitos de oxígeno, energía y datos de la estación antes de que se acabe el O₂.</p>
                   <button onClick={() => launchGame('gravedad')} className="btn-primary" style={{ background: '#FF6060', color: 'white', width: '100%', boxShadow: '0 0 20px rgba(255,80,80,0.45)', fontWeight: 'bold' }}>
                     🆘 EMERGENCIA
                   </button>
                </div>

                {/* Máquina 16: Asistencia Gravitacional */}
                <div className="glass-card" style={{ border: '1px solid rgba(255,140,0,0.45)', background: 'rgba(255,140,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
                   <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'rgba(255,140,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: '0 0 20px rgba(255,140,0,0.35)' }}>
                      <span style={{ fontSize: '2.5rem' }}>🛸</span>
                   </div>
                   <h2 style={{ color: '#FFAA44', margin: '0 0 0.5rem 0' }}>Asistencia Gravitacional</h2>
                   <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Lanza una sonda y usa la gravedad de los planetas para hacer slingshot y recoger paquetes de datos.</p>
                   <button onClick={() => launchGame('slingshot')} className="btn-primary" style={{ background: '#FFAA44', color: 'black', width: '100%', boxShadow: '0 0 20px rgba(255,140,0,0.45)', fontWeight: 'bold' }}>
                     🚀 LANZAR SONDA
                   </button>
                </div>

              </div>
            ) : (
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
                       activeGame === 'finder'     ? 'Buscador Estelar' :
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
        </div>

      </main>
    </div>
  );
}
