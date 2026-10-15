'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Habitable Zone & Biosignatures themed) ─────────
function DecoHabitableZone({ size = 70, color = '#64FFDA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="6" fill="#FFD740" />
      <circle cx="30" cy="30" r="14" fill="none" stroke="#FF5252" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="3" opacity="0.7" />
      <circle cx="30" cy="30" r="28" fill="none" stroke="#448AFF" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
      <circle cx="48" cy="30" r="3" fill={color} />
    </svg>
  );
}

function DecoMagnetosphere({ size = 70, color = '#00E5FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="32" cy="30" r="12" fill={color} opacity="0.6" />
      <path d="M 10 15 Q 35 15, 48 30 Q 35 45, 10 45" fill="none" stroke={color} strokeWidth="2" />
      <path d="M 5 22 Q 32 22, 44 30 Q 32 38, 5 38" fill="none" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <line x1="2" y1="18" x2="18" y2="18" stroke="#FFD740" strokeWidth="1.5" />
      <line x1="2" y1="30" x2="14" y2="30" stroke="#FFD740" strokeWidth="1.5" />
      <line x1="2" y1="42" x2="18" y2="42" stroke="#FFD740" strokeWidth="1.5" />
    </svg>
  );
}

function DecoTrappist({ size = 70, color = '#FF5252', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="10" cy="30" r="7" fill={color} />
      <circle cx="20" cy="30" r="2" fill="#B388FF" />
      <circle cx="26" cy="30" r="2" fill="#00E5FF" />
      <circle cx="32" cy="30" r="2.5" fill="#64FFDA" />
      <circle cx="38" cy="30" r="2.5" fill="#64FFDA" />
      <circle cx="44" cy="30" r="2.5" fill="#64FFDA" />
      <circle cx="50" cy="30" r="2" fill="#FFD740" />
      <circle cx="56" cy="30" r="1.5" fill="#FF9100" />
    </svg>
  );
}

function DecoBiosignature({ size = 70, color = '#FF80AB', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="20" cy="20" r="5" fill={color} />
      <circle cx="40" cy="20" r="5" fill={color} />
      <circle cx="30" cy="42" r="7" fill={color} />
      <line x1="20" y1="20" x2="30" y2="42" stroke={color} strokeWidth="2" />
      <line x1="40" y1="20" x2="30" y2="42" stroke={color} strokeWidth="2" />
      <line x1="20" y1="20" x2="40" y2="20" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
  );
}

