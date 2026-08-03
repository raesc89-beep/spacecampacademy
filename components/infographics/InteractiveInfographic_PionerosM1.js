import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Star, Info, ChevronDown, ChevronUp, BookOpen, Clock, Activity, Cpu } from 'lucide-react';

const BIBLIOGRAPHY = [
  {
    title: "Starman: The Truth Behind the Legend of Yuri Gagarin",
    author: "Piers Bizony and Jamie Doran",
    year: "1998",
    publisher: "Bloomsbury Publishing",
    description: "Una investigación exhaustiva y desclasificada sobre la vida, el entrenamiento y el legado histórico del primer cosmonauta, revelando detalles íntimos sobre su vuelo pionero y las tensiones políticas de la época."
  },
  {
    title: "The First Soviet Cosmonaut Team: Their Lives and Legacies",
    author: "Colin Burgess and Rex Hall",
    year: "2009",
    publisher: "Springer Praxis Books",
    description: "Un análisis meticuloso del proceso de selección y los rigurosos regímenes de entrenamiento médico y psicológico del primer grupo de cosmonautas soviéticos, incluyendo a Yuri Gagarin."
  },
  {
    title: "Challenge to Apollo: The Soviet Union and the Space Race, 1945-1974",
    author: "Asif A. Siddiqi",
    year: "2000",
    publisher: "NASA History Division",
    description: "Un estudio académico monumental sobre la ingeniería aeroespacial soviética, detallando el desarrollo del cohete portador R-7 y los sistemas de soporte vital de la nave Vostok 1."
  },
  {
    title: "Into That Silent Sea: Trailblazers of the Space Era, 1961-1965",
    author: "Francis French and Colin Burgess",
    year: "2007",
    publisher: "University of Nebraska Press",
    description: "Narrativa detallada de las primeras misiones tripuladas, destacando la experiencia biomédica y las observaciones pioneras de microgravedad reportadas por Gagarin durante su órbita."
  },
  {
    title: "Sputnik and the Soviet Space Challenge",
    author: "Asif A. Siddiqi",
    year: "2003",
    publisher: "University Press of Florida",
    description: "Una revisión técnica profunda sobre los orígenes del programa espacial soviético, la influencia de Serguéi Koroliov y los desafíos de diseño estructural enfrentados antes del vuelo de Vostok 1."
  },
  {
    title: "Vostok 1: First Human in Space (Historical Report)",
    author: "ESA / Roscosmos Historical Archives",
    year: "2011",
    publisher: "European Space Agency",
    description: "Documentación técnica y biomédica oficial sobre la trayectoria de vuelo, la telemetría, el sistema de eyección y las respuestas fisiológicas documentadas de Yuri Gagarin en órbita."
  }
];

