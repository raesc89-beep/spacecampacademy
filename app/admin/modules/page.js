'use client';
import { useState, useRef, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { COURSE_DATA } from '@/lib/courseData';
import {
  BookOpen, Plus, Save, RefreshCw, Eye, Trash2, Edit2,
  ChevronUp, ChevronDown, X, Check, Video, Image as ImageIcon,
  UploadCloud, AlertCircle, Package, Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// All available modules grouped by course
const ALL_MODULES = COURSE_DATA.map(m => ({ id: m.id, title: m.titleEs, color: m.color }));

const emptySection = () => ({
  id: `sec_${Date.now()}`,
  order: 0,
  title: '',
  text: '',
  image: '',
  imgCaption: '',
  video: '',
});

export default function EditorModulos() {
  const [selectedModuleId, setSelectedModuleId] = useState('');
  const [sections, setSections] = useState([]);
  const [moduleColor, setModuleColor] = useState('#00e4ff');
  const [loadingModule, setLoadingModule] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ msg: '', type: '' }); // type: 'success' | 'error' | 'info'
  const [editingIdx, setEditingIdx] = useState(null); // index of section being edited
  const [editDraft, setEditDraft] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const showStatus = (msg, type = 'info') => {
    setStatus({ msg, type });
    setTimeout(() => setStatus({ msg: '', type: '' }), 4000);
  };

  // ── LOAD MODULE ──────────────────────────────────────────────
  const loadModule = async () => {
    if (!selectedModuleId) return;
    setLoadingModule(true);
    setIsLoaded(false);
    setSections([]);
    setEditingIdx(null);

    try {
      // Try Firestore first
      const snap = await getDoc(doc(db, 'course_modules', selectedModuleId));
      if (snap.exists()) {
        const data = snap.data();
        const sorted = [...(data.sections || [])].sort((a, b) => a.order - b.order);
        setSections(sorted);
        setModuleColor(data.color || '#00e4ff');
        showStatus(`✅ Módulo cargado desde el CMS (${sorted.length} secciones).`, 'success');
      } else {
        // Fallback: seed from static
        const staticMod = COURSE_DATA.find(m => m.id === selectedModuleId);
        if (staticMod) {
          const staticSections = (staticMod.contentEs?.sections || []).map((s, i) => ({
            id: `sec_${i}`,
            order: i,
            title: s.title || '',
            text: s.text || '',
            image: s.image || '',
            imgCaption: s.imgCaption || '',
            video: s.video || '',
          }));
          setSections(staticSections);
          setModuleColor(staticMod.color || '#00e4ff');
          showStatus(`📋 Cargado desde archivo estático. Guarda para activar el CMS.`, 'info');
        }
      }
      setIsLoaded(true);
    } catch (err) {
      showStatus(`❌ Error al cargar: ${err.message}`, 'error');
    }
    setLoadingModule(false);
  };

  // ── SAVE to FIRESTORE ────────────────────────────────────────
  const saveModule = async () => {
    if (!selectedModuleId || sections.length === 0) return;
    setSaving(true);
    try {
      const orderedSections = sections.map((s, i) => ({ ...s, order: i }));
      await setDoc(doc(db, 'course_modules', selectedModuleId), {
        moduleId: selectedModuleId,
        color: moduleColor,
        sections: orderedSections,
        updatedAt: serverTimestamp(),
      });
      showStatus('✅ Módulo guardado exitosamente en el CMS. Los cambios son visibles inmediatamente.', 'success');
    } catch (err) {
      showStatus(`❌ Error al guardar: ${err.message}`, 'error');
    }
    setSaving(false);
  };

  // ── RESTORE STATIC ───────────────────────────────────────────
  const restoreStatic = async () => {
    if (!selectedModuleId) return;
    if (!confirm('¿Restaurar la versión estática original? Se perderán los cambios del CMS.')) return;
    try {
      const { deleteDoc } = await import('firebase/firestore');
      await deleteDoc(doc(db, 'course_modules', selectedModuleId));
      showStatus('🔄 Versión estática restaurada. El CMS ya no sobreescribe este módulo.', 'info');
      await loadModule();
    } catch (err) {
      showStatus(`❌ Error: ${err.message}`, 'error');
    }
  };

  // ── SECTION CRUD ─────────────────────────────────────────────
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
    // If it was a new empty section with no title, remove it
    if (!sections[editingIdx]?.title && !editDraft?.title) {
      setSections(prev => prev.filter((_, i) => i !== editingIdx));
    }
    setEditingIdx(null);
    setEditDraft(null);
  };

  // ── STYLES ───────────────────────────────────────────────────
  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem',
    background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)',
    color: 'white', borderRadius: '8px', fontSize: '0.95rem',
    boxSizing: 'border-box',
  };
  const labelStyle = { display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase' };
  const btnBase = { padding: '0.6rem 1.1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '600', fontSize: '0.85rem' };
  const statusColors = { success: 'rgba(0,255,136,0.15)', error: 'rgba(255,50,50,0.15)', info: 'rgba(0,228,255,0.1)' };
  const statusBorders = { success: 'var(--success)', error: '#ff3232', info: 'var(--electric-blue)' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* ── HEADER ── */}
      <header style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: 'var(--electric-blue)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <Layers size={32} /> Editor de Módulos
        </h1>
        <p style={{ color: 'var(--text-muted)', margin: 0 }}>
          Edita el contenido de cualquier misión — texto, imágenes y videos — sin tocar código. Los cambios son visibles de inmediato para todos los estudiantes.
        </p>
      </header>

      {/* ── MODULE SELECTOR ── */}
      <section className="glass-card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <label style={{ ...labelStyle, flex: 1, minWidth: '250px' }}>
          Seleccionar Módulo
          <select
            value={selectedModuleId}
            onChange={e => { setSelectedModuleId(e.target.value); setIsLoaded(false); setSections([]); }}
            style={{ ...inputStyle, cursor: 'pointer' }}
          >
            <option value="">— Elige un módulo —</option>
            {ALL_MODULES.map(m => (
              <option key={m.id} value={m.id}>{m.title} ({m.id})</option>
            ))}
          </select>
        </label>

        <button
          onClick={loadModule}
          disabled={!selectedModuleId || loadingModule}
          style={{ ...btnBase, background: 'var(--electric-blue)', color: 'black', padding: '0.75rem 1.5rem' }}
        >
          {loadingModule ? <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <BookOpen size={16} />}
          {loadingModule ? 'Cargando...' : 'Cargar Contenido'}
        </button>

        {isLoaded && (
          <a href={`/course/${selectedModuleId}`} target="_blank" rel="noreferrer"
            style={{ ...btnBase, background: 'rgba(255,255,255,0.1)', color: 'white', textDecoration: 'none' }}>
            <Eye size={16} /> Vista Previa
          </a>
        )}
      </section>

      {/* ── STATUS BAR ── */}
      <AnimatePresence>
        {status.msg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ padding: '1rem 1.2rem', borderRadius: '10px', background: statusColors[status.type], border: `1px solid ${statusBorders[status.type]}`, color: 'white', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
          >
            <AlertCircle size={16} /> {status.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SECTION EDITOR ── */}
      {isLoaded && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Package size={20} color={moduleColor} /> Secciones del Módulo
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>({sections.length} secciones)</span>
            </h2>
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              <button onClick={addSection} style={{ ...btnBase, background: 'rgba(0,255,136,0.15)', color: 'var(--success)', border: '1px solid var(--success)' }}>
                <Plus size={16} /> Añadir Sección
              </button>
              <button onClick={saveModule} disabled={saving} style={{ ...btnBase, background: moduleColor, color: 'black', padding: '0.6rem 1.4rem' }}>
                {saving ? <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={16} />}
                {saving ? 'Guardando...' : 'Guardar Módulo'}
              </button>
              <button onClick={restoreStatic} style={{ ...btnBase, background: 'rgba(255,100,100,0.1)', color: '#ff8888', border: '1px solid rgba(255,100,100,0.3)' }}>
                <RefreshCw size={14} /> Restaurar Original
              </button>
            </div>
          </div>

          {/* Section List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {sections.map((sec, idx) => (
              <motion.div
                key={sec.id || idx}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ borderRadius: '12px', border: `1px solid ${editingIdx === idx ? moduleColor : 'rgba(255,255,255,0.1)'}`, overflow: 'hidden', background: 'rgba(0,0,0,0.3)' }}
              >
                {/* Section Header (always visible) */}
                <div style={{ padding: '1rem 1.2rem', display: 'flex', alignItems: 'center', gap: '1rem', background: editingIdx === idx ? `${moduleColor}10` : 'transparent' }}>
                  <span style={{ minWidth: '28px', height: '28px', borderRadius: '50%', background: moduleColor, color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold', flexShrink: 0 }}>
                    {idx + 1}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: '600', color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {sec.title || <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Sin título</span>}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px', display: 'flex', gap: '0.8rem' }}>
                      {sec.image && <span>🖼 Imagen</span>}
                      {sec.video && <span>🎬 Video</span>}
                      {sec.text && <span>📝 {sec.text.substring(0, 50)}...</span>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.3rem', flexShrink: 0 }}>
                    <button onClick={() => moveSection(idx, -1)} disabled={idx === 0} style={{ ...btnBase, padding: '0.3rem 0.5rem', background: 'rgba(255,255,255,0.05)', color: idx === 0 ? 'rgba(255,255,255,0.2)' : 'white' }}>
                      <ChevronUp size={14} />
                    </button>
                    <button onClick={() => moveSection(idx, 1)} disabled={idx === sections.length - 1} style={{ ...btnBase, padding: '0.3rem 0.5rem', background: 'rgba(255,255,255,0.05)', color: idx === sections.length - 1 ? 'rgba(255,255,255,0.2)' : 'white' }}>
                      <ChevronDown size={14} />
                    </button>
                    {editingIdx !== idx ? (
                      <button onClick={() => startEdit(idx)} style={{ ...btnBase, padding: '0.3rem 0.8rem', background: 'rgba(0,228,255,0.1)', color: 'var(--electric-blue)' }}>
                        <Edit2 size={14} /> Editar
                      </button>
                    ) : (
                      <>
                        <button onClick={saveEdit} style={{ ...btnBase, padding: '0.3rem 0.8rem', background: 'rgba(0,255,136,0.15)', color: 'var(--success)' }}>
                          <Check size={14} /> Listo
                        </button>
                        <button onClick={cancelEdit} style={{ ...btnBase, padding: '0.3rem 0.6rem', background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>
                          <X size={14} />
                        </button>
                      </>
                    )}
                    <button onClick={() => deleteSection(idx)} style={{ ...btnBase, padding: '0.3rem 0.5rem', background: 'rgba(255,80,80,0.1)', color: '#ff8888' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Section Edit Form (expanded when editing) */}
                <AnimatePresence>
                  {editingIdx === idx && editDraft && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ padding: '1.5rem', borderTop: `1px solid ${moduleColor}30`, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

                        {/* Title */}
                        <label style={labelStyle}>
                          Título de la sección
                          <input type="text" value={editDraft.title} onChange={e => setEditDraft({ ...editDraft, title: e.target.value })}
                            placeholder="Ej: El Gran Descubrimiento..." style={inputStyle} />
                        </label>

                        {/* Text */}
                        <label style={labelStyle}>
                          Contenido / Párrafo de texto
                          <textarea rows={5} value={editDraft.text} onChange={e => setEditDraft({ ...editDraft, text: e.target.value })}
                            placeholder="Escribe aquí el contenido educativo de esta sección..." style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.6' }} />
                        </label>

                        {/* Image */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                          <label style={labelStyle}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><ImageIcon size={14} /> URL de Imagen</span>
                            <input type="text" value={editDraft.image} onChange={e => setEditDraft({ ...editDraft, image: e.target.value })}
                              placeholder="/assets/animales/felicette_1.jpg" style={inputStyle} />
                            {editDraft.image && (
                              <div style={{ marginTop: '0.5rem', borderRadius: '8px', overflow: 'hidden', height: '100px', background: '#000' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={editDraft.image} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.opacity = '0.2'} />
                              </div>
                            )}
                          </label>

                          <label style={labelStyle}>
                            Caption de imagen
                            <textarea rows={3} value={editDraft.imgCaption} onChange={e => setEditDraft({ ...editDraft, imgCaption: e.target.value })}
                              placeholder="Descripción breve de la imagen..." style={{ ...inputStyle, resize: 'vertical' }} />
                          </label>
                        </div>

                        {/* Video */}
                        <label style={labelStyle}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Video size={14} /> URL de Video (opcional)</span>
                          <input type="text" value={editDraft.video} onChange={e => setEditDraft({ ...editDraft, video: e.target.value })}
                            placeholder="/assets/animales/Gatos.mp4 o https://..." style={inputStyle} />
                          <span style={{ fontSize: '0.75rem', fontWeight: 'normal', color: 'rgba(255,255,255,0.35)', textTransform: 'none', letterSpacing: 0 }}>
                            Si hay video, se muestra en lugar de la imagen. Puedes dejar en blanco para solo usar imagen.
                          </span>
                        </label>

                        {/* Image path helper */}
                        <div style={{ padding: '0.8rem', background: 'rgba(0,228,255,0.05)', borderRadius: '8px', border: '1px solid rgba(0,228,255,0.1)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)' }}>
                          <strong style={{ color: 'rgba(0,228,255,0.7)' }}>💡 Rutas de imágenes del proyecto:</strong><br />
                          <code>/assets/animales/</code> · <code>/assets/asteroides/</code> · <code>/assets/cometas/</code> · <code>/assets/</code>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {sections.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '12px' }}>
                No hay secciones. Haz clic en <strong>"Añadir Sección"</strong> para comenzar.
              </div>
            )}
          </div>

          {/* Bottom Save Button */}
          {sections.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <button onClick={saveModule} disabled={saving} style={{ ...btnBase, background: moduleColor, color: 'black', padding: '0.8rem 2rem', fontSize: '1rem' }}>
                {saving ? <RefreshCw size={18} /> : <Save size={18} />}
                {saving ? 'Guardando...' : '💾 Guardar Módulo Completo'}
              </button>
            </div>
          )}
        </section>
      )}

      {/* ── HELP PANEL ── */}
      {!isLoaded && (
        <section className="glass-card" style={{ border: '1px solid rgba(0,228,255,0.1)' }}>
          <h3 style={{ color: 'var(--electric-blue)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}>
            <BookOpen size={18} /> ¿Cómo funciona este editor?
          </h3>
          <ol style={{ color: 'var(--text-muted)', lineHeight: '2', paddingLeft: '1.2rem' }}>
            <li>Selecciona el módulo que deseas editar en el menú de arriba.</li>
            <li>Haz clic en <strong style={{ color: 'white' }}>"Cargar Contenido"</strong> — verás todas las secciones actuales.</li>
            <li>Para editar: clic en <strong style={{ color: 'white' }}>✏️ Editar</strong> en la sección → modifica texto, imagen o video → clic en <strong style={{ color: 'white' }}>✓ Listo</strong>.</li>
            <li>Para añadir nueva sección: clic en <strong style={{ color: 'white' }}>"+ Añadir Sección"</strong>.</li>
            <li>Para reordenar: usa los botones <strong style={{ color: 'white' }}>↑ ↓</strong> en cada sección.</li>
            <li>Cuando termines, clic en <strong style={{ color: 'white' }}>"💾 Guardar Módulo"</strong> — los estudiantes verán los cambios de inmediato.</li>
            <li>Si quieres volver al contenido original: <strong style={{ color: 'white' }}>"Restaurar Original"</strong>.</li>
          </ol>
          <div style={{ marginTop: '1rem', padding: '0.8rem 1rem', background: 'rgba(255,215,0,0.05)', borderLeft: '3px solid var(--gold-star)', borderRadius: '4px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
            <strong style={{ color: 'var(--gold-star)' }}>Regla editorial:</strong> 1 párrafo de texto por 1 imagen. Cada módulo sigue el formato <em>visual → texto → visual → texto</em> para máximo impacto pedagógico.
          </div>
        </section>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
