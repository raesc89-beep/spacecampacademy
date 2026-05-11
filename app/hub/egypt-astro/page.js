'use client';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Módulos del curso ─────────────────────────────────────────────────────
const EGYPT_MODULES = [
  { id: 'egypt_m1', titleEs: 'Nabta Playa',       color: '#D4A843', link: '/course/egypt_m1', icon: '/assets/egypt/m1_nabta_playa.png',  coords: { left: '20%', top: '35%',  size: 'clamp(100px,12vw,180px)' } },
  { id: 'egypt_m2', titleEs: 'Los Decanos',        color: '#6A9FD4', link: '/course/egypt_m2', icon: '/assets/egypt/m2_decanos.png',       coords: { left: '60%', top: '18%',  size: 'clamp(90px,11vw,165px)'  } },
  { id: 'egypt_m3', titleEs: 'Sopdet y Sirio',     color: '#C0E8FF', link: '/course/egypt_m3', icon: '/assets/egypt/m3_sopdet.png',        coords: { left: '82%', top: '42%',  size: 'clamp(85px,10vw,155px)'  } },
  { id: 'egypt_m4', titleEs: 'Mesjetiu',           color: '#F5C842', link: '/course/egypt_m4', icon: '/assets/egypt/m4_mesjetiu.png',      coords: { left: '38%', top: '62%',  size: 'clamp(80px,10vw,148px)'  } },
  { id: 'egypt_m5', titleEs: 'El Láser de Giza',   color: '#F0A500', link: '/course/egypt_m5', icon: '/assets/egypt/m5_giza.png',          coords: { left: '72%', top: '70%',  size: 'clamp(110px,13vw,195px)' } },
  { id: 'egypt_m6', titleEs: 'Mapa del Universo',  color: '#9B6BFF', link: '/course/egypt_m6', icon: '/assets/egypt/m6_senenmut.png',      coords: { left: '10%', top: '72%',  size: 'clamp(80px,10vw,148px)'  } },
  { id: 'egypt_m7', titleEs: 'Telescopios Piedra', color: '#5EC4A0', link: '/course/egypt_m7', icon: '/assets/egypt/m7_star_shafts.png',   coords: { left: '50%', top: '85%',  size: 'clamp(75px,9vw,136px)'   } },
  { id: 'egypt_m8', titleEs: 'Abu Simbel',         color: '#FF9A3C', link: '/course/egypt_m8', icon: '/assets/egypt/m8_abu_simbel.png',    coords: { left: '88%', top: '22%',  size: 'clamp(70px,9vw,130px)'   } },
  { id: 'egypt_m9', titleEs: 'Zodiaco Dendera',    color: '#D46A6A', link: '/course/egypt_m9', icon: '/assets/egypt/m9_dendera.png',       coords: { left: '28%', top: '20%',  size: 'clamp(80px,10vw,148px)'  } },
  { id: 'egypt_m10', titleEs: 'Daga Espacial',     color: '#B0C4DE', link: '/course/egypt_m10', icon: '/assets/egypt/m10_daga.png',        coords: { left: '55%', top: '45%',  size: 'clamp(85px,10vw,155px)'  } },
  { id: 'egypt_m11', titleEs: 'Nilo de Nut',       color: '#9DD4F0', link: '/course/egypt_m11', icon: '/assets/egypt/m11_via_lactea.png',  coords: { left: '15%', top: '52%',  size: 'clamp(75px,9vw,136px)'   } },
  { id: 'egypt_m12', titleEs: 'Obeliscos',         color: '#E8C96A', link: '/course/egypt_m12', icon: '/assets/egypt/m12_obelisco.png',    coords: { left: '75%', top: '55%',  size: 'clamp(70px,8vw,125px)'   } },
  { id: 'egypt_m13', titleEs: '365 Días',          color: '#80D080', link: '/course/egypt_m13', icon: '/assets/egypt/m13_calendario.png',  coords: { left: '42%', top: '30%',  size: 'clamp(80px,10vw,148px)'  } },
  { id: 'egypt_m14', titleEs: 'Apofis',            color: '#FF5252', link: '/course/egypt_m14', icon: '/assets/egypt/m14_apofis.png',      coords: { left: '88%', top: '78%',  size: 'clamp(85px,10vw,155px)'  } },
  { id: 'egypt_m15', titleEs: 'Ojo Satelital',     color: '#64B5F6', link: '/course/egypt_m15', icon: '/assets/egypt/m15_satelite.png',    coords: { left: '30%', top: '80%',  size: 'clamp(75px,9vw,136px)'   } },
];

