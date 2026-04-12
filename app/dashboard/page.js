'use client';
import { useAuth } from '@/hooks/useAuth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Star, PlayCircle, Rocket } from 'lucide-react';
import { useEffect } from 'react';

export default function CourseHub() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  if (loading || !userData) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Validando acceso al Hub...</div>;
  }

  // Muro Administrativo de Autorización (Fase 3.6)
  if (userData.role !== 'admin' && !userData.isApproved) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', background: 'radial-gradient(circle at center, #1a0b2e 0%, #000000 100%)' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(255,51,102,0.3)', maxWidth: '500px' }}>
           <h1 style={{ color: 'var(--danger)', fontSize: '2.5rem', marginBottom: '1rem' }}>Sector Restringido</h1>
           <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '2rem' }}>
             Tu identidad está siendo verificada por el <strong>Comandante en Jefe (Administrador)</strong>. <br/><br/>
             Por protocolos intergalácticos de seguridad, espera a que tu solicitud sea aprobada antes de ingresar a la Estación Central.
           </p>
           <button onClick={() => { auth.signOut(); window.location.reload(); }} className="btn-secondary">
             Cerrar Sesión
           </button>
        </div>
      </div>
    );
  }

  const userStars = userData?.progress?.stars || 0;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main className="layout-container" style={{ flex: 1, padding: '3rem 2rem', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        
        {/* Welcome Section */}
        <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '3rem', margin: 0, textShadow: '0 0 20px rgba(0, 228, 255, 0.3)' }}>Catálogo de Misiones</h1>
            <p className="lead" style={{ margin: '0.5rem 0', color: 'var(--text-muted)' }}>Hola, Comandante {userData.name}. Escoge tu próximo destino.</p>
          </div>
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', minWidth: '200px', border: '1px solid rgba(255,215,0,0.3)' }}>
            <div style={{ background: 'rgba(255, 215, 0, 0.2)', padding: '1rem', borderRadius: '50%', boxShadow: '0 0 20px rgba(255, 215, 0, 0.4)' }}>
              <Star size={32} color="var(--gold-star)" />
            </div>
            <div>
              <p style={{ margin: 0, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--text-muted)' }}>Polvo Estelar Total</p>
              <h2 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--gold-star)', lineHeight: 1 }}>{userStars}</h2>
            </div>
          </div>
        </section>

        {/* Featured Course */}
        <section style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minHeight: '400px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'url(/assets/solar_system_cover.png) no-repeat center right / cover', zIndex: -1, opacity: 0.7 }}></div>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(90deg, #020308 0%, rgba(2,3,8,0.4) 100%)', zIndex: 0 }}></div>
          
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px' }}>
             <p style={{ color: 'var(--electric-blue)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <Rocket size={18} /> Curso Principal Activo
             </p>
             <h2 style={{ fontSize: '3.5rem', margin: 0, lineHeight: 1.1 }}>Misión: Sistema Solar</h2>
             <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', margin: '1rem 0 2rem 0' }}>Conquista los 9 planetas, descubre sus misterios bi-lingües y recolecta las medallas orbitales completando minijuegos de simulación.</p>
             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
               <Link href="/hub/solar-system" className="btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.3rem', display: 'inline-flex', alignItems: 'center', gap: '1rem', background: 'var(--electric-blue)', color: 'black', boxShadow: '0 0 30px rgba(0, 228, 255, 0.4)' }}>
                 <PlayCircle size={28} /> DESPEGAR AL MAPA
               </Link>
             </motion.div>
          </div>
        </section>

        {/* Coming Soon Carousel */}
        <section>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            Próximos Lanzamientos <span style={{ fontSize: '1rem', background: 'rgba(255,255,255,0.1)', padding: '0.3rem 0.8rem', borderRadius: '12px' }}>Coming Soon</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            {/* Active Course 2: Anomalías Cósmicas */}
            <Link href="/hub/stellar-objects" style={{ textDecoration: 'none' }}>
              <motion.div whileHover={{ y: -10 }} className="glass-card" style={{ position: 'relative', overflow: 'hidden', padding: '12rem 2rem 2.5rem 2rem', opacity: 1, borderRadius: '20px', border: '1px solid rgba(0, 228, 255, 0.4)' }}>
                 <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'url(/assets/black_hole_icon.png) center center / cover no-repeat', filter: 'brightness(0.6)' }}></div>
                 <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%)', zIndex: 0 }}></div>
                 
                 <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 1, background: 'var(--electric-blue)', color: 'black', padding: '0.5rem 1rem', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
                   <PlayCircle size={16} />
                   <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Nuevo Vuelo</span>
                 </div>

                 <div style={{ position: 'relative', zIndex: 1 }}>
                   <h3 style={{ margin: 0, fontSize: '1.8rem', color: 'white', textShadow: '0 0 10px rgba(0,228,255,0.8)' }}>Anomalías Cósmicas</h3>
                   <p style={{ color: 'var(--electric-blue)', marginTop: '0.5rem' }}>Agujeros negros, Cuásares y Púlsares.</p>
                 </div>
              </motion.div>
            </Link>

            {/* Minijuego 1: Decodificador (Fase 4) */}
            <motion.div whileHover={{ y: -10 }} className="glass-card" style={{ position: 'relative', overflow: 'hidden', padding: '12rem 2rem 2.5rem 2rem', opacity: 1, borderRadius: '20px', border: '1px solid rgba(0, 255, 136, 0.4)' }}>
               <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, #0a192f 0%, #020308 100%)', zIndex: 0 }}></div>
               
               <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 1, background: 'var(--success)', padding: '0.5rem 1rem', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'black', fontWeight: 'bold' }}>
                 <PlayCircle size={16} />
                 <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Nuevo Reto</span>
               </div>

               <div style={{ position: 'relative', zIndex: 1 }}>
                 <h3 style={{ margin: 0, fontSize: '1.8rem', color: 'var(--success)' }}>Interceptación Estelar</h3>
                 <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Decodifica frecuencias alienígenas para ganar polvo estelar rápido.</p>
                 <Link href="/minigames/decoder" className="btn-secondary" style={{ display: 'inline-block', marginTop: '1rem', color: 'var(--success)', borderColor: 'var(--success)' }}>JUGAR AHORA</Link>
               </div>
            </motion.div>

          </div>
        </section>

      </main>
    </div>
  );
}
