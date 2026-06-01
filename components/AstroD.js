'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { useChat } from '@ai-sdk/react';
import { usePathname } from 'next/navigation';
import { X, Send, Sparkles, AlertTriangle, Loader2, Minus, Maximize2, Minimize2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

export default function AstroD() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [localInput, setLocalInput] = useState('');
  const { user, userData } = useAuth();
  const pathname = usePathname();
  const messagesEndRef = useRef(null);

  const chatBody = useMemo(() => ({
    userContext: userData ? {
      role: userData.role,
      stars: userData?.progress?.stars || 0
    } : null
  }), [userData?.role, userData?.progress?.stars]);

  const { messages, status, error, sendMessage } = useChat({
    api: '/api/chat',
    body: chatBody
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!localInput.trim()) return;
    sendMessage({ role: 'user', text: localInput });
    setLocalInput('');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, error]);

  const presetQuestions = [
    "🚀 ¿Cómo despega un cohete?",
    "🌟 ¿De qué están hechas las estrellas?",
    "🌌 ¿Qué es un agujero negro?",
    "👨‍🚀 ¿Cómo entrenan los astronautas?"
  ];

  const handlePresetClick = (q) => {
    sendMessage({ role: 'user', text: q });
  };

  if (!user || pathname === '/' || pathname === '/auth') return null;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={{
        left: typeof window !== 'undefined' ? -(window.innerWidth - 120) : -1200,
        right: 0,
        top: typeof window !== 'undefined' ? -(window.innerHeight - 120) : -800,
        bottom: 0
      }}
      style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999 }}
      whileDrag={{ scale: 1.02 }}
    >
      
      {/* Botón flotante animado (3D) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, y: [0, -15, 0] }}
            exit={{ scale: 0 }}
            transition={{ 
              scale: { duration: 0.3 }, 
              y: { repeat: Infinity, duration: 4, ease: "easeInOut" } 
            }}
            style={{ 
              position: 'relative',
              filter: 'drop-shadow(0 15px 25px rgba(0, 228, 255, 0.4))'
            }}
          >
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              style={{
                background: 'transparent',
                border: 'none',
                width: '100px',
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: 0,
                outline: 'none'
              }}
            >
              <img src="/astro-d-final.png" alt="Astro-D" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Minimized pill ── */}
      <AnimatePresence>
        {isOpen && isMinimized && (
          <motion.div
            key="pill"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={() => setIsMinimized(false)}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'rgba(10,15,30,0.92)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(0,228,255,0.45)',
              borderRadius: '40px',
              padding: '8px 16px 8px 8px',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0,228,255,0.25)',
              userSelect: 'none',
            }}
          >
            <img src="/astro-d-final.png" alt="Astro-D" style={{ width: 40, height: 40, objectFit: 'contain', filter: 'drop-shadow(0 0 6px rgba(0,228,255,0.7))' }} />
            <div>
              <div style={{ color: 'white', fontSize: 13, fontWeight: 'bold', lineHeight: 1 }}>Astro-D</div>
              <div style={{ color: '#00E4FF', fontSize: 10, letterSpacing: 1 }}>TAP PARA ABRIR</div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); setIsMinimized(false); }}
              style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: 16, padding: '0 0 0 6px', lineHeight: 1 }}
              title="Cerrar Astro-D"
            >×</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ventana de Chat */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              width: isMaximized ? 'min(90vw, 800px)' : 'min(380px, 95vw)',
              height: isMaximized ? '85vh' : 'min(600px, 80vh)',
              maxHeight: '90vh',
              background: 'rgba(10, 15, 30, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 228, 255, 0.4)',
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 15px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(0, 228, 255, 0.1)',
              overflow: 'hidden',
              transition: 'width 0.3s ease, height 0.3s ease'
            }}
          >
            {/* Header */}
            <div style={{ 
              background: 'linear-gradient(90deg, rgba(0,228,255,0.3) 0%, rgba(10,15,30,0) 100%)', 
              padding: '1.2rem', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              borderBottom: '1px solid rgba(0, 228, 255, 0.3)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ 
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  filter: 'drop-shadow(0 0 8px rgba(0, 228, 255, 0.6))'
                }}>
                  <img src="/astro-d-final.png" alt="Astro-D" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'white', textShadow: '0 0 10px var(--electric-blue)' }}>Astro-D</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--electric-blue)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <div style={{ width: 6, height: 6, background: 'var(--success)', borderRadius: '50%', boxShadow: '0 0 5px var(--success)' }} />
                    Sistemas Óptimos
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <button 
                  onClick={() => setIsMaximized(!isMaximized)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s', padding: '0.2rem' }}
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--electric-blue)'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                  title={isMaximized ? "Restaurar" : "Maximizar"}
                >
                  {isMaximized ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                </button>
                {/* Minimize to pill */}
                <button 
                  onClick={() => setIsMinimized(true)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s', padding: '0.2rem' }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#ffd700'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                  title="Minimizar"
                >
                  <Minus size={24} />
                </button>
                {/* Close fully */}
                <button 
                  onClick={() => { setIsOpen(false); setIsMinimized(false); }}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s', padding: '0.2rem' }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#ff4d4d'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                  title="Cerrar"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              
              {/* Saludo Inicial */}
              {messages.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '1rem' }}
                >
                  <Sparkles size={40} style={{ color: 'var(--electric-blue)', marginBottom: '1rem', filter: 'drop-shadow(0 0 10px rgba(0,228,255,0.5))' }} />
                  <h2 style={{ color: 'white', margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>¡Saludos, Comandante!</h2>
                  <p style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>Soy Astro-D. Mi base de datos abarca desde el Big Bang hasta los agujeros negros. ¿Qué enigma del universo quieres resolver hoy?</p>
                  
                  {/* Sugerencias Interactivas */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginTop: '1.5rem' }}>
                    {presetQuestions.map((q, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handlePresetClick(q)}
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          color: 'white',
                          padding: '0.6rem 1rem',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(0, 228, 255, 0.2)'; e.currentTarget.style.borderColor = 'var(--electric-blue)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {/* Chat Log */}
              {messages.map((m) => (
                <motion.div 
                  initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={m.id} 
                  style={{ 
                    alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    background: m.role === 'user' ? 'linear-gradient(135deg, rgba(0,228,255,0.2), rgba(0,100,255,0.2))' : 'rgba(255, 255, 255, 0.05)',
                    border: m.role === 'user' ? '1px solid rgba(0, 228, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '1rem 1.2rem',
                    borderRadius: m.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                    color: 'white',
                    fontSize: '0.95rem',
                    lineHeight: '1.5',
                    boxShadow: m.role === 'user' ? '0 5px 15px rgba(0,228,255,0.1)' : 'none'
                  }}
                >
                  {m.toolInvocations || m.parts?.filter(p => p.type === 'tool-invocation').length > 0 ? (
                    <div style={{ color: 'var(--gold-star)', fontStyle: 'italic', fontSize: '0.8rem' }}>
                      {(m.toolInvocations || m.parts?.filter(p => p.type === 'tool-invocation') || []).map(t => (
                        <div key={t.toolCallId || t.toolInvocation?.toolCallId}>⚙️ Ejecutando sub-rutina: {t.toolName || t.toolInvocation?.toolName}...</div>
                      ))}
                    </div>
                  ) : (
                    (m.content || m.parts?.filter(p => p.type === 'text').map(p => p.text).join('') || m.text || '').split('\\n').map((line, i) => <span key={i}>{line}<br/></span>)
                  )}
                </motion.div>
              ))}
              
              {/* Estados de Carga y Error */}
              {isLoading && (
                <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--electric-blue)', fontSize: '0.85rem', background: 'rgba(0,228,255,0.1)', padding: '0.5rem 1rem', borderRadius: '20px' }}>
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ display: 'flex' }}>
                    <Loader2 size={16} />
                  </motion.div>
                  Procesando telemetría...
                </div>
              )}

              {error && (() => {
                // Try to parse the JSON error body for a user-friendly message
                let friendlyMsg = error.message || 'Error de transmisión.';
                try {
                  const parsed = JSON.parse(error.message);
                  if (parsed.details) friendlyMsg = parsed.details;
                  else if (parsed.error) friendlyMsg = parsed.error;
                } catch (_) {}
                // If it looks like an API key error, show a clean offline message
                const isApiKeyErr = friendlyMsg.includes('API') || friendlyMsg.includes('clave') || friendlyMsg.includes('Vercel');
                return (
                  <div style={{ alignSelf: 'center', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: isApiKeyErr ? '#FFD700' : '#ff4d4d', fontSize: '0.85rem', background: isApiKeyErr ? 'rgba(255,215,0,0.1)' : 'rgba(255,0,0,0.1)', border: `1px solid ${isApiKeyErr ? 'rgba(255,215,0,0.3)' : 'rgba(255,0,0,0.3)'}`, padding: '0.8rem 1rem', borderRadius: '12px', textAlign: 'left', maxWidth: '90%' }}>
                    <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>{isApiKeyErr ? '🛸 Astro-D está en modo offline. Para activarlo en producción, configura GOOGLE_GENERATIVE_AI_API_KEY en las variables de entorno de Vercel.' : friendlyMsg}</span>
                  </div>
                );
              })()}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleCustomSubmit} style={{ 
              padding: '1rem 1.5rem', 
              background: 'rgba(0,0,0,0.4)',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              gap: '0.8rem'
            }}>
              <input
                value={localInput}
                onChange={(e) => setLocalInput(e.target.value)}
                placeholder="Transmite tu mensaje a Astro-D..."
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(0, 228, 255, 0.3)',
                  borderRadius: '20px',
                  padding: '0.8rem 1.2rem',
                  color: 'white',
                  outline: 'none',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.2s',
                  boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.5)'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--electric-blue)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(0, 228, 255, 0.3)'}
              />
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
                disabled={isLoading || !localInput.trim()}
                style={{
                  background: 'var(--electric-blue)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '45px',
                  height: '45px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'black',
                  cursor: isLoading || !localInput.trim() ? 'not-allowed' : 'pointer',
                  opacity: isLoading || !localInput.trim() ? 0.5 : 1,
                  boxShadow: '0 0 15px rgba(0, 228, 255, 0.4)'
                }}
              >
                <Send size={18} />
              </motion.button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
