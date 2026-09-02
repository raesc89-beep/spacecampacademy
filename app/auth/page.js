'use client';
import { useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter, useSearchParams } from 'next/navigation';
import { Rocket, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Suspense } from 'react';

// ─── JWST Collage Background ─────────────────────────────────────────────────
// Iconic James Webb Space Telescope images — NASA/ESA public domain
const JWST_IMAGES = [
  {
    url: 'https://stsci-opo.org/STScI-01G8GZR8GCKZ0NZDKFG3FMF6P2.png',
    label: 'Carina Nebula'
  },
  {
    url: 'https://stsci-opo.org/STScI-01G8GZS1793JZDY97PSRF41WXN.png',
    label: 'Southern Ring Nebula'
  },
  {
    url: 'https://stsci-opo.org/STScI-01GSZSHVXQ4X8DKM1ZSFZPJ37Q.png',
    label: "Pillars of Creation"
  },
  {
    url: 'https://stsci-opo.org/STScI-01GS9RPCTMZR4MGDB17HGY0ERX.png',
    label: 'Tarantula Nebula'
  },
  {
    url: 'https://stsci-opo.org/STScI-01G8H1K2BCNATEZSKVRN9Z69SR.png',
    label: "Stephan's Quintet"
  },
  {
    url: 'https://stsci-opo.org/STScI-01G8GZQ8BKZMJ38PP0T7E03GJF.png',
    label: 'SMACS Deep Field'
  },
];

function JWSTBackground() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: -1,
      overflow: 'hidden',
      background: '#03050E',
    }}>
      {/* Collage grid */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: '4px',
        opacity: 0.55,
        transform: 'scale(1.08)',
        transformOrigin: 'center',
      }}>
        {JWST_IMAGES.map((img, i) => (
          <div key={i} style={{
            overflow: 'hidden',
            position: 'relative',
          }}>
            <img
              src={img.url}
              alt={img.label}
              loading={i < 2 ? 'eager' : 'lazy'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                filter: 'saturate(1.3) brightness(0.85)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Dark gradient overlay for readability */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(3,5,14,0.72) 0%, rgba(10,5,30,0.60) 40%, rgba(3,5,14,0.78) 100%)',
      }} />

      {/* Frosted glass blur band in the center (behind the card) */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '520px', height: '680px',
        borderRadius: '32px',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        background: 'rgba(3,5,14,0.25)',
        pointerEvents: 'none',
      }} />

      {/* Subtle nebula glow accents */}
      <div style={{
        position: 'absolute', top: '15%', left: '10%',
        width: '300px', height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(90,46,152,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '8%',
        width: '250px', height: '250px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,228,255,0.10) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}


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
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

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
            shipData: { color: 'gray', hull: 'standard', wings: 'basic', engine: 'ion' },
            inventory: ['gray', 'standard', 'basic', 'ion'],
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
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError('Credenciales incorrectas. Por favor, verifica tu correo y contraseña.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Este correo electrónico ya está registrado.');
      } else if (err.code === 'auth/weak-password') {
        setError('La contraseña debe tener al menos 6 caracteres.');
      } else if (err.code === 'auth/unauthorized-domain') {
        setError(`🚨 Error CRÍTICO: El dominio actual no está autorizado en Firebase. Añade el dominio de Vercel en la consola de Firebase Authentication -> Configuración -> Dominios Autorizados.`);
      } else if (err.code === 'auth/network-request-failed') {
        setError(`Sin conexión o CORS bloqueado. Verifica tu internet o las llaves de entorno de Vercel.`);
      } else if (err.code === 'auth/api-key-not-valid. Please pass a valid API key.') {
        setError(`🚨 Error CRÍTICO: Las variables de entorno de Firebase (NEXT_PUBLIC_FIREBASE_API_KEY) no se han configurado en Vercel.`);
      } else {
        setError(`Error [${err.code || 'Desconocido'}]: ${err.message}`);
      }
    }
    
    setLoading(false);
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError('Ingresa tu correo electrónico para restablecer tu contraseña.');
      return;
    }
    setResetLoading(true);
    setError('');
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setError('No existe una cuenta con ese correo electrónico.');
      } else {
        setError('Error enviando el correo. Intenta de nuevo.');
      }
    }
    setResetLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
      <JWSTBackground />
      <motion.div 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card"
        style={{
          width: '100%', maxWidth: '450px',
          display: 'flex', flexDirection: 'column', gap: '2rem',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          background: 'rgba(5, 7, 20, 0.72)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>
          
          {/* Fila de Logos Institucionales Orgánicos (Fase 3.6 Transparencias) */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', padding: '1rem', width: '100%' }}>
             <img src="/assets/amde_logo.png" alt="Agencia Mexicana de Divulgación Espacial" style={{ height: '70px', objectFit: 'contain', filter: 'drop-shadow(0px 0px 10px rgba(255,255,255,0.3))' }} />
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

          {mode === 'login' && (
            <div style={{ textAlign: 'center' }}>
              {resetSent ? (
                <p style={{ color: 'var(--success)', fontSize: '0.9rem' }}>✅ Correo de restablecimiento enviado. Revisa tu bandeja de entrada.</p>
              ) : (
                <button
                  type="button"
                  onClick={handlePasswordReset}
                  disabled={resetLoading}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline', fontFamily: 'inherit' }}
                >
                  {resetLoading ? 'Enviando...' : '¿Olvidaste tu contraseña?'}
                </button>
              )}
            </div>
          )}
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
      {/* JWST Photo Credit */}
      <p style={{
        marginTop: '1.5rem',
        fontSize: '0.72rem',
        color: 'rgba(255,255,255,0.35)',
        textAlign: 'center',
        letterSpacing: '0.03em',
      }}>
        🔭 Imágenes: James Webb Space Telescope · NASA, ESA, CSA, STScI · Dominio Público
      </p>
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
