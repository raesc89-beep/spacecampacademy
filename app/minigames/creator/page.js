'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Navbar from '@/components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, AlertTriangle, CheckCircle, Star, Thermometer, ShieldAlert, AlignVerticalSpaceAround } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreatorMinigame() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  // Alchemy Parameters
  const [temperature, setTemperature] = useState(-50); // -200 to 200, step 10
  const [gravity, setGravity] = useState(0.5); // 0.1 to 4.0, step 0.1
  const [magneticField, setMagneticField] = useState(10); // 0 to 100, step 10

  // State evaluation
  const [planetState, setPlanetState] = useState('barren'); 
  const [feedbackMsg, setFeedbackMsg] = useState('Terreno inestable. Ajusta las variables físicas.');
  const [rewardClaimed, setRewardClaimed] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  useEffect(() => {
    // Evaluation Logic
    let state = 'barren';
    let msg = 'Planeta rocoso inerte. Sin atmósfera visible.';

    if (temperature > 80) {
      state = 'magma';
      msg = 'Temperatura extrema. El agua se evapora y la corteza se derrite.';
    } else if (temperature < -30) {
      state = 'ice';
      msg = 'Glaciación global. Cualquier líquido está bloqueado bajo hielo.';
    } else if (gravity < 0.6) {
      state = 'barren';
      msg = 'Baja gravedad. La atmósfera se escapa hacia el vacío (Efecto Marte).';
    } else if (gravity > 2.0) {
      state = 'gas';
      msg = 'Alta gravedad. Ha aplastado la corteza reteniendo metano pesado.';
    } else if (magneticField < 30) {
      state = 'barren';
      msg = 'Viento solar letal. El núcleo no genera campo magnético protector.';
    } else if (temperature >= 10 && temperature <= 40 && gravity >= 0.8 && gravity <= 1.5 && magneticField >= 40 && magneticField <= 70) {
      state = 'habitable';
      msg = '¡Biósfera Estabilizada! Disonancia armónica perfecta para la vida.';
    }

    // Secret Alien Planet: T: -200, G: 3.5, EMF: 100
    if (temperature === -200 && gravity >= 3.0 && magneticField === 100) {
      state = 'alien';
      msg = 'ANOMALÍA DETECTADA: Elementos cristalinos de radiación bioluminiscente han creado vida exótica extrema.';
    }

    setPlanetState(state);
    setFeedbackMsg(msg);
  }, [temperature, gravity, magneticField]);

  const claimReward = async (amount = 100) => {
    if (!user || rewardClaimed) return;
    const currentStars = userData?.progress?.stars || 0;
    await setDoc(doc(db, 'users', user.uid), {
      progress: {
        stars: currentStars + amount
      }
    }, { merge: true });
    setRewardClaimed(true);
  };

  if (loading || !userData) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Arrancando Motor de Génesis...</div>;

  const renderPlanetVisual = () => {
    let textures = [];
    let atmosphereShadow = 'inset -40px -40px 60px rgba(0,0,0,0.95)'; // Sombra fuerte base 3D
    let glow = 'none';

    if (planetState === 'barren') {
      textures.push(
        <div key="t-barren" style={{ width: '200%', height: '100%', display: 'flex', animation: 'planetSpin 30s linear infinite', background: '#5d4037' }}>
           {/* Cráteres en CSS */}
           <div style={{ flex: 1, backgroundImage: 'radial-gradient(circle at 20% 30%, transparent 20%, rgba(0,0,0,0.4) 22%, transparent 25%), radial-gradient(circle at 70% 60%, transparent 10%, rgba(0,0,0,0.5) 12%, transparent 15%)', backgroundSize: '125px 125px' }}></div>
           <div style={{ flex: 1, backgroundImage: 'radial-gradient(circle at 20% 30%, transparent 20%, rgba(0,0,0,0.4) 22%, transparent 25%), radial-gradient(circle at 70% 60%, transparent 10%, rgba(0,0,0,0.5) 12%, transparent 15%)', backgroundSize: '125px 125px' }}></div>
        </div>
      );
      glow = '0 0 15px rgba(140, 118, 98, 0.3)';
    }

    if (planetState === 'magma') {
      textures.push(
        <div key="t-magma" style={{ width: '200%', height: '100%', display: 'flex', animation: 'planetSpin 15s linear infinite', background: '#3e150a' }}>
           {/* Ríos de lava y grietas */}
           <div style={{ flex: 1, background: 'linear-gradient(45deg, transparent 40%, #ff3d00 45%, #ffea00 50%, #ff3d00 55%, transparent 60%), linear-gradient(-45deg, transparent 20%, #d50000 25%, #ff9100 30%, transparent 35%)', backgroundSize: '125px 125px' }}></div>
           <div style={{ flex: 1, background: 'linear-gradient(45deg, transparent 40%, #ff3d00 45%, #ffea00 50%, #ff3d00 55%, transparent 60%), linear-gradient(-45deg, transparent 20%, #d50000 25%, #ff9100 30%, transparent 35%)', backgroundSize: '125px 125px' }}></div>
        </div>
      );
      glow = '0 0 50px rgba(255, 87, 34, 0.9)';
    }

    if (planetState === 'ice') {
      textures.push(
        <div key="t-ice" style={{ width: '200%', height: '100%', display: 'flex', animation: 'planetSpin 40s linear infinite', background: '#e1f5fe' }}>
           {/* Capas y fracturas de hielo */}
           <div style={{ flex: 1, background: 'linear-gradient(15deg, transparent 30%, rgba(2, 119, 189, 0.3) 32%, transparent 35%), radial-gradient(ellipse at 50% 10%, #fff 20%, transparent 60%)', backgroundSize: '90px 140px' }}></div>
           <div style={{ flex: 1, background: 'linear-gradient(15deg, transparent 30%, rgba(2, 119, 189, 0.3) 32%, transparent 35%), radial-gradient(ellipse at 50% 10%, #fff 20%, transparent 60%)', backgroundSize: '90px 140px' }}></div>
        </div>
      );
      glow = '0 0 30px rgba(179, 229, 252, 0.6)';
      atmosphereShadow = 'inset -40px -40px 60px rgba(0,0,0,0.9), inset 15px 15px 40px rgba(255,255,255,0.6)';
    }

    if (planetState === 'gas') {
      textures.push(
        <div key="t-gas" style={{ width: '200%', height: '100%', display: 'flex', animation: 'planetSpin 10s linear infinite', background: '#9e9d24' }}>
           {/* Bandas de nubes tóxicas */}
           <div style={{ flex: 1, background: 'repeating-linear-gradient(0deg, #827717, #827717 15px, #afb42b 15px, #afb42b 30px, #c0ca33 30px, #c0ca33 45px)', opacity: 0.9 }}></div>
           <div style={{ flex: 1, background: 'repeating-linear-gradient(0deg, #827717, #827717 15px, #afb42b 15px, #afb42b 30px, #c0ca33 30px, #c0ca33 45px)', opacity: 0.9 }}></div>
        </div>
      );
      glow = '0 0 40px rgba(212, 225, 87, 0.5)';
      atmosphereShadow = 'inset -40px -40px 50px rgba(0,0,0,0.9), inset 10px 10px 30px rgba(212, 225, 87, 0.3)';
    }

    if (planetState === 'habitable') {
      // Océanos y Continentes Terrestres
      textures.push(
        <div key="t-hab-land" style={{ width: '200%', height: '100%', display: 'flex', animation: 'planetSpin 25s linear infinite', background: '#1565c0' }}>
           <div style={{ flex: 1, background: 'radial-gradient(circle at 30% 50%, #4caf50 15%, transparent 25%), radial-gradient(ellipse at 70% 30%, #388e3c 10%, transparent 20%), radial-gradient(circle at 80% 70%, #8bc34a 12%, transparent 20%)', backgroundSize: '150px 150px' }}></div>
           <div style={{ flex: 1, background: 'radial-gradient(circle at 30% 50%, #4caf50 15%, transparent 25%), radial-gradient(ellipse at 70% 30%, #388e3c 10%, transparent 20%), radial-gradient(circle at 80% 70%, #8bc34a 12%, transparent 20%)', backgroundSize: '150px 150px' }}></div>
        </div>
      );
      // Nubes blancas animadas un poco más veloz
      textures.push(
        <div key="t-hab-clouds" style={{ position: 'absolute', top: 0, left: 0, width: '200%', height: '100%', display: 'flex', animation: 'planetSpin 18s linear infinite', opacity: 0.7, zIndex: 2 }}>
           <div style={{ flex: 1, background: 'radial-gradient(circle at 50% 20%, #fff 5%, transparent 20%), radial-gradient(ellipse at 20% 60%, #fff 8%, transparent 25%)', backgroundSize: '120px 120px' }}></div>
           <div style={{ flex: 1, background: 'radial-gradient(circle at 50% 20%, #fff 5%, transparent 20%), radial-gradient(ellipse at 20% 60%, #fff 8%, transparent 25%)', backgroundSize: '120px 120px' }}></div>
        </div>
      );
      glow = '0 0 60px rgba(0, 228, 255, 0.7)';
      atmosphereShadow = 'inset -40px -40px 60px rgba(0,0,0,0.95), inset 10px 10px 30px rgba(0,228,255,0.5)';
    }

    if (planetState === 'alien') {
      textures.push(
        <div key="t-alien" style={{ width: '200%', height: '100%', display: 'flex', animation: 'planetSpin 12s linear infinite', background: '#1c002f' }}>
           {/* Formaciones cristalinas brillantes */}
           <div style={{ flex: 1, background: 'linear-gradient(60deg, transparent 30%, #e040fb 32%, transparent 34%), radial-gradient(circle at 40% 70%, #b388ff 8%, transparent 18%)', backgroundSize: '110px 110px' }}></div>
           <div style={{ flex: 1, background: 'linear-gradient(60deg, transparent 30%, #e040fb 32%, transparent 34%), radial-gradient(circle at 40% 70%, #b388ff 8%, transparent 18%)', backgroundSize: '110px 110px' }}></div>
        </div>
      );
      glow = '0 0 80px rgba(224, 64, 251, 1)';
      atmosphereShadow = 'inset -40px -40px 60px rgba(0,0,0,0.95), inset 10px 10px 40px rgba(179, 136, 255, 0.6)';
    }

    return (
       <motion.div
         key="planet" // Mantener misma key global para no reiniciar el elemento entero, solo las capas internas cambian
         initial={{ scale: 0.8, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         transition={{ type: 'spring', stiffness: 50 }}
         style={{
           width: '250px', height: '250px', borderRadius: '50%',
           boxShadow: glow,
           margin: '0 auto', position: 'relative', overflow: 'hidden',
           transform: 'translateZ(0)' // Forzar aceleración de hardware visual
         }}
       >
         {textures}
         {/* Sombra Esférica 3D Suprema superpuesta */}
         <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: '50%', boxShadow: atmosphereShadow, zIndex: 10, pointerEvents: 'none' }} />
         
         <style jsx>{`
           @keyframes planetSpin {
             0% { transform: translateX(0); }
             100% { transform: translateX(-50%); }
           }
         `}</style>
       </motion.div>
    );
  };

  const isWin = planetState === 'habitable' || planetState === 'alien';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#02050a' }}>
      <Navbar />
      
      <main className="layout-container" style={{ flex: 1, padding: '2rem', display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(350px, 1.2fr)', gap: '2rem' }}>
        
        {/* VIEWPORT PLANETA */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle, rgba(0, 228, 255, 0.05) 0%, transparent 80%)' }} />
          
          <h2 style={{ color: 'var(--starlight)', margin: '0 0 2rem 0', zIndex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <Globe /> Terraformador Órbita-Zero
          </h2>
          
          <div style={{ zIndex: 1, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '2rem 0' }}>
             {renderPlanetVisual()}
          </div>

          <motion.div 
             key={planetState}
             initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
             style={{ 
               background: isWin ? (planetState === 'alien' ? 'rgba(179, 136, 255, 0.2)' : 'rgba(0,255,136,0.1)') : 'rgba(255,255,255,0.05)', 
               border: isWin ? (planetState === 'alien' ? '1px solid #b388ff' : '1px solid var(--success)') : '1px solid rgba(255,255,255,0.1)', 
               padding: '1rem', borderRadius: '12px', zIndex: 1, width: '100%' 
             }}
          >
             <p style={{ margin: 0, color: isWin ? (planetState === 'alien' ? '#b388ff' : 'var(--success)') : 'var(--text-muted)' }}>{feedbackMsg}</p>
          </motion.div>
        </div>

        {/* CONTROLES ALQUIMICOS */}
        <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
           
           <div>
             <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ff5722', marginBottom: '0.5rem', fontWeight: 'bold' }}>
               <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Thermometer size={18} /> Núcleo Térmico </span>
               <span>{temperature} °C</span>
             </div>
             <input type="range" min="-200" max="200" step="10" value={temperature} onChange={(e) => setTemperature(Number(e.target.value))} style={{ width: '100%', accentColor: '#ff5722' }} />
             <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Restaura el delicado equilibrio del agua líquida alterando la fisión del núcleo.</p>
           </div>

           <div>
             <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d4e157', marginBottom: '0.5rem', fontWeight: 'bold' }}>
               <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><AlignVerticalSpaceAround size={18} /> Masa Gravitatoria </span>
               <span>{gravity.toFixed(1)} G</span>
             </div>
             <input type="range" min="0.1" max="4.0" step="0.1" value={gravity} onChange={(e) => setGravity(Number(e.target.value))} style={{ width: '100%', accentColor: '#d4e157' }} />
             <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Atrapa densas cordilleras de la atmósfera sin aplastar estructuralmente el suelo.</p>
           </div>

           <div>
             <div style={{ display: 'flex', justifyContent: 'space-between', color: '#00e4ff', marginBottom: '0.5rem', fontWeight: 'bold' }}>
               <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ShieldAlert size={18} /> Electromagnetismo </span>
               <span>{magneticField} µT</span>
             </div>
             <input type="range" min="0" max="100" step="10" value={magneticField} onChange={(e) => setMagneticField(Number(e.target.value))} style={{ width: '100%', accentColor: '#00e4ff' }} />
             <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Desvía los devastadores rayos Gamma del sol creando un escudo iónico.</p>
           </div>

           {/* REWARDS */}
           <AnimatePresence>
              {isWin && !rewardClaimed && (
                 <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ marginTop: 'auto' }}>
                    <button 
                      className="btn-primary" 
                      onClick={() => claimReward(planetState === 'alien' ? 200 : 100)} 
                      style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem', padding: '1.5rem', background: planetState === 'alien' ? '#b388ff' : 'var(--success)' }}
                    >
                       Recolectar Polvo de Formación <Star fill="black" size={24} />
                    </button>
                 </motion.div>
              )}
              {rewardClaimed && (
                 <div style={{ marginTop: 'auto', textAlign: 'center', padding: '1rem', border: '1px solid var(--gold-star)', background: 'rgba(255,215,0,0.1)', color: 'var(--gold-star)', borderRadius: '12px', fontWeight: 'bold', display: 'flex', center: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    ¡Planeta Logrado! Base de estrellas incrementada. <CheckCircle />
                 </div>
              )}
           </AnimatePresence>

        </div>
      </main>
    </div>
  );
}
