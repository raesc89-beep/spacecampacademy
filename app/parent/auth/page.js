'use client';
import { useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Users } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ParentAuth() {
  const router = useRouter();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (mode === 'register') {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', cred.user.uid), {
          email,
          role: 'parent',
          linkedStudents: [] // Emails of children
        });
        router.push('/parent/dashboard');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/parent/dashboard');
      }
    } catch (err) {
      setError("Error de autenticación. Revisa tus credenciales.");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <motion.div 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card"
        style={{ width: '100%', maxWidth: '450px', background: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-block', padding: '1rem', background: 'rgba(0,0,0,0.5)', borderRadius: '50%', marginBottom: '1rem' }}>
            <Users size={40} color="var(--starlight)" />
          </div>
          <h2 style={{ fontSize: '1.8rem' }}>Portal para Padres</h2>
          <p style={{ color: 'var(--text-muted)' }}>Sigue el progreso de tus pequeños astronautas.</p>
        </div>

        {error && <div style={{ color: 'var(--danger)', padding: '1rem', background: 'rgba(255,0,0,0.1)', borderRadius: '8px', marginBottom: '1rem' }}>{error}</div>}

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            value={email} onChange={e => setEmail(e.target.value)}
            style={{ padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: 'white' }}
            required
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password} onChange={e => setPassword(e.target.value)}
            style={{ padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: 'white' }}
            required
          />
          <button type="submit" className="btn-secondary" style={{ marginTop: '1rem', borderColor: 'var(--starlight)', color: 'var(--starlight)' }} disabled={loading}>
            {loading ? 'Procesando...' : (mode === 'login' ? 'Ingresar' : 'Registrarse')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textDecoration: 'underline' }}>
            {mode === 'login' ? 'Crear cuenta de padre/madre' : 'Volver al Inicio de Sesión'}
          </button>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
          <Link href="/" style={{ color: 'var(--text-muted)' }}>Volver a la Academia</Link>
        </div>
      </motion.div>
    </div>
  );
}
