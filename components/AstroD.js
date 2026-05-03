'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from 'ai/react';
import { Bot, X, Send, Rocket, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function AstroD() {
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useAuth();
  const messagesEndRef = useRef(null);

  // Pasamos contexto invisible a través del body
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/astro-d',
    body: {
      userContext: userData ? {
        role: userData.role,
        stars: userData?.progress?.stars || 0
      } : null
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999 }}>
      
      {/* Botón flotante */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          style={{
            background: 'var(--electric-blue)',
            color: 'black',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0, 228, 255, 0.4)',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Bot size={32} />
        </button>
      )}

      {/* Ventana de Chat */}
      {isOpen && (
        <div style={{
          width: '350px',
          height: '500px',
          background: 'rgba(10, 15, 30, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--electric-blue)',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{ 
            background: 'linear-gradient(90deg, rgba(0,228,255,0.2) 0%, transparent 100%)', 
            padding: '1rem', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            borderBottom: '1px solid rgba(0, 228, 255, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ 
                background: 'var(--electric-blue)', 
                color: 'black', 
                padding: '0.4rem', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Rocket size={18} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--electric-blue)' }}>Astro-D</h3>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Tu droide tutor personal</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem' }}>
                <Sparkles size={32} style={{ color: 'var(--electric-blue)', marginBottom: '1rem' }} />
                <p>¡Hola Comandante! Soy Astro-D.</p>
                <p style={{ fontSize: '0.8rem' }}>¿Qué sector del universo vamos a explorar hoy?</p>
              </div>
            )}
            
            {messages.map((m) => (
              <div key={m.id} style={{ 
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                background: m.role === 'user' ? 'rgba(0, 228, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                border: m.role === 'user' ? '1px solid rgba(0, 228, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0.8rem 1rem',
                borderRadius: m.role === 'user' ? '16px 16px 0 16px' : '16px 16px 16px 0',
                color: 'white',
                fontSize: '0.9rem',
                lineHeight: '1.4'
              }}>
                {/* Herramientas llamadas por el Agente */}
                {m.toolInvocations ? (
                  <div style={{ color: 'var(--gold-star)', fontStyle: 'italic', fontSize: '0.8rem' }}>
                    {m.toolInvocations.map(t => (
                      <div key={t.toolCallId}>⚙️ Ejecutando sistema: {t.toolName}...</div>
                    ))}
                  </div>
                ) : (
                  m.content.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)
                )}
              </div>
            ))}
            
            {isLoading && (
              <div style={{ alignSelf: 'flex-start', color: 'var(--electric-blue)', fontSize: '0.8rem' }}>
                Astro-D está procesando telemetría...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} style={{ 
            padding: '1rem', 
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            gap: '0.5rem'
          }}>
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Pregunta sobre astronomía..."
              style={{
                flex: 1,
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '20px',
                padding: '0.5rem 1rem',
                color: 'white',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              style={{
                background: 'var(--electric-blue)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'black',
                cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
                opacity: isLoading || !input.trim() ? 0.5 : 1
              }}
            >
              <Send size={16} />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
