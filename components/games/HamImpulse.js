import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Power, CheckCircle, XCircle } from 'lucide-react';

// ─── Particle system for rocket exhaust ───────────────────────────────────────
function useParticles() {
  const [particles, setParticles] = useState([]);
  const idRef = useRef(0);

  const emit = useCallback((x, y, color, count = 5) => {
    const newParticles = Array.from({ length: count }, () => ({
      id: idRef.current++,
      x, y,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 1,
      life: 1,
      size: Math.random() * 6 + 2,
      color,
    }));
    setParticles(prev => [...prev.slice(-40), ...newParticles]);
  }, []);

  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles(prev =>
        prev.map(p => ({ ...p, y: p.y + p.vy, x: p.x + p.vx, life: p.life - 0.03, size: p.size * 0.97 }))
            .filter(p => p.life > 0)
      );
    }, 30);
    return () => clearInterval(interval);
  }, [particles.length]);

  return { particles, emit };
}

// ─── Animated starfield ───────────────────────────────────────────────────────
function Starfield() {
  const stars = useRef(
    Array.from({ length: 60 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.3 + 0.1,
    }))
  ).current;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {stars.map((s, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, 8, 0], opacity: [s.opacity, s.opacity * 1.5, s.opacity] }}
          transition={{ duration: 3 + s.speed * 5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.05 }}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            borderRadius: '50%',
            background: `rgba(180,220,255,${s.opacity})`,
            boxShadow: `0 0 ${s.size * 2}px rgba(100,180,255,${s.opacity * 0.5})`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Phase indicator dots ─────────────────────────────────────────────────────
