'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Star, Orbit, ChevronDown, ChevronUp, BookOpen, Award, Globe } from 'lucide-react';

const COLORS = {
  primary: '#D87D4A',
  secondary: '#D4B872',
  accent: '#80DEEA',
  background: '#2C3E50',
  text: '#F5F5F5',
  card: '#3949AB',
  highlight: 'var(--gold-star, #FFD700)'
};

const INFOGRAPHIC_DATA = [
  {
    id: 'early_life',
    title: 'Early Life and Aviation Triumphs',
    icon: <Globe size={24} color={COLORS.accent} />,
    content: [
      "Svetlana Yevgenyevna Savitskaya was born on August 8, 1948, in Moscow, into a family deeply embedded in the Soviet military and aviation establishment. Her father, Yevgeny Savitsky, was a highly decorated World War II fighter ace and later Deputy Commander-in-Chief of the Soviet Air Defense Forces. Growing up in this environment, Savitskaya developed an intense passion for aviation and aerospace from a remarkably early age. She began parachuting at the age of 16 without her parents' initial knowledge, demonstrating a fierce independence and a relentless drive for high-altitude pursuits that would define her entire career. By the time she was 17, she had completed hundreds of parachute jumps and set three world records in stratospheric skydiving, establishing herself as a prodigious talent in Soviet aerial sports and laying the groundwork for her future endeavors in the highly competitive and male-dominated field of aerospace exploration.",
      "Following her extraordinary early achievements in parachuting, Savitskaya enrolled at the prestigious Moscow Aviation Institute (MAI) while simultaneously training as a pilot at the Central United Flight Technical School. Her technical aptitude and unparalleled flying skills allowed her to master various aircraft rapidly. She became a test pilot, a role that demanded exceptional precision, technical knowledge, and nerves of steel. During this period, she flew advanced supersonic aircraft and set numerous aviation world records, including an absolute speed record for women in a MiG-21 (designated Ye-133 for the record attempts), reaching an astounding 2,683 kilometers per hour. Her unmatched expertise in handling complex and experimental aircraft earned her international recognition and cemented her reputation as one of the most capable pilots in the Soviet Union, paving the way for her eventual transition into the cosmonaut corps, where her exceptional background would prove invaluable.",
      "The selection process for the Soviet space program was notoriously rigorous, physically demanding, and culturally biased toward male candidates, particularly military test pilots. However, Savitskaya's unparalleled qualifications, combined with political pressure to maintain Soviet supremacy in human spaceflight—specifically the desire to send a woman into space before the American space shuttle program could do so—led to her inclusion in the cosmonaut training program in 1980. She was part of a special group of female candidates selected to fly on the Soyuz spacecraft and the Salyut space stations. Her transition from test pilot to cosmonaut was seamless; she excelled in all aspects of the rigorous training, from high-G centrifuge runs to complex orbital mechanics and spacecraft systems engineering. Her profound understanding of aeronautical engineering allowed her to grasp the intricate systems of the Soyuz spacecraft and Salyut orbital station with remarkable speed, quickly establishing her as a leader among her peers.",
      "The training regimen for Soviet cosmonauts during the early 1980s was an grueling ordeal designed to push human physical and psychological endurance to its absolute limits. Savitskaya underwent extensive survival training in extreme environments, including the unforgiving taiga and the open sea, to prepare for off-target landings. She also spent countless hours in the neutral buoyancy laboratory, mastering the intricate procedures required for intravehicular and extravehicular activities. Furthermore, the theoretical component of the training required a deep, encyclopedic knowledge of the Soyuz T spacecraft's life support systems, navigation protocols, and emergency procedures. Despite the underlying sexism that often permeated the program, Savitskaya's undeniable competence, unyielding work ethic, and calm demeanor under intense pressure commanded the respect of her male colleagues and the mission commanders, proving unequivocally that she was not merely a political token but a highly skilled aerospace professional fully capable of commanding complex orbital missions.",
      "As the launch date for her first mission approached, the international context was heavily influenced by the ongoing Cold War and the ideological competition between the Soviet Union and the United States. The impending flight of American astronaut Sally Ride on the Space Shuttle Challenger provided a powerful catalyst for the Soviet space agency to expedite Savitskaya's mission. By launching Savitskaya before Ride, the USSR aimed to secure another significant \"first\" in the annals of space exploration, reinforcing their narrative of technological superiority and gender equality. This intense geopolitical pressure added an immense layer of responsibility to Savitskaya's upcoming flight. She was not only representing herself and her engineering discipline but also carrying the immense weight of national prestige and ideological warfare. Despite this intense external scrutiny, Savitskaya remained laser-focused on her technical preparations, demonstrating the extraordinary mental fortitude that had propelled her to the very pinnacle of the Soviet aerospace hierarchy and ensuring her readiness for the historic challenges that lay ahead in the harsh environment of low Earth orbit."
    ]
  },
  {
    id: 'soyuz_t7',
    title: 'Soyuz T-7: The Second Woman in Space',
    icon: <Rocket size={24} color={COLORS.accent} />,
    content: [
      "On August 19, 1982, Svetlana Savitskaya launched into orbit aboard the Soyuz T-7 spacecraft, accompanied by commander Leonid Popov and flight engineer Alexander Serebrov. This historic launch marked a monumental milestone, making Savitskaya the second woman to travel into space, exactly nineteen years after Valentina Tereshkova's pioneering flight on Vostok 6. The ascent into low Earth orbit was a physically punishing experience, subjecting the crew to intense G-forces as the massive Soyuz rocket accelerated them to orbital velocity. Upon successfully entering orbit, the crew began the complex and precise sequence of maneuvers required to rendezvous and dock with the Salyut 7 space station, which was already occupied by the resident crew of Anatoly Berezovoy and Valentin Lebedev. The docking procedure required meticulous coordination, precise thruster firings, and an intimate understanding of orbital mechanics, all of which Savitskaya executed with the consummate skill expected of an elite test pilot and highly trained cosmonaut.",
      "The arrival of the Soyuz T-7 crew at the Salyut 7 orbital outpost was a momentous occasion, representing the first time a mixed-gender crew had inhabited a space station. The interior of Salyut 7 was a cramped, noisy, and challenging environment, characterized by a complex array of scientific instruments, life support systems, and the constant hum of ventilation fans. Savitskaya quickly adapted to the disorienting effects of microgravity, demonstrating remarkable physiological resilience and an innate ability to navigate the complex three-dimensional workspace of the station. The interaction between the visiting and resident crews was a fascinating sociological experiment, as they worked together in extremely close quarters to conduct a diverse array of scientific experiments and technical evaluations. Despite some initial awkwardness related to the unprecedented mixed-gender dynamic, the crew quickly established a highly professional and efficient working rhythm, maximizing the scientific output of the visiting mission and proving the viability of long-term collaborative work in orbit.",
      "During her time aboard Salyut 7, Savitskaya was primarily responsible for conducting a complex series of medical and biological experiments designed to assess the physiological adaptations of the human body to the microgravity environment. These experiments included detailed cardiovascular monitoring, metabolic studies, and immunological assessments, providing critical data for understanding the long-term effects of spaceflight on human health. She also participated in materials science experiments, utilizing the station's specialized furnaces to study the crystallization of various compounds and the behavior of fluids in weightlessness. Her background in engineering was invaluable during these procedures, as she meticulously documented the results and troubleshot any technical anomalies that arose with the experimental apparatus. The sheer volume of data collected during her mission significantly advanced the Soviet understanding of space medicine and fundamental physics, solidifying her reputation as a formidable scientist and a highly capable researcher in the demanding environment of low Earth orbit.",
      "Beyond her scientific duties, Savitskaya also played a crucial role in evaluating the performance and ergonomics of the Soyuz T spacecraft and the Salyut 7 station systems from a female perspective. This was a critical aspect of her mission, as previous spacecraft and life support systems had been designed almost exclusively with male occupants in mind. She provided invaluable feedback on everything from the design of the flight suits and life support interfaces to the nutritional composition of the space food and the psychological impact of the confined living conditions. Her detailed observations and critical assessments led to significant improvements in subsequent spacecraft designs, ensuring that future generations of female cosmonauts and astronauts would operate in safer, more comfortable, and more efficient environments. This unsung aspect of her mission highlights her profound impact on the practical engineering and human factors integration of the Soviet space program, extending far beyond the immediate political goals of her flight.",
      "After spending nearly eight days in orbit, the Soyuz T-7 crew, with Savitskaya aboard, prepared for their return to Earth. They undocked from Salyut 7 and initiated the critical deorbit burn, plunging the Soyuz descent module into the dense layers of the Earth's atmosphere. The reentry process was an intensely violent and dangerous phase of the mission, subjecting the crew to extreme deceleration forces, searing heat, and violent vibrations as the capsule essentially became a superheated meteor. Savitskaya endured this harrowing ordeal with the characteristic calm and professionalism of a veteran test pilot. The capsule successfully deployed its main parachutes and fired its soft-landing retro-rockets, touching down safely in the expansive steppes of Kazakhstan on August 27, 1982. Her triumphant return not only solidified the Soviet Union's leadership in space exploration but also served as a powerful inspiration for countless women worldwide, proving that female professionals could perform exceptionally in the most extreme and demanding environments known to humanity."
    ]
  },
  {
    id: 'spacewalk',
    title: 'Soyuz T-12 and the First Female Spacewalk',
    icon: <Orbit size={24} color={COLORS.accent} />,
    content: [
      "Savitskaya's unparalleled success on the Soyuz T-7 mission paved the way for an even more ambitious and historic undertaking. In July 1984, she was assigned to the Soyuz T-12 mission, commanded by veteran cosmonaut Vladimir Dzhanibekov, with Igor Volk serving as a research cosmonaut. This mission was explicitly designed to achieve another monumental milestone in space exploration: the first extravehicular activity (EVA), or spacewalk, conducted by a woman. The preparations for this EVA were incredibly demanding, requiring Savitskaya to spend hundreds of hours training in the massive neutral buoyancy pool at the Yuri Gagarin Cosmonaut Training Center. She had to master the intricate operation of the bulky Orlan spacesuit, which was highly pressurized and significantly restricted mobility and dexterity. The physical exertion required to move and work within the suit was immense, demanding exceptional upper body strength, cardiovascular endurance, and an encyclopedic knowledge of the specific tools and procedures required for the planned extravehicular tasks.",
      "On July 25, 1984, during the Soyuz T-12 mission's stay at the Salyut 7 space station, Savitskaya and Dzhanibekov depressurized the airlock and floated out into the unforgiving vacuum of space. This profoundly significant event marked the very first time a female human being had operated outside the protective confines of a spacecraft. The primary objective of their meticulously planned EVA was to test a revolutionary new multi-purpose electron beam tool, the URI (Universal Hand Tool), designed for cutting, welding, and soldering metals in the extreme environment of outer space. Operating this complex and potentially dangerous piece of equipment while floating in microgravity and encumbered by the heavy Orlan spacesuit was an incredibly formidable engineering and physical challenge. Savitskaya handled the task with extraordinary precision and expertise, demonstrating unparalleled technical proficiency and proving that complex construction and repair tasks could be successfully executed by female cosmonauts in the harsh and unforgiving conditions of the orbital environment.",
      "The duration of the historic spacewalk was exactly 3 hours and 35 minutes, during which Savitskaya successfully completed all assigned tasks related to the URI electron beam tool. She meticulously welded, soldered, and cut various metal samples, gathering invaluable data on the behavior of materials and the efficacy of the tool in the vacuum of space. The physical demands of the EVA were staggering; every movement required fighting against the stiff, pressurized fabric of the spacesuit, leading to intense fatigue and immense physiological strain. However, Savitskaya's extensive background in high-altitude aviation and rigorous physical training allowed her to maintain focus and execute the intricate procedures flawlessly. Her performance unequivocally demonstrated that women were fully capable of undertaking the most physically demanding and hazardous operations required in spaceflight, shattering long-held prejudices and permanently altering the trajectory of human space exploration by opening the door for future generations of female spacewalkers.",
      "Upon completing the demanding extravehicular tasks, Savitskaya and Dzhanibekov safely returned to the Salyut 7 airlock and repressurized the chamber, concluding their highly successful and deeply historic spacewalk. The data and metal samples they collected during the EVA were crucial for the development of future space station construction techniques, directly contributing to the engineering knowledge required to build larger and more complex orbital structures like the Mir space station and eventually the International Space Station. Furthermore, Savitskaya's spacewalk was a massive propaganda victory for the Soviet Union, occurring just months before American astronaut Kathryn Sullivan was scheduled to perform the first U.S. female spacewalk. This incredible achievement solidified Savitskaya's status as a national hero and an international icon of female empowerment, proving beyond any reasonable doubt that technical brilliance, physical endurance, and operational excellence in space were not exclusively male domains.",
      "Svetlana Savitskaya's extraordinary legacy in aerospace and exploration is defined by her unparalleled technical skill, her record-breaking aviation achievements, and her groundbreaking milestones as a cosmonaut. After retiring from the active cosmonaut corps, she transitioned into a prominent career in politics, serving as a deputy in the State Duma of the Russian Federation, where she continued to advocate for aerospace development, scientific research, and national defense. Her pioneering flights on Soyuz T-7 and Soyuz T-12 fundamentally shattered the glass ceiling in the extremely demanding and male-dominated field of human spaceflight, setting an incredibly high standard for all future space explorers, regardless of gender. The sheer density of her accomplishments—from setting stratospheric skydiving records to flying supersonic interceptors to performing the world's first female spacewalk—cements her position as one of the most capable, courageous, and consequential figures in the entire history of aerospace engineering and human space exploration, inspiring generations of scientists and engineers to reach for the stars."
    ]
  }
];

