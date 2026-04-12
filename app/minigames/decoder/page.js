'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Navbar from '@/components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, AlertTriangle, CheckCircle, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DecoderMinigame() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  // Target Wave parameters (Secret alien signal)
  const [targetAmpli, setTargetAmpli] = useState(30); 
  const [targetFreq, setTargetFreq] = useState(0.040); 

  useEffect(() => {
    setTargetAmpli(Math.floor(Math.random() * 40) + 20); // 20 to 60
    setTargetFreq(parseFloat((Math.random() * 0.05 + 0.02).toFixed(3))); // 0.02 to 0.07
  }, []);

  // Player controls
  const [ampli, setAmpli] = useState(10);
  const [freq, setFreq] = useState(0.01);
  
  const [isSynced, setIsSynced] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  useEffect(() => {
    // Check if synced
    const ampliDiff = Math.abs(ampli - targetAmpli);
    const freqDiff = Math.abs(freq - targetFreq);
    
    if (ampliDiff < 5 && freqDiff < 0.005) {
      if (!isSynced) setIsSynced(true);
    } else {
      if (isSynced) setIsSynced(false);
    }
  }, [ampli, freq, targetAmpli, targetFreq, isSynced]);

  const claimReward = async () => {
    if (!user || rewardClaimed) return;
    const currentStars = userData?.progress?.stars || 0;
    const reward = 50;
    await setDoc(doc(db, 'users', user.uid), {
      progress: {
        stars: currentStars + reward
      }
    }, { merge: true });
    setRewardClaimed(true);
  };

  if (loading || !userData) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Iniciando Decodificador...</div>;

  // Render SVG Path generator
  const generateWavePath = (amplitude, frequency, phase = 0) => {
    let path = 'M 0 ' + (100 - Math.sin(phase) * amplitude);
    for (let x = 0; x <= 600; x += 5) {
      const y = 100 - Math.sin(x * frequency + phase) * amplitude;
      path += ' L ' + x + ' ' + y;
    }
    return path;
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#050a10' }}>
      <Navbar />
      
      <main className="layout-container" style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--starlight)', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <Radio size={32} /> Interceptación de Espectro
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>Misión de Inteligencia: Sintoniza la frecuencia de onda ajena para desbloquear la transmisión.</p>
        </div>

        {/* RADAR SCREEN */}
        <div style={{ 
            width: '100%', 
            maxWidth: '600px', 
            height: '250px', 
            background: '#0a192f', 
            borderRadius: '16px', 
            border: isSynced ? '2px solid var(--success)' : '2px solid #172a45',
            boxShadow: isSynced ? '0 0 30px rgba(0,255,136,0.3)' : '0 0 30px rgba(0,0,0,0.5)',
            position: 'relative',
            overflow: 'hidden'
        }}>
           {/* Grid lines */}
           <div style={{ position: 'absolute', width: '100%', height: '100%', backgroundImage: 'linear-gradient(rgba(0,228,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,228,255,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
           
           {/* Center Line */}
           <div style={{ position: 'absolute', top: '50%', width: '100%', height: '1px', background: 'rgba(255,255,255,0.2)' }}></div>

           <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="none" style={{ position: 'relative', zIndex: 1 }}>
              {/* Target Wave (Alien) */}
              <motion.path 
                 d={generateWavePath(targetAmpli, targetFreq, 0)} 
                 fill="none" 
                 stroke="rgba(255, 51, 102, 0.5)" 
                 strokeWidth="4" 
                 strokeDasharray="10 5" 
                 animate={{ strokeDashoffset: [0, 100] }}
                 transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              {/* Player Wave */}
              <path d={generateWavePath(ampli, freq, 0)} fill="none" stroke={isSynced ? 'var(--success)' : 'var(--electric-blue)'} strokeWidth="3" />
           </svg>

           {isSynced && (
             <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'rgba(0,255,136,0.2)', color: 'var(--success)', padding: '0.5rem 1rem', borderRadius: '8px', zIndex: 2, fontWeight: 'bold' }}>
               ENLACE ESTABLECID0
             </div>
           )}
        </div>

        {/* CONTROLS */}
        <div className="glass-card" style={{ width: '100%', maxWidth: '600px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
           
           <div>
             <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--electric-blue)', marginBottom: '0.5rem' }}>
               <span>Amplitud (Poder)</span>
               <span>{ampli} dB</span>
             </div>
             <input type="range" min="10" max="80" step="1" value={ampli} onChange={(e) => setAmpli(Number(e.target.value))} style={{ width: '100%' }} />
           </div>

           <div>
             <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--electric-blue)', marginBottom: '0.5rem' }}>
               <span>Frecuencia (Oscilación)</span>
               <span>{(freq * 100).toFixed(1)} MHz</span>
             </div>
             <input type="range" min="0.01" max="0.1" step="0.001" value={freq} onChange={(e) => setFreq(Number(e.target.value))} style={{ width: '100%' }} />
           </div>

        </div>

        {/* DECODED MESSAGE & REWARD */}
        <AnimatePresence>
          {isSynced && (
            <motion.div 
               initial={{ opacity: 0, y: 20 }} 
               animate={{ opacity: 1, y: 0 }}
               className="glass-card" 
               style={{ width: '100%', maxWidth: '600px', padding: '2rem', border: '1px solid var(--success)', background: 'rgba(0,255,136,0.05)', textAlign: 'center' }}
            >
               <h3 style={{ color: 'var(--success)', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                 <CheckCircle /> Transmisión Desencriptada
               </h3>
               <p style={{ fontFamily: 'monospace', fontSize: '1.1rem', color: 'var(--starlight)', margin: '0 0 1.5rem 0' }}>
                 "BZZZRT... ATENCIÓN CADETES... LOS ASTILLEROS NAVALES ESTÁN OPERATIVOS. UTILICEN SU POLVO ESTELAR PARA ACONDICIONAR SUS NAVES. CAMBIO Y FUERA... KZZSCHH"
               </p>

               {rewardClaimed ? (
                 <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,215,0,0.2)', color: 'var(--gold-star)', padding: '0.8rem 1.5rem', borderRadius: '30px', fontWeight: 'bold' }}>
                   ¡+50 Estrellas Transferidas! <Star fill="currentColor" />
                 </div>
               ) : (
                 <button className="btn-primary" onClick={claimReward} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '1.1rem', background: 'var(--success)', color: 'black' }}>
                    Extraer Recompensa <Star fill="black" size={20} />
                 </button>
               )}
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}