function DecoTechnosignature({ size = 70, color = '#B388FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M 20 48 L 40 48 M 30 48 L 30 30" stroke={color} strokeWidth="2" />
      <path d="M 18 30 C 18 18 42 18 42 30 Z" fill="none" stroke={color} strokeWidth="2" />
      <path d="M 12 15 A 25 25 0 0 1 48 15" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M 6 8 A 32 32 0 0 1 54 8" fill="none" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
}

function DecoAstrobiology({ size = 70, color = '#FFD740', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M 20 25 Q 30 15 40 25 T 20 35 T 40 45" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="25" cy="28" r="2" fill={color} />
      <circle cx="35" cy="32" r="2" fill={color} />
    </svg>
  );
}

const DECO_MAP = {
  'concepto-zona-habitable': [DecoHabitableZone, DecoMagnetosphere, DecoTrappist],
  'factores-habitabilidad': [DecoMagnetosphere, DecoHabitableZone, DecoAstrobiology],
  'sistema-trappist-1': [DecoTrappist, DecoHabitableZone, DecoBiosignature],
  'biofirmas-atmosfericas': [DecoBiosignature, DecoAstrobiology, DecoTechnosignature],
  'tecnofirmas-espaciales': [DecoTechnosignature, DecoBiosignature, DecoTrappist],
  'falsos-positivos-biofirmas': [DecoAstrobiology, DecoBiosignature, DecoHabitableZone],
  'busqueda-vida-futuro': [DecoHabitableZone, DecoTechnosignature, DecoMagnetosphere],
};

const BIBLIOGRAPHY = [
  'Kasting, J. F., Whitmire, D. P., & Reynolds, R. T. (1993). "Habitable Zones around Main Sequence Stars", Icarus, 101(1), 108-128.',
  'Gillon, M. et al. (2017). "Seven temperate terrestrial planets around the nearby ultracool dwarf star TRAPPIST-1", Nature, 542(7642), 456-460.',
  'Schwieterman, E. W. et al. (2018). "Exoplanet Biosignatures: A Review of Remotely Detectable Signs of Life", Astrobiology, 18(6), 663-708.',
  'Meadows, V. S. et al. (2018). "The Habitable Zone Planet Finder and Biosignature Identification", Astrobiology, 18(6), 630-662.',
  'Des Marais, D. J. et al. (2002). "Remote Sensing of Planetary Biosignatures: Tenets in the Search for Extra-Terrestrial Life", Astrobiology, 2(2), 153-181.'
];

const INFOGRAPHIC_NODES = [
  {
    "id": "concepto-zona-habitable",
    "title": "La Zona Habitable",
    "color": "#64FFDA",
    "btnImage": "/assets/exoplanetas/infographic_m4/btn_concepto-zona-habitable.jpg",
    "image": "/assets/exoplanetas/infographic_m4/hero_concepto-zona-habitable.jpg",
    "bannerImage": "/assets/exoplanetas/infographic_m4/banner_concepto-zona-habitable.webp",
    "bannerCaption": "Zona habitable: la franja dorada alrededor de cada estrella donde el agua líquida puede existir",
    "content": [
      "La zona habitable circunestelar (denominada en la divulgacion cientifica como zona Ricitos de Oro) se define en astrofisica teorica como la region anular alrededor de una estrella donde los niveles de flujo radiativo incidente permiten que un planeta de masa rocosa y atmosfera adecuada sostenga agua pura en estado liquido sobre su superficie de forma termodinamicamente estable durante eones geologicos continuados.",
      "Los limites fisicos precisos de esta zona fueron modelados cuantitativamente mediante balances radiativo-convectivos unidimensionales por el geofisico James Kasting en 1993 y perfeccionados por Ravi Kopparapu en 2013. El limite interior conservador viene determinado por el umbral del invernadero humedo (moist greenhouse) y el efecto invernadero desbocado (runaway greenhouse), donde la insolacion excesiva provoca que la columna de vapor de agua se vuelva opticamente densa, desatando la ebullicion de los oceanos.",
      "Por su parte, el limite exterior de la zona habitable esta impuesto termodinamicamente por la cota del maximo efecto invernadero ejercido por el dioxido de carbono (maximum greenhouse limit): mas alla de esta distancia orbital, la adicion de CO2 ya no puede compensar la caida en la temperatura superficial porque la condensacion del gas en nubes de hielo seco y la dispersion de Rayleigh incrementan radicalmente el albedo planetario, precipitando una glaciacion global irreversible.",
      "La extension geometrica y distancia radial de la zona habitable dependen directamente de la temperatura efectiva y de la luminosidad bolometrica de la estrella central. Alrededor de estrellas calientes de secuencia principal de tipo F o G, la franja se desplaza hacia distancias orbitales superiores a una o dos unidades astronomicas; en cambio, alrededor de enanas rojas ultrafrías de tipo M, la zona habitable se encuentra comprimida a escasas centesimas de unidad astronomica de la fotosfera estelar.",
      "Pertenecer a la zona habitable constituye un requisito astronomico fundamental pero de ningun modo garantiza por si solo la habitabilidad biologica efectiva. En nuestro propio Sistema Solar, mundos como la Luna y Marte orbitan dentro o en las inmediaciones de la zona habitable del Sol, pero su reducida masa superficial impidio retener campos magneticos y atmosferas densas, lo que evidencia que la habitabilidad requiere la convergencia critica entre coordenadas orbitales y propiedades geofisicas endogenas."
    ],
    "fact": "La zona habitable circunestelar delimita la franja orbital donde un planeta rocoso puede sostener agua liquida superficial en equilibrio termodinamico; sus fronteras fisicas estan impuestas por el desbocamiento del efecto invernadero en el borde interior (0.95 UA en el Sol) y por la condensacion del dioxido de carbono en el exterior (1.67 UA).",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los modelos climaticos actualizados de Kopparapu demuestran que la zona habitable no es estatica: a medida que una estrella de la secuencia principal fusiona hidrogeno en su nucleo, su luminosidad aumenta un diez por ciento cada mil millones de anos, desplazando continuamente la zona habitable hacia el exterior de forma secular."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El concepto de zona habitable continua (CHZ) define la franja orbital mas estrecha que permanece ininterrumpidamente habitable a lo largo de toda la evolucion de una estrella; para nuestro Sistema Solar, esta zona continua apenas abarca una estrecha banda comprendida entre 0.95 y 1.15 unidades astronomicas."
      }
    ]
  },
  {
    "id": "factores-habitabilidad",
    "title": "Factores de Habitabilidad",
    "color": "#00E5FF",
    "btnImage": "/assets/exoplanetas/infographic_m4/btn_factores-habitabilidad.jpg",
    "image": "/assets/exoplanetas/infographic_m4/hero_factores-habitabilidad.jpg",
    "bannerImage": "/assets/exoplanetas/infographic_m4/banner_factores-habitabilidad.webp",
    "bannerCaption": "Factores de habitabilidad: campo magnético, tectónica, luna estabilizadora y atmósfera son clave",
    "content": [
      "La emergencia y perpetuacion de una biosfera planetaria exige una compleja red de factores endogenos y dinamicos que trascienden con creces la simple ubicacion orbital. Un planeta rocoso potencialmente habitable debe funcionar como un motor geofisico acoplado donde la litosfera, el nucleo metalico profundo, la columna atmosferica y la hidrosfera interactuen mediante ciclos biogeoquimicos autorregulados capaces de amortiguar perturbaciones cosmicas catastroficas.",
      "El factor determinante primario es la masa planetaria critica, la cual debe situarse idealmente entre 0.5 y 5 masas terrestres. Planetas con masa deficiente sufren una rapida disipacion del calor radiogenico primordial y carecen del potencial gravitatorio necesario para evitar el escape hidrodinamico de gases ligeros hacia el espacio; por el contrario, mundos excesivamente masivos pueden atrapar envelopes de hidrogeno primordial convirtiendose en sub-Neptunos inhabitables.",
      "El segundo requisito geofisico indispensable es la existencia de una geodinamo activa en el nucleo exterior liquido que genere una magnetosfera dipolar planetaria robusta. Este escudo magnetico desvia el flujo continuo de iones energeticos del viento estelar y las eyecciones de masa coronal, blindando la atmosfera frente al decapado erosivo por pulverizacion ionica (sputtering) y protegiendo a los polimeros prebioticos superficiales de la radiacion ionizante destructiva.",
      "Asimismo, la tectonica de placas opera como el termostato climatico maestro a traves del ciclo silicato-carbonato: el dioxido de carbono atmosferico es capturado por meteorizacion quimica fluvial de silicatos, transportado al lecho oceanico como carbonato de calcio, subducido hacia el manto superior y reinyectado gradualmente a la atmosfera mediante vulcanismo de arco a escalas temporales de cientos de miles de anos, estabilizando la temperatura global.",
      "Finalmente, la presencia de un satelite masivo estabilizador (como la Luna terrestre) amortigua las oscilaciones caoticas de la oblicuidad del eje de rotacion planetario causadas por resonancias de marea con planetas gigantes vecinos. Esta estabilidad axial impide que los polos geograficos apunten directamente hacia la estrella anfitriona, evitando transiciones climaticas extremas que podrian desatar congelaciones globales o colapsos barometricos."
    ],
    "fact": "La habitabilidad planetaria requiere un delicado equilibrio multifactorial: masa suficiente para retener atmosfera, geodinamo activa para generar un escudo magnetosferico protector, tectonica de placas para regular el ciclo silicato-carbonato y estabilidad en la oblicuidad orbital para preservar climas benignos.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El astrofisico Rene Heller acuno el concepto de Planeta Superhabitable para describir mundos con una masa aproximada de 1.2 a 1.5 masas terrestres orbitando estrellas enanas naranjas de tipo K: estos planetas retendrian una tectonica mas longeva, mayor biodiversidad potencial y gozarian de estabilidades estelares de hasta treinta mil millones de anos."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Sin el ciclo geologico silicato-carbonato regulado por la tectonica de placas terrestres, el enfriamiento conductivo del manto habria provocado que el dioxido de carbono se acumulase de forma incontrolada en la atmosfera o quedase totalmente sepultado en rocas calizas, extinguiendo la vida compleja en pocos millones de anos."
      }
    ]
  },
  {
    "id": "sistema-trappist-1",
    "title": "El Sistema TRAPPIST-1",
    "color": "#FF5252",
    "btnImage": "/assets/exoplanetas/infographic_m4/btn_sistema-trappist-1.jpg",
    "image": "/assets/exoplanetas/infographic_m4/hero_sistema-trappist-1.jpg",
    "bannerImage": "/assets/exoplanetas/infographic_m4/banner_sistema-trappist-1.webp",
    "bannerCaption": "TRAPPIST-1: 7 planetas del tamaño de la Tierra a solo 40 años luz, 3 en zona habitable",
    "content": [
      "Localizado a escasos 39.6 anos luz de distancia en la constelacion austral de Acuario, el sistema planetario TRAPPIST-1 se erige como el laboratorio astrofisico y astrobiologico mas prometedor de la galaxia para estudiar mundos rocosos templados. Descubierto en 2017 por un consorcio internacional encabezado por Michael Gillon, este singular enclave estelar alberga una prolifica familia de siete exoplanetas de dimensiones y composiciones homologas a la Tierra y Venus.",
      "La estrella anfitriona TRAPPIST-1 es una enana roja ultrafría de tipo espectral M8V con una masa equivalente al nueve por ciento de la masa solar y un diametro apenas ligeramente superior al del planeta Jupiter. Dado que la luminosidad bolometrica de esta diminuta estrella es casi dos mil veces inferior a la del Sol, la totalidad de su cohorte planetaria orbita a distancias increiblemente compactas, confinada dentro de un radio menor a una quinta parte de la distancia entre Mercurio y el Sol.",
      "La singularidad astrobiologica del sistema radica en que tres de sus integrantes (los exoplanetas TRAPPIST-1 e, f y g) orbitan de forma simultanea dentro de la zona de habitabilidad conservadora calculada para enanas M. En particular, TRAPPIST-1 e exhibe un radio de 0.92 radios terrestres, una masa del sesenta y nueve por ciento de la terrestre y una densidad de 5.6 gramos por centimetro cubico, valores que certifican una fraccion de nucleo metalico de hierro analoga a la estructura geofisica de la Tierra.",
      "Las interacciones gravitatorias seculares entre los siete planetas configuran una intrincada y elegante cadena de resonancias de Laplace tridimensionales casi perfectas: por cada ocho orbitas que completa el planeta b, el planeta c ejecuta cinco, el d describe tres y el e realiza exactamente dos. Esta arquitectura dinamica autoestabilizada ha garantizado la pervivencia secular del sistema sin colisiones orbitales a lo largo de sus mas de siete mil millones de anos de historia evolutiva.",
      "El Telescopio Espacial James Webb dedica amplios programas de observacion prioritaria mediante sus instrumentos MIRI y NIRSpec para escudrinar la presencia de atmosferas en estos mundos. Mientras que las mediciones iniciales de emision termica en TRAPPIST-1 b y c han descartado envolturas gaseosas densas de CO2 puro debido a la intensa actividad eruptiva de la estrella en sus etapas juveniles, TRAPPIST-1 e y f representan los objetivos supremos para buscar indicios de agua y biosignaturas quimicas."
    ],
    "fact": "El sistema TRAPPIST-1 alberga siete planetas de tamano terrestre orbitando en resonancia armonica alrededor de una enana roja ultrafría a 40 anos luz; tres de ellos (e, f y g) residen en la zona de habitabilidad, constituyendo el laboratorio astrobiologico mas extraordinario para la espectroscopia del telescopio James Webb.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los analisis de variacion de tiempo de transito (TTV) permitieron determinar las masas de los siete planetas de TRAPPIST-1 con un margen de error inferior al tres por ciento, confirmando que todos estan compuestos principalmente por silicatos y hierro, aunque algunos miembros exteriores podrian albergar capas volátiles de agua de hasta el cinco por ciento en masa."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Debido a la extrema cercania mutua entre las orbitas del sistema TRAPPIST-1, los planetas vecinos se observarian desde la superficie de TRAPPIST-1 e con un tamano angular hasta tres veces mayor que la Luna llena en nuestro cielo, permitiendo contemplar continentes y patrones meteorologicos a simple vista."
      }
    ]
  },
  {
    "id": "biofirmas-atmosfericas",
    "title": "Biofirmas Atmosféricas",
    "color": "#FF80AB",
    "btnImage": "/assets/exoplanetas/infographic_m4/btn_biofirmas-atmosfericas.jpg",
    "image": "/assets/exoplanetas/infographic_m4/hero_biofirmas-atmosfericas.jpg",
    "bannerImage": "/assets/exoplanetas/infographic_m4/banner_biofirmas-atmosfericas.webp",
    "bannerCaption": "Biofirmas atmosféricas: oxígeno + metano en desequilibrio químico sería señal inequívoca de vida",
    "content": [
      "En la vanguardia de la astrobiologia contemporanea, una biofirma atmosferica remota se define como la deteccion espectroscopica inequivoca de una especie gaseosa, conjunto de moleculas o patron temporal reflectivo cuya abundancia y persistencia en la columna atmosferica exoplanetaria no puede ser reconciliada con ningun mecanismo fisico abiotico conocido, demandando la intervencion sostenida de actividad metabolica biologica.",
      "El estandar de oro de las biofirmas gaseosas reside en la deteccion de especies quimicas en profundo desequilibrio termodinamico redox simultaneo, tipificado en la Tierra por la coexistencia anomala de dioxido de carbono, oxigeno molecular (O2) y metano (CH4). En terminos de cinetica quimica, el metano y el oxigeno reaccionan de manera espontanea en presencia de fotones solares para formar agua y dioxido de carbono; por lo tanto, su coexistencia continuada en concentraciones significativas solo es factible si una biosfera activa repone ambos gases a tasas colosales.",
      "El oxigeno biogenico producido por fototrofos oxigenicos genera asimismo una capa secundaria estratosferica de ozono (O3) mediante el ciclo fotoquimico de Chapman. La banda de absorcion vibracional del ozono a 9.6 micrometros en el infrarrojo termico es sumamente profunda y no lineal: pequenas concentraciones de oxigeno molecular residual en la atmosfera bastan para generar una prominente huella espectral de ozono, facilitando enormemente su deteccion remota con observatorios criogenicos espaciales.",
      "Ademas de los gases respiratorios primarios, los investigadores rastrean metabolitos secundarios especializados como el dimetilsulfuro (DMS, (CH3)2S) y el disulfuro de dimetilo. En nuestro planeta, el DMS es sintetizado de forma casi exclusiva por microorganismos marinos fotosinteticos pertenecientes al fitoplancton oceanico a partir del DMSP; la identificacion conjunta de DMS, vapor de agua y metano en mundos con oceanos templados constituiria una prueba astrobiologica de primer orden.",
      "Asimismo, se investigan biofirmas de superficie basadas en propiedades opticas de pigmentos fotosinteticos, como el Borde Rojo de la Clorofila (Vegetation Red Edge): un pronunciado incremento escalonado en la reflectancia espectral de la luz estelar a longitudes de onda superiores a setecientos nanometros, mecanismo biofisico adaptativo mediante el cual la vegetacion terrestre previene el estres termico celular reflejando la radiacion infrarroja cercana no fotosintetica."
    ],
    "fact": "Las biofirmas atmosfericas mas concluyentes exigen detectar desequilibrios redox termodinamicos, como la coexistencia simultanea de oxigeno molecular (O2), ozono (O3 a 9.6 um) y metano (CH4), asi como compuestos metabolicos oceanicos como el dimetilsulfuro (DMS) y la firma de reflectancia del borde rojo de la vegetacion.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La atmosfera de la Tierra primordial antes de la Gran Oxidacion hace 2,400 millones de anos albergaba una biosfera floreciente de arqueas metanogenas que inyectaban tanto metano en el aire que generaban una niebla organica fotoquimica anaranjada rica en hidrocarburos, similar a la atmosfera actual de Titan pero de origen netamente biologico."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La deteccion de indicios tentativos de dimetilsulfuro (DMS), dioxido de carbono y metano en el exoplaneta templado K2-18b por el espectrografo NIRISS del James Webb en 2023 desato un profundo debate cientifico internacional, estimulando nuevas campanas observacionales independientes para descartar interferencias moleculares abioticas y evaluar si se trata de un mundo oceanico."
      }
    ]
  },
  {
    "id": "tecnofirmas-espaciales",
    "title": "Tecnofirmas Espaciales",
    "color": "#B388FF",
    "btnImage": "/assets/exoplanetas/infographic_m4/btn_tecnofirmas-espaciales.jpg",
    "image": "/assets/exoplanetas/infographic_m4/hero_tecnofirmas-espaciales.jpg",
    "bannerImage": "/assets/exoplanetas/infographic_m4/banner_tecnofirmas-espaciales.webp",
    "bannerCaption": "Tecnofirmas: contaminación industrial, megaestructuras o comunicaciones señalarían civilizaciones",
    "content": [
      "El dominio cientifico de las tecnofirmas (tecnosignatures) abarca la busqueda astronomica de cualquier manifestacion energetica, modificacion artificial de la composicion quimica ambiental o megaestructura orbital que evidencie el uso deliberado de tecnologia avanzada por parte de una civilizacion no humana. A diferencia de las biofirmas que buscan vestigios de vida microbiana o vegetal, las tecnofirmas exploran la firma material de inteligencias tecnologicas activas.",
      "Entre las tecnofirmas atmosfericas mas diagnosticas sobresale la deteccion de moleculas gaseosas puramente sinteticas y recalcitrantes que no poseen rutas de sintesis geoquimica o fotoquimica en la naturaleza inorganica. Los clorofluorocarbonos (como el CFC-11 y CFC-12) y los perfluorocarbonos (CF4 y C2F6) representan compuestos manufacturados industrialmente por la humanidad para propelentes y refrigeracion que poseen vidas medias atmosfericas que superan los cincuenta mil anos de persistencia quimica.",
      "Si una civilizacion extraterrestre avanzada hubiese industrializado su planeta o iniciado la terraformacion de un mundo helado vecino mediante la inyeccion intencionada de supergases de efecto invernadero para espesar su atmosfera, observatorios espectroscopicos infrarrojos de proxima generacion podrian detectar las estrechas y caracteristicas bandas de absorcion de estos gases fluorados antropogenicos en la ventana termica de ocho a catorce micrometros.",
      "En el ambito de la macroingenieria estelar, los astronomos buscan anomalias fotometricas e infrarrojas consistentes con enjambres de Dyson o colectores orbitales gigantescos propuestos por Freeman Dyson en 1960. Una megaestructura artificial en orbita estelar interceptaria la radiacion optica visible de la estrella, reemitiendo la energia residual disipada en forma de un marcado exceso de flujo en el infrarrojo medio y lejano no explicable por discos de escombros de polvo circunstelar.",
      "De manera complementaria, los programas modernos de busqueda de inteligencia extraterrestre (SETI, como la multimillonaria iniciativa Breakthrough Listen) utilizan los radiotelescopios mas sensibles del planeta para rastrear emisiones de radio artificiales de banda ultraestrecha (inferiores a cinco hertzios, caracteristica exclusiva de transmisores no naturales) o pulsos de laser optico ultracortos de potencia teravatio disenados para comunicaciones o propulsion fotonica."
    ],
    "fact": "Las tecnofirmas abarcan evidencias remotas de ingenieria tecnologica extraterrestre, desde contaminantes industriales artificiales de larguisima duracion como clorofluorocarburos (CFCs) hasta enjambres de Dyson detectables por exceso infrarrojo medio o transmisiones opticas de laser pulsado coherente.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La escala de Kardashev clasifica las civilizaciones segun su consumo energetico: Tipo I aprovecha toda la energia disponible en su planeta (10^16 W), Tipo II domina la potencia total emitida por su estrella (10^26 W) mediante enjambres estelares, y Tipo III canaliza la energia a escala de toda su galaxia (10^36 W)."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La busqueda de iluminacion artificial nocturna en exoplanetas habitables en rotacion sincronizada alrededor de enanas rojas podria ser factible con el futuro Habitable Worlds Observatory: megalopolis alienigenas iluminadas por LED emitirian firmas espectrales de emision en frecuencias monocromaticas inusuales."
      }
    ]
  },
  {
    "id": "falsos-positivos-biofirmas",
    "title": "Falsos Positivos y Falsos Negativos",
    "color": "#FFD740",
    "btnImage": "/assets/exoplanetas/infographic_m4/btn_falsos-positivos-biofirmas.jpg",
    "image": "/assets/exoplanetas/infographic_m4/hero_falsos-positivos-biofirmas.jpg",
    "bannerImage": "/assets/exoplanetas/infographic_m4/banner_falsos-positivos-biofirmas.webp",
    "bannerCaption": "Falsos positivos: el oxígeno abiótico y los volcanes pueden imitar señales de vida",
    "content": [
      "En la prospeccion astrobiologica contemporanea, el mayor desafio epistemologico y metodologico radica en identificar y refutar rigurosamente los falsos positivos y falsos negativos de biofirmas. Un falso positivo se produce cuando un mecanismo astrofisico o geofisico completamente inorganico genera una acumulacion atmosferica masiva de un gas supuestamente diagnostico de vida (como el oxigeno o el metano), induciendo a conclusiones erroneas.",
      "El ejemplo mas critico de falso positivo es la genesis abiotica de oxigeno molecular (O2). En planetas que orbitan estrellas con intensa emision de radiacion ultravioleta lejana (FUV) y deficiencia de hidrogeno o trampas frias ineficientes, la fotolisis masiva de moleculas de vapor de agua (H2O) en la estratosfera superior libera atomos de hidrogeno que escapan al espacio debido a su baja masa molecular, dejando tras de si una acumulacion residual de decenas de bares de oxigeno molecular libre sin presencia biologica.",
      "De manera analoga, el metano puede sintetizarse abioticamente en enormes volumenes mediante el proceso geologico de serpentinizacion hidrotermal acoplada a la reaccion de Fischer-Tropsch: cuando minerales del manto primitivo ricos en olivino ferroso reaccionan con agua de mar a presiones elevadas y temperaturas de doscientos a cuatrocientos grados Celsius, se genera hidrogeno molecular que reduce el CO2 inorganico en gas metano anhidro.",
      "Para blindar las observaciones ante falsos positivos, la comunidad astrobiologica internacional ha instaurado el principio de evaluacion del contexto ambiental holistico. Ninguna molecula puede considerarse biofirma en solitario: debe evaluarse la relacion isotopica C/O, la metalicidad estelar, la presencia de monoxido de carbono (CO, cuya presencia masiva descarta metanogenos biologicos que lo consumirian vorazmente) y la actividad eruptiva de la estrella anfitriona.",
      "En paralelo, la NASA promulgo en 2021 la Escala CoLD (Confidence of Life Detection), un protocolo escalonado de siete niveles que demanda la confirmacion instrumental independiente de la senal, la caracterizacion rigurosa del entorno geoquimico circundante, el descarte exhaustivo de hipotesis abioticas alternativas y la validacion de hipotesis predictivas antes de autenticar cualquier hallazgo historico de vida fuera de la Tierra."
    ],
    "fact": "Los falsos positivos de biofirmas (como la acumulacion masiva de oxigeno molecular por fotolisis de agua y escape de hidrogeno, o metano geologico por serpentinizacion hidrotermal) exigen aplicar la Escala CoLD de 7 niveles de la NASA para contrastar el contexto quimico antes de proclamar vida extraterrestre.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La deteccion de dioxigeno tetraatomico (O4, moleculas transitorias O2-O2 colisionales) en el espectro infrarrojo a 1.06 y 1.27 micrometros es un biomarcador de falso positivo: revela una atmosfera con presiones de oxigeno anormalmente gigantescas producidas por desecacion fotoquimica oceanica masiva abiotica."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Un falso negativo historico ocurrio en la propia Tierra: durante el eon Arqueano (hace tres mil millones de anos), la biosfera bacteriana marina era inmensa pero el oxigeno que liberaba era capturado inmediatamente por el hierro disuelto en los oceanos, manteniendo una atmosfera superficial con cero oxigeno aparente."
      }
    ]
  },
  {
    "id": "busqueda-vida-futuro",
    "title": "El Futuro de la Astrobiología",
    "color": "#FF9100",
    "btnImage": "/assets/exoplanetas/infographic_m4/btn_busqueda-vida-futuro.jpg",
    "image": "/assets/exoplanetas/infographic_m4/hero_busqueda-vida-futuro.jpg",
    "bannerImage": "/assets/exoplanetas/infographic_m4/banner_busqueda-vida-futuro.webp",
    "bannerCaption": "La búsqueda de vida en el futuro: analizar cientos de atmósferas para responder si estamos solos",
    "content": [
      "La exploracion astrobiologica entra de lleno en una transicion paradigmatica donde la inferencia estadistica indirecta cedera el paso a la resolucion optica y espectroscopica directa de planetas rocosos templados. Durante las proximas dos decadas, una alianza sinergica entre colosales infraestructuras astronomicas terrestres e innovadores observatorios espaciales coronograficos abordara de forma definitiva la cuestion de la vida cosmica.",
      "El proyecto insignia supremo planificado por la NASA para la decada de 2030 es el Habitable Worlds Observatory (HWO), un telescopio espacial optico, ultravioleta e infrarrojo cercano provisto de un espejo segmentado de seis metros. Su mision fundamental sera implementar coronografia de contraste extremo (10^-10), capaz de suprimir el deslumbramiento estelar en un factor de diez mil millones para fotografiar de forma directa la luz reflejada por al menos veinticinco análogos terrestres.",
      "Esta capacidad de obtencion de imagen directa permitira aislar el punto de luz planetario respecto a su estrella anfitriona, abriendo la via a la espectroscopia de reflectancia de alta resolucion para medir directamente el espectro superficial del planeta. Esto hara posible cuantificar la fraccion de cobertura oceanica, la dinamica estacional de masas nubosas y verificar la presencia de pigmentos biologicos fotosinteticos mediante el Borde Rojo de la Clorofila en longitud de onda de 700 nm.",
      "En el plano de las misiones espaciales europeas, el proyecto LIFE (Large Interferometer for Exoplanets) propone una constelacion de cuatro o cinco satelites volando en formacion milimetrica de precision en el punto L2, operando como un interferometro nulo en el infrarrojo medio (4 a 20 micrometros). Al anular destructivamente la luz estelar central mediante desfasaje de ondas opticas, LIFE recolectara directamente la emision termica de exoplanetas rocosos buscando CO2, H2O, CH4 y O3.",
      "Complementariamente en tierra firme, telescopios de apertura extrema como el Extremely Large Telescope (ELT de 39 metros) de la ESO en Chile, equipados con instrumentos como ANDES y PCS respaldados por optica adaptativa de orden extremo, comenzaran a sondear las atmosferas de los exoplanetas habitables mas proximos a la Tierra (como Proxima Centauri b), culminando una busqueda cientifica y ontologica milenaria."
    ],
    "fact": "La busqueda de vida extraterrestre en las proximas dos decadas se cimentara en la obtencion de imagenes directas mediante el Habitable Worlds Observatory (HWO) de la NASA, la interferometria nula espacial del proyecto LIFE de la ESA y el telescopio gigante ELT de 39 metros en el desierto de Atacama.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "En 1993, el celebre astronomo Carl Sagan utilizo los instrumentos de la sonda interplanetaria Galileo durante su sobrevuelo de asistencia gravitatoria de la Tierra como experimento de control ciego, demostrando que la combinacion de oxigeno molecular masivo, metano fuera de equilibrio y el borde rojo vegetal acreditaba que nuestro planeta alberga vida."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El Habitable Worlds Observatory utilizara un sistema optico de control de frente de onda activo con miles de micro-actuadores piezoelasticos capaces de corregir desviaciones en la superficie del espejo del orden de picometros (billonésimas de metro), la precision mecanica mas extrema alcanzada en la historia espacial."
      }
    ]
  }
];

