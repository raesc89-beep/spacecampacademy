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
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#2D1B4E] font-sans">
      
      {/* 3D Canvas Background (Viewport) */}
      <div className="absolute inset-0 z-0">
        <SpaceshipScene />
      </div>

      {/* COCKPIT OVERLAY UI */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between overflow-hidden">
        
        {/* Top Arch / Window Frame */}
        <div className="w-full flex justify-between items-start pointer-events-auto">
          {/* Left Arch */}
          <div className="w-[30%] h-32 bg-[#e6e2db] rounded-br-[100px] shadow-[10px_10px_20px_rgba(0,0,0,0.5)] border-r-8 border-b-8 border-[#c9c5be] flex p-4 items-start">
             <Link href="/hangar" className="bg-[#4fd1c5] hover:bg-[#38b2ac] text-[#1a202c] font-bold py-2 px-4 rounded-lg shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)] flex items-center gap-2 transition-transform active:translate-y-1">
               <ChevronLeft /> VOLVER AL ASTILLERO
             </Link>
          </div>
          {/* Top Center Frame */}
          <div className="w-[40%] h-16 bg-[#4fd1c5] rounded-b-[50px] border-b-8 border-[#319795] shadow-[0_10px_20px_rgba(0,0,0,0.4)] flex justify-center items-end pb-2">
             <div className="bg-[#1a202c] px-6 py-1 rounded-full text-[#4fd1c5] text-sm font-bold tracking-widest border border-[#319795] shadow-[inset_0_0_10px_#4fd1c5]">
               SISTEMA DE ENSAMBLAJE ACTIVO
             </div>
          </div>
          {/* Right Arch */}
          <div className="w-[30%] h-32 bg-[#e6e2db] rounded-bl-[100px] shadow-[-10px_10px_20px_rgba(0,0,0,0.5)] border-l-8 border-b-8 border-[#c9c5be] flex justify-end p-6">
             <div className="w-16 h-16 rounded-full bg-[#1a202c] border-4 border-[#4fd1c5] shadow-[0_0_20px_#4fd1c5] grid place-items-center">
               <Activity color="#4fd1c5" className="animate-pulse" />
             </div>
          </div>
        </div>

        {/* Dashboard Panels (Bottom & Sides) */}
        <div className="w-full flex justify-between items-end pb-0 px-0 pointer-events-auto">
          
          {/* LEFT PANEL: Stats Screen */}
          <div 
            className="w-[28%] h-[400px] bg-[#e6e2db] rounded-tr-[80px] shadow-[10px_-10px_30px_rgba(0,0,0,0.6)] border-t-8 border-r-8 border-[#c9c5be] p-6 flex flex-col justify-end"
            style={{ transform: 'perspective(1000px) rotateY(15deg)', transformOrigin: 'left bottom' }}
          >
            {/* Screen border */}
            <div className="w-full h-[70%] bg-[#2c7a7b] rounded-xl p-3 border-[6px] border-[#319795] shadow-[inset_0_0_20px_rgba(0,0,0,0.5),_0_10px_20px_rgba(0,0,0,0.3)] mb-4">
              {/* Actual Screen */}
              <div className="w-full h-full bg-[#e6fffa] rounded-lg border-[4px] border-[#81e6d9] p-4 flex flex-col justify-between overflow-hidden relative">
                 <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
                 <h2 className="text-[#234e52] text-xl font-black uppercase tracking-widest text-center border-b-2 border-[#81e6d9] pb-2 mb-2">Estado de la Nave</h2>
                 
                 <div className="flex-1 flex flex-col gap-3 justify-center">
                   <CockpitStat label="POTENCIA" value={stats.damage} color="bg-red-500" />
                   <CockpitStat label="ESCUDOS" value={stats.shield} color="bg-blue-500" />
                   <CockpitStat label="ALCANCE" value={stats.range} color="bg-purple-500" />
                   <CockpitStat label="AGILIDAD" value={stats.maneuverability} color="bg-green-500" />
                 </div>
              </div>
            </div>
            
            {/* Physical Keypad */}
            <div className="grid grid-cols-4 gap-2 px-2 pb-2">
               {[...Array(8)].map((_, i) => (
                 <div key={i} className="h-8 bg-[#f6e05e] rounded border-b-4 border-[#d69e2e] active:translate-y-1 active:border-b-0 transition-all cursor-pointer shadow-md"></div>
               ))}
            </div>
          </div>

          {/* CENTER PANEL: Main Controls */}
          <div 
            className="w-[44%] h-[250px] bg-[#e6e2db] rounded-t-[40px] shadow-[0_-15px_30px_rgba(0,0,0,0.5)] border-t-8 border-[#c9c5be] p-4 flex flex-col items-center justify-end z-20"
            style={{ transform: 'perspective(1000px) rotateX(20deg)', transformOrigin: 'bottom center' }}
          >
             {/* Center Screen */}
             <div className="w-[80%] h-24 bg-[#319795] rounded-lg border-4 border-[#2c7a7b] mb-4 flex justify-between p-2 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]">
                {/* 3 panels inside center screen */}
                <div className="w-[30%] bg-[#e6fffa] rounded border-2 border-[#81e6d9] flex flex-col items-center justify-center p-1">
                   <span className="text-[10px] text-[#2c7a7b] font-bold text-center leading-tight">CLASE:</span>
                   <span className="text-sm font-black text-[#234e52] text-center uppercase">{shipConfig.fuselage}</span>
                </div>
                <div className="w-[38%] bg-[#81e6d9] rounded border-2 border-[#4fd1c5] relative overflow-hidden flex items-center justify-center">
                   <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_50%,rgba(255,255,255,0.2)_50%)] bg-[length:20px_100%] animate-[slide_2s_linear_infinite]"></div>
                   <Wrench size={32} className="text-[#234e52] relative z-10 animate-pulse" />
                </div>
                <div className="w-[30%] bg-[#e6fffa] rounded border-2 border-[#81e6d9] flex flex-col items-center justify-center p-1">
                   <span className="text-[10px] text-[#2c7a7b] font-bold text-center leading-tight">SISTEMA:</span>
                   <span className="text-sm font-black text-[#234e52] text-center uppercase">ÓPTIMO</span>
                </div>
             </div>

             {/* Main Category Buttons */}
             <div className="flex w-full justify-between px-4 gap-2">
               {categories.map(cat => (
                 <button 
                   key={cat.id}
                   onClick={() => setActiveCategory(cat.id)}
                   className={`flex-1 h-14 rounded-lg flex flex-col items-center justify-center gap-1 font-bold text-[10px] tracking-wider transition-all shadow-[0_4px_10px_rgba(0,0,0,0.2)] border-b-4
                     ${activeCategory === cat.id 
                       ? 'bg-[#f6e05e] border-[#d69e2e] text-[#744210] translate-y-1 border-b-0 shadow-inner' 
                       : 'bg-[#ecc94b] border-[#b7791f] text-[#744210] hover:bg-[#f6e05e] active:translate-y-1 active:border-b-0'
                     }`}
                 >
                   {cat.icon}
                   {cat.label}
                 </button>
               ))}
             </div>
             
             {/* Small status lights */}
             <div className="flex gap-4 mt-3">
               <div className="w-4 h-4 rounded-full bg-[#48bb78] border-2 border-[#2f855a] shadow-[0_0_10px_#48bb78]"></div>
               <div className="w-4 h-4 rounded-full bg-[#48bb78] border-2 border-[#2f855a] shadow-[0_0_10px_#48bb78]"></div>
               <div className="w-4 h-4 rounded-full bg-[#ecc94b] border-2 border-[#b7791f]"></div>
             </div>
          </div>

          {/* RIGHT PANEL: Options Screen */}
          <div 
            className="w-[28%] h-[400px] bg-[#e6e2db] rounded-tl-[80px] shadow-[-10px_-10px_30px_rgba(0,0,0,0.6)] border-t-8 border-l-8 border-[#c9c5be] p-6 flex flex-col justify-end"
            style={{ transform: 'perspective(1000px) rotateY(-15deg)', transformOrigin: 'right bottom' }}
          >
            {/* Screen border */}
            <div className="w-full h-[70%] bg-[#2c7a7b] rounded-xl p-3 border-[6px] border-[#319795] shadow-[inset_0_0_20px_rgba(0,0,0,0.5),_0_10px_20px_rgba(0,0,0,0.3)] mb-4">
              {/* Actual Screen */}
              <div className="w-full h-full bg-[#e6fffa] rounded-lg border-[4px] border-[#81e6d9] p-4 overflow-y-auto relative custom-scrollbar">
                 <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] pointer-events-none z-20"></div>
                 
                 <h2 className="text-[#234e52] text-xl font-black uppercase tracking-widest text-center border-b-2 border-[#81e6d9] pb-2 mb-4 relative z-30">
                   {categories.find(c => c.id === activeCategory)?.label || 'OPCIONES'}
                 </h2>

                 <div className="relative z-30 flex flex-col gap-3">
                   <AnimatePresence mode="popLayout">
                     {activeCategory === 'colors' ? (
                       <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="space-y-4">
                         <CockpitColorPicker label="PRINCIPAL" colors={palettePrimary} selected={shipConfig.colors.primary} onSelect={c => setColor('primary', c)} />
                         <CockpitColorPicker label="SECUNDARIO" colors={paletteSecondary} selected={shipConfig.colors.secondary} onSelect={c => setColor('secondary', c)} />
                       </motion.div>
                     ) : (
                       partOptions[activeCategory]?.map((opt, i) => (
                         <motion.button
                           initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                           key={opt.id}
                           onClick={() => setPart(activeCategory, opt.id)}
                           className={`w-full p-3 rounded-lg border-4 font-bold text-lg tracking-wide uppercase transition-all shadow-md text-left pl-4
                             ${shipConfig[activeCategory] === opt.id 
                               ? 'bg-[#319795] border-[#234e52] text-white shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] scale-[1.02]' 
                               : 'bg-[#b2f5ea] border-[#81e6d9] text-[#2c7a7b] hover:bg-[#81e6d9] active:scale-95'
                             }`}
                         >
                           {opt.label}
                         </motion.button>
                       ))
                     )}
                   </AnimatePresence>
                 </div>
              </div>
            </div>
            
            {/* Physical Dials/Buttons */}
            <div className="flex justify-between px-4 pb-2">
               <div className="w-12 h-12 rounded-full bg-[#e53e3e] border-b-4 border-[#c53030] shadow-md active:translate-y-1 active:border-b-0 cursor-pointer flex items-center justify-center text-white font-black">X</div>
               <div className="grid grid-cols-2 gap-2">
                 <div className="w-6 h-6 rounded-full bg-[#edf2f7] border-b-2 border-[#cbd5e0]"></div>
                 <div className="w-6 h-6 rounded-full bg-[#edf2f7] border-b-2 border-[#cbd5e0]"></div>
                 <div className="w-6 h-6 rounded-full bg-[#edf2f7] border-b-2 border-[#cbd5e0]"></div>
                 <div className="w-6 h-6 rounded-full bg-[#edf2f7] border-b-2 border-[#cbd5e0]"></div>
               </div>
            </div>
          </div>

        </div>
      </div>
      
      <style>{`
        @keyframes slide { from { background-position: 0 0; } to { background-position: 20px 0; } }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #319795; border-radius: 10px; }
      `}</style>
    </div>
  );
}

