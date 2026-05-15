'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useShipStore } from '@/store/useShipStore';
import { Rocket, Shield, Zap, Target, Palette, Wrench, ChevronLeft, Activity, Grid } from 'lucide-react';
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
    <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#000000', fontFamily: 'sans-serif' }}>
      
      {/* 3D Canvas Background (Viewport) */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <SpaceshipScene />
      </div>

      {/* COCKPIT OVERLAY UI - ALIEN DARK CYBERPUNK THEME */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>
        
        {/* Top Arch / Window Frame */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', pointerEvents: 'none' }}>
          {/* Left Arch */}
          <div style={{ width: '30%', height: '100px', backgroundColor: '#070A10', borderBottomRightRadius: '120px', boxShadow: '10px 10px 30px rgba(0, 228, 255, 0.1)', borderRight: '4px solid #00E4FF', borderBottom: '4px solid #00E4FF', display: 'flex', padding: '24px', alignItems: 'flex-start' }}>
             <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#00E4FF', boxShadow: '0 0 10px #00E4FF' }} className="pulse-anim"></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#333' }}></div>
             </div>
          </div>
          
          {/* Top Center Frame */}
          <div style={{ width: '40%', height: '50px', backgroundColor: '#070A10', borderBottomLeftRadius: '60px', borderBottomRightRadius: '60px', borderBottom: '4px solid #00E4FF', boxShadow: '0 10px 30px rgba(0, 228, 255, 0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
             <div style={{ color: '#00E4FF', fontSize: '12px', fontWeight: 900, letterSpacing: '4px', textTransform: 'uppercase', textShadow: '0 0 10px #00E4FF' }}>
               ASTILLERO NAVAL // EN LÍNEA
             </div>
          </div>
          
          {/* Right Arch */}
          <div style={{ width: '30%', height: '100px', backgroundColor: '#070A10', borderBottomLeftRadius: '120px', boxShadow: '-10px 10px 30px rgba(0, 228, 255, 0.1)', borderLeft: '4px solid #00E4FF', borderBottom: '4px solid #00E4FF', display: 'flex', justifyContent: 'flex-end', padding: '24px' }}>
             <Grid color="#00E4FF" size={24} style={{ opacity: 0.5 }} />
          </div>
        </div>

        {/* Dashboard Panels (Bottom & Sides) */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', pointerEvents: 'auto' }}>
          
          {/* LEFT PANEL: Stats Screen */}
          <div 
            style={{ width: '28%', height: '420px', backgroundColor: '#070A10', borderTopRightRadius: '60px', boxShadow: '10px -10px 40px rgba(0, 228, 255, 0.15)', borderTop: '4px solid #00E4FF', borderRight: '4px solid #00E4FF', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', transform: 'perspective(1200px) rotateY(15deg)', transformOrigin: 'left bottom', position: 'relative' }}
          >
            {/* Hexagonal decorative pattern */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\\"24\\" height=\\"40\\" viewBox=\\"0 0 24 40\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cpath d=\\"M0 10l12-6.928L24 10v20l-12 6.928L0 30V10z\\" fill=\\"%2300E4FF\\" fill-rule=\\"evenodd\\"%3E%3C/path%3E%3C/svg%3E")' }}></div>
            
            {/* Screen border */}
            <div style={{ width: '100%', height: '75%', backgroundColor: '#010306', borderRadius: '16px', padding: '8px', border: '2px solid #1a2a3a', boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8), 0 0 20px rgba(0, 228, 255, 0.1)', marginBottom: '16px', zIndex: 10 }}>
              {/* Actual Screen */}
              <div style={{ width: '100%', height: '100%', backgroundColor: '#020b14', borderRadius: '12px', border: '1px solid #00E4FF', padding: '20px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                 <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 50%, rgba(0,228,255,0.05) 50%)', backgroundSize: '100% 4px', pointerEvents: 'none' }}></div>
                 
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(0,228,255,0.3)', paddingBottom: '12px', marginBottom: '16px' }}>
                   <Activity size={18} color="#00E4FF" />
                   <h2 style={{ color: '#00E4FF', fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '3px', margin: 0 }}>Parámetros</h2>
                 </div>
                 
                 <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center' }}>
                   <CockpitStat label="DAÑO OFENSIVO" value={stats.damage} color="#FF2A2A" />
                   <CockpitStat label="INTEGRIDAD ESCUDOS" value={stats.shield} color="#00E4FF" />
                   <CockpitStat label="CAPACIDAD SALTO" value={stats.range} color="#B02AFF" />
                   <CockpitStat label="MANIOBRABILIDAD" value={stats.maneuverability} color="#00FF66" />
                 </div>
              </div>
            </div>
            
            {/* Physical Keypad */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', padding: '0 8px 8px 8px', zIndex: 10 }}>
               {[...Array(4)].map((_, i) => (
                 <div key={i} style={{ height: '8px', backgroundColor: '#00E4FF', borderRadius: '2px', opacity: 0.5, boxShadow: '0 0 10px #00E4FF' }}></div>
               ))}
            </div>
          </div>

          {/* CENTER PANEL: Main Controls */}
          <div 
            style={{ width: '44%', height: '280px', backgroundColor: '#070A10', borderTopLeftRadius: '30px', borderTopRightRadius: '30px', boxShadow: '0 -15px 40px rgba(0, 228, 255, 0.1)', borderTop: '4px solid #00E4FF', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', zIndex: 20, transform: 'perspective(1200px) rotateX(25deg)', transformOrigin: 'bottom center', position: 'relative' }}
          >
             <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '200px', height: '4px', backgroundColor: '#00E4FF', boxShadow: '0 0 20px #00E4FF' }}></div>

             {/* Center Screen */}
             <div style={{ width: '90%', height: '80px', backgroundColor: '#010306', borderRadius: '12px', border: '1px solid #1a2a3a', display: 'flex', justifyContent: 'space-between', padding: '6px', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)' }}>
                {/* 3 panels inside center screen */}
                <div style={{ width: '30%', backgroundColor: '#020b14', borderRadius: '8px', border: '1px solid rgba(0,228,255,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4px' }}>
                   <span style={{ fontSize: '9px', color: 'rgba(0,228,255,0.5)', fontWeight: 'bold', letterSpacing: '2px' }}>CLASE:</span>
                   <span style={{ fontSize: '16px', fontWeight: 900, color: '#00E4FF', textTransform: 'uppercase', textShadow: '0 0 5px #00E4FF' }}>{shipConfig.fuselage}</span>
                </div>
                <div style={{ width: '38%', backgroundColor: '#020b14', borderRadius: '8px', border: '1px solid rgba(0,228,255,0.4)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 0 15px rgba(0,228,255,0.1)' }}>
                   <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 50%, rgba(0,228,255,0.1) 50%)', backgroundSize: '20px 100%', animation: 'slide 2s linear infinite' }}></div>
                   <Wrench size={32} color="#00E4FF" style={{ position: 'relative', zIndex: 10 }} className="pulse-anim" />
                </div>
                <div style={{ width: '30%', backgroundColor: '#020b14', borderRadius: '8px', border: '1px solid rgba(0,228,255,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4px' }}>
                   <span style={{ fontSize: '9px', color: 'rgba(0,228,255,0.5)', fontWeight: 'bold', letterSpacing: '2px' }}>ESTADO:</span>
                   <span style={{ fontSize: '16px', fontWeight: 900, color: '#00FF66', textTransform: 'uppercase', textShadow: '0 0 5px #00FF66' }}>ÓPTIMO</span>
                </div>
             </div>

             {/* Main Category Buttons */}
             <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', gap: '12px' }}>
               {categories.map(cat => {
                 const isActive = activeCategory === cat.id;
                 return (
                   <button 
                     key={cat.id}
                     onClick={() => setActiveCategory(cat.id)}
                     style={{ flex: 1, height: '70px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 900, fontSize: '11px', letterSpacing: '1px', transition: 'all 0.2s', border: 'none', cursor: 'pointer', ...isActive ? {
                       backgroundColor: '#00E4FF', color: '#000000', transform: 'translateY(2px)', boxShadow: '0 0 20px rgba(0,228,255,0.6)'
                     } : {
                       backgroundColor: '#0F172A', color: '#00E4FF', borderBottom: '3px solid #00E4FF', borderTop: '1px solid rgba(0,228,255,0.2)', boxShadow: '0 5px 15px rgba(0,0,0,0.5)'
                     }}}
                     onMouseOver={(e) => { if(!isActive) e.currentTarget.style.backgroundColor = '#1E293B'; }}
                     onMouseOut={(e) => { if(!isActive) e.currentTarget.style.backgroundColor = '#0F172A'; }}
                   >
                     {cat.icon}
                     {cat.label}
                   </button>
                 );
               })}
             </div>
          </div>

          {/* RIGHT PANEL: Options Screen */}
          <div 
            style={{ width: '28%', height: '420px', backgroundColor: '#070A10', borderTopLeftRadius: '60px', boxShadow: '-10px -10px 40px rgba(0, 228, 255, 0.15)', borderTop: '4px solid #00E4FF', borderLeft: '4px solid #00E4FF', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', transform: 'perspective(1200px) rotateY(-15deg)', transformOrigin: 'right bottom', position: 'relative' }}
          >
            {/* Screen border */}
            <div style={{ width: '100%', height: '75%', backgroundColor: '#010306', borderRadius: '16px', padding: '8px', border: '2px solid #1a2a3a', boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8), 0 0 20px rgba(0, 228, 255, 0.1)', marginBottom: '16px', zIndex: 10 }}>
              {/* Actual Screen */}
              <div style={{ width: '100%', height: '100%', backgroundColor: '#020b14', borderRadius: '12px', border: '1px solid #00E4FF', padding: '20px', overflowY: 'auto', position: 'relative' }}>
                 <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 50%, rgba(0,228,255,0.05) 50%)', backgroundSize: '100% 4px', pointerEvents: 'none', zIndex: 20 }}></div>
                 
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(0,228,255,0.3)', paddingBottom: '12px', marginBottom: '16px', position: 'relative', zIndex: 30 }}>
                   <Rocket size={18} color="#00E4FF" />
                   <h2 style={{ color: '#00E4FF', fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '3px', margin: 0 }}>
                     {categories.find(c => c.id === activeCategory)?.label || 'OPCIONES'}
                   </h2>
                 </div>

                 <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', zIndex: 30 }}>
                   <AnimatePresence mode="popLayout">
                     {activeCategory === 'colors' ? (
                       <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                         <CockpitColorPicker label="Pintura Principal" colors={palettePrimary} selected={shipConfig.colors.primary} onSelect={c => setColor('primary', c)} />
                         <CockpitColorPicker label="Pintura Secundaria" colors={paletteSecondary} selected={shipConfig.colors.secondary} onSelect={c => setColor('secondary', c)} />
                       </motion.div>
                     ) : (
                       partOptions[activeCategory]?.map((opt, i) => {
                         const isSelected = shipConfig[activeCategory] === opt.id;
                         return (
                           <motion.button
                             initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                             key={opt.id}
                             onClick={() => setPart(activeCategory, opt.id)}
                             style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid', fontWeight: 900, fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s', ...isSelected ? {
                               backgroundColor: 'rgba(0, 228, 255, 0.15)', borderColor: '#00E4FF', color: '#00E4FF', boxShadow: 'inset 0 0 15px rgba(0,228,255,0.2)', transform: 'scale(1.02)'
                             } : {
                               backgroundColor: 'transparent', borderColor: 'rgba(0, 228, 255, 0.2)', color: 'rgba(0, 228, 255, 0.5)'
                             }}}
                             onMouseOver={(e) => { if(!isSelected) e.currentTarget.style.borderColor = '#00E4FF'; e.currentTarget.style.color = '#fff'; }}
                             onMouseOut={(e) => { if(!isSelected) e.currentTarget.style.borderColor = 'rgba(0, 228, 255, 0.2)'; e.currentTarget.style.color = 'rgba(0, 228, 255, 0.5)'; }}
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
            
            {/* Back Button inside Cockpit Panel */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 8px 8px 8px', zIndex: 10 }}>
               <Link href="/hangar" style={{ textDecoration: 'none' }}>
                 <div style={{ height: '40px', padding: '0 24px', borderRadius: '8px', backgroundColor: 'transparent', border: '2px solid #FF2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF2A2A', fontWeight: 900, letterSpacing: '2px', fontSize: '12px', cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 42, 42, 0.1)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 42, 42, 0.4)'; }}
                      onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}>
                    &lt; REGRESAR
                 </div>
               </Link>
            </div>
          </div>

        </div>
      </div>
      
      <style>{`
        @keyframes slide { from { background-position: 0 0; } to { background-position: 20px 0; } }
        .pulse-anim { animation: pulse 2s infinite; }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; box-shadow: 0 0 10px #00E4FF; }
          50% { transform: scale(1.1); opacity: 0.7; box-shadow: 0 0 20px #00E4FF; }
          100% { transform: scale(1); opacity: 1; box-shadow: 0 0 10px #00E4FF; }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0, 228, 255, 0.3); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0, 228, 255, 0.8); }
      `}</style>
    </div>
  );
}

function CockpitStat({ label, value, color }) {
  return (
    <div style={{ marginBottom: '4px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(0,228,255,0.7)', fontWeight: 'bold', fontSize: '10px', marginBottom: '6px', letterSpacing: '1px' }}>
        <span>{label}</span>
        <span style={{ color }}>{value}%</span>
      </div>
      <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '2px', border: '1px solid rgba(0,228,255,0.2)', overflow: 'hidden' }}>
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: `${value}%` }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ height: '100%', backgroundColor: color, boxShadow: `0 0 10px ${color}` }} 
        />
      </div>
    </div>
  );
}

function CockpitColorPicker({ label, colors, selected, onSelect }) {
  return (
    <div style={{ marginBottom: '8px' }}>
      <div style={{ color: 'rgba(0,228,255,0.7)', fontWeight: 'bold', fontSize: '10px', marginBottom: '10px', letterSpacing: '1px', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
        {colors.map(c => {
          const isSelected = selected === c;
          return (
            <button 
              key={c}
              onClick={() => onSelect(c)}
              style={{ backgroundColor: c, height: '32px', borderRadius: '4px', cursor: 'pointer', transition: 'transform 0.1s', ...isSelected ? {
                border: '2px solid #00E4FF', transform: 'scale(1.15)', boxShadow: '0 0 15px rgba(0, 228, 255, 0.6)'
              } : {
                border: '1px solid rgba(255,255,255,0.1)'
              }}}
            />
          );
        })}
      </div>
    </div>
  );
}
