'use client';
import { useState, useEffect } from 'react';
import {
  HelpCircle, Plus, Save, Trash2, GripVertical, Check, X,
  ChevronDown, ChevronRight, RefreshCw, Search, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';

export default function QuizAdminPage() {
  const [modules, setModules] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState('');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [originalQuiz, setOriginalQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ msg: '', type: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [previewAnswers, setPreviewAnswers] = useState({});

  const showStatus = (msg, type = 'info') => {
    setStatus({ msg, type });
    setTimeout(() => setStatus({ msg: '', type: '' }), 4000);
  };

  // Load all modules
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/course-data');
        const data = await res.json();
        setModules(data);
      } catch (err) {
        showStatus('Error cargando módulos', 'error');
      }
      setLoading(false);
    })();
  }, []);

  // Load quiz for selected module
  const loadQuiz = () => {
    const mod = modules.find(m => m.id === selectedModuleId);
    if (!mod) return;
    const quiz = (mod.quizEs || []).map((q, i) => ({
      ...q,
      _id: `q_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 6)}`,
    }));
    setQuizQuestions(quiz);
    setOriginalQuiz(JSON.parse(JSON.stringify(quiz)));
    setPreviewMode(false);
    setPreviewAnswers({});
    showStatus(`Quiz cargado: ${quiz.length} preguntas`, 'success');
  };

  // Save quiz
  const saveQuiz = async () => {
    setSaving(true);
    try {
      // Strip internal _id before saving
      const cleanQuiz = quizQuestions.map(({ _id, ...rest }) => rest);
      await fetch('/api/course-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_quiz',
          payload: { id: selectedModuleId, quizEs: cleanQuiz }
        })
      });
      setOriginalQuiz(JSON.parse(JSON.stringify(quizQuestions)));
      showStatus('¡Quiz guardado exitosamente!', 'success');
    } catch (e) {
      showStatus('Error al guardar quiz', 'error');
    }
    setSaving(false);
  };

  // CRUD helpers
  const addQuestion = () => {
    setQuizQuestions([...quizQuestions, {
      _id: `q_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      q: '',
      options: ['', '', '', ''],
      a: 0,
    }]);
  };

  const removeQuestion = (id) => {
    if (confirm('¿Eliminar esta pregunta?')) {
      setQuizQuestions(quizQuestions.filter(q => q._id !== id));
    }
  };

  const updateQuestion = (id, field, value) => {
    setQuizQuestions(quizQuestions.map(q => q._id === id ? { ...q, [field]: value } : q));
  };

  const updateOption = (qId, optIndex, value) => {
    setQuizQuestions(quizQuestions.map(q => {
      if (q._id !== qId) return q;
      const newOpts = [...q.options];
      newOpts[optIndex] = value;
      return { ...q, options: newOpts };
    }));
  };

  const setCorrectAnswer = (qId, optIndex) => {
    setQuizQuestions(quizQuestions.map(q => q._id === qId ? { ...q, a: optIndex } : q));
  };

  // Derived
  const hasChanges = JSON.stringify(quizQuestions) !== JSON.stringify(originalQuiz);
  const filteredModules = searchTerm
    ? modules.filter(m => (m.titleEs || m.id).toLowerCase().includes(searchTerm.toLowerCase()))
    : modules;

  const selectedMod = modules.find(m => m.id === selectedModuleId);
  const modQuizCount = selectedMod?.quizEs?.length || 0;

  // Styles
  const inputStyle = {
    background: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.12)',
    color: 'white',
    borderRadius: '8px',
    padding: '0.6rem 1rem',
    width: '100%',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  if (loading && modules.length === 0) {
    return <div style={{ color: 'white', padding: '3rem', textAlign: 'center' }}>Cargando editor de evaluaciones...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1100px', margin: '0 auto' }}>

      {/* HEADER */}
      <header style={{
        background: 'linear-gradient(135deg, rgba(138,43,226,0.15), rgba(0,0,0,0.4))',
        padding: '2rem',
        borderRadius: '16px',
        border: '1px solid rgba(138,43,226,0.3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{
            width: 48, height: 48, borderRadius: '14px',
            background: 'rgba(138,43,226,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(138,43,226,0.3)',
          }}>
            <HelpCircle size={28} color="#8A2BE2" />
          </div>
          <div>
            <h1 style={{ margin: 0, color: '#B388FF', fontSize: '1.8rem' }}>Editor de Evaluaciones</h1>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
              Gestiona las preguntas de quiz de cada módulo
            </p>
          </div>
        </div>

        {/* Module selector */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'stretch' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
            <input
              type="text"
              placeholder="Buscar módulo..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ ...inputStyle, paddingLeft: '2.2rem', fontSize: '0.85rem' }}
            />
          </div>
          <select
            value={selectedModuleId}
            onChange={e => { setSelectedModuleId(e.target.value); setQuizQuestions([]); setOriginalQuiz([]); }}
            style={{ ...inputStyle, flex: 2, cursor: 'pointer' }}
          >
            <option value="">— Selecciona un módulo —</option>
            {filteredModules.map(m => (
              <option key={m.id} value={m.id}>
                {m.titleEs || m.id} ({(m.quizEs || []).length} preguntas)
              </option>
            ))}
          </select>
          <button
            onClick={loadQuiz}
            disabled={!selectedModuleId}
            style={{
              background: selectedModuleId ? '#8A2BE2' : 'rgba(255,255,255,0.08)',
              color: selectedModuleId ? 'white' : 'rgba(255,255,255,0.3)',
              border: 'none',
              borderRadius: '10px',
              padding: '0 1.5rem',
              cursor: selectedModuleId ? 'pointer' : 'not-allowed',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              transition: 'all 0.2s',
            }}
          >
            <HelpCircle size={16} /> Cargar Quiz
          </button>
        </div>
      </header>

      {/* STATUS TOAST */}
      <AnimatePresence>
        {status.msg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              padding: '0.8rem 1.2rem',
              borderRadius: '10px',
              background: status.type === 'success' ? 'rgba(0,255,136,0.12)' : 'rgba(255,50,50,0.12)',
              border: `1px solid ${status.type === 'success' ? 'rgba(0,255,136,0.4)' : 'rgba(255,50,50,0.4)'}`,
              color: 'white',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              fontSize: '0.9rem',
            }}
          >
            <AlertCircle size={16} /> {status.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODE TOGGLE */}
      {quizQuestions.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
              {quizQuestions.length} preguntas
            </span>
            {hasChanges && (
              <span style={{
                background: 'rgba(255,165,0,0.15)',
                color: '#FFA500',
                padding: '0.25rem 0.75rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: 600,
              }}>
                ● Cambios sin guardar
              </span>
            )}
          </div>
          <button
            onClick={() => { setPreviewMode(!previewMode); setPreviewAnswers({}); }}
            style={{
              background: previewMode ? 'rgba(0,255,136,0.15)' : 'rgba(138,43,226,0.15)',
              color: previewMode ? '#00FF88' : '#B388FF',
              border: `1px solid ${previewMode ? 'rgba(0,255,136,0.4)' : 'rgba(138,43,226,0.4)'}`,
              padding: '0.5rem 1.2rem',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.85rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}
          >
            {previewMode ? '✏️ Modo Edición' : '👁️ Vista Previa'}
          </button>
        </div>
      )}

      {/* PREVIEW MODE */}
      {previewMode && quizQuestions.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {quizQuestions.map((q, qi) => (
            <motion.div
              key={q._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: qi * 0.08 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                padding: '1.5rem',
              }}
            >
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'rgba(138,43,226,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#B388FF', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0,
                }}>
                  {qi + 1}
                </div>
                <p style={{ color: 'white', margin: 0, fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.4 }}>
                  {q.q || '(Pregunta vacía)'}
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginLeft: '2.8rem' }}>
                {q.options.map((opt, oi) => {
                  const selected = previewAnswers[q._id] === oi;
                  const revealed = previewAnswers[q._id] !== undefined;
                  const isCorrect = oi === q.a;
                  let bg = 'rgba(255,255,255,0.05)';
                  let borderColor = 'rgba(255,255,255,0.12)';
                  if (revealed && isCorrect) { bg = 'rgba(0,255,136,0.15)'; borderColor = 'rgba(0,255,136,0.5)'; }
                  else if (revealed && selected && !isCorrect) { bg = 'rgba(255,50,50,0.15)'; borderColor = 'rgba(255,50,50,0.5)'; }

                  return (
                    <button
                      key={oi}
                      onClick={() => !revealed && setPreviewAnswers({ ...previewAnswers, [q._id]: oi })}
                      style={{
                        background: bg,
                        border: `1px solid ${borderColor}`,
                        borderRadius: '10px',
                        padding: '0.7rem 1rem',
                        color: 'white',
                        cursor: revealed ? 'default' : 'pointer',
                        textAlign: 'left',
                        fontSize: '0.9rem',
                        display: 'flex', alignItems: 'center', gap: '0.6rem',
                        transition: 'all 0.2s',
                      }}
                    >
                      <span style={{
                        width: 24, height: 24, borderRadius: '50%',
                        background: selected ? (isCorrect ? '#00FF88' : '#FF3232') : 'rgba(255,255,255,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.7rem', fontWeight: 700, flexShrink: 0,
                        color: selected ? '#000' : 'rgba(255,255,255,0.5)',
                      }}>
                        {revealed && isCorrect ? <Check size={14} /> : optionLetters[oi]}
                      </span>
                      {opt || '(Opción vacía)'}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* EDIT MODE */}
      {!previewMode && quizQuestions.length > 0 && (
        <Reorder.Group
          axis="y"
          values={quizQuestions}
          onReorder={setQuizQuestions}
          style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
        >
          {quizQuestions.map((q, qi) => (
            <Reorder.Item key={q._id} value={q} style={{ position: 'relative' }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: qi * 0.05 }}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(138,43,226,0.2)',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  display: 'flex',
                }}
              >
                {/* Drag handle */}
                <div style={{
                  width: '36px',
                  background: 'rgba(138,43,226,0.08)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: '0.5rem', cursor: 'grab', color: 'rgba(255,255,255,0.25)',
                  borderRight: '1px solid rgba(138,43,226,0.15)',
                }}>
                  <GripVertical size={16} />
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'rgba(138,43,226,0.6)' }}>{qi + 1}</span>
                </div>

                {/* Question content */}
                <div style={{ flex: 1, padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {/* Question text */}
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                    <textarea
                      value={q.q}
                      onChange={e => updateQuestion(q._id, 'q', e.target.value)}
                      placeholder="Escribe la pregunta aquí..."
                      rows={2}
                      style={{
                        ...inputStyle,
                        resize: 'vertical',
                        minHeight: '50px',
                        fontSize: '1rem',
                        fontWeight: 600,
                      }}
                    />
                    <button
                      onClick={() => removeQuestion(q._id)}
                      style={{
                        background: 'rgba(255,50,50,0.1)',
                        border: '1px solid rgba(255,50,50,0.25)',
                        color: '#ff5555',
                        borderRadius: '8px',
                        padding: '0.5rem',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                      title="Eliminar pregunta"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Options grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    {q.options.map((opt, oi) => (
                      <div
                        key={oi}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.5rem',
                          background: q.a === oi ? 'rgba(0,255,136,0.08)' : 'transparent',
                          borderRadius: '8px',
                          padding: '0.3rem',
                          border: q.a === oi ? '1px solid rgba(0,255,136,0.3)' : '1px solid transparent',
                          transition: 'all 0.2s',
                        }}
                      >
                        <button
                          onClick={() => setCorrectAnswer(q._id, oi)}
                          style={{
                            width: 28, height: 28, borderRadius: '50%',
                            background: q.a === oi ? '#00FF88' : 'rgba(255,255,255,0.08)',
                            border: q.a === oi ? 'none' : '1px solid rgba(255,255,255,0.2)',
                            color: q.a === oi ? '#000' : 'rgba(255,255,255,0.5)',
                            cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 700, fontSize: '0.75rem', flexShrink: 0,
                            transition: 'all 0.2s',
                          }}
                          title={q.a === oi ? 'Respuesta correcta' : 'Marcar como correcta'}
                        >
                          {q.a === oi ? <Check size={14} /> : optionLetters[oi]}
                        </button>
                        <input
                          type="text"
                          value={opt}
                          onChange={e => updateOption(q._id, oi, e.target.value)}
                          placeholder={`Opción ${optionLetters[oi]}`}
                          style={{ ...inputStyle, padding: '0.45rem 0.7rem', fontSize: '0.88rem' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}

      {/* ADD QUESTION + SAVE BAR */}
      {quizQuestions.length > 0 && !previewMode && (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem 0' }}>
            <button
              onClick={addQuestion}
              style={{
                background: 'rgba(138,43,226,0.1)',
                border: '2px dashed rgba(138,43,226,0.4)',
                color: '#B388FF',
                padding: '0.8rem 2.5rem',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                fontSize: '1rem', fontWeight: 'bold',
                transition: 'all 0.2s',
              }}
            >
              <Plus size={20} /> Añadir Pregunta
            </button>
          </div>

          {/* Sticky save bar */}
          <div style={{
            position: 'sticky', bottom: '1.5rem',
            background: 'rgba(10, 8, 30, 0.92)',
            backdropFilter: 'blur(12px)',
            padding: '1rem 1.5rem',
            borderRadius: '16px',
            border: `1px solid ${hasChanges ? 'rgba(255,165,0,0.5)' : 'rgba(138,43,226,0.3)'}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            boxShadow: '0 -4px 30px rgba(0,0,0,0.5)',
          }}>
            <div style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>
              {quizQuestions.length} preguntas configuradas
              {hasChanges && <span style={{ color: '#FFA500', marginLeft: '0.8rem' }}>● Sin guardar</span>}
            </div>
            <button
              onClick={saveQuiz}
              disabled={saving || !hasChanges}
              style={{
                background: hasChanges ? '#8A2BE2' : 'rgba(255,255,255,0.08)',
                color: hasChanges ? 'white' : 'rgba(255,255,255,0.3)',
                border: 'none',
                padding: '0.7rem 2rem',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: hasChanges ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                boxShadow: hasChanges ? '0 0 20px rgba(138,43,226,0.4)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              {saving ? <RefreshCw size={18} className="spin" /> : <Save size={18} />}
              GUARDAR EVALUACIÓN
            </button>
          </div>
        </>
      )}

      {/* EMPTY STATE */}
      {selectedModuleId && quizQuestions.length === 0 && !loading && (
        <div style={{
          textAlign: 'center', padding: '4rem 2rem',
          background: 'rgba(255,255,255,0.02)',
          borderRadius: '16px',
          border: '1px dashed rgba(138,43,226,0.25)',
        }}>
          <HelpCircle size={48} color="rgba(138,43,226,0.4)" style={{ marginBottom: '1rem' }} />
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.1rem' }}>
            Selecciona un módulo y presiona "Cargar Quiz" para comenzar a editar
          </p>
        </div>
      )}

      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        *:focus { outline: 2px solid rgba(138,43,226,0.5); outline-offset: 2px; }
        select option { background: #1a1a2e; color: white; }
      `}</style>
    </div>
  );
}
