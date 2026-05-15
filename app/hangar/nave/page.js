'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useShipStore } from '@/store/useShipStore';
import { Rocket, Shield, Zap, Target, Palette, Wrench, ChevronLeft, Activity } from 'lucide-react';
import Link from 'next/link';

const SpaceshipScene = dynamic(() => import('@/components/shipyard/SpaceshipScene'), { ssr: false });

export default function NaveHangar() {
  const { shipConfig, stats, setPart, setColor } = useShipStore();
  const [activeCategory, setActiveCategory] = useState('fuselage');

  const palettePrimary = ['#1a1a1a', '#e63946', '#f4a261', '#2a9d8f', '#264653', '#8338ec', '#ff006e', '#ffbe0b', '#ffffff'];
  const paletteSecondary = ['#2b2d42', '#8d99ae', '#edf2f4', '#ef233c', '#d90429', '#3a86ff', '#8ac926', '#1982c4', '#6a4c93'];

  const partOptions = {
    fuselage: [
      { id: 'fighter', label: 'Caza Ligero' },
      { id: 'cargo', label: 'Carguero' },
      { id: 'explorer', label: 'Explorador' }
    ],
    wings: [
      { id: 'delta', label: 'Alas Delta' },
      { id: 'xwing', label: 'X-Quad' },
      { id: 'ring', label: 'Anillo Estelar' }
    ],
    engines: [
      { id: 'ion', label: 'Motor Iónico' },
      { id: 'plasma', label: 'Reactor Plasma' }
    ],
    weapon: [
      { id: 'laser', label: 'Cañón Láser' },
      { id: 'missile', label: 'Lanza Misiles' },
      { id: 'none', label: 'Módulo Pacífico' }
    ]
  };

  const categories = [
    { id: 'fuselage', label: 'FUSELAJE', icon: <Rocket size={20} /> },
    { id: 'wings', label: 'ALERONES', icon: <Shield size={20} /> },
    { id: 'engines', label: 'MOTORES', icon: <Zap size={20} /> },
    { id: 'weapon', label: 'ARMAMENTO', icon: <Target size={20} /> },
    { id: 'colors', label: 'PINTURA', icon: <Palette size={20} /> }
  ];

  return (
    <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#2D1B4E', fontFamily: 'sans-serif' }}>
      
      {/* 3D Canvas Background (Viewport) */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <SpaceshipScene />
      </div>

      {/* COCKPIT OVERLAY UI */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>
        
        {/* Top Arch / Window Frame */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', pointerEvents: 'auto' }}>
          {/* Left Arch */}
          <div style={{ width: '30%', height: '128px', backgroundColor: '#e6e2db', borderBottomRightRadius: '100px', boxShadow: '10px 10px 20px rgba(0,0,0,0.5)', borderRight: '8px solid #c9c5be', borderBottom: '8px solid #c9c5be', display: 'flex', padding: '16px', alignItems: 'flex-start' }}>
             <Link href="/hangar" style={{ backgroundColor: '#4fd1c5', color: '#1a202c', fontWeight: 'bold', padding: '8px 16px', borderRadius: '8px', boxShadow: 'inset 0 -4px 0 rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', transition: 'transform 0.1s' }}>
               <ChevronLeft /> VOLVER AL ASTILLERO
             </Link>
          </div>
          {/* Top Center Frame */}
          <div style={{ width: '40%', height: '64px', backgroundColor: '#4fd1c5', borderBottomLeftRadius: '50px', borderBottomRightRadius: '50px', borderBottom: '8px solid #319795', boxShadow: '0 10px 20px rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingBottom: '8px' }}>
             <div style={{ backgroundColor: '#1a202c', padding: '4px 24px', borderRadius: '9999px', color: '#4fd1c5', fontSize: '14px', fontWeight: 'bold', letterSpacing: '2px', border: '1px solid #319795', boxShadow: 'inset 0 0 10px #4fd1c5' }}>
               SISTEMA DE ENSAMBLAJE ACTIVO
             </div>
          </div>
          {/* Right Arch */}
          <div style={{ width: '30%', height: '128px', backgroundColor: '#e6e2db', borderBottomLeftRadius: '100px', boxShadow: '-10px 10px 20px rgba(0,0,0,0.5)', borderLeft: '8px solid #c9c5be', borderBottom: '8px solid #c9c5be', display: 'flex', justifyContent: 'flex-end', padding: '24px' }}>
             <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#1a202c', border: '4px solid #4fd1c5', boxShadow: '0 0 20px #4fd1c5', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="pulse-anim">
               <Activity color="#4fd1c5" />
             </div>
          </div>
        </div>

        {/* Dashboard Panels (Bottom & Sides) */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', pointerEvents: 'auto' }}>
          
          {/* LEFT PANEL: Stats Screen */}
          <div 
            style={{ width: '28%', height: '400px', backgroundColor: '#e6e2db', borderTopRightRadius: '80px', boxShadow: '10px -10px 30px rgba(0,0,0,0.6)', borderTop: '8px solid #c9c5be', borderRight: '8px solid #c9c5be', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', transform: 'perspective(1000px) rotateY(15deg)', transformOrigin: 'left bottom' }}
          >
            {/* Screen border */}
            <div style={{ width: '100%', height: '70%', backgroundColor: '#2c7a7b', borderRadius: '12px', padding: '12px', border: '6px solid #319795', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5), 0 10px 20px rgba(0,0,0,0.3)', marginBottom: '16px' }}>
              {/* Actual Screen */}
              <div style={{ width: '100%', height: '100%', backgroundColor: '#e6fffa', borderRadius: '8px', border: '4px solid #81e6d9', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
                 <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.05) 50%)', backgroundSize: '100% 4px', pointerEvents: 'none' }}></div>
                 <h2 style={{ color: '#234e52', fontSize: '20px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', textAlign: 'center', borderBottom: '2px solid #81e6d9', paddingBottom: '8px', margin: '0 0 8px 0' }}>Estado de la Nave</h2>
                 
                 <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center' }}>
                   <CockpitStat label="POTENCIA" value={stats.damage} color="#f56565" />
                   <CockpitStat label="ESCUDOS" value={stats.shield} color="#4299e1" />
                   <CockpitStat label="ALCANCE" value={stats.range} color="#9f7aea" />
                   <CockpitStat label="AGILIDAD" value={stats.maneuverability} color="#48bb78" />
                 </div>
              </div>
            </div>
            
            {/* Physical Keypad */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', padding: '0 8px 8px 8px' }}>
               {[...Array(8)].map((_, i) => (
                 <div key={i} style={{ height: '32px', backgroundColor: '#f6e05e', borderRadius: '4px', borderBottom: '4px solid #d69e2e', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} className="btn-pushable"></div>
               ))}
            </div>
          </div>

          {/* CENTER PANEL: Main Controls */}
          <div 
            style={{ width: '44%', height: '250px', backgroundColor: '#e6e2db', borderTopLeftRadius: '40px', borderTopRightRadius: '40px', boxShadow: '0 -15px 30px rgba(0,0,0,0.5)', borderTop: '8px solid #c9c5be', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', zIndex: 20, transform: 'perspective(1000px) rotateX(20deg)', transformOrigin: 'bottom center' }}
          >
             {/* Center Screen */}
             <div style={{ width: '80%', height: '96px', backgroundColor: '#319795', borderRadius: '8px', border: '4px solid #2c7a7b', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', padding: '8px', boxShadow: 'inset 0 0 15px rgba(0,0,0,0.5)' }}>
                {/* 3 panels inside center screen */}
                <div style={{ width: '30%', backgroundColor: '#e6fffa', borderRadius: '4px', border: '2px solid #81e6d9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4px' }}>
                   <span style={{ fontSize: '10px', color: '#2c7a7b', fontWeight: 'bold', textAlign: 'center', lineHeight: 1.2 }}>CLASE:</span>
                   <span style={{ fontSize: '14px', fontWeight: 900, color: '#234e52', textAlign: 'center', textTransform: 'uppercase' }}>{shipConfig.fuselage}</span>
                </div>
                <div style={{ width: '38%', backgroundColor: '#81e6d9', borderRadius: '4px', border: '2px solid #4fd1c5', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.2) 50%)', backgroundSize: '20px 100%', animation: 'slide 2s linear infinite' }}></div>
                   <Wrench size={32} color="#234e52" style={{ position: 'relative', zIndex: 10 }} className="pulse-anim" />
                </div>
                <div style={{ width: '30%', backgroundColor: '#e6fffa', borderRadius: '4px', border: '2px solid #81e6d9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4px' }}>
                   <span style={{ fontSize: '10px', color: '#2c7a7b', fontWeight: 'bold', textAlign: 'center', lineHeight: 1.2 }}>SISTEMA:</span>
                   <span style={{ fontSize: '14px', fontWeight: 900, color: '#234e52', textAlign: 'center', textTransform: 'uppercase' }}>ÓPTIMO</span>
                </div>
             </div>

             {/* Main Category Buttons */}
             <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', padding: '0 16px', gap: '8px' }}>
               {categories.map(cat => {
                 const isActive = activeCategory === cat.id;
                 return (
                   <button 
                     key={cat.id}
                     onClick={() => setActiveCategory(cat.id)}
                     style={{ flex: 1, height: '56px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', fontWeight: 'bold', fontSize: '10px', letterSpacing: '1px', transition: 'all 0.1s', border: 'none', cursor: 'pointer', ...isActive ? {
                       backgroundColor: '#f6e05e', borderBottom: 'none', color: '#744210', transform: 'translateY(4px)', boxShadow: 'inset 0 4px 6px rgba(0,0,0,0.1)'
                     } : {
                       backgroundColor: '#ecc94b', borderBottom: '4px solid #b7791f', color: '#744210', boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                     }}}
                   >
                     {cat.icon}
                     {cat.label}
                   </button>
                 );
               })}
             </div>
             
             {/* Small status lights */}
             <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
               <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#48bb78', border: '2px solid #2f855a', boxShadow: '0 0 10px #48bb78' }}></div>
               <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#48bb78', border: '2px solid #2f855a', boxShadow: '0 0 10px #48bb78' }}></div>
               <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#ecc94b', border: '2px solid #b7791f' }}></div>
             </div>
          </div>

          {/* RIGHT PANEL: Options Screen */}
          <div 
            style={{ width: '28%', height: '400px', backgroundColor: '#e6e2db', borderTopLeftRadius: '80px', boxShadow: '-10px -10px 30px rgba(0,0,0,0.6)', borderTop: '8px solid #c9c5be', borderLeft: '8px solid #c9c5be', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', transform: 'perspective(1000px) rotateY(-15deg)', transformOrigin: 'right bottom' }}
          >
            {/* Screen border */}
            <div style={{ width: '100%', height: '70%', backgroundColor: '#2c7a7b', borderRadius: '12px', padding: '12px', border: '6px solid #319795', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5), 0 10px 20px rgba(0,0,0,0.3)', marginBottom: '16px' }}>
              {/* Actual Screen */}
              <div style={{ width: '100%', height: '100%', backgroundColor: '#e6fffa', borderRadius: '8px', border: '4px solid #81e6d9', padding: '16px', overflowY: 'auto', position: 'relative' }}>
                 <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.05) 50%)', backgroundSize: '100% 4px', pointerEvents: 'none', zIndex: 20 }}></div>
                 
                 <h2 style={{ color: '#234e52', fontSize: '20px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', textAlign: 'center', borderBottom: '2px solid #81e6d9', paddingBottom: '8px', marginBottom: '16px', position: 'relative', zIndex: 30, margin: 0 }}>
                   {categories.find(c => c.id === activeCategory)?.label || 'OPCIONES'}
                 </h2>

                 <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', zIndex: 30 }}>
                   <AnimatePresence mode="popLayout">
                     {activeCategory === 'colors' ? (
                       <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                         <CockpitColorPicker label="PRINCIPAL" colors={palettePrimary} selected={shipConfig.colors.primary} onSelect={c => setColor('primary', c)} />
                         <CockpitColorPicker label="SECUNDARIO" colors={paletteSecondary} selected={shipConfig.colors.secondary} onSelect={c => setColor('secondary', c)} />
                       </motion.div>
                     ) : (
                       partOptions[activeCategory]?.map((opt, i) => {
                         const isSelected = shipConfig[activeCategory] === opt.id;
                         return (
                           <motion.button
                             initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                             key={opt.id}
                             onClick={() => setPart(activeCategory, opt.id)}
                             style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '4px solid', fontWeight: 'bold', fontSize: '18px', letterSpacing: '1px', textTransform: 'uppercase', textAlign: 'left', paddingLeft: '16px', cursor: 'pointer', ...isSelected ? {
                               backgroundColor: '#319795', borderColor: '#234e52', color: 'white', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)', transform: 'scale(1.02)'
                             } : {
                               backgroundColor: '#b2f5ea', borderColor: '#81e6d9', color: '#2c7a7b'
                             }}}
                           >
                             {opt.label}
                           </motion.button>
                         );
                       })
                     )}
                   </AnimatePresence>
                 </div>
              </div>
            </div>
            
            {/* Physical Dials/Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px 8px 16px' }}>
               <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e53e3e', borderBottom: '4px solid #c53030', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900 }}>X</div>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                 <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#edf2f7', borderBottom: '2px solid #cbd5e0' }}></div>
                 <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#edf2f7', borderBottom: '2px solid #cbd5e0' }}></div>
                 <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#edf2f7', borderBottom: '2px solid #cbd5e0' }}></div>
                 <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#edf2f7', borderBottom: '2px solid #cbd5e0' }}></div>
               </div>
            </div>
          </div>

        </div>
      </div>
      
      <style>{`
        @keyframes slide { from { background-position: 0 0; } to { background-position: 20px 0; } }
        .pulse-anim { animation: pulse 2s infinite; }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function CockpitStat({ label, value, color }) {
  return (
    <div style={{ marginBottom: '4px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2c7a7b', fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div style={{ width: '100%', height: '16px', backgroundColor: '#b2f5ea', borderRadius: '9999px', border: '2px solid #81e6d9', padding: '2px', overflow: 'hidden' }}>
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: `${value}%` }} 
          transition={{ duration: 0.5 }}
          style={{ height: '100%', borderRadius: '9999px', backgroundColor: color, boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.4)' }} 
        />
      </div>
    </div>
  );
}

function CockpitColorPicker({ label, colors, selected, onSelect }) {
  return (
    <div style={{ marginBottom: '8px' }}>
      <div style={{ color: '#2c7a7b', fontWeight: 'bold', fontSize: '12px', marginBottom: '8px' }}>{label}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
        {colors.map(c => {
          const isSelected = selected === c;
          return (
            <button 
              key={c}
              onClick={() => onSelect(c)}
              style={{ backgroundColor: c, height: '32px', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'transform 0.1s', ...isSelected ? {
                border: '2px solid #1a202c', transform: 'scale(1.1)'
              } : {
                border: '2px solid transparent'
              }}}
            />
          );
        })}
      </div>
    </div>
  );
}
