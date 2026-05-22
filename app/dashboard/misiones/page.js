'use client';
import { useAuth } from '@/hooks/useAuth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Navbar from '@/components/Navbar';
import HubDecorations from '@/components/HubDecorations';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Map, ChevronRight, Lock, Star, PlayCircle, Rocket, Gamepad2, Filter } from 'lucide-react';

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
    id: "ciencia_interstellar",
    title: "La Ciencia de Interstellar",
    subtitle: "Agujeros negros, gravedad y dilatación temporal. ¿Podemos sobrevivir a Gargantúa?",
    link: "/hub/interstellar",
    bgSrc: "/assets/interstellar/interstellar_card_bg.png",
    badgeColor: "#00E4FF",
    badgeText: "Astrofísica Teórica",
    borderColor: "rgba(0, 228, 255, 0.4)"
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
    link: "/hub/objetos-interestelares",
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
    link: "/hub/exoplanetas",
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
    link: "/hub/agujeros-gusano",
    bgSrc: "/assets/dashboard/agujeros_gusano_cover.png",
    badgeColor: "#00FFCC",
    badgeText: "Teoría Astrofísica",
    borderColor: "rgba(0, 255, 204, 0.4)"
  },
  {
    id: "apollo11",
    title: "Misión Apollo 11",
    subtitle: "El viaje más audaz de la humanidad: del Kennedy Space Center a la Luna.",
    link: "/hub/apollo11",
    bgSrc: "/assets/apollo11/course_card.png",
    badgeColor: "#FF6B35",
    badgeText: "Misión Lunar",
    borderColor: "rgba(255, 107, 53, 0.4)"
  },
  {
    id: "apollo8",
    title: "Misión Apollo 8",
    subtitle: "El primer viaje tripulado alrededor de la Luna y el amanecer terrestre.",
    link: "/hub/apollo8",
    bgSrc: "/assets/dashboard/apollo8_cover.png",
    badgeColor: "#4169E1",
    badgeText: "Misión Lunar",
    borderColor: "rgba(65, 105, 225, 0.4)"
  },
  {
    id: "apollo10",
    title: "Misión Apollo 10",
    subtitle: "El ensayo general que allanó el camino hacia la superficie lunar.",
    link: "/hub/apollo10",
    bgSrc: "/assets/dashboard/apollo10_cover.png",
    badgeColor: "#32CD32",
    badgeText: "Misión Lunar",
    borderColor: "rgba(50, 205, 50, 0.4)"
  },
  {
    id: "copernico",
    title: "Copérnico: Sus aportes a la ciencia",
    subtitle: "El revolucionario astrónomo que detuvo el Sol y movió la Tierra.",
    link: "/hub/copernico",
    bgSrc: "/assets/copernico/copernico_cover.png",
    badgeColor: "#FFD700",
    badgeText: "Revolución Científica",
    borderColor: "rgba(255, 215, 0, 0.4)"
  }
];

