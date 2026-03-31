import Link from "next/link";
import { ArrowRight, BookOpen, Star, UserPlus } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Navbar Simple */}
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', margin: 0, fontFamily: 'var(--font-quantico)', color: 'white' }}>
          <span style={{ fontSize: '1.8rem' }}>🚀</span> Space Camp Academy
        </h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/auth" className="btn-secondary" style={{ padding: '0.6rem 1.2rem' }}>Login</Link>
          <Link href="/auth?m=register" className="btn-primary" style={{ padding: '0.6rem 1.2rem' }}>Registrarse</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="layout-container" style={{ flex: 1, padding: '4rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6rem' }}>
        
        <header style={{ textAlign: 'center', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', animation: 'fadeInUp 1s ease-out' }}>
          <div style={{ padding: '0.5rem 1rem', background: 'rgba(0, 228, 255, 0.1)', border: '1px solid rgba(0, 228, 255, 0.3)', borderRadius: '30px', color: 'var(--electric-blue)', fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>
            🌟 Nueva Temporada de Despegues 🌟
          </div>
          <h1 style={{ fontSize: '4rem', lineHeight: '1.1', margin: 0, textShadow: '0 0 30px rgba(0,228,255,0.4)' }}>
            El Universo Entero <br/><span style={{ color: 'var(--electric-blue)' }}>A Tu Alcance</span>
          </h1>
          <p className="lead" style={{ fontSize: '1.3rem', opacity: 0.9, maxWidth: '600px' }}>
            Explora el Sistema Solar, completa misiones interactivas y conviértete en un astronauta certificado por la Space Camp Academy.
          </p>
          
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/auth?m=register" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <UserPlus size={24} /> Comenzar Misión
            </Link>
            <Link href="/parent/auth" className="btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <Star size={24} /> Portal para Padres
            </Link>
          </div>
        </header>

        {/* Global Partner Banner */}
        <section style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
          <img 
            src="/assets/partner_banner.png" 
            alt="Space Camp Academy Partners" 
            style={{ 
              width: '100%', 
              height: 'auto', 
              borderRadius: '24px', 
              boxShadow: '0 0 50px rgba(0, 228, 255, 0.2)',
              border: '2px solid rgba(255,255,255,0.1)' 
            }} 
          />
        </section>

        {/* Commander Marco Velez Section */}
        <section className="glass-card" style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2fr', gap: '3rem', alignItems: 'center', maxWidth: '900px', width: '100%', padding: '3rem', margin: '4rem 0' }}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', borderRadius: '50%', overflow: 'hidden', border: '4px solid var(--electric-blue)', boxShadow: '0 0 40px rgba(0, 228, 255, 0.3)' }}>
             <img src="/assets/marco_velez.jpg" alt="Marco Antonio Vélez Montaño" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ color: 'var(--gold-star)', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem' }}>Astrofísico & Educador</div>
            <h2 style={{ margin: 0, fontSize: '2.5rem' }}>Marco Antonio Vélez Montaño</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6 }}>
              Director de Divulgación Científica y Coordinador Académico Internacional del Space Academy Camp. Con una profunda pasión por la educación aeroespacial y el acercamiento de los jóvenes a la tecnología espacial. Su misión es inspirar a la próxima generación de cadetes a explorar juntos los grandes misterios del Sistema Solar.
            </p>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
               <span style={{ padding: '0.4rem 1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '0.8rem' }}>Astrofísica</span>
               <span style={{ padding: '0.4rem 1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '0.8rem' }}>Divulgador Científico</span>
               <span style={{ padding: '0.4rem 1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '0.8rem' }}>Director AMDE</span>
            </div>
          </div>
        </section>

        {/* Partners / Logos Section */}
        <section style={{ textAlign: 'center', width: '100%' }}>
          <h3 style={{ color: 'var(--text-muted)', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem' }}>Con el respaldo y colaboración de</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <img src="/assets/custom_1.jpg" alt="Partner 1" style={{ height: '80px', objectFit: 'contain', borderRadius: '12px', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.1))' }} />
            <img src="/assets/custom_2.jpg" alt="Partner 2" style={{ height: '80px', objectFit: 'contain', borderRadius: '12px', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.1))' }} />
            <img src="/assets/custom_3.jpg" alt="Partner 3" style={{ height: '80px', objectFit: 'contain', borderRadius: '12px', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.1))' }} />
            <img src="/assets/custom_4.jpg" alt="Partner 4" style={{ height: '80px', objectFit: 'contain', borderRadius: '12px', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.1))' }} />
          </div>
        </section>

      </main>

      <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 'auto', background: 'rgba(0,0,0,0.5)' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>© 2026 Space Camp Academy de Marco Velez. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
