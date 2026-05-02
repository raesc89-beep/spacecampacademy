'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useShipStore } from '@/store/useShipStore';
import { Download, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const SpaceshipScene = dynamic(() => import('@/components/shipyard/SpaceshipScene'), { ssr: false });

export default function Hangar() {
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
      { id: 'fighter', label: 'Caza', img: '🚀' },
      { id: 'cargo', label: 'Carguero', img: '🕋' },
      { id: 'explorer', label: 'Explorador', img: '🛸' }
    ],
    wings: [
      { id: 'delta', label: 'Delta V', img: '📐' },
      { id: 'xwing', label: 'X-Quad', img: '✖️' },
      { id: 'ring', label: 'Anillo', img: '⭕' }
    ],
    engines: [
      { id: 'ion', label: 'Iónico', img: '🔵' },
      { id: 'plasma', label: 'Plasma', img: '🔥' }
    ],
    weapon: [
      { id: 'laser', label: 'Láser', img: '⚡' },
      { id: 'missile', label: 'Misil', img: '🚀' },
      { id: 'none', label: 'Paz', img: '🕊️' }
    ]
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-black font-sans selection:bg-cyan-500/30">
      
      {/* Navbar overlay */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <SpaceshipScene />
      </div>

      {/* UI OVERLAY - No Man's Sky Style */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col pt-20 pb-6 px-8">
        
        {/* TOP ROW: Floating Categories */}
        <div className="flex justify-center gap-12 mt-4 pointer-events-auto">
          <CategoryIcon id="fuselage" label="FUSELAJE" icon="🚀" active={activeCategory === 'fuselage'} onClick={setActiveCategory} />
          <CategoryIcon id="wings" label="ALAS" icon="✈️" active={activeCategory === 'wings'} onClick={setActiveCategory} />
          <CategoryIcon id="engines" label="IMPULSOR" icon="🔥" active={activeCategory === 'engines'} onClick={setActiveCategory} />
          <CategoryIcon id="weapon" label="ARMAS" icon="⚔️" active={activeCategory === 'weapon'} onClick={setActiveCategory} />
          <CategoryIcon id="colors" label="PINTURA" icon="🎨" active={activeCategory === 'colors'} onClick={setActiveCategory} />
        </div>

        {/* MIDDLE SECTION: Part Selection or Colors (Shows below categories) */}
        <div className="w-full flex justify-center mt-6 pointer-events-auto h-24">
          <AnimatePresence mode="wait">
            {activeCategory !== 'colors' ? (
              <motion.div 
                key={activeCategory}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex gap-4"
              >
                {partOptions[activeCategory].map(opt => (
                  <div 
                    key={opt.id}
                    onClick={() => setPart(activeCategory, opt.id)}
                    className={`w-32 h-24 rounded-lg border-2 cursor-pointer transition-all flex flex-col items-center justify-center bg-black/50 backdrop-blur-md ${shipConfig[activeCategory] === opt.id ? 'border-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.4)]' : 'border-white/20 hover:border-white/50'}`}
                  >
                    <span className="text-3xl mb-1">{opt.img}</span>
                    <span className="text-[10px] text-white uppercase font-bold tracking-widest">{opt.label}</span>
                  </div>
                ))}
              </motion.div>
            ) : (
               <div /> // Espacio vacío para colores (se renderizan abajo a la izq)
            )}
          </AnimatePresence>
        </div>

        {/* MAIN BODY: Palettes and Stats */}
        <div className="flex-1 flex justify-between items-end pointer-events-auto pb-8">
          
          {/* BOTTOM LEFT: Color Palette */}
          <div className={`w-[450px] transition-opacity duration-300 ${activeCategory === 'colors' ? 'opacity-100' : 'opacity-30'}`}>
            <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-3">Estilo de Pintura</h3>
            <div className="bg-black/60 backdrop-blur-xl border border-white/20 p-4 rounded-xl shadow-2xl">
              <ColorRow label="Cor primária" colors={palettePrimary} selected={shipConfig.colors.primary} onSelect={(c) => setColor('primary', c)} />
              <div className="h-[1px] w-full bg-white/10 my-3" />
              <ColorRow label="Cor secundária" colors={paletteSecondary} selected={shipConfig.colors.secondary} onSelect={(c) => setColor('secondary', c)} />
              <div className="h-[1px] w-full bg-white/10 my-3" />
              <ColorRow label="Cor de detalhe" colors={paletteDetail} selected={shipConfig.colors.emissive} onSelect={(c) => setColor('emissive', c)} />
            </div>
          </div>

          {/* BOTTOM CENTER: Ship Class Navigator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8 pointer-events-auto">
             <button onClick={handlePrevClass} className="text-white/50 hover:text-white transition-colors p-2"><ChevronLeft size={24} /></button>
             <div className="w-48 text-center">
                <span className="text-white uppercase tracking-[0.3em] text-lg font-light">{shipClassLabels[shipConfig.fuselage]}</span>
             </div>
             <button onClick={handleNextClass} className="text-white/50 hover:text-white transition-colors p-2"><ChevronRight size={24} /></button>
          </div>

          {/* RIGHT SIDE: Ship Stats Panel */}
          <div className="w-[350px] bg-black/60 backdrop-blur-xl border border-white/20 p-6 rounded-xl shadow-2xl mb-12">
            <h2 className="text-2xl font-light text-white mb-1">Falcão de Itoyos</h2>
            
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-600 rounded flex items-center justify-center border border-yellow-200/50 shadow-[0_0_15px_rgba(255,165,0,0.5)]">
                 <span className="text-black font-black text-xl">S</span>
              </div>
              <div>
                <div className="text-[10px] text-white/50 uppercase tracking-widest">Configuración de fabricación</div>
                <div className="text-yellow-500 text-xs font-bold uppercase tracking-wider">Nave de combate</div>
              </div>
            </div>

            <div className="space-y-4">
              <StatRow label="Potencial de daño" value={stats.damage} max={100} />
              <StatRow label="Resistencia del escudo" value={stats.shield} max={100} />
              <StatRow label="Alcance del hiperprop." value={stats.range} max={100} />
              <StatRow label="Maniobrabilidad" value={stats.maneuverability} max={100} />
            </div>

            <button className="mt-8 w-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-light py-3 uppercase tracking-[0.2em] text-sm transition-all flex justify-center items-center gap-2">
               <span>MONTAR</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

// UI Subcomponents
function CategoryIcon({ id, label, icon, active, onClick }) {
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => onClick(id)}>
      <span className={`text-[10px] uppercase tracking-widest font-bold transition-colors ${active ? 'text-cyan-400' : 'text-white/50 group-hover:text-white'}`}>{label}</span>
      <div className={`w-14 h-14 rounded border-2 flex items-center justify-center text-2xl transition-all ${active ? 'bg-cyan-900/40 border-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.4)]' : 'bg-black/40 backdrop-blur-md border-white/20 group-hover:border-white/50'}`}>
        {icon}
      </div>
    </div>
  );
}

function StatRow({ label, value, max }) {
  return (
    <div>
      <div className="flex justify-between text-[11px] mb-1 uppercase tracking-wider">
        <span className="text-white/70">{label}</span>
        <span className="text-white font-mono">{value}</span>
      </div>
      <div className="h-[2px] w-full bg-white/10 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: `${(value / max) * 100}%` }} 
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full bg-white" 
        />
      </div>
    </div>
  );
}

function ColorRow({ label, colors, selected, onSelect }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-white/50 mb-1">{label}</div>
      <div className="grid grid-cols-9 gap-[2px]">
        {colors.map(c => (
          <button 
            key={c}
            onClick={() => onSelect(c)}
            style={{ backgroundColor: c }}
            className="h-8 w-full relative transition-all hover:z-10 hover:scale-110 flex items-center justify-center"
          >
             {selected === c && (
               <div className="absolute inset-0 border-[3px] border-white z-20 pointer-events-none" />
             )}
          </button>
        ))}
      </div>
    </div>
  );
}
