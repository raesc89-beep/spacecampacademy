'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useShipStore } from '@/store/useShipStore';
import { Rocket, Shield, Zap, Target, Palette, Wrench, ChevronLeft, Activity, Grid, Save, Archive } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SpaceshipScene = dynamic(() => import('@/components/shipyard/SpaceshipScene'), { ssr: false });

export default function NaveHangar() {
  const { shipConfig, stats, setPart, setColor, saveCurrentShip } = useShipStore();
  const [activeCategory, setActiveCategory] = useState('fuselage');
  const router = useRouter();

  const palettePrimary = ['#1a1a1a', '#e63946', '#f4a261', '#2a9d8f', '#264653', '#8338ec', '#ff006e', '#ffbe0b', '#ffffff'];
  const paletteSecondary = ['#2b2d42', '#8d99ae', '#edf2f4', '#ef233c', '#d90429', '#3a86ff', '#8ac926', '#1982c4', '#6a4c93'];

  const partOptions = {
    fuselage: [
      { id: 'fighter', label: 'Caza Ligero' },
      { id: 'cargo', label: 'Carguero' },
      { id: 'explorer', label: 'Explorador' },
      { id: 'cruiser', label: 'Crucero Espacial' },
      { id: 'destroyer', label: 'Destructor Estelar' },
      { id: 'stealth', label: 'Nave Furtiva' },
      { id: 'carrier', label: 'Nave Nodriza' }
    ],
    wings: [
      { id: 'delta', label: 'Alas Delta' },
      { id: 'xwing', label: 'X-Quad' },
      { id: 'ring', label: 'Anillo Estelar' },
      { id: 'heavy', label: 'Blindaje Pesado' },
      { id: 'sweep', label: 'Alas en Flecha' },
      { id: 'vwing', label: 'Formación V' },
      { id: 'scimitar', label: 'Corte Cimitarra' }
    ],
    engines: [
      { id: 'ion', label: 'Motor Iónico' },
      { id: 'plasma', label: 'Reactor Plasma' },
      { id: 'twin', label: 'Motor Gemelo' },
      { id: 'quad', label: 'Propulsor Cuádruple' },
      { id: 'pulse', label: 'Motor de Pulso' },
      { id: 'warp', label: 'Motor Warp' }
    ],
    weapon: [
      { id: 'laser', label: 'Cañón Láser' },
      { id: 'missile', label: 'Lanza Misiles' },
      { id: 'none', label: 'Módulo Pacífico' },
      { id: 'railgun', label: 'Cañón de Riel' },
      { id: 'photon', label: 'Cañón Fotónico' },
      { id: 'torpedo', label: 'Torpedos de Protones' },
      { id: 'swarm', label: 'Enjambre Micro-Misiles' }
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
          <div style={{ width: '30%', height: '100px', backgroundColor: '#070A10', borderBottomRightRadius: '120px', boxShadow: '10px 10px 30px rgba(0, 228, 255, 0.1)', borderRight: '4px solid #00E4FF', borderBottom: '4px solid #00E4FF', display: 'flex', padding: '24px', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
             {/* Tech Grid Background */}
             <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'linear-gradient(#00E4FF 1px, transparent 1px), linear-gradient(90deg, #00E4FF 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             
             <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 1 }}>
               <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FF2A2A', boxShadow: '0 0 10px #FF2A2A' }} className="pulse-anim"></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#00E4FF', boxShadow: '0 0 10px #00E4FF' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#00FF66', opacity: 0.5 }}></div>
               </div>
               <div style={{ color: '#00E4FF', fontSize: '10px', fontWeight: 'bold', letterSpacing: '2px' }}>SYS.NAV.ON</div>
               {/* Warning stripes */}
               <div style={{ width: '60px', height: '4px', backgroundImage: 'repeating-linear-gradient(45deg, #FF2A2A, #FF2A2A 5px, transparent 5px, transparent 10px)' }}></div>
             </div>
             
             {/* Mini Radar */}
             <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #00E4FF', position: 'relative', overflow: 'hidden', zIndex: 1 }}>
               <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', backgroundColor: 'rgba(0,228,255,0.3)' }}></div>
               <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: '1px', backgroundColor: 'rgba(0,228,255,0.3)' }}></div>
               <div style={{ position: 'absolute', top: '50%', left: '50%', width: '50%', height: '1px', backgroundColor: '#00E4FF', transformOrigin: 'left center', animation: 'spin 4s linear infinite' }}></div>
             </div>
          </div>
          
          {/* Top Center Frame */}
          <div style={{ width: '45%', height: '64px', backgroundColor: '#070A10', borderBottomLeftRadius: '60px', borderBottomRightRadius: '60px', borderBottom: '4px solid #00E4FF', boxShadow: '0 10px 30px rgba(0, 228, 255, 0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
             <div style={{ color: '#00E4FF', fontSize: '20px', fontWeight: 900, letterSpacing: '8px', textTransform: 'uppercase', textShadow: '0 0 15px #00E4FF', fontFamily: '"Courier New", Courier, monospace' }}>
               ASTILLERO NAVAL // EN LÍNEA
             </div>
          </div>
          
          {/* Right Arch */}
          <div style={{ width: '30%', height: '100px', backgroundColor: '#070A10', borderBottomLeftRadius: '120px', boxShadow: '-10px 10px 30px rgba(0, 228, 255, 0.1)', borderLeft: '4px solid #00E4FF', borderBottom: '4px solid #00E4FF', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '24px', position: 'relative', overflow: 'hidden' }}>
             {/* Tech Grid Background */}
             <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'linear-gradient(#00E4FF 1px, transparent 1px), linear-gradient(90deg, #00E4FF 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             
             {/* Data Blocks */}
             <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 1 }}>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
                 {[...Array(8)].map((_, i) => (
                   <div key={i} style={{ width: '12px', height: '6px', backgroundColor: '#00E4FF', opacity: Math.random() > 0.5 ? 1 : 0.3, boxShadow: '0 0 5px #00E4FF' }}></div>
                 ))}
               </div>
               <div style={{ color: '#00E4FF', fontSize: '10px', fontWeight: 'bold', letterSpacing: '2px', textAlign: 'right' }}>DATA.LINK</div>
             </div>
             
             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', zIndex: 1 }}>
               <div style={{ width: '40px', height: '40px', borderRadius: '8px', border: '2px solid #00E4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00E4FF', fontWeight: 'bold', boxShadow: 'inset 0 0 10px rgba(0,228,255,0.5)' }}>
                 SYS
               </div>
               <div style={{ width: '40px', height: '2px', backgroundColor: '#00FF66', boxShadow: '0 0 10px #00FF66' }}></div>
             </div>
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
             <div style={{ width: '90%', height: '80px', backgroundColor: '#010306', borderRadius: '12px', border: '1px solid #1a2a3a', display: 'flex', gap: '8px', padding: '6px', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)' }}>
                {/* CLASE DISPLAY */}
                <div style={{ width: '35%', backgroundColor: '#020b14', borderRadius: '8px', border: '1px solid rgba(0,228,255,0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4px', position: 'relative', overflow: 'hidden' }}>
                   <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 50%, rgba(0,228,255,0.1) 50%)', backgroundSize: '100% 4px' }}></div>
                   <span style={{ fontSize: '10px', color: '#00E4FF', fontWeight: 'bold', letterSpacing: '3px', position: 'relative', zIndex: 10 }}>CLASE</span>
                   <span style={{ fontSize: '20px', fontWeight: 900, color: '#FFFFFF', textTransform: 'uppercase', textShadow: '0 0 10px #00E4FF', position: 'relative', zIndex: 10 }}>{shipConfig.fuselage}</span>
                </div>
                
                {/* CONTROL BOARD */}
                <div style={{ flex: 1, backgroundColor: '#020b14', borderRadius: '8px', border: '1px solid rgba(0,228,255,0.2)', display: 'flex', alignItems: 'center', padding: '8px', gap: '16px', position: 'relative', overflow: 'hidden' }}>
                   {/* Soundwave/Equalizer bars */}
                   <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '40px' }}>
                     {[...Array(8)].map((_, i) => (
                       <div key={i} style={{ width: '6px', backgroundColor: '#00FF66', boxShadow: '0 0 5px #00FF66', height: `${Math.max(20, Math.random() * 100)}%`, animation: `pulse ${1 + Math.random()}s infinite` }}></div>
                     ))}
                   </div>
                   
                   <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                     {/* Data lines */}
                     <div style={{ width: '100%', height: '2px', backgroundColor: '#00E4FF', opacity: 0.5 }}></div>
                     <div style={{ width: '70%', height: '2px', backgroundColor: '#00E4FF', opacity: 0.3 }}></div>
                     <div style={{ width: '90%', height: '2px', backgroundColor: '#FF2A2A', opacity: 0.5 }}></div>
                   </div>

                   {/* Action Buttons */}
                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
                     <div style={{ width: '20px', height: '20px', backgroundColor: '#FF2A2A', borderRadius: '4px', boxShadow: '0 0 10px #FF2A2A' }}></div>
                     <div style={{ width: '20px', height: '20px', backgroundColor: 'transparent', border: '2px solid #00E4FF', borderRadius: '4px' }}></div>
                     <div style={{ width: '20px', height: '20px', backgroundColor: 'transparent', border: '2px solid #00E4FF', borderRadius: '4px' }}></div>
                     <div style={{ width: '20px', height: '20px', backgroundColor: '#00E4FF', borderRadius: '4px', boxShadow: '0 0 10px #00E4FF' }}></div>
                   </div>
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
            
            {/* Back Button and Save Button inside Cockpit Panel */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', padding: '0 8px 8px 8px', zIndex: 10 }}>
               <Link href="/hangar" style={{ textDecoration: 'none', flex: 1 }}>
                 <div
                   style={{ height: '40px', borderRadius: '8px', backgroundColor: 'transparent', border: '1px solid #FF2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF2A2A', fontWeight: 900, letterSpacing: '1px', fontSize: '10px', cursor: 'pointer', transition: 'all 0.2s' }}
                   onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 42, 42, 0.1)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 42, 42, 0.4)'; }}
                   onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}>
                   &lt; SALIR
                 </div>
               </Link>

               <div
                 style={{ height: '40px', flex: 1, borderRadius: '8px', backgroundColor: 'rgba(0, 255, 102, 0.1)', border: '1px solid #00FF66', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00FF66', fontWeight: 900, letterSpacing: '1px', fontSize: '10px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 0 10px rgba(0, 255, 102, 0.3), inset 0 0 10px rgba(0, 255, 102, 0.2)', textShadow: '0 0 5px #00FF66' }}
                 onClick={() => {
                   saveCurrentShip();
                   alert('Nave guardada holográficamente en Mi Hangar.');
                 }}
                 onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0, 255, 102, 0.2)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 102, 0.6), inset 0 0 15px rgba(0, 255, 102, 0.4)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                 onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0, 255, 102, 0.1)'; e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 255, 102, 0.3), inset 0 0 10px rgba(0, 255, 102, 0.2)'; e.currentTarget.style.transform = 'scale(1)'; }}>
                 <Save size={14} style={{ marginRight: '4px' }} /> GUARDAR
               </div>

               <Link href="/hangar/mi-hangar" style={{ textDecoration: 'none', flex: 1 }}>
                 <div
                   style={{ height: '40px', borderRadius: '8px', backgroundColor: 'rgba(0, 228, 255, 0.1)', border: '1px solid #00E4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00E4FF', fontWeight: 900, letterSpacing: '1px', fontSize: '10px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 0 10px rgba(0, 228, 255, 0.3), inset 0 0 10px rgba(0, 228, 255, 0.2)', textShadow: '0 0 5px #00E4FF' }}
                   onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0, 228, 255, 0.2)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 228, 255, 0.6), inset 0 0 15px rgba(0, 228, 255, 0.4)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                   onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0, 228, 255, 0.1)'; e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 228, 255, 0.3), inset 0 0 10px rgba(0, 228, 255, 0.2)'; e.currentTarget.style.transform = 'scale(1)'; }}>
                   <Archive size={14} style={{ marginRight: '4px' }} /> HANGAR
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
        @keyframes spin { 100% { transform: rotate(360deg); } }
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
