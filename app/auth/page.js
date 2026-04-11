'use client';
import { useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter, useSearchParams } from 'next/navigation';
import { Rocket, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Suspense } from 'react';

function AuthContent() {
  const router = useRouter();  
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('m') === 'register' ? 'register' : 'login';
  
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (mode === 'register') {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        // Create user profile in Firestore
        await setDoc(doc(db, 'users', cred.user.uid), {
          name,
          email,
          role: 'student',
          isApproved: false, // Bloqueo Administrativo
          progress: {
            stars: 0,
            completedModules: [],
            badges: []
          },
          createdAt: new Date().toISOString()
        });
        router.push('/dashboard');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/dashboard');
      }
    } catch (err) {
      console.error(err);
      setError(err.message.includes('auth/') ? 'Error al iniciar sesión. Verifica tus datos.' : err.message);
    }
    
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <motion.div 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card"
        style={{ width: '100%', maxWidth: '450px', display: 'flex', flexDirection: 'column', gap: '2rem' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>
          
          {/* Fila de Logos Institucionales Orgánicos (Fase 3.6 Transparencias) */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', padding: '1rem', width: '100%' }}>
             <img src="/assets/main_logo.png" alt="Space Camp Academy" style={{ height: '70px', objectFit: 'contain', filter: 'drop-shadow(0px 0px 10px rgba(255,255,255,0.3))' }} />
             <div style={{ width: '2px', height: '40px', background: 'rgba(255,255,255,0.2)' }} />
             <img src="/assets/logo_nasa_auth.png" alt="NASA" style={{ height: '55px', objectFit: 'contain', filter: 'drop-shadow(0px 0px 10px rgba(255,255,255,0.3))' }} />
          </div>
          <h2 style={{ fontSize: '2rem', margin: 0 }}>
            {mode === 'register' ? 'Registro Espacial' : 'Acceso de Cadete'}
          </h2>
          <p>{mode === 'register' ? 'Crea tu perfil de estudiante' : 'Continúa tu misión en el Sistema Solar'}</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(255, 51, 102, 0.2)', color: 'var(--danger)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--danger)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {mode === 'register' && (
             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Nombre de Cadete</label>
                <input 
                  type="text" 
                  required 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{ 
                    padding: '1rem', 
                    borderRadius: '12px', 
                    border: '1px solid rgba(255,255,255,0.2)', 
                    background: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    fontSize: '1rem',
                    fontFamily: 'inherit'
                  }} 
                  placeholder="Ej: Astro Juan"
                />
             </div>
          )}
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Correo Electrónico</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ 
                padding: '1rem', 
                borderRadius: '12px', 
                border: '1px solid rgba(255,255,255,0.2)', 
                background: 'rgba(0,0,0,0.5)',
                color: 'white',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }} 
              placeholder="tu@correo.com"
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Contraseña Secreta</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ 
                padding: '1rem', 
                borderRadius: '12px', 
                border: '1px solid rgba(255,255,255,0.2)', 
                background: 'rgba(0,0,0,0.5)',
                color: 'white',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }} 
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '1rem', width: '100%' }}>
            {loading ? 'Procesando...' : (mode === 'register' ? '¡Unirme a la Academia!' : 'Iniciar Misión')}
          </button>
        </form>

        <div style={{ textAlign: 'center', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ margin: 0, fontSize: '0.95rem' }}>
            {mode === 'register' ? '¿Ya tienes una cuenta?' : '¿Aún no eres cadete?'}
            <button 
              onClick={() => setMode(mode === 'register' ? 'login' : 'register')}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'var(--electric-blue)', 
                fontWeight: 'bold',
                cursor: 'pointer',
                marginLeft: '0.5rem',
                fontFamily: 'inherit',
                fontSize: '1rem'
              }}>
              {mode === 'register' ? 'Inicia Sesión' : 'Regístrate'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a1a', color: 'white' }}>Iniciando Comunicaciones...</div>}>
      <AuthContent />
    </Suspense>
  );
}
