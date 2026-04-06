'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const SCALE_OPTIONS = [
  { value: 1, emoji: '🛸', label: '¡Me perdí!' },
  { value: 2, emoji: '☄️', label: 'Difícil' },
  { value: 3, emoji: '🛰️', label: 'Bien' },
  { value: 4, emoji: '👨‍🚀', label: 'Muy útil' },
  { value: 5, emoji: '🚀', label: '¡Estelar!' },
];

export default function SatisfactionScale({ moduleId, userId }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = async (val) => {
    setSelected(val);
    if (!userId) return; // Si no hay usuario (ej. test), no guardar

    try {
      // Guardar en la colección de evaluaciones para los reportes del admin
      await setDoc(doc(db, 'evaluations', `${userId}_${moduleId}`), {
        userId,
        moduleId,
        rating: val,
        timestamp: serverTimestamp()
      });
      setSubmitted(true);
    } catch (e) {
      console.error("Error guardando evaluación", e);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        style={{ padding: '2rem', textAlign: 'center', background: 'rgba(0,255,136,0.1)', border: '1px solid var(--success)', borderRadius: '20px' }}
      >
        <h3 style={{ margin: 0, color: 'var(--success)' }}>¡Gracias por tu reporte espacial! 📡</h3>
        <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-muted)' }}>Cambiando el rumbo de la academia gracias a ti.</p>
      </motion.div>
    );
  }

  return (
    <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
      <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>¿Qué te pareció esta misión?</h3>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>Tu comando necesita saber tu experiencia para mejorar tu entrenamiento.</p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        {SCALE_OPTIONS.map((opt) => (
          <motion.button
            key={opt.value}
            whileHover={{ scale: 1.1, translateY: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSelect(opt.value)}
            style={{
              background: selected === opt.value ? 'rgba(0,228,255,0.2)' : 'rgba(0,0,0,0.5)',
              border: `2px solid ${selected === opt.value ? 'var(--electric-blue)' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '15px',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              minWidth: '90px',
              transition: 'background 0.3s'
            }}
          >
            <span style={{ fontSize: '2.5rem' }}>{opt.emoji}</span>
            <span style={{ fontSize: '0.8rem', color: selected === opt.value ? 'var(--electric-blue)' : 'var(--text-muted)', fontWeight: 'bold' }}>
              {opt.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
