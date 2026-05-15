'use client';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Rocket, User, Building, Wrench, Shield, Zap } from 'lucide-react';
import { useEffect } from 'react';
import Image from 'next/image';

const HANGAR_MODULES = [
  {
    id: "nave",
    title: "Ensamblaje de Nave",
    subtitle: "Construye y mejora tu vehículo espacial con tecnología de punta.",
    link: "/hangar/nave",
    icon: <Rocket size={48} color="#00E4FF" />,
    bgSrc: "/assets/dashboard/interestelar_cover.png", // Or similar space ship background
    borderColor: "rgba(0, 228, 255, 0.5)",
    glowColor: "rgba(0, 228, 255, 0.2)",
    features: ["Propulsores", "Escudos", "Pintura"]
  },
  {
    id: "avatar",
    title: "Creación de Astronauta",
    subtitle: "Personaliza tu traje espacial, casco e insignias de la misión.",
    link: "/hangar/avatar",
    icon: <User size={48} color="#FFD700" />,
    bgSrc: "/assets/dashboard/pioneros_cover.png", // Or avatar background
    borderColor: "rgba(255, 215, 0, 0.5)",
    glowColor: "rgba(255, 215, 0, 0.2)",
    features: ["Traje", "Parches", "Especialidad"]
  },
  {
    id: "base",
    title: "Construcción de Base",
    subtitle: "Diseña tu propia estación orbital. [Desarrollo Clasificado]",
    link: "/hangar/base",
    icon: <Building size={48} color="#9933FF" />,
    bgSrc: "/assets/dashboard/agujeros_gusano_cover.png", // Or base background
    borderColor: "rgba(153, 51, 255, 0.5)",
    glowColor: "rgba(153, 51, 255, 0.2)",
    features: ["Módulos", "Defensa", "Hábitat"],
    isComingSoon: true
  }
];

export default function AstilleroHub() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  if (loading || !userData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020308', color: '#00E4FF' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div className="pulse-anim" style={{ width: 50, height: 50, border: '4px solid #00E4FF', borderRadius: '50%', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
          Accediendo al Astillero Naval...
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#020308', overflow: 'hidden' }}>
      <Navbar />
      
      {/* Background Ambience */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle at top, rgba(0,228,255,0.05) 0%, transparent 50%), radial-gradient(circle at bottom, rgba(153,51,255,0.05) 0%, transparent 50%)', zIndex: 0 }} />

      <main style={{ flex: 1, padding: '4rem 5%', display: 'flex', flexDirection: 'column', gap: '4rem', position: 'relative', zIndex: 1, alignItems: 'center' }}>
        
        {/* Header */}
        <header style={{ textAlign: 'center', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', color: 'var(--electric-blue)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem', fontWeight: 600, border: '1px solid rgba(0,228,255,0.3)', padding: '0.5rem 1.5rem', borderRadius: '30px', background: 'rgba(0,228,255,0.05)' }}>
            <Wrench size={18} /> Central de Ingeniería
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', margin: 0, color: 'white', textShadow: '0 0 30px rgba(0, 228, 255, 0.3)', fontWeight: 900, lineHeight: 1.1 }}>
            Astillero Naval
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', marginTop: '1.5rem', lineHeight: 1.6 }}>
            El núcleo de diseño y fabricación de la academia. Selecciona un departamento de ingeniería para comenzar el desarrollo de tu equipo espacial.
          </p>
        </header>

        {/* Modules Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', width: '100%', maxWidth: '1200px' }}>
          {HANGAR_MODULES.map((mod, idx) => {
            const isClickable = !mod.isComingSoon;

            const CardContent = () => (
              <motion.div 
                whileHover={isClickable ? { y: -10, boxShadow: `0 20px 40px rgba(0,0,0,0.6), inset 0 0 30px ${mod.glowColor}, 0 0 0 2px ${mod.borderColor}` } : {}}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '24px',
                  background: 'rgba(10, 15, 30, 0.7)',
                  border: `1px solid ${mod.borderColor}`,
                  height: '100%',
                  minHeight: '450px',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.4s ease',
                  cursor: isClickable ? 'pointer' : 'default',
                  opacity: mod.isComingSoon ? 0.8 : 1,
                  filter: mod.isComingSoon ? 'grayscale(0.5)' : 'none'
                }}
              >
                {/* Background Image Image */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                  <Image src={mod.bgSrc} alt={mod.title} fill style={{ objectFit: 'cover', opacity: 0.3, mixBlendMode: 'luminosity' }} quality={60} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,15,30,0.4) 0%, rgba(10,15,30,1) 100%)' }}></div>
                </div>

                {/* Coming Soon Overlay */}
                {mod.isComingSoon && (
                  <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(255,51,102,0.2)', border: '1px solid var(--danger)', color: 'var(--danger)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px', zIndex: 2, backdropFilter: 'blur(4px)' }}>
                    PRÓXIMAMENTE
                  </div>
                )}

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 1, padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%' }}>
                  <div style={{ background: `linear-gradient(135deg, ${mod.glowColor} 0%, transparent 100%)`, padding: '1.5rem', borderRadius: '50%', marginBottom: '2rem', border: `1px solid ${mod.borderColor}`, boxShadow: `0 0 30px ${mod.glowColor}` }}>
                    {mod.icon}
                  </div>
                  
                  <h2 style={{ fontSize: '2rem', color: 'white', margin: '0 0 1rem 0', textShadow: `0 2px 10px rgba(0,0,0,0.8)` }}>
                    {mod.title}
                  </h2>
                  
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: 1.5, flex: 1 }}>
                    {mod.subtitle}
                  </p>

                  {/* Feature Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginTop: '2rem' }}>
                    {mod.features.map(f => (
                      <span key={f} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.4rem 0.8rem', borderRadius: '12px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)' }}>
                        {f}
                      </span>
                    ))}
                  </div>

                  {isClickable && (
                     <div style={{ marginTop: '2.5rem', width: '100%' }}>
                       <div style={{ background: mod.glowColor, border: `1px solid ${mod.borderColor}`, color: 'white', padding: '1rem', borderRadius: '16px', fontWeight: 'bold', letterSpacing: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                         <Zap size={18} /> INICIAR PROTOCOLO
                       </div>
                     </div>
                  )}
                </div>
              </motion.div>
            );

            return isClickable ? (
              <Link href={mod.link} key={mod.id} style={{ textDecoration: 'none' }}>
                <CardContent />
              </Link>
            ) : (
              <div key={mod.id}>
                <CardContent />
              </div>
            );
          })}
        </div>

      </main>
      
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
