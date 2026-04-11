'use client';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, arrayUnion, increment } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Shield, Sparkles, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function QuizMinigame() {
  const { user, userData, loading } = useAuth();
  const params = useParams();
  const router = useRouter();
  
  const [moduleData, setModuleData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isExploding, setIsExploding] = useState(false); // FASE 3: Choque de anomalías

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchModule() {
      const d = await getDoc(doc(db, "modules", params.moduleId));
      if (d.exists()) setModuleData(d.data());
    }
    if (params.moduleId) fetchModule();
  }, [params.moduleId]);

  if (loading || !moduleData) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando Simulador...</div>;

  const totalQuestions = moduleData.quizEs?.length || 0;
  const passed = score === totalQuestions && totalQuestions > 0;
  
  const isAnomaly = ['black_hole', 'quasar', 'pulsar', 'red_dwarf', 'white_dwarf', 'wormhole'].includes(moduleData.id);
  const planetImageName = isAnomaly ? `${moduleData.id}_icon.png` : `cartoon_${moduleData.titleEn.toLowerCase().replace(/\s+/g, '_')}.png`;

  const handleAnswer = (optionIndex) => {
    if (isExploding || isShaking) return; // Prevent double clicks
    
    const isCorrect = optionIndex === moduleData.quizEs[currentQuestion].a;
    
    if (isCorrect) {
      setScore(score + 1);
      advanceGame(isCorrect);
    } else {
      if (isAnomaly) {
        // FASE 3: Explosión en Anomalías
        setIsExploding(true);
        setTimeout(() => {
          setIsExploding(false);
          advanceGame(false);
        }, 1500);
      } else {
        // Shake clásico en Sistema Solar
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
        advanceGame(isCorrect);
      }
    }
  };

  const advanceGame = (isCorrect) => {
    setTimeout(() => {
      if (currentQuestion + 1 < moduleData.quizEs.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
        completeModule(isCorrect ? score + 1 : score);
      }
    }, 800); // Delay to let animation play
  };

  const completeModule = async (finalScore) => {
    if (finalScore === totalQuestions && !userData?.progress?.completedModules?.includes(moduleData.id)) {
      setSaving(true);
      await updateDoc(doc(db, "users", user.uid), {
        "progress.completedModules": arrayUnion(moduleData.id),
        "progress.badges": arrayUnion(moduleData.badgeEs),
        "progress.stars": increment(50)
      });
      setSaving(false);
    }
  };

  // Calculate rocket position percentage (0 to 100)
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
      
      {/* Background Theme */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: `url(/assets/${planetImageName}) center/cover no-repeat`, opacity: 0.1, zIndex: -1, filter: 'blur(10px)' }}></div>
      
      <Navbar />
      
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        
        {/* Minigame Stellar Map Tracker */}
        {!showResults && (
           <div className="glass-card" style={{ width: '100%', padding: '2rem', marginBottom: '2rem', border: `1px solid ${moduleData.color}50` }}>
             <h3 style={{ margin: '0 0 1.5rem 0', textAlign: 'center', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>
               Trayectoria a {moduleData.titleEs}
             </h3>
             <div style={{ position: 'relative', height: '60px', display: 'flex', alignItems: 'center' }}>
               {/* Track line */}
               <div style={{ position: 'absolute', left: '10%', right: '10%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', zIndex: 1 }}></div>
               {/* Filled track */}
               <motion.div 
                 initial={{ width: 0 }} 
                 animate={{ width: `${progressPercentage * 0.8}%` }} 
                 transition={{ type: 'spring', stiffness: 50 }}
                 style={{ position: 'absolute', left: '10%', height: '4px', background: moduleData.color, borderRadius: '2px', zIndex: 2 }}
               ></motion.div>
               
               {/* Target Planet */}
               <div style={{ position: 'absolute', right: '0', zIndex: 3, width: '60px', height: '60px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${moduleData.color}`, boxShadow: `0 0 20px ${moduleData.color}50`, background: '#000' }}>
                 <img src={`/assets/${planetImageName}`} style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: isAnomaly ? 'screen' : 'normal' }} alt={moduleData.titleEs} onError={(e) => {e.target.style.display='none'}} />
               </div>

               {/* Spaceship */}
               <motion.div 
                 animate={{ 
                   left: `${10 + (progressPercentage * 0.8)}%`,
                   x: isShaking || isExploding ? [-10, 10, -10, 10, -10, 10, 0] : 0,
                   y: isExploding ? [0, 50, 80] : [-5, 5, -5], // Drop if exploding
                   opacity: isExploding ? [1, 1, 0] : 1,
                   rotate: isExploding ? [0, 90, 180] : 0
                 }}
                 transition={{ 
                   left: { type: 'spring', stiffness: 60, damping: 15 },
                   x: { duration: 0.4, repeat: isExploding ? 2 : 0 },
                   y: isExploding ? { duration: 1.2, ease: "easeIn" } : { repeat: Infinity, duration: 4, ease: "easeInOut" },
                   rotate: isExploding ? { duration: 1.2, ease: "easeIn" } : { duration: 0 },
                   opacity: isExploding ? { duration: 1.2 } : { duration: 0 }
                 }}
                 style={{ position: 'absolute', zIndex: 4, marginLeft: '-24px', filter: `drop-shadow(0 0 10px ${moduleData.color})` }}
               >
                 <Rocket size={48} color="white" fill={isExploding ? 'red' : moduleData.color} style={{ transform: 'rotate(45deg)' }} />
                 {isExploding && <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '2.5rem', animation: 'pulse 0.5s infinite' }}>💥</div>}
               </motion.div>
             </div>
           </div>
        )}

        {/* Quiz Area */}
        <div style={{ width: '100%' }}>
          {!showResults ? (
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentQuestion}
                initial={{ x: 50, opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }} 
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="glass-card"
              >
                <div style={{ margin: '1rem 0 2rem 0', textAlign: 'center' }}>
                  <span style={{ color: moduleData.color, fontWeight: 'bold', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Fase {currentQuestion + 1} de {totalQuestions}</span>
                  <h2 style={{ fontSize: '2rem', margin: '1rem 0 0.5rem 0' }}>{moduleData.quizEs[currentQuestion].q}</h2>
                  {moduleData.quizEn && moduleData.quizEn[currentQuestion] && (
                    <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>{moduleData.quizEn[currentQuestion].q}</p>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {moduleData.quizEs[currentQuestion].options.map((opt, i) => (
                    <button 
                      key={i} 
                      onClick={() => handleAnswer(i)}
                      className="btn-secondary"
                      style={{ 
                        padding: '1.2rem', 
                        textAlign: 'left', 
                        background: 'rgba(255,255,255,0.05)', 
                        borderColor: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.background = `${moduleData.color}20`; e.currentTarget.style.borderColor = moduleData.color; }}
                      onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                    >
                      <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{opt}</div>
                      {moduleData.quizEn && moduleData.quizEn[currentQuestion] && moduleData.quizEn[currentQuestion].options[i] && (
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{moduleData.quizEn[currentQuestion].options[i]}</div>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
              
              {passed ? (
                <>
                  <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 2rem auto' }}>
                     <Sparkles size={60} color="var(--gold-star)" style={{ position: 'absolute', top: -20, right: -20 }} />
                     <img src={`/assets/${planetImageName}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', boxShadow: `0 0 50px ${moduleData.color}`, border: `4px solid ${moduleData.color}` }} alt={moduleData.titleEs} onError={(e) => {e.target.style.display='none'}} />
                  </div>
                  <h2 style={{ fontSize: '2.5rem', margin: 0, color: 'var(--success)' }}>¡Aterrizaje Exitoso!</h2>
                  <p style={{ fontSize: '1.2rem', margin: '1rem 0' }}>Llegaste a {moduleData.titleEs} con {score}/{totalQuestions} aciertos.</p>
                  
                  <div style={{ background: 'rgba(255,215,0,0.1)', padding: '2rem', borderRadius: '24px', margin: '2rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <Shield size={60} color={moduleData.color} />
                    <h3 style={{ margin: 0, fontSize: '1.5rem' }}>¡Medalla Ganada!</h3>
                    <p style={{ margin: 0, fontWeight: 'bold', color: moduleData.color, fontSize: '1.2rem' }}>{moduleData.badgeEs}</p>
                    <p style={{ margin: 0, color: 'var(--gold-star)', fontWeight: 'bold' }}>+50 Polvo Estelar</p>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>☄️🛸</div>
                  <h2 style={{ fontSize: '2.5rem', margin: 0, color: 'var(--danger)' }}>Impacto de Meteorito</h2>
                  <p style={{ fontSize: '1.2rem', margin: '1rem 0', color: 'var(--text-muted)' }}>Tu nave sufrió daños. Respondiste {score} de {totalQuestions} correctamente.</p>
                  <p style={{ marginBottom: '2rem' }}>Necesitas un trayecto perfecto para poder aterrizar y reclamar la medalla.</p>
                  <button onClick={() => { setScore(0); setCurrentQuestion(0); setShowResults(false); }} className="btn-secondary" style={{ width: '100%' }}>
                    Reparar Nave y Reintentar
                  </button>
                </>
              )}

              <Link href={isAnomaly ? "/hub/stellar-objects" : "/hub/solar-system"} className="btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>
                Volver al Mando Central
              </Link>
            </motion.div>
          )}

        </div>
      </main>
    </div>
  );
}
