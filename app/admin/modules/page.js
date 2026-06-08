'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  BookOpen, Plus, Save, RefreshCw, Trash2, Video, Image as ImageIcon,
  AlertCircle, GripVertical, Type, X, Layout, Eye, Edit3,
  Volume2, Tag, Copy, ChevronDown, EyeOff, FileText, Search,
  CheckCircle, Sparkles, Layers, PenTool, Palette, Bold, Italic,
  List, Heading, AlignLeft, ChevronRight, Filter
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';

// ─── Course Groups Config (for filtering) ───
const COURSE_GROUPS = [
  { id: 'solar',       label: '🪐 Sistema Solar',            prefixes: ['sun','mercury','venus','earth','mars','jupiter','saturn','uranus','neptune','pluto','moon','dwarf'] },
  { id: 'egypt',       label: '🏺 Arqueoastronomía Egipcia', prefixes: ['egypt_'] },
  { id: 'maya',        label: '🌿 Arqueoastronomía Maya',    prefixes: ['maya_','arqueoastronomia_maya'] },
  { id: 'dinos',       label: '🦕 Dinosaurios',             prefixes: ['dinos_'] },
  { id: 'marinos',     label: '🌊 Reptiles Marinos',        prefixes: ['marinos_'] },
  { id: 'tesla',       label: '⚡ Nikola Tesla',            prefixes: ['tesla_'] },
  { id: 'pioneros',    label: '🚀 Pioneros del Espacio',    prefixes: ['pioneros_'] },
  { id: 'apollo',      label: '🌕 Misiones Apollo',         prefixes: ['apollo'] },
  { id: 'cientificos', label: '🔭 Grandes Científicos',     prefixes: ['copernico_','galileo_','faraday_','davinci_'] },
  { id: 'area51',      label: '🛸 Área 51',                 prefixes: ['area51_'] },
  { id: 'anomalias',   label: '💥 Anomalías Estelares',     prefixes: ['colisiones_','black_','quasar','pulsar','red_','white_','wormhole'] },
  { id: 'robots',      label: '🤖 Robótica Espacial',       prefixes: ['robots_'] },
  { id: 'animales',    label: '🐾 Animales del Espacio',    prefixes: ['animales_'] },
  { id: 'asteroides',  label: '☄️ Asteroides y Cometas',    prefixes: ['asteroides_','rocosos_'] },
  { id: 'peliculas',   label: '🎬 Ciencia en el Cine',      prefixes: ['starwars_','bttf_','interstellar_','interestelar_','objetos_'] },
  { id: 'viajes',      label: '🛰️ Viajes Espaciales',       prefixes: ['viaje','exoplanetas_','arqueoastronomia_'] },
  { id: 'otros',       label: '📚 Otros Módulos',           prefixes: [] },
];


