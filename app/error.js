'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Global error boundary caught:', error);
  }, [error]);

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>
      <div style={styles.card}>
        <div style={styles.iconWrapper}>
          <span style={styles.icon}>🚀</span>
        </div>
        <h1 style={styles.title}>¡Houston, tenemos un problema!</h1>
        <p style={styles.subtitle}>
          Algo salió mal durante la misión. No te preocupes, el control de tierra
          está trabajando en ello.
        </p>
        {error?.message && (
          <pre style={styles.codeBlock}>
            <code>{error.message}</code>
          </pre>
        )}
        <div style={styles.buttonGroup}>
          <button onClick={reset} style={styles.primaryButton}>
            🔄 Reintentar
          </button>
          <a href="/" style={styles.secondaryButton}>
            🏠 Volver al inicio
          </a>
        </div>
      </div>
      <div style={styles.stars} />
    </div>
  );
}

const keyframes = `
  @keyframes pulse-glow {
    0%, 100% { transform: scale(1); filter: drop-shadow(0 0 8px rgba(0,229,255,0.4)); }
    50% { transform: scale(1.15); filter: drop-shadow(0 0 20px rgba(0,229,255,0.8)); }
  }
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes twinkle {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }
`;

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'radial-gradient(ellipse at center, #12123a 0%, #0a0a1a 70%)',
    fontFamily: "'Outfit', sans-serif",
    padding: '24px',
    position: 'relative',
    overflow: 'hidden',
  },
  card: {
    background: 'rgba(15, 15, 40, 0.85)',
    border: '1px solid rgba(0, 229, 255, 0.2)',
    borderRadius: '20px',
    padding: '48px 40px',
    maxWidth: '540px',
    width: '100%',
    textAlign: 'center',
    backdropFilter: 'blur(16px)',
    boxShadow: '0 0 60px rgba(0, 229, 255, 0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
    animation: 'fade-in-up 0.6s ease-out',
    position: 'relative',
    zIndex: 1,
  },
  iconWrapper: {
    marginBottom: '20px',
  },
  icon: {
    fontSize: '56px',
    display: 'inline-block',
    animation: 'pulse-glow 2.5s ease-in-out infinite',
  },
  title: {
    color: '#00e5ff',
    fontSize: '1.75rem',
    fontWeight: 700,
    margin: '0 0 12px',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '0.95rem',
    lineHeight: 1.6,
    margin: '0 0 24px',
  },
  codeBlock: {
    background: 'rgba(0, 0, 0, 0.5)',
    border: '1px solid rgba(0, 229, 255, 0.15)',
    borderRadius: '10px',
    padding: '16px',
    margin: '0 0 28px',
    color: '#ff6b6b',
    fontSize: '0.8rem',
    textAlign: 'left',
    overflowX: 'auto',
    fontFamily: "'Fira Code', 'Courier New', monospace",
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  primaryButton: {
    background: 'linear-gradient(135deg, #00e5ff 0%, #007cf0 100%)',
    color: '#0a0a1a',
    border: 'none',
    borderRadius: '12px',
    padding: '12px 28px',
    fontSize: '0.95rem',
    fontWeight: 600,
    fontFamily: "'Outfit', sans-serif",
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 20px rgba(0, 229, 255, 0.3)',
  },
  secondaryButton: {
    background: 'rgba(255, 255, 255, 0.06)',
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '12px',
    padding: '12px 28px',
    fontSize: '0.95rem',
    fontWeight: 500,
    fontFamily: "'Outfit', sans-serif",
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'background 0.2s',
  },
  stars: {
    position: 'absolute',
    inset: 0,
    backgroundImage:
      'radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.6) 0%, transparent 100%), ' +
      'radial-gradient(1px 1px at 30% 65%, rgba(255,255,255,0.4) 0%, transparent 100%), ' +
      'radial-gradient(1.5px 1.5px at 55% 15%, rgba(255,255,255,0.7) 0%, transparent 100%), ' +
      'radial-gradient(1px 1px at 75% 80%, rgba(255,255,255,0.5) 0%, transparent 100%), ' +
      'radial-gradient(1px 1px at 90% 40%, rgba(255,255,255,0.3) 0%, transparent 100%)',
    animation: 'twinkle 4s ease-in-out infinite',
    pointerEvents: 'none',
  },
};
