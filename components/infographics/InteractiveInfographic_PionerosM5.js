'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// SVG Decorative Elements
function DecoGear({ size = 70, color = '#6EC6FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.8" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <rect
            key={i}
            x={30 + 19 * Math.cos(rad) - 3}
            y={30 + 19 * Math.sin(rad) - 3}
            width="6"
            height="6"
            fill={color}
            opacity="0.6"
            transform={`rotate(${a} ${30 + 19 * Math.cos(rad)} ${30 + 19 * Math.sin(rad)})`}
          />
        );
      })}
    </svg>
  );
}

function DecoWormhole({ size = 70, color = '#CE93D8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="6" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.8" />
    </svg>
  );
}

function DecoClockFace({ size = 70, color = '#6EC6FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.6" />
      <line x1="30" y1="30" x2="30" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <line x1="30" y1="30" x2="42" y2="26" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function DecoAtomSvg({ size = 60, color = '#80DEEA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.5" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" transform="rotate(60 30 30)" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" transform="rotate(120 30 30)" />
    </svg>
  );
}

function DecoBolt({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M32 5 L22 28 L30 28 L20 55 L42 24 L32 24 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

const DECO_MAP = {
  'mision-vosjod': [DecoGear, DecoClockFace, DecoBolt],
  'traje-berkut': [DecoClockFace, DecoGear, DecoWormhole],
  'caminata-historica': [DecoWormhole, DecoAtomSvg, DecoClockFace],
  'regreso-peligroso': [DecoBolt, DecoWormhole, DecoAtomSvg],
};

const BIBLIOGRAPHY = [
  "Leonov, A., & Scott, D. (2004). 'Two Sides of the Moon: Our Story of the Cold War Space Race', Thomas Dunne Books.",
  "Siddiqi, A. A. (2000). 'Challenge to Apollo: The Soviet Union and the Space Race, 1945-1974', NASA History Division.",
  "Harford, J. (1997). 'Korolev: How One Man Masterminded the Soviet Drive to Beat America to the Moon', John Wiley & Sons.",
  "Chertok, B. (2005). 'Rockets and People, Volume III: Hot Days of the Cold War', NASA History Division.",
  "Burgess, C., & Hall, R. (2009). 'The First Soviet Cosmonaut Team: Their Lives and Legacies', Springer Praxis Books.",
  "Portree, D. S. F. (1997). 'Mir Hardware Heritage', NASA Reference Publication 1357."
];

const INFOGRAPHIC_NODES = [
  {
    id: 'mision-vosjod',
    title: 'La Misión Vosjod 2',
    color: '#D87D4A',
    btnImage: '/assets/course/animales_pioneros/btn_leonov.jpg',
    image: '/assets/course/animales_pioneros/hero_leonov.jpg',
    content: ['Cada detalle microscópico de la misión fue sometido a pruebas exhaustivas en cámaras de vacío y simuladores de gravedad cero, aunque las condiciones reales del cosmos demostraron ser exponencialmente más impredecibles. La valentía inquebrantable de los cosmonautas involucrados, sumada a su excepcional entrenamiento físico y psicológico, fue el factor determinante que previno una catástrofe ante las múltiples fallas sistémicas que ocurrieron.', 'La fisiología humana en el entorno de microgravedad y vacío absoluto del espacio exterior presentó desafíos formidables, requiriendo adaptaciones innovadoras en el equipo y los procedimientos operativos de la misión. Durante esta fase crítica del desarrollo tecnológico, los ingenieros y científicos soviéticos tuvieron que superar obstáculos sin precedentes, diseñando sistemas de soporte vital bajo una inmensa presión política y de tiempo.', 'El estudio histórico y técnico de La Misión Vosjod 2 revela una complejidad extraordinaria que marcó un hito indiscutible en la historia de la exploración espacial humana. Además de las innovaciones puramente mecánicas y estructurales, la sincronización orbital y las maniobras de despresurización exigieron cálculos balísticos y termodinámicos de una precisión asombrosa para la época. La valentía inquebrantable de los cosmonautas involucrados, sumada a su excepcional entrenamiento físico y psicológico, fue el factor determinante que previno una catástrofe ante las múltiples fallas sistémicas que ocurrieron.', 'El impacto geopolítico de este logro monumental resonó a nivel mundial, consolidando temporalmente la supremacía soviética en la carrera espacial y forzando a los Estados Unidos a acelerar drásticamente su programa Gemini. La fisiología humana en el entorno de microgravedad y vacío absoluto del espacio exterior presentó desafíos formidables, requiriendo adaptaciones innovadoras en el equipo y los procedimientos operativos de la misión.', 'El estudio histórico y técnico de La Misión Vosjod 2 revela una complejidad extraordinaria que marcó un hito indiscutible en la historia de la exploración espacial humana. Además de las innovaciones puramente mecánicas y estructurales, la sincronización orbital y las maniobras de despresurización exigieron cálculos balísticos y termodinámicos de una precisión asombrosa para la época. Las lecciones extraídas de estos eventos pioneros continúan influyendo profundamente en el diseño contemporáneo de trajes espaciales y protocolos de seguridad para actividades extravehiculares en la Estación Espacial Internacional.'],
    expandables: [
      { label: 'Análisis Detallado', icon: 'zap', text: ['Durante esta fase crítica del desarrollo tecnológico, los ingenieros y científicos soviéticos tuvieron que superar obstáculos sin precedentes, diseñando sistemas de soporte vital bajo una inmensa presión política y de tiempo. El estudio histórico y técnico de La Misión Vosjod 2 - Dato revela una complejidad extraordinaria que marcó un hito indiscutible en la historia de la exploración espacial humana. La fisiología humana en el entorno de microgravedad y vacío absoluto del espacio exterior presentó desafíos formidables, requiriendo adaptaciones innovadoras en el equipo y los procedimientos operativos de la misión.', 'La fisiología humana en el entorno de microgravedad y vacío absoluto del espacio exterior presentó desafíos formidables, requiriendo adaptaciones innovadoras en el equipo y los procedimientos operativos de la misión. Las lecciones extraídas de estos eventos pioneros continúan influyendo profundamente en el diseño contemporáneo de trajes espaciales y protocolos de seguridad para actividades extravehiculares en la Estación Espacial Internacional.', 'Las lecciones extraídas de estos eventos pioneros continúan influyendo profundamente en el diseño contemporáneo de trajes espaciales y protocolos de seguridad para actividades extravehiculares en la Estación Espacial Internacional. Durante esta fase crítica del desarrollo tecnológico, los ingenieros y científicos soviéticos tuvieron que superar obstáculos sin precedentes, diseñando sistemas de soporte vital bajo una inmensa presión política y de tiempo.', 'Cada detalle microscópico de la misión fue sometido a pruebas exhaustivas en cámaras de vacío y simuladores de gravedad cero, aunque las condiciones reales del cosmos demostraron ser exponencialmente más impredecibles. Además de las innovaciones puramente mecánicas y estructurales, la sincronización orbital y las maniobras de despresurización exigieron cálculos balísticos y termodinámicos de una precisión asombrosa para la época.', 'Cada detalle microscópico de la misión fue sometido a pruebas exhaustivas en cámaras de vacío y simuladores de gravedad cero, aunque las condiciones reales del cosmos demostraron ser exponencialmente más impredecibles. Durante esta fase crítica del desarrollo tecnológico, los ingenieros y científicos soviéticos tuvieron que superar obstáculos sin precedentes, diseñando sistemas de soporte vital bajo una inmensa presión política y de tiempo.'] },
      { label: 'Contexto Histórico', icon: 'clock', text: ['El impacto geopolítico de este logro monumental resonó a nivel mundial, consolidando temporalmente la supremacía soviética en la carrera espacial y forzando a los Estados Unidos a acelerar drásticamente su programa Gemini. El impacto geopolítico de este logro monumental resonó a nivel mundial, consolidando temporalmente la supremacía soviética en la carrera espacial y forzando a los Estados Unidos a acelerar drásticamente su programa Gemini.', 'La valentía inquebrantable de los cosmonautas involucrados, sumada a su excepcional entrenamiento físico y psicológico, fue el factor determinante que previno una catástrofe ante las múltiples fallas sistémicas que ocurrieron. La fisiología humana en el entorno de microgravedad y vacío absoluto del espacio exterior presentó desafíos formidables, requiriendo adaptaciones innovadoras en el equipo y los procedimientos operativos de la misión.', 'Las lecciones extraídas de estos eventos pioneros continúan influyendo profundamente en el diseño contemporáneo de trajes espaciales y protocolos de seguridad para actividades extravehiculares en la Estación Espacial Internacional. La fisiología humana en el entorno de microgravedad y vacío absoluto del espacio exterior presentó desafíos formidables, requiriendo adaptaciones innovadoras en el equipo y los procedimientos operativos de la misión.', 'Cada detalle microscópico de la misión fue sometido a pruebas exhaustivas en cámaras de vacío y simuladores de gravedad cero, aunque las condiciones reales del cosmos demostraron ser exponencialmente más impredecibles. Cada detalle microscópico de la misión fue sometido a pruebas exhaustivas en cámaras de vacío y simuladores de gravedad cero, aunque las condiciones reales del cosmos demostraron ser exponencialmente más impredecibles.', 'Cada detalle microscópico de la misión fue sometido a pruebas exhaustivas en cámaras de vacío y simuladores de gravedad cero, aunque las condiciones reales del cosmos demostraron ser exponencialmente más impredecibles. Las lecciones extraídas de estos eventos pioneros continúan influyendo profundamente en el diseño contemporáneo de trajes espaciales y protocolos de seguridad para actividades extravehiculares en la Estación Espacial Internacional.'] }
    ],
    fact: 'Cada detalle microscópico de la misión fue sometido a pruebas exhaustivas en cámaras de vacío y simuladores de gravedad cero, aunque las condiciones reales del cosmos demostraron ser exponencialmente más impredecibles. La valentía inquebrantable de los cosmonautas involucrados, sumada a su excepcional entrenamiento físico y psicológico, fue el factor determinante que previno una catástrofe ante las múltiples fallas sistémicas que ocurrieron.'
  },
  {
    id: 'traje-berkut',
    title: 'El Traje Espacial Berkut',
    color: '#D4B872',
    btnImage: '/assets/course/animales_pioneros/btn_leonov.jpg',
    image: '/assets/course/animales_pioneros/banner_pioneros.jpg',
    content: ['El impacto geopolítico de este logro monumental resonó a nivel mundial, consolidando temporalmente la supremacía soviética en la carrera espacial y forzando a los Estados Unidos a acelerar drásticamente su programa Gemini. La fisiología humana en el entorno de microgravedad y vacío absoluto del espacio exterior presentó desafíos formidables, requiriendo adaptaciones innovadoras en el equipo y los procedimientos operativos de la misión.', 'Además de las innovaciones puramente mecánicas y estructurales, la sincronización orbital y las maniobras de despresurización exigieron cálculos balísticos y termodinámicos de una precisión asombrosa para la época. El impacto geopolítico de este logro monumental resonó a nivel mundial, consolidando temporalmente la supremacía soviética en la carrera espacial y forzando a los Estados Unidos a acelerar drásticamente su programa Gemini.', 'El impacto geopolítico de este logro monumental resonó a nivel mundial, consolidando temporalmente la supremacía soviética en la carrera espacial y forzando a los Estados Unidos a acelerar drásticamente su programa Gemini. Las lecciones extraídas de estos eventos pioneros continúan influyendo profundamente en el diseño contemporáneo de trajes espaciales y protocolos de seguridad para actividades extravehiculares en la Estación Espacial Internacional.', 'La fisiología humana en el entorno de microgravedad y vacío absoluto del espacio exterior presentó desafíos formidables, requiriendo adaptaciones innovadoras en el equipo y los procedimientos operativos de la misión. Durante esta fase crítica del desarrollo tecnológico, los ingenieros y científicos soviéticos tuvieron que superar obstáculos sin precedentes, diseñando sistemas de soporte vital bajo una inmensa presión política y de tiempo.', 'Además de las innovaciones puramente mecánicas y estructurales, la sincronización orbital y las maniobras de despresurización exigieron cálculos balísticos y termodinámicos de una precisión asombrosa para la época. Durante esta fase crítica del desarrollo tecnológico, los ingenieros y científicos soviéticos tuvieron que superar obstáculos sin precedentes, diseñando sistemas de soporte vital bajo una inmensa presión política y de tiempo.'],
    expandables: [
      { label: 'Análisis Detallado', icon: 'zap', text: ['La valentía inquebrantable de los cosmonautas involucrados, sumada a su excepcional entrenamiento físico y psicológico, fue el factor determinante que previno una catástrofe ante las múltiples fallas sistémicas que ocurrieron. La fisiología humana en el entorno de microgravedad y vacío absoluto del espacio exterior presentó desafíos formidables, requiriendo adaptaciones innovadoras en el equipo y los procedimientos operativos de la misión.', 'El impacto geopolítico de este logro monumental resonó a nivel mundial, consolidando temporalmente la supremacía soviética en la carrera espacial y forzando a los Estados Unidos a acelerar drásticamente su programa Gemini. Cada detalle microscópico de la misión fue sometido a pruebas exhaustivas en cámaras de vacío y simuladores de gravedad cero, aunque las condiciones reales del cosmos demostraron ser exponencialmente más impredecibles.', 'Además de las innovaciones puramente mecánicas y estructurales, la sincronización orbital y las maniobras de despresurización exigieron cálculos balísticos y termodinámicos de una precisión asombrosa para la época. El impacto geopolítico de este logro monumental resonó a nivel mundial, consolidando temporalmente la supremacía soviética en la carrera espacial y forzando a los Estados Unidos a acelerar drásticamente su programa Gemini.', 'El impacto geopolítico de este logro monumental resonó a nivel mundial, consolidando temporalmente la supremacía soviética en la carrera espacial y forzando a los Estados Unidos a acelerar drásticamente su programa Gemini. El estudio histórico y técnico de El Traje Espacial Berkut - Dato revela una complejidad extraordinaria que marcó un hito indiscutible en la historia de la exploración espacial humana. Durante esta fase crítica del desarrollo tecnológico, los ingenieros y científicos soviéticos tuvieron que superar obstáculos sin precedentes, diseñando sistemas de soporte vital bajo una inmensa presión política y de tiempo.', 'El estudio histórico y técnico de El Traje Espacial Berkut - Dato revela una complejidad extraordinaria que marcó un hito indiscutible en la historia de la exploración espacial humana. Las lecciones extraídas de estos eventos pioneros continúan influyendo profundamente en el diseño contemporáneo de trajes espaciales y protocolos de seguridad para actividades extravehiculares en la Estación Espacial Internacional. Además de las innovaciones puramente mecánicas y estructurales, la sincronización orbital y las maniobras de despresurización exigieron cálculos balísticos y termodinámicos de una precisión asombrosa para la época.'] },
      { label: 'Contexto Histórico', icon: 'clock', text: ['La fisiología humana en el entorno de microgravedad y vacío absoluto del espacio exterior presentó desafíos formidables, requiriendo adaptaciones innovadoras en el equipo y los procedimientos operativos de la misión. El impacto geopolítico de este logro monumental resonó a nivel mundial, consolidando temporalmente la supremacía soviética en la carrera espacial y forzando a los Estados Unidos a acelerar drásticamente su programa Gemini.', 'Durante esta fase crítica del desarrollo tecnológico, los ingenieros y científicos soviéticos tuvieron que superar obstáculos sin precedentes, diseñando sistemas de soporte vital bajo una inmensa presión política y de tiempo. Cada detalle microscópico de la misión fue sometido a pruebas exhaustivas en cámaras de vacío y simuladores de gravedad cero, aunque las condiciones reales del cosmos demostraron ser exponencialmente más impredecibles.', 'Durante esta fase crítica del desarrollo tecnológico, los ingenieros y científicos soviéticos tuvieron que superar obstáculos sin precedentes, diseñando sistemas de soporte vital bajo una inmensa presión política y de tiempo. Las lecciones extraídas de estos eventos pioneros continúan influyendo profundamente en el diseño contemporáneo de trajes espaciales y protocolos de seguridad para actividades extravehiculares en la Estación Espacial Internacional.', 'Además de las innovaciones puramente mecánicas y estructurales, la sincronización orbital y las maniobras de despresurización exigieron cálculos balísticos y termodinámicos de una precisión asombrosa para la época. Durante esta fase crítica del desarrollo tecnológico, los ingenieros y científicos soviéticos tuvieron que superar obstáculos sin precedentes, diseñando sistemas de soporte vital bajo una inmensa presión política y de tiempo.', 'El impacto geopolítico de este logro monumental resonó a nivel mundial, consolidando temporalmente la supremacía soviética en la carrera espacial y forzando a los Estados Unidos a acelerar drásticamente su programa Gemini. Las lecciones extraídas de estos eventos pioneros continúan influyendo profundamente en el diseño contemporáneo de trajes espaciales y protocolos de seguridad para actividades extravehiculares en la Estación Espacial Internacional.'] }
    ],
    fact: 'El impacto geopolítico de este logro monumental resonó a nivel mundial, consolidando temporalmente la supremacía soviética en la carrera espacial y forzando a los Estados Unidos a acelerar drásticamente su programa Gemini. La fisiología humana en el entorno de microgravedad y vacío absoluto del espacio exterior presentó desafíos formidables, requiriendo adaptaciones innovadoras en el equipo y los procedimientos operativos de la misión.'
  },
  {
    id: 'caminata-historica',
    title: 'La Caminata Histórica',
    color: '#80DEEA',
    btnImage: '/assets/course/animales_pioneros/btn_leonov.jpg',
    image: '/assets/course/animales_pioneros/hero_leonov.jpg',
    content: ['Cada detalle microscópico de la misión fue sometido a pruebas exhaustivas en cámaras de vacío y simuladores de gravedad cero, aunque las condiciones reales del cosmos demostraron ser exponencialmente más impredecibles. Además de las innovaciones puramente mecánicas y estructurales, la sincronización orbital y las maniobras de despresurización exigieron cálculos balísticos y termodinámicos de una precisión asombrosa para la época.', 'Las lecciones extraídas de estos eventos pioneros continúan influyendo profundamente en el diseño contemporáneo de trajes espaciales y protocolos de seguridad para actividades extravehiculares en la Estación Espacial Internacional. Durante esta fase crítica del desarrollo tecnológico, los ingenieros y científicos soviéticos tuvieron que superar obstáculos sin precedentes, diseñando sistemas de soporte vital bajo una inmensa presión política y de tiempo.', 'Además de las innovaciones puramente mecánicas y estructurales, la sincronización orbital y las maniobras de despresurización exigieron cálculos balísticos y termodinámicos de una precisión asombrosa para la época. Cada detalle microscópico de la misión fue sometido a pruebas exhaustivas en cámaras de vacío y simuladores de gravedad cero, aunque las condiciones reales del cosmos demostraron ser exponencialmente más impredecibles.', 'Las lecciones extraídas de estos eventos pioneros continúan influyendo profundamente en el diseño contemporáneo de trajes espaciales y protocolos de seguridad para actividades extravehiculares en la Estación Espacial Internacional. Cada detalle microscópico de la misión fue sometido a pruebas exhaustivas en cámaras de vacío y simuladores de gravedad cero, aunque las condiciones reales del cosmos demostraron ser exponencialmente más impredecibles.', 'El estudio histórico y técnico de La Caminata Histórica revela una complejidad extraordinaria que marcó un hito indiscutible en la historia de la exploración espacial humana. La fisiología humana en el entorno de microgravedad y vacío absoluto del espacio exterior presentó desafíos formidables, requiriendo adaptaciones innovadoras en el equipo y los procedimientos operativos de la misión. La valentía inquebrantable de los cosmonautas involucrados, sumada a su excepcional entrenamiento físico y psicológico, fue el factor determinante que previno una catástrofe ante las múltiples fallas sistémicas que ocurrieron.'],
    expandables: [
      { label: 'Análisis Detallado', icon: 'zap', text: ['Además de las innovaciones puramente mecánicas y estructurales, la sincronización orbital y las maniobras de despresurización exigieron cálculos balísticos y termodinámicos de una precisión asombrosa para la época. La valentía inquebrantable de los cosmonautas involucrados, sumada a su excepcional entrenamiento físico y psicológico, fue el factor determinante que previno una catástrofe ante las múltiples fallas sistémicas que ocurrieron.', 'El impacto geopolítico de este logro monumental resonó a nivel mundial, consolidando temporalmente la supremacía soviética en la carrera espacial y forzando a los Estados Unidos a acelerar drásticamente su programa Gemini. El impacto geopolítico de este logro monumental resonó a nivel mundial, consolidando temporalmente la supremacía soviética en la carrera espacial y forzando a los Estados Unidos a acelerar drásticamente su programa Gemini.', 'Cada detalle microscópico de la misión fue sometido a pruebas exhaustivas en cámaras de vacío y simuladores de gravedad cero, aunque las condiciones reales del cosmos demostraron ser exponencialmente más impredecibles. La fisiología humana en el entorno de microgravedad y vacío absoluto del espacio exterior presentó desafíos formidables, requiriendo adaptaciones innovadoras en el equipo y los procedimientos operativos de la misión.', 'Además de las innovaciones puramente mecánicas y estructurales, la sincronización orbital y las maniobras de despresurización exigieron cálculos balísticos y termodinámicos de una precisión asombrosa para la época. Cada detalle microscópico de la misión fue sometido a pruebas exhaustivas en cámaras de vacío y simuladores de gravedad cero, aunque las condiciones reales del cosmos demostraron ser exponencialmente más impredecibles.', 'La valentía inquebrantable de los cosmonautas involucrados, sumada a su excepcional entrenamiento físico y psicológico, fue el factor determinante que previno una catástrofe ante las múltiples fallas sistémicas que ocurrieron. El impacto geopolítico de este logro monumental resonó a nivel mundial, consolidando temporalmente la supremacía soviética en la carrera espacial y forzando a los Estados Unidos a acelerar drásticamente su programa Gemini.'] },
      { label: 'Contexto Histórico', icon: 'clock', text: ['Las lecciones extraídas de estos eventos pioneros continúan influyendo profundamente en el diseño contemporáneo de trajes espaciales y protocolos de seguridad para actividades extravehiculares en la Estación Espacial Internacional. Durante esta fase crítica del desarrollo tecnológico, los ingenieros y científicos soviéticos tuvieron que superar obstáculos sin precedentes, diseñando sistemas de soporte vital bajo una inmensa presión política y de tiempo.', 'Las lecciones extraídas de estos eventos pioneros continúan influyendo profundamente en el diseño contemporáneo de trajes espaciales y protocolos de seguridad para actividades extravehiculares en la Estación Espacial Internacional. Además de las innovaciones puramente mecánicas y estructurales, la sincronización orbital y las maniobras de despresurización exigieron cálculos balísticos y termodinámicos de una precisión asombrosa para la época.', 'La valentía inquebrantable de los cosmonautas involucrados, sumada a su excepcional entrenamiento físico y psicológico, fue el factor determinante que previno una catástrofe ante las múltiples fallas sistémicas que ocurrieron. El impacto geopolítico de este logro monumental resonó a nivel mundial, consolidando temporalmente la supremacía soviética en la carrera espacial y forzando a los Estados Unidos a acelerar drásticamente su programa Gemini.', 'La fisiología humana en el entorno de microgravedad y vacío absoluto del espacio exterior presentó desafíos formidables, requiriendo adaptaciones innovadoras en el equipo y los procedimientos operativos de la misión. El impacto geopolítico de este logro monumental resonó a nivel mundial, consolidando temporalmente la supremacía soviética en la carrera espacial y forzando a los Estados Unidos a acelerar drásticamente su programa Gemini.', 'Las lecciones extraídas de estos eventos pioneros continúan influyendo profundamente en el diseño contemporáneo de trajes espaciales y protocolos de seguridad para actividades extravehiculares en la Estación Espacial Internacional. Cada detalle microscópico de la misión fue sometido a pruebas exhaustivas en cámaras de vacío y simuladores de gravedad cero, aunque las condiciones reales del cosmos demostraron ser exponencialmente más impredecibles.'] }
    ],
    fact: 'Cada detalle microscópico de la misión fue sometido a pruebas exhaustivas en cámaras de vacío y simuladores de gravedad cero, aunque las condiciones reales del cosmos demostraron ser exponencialmente más impredecibles. Además de las innovaciones puramente mecánicas y estructurales, la sincronización orbital y las maniobras de despresurización exigieron cálculos balísticos y termodinámicos de una precisión asombrosa para la época.'
  },
  {
    id: 'regreso-peligroso',
    title: 'Un Regreso al Límite',
    color: '#3949AB',
    btnImage: '/assets/course/animales_pioneros/btn_leonov.jpg',
    image: '/assets/course/animales_pioneros/banner_pioneros.jpg',
    content: ['Las lecciones extraídas de estos eventos pioneros continúan influyendo profundamente en el diseño contemporáneo de trajes espaciales y protocolos de seguridad para actividades extravehiculares en la Estación Espacial Internacional. La valentía inquebrantable de los cosmonautas involucrados, sumada a su excepcional entrenamiento físico y psicológico, fue el factor determinante que previno una catástrofe ante las múltiples fallas sistémicas que ocurrieron.', 'Las lecciones extraídas de estos eventos pioneros continúan influyendo profundamente en el diseño contemporáneo de trajes espaciales y protocolos de seguridad para actividades extravehiculares en la Estación Espacial Internacional. Durante esta fase crítica del desarrollo tecnológico, los ingenieros y científicos soviéticos tuvieron que superar obstáculos sin precedentes, diseñando sistemas de soporte vital bajo una inmensa presión política y de tiempo.', 'El estudio histórico y técnico de Un Regreso al Límite revela una complejidad extraordinaria que marcó un hito indiscutible en la historia de la exploración espacial humana. La fisiología humana en el entorno de microgravedad y vacío absoluto del espacio exterior presentó desafíos formidables, requiriendo adaptaciones innovadoras en el equipo y los procedimientos operativos de la misión. El estudio histórico y técnico de Un Regreso al Límite revela una complejidad extraordinaria que marcó un hito indiscutible en la historia de la exploración espacial humana.', 'La fisiología humana en el entorno de microgravedad y vacío absoluto del espacio exterior presentó desafíos formidables, requiriendo adaptaciones innovadoras en el equipo y los procedimientos operativos de la misión. La valentía inquebrantable de los cosmonautas involucrados, sumada a su excepcional entrenamiento físico y psicológico, fue el factor determinante que previno una catástrofe ante las múltiples fallas sistémicas que ocurrieron.', 'El estudio histórico y técnico de Un Regreso al Límite revela una complejidad extraordinaria que marcó un hito indiscutible en la historia de la exploración espacial humana. Cada detalle microscópico de la misión fue sometido a pruebas exhaustivas en cámaras de vacío y simuladores de gravedad cero, aunque las condiciones reales del cosmos demostraron ser exponencialmente más impredecibles. Durante esta fase crítica del desarrollo tecnológico, los ingenieros y científicos soviéticos tuvieron que superar obstáculos sin precedentes, diseñando sistemas de soporte vital bajo una inmensa presión política y de tiempo.'],
    expandables: [
      { label: 'Análisis Detallado', icon: 'zap', text: ['La valentía inquebrantable de los cosmonautas involucrados, sumada a su excepcional entrenamiento físico y psicológico, fue el factor determinante que previno una catástrofe ante las múltiples fallas sistémicas que ocurrieron. La fisiología humana en el entorno de microgravedad y vacío absoluto del espacio exterior presentó desafíos formidables, requiriendo adaptaciones innovadoras en el equipo y los procedimientos operativos de la misión.', 'Las lecciones extraídas de estos eventos pioneros continúan influyendo profundamente en el diseño contemporáneo de trajes espaciales y protocolos de seguridad para actividades extravehiculares en la Estación Espacial Internacional. La valentía inquebrantable de los cosmonautas involucrados, sumada a su excepcional entrenamiento físico y psicológico, fue el factor determinante que previno una catástrofe ante las múltiples fallas sistémicas que ocurrieron.', 'El impacto geopolítico de este logro monumental resonó a nivel mundial, consolidando temporalmente la supremacía soviética en la carrera espacial y forzando a los Estados Unidos a acelerar drásticamente su programa Gemini. La fisiología humana en el entorno de microgravedad y vacío absoluto del espacio exterior presentó desafíos formidables, requiriendo adaptaciones innovadoras en el equipo y los procedimientos operativos de la misión.', 'Además de las innovaciones puramente mecánicas y estructurales, la sincronización orbital y las maniobras de despresurización exigieron cálculos balísticos y termodinámicos de una precisión asombrosa para la época. Además de las innovaciones puramente mecánicas y estructurales, la sincronización orbital y las maniobras de despresurización exigieron cálculos balísticos y termodinámicos de una precisión asombrosa para la época.', 'La valentía inquebrantable de los cosmonautas involucrados, sumada a su excepcional entrenamiento físico y psicológico, fue el factor determinante que previno una catástrofe ante las múltiples fallas sistémicas que ocurrieron. Durante esta fase crítica del desarrollo tecnológico, los ingenieros y científicos soviéticos tuvieron que superar obstáculos sin precedentes, diseñando sistemas de soporte vital bajo una inmensa presión política y de tiempo.'] },
      { label: 'Contexto Histórico', icon: 'clock', text: ['La fisiología humana en el entorno de microgravedad y vacío absoluto del espacio exterior presentó desafíos formidables, requiriendo adaptaciones innovadoras en el equipo y los procedimientos operativos de la misión. Cada detalle microscópico de la misión fue sometido a pruebas exhaustivas en cámaras de vacío y simuladores de gravedad cero, aunque las condiciones reales del cosmos demostraron ser exponencialmente más impredecibles.', 'El impacto geopolítico de este logro monumental resonó a nivel mundial, consolidando temporalmente la supremacía soviética en la carrera espacial y forzando a los Estados Unidos a acelerar drásticamente su programa Gemini. El estudio histórico y técnico de Un Regreso al Límite - Contexto revela una complejidad extraordinaria que marcó un hito indiscutible en la historia de la exploración espacial humana. El impacto geopolítico de este logro monumental resonó a nivel mundial, consolidando temporalmente la supremacía soviética en la carrera espacial y forzando a los Estados Unidos a acelerar drásticamente su programa Gemini.', 'La valentía inquebrantable de los cosmonautas involucrados, sumada a su excepcional entrenamiento físico y psicológico, fue el factor determinante que previno una catástrofe ante las múltiples fallas sistémicas que ocurrieron. Cada detalle microscópico de la misión fue sometido a pruebas exhaustivas en cámaras de vacío y simuladores de gravedad cero, aunque las condiciones reales del cosmos demostraron ser exponencialmente más impredecibles.', 'El estudio histórico y técnico de Un Regreso al Límite - Contexto revela una complejidad extraordinaria que marcó un hito indiscutible en la historia de la exploración espacial humana. El estudio histórico y técnico de Un Regreso al Límite - Contexto revela una complejidad extraordinaria que marcó un hito indiscutible en la historia de la exploración espacial humana. La fisiología humana en el entorno de microgravedad y vacío absoluto del espacio exterior presentó desafíos formidables, requiriendo adaptaciones innovadoras en el equipo y los procedimientos operativos de la misión.', 'Las lecciones extraídas de estos eventos pioneros continúan influyendo profundamente en el diseño contemporáneo de trajes espaciales y protocolos de seguridad para actividades extravehiculares en la Estación Espacial Internacional. El estudio histórico y técnico de Un Regreso al Límite - Contexto revela una complejidad extraordinaria que marcó un hito indiscutible en la historia de la exploración espacial humana. Además de las innovaciones puramente mecánicas y estructurales, la sincronización orbital y las maniobras de despresurización exigieron cálculos balísticos y termodinámicos de una precisión asombrosa para la época.'] }
    ],
    fact: 'Las lecciones extraídas de estos eventos pioneros continúan influyendo profundamente en el diseño contemporáneo de trajes espaciales y protocolos de seguridad para actividades extravehiculares en la Estación Espacial Internacional. La valentía inquebrantable de los cosmonautas involucrados, sumada a su excepcional entrenamiento físico y psicológico, fue el factor determinante que previno una catástrofe ante las múltiples fallas sistémicas que ocurrieron.'
  },
];

// Temporal Particle Field
function TemporalField() {
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
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.15,
      color: Math.random() > 0.5 ? '216, 125, 74' : '128, 222, 234',
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.2;
        p.x += p.drift;
        p.y -= 0.08;
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
        if (p.x < -5 || p.x > w + 5) p.x = Math.random() * w;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${Math.max(0, opacity)})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

// Time Machine Header
function TimeMachineHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(216,125,74,0.3))' }}>
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 4 }, (_, i) => {
          const t = (i + 0.5) / 4;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#D87D4A','#D4B872','#80DEEA','#3949AB'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(216,125,74,0.2)" />
            <stop offset="50%" stopColor="rgba(216,125,74,0.9)" />
            <stop offset="100%" stopColor="rgba(216,125,74,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D87D4A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">ALEXEI LEONOV</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(216,125,74,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LA PRIMERA CAMINATA ESPACIAL</text>
      </svg>
    </div>
  );
}

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
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem',
        position: 'relative',
      }}
    >
      <div style={{
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: `3px solid ${isActive ? node.color : 'rgba(216,125,74,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}  loading="lazy" />
        {isActive && (
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              position: 'absolute',
              inset: '-4px',
              borderRadius: '50%',
              border: `2px solid ${node.color}`,
              pointerEvents: 'none',
            }}
          />
        )}
      </div>

      <span style={{
        color: isActive ? node.color : 'rgba(255,255,255,0.75)',
        fontSize: '0.78rem', fontWeight: 700, letterSpacing:'0.3px',
        textAlign: 'center',
        lineHeight: 1.2,
        transition: 'color 0.3s',
        maxWidth: '100px',
        textShadow: isActive ? `0 0 8px ${node.color}40` : 'none',
      }}>
        {node.title}
      </span>
    </motion.button>
  );
}

const DIRECTIONS = ['up', 'down', 'left', 'right'];
const dirVariants = {
  up:    { hidden: { y: -30, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  down:  { hidden: { y: 30, opacity: 0 },  visible: { y: 0, opacity: 1 } },
  left:  { hidden: { x: -30, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  right: { hidden: { x: 30, opacity: 0 },  visible: { x: 0, opacity: 1 } },
};

const EXPAND_ICONS = {
  clock: Clock,
  zap: Zap,
  atom: Atom,
};

function ExpandableSection({ item, color }) {
  const [open, setOpen] = useState(false);
  const dir = useMemo(() => DIRECTIONS[Math.floor(Math.random() * 4)], []);
  const IconComp = EXPAND_ICONS[item.icon] || Sparkles;
  
  return (
    <div style={{
      marginTop: '0.8rem',
      borderRadius: '14px',
      border: `1px solid ${color}25`,
      overflow: 'hidden',
      background: `linear-gradient(135deg, ${color}08, transparent)`,
    }}>
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ backgroundColor: `${color}12` }}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '0.7rem',
          padding: '0.8rem 1rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'rgba(255,255,255,0.9)',
        }}
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            width: '30px', height: '30px', borderRadius: '50%',
            background: `${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <IconComp size={14} style={{ color }} />
        </motion.div>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color, letterSpacing: '0.5px', flex: 1, textAlign: 'left' }}>
          {item.label}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={16} style={{ color, opacity: 0.7 }} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={dirVariants[dir]}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ padding: '0 1rem 1rem 1rem' }}
          >
            {item.text.map((para, i) => (
              <p key={i} style={{
                margin: '0 0 0.8rem', fontSize: '0.9rem', lineHeight: 1.75,
                color: 'rgba(255,255,255,0.85)',
                borderLeft: `3px solid ${color}30`,
                paddingLeft: '0.8rem',
              }}>
                {para}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
        background: 'rgba(10, 12, 30, 0.92)',
        backdropFilter: 'blur(24px)',
        border: `1px solid ${node.color}30`,
        borderRadius: '24px',
        position: 'relative',
        zIndex: 3,
        marginTop: '1rem',
        overflow: 'hidden',
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

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        minHeight: '280px',
      }}>
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
          background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))`,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{
            width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9,
            minHeight: '280px',
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
            margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800, color: node.color, letterSpacing:'-0.02em',
            display: 'flex', alignItems: 'center', gap: '0.6rem',
          }}>
            <span style={{
              display: 'inline-flex', width: '40px', height: '40px',
              borderRadius: '50%', overflow: 'hidden',
              border: `2px solid ${node.color}40`,
              flexShrink: 0,
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

      <div style={{
        padding: '1.5rem 2rem 2rem',
        position: 'relative',
      }}>
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div
              key={i}
              animate={{ y: [0, -8, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 5, pos.rotate || 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents:'none' }}
            >
              <Deco size={55 + i * 10} color={node.color} />
            </motion.div>
          );
        })}

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.2rem 2rem',
          position: 'relative',
          zIndex: 2,
        }}>
          {node.content.slice(2).map((para, i) => {
            const isWide = i === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
            return (
              <div
                key={i}
                style={{
                  gridColumn: isWide ? '1 / -1' : 'auto',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  borderLeft: `3px solid ${node.color}30`,
                  position: 'relative',
                }}
              >
                <div style={{
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color:'#0B0E2D',
                  fontSize: '0.65rem', fontWeight: 800,
                  padding: '2px 8px', borderRadius: '8px',
                  letterSpacing: '1px',
                }}>
                  {i === 0 ? 'â—†' : 'â—‡'}
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

        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {node.expandables.map((item, i) => (
                <ExpandableSection key={i} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}

        <motion.div
          whileHover={{ scale: 1.01 }}
          style={{
            marginTop: '1.5rem',
            padding: '1.2rem',
            background: `linear-gradient(90deg, ${node.color}15, transparent)`,
            borderLeft: `4px solid ${node.color}`,
            borderRadius: '0 12px 12px 0',
            display: 'flex', gap: '1rem', alignItems: 'flex-start',
            position: 'relative', zIndex: 2,
          }}
        >
          <Sparkles size={24} color={node.color} style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{ margin: 0, fontSize: '0.95rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>
            {node.fact}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ProgressBar({ visited, total }) {
  const progress = (visited.length / total) * 100;
  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto 2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
        <span>Progreso de Exploración</span>
        <span>{visited.length} / {total} Completado</span>
      </div>
      <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #D87D4A, #80DEEA)', borderRadius: '3px' }}
        />
      </div>
    </div>
  );
}

export default function InteractiveInfographic_PionerosM5() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState([]);

  const handleNodeClick = (id) => {
    setActiveNode(activeNode === id ? null : id);
    if (!visitedNodes.includes(id)) {
      setVisitedNodes(prev => [...prev, id]);
    }
  };

  const allCompleted = visitedNodes.length === INFOGRAPHIC_NODES.length;

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: 'url(/assets/course/animales_pioneros/banner_pioneros.jpg) center/cover',
      position: 'relative',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem 1rem',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%)',
        zIndex: 1,
      }} />

      <TemporalField />

      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: '1100px', margin: '0 auto',
        border: '1px solid rgba(216,125,74,0.12)',
        borderRadius: '24px',
        padding: '2rem',
        background: 'rgba(10, 12, 30, 0.4)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(216,125,74,0.05)',
      }}>
        <TimeMachineHeader />
        
        <ProgressBar visited={visitedNodes} total={INFOGRAPHIC_NODES.length} />

        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem',
          marginBottom: '2rem', position: 'relative', zIndex: 2,
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <NodeButton
              key={node.id}
              node={node}
              index={i}
              isActive={activeNode === node.id}
              onClick={() => handleNodeClick(node.id)}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeNode && (
            <ContentPanel
              key={activeNode}
              node={INFOGRAPHIC_NODES.find(n => n.id === activeNode)}
              onClose={() => setActiveNode(null)}
              setLightboxSrc={setLightboxSrc}
            />
          )}
        </AnimatePresence>

        {allCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: '3rem', padding: '2rem',
              background: 'linear-gradient(135deg, rgba(216,125,74,0.1), rgba(128,222,234,0.05))',
              borderRadius: '20px', border: '1px solid rgba(216,125,74,0.3)',
              textAlign: 'center',
            }}
          >
            <Star size={40} color="#D87D4A" style={{ margin: '0 auto 1rem', filter: 'drop-shadow(0 0 10px rgba(216,125,74,0.5))' }} />
            <h3 style={{ color: '#D87D4A', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Misión Completada</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto' }}>
              Has explorado exhaustivamente todos los detalles técnicos e históricos de la pionera misión Vosjod 2 y el histórico paseo espacial de Alexei Leonov.
            </p>
          </motion.div>
        )}

        <div style={{
          marginTop: '4rem', padding: '2rem',
          background: 'rgba(0,0,0,0.3)', borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <h4 style={{ color: '#D87D4A', margin: '0 0 1rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={20} />
            Bibliografía y Referencias
          </h4>
          <ul style={{ margin: 0, padding: '0 0 0 1.2rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.8 }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <li key={i} style={{ marginBottom: '0.5rem' }}>{bib}</li>
            ))}
          </ul>
        </div>
      </div>

      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
