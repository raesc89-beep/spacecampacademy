'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useShipStore } from '@/store/useShipStore';
import { Download, ChevronLeft, ChevronRight, Lock, Maximize } from 'lucide-react';

const SpaceshipScene = dynamic(() => import('@/components/shipyard/SpaceshipScene'), { ssr: false });

export default function Hangar() {
  const { shipConfig, stats, setPart, setColor } = useShipStore();
  const [activeMenu, setActiveMenu] = useState('colors'); // 'colors', 'parts'
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleExport = () => {
    // Lógica de exportación omitida por brevedad
  };

  const palettePrimary = ['#1a1a1a', '#e63946', '#f4a261', '#2a9d8f', '#264653', '#8338ec', '#ff006e', '#ffbe0b', '#ffffff'];
  const paletteSecondary = ['#2b2d42', '#8d99ae', '#edf2f4', '#ef233c', '#d90429', '#3a86ff', '#8ac926', '#1982c4', '#6a4c93'];
  const paletteDetail = ['#ffba08', '#faa307', '#f48c06', '#e85d04', '#dc2f02', '#d00000', '#9d0208', '#6a040f', '#03071e'];

  return (
    <div className="w-screen h-screen bg-black overflow-hidden font-sans selection:bg-cyan-500/30 relative">
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* FULLSCREEN 3D CANVAS */}
      <div className="absolute inset-0 z-0">
        <SpaceshipScene />
      </div>

      {/* NO MAN'S SKY STYLE UI OVERLAY */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between pt-24 pb-8 px-8">
        
        {/* TOP ROW: Title & Stats */}
        <div className="flex justify-between items-start pointer-events-auto">
          {/* Top Left: Title */}
          <div className="bg-black/40 backdrop-blur-md border border-white/10 px-6 py-3 rounded-tr-3xl rounded-bl-3xl">
            <h1 className="text-2xl font-black text-white tracking-widest uppercase">Personalizador PBR</h1>
            <p className="text-cyan-400 text-xs font-mono uppercase tracking-widest mt-1">Simulador de Vuelo v4.0</p>
          </div>

          {/* Top Right: Stats Panel */}
          <div className="w-80 bg-black/60 backdrop-blur-xl border border-white/20 p-6 rounded-tl-3xl rounded-br-3xl shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-1">Caza Estelar S-1</h2>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-yellow-500 text-black text-xs font-black px-2 py-1 rounded">CLASE S</span>
              <span className="text-slate-400 text-xs uppercase tracking-wider">Nave de Combate</span>
            </div>

            <div className="space-y-3">
              <StatRow label="Potencial de daño" value={stats.damage} />
              <StatRow label="Resistencia escudo" value={stats.shield} />
              <StatRow label="Alcance hiperprop." value={stats.range} />
              <StatRow label="Maniobrabilidad" value={stats.maneuverability} />
            </div>

            <button className="mt-6 w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 uppercase tracking-widest text-sm transition-colors border border-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.3)]">
              Ensamblar Nave
            </button>
          </div>
        </div>

        {/* MIDDLE ROW: Floating Part Selectors (Simulated Curve) */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-12 pointer-events-auto">
          <PartNode title="Fuselaje" active={true} icon="🚀" onClick={() => setActiveMenu('parts')} />
          <PartNode title="Núcleo Reactor" active={false} icon="⚛️" onClick={() => setActiveMenu('parts')} />
          <PartNode title="Alas" active={false} icon="✈️" onClick={() => setActiveMenu('parts')} />
          <PartNode title="Impulsor" active={false} icon="🔥" onClick={() => setActiveMenu('parts')} />
        </div>

        {/* BOTTOM ROW: Color Palette & Bottom Bar */}
        <div className="flex justify-between items-end pointer-events-auto">
          
          {/* Bottom Left: Color Palette */}
          <div className="w-96 bg-black/50 backdrop-blur-md border border-white/10 p-4 rounded-tr-3xl">
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-4">Pintura y Materiales</h3>
            
            <div className="space-y-4">
              <ColorRow label="Color Primario" colors={palettePrimary} selected={shipConfig.colors.primary} onSelect={(c) => setColor('primary', c)} />
              <ColorRow label="Color Secundario" colors={paletteSecondary} selected={shipConfig.colors.secondary} onSelect={(c) => setColor('secondary', c)} />
              <ColorRow label="Detalle (Emisivo)" colors={paletteDetail} selected={shipConfig.colors.emissive} onSelect={(c) => setColor('emissive', c)} />
            </div>
          </div>

          {/* Bottom Right: Actions */}
          <div className="flex gap-4">
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full uppercase tracking-widest text-xs font-bold flex items-center gap-2 transition-all">
              <Maximize size={16} /> Pantalla Completa
            </button>
          </div>
        </div>

        {/* Bottom Center: Category Selector */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-8 pointer-events-auto">
          <button className="text-slate-500 hover:text-white uppercase tracking-widest text-xs font-bold transition-colors">Carguero</button>
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full">
            <ChevronLeft size={16} className="text-white cursor-pointer hover:text-cyan-400" onClick={() => setPart('fuselage', 'fighter')} />
            <span className="text-white uppercase tracking-widest text-sm font-bold">Caza</span>
            <ChevronRight size={16} className="text-white cursor-pointer hover:text-cyan-400" onClick={() => setPart('fuselage', 'explorer')} />
          </div>
          <button className="text-slate-500 hover:text-white uppercase tracking-widest text-xs font-bold transition-colors">Explorador</button>
        </div>

      </div>
    </div>
  );
}

// Subcomponents
function StatRow({ label, value }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-300">{label}</span>
        <span className="text-white font-mono">{value}</span>
      </div>
      <div className="h-1 w-full bg-slate-800">
        <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} className="h-full bg-white" />
      </div>
    </div>
  );
}

function PartNode({ title, active, icon, onClick }) {
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer group" onClick={onClick}>
      <span className="text-xs uppercase tracking-widest font-bold text-white/50 group-hover:text-white transition-colors">{title}</span>
      <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center text-2xl bg-black/40 backdrop-blur-md transition-all ${active ? 'border-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.4)]' : 'border-white/20 group-hover:border-white/50'}`}>
        {icon}
      </div>
    </div>
  );
}

function ColorRow({ label, colors, selected, onSelect }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">{label}</div>
      <div className="grid grid-cols-9 gap-1">
        {colors.map(c => (
          <button 
            key={c}
            onClick={() => onSelect(c)}
            style={{ backgroundColor: c }}
            className={`h-6 w-full transition-transform ${selected === c ? 'scale-110 border-2 border-white relative z-10 shadow-lg' : 'border border-white/10 hover:border-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}
