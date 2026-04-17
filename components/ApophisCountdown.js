'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock } from 'lucide-react';

export default function ApophisCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Viernes 13 de Abril de 2029 a las 21:00 UTC (aproximadamente, hora estándar del acercamiento estimado)
    const targetDate = new Date('2029-04-13T21:00:00Z').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        years: Math.floor(distance / (1000 * 60 * 60 * 24 * 365.25)),
        days: Math.floor((distance % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.1), rgba(153, 27, 27, 0.3))',
        border: '2px solid rgba(239, 68, 68, 0.5)',
        borderRadius: '16px',
        padding: '2rem',
        marginTop: '2rem',
        marginBottom: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        boxShadow: '0 0 30px rgba(220, 38, 38, 0.2)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#f87171', marginBottom: '1rem' }}>
        <AlertTriangle size={32} />
        <h3 style={{ margin: 0, fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Impacto Visual de Apophis</h3>
        <Clock size={32} />
      </div>
      
      <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', maxWidth: '600px', lineHeight: '1.6' }}>
        El asteroide 99942 Apophis pasará a solo 31,000 kilómetros de la Tierra. El momento de máxima aproximación será el viernes 13 de abril de 2029.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
        <TimeBox value={timeLeft.years} label="Años" color="#ef4444" />
        <TimeBox value={timeLeft.days} label="Días" color="#f59e0b" />
        <TimeBox value={timeLeft.hours} label="Horas" color="#3b82f6" />
        <TimeBox value={timeLeft.minutes} label="Minutos" color="#10b981" />
        <TimeBox value={timeLeft.seconds} label="Segundos" color="#8b5cf6" />
      </div>
    </motion.div>
  );
}

function TimeBox({ value, label, color }) {
  return (
    <div style={{
      background: 'rgba(0,0,0,0.6)',
      border: `1px solid ${color}40`,
      borderRadius: '12px',
      padding: '1rem 1.5rem',
      minWidth: '100px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: `inset 0 0 15px ${color}15`
    }}>
      <span style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'monospace', color: color }}>
        {value.toString().padStart(2, '0')}
      </span>
      <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem' }}>
        {label}
      </span>
    </div>
  );
}