const CONTENT_DATA = [
  {
    id: "vostok1",
    title: "El Vuelo de Vostok 1: Un Hito Histórico y Tecnológico",
    icon: <Rocket className="w-6 h-6" />,
    paragraphs: [
      "El 12 de abril de 1961, el cosmódromo de Baikonur fue el escenario de uno de los hitos más trascendentales en la historia de la humanidad, el lanzamiento de la nave espacial Vostok 1, impulsada por un cohete portador Vostok-K, diseñado originalmente como un misil balístico intercontinental modificado para albergar una cápsula esférica tripulada. A las 06:07 hora universal coordinada (UTC), los motores principales se encendieron, liberando una fuerza de empuje monumental que propulsó a Yuri Gagarin, el primer cosmonauta, más allá de la atmósfera terrestre, marcando el inicio de una nueva era en la exploración espacial y demostrando la supremacía tecnológica inicial de la Unión Soviética en el contexto de la Guerra Fría. La complejidad aerodinámica y la ingeniería de propulsión de este vehículo representaban el pináculo de los esfuerzos científicos liderados por el ingeniero jefe Serguéi Koroliov.",
      "La nave Vostok 1, una esfera de aleación de aluminio y magnesio cubierta por un material ablativo diseñado para soportar las extremas temperaturas de la reentrada atmosférica, no estaba equipada con un sistema de propulsión orbital complejo que permitiera cambios significativos de altitud, dependiendo exclusivamente de la precisión del lanzamiento para alcanzar una órbita elíptica estable. Durante el vuelo, Gagarin experimentó por primera vez en la historia humana los efectos biológicos y psicológicos de la microgravedad prolongada, transmitiendo por radio sus observaciones pioneras sobre el comportamiento de los líquidos, la percepción del horizonte curvo de la Tierra y la sorprendente belleza del espacio profundo, contrastando fuertemente con la oscuridad absoluta que envolvía la cápsula.",
      "El sistema de soporte vital a bordo de la Vostok 1 fue diseñado meticulosamente para garantizar la supervivencia del cosmonauta durante un período de hasta diez días en caso de un fallo en los retrocohetes, proporcionando oxígeno continuo, absorbiendo dióxido de carbono y regulando la temperatura interna en un entorno hostil caracterizado por la radiación cósmica y las variaciones extremas de temperatura. Aunque el vuelo estaba totalmente automatizado, ya que los científicos médicos temían que la ingravidez pudiera incapacitar cognitivamente al piloto, Gagarin tenía a su disposición un sobre sellado que contenía un código secreto para desbloquear los controles manuales de la nave en caso de emergencia extrema, una precaución que finalmente no fue necesaria pero que ilustraba la incertidumbre de la época.",
      "La trayectoria orbital de la misión llevó a la Vostok 1 a sobrevolar diversas regiones del globo terráqueo, desde el continente asiático hasta el Océano Pacífico y la punta sur de Sudamérica, antes de iniciar la maniobra crítica de reentrada atmosférica, la cual estuvo plagada de dificultades técnicas imprevistas. El módulo de equipamiento no se separó limpiamente de la cápsula de descenso tras el encendido de los retrocohetes, causando que el conjunto completo experimentara oscilaciones giroscópicas violentas mientras penetraba las capas superiores de la atmósfera; afortunadamente, el calor extremo de la fricción aerodinámica finalmente fundió los cables de conexión restantes, permitiendo que la cápsula esférica adoptara su orientación aerodinámica natural y estabilizara su descenso.",
      "Debido al diseño primitivo y al peso significativo de la cápsula de descenso esférica, la cual carecía de un sistema de paracaídas lo suficientemente grande como para garantizar un impacto seguro con el suelo, el protocolo de la misión exigía que Gagarin se eyectara de la nave a una altitud aproximada de siete kilómetros utilizando un asiento eyectable especialmente adaptado. Tras una exitosa eyección, el cosmonauta descendió en su paracaídas personal y aterrizó de forma segura cerca del pueblo de Smelovka en la región de Sarátov, concluyendo un vuelo que duró exactamente ciento ocho minutos, pero que alteró para siempre nuestra comprensión de las capacidades humanas, estableciendo un precedente biomédico y de ingeniería que sirvió de base para todos los programas espaciales tripulados posteriores."
    ]
  },
  {
    id: "gagarin",
    title: "Yuri Gagarin: El Hombre Detrás de la Leyenda",
    icon: <Activity className="w-6 h-6" />,
    paragraphs: [
      "La selección de Yuri Alekséyevich Gagarin para encabezar la primera misión tripulada al espacio no fue una coincidencia dictada únicamente por su destreza técnica, sino el resultado de un riguroso proceso de evaluación fisiológica, psicológica y política llevado a cabo por la comisión estatal responsable del programa de cosmonautas soviéticos, la cual buscaba un candidato excepcional. Entre más de tres mil pilotos de combate de las Fuerzas Aéreas Soviéticas, Gagarin destacó rápidamente debido a su extraordinaria resistencia al estrés inducido en las cámaras de presión y centrifugadoras, su estatura compacta, ideal para el reducido espacio interior de la cápsula Vostok, y su temperamento invariable, caracterizado por un optimismo inquebrantable y una capacidad de concentración fenomenal bajo circunstancias adversas.",
      "El régimen de entrenamiento al que fueron sometidos Gagarin y sus compañeros del grupo de Vanguardia de los Seis fue exhaustivo y sin precedentes en la historia militar, abarcando desde simulaciones en cámaras de aislamiento acústico durante varios días para evaluar su estabilidad mental frente a la deprivación sensorial, hasta vuelos parabólicos en aviones modificados para experimentar breves períodos de ingravidez. Además de la preparación física extrema, los cosmonautas recibieron formación teórica intensiva en disciplinas tan variadas como la mecánica orbital, la astronomía, la geofísica y la fisiología médica, garantizando que el piloto pudiera comprender y comunicar eficazmente cualquier anomalía técnica o biológica que se presentara durante la misión, desmitificando así el comportamiento del cuerpo humano en el espacio.",
      "Antes del histórico vuelo, Gagarin demostró una empatía y liderazgo innatos que cimentaron su posición como el candidato principal, apoyando moralmente a sus colegas y estableciendo una relación de respeto mutuo con el ingeniero jefe Koroliov, quien reconoció en el joven piloto no solo a un aviador altamente cualificado, sino también a un símbolo perfecto de los ideales proletarios soviéticos gracias a su origen humilde en una granja colectiva de la región de Smolensk. Esta combinación de pericia técnica y carisma mediático fue fundamental, ya que los líderes políticos soviéticos comprendían que el primer humano en el espacio se convertiría instantáneamente en un embajador global y un ícono propagandístico de primer orden, requiriendo una personalidad que pudiera manejar la abrumadora presión de la fama internacional.",
      "Durante las horas previas al lanzamiento del 12 de abril, los registros históricos indican que Gagarin mantuvo un nivel de calma asombroso, registrando un pulso estable de sesenta y cuatro latidos por minuto incluso mientras los técnicos sellaban la escotilla de la cápsula Vostok y ajustaban las comunicaciones de radio. Su legendaria y espontánea exclamación '¡Poyekhali!' ('¡Allá vamos!') justo en el instante del despegue, no solo alivió la inmensa tensión acumulada en la sala de control de Baikonur, sino que encapsuló el espíritu audaz y optimista de la era espacial naciente, marcando una transición psicológica crítica desde el miedo a lo desconocido hacia la celebración de la exploración científica y la expansión de los horizontes de la experiencia humana.",
      "El legado de Yuri Gagarin trasciende el monumental logro técnico del Vostok 1; su figura se consolidó como un testimonio perdurable del valor humano y un catalizador para la cooperación internacional en la ciencia espacial, a pesar de las profundas divisiones ideológicas de la Guerra Fría que impulsaron su histórica travesía orbital. Trágicamente, su vida fue truncada en un accidente de aviación en 1968 durante un vuelo de entrenamiento rutinario, pero su influencia perdura profundamente arraigada en las instituciones aeroespaciales de todo el mundo; su nombre adorna cráteres lunares, centros de entrenamiento de cosmonautas y medallas de honor, recordando perpetuamente a las futuras generaciones de exploradores que el primer paso hacia las estrellas fue dado por un piloto que combinó un coraje excepcional con una humanidad inquebrantable."
    ]
  }
];

