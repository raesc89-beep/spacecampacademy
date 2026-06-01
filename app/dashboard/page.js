'use client';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Rocket, Anchor, Radio, Star, Gamepad2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import HubDecorations from '@/components/HubDecorations';

export default function DashboardLanding() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  const [telemetry, setTelemetry] = useState({
    altitude: 408,
    velocity: 7.66,
    tempExt: -157,
    gyro: 0.00,
    pwrBars: [100, 85, 65, 40],
    commBars: [3, 5, 8, 11, 14, 11, 8, 5],
    statusColors: ['#00FF88', '#00E4FF', '#9933FF'],
    navPulse: 1.0,
    o2: 98, n2: 74, co2: 0.04, psi: 14.7, rh: 45
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        ...prev,
        altitude: +(prev.altitude + (Math.random() - 0.5) * 4).toFixed(0),
        velocity: +(prev.velocity + (Math.random() - 0.5) * 0.06).toFixed(2),
        tempExt: +(prev.tempExt + (Math.random() - 0.5) * 6).toFixed(0),
        gyro: +(Math.sin(Date.now() / 3000) * 3.5).toFixed(2),
        pwrBars: prev.pwrBars.map(v => Math.min(100, Math.max(20, v + (Math.random()-0.5)*8))),
        commBars: [3,5,8,11,14,11,8,5].map(h => Math.max(2, h + Math.floor((Math.random()-0.5)*6))),
        o2: +(prev.o2 + (Math.random()-0.5)*0.5).toFixed(1),
      }));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  if (loading || !userData) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020308', color: '#00E4FF' }}>Iniciando Sistemas de la Estación...</div>;
  }

  const userStars = userData?.progress?.stars || 0;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#020308', overflow: 'hidden' }}>
      <Navbar />
      
      <main style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        
        {/* Background Animation & Cockpit */}
        {/* Background Animation & Cockpit */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', backgroundColor: '#020308' }}>
          
          {/* Capa 1: Deep Space Background */}
          <div style={{ position: 'absolute', inset: 0, background: 'url(https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=2560&auto=format&fit=crop) center center / cover' }} />

          {/* Vehículos Espaciales de Fondo */}
          <motion.img 
            src="/assets/shuttle_user.png" 
            alt="Shuttle"
            className="motion-vehicle"
            animate={{ x: ['-20vw', '120vw'], y: ['0vh', '15vh', '-5vh', '10vh'] }}
            transition={{ repeat: Infinity, duration: 55, ease: "linear" }}
            style={{ position: 'absolute', top: '25%', left: 0, width: '4vw', minWidth: '30px', zIndex: 1, pointerEvents: 'none', filter: 'drop-shadow(0 0 10px rgba(100,200,255,0.4))' }}
          />
          
          <motion.img 
            src="/assets/ufo_user.png" 
            alt="UFO"
            className="motion-vehicle"
            animate={{ x: ['120vw', '-20vw'], y: ['0vh', '-20vh', '15vh', '5vh'] }}
            transition={{ repeat: Infinity, duration: 75, ease: "linear" }}
            style={{ position: 'absolute', top: '45%', left: 0, width: '6vw', minWidth: '40px', zIndex: 1, pointerEvents: 'none', filter: 'drop-shadow(0 0 20px rgba(0,255,136,0.6))' }}
          />

          {/* Planeta Tierra (Escala realista, más pequeña para dar sensación de profundidad y lejanía) */}
          <div style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, pointerEvents: 'none', mixBlendMode: 'screen' }}>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
              style={{ 
                width: '25vw', height: '25vw', minWidth: '200px', minHeight: '200px', 
                borderRadius: '50%',
                background: 'url(https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1000&auto=format&fit=crop) center / 110% no-repeat',
                boxShadow: 'inset -20px -20px 40px rgba(0,0,0,0.9), 0 0 80px rgba(0, 180, 255, 0.2)',
              }}
            />
          </div>

          {/* Capa 2: Ventanal de la Estación Orbital (Efecto CSS inmersivo) */}
          <div style={{ 
            position: 'absolute', 
            inset: '8vw', 
            zIndex: 2, 
            pointerEvents: 'none',
            /* Marco metálico principal simulado con box-shadow inset y outline masivo para tapar el exterior */
            boxShadow: '0 0 0 100vw #050810, inset 0 0 40px 5vw rgba(0, 228, 255, 0.1), inset 0 0 100px 5vw rgba(0, 0, 0, 0.9)',
            /* Curvas del ventanal usando un borde grueso y redondeado */
            border: '2vw solid #0a0e17',
            borderRadius: '6vw',
            /* Líneas de estructura del HUD simuladas con linear-gradients */
            backgroundImage: `
              linear-gradient(to right, transparent 20%, rgba(255,255,255,0.03) 20.1%, rgba(255,255,255,0.03) 20.2%, transparent 20.3%),
              linear-gradient(to right, transparent 80%, rgba(255,255,255,0.03) 80.1%, rgba(255,255,255,0.03) 80.2%, transparent 80.3%),
              linear-gradient(to bottom, transparent 20%, rgba(255,255,255,0.03) 20.1%, rgba(255,255,255,0.03) 20.2%, transparent 20.3%),
              linear-gradient(to bottom, transparent 80%, rgba(255,255,255,0.03) 80.1%, rgba(255,255,255,0.03) 80.2%, transparent 80.3%)
            `
          }}>
            {/* HUD Glass Reflection */}
            <div style={{
              position: 'absolute',
              inset: '2vw',
              borderRadius: '3vw',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 40%, transparent 60%, rgba(0,228,255,0.02) 100%)',
              border: '1px solid rgba(0, 228, 255, 0.2)',
              boxShadow: 'inset 0 0 20px rgba(0,228,255,0.1)'
            }} />
          </div>

          {/* Ligero difuminado global para no interferir con la UI (viñeta) */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 3, background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.8) 100%)', pointerEvents: 'none' }}></div>

          {/* === COCKPIT LEFT PANEL: Navigation & Systems === */}
          <div className="cockpit-left-panel" style={{ position: 'absolute', left: '1.2vw', top: '50%', transform: 'translateY(-50%)', zIndex: 4, display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '6vw', minWidth: '65px', pointerEvents: 'none' }}>
            <div style={{ background: 'rgba(0,228,255,0.07)', border: '1px solid rgba(0,228,255,0.4)', borderRadius: '8px', padding: '0.4rem', textAlign: 'center' }}>
              <div style={{ width: '100%', aspectRatio: '1', background: 'rgba(0,228,255,0.1)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4px' }}>
                <div style={{ width: '60%', height: '60%', borderRadius: '50%', border: '2px solid #00E4FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <motion.div
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    style={{ width: '35%', height: '35%', background: '#00E4FF', borderRadius: '50%', boxShadow: '0 0 8px #00E4FF' }}
                  />
                </div>
              </div>
              <div style={{ fontSize: '0.4rem', color: '#00E4FF', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'monospace' }}>NAV SYS</div>
            </div>
            <div style={{ background: 'rgba(0,255,136,0.07)', border: '1px solid rgba(0,255,136,0.4)', borderRadius: '8px', padding: '0.4rem' }}>
              <div style={{ fontSize: '0.4rem', color: '#00FF88', marginBottom: '4px', textAlign: 'center', letterSpacing: '1px', fontFamily: 'monospace' }}>PWR</div>
              {telemetry.pwrBars.map((val, i) => (
                <div key={i} style={{ height: '4px', background: `rgba(0,255,136,${val/100})`, borderRadius: '2px', marginBottom: '2px', boxShadow: val > 70 ? '0 0 4px rgba(0,255,136,0.5)' : 'none' }}/>
              ))}
            </div>
            <div style={{ background: 'rgba(153,51,255,0.07)', border: '1px solid rgba(153,51,255,0.4)', borderRadius: '8px', padding: '0.4rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.38rem', color: '#9933FF', marginBottom: '5px', letterSpacing: '1px', fontFamily: 'monospace' }}>STATUS</div>
              {telemetry.statusColors.map((c,i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '3px' }}>
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.5, ease: 'easeInOut' }}
                    style={{ width: '6px', height: '6px', borderRadius: '50%', background: c, boxShadow: `0 0 6px ${c}`, flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, height: '2px', background: `${c}33`, borderRadius: '1px' }}/>
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(255,215,0,0.07)', border: '1px solid rgba(255,215,0,0.35)', borderRadius: '8px', padding: '0.4rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.38rem', color: '#FFD700', letterSpacing: '1px', fontFamily: 'monospace', marginBottom: '4px' }}>GYRO</div>
              <div style={{ fontSize: '0.65rem', color: '#FFD700', fontFamily: 'monospace', fontWeight: 'bold' }}>{telemetry.gyro}°</div>
            </div>
          </div>

          {/* === COCKPIT RIGHT PANEL: Telemetry Data === */}
          <div className="cockpit-right-panel" style={{ position: 'absolute', right: '1.2vw', top: '50%', transform: 'translateY(-50%)', zIndex: 4, display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '6.5vw', minWidth: '70px', pointerEvents: 'none' }}>
            <div style={{ background: 'rgba(0,228,255,0.07)', border: '1px solid rgba(0,228,255,0.35)', borderRadius: '8px', padding: '0.4rem' }}>
              <div style={{ fontSize: '0.38rem', color: '#00E4FF', letterSpacing: '1px', marginBottom: '3px', fontFamily: 'monospace' }}>ALTITUD</div>
              <div style={{ fontSize: '0.65rem', color: 'white', fontFamily: 'monospace', fontWeight: 'bold' }}>{telemetry.altitude} km</div>
              <div style={{ height: '2px', background: 'rgba(0,228,255,0.15)', borderRadius: '1px', marginTop: '4px', overflow: 'hidden' }}>
                <div style={{ width: '78%', height: '100%', background: '#00E4FF', boxShadow: '0 0 4px #00E4FF' }}/>
              </div>
            </div>
            <div style={{ background: 'rgba(255,215,0,0.07)', border: '1px solid rgba(255,215,0,0.35)', borderRadius: '8px', padding: '0.4rem' }}>
              <div style={{ fontSize: '0.38rem', color: '#FFD700', letterSpacing: '1px', marginBottom: '3px', fontFamily: 'monospace' }}>VELOC</div>
              <div style={{ fontSize: '0.65rem', color: 'white', fontFamily: 'monospace', fontWeight: 'bold' }}>{telemetry.velocity} km/s</div>
              <div style={{ height: '2px', background: 'rgba(255,215,0,0.15)', borderRadius: '1px', marginTop: '4px', overflow: 'hidden' }}>
                <div style={{ width: '92%', height: '100%', background: '#FFD700', boxShadow: '0 0 4px #FFD700' }}/>
              </div>
            </div>
            <div style={{ background: 'rgba(255,80,80,0.07)', border: '1px solid rgba(255,80,80,0.35)', borderRadius: '8px', padding: '0.4rem' }}>
              <div style={{ fontSize: '0.38rem', color: '#FF5050', letterSpacing: '1px', marginBottom: '3px', fontFamily: 'monospace' }}>TEMP EXT</div>
              <div style={{ fontSize: '0.65rem', color: 'white', fontFamily: 'monospace', fontWeight: 'bold' }}>{telemetry.tempExt}°C</div>
              <div style={{ display: 'flex', gap: '2px', marginTop: '4px' }}>
                {[1,2,3].map(i => <div key={i} style={{ flex: 1, height: '3px', background: i < 2 ? '#FF5050' : 'rgba(255,80,80,0.2)', borderRadius: '1px' }}/>)}
              </div>
            </div>
            <div style={{ background: 'rgba(0,255,136,0.07)', border: '1px solid rgba(0,255,136,0.35)', borderRadius: '8px', padding: '0.4rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.38rem', color: '#00FF88', letterSpacing: '1px', marginBottom: '4px', fontFamily: 'monospace' }}>COMM</div>
              <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '14px', justifyContent: 'center' }}>
                {telemetry.commBars.map((h,i) => (
                  <div key={i} style={{ width: '3px', height: `${h}px`, background: '#00FF88', borderRadius: '1px', boxShadow: h > 10 ? '0 0 3px #00FF88' : 'none' }}/>
                ))}
              </div>
            </div>
          </div>

          {/* === COCKPIT BOTTOM BAR: Atmospheric Status === */}
          <div className="cockpit-bottom-bar" style={{ position: 'absolute', bottom: '1.5vw', left: '50%', transform: 'translateX(-50%)', zIndex: 4, display: 'flex', gap: '0.6rem', alignItems: 'center', pointerEvents: 'none', flexWrap: 'nowrap' }}>
            {[['O₂', `${telemetry.o2}%`, '#00E4FF'], ['N₂', '74%', '#9933FF'], ['CO₂', '0.04%', '#00FF88'], ['PSI', '14.7', '#FFD700'], ['RH', '45%', '#FF8C00']].map(([label, val, color]) => (
              <div key={label} style={{ background: 'rgba(0,0,0,0.75)', border: `1px solid ${color}44`, borderRadius: '6px', padding: '3px 8px', textAlign: 'center', backdropFilter: 'blur(8px)', boxShadow: `0 0 8px ${color}22` }}>
                <div style={{ fontSize: '0.42rem', color: color, letterSpacing: '1px', fontFamily: 'monospace' }}>{label}</div>
                <div style={{ fontSize: '0.65rem', color: 'white', fontFamily: 'monospace', fontWeight: 'bold' }}>{val}</div>
              </div>
            ))}
          </div>
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