const BIBLIOGRAPHY = [
  "Burgess, C., & Hall, R. (2009). The First Soviet Cosmonaut Team: Their Lives and Legacies. Springer Science & Business Media.",
  "Harvey, B. (2001). Russia in Space: The Failed Frontier?. Springer Science & Business Media.",
  "Portree, D. S. F. (1995). Mir Hardware Heritage. NASA Reference Publication 1357.",
  "Shayler, D. J., & Moule, I. A. (2005). Women in Space - Following Valentina. Springer Science & Business Media.",
  "Siddiqi, A. A. (2000). Challenge to Apollo: The Soviet Union and the Space Race, 1945-1974. NASA History Division.",
  "Zimmerman, R. (2003). Leaving Earth: Space Stations, Rival Missions, and the Planetary Voyage in the Twentieth Century. Joseph Henry Press."
];

export default function InteractiveInfographic_PionerosM6() {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (id) => {
    setActiveSection(prev => (prev === id ? null : id));
  };

  return (
    <div style={{ backgroundColor: COLORS.background, color: COLORS.text, fontFamily: 'sans-serif', padding: '2rem', borderRadius: '12px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Banner Section */}
      <div style={{ width: '100%', height: '200px', overflow: 'hidden', borderRadius: '12px', marginBottom: '2rem', position: 'relative' }}>
        <img 
          src="/assets/course/animales_pioneros/banner_pioneros.jpg" 
          alt="Pioneros Banner" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(44, 62, 80, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ color: COLORS.secondary, fontSize: '3rem', margin: 0, textShadow: '2px 2px 4px rgba(0,0,0,0.8)', textAlign: 'center' }}>
            Svetlana Savitskaya
          </h1>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px', borderRadius: '12px', overflow: 'hidden', border: `4px solid ${COLORS.primary}` }}>
          <img 
            src="/assets/course/animales_pioneros/hero_svetlana.jpg" 
            alt="Svetlana Savitskaya Hero" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
        <div style={{ flex: '2 1 400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ color: COLORS.primary, fontSize: '2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Star color={COLORS.highlight} fill={COLORS.highlight} size={32} />
            The Sky Has No Limits
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1rem' }}>
            Explore the extraordinary life and achievements of Svetlana Savitskaya, a prodigious aviator and history-making cosmonaut. From her early days shattering aviation world records in supersonic jets to her iconic missions aboard the Salyut 7 space station, Savitskaya continually pushed the boundaries of human endurance and technological capability.
          </p>
          <div style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>
            <img 
              src="/assets/course/animales_pioneros/btn_svetlana.jpg" 
              alt="Svetlana Button" 
              style={{ width: '150px', borderRadius: '8px', border: `2px solid ${COLORS.accent}`, cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>

      {/* Interactive Accordion Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
        {INFOGRAPHIC_DATA.map((section) => (
          <div 
            key={section.id} 
            style={{ 
              backgroundColor: COLORS.card, 
              borderRadius: '8px', 
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
            }}
          >
            <button
              onClick={() => toggleSection(section.id)}
              style={{
                width: '100%',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: activeSection === section.id ? 'rgba(0,0,0,0.2)' : 'transparent',
                border: 'none',
                color: COLORS.text,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background-color 0.3s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {section.icon}
                <h3 style={{ fontSize: '1.5rem', margin: 0, color: COLORS.secondary }}>{section.title}</h3>
              </div>
              {activeSection === section.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>
            
            <AnimatePresence>
              {activeSection === section.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ padding: '2rem', borderTop: `1px solid rgba(255,255,255,0.1)` }}>
                    {section.content.map((paragraph, index) => (
                      <p 
                        key={index} 
                        style={{ 
                          fontSize: '1rem', 
                          lineHeight: '1.8', 
                          marginBottom: index === section.content.length - 1 ? 0 : '1.5rem',
                          textAlign: 'justify'
                        }}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Bibliography Section */}
      <div style={{ 
        backgroundColor: 'rgba(0,0,0,0.2)', 
        padding: '2rem', 
        borderRadius: '8px', 
        borderLeft: `4px solid ${COLORS.accent}` 
      }}>
        <h3 style={{ color: COLORS.accent, display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}>
          <BookOpen size={24} />
          Bibliography & Further Reading
        </h3>
        <ul style={{ listStyleType: 'square', paddingLeft: '1.5rem', margin: 0 }}>
          {BIBLIOGRAPHY.map((source, idx) => (
            <li key={idx} style={{ marginBottom: '0.5rem', lineHeight: '1.5', fontSize: '0.9rem', color: 'rgba(245,245,245,0.8)' }}>
              {source}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