// ─── Estrellas de fondo generadas ─────────────────────────────────────────
function Stars() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {Array.from({ length: 80 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 2 + 1}px`,
          height: `${Math.random() * 2 + 1}px`,
          borderRadius: '50%',
          background: 'white',
          opacity: Math.random() * 0.7 + 0.3,
          animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 3}s`,
        }} />
      ))}
    </div>
  );
}

// ─── Nodo de módulo individual ─────────────────────────────────────────────
function EgyptModuleNode({ mod, idx, isCompleted, isPlayable }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={mod.link} passHref>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'absolute',
          left: mod.coords.left,
          top: mod.coords.top,
          width: mod.coords.size,
          height: mod.coords.size,
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          zIndex: hovered ? 50 : (10 + idx),
        }}
      >
        <motion.div
          animate={{ y: [0, -8, 0], scale: hovered ? 1.15 : 1 }}
          transition={{
            y: { repeat: Infinity, duration: 3.5 + idx * 0.3, ease: 'easeInOut', delay: idx * 0.4 },
            scale: { duration: 0.2 },
          }}
          style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
        >
          {/* Halo dorado al hacer hover */}
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                position: 'absolute', inset: '-8px',
                borderRadius: '50%',
                border: `2px solid ${mod.color}`,
                boxShadow: `0 0 20px ${mod.color}88, 0 0 40px ${mod.color}44`,
              }}
            />
          )}

          {/* Imagen del módulo */}
          <img
            src={mod.icon}
            alt={mod.titleEs}
            style={{
              width: '80%',
              height: '80%',
              objectFit: 'contain',
              filter: `drop-shadow(0 0 12px ${mod.color}88)`,
              transition: 'filter 0.3s ease',
            }}
          />

          {/* Nombre */}
          <div style={{
            color: 'white',
            fontSize: 'clamp(0.55rem, 0.9vw, 0.85rem)',
            textAlign: 'center',
            textShadow: '0 2px 8px rgba(0,0,0,0.9)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: 600,
            lineHeight: 1.2,
            maxWidth: '110%',
          }}>
            {mod.titleEs}
          </div>

          {/* Indicadores */}
          {isCompleted && (
            <div style={{ position: 'absolute', bottom: '-8px', right: '-8px', background: 'rgba(0,0,0,0.85)', padding: '0.2rem', borderRadius: '50%', border: '1px solid var(--success)' }}>
              <CheckCircle size={18} color="var(--success)" />
            </div>
          )}
          {isPlayable && !isCompleted && (
            <div style={{ position: 'absolute', top: '-14px', right: '-14px', fontSize: '1.2rem', animation: 'pulse 2s infinite' }}>✨</div>
          )}
        </motion.div>

        {/* Tooltip */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8 }}
              style={{
                position: 'absolute',
                top: '115%',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(8, 4, 18, 0.95)',
                backdropFilter: 'blur(12px)',
                border: `1px solid ${mod.color}`,
                padding: '0.7rem 1.1rem',
                borderRadius: '12px',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                boxShadow: `0 8px 28px ${mod.color}44`,
                zIndex: 100,
              }}
            >
              <h4 style={{ margin: 0, fontSize: '1rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                🏛️ {mod.titleEs}
              </h4>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: isCompleted ? 'var(--success)' : mod.color }}>
                {isCompleted ? '✅ Misión Completada' : '🚀 Explorar Módulo'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Link>
  );
}

