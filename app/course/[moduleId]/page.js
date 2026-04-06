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
import SatisfactionScale from '@/components/SatisfactionScale';
import MemoryGame from '@/components/games/MemoryGame';

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
  const planetImageName = `cartoon_${moduleData.titleEn.toLowerCase()}.png`;

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
        
        <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h1 style={{ color: moduleData.color, display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              {moduleData.titleEs} 
              {isCompleted && <CheckCircle color="var(--success)" size={32} />}
            </h1>
          </div>

          {moduleData.contentEs.sections ? (
            // NUEVO FORMATO 2.0 (Científico NASA)
            moduleData.contentEs.sections.map((section, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '0', overflow: 'hidden', borderLeft: `4px solid ${section.style === 'highlight' ? 'var(--gold-star)' : moduleData.color}` }}>
                {section.image && (
                  <div style={{ width: '100%', height: '300px', background: '#000', position: 'relative' }}>
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img src={section.image} alt={section.title} style={{ width: '100%', height: '100%', objectFit: section.image.includes('cartoon_') ? 'contain' : 'cover' }} />
                     {section.imgCaption && (
                       <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.7)', padding: '0.8rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>
                         📸 {section.imgCaption}
                       </div>
                     )}
                  </div>
                )}
                <div style={{ padding: '2rem' }}>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.2rem', fontSize: '1.4rem', color: section.style === 'highlight' ? 'var(--gold-star)' : 'inherit' }}>
                    <BookOpen size={24} color={section.style === 'highlight' ? 'var(--gold-star)' : moduleData.color} />
                    {section.title}
                  </h3>
                  <p style={{ lineHeight: '1.8', fontSize: '1.05rem', color: 'rgba(255,255,255,0.9)' }}>
                    {section.text}
                  </p>
                </div>
              </div>
            ))
          ) : (
            // FORMATO VIEJO 1.0 (Compatibilidad Inversa)
            <div className="glass-card" style={{ borderLeft: `4px solid ${moduleData.color}` }}>
               <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                 <BookOpen size={24} color={moduleData.color} />
                 Visión General
               </h3>
               <p style={{ marginBottom: '1rem' }}>{moduleData.contentEs.intro}</p>
               <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Datos Curiosos</h3>
               <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {moduleData.contentEs.facts.map((fact, i) => <li key={i}>{fact}</li>)}
               </ul>
            </div>
          )}

          {/* Sección de Bibliografía Oficial */}
          {moduleData.contentEs.bibliography && (
            <div style={{ marginTop: '1rem', padding: '1.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', borderLeft: '3px solid var(--text-muted)' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Fuentes de Investigación Oficial</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', listStyleType: 'circle', paddingLeft: '1.2rem' }}>
                {moduleData.contentEs.bibliography.map((bib, i) => (
                  <li key={i}>{bib}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Componente de Gamificación (Aparece tras concluir curso) */}
          {isCompleted && (
            <div style={{ marginTop: '3rem' }}>
              <MemoryGame 
                onComplete={(bonus) => {
                  alert(`¡Memoria perfecta! Has recolectado ${bonus} estrellas extra. (Sistema en construcción)`);
                }} 
              />
            </div>
          )}

          {/* Encuesta de Satisfacción */}
          <div style={{ marginTop: '2rem' }}>
            <SatisfactionScale moduleId={moduleData.id} userId={user?.uid} />
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
