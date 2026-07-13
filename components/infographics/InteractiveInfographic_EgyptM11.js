'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star } from 'lucide-react';

// ─── Content: 8 interactive nodes, rewritten for ages 6-14, Feynman style ────
const INFOGRAPHIC_NODES = [
  {
    id: 'nut',
    emoji: '🌙',
    title: '¿Quién es Nut?',
    color: '#C4A7E7',
    icon: '𓇯',
    content: [
      'Imagina que pudieras ver a una persona gigante estirándose de un lado al otro del cielo. ¡Así veían los antiguos egipcios a Nut (se pronuncia "Nut"), la diosa del cielo!',
      'Los egipcios imaginaban a Nut como una mujer enorme que se arqueaba sobre la Tierra. Sus dedos de los pies tocaban un horizonte y sus manos el otro. Su cuerpo formaba la bóveda del cielo.',
      'Las estrellas eran joyas brillantes pintadas en su piel. Cada noche, Nut se tragaba al Sol por el oeste y lo hacía nacer de nuevo por el este cada mañana. ¡Era como si ella fuera el cielo entero!',
      '¿Sabías que...? Nut aparece pintada dentro de muchos sarcófagos egipcios. Los difuntos eran colocados "dentro del vientre de Nut", esperando renacer como estrellas nuevas. ¡Una idea preciosa!',
    ],
  },
  {
    id: 'nilo-cielo',
    emoji: '🌊',
    title: 'El Nilo del Cielo',
    color: '#7EC8E3',
    icon: '𓈖',
    content: [
      '¿Has visto alguna vez la Vía Láctea en una noche sin luces de ciudad? Es una franja de luz blanca que cruza todo el cielo, como un río de estrellas.',
      'Los egipcios la veían claramente porque vivían en el desierto, sin contaminación lumínica. Para ellos, esa franja brillante era un río celeste: ¡el reflejo del río Nilo en el cielo!',
      'El Nilo era el río más importante de Egipto. Les daba agua, comida y vida. Así que imaginar otro Nilo allá arriba, hecho de estrellas, era una forma hermosa de conectar el cielo con la Tierra.',
      'Dato curioso: En julio y agosto, cuando el Nilo se inundaba y fertilizaba los campos, la Vía Láctea estaba en su posición más visible en el cielo nocturno. ¡El Nilo de arriba y el de abajo coincidían!',
    ],
  },
  {
    id: 'arriba-abajo',
    emoji: '✨',
    title: 'Como es Arriba, es Abajo',
    color: '#FFD700',
    icon: '𓂀',
    content: [
      'Los egipcios tenían una idea muy bonita: lo que pasa en el cielo también pasa en la Tierra. Si ves un río de estrellas arriba, hay un río de agua abajo. Si hay orden en las estrellas, hay orden en el mundo.',
      'Este principio se resume en una frase famosa: "Como es arriba, es abajo." Es como decir que el cielo es un espejo de la Tierra, y la Tierra es un espejo del cielo.',
      'Por eso construían templos alineados con las estrellas. Querían que sus edificios en la Tierra coincidieran exactamente con lo que veían en el cielo. ¡Era su forma de mantener todo en armonía!',
      'Ejemplo fácil: Piensa en cuando ves la Luna reflejada en un lago. Hay una Luna arriba y otra "abajo" en el agua. Los egipcios pensaban que todo el universo funcionaba así.',
    ],
  },
  {
    id: 'orion-piramides',
    emoji: '🔺',
    title: 'Orión y las Pirámides',
    color: '#E8C96A',
    icon: '𓉔',
    content: [
      'Las tres famosas pirámides de Guiza (Keops, Kefrén y Micerino) están alineadas de una forma muy curiosa. En 1994, un investigador llamado Robert Bauval propuso una hipótesis interesante:',
      'Las tres pirámides podrían imitar la posición de las tres estrellas del Cinturón de Orión (Alnitak, Alnilam y Mintaka). Y así como esas estrellas están "a orillas" de la Vía Láctea, las pirámides están a orillas del Nilo.',
      '¡Importante! Esta es una hipótesis, no un hecho comprobado. Algunos científicos la apoyan, pero otros dicen que las coincidencias no son tan exactas. En ciencia, siempre es bueno cuestionar y verificar.',
      'Lo que sí sabemos con certeza es que los egipcios conocían muy bien la constelación de Orión. La asociaban con Osiris, el dios de la resurrección. Y la estrella Sirio (la más brillante del cielo) era la diosa Isis.',
    ],
  },
  {
    id: 'sagitario',
    emoji: '🕳️',
    title: 'El Monstruo del Centro',
    color: '#FF6B6B',
    icon: '𓆣',
    content: [
      '¿Ves la parte más brillante y gorda de la Vía Láctea? Está en la dirección de la constelación de Sagitario. Ahí se esconde algo increíble: ¡un agujero negro supermasivo!',
      'Se llama Sagitario A* (se dice "Sagitario A-estrella") y tiene la masa de 4 millones de soles aplastados en un punto. Es tan poderoso que ni la luz puede escapar de él.',
      'En 2020, los científicos Reinhard Genzel y Andrea Ghez ganaron el Premio Nobel de Física por demostrar que este agujero negro realmente existe. ¡Observaron estrellas dando vueltas alrededor de algo invisible!',
      'Si los egipcios hubieran sabido esto, seguramente habrían dicho que Apofis, la serpiente del caos, estaba ahí en el centro, devorando la luz. ¡La mitología y la ciencia a veces se parecen más de lo que crees!',
    ],
  },
  {
    id: 'viaje-faraon',
    emoji: '👑',
    title: 'El Viaje del Faraón',
    color: '#F5A623',
    icon: '𓋹',
    content: [
      'Dentro de las pirámides más antiguas de Egipto se encontraron los "Textos de las Pirámides", escritos hace unos 4,400 años. ¡Son los textos religiosos más antiguos del mundo!',
      'Estos textos describen un viaje épico: cuando el faraón moría, su alma viajaba por la Vía Láctea (el "campo de las cañas") para reunirse con Osiris en la constelación de Orión.',
      'El faraón era identificado con Osiris, y la reina con Isis (la estrella Sirio). Morir no era el final, sino el comienzo de un viaje cósmico entre las estrellas.',
      'Los techos de las tumbas se pintaban con estrellas doradas sobre fondo azul. El difunto estaba literalmente "dentro del vientre de Nut", protegido por la diosa del cielo mientras esperaba renacer como una nueva estrella.',
    ],
  },
  {
    id: 'navegantes',
    emoji: '⛵',
    title: '¡Navegantes del Nilo!',
    color: '#4ECDC4',
    icon: '𓊝',
    content: [
      'La Vía Láctea no solo era bonita: ¡era útil! Los marineros egipcios que navegaban por el Mediterráneo usaban esa franja de luz para orientarse por la noche.',
      'Combinada con la estrella polar y las constelaciones conocidas, la Vía Láctea era parte del "GPS antiguo" que permitía a los comerciantes navegar desde Egipto hasta Creta, Fenicia y más allá.',
      'En el desierto del Sahara, lejos de cualquier luz artificial, el cielo nocturno es tan oscuro que la Vía Láctea proyecta una sombra tenue sobre el suelo. ¡Una sombra hecha de luz de estrellas!',
      'Dato increíble: Los astrónomos modernos instalan sus telescopios en desiertos remotos por la misma razón que los sacerdotes egipcios observaban desde allí: máxima oscuridad y aire limpio.',
    ],
  },
  {
    id: 'galaxia-numeros',
    emoji: '🔢',
    title: 'Nuestra Galaxia en Números',
    color: '#00E4FF',
    icon: '𓊹',
    content: [
      'La Vía Láctea es ENORME. Tiene entre 100,000 y 200,000 años luz de diámetro. ¿Qué significa eso? Que la luz (lo más rápido que existe) tarda 100,000 años en cruzarla de punta a punta.',
      'Contiene entre 100,000 millones y 400,000 millones de estrellas. Nuestro Sol es solo UNA de ellas. Y nuestro Sol tarda 225 millones de años en dar una sola vuelta alrededor del centro. ¡A eso se le llama "año galáctico"!',
      'La galaxia más cercana a la nuestra es Andrómeda, a 2.5 millones de años luz de distancia. Y más allá hay miles de millones de otras galaxias.',
      '¿Y el nombre "Vía Láctea"? Viene de los griegos. En su mitología, un chorro de leche de la diosa Hera se derramó por el cielo. La palabra griega "galaxias" significa "leche", y de ahí viene la palabra "galaxia". Los egipcios simplemente la llamaban: "el Nilo del cielo". 🌌',
    ],
  },
];

