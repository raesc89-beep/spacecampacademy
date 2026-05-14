'use client';
import { useAuth } from '@/hooks/useAuth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Star, PlayCircle, Rocket, Gamepad2 } from 'lucide-react';
import { useEffect } from 'react';
import Image from 'next/image';

const DASHBOARD_MISSIONS = [
  {
    id: "egypt_astro",
    title: "Arqueoastronomía Egipcia",
    subtitle: "Explora los secretos estelares y el cielo cósmico de los antiguos faraones.",
    link: "/hub/egypt-astro",
    bgSrc: "/assets/egypt/dashboard_cover.png",
    badgeColor: "#D4A843",
    badgeText: "Arqueoastronomía",
    borderColor: "rgba(212, 168, 67, 0.4)"
  },
  {
    id: "ciencia_volver_al_futuro",
    title: "La Ciencia de Volver al Futuro",
    subtitle: "Cronodinámica, gravitación y energía de fusión a través del DeLorean.",
    link: "/hub/bttf",
    bgSrc: "/assets/bttf/bttf_cover.png",
    badgeColor: "#FF4500",
    badgeText: "Física Cuántica",
    borderColor: "rgba(255, 69, 0, 0.4)"
  },
  {
    id: "ciencia_star_wars",
    title: "La Ciencia de Star Wars",
    subtitle: "Astrofísica, biomecatrónica y evolución cuántica aplicada al universo galáctico.",
    link: "/hub/star-wars",
    bgSrc: "/assets/starwars/star_wars_bg_v5.jpg",
    badgeColor: "#FFE81F",
    badgeText: "Astrofísica Teórica",
    borderColor: "rgba(255, 232, 31, 0.4)"
  },
  {
    id: "arqueoastronomia_maya",
    title: "Arqueoastronomía Maya",
    subtitle: "Descubre cómo los antiguos sabios decodificaron la danza de las estrellas.",
    link: "/hub/maya-astro",
    bgSrc: "/assets/maya/maya_course_cover.png",
    badgeColor: "#00FF00",
    badgeText: "Arqueoastronomía",
    borderColor: "rgba(0, 255, 0, 0.4)"
  },
  {
    id: "objetos_interestelares",
    title: "Objetos Interestelares",
    subtitle: "Viajeros de otros sistemas estelares cruzando nuestro vecindario.",
    link: "/course/objetos_interestelares",
    bgSrc: "/assets/dashboard/interestelar_cover.png",
    badgeColor: "#00E4FF",
    badgeText: "Exploración Galáctica",
    borderColor: "rgba(0, 228, 255, 0.4)"
  },
  {
    id: "viaje_planetas_rocosos",
    title: "Planetas Rocosos",
    subtitle: "Explora la geología extrema de Mercurio, Venus, Tierra y Marte.",
    link: "/hub/planetas-rocosos",
    bgSrc: "/assets/dashboard/rocosos_cover.png",
    badgeColor: "#D2691E",
    badgeText: "Geología Estelar",
    borderColor: "rgba(210, 105, 30, 0.4)"
  },
  {
    id: "exoplanetas",
    title: "Los Exoplanetas",
    subtitle: "Cazando mundos lejanos más allá de nuestro sol.",
    link: "/course/exoplanetas",
    bgSrc: "/assets/dashboard/exoplanetas_cover.png",
    badgeColor: "#9370DB",
    badgeText: "Exploración Profunda",
    borderColor: "rgba(147, 112, 219, 0.4)"
  },
  {
    id: "asteroides",
    title: "Asteroides y Cometas",
    subtitle: "Rocas y hielos milenarios del espacio profundo.",
    link: "/hub/asteroides-cometas",
    bgSrc: "/assets/asteroides/Rosseta.png",
    badgeColor: "#EF4444",
    badgeText: "Vuelo Rocoso",
    borderColor: "rgba(239, 68, 68, 0.4)"
  },
  {
    id: "viaje-planetas-gaseosos",
    title: "Planetas Gaseosos",
    subtitle: "Nubes colosales, vientos sónicos y lunas heladas.",
    link: "/course/viaje-planetas-gaseosos",
    bgSrc: "/assets/dashboard/planetas_gaseosos_cover.png",
    badgeColor: "#8A2BE2",
    badgeText: "Vuelo Atmosférico",
    borderColor: "rgba(138, 43, 226, 0.4)"
  },
  {
    id: "animales",
    title: "Animales en el Espacio",
    subtitle: "Pioneros peludos hacia las estrellas.",
    link: "/hub/animales",
    bgSrc: "/assets/animales/portada_curso.png",
    badgeColor: "var(--gold-star)",
    badgeText: "Vuelo Biológico",
    borderColor: "rgba(255, 184, 0, 0.4)"
  },
  {
    id: "pioneros",
    title: "Primeros en el Espacio",
    subtitle: "Conoce a los valientes astronautas que abrieron el camino.",
    link: "/hub/pioneros",
    bgSrc: "/assets/dashboard/pioneros_cover.png",
    badgeColor: "#00BFFF",
    badgeText: "Vuelo Histórico",
    borderColor: "rgba(0, 191, 255, 0.4)"
  },
  {
    id: "stellar-objects",
    title: "Anomalías Cósmicas",
    subtitle: "Agujeros negros, Cuásares y Púlsares.",
    link: "/hub/stellar-objects",
    bgSrc: "/assets/black_hole_icon.png",
    badgeColor: "var(--electric-blue)",
    badgeText: "Astrofísica",
    borderColor: "rgba(0, 228, 255, 0.4)"
  },
  {
    id: "colisiones_estelares",
    title: "Colisiones Estelares",
    subtitle: "El majestuoso y destructivo choque de galaxias gigantes.",
    link: "/course/colisiones_estelares",
    bgSrc: "/assets/course_colisiones.png",
    badgeColor: "#9933ff",
    badgeText: "Evento Cósmico",
    borderColor: "rgba(153, 51, 255, 0.4)"
  },
  {
    id: "robots_espacio",
    title: "Robots en el Espacio",
    subtitle: "Conoce a los exploradores mecánicos que recorren Marte.",
    link: "/hub/robots-espacio",
    bgSrc: "/assets/robots_espacio_cover.png",
    badgeColor: "#FF6347",
    badgeText: "Astroingeniería",
    borderColor: "rgba(255, 99, 71, 0.4)"
  },
  {
    id: "agujeros_gusano_er",
    title: "Agujeros de Gusano Einstein-Rosen",
    subtitle: "Atajos espaciotemporales, materia exótica y la visión de Contacto.",
    link: "/course/agujeros_gusano_er",
    bgSrc: "/assets/dashboard/agujeros_gusano_cover.png",
    badgeColor: "#00FFCC",
    badgeText: "Teoría Astrofísica",
    borderColor: "rgba(0, 255, 204, 0.4)"
  },
  {
    id: "arcade",
    title: "Zona Arcade",
    subtitle: "8 minijuegos espaciales: memoria, trivia, bingo, Laika Finder y más.",
    link: "/hub/arcade",
    bgSrc: "/assets/dashboard/arcade_cover.png",
    badgeColor: "#FF00FF",
    badgeText: "Minijuegos",
    borderColor: "rgba(255,0,255,0.4)",
    isMinigame: true
  }
];


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
  if (false && userData.role !== "admin" && !userData.isApproved) { // Bypass Muro Restringido
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', background: 'radial-gradient(circle at center, #1a0b2e 0%, #000000 100%)' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(255,51,102,0.3)', maxWidth: '500px' }}>
           <h1 style={{ color: 'var(--danger)', fontSize: '2.5rem', marginBottom: '1rem' }}>Sector Restringido</h1>
           <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '2rem' }}>
             Tu identidad está siendo verificada por el <strong>Comandante en Jefe (Administrador)</strong>. <br/><br/>
             Por protocolos intergalácticos de seguridad, espera a que tu solicitud sea aprobada antes de ingresar a la Estación Central.
           </p>
           <button onClick={() => { import('firebase/auth').then(m => m.signOut(import('@/lib/firebase').then(f => f.auth))); window.location.href = '/'; }} className="btn-secondary">
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
          <Image src="/assets/solar_system_cover.png" alt="Solar System" fill style={{ objectFit: 'cover', zIndex: -1, opacity: 0.7 }} quality={75} priority />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(90deg, #020308 0%, rgba(2,3,8,0.4) 100%)', zIndex: 0 }}></div>
          
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px' }}>
             <p style={{ color: 'var(--electric-blue)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <Rocket size={18} /> Curso Principal Activo
             </p>
             <h2 style={{ fontSize: '3.5rem', margin: 0, lineHeight: 1.1 }}>Misión: Sistema Solar</h2>
             <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', margin: '1rem 0 2rem 0' }}>Conquista los 9 planetas, descubre sus misterios bilingües y recolecta las medallas orbitales completando minijuegos de simulación.</p>
             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
               <Link href="/hub/solar-system" className="btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.3rem', display: 'inline-flex', alignItems: 'center', gap: '1rem', background: 'var(--electric-blue)', color: 'black', boxShadow: '0 0 30px rgba(0, 228, 255, 0.4)' }}>
                 <PlayCircle size={28} /> DESPEGAR AL MAPA
               </Link>
             </motion.div>
          </div>
        </section>

        {/* Dynamic Coming Soon / Hub Catalog */}
        <section>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            Exploración y Simuladores <span style={{ fontSize: '1rem', background: 'rgba(255,255,255,0.1)', padding: '0.3rem 0.8rem', borderRadius: '12px' }}>Actualizado</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            {DASHBOARD_MISSIONS.map((mission) => (
              <Link key={mission.id} href={mission.link} style={{ textDecoration: 'none' }}>
                <motion.div whileHover={{ y: -10 }} className="glass-card" style={{ position: 'relative', overflow: 'hidden', padding: '12rem 2rem 2.5rem 2rem', opacity: 1, borderRadius: '20px', border: `1px solid ${mission.borderColor}` }}>
                   {mission.bgSrc ? (
                      <Image src={mission.bgSrc} alt={mission.title} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover', filter: 'brightness(0.6)' }} quality={60} />
                   ) : (
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: mission.bgImage, filter: 'brightness(0.6)' }}></div>
                   )}
                   <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%)', zIndex: 0 }}></div>
                   
                   <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 1, background: mission.badgeColor, color: mission.id === 'creator' ? 'white' : 'black', padding: '0.5rem 1rem', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
                     {mission.isMinigame ? <Gamepad2 size={16} /> : <PlayCircle size={16} />}
                     <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{mission.badgeText}</span>
                   </div>

                   <div style={{ position: 'relative', zIndex: 1 }}>
                     <h3 style={{ margin: 0, fontSize: '1.8rem', color: mission.isMinigame ? mission.badgeColor : 'white', textShadow: `0 0 10px ${mission.borderColor}` }}>{mission.title}</h3>
                     <p style={{ color: mission.isMinigame ? 'var(--text-muted)' : mission.badgeColor, marginTop: '0.5rem' }}>{mission.subtitle}</p>
                     
                     {mission.isMinigame && (
                       <div style={{ marginTop: '1.5rem' }}>
                          <div className={mission.id === 'creator' ? "btn-primary" : "btn-secondary"} style={{ padding: '0.8rem 1.5rem', display: 'inline-block', borderColor: mission.badgeColor, color: mission.badgeColor, background: 'transparent' }}>
                            {mission.id === 'creator' ? 'INICIAR MÃQUINA' : 'JUGAR AHORA'}
                          </div>
                       </div>
                     )}
                   </div>
                </motion.div>
              </Link>
            ))}

          </div>
        </section>

      </main>
    </div>
  );
}

