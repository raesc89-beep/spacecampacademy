'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useShipStore } from '@/store/useShipStore';
import { ChevronLeft, ChevronRight, Rocket, Shield, Zap, Target, Palette, Wrench, Settings, Cpu, Activity, Move } from 'lucide-react';

const SpaceshipScene = dynamic(() => import('@/components/shipyard/SpaceshipScene'), { ssr: false });

export default function NaveHangar() {
  const { shipConfig, stats, setPart, setColor } = useShipStore();
  
  // Menú activo: 'fuselage', 'wings', 'engines', 'weapon', 'colors'
  const [activeCategory, setActiveCategory] = useState('fuselage');

  const palettePrimary = ['#1a1a1a', '#e63946', '#f4a261', '#2a9d8f', '#264653', '#8338ec', '#ff006e', '#ffbe0b', '#ffffff'];
  const paletteSecondary = ['#2b2d42', '#8d99ae', '#edf2f4', '#ef233c', '#d90429', '#3a86ff', '#8ac926', '#1982c4', '#6a4c93'];
  const paletteDetail = ['#ffba08', '#faa307', '#f48c06', '#e85d04', '#dc2f02', '#d00000', '#9d0208', '#6a040f', '#03071e'];

  const shipClasses = ['fighter', 'cargo', 'explorer'];
  const shipClassLabels = { fighter: 'CAZA', cargo: 'CARGUERO', explorer: 'EXPLORADOR' };

  const handleNextClass = () => {
    const idx = shipClasses.indexOf(shipConfig.fuselage);
    setPart('fuselage', shipClasses[(idx + 1) % shipClasses.length]);
  };

  const handlePrevClass = () => {
    const idx = shipClasses.indexOf(shipConfig.fuselage);
    setPart('fuselage', shipClasses[(idx - 1 + shipClasses.length) % shipClasses.length]);
  };

  const partOptions = {
    fuselage: [
      { id: 'fighter', label: 'Caza', icon: <Rocket size={28} /> },
      { id: 'cargo', label: 'Carguero', icon: <Shield size={28} /> },
      { id: 'explorer', label: 'Explorador', icon: <Target size={28} /> }
    ],
    wings: [
      { id: 'delta', label: 'Delta V', icon: <Move size={28} /> },
      { id: 'xwing', label: 'X-Quad', icon: <Settings size={28} /> },
      { id: 'ring', label: 'Anillo', icon: <Activity size={28} /> }
    ],
    engines: [
      { id: 'ion', label: 'Iónico', icon: <Zap size={28} /> },
      { id: 'plasma', label: 'Plasma', icon: <Cpu size={28} /> }
    ],
    weapon: [
      { id: 'laser', label: 'Láser', icon: <Target size={28} /> },
      { id: 'missile', label: 'Misiles', icon: <Rocket size={28} /> },
      { id: 'none', label: 'Pacífica', icon: <Shield size={28} /> }
    ]
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#010204] font-sans selection:bg-cyan-500/30">
      
      {/* Navbar overlay */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <SpaceshipScene />
      </div>

      {/* UI OVERLAY - HUD Futurista */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col pt-24 pb-8 px-10">
        
        {/* TOP ROW: Floating Categories */}
        <div className="flex justify-center gap-8 mt-4 pointer-events-auto">
          <CategoryIcon id="fuselage" label="CHASIS" icon={<Wrench size={24} />} active={activeCategory === 'fuselage'} onClick={setActiveCategory} />
          <CategoryIcon id="wings" label="ALERONES" icon={<Move size={24} />} active={activeCategory === 'wings'} onClick={setActiveCategory} />
          <CategoryIcon id="engines" label="PROPULSIÓN" icon={<Zap size={24} />} active={activeCategory === 'engines'} onClick={setActiveCategory} />
          <CategoryIcon id="weapon" label="ARMAMENTO" icon={<Target size={24} />} active={activeCategory === 'weapon'} onClick={setActiveCategory} />
          <CategoryIcon id="colors" label="ESTILIZADO" icon={<Palette size={24} />} active={activeCategory === 'colors'} onClick={setActiveCategory} />
        </div>

        {/* MIDDLE SECTION: Part Selection */}
        <div className="w-full flex justify-center mt-8 pointer-events-auto min-h-[100px]">
          <AnimatePresence mode="wait">
            {activeCategory !== 'colors' ? (
              <motion.div 
                key={activeCategory}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex gap-6"
              >
                {partOptions[activeCategory].map(opt => (
                  <div 
                    key={opt.id}
                    onClick={() => setPart(activeCategory, opt.id)}
                    className={`w-36 h-28 rounded-xl border cursor-pointer transition-all flex flex-col items-center justify-center backdrop-blur-xl group ${
                      shipConfig[activeCategory] === opt.id 
                        ? 'bg-cyan-900/40 border-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.3)] text-cyan-400' 
                        : 'bg-[#0a0f1a]/60 border-white/10 hover:border-white/40 hover:bg-[#0a0f1a]/80 text-white/60 hover:text-white'
                    }`}
                  >
                    <div className="mb-2 transition-transform group-hover:scale-110">{opt.icon}</div>
                    <span className="text-[11px] uppercase font-bold tracking-[0.2em]">{opt.label}</span>
                  </div>
                ))}
              </motion.div>
            ) : (
               <div /> 
            )}
          </AnimatePresence>
        </div>

        {/* MAIN BODY: Palettes and Stats */}
        <div className="flex-1 flex justify-between items-end pointer-events-auto pb-6">
          
          {/* BOTTOM LEFT: Color Palette */}
          <div className={`w-[450px] transition-all duration-500 ease-in-out ${activeCategory === 'colors' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none'}`}>
            <div className="flex items-center gap-3 mb-4">
              <Palette size={20} className="text-cyan-400" />
              <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em]">Pintura y Recubrimiento</h3>
            </div>
            <div className="bg-[#050a14]/80 backdrop-blur-xl border border-cyan-900/50 p-6 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
              <ColorRow label="Color Primario" colors={palettePrimary} selected={shipConfig.colors.primary} onSelect={(c) => setColor('primary', c)} />
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-900/50 to-transparent my-4" />
              <ColorRow label="Color Secundario" colors={paletteSecondary} selected={shipConfig.colors.secondary} onSelect={(c) => setColor('secondary', c)} />
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-900/50 to-transparent my-4" />
              <ColorRow label="Iluminación / Emisivo" colors={paletteDetail} selected={shipConfig.colors.emissive} onSelect={(c) => setColor('emissive', c)} />
            </div>
          </div>

          {/* BOTTOM CENTER: Ship Class Navigator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-auto">
             <div className="text-[10px] text-cyan-400/60 uppercase tracking-[0.3em]">Clase Estructural</div>
             <div className="flex items-center gap-8 bg-[#0a0f1a]/80 backdrop-blur-md px-6 py-3 rounded-full border border-cyan-900/50 shadow-[0_0_20px_rgba(0,255,255,0.1)]">
               <button onClick={handlePrevClass} className="text-cyan-400/50 hover:text-cyan-400 transition-colors p-1 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]"><ChevronLeft size={24} /></button>
               <div className="w-48 text-center">
                  <span className="text-white uppercase tracking-[0.4em] text-lg font-medium">{shipClassLabels[shipConfig.fuselage]}</span>
               </div>
               <button onClick={handleNextClass} className="text-cyan-400/50 hover:text-cyan-400 transition-colors p-1 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]"><ChevronRight size={24} /></button>
             </div>
          </div>

          {/* RIGHT SIDE: Ship Stats Panel */}
          <div className="w-[380px] bg-[#050a14]/80 backdrop-blur-xl border border-cyan-900/50 p-8 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] relative overflow-hidden group">
            {/* Holographic lines */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,255,0.02)_50%)] bg-[length:100%_4px] pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-1 uppercase tracking-wider drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Expediente Naval</h2>
              
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-cyan-900/30">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center border border-cyan-200/50 shadow-[0_0_20px_rgba(0,255,255,0.4)]">
                   <Activity size={24} className="text-black" />
                </div>
                <div>
                  <div className="text-[10px] text-cyan-400/70 uppercase tracking-[0.2em] mb-1">Clasificación</div>
                  <div className="text-white text-sm font-bold uppercase tracking-widest">{shipClassLabels[shipConfig.fuselage]} EXPERIMENTAL</div>
                </div>
              </div>

              <div className="space-y-6">
                <StatRow label="Potencial Ofensivo" value={stats.damage} max={100} color="from-red-500 to-orange-500" />
                <StatRow label="Integridad Escudos" value={stats.shield} max={100} color="from-cyan-400 to-blue-500" />
                <StatRow label="Alcance Hiperespacio" value={stats.range} max={100} color="from-purple-500 to-pink-500" />
                <StatRow label="Maniobrabilidad" value={stats.maneuverability} max={100} color="from-green-400 to-emerald-600" />
              </div>

              <button className="mt-10 w-full relative group/btn overflow-hidden rounded-lg">
                 <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-80 group-hover/btn:opacity-100 transition-opacity"></div>
                 <div className="relative border border-cyan-300/50 text-white font-bold py-4 uppercase tracking-[0.3em] text-sm flex justify-center items-center gap-3">
                   <Wrench size={18} />
                   <span>FINALIZAR ENSAMBLAJE</span>
                 </div>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// UI Subcomponents
function CategoryIcon({ id, label, icon, active, onClick }) {
  return (
    <div className="flex flex-col items-center gap-3 cursor-pointer group" onClick={() => onClick(id)}>
      <div className={`w-16 h-16 rounded-xl border flex items-center justify-center transition-all duration-300 ${active ? 'bg-cyan-900/50 border-cyan-400 shadow-[0_0_25px_rgba(0,255,255,0.4)] text-cyan-400 scale-110' : 'bg-[#0a0f1a]/60 backdrop-blur-md border-white/10 group-hover:border-white/40 text-white/50 group-hover:text-white'}`}>
        {icon}
      </div>
      <span className={`text-[11px] uppercase tracking-[0.2em] font-bold transition-colors ${active ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]' : 'text-white/40 group-hover:text-white/80'}`}>{label}</span>
    </div>
  );
}

function StatRow({ label, value, max, color }) {
  return (
    <div>
      <div className="flex justify-between text-[11px] mb-2 uppercase tracking-widest font-medium">
        <span className="text-white/60">{label}</span>
        <span className="text-cyan-400 font-mono drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">{value}</span>
      </div>
      <div className="h-2 w-full bg-[#0a0f1a] rounded-full overflow-hidden border border-white/5">
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: `${(value / max) * 100}%` }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${color} rounded-full`} 
        />
      </div>
    </div>
  );
}

function ColorRow({ label, colors, selected, onSelect }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-cyan-400/60 mb-3">{label}</div>
      <div className="flex gap-2">
        {colors.map(c => (
          <button 
            key={c}
            onClick={() => onSelect(c)}
            style={{ backgroundColor: c }}
            className={`h-8 flex-1 rounded-md relative transition-all duration-300 hover:z-10 hover:scale-125 hover:-translate-y-1 ${selected === c ? 'scale-110 shadow-[0_0_15px_rgba(255,255,255,0.4)] z-10' : 'shadow-inner'}`}
          >
             {selected === c && (
               <div className="absolute inset-0 border-2 border-white rounded-md z-20 pointer-events-none" />
             )}
          </button>
        ))}
      </div>
    </div>
  );
}