export default function CourseHub() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('Todos');

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  if (loading || !userData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020308', color: '#00E4FF' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div className="pulse-anim" style={{ width: 50, height: 50, border: '4px solid #00E4FF', borderRadius: '50%', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
          Accediendo a la Base de Datos Estelar...
        </div>
      </div>
    );
  }

  const userStars = userData?.progress?.stars || 0;

  const categories = ['Todos', 'Arqueoastronomía', 'Exploración Galáctica', 'Misión Lunar', 'Teoría Astrofísica', 'Vuelo y Geología', 'Minijuegos'];

  const getCategory = (badgeText) => {
    if (badgeText.includes('Arqueoastronomía')) return 'Arqueoastronomía';
    if (badgeText.includes('Exploración')) return 'Exploración Galáctica';
    if (badgeText.includes('Misión Lunar')) return 'Misión Lunar';
    if (badgeText.includes('Astrofísica') || badgeText.includes('Física') || badgeText.includes('Evento')) return 'Teoría Astrofísica';
    if (badgeText.includes('Minijuegos')) return 'Minijuegos';
    return 'Vuelo y Geología'; // Default for Vuelo Espacial, Historico, Biologico, Rocoso
  };

  const filteredMissions = activeCategory === 'Todos' 
    ? DASHBOARD_MISSIONS 
    : DASHBOARD_MISSIONS.filter(m => getCategory(m.badgeText) === activeCategory);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#020308', overflow: 'hidden' }}>
      <Navbar />
      
      {/* Background Ambience */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        {/* Animated stars */}
        <HubDecorations />
        
        {/* Gradients */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(0,228,255,0.05) 0%, transparent 40%), radial-gradient(circle at bottom left, rgba(153,51,255,0.05) 0%, transparent 40%)' }} />
        
        {/* Animated Cyber Grid */}
        <div style={{ 
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', 
          background: 'linear-gradient(transparent 0%, rgba(0,228,255,0.05) 100%)',
          perspective: '1000px',
          overflow: 'hidden'
        }}>
          <div style={{
             position: 'absolute', inset: -1000, 
             background: 'linear-gradient(rgba(0, 228, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 228, 255, 0.15) 1px, transparent 1px)',
             backgroundSize: '80px 80px',
             transform: 'rotateX(75deg) translateY(-200px)',
             animation: 'gridMove 15s linear infinite'
          }} />
        </div>
      </div>

      <main style={{ flex: 1, padding: '3rem 5%', display: 'flex', flexDirection: 'column', gap: '3rem', position: 'relative', zIndex: 1 }}>
        
        {/* Encabezado */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--electric-blue)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', fontWeight: 600 }}>
              <Map size={18} /> Terminal de Navegación
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', margin: 0, color: 'white', textShadow: '0 0 20px rgba(0, 228, 255, 0.2)', fontWeight: 800 }}>
              Catálogo de Misiones
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,215,0,0.05)', padding: '0.8rem 1.5rem', borderRadius: '20px', border: '1px solid rgba(255,215,0,0.2)' }}>
            <Star size={24} color="var(--gold-star)" />
            <div>
              <p style={{ margin: 0, fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px' }}>Polvo Estelar Disponible</p>
              <h2 style={{ margin: 0, fontSize: '1.8rem', color: 'var(--gold-star)', lineHeight: 1 }}>{userStars}</h2>
            </div>
          </div>
        </header>

        {/* Featured Mission - Sistema Solar */}
        <section>
          <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', padding: '3rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '350px', border: '1px solid rgba(0,228,255,0.3)', boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 0 40px rgba(0,228,255,0.1)' }}>
            <Image src="/assets/solar_system_cover.png" alt="Solar System" fill style={{ objectFit: 'cover', zIndex: -1, opacity: 0.6 }} quality={85} priority />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(2,3,8,0.9) 0%, rgba(2,3,8,0.4) 60%, transparent 100%)', zIndex: 0 }}></div>
            
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px' }}>
               <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,228,255,0.2)', color: '#00E4FF', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '1rem', border: '1px solid rgba(0,228,255,0.4)' }}>
                 <Rocket size={14} /> MISIÓN PRIORITARIA DE LA FLOTA
               </div>
               <h2 style={{ fontSize: '3rem', margin: '0 0 1rem 0', color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>El Sistema Solar</h2>
               <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', margin: '0 0 2rem 0', lineHeight: 1.5 }}>
                 Conquista los 9 planetas, descubre sus misterios bilingües y recolecta las medallas orbitales en la experiencia insignia de la academia.
               </p>
               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ display: 'inline-block' }}>
                 <Link href="/hub/solar-system" style={{ textDecoration: 'none', background: 'var(--electric-blue)', color: 'black', padding: '1rem 2.5rem', borderRadius: '30px', fontWeight: 'bold', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.8rem', boxShadow: '0 0 20px rgba(0,228,255,0.4)' }}>
                   <PlayCircle size={24} /> Iniciar Secuencia
                 </Link>
               </motion.div>
            </div>
          </div>
        </section>

        {/* Filtros */}
        <section style={{ display: 'flex', alignItems: 'center', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', scrollbarWidth: 'none' }}>
          <div style={{ color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '0.5rem', paddingRight: '1rem', borderRight: '1px solid rgba(255,255,255,0.2)' }}>
            <Filter size={18} /> Filtrar
          </div>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? 'rgba(0,228,255,0.15)' : 'transparent',
                border: `1px solid ${activeCategory === cat ? '#00E4FF' : 'rgba(255,255,255,0.2)'}`,
                color: activeCategory === cat ? '#00E4FF' : 'rgba(255,255,255,0.6)',
                padding: '0.5rem 1.2rem',
                borderRadius: '20px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontWeight: 600,
                transition: 'all 0.2s',
                boxShadow: activeCategory === cat ? '0 0 15px rgba(0,228,255,0.2)' : 'none'
              }}
            >
              {cat}
            </button>
          ))}
        </section>

        {/* Grid de Misiones */}
        <section>
          <AnimatePresence mode="popLayout">
            <motion.div 
              layout 
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}
            >
              {filteredMissions.map((mission, idx) => (
                <motion.div
                  key={mission.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                >
                  <Link href={mission.link} style={{ textDecoration: 'none' }}>
                    <motion.div 
                      whileHover={{ y: -8, boxShadow: `0 15px 30px rgba(0,0,0,0.6), 0 0 0 1px ${mission.borderColor}, 0 0 20px ${mission.borderColor}` }}
                      style={{ 
                        position: 'relative', overflow: 'hidden', height: '100%', minHeight: '380px',
                        background: 'rgba(10,15,30,0.5)', borderRadius: '20px', 
                        border: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex', flexDirection: 'column',
                        transition: 'all 0.3s ease'
                      }}
                    >
                       {/* Imagen Superior */}
                       <div style={{ position: 'relative', height: '200px', width: '100%' }}>
                         {mission.bgSrc ? (
                            <Image src={mission.bgSrc} alt={mission.title} fill style={{ objectFit: 'cover' }} quality={60} />
                         ) : (
                            <div style={{ position: 'absolute', inset: 0, background: mission.bgImage }}></div>
                         )}
                         <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 0%, rgba(10,15,30,1) 100%)' }}></div>
                         
                         {/* Badge Superior */}
                         <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.7)', border: `1px solid ${mission.badgeColor}`, color: mission.badgeColor, padding: '0.4rem 0.8rem', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', backdropFilter: 'blur(5px)' }}>
                           {mission.isMinigame ? <Gamepad2 size={14} /> : <Rocket size={14} />}
                           {mission.badgeText}
                         </div>
                       </div>
                       
                       {/* Contenido Inferior */}
                       <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 1 }}>
                         <div>
                           <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem', color: 'white', lineHeight: 1.2 }}>{mission.title}</h3>
                           <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>{mission.subtitle}</p>
                         </div>
                         
                         <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', color: mission.badgeColor, fontWeight: 600, fontSize: '0.9rem', gap: '0.5rem' }}>
                           <span>{mission.isMinigame ? 'ACCEDER AL SIMULADOR' : 'VER EXPEDIENTE'}</span>
                           <ChevronRight size={16} />
                         </div>
                       </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          
          {filteredMissions.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,0.4)' }}>
              No se encontraron misiones en esta categoría.
            </div>
          )}
        </section>
      </main>
      
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes gridMove {
          0% { transform: rotateX(75deg) translateY(0); }
          100% { transform: rotateX(75deg) translateY(80px); }
        }
      `}</style>
    </div>
  );
}