function CockpitStat({ label, value, color }) {
  return (
    <div>
      <div className="flex justify-between text-[#2c7a7b] font-bold text-xs mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full h-4 bg-[#b2f5ea] rounded-full border-2 border-[#81e6d9] overflow-hidden p-[2px]">
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: `${value}%` }} 
          transition={{ duration: 0.5 }}
          className={`h-full rounded-full ${color} shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)]`} 
        />
      </div>
    </div>
  );
}

function CockpitColorPicker({ label, colors, selected, onSelect }) {
  return (
    <div className="mb-2">
      <div className="text-[#2c7a7b] font-bold text-xs mb-2">{label}</div>
      <div className="grid grid-cols-5 gap-2">
        {colors.slice(0, 5).map(c => (
          <button 
            key={c}
            onClick={() => onSelect(c)}
            style={{ backgroundColor: c }}
            className={`h-8 rounded shadow-md border-2 transition-transform ${selected === c ? 'border-[#1a202c] scale-110' : 'border-transparent hover:scale-105'}`}
          />
        ))}
        {colors.slice(5).map(c => (
          <button 
            key={c}
            onClick={() => onSelect(c)}
            style={{ backgroundColor: c }}
            className={`h-8 rounded shadow-md border-2 transition-transform ${selected === c ? 'border-[#1a202c] scale-110' : 'border-transparent hover:scale-105'}`}
          />
        ))}
      </div>
    </div>
  );
}
