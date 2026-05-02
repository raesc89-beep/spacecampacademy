'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useShipStore } from '@/store/useShipStore';
import { Settings, Shield, Crosshair, Navigation, Zap, Save, Download } from 'lucide-react';

// Import dynamic to avoid SSR issues with Three.js
const SpaceshipScene = dynamic(() => import('@/components/shipyard/SpaceshipScene'), { ssr: false, loading: () => <div className="w-full h-full flex items-center justify-center bg-slate-900 text-cyan-500 font-mono">Iniciando Holograma 3D...</div> });

export default function Hangar() {
  const { shipConfig, stats, setPart, setColor } = useShipStore();
  const [activeTab, setActiveTab] = useState('parts'); // 'parts', 'colors'

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(shipConfig));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "spaceship_build.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans selection:bg-cyan-500/30">
      <Navbar />
      
      <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 uppercase flex items-center gap-3">
              <Settings className="w-8 h-8 text-cyan-400" />
              Astillero Naval
            </h1>
            <p className="text-slate-400 mt-2 text-sm uppercase tracking-widest font-mono">Plataforma de Diseño Holográfico v3.0</p>
          </div>
          
          <button onClick={handleExport} className="flex items-center gap-2 bg-slate-800 hover:bg-cyan-900 text-cyan-400 border border-cyan-500/30 px-4 py-2 rounded-lg transition-colors font-mono text-sm uppercase">
            <Download className="w-4 h-4" />
            Exportar Build
          </button>
        </div>

        {/* Main Interface Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
          
          {/* LEFT PANEL: Customization Options */}
          <div className="lg:col-span-3 bg-slate-900/50 backdrop-blur-md rounded-xl border border-slate-700/50 p-5 flex flex-col gap-6 overflow-y-auto">
            <div className="flex border-b border-slate-700">
              <button onClick={() => setActiveTab('parts')} className={`flex-1 pb-2 uppercase tracking-widest text-xs font-bold transition-colors ${activeTab === 'parts' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}>Módulos</button>
              <button onClick={() => setActiveTab('colors')} className={`flex-1 pb-2 uppercase tracking-widest text-xs font-bold transition-colors ${activeTab === 'colors' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}>Pintura PBR</button>
            </div>

            {activeTab === 'parts' ? (
              <div className="space-y-6">
                <OptionSelector title="Fuselaje Principal" current={shipConfig.fuselage} options={[{id: 'fighter', label: 'Caza (Ágil)'}, {id: 'cargo', label: 'Carguero (Blindado)'}, {id: 'explorer', label: 'Explorador (Rango)'}]} onChange={(v) => setPart('fuselage', v)} />
                <OptionSelector title="Sistema de Alas" current={shipConfig.wings} options={[{id: 'delta', label: 'Delta V'}, {id: 'xwing', label: 'X-Quad'}, {id: 'ring', label: 'Anillo Magnético'}]} onChange={(v) => setPart('wings', v)} />
                <OptionSelector title="Propulsión" current={shipConfig.engines} options={[{id: 'ion', label: 'Propulsor Iónico (Doble)'}, {id: 'plasma', label: 'Motor de Plasma (Lineal)'}]} onChange={(v) => setPart('engines', v)} />
                <OptionSelector title="Módulos de Combate" current={shipConfig.weapon} options={[{id: 'laser', label: 'Láser de Iones'}, {id: 'missile', label: 'Batería de Misiles'}, {id: 'none', label: 'Desarmado (Paz)'}]} onChange={(v) => setPart('weapon', v)} />
              </div>
            ) : (
              <div className="space-y-8">
                <ColorPicker title="Color Primario (Chasis)" color={shipConfig.colors.primary} onChange={(c) => setColor('primary', c)} />
                <ColorPicker title="Color Secundario (Detalles)" color={shipConfig.colors.secondary} onChange={(c) => setColor('secondary', c)} />
                <ColorPicker title="Firma Energética (Emisivo)" color={shipConfig.colors.emissive} onChange={(c) => setColor('emissive', c)} />
              </div>
            )}
          </div>

          {/* CENTER PANEL: 3D Canvas */}
          <div className="lg:col-span-6 relative rounded-xl overflow-hidden group">
            <SpaceshipScene />
            
            {/* HUD Overlay */}
            <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none">
              <div className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 px-3 py-1 text-xs font-mono text-cyan-400 rounded">
                STS-2026 // RENDER ACTIVO
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 px-3 py-1 text-xs font-mono text-cyan-400 rounded flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                GRAVEDAD ZERO
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Stats HUD */}
          <div className="lg:col-span-3 bg-slate-900/50 backdrop-blur-md rounded-xl border border-slate-700/50 p-5 flex flex-col gap-6">
            <h2 className="text-lg font-bold uppercase tracking-widest border-b border-slate-700 pb-2 text-slate-300">Análisis Táctico</h2>
            
            <div className="space-y-6">
              <StatBar icon={<Crosshair size={18} />} label="Potencia de Fuego" value={stats.damage} color="bg-red-500" />
              <StatBar icon={<Shield size={18} />} label="Integridad de Escudo" value={stats.shield} color="bg-blue-500" />
              <StatBar icon={<Navigation size={18} />} label="Maniobrabilidad" value={stats.maneuverability} color="bg-green-500" />
              <StatBar icon={<Zap size={18} />} label="Alcance Hiperespacial" value={stats.range} color="bg-purple-500" />
            </div>

            <div className="mt-auto p-4 bg-cyan-950/30 border border-cyan-500/20 rounded-lg">
              <p className="text-xs font-mono text-cyan-400 uppercase leading-relaxed">
                Diagnóstico del sistema completado.<br/>
                La configuración actual es óptima para vuelo interestelar.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

// Subcomponents
function OptionSelector({ title, current, options, onChange }) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-3">{title}</h3>
      <div className="grid grid-cols-1 gap-2">
        {options.map(opt => (
          <button 
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`text-left px-4 py-2 text-sm font-mono uppercase rounded transition-all border ${current === opt.id ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,255,255,0.2)]' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'}`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ColorPicker({ title, color, onChange }) {
  const palette = ['#1E3A8A', '#9CA3AF', '#00FFFF', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#111111', '#FFFFFF'];
  
  return (
    <div>
      <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {palette.map(c => (
          <button 
            key={c}
            onClick={() => onChange(c)}
            style={{ backgroundColor: c }}
            className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${color === c ? 'border-white scale-110 shadow-lg' : 'border-transparent'}`}
          />
        ))}
      </div>
    </div>
  );
}

function StatBar({ icon, label, value, color }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="text-slate-500">{icon}</span>
          <span className="text-xs uppercase tracking-wider font-bold">{label}</span>
        </div>
        <span className="text-xs font-mono font-bold">{value}%</span>
      </div>
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`h-full ${color}`}
        />
      </div>
    </div>
  );
}
