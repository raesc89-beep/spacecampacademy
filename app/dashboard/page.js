'use client';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Rocket, Anchor, Radio, Star, Gamepad2 } from 'lucide-react';
import { useEffect } from 'react';
import Image from 'next/image';
import HubDecorations from '@/components/HubDecorations';

export default function DashboardLanding() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  if (loading || !userData) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020308', color: '#00E4FF' }}>Iniciando Sistemas de la Estación...</div>;
  }

  const userStars = userData?.progress?.stars || 0;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#020308', overflow: 'hidden' }}>
      <Navbar />
      
      <main style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        
        {/* Background Animation & Cockpit */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', backgroundColor: '#000000' }}>
          {/* Capa 1: Espacio Estrellado Puro sin efecto naranja */}
          <div style={{ position: 'absolute', inset: 0, background: 'url(https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=2560&auto=format&fit=crop) center center / cover' }} />

          {/* Vehículos Espaciales de Fondo */}
          <motion.img 
            src="/assets/shuttle_user.png" 
            alt="Shuttle"
            animate={{ x: ['-20vw', '120vw'], y: ['0vh', '15vh', '-5vh', '10vh'] }}
            transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
            style={{ position: 'absolute', top: '25%', left: 0, width: '6vw', minWidth: '40px', zIndex: 1, pointerEvents: 'none', filter: 'drop-shadow(0 0 10px rgba(100,200,255,0.4))' }}
          />
          
          <motion.img 
            src="/assets/ufo_user.png" 
            alt="UFO"
            animate={{ x: ['120vw', '-20vw'], y: ['0vh', '-20vh', '15vh', '5vh'] }}
            transition={{ repeat: Infinity, duration: 65, ease: "linear" }}
            style={{ position: 'absolute', top: '55%', left: 0, width: '8vw', minWidth: '60px', zIndex: 1, pointerEvents: 'none', filter: 'drop-shadow(0 0 20px rgba(0,255,136,0.6))' }}
          />

          {/* Planeta Tierra (Contenedor Centrado rotando más rápido) */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, pointerEvents: 'none' }}>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              style={{ 
                width: '45vw', height: '45vw', minWidth: '350px', minHeight: '350px', 
                borderRadius: '50%',
                background: 'url(https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1000&auto=format&fit=crop) center / 120% no-repeat',
                boxShadow: 'inset -30px -30px 60px rgba(0,0,0,0.9), 0 0 60px rgba(0, 180, 255, 0.4)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 60%, transparent 72%)',
                maskImage: 'radial-gradient(circle at center, black 60%, transparent 72%)'
              }}
            />
          </div>

          {/* Capa 2: Cabina Recortada (Primer Plano) con MÁSCARA SVG para perforar el centro */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
            <svg width="0" height="0">
              <defs>
                <clipPath id="window-clip" clipPathUnits="objectBoundingBox">
                  {/* Un polígono que recorta un rectángulo central: Dibuja el borde exterior y luego el hueco interior */}
                  <path d="M0,0 H1 V1 H0 Z M0.08,0.15 V0.9 H0.92 V0.15 Z" fillRule="evenodd" />
                </clipPath>
              </defs>
            </svg>
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(/assets/dashboard/window_frame.png)',
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              clipPath: 'url(#window-clip)',
              WebkitClipPath: 'url(#window-clip)',
              filter: 'contrast(1.1) brightness(0.9)'
            }} />
          </div>

          {/* Ligero difuminado en los bordes para Legibilidad sin tapar */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 3, background: 'radial-gradient(circle at center, transparent 30%, #000000 100%)', opacity: 0.6, pointerEvents: 'none' }}></div>
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <motion.div
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              >
                 <Image src="/assets/amde_logo.png" alt="AMDE" width={60} height={60} style={{ filter: 'drop-shadow(0 0 10px #00E4FF)', objectFit: 'contain' }} />
              </motion.div>
              <h1 style={{ 
                fontSize: 'clamp(1.8rem, 5vw, 4.5rem)', 
                margin: 0, 
                background: 'linear-gradient(180deg, #FFFFFF 0%, #88CCFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 40px rgba(0, 228, 255, 0.4)',
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 800,
                letterSpacing: '2px',
                textTransform: 'uppercase'
              }}>
                Estación Orbital
              </h1>
            </div>
            <p style={{ 
              fontSize: 'clamp(1rem, 1.5vw, 1.5rem)', 
              color: 'var(--electric-blue)', 
              marginTop: '0.5rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              fontWeight: 600
            }}>
              Bienvenido, Comandante {userData.name}
            </p>
            
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem', background: 'rgba(0,0,0,0.6)', padding: '0.5rem 1.5rem', borderRadius: '30px', border: '1px solid rgba(255,215,0,0.3)', backdropFilter: 'blur(10px)' }}>
              <Star size={24} color="var(--gold-star)" />
              <span style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>Polvo Estelar:</span>
              <span style={{ color: 'var(--gold-star)', fontWeight: 'bold', fontSize: '1.5rem' }}>{userStars}</span>
            </div>
          </motion.div>

          {/* Main Portals / Buttons */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: '1.5rem', 
            width: '100%',
            padding: '0 1rem'
          }}>
            
            {/* Base de Misiones */}
            <Link href="/dashboard/misiones" style={{ textDecoration: 'none' }}>
              <motion.div 
                animate={{ y: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <motion.div 
                  whileHover={{ y: -10, scale: 1.02, boxShadow: '0 10px 40px rgba(0,228,255,0.6), inset 0 0 40px rgba(0,228,255,0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: 'rgba(10, 15, 30, 0.25)',
                    backdropFilter: 'blur(12px)',
                    border: '2px solid rgba(0, 228, 255, 0.6)',
                    borderRadius: '24px',
                    padding: 'clamp(1.5rem, 3vw, 3rem) clamp(1rem, 2vw, 2rem)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: '1rem',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,228,255,0.2), 0 0 15px rgba(0,228,255,0.3)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                {/* HUD Elements */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '40px', height: '40px', borderTop: '2px solid #00E4FF', borderLeft: '2px solid #00E4FF', borderTopLeftRadius: '24px' }}></div>
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '40px', height: '40px', borderBottom: '2px solid #00E4FF', borderRight: '2px solid #00E4FF', borderBottomRightRadius: '24px' }}></div>
                
                <div style={{ 
                  background: 'transparent',
                  padding: '1.5rem',
                  borderRadius: '50%',
                  border: '2px dashed rgba(0,228,255,0.5)',
                  boxShadow: '0 0 30px rgba(0,228,255,0.2), inset 0 0 15px rgba(0,228,255,0.2)',
                  position: 'relative'
                }}>
                  <div style={{ position: 'absolute', inset: -8, border: '1px solid rgba(0,228,255,0.3)', borderRadius: '50%', animation: 'spin 10s linear infinite' }}></div>
                  <Rocket size={48} color="var(--electric-blue)" style={{ filter: 'drop-shadow(0 0 10px #00E4FF)' }} />
                </div>
                <div>
                  <h2 style={{ color: 'white', fontSize: '2rem', margin: '0 0 0.5rem 0', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>Base de Misiones</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.4 }}>Accede al catálogo interactivo y despega hacia tus próximas aventuras estelares.</p>
                </div>
              </motion.div>
              </motion.div>
            </Link>

            {/* Astillero Naval */}
            <Link href="/hangar" style={{ textDecoration: 'none' }}>
              <motion.div 
                animate={{ y: [5, -5, 5] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              >
              <motion.div 
                whileHover={{ y: -10, scale: 1.02, boxShadow: '0 10px 40px rgba(153,51,255,0.6), inset 0 0 40px rgba(153,51,255,0.4)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: 'rgba(20, 15, 35, 0.25)',
                  backdropFilter: 'blur(12px)',
                  border: '2px solid rgba(153, 51, 255, 0.6)',
                  borderRadius: '24px',
                  padding: 'clamp(1.5rem, 3vw, 3rem) clamp(1rem, 2vw, 2rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '1rem',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(153,51,255,0.2), 0 0 15px rgba(153,51,255,0.3)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* HUD Elements */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '40px', height: '40px', borderTop: '2px solid #9933FF', borderLeft: '2px solid #9933FF', borderTopLeftRadius: '24px' }}></div>
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '40px', height: '40px', borderBottom: '2px solid #9933FF', borderRight: '2px solid #9933FF', borderBottomRightRadius: '24px' }}></div>
                
                <div style={{ 
                  background: 'transparent',
                  padding: '1.5rem',
                  borderRadius: '50%',
                  border: '2px dashed rgba(153,51,255,0.5)',
                  boxShadow: '0 0 30px rgba(153,51,255,0.2), inset 0 0 15px rgba(153,51,255,0.2)',
                  position: 'relative'
                }}>
                  <div style={{ position: 'absolute', inset: -8, border: '1px solid rgba(153,51,255,0.3)', borderRadius: '50%', animation: 'spin 10s linear infinite reverse' }}></div>
                  <Anchor size={48} color="#9933ff" style={{ filter: 'drop-shadow(0 0 10px #9933FF)' }} />
                </div>
                <div>
                  <h2 style={{ color: 'white', fontSize: '2rem', margin: '0 0 0.5rem 0', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>Astillero Naval</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.4 }}>Gestiona tu flota, personaliza tus naves y mejora tus escudos con polvo estelar.</p>
                </div>
              </motion.div>
              </motion.div>
            </Link>

            {/* En Vivo */}
            <Link href="/dashboard/live" style={{ textDecoration: 'none' }}>
              <motion.div 
                animate={{ y: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              >
              <motion.div 
                whileHover={{ y: -10, scale: 1.02, boxShadow: '0 10px 40px rgba(0,255,136,0.6), inset 0 0 40px rgba(0,255,136,0.4)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: 'rgba(10, 30, 20, 0.25)',
                  backdropFilter: 'blur(12px)',
                  border: '2px solid rgba(0, 255, 136, 0.6)',
                  borderRadius: '24px',
                  padding: 'clamp(1.5rem, 3vw, 3rem) clamp(1rem, 2vw, 2rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '1rem',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,255,136,0.2), 0 0 15px rgba(0,255,136,0.3)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* HUD Elements */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '40px', height: '40px', borderTop: '2px solid #00FF88', borderLeft: '2px solid #00FF88', borderTopLeftRadius: '24px' }}></div>
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '40px', height: '40px', borderBottom: '2px solid #00FF88', borderRight: '2px solid #00FF88', borderBottomRightRadius: '24px' }}></div>

                <div style={{ 
                  background: 'transparent',
                  padding: '1.5rem',
                  borderRadius: '50%',
                  border: '2px dashed rgba(0,255,136,0.5)',
                  boxShadow: '0 0 30px rgba(0,255,136,0.2), inset 0 0 15px rgba(0,255,136,0.2)',
                  position: 'relative'
                }}>
                  <div style={{ position: 'absolute', inset: -8, border: '1px solid rgba(0,255,136,0.3)', borderRadius: '50%', animation: 'spin 8s linear infinite' }}></div>
                  <Radio size={48} color="var(--success)" style={{ filter: 'drop-shadow(0 0 10px #00FF88)' }} />
                </div>
                <div>
                  <h2 style={{ color: 'white', fontSize: '2rem', margin: '0 0 0.5rem 0', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                    Misión en Vivo <span style={{ display: 'inline-block', width: 10, height: 10, background: 'var(--success)', borderRadius: '50%', marginLeft: '10px' }} className="pulse-anim"></span>
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.4 }}>Conéctate con otros comandantes y participa en transmisiones exclusivas en tiempo real.</p>
                </div>
              </motion.div>
              </motion.div>
            </Link>

            {/* Zona Arcade */}
            <Link href="/hub/arcade" style={{ textDecoration: 'none' }}>
              <motion.div 
                animate={{ y: [5, -5, 5] }}
                transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }}
              >
              <motion.div 
                whileHover={{ y: -10, scale: 1.02, boxShadow: '0 10px 40px rgba(255,0,255,0.6), inset 0 0 40px rgba(255,0,255,0.4)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: 'rgba(30, 10, 30, 0.25)',
                  backdropFilter: 'blur(12px)',
                  border: '2px solid rgba(255, 0, 255, 0.6)',
                  borderRadius: '24px',
                  padding: 'clamp(1.5rem, 3vw, 3rem) clamp(1rem, 2vw, 2rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '1.5rem',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,0,255,0.2), 0 0 15px rgba(255,0,255,0.3)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* HUD Elements */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '40px', height: '40px', borderTop: '2px solid #FF00FF', borderLeft: '2px solid #FF00FF', borderTopLeftRadius: '24px' }}></div>
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '40px', height: '40px', borderBottom: '2px solid #FF00FF', borderRight: '2px solid #FF00FF', borderBottomRightRadius: '24px' }}></div>

                <div style={{ 
                  background: 'transparent',
                  padding: '1.5rem',
                  borderRadius: '50%',
                  border: '2px dashed rgba(255,0,255,0.5)',
                  boxShadow: '0 0 30px rgba(255,0,255,0.2), inset 0 0 15px rgba(255,0,255,0.2)',
                  position: 'relative'
                }}>
                  <div style={{ position: 'absolute', inset: -8, border: '1px solid rgba(255,0,255,0.3)', borderRadius: '50%', animation: 'spin 9s linear infinite reverse' }}></div>
                  <Gamepad2 size={48} color="#FF00FF" style={{ filter: 'drop-shadow(0 0 10px #FF00FF)' }} />
                </div>
                <div>
                  <h2 style={{ color: 'white', fontSize: '2rem', margin: '0 0 0.5rem 0', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                    Zona Arcade
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.4 }}>Minijuegos espaciales para entrenar tu mente y agudizar tus reflejos.</p>
                </div>
              </motion.div>
              </motion.div>
            </Link>

          </div>
        </div>
      </main>
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .pulse-anim { animation: pulse 2s infinite; }
      `}</style>
    </div>
  );
}