// ─── Componente principal ──────────────────────────────────────────────────
export default function EgyptAstroHub() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  if (loading || !userData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#04060E', color: '#D4A843', fontFamily: 'sans-serif' }}>
        Iniciando Observatorio de Kemet...
      </div>
    );
  }

  const completedIds = userData?.progress?.completedModules || [];
  const moduleIds = EGYPT_MODULES.map(m => m.id);
  let maxCompletedIdx = -1;
  moduleIds.forEach((id, idx) => {
    if (completedIds.some(c => c.toLowerCase() === id.toLowerCase())) maxCompletedIdx = idx;
  });
  const currentPlayableIdx = maxCompletedIdx + 1;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#04060E' }}>

      {/* ── Botón volver ── */}
      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 200 }}>
        <Link href="/dashboard" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#D4A843',
          textDecoration: 'none', background: 'rgba(0,0,0,0.6)', padding: '0.7rem 1.2rem',
          borderRadius: '30px', backdropFilter: 'blur(10px)', border: '1px solid rgba(212,168,67,0.4)',
          fontSize: '0.9rem', fontWeight: 600,
        }}>
          <ChevronLeft size={20} /> Catálogo de Misiones
        </Link>
      </div>

      {/* ── Título ── */}
      <div style={{ position: 'absolute', top: '1.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 200, textAlign: 'center' }}>
        <h1 style={{
          margin: 0, fontSize: 'clamp(1rem, 2.5vw, 2rem)',
          background: 'linear-gradient(90deg, #D4A843, #F5E6B0, #D4A843)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          textShadow: 'none', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700,
        }}>
          🏛️ Arqueoastronomía Egipcia
        </h1>
        <p style={{ margin: '0.2rem 0 0', color: 'rgba(212,168,67,0.7)', fontSize: 'clamp(0.6rem,1.2vw,0.9rem)', letterSpacing: '2px' }}>
          El Cielo de los Faraones · 15 Misterios Cósmicos
        </p>
      </div>

      {/* ── Canvas principal ── */}
      <main style={{
        flex: 1, position: 'relative', width: '100vw', height: '100vh',
        background: `
          radial-gradient(ellipse at 30% 20%, rgba(212,168,67,0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 70% 80%, rgba(106,159,212,0.06) 0%, transparent 50%),
          url('https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?q=80&w=2560&auto=format&fit=crop') center/cover
        `,
      }}>
        {/* Overlay oscuro con textura egipcia */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(4,6,14,0.75) 0%, rgba(10,6,2,0.65) 60%, rgba(4,6,14,0.85) 100%)',
        }} />

        {/* Estrellas animadas */}
        <Stars />

        {/* Líneas de constelación decorativas */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.15 }}>
          <line x1="20%" y1="35%" x2="38%" y2="62%" stroke="#D4A843" strokeWidth="0.5" strokeDasharray="4 6" />
          <line x1="38%" y1="62%" x2="55%" y2="45%" stroke="#D4A843" strokeWidth="0.5" strokeDasharray="4 6" />
          <line x1="55%" y1="45%" x2="60%" y2="18%" stroke="#D4A843" strokeWidth="0.5" strokeDasharray="4 6" />
          <line x1="60%" y1="18%" x2="28%" y2="20%" stroke="#D4A843" strokeWidth="0.5" strokeDasharray="4 6" />
          <line x1="28%" y1="20%" x2="42%" y2="30%" stroke="#D4A843" strokeWidth="0.5" strokeDasharray="4 6" />
          <line x1="72%" y1="70%" x2="82%" y2="42%" stroke="#6A9FD4" strokeWidth="0.5" strokeDasharray="4 6" />
          <line x1="82%" y1="42%" x2="88%" y2="22%" stroke="#6A9FD4" strokeWidth="0.5" strokeDasharray="4 6" />
        </svg>

        {/* Personaje flotante (Astrónomo egipcio) */}
        <motion.img
          src="/assets/egypt/hub_character.png"
          alt="Astrónomo Egipcio"
          animate={{ y: [0, -14, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          style={{
            position: 'absolute', right: '2%', bottom: '5%',
            height: 'clamp(160px, 22vh, 320px)',
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 20px rgba(212,168,67,0.5))',
            zIndex: 5, pointerEvents: 'none',
          }}
        />

        {/* Contenedor 16:9 del mapa */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '1600px', aspectRatio: '16/9', maxHeight: '90vh', margin: '0 auto' }}>
          {EGYPT_MODULES.map((mod, idx) => (
            <EgyptModuleNode
              key={mod.id}
              mod={mod}
              idx={idx}
              isCompleted={idx <= maxCompletedIdx}
              isPlayable={idx === currentPlayableIdx}
            />
          ))}
        </div>
      </main>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}
