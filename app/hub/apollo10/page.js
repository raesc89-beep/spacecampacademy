'use client';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const APOLLO10_MODULES = [
  {
    id: 'apollo10_m1', titleEs: 'El Ensayo General', link: '/course/apollo10_m1',
    color: '#32CD32', coords: { left: '50%', top: '50%' },
    icon: '/assets/badges/snoopy_badge.png',
  }
];

function Apollo10Node({ mod, isCompleted }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={mod.link} passHref>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'absolute', left: mod.coords.left, top: mod.coords.top,
          transform: 'translate(-50%, -50%)', cursor: 'pointer', zIndex: 10
        }}
      >
        <motion.div
          animate={{ y: hovered ? -10 : 0, scale: hovered ? 1.1 : 1 }}
          style={{
            width: '90px', height: '90px', borderRadius: '50%',
            background: isCompleted ? 'rgba(50, 205, 50, 0.4)' : 'rgba(0,0,0,0.6)',
            border: `3px solid ${isCompleted ? '#00FFCC' : mod.color}`,
            boxShadow: `0 0 20px ${mod.color}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(5px)', position: 'relative'
          }}
        >
          {isCompleted && (
            <div style={{ position: 'absolute', top: -5, right: -5, background: '#00FFCC', borderRadius: '50%', padding: '2px' }}>
              <CheckCircle size={20} color="#000" />
            </div>
          )}
          <div style={{ width: '50px', height: '50px', background: `url(${mod.icon}) center/contain no-repeat` }} />
        </motion.div>
        <div style={{
          position: 'absolute', top: '100px', left: '50%', transform: 'translateX(-50%)',
          width: 'max-content', textAlign: 'center', background: 'rgba(0,0,0,0.7)', padding: '5px 10px',
          borderRadius: '5px', border: `1px solid ${mod.color}`, color: '#fff', fontSize: '0.85rem'
        }}>
          {mod.titleEs}
        </div>
      </div>
    </Link>
  );
}

export default function Apollo10Hub() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  if (loading || !user) return <div style={{ height: '100vh', background: '#000' }} />;

  const completedModules = userData?.completedModules || [];
  const completedCount = APOLLO10_MODULES.filter(m => completedModules.includes(m.id)).length;
  const progressPercent = Math.round((completedCount / APOLLO10_MODULES.length) * 100);

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      
      {/* Dynamic Background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `url('/assets/apollo11/vab_cape_canaveral_empty.png') center/cover no-repeat`,
        opacity: 0.6, zIndex: 0, filter: 'sepia(100%) hue-rotate(90deg)' // To differentiate from Apollo 11
      }} />

      {/* Navegación y UI Header */}
      <div style={{ position: 'relative', zIndex: 20, padding: '2rem' }}>
        <button
          onClick={() => router.push('/dashboard/misiones')}
          style={{
            background: 'rgba(0,0,0,0.5)', border: '1px solid #32CD32', color: '#fff', padding: '10px 20px',
            borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px'
          }}
        >
          <ChevronLeft size={20} /> Volver a Misiones
        </button>

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ fontSize: '3rem', margin: 0, color: '#32CD32', textShadow: '0 0 10px #32CD32' }}>
              Misión Apollo 10
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#ccc', marginTop: '10px' }}>
              El ensayo general que allanó el camino hacia la superficie lunar.
            </p>
          </div>
          
          <div style={{
            background: 'rgba(0,0,0,0.7)', border: '1px solid #32CD32', borderRadius: '10px', padding: '1.5rem',
            width: '300px', backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#fff', fontSize: '1rem' }}>Progreso de la Misión</h3>
            <div style={{ background: 'rgba(255,255,255,0.1)', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
              <motion.div 
                initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }}
                style={{ height: '100%', background: '#32CD32', boxShadow: '0 0 10px #32CD32' }}
              />
            </div>
            <p style={{ margin: '10px 0 0 0', textAlign: 'right', fontSize: '0.9rem', color: '#32CD32' }}>
              {completedCount} / {APOLLO10_MODULES.length} Completados
            </p>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', inset: '150px 0 0 0', zIndex: 10 }}>
        {APOLLO10_MODULES.map((mod) => (
          <Apollo10Node key={mod.id} mod={mod} isCompleted={completedModules.includes(mod.id)} />
        ))}
      </div>
    </div>
  );
}
