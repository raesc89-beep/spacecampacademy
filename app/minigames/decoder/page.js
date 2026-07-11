'use client';
import { useState, useEffect } from 'react';
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Navbar from '@/components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, AlertTriangle, CheckCircle, Star, Activity, Waves, Zap, Radar, ChevronLeft, Timer, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Storytelling lines for each level
const STORY_LEVELS = [
  "NIVEL 1 - INFORME TÁCTICO: Hemos interceptado estática anómala proveniente del cuadrante Gamma. El patrón no es ruido de fondo cósmico, es un cifrado primitivo. Sintoniza la frecuencia y amplitud base para limpiar la interferencia y abrir el canal de datos inicial.",
  "NIVEL 2 - INFORME TÁCTICO: La onda principal ha comenzado a rebotar violentamente contra nuestra ionosfera artificial. Esto está provocando un Desfase Cuántico. Necesitas calcular el ángulo exacto y ajustar la fase para alinear el pulso con nuestros receptores ópticos.",
  "NIVEL 3 - INFORME TÁCTICO: ¡Atención! Detectamos resonancia secundaria superpuesta. El origen alienígena está usando un escudo armónico para camuflar el núcleo del mensaje. Bloquea y sincroniza ese armónico antes de que la onda principal se colapse y perdamos el rastro.",
  "NIVEL 4 - INFORME TÁCTICO: Una masiva tormenta de viento solar acaba de golpear nuestros radares. El campo magnético está inyectando picos de estática letales. Busca pacientemente el patrón oculto entre las ráfagas; la amplitud y frecuencia deben ser absolutas.",
  "NIVEL 5 - INFORME TÁCTICO: La señal está siendo distorsionada brutalmente por un Espejismo Gravitacional de un agujero negro cercano. Las leyes de la física normal ya no aplican aquí. Requiere una calibración milimétrica de todas las variables para no ser absorbidos.",
  "NIVEL 6 - INFORME TÁCTICO: El emisor alienígena está utilizando los fuertes latidos electromagnéticos de un púlsar distante como encriptación natural. Sigue el ritmo del púlsar y alinea tu fase perfectamente para desencriptar este latido de energía profunda.",
  "NIVEL 7 - INFORME TÁCTICO: ¡ALERTA CRÍTICA! Hemos entrado en una anomalía del vórtice. Las cuatro variables físicas de transmisión se han desestabilizado y fluctúan agresivamente. Necesitamos que operes como una máquina: ajusta rápido, ajusta preciso, o el enlace morirá.",
  "NIVEL 8 - INFORME TÁCTICO: El mensaje parece reaccionar a nuestros escáneres, creando un bucle inverso o 'Eco de Nebulosa'. Si te pasas un solo hercio de frecuencia, la señal huirá. Afina cada decibelio y radian con frialdad de hielo espacial.",
  "NIVEL 9 - INFORME TÁCTICO: Hemos chocado contra una espesa barrera de Materia Oscura pura. La transmisión es casi completamente inaudible y la absorción de energía es masiva. Requerimos calibración absoluta a ciegas. Demuestra por qué eres el Comandante.",
  "NIVEL 10 - INFORME TÁCTICO: El velo ha caído. Estás frente a la frecuencia núcleo del mismísimo Creador de Órbita-Zero. Esta es la llave maestra de la tecnología alienígena antigua. Alinea el espectro final. ¡La historia de la humanidad depende de este último giro!"
];