function PhaseIndicator({ current, total }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', marginTop: '0.8rem' }}>
      {Array.from({ length: total }, (_, i) => (
        <motion.div
          key={i}
          animate={{
            scale: i === current ? [1, 1.3, 1] : 1,
            boxShadow: i < current
              ? '0 0 12px #00FF88, 0 0 20px rgba(0,255,136,0.4)'
              : i === current
                ? '0 0 16px #00E4FF, 0 0 24px rgba(0,228,255,0.5)'
                : '0 0 4px rgba(255,255,255,0.1)',
          }}
          transition={{ duration: 1.5, repeat: i === current ? Infinity : 0, ease: 'easeInOut' }}
          style={{
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: i < current ? '#00FF88' : i === current ? '#00E4FF' : 'rgba(255,255,255,0.15)',
            border: `2px solid ${i < current ? '#00FF88' : i === current ? '#00E4FF' : 'rgba(255,255,255,0.2)'}`,
            transition: 'background 0.3s, border 0.3s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {i < current && <CheckCircle size={10} color="black" />}
        </motion.div>
      ))}
    </div>
  );
}

// ─── Arc Gauge (replaces flat power bar) ──────────────────────────────────────
function ArcGauge({ powerPhase, isPlaying }) {
  const svgSize = 220;
  const center = svgSize / 2;
  const radius = 85;
  const startAngle = -210;
  const endAngle = 30;
  const totalAngle = endAngle - startAngle;

  const polarToCartesian = (angle) => {
    const rad = (angle * Math.PI) / 180;
    return { x: center + radius * Math.cos(rad), y: center + radius * Math.sin(rad) };
  };

  const describeArc = (start, end) => {
    const s = polarToCartesian(start);
    const e = polarToCartesian(end);
    const largeArc = end - start > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${largeArc} 1 ${e.x} ${e.y}`;
  };

  const markerAngle = startAngle + (powerPhase / 100) * totalAngle;
  const markerPos = polarToCartesian(markerAngle);

  // Green zone: 40-60%
  const greenStart = startAngle + (40 / 100) * totalAngle;
  const greenEnd = startAngle + (60 / 100) * totalAngle;

  // Tick marks
  const ticks = Array.from({ length: 21 }, (_, i) => {
    const angle = startAngle + (i / 20) * totalAngle;
    const inner = polarToCartesian(angle);
    const outerR = radius + (i % 5 === 0 ? 12 : 6);
    const outerPos = {
      x: center + outerR * Math.cos((angle * Math.PI) / 180),
      y: center + outerR * Math.sin((angle * Math.PI) / 180),
    };
    return { x1: inner.x, y1: inner.y, x2: outerPos.x, y2: outerPos.y, major: i % 5 === 0 };
  });

  return (
    <svg width={svgSize} height={svgSize} viewBox={`0 0 ${svgSize} ${svgSize}`} style={{ filter: 'drop-shadow(0 0 20px rgba(0,228,255,0.2))' }}>
      {/* Background track */}
      <path d={describeArc(startAngle, endAngle)} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" strokeLinecap="round" />

      {/* Danger zones (red) */}
      <path d={describeArc(startAngle, greenStart)} fill="none" stroke="rgba(255,60,80,0.5)" strokeWidth="8" strokeLinecap="round" />
      <path d={describeArc(greenEnd, endAngle)} fill="none" stroke="rgba(255,60,80,0.5)" strokeWidth="8" strokeLinecap="round" />

      {/* Green zone (pulsing) */}
      <motion.path
        d={describeArc(greenStart, greenEnd)}
        fill="none"
        stroke="#00FF88"
        strokeWidth="10"
        strokeLinecap="round"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ filter: 'drop-shadow(0 0 8px #00FF88)' }}
      />

      {/* Tick marks */}
      {ticks.map((t, i) => (
        <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
          stroke={t.major ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)'}
          strokeWidth={t.major ? 2 : 1} />
      ))}

      {/* Glowing marker orb */}
      {isPlaying && (
        <motion.circle
          cx={markerPos.x}
          cy={markerPos.y}
          r="10"
          fill="white"
          style={{ filter: 'drop-shadow(0 0 12px white) drop-shadow(0 0 20px rgba(255,255,255,0.8))' }}
          animate={{ r: [9, 12, 9] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Center text */}
      <text x={center} y={center + 5} textAnchor="middle" fill="#00E4FF" fontSize="28" fontWeight="bold" fontFamily="monospace">
        {powerPhase}%
      </text>
      <text x={center} y={center + 22} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace" letterSpacing="2">
        POTENCIA
      </text>
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const REQUIRED_WINS = 4;

export default function HamImpulse({ onComplete }) {
  const [powerPhase, setPowerPhase] = useState(0);
  const directionRef = useRef(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [result, setResult] = useState(null);
  const [successCount, setSuccessCount] = useState(0);
  const [speed, setSpeed] = useState(30);
  const [screenFlash, setScreenFlash] = useState(null);
  const { particles, emit } = useParticles();

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setPowerPhase(prev => {
          let next = prev + (4 * directionRef.current);
          if (next >= 100) { directionRef.current = -1; return 100; }
          if (next <= 0) { directionRef.current = 1; return 0; }
          return next;
        });
      }, speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  // Emit exhaust particles while ship has thrust
  useEffect(() => {
    if (successCount === 0 || !isPlaying) return;
    const interval = setInterval(() => {
      emit(50, 75, '#FF6600', 2);
      emit(50, 75, '#FFAA00', 1);
    }, 80);
    return () => clearInterval(interval);
  }, [successCount, isPlaying, emit]);

  const handleLaunch = () => {
    if (!isPlaying) return;
    setIsPlaying(false);

    let res = 'fail';
    if (powerPhase >= 40 && powerPhase <= 60) {
      res = 'perfect';
    }

    setResult(res);
    setScreenFlash(res === 'perfect' ? '#00FF88' : '#FF4444');
    setTimeout(() => setScreenFlash(null), 300);

    // Burst particles on result
    if (res === 'perfect') {
      for (let i = 0; i < 15; i++) emit(50, 40, '#FFD700', 3);
    }

    setTimeout(() => {
      if (res === 'perfect') {
        const newCount = successCount + 1;
        setSuccessCount(newCount);

        if (newCount >= REQUIRED_WINS) {
          if (onComplete) onComplete(100);
        } else {
          setResult(null);
          setSpeed(prev => Math.max(10, prev - 6));
          setIsPlaying(true);
        }
      } else {
        setTimeout(() => {
          setResult(null);
          setIsPlaying(true);
        }, 2000);
      }
    }, 1500);
  };

  const takeoffY = -(successCount * 30);
  const shipScale = 1 + successCount * 0.05;

  return (
    <div style={{
      padding: '2rem',
      background: 'linear-gradient(180deg, #0a0a1a 0%, #0d1025 50%, #0a0a1a 100%)',
      borderRadius: '20px',
      border: '1px solid rgba(0, 228, 255, 0.2)',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 0 40px rgba(0,228,255,0.1), inset 0 0 60px rgba(0,0,0,0.5)',
    }}>
      <Starfield />

      {/* Screen flash effect */}
      <AnimatePresence>
        {screenFlash && (
          <motion.div
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute', inset: 0,
              background: screenFlash,
              zIndex: 100,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* Particles overlay */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5 }}>
        {particles.map(p => (
          <div key={p.id} style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: p.color,
            opacity: p.life,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            transition: 'none',
          }} />
        ))}
      </div>

      {/* Header */}
      <header style={{ position: 'relative', zIndex: 10, marginBottom: '1rem' }}>
        <h3 style={{
          margin: 0,
          color: '#00E4FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          fontSize: '1.3rem',
          fontWeight: 800,
          letterSpacing: '2px',
          textShadow: '0 0 15px rgba(0,228,255,0.5)',
        }}>
          <Rocket size={22} /> SECUENCIA MERCURY-REDSTONE
        </h3>
        <p style={{
          color: 'rgba(200,220,255,0.6)',
          fontSize: '0.85rem',
          marginTop: '0.6rem',
          maxWidth: '400px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          Acierta {REQUIRED_WINS} veces en la zona verde para dar el impulso final
        </p>
        <PhaseIndicator current={successCount} total={REQUIRED_WINS} />
      </header>

      {/* Ship Animation Area */}
      <div style={{
        height: '180px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom: '0.5rem',
        position: 'relative',
        zIndex: 10,
      }}>
        {/* Launch pad glow */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          width: '160px',
          height: '4px',
          background: 'linear-gradient(90deg, transparent, rgba(0,228,255,0.6), transparent)',
          borderRadius: '2px',
          boxShadow: '0 0 15px rgba(0,228,255,0.3)',
        }} />

        {/* Ship with exhaust */}
        <motion.div
          animate={{
            y: takeoffY,
            scale: shipScale,
            x: isPlaying && successCount > 0 ? [0, -1, 1, -0.5, 0.5, 0] : 0,
          }}
          transition={{
            y: { type: 'spring', stiffness: 40, damping: 12 },
            scale: { duration: 0.5 },
            x: { duration: 0.15, repeat: isPlaying ? Infinity : 0, ease: 'linear' },
          }}
          style={{ zIndex: 10, position: 'relative' }}
        >
          <img src="/assets/animales/ham_ship_3d.png" alt="Ham Ship" style={{
            width: '110px',
            height: 'auto',
            filter: successCount > 0 ? 'drop-shadow(0 0 12px rgba(0,228,255,0.5))' : 'none',
            transition: 'filter 0.5s ease',
          }} />

          {/* Multi-layer exhaust flame */}
          {successCount > 0 && (
            <div style={{
              position: 'absolute',
              bottom: '-35px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              {/* White core */}
              <motion.div
                animate={{ height: [15, 25, 18], opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 0.1, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: '8px',
                  background: 'white',
                  borderRadius: '50% 50% 50% 50%',
                  boxShadow: '0 0 8px white',
                  zIndex: 3,
                }}
              />
              {/* Yellow layer */}
              <motion.div
                animate={{ height: [20, 35, 25], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 0.12, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: '16px',
                  background: 'linear-gradient(to bottom, #FFCC00, #FF8800)',
                  borderRadius: '40% 40% 50% 50%',
                  marginTop: '-8px',
                  boxShadow: '0 0 12px #FFAA00',
                  zIndex: 2,
                }}
              />
              {/* Orange outer layer */}
              <motion.div
                animate={{ height: [25, 45, 30], opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 0.15, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: `${20 + successCount * 6}px`,
                  background: 'linear-gradient(to bottom, #FF6600, rgba(255,50,0,0.3), transparent)',
                  borderRadius: '30% 30% 50% 50%',
                  marginTop: '-12px',
                  boxShadow: `0 0 20px rgba(255,100,0,${0.3 + successCount * 0.15})`,
                  zIndex: 1,
                }}
              />
            </div>
          )}
        </motion.div>
      </div>

      {/* Arc Gauge */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center', margin: '-0.5rem 0' }}>
        <ArcGauge powerPhase={powerPhase} isPlaying={isPlaying} />
      </div>

      {/* Launch Button */}
      <motion.button
        onClick={handleLaunch}
        disabled={!isPlaying || successCount >= REQUIRED_WINS}
        whileTap={{ scale: 0.95 }}
        animate={isPlaying ? { boxShadow: ['0 0 20px rgba(0,255,136,0.3)', '0 0 40px rgba(0,255,136,0.6)', '0 0 20px rgba(0,255,136,0.3)'] } : {}}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'relative',
          zIndex: 10,
          background: isPlaying
            ? 'linear-gradient(135deg, #00CC66, #00FF88)'
            : 'rgba(100,100,100,0.5)',
          color: isPlaying ? '#000' : '#666',
          border: 'none',
          padding: '1rem 3rem',
          fontSize: '1.3rem',
          fontWeight: 800,
          borderRadius: '30px',
          cursor: isPlaying ? 'pointer' : 'not-allowed',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.8rem',
          letterSpacing: '2px',
          backdropFilter: 'blur(4px)',
          transition: 'background 0.3s',
        }}
      >
        <Power size={24} /> {isPlaying ? '¡IMPULSO!' : 'CALCULANDO...'}
      </motion.button>

      {/* Result Feedback */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0 }}
            style={{
              position: 'relative',
              zIndex: 10,
              marginTop: '1.2rem',
              minHeight: '40px',
            }}
          >
            {result === 'perfect' && successCount + 1 < REQUIRED_WINS && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                color: '#00FF88',
                fontSize: '1.3rem',
                fontWeight: 'bold',
                textShadow: '0 0 15px rgba(0,255,136,0.6)',
              }}>
                <CheckCircle size={22} /> ¡Impulso exitoso! Aumentando velocidad...
              </div>
            )}
            {result === 'perfect' && successCount + 1 >= REQUIRED_WINS && (
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{
                  color: '#FFD700',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  textShadow: '0 0 20px rgba(255,215,0,0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                }}
              >
                🚀 ¡ÓRBITA ALCANZADA! +100 Polvo Estelar
              </motion.div>
            )}
            {result === 'fail' && (
              <motion.div
                animate={{ x: [-5, 5, -3, 3, 0] }}
                transition={{ duration: 0.3 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  color: '#FF4466',
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  textShadow: '0 0 12px rgba(255,68,102,0.5)',
                }}
              >
                <XCircle size={22} /> Fallo de ignición. Reintentando...
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
