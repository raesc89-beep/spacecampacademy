'use client';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import HubDecorations from '@/components/HubDecorations';

import { COURSE_DATA } from '@/lib/courseData';

const globalStyles = `
  @keyframes dustSweep {
    0% { transform: translateX(-20vw) skewX(-25deg); opacity: 0; }
    10% { opacity: 0.8; }
    50% { opacity: 0.8; }
    100% { transform: translateX(120vw) skewX(-25deg); opacity: 0; }
  }
  @keyframes dustHaze {
    0% { opacity: 0; transform: translateX(-5%) scaleX(0.9); }
    30% { opacity: 1; }
    70% { opacity: 0.8; }
    100% { opacity: 0; transform: translateX(8%) scaleX(1.1); }
  }
  @keyframes blowingSand {
    0% { background-position: 0 0; opacity: 0.3; }
    50% { opacity: 0.6; }
    100% { background-position: 1500px 0; opacity: 0.3; }
  }
  @keyframes twinkle {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.5); boxShadow: 0 0 8px rgba(255,255,255,0.8); }
  }
  @keyframes shootingStar {
    0% { transform: rotate(5deg) translateX(0) scale(1); opacity: 1; }
    15% { transform: rotate(5deg) translateX(800px) scale(0); opacity: 0; }
    100% { transform: rotate(5deg) translateX(800px) scale(0); opacity: 0; }
  }
`;

