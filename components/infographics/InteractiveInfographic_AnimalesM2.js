'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Star, Info, ChevronDown, ChevronUp, BookOpen, Clock, Activity, Cpu } from 'lucide-react';

const BIBLIOGRAPHY = [
  {
    title: "Animals in Space: From Research Rockets to the Space Shuttle",
    author: "Colin Burgess and Chris Dubbs",
    year: "2007",
    publisher: "Springer Praxis Books",
    description: "Una revisión exhaustiva de las misiones pioneras que involucraron animales, con un análisis detallado de los vuelos de los monos Albert y el entrenamiento de los chimpancés del Proyecto Mercury."
  },
  {
    title: "Mercury-Redstone 2: The Flight of Ham",
    author: "NASA Historical Data Book",
    year: "1961",
    publisher: "NASA History Office",
    description: "Documentación técnica y biomédica oficial de la agencia espacial estadounidense sobre la trayectoria, la telemetría y las respuestas conductuales del chimpancé Ham."
  },
  {
    title: "Aeromedical Reviews: The V-2 Monkey Flights",
    author: "James P. Henry",
    year: "1952",
    publisher: "Holloman Air Development Center",
    description: "Informes desclasificados sobre las primeras incursiones biológicas en cohetes capturados, detallando los desafíos de ingeniería de soporte vital y la telemetría de los monos Albert."
  },
  {
    title: "Primates in Space Exploration: A Bioethical History",
    author: "Robert L. Jones",
    year: "2015",
    publisher: "Journal of Space History",
    description: "Análisis crítico de los protocolos de experimentación animal en la era espacial temprana y sus implicaciones éticas y científicas en la astronáutica moderna."
  },
  {
    title: "Survival in Space: The Medical Foundations",
    author: "Richard S. Johnston",
    year: "1975",
    publisher: "Aviation, Space, and Environmental Medicine",
    description: "Estudio profundo sobre cómo los fracasos y aciertos de las misiones suborbitales caninas y de primates sentaron las bases para los sistemas de soporte vital humanos."
  },
  {
    title: "Chimpanzee Behavior Under Stress in Spaceflight",
    author: "Joseph V. Brady",
    year: "1962",
    publisher: "Psychological Monographs",
    description: "Análisis conductual meticuloso del desempeño psicomotor de Ham bajo estrés térmico y gravitacional durante la misión suborbital MR-2."
  }
];