export default function DecoderMinigame() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  // Levels
  const [level, setLevel] = useState(1);
  
  // Target Wave parameters (Secret alien signal)
  const [targetAmpli, setTargetAmpli] = useState(30); 
  const [targetFreq, setTargetFreq] = useState(0.040); 
  const [targetPhase, setTargetPhase] = useState(0); 
  const [targetHarm, setTargetHarm] = useState(0);

  // Player controls
  const [ampli, setAmpli] = useState(10);
  const [freq, setFreq] = useState(0.01);
  const [phase, setPhase] = useState(0);
  const [harm, setHarm] = useState(0);
  
  const [isSynced, setIsSynced] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const timerRef = React.useRef(null);

  // Format seconds to MM:SS
  const formatTime = (t) => `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;

  // Chronometer
  useEffect(() => {
    if (gameStarted && !gameComplete) {
      timerRef.current = setInterval(() => setElapsedTime(p => p + 1), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [gameStarted, gameComplete]);

  // Start timer on first slider interaction
  const startGame = () => { if (!gameStarted) setGameStarted(true); };

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  // Generate target based on level
  const generateTargetForLevel = (currentLevel) => {
    // Randomize targets but bound them
    const tA = Math.floor(Math.random() * 50) + 20; // 20 to 70
    const tF = parseFloat((Math.random() * 0.05 + 0.02).toFixed(3)); // 0.02 to 0.07
    let tP = 0;
    let tH = 0;

    if (currentLevel >= 2) {
      tP = Math.floor(Math.random() * 5) + 1; // 1 to 5 radians
    }
    if (currentLevel >= 3) {
      tH = Math.floor(Math.random() * 15) + 5; // 5 to 20
    }
    
    setTargetAmpli(tA);
    setTargetFreq(tF);
    setTargetPhase(tP);
    setTargetHarm(tH);
    setIsSynced(false);
  };

  // Run once on mount
  useEffect(() => {
    generateTargetForLevel(1);
  }, []);

  useEffect(() => {
    // Tolerance tightens as level increases
    const toleranceMulti = Math.max(0.2, 1 - (level * 0.08)); 
    
    const ampliDiff = Math.abs(ampli - targetAmpli);
    const freqDiff = Math.abs(freq - targetFreq);
    const phaseDiff = Math.abs(phase - targetPhase);
    const harmDiff = Math.abs(harm - targetHarm);
    
    // Base tolerances, very tight to force a visual match
    const maxAmpliDiff = 3 * toleranceMulti;
    const maxFreqDiff = 0.002 * toleranceMulti;
    const maxPhaseDiff = 0.15 * toleranceMulti;
    const maxHarmDiff = 1.5 * toleranceMulti;

    const isAmpliOk = ampliDiff <= maxAmpliDiff;
    const isFreqOk = freqDiff <= maxFreqDiff;
    const isPhaseOk = (level < 2) || (phaseDiff <= maxPhaseDiff);
    const isHarmOk = (level < 3) || (harmDiff <= maxHarmDiff);

    if (isAmpliOk && isFreqOk && isPhaseOk && isHarmOk) {
      if (!isSynced) setIsSynced(true);
    } else {
      if (isSynced) setIsSynced(false);
    }
  }, [ampli, freq, phase, harm, targetAmpli, targetFreq, targetPhase, targetHarm, isSynced, level]);

  const advanceLevel = () => {
    if (level < 10) {
      setLevel(l => l + 1);
      generateTargetForLevel(level + 1);
    } else {
      setGameComplete(true);
    }
  };

  // Time-based scoring
  const getTimeBonus = () => Math.max(0, 600 - elapsedTime);
  const getFinalScore = () => (100 * 10) + getTimeBonus(); // Base 1000 + time bonus

  const claimReward = async () => {
    if (!user || rewardClaimed) return;
    const currentStars = userData?.progress?.stars || 0;
    const finalScore = getFinalScore();
    await setDoc(doc(db, 'users', user.uid), {
      progress: {
        stars: currentStars + finalScore
      }
    }, { merge: true });
    // Save to arcade rankings
    await setDoc(doc(db, 'arcadeScores', `decoder_${user.uid}`), {
      score: finalScore,
      time: elapsedTime,
      userId: user.uid,
      displayName: userData?.displayName || 'Cadete',
      gameId: 'decoder',
      timestamp: Date.now()
    });
    setRewardClaimed(true);
  };

  if (loading || !userData) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Iniciando Consola de Mando...</div>;

  // Render SVG Path generator
  const generateWavePath = (a, f, p, h) => {
    let path = 'M 0 ' + (100 - (Math.sin(p) * a + Math.sin(0) * h));
    for (let x = 0; x <= 600; x += 5) {
      const y = 100 - (Math.sin(x * f + p) * a + Math.sin(x * f * 2.5) * h);
      path += ' L ' + x + ' ' + y;
    }
    return path;
  };

  // Determinar qué valores dibujar. Si hay sincronía, usamos los valores objetivo para que el encaje visual sea PERFECTO
  const drawAmpli = isSynced ? targetAmpli : ampli;
  const drawFreq = isSynced ? targetFreq : freq;
  const drawPhase = isSynced ? targetPhase : phase;
  const drawHarm = isSynced ? targetHarm : harm;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#02050a' }}>
      <Navbar />
      
      <main className="layout-container" style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        
        {/* Botón Cerrar Máquina */}
        <div style={{ width: '100%', maxWidth: '800px', display: 'flex', justifyContent: 'flex-start' }}>
          <Link href="/hub/arcade" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(0,228,255,0.8)', textDecoration: 'none', background: 'rgba(0,228,255,0.08)', padding: '0.6rem 1.2rem', borderRadius: '20px', border: '1px solid rgba(0,228,255,0.3)', fontSize: '0.9rem', fontWeight: 'bold', transition: 'all 0.2s' }}>
            <ChevronLeft size={18} /> ← CERRAR MÁQUINA
          </Link>
        </div>

        <div style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--starlight)', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <Radio size={32} /> Interceptación Estelar
          </h1>
          <div style={{ background: 'rgba(0,228,255,0.05)', border: '1px solid var(--electric-blue)', borderRadius: '8px', padding: '1rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <p style={{ color: 'var(--electric-blue)', margin: 0, fontWeight: 'bold' }}>NIVEL DE AMENAZA: {level} / 10</p>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: gameComplete ? '#00FF88' : '#00E4FF', fontSize: '1.1rem', fontWeight: 'bold', fontFamily: 'monospace', background: 'rgba(0,228,255,0.1)', padding: '6px 14px', borderRadius: '8px', border: `1px solid ${gameComplete ? 'rgba(0,255,136,0.4)' : 'rgba(0,228,255,0.3)'}`, textShadow: `0 0 8px ${gameComplete ? '#00FF88' : '#00E4FF'}` }}>
                  <Timer size={16} /> {formatTime(elapsedTime)}
                </span>
              </div>
              {!gameStarted && <p style={{ color: '#00E4FF', margin: '0.5rem 0 0 0', fontSize: '0.85rem', fontWeight: 'bold' }}><Clock size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }}/>El cronómetro inicia al mover un control. ¡Más rápido = más puntos!</p>}
              <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 0 0', fontStyle: 'italic' }}>"{STORY_LEVELS[level-1]}"</p>
           </div>
        </div>

        {/* RADAR SCREEN */}
        <div style={{ 
            width: '100%', 
            maxWidth: '600px', 
            height: '250px', 
            background: '#040b14', 
            borderRadius: '16px', 
            border: isSynced ? '2px solid var(--success)' : '2px solid #172a45',
            boxShadow: isSynced ? '0 0 30px rgba(0,255,136,0.4)' : '0 0 30px rgba(0,228,255,0.1)',
            position: 'relative',
            overflow: 'hidden'
        }}>
           {/* Grid lines */}
           <div style={{ position: 'absolute', width: '100%', height: '100%', backgroundImage: 'linear-gradient(rgba(0,228,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,228,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
           
           {/* Center Line */}
           <div style={{ position: 'absolute', top: '50%', width: '100%', height: '1px', background: 'rgba(0,228,255,0.3)', boxShadow: '0 0 5px var(--electric-blue)' }}></div>

           <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="none" style={{ position: 'relative', zIndex: 1 }}>
              {/* Target Wave (Alien) */}
              <motion.path 
                 d={generateWavePath(targetAmpli, targetFreq, targetPhase, targetHarm)} 
                 fill="none" 
                 stroke="rgba(255, 51, 102, 0.4)" 
                 strokeWidth="5" 
                 strokeDasharray="10 10" 
                 animate={{ strokeDashoffset: [0, 100] }}
                 transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                 style={{ filter: 'drop-shadow(0px 0px 5px rgba(255,51,102,0.8))' }}
              />
              {/* Player Wave */}
              <path 
                d={generateWavePath(drawAmpli, drawFreq, drawPhase, drawHarm)} 
                fill="none" 
                stroke={isSynced ? 'var(--success)' : 'var(--electric-blue)'} 
                strokeWidth="3" 
                style={{ filter: isSynced ? 'drop-shadow(0px 0px 8px rgba(0,255,136,0.8))' : 'drop-shadow(0px 0px 5px rgba(0,228,255,0.5))', transition: 'd 0.3s ease-out' }}
              />
           </svg>

           {isSynced && (
             <motion.div 
               initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
               style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'rgba(0,255,136,0.2)', color: 'var(--success)', padding: '0.5rem 1rem', borderRadius: '8px', zIndex: 2, fontWeight: 'bold', border: '1px solid var(--success)' }}>
               ✓ SINCRONIZACIÓN PERFECTA
             </motion.div>
           )}
        </div>

        {/* CONTROLS */}
        <div className="glass-card" style={{ width: '100%', maxWidth: '600px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'rgba(10, 25, 47, 0.7)' }}>
           
           <div>
             <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ff5722', marginBottom: '0.5rem', fontWeight: 'bold' }}>
               <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity size={18} /> Amplitud (Potencia)</span>
               <span>{ampli} dB</span>
             </div>
             <input type="range" min="10" max="80" step="1" value={ampli} onChange={(e) => { startGame(); setAmpli(Number(e.target.value)); }} style={{ width: '100%', accentColor: '#ff5722' }} />
           </div>

           <div>
             <div style={{ display: 'flex', justifyContent: 'space-between', color: '#00e4ff', marginBottom: '0.5rem', fontWeight: 'bold' }}>
               <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Waves size={18} /> Frecuencia (Oscilación)</span>
               <span>{(freq * 100).toFixed(1)} MHz</span>
             </div>
             <input type="range" min="0.01" max="0.1" step="0.001" value={freq} onChange={(e) => { startGame(); setFreq(Number(e.target.value)); }} style={{ width: '100%', accentColor: '#00e4ff' }} />
           </div>

           {/* Nivel 2+ Control de Fase */}
           {level >= 2 && (
             <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', color: '#b388ff', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                 <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Radar size={18} /> Fase (Desplazamiento)</span>
                 <span>{phase.toFixed(1)} Rad</span>
               </div>
               <input type="range" min="0" max="6.28" step="0.1" value={phase} onChange={(e) => { startGame(); setPhase(Number(e.target.value)); }} style={{ width: '100%', accentColor: '#b388ff' }} />
             </motion.div>
           )}

           {/* Nivel 3+ Control de Armónico */}
           {level >= 3 && (
             <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d4e157', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                 <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Zap size={18} /> Ruido Armónico</span>
                 <span>{harm} Hz</span>
               </div>
               <input type="range" min="0" max="25" step="1" value={harm} onChange={(e) => { startGame(); setHarm(Number(e.target.value)); }} style={{ width: '100%', accentColor: '#d4e157' }} />
             </motion.div>
           )}

        </div>

        {/* NEXT LEVEL / WIN MESSAGE */}
        <AnimatePresence>
          {isSynced && !gameComplete && (
            <motion.div 
               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
               className="glass-card" 
               style={{ width: '100%', maxWidth: '600px', padding: '1.5rem', border: '1px solid var(--success)', background: 'rgba(0,255,136,0.1)', textAlign: 'center' }}
            >
               <h3 style={{ color: 'var(--success)', margin: '0 0 1rem 0' }}>Señal Aislada con Éxito</h3>
               <button className="btn-primary" onClick={advanceLevel} style={{ padding: '0.8rem 2rem', fontSize: '1.1rem', background: 'var(--success)', color: 'black' }}>
                  Avanzar al Siguiente Nivel de Seguridad
               </button>
            </motion.div>
          )}

          {gameComplete && (
            <motion.div 
               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
               className="glass-card" 
               style={{ width: '100%', maxWidth: '600px', padding: '2rem', border: '2px solid var(--gold-star)', background: 'rgba(255,215,0,0.1)', textAlign: 'center' }}
            >
               <h2 style={{ color: 'var(--gold-star)', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                 <Star fill="currentColor" /> DECODIFICACIÓN MAESTRA LOGRADA
               </h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', margin: '1rem 0', flexWrap: 'wrap' }}>
                  <div style={{ background: 'rgba(0,228,255,0.1)', padding: '0.8rem 1.2rem', borderRadius: '12px', border: '1px solid rgba(0,228,255,0.3)', textAlign: 'center' }}>
                    <div style={{ color: '#00E4FF', fontSize: '0.8rem', fontWeight: 'bold' }}>TIEMPO</div>
                    <div style={{ color: 'white', fontSize: '1.3rem', fontFamily: 'monospace', fontWeight: 'bold' }}>{formatTime(elapsedTime)}</div>
                  </div>
                  <div style={{ background: 'rgba(0,255,136,0.1)', padding: '0.8rem 1.2rem', borderRadius: '12px', border: '1px solid rgba(0,255,136,0.3)', textAlign: 'center' }}>
                    <div style={{ color: '#00FF88', fontSize: '0.8rem', fontWeight: 'bold' }}>BONUS TIEMPO</div>
                    <div style={{ color: 'white', fontSize: '1.3rem', fontFamily: 'monospace', fontWeight: 'bold' }}>+{getTimeBonus()}</div>
                  </div>
                  <div style={{ background: 'rgba(255,215,0,0.1)', padding: '0.8rem 1.2rem', borderRadius: '12px', border: '1px solid rgba(255,215,0,0.3)', textAlign: 'center' }}>
                    <div style={{ color: '#FFD700', fontSize: '0.8rem', fontWeight: 'bold' }}>SCORE TOTAL</div>
                    <div style={{ color: 'white', fontSize: '1.3rem', fontFamily: 'monospace', fontWeight: 'bold' }}>{getFinalScore()}</div>
                  </div>
                </div>
               <p style={{ fontFamily: 'monospace', fontSize: '1.1rem', color: 'var(--starlight)', margin: '0 0 1.5rem 0', background: '#000', padding: '1rem', borderRadius: '8px' }}>
                 "BZZZRT... ATENCIÓN COMANDANTE... LOS ASTILLEROS NAVALES ESTÁN OPERATIVOS Y LA AMENAZA FUE NEUTRALIZADA. EL CONOCIMIENTO ALIENÍGENA HA SIDO DESBLOQUEADO."
               </p>

               {rewardClaimed ? (
                 <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,215,0,0.2)', color: 'var(--gold-star)', padding: '0.8rem 1.5rem', borderRadius: '30px', fontWeight: 'bold' }}>
                   ¡{getFinalScore()} Estrellas Transferidas! <Star fill="currentColor" />
                 </div>
               ) : (
                 <button className="btn-primary" onClick={claimReward} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '1.1rem', background: 'var(--gold-star)', color: 'black' }}>
                    Extraer Tecnología ({getFinalScore()} Estrellas) <Star fill="black" size={20} />
                 </button>
               )}
               
               <div style={{ marginTop: '1.5rem' }}>
                 <Link href="/hub/solar-system" className="btn-secondary" style={{ padding: '0.8rem 1.5rem' }}>
                    Volver al Radar Estelar
                 </Link>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}
