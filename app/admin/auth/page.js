'use client';
import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin/users');
    } catch (err) {
      if (err.code === 'auth/unauthorized-domain') {
        setError('Error crítico: El dominio actual de Vercel no está autorizado en la consola de Firebase.');
      } else if (err.code === 'auth/network-request-failed') {
        setError('Error: Conexión fallida. Revisa las variables de entorno NEXT_PUBLIC de Vercel.');
      } else {
        setError('Credenciales inválidas. Escudo de seguridad activado.');
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020308', padding: '2rem' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ width: '100%', maxWidth: '400px', padding: '3rem 2rem', textAlign: 'center', borderTop: '4px solid var(--electric-blue)' }}>
        <Shield size={64} color="var(--electric-blue)" style={{ margin: '0 auto 1.5rem auto' }} />
        <h2 style={{ margin: '0 0 0.5rem 0', color: 'white' }}>Portal de Autoridad</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>Validación de Alto Mando requerida.</p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input 
            type="email" 
            placeholder="Correo Operativo" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '1rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px', fontSize: '1rem' }}
          />
          <input 
            type="password" 
            placeholder="Código de Acceso" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '1rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px', fontSize: '1rem' }}
          />
          
          {error && <div style={{ color: 'var(--danger)', fontSize: '0.85rem' }}>{error}</div>}

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem', fontWeight: 'bold' }}>
            DESBLOQUEAR TERMINAL
          </button>
        </form>
      </motion.div>
    </div>
  );
}