export default function InteractiveInfographic_PionerosM1() {
  const [activeSection, setActiveSection] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleSection = (id) => {
    setActiveSection(prev => (prev === id ? null : id));
  };

  if (!isMounted) return null;

  return (
    <div className="w-full max-w-5xl mx-auto bg-[#1A1F2B] text-white rounded-xl shadow-2xl overflow-hidden font-sans border border-[#3949AB]/30">
      {/* Hero Banner */}
      <div className="relative h-72 md:h-96 w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/assets/course/animales_pioneros/banner_pioneros.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2B] via-[#1A1F2B]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Star className="text-[#80DEEA] w-8 h-8" />
              <h2 className="text-[#80DEEA] text-lg font-bold tracking-widest uppercase">Módulo: pioneros_yuri</h2>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#D4B872] drop-shadow-lg mb-4">
              Yuri Gagarin y el Vostok 1
            </h1>
            <p className="text-[#D87D4A] text-xl font-light italic max-w-3xl">
              El primer vuelo tripulado que desafió los límites de la atmósfera terrestre y alteró la historia de la humanidad.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="p-8">
        {/* Main Content Images */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <motion.div 
            className="flex-1 rounded-lg overflow-hidden border border-[#D4B872]/30 shadow-lg shadow-[#D87D4A]/10"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src="/assets/course/animales_pioneros/hero_yuri.jpg" 
              alt="Héroe Yuri Gagarin" 
              className="w-full h-auto object-cover"
            />
          </motion.div>
          <motion.div 
            className="w-full md:w-1/3 rounded-lg overflow-hidden border border-[#3949AB]/30 shadow-lg shadow-[#80DEEA]/10 flex items-center justify-center bg-[#2C3E50]"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src="/assets/course/animales_pioneros/btn_yuri.jpg" 
              alt="Detalle Yuri Gagarin" 
              className="w-full h-auto object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
            />
          </motion.div>
        </div>

        {/* Accordion Sections */}
        <div className="space-y-6">
          {CONTENT_DATA.map((section, index) => (
            <motion.div 
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="border border-[#2C3E50] rounded-lg overflow-hidden bg-[#1A1F2B]/50"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-6 flex items-center justify-between bg-gradient-to-r from-[#2C3E50]/40 to-transparent hover:bg-[#3949AB]/20 transition-colors duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#D87D4A]/10 rounded-full text-[#D4B872]">
                    {section.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-[#E0E0E0]">
                    {section.title}
                  </h3>
                </div>
                {activeSection === section.id ? (
                  <ChevronUp className="w-6 h-6 text-[#80DEEA]" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-[#80DEEA]" />
                )}
              </button>
              
              <AnimatePresence>
                {activeSection === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className="p-6 md:p-8 space-y-6 text-gray-300 leading-relaxed text-justify bg-[#151923]">
                      {section.paragraphs.map((para, i) => (
                        <p key={i} className="text-lg relative pl-4 border-l-2 border-[#D87D4A]/30">
                          {para}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bibliography Section */}
        <div className="mt-16 border-t border-[#3949AB]/40 pt-10">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="text-[#D4B872] w-7 h-7" />
            <h3 className="text-2xl font-bold text-[#D4B872]">Bibliografía Científica</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BIBLIOGRAPHY.map((item, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-lg bg-[#2C3E50]/30 border border-[#80DEEA]/20 hover:border-[#80DEEA]/50 transition-colors"
              >
                <h4 className="text-xl font-semibold text-[#80DEEA] mb-2">{item.title}</h4>
                <div className="flex items-center gap-2 text-sm text-[#D87D4A] mb-3">
                  <span className="font-medium">{item.author}</span>
                  <span>•</span>
                  <span>{item.year}</span>
                  <span>•</span>
                  <span className="italic">{item.publisher}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