function Stars() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {Array.from({ length: 150 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 60}%`, // Cielo estrellado
          width: `${Math.random() * 1.5 + 0.5}px`,
          height: `${Math.random() * 1.5 + 0.5}px`,
          borderRadius: '50%',
          background: 'white',
          opacity: Math.random() * 0.7 + 0.3,
          animation: `twinkle ${Math.random() * 4 + 2}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 3}s`,
        }} />
      ))}
    </div>
  );
}

function Comets() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {Array.from({ length: 5 }).map((_, i) => {
        const width = Math.random() * 80 + 60;
        const top = Math.random() * 30; // Solo en el cielo superior
        const left = (Math.random() * 40) - 20; 
        const duration = Math.random() * 5 + 4;
        const delay = Math.random() * 10;
        return (
          <div key={i} style={{
            position: 'absolute',
            left: `${left}%`,
            top: `${top}%`,
            width: `${width}px`,
            height: '2px',
            background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,150,100,0.8) 20%, rgba(0,0,0,0) 100%)', // Tono cálido para Marte
            borderRadius: '50%',
            boxShadow: '0 0 10px rgba(255,200,150,0.8)',
            transform: 'rotate(5deg) scale(0)',
            opacity: 0,
            animation: `shootingStar ${duration}s ease-in infinite`,
            animationDelay: `${delay}s`,
          }} />
        );
      })}
    </div>
  );
}

function MartianDust() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {/* Bruma de polvo rojiza difuminada - capa 1 lenta */}
      <div style={{
        position: 'absolute', bottom: '10%', left: '-10%', width: '50%', height: '45%',
        background: 'radial-gradient(ellipse 80% 60% at 40% 80%, rgba(210,80,20,0.45) 0%, rgba(180,50,10,0.2) 50%, transparent 100%)',
        filter: 'blur(30px)',
        animation: 'dustHaze 22s ease-in-out infinite',
        animationDelay: '0s'
      }} />
      {/* Bruma de polvo rojiza difuminada - capa 2 más rápida */}
      <div style={{
        position: 'absolute', bottom: '5%', right: '-5%', width: '45%', height: '50%',
        background: 'radial-gradient(ellipse 70% 55% at 60% 90%, rgba(200,70,10,0.35) 0%, rgba(160,40,5,0.15) 55%, transparent 100%)',
        filter: 'blur(40px)',
        animation: 'dustHaze 16s ease-in-out infinite',
        animationDelay: '-8s'
      }} />
      {/* Velo de polvo tenue en el horizonte */}
      <div style={{
        position: 'absolute', bottom: '28%', left: '0', right: '0', height: '15%',
        background: 'linear-gradient(to top, rgba(220,90,30,0.18) 0%, transparent 100%)',
        filter: 'blur(20px)'
      }} />
    </div>
  );
}

export default function RobotsHub() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  
  // Como actualmente el curso "Robots en el Espacio" es uno solo en courseData (robots_espacio), 
  // pero el usuario pidio 8 imagenes de rovers interactivos,
  // Dividiremos el acceso directo en 8 modulos visuales que dirigen al mismo curso pero a secciones diferentes,
  // O los dejaremos como modulos futuros.
  // Para ser leales al prompt: "prepara otro curso Ahora llamadao 'Robots en el espacio' ... con su hub estelar"
  // Haremos 8 nodos que apuntan a `/course/robots_espacio` (el cual es 1 curso con 15 secciones),
  // o si el admin crea las rutas, apuntara a `/course/robots_x`.
  // Por ahora, todos enlazan al gran curso interactivo que construimos.

  const orbitalData = [
    { id: 'robots_historia', title: 'Historia', img: '/assets/rovers/ai_historia.png', left: '20%', top: '15%', size: 'clamp(80px, 10vw, 130px)' },
    { id: 'robots_sojourner', title: 'Sojourner', img: '/assets/rovers/ai_sojourner.png', left: '25%', top: '82%', size: 'clamp(50px, 7vw, 90px)' },
    { id: 'robots_spirit', title: 'Spirit', img: '/assets/rovers/ai_spirit.png', left: '42%', top: '70%', size: 'clamp(70px, 9vw, 110px)' },
    { id: 'robots_opportunity', title: 'Opportunity', img: '/assets/rovers/ai_opportunity.png', left: '55%', top: '85%', size: 'clamp(70px, 9vw, 110px)' }, 
    { id: 'robots_curiosity', title: 'Curiosity', img: '/assets/rovers/ai_curiosity.png', left: '72%', top: '65%', size: 'clamp(90px, 11vw, 140px)' },
    { id: 'robots_perseverance', title: 'Perseverance', img: '/assets/rovers/ai_curiosity.png', left: '88%', top: '78%', size: 'clamp(100px, 12vw, 150px)' },
    { id: 'robots_ingenuity', title: 'Ingenuity', img: '/assets/rovers/ai_ingenuity.png', left: '80%', top: '25%', size: 'clamp(60px, 8vw, 100px)' },
    { id: 'robots_futuras', title: 'Misiones Futuras', img: '/assets/rovers/ai_futuras.png', left: '50%', top: '10%', size: 'clamp(80px, 10vw, 130px)' }
  ];

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  if (loading || !userData) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a1a', color: 'white' }}>Aterrizando en Marte...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#0a0a1a' }}>
      <style>{globalStyles}</style>
      
      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 100 }}>
         <Link href="/dashboard/misiones" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'white', textDecoration: 'none', background: 'rgba(0,0,0,0.5)', padding: '0.8rem 1.2rem', borderRadius: '30px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <ChevronLeft size={24} /> Volver a Misiones
         </Link>
      </div>
      
      <main style={{ 
        flex: 1, position: 'relative', width: '100vw', height: '100vh', 
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', 
        background: 'url(/assets/robots/robots_hub_bg_v5.png) center center / cover' 
      }}>
        
        {/* Cielo místico estrellado */}
        <Stars />
        <Comets />

        {/* Viento y polvo marciano */}
        <MartianDust />

        {/* Overlay anaranjado marciano y viñeta inmersiva mágica */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, transparent 30%, rgba(10, 0, 0, 0.4) 100%), linear-gradient(to top, rgba(220, 50, 0, 0.3), transparent)', pointerEvents: 'none', zIndex: 0 }} />

        {/* Contenedor del Mapa */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '1600px', aspectRatio: '16/9', maxHeight: '90vh' }}>
           
           {orbitalData.map((node, idx) => (
              <IsolatedRoverNode 
                 key={node.id}
                 nodeInfo={node} 
                 idx={idx}
              />
           ))}

        </div>

      </main>
    </div>
  );
}

function IsolatedRoverNode({ nodeInfo, idx }) {
  const [hovered, setHovered] = useState(false);
  
  const targetLink = `/course/${nodeInfo.id}`;

  return (
    <Link href={targetLink} passHref>
      <div 
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ 
          position: 'absolute', 
          left: nodeInfo.left, 
          top: nodeInfo.top, 
          width: nodeInfo.size, 
          height: nodeInfo.size, 
          transform: 'translate(-50%, -50%)', 
          cursor: 'pointer',
          zIndex: hovered ? 50 : (10 + idx)
        }}
      >
        <motion.div 
           animate={{ 
             y: [0, -8, 0], // LevitaciÃ³n suave marciana
             scale: hovered ? 1.15 : 1
           }}
           transition={{ 
             y: { repeat: Infinity, duration: 3, ease: "easeInOut", delay: idx * 0.3 }, 
             scale: { duration: 0.2 } 
           }}
           style={{ 
             width: '100%', 
             height: '100%', 
             position: 'relative',
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center',
             justifyContent: 'center',
             gap: '0.5rem'
           }}
        >
          {/* Imagen Transparente del Rover Puro */}
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: `drop-shadow(0 20px 20px rgba(0,0,0,0.8))` // Sombra en el suelo marciano
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={nodeInfo.img} 
              alt={nodeInfo.title} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain',
                transition: 'all 0.5s ease'
              }} 
              onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Mars_2020_rover_transparent_background.png/1200px-Mars_2020_rover_transparent_background.png' }}
            />
          </div>

          <div style={{
             fontFamily: 'var(--font-quantico)',
             color: 'white',
             fontSize: 'clamp(0.7rem, 1vw, 1.2rem)',
             textShadow: '0 2px 10px rgba(0,0,0,0.9)',
             textTransform: 'uppercase',
             letterSpacing: '1px',
             position: 'absolute',
             bottom: '-30px',
             whiteSpace: 'nowrap',
             background: 'rgba(0,0,0,0.6)',
             padding: '0.2rem 0.8rem',
             borderRadius: '20px',
             border: '1px solid rgba(255, 99, 71, 0.5)'
          }}>
             {nodeInfo.title}
          </div>

        </motion.div>

        {/* Tooltip Hover (InformaciÃ³n) */}
        <AnimatePresence>
          {hovered && (
            <motion.div 
              initial={{ opacity: 0, y: 15, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              style={{
                position: 'absolute',
                top: '130%',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(4, 6, 14, 0.95)',
                backdropFilter: 'blur(10px)',
                border: `1px solid #FF6347`,
                padding: '0.8rem 1.2rem',
                borderRadius: '12px',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                boxShadow: `0 10px 30px rgba(255, 99, 71, 0.4)`,
                zIndex: 100
              }}
            >
               <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 Rover {nodeInfo.title}
               </h4>
               <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.85rem', color: '#FF6347' }}>
                 MisiÃ³n Activa en Marte ðŸš€
               </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Link>
  );
}
