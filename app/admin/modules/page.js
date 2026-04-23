'use client';
import { useState, useEffect } from 'react';
import {
  BookOpen, Plus, Save, RefreshCw, Trash2, Video, Image as ImageIcon,
  AlertCircle, GripVertical, Type, X, Layout
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';

const emptySection = () => ({
  id: `sec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  title: '',
  text: '',
  image: '',
  imgCaption: '',
  video: '',
});

export default function EditorMoodle() {
  const [modules, setModules] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState('');
  const [moduleData, setModuleData] = useState(null);
  const [sections, setSections] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ msg: '', type: '' });

  const showStatus = (msg, type = 'info') => {
    setStatus({ msg, type });
    setTimeout(() => setStatus({ msg: '', type: '' }), 4000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/course-data');
      const data = await res.json();
      setModules(data);
    } catch (err) {
      showStatus('Error cargando módulos', 'error');
    }
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const loadModule = () => {
    const mod = modules.find(m => m.id === selectedModuleId);
    if (mod) {
      setModuleData({ titleEs: mod.titleEs, badgeEs: mod.badgeEs, color: mod.color });
      // Ensure all sections have unique IDs for Reorder to work properly
      const loadedSections = (mod.contentEs?.sections || []).map(s => ({
        ...s,
        id: s.id || `sec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }));
      setSections(loadedSections);
      showStatus('Módulo cargado para edición', 'success');
    }
  };

  const handleCreateModule = async () => {
    const titleEs = prompt('Título del nuevo módulo (ej: Misión Júpiter):');
    if (!titleEs) return;
    const id = titleEs.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    setSaving(true);
    try {
      await fetch('/api/course-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add_module', payload: { id, titleEs, badgeEs: titleEs } })
      });
      showStatus('Módulo creado', 'success');
      await loadData();
      setSelectedModuleId(id);
    } catch (e) { showStatus('Error al crear', 'error'); }
    setSaving(false);
  };

  const saveModuleChanges = async () => {
    setSaving(true);
    try {
      await fetch('/api/course-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_module', payload: { id: selectedModuleId, ...moduleData } })
      });
      // Strip out internal id before saving if desired, but keeping them is fine and helps future edits
      await fetch('/api/course-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_sections', payload: { id: selectedModuleId, sections } })
      });
      showStatus('¡Curso guardado exitosamente!', 'success');
      await loadData();
    } catch (e) { showStatus('Error al guardar', 'error'); }
    setSaving(false);
  };

  const addSection = () => setSections([...sections, emptySection()]);
  
  const removeSection = (id) => {
    if(confirm('¿Eliminar este bloque?')) {
      setSections(sections.filter(s => s.id !== id));
    }
  };

  const updateSection = (id, field, value) => {
    setSections(sections.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  // UI Styles
  const inputTheme = { background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '6px', padding: '0.6rem 1rem', width: '100%' };
  const inlineInput = { background: 'transparent', border: 'none', borderBottom: '1px dashed rgba(255,255,255,0.3)', color: 'white', width: '100%', outline: 'none', transition: 'all 0.2s' };
  
  if (loading && modules.length === 0) return <div style={{color:'white', padding: '2rem'}}>Iniciando Creador de Cursos...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* HEADER */}
      <header style={{ background: 'rgba(0,0,0,0.4)', padding: '2rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <h1 style={{ margin: '0 0 1rem 0', color: 'var(--electric-blue)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <Layout size={32} /> Creador de Cursos (Drag & Drop)
        </h1>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select value={selectedModuleId} onChange={e => { setSelectedModuleId(e.target.value); setModuleData(null); }} style={inputTheme}>
            <option value="">— Selecciona un curso a editar —</option>
            {modules.map(m => <option key={m.id} value={m.id}>{m.titleEs}</option>)}
          </select>
          <button onClick={loadModule} disabled={!selectedModuleId} className="btn-primary" style={{ padding: '0 2rem', whiteSpace: 'nowrap' }}>
            <BookOpen size={16} /> Cargar Editor
          </button>
          <button onClick={handleCreateModule} className="btn-outline" style={{ whiteSpace: 'nowrap' }}>
            <Plus size={16} /> Nuevo
          </button>
        </div>
      </header>

      {/* STATUS */}
      <AnimatePresence>
        {status.msg && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ padding: '1rem', borderRadius: '8px', background: status.type === 'success' ? 'rgba(0,255,136,0.15)' : 'rgba(255,50,50,0.15)', color: 'white', border: '1px solid currentColor', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={16} /> {status.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* EDITOR CANVAS */}
      {moduleData && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          
          {/* Cover Settings */}
          <div style={{ background: `linear-gradient(to right, rgba(0,0,0,0.8), ${moduleData.color}20)`, padding: '2rem', borderRadius: '15px', borderLeft: `5px solid ${moduleData.color}`, marginBottom: '2rem' }}>
            <h3 style={{ marginTop: 0, color: 'white', opacity: 0.8 }}>Portada del Módulo</h3>
            <input type="text" value={moduleData.titleEs} onChange={e => setModuleData({...moduleData, titleEs: e.target.value})} 
              style={{ ...inlineInput, fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }} placeholder="Título Gigante" />
            
            <input type="text" value={moduleData.badgeEs} onChange={e => setModuleData({...moduleData, badgeEs: e.target.value})} 
              style={{ ...inlineInput, fontSize: '1.2rem', color: 'var(--text-muted)' }} placeholder="Subtítulo o descripción breve" />
              
            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
               <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Color del Módulo:</span>
               <input type="color" value={moduleData.color} onChange={e => setModuleData({...moduleData, color: e.target.value})} 
                 style={{ width: '40px', height: '40px', border: 'none', background: 'transparent', cursor: 'pointer' }} />
            </div>
          </div>

          {/* Drag & Drop Canvas */}
          <div style={{ position: 'relative' }}>
            
            <Reorder.Group axis="y" values={sections} onReorder={setSections} style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {sections.map((sec, index) => (
                <Reorder.Item key={sec.id} value={sec} style={{ position: 'relative' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', display: 'flex' }}>
                    
                    {/* Drag Handle */}
                    <div style={{ width: '40px', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'grab', color: 'rgba(255,255,255,0.3)' }} title="Arrastra para reordenar">
                      <GripVertical />
                    </div>

                    {/* Content Editor */}
                    <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                         <input type="text" value={sec.title} onChange={e => updateSection(sec.id, 'title', e.target.value)} 
                           placeholder="Título de la Sección" style={{ ...inlineInput, fontSize: '1.3rem', fontWeight: 'bold', color: moduleData.color, flex: 1 }} />
                         
                         <button onClick={() => removeSection(sec.id)} style={{ background: 'none', border: 'none', color: '#ff3232', cursor: 'pointer', opacity: 0.5 }}>
                           <Trash2 size={18} />
                         </button>
                      </div>

                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                         <div style={{ flex: 1 }}>
                           <textarea value={sec.text} onChange={e => updateSection(sec.id, 'text', e.target.value)}
                             placeholder="Escribe el texto pedagógico aquí..." 
                             style={{ ...inputTheme, minHeight: '120px', resize: 'vertical', lineHeight: '1.6', fontSize: '1rem' }} />
                         </div>

                         {/* Media Panel */}
                         <div style={{ width: '300px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                              <ImageIcon size={14}/> Media Visual
                            </div>
                            
                            <input type="text" value={sec.image} onChange={e => updateSection(sec.id, 'image', e.target.value)}
                              placeholder="/assets/imagen.png" style={{ ...inlineInput, fontSize: '0.85rem' }} />
                              
                            {sec.image && (
                              <div style={{ width: '100%', height: '120px', background: '#000', borderRadius: '6px', overflow: 'hidden' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={sec.image} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.opacity = 0.2}/>
                              </div>
                            )}

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', marginTop: '0.5rem' }}>
                              <Video size={14}/> Video (Opcional)
                            </div>
                            <input type="text" value={sec.video} onChange={e => updateSection(sec.id, 'video', e.target.value)}
                              placeholder="URL del video mp4" style={{ ...inlineInput, fontSize: '0.85rem' }} />
                         </div>
                      </div>

                    </div>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>

            {/* Add Block Button */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
               <button onClick={addSection} style={{ background: 'rgba(0,255,136,0.1)', border: '2px dashed rgba(0,255,136,0.4)', color: 'var(--success)', padding: '1rem 3rem', borderRadius: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.1rem', fontWeight: 'bold', transition: 'all 0.2s' }}>
                 <Plus /> Añadir Bloque de Contenido
               </button>
            </div>

          </div>

          {/* Sticky Save Bar */}
          <div style={{ position: 'sticky', bottom: '2rem', background: 'rgba(10, 15, 30, 0.9)', backdropFilter: 'blur(10px)', padding: '1rem 2rem', borderRadius: '20px', border: `1px solid ${moduleData.color}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: `0 10px 30px rgba(0,0,0,0.5), 0 0 20px ${moduleData.color}20` }}>
             <div style={{ color: 'white', fontWeight: 'bold' }}>
               {sections.length} Bloques configurados
             </div>
             <button onClick={saveModuleChanges} disabled={saving} style={{ background: moduleData.color, color: 'black', border: 'none', padding: '0.8rem 2rem', borderRadius: '10px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               {saving ? <RefreshCw className="spin" /> : <Save />} 
               PUBLICAR CURSO
             </button>
          </div>

        </motion.div>
      )}

      <style>{`
        .btn-primary { background: var(--electric-blue); color: black; border: none; border-radius: 8px; cursor: pointer; display: flex; alignItems: center; gap: 0.5rem; font-weight: bold; }
        .btn-outline { background: transparent; color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; cursor: pointer; padding: 0.6rem 1rem; display: flex; alignItems: center; gap: 0.5rem; font-weight: bold; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        *:focus { outline: none; }
      `}</style>
    </div>
  );
}
