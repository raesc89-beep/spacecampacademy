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

    if (temperature > 80 && magneticField < 30) {
      state = 'desertico';
      msg = 'Temperatura extrema sin campo magnético. Toda el agua escapó al vacío dejando un páramo desértico agrietado.';
    } else if (temperature > 80) {
      state = 'magma';
      msg = 'Temperatura crítica. El agua se evapora y la corteza se derrite.';
    } else if (temperature >= 35 && temperature <= 70 && gravity >= 1.2 && magneticField <= 40) {
      state = 'venenoso';
      msg = 'Atmósfera espesa tóxica. Alta gravedad atrapa gases letales sobre biomas verdes y pantanosos nocivos.';
    } else if (temperature < -30) {
      state = 'ice';
      msg = 'Glaciación global. Cualquier líquido está bloqueado bajo gruesas capas de biomasa azul.';
    } else if (gravity < 0.6) {
      state = 'barren';
      msg = 'Baja gravedad. La atmósfera se escapa hacia el vacío (Efecto Marte).';
    } else if (gravity > 2.0) {
      state = 'gas';
      msg = 'Alta gravedad. Ha aplastado la corteza reteniendo bandas de metano pesado.';
    } else if (magneticField < 30) {
      state = 'barren';
      msg = 'Viento solar letal. El núcleo no genera campo magnético protector.';
    } else if (temperature >= -10 && temperature <= 25 && gravity >= 0.8 && gravity <= 1.2 && magneticField >= 30 && magneticField <= 60) {
      state = 'acuatico';
      msg = 'Mundo Acéanico Gélido. Los mares abarcan el 99% de la superficie con densas nubes.';
    } else if (temperature >= 45 && gravity >= 1.6 && magneticField >= 50) {
      state = 'anillos';
      msg = 'Planeta Denso Rocoso. Su pozo gravitacional ha destrozado lunas creando un cinturón de asteroides naranja radiante.';
    } else if (temperature >= 30 && temperature <= 50 && gravity >= 0.4 && gravity <= 1.0 && magneticField >= 80) {
      state = 'habitable';
      msg = '¡Biósfera Estabilizada! Disonancia armónica perfecta para la vida.';
    }

    if (temperature === -200 && gravity >= 3.0 && magneticField >= 90) {
      state = 'alien';
      msg = 'ANOMALÍA DETECTADA: Elementos cristalinos de radiación fúngica bioluminiscente.';
    }

    setPlanetState(state);
    setFeedbackMsg(msg);
  }, [temperature, gravity, magneticField]);

  const claimReward = async (amount = 100) => {
    if (!user || rewardClaimed || (planetState !== 'habitable' && planetState !== 'alien')) return;
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
    let planetElement = null;
    let glow = '';
    let atmosphereShadow = 'inset -40px -40px 60px rgba(0,0,0,0.8)';

    const createPlanetDiv = (bgUrl, size = '220% 220%') => (
      <div style={{ 
        width: '100%', height: '100%', display: 'flex', 
        animation: 'planetSpin 30s linear infinite', 
        background: `url(${bgUrl}) center center / ${size}`, 
        borderRadius: '50%',
        boxShadow: `inset 0 0 20px rgba(0,0,0,0.8)`
      }}>
      </div>
    );

    if (planetState === 'barren') {
      planetElement = createPlanetDiv('/assets/mercury_extremes.png');
      glow = '0 0 15px rgba(140, 118, 98, 0.3)';
    }

    if (planetState === 'magma') {
      planetElement = createPlanetDiv('/assets/gen_magma.png', '220% 220%');
      glow = '0 0 50px rgba(255, 87, 34, 0.9)';
    }

    if (planetState === 'desertico') {
      planetElement = createPlanetDiv('/assets/gen_desertico.jpg', '200px 200px repeat');
      glow = '0 0 40px rgba(200, 100, 50, 0.8)';
      atmosphereShadow = 'inset -40px -40px 60px rgba(0,0,0,0.9), inset 10px 10px 40px rgba(200, 100, 50, 0.4)';
    }

    if (planetState === 'venenoso') {
      planetElement = createPlanetDiv('/assets/gen_venenoso.png', '220% 220%');
      glow = '0 0 60px rgba(0, 255, 100, 0.8)';
    }

    if (planetState === 'acuatico') {
      planetElement = createPlanetDiv('/assets/upload_1.png', '220% 220%');
      glow = '0 0 40px rgba(0, 153, 255, 0.8)';
    }

    if (planetState === 'anillos') {
      planetElement = createPlanetDiv('/assets/upload_2.png', '220% 220%');
      glow = '0 0 40px rgba(255, 153, 51, 0.6)';
    }

    if (planetState === 'alien') {
      planetElement = createPlanetDiv('/assets/upload_3.png', '220% 220%');
      glow = '0 0 60px rgba(255, 0, 255, 0.8)';
    }

    if (planetState === 'ice') {
      planetElement = createPlanetDiv('/assets/earth_water_states.png');
      glow = '0 0 30px rgba(179, 229, 252, 0.6)';
    }

    if (planetState === 'gas') {
      planetElement = createPlanetDiv('/assets/gen_gas.png', '220% 220%');
      glow = '0 0 40px rgba(212, 225, 255, 0.7)';
    }

    if (planetState === 'habitable') {
      planetElement = createPlanetDiv('/assets/upload_4.png', '220% 220%');
      glow = '0 0 50px rgba(100, 255, 255, 0.7)';
      atmosphereShadow = 'inset -30px -30px 50px rgba(0,0,0,0.8), inset 10px 10px 30px rgba(255, 255, 255, 0.2)';
    }

    return (
       <motion.div
         key="planet" // Mantener misma key global
         initial={{ scale: 0.8, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         transition={{ type: 'spring', stiffness: 50 }}
         style={{
           width: '250px', height: '250px', borderRadius: '50%',
           boxShadow: glow, flexShrink: 0,
           margin: '0 auto', position: 'relative', overflow: 'hidden',
           transform: 'translateZ(0)',
           backgroundColor: '#000'
         }}
       >
         <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            {planetElement}
         </div>
         {/* Sombra Esférica 3D Suprema superpuesta */}
         <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', boxShadow: atmosphereShadow, borderRadius: '50%', pointerEvents: 'none', zIndex: 10 }}></div>
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
               padding: '1rem', borderRadius: '12px', zIndex: 1, width: '100%', display: 'flex', alignItems: 'center', gap: '1rem'
             }}
          >
             <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}>
               {planetState === 'desertico' && '🏜️'}
               {planetState === 'venenoso' && '☣️'}
               {planetState === 'acuatico' && '🌊'}
               {planetState === 'magma' && '🌋'}
               {planetState === 'ice' && '❄️'}
               {planetState === 'gas' && '🌪️'}
               {planetState === 'barren' && '🌑'}
               {planetState === 'habitable' && '🌍'}
               {planetState === 'alien' && '🛸'}
               {planetState === 'anillos' && '🪐'}
             </div>
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
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: 'auto' }}>
                   <div style={{ textAlign: 'center', padding: '1rem', border: '1px solid var(--gold-star)', background: 'rgba(255,215,0,0.1)', color: 'var(--gold-star)', borderRadius: '12px', fontWeight: 'bold', display: 'flex', center: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                      ¡Planeta Logrado! Base de estrellas incrementada. <CheckCircle />
                   </div>
                   <Link href="/hub/solar-system" className="btn-secondary" style={{ textAlign: 'center', padding: '1rem' }}>
                      Volver al Mapa Estelar
                   </Link>
                 </div>
              )}
           </AnimatePresence>

        </div>
      </main>
    </div>
  );
}
