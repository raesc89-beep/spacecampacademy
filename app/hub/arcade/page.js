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
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ArcadeExoplanet() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const [activeGame, setActiveGame] = useState(null); // 'memory', 'words', etc.

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  if (loading || !userData) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a1a', color: 'white' }}>Aterrizando en Zona Arcade...</div>;
  }

  const userStars = userData?.progress?.stars || 0;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#050014' }}>
      
      {/* Botón Flotante para abandonar el Exoplaneta */}
      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 100 }}>
         <Link href="/hub/solar-system" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'white', textDecoration: 'none', background: 'rgba(255,0,255,0.2)', padding: '0.8rem 1.2rem', borderRadius: '30px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,0,255,0.5)' }}>
            <ChevronLeft size={24} /> Órbita Sideral
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

        {/* Console Machine Selection */}
        {!activeGame ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', width: '100%', maxWidth: '1000px' }}>
            
            {/* Máquina 1: Memorama */}
            <div className="glass-card" style={{ border: '1px solid rgba(0, 255, 136, 0.4)', background: 'rgba(0, 255, 136, 0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
               <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'rgba(0, 255, 136, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: '0 0 20px rgba(0,255,136,0.3)' }}>
                  <img src="/assets/cartoon_earth.png" width="50" style={{ filter: 'drop-shadow(0 0 5px white)' }} />
               </div>
               <h2 style={{ color: 'var(--success)', margin: '0 0 0.5rem 0' }}>Memoria Fotográfica</h2>
               <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Empareja las holo-tarjetas planetarias gastando la menor cantidad de energía posible en tu radar.</p>
               <button onClick={() => setActiveGame('memory')} className="btn-primary" style={{ background: 'var(--success)', color: 'black', width: '100%', boxShadow: '0 0 20px rgba(0,255,136,0.4)', fontWeight: 'bold' }}>
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
               <button onClick={() => setActiveGame('words')} className="btn-primary" style={{ background: 'var(--electric-blue)', color: 'black', width: '100%', boxShadow: '0 0 20px rgba(0,228,255,0.4)', fontWeight: 'bold' }}>
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
               <button onClick={() => setActiveGame('trivia')} className="btn-primary" style={{ background: '#FF64C8', color: 'white', width: '100%', boxShadow: '0 0 20px rgba(255,100,200,0.5)', fontWeight: 'bold' }}>
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
               <button onClick={() => setActiveGame('bingo')} className="btn-primary" style={{ background: 'var(--gold-star)', color: 'black', width: '100%', boxShadow: '0 0 20px rgba(255,215,0,0.4)', fontWeight: 'bold' }}>
                 EXTRAER TARJETA
               </button>
            </div>

          </div>
        ) : (
          <div style={{ width: '100%', maxWidth: '800px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ color: activeGame === 'memory' ? 'var(--success)' : (activeGame === 'words' ? 'var(--electric-blue)' : (activeGame === 'trivia' ? '#FF64C8' : 'var(--gold-star)')), margin: 0 }}>
                 Simulador: {activeGame === 'memory' ? 'Memoria Fotográfica' : (activeGame === 'words' ? 'Sopa Sideral' : (activeGame === 'trivia' ? 'Defensa y Trivia' : 'Lotería Espacial'))}
              </h2>
              <button 
                onClick={() => setActiveGame(null)} 
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}
              >
                Cerrar Máquina
              </button>
            </div>
            
            {activeGame === 'memory' && (
               <MemoryGame onComplete={(bonus) => alert(`¡Nivel Excedido! Has demostrado alta competencia recolectando ${bonus} estrellas base.`)} />
            )}
            
            {activeGame === 'words' && (
               <WordSearch onComplete={(bonus) => alert(`¡Lexemas decodificados! Logro desbloqueado con ${bonus} estrellas.`)} />
            )}
            
            {activeGame === 'trivia' && (
               <AsteroidTrivia onComplete={(bonus) => alert(`¡Sobreviviste a la lluvia! Nave a salvo. Has juntado ${bonus} Puntuación.`)} />
            )}
            
            {activeGame === 'bingo' && (
               <SpaceBingo onComplete={(bonus) => alert(`¡BINGO EN EL VACÍO! Has marcado todo el panel obteniendo ${bonus} monedas de recompensa especial.`)} />
            )}
          </div>
        )}

      </main>
    </div>
  );
}
