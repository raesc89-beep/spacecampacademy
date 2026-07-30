'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
// â”€â”€â”€ SVG Decorative Elements â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoPyramidBeam({ size = 80, color = '#F0A500', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" style={{ opacity: 0.22, ...style }}>
      <polygon points="40,4 70,72 10,72" fill="none" stroke={color} strokeWidth="2" />
      {/* Beam of light from apex */}
      <line x1="40" y1="4" x2="40" y2="-10" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
      <line x1="40" y1="4" x2="30" y2="-8" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="40" y1="4" x2="50" y2="-8" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Star at top */}
      <circle cx="40" cy="0" r="3" fill={color} opacity="0.5" />
      {/* Internal chamber */}
      <rect x="34" y="40" width="12" height="8" rx="1" fill={color} opacity="0.15" />
      <line x1="40" y1="48" x2="40" y2="72" stroke={color} strokeWidth="0.8" opacity="0.2" />
      {/* Shaft lines */}
      <line x1="37" y1="44" x2="20" y2="20" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
      <line x1="43" y1="44" x2="60" y2="20" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
    </svg>
  );
}

function DecoOrionBelt({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 70 70" style={{ opacity: 0.2, ...style }}>
      {/* Three belt stars */}
      <circle cx="15" cy="30" r="4" fill={color} opacity="0.7" />
      <circle cx="35" cy="28" r="5" fill={color} opacity="0.8" />
      <circle cx="55" cy="32" r="4" fill={color} opacity="0.7" />
      {/* Belt line */}
      <line x1="15" y1="30" x2="55" y2="32" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Orion body outline */}
      <circle cx="35" cy="12" r="3" fill={color} opacity="0.4" />
      <line x1="35" y1="15" x2="35" y2="25" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="35" y1="18" x2="20" y2="14" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="35" y1="18" x2="50" y2="14" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="35" y1="35" x2="22" y2="50" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="35" y1="35" x2="48" y2="50" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Glow halos */}
      {[{x:15,y:30},{x:35,y:28},{x:55,y:32}].map((s,i) => (
        <circle key={i} cx={s.x} cy={s.y} r="8" fill={color} opacity="0.08" />
      ))}
    </svg>
  );
}

function DecoCompass({ size = 60, color = '#F0A500', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      <circle cx="30" cy="30" r="26" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      {/* Cardinal points */}
      <text x="30" y="10" textAnchor="middle" fill={color} fontSize="8" fontWeight="bold" opacity="0.6">N</text>
      <text x="30" y="56" textAnchor="middle" fill={color} fontSize="7" opacity="0.4">S</text>
      <text x="5" y="33" textAnchor="middle" fill={color} fontSize="7" opacity="0.4">W</text>
      <text x="55" y="33" textAnchor="middle" fill={color} fontSize="7" opacity="0.4">E</text>
      {/* Needle */}
      <polygon points="30,12 27,30 30,28 33,30" fill={color} opacity="0.5" />
      <polygon points="30,48 27,30 30,32 33,30" fill={color} opacity="0.2" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoStarShaft({ size = 70, color = '#FFB347', style = {} }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 60 72" style={{ opacity: 0.2, ...style }}>
      {/* Shaft / corridor */}
      <rect x="24" y="8" width="12" height="56" rx="2" fill={color} opacity="0.1" stroke={color} strokeWidth="1" />
      {/* Star at top */}
      <circle cx="30" cy="4" r="4" fill={color} opacity="0.6" />
      <circle cx="30" cy="4" r="7" fill={color} opacity="0.15" />
      {/* Light rays going down */}
      <line x1="30" y1="8" x2="30" y2="64" stroke={color} strokeWidth="0.5" strokeDasharray="3 4" opacity="0.3" />
      <line x1="27" y1="10" x2="27" y2="60" stroke={color} strokeWidth="0.3" opacity="0.15" />
      <line x1="33" y1="10" x2="33" y2="60" stroke={color} strokeWidth="0.3" opacity="0.15" />
      {/* Observer eye at bottom */}
      <ellipse cx="30" cy="66" rx="6" ry="3" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="30" cy="66" r="2" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoMuon({ size = 60, color = '#4FC3F7', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Particle tracks */}
      <line x1="10" y1="5" x2="30" y2="30" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <line x1="50" y1="8" x2="30" y2="30" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="30" y1="30" x2="15" y2="55" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="30" y1="30" x2="48" y2="50" stroke={color} strokeWidth="1.2" opacity="0.5" />
      {/* Interaction point */}
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.4" />
      <circle cx="30" cy="30" r="8" fill="none" stroke={color} strokeWidth="0.8" opacity="0.2" />
      {/* Particle dots */}
      {[{x:10,y:5},{x:50,y:8},{x:15,y:55},{x:48,y:50}].map((p,i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2" fill={color} opacity="0.5" />
      ))}
    </svg>
  );
}

function DecoStoneBlocks({ size = 80, color = '#D4A843', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.18, ...style }}>
      {/* Stone block rows */}
      <rect x="2" y="36" width="24" height="10" rx="1" fill={color} opacity="0.3" stroke={color} strokeWidth="0.5" />
      <rect x="28" y="36" width="20" height="10" rx="1" fill={color} opacity="0.25" stroke={color} strokeWidth="0.5" />
      <rect x="50" y="36" width="28" height="10" rx="1" fill={color} opacity="0.3" stroke={color} strokeWidth="0.5" />
      <rect x="5" y="25" width="22" height="10" rx="1" fill={color} opacity="0.25" stroke={color} strokeWidth="0.5" />
      <rect x="29" y="25" width="26" height="10" rx="1" fill={color} opacity="0.3" stroke={color} strokeWidth="0.5" />
      <rect x="57" y="25" width="18" height="10" rx="1" fill={color} opacity="0.2" stroke={color} strokeWidth="0.5" />
      <rect x="14" y="14" width="20" height="10" rx="1" fill={color} opacity="0.2" stroke={color} strokeWidth="0.5" />
      <rect x="36" y="14" width="18" height="10" rx="1" fill={color} opacity="0.25" stroke={color} strokeWidth="0.5" />
      <rect x="28" y="4" width="18" height="9" rx="1" fill={color} opacity="0.2" stroke={color} strokeWidth="0.5" />
    </svg>
  );
}

