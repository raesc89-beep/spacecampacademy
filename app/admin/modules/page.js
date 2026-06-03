'use client';
import { useState, useEffect, useRef } from 'react';
import {
  BookOpen, Plus, Save, RefreshCw, Trash2, Video, Image as ImageIcon,
  AlertCircle, GripVertical, Type, X, Layout, Eye, Edit3,
  Volume2, Tag, Copy, ChevronDown, EyeOff, FileText, Search
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';

// Block types
const BLOCK_TYPES = [
  { type: 'text', label: 'Texto', icon: '📝', color: '#00E4FF' },
  { type: 'image', label: 'Imagen', icon: '🖼️', color: '#00FF88' },
  { type: 'video', label: 'Video', icon: '🎬', color: '#FF64C8' },
  { type: 'audio', label: 'Audio', icon: '🔊', color: '#FFD700' },
  { type: 'label', label: 'Etiqueta', icon: '🏷️', color: '#8A2BE2' },
];

const emptyBlock = (type = 'text') => ({
  id: `blk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  type,
  title: '',
  text: '',
  image: '',
  imgCaption: '',
  video: '',
  audio: '',
  visible: true,
});

export default function EditorMoodle() {
  const [modules, setModules] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState('');
  const [moduleData, setModuleData] = useState(null);
  const [sections, setSections] = useState([]);
  const [editMode, setEditMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ msg: '', type: '' });
  const [uploadingId, setUploadingId] = useState(null);
  const [addBlockMenu, setAddBlockMenu] = useState(null); // index where menu is open
  const [searchTerm, setSearchTerm] = useState('');
  const [hasUnsaved, setHasUnsaved] = useState(false);

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
      setModuleData({
        titleEs: mod.titleEs,
        badgeEs: mod.badgeEs,
        color: mod.color,
        visible: mod.visible !== false,
      });
      const loadedSections = (mod.contentEs?.sections || []).map(s => ({
        ...s,
        id: s.id || `blk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: s.type || 'text',
        visible: s.visible !== false,
      }));
      setSections(loadedSections);
      setHasUnsaved(false);
      setEditMode(true);
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
      await fetch('/api/course-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_sections', payload: { id: selectedModuleId, sections } })
      });
      setHasUnsaved(false);
      showStatus('¡Curso publicado exitosamente!', 'success');
      await loadData();
    } catch (e) { showStatus('Error al guardar', 'error'); }
    setSaving(false);
  };

  // Block CRUD
  const addBlock = (type, afterIndex = -1) => {
    const newBlock = emptyBlock(type);
    if (afterIndex === -1) {
      setSections([...sections, newBlock]);
    } else {
      const newSections = [...sections];
      newSections.splice(afterIndex + 1, 0, newBlock);
      setSections(newSections);
    }
    setAddBlockMenu(null);
    setHasUnsaved(true);
  };

  const removeSection = (id) => {
    if (confirm('¿Eliminar este bloque?')) {
      setSections(sections.filter(s => s.id !== id));
      setHasUnsaved(true);
    }
  };

  const duplicateBlock = (index) => {
    const original = sections[index];
    const copy = { ...original, id: `blk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` };
    const newSections = [...sections];
    newSections.splice(index + 1, 0, copy);
    setSections(newSections);
    setHasUnsaved(true);
    showStatus('Bloque duplicado', 'success');
  };

  const toggleBlockVisibility = (id) => {
    setSections(sections.map(s => s.id === id ? { ...s, visible: !s.visible } : s));
    setHasUnsaved(true);
  };

  const updateSection = (id, field, value) => {
    setSections(sections.map(s => s.id === id ? { ...s, [field]: value } : s));
    setHasUnsaved(true);
  };

  const handleFileUpload = async (file, secId, field) => {
    if (!file) return;
    setUploadingId(secId + field);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        updateSection(secId, field, data.url);
        showStatus('Archivo subido', 'success');
      } else { showStatus('Error: ' + data.error, 'error'); }
    } catch (e) { showStatus('Error de red', 'error'); }
    setUploadingId(null);
  };

  // Styles
  const inputTheme = { background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px', padding: '0.6rem 1rem', width: '100%', outline: 'none', transition: 'border-color 0.2s' };
  const inlineInput = { background: 'transparent', border: 'none', borderBottom: '1px dashed rgba(255,255,255,0.3)', color: 'white', width: '100%', outline: 'none', transition: 'all 0.2s' };

  const filteredModules = searchTerm
    ? modules.filter(m => (m.titleEs || m.id).toLowerCase().includes(searchTerm.toLowerCase()))
    : modules;

  if (loading && modules.length === 0) return <div style={{ color: 'white', padding: '2rem' }}>Iniciando Creador de Cursos...</div>;

  // ─── Block type icon helper ───
  const blockTypeInfo = (type) => BLOCK_TYPES.find(b => b.type === type) || BLOCK_TYPES[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>

      {/* ═══ HEADER ═══ */}
      <header style={{ background: 'rgba(0,0,0,0.4)', padding: '1.5rem 2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h1 style={{ margin: 0, color: 'var(--electric-blue)', display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.6rem' }}>
            <Layout size={28} /> Creador de Cursos
          </h1>

          {/* Edit/Preview toggle */}
          {moduleData && (
            <button
              onClick={() => setEditMode(!editMode)}
              style={{
                background: editMode ? 'rgba(0,228,255,0.12)' : 'rgba(0,255,136,0.12)',
                border: `1px solid ${editMode ? 'rgba(0,228,255,0.4)' : 'rgba(0,255,136,0.4)'}`,
                color: editMode ? '#00E4FF' : '#00FF88',
                padding: '0.5rem 1.2rem',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '0.85rem',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                transition: 'all 0.25s',
              }}
            >
              {editMode ? <><Eye size={16} /> Modo Vista Previa</> : <><Edit3 size={16} /> Activar Edición</>}
            </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div style={{ position: 'relative', width: '200px' }}>
            <Search size={14} style={{ position: 'absolute', left: '0.7rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
            <input
              type="text" placeholder="Buscar..." value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ ...inputTheme, paddingLeft: '2rem', fontSize: '0.82rem' }}
            />
          </div>
          <select value={selectedModuleId} onChange={e => { setSelectedModuleId(e.target.value); setModuleData(null); }} style={{ ...inputTheme, flex: 1, cursor: 'pointer' }}>
            <option value="">— Selecciona un curso a editar —</option>
            {filteredModules.map(m => <option key={m.id} value={m.id}>{m.titleEs || m.id}</option>)}
          </select>
          <button onClick={loadModule} disabled={!selectedModuleId} className="btn-primary" style={{ padding: '0 1.5rem', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={16} /> Cargar
          </button>
          <button onClick={handleCreateModule} className="btn-outline" style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={16} /> Nuevo
          </button>
        </div>
      </header>

      {/* ═══ STATUS TOAST ═══ */}
      <AnimatePresence>
        {status.msg && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ padding: '0.8rem 1.2rem', borderRadius: '10px', background: status.type === 'success' ? 'rgba(0,255,136,0.12)' : 'rgba(255,50,50,0.12)', color: 'white', border: `1px solid ${status.type === 'success' ? 'rgba(0,255,136,0.4)' : 'rgba(255,50,50,0.4)'}`, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
            <AlertCircle size={16} /> {status.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ EDITOR CANVAS ═══ */}
      {moduleData && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

          {/* Module Cover / Metadata */}
          <div style={{
            background: `linear-gradient(to right, rgba(0,0,0,0.8), ${moduleData.color}20)`,
            padding: '1.5rem 2rem', borderRadius: '16px',
            borderLeft: `5px solid ${moduleData.color}`,
            marginBottom: '1.5rem',
            display: 'flex', gap: '2rem', alignItems: 'stretch',
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <FileText size={14} color="rgba(255,255,255,0.4)" />
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Portada del Módulo</span>
              </div>
              {editMode ? (
                <>
                  <input type="text" value={moduleData.titleEs}
                    onChange={e => { setModuleData({ ...moduleData, titleEs: e.target.value }); setHasUnsaved(true); }}
                    style={{ ...inlineInput, fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.8rem' }}
                    placeholder="Título del Módulo"
                  />
                  <input type="text" value={moduleData.badgeEs}
                    onChange={e => { setModuleData({ ...moduleData, badgeEs: e.target.value }); setHasUnsaved(true); }}
                    style={{ ...inlineInput, fontSize: '1.1rem', color: 'var(--text-muted)' }}
                    placeholder="Subtítulo o descripción"
                  />
                </>
              ) : (
                <>
                  <h2 style={{ margin: '0 0 0.5rem 0', color: 'white', fontSize: '2rem' }}>{moduleData.titleEs || 'Sin título'}</h2>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1.1rem' }}>{moduleData.badgeEs || 'Sin descripción'}</p>
                </>
              )}
            </div>
            {editMode && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'center', justifyContent: 'center', minWidth: '120px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Color:</span>
                  <input type="color" value={moduleData.color}
                    onChange={e => { setModuleData({ ...moduleData, color: e.target.value }); setHasUnsaved(true); }}
                    style={{ width: '36px', height: '36px', border: 'none', background: 'transparent', cursor: 'pointer' }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* ═══ CONTENT BLOCKS ═══ */}
          <div style={{ position: 'relative' }}>

            {/* Add block at top */}
            {editMode && <AddBlockButton index={-1} onSelect={(type) => addBlock(type, -1)} isOpen={addBlockMenu === -1} onToggle={() => setAddBlockMenu(addBlockMenu === -1 ? null : -1)} />}

            <Reorder.Group axis="y" values={sections} onReorder={(newOrder) => { setSections(newOrder); setHasUnsaved(true); }} style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {sections.map((sec, index) => (
                <Reorder.Item key={sec.id} value={sec} style={{ position: 'relative' }} dragListener={editMode}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: sec.visible !== false ? 1 : 0.4, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: '12px',
                      border: `1px solid ${editMode ? blockTypeInfo(sec.type).color + '30' : 'rgba(255,255,255,0.06)'}`,
                      overflow: 'hidden',
                      display: 'flex',
                      transition: 'border-color 0.2s, opacity 0.2s',
                    }}
                  >
                    {/* Drag Handle + Type indicator */}
                    {editMode && (
                      <div style={{
                        width: '40px',
                        background: blockTypeInfo(sec.type).color + '08',
                        borderRight: `1px solid ${blockTypeInfo(sec.type).color}20`,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        gap: '0.4rem', cursor: 'grab', color: 'rgba(255,255,255,0.25)',
                      }}>
                        <GripVertical size={14} />
                        <span style={{ fontSize: '1rem' }}>{blockTypeInfo(sec.type).icon}</span>
                      </div>
                    )}

                    {/* Content area */}
                    <div style={{ padding: editMode ? '1.2rem' : '1.5rem 2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>

                      {/* Block header with actions */}
                      {editMode && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <input type="text" value={sec.title || ''} onChange={e => updateSection(sec.id, 'title', e.target.value)}
                            placeholder="Título de la sección (opcional)"
                            style={{ ...inlineInput, fontSize: '1.15rem', fontWeight: 'bold', color: blockTypeInfo(sec.type).color, flex: 1 }}
                          />
                          {/* Action toolbar */}
                          <div style={{ display: 'flex', gap: '0.25rem', marginLeft: '0.5rem' }}>
                            <ToolbarBtn icon={<Copy size={14} />} title="Duplicar" onClick={() => duplicateBlock(index)} />
                            <ToolbarBtn icon={sec.visible ? <Eye size={14} /> : <EyeOff size={14} />} title="Visibilidad" onClick={() => toggleBlockVisibility(sec.id)} active={!sec.visible} />
                            <ToolbarBtn icon={<Trash2 size={14} />} title="Eliminar" onClick={() => removeSection(sec.id)} danger />
                          </div>
                        </div>
                      )}

                      {/* Preview mode title */}
                      {!editMode && sec.title && (
                        <h3 style={{ margin: 0, color: moduleData.color, fontSize: '1.3rem' }}>{sec.title}</h3>
                      )}

                      {/* ─── TEXT BLOCK ─── */}
                      {(sec.type === 'text' || !sec.type) && (
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                          <div style={{ flex: 1 }}>
                            {editMode ? (
                              <textarea
                                value={sec.text || ''} onChange={e => updateSection(sec.id, 'text', e.target.value)}
                                placeholder="Escribe el texto pedagógico aquí..."
                                style={{ ...inputTheme, minHeight: '100px', resize: 'vertical', lineHeight: '1.6', fontSize: '0.95rem' }}
                              />
                            ) : (
                              <p style={{ margin: 0, color: 'rgba(255,255,255,0.85)', lineHeight: '1.7', fontSize: '1rem' }}>
                                {sec.text || '(Sin contenido)'}
                              </p>
                            )}
                          </div>
                          {/* Image/Video sidebar for text blocks */}
                          {editMode && (
                            <MediaPanel sec={sec} updateSection={updateSection} handleFileUpload={handleFileUpload} uploadingId={uploadingId} inputStyle={inlineInput} />
                          )}
                        </div>
                      )}

                      {/* ─── IMAGE BLOCK ─── */}
                      {sec.type === 'image' && (
                        editMode ? (
                          <DropZone
                            label="Imagen"
                            value={sec.image}
                            onChange={v => updateSection(sec.id, 'image', v)}
                            onDrop={file => handleFileUpload(file, sec.id, 'image')}
                            uploading={uploadingId === sec.id + 'image'}
                            inputStyle={inlineInput}
                            preview={sec.image && <img src={sec.image} alt="preview" style={{ width: '100%', maxHeight: '250px', objectFit: 'contain', borderRadius: '8px', background: '#000' }} />}
                          >
                            <input type="text" value={sec.imgCaption || ''} onChange={e => updateSection(sec.id, 'imgCaption', e.target.value)}
                              placeholder="Pie de imagen (opcional)" style={{ ...inlineInput, fontSize: '0.85rem', marginTop: '0.5rem' }} />
                          </DropZone>
                        ) : sec.image ? (
                          <div style={{ textAlign: 'center' }}>
                            <img src={sec.image} alt={sec.imgCaption || ''} style={{ maxWidth: '100%', maxHeight: '350px', borderRadius: '10px' }} />
                            {sec.imgCaption && <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginTop: '0.5rem' }}>{sec.imgCaption}</p>}
                          </div>
                        ) : null
                      )}

                      {/* ─── VIDEO BLOCK ─── */}
                      {sec.type === 'video' && (
                        editMode ? (
                          <DropZone
                            label="Video (URL YouTube o archivo)"
                            value={sec.video}
                            onChange={v => updateSection(sec.id, 'video', v)}
                            onDrop={file => handleFileUpload(file, sec.id, 'video')}
                            uploading={uploadingId === sec.id + 'video'}
                            inputStyle={inlineInput}
                          />
                        ) : sec.video ? (
                          <div style={{ background: '#000', borderRadius: '10px', overflow: 'hidden', aspectRatio: '16/9', maxWidth: '640px' }}>
                            {sec.video.includes('youtube') || sec.video.includes('youtu.be') ? (
                              <iframe src={sec.video.replace('watch?v=', 'embed/')} style={{ width: '100%', height: '100%', border: 'none' }} allowFullScreen />
                            ) : (
                              <video src={sec.video} controls style={{ width: '100%', height: '100%' }} />
                            )}
                          </div>
                        ) : null
                      )}

                      {/* ─── AUDIO BLOCK ─── */}
                      {sec.type === 'audio' && (
                        editMode ? (
                          <DropZone
                            label="Audio (URL o archivo .mp3/.wav)"
                            value={sec.audio}
                            onChange={v => updateSection(sec.id, 'audio', v)}
                            onDrop={file => handleFileUpload(file, sec.id, 'audio')}
                            uploading={uploadingId === sec.id + 'audio'}
                            inputStyle={inlineInput}
                            preview={sec.audio && <audio src={sec.audio} controls style={{ width: '100%', marginTop: '0.5rem' }} />}
                          />
                        ) : sec.audio ? (
                          <audio src={sec.audio} controls style={{ width: '100%' }} />
                        ) : null
                      )}

                      {/* ─── LABEL BLOCK ─── */}
                      {sec.type === 'label' && (
                        editMode ? (
                          <input type="text" value={sec.text || ''} onChange={e => updateSection(sec.id, 'text', e.target.value)}
                            placeholder="Texto de etiqueta (divisor visual)"
                            style={{ ...inlineInput, fontSize: '1.1rem', fontWeight: 600, color: '#B388FF', textAlign: 'center', padding: '0.8rem' }}
                          />
                        ) : (
                          <div style={{
                            textAlign: 'center', padding: '1rem 2rem',
                            borderTop: '1px solid rgba(138,43,226,0.3)',
                            borderBottom: '1px solid rgba(138,43,226,0.3)',
                            color: '#B388FF', fontWeight: 600, fontSize: '1.1rem',
                            letterSpacing: '0.02em',
                          }}>
                            {sec.text || '─── ───'}
                          </div>
                        )
                      )}
                    </div>
                  </motion.div>

                  {/* Add block between items */}
                  {editMode && (
                    <AddBlockButton
                      index={index}
                      onSelect={(type) => addBlock(type, index)}
                      isOpen={addBlockMenu === index}
                      onToggle={() => setAddBlockMenu(addBlockMenu === index ? null : index)}
                    />
                  )}
                </Reorder.Item>
              ))}
            </Reorder.Group>

            {/* Add block at end (if empty) */}
            {editMode && sections.length === 0 && (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ color: 'rgba(255,255,255,0.3)', marginBottom: '1rem' }}>Sin bloques de contenido. Agrega el primero:</p>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                    {BLOCK_TYPES.map(bt => (
                      <button key={bt.type} onClick={() => addBlock(bt.type)}
                        style={{
                          background: `${bt.color}15`,
                          border: `1px solid ${bt.color}40`,
                          color: bt.color,
                          padding: '0.7rem 1.2rem',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          display: 'flex', alignItems: 'center', gap: '0.4rem',
                        }}
                      >
                        <span>{bt.icon}</span> {bt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ═══ STICKY SAVE BAR ═══ */}
          <div style={{
            position: 'sticky', bottom: '1.5rem', marginTop: '1rem',
            background: 'rgba(10, 15, 30, 0.92)',
            backdropFilter: 'blur(12px)',
            padding: '0.8rem 1.5rem',
            borderRadius: '16px',
            border: `1px solid ${hasUnsaved ? 'rgba(255,165,0,0.5)' : `${moduleData.color}60`}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            boxShadow: `0 -4px 30px rgba(0,0,0,0.5)`,
          }}>
            <div style={{ color: 'white', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.9rem' }}>
              <span>{sections.length} Bloques</span>
              {hasUnsaved && <span style={{ color: '#FFA500', fontSize: '0.8rem' }}>● Cambios sin guardar</span>}
            </div>
            <button onClick={saveModuleChanges} disabled={saving}
              style={{
                background: moduleData.color, color: 'black', border: 'none',
                padding: '0.7rem 2rem', borderRadius: '10px', fontSize: '1rem', fontWeight: 'bold',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
                boxShadow: `0 0 20px ${moduleData.color}40`,
              }}>
              {saving ? <RefreshCw size={18} className="spin" /> : <Save size={18} />}
              PUBLICAR CURSO
            </button>
          </div>
        </motion.div>
      )}

      <style>{`
        .btn-primary { background: var(--electric-blue); color: black; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; }
        .btn-outline { background: transparent; color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; cursor: pointer; padding: 0.6rem 1rem; font-weight: bold; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        *:focus { outline: 2px solid rgba(0,228,255,0.4); outline-offset: 2px; }
        select option { background: #1a1a2e; color: white; }
      `}</style>
    </div>
  );
}

// ─── Sub-components ───

function ToolbarBtn({ icon, title, onClick, danger, active }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        background: danger ? 'rgba(255,50,50,0.08)' : active ? 'rgba(255,165,0,0.12)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${danger ? 'rgba(255,50,50,0.2)' : active ? 'rgba(255,165,0,0.3)' : 'rgba(255,255,255,0.08)'}`,
        color: danger ? '#ff5555' : active ? '#FFA500' : 'rgba(255,255,255,0.45)',
        borderRadius: '6px',
        padding: '0.35rem',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.15s',
      }}
    >
      {icon}
    </button>
  );
}

function AddBlockButton({ index, onSelect, isOpen, onToggle }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '0.3rem 0', position: 'relative' }}>
      <button
        onClick={onToggle}
        style={{
          width: '28px', height: '28px', borderRadius: '50%',
          background: isOpen ? 'rgba(0,228,255,0.2)' : 'rgba(255,255,255,0.05)',
          border: `1px solid ${isOpen ? 'rgba(0,228,255,0.5)' : 'rgba(255,255,255,0.1)'}`,
          color: isOpen ? '#00E4FF' : 'rgba(255,255,255,0.3)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s',
          fontSize: '1rem', fontWeight: 700,
        }}
      >
        {isOpen ? <X size={14} /> : <Plus size={14} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              position: 'absolute', top: '100%', zIndex: 50,
              background: 'rgba(15, 10, 35, 0.95)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(0,228,255,0.3)',
              borderRadius: '12px',
              padding: '0.5rem',
              display: 'flex', gap: '0.3rem',
              boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
            }}
          >
            {BLOCK_TYPES.map(bt => (
              <button key={bt.type} onClick={() => onSelect(bt.type)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: bt.color,
                  padding: '0.5rem 0.8rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem',
                  fontSize: '0.7rem', fontWeight: 600,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.target.style.background = `${bt.color}15`}
                onMouseLeave={e => e.target.style.background = 'transparent'}
              >
                <span style={{ fontSize: '1.3rem' }}>{bt.icon}</span>
                {bt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MediaPanel({ sec, updateSection, handleFileUpload, uploadingId, inputStyle }) {
  return (
    <div style={{ width: '260px', background: 'rgba(0,0,0,0.25)', borderRadius: '10px', padding: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        <ImageIcon size={12} /> Recursos Multimedia
      </div>
      <DropZone label="Imagen" value={sec.image} onChange={v => updateSection(sec.id, 'image', v)}
        onDrop={file => handleFileUpload(file, sec.id, 'image')}
        uploading={uploadingId === sec.id + 'image'}
        inputStyle={inputStyle}
        preview={sec.image && <img src={sec.image} alt="preview" style={{ width: '100%', height: '90px', objectFit: 'cover', borderRadius: '6px' }} onError={e => e.target.style.opacity = 0.2} />}
        compact
      />
      <DropZone label="Video" value={sec.video} onChange={v => updateSection(sec.id, 'video', v)}
        onDrop={file => handleFileUpload(file, sec.id, 'video')}
        uploading={uploadingId === sec.id + 'video'}
        inputStyle={inputStyle}
        compact
      />
      <DropZone label="Audio" value={sec.audio || ''} onChange={v => updateSection(sec.id, 'audio', v)}
        onDrop={file => handleFileUpload(file, sec.id, 'audio')}
        uploading={uploadingId === sec.id + 'audio'}
        inputStyle={inputStyle}
        compact
      />
    </div>
  );
}

function DropZone({ label, value, onChange, onDrop, uploading, inputStyle, preview, children, compact }) {
  return (
    <div
      onDragOver={e => { e.preventDefault(); e.stopPropagation(); }}
      onDrop={e => { e.preventDefault(); e.stopPropagation(); const f = e.dataTransfer.files[0]; if (f) onDrop(f); }}
      style={{
        border: '1px dashed rgba(0,255,136,0.25)',
        padding: compact ? '0.4rem' : '0.6rem',
        borderRadius: '8px',
        background: 'rgba(0,255,136,0.03)',
        display: 'flex', flexDirection: 'column', gap: compact ? '0.3rem' : '0.4rem',
      }}
    >
      <input type="text" value={value || ''} onChange={e => onChange(e.target.value)}
        placeholder={`${label} URL o ruta`}
        style={{ ...inputStyle, fontSize: compact ? '0.78rem' : '0.85rem' }}
      />
      <span style={{ fontSize: '0.68rem', color: 'rgba(0,255,136,0.5)', textAlign: 'center' }}>
        {uploading ? '⏳ Subiendo...' : `📎 Arrastra ${label.toLowerCase()} aquí`}
      </span>
      {preview}
      {children}
    </div>
  );
}
