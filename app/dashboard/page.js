'use client';
import { useAuth } from '@/hooks/useAuth';
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
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'url(/assets/planet_earth_1774878748720.png) no-repeat center right / cover', zIndex: -1, opacity: 0.5 }}></div>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(90deg, #020308 0%, rgba(2,3,8,0.4) 100%)', zIndex: 0 }}></div>
          
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px' }}>
             <p style={{ color: 'var(--electric-blue)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <Rocket size={18} /> Curso Principal Activo
             </p>
             <h2 style={{ fontSize: '3.5rem', margin: 0, lineHeight: 1.1 }}>Misión: Sistema Solar</h2>
             <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', margin: '1rem 0 2rem 0' }}>Conquista los 9 planetas, descubre sus misterios bi-lingües y recolecta las medallas orbitales completando minijuegos de simulación.</p>
             <Link href="/hub/solar-system" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.2rem', display: 'inline-flex', alignItems: 'center', gap: '0.8rem' }}>
               <PlayCircle size={24} /> Entrar al HUB Planetario
             </Link>
          </div>
        </section>

        {/* Coming Soon Carousel */}
        <section>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            Próximos Lanzamientos <span style={{ fontSize: '1rem', background: 'rgba(255,255,255,0.1)', padding: '0.3rem 0.8rem', borderRadius: '12px' }}>Coming Soon</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            {/* Locked Course 1 */}
            <div className="glass-card" style={{ position: 'relative', overflow: 'hidden', padding: '2.5rem 2rem', opacity: 0.7 }}>
               <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                 <Lock size={40} color="var(--text-muted)" />
                 <h3 style={{ textTransform: 'uppercase', letterSpacing: '2px', marginTop: '1rem' }}>En Desarrollo</h3>
               </div>
               <h3 style={{ margin: 0, fontSize: '1.8rem', color: 'var(--starlight)' }}>Exploradores de Agujeros Negros</h3>
               <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Nivel 2: Misiones Peligrosas y Física Cuántica para principiantes.</p>
            </div>

            {/* Locked Course 2 */}
            <div className="glass-card" style={{ position: 'relative', overflow: 'hidden', padding: '2.5rem 2rem', opacity: 0.7 }}>
               <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                 <Lock size={40} color="var(--text-muted)" />
                 <h3 style={{ textTransform: 'uppercase', letterSpacing: '2px', marginTop: '1rem' }}>Muy Pronto</h3>
               </div>
               <h3 style={{ margin: 0, fontSize: '1.8rem', color: 'var(--starlight)' }}>La Vía Láctea Inexplorada</h3>
               <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Nivel 3: Navegación Interestelar, Exoplanetas y Aliens imaginarios.</p>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