function DecoAnkh({ size = 60, color = '#F0A500', style = {} }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 40 56" style={{ opacity: 0.2, ...style }}>
      <ellipse cx="20" cy="12" rx="10" ry="12" fill="none" stroke={color} strokeWidth="3" />
      <line x1="20" y1="24" x2="20" y2="52" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="8" y1="34" x2="32" y2="34" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function DecoEye({ size = 80, color = '#F0A500', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.2, ...style }}>
      <path d="M10 24 Q40 0 70 24 Q40 48 10 24Z" fill="none" stroke={color} strokeWidth="2.5" />
      <circle cx="40" cy="24" r="8" fill={color} opacity="0.4" />
      <circle cx="40" cy="24" r="4" fill={color} opacity="0.7" />
      <path d="M40 32 Q35 42 28 46" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="46" x2="22" y2="44" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'conductos': [DecoPyramidBeam, DecoStarShaft, DecoOrionBelt],
  'estrellas-laser': [DecoStarShaft, DecoOrionBelt, DecoPyramidBeam],
  'precision': [DecoCompass, DecoPyramidBeam, DecoStarShaft],
  'orion-piramides': [DecoOrionBelt, DecoPyramidBeam, DecoCompass],
  'constructores': [DecoStoneBlocks, DecoAnkh, DecoCompass],
  'scan-pyramids': [DecoMuon, DecoPyramidBeam, DecoStarShaft],
  'temperatura': [DecoPyramidBeam, DecoStoneBlocks, DecoEye],
  'legado-giza': [DecoOrionBelt, DecoAnkh, DecoCompass],
};

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Lehner, M. (1997). The Complete Pyramids, Thames & Hudson',
  'Bauval, R. & Gilbert, A. (1994). The Orion Mystery, Crown',
  'Morishima, K. et al. (2017). Discovery of a big void in Khufu\'s Pyramid by muon tomography, Nature, 552',
  'Dash, G. (2018). New angles on the Great Pyramid, AERA',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'conductos',
    title: 'Los Conductos Secretos',
    color: '#F0A500',
    btnImage: '/assets/egypt/infographic_giza/btn_conductos.png',
    image: '/assets/egypt/infographic_giza/hero_conductos.png',
    content: [
      'Imagina que estÃ¡s dentro de la pirÃ¡mide mÃ¡s grande del mundo, en una habitaciÃ³n de piedra oscura y silenciosa. Si levantas la vista, ves cuatro tÃºneles estrechos que salen de las paredes y se pierden en la oscuridad. Durante mÃ¡s de cien aÃ±os, todo el mundo pensÃ³ que eran simples "conductos de ventilaciÃ³n" para que entrara aire fresco. Â¡Pero resulta que eran algo mucho mÃ¡s increÃ­ble!',
      'La Gran PirÃ¡mide de Guiza tiene cuatro de estos tÃºneles angostos (de apenas 20 cm de ancho) que salen de la CÃ¡mara del Rey y de la CÃ¡mara de la Reina. Son como tubos largos que atraviesan decenas de metros de piedra maciza hasta llegar al exterior. Imagina un tubo de cartÃ³n largo y estrecho: si miras por un extremo, solo ves un pedacito de cielo. Eso es exactamente lo que hacen estos conductos.',
      'Cuando los astrÃ³nomos Kate Spence y Robert Bauval calcularon las posiciones de las estrellas en el aÃ±o 2450 a.C. (Â¡cuando se construyÃ³ la pirÃ¡mide!), descubrieron algo asombroso: Â¡cada conducto apuntaba directamente a una estrella importante! No eran conductos de aire... Â¡eran telescopios de piedra apuntando al cosmos!',
      'Los constructores de la pirÃ¡mide diseÃ±aron cada conducto con un Ã¡ngulo preciso para que, desde la cÃ¡mara interior, una persona pudiera ver exactamente una estrella especÃ­fica a travÃ©s del tÃºnel. Es como cuando miras por el tubo de un telescopio y ves exactamente un puntito de luz: estos tÃºneles hacÃ­an lo mismo, pero estaban hechos de millones de bloques de piedra.',
      'Los cientÃ­ficos modernos han verificado estas alineaciones usando software de simulaciÃ³n astronÃ³mica que puede "rebobinar" el cielo 4,500 aÃ±os. Las posiciones coinciden con una precisiÃ³n sorprendente. Estos conductos eran, literalmente, canales de comunicaciÃ³n cÃ³smica entre el faraÃ³n en el interior de la pirÃ¡mide y los dioses que vivÃ­an en las estrellas.',
    ],
    fact: 'Los conductos miden apenas 20 Ã— 20 cm, el tamaÃ±o de una caja de zapatos. A pesar de ser tan pequeÃ±os, atraviesan mÃ¡s de 60 metros de piedra maciza con un Ã¡ngulo constante. Si el Ã¡ngulo variara solo 1 grado, Â¡la estrella objetivo se perderÃ­a por completo! Los ingenieros egipcios mantuvieron la precisiÃ³n metro tras metro durante toda la construcciÃ³n.',
  },
  {
    id: 'estrellas-laser',
    title: 'El LÃ¡ser Estelar',
    color: '#FFD700',
    btnImage: '/assets/egypt/infographic_giza/btn_laser.png',
    image: '/assets/egypt/infographic_giza/hero_laser.png',
    content: [
      'Â¿Hacia quÃ© estrellas apuntaban estos "lÃ¡seres de piedra"? Cada conducto tenÃ­a un destino celestial diferente, y cada uno contaba una historia sobre la vida despuÃ©s de la muerte del faraÃ³n. Para los egipcios, morir no era el final: era el comienzo de un viaje a las estrellas.',
      'El conducto norte de la CÃ¡mara del Rey apuntaba hacia Thuban, que en el aÃ±o 2450 a.C. era la Estrella Polar. Hoy esa posiciÃ³n la ocupa Polaris, pero hace 4,500 aÃ±os, Thuban (en la constelaciÃ³n de Draco) era el punto fijo alrededor del cual giraba todo el cielo nocturno. Apuntar hacia ella significaba seÃ±alar el centro del universo.',
      'El conducto sur de la CÃ¡mara del Rey apuntaba hacia Alnitak (Zeta Orionis), la estrella mÃ¡s baja del CinturÃ³n de OriÃ³n. Para los egipcios, OriÃ³n era la constelaciÃ³n sagrada de Osiris, el dios de la muerte y la resurrecciÃ³n. Este conducto era el camino por donde el alma del faraÃ³n viajaba para reunirse con Osiris en el cielo.',
      'El conducto sur de la CÃ¡mara de la Reina apuntaba directamente a Sirio, la estrella mÃ¡s brillante del cielo nocturno. Sirio era la estrella de la diosa Isis (esposa de Osiris), y su primera apariciÃ³n cada aÃ±o marcaba el comienzo de la inundaciÃ³n del Nilo y el AÃ±o Nuevo egipcio. Â¡Una estrella que les avisaba de que el rÃ­o iba a crecer!',
      'El conducto norte de la CÃ¡mara de la Reina apuntaba a Kochab, una estrella en la Osa Menor. La combinaciÃ³n de los cuatro conductos creaba un mapa cÃ³smico completo: norte y sur, masculino y femenino, vida y muerte, Osiris e Isis. Era como tener cuatro flechas que apuntaban a los cuatro pilares del universo egipcio.',
    ],
    fact: 'Thuban fue la estrella polar durante mÃ¡s de 2,000 aÃ±os. Debido a un fenÃ³meno llamado "precesiÃ³n", el eje de la Tierra se mueve como un trompo lento, completando un giro cada 26,000 aÃ±os. Esto significa que diferentes estrellas "toman el turno" de ser la estrella polar. Â¡En el aÃ±o 14,000 d.C., serÃ¡ Vega la estrella polar!',
  },
  {
    id: 'precision',
    title: 'PrecisiÃ³n Imposible',
    color: '#4CAF50',
    btnImage: '/assets/egypt/infographic_giza/btn_precision.png',
    image: '/assets/egypt/infographic_giza/hero_precision.png',
    content: [
      'AquÃ­ viene lo que deja a los cientÃ­ficos con la boca abierta: Â¿cÃ³mo lograron semejante precisiÃ³n sin computadoras, sin telescopios modernos y sin GPS? La respuesta es tan simple como genial: usaban dos estrellas y una cuerda con un peso.',
      'El mÃ©todo, reconstruido por la astrÃ³noma Kate Spence de la Universidad de Cambridge, funcionaba asÃ­: los astrÃ³nomos egipcios observaban dos estrellas circumpolares especÃ­ficas (Mizar y Kochab). En un momento preciso de cada noche, estas dos estrellas se alinean perfectamente en vertical. Cuando eso ocurrÃ­a, Â¡marcaban el Norte verdadero con error de solo 2 minutos de arco!',
      'Para que entiendas lo preciso que es: 2 minutos de arco es aproximadamente 1/15 del ancho de la Luna llena vista desde la Tierra. Los egipcios podÃ­an apuntar a una direcciÃ³n del cielo con un error menor que una moneda vista desde 50 metros de distancia. Todo esto con un palo, una cuerda y sus propios ojos.',
      'El instrumento se llamaba "merkhet" (que significa "instrumento de conocimiento"). Era simplemente una plomada: una cuerda con un peso que cuelga perfectamente vertical por la gravedad. Alineando dos merkhets con una estrella, determinaban el meridiano exacto (la lÃ­nea norte-sur). Otro instrumento, el "bay" (una palma de palmera con una ranura en V), servÃ­a para apuntar.',
      'La base de la Gran PirÃ¡mide mide 230.4 metros de lado, y la diferencia entre el lado mÃ¡s largo y el mÃ¡s corto es de solo 4.4 centÃ­metros. Eso es un error de apenas 0.02%, menos que el grosor de tu dedo meÃ±ique. Para lograr esa precisiÃ³n en un edificio de 147 metros de alto y 2.3 millones de bloques de piedra se necesita una maestrÃ­a matemÃ¡tica que todavÃ­a asombra a los ingenieros modernos.',
    ],
    fact: 'Los cuatro lados de la Gran PirÃ¡mide estÃ¡n orientados casi perfectamente hacia los cuatro puntos cardinales, con un error de solo 3 minutos y 6 segundos de arco respecto al Norte verdadero. Cuando la pirÃ¡mide se terminÃ³ de construir (ca. 2450 a.C.), ese error era probablemente de cero: la pequeÃ±a desviaciÃ³n se debe a la precesiÃ³n terrestre acumulada durante 4,500 aÃ±os.',
  },
  {
    id: 'orion-piramides',
    title: 'OriÃ³n en la Tierra',
    color: '#9B6BFF',
    btnImage: '/assets/egypt/infographic_giza/btn_orion.png',
    image: '/assets/egypt/infographic_giza/hero_orion.png',
    content: [
      'Si pudieras flotar sobre la meseta de Guiza y mirar hacia abajo, verÃ­as algo curioso: las tres pirÃ¡mides no estÃ¡n en lÃ­nea recta. Dos de ellas (Keops y KefrÃ©n) estÃ¡n casi perfectamente alineadas, pero la tercera (Micerinos) estÃ¡ ligeramente desplazada hacia un lado. Â¿Error de construcciÃ³n? Â¡Para nada!',
      'El ingeniero Robert Bauval propuso en 1994 la "TeorÃ­a de la CorrelaciÃ³n de OriÃ³n": las tres pirÃ¡mides de Guiza imitan la disposiciÃ³n de las tres estrellas del CinturÃ³n de OriÃ³n (Alnitak, Alnilam y Mintaka). Dos estrellas del cinturÃ³n estÃ¡n alineadas, y la tercera estÃ¡ ligeramente desplazada, exactamente como las pirÃ¡mides.',
      'La teorÃ­a dice que los egipcios construyeron una copia del cielo en la tierra. OriÃ³n representaba a Osiris, dios de la muerte y la resurrecciÃ³n, y la VÃ­a LÃ¡ctea representaba el Nilo celestial. Las pirÃ¡mides serÃ­an "espejos" de las estrellas, conectando la tierra con el cielo para que el faraÃ³n pudiera ascender fÃ¡cilmente al reino de los dioses.',
      'Esta teorÃ­a es debatida entre los cientÃ­ficos: algunos la apoyan con entusiasmo y otros seÃ±alan que la correlaciÃ³n no es perfecta si se analiza con detalle. Lo que sÃ­ es un hecho comprobado es que el conducto sur de la CÃ¡mara del Rey apunta directamente a Alnitak (la estrella inferior del CinturÃ³n de OriÃ³n), lo cual confirma la importancia de OriÃ³n para los constructores.',
      'Ya sea que la correlaciÃ³n completa sea intencional o coincidencia, un hecho es innegable: los constructores de Guiza tenÃ­an un conocimiento astronÃ³mico profundo y lo integraron deliberadamente en la arquitectura de sus monumentos. Las pirÃ¡mides no eran simples tumbas; eran mÃ¡quinas cÃ³smicas diseÃ±adas para conectar la tierra con las estrellas.',
    ],
    fact: 'El nombre egipcio de OriÃ³n era "Sah", y era considerado la manifestaciÃ³n celestial de Osiris. Cada aÃ±o, cuando OriÃ³n "resucitaba" (aparecÃ­a por primera vez despuÃ©s de 70 dÃ­as de invisibilidad), los sacerdotes celebraban el renacimiento de Osiris. Los 70 dÃ­as de invisibilidad de OriÃ³n corresponden casi exactamente con los 70 dÃ­as del proceso de momificaciÃ³n. Â¡No es coincidencia!',
  },
  {
    id: 'constructores',
    title: 'Los Constructores',
    color: '#FF7043',
    btnImage: '/assets/egypt/infographic_giza/btn_constructores.png',
    image: '/assets/egypt/infographic_giza/hero_constructores.png',
    content: [
      'Hay un mito que necesitamos destruir ahora mismo: Â¡los constructores de las pirÃ¡mides NO eran esclavos! Durante siglos se creyÃ³ la historia de que miles de esclavos fueron obligados a arrastrar piedras bajo el sol ardiente. Pero la evidencia arqueolÃ³gica moderna cuenta una historia completamente diferente.',
      'Los papiros y las marcas en los bloques de piedra revelan que los constructores eran obreros asalariados, organizados en equipos con nombres geniales como "Los Amigos de Keops" o "Los Borrachos de Micerinos" (Â¡sÃ­, de verdad se llamaban asÃ­!). Trabajaban por turnos, tenÃ­an dÃ­as de descanso, buena alimentaciÃ³n y hasta seguro mÃ©dico.',
      'Los esqueletos encontrados en el cementerio de los trabajadores cerca de las pirÃ¡mides muestran huesos que se rompieron y sanaron correctamente gracias a cirugÃ­a. Los doctores egipcios les ponÃ­an fÃ©rulas y los cuidaban hasta que se recuperaban. Un esclavo no recibirÃ­a esa atenciÃ³n. Estos trabajadores eran valorados y respetados.',
      'El arquitecto jefe fue muy probablemente Hemiunu, sobrino del faraÃ³n Keops. Su estatua, descubierta en Guiza, lo muestra como un hombre corpulento y seguro de sÃ­ mismo. Coordinaba miles de trabajadores, decenas de ingenieros y el suministro de materiales durante dÃ©cadas. Era el equivalente antiguo al director de la NASA.',
      'El papiro de Wadi el-Jarf, descubierto en 2013, es el diario real de un supervisor llamado Merer que dirigÃ­a un equipo de transportistas. Describe en detalle cÃ³mo transportaban los enormes bloques de granito desde AsuÃ¡n (Â¡a 800 km de distancia!) usando barcazas en el Nilo capaces de cargar 60 toneladas. Es el "registro de vuelo" mÃ¡s antiguo del mundo.',
    ],
    fact: 'La Gran PirÃ¡mide tiene 2.3 millones de bloques de piedra caliza, con un peso promedio de 2.5 toneladas cada uno. Si los apilases uno encima de otro, llegarÃ­an a una altura de 4,600 km, Â¡mÃ¡s de la mitad de la distancia a la Luna! Los bloques de granito de las cÃ¡maras internas pesan hasta 80 toneladas y fueron transportados desde canteras a 800 km de distancia.',
  },
  {
    id: 'scan-pyramids',
    title: 'Muones CÃ³smicos',
    color: '#4FC3F7',
    btnImage: '/assets/egypt/infographic_giza/btn_muones.png',
    image: '/assets/egypt/infographic_giza/hero_muones.png',
    content: [
      'En 2015, un equipo internacional de cientÃ­ficos empezÃ³ a "radiografiar" las pirÃ¡mides de Guiza usando una tecnologÃ­a que parece ciencia ficciÃ³n: Â¡partÃ­culas subatÃ³micas que llueven desde el espacio! El proyecto se llamÃ³ ScanPyramids, y usÃ³ los muones cÃ³smicos para ver dentro de la pirÃ¡mide sin tocar una sola piedra.',
      'Los muones son partÃ­culas que se crean cuando los rayos cÃ³smicos (partÃ­culas de alta energÃ­a que viajan por el universo) chocan contra la atmÃ³sfera terrestre. Estos muones atraviesan casi todo: edificios, montaÃ±as, pirÃ¡mides... Pero cuando encuentran piedra densa, algunos se frenan y desaparecen. Si hay una cavidad vacÃ­a, mÃ¡s muones la atraviesan.',
      'Es como hacer una radiografÃ­a gigante: asÃ­ como los rayos X atraviesan tu cuerpo pero se detienen en los huesos (por eso ves los huesos blancos en la imagen), los muones atraviesan la pirÃ¡mide pero se frenan en la piedra. Si un detector dentro de la pirÃ¡mide recibe mÃ¡s muones de lo esperado en cierta direcciÃ³n, Â¡significa que hay un espacio vacÃ­o por ahÃ­!',
      'En 2017, los cientÃ­ficos anunciaron un descubrimiento sensacional: una cavidad oculta de al menos 30 metros de largo encima de la Gran GalerÃ­a. Nadie sabÃ­a que existÃ­a esta "habitaciÃ³n secreta". Es tan grande como un aviÃ³n de pasajeros y ha estado oculta durante 4,500 aÃ±os. TodavÃ­a no sabemos quÃ© hay dentro ni para quÃ© servÃ­a.',
      'AdemÃ¡s de los muones, ScanPyramids usÃ³ termografÃ­a infrarroja (que detecta diferencias de temperatura en la superficie) y fotogrametrÃ­a 3D. La termografÃ­a revelÃ³ que hay zonas en la cara norte de la pirÃ¡mide que estÃ¡n mÃ¡s calientes que las demÃ¡s, lo que sugiere que hay cÃ¡maras o corredores detrÃ¡s de la piedra que aÃºn no hemos encontrado. Â¡La pirÃ¡mide sigue guardando secretos!',
    ],
    fact: 'Cada minuto, unos 10,000 muones atraviesan cada metro cuadrado de tu cuerpo. Â¡Ahora mismo, mientras lees esto, millones de muones estÃ¡n pasando a travÃ©s de ti! Son completamente inofensivos. Los cientÃ­ficos de ScanPyramids colocaron detectores especiales dentro de la pirÃ¡mide durante meses para contar los muones y crear un "mapa de vacÃ­os" del interior.',
  },
  {
    id: 'temperatura',
    title: 'La PirÃ¡mide Termo',
    color: '#E57373',
    btnImage: '/assets/egypt/infographic_giza/btn_temperatura.png',
    image: '/assets/egypt/infographic_giza/hero_temperatura.png',
    content: [
      'Â¿SabÃ­as que la Gran PirÃ¡mide es como un termo gigante? La temperatura en su interior se mantiene constante a 20Â°C durante todo el aÃ±o, sin importar si afuera hace 40Â°C de calor en verano o baja a 5Â°C en las noches de invierno. Â¡Es como tener aire acondicionado natural desde hace 4,500 aÃ±os!',
      'Esto funciona por el mismo principio que mantiene las cuevas frescas en verano y tibias en invierno: la enorme masa de piedra actÃºa como un "amortiguador tÃ©rmico". Los 6.5 millones de toneladas de piedra caliza absorben el calor del dÃ­a muy lentamente y lo liberan por la noche. Para cuando el calor del exterior llega al centro, la noche ya enfriÃ³ la superficie y el ciclo se repite.',
      'Los egipcios probablemente conocÃ­an y aprovechaban esta propiedad tÃ©rmica. La temperatura estable de 20Â°C es perfecta para preservar objetos: ni tan caliente como para secar y agrietar los materiales, ni tan frÃ­a como para generar humedad. Los papiros, las telas de lino y los alimentos sagrados depositados con el faraÃ³n se conservarÃ­an en condiciones ideales.',
      'Pero hay algo mÃ¡s misterioso: la termografÃ­a infrarroja de ScanPyramids encontrÃ³ anomalÃ­as tÃ©rmicas en la base de la pirÃ¡mide y en su cara norte. Algunos bloques de piedra estÃ¡n mÃ¡s calientes que otros, lo que sugiere que detrÃ¡s hay espacios vacÃ­os o corredores ocultos por donde circula aire a diferente temperatura. Es como detectar una habitaciÃ³n secreta mirando la temperatura de las paredes.',
      'La posiciÃ³n geogrÃ¡fica de la pirÃ¡mide tambiÃ©n es notable. EstÃ¡ en el vÃ©rtice exacto del delta del Nilo, donde el rÃ­o se divide en sus mÃºltiples brazos hacia el mar. Desde el espacio, esta posiciÃ³n parece perfecta, como si los arquitectos hubieran tenido una vista aÃ©rea de todo Egipto. Los cientÃ­ficos debaten si esto fue calculado o es una coincidencia extraordinaria.',
    ],
    fact: 'Si pudieras poner toda la piedra de la Gran PirÃ¡mide en fila, harÃ­as un muro de 1 metro de alto que le darÃ­a la vuelta a toda Francia. La base de la pirÃ¡mide cubre un Ã¡rea de 5.3 hectÃ¡reas, Â¡suficiente para estacionar 2,000 autobuses escolares! Y pesa 6.5 millones de toneladas, mÃ¡s que todos los edificios del centro de Londres juntos.',
  },
  {
    id: 'legado-giza',
    title: 'El Legado Eterno',
    color: '#AB47BC',
    btnImage: '/assets/egypt/infographic_giza/btn_legado.png',
    image: '/assets/egypt/infographic_giza/hero_legado.png',
    content: [
      'La Gran PirÃ¡mide fue el edificio mÃ¡s alto del mundo durante 3,871 aÃ±os, desde que se terminÃ³ en el 2450 a.C. hasta que la catedral de Lincoln, en Inglaterra, la superÃ³ en 1311 d.C. Â¡Ninguna otra estructura humana ha mantenido un rÃ©cord durante tanto tiempo! Y todavÃ­a sigue siendo el edificio antiguo mÃ¡s grande del mundo.',
      'El legado de las alineaciones astronÃ³micas de Guiza viajÃ³ por todo el mundo antiguo. Los comerciantes fenicios llevaron conocimientos egipcios al MediterrÃ¡neo. Los griegos como Tales, PitÃ¡goras y PlatÃ³n estudiaron en las escuelas sacerdotales de Egipto. Y cuando Alejandro Magno fundÃ³ AlejandrÃ­a, la fusiÃ³n de pensamiento egipcio, griego y babilÃ³nico creÃ³ la astronomÃ­a cientÃ­fica.',
      'Las catedrales gÃ³ticas de la Europa medieval heredaron la tradiciÃ³n egipcia sin saberlo. Sus naves largas actÃºan como los corredores egipcios, dirigiendo la luz del sol hacia el altar en fechas especÃ­ficas. Sus rosetones (ventanas circulares) estÃ¡n orientados astronÃ³micamente. Los constructores medievales continuaron una tradiciÃ³n que comenzÃ³ en Guiza hace 4,500 aÃ±os.',
      'Hoy, la Gran PirÃ¡mide es Patrimonio de la Humanidad y la Ãºltima de las Siete Maravillas del Mundo Antiguo que sigue en pie. Las otras seis (los Jardines de Babilonia, el Coloso de Rodas, el Faro de AlejandrÃ­a, el Templo de Artemisa, la Estatua de Zeus y el Mausoleo de Halicarnaso) desaparecieron hace siglos. Solo la pirÃ¡mide resistiÃ³ al tiempo.',
      'El gran mensaje de Guiza es que la ciencia y el arte siempre han estado unidos. Los egipcios no separaban la ingenierÃ­a de la religiÃ³n, ni la matemÃ¡tica de la poesÃ­a. Todo era parte de un solo esfuerzo por entender y celebrar el universo. Cuando miramos esas alineaciones estelares perfectas, no vemos solo tÃ©cnica: vemos el amor de una civilizaciÃ³n por las estrellas.',
    ],
    fact: 'De las Siete Maravillas del Mundo Antiguo, la Gran PirÃ¡mide es la mÃ¡s antigua (construida ca. 2560 a.C.) y la Ãºnica que sigue existiendo. El Faro de AlejandrÃ­a, la segunda maravilla mÃ¡s duradera, se derrumbÃ³ por terremotos en el siglo XIV. La pirÃ¡mide ha sobrevivido 4,500 aÃ±os de terremotos, invasiones, tormentas de arena y erosiÃ³n. A este ritmo, seguirÃ¡ ahÃ­ cuando nuestros tÃ¡tara-tÃ¡tara-tataranietos la visiten.',
  },
];

