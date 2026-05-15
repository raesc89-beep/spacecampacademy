'use client';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Rocket, Anchor, Radio, Star } from 'lucide-react';
import { useEffect } from 'react';
import Image from 'next/image';

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
        
        {/* Background Image */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image 
            src="/assets/dashboard/space_base_dashboard.png" 
            alt="Space Base Control Room" 
            fill 
            style={{ objectFit: 'cover', filter: 'brightness(0.6) contrast(1.1)' }} 
            priority 
          />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, #020308 100%)', opacity: 0.8 }}></div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(2,3,8,0.3) 0%, #020308 100%)' }}></div>
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
                 animate={{ rotateY: 360 }}
                 transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              >
                 <Image src="/assets/amde_logo.png" alt="AMDE" width={60} height={60} style={{ filter: 'drop-shadow(0 0 10px #00E4FF)', objectFit: 'contain' }} />
              </motion.div>
              <h1 style={{ 
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
                margin: 0, 
                background: 'linear-gradient(180deg, #FFFFFF 0%, #88CCFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 40px rgba(0, 228, 255, 0.4)',
                fontWeight: 900,
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', width: '100%', marginTop: '2rem' }}>
            
            {/* Base de Misiones */}
            <Link href="/dashboard/misiones" style={{ textDecoration: 'none' }}>
              <motion.div 
                whileHover={{ y: -10, scale: 1.02, boxShadow: '0 10px 40px rgba(0,228,255,0.4), inset 0 0 40px rgba(0,228,255,0.2)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: 'rgba(10, 20, 40, 0.65)',
                  backdropFilter: 'blur(16px)',
                  border: '2px solid rgba(0, 228, 255, 0.4)',
                  borderRadius: '24px',
                  padding: '3rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '1.5rem',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,228,255,0.1)',
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
            </Link>

            {/* Astillero Naval */}
            <Link href="/hangar" style={{ textDecoration: 'none' }}>
              <motion.div 
                whileHover={{ y: -10, scale: 1.02, boxShadow: '0 10px 40px rgba(153,51,255,0.4), inset 0 0 40px rgba(153,51,255,0.2)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: 'rgba(20, 15, 35, 0.65)',
                  backdropFilter: 'blur(16px)',
                  border: '2px solid rgba(153, 51, 255, 0.4)',
                  borderRadius: '24px',
                  padding: '3rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '1.5rem',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(153,51,255,0.1)',
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
            </Link>

            {/* En Vivo */}
            <Link href="/dashboard/live" style={{ textDecoration: 'none' }}>
              <motion.div 
                whileHover={{ y: -10, scale: 1.02, boxShadow: '0 10px 40px rgba(0,255,136,0.4), inset 0 0 40px rgba(0,255,136,0.2)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: 'rgba(10, 30, 20, 0.65)',
                  backdropFilter: 'blur(16px)',
                  border: '2px solid rgba(0, 255, 136, 0.4)',
                  borderRadius: '24px',
                  padding: '3rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '1.5rem',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,255,136,0.1)',
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
