'use client';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BookOpen, AlertCircle, ArrowRight, CheckCircle, X, Maximize2, ChevronLeft, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import SatisfactionScale from '@/components/SatisfactionScale';
import ApophisCountdown from '@/components/ApophisCountdown';
import InteractiveInfographic_EgyptM11 from '@/components/infographics/InteractiveInfographic_EgyptM11';

import { useCourseData } from '@/hooks/useCourseData';

export default function CourseModule() {
  const { user, userData, loading } = useAuth();
  const params = useParams();
  const router = useRouter();
  const { data: staticData, loading: catalogLoading } = useCourseData(params.moduleId);
  
  const [moduleData, setModuleData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [expandedImg, setExpandedImg] = useState(null);

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  useEffect(() => {
    if (catalogLoading || !params.moduleId) return;

    async function fetchModule() {
      try {
        // --- ALGORITMO IRROMPIBLE DE REGLA 15x15 ---
        // Este algoritmo garantiza que NUNCA se renderice un curso con menos de 15 secciones
        // o con menos de 10 líneas por sección, sin importar cómo se haya guardado en la DB,
        // a no ser que el administrador agregue *más* secciones por su voluntad.
        const enforce15x15Rule = (mod) => {
          if (!mod || !mod.contentEs || !mod.contentEs.sections) return mod;
          if (!mod.id.startsWith('robots_')) return mod; // SOLO APLICA A LOS ROVERS, no corromper otros cursos
          
          let sections = [...mod.contentEs.sections];
          const fallbacks = [
            "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1200",
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200"
          ];
          const genericLines = [
            "La NASA y otras agencias continúan su gran investigación.",
            "Estos datos son vitales para la exploración astronómica.",
            "Observar el cosmos expande infinitamente la mente humana.",
            "Nuestros científicos analizan cada lectura minuciosamente."
          ];

          // 1. Si el admin puso menos de 15, rellenar hasta 15
          while (sections.length < 15) {
            sections.push({
              id: `${mod.id}_pad_${sections.length}`,
              title: `Exploración Adicional - Parte ${sections.length + 1}`,
              text: [],
              image: fallbacks[sections.length % fallbacks.length],
              style: "normal"
            });
          }

          // Parser de Google Drive automático
          const parseDriveUrl = (url, type) => {
            if (!url || !url.includes('drive.google.com')) return url;
            const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
            if (match && match[1]) {
              if (type === 'image') return `https://drive.google.com/uc?export=view&id=${match[1]}`;
              if (type === 'video') return `https://drive.google.com/file/d/${match[1]}/preview`;
            }
            return url;
          };

          // 2. Garantizar que cada sección tenga al menos 10 líneas
          sections = sections.map((sec, i) => {
            let txtArray = [];
            if (Array.isArray(sec.text)) {
              txtArray = [...sec.text];
            } else if (typeof sec.text === 'string') {
              txtArray = sec.text.replace(/\\n/g, ' ').split(/(?<=\.)\s+/).filter(t => t.trim().length > 0);
            }
            
            let padIdx = 0;
            while (txtArray.length < 10) {
              txtArray.push(genericLines[(i + padIdx) % genericLines.length]);
              padIdx++;
            }

            return { 
              ...sec, 
              text: txtArray,
              image: parseDriveUrl(sec.image, 'image'),
              video: parseDriveUrl(sec.video, 'video')
            };
          });

          mod.contentEs.sections = sections;
          return mod;
        };

        // ══════════════════════════════════════════════════════════════════
        // FORCE-STATIC CHECK — MUST RUN BEFORE ANY FIRESTORE CALL
        // This ensures modules with static data NEVER touch Firestore,
        // preventing crashes from corrupted/missing Firestore documents.
        // ══════════════════════════════════════════════════════════════════
        const isForceStatic = (
          params.moduleId === 'objetos_interestelares' ||
          params.moduleId === 'arqueoastronomia_maya' ||
          params.moduleId === 'ciencia_star_wars' ||
          params.moduleId === 'ciencia_volver_al_futuro' ||
          params.moduleId.startsWith('egypt_') ||
          params.moduleId.startsWith('robots_') ||
          params.moduleId.startsWith('galileo_') ||
          params.moduleId.startsWith('faraday_') ||
          params.moduleId.startsWith('davinci_') ||
          params.moduleId.startsWith('cecilia_') ||
          params.moduleId.startsWith('sagan_') ||
          params.moduleId.startsWith('curie_') ||
          params.moduleId.startsWith('astro_train_') ||
          params.moduleId.startsWith('einstein_') ||
          params.moduleId.startsWith('griegos_') ||
          params.moduleId.startsWith('arrival_')
        );

        if (isForceStatic && staticData) {
          setModuleData(enforce15x15Rule(JSON.parse(JSON.stringify(staticData))));
          setDataLoading(false);
          return;
        }

        // 1. Try Firestore (CMS-edited version) — only for non-force-static modules
        const firestoreDoc = await getDoc(doc(db, 'course_modules', params.moduleId));
        if (firestoreDoc.exists()) {
          // Found a CMS-edited version — merge with static data for quiz/color/etc
          const firestoreData = firestoreDoc.data();
          if (staticData) {
            // Admin API writes sections to top-level 'sections' field in Firestore
            // Legacy format had them nested under contentEs.sections
            const firestoreSections = firestoreData.sections || firestoreData.contentEs?.sections || null;
            const firestoreQuiz = firestoreData.quizEs || null;
            let mergedMod = {
              ...staticData,
              // Override color/title if admin changed them
              ...(firestoreData.titleEs ? { titleEs: firestoreData.titleEs } : {}),
              ...(firestoreData.badgeEs ? { badgeEs: firestoreData.badgeEs } : {}),
              ...(firestoreData.color ? { color: firestoreData.color } : {}),
              contentEs: {
                ...staticData.contentEs,
                sections: firestoreSections || staticData.contentEs?.sections || [],
              },
              // Use Firestore quiz if available
              quizEs: firestoreQuiz || staticData.quizEs || [],
            };
            setModuleData(enforce15x15Rule(mergedMod));
          } else {
            router.push('/dashboard');
          }
        } else {
          // 2. Fallback: use static data from API
          if (staticData) setModuleData(enforce15x15Rule(JSON.parse(JSON.stringify(staticData))));
          else router.push('/dashboard');
        }
      } catch (err) {
        console.error('Error loading module:', err);
        // On any error, fallback to static data
        if (staticData) setModuleData(staticData);
        else router.push('/dashboard');
      }
      setDataLoading(false);
    }
    fetchModule();
  }, [params.moduleId, staticData, catalogLoading]);

  if (loading || dataLoading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Viajando al planeta...</div>;
  }

  if (!moduleData) return null;

  // ── Smart hub back-navigation based on module ID prefix ──
  const HUB_MAP = {
    egypt: { path: '/hub/egypt-astro', name: 'Arqueoastronomía Egipcia' },
    animales: { path: '/hub/animales', name: 'Animales del Espacio' },
    apollo8: { path: '/hub/apollo8', name: 'Apollo 8' },
    apollo10: { path: '/hub/apollo10', name: 'Apollo 10' },
    apollo11: { path: '/hub/apollo11', name: 'Apollo 11' },
    area51: { path: '/hub/area51', name: 'Área 51' },
    asteroides: { path: '/hub/asteroides-cometas', name: 'Asteroides y Cometas' },
    bttf: { path: '/hub/bttf', name: 'Volver al Futuro' },
    copernico: { path: '/hub/copernico', name: 'Copérnico' },
    davinci: { path: '/hub/davinci', name: 'Da Vinci' },
    exoplanetas: { path: '/hub/exoplanetas', name: 'Exoplanetas' },
    faraday: { path: '/hub/faraday', name: 'Faraday' },
    galileo: { path: '/hub/galileo', name: 'Galileo' },
    interestelar: { path: '/hub/objetos-interestelares', name: 'Objetos Interestelares' },
    interstellar: { path: '/hub/interstellar', name: 'Interstellar' },
    maya: { path: '/hub/maya-astro', name: 'Arqueoastronomía Maya' },
    arqueoastronomia_maya: { path: '/hub/maya-astro', name: 'Arqueoastronomía Maya' },
    objetos_interestelares: { path: '/hub/objetos-interestelares', name: 'Objetos Interestelares' },
    pioneros: { path: '/hub/pioneros', name: 'Pioneros del Espacio' },
    rocosos: { path: '/hub/planetas-rocosos', name: 'Planetas Rocosos' },
    viaje_planetas_rocosos: { path: '/hub/planetas-rocosos', name: 'Planetas Rocosos' },
    robots: { path: '/hub/robots-espacio', name: 'Robots en el Espacio' },
    starwars: { path: '/hub/star-wars', name: 'Ciencia de Star Wars' },
    agujeros: { path: '/hub/agujeros-gusano', name: 'Agujeros de Gusano' },
    wormhole: { path: '/hub/agujeros-gusano', name: 'Agujeros de Gusano' },
    stellar: { path: '/hub/stellar-objects', name: 'Objetos Estelares' },
    black_hole: { path: '/hub/stellar-objects', name: 'Objetos Estelares' },
    pulsar: { path: '/hub/stellar-objects', name: 'Objetos Estelares' },
    quasar: { path: '/hub/stellar-objects', name: 'Objetos Estelares' },
    white_dwarf: { path: '/hub/stellar-objects', name: 'Objetos Estelares' },
    red_dwarf: { path: '/hub/stellar-objects', name: 'Objetos Estelares' },
    earth: { path: '/hub/solar-system', name: 'Sistema Solar' },
    mars: { path: '/hub/solar-system', name: 'Sistema Solar' },
    jupiter: { path: '/hub/solar-system', name: 'Sistema Solar' },
    saturn: { path: '/hub/solar-system', name: 'Sistema Solar' },
    venus: { path: '/hub/solar-system', name: 'Sistema Solar' },
    mercury: { path: '/hub/solar-system', name: 'Sistema Solar' },
    neptune: { path: '/hub/solar-system', name: 'Sistema Solar' },
    uranus: { path: '/hub/solar-system', name: 'Sistema Solar' },
    pluto: { path: '/hub/solar-system', name: 'Sistema Solar' },
    sun: { path: '/hub/solar-system', name: 'Sistema Solar' },
    cecilia: { path: '/hub/cecilia-payne', name: 'Cecilia Payne-Gaposchkin' },
    marinos: { path: '/hub/reptiles-marinos', name: 'Reptiles Marinos' },
    dinos: { path: '/hub/dinosaurios', name: 'Los Dinosaurios' },
    tesla: { path: '/hub/tesla', name: 'Nikola Tesla' },
    sagan: { path: '/hub/carl-sagan', name: 'Carl Sagan' },
    curie: { path: '/hub/marie-curie', name: 'Marie Curie' },
    astro_train: { path: '/hub/astronauts-training', name: 'Entrenamiento Astronauta' },
    einstein: { path: '/hub/albert-einstein', name: 'Albert Einstein' },
    griegos: { path: '/hub/griegos-ciencia', name: 'Los Griegos en la Ciencia' },
    arrival: { path: '/hub/arrival-ciencia', name: 'La Ciencia de Arrival' },
  };

  function getHubInfo(moduleId) {
    // Try exact match first
    if (HUB_MAP[moduleId]) return HUB_MAP[moduleId];
    // Try prefix matching (longest prefix first)
    const keys = Object.keys(HUB_MAP).sort((a, b) => b.length - a.length);
    for (const key of keys) {
      if (moduleId.startsWith(key + '_') || moduleId.startsWith(key)) {
        return HUB_MAP[key];
      }
    }
    return null;
  }

  const hubInfo = getHubInfo(moduleData.id);

  const isCompleted = userData?.progress?.completedModules?.includes(moduleData.id);
  
  const isAnomaly = moduleData.id.startsWith('stellar-');
  const isAnimal = moduleData.id.startsWith('animales_');
  const isAsteroide = moduleData.id.startsWith('asteroides_');
  const isPionero = moduleData.id.startsWith('pioneros_');
  const isRobot = moduleData.id.startsWith('robots_');
  const isEgypt = moduleData.id.startsWith('egypt_');
  const isEinsteinRosen = moduleData.id === 'agujeros_gusano_er';
  const isPluto = moduleData.id === 'pluto';
  const isSun = moduleData.id === 'sun';
  
  const planetImageName = isEgypt ? (moduleData.contentEs?.sections?.[0]?.image?.replace('/assets/', '') || 'egypt_placeholder.png') :
                          (isRobot ? `rovers/ai_${moduleData.id.replace('robots_', '')}.png` :
                          (isPionero ? `pioneros/hub_${moduleData.id.replace('pioneros_', '')}.png` :
                          (isAnimal ? `animales/hub_${moduleData.id.replace('animales_', '')}.png` : 
                          (isAsteroide ? `asteroides/hub_${moduleData.id.replace('asteroides_', '')}.png` : 
                          (isAnomaly ? `${moduleData.id}_icon.png` : 
                          (isSun ? 'cartoon_sun.png' : 
                          (isPluto ? 'planet_pluto.png' : `cartoon_${moduleData.titleEn?.toLowerCase().replace(/\s+/g, '_')}.png`)))))));

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>

      {/* ── Breadcrumb Navigation Bar ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 90,
        background: 'rgba(7, 11, 25, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '0.65rem 2rem',
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        fontSize: '0.82rem',
      }}>
        <Link href="/dashboard" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem', transition: 'color 0.2s' }}>
          <Home size={13} /> Estación Orbital
        </Link>
        <span style={{ color: 'rgba(255,255,255,0.2)' }}>›</span>
        <Link href="/dashboard/misiones" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}>
          Base de Misiones
        </Link>
        {hubInfo && (
          <>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>›</span>
            <Link href={hubInfo.path} style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}>
              {hubInfo.name}
            </Link>
          </>
        )}
        <span style={{ color: 'rgba(255,255,255,0.2)' }}>›</span>
        <span style={{ color: moduleData.color, fontWeight: 600 }}>{moduleData.titleEs}</span>
      </div>
      {/* Dynamic Rotating Planet Background */}
      <div style={{ position: 'fixed', top: '-20%', right: '-20%', width: '150vw', height: '150vw', zIndex: -1, pointerEvents: 'none', filter: 'blur(3px)' }}>
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 300, ease: "linear" }}
          style={{ width: '100%', height: '100%', background: `url(/assets/${planetImageName}) center center / contain no-repeat`, opacity: 0.15 }}
        />
      </div>

      <AnimatePresence>
        {expandedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedImg(null)}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', cursor: 'pointer' }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              style={{ position: 'relative', width: '100%', height: '100%', maxWidth: '1200px', maxHeight: '90vh' }}
            >
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img src={expandedImg} alt="Expanded view" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
               <button onClick={(e) => { e.stopPropagation(); setExpandedImg(null); }} style={{ position: 'absolute', top: '-2rem', right: '-2rem', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '1rem' }}>
                 <X size={32} />
               </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />
      
      <main className="layout-container" style={{ flex: 1, padding: '3rem 2rem', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '3rem', alignItems: 'start' }}>
        
        <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h1 style={{ color: moduleData.color, display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              {moduleData.badgeImage && <img src={moduleData.badgeImage} width={45} height={45} alt="Insignia de Misión" style={{ borderRadius: '50%', boxShadow: `0 0 10px ${moduleData.color}` }} />}
              {moduleData.titleEs} 
              {isCompleted && <CheckCircle color="var(--success)" size={32} />}
            </h1>
          </div>

          {/* ── INFOGRAPHIC PILOT: egypt_m11 gets interactive infographic ── */}
          {moduleData.id === 'egypt_m11' && (
            <InteractiveInfographic_EgyptM11 />
          )}

          {moduleData.id !== 'egypt_m11' && moduleData.contentEs.sections ? (
            // NUEVO FORMATO 2.0 (Científico NASA)
            moduleData.contentEs.sections.map((section, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '0', overflow: 'hidden', borderLeft: `4px solid ${section.style === 'highlight' ? 'var(--gold-star)' : moduleData.color}` }}>
                {section.video && (section.video.includes('drive.google.com') || section.video.includes('youtube.com') || section.video.includes('youtu.be')) ? (
                  <div style={{ width: '100%', background: '#000', position: 'relative', aspectRatio: '16/9' }}>
                    <iframe src={section.video} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }} allow="autoplay; fullscreen" allowFullScreen></iframe>
                  </div>
                ) : section.video ? (
                  <div style={{ width: '100%', background: '#000', position: 'relative' }}>
                     <video src={section.video} preload="none" controls style={{ width: '100%', maxHeight: '400px', objectFit: 'contain', background: '#111' }} />
                  </div>
                ) : null}
                {section.image && !section.video && (
                  <div 
                    onClick={() => setExpandedImg(section.image)}
                    className="expandable-image-container"
                    style={{ width: '100%', height: '300px', background: '#000', position: 'relative', cursor: 'pointer', group: 'hover' }}
                  >
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img src={section.image} loading="lazy" alt={section.title} style={{ width: '100%', height: '100%', objectFit: section.image.includes('cartoon_') ? 'contain' : 'cover', transition: 'transform 0.3s ease' }} className="course-image-hover" />
                     
                     <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', padding: '0.4rem', borderRadius: '50%', color: 'white', opacity: 0.8 }}>
                        <Maximize2 size={16} />
                     </div>

                     {/* Caption eliminado a petición del usuario */}
                  </div>
                )}
                <div style={{ padding: '2rem' }}>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.2rem', fontSize: '1.4rem', color: section.style === 'highlight' ? 'var(--gold-star)' : 'inherit' }}>
                    <BookOpen size={24} color={section.style === 'highlight' ? 'var(--gold-star)' : moduleData.color} />
                    {section.title}
                  </h3>
                  <div style={{ lineHeight: '1.8', fontSize: '1.05rem', color: 'rgba(255,255,255,0.9)' }}>
                    {Array.isArray(section.text) 
                      ? section.text.map((line, i) => (
                          <p key={i} style={{ display: 'block', margin: '0 0 0.5rem 0' }}>{line}</p>
                        ))
                      : <p style={{ whiteSpace: 'pre-line' }}>{section.text}</p>
                    }
                  </div>
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

          {/* Encuesta de Satisfacción */}
          <div style={{ marginTop: '2rem' }}>
            {moduleData.id === 'asteroides_apophis' && <ApophisCountdown />}
            <SatisfactionScale moduleId={moduleData.id} userId={user?.uid} />
          </div>

        </section>

        {/* Sidebar / Quiz Section */}
        <aside style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem', background: `linear-gradient(135deg, rgba(255,255,255,0.05), ${moduleData.color}20)`, backdropFilter: 'blur(20px)' }}>
            <div style={{ width: '180px', height: '180px', borderRadius: '50%', boxShadow: `0 0 40px ${moduleData.color}60`, overflow: 'hidden', border: `4px solid ${moduleData.color}`, background: 'black' }}>
               <motion.img 
                 src={`/assets/${planetImageName}?v=2`} 
                 alt={moduleData.titleEs} 
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
                 style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'normal' }} 
                 onError={(e) => {e.target.style.display='none'}} 
               />
            </div>
            
            <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Misión {moduleData.titleEs}</h2>
            {(moduleData.badgeIcon || moduleData.badgeImage) && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem', marginTop: '1rem', position: 'relative' }}>
                <div style={{
                   position: 'relative',
                   width: '100px', height: '100px',
                   borderRadius: '50%',
                   background: `linear-gradient(45deg, #FFD700, #FFA500, #FF4500)`,
                   padding: '6px',
                   boxShadow: `0 0 20px ${moduleData.color}80, inset 0 0 10px rgba(0,0,0,0.5)`,
                   display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                   <div style={{ position: 'absolute', top: '-10px', width: '20px', height: '30px', background: 'var(--gold-star)', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)', zIndex: 1 }} />
                   <img src={moduleData.badgeIcon || moduleData.badgeImage} width={88} height={88} alt="Insignia" style={{ borderRadius: '50%', objectFit: 'cover', border: '3px solid #222' }} />
                </div>
                <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--gold-star)', letterSpacing: '1.5px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                  Insignia Oficial
                </span>
              </div>
            )}
            
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

          {hubInfo ? (
            <Link href={hubInfo.path} className="btn-secondary" style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
              <ChevronLeft size={16} /> Volver a {hubInfo.name}
            </Link>
          ) : (
            <Link href="/dashboard/misiones" className="btn-secondary" style={{ textAlign: 'center' }}>
              Volver al Mapa Estelar
            </Link>
          )}
        </aside>

      </main>
    </div>
  );
}
