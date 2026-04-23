'use client';
import { useState, useEffect } from 'react';
import {
  BookOpen, Plus, Save, RefreshCw, Eye, Trash2, Edit2,
  ChevronUp, ChevronDown, X, Check, Video, Image as ImageIcon,
  AlertCircle, Package, Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const emptySection = () => ({
  title: '',
  text: '',
  image: '',
  imgCaption: '',
  video: '',
});

export default function EditorModulos() {
  const [modules, setModules] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState('');
  
  const [moduleData, setModuleData] = useState(null);
  const [sections, setSections] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ msg: '', type: '' });
  const [editingIdx, setEditingIdx] = useState(null); 
  const [editDraft, setEditDraft] = useState(null);

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

  useEffect(() => {
    loadData();
  }, []);

  const loadModule = () => {
    const mod = modules.find(m => m.id === selectedModuleId);
    if (mod) {
      setModuleData({ titleEs: mod.titleEs, badgeEs: mod.badgeEs, color: mod.color });
      setSections([...(mod.contentEs?.sections || [])]);
      showStatus('Módulo cargado', 'success');
    }
  };

  const handleCreateModule = async () => {
    const titleEs = prompt('Título del nuevo módulo:');
    if (!titleEs) return;
    const id = titleEs.toLowerCase().replace(/\s+/g, '-');
    setSaving(true);
    try {
      await fetch('/api/course-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add_module', payload: { id, titleEs, badgeEs: titleEs } })
      });
      showStatus('Módulo creado con éxito', 'success');
      await loadData();
      setSelectedModuleId(id);
    } catch (e) {
      showStatus('Error al crear módulo', 'error');
    }
    setSaving(false);
  };

  const handleDeleteModule = async () => {
    if (!confirm('¿Eliminar este módulo entero? ¡ESTA ACCIÓN NO SE PUEDE DESHACER!')) return;
    setSaving(true);
    try {
      await fetch('/api/course-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete_module', payload: { id: selectedModuleId } })
      });
      showStatus('Módulo eliminado', 'success');
      setSelectedModuleId('');
      setModuleData(null);
      await loadData();
    } catch (e) {
      showStatus('Error al eliminar', 'error');
    }
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
      await fetch('/api/course-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_sections', payload: { id: selectedModuleId, sections } })
      });
      showStatus('¡Todos los cambios guardados!', 'success');
      await loadData();
    } catch (e) {
      showStatus('Error al guardar', 'error');
    }
    setSaving(false);
  };

  // Section functions
  const addSection = () => {
    const newSec = emptySection();
    setSections(prev => [...prev, newSec]);
    setEditingIdx(sections.length);
    setEditDraft(newSec);
  };
  const deleteSection = (idx) => {
    if (!confirm('¿Eliminar esta sección?')) return;
    setSections(prev => prev.filter((_, i) => i !== idx));
    if (editingIdx === idx) { setEditingIdx(null); setEditDraft(null); }
  };
  const moveSection = (idx, dir) => {
    const newSections = [...sections];
    const target = idx + dir;
    if (target < 0 || target >= newSections.length) return;
    [newSections[idx], newSections[target]] = [newSections[target], newSections[idx]];
    setSections(newSections);
  };
  const startEdit = (idx) => {
    setEditingIdx(idx);
    setEditDraft({ ...sections[idx] });
  };
  const saveEdit = () => {
    setSections(prev => prev.map((s, i) => i === editingIdx ? { ...editDraft } : s));
    setEditingIdx(null);
    setEditDraft(null);
  };
  const cancelEdit = () => {
    if (!sections[editingIdx]?.title && !editDraft?.title) {
      setSections(prev => prev.filter((_, i) => i !== editingIdx));
    }
    setEditingIdx(null);
    setEditDraft(null);
  };

  const inputStyle = { width: '100%', padding: '0.75rem 1rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: '8px', fontSize: '0.95rem' };
  const labelStyle = { display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', fontWeight: '600', textTransform: 'uppercase' };
  const btnBase = { padding: '0.6rem 1.1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '600' };

  if (loading && modules.length === 0) return <div style={{color:'white'}}>Cargando editor maestro...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: 'var(--electric-blue)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <Layers size={32} /> Creador Universal de Módulos
        </h1>
        <p style={{ color: 'var(--text-muted)', margin: 0 }}>
          Rompe la regla del 15x15. Crea módulos nuevos, elimina existentes, y edita portadas y textos libremente.
        </p>
      </header>

      <section className="glass-card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <label style={{ ...labelStyle, flex: 1, minWidth: '250px' }}>
          Seleccionar Módulo a Editar
          <select value={selectedModuleId} onChange={e => { setSelectedModuleId(e.target.value); setModuleData(null); setSections([]); }} style={inputStyle}>
            <option value="">— Elige un módulo —</option>
            {modules.map(m => <option key={m.id} value={m.id}>{m.titleEs}</option>)}
          </select>
        </label>
        <button onClick={loadModule} disabled={!selectedModuleId} style={{ ...btnBase, background: 'var(--electric-blue)', color: 'black' }}>
          <BookOpen size={16} /> Cargar Datos
        </button>
        <button onClick={handleCreateModule} style={{ ...btnBase, background: 'rgba(0,255,136,0.15)', color: 'var(--success)', border: '1px solid var(--success)' }}>
          <Plus size={16} /> Crear Nuevo Módulo
        </button>
      </section>

      <AnimatePresence>
        {status.msg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ padding: '1rem', borderRadius: '8px', background: status.type === 'success' ? 'rgba(0,255,136,0.15)' : 'rgba(255,50,50,0.15)', color: 'white', border: '1px solid currentColor' }}>
            <AlertCircle size={16} style={{marginRight:'0.5rem'}}/> {status.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {moduleData && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Module Meta */}
          <div className="glass-card" style={{ border: `1px solid ${moduleData.color}50` }}>
            <h2 style={{marginTop:0, color: moduleData.color, display: 'flex', justifyContent: 'space-between'}}>
              Meta del Módulo
              <button onClick={handleDeleteModule} style={{...btnBase, background: 'rgba(255,50,50,0.1)', color: '#ff3232', fontSize: '0.8rem'}}>
                <Trash2 size={14}/> Eliminar Módulo Completo
              </button>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <label style={labelStyle}>Título del Módulo <input type="text" value={moduleData.titleEs} onChange={e => setModuleData({...moduleData, titleEs: e.target.value})} style={inputStyle} /></label>
              <label style={labelStyle}>Insignia (Descripción Breve) <input type="text" value={moduleData.badgeEs} onChange={e => setModuleData({...moduleData, badgeEs: e.target.value})} style={inputStyle} /></label>
              <label style={labelStyle}>Color Principal <input type="color" value={moduleData.color} onChange={e => setModuleData({...moduleData, color: e.target.value})} style={{...inputStyle, height: '50px', padding: 0}} /></label>
            </div>
          </div>

          {/* Sections */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ margin: 0, color: 'white' }}><Package size={20} /> Secciones ({sections.length})</h2>
              <button onClick={addSection} style={{ ...btnBase, background: 'rgba(0,255,136,0.15)', color: 'var(--success)', border: '1px solid var(--success)' }}>
                <Plus size={16} /> Añadir Sección Extra
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {sections.map((sec, idx) => (
                <div key={idx} style={{ borderRadius: '12px', border: `1px solid ${editingIdx === idx ? moduleData.color : 'rgba(255,255,255,0.1)'}`, overflow: 'hidden', background: 'rgba(0,0,0,0.3)' }}>
                  <div style={{ padding: '1rem 1.2rem', display: 'flex', alignItems: 'center', gap: '1rem', background: editingIdx === idx ? `${moduleData.color}10` : 'transparent' }}>
                    <span style={{ minWidth: '28px', height: '28px', borderRadius: '50%', background: moduleData.color, color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      {idx + 1}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', color: 'white' }}>{sec.title || 'Sin título'}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                      <button onClick={() => moveSection(idx, -1)} disabled={idx === 0} style={{ ...btnBase, padding: '0.3rem 0.5rem', background: 'rgba(255,255,255,0.05)', color: 'white' }}><ChevronUp size={14} /></button>
                      <button onClick={() => moveSection(idx, 1)} disabled={idx === sections.length - 1} style={{ ...btnBase, padding: '0.3rem 0.5rem', background: 'rgba(255,255,255,0.05)', color: 'white' }}><ChevronDown size={14} /></button>
                      {editingIdx !== idx ? (
                        <button onClick={() => startEdit(idx)} style={{ ...btnBase, padding: '0.3rem 0.8rem', background: 'rgba(0,228,255,0.1)', color: 'var(--electric-blue)' }}><Edit2 size={14} /> Editar</button>
                      ) : (
                        <>
                          <button onClick={saveEdit} style={{ ...btnBase, padding: '0.3rem 0.8rem', background: 'rgba(0,255,136,0.15)', color: 'var(--success)' }}><Check size={14} /> Listo</button>
                          <button onClick={cancelEdit} style={{ ...btnBase, padding: '0.3rem 0.6rem', background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}><X size={14} /></button>
                        </>
                      )}
                      <button onClick={() => deleteSection(idx)} style={{ ...btnBase, padding: '0.3rem 0.5rem', background: 'rgba(255,80,80,0.1)', color: '#ff8888' }}><Trash2 size={14} /></button>
                    </div>
                  </div>

                  {editingIdx === idx && editDraft && (
                    <div style={{ padding: '1.5rem', borderTop: `1px solid ${moduleData.color}30`, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                      <label style={labelStyle}>Título <input type="text" value={editDraft.title} onChange={e => setEditDraft({ ...editDraft, title: e.target.value })} style={inputStyle} /></label>
                      <label style={labelStyle}>Texto <textarea rows={5} value={editDraft.text} onChange={e => setEditDraft({ ...editDraft, text: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} /></label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <label style={labelStyle}><span style={{display:'flex', gap:'0.4rem'}}><ImageIcon size={14}/> URL Imagen</span><input type="text" value={editDraft.image} onChange={e => setEditDraft({ ...editDraft, image: e.target.value })} style={inputStyle} /></label>
                        <label style={labelStyle}><span style={{display:'flex', gap:'0.4rem'}}><Video size={14}/> URL Video</span><input type="text" value={editDraft.video || ''} onChange={e => setEditDraft({ ...editDraft, video: e.target.value })} style={inputStyle} /></label>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '2rem' }}>
              <button onClick={saveModuleChanges} disabled={saving} style={{ ...btnBase, background: moduleData.color, color: 'black', padding: '1rem 3rem', fontSize: '1.2rem' }}>
                {saving ? <RefreshCw size={18} className="spin" /> : <Save size={18} />}
                💾 GUARDAR CAMBIOS PERMANENTES
              </button>
            </div>
          </div>
        </section>
      )}
      <style>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