// ─── Animated star field background ──────────────────────────────────────────
function StarField() {
  const starsRef = useRef(
    Array.from({ length: 80 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: Math.random() * 2 + 0.5,
      o: Math.random() * 0.5 + 0.15,
      d: Math.random() * 4 + 2,
    }))
  );
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {starsRef.current.map((st, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [st.o, st.o * 2.5, st.o] }}
          transition={{ duration: st.d, repeat: Infinity, ease: 'easeInOut', delay: i * 0.06 }}
          style={{
            position: 'absolute',
            left: `${st.x}%`,
            top: `${st.y}%`,
            width: `${st.s}px`,
            height: `${st.s}px`,
            borderRadius: '50%',
            background: '#fff',
            boxShadow: `0 0 ${st.s * 3}px rgba(200,220,255,${st.o})`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Nut Silhouette SVG Header ───────────────────────────────────────────────
function NutHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-20px' }}>
      <svg viewBox="0 0 600 120" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(232,201,106,0.3))' }}>
        {/* Nut arching body */}
        <path
          d="M 30 110 Q 80 20, 300 10 Q 520 20, 570 110"
          fill="none"
          stroke="url(#nutGrad)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Stars along Nut's body */}
        {[80, 150, 220, 300, 380, 450, 520].map((cx, i) => {
          const cy = 10 + Math.abs(cx - 300) * 0.15;
          return (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy + 15}
              r="3"
              fill="#FFD700"
              animate={{ opacity: [0.4, 1, 0.4], r: [2, 4, 2] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
              style={{ filter: 'drop-shadow(0 0 6px #FFD700)' }}
            />
          );
        })}
        {/* Hands and feet */}
        <circle cx="30" cy="110" r="5" fill="rgba(232,201,106,0.6)" />
        <circle cx="570" cy="110" r="5" fill="rgba(232,201,106,0.6)" />
        {/* Head */}
        <circle cx="300" cy="8" r="7" fill="rgba(232,201,106,0.8)" style={{ filter: 'drop-shadow(0 0 8px rgba(232,201,106,0.5))' }} />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="nutGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(232,201,106,0.3)" />
            <stop offset="50%" stopColor="rgba(232,201,106,0.9)" />
            <stop offset="100%" stopColor="rgba(232,201,106,0.3)" />
          </linearGradient>
        </defs>
        {/* Title text */}
        <text x="300" y="80" textAnchor="middle" fill="#E8C96A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">
          EL NILO DE NUT
        </text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(232,201,106,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">
          LA VÍA LÁCTEA EN EL ANTIGUO EGIPTO
        </text>
      </svg>
    </div>
  );
}

// ─── Node Button ─────────────────────────────────────────────────────────────
function NodeButton({ node, isActive, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.97 }}
      animate={isActive ? { scale: 1.05, boxShadow: `0 0 25px ${node.color}60, 0 4px 20px rgba(0,0,0,0.4)` } : {}}
      style={{
        background: isActive
          ? `linear-gradient(135deg, ${node.color}25, ${node.color}10)`
          : 'rgba(255,255,255,0.03)',
        border: `2px solid ${isActive ? node.color : 'rgba(232,201,106,0.25)'}`,
        borderRadius: '16px',
        padding: '1.2rem 1rem',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.6rem',
        transition: 'border-color 0.3s, background 0.3s',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Hieroglyphic watermark */}
      <span style={{
        position: 'absolute',
        top: '5px',
        right: '8px',
        fontSize: '1.4rem',
        opacity: 0.08,
        color: node.color,
        fontFamily: 'serif',
        pointerEvents: 'none',
      }}>
        {node.icon}
      </span>

      {/* Emoji icon with glow */}
      <motion.span
        animate={isActive ? { scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          fontSize: '2rem',
          filter: isActive ? `drop-shadow(0 0 8px ${node.color})` : 'none',
          lineHeight: 1,
        }}
      >
        {node.emoji}
      </motion.span>

      {/* Title */}
      <span style={{
        color: isActive ? node.color : 'rgba(255,255,255,0.75)',
        fontSize: '0.85rem',
        fontWeight: 700,
        letterSpacing: '0.5px',
        textAlign: 'center',
        lineHeight: 1.3,
        transition: 'color 0.3s',
      }}>
        {node.title}
      </span>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          style={{
            position: 'absolute',
            bottom: 0,
            left: '20%',
            right: '20%',
            height: '3px',
            background: node.color,
            borderRadius: '3px 3px 0 0',
            boxShadow: `0 0 10px ${node.color}`,
          }}
        />
      )}
    </motion.button>
  );
}

