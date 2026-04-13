'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CheckCircle, Crosshair } from 'lucide-react';

const MILESTONES = [
  { id: 'm1', year: "1957", title: "Sputnik 1", desc: "Primer satélite artificial.", img: '/assets/bepicolombo_probe.png' },
  { id: 'm2', year: "1961", title: "Yuri Gagarin", desc: "Primer humano orbitando.", img: '/assets/planet_earth.png' },
  { id: 'm3', year: "1969", title: "Apollo 11", desc: "El humano pisa la Luna.", img: '/assets/shuttle_vector.png' },
  { id: 'm4', year: "1977", title: "Voyager 1", desc: "Viaje interestelar.", img: '/assets/bepicolombo_probe.png' },
  { id: 'm5', year: "1981", title: "Transbordador", desc: "Primer vuelo reutilizable.", img: '/assets/shuttle_vector.png' },
  { id: 'm6', year: "1990", title: "Telescopio Hubble", desc: "Famoso observatorio orbital.", img: '/assets/herschel_telescope_space.png' },
  { id: 'm7', year: "1998", title: "Estación (ISS)", desc: "Construcción en órbita.", img: '/assets/shuttle_vector.png' },
  { id: 'm8', year: "2004", title: "Rovers Gemelos", desc: "Rovers aterrizan en Marte.", img: '/assets/mars_human_colony_dome.png' },
  { id: 'm9', year: "2012", title: "Rover Curiosity", desc: "Laboratorio móvil marciano.", img: '/assets/mars_dust_storm.png' },
  { id: 'm10', year: "2021", title: "James Webb", desc: "Telescopio más potente.", img: '/assets/herschel_telescope_space.png' }
];

export default function SpaceTimelineDragDrop({ onComplete }) {
  const [shuffledEvents, setShuffledEvents] = useState([]);
  const [timeline, setTimeline] = useState([...MILESTONES.map(m => ({ ...m, matched: null }))]);
  const [draggedEvent, setDraggedEvent] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Desordenar solo los eventos (para arrastrar)
    const events = MILESTONES.map(m => ({ id: m.id, title: m.title, desc: m.desc, img: m.img }))
                             .sort(() => Math.random() - 0.5);
    setShuffledEvents(events);
    setTimeline([...MILESTONES.map(m => ({ ...m, matched: null }))]);
  }, []);

  const handleDragStart = (e, eventItem) => {
    setDraggedEvent(eventItem);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, slotId) => {
    e.preventDefault();
    if (!draggedEvent) return;

    if (slotId === draggedEvent.id) {
       // Correct Match
       setTimeline(prev => prev.map(slot => slot.id === slotId ? { ...slot, matched: draggedEvent } : slot));
       setShuffledEvents(prev => prev.filter(ev => ev.id !== draggedEvent.id));
    }
    setDraggedEvent(null);
  };

  useEffect(() => {
    if (timeline.every(t => t.matched !== null) && timeline.length > 0) {
      setGameOver(true);
      setTimeout(() => {
        if (onComplete) onComplete(25);
      }, 1000);
    }
  }, [timeline, onComplete]);

  return (
    <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.6)', borderRadius: '20px', border: '1px solid rgba(0, 228, 255, 0.3)' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h3 style={{ margin: 0, color: 'var(--electric-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
           <Calendar /> Carrera Aeroespacial (Timeline)
        </h3>
        <p style={{ color: 'var(--text-muted)' }}>Arrastra el Hito Histórico hacia su año de cumplimiento correspondiente.</p>
      </header>

      {gameOver ? (
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center', padding: '3rem', color: 'var(--success)' }}>
          <CheckCircle size={64} style={{ margin: '0 auto' }} />
          <h2>Línea Temporal Alineada</h2>
          <p>Has demostrado un conocimiento impecable de la historia sideral.</p>
        </motion.div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2fr', gap: '2rem' }}>
          
          {/* Fichas Arrastrables */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '600px', overflowY: 'auto', paddingRight: '1rem' }}>
             <h4 style={{ color: 'white', margin: '0 0 1rem 0' }}>Sucesos Históricos</h4>
             <AnimatePresence>
               {shuffledEvents.map(ev => (
                 <motion.div 
                   key={ev.id}
                   draggable
                   onDragStart={(e) => handleDragStart(e, ev)}
                   initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0 }}
                   layout
                   style={{
                     background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)',
                     padding: '0.8rem', borderRadius: '12px', cursor: 'grab', userSelect: 'none',
                     display: 'flex', alignItems: 'center', gap: '1rem'
                   }}
                 >
                    <img src={ev.img} alt={ev.title} style={{ width: '45px', height: '45px', objectFit: 'contain', filter: 'drop-shadow(0 0 5px rgba(0, 228, 255, 0.5))' }} />
                    <div>
                      <div style={{ fontWeight: 'bold', color: 'var(--electric-blue)', fontSize: '0.95rem' }}>{ev.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ev.desc}</div>
                    </div>
                 </motion.div>
               ))}
             </AnimatePresence>
          </div>

          {/* Línea de Tiempo (Drop Targets) */}
          <div style={{ position: 'relative', borderLeft: '4px solid var(--electric-blue)', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
             {timeline.map(slot => (
               <div key={`slot-${slot.id}`} style={{ position: 'relative' }}>
                 {/* Punto en la linea */}
                 <div style={{ position: 'absolute', top: '50%', left: '-2.7rem', transform: 'translateY(-50%)', width: '20px', height: '20px', borderRadius: '50%', background: slot.matched ? 'var(--success)' : 'var(--electric-blue)', border: '4px solid #000' }} />
                 
                 <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontWeight: '900', fontSize: '1.5rem', color: 'white', width: '80px' }}>{slot.year}</div>
                    
                    <div 
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, slot.id)}
                      style={{
                        flex: 1, padding: '1rem', borderRadius: '12px',
                        background: slot.matched ? 'rgba(0,255,136,0.1)' : 'rgba(0,0,0,0.4)',
                        border: slot.matched ? '1px solid var(--success)' : '1px dashed rgba(255,255,255,0.3)',
                        minHeight: '60px', display: 'flex', alignItems: 'center', color: slot.matched ? 'var(--success)' : 'var(--text-muted)'
                      }}
                    >
                       {slot.matched ? (
                         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                           <img src={slot.matched.img} alt="Completado" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                           <div>
                             <div style={{ fontWeight: 'bold' }}>{slot.matched.title}</div>
                             <div style={{ fontSize: '0.85rem', color: 'white' }}>{slot.matched.desc}</div>
                           </div>
                         </div>
                       ) : (
                         <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Crosshair size={16} /> Suelta la ficha correcta aquí</span>
                       )}
                    </div>
                 </div>
               </div>
             ))}
          </div>

        </div>
      )}
    </div>
  );
}