export default function InteractiveInfographic_ExoplanetasM4() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
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
      backgroundImage: 'linear-gradient(180deg, rgba(6,20,24,0.92) 0%, rgba(10,32,30,0.88) 40%, rgba(4,14,18,0.95) 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      minHeight: '800px',
      overflow: 'hidden',
      color: '#fff',
      boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <TemporalFieldCanvas />
      <ExoplanetasHeaderM4 />
      
      {/* Progress Bar */}
      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', margin: '1.5rem 0 1rem', padding: '0 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{
              width: `${(explored.size / INFOGRAPHIC_NODES.length) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #64FFDA, #00E5FF)',
              borderRadius: '3px',
              transition: 'width 0.5s ease'
            }} />
          </div>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap', fontWeight: 600 }}>
            Módulos explorados: {explored.size}/{INFOGRAPHIC_NODES.length}
          </span>
        </div>
      </div>

      {/* Top Node Selector Carousel */}
      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', flexWrap: 'wrap',
        justifyContent: 'center', gap: '1rem', marginTop: '0.5rem',
        padding: '1rem',
        background: 'rgba(0,0,0,0.35)', borderRadius: '20px',
        border: '1px solid rgba(100,255,218,0.2)',
        backdropFilter: 'blur(10px)'
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

      {/* Content Panel Area */}
      <div style={{ position: 'relative', zIndex: 3, flex: 1, marginTop: '1rem' }}>
        <AnimatePresence mode="wait">
          {activeData ? (
            <ContentPanel key={activeData.id} node={activeData} onClose={() => setActiveNode(null)} setLightboxSrc={setLightboxSrc} />
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', height: '100%', minHeight: '320px',
                color: 'rgba(255,255,255,0.5)', textAlign: 'center', gap: '1rem',
                padding: '2rem'
              }}
            >
              <Sparkles size={36} style={{ color: '#64FFDA', opacity: 0.6 }} />
              <h3 style={{ margin: 0, color: '#64FFDA', fontSize: '1.2rem', fontWeight: 700 }}>
                Explora la Zona Habitable y las Biofirmas
              </h3>
              <p style={{ fontSize: '0.92rem', maxWidth: '420px', lineHeight: 1.6, margin: 0, color: 'rgba(255,255,255,0.7)' }}>
                Haz clic en cualquiera de los 7 módulos superiores para descubrir los criterios de habitabilidad, el sistema TRAPPIST-1, las biofirmas y tecnofirmas en la búsqueda de vida extraterrestre.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scientific Bibliography */}
      <div style={{
        position: 'relative', zIndex: 2, marginTop: '2rem',
        borderTop: '1px solid rgba(100,255,218,0.25)', paddingTop: '1.5rem',
      }}>
        <h4 style={{ fontSize: '0.8rem', color: '#64FFDA', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem', textAlign: 'center', fontWeight: 700 }}>
          Referencias y Fuentes Académicas
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem' }}>
          {BIBLIOGRAPHY.map((item, i) => (
            <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, background: 'rgba(0,0,0,0.3)', padding: '0.8rem', borderRadius: '10px', borderLeft: '3px solid #64FFDA' }}>
              {item}
            </div>
          ))}
        </div>
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} alt="Vista ampliada" onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}

function TemporalFieldCanvas() {
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
    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.002 + 0.001,
      phase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.25,
      driftY: (Math.random() - 0.5) * 0.25,
      hue: Math.random() > 0.5 ? '100, 255, 218' : '0, 229, 255',
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.35;
        p.x += p.driftX;
        p.y += p.driftY;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.hue}, ${Math.max(0, opacity)})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

function ExoplanetasHeaderM4() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '0px' }}>
      <svg viewBox="0 0 600 120" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 12px rgba(100,255,218,0.4))' }}>
        <path d="M 40 100 Q 300 15, 560 100" fill="none" stroke="url(#exoGrad4)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 40 + t * 520;
          const cy = 100 - Math.sin(t * Math.PI) * 85;
          const colors = ['#64FFDA','#00E5FF','#FF5252','#FF80AB','#B388FF','#FFD740','#FF9100'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.4, 1, 0.4], r: [3, 5.5, 3] }}
              transition={{ duration: 2.2 + i * 0.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="18" r="12" fill="none" stroke="#64FFDA" strokeWidth="1.5" opacity="0.7" />
        <circle cx="300" cy="18" r="3" fill="#00E5FF" opacity="0.9" />
        <defs>
          <linearGradient id="exoGrad4" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(100,255,218,0.15)" />
            <stop offset="50%" stopColor="rgba(100,255,218,0.95)" />
            <stop offset="100%" stopColor="rgba(0,229,255,0.15)" />
          </linearGradient>
        </defs>
        <text x="300" y="68" textAnchor="middle" fill="#64FFDA" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">ZONA HABITABLE Y BIOFIRMAS</text>
        <text x="300" y="88" textAnchor="middle" fill="rgba(0,229,255,0.85)" fontSize="10.5" fontFamily="monospace" letterSpacing="2">ASTROBIOLOGÍA Y BÚSQUEDA DE VIDA</text>
      </svg>
    </div>
  );
}

function NodeButton({ node, isActive, onClick, index }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.06, y: -4 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 22 }}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.4rem',
        position: 'relative',
      }}
    >
      <div style={{
        width: '82px',
        height: '82px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: `3px solid ${isActive ? node.color : 'rgba(100,255,218,0.25)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}60, 0 0 35px ${node.color}25, inset 0 0 12px ${node.color}40`
          : '0 4px 12px rgba(0,0,0,0.4)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
        {isActive && (
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity }}
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
        color: isActive ? node.color : 'rgba(255,255,255,0.8)',
        fontSize: '0.76rem', fontWeight: 700, letterSpacing:'0.2px',
        textAlign: 'center',
        lineHeight: 1.25,
        transition: 'color 0.3s',
        maxWidth: '95px',
        textShadow: isActive ? `0 0 8px ${node.color}50` : 'none',
      }}>
        {node.title}
      </span>
      {isActive && (
        <motion.div
          layoutId="activeDotExoM4"
          style={{
            width: '6px', height: '6px',
            borderRadius: '50%',
            background: node.color,
            boxShadow: `0 0 8px ${node.color}`,
          }}
        />
      )}
    </motion.button>
  );
}