// ─── Content Panel ───────────────────────────────────────────────────────────
function ContentPanel({ node, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      style={{
        background: 'rgba(15, 15, 40, 0.85)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${node.color}40`,
        borderRadius: '20px',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `0 0 40px ${node.color}15, 0 8px 32px rgba(0,0,0,0.5)`,
      }}
    >
      {/* Decorative corner accents */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '50px', height: '50px', borderTop: `2px solid ${node.color}50`, borderLeft: `2px solid ${node.color}50`, borderRadius: '20px 0 0 0' }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '50px', height: '50px', borderBottom: `2px solid ${node.color}50`, borderRight: `2px solid ${node.color}50`, borderRadius: '0 0 20px 0' }} />

      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'rgba(255,255,255,0.6)',
          transition: 'all 0.2s',
          zIndex: 5,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
      >
        <X size={16} />
      </button>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
        <span style={{
          fontSize: '2.5rem',
          filter: `drop-shadow(0 0 12px ${node.color})`,
          lineHeight: 1,
        }}>
          {node.emoji}
        </span>
        <div>
          <h3 style={{
            margin: 0,
            color: node.color,
            fontSize: '1.3rem',
            fontWeight: 800,
            letterSpacing: '0.5px',
          }}>
            {node.title}
          </h3>
          <span style={{
            fontSize: '1.2rem',
            opacity: 0.12,
            fontFamily: 'serif',
            color: node.color,
          }}>
            {node.icon} {node.icon} {node.icon}
          </span>
        </div>
      </div>

      {/* Content paragraphs with staggered animation */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {node.content.map((paragraph, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12, duration: 0.4 }}
          >
            {paragraph.startsWith('¿Sabías') || paragraph.startsWith('Dato') || paragraph.startsWith('¡Importante') || paragraph.startsWith('Ejemplo') || paragraph.startsWith('Dato increíble') || paragraph.startsWith('Dato curioso') ? (
              <div style={{
                background: `${node.color}10`,
                border: `1px solid ${node.color}30`,
                borderRadius: '12px',
                padding: '1rem 1.2rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.6rem',
              }}>
                <Sparkles size={18} color={node.color} style={{ flexShrink: 0, marginTop: '2px' }} />
                <p style={{
                  margin: 0,
                  fontSize: '0.95rem',
                  lineHeight: 1.75,
                  color: 'rgba(255,255,255,0.9)',
                  fontStyle: 'italic',
                }}>
                  {paragraph}
                </p>
              </div>
            ) : (
              <p style={{
                margin: 0,
                fontSize: '1rem',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.85)',
                paddingLeft: i === 0 ? 0 : '0.5rem',
                borderLeft: i === 0 ? 'none' : `2px solid ${node.color}20`,
              }}>
                {paragraph}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Progress bar ────────────────────────────────────────────────────────────
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(232,201,106,0.15)',
    }}>
      <Star size={14} color="#E8C96A" />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #E8C96A, #FFD700)',
            borderRadius: '3px',
            boxShadow: '0 0 8px rgba(232,201,106,0.4)',
          }}
        />
      </div>
      <span style={{
        fontSize: '0.75rem',
        color: '#E8C96A',
        fontFamily: 'monospace',
        fontWeight: 'bold',
        minWidth: '45px',
        textAlign: 'right',
      }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_EgyptM11() {
  const [activeNode, setActiveNode] = useState(null);
  const [explored, setExplored] = useState(new Set());

  const handleNodeClick = (nodeId) => {
    if (activeNode === nodeId) {
      setActiveNode(null);
    } else {
      setActiveNode(nodeId);
      setExplored(prev => new Set([...prev, nodeId]));
    }
  };

  const activeData = INFOGRAPHIC_NODES.find(n => n.id === activeNode);

  return (
    <div style={{
      background: 'linear-gradient(180deg, #0B0E2D 0%, #1A1040 40%, #0B0E2D 100%)',
      borderRadius: '24px',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(232,201,106,0.12)',
      boxShadow: '0 0 60px rgba(11,14,45,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <StarField />

      {/* Nut header */}
      <NutHeader />

      {/* Progress */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {/* Instruction */}
      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center',
            color: 'rgba(232,201,106,0.7)',
            fontSize: '0.85rem',
            marginBottom: '1rem',
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
          }}
        >
          <ChevronRight size={14} /> Haz clic en cada tema para explorar <ChevronRight size={14} />
        </motion.p>
      )}

      {/* Nodes Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
        gap: '0.8rem',
        position: 'relative',
        zIndex: 2,
        marginBottom: '1.5rem',
      }}>
        {INFOGRAPHIC_NODES.map(node => (
          <NodeButton
            key={node.id}
            node={node}
            isActive={activeNode === node.id}
            onClick={() => handleNodeClick(node.id)}
          />
        ))}
      </div>

      {/* Expanded Content Panel */}
      <AnimatePresence mode="wait">
        {activeData && (
          <ContentPanel
            key={activeData.id}
            node={activeData}
            onClose={() => setActiveNode(null)}
          />
        )}
      </AnimatePresence>

      {/* Completion message */}
      <AnimatePresence>
        {explored.size === INFOGRAPHIC_NODES.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center',
              marginTop: '1.5rem',
              padding: '1rem',
              background: 'rgba(232,201,106,0.08)',
              borderRadius: '16px',
              border: '1px solid rgba(232,201,106,0.25)',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#FFD700', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has explorado todos los secretos del Nilo de Nut!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Navegante Galáctico
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