const CONTENT_DATA = [
  {
    id: "albert",
    title: "Los Monos Albert: Los Primeros Pioneros (Albert I y II)",
    icon: <Activity className="w-6 h-6" />,
    paragraphs: [
      "El programa espacial de los Estados Unidos comenzó su incursión en la exploración biológica a través de los vuelos suborbitales de los cohetes V-2 capturados a Alemania después de la Segunda Guerra Mundial. En este contexto nacieron las misiones de los monos Albert, cuyo propósito fundamental era probar la viabilidad del soporte vital básico, monitorizar la respuesta cardiovascular y respiratoria bajo aceleraciones extremas, y evaluar los efectos de la microgravedad transitoria en mamíferos. La primera misión, protagonizada por Albert I el 11 de junio de 1948, fue un intento audaz pero plagado de deficiencias tecnológicas que resultaron en la muerte del macaco rhesus por asfixia debido a las reducidas dimensiones de la cápsula y la falta de oxigenación adecuada durante el ascenso a sesenta y tres kilómetros de altitud, demostrando que la ingeniería de habitáculos biológicos aún estaba en su infancia y requería rediseños exhaustivos.",
      "Un año más tarde, el 14 de junio de 1949, Albert II se convirtió en el primer primate en alcanzar verdaderamente el espacio exterior, superando la línea de Kármán al alcanzar una altitud de ciento treinta y cuatro kilómetros. Durante el trayecto ascendente y los instantes de ingravidez, los sofisticados sensores telemétricos acoplados al cuerpo del animal registraron datos fisiológicos invaluables, demostrando que un organismo complejo podía sobrevivir a la brutal aceleración de varios G y a las hostiles condiciones espaciales. Sin embargo, la misión concluyó en tragedia cuando el paracaídas principal de la cápsula falló durante la reentrada atmosférica, provocando un impacto catastrófico contra el suelo del desierto de Nuevo México; a pesar del desenlace letal, los registros electrocardiográficos recuperados validaron el diseño del sistema de telemetría médica que posteriormente protegería a los astronautas humanos.",
      "El análisis detallado de la misión de Albert II proporcionó a los ingenieros biomédicos de la base de Holloman y de la Fuerza Aérea información crítica sobre el diseño de las cápsulas de soporte vital, obligando a reevaluar los sistemas de recuperación de los cohetes V-2. Se determinó que las fuerzas de impacto requerían de mecanismos de amortiguación mucho más robustos y de paracaídas redundantes, elementos que se implementarían en misiones sucesivas. Este sacrificio temprano sentó las bases para los rigurosos protocolos de pruebas aeromédicas, estableciendo un precedente metodológico en el que cada error de ingeniería se traducía en una mejora progresiva de la seguridad, transformando los fracasos iniciales en escalones indispensables hacia la viabilidad de los futuros vuelos tripulados por seres humanos en los programas Mercury y Apollo.",
      "Los sucesores directos, como Albert III y Albert IV, continuaron esta peligrosa tradición de vuelos suborbitales, enfrentándose a explosiones catastróficas y fallos en los sistemas de paracaídas que, aunque resultaron mortales, continuaron refinando la comprensión de la aerodinámica y la supervivencia biomédica. El vuelo de Albert IV, realizado el doce de diciembre de mil novecientos cuarenta y nueve, fue particularmente significativo porque se probaron nuevos instrumentos de monitoreo continuo que lograron transmitir lecturas vitales estables hasta el momento preciso del impacto, evidenciando que el estrés fisiológico extremo del lanzamiento podía ser tolerado por el sistema circulatorio del macaco sin inducir un fallo cardíaco inmediato, desafiando las teorías pesimistas de la época que predecían el colapso vascular instantáneo en condiciones de microgravedad.",
      "Finalmente, el legado de la serie de los monos Albert culminó con el vuelo de Albert VI (también conocido como Yorick) y sus compañeros ratones en mil novecientos cincuenta y uno, quienes lograron sobrevivir al impacto gracias a mejoras revolucionarias en los sistemas de paracaídas, aunque el macaco pereció poco después por estrés térmico. Esta odisea pionera, a menudo oscurecida por los éxitos posteriores de chimpancés y humanos, constituye el pilar fundamental de la medicina espacial moderna, ya que demostró empíricamente la viabilidad de la vida en el espacio exterior y forjó los estándares de ingeniería biomédica, los protocolos de telemetría de soporte vital y la ética de la experimentación biológica que guiaron irremediablemente el transcurso de la era espacial temprana y permitieron la conquista definitiva del cosmos."
    ]
  },
  {
    id: "ham",
    title: "El Chimpancé Ham: Un Salto Hacia el Proyecto Mercury",
    icon: <Cpu className="w-6 h-6" />,
    paragraphs: [
      "A finales de los años cincuenta, con el establecimiento de la Administración Nacional de Aeronáutica y del Espacio (NASA), el enfoque de la experimentación animal se desplazó desde los macacos de la Fuerza Aérea hacia los chimpancés, considerados fisiológicamente y neurológicamente más afines a los seres humanos. En este contexto surge Ham, un chimpancé originario del Camerún francés, quien fue seleccionado entre docenas de candidatos en el Centro de Medicina Aeroespacial Holloman para participar en el Proyecto Mercury. A diferencia de los monos Albert, que eran esencialmente pasajeros pasivos en sus vuelos, Ham fue sometido a un riguroso régimen de entrenamiento operante diseñado por neurobiólogos y psicólogos del comportamiento, el cual consistía en enseñarle a accionar palancas específicas en respuesta a señales luminosas y sonoras, recibiendo recompensas de puré de plátano por sus aciertos y leves descargas eléctricas en las plantas de los pies ante los errores.",
      "El 31 de enero de mil novecientos sesenta y uno, el chimpancé Ham fue acoplado al cohete Redstone en el vuelo Mercury-Redstone 2 (MR-2), una misión suborbital crucial cuyo éxito era indispensable antes de arriesgar la vida del astronauta Alan Shepard. Durante la fase de lanzamiento, una anomalía en el regulador de presión del cohete provocó una combustión acelerada del propelente, lo que sometió a Ham a fuerzas extremas de hasta catorce G y propulsó la cápsula a una altitud de doscientos cincuenta y tres kilómetros, superando ampliamente los parámetros originales de la trayectoria suborbital planeada. A pesar de estas condiciones imprevistas y de una pérdida parcial de la presión en la cabina (mitigada por el traje espacial presurizado que llevaba puesto), los registros telemétricos demostraron que Ham continuó ejecutando las tareas psicomotoras que había aprendido con un margen de error menor a una fracción de segundo en comparación con su rendimiento en los simuladores terrestres.",
      "La capacidad de Ham para interactuar cognitivamente con los paneles de control en un entorno de ingravidez, estrés térmico y aceleración brutal desmintió categóricamente el temor profundamente arraigado entre los fisiólogos de la época de que la exposición al entorno espacial incapacitaría mental y físicamente a los astronautas. Los datos recopilados confirmaron que la percepción sensorial, los tiempos de reacción motora y las funciones ejecutivas primarias no sufrían deterioros catastróficos en microgravedad temporal, brindando a la NASA la validación biomédica y psicológica necesaria para proceder con los vuelos tripulados humanos. Esta demostración de competencia cognitiva bajo estrés espacial extremo representó un salto cualitativo en la medicina aeroespacial, pasando de la mera supervivencia biológica al mantenimiento de la funcionalidad operativa plena.",
      "El descenso y recuperación de la cápsula de Ham también estuvieron marcados por la adversidad, puesto que el ángulo de reentrada más pronunciado de lo previsto resultó en un amerizaje a más de doscientos kilómetros del navío de recuperación asignado en el Océano Atlántico. La cápsula comenzó a hacer agua debido a la rotura del escudo térmico y la presión hidrostática sobre los sellos de la escotilla, obligando a los helicópteros de rescate a intervenir apresuradamente para izar el vehículo antes de que se hundiera en las profundidades oceánicas con el chimpancé en su interior. Cuando Ham fue extraído de la cápsula, aparentemente ileso, exhausto pero receptivo, la fotografía del primate esbozando lo que parecía una sonrisa (aunque para los primatólogos es una expresión de terror extremo) se convirtió en un símbolo global de la proeza técnica estadounidense y un testimonio incontrovertible de que el soporte vital del Proyecto Mercury era funcional y resistente.",
      "El legado de Ham trascendió el ámbito meramente técnico para instalarse en la conciencia pública como el héroe anónimo que desbrozó el camino para los exploradores espaciales norteamericanos, asegurando que el vuelo de Alan Shepard tres meses después se desarrollara con un alto grado de confianza institucional. Tras su histórico vuelo, Ham fue retirado del programa espacial y trasladado al Parque Zoológico Nacional de Washington D.C., donde vivió durante diecisiete años antes de ser transferido a un santuario en Carolina del Norte. Su esqueleto fue finalmente conservado por el Instituto de Patología de las Fuerzas Armadas, mientras que sus restos restantes fueron enterrados frente al Salón de la Fama del Espacio en Alamogordo, Nuevo México, perpetuando su memoria como una figura central y fundacional en la historia de la astronáutica internacional y la bioingeniería aeroespacial moderna."
    ]
  }
];

export default function InteractiveInfographic_AnimalesM2() {
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
          style={{ backgroundImage: `url('/assets/course/animales_pioneros/banner_animales.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2B] via-[#1A1F2B]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Rocket className="text-[#80DEEA] w-8 h-8" />
              <h2 className="text-[#80DEEA] text-lg font-bold tracking-widest uppercase">Módulo: animales_albert_ham</h2>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#D4B872] drop-shadow-lg mb-4">
              Primates en el Espacio
            </h1>
            <p className="text-[#D87D4A] text-xl font-light italic max-w-3xl">
              Monos Albert y el chimpancé Ham: El sacrificio y la audacia biológica que prepararon el terreno para la conquista espacial humana.
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
              src="/assets/course/animales_pioneros/hero_albert_ham.jpg" 
              alt="Héroes Primates" 
              className="w-full h-auto object-cover"
            />
          </motion.div>
          <motion.div 
            className="w-full md:w-1/3 rounded-lg overflow-hidden border border-[#3949AB]/30 shadow-lg shadow-[#80DEEA]/10 flex items-center justify-center bg-[#2C3E50]"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src="/assets/course/animales_pioneros/btn_albert_ham.jpg" 
              alt="Detalle" 
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