const DIRECTIONS = ['up', 'down', 'left', 'right'];
const dirVariants = {
  up:    { hidden: { y: -25, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  down:  { hidden: { y: 25, opacity: 0 },  visible: { y: 0, opacity: 1 } },
  left:  { hidden: { x: -25, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  right: { hidden: { x: 25, opacity: 0 },  visible: { x: 0, opacity: 1 } },
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
      border: `1px solid ${color}30`,
      overflow: 'hidden',
      background: `linear-gradient(135deg, ${color}10, transparent)`,
    }}>
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ backgroundColor: `${color}18` }}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: '0.7rem',
          padding: '0.8rem 1rem', background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,0.92)',
        }}
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}
          style={{ width: '32px', height: '32px', borderRadius: '50%', background: `${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
        >
          <IconComp size={15} style={{ color }} />
        </motion.div>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color, letterSpacing: '0.5px', flex: 1, textAlign: 'left' }}>
          {item.label}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={16} style={{ color, opacity: 0.8 }} />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div variants={dirVariants[dir]} initial="hidden" animate="visible" exit="hidden" transition={{ type: 'spring', stiffness: 300, damping: 28 }} style={{ padding: '0 1rem 1rem 1rem' }}>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.88)', borderLeft: `3px solid ${color}40`, paddingLeft: '0.8rem' }}>
              {item.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContentPanel({ node, onClose, setLightboxSrc }) {
  const decoComponents = DECO_MAP[node.id] || [];
  const decoPositions = [
    { top: '6%', right: '-5px', rotate: 12 },
    { top: '48%', left: '-12px', rotate: -12 },
    { bottom: '10%', right: '10px', rotate: 18 },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: 0.97 }} transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      style={{
        background: 'rgba(8, 24, 28, 0.94)', backdropFilter: 'blur(20px)', border: `1px solid ${node.color}40`, borderRadius: '24px',
        position: 'relative', zIndex: 3, marginTop: '1rem', overflow: 'hidden',
        boxShadow: `0 12px 40px rgba(0,0,0,0.5), 0 0 20px ${node.color}15`
      }}
    >
      <button onClick={onClose} style={{
        position: 'absolute', top: '1rem', right: '1rem', zIndex: 10, background: 'rgba(0,0,0,0.7)', border: `1px solid ${node.color}50`,
        borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: node.color, transition: 'all 0.2s',
      }}>
        <X size={18} />
      </button>

      {/* Hero Grid 1fr 1fr */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', minHeight: '280px' }}>
        <div style={{ position: 'relative', overflow: 'hidden', height: '100%', background: `linear-gradient(135deg, ${node.color}20, rgba(0,0,0,0.5))` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={node.image}
            alt={node.title}
            onClick={() => setLightboxSrc(node.image)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px' }}
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: `linear-gradient(transparent, ${node.color}20)` }} />
        </div>
        <div style={{ padding: '2rem 2rem 1.5rem 1.5rem', position: 'relative' }}>
          {decoComponents[0] && (
            <div style={{ position: 'absolute', top: '12px', right: '55px', transform: 'rotate(15deg)', pointerEvents: 'none' }}>
              {decoComponents[0]({ size: 52, color: node.color })}
            </div>
          )}
          <h3 style={{ margin: '0 0 1rem', fontSize: '1.45rem', fontWeight: 800, color: node.color, letterSpacing:'-0.01em', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
            <span style={{ display: 'inline-flex', width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${node.color}60`, flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
            </span>
            {node.title}
          </h3>
          {node.content.slice(0, 2).map((para, i) => (
            <p key={i} style={{ margin: '0 0 0.9rem', fontSize: '0.94rem', lineHeight: 1.72, color: 'rgba(255,255,255,0.88)' }}>
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* Main Content Body */}
      <div style={{ padding: '1.5rem 2rem 2rem', position: 'relative' }}>
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div key={i} animate={{ y: [0, -7, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 4, pos.rotate || 0] }} transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none' }}
            >
              <Deco size={55 + i * 8} color={node.color} />
            </motion.div>
          );
        })}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2rem', position: 'relative', zIndex: 2 }}>
          {node.content.slice(2).map((para, i) => {
            const isWide = i === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
            return (
              <div key={i} style={{ gridColumn: isWide ? '1 / -1' : 'auto', background: 'rgba(255,255,255,0.025)', borderRadius: '14px', padding: '1.25rem', borderLeft: `3px solid ${node.color}40`, position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-9px', left: '14px', background: node.color, color: '#040E12', fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: '8px', letterSpacing: '1px' }}>
                  {i === 0 ? 'CONCEPTO FEYNMAN' : i === 1 ? 'ANÁLISIS ASTROBIOLÓGICO' : 'FUTURO DE LA INVESTIGACIÓN'}
                </div>
                <p style={{ margin: 0, fontSize: '0.94rem', lineHeight: 1.72, color: 'rgba(255,255,255,0.88)' }}>
                  {para}
                </p>
              </div>
            );
          })}
        </div>

        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((exp, i) => (
              <div key={i} style={{ gridColumn: node.expandables.length === 1 ? '1 / -1' : 'auto' }}>
                <ExpandableSection item={exp} color={node.color} />
              </div>
            ))}
          </div>
        )}

        {/* --- Banner Image --- */}
        {node.bannerImage && (
          <div style={{
            width: '100%',
            borderRadius: '12px',
            overflow: 'hidden',
            marginTop: '1.2rem',
            marginBottom: '0.5rem',
            boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
            position: 'relative',
            zIndex: 2
          }}>
            <img
              src={node.bannerImage}
              alt={node.bannerCaption || node.title}
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }}
              loading="lazy"
            />
            {node.bannerCaption && (
              <p style={{ fontSize: '0.78rem', color: '#aaa', textAlign: 'center', marginTop: '0.4rem', fontStyle: 'italic' }}>
                {node.bannerCaption}
              </p>
            )}
          </div>
        )}

        {node.fact && (
          <div style={{ marginTop: '1.5rem', padding: '1.2rem 1.4rem', background: `linear-gradient(90deg, ${node.color}18, transparent)`, borderRadius: '16px', border: `1px solid ${node.color}35`, display: 'flex', gap: '1rem', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: `${node.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={19} style={{ color: node.color }} />
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: node.color, letterSpacing:'2px', textTransform: 'uppercase' }}>
                Dato Científico Clave
              </span>
              <p style={{ margin: '0.3rem 0 0', fontStyle: 'italic', color: 'rgba(255,255,255,0.92)', fontSize: '0.92rem', lineHeight: 1.68 }}>
                {node.fact}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
