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
    { id: 'robots_historia', title: 'Historia', img: '/assets/rovers/curiosity.svg', left: '12%', top: '15%', size: 'clamp(60px, 8vw, 110px)' },
    { id: 'robots_sojourner', title: 'Sojourner', img: '/assets/rovers/ai_sojourner.png', left: '25%', top: '82%', size: 'clamp(50px, 7vw, 90px)' },
    { id: 'robots_spirit', title: 'Spirit', img: '/assets/rovers/ai_spirit.png', left: '42%', top: '70%', size: 'clamp(70px, 9vw, 110px)' },
    { id: 'robots_opportunity', title: 'Opportunity', img: '/assets/rovers/ai_spirit.png', left: '55%', top: '85%', size: 'clamp(70px, 9vw, 110px)' }, // Opportunity es gemelo de Spirit
    { id: 'robots_curiosity', title: 'Curiosity', img: '/assets/rovers/ai_curiosity.png', left: '72%', top: '65%', size: 'clamp(90px, 11vw, 140px)' },
    { id: 'robots_perseverance', title: 'Perseverance', img: '/assets/rovers/ai_curiosity.png', left: '88%', top: '78%', size: 'clamp(100px, 12vw, 150px)' }, // Perseverance se parece a Curiosity
    { id: 'robots_ingenuity', title: 'Ingenuity', img: '/assets/rovers/ai_ingenuity.png', left: '75%', top: '25%', size: 'clamp(60px, 8vw, 100px)' },
    { id: 'robots_futuras', title: 'Misiones Futuras', img: '/assets/rovers/perseverance.svg', left: '88%', top: '15%', size: 'clamp(70px, 9vw, 120px)' }
  ];

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  if (loading || !userData) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a1a', color: 'white' }}>Aterrizando en Marte...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#0a0a1a' }}>
      
      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 100 }}>
         <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'white', textDecoration: 'none', background: 'rgba(0,0,0,0.5)', padding: '0.8rem 1.2rem', borderRadius: '30px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <ChevronLeft size={24} /> Volver al Centro de Mando
         </Link>
      </div>
      
      <main style={{ 
        flex: 1, position: 'relative', width: '100vw', height: '100vh', 
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', 
        background: 'url(/assets/robots/robots_hub_bg.png) center center / cover' 
      }}>
        
        {/* Overlay anaranjado marciano */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, rgba(200, 60, 0, 0.4), transparent)', pointerEvents: 'none' }} />

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
