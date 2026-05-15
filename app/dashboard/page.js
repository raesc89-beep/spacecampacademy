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
            style={{ textAlign: 'center' }}
          >
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
              Estación Orbital AMDE
            </h1>
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
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: 'rgba(10, 20, 40, 0.65)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(0, 228, 255, 0.3)',
                  borderRadius: '24px',
                  padding: '3rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '1.5rem',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,228,255,0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                className="hover:border-electric-blue hover:shadow-[0_0_30px_rgba(0,228,255,0.4)]"
              >
                <div style={{ 
                  background: 'linear-gradient(135deg, rgba(0,228,255,0.2) 0%, transparent 100%)',
                  padding: '1.5rem',
                  borderRadius: '50%',
                  border: '1px solid rgba(0,228,255,0.5)',
                  boxShadow: '0 0 30px rgba(0,228,255,0.2)'
                }}>
                  <Rocket size={48} color="var(--electric-blue)" />
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
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: 'rgba(20, 15, 35, 0.65)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(153, 51, 255, 0.3)',
                  borderRadius: '24px',
                  padding: '3rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '1.5rem',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(153,51,255,0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                className="hover:border-[rgba(153,51,255,1)] hover:shadow-[0_0_30px_rgba(153,51,255,0.4)]"
              >
                <div style={{ 
                  background: 'linear-gradient(135deg, rgba(153,51,255,0.2) 0%, transparent 100%)',
                  padding: '1.5rem',
                  borderRadius: '50%',
                  border: '1px solid rgba(153,51,255,0.5)',
                  boxShadow: '0 0 30px rgba(153,51,255,0.2)'
                }}>
                  <Anchor size={48} color="#9933ff" />
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
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: 'rgba(10, 30, 20, 0.65)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(0, 255, 136, 0.3)',
                  borderRadius: '24px',
                  padding: '3rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '1.5rem',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,255,136,0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                className="hover:border-success hover:shadow-[0_0_30px_rgba(0,255,136,0.4)]"
              >
                <div style={{ 
                  background: 'linear-gradient(135deg, rgba(0,255,136,0.2) 0%, transparent 100%)',
                  padding: '1.5rem',
                  borderRadius: '50%',
                  border: '1px solid rgba(0,255,136,0.5)',
                  boxShadow: '0 0 30px rgba(0,255,136,0.2)'
                }}>
                  <Radio size={48} color="var(--success)" />
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
    </div>
  );
}