function getModuleCourse(moduleId) {
  const id = (moduleId || '').toLowerCase();
  for (const group of COURSE_GROUPS) {
    if (group.id === 'otros') continue;
    for (const prefix of group.prefixes) {
      if (id.startsWith(prefix)) return group.id;
    }
  }
  return 'otros';
}

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
  const [addBlockMenu, setAddBlockMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [hasUnsaved, setHasUnsaved] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const textareaRefs = useRef({});

  const showStatus = (msg, type = 'info') => {
    setStatus({ msg, type });
    if (type !== 'error') {
      setTimeout(() => setStatus({ msg: '', type: '' }), 5000);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/course-data');
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP ${res.status}`);
      }
      const data = await res.json();
      if (!Array.isArray(data)) {
        throw new Error('La respuesta del servidor no es un array válido');
      }
      setModules(data);
    } catch (err) {
      console.error('[EditorMoodle] loadData error:', err);
      showStatus(`Error cargando módulos: ${err.message}`, 'error');
    }
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const loadModule = () => {
    const mod = modules.find(m => m.id === selectedModuleId);
    if (!mod) {
      showStatus('Módulo no encontrado en la lista', 'error');
      return;
    }
    setModuleData({
      titleEs: mod.titleEs || '',
      badgeEs: mod.badgeEs || '',
      color: mod.color || '#00E4FF',
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
    showStatus(`✅ Módulo "${mod.titleEs || mod.id}" cargado para edición`, 'success');
  };

  const handleCreateModule = async () => {
    const titleEs = prompt('Título del nuevo módulo (ej: Misión Júpiter):');
    if (!titleEs || !titleEs.trim()) return;
    const id = titleEs.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    if (!id) {
      showStatus('El título no genera un ID válido', 'error');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/course-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add_module', payload: { id, titleEs: titleEs.trim(), badgeEs: titleEs.trim() } })
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || `HTTP ${res.status}`);
      }
      showStatus(`✅ Módulo "${titleEs}" creado exitosamente`, 'success');
      await loadData();
      setSelectedModuleId(id);
    } catch (e) {
      console.error('[EditorMoodle] create error:', e);
      showStatus(`Error al crear módulo: ${e.message}`, 'error');
    }
    setSaving(false);
  };

  const saveModuleChanges = async () => {
    if (!selectedModuleId || !moduleData) {
      showStatus('No hay módulo seleccionado para guardar', 'error');
      return;
    }
    setSaving(true);
    try {
      // Step 1: Update module metadata
      const res1 = await fetch('/api/course-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_module', payload: { id: selectedModuleId, ...moduleData } })
      });
      const result1 = await res1.json();
      if (!res1.ok) {
        throw new Error(`Error guardando metadatos: ${result1.error || res1.status}`);
      }

      // Step 2: Update sections/content
      const res2 = await fetch('/api/course-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_sections', payload: { id: selectedModuleId, sections } })
      });
      const result2 = await res2.json();
      if (!res2.ok) {
        throw new Error(`Error guardando contenido: ${result2.error || res2.status}`);
      }

      setHasUnsaved(false);
      showStatus('🚀 ¡Curso publicado exitosamente!', 'success');
      await loadData();
    } catch (e) {
      console.error('[EditorMoodle] save error:', e);
      showStatus(`Error al guardar: ${e.message}`, 'error');
    }
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
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Upload failed');
      }
      updateSection(secId, field, data.url);
      showStatus('📎 Archivo subido exitosamente', 'success');
    } catch (e) {
      console.error('[EditorMoodle] upload error:', e);
      showStatus(`Error al subir archivo: ${e.message}`, 'error');
    }
    setUploadingId(null);
  };

  // Modules filtered by course group and search term
  const filteredByCourse = selectedCourse
    ? modules.filter(m => getModuleCourse(m.id) === selectedCourse)
    : modules;
  const filteredModules = searchTerm
    ? filteredByCourse.filter(m => (m.titleEs || m.id).toLowerCase().includes(searchTerm.toLowerCase()))
    : filteredByCourse;

  // Grouped modules for the select optgroups
  const groupedModules = COURSE_GROUPS.reduce((acc, group) => {
    const mods = filteredByCourse.filter(m => getModuleCourse(m.id) === group.id);
    if (mods.length > 0) acc.push({ ...group, modules: mods });
    return acc;
  }, []);

  const blockTypeInfo = (type) => BLOCK_TYPES.find(b => b.type === type) || BLOCK_TYPES[0];

  // Rich text formatter helper
  const insertFormat = (secId, format) => {
    const ta = textareaRefs.current[secId];
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = ta.value.substring(start, end);
    const current = ta.value;
    let insert = '';
    if (format === 'bold') insert = `**${selected || 'texto'}**`;
    else if (format === 'italic') insert = `_${selected || 'texto'}_`;
    else if (format === 'h2') insert = `\n## ${selected || 'Subtítulo'}\n`;
    else if (format === 'h3') insert = `\n### ${selected || 'Sección'}\n`;
    else if (format === 'list') insert = `\n- ${selected || 'elemento'}\n`;
    const newVal = current.substring(0, start) + insert + current.substring(end);
    updateSection(secId, 'text', newVal);
    setTimeout(() => { ta.focus(); ta.selectionStart = ta.selectionEnd = start + insert.length; }, 50);
  };

  // ── LOADING STATE ──
  if (loading && modules.length === 0) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        minHeight: '60vh', gap: '1.5rem',
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <Sparkles size={48} color="#00E4FF" />
        </motion.div>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem' }}>Cargando Creador de Cursos...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>

      {/* ═══ HEADER ═══ */}
      <header style={{
        background: 'linear-gradient(135deg, rgba(0,228,255,0.08), rgba(0,0,0,0.5))',
        padding: '2rem 2.5rem',
        borderRadius: '20px',
        border: '1px solid rgba(0,228,255,0.15)',
        backdropFilter: 'blur(12px)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: 52, height: 52, borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(0,228,255,0.2), rgba(0,228,255,0.05))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 30px rgba(0,228,255,0.15)',
              border: '1px solid rgba(0,228,255,0.2)',
            }}>
              <PenTool size={26} color="#00E4FF" />
            </div>
            <div>
              <h1 style={{ margin: 0, color: '#00E4FF', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                Editor de Contenido
              </h1>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem' }}>
                {modules.length} módulos disponibles • Sistema de bloques drag & drop
              </p>
            </div>
          </div>

          {/* Edit/Preview toggle */}
          {moduleData && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setEditMode(!editMode)}
              style={{
                background: editMode ? 'rgba(0,228,255,0.1)' : 'rgba(0,255,136,0.1)',
                border: `1px solid ${editMode ? 'rgba(0,228,255,0.35)' : 'rgba(0,255,136,0.35)'}`,
                color: editMode ? '#00E4FF' : '#00FF88',
                padding: '0.6rem 1.4rem',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                transition: 'all 0.25s',
              }}
            >
              {editMode ? <><Eye size={16} /> Vista Previa</> : <><Edit3 size={16} /> Edición</>}
            </motion.button>
          )}
        </div>

        {/* ─── Moodle-style Selector Panel ─── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {/* Row 1: Course filter + search */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
              <Filter size={14} /> Filtrar por curso:
            </div>
            <select
              value={selectedCourse}
              onChange={e => { setSelectedCourse(e.target.value); setSelectedModuleId(''); setModuleData(null); }}
              style={{ ...styles.input, flex: 1, cursor: 'pointer', fontSize: '0.85rem',
                background: 'rgba(0,228,255,0.05)', border: '1px solid rgba(0,228,255,0.2)' }}
            >
              <option value="">— Todos los cursos ({modules.length} módulos) —</option>
              {COURSE_GROUPS.map(g => {
                const count = modules.filter(m => getModuleCourse(m.id) === g.id).length;
                if (count === 0) return null;
                return <option key={g.id} value={g.id}>{g.label} ({count} módulos)</option>;
              })}
            </select>
            <div style={{ position: 'relative', width: '220px', flexShrink: 0 }}>
              <Search size={14} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.25)' }} />
              <input
                type="text" placeholder="Buscar en el curso..." value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ ...styles.input, paddingLeft: '2.2rem', fontSize: '0.82rem' }}
              />
            </div>
          </div>
          {/* Row 2: Module selector + actions */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'stretch' }}>
            <select
              value={selectedModuleId}
              onChange={e => { setSelectedModuleId(e.target.value); setModuleData(null); }}
              style={{ ...styles.input, flex: 1, cursor: 'pointer',
                minHeight: '44px', fontSize: '0.9rem',
                background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <option value="">— Selecciona un módulo a editar —</option>
              {selectedCourse ? (
                filteredModules.map(m => (
                  <option key={m.id} value={m.id}>{m.titleEs || m.id}</option>
                ))
              ) : (
                groupedModules.map(group => (
                  <optgroup key={group.id} label={group.label}>
                    {group.modules.map(m => (
                      <option key={m.id} value={m.id}>{m.titleEs || m.id}</option>
                    ))}
                  </optgroup>
                ))
              )}
            </select>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={loadModule}
              disabled={!selectedModuleId}
              style={{
                ...styles.btnPrimary,
                opacity: selectedModuleId ? 1 : 0.4,
                cursor: selectedModuleId ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                minHeight: '44px', padding: '0 1.5rem',
              }}
            >
              <BookOpen size={16} /> Cargar
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCreateModule}
              style={{ ...styles.btnOutline, display: 'flex', alignItems: 'center', gap: '0.5rem', minHeight: '44px' }}
            >
              <Plus size={16} /> Nuevo
            </motion.button>
          </div>
          {/* Module count badge */}
          {filteredModules.length > 0 && (
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', paddingLeft: '0.5rem' }}>
              {filteredModules.length} módulo{filteredModules.length !== 1 ? 's' : ''} disponible{filteredModules.length !== 1 ? 's' : ''}
              {selectedCourse && <span> en {COURSE_GROUPS.find(g => g.id === selectedCourse)?.label}</span>}
            </div>
          )}
        </div>
      </header>

      {/* ═══ STATUS TOAST ═══ */}
      <AnimatePresence>
        {status.msg && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{
              padding: '1rem 1.5rem',
              borderRadius: '14px',
              background: status.type === 'success' ? 'rgba(0,255,136,0.1)' : status.type === 'error' ? 'rgba(255,50,50,0.1)' : 'rgba(0,228,255,0.1)',
              color: 'white',
              border: `1px solid ${status.type === 'success' ? 'rgba(0,255,136,0.35)' : status.type === 'error' ? 'rgba(255,50,50,0.35)' : 'rgba(0,228,255,0.35)'}`,
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              fontSize: '0.92rem', fontWeight: 500,
              boxShadow: `0 4px 20px ${status.type === 'success' ? 'rgba(0,255,136,0.1)' : status.type === 'error' ? 'rgba(255,50,50,0.1)' : 'rgba(0,228,255,0.1)'}`,
            }}
          >
            {status.type === 'success' ? <CheckCircle size={18} color="#00FF88" /> :
             status.type === 'error' ? <AlertCircle size={18} color="#ff5555" /> :
             <AlertCircle size={18} color="#00E4FF" />}
            <span>{status.msg}</span>
            {status.type === 'error' && (
              <button onClick={() => setStatus({ msg: '', type: '' })} style={{
                marginLeft: 'auto', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
              }}>
                <X size={16} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ EDITOR CANVAS ═══ */}
      {moduleData && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

          {/* Module Cover / Metadata */}
          <div style={{
            background: `linear-gradient(135deg, rgba(0,0,0,0.7), ${moduleData.color}12)`,
            padding: '2rem 2.5rem', borderRadius: '20px',
            borderLeft: `5px solid ${moduleData.color}`,
            border: `1px solid ${moduleData.color}25`,
            marginBottom: '1.5rem',
            display: 'flex', gap: '2rem', alignItems: 'stretch',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Subtle decorative glow */}
            <div style={{
              position: 'absolute', top: '-50%', right: '-20%',
              width: '400px', height: '400px',
              background: `radial-gradient(circle, ${moduleData.color}08 0%, transparent 70%)`,
              borderRadius: '50%', pointerEvents: 'none',
            }} />

            <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <Layers size={14} color="rgba(255,255,255,0.35)" />
                <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                  Portada del Módulo
                </span>
              </div>
              {editMode ? (
                <>
                  <input type="text" value={moduleData.titleEs}
                    onChange={e => { setModuleData({ ...moduleData, titleEs: e.target.value }); setHasUnsaved(true); }}
                    style={{ ...styles.inlineInput, fontSize: '2rem', fontWeight: 800, marginBottom: '0.8rem', letterSpacing: '-0.02em' }}
                    placeholder="Título del Módulo"
                  />
                  <input type="text" value={moduleData.badgeEs}
                    onChange={e => { setModuleData({ ...moduleData, badgeEs: e.target.value }); setHasUnsaved(true); }}
                    style={{ ...styles.inlineInput, fontSize: '1.1rem', color: 'rgba(255,255,255,0.5)' }}
                    placeholder="Subtítulo o descripción corta"
                  />
                </>
              ) : (
                <>
                  <h2 style={{ margin: '0 0 0.5rem 0', color: 'white', fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>{moduleData.titleEs || 'Sin título'}</h2>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem' }}>{moduleData.badgeEs || 'Sin descripción'}</p>
                </>
              )}
            </div>
            {editMode && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'center', justifyContent: 'center', minWidth: '100px', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Palette size={14} color="rgba(255,255,255,0.4)" />
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontWeight: 600 }}>Color</span>
                </div>
                <div style={{ position: 'relative' }}>
                  <input type="color" value={moduleData.color}
                    onChange={e => { setModuleData({ ...moduleData, color: e.target.value }); setHasUnsaved(true); }}
                    style={{ width: '44px', height: '44px', border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: '12px' }}
                  />
                  <div style={{
                    position: 'absolute', inset: -3, borderRadius: '14px',
                    border: `2px solid ${moduleData.color}60`, pointerEvents: 'none',
                    boxShadow: `0 0 15px ${moduleData.color}20`,
                  }} />
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
                    animate={{ opacity: sec.visible !== false ? 1 : 0.35, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    style={{
                      background: 'rgba(255,255,255,0.025)',
                      borderRadius: '14px',
                      border: `1px solid ${editMode ? blockTypeInfo(sec.type).color + '25' : 'rgba(255,255,255,0.05)'}`,
                      overflow: 'hidden',
                      display: 'flex',
                      transition: 'border-color 0.2s, opacity 0.3s',
                    }}
                  >
                    {/* Drag Handle + Type indicator */}
                    {editMode && (
                      <div style={{
                        width: '44px',
                        background: blockTypeInfo(sec.type).color + '06',
                        borderRight: `1px solid ${blockTypeInfo(sec.type).color}15`,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        gap: '0.5rem', cursor: 'grab', color: 'rgba(255,255,255,0.2)',
                        transition: 'background 0.2s',
                      }}>
                        <GripVertical size={14} />
                        <span style={{ fontSize: '1.1rem' }}>{blockTypeInfo(sec.type).icon}</span>
                      </div>
                    )}

                    {/* Content area */}
                    <div style={{ padding: editMode ? '1.2rem 1.5rem' : '1.5rem 2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>

                      {/* Block header with actions */}
                      {editMode && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <input type="text" value={sec.title || ''} onChange={e => updateSection(sec.id, 'title', e.target.value)}
                            placeholder="Título de la sección (opcional)"
                            style={{ ...styles.inlineInput, fontSize: '1.1rem', fontWeight: 700, color: blockTypeInfo(sec.type).color, flex: 1 }}
                          />
                          {/* Action toolbar */}
                          <div style={{ display: 'flex', gap: '0.3rem', marginLeft: '0.75rem' }}>
                            <ToolbarBtn icon={<Copy size={14} />} title="Duplicar" onClick={() => duplicateBlock(index)} />
                            <ToolbarBtn icon={sec.visible ? <Eye size={14} /> : <EyeOff size={14} />} title="Visibilidad" onClick={() => toggleBlockVisibility(sec.id)} active={!sec.visible} />
                            <ToolbarBtn icon={<Trash2 size={14} />} title="Eliminar" onClick={() => removeSection(sec.id)} danger />
                          </div>
                        </div>
                      )}

                      {/* Preview mode title */}
                      {!editMode && sec.title && (
                        <h3 style={{ margin: 0, color: moduleData.color, fontSize: '1.3rem', fontWeight: 700 }}>{sec.title}</h3>
                      )}

                      {/* ─── TEXT BLOCK ─── */}
                      {(sec.type === 'text' || !sec.type) && (
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            {editMode ? (
                              <>
                                {/* ── Formatting Toolbar ── */}
                                <div style={{
                                  display: 'flex', gap: '0.3rem', padding: '0.4rem 0.6rem',
                                  background: 'rgba(0,0,0,0.25)', borderRadius: '8px 8px 0 0',
                                  border: '1px solid rgba(255,255,255,0.08)', borderBottom: 'none',
                                  flexWrap: 'wrap',
                                }}>
                                  {[
                                    { label: 'B', title: 'Negrita (**texto**)', format: 'bold', style: { fontWeight: 900, fontSize: '13px' } },
                                    { label: 'I', title: 'Cursiva (_texto_)', format: 'italic', style: { fontStyle: 'italic', fontSize: '13px' } },
                                    { label: 'H2', title: 'Subtítulo (## texto)', format: 'h2', style: { fontSize: '11px', fontWeight: 700 } },
                                    { label: 'H3', title: 'Sección (### texto)', format: 'h3', style: { fontSize: '11px', fontWeight: 700 } },
                                    { label: '• Lista', title: 'Lista (- elemento)', format: 'list', style: { fontSize: '11px' } },
                                  ].map(btn => (
                                    <button
                                      key={btn.format}
                                      title={btn.title}
                                      onMouseDown={e => { e.preventDefault(); insertFormat(sec.id, btn.format); }}
                                      style={{
                                        ...btn.style,
                                        background: 'rgba(255,255,255,0.06)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        color: 'rgba(255,255,255,0.7)',
                                        borderRadius: '5px',
                                        padding: '3px 8px',
                                        cursor: 'pointer',
                                        fontFamily: 'monospace',
                                        transition: 'all 0.15s',
                                      }}
                                      onMouseOver={e => e.currentTarget.style.background = 'rgba(0,228,255,0.12)'}
                                      onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                                    >{btn.label}</button>
                                  ))}
                                  <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.2)', fontSize: '0.72rem', alignSelf: 'center' }}>
                                    Markdown soportado
                                  </span>
                                </div>
                                <textarea
                                  ref={el => textareaRefs.current[sec.id] = el}
                                  value={sec.text || ''} onChange={e => updateSection(sec.id, 'text', e.target.value)}
                                  placeholder="Escribe el texto pedagógico aquí... Soporta Markdown: **negrita**, _cursiva_, ## Título, - lista"
                                  style={{ ...styles.input, minHeight: '380px', resize: 'vertical', lineHeight: '1.8', fontSize: '0.95rem', borderRadius: '0 0 10px 10px', fontFamily: '"Courier New", monospace' }}
                                />
                                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)', textAlign: 'right' }}>
                                  {(sec.text || '').length} caracteres · {(sec.text || '').split('\n').length} líneas
                                </div>
                              </>
                            ) : (
                              <p style={{ margin: 0, color: 'rgba(255,255,255,0.85)', lineHeight: '1.8', fontSize: '1rem', whiteSpace: 'pre-wrap' }}>
                                {sec.text || '(Sin contenido)'}
                              </p>
                            )}
                          </div>
                          {/* Image/Video sidebar for text blocks */}
                          {editMode && (
                            <MediaPanel sec={sec} updateSection={updateSection} handleFileUpload={handleFileUpload} uploadingId={uploadingId} />
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
                            preview={sec.image && <img src={sec.image} alt="preview" style={{ width: '100%', maxHeight: '250px', objectFit: 'contain', borderRadius: '10px', background: '#000' }} />}
                          >
                            <input type="text" value={sec.imgCaption || ''} onChange={e => updateSection(sec.id, 'imgCaption', e.target.value)}
                              placeholder="Pie de imagen (opcional)" style={{ ...styles.inlineInput, fontSize: '0.85rem', marginTop: '0.5rem' }} />
                          </DropZone>
                        ) : sec.image ? (
                          <div style={{ textAlign: 'center' }}>
                            <img src={sec.image} alt={sec.imgCaption || ''} style={{ maxWidth: '100%', maxHeight: '350px', borderRadius: '12px' }} />
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
                          />
                        ) : sec.video ? (
                          <div style={{ background: '#000', borderRadius: '12px', overflow: 'hidden', aspectRatio: '16/9', maxWidth: '640px' }}>
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
                            style={{ ...styles.inlineInput, fontSize: '1.1rem', fontWeight: 700, color: '#B388FF', textAlign: 'center', padding: '0.8rem' }}
                          />
                        ) : (
                          <div style={{
                            textAlign: 'center', padding: '1rem 2rem',
                            borderTop: '1px solid rgba(138,43,226,0.25)',
                            borderBottom: '1px solid rgba(138,43,226,0.25)',
                            color: '#B388FF', fontWeight: 700, fontSize: '1.1rem',
                            letterSpacing: '0.03em',
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

            {/* Add block when empty */}
            {editMode && sections.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: 'flex', justifyContent: 'center', padding: '4rem 0',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 80, height: 80, borderRadius: '50%',
                    background: 'rgba(0,228,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    border: '2px dashed rgba(0,228,255,0.2)',
                  }}>
                    <Layers size={36} color="rgba(0,228,255,0.4)" />
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem', fontSize: '1rem' }}>Sin bloques de contenido. Agrega el primero:</p>
                  <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {BLOCK_TYPES.map(bt => (
                      <motion.button
                        key={bt.type}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addBlock(bt.type)}
                        style={{
                          background: `${bt.color}10`,
                          border: `1px solid ${bt.color}30`,
                          color: bt.color,
                          padding: '0.7rem 1.3rem',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          display: 'flex', alignItems: 'center', gap: '0.5rem',
                          transition: 'all 0.2s',
                        }}
                      >
                        <span style={{ fontSize: '1.1rem' }}>{bt.icon}</span> {bt.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* ═══ STICKY SAVE BAR ═══ */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              position: 'sticky', bottom: '1.5rem', marginTop: '1.5rem',
              background: 'rgba(8, 10, 25, 0.95)',
              backdropFilter: 'blur(16px)',
              padding: '1rem 2rem',
              borderRadius: '18px',
              border: `1px solid ${hasUnsaved ? 'rgba(255,165,0,0.4)' : `${moduleData.color}30`}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              boxShadow: `0 -8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03) inset`,
              transition: 'border-color 0.3s',
            }}
          >
            <div style={{ color: 'white', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '1.2rem', fontSize: '0.9rem' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                background: 'rgba(255,255,255,0.05)', padding: '0.35rem 0.8rem', borderRadius: '8px',
              }}>
                <Layers size={14} color="rgba(255,255,255,0.4)" />
                <span>{sections.length} Bloques</span>
              </div>
              {hasUnsaved && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{ color: '#FFA500', fontSize: '0.82rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFA500', display: 'inline-block' }} />
                  Cambios sin guardar
                </motion.span>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={saveModuleChanges}
              disabled={saving}
              style={{
                background: `linear-gradient(135deg, ${moduleData.color}, ${moduleData.color}CC)`,
                color: '#000', border: 'none',
                padding: '0.75rem 2.5rem', borderRadius: '12px',
                fontSize: '0.95rem', fontWeight: 800,
                cursor: saving ? 'wait' : 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                boxShadow: `0 4px 20px ${moduleData.color}30`,
                letterSpacing: '0.02em',
                opacity: saving ? 0.7 : 1,
                transition: 'opacity 0.2s',
              }}
            >
              {saving ? <RefreshCw size={18} className="spin" /> : <Save size={18} />}
              {saving ? 'GUARDANDO...' : 'PUBLICAR CURSO'}
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        *:focus { outline: 2px solid rgba(0,228,255,0.35); outline-offset: 2px; }
        select option { background: #0a0e1a; color: white; }
        textarea:focus, input:focus { border-color: rgba(0,228,255,0.45) !important; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
      `}
      </style>
    </div>
  );
}

// ─── Shared Styles ───
const styles = {
  input: {
    background: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'white',
    borderRadius: '10px',
    padding: '0.65rem 1.1rem',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.25s, box-shadow 0.25s',
    fontSize: '0.92rem',
  },
  inlineInput: {
    background: 'transparent',
    border: 'none',
    borderBottom: '1px dashed rgba(255,255,255,0.2)',
    color: 'white',
    width: '100%',
    outline: 'none',
    transition: 'all 0.25s',
    padding: '0.2rem 0',
  },
  btnPrimary: {
    background: 'linear-gradient(135deg, #00E4FF, #00C4E0)',
    color: '#000',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 700,
    padding: '0 1.5rem',
    fontSize: '0.88rem',
    whiteSpace: 'nowrap',
  },
  btnOutline: {
    background: 'rgba(255,255,255,0.04)',
    color: 'white',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '10px',
    cursor: 'pointer',
    padding: '0.6rem 1.1rem',
    fontWeight: 700,
    fontSize: '0.88rem',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s',
  },
};

// ─── Sub-components ───

function ToolbarBtn({ icon, title, onClick, danger, active }) {
  return (
    <motion.button
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      title={title}
      style={{
        background: danger ? 'rgba(255,50,50,0.08)' : active ? 'rgba(255,165,0,0.1)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${danger ? 'rgba(255,50,50,0.2)' : active ? 'rgba(255,165,0,0.25)' : 'rgba(255,255,255,0.08)'}`,
        color: danger ? '#ff5555' : active ? '#FFA500' : 'rgba(255,255,255,0.4)',
        borderRadius: '8px',
        padding: '0.4rem',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.15s',
      }}
    >
      {icon}
    </motion.button>
  );
}

function AddBlockButton({ index, onSelect, isOpen, onToggle }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '0.35rem 0', position: 'relative' }}>
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={onToggle}
        style={{
          width: '30px', height: '30px', borderRadius: '50%',
          background: isOpen ? 'rgba(0,228,255,0.15)' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${isOpen ? 'rgba(0,228,255,0.4)' : 'rgba(255,255,255,0.1)'}`,
          color: isOpen ? '#00E4FF' : 'rgba(255,255,255,0.25)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s',
        }}
      >
        {isOpen ? <X size={14} /> : <Plus size={14} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85 }}
            style={{
              position: 'absolute', top: '100%', zIndex: 50,
              background: 'rgba(10, 8, 30, 0.97)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0,228,255,0.25)',
              borderRadius: '14px',
              padding: '0.6rem',
              display: 'flex', gap: '0.35rem',
              boxShadow: '0 12px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05) inset',
            }}
          >
            {BLOCK_TYPES.map(bt => (
              <motion.button
                key={bt.type}
                whileHover={{ y: -3, background: `${bt.color}15` }}
                whileTap={{ scale: 0.92 }}
                onClick={() => onSelect(bt.type)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: bt.color,
                  padding: '0.55rem 0.9rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem',
                  fontSize: '0.7rem', fontWeight: 700,
                  transition: 'background 0.15s',
                }}
              >
                <span style={{ fontSize: '1.3rem' }}>{bt.icon}</span>
                {bt.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MediaPanel({ sec, updateSection, handleFileUpload, uploadingId }) {
  return (
    <div style={{
      width: '270px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px',
      padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.7rem',
      border: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
        <ImageIcon size={12} /> Recursos Multimedia
      </div>
      <DropZone label="Imagen" value={sec.image} onChange={v => updateSection(sec.id, 'image', v)}
        onDrop={file => handleFileUpload(file, sec.id, 'image')}
        uploading={uploadingId === sec.id + 'image'}
        preview={sec.image && <img src={sec.image} alt="preview" style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px' }} onError={e => e.target.style.opacity = 0.2} />}
        compact
      />
      <DropZone label="Video" value={sec.video} onChange={v => updateSection(sec.id, 'video', v)}
        onDrop={file => handleFileUpload(file, sec.id, 'video')}
        uploading={uploadingId === sec.id + 'video'}
        compact
      />
      <DropZone label="Audio" value={sec.audio || ''} onChange={v => updateSection(sec.id, 'audio', v)}
        onDrop={file => handleFileUpload(file, sec.id, 'audio')}
        uploading={uploadingId === sec.id + 'audio'}
        compact
      />
    </div>
  );
}

function DropZone({ label, value, onChange, onDrop, uploading, preview, children, compact }) {
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <div
      onDragOver={e => { e.preventDefault(); e.stopPropagation(); setIsDragOver(true); }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={e => { e.preventDefault(); e.stopPropagation(); setIsDragOver(false); const f = e.dataTransfer.files[0]; if (f) onDrop(f); }}
      style={{
        border: `1px dashed ${isDragOver ? 'rgba(0,255,136,0.5)' : 'rgba(0,255,136,0.2)'}`,
        padding: compact ? '0.5rem' : '0.7rem',
        borderRadius: '10px',
        background: isDragOver ? 'rgba(0,255,136,0.06)' : 'rgba(0,255,136,0.02)',
        display: 'flex', flexDirection: 'column', gap: compact ? '0.35rem' : '0.5rem',
        transition: 'all 0.2s',
      }}
    >
      <input type="text" value={value || ''} onChange={e => onChange(e.target.value)}
        placeholder={`${label} URL o ruta`}
        style={{ ...styles.inlineInput, fontSize: compact ? '0.78rem' : '0.85rem' }}
      />
      <span style={{ fontSize: '0.68rem', color: 'rgba(0,255,136,0.45)', textAlign: 'center', fontWeight: 500 }}>
        {uploading ? '⏳ Subiendo archivo...' : `📎 Arrastra ${label.toLowerCase()} aquí`}
      </span>
      {preview}
      {children}
    </div>
  );
}
