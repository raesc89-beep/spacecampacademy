'use client';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BookOpen, AlertCircle, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CourseModule() {
  const { user, userData, loading } = useAuth();
  const params = useParams();
  const router = useRouter();
  
  const [moduleData, setModuleData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchModule() {
      try {
        const d = await getDoc(doc(db, "modules", params.moduleId));
        if (d.exists()) setModuleData(d.data());
        else router.push('/dashboard');
      } catch (err) {
        console.error(err);
      }
      setDataLoading(false);
    }
    if (params.moduleId) fetchModule();
  }, [params.moduleId]);

  if (loading || dataLoading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Viajando al planeta...</div>;
  }

  if (!moduleData) return null;

  const isCompleted = userData?.progress?.completedModules?.includes(moduleData.id);
  const planetImageName = `planet_${moduleData.titleEn.toLowerCase()}.png`;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Dynamic Rotating Planet Background */}
      <div style={{ position: 'fixed', top: '-20%', right: '-20%', width: '150vw', height: '150vw', zIndex: -1, pointerEvents: 'none', filter: 'blur(3px)' }}>
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 300, ease: "linear" }}
          style={{ width: '100%', height: '100%', background: `url(/assets/${planetImageName}) center center / contain no-repeat`, opacity: 0.15 }}
        />
      </div>

      <Navbar />
      
      <main className="layout-container" style={{ flex: 1, padding: '3rem 2rem', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '3rem', alignItems: 'start' }}>
        
        {/* Main Content Area */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h1 style={{ color: moduleData.color, display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              {moduleData.titleEs} 
              <span style={{ fontSize: '1.5rem', opacity: 0.5, fontWeight: 'normal' }}>| {moduleData.titleEn}</span>
              {isCompleted && <CheckCircle color="var(--success)" size={32} />}
            </h1>
          </div>

          <div className="glass-card" style={{ borderLeft: `4px solid ${moduleData.color}` }}>
             <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
               <BookOpen size={24} color={moduleData.color} />
               Visión General | Overview
             </h3>
             <p style={{ marginBottom: '1rem' }}><b>Español:</b> {moduleData.contentEs.intro}</p>
             <p style={{ color: 'var(--text-muted)' }}><b>English:</b> {moduleData.contentEn.intro}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div className="glass-card">
              <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Datos Curiosos</h3>
              <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {moduleData.contentEs.facts.map((fact, i) => (
                  <li key={i}>{fact}</li>
                ))}
              </ul>
            </div>
            <div className="glass-card">
              <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Cool Facts</h3>
              <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--text-muted)' }}>
                {moduleData.contentEn.facts.map((fact, i) => (
                  <li key={i}>{fact}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="glass-card" style={{ background: 'rgba(255, 215, 0, 0.05)', borderColor: 'rgba(255, 215, 0, 0.2)' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--gold-star)' }}>
              <AlertCircle size={24} />
              ¿Sabías qué? | Did you know?
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {moduleData.contentEs.rareFacts.map((factEs, i) => (
                <div key={i} style={{ paddingBottom: i !== moduleData.contentEs.rareFacts.length - 1 ? '1rem' : 0, borderBottom: i !== moduleData.contentEs.rareFacts.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                  <p>🚀 {factEs}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.4rem' }}>🛸 <i>{moduleData.contentEn.rareFacts[i]}</i></p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sidebar / Quiz Section */}
        <aside style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem', background: `linear-gradient(135deg, rgba(255,255,255,0.05), ${moduleData.color}20)`, backdropFilter: 'blur(20px)' }}>
            <div style={{ width: '180px', height: '180px', borderRadius: '50%', boxShadow: `0 0 40px ${moduleData.color}60`, overflow: 'hidden', border: `4px solid ${moduleData.color}`, background: 'black' }}>
               <img src={`/assets/${planetImageName}`} alt={moduleData.titleEs} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => {e.target.style.display='none'}} />
            </div>
            
            <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Misión {moduleData.titleEs}</h2>
            
            {!isCompleted ? (
              <p style={{ margin: 0, fontSize: '0.9rem' }}>Lee toda la información y luego pon a prueba tus conocimientos para ganar la medalla.</p>
            ) : (
              <div style={{ padding: '0.5rem 1rem', background: 'rgba(0, 255, 136, 0.2)', color: 'var(--success)', borderRadius: '20px', fontWeight: 'bold' }}>
                ¡Misión Completada!
              </div>
            )}

            <Link href={`/quiz/${moduleData.id}`} className="btn-primary" style={{ width: '100%', marginTop: '1rem', background: moduleData.color }}>
              {isCompleted ? 'Repasar Misión' : 'Ir a la Prueba'} <ArrowRight size={20} />
            </Link>
          </div>

          <Link href="/dashboard" className="btn-secondary" style={{ textAlign: 'center' }}>
            Volver al Mapa Estelar
          </Link>
        </aside>

      </main>
    </div>
  );
}