// â”€â”€â”€ Star Field Background â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function StarField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    const w = canvas.width, h = canvas.height;
    const stars = Array.from({ length: 90 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      o: Math.random() * 0.5 + 0.15,
      speed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2,
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      stars.forEach(s => {
        const opacity = s.o + Math.sin(t * s.speed + s.phase) * 0.25;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 165, 0, ${Math.max(0, opacity)})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

// â”€â”€â”€ Giza Header SVG â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function GizaHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-20px' }}>
      <svg viewBox="0 0 600 120" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(240,165,0,0.3))' }}>
        {/* Three pyramid silhouettes */}
        <polygon points="200,100 260,35 320,100" fill="none" stroke="url(#gizaGrad)" strokeWidth="2" opacity="0.5" />
        <polygon points="260,100 330,20 400,100" fill="none" stroke="url(#gizaGrad)" strokeWidth="2.5" />
        <polygon points="340,100 380,50 420,100" fill="none" stroke="url(#gizaGrad)" strokeWidth="2" opacity="0.5" />
        {/* Laser beams from pyramid tops */}
        {[{x:260,y:35},{x:330,y:20},{x:380,y:50}].map((p,i) => (
          <g key={i}>
            <motion.line x1={p.x} y1={p.y} x2={p.x} y2={p.y - 15}
              stroke="#F0A500" strokeWidth="1.5" strokeLinecap="round"
              animate={{ opacity: [0.2, 0.8, 0.2], y2: [p.y - 12, p.y - 18, p.y - 12] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle cx={p.x} cy={p.y - 16} r="2.5" fill="#FFD700"
              animate={{ opacity: [0.3, 1, 0.3], r: [2, 3, 2] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              style={{ filter: 'drop-shadow(0 0 5px #FFD700)' }}
            />
          </g>
        ))}
        {/* Orion belt stars above */}
        {[{x:270,y:6},{x:330,y:4},{x:390,y:8}].map((s,i) => (
          <motion.circle key={`star${i}`} cx={s.x} cy={s.y} r="3" fill="#F0A500"
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            style={{ filter: 'drop-shadow(0 0 6px #F0A500)' }}
          />
        ))}
        {/* Connection lines: stars to pyramids */}
        <line x1="270" y1="6" x2="260" y2="35" stroke="rgba(240,165,0,0.15)" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="330" y1="4" x2="330" y2="20" stroke="rgba(240,165,0,0.15)" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="390" y1="8" x2="380" y2="50" stroke="rgba(240,165,0,0.15)" strokeWidth="0.8" strokeDasharray="3 3" />
        <defs>
          <linearGradient id="gizaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(240,165,0,0.2)" />
            <stop offset="50%" stopColor="rgba(240,165,0,0.9)" />
            <stop offset="100%" stopColor="rgba(240,165,0,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="75" textAnchor="middle" fill="#F0A500" fontSize="17" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL LÃSER DE GIZA</text>
        <text x="300" y="95" textAnchor="middle" fill="rgba(240,165,0,0.6)" fontSize="10.5" fontFamily="monospace" letterSpacing="2">LA GRAN PIRÃMIDE Â· CIRCA 2450 A.C.</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function NodeButton({ node, isActive, onClick, index }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08, y: -5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, type: 'spring', stiffness: 300, damping: 25 }}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '0.5rem', padding: '0.5rem', position: 'relative',
      }}
    >
      <div style={{
        width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden',
        border: `3px solid ${isActive ? node.color : 'rgba(240,165,0,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease', position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{
          width: '100%', height: '100%', objectFit: 'cover',
          transition: 'transform 0.3s ease', transform: isActive ? 'scale(1.1)' : 'scale(1)',
        }}  loading="lazy" />
        {isActive && (
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              position: 'absolute', inset: '-4px', borderRadius: '50%',
              border: `2px solid ${node.color}`, pointerEvents: 'none',
            }}
          />
        )}
      </div>
      <span style={{
        color: isActive ? node.color : 'rgba(255,255,255,0.75)',
        fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.3px',
        textAlign: 'center', lineHeight: 1.2, transition: 'color 0.3s',
        maxWidth: '100px', textShadow: isActive ? `0 0 8px ${node.color}40` : 'none',
      }}>
        {node.title}
      </span>
      {isActive && (
        <motion.div layoutId="activeDotM5"
          style={{ width: '6px', height: '6px', borderRadius: '50%',
            background: node.color, boxShadow: `0 0 8px ${node.color}` }}
        />
      )}
    </motion.button>
  );
}

// â”€â”€â”€ Magazine-Style Content Panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ContentPanel({ node, onClose, setLightboxSrc }) {
  const decoComponents = DECO_MAP[node.id] || [];
  const decoPositions = [
    { top: '8%', right: '-10px', rotate: 15 },
    { top: '45%', left: '-15px', rotate: -10 },
    { bottom: '12%', right: '5px', rotate: 20 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      style={{
        background: 'rgba(15, 12, 5, 0.92)', backdropFilter: 'blur(24px)',
        border: `1px solid ${node.color}30`, borderRadius: '24px',
        position: 'relative', zIndex: 3, marginTop: '1rem', overflow: 'hidden',
      }}
    >
      <button onClick={onClose} style={{
        position: 'absolute', top: '1rem', right: '1rem', zIndex: 10,
        background: 'rgba(0,0,0,0.6)', border: `1px solid ${node.color}40`,
        borderRadius: '50%', width: '40px', height: '40px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: node.color, transition: 'all 0.2s',
      }}>
        <X size={18} />
      </button>

      {/* Two-Column Hero */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', minHeight: '280px' }}>
        <div style={{
          position: 'relative', overflow: 'hidden',
          background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))`,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{
            width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
            background: `linear-gradient(transparent, ${node.color}15)`,
            pointerEvents: 'none',
          }} />
        </div>
        <div style={{ padding: '2rem 2rem 1.5rem 1.5rem', position: 'relative' }}>
          {decoComponents[0] && (
            <div style={{ position: 'absolute', top: '10px', right: '50px', transform: 'rotate(15deg)', pointerEvents: 'none' }}>
              {decoComponents[0]({ size: 50, color: node.color })}
            </div>
          )}
          <h3 style={{
            margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800,
            color: node.color, letterSpacing: '-0.02em',
            display: 'flex', alignItems: 'center', gap: '0.6rem',
          }}>
            <span style={{
              display: 'inline-flex', width: '40px', height: '40px',
              borderRadius: '50%', overflow: 'hidden', border: `2px solid ${node.color}40`, flexShrink: 0,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}  loading="lazy" />
            </span>
            {node.title}
          </h3>
          {node.content.slice(0, 2).map((para, i) => (
            <p key={i} style={{
              margin: '0 0 0.8rem', fontSize: '0.95rem', lineHeight: 1.75,
              color: 'rgba(255,255,255,0.85)',
            }}>
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* Magazine Body */}
      <div style={{ padding: '1.5rem 2rem 2rem', position: 'relative' }}>
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div key={i}
              animate={{ y: [0, -8, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 5, pos.rotate || 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none' }}
            >
              <Deco size={55 + i * 10} color={node.color} />
            </motion.div>
          );
        })}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2rem',
          position: 'relative', zIndex: 2,
        }}>
          {node.content.slice(2).map((para, i) => {
            const isWide = i === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
            return (
              <div key={i} style={{
                gridColumn: isWide ? '1 / -1' : 'auto',
                background: 'rgba(255,255,255,0.02)', borderRadius: '12px',
                padding: '1.2rem', borderLeft: `3px solid ${node.color}30`, position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: '-8px', left: '12px',
                  background: node.color, color: '#0B0E2D',
                  fontSize: '0.65rem', fontWeight: 800,
                  padding: '2px 8px', borderRadius: '8px', letterSpacing: '1px',
                }}>
                  {i === 0 ? 'â—†' : i === 1 ? 'â—‡' : 'â˜…'}
                </div>
                <p style={{
                  margin: 0, fontSize: '0.95rem', lineHeight: 1.75,
                  color: 'rgba(255,255,255,0.85)',
                }}>
                  {para}
                </p>
              </div>
            );
          })}
        </div>

        {/* Fact Box */}
        {node.fact && (
          <div style={{
            marginTop: '1.5rem',
            background: `linear-gradient(135deg, ${node.color}12, ${node.color}05)`,
            border: `1px solid ${node.color}25`, borderRadius: '16px',
            padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'flex-start',
            gap: '1rem', position: 'relative', zIndex: 2,
          }}>
            <div style={{
              flexShrink: 0, width: '36px', height: '36px', borderRadius: '50%',
              background: `${node.color}20`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Sparkles size={18} style={{ color: node.color }} />
            </div>
            <div>
              <span style={{
                fontSize: '0.7rem', fontWeight: 800, color: node.color,
                letterSpacing: '2px', textTransform: 'uppercase',
              }}>
                Dato CientÃ­fico
              </span>
              <p style={{
                margin: '0.3rem 0 0', fontStyle: 'italic',
                color: 'rgba(255,255,255,0.9)', fontSize: '0.92rem', lineHeight: 1.7,
              }}>
                {node.fact}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)', borderRadius: '30px',
      border: '1px solid rgba(240,165,0,0.15)',
    }}>
      <Star size={14} style={{ color: '#F0A500', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #D4880A, #F0A500)', borderRadius: '3px', boxShadow: '0 0 8px rgba(240,165,0,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#F0A500', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// â”€â”€â”€ Main Infographic Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_EgyptM5() {
  const [activeNode, setActiveNode] = useState(null);
  const [lightboxSrc, setLightboxSrc] = useState(null);
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
      backgroundImage: 'linear-gradient(180deg, rgba(20,15,5,0.88) 0%, rgba(35,25,10,0.82) 40%, rgba(20,15,5,0.90) 100%), url(/assets/egypt/infographic_giza/bg_giza.png)',
      backgroundSize: 'cover', backgroundPosition: 'center center',
      borderRadius: '24px', padding: '2rem 1.5rem', position: 'relative',
      overflow: 'hidden', border: '1px solid rgba(240,165,0,0.12)',
      boxShadow: '0 0 60px rgba(15,10,0,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <StarField />
      <GizaHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(240,165,0,0.7)', fontSize: '0.85rem',
            marginBottom: '1rem', position: 'relative', zIndex: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
          }}
        >
          <ChevronRight size={14} /> Toca cada cÃ­rculo para explorar <ChevronRight size={14} />
        </motion.p>
      )}

      <div style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
        gap: '0.8rem 1.2rem', position: 'relative', zIndex: 2,
        marginBottom: '1rem', padding: '0 0.5rem',
      }}>
        {INFOGRAPHIC_NODES.map((node, index) => (
          <NodeButton key={node.id} node={node} index={index}
            isActive={activeNode === node.id}
            onClick={() => handleNodeClick(node.id)}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeData && (
          <ContentPanel key={activeData.id} node={activeData} onClose={() => setActiveNode(null)} setLightboxSrc={setLightboxSrc} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {explored.size === INFOGRAPHIC_NODES.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center', marginTop: '1.5rem', padding: '1rem',
              background: 'rgba(240,165,0,0.08)', borderRadius: '16px',
              border: '1px solid rgba(240,165,0,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#F0A500', fontSize: '1.1rem', fontWeight: 'bold' }}>
              ðŸ”º Â¡Has descubierto todos los secretos del LÃ¡ser de Giza!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Constructor Estelar
            </p>
          </motion.div>
        )}
      </AnimatePresence>
          {/* â”€â”€â”€ BibliografÃ­a â”€â”€â”€ */}
      <div style={{
        marginTop: '2rem', padding: '1.5rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(0,0,0,0.3)',
        borderRadius: '0 0 16px 16px',
      }}>
        <h4 style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.8rem',
          textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          ðŸ“š Fuentes y Referencias
        </h4>
        <ul style={{ fontSize: '0.75rem', color: '#666', lineHeight: 1.8,
          listStyle: 'none', padding: 0, margin: 0, columns: 2, columnGap: '2rem' }}>
          {BIBLIOGRAPHY.map((ref, i) => (
            <li key={i} style={{ breakInside: 'avoid', marginBottom: '0.4rem' }}>â€¢ {ref}</li>
          ))}
        </ul>
      </div>

      {/* ImageLightbox Â§15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}