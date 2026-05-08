'use client';
import { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Shield, Star, CheckCircle, Globe, Lock } from 'lucide-react';
import { Suspense } from 'react';

const PLANS = [
  {
    id: 'standard',
    name: 'Acceso Completo',
    price: '29.99',
    currency: 'USD',
    priceEUR: '€27.99 EUR',
    description: 'Acceso total a todas las misiones, cursos y herramientas de la academia.',
    features: [
      'Acceso a todos los módulos espaciales',
      'Misiones interactivas y minijuegos',
      'Seguimiento de progreso y medallas',
      'Astro-D, tu tutor IA personal',
      'Transmisiones en vivo de misiones NASA',
      'Acceso de por vida — un solo pago',
    ],
    badge: 'Más Popular',
    color: 'var(--electric-blue)',
    glow: 'rgba(0, 228, 255, 0.3)',
  },
];

function PagoContent() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('idle'); // idle | processing | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  // Si ya está aprobado, redirigir al dashboard
  useEffect(() => {
    if (!loading && userData?.isApproved) {
      router.push('/dashboard');
    }
    if (!loading && !user) {
      router.push('/auth?m=register');
    }
  }, [loading, userData, user, router]);

  const handleCreateOrder = async () => {
    setStatus('processing');
    try {
      const res = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.uid, currency: selectedCurrency }),
      });
      const data = await res.json();
      if (!data.orderID) throw new Error('No se recibió ID de orden');
      return data.orderID;
    } catch (err) {
      setStatus('error');
      setErrorMessage('Error al conectar con PayPal. Intenta de nuevo.');
      throw err;
    }
  };

  const handleApprove = async (data) => {
    setStatus('processing');
    try {
      const res = await fetch('/api/paypal/capture-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderID: data.orderID, userId: user.uid }),
      });
      const result = await res.json();

      if (result.success) {
        setStatus('success');
        setTimeout(() => router.push('/dashboard?activated=true'), 2500);
      } else {
        throw new Error(result.error || 'Pago no confirmado');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('El pago fue procesado pero hubo un error activando tu acceso. Contacta soporte con tu ID de transacción de PayPal.');
    }
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--electric-blue)' }}>
      Verificando credenciales...
    </div>
  );

  const plan = PLANS[0];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top, #050b1f 0%, #020308 60%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background stars effect */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(1px 1px at 20% 30%, white 0%, transparent 100%), radial-gradient(1px 1px at 80% 10%, white 0%, transparent 100%), radial-gradient(1px 1px at 50% 80%, white 0%, transparent 100%)', opacity: 0.3 }} />

      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative', zIndex: 1 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <Rocket size={32} color="var(--electric-blue)" />
          <h1 style={{ margin: 0, fontSize: '2.5rem', background: 'linear-gradient(90deg, var(--electric-blue), #b026ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Space Camp Academy
          </h1>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', margin: 0 }}>
          Activa tu membresía y comienza tu viaje interestelar
        </p>
        {userData && (
          <p style={{ color: 'var(--electric-blue)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
            Bienvenido, <strong>{userData.name}</strong> — Un solo paso más para el despegue 🚀
          </p>
        )}
      </motion.div>

      {/* Card de pago */}
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              background: 'rgba(0, 255, 136, 0.1)',
              border: '2px solid var(--success)',
              borderRadius: '24px',
              padding: '4rem',
              textAlign: 'center',
              maxWidth: '480px',
              width: '100%',
            }}
          >
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: 2, duration: 0.4 }}>
              <CheckCircle size={64} color="var(--success)" style={{ margin: '0 auto 1.5rem' }} />
            </motion.div>
            <h2 style={{ color: 'var(--success)', fontSize: '2rem' }}>¡Pago Confirmado!</h2>
            <p style={{ color: 'var(--text-muted)' }}>Tu acceso ha sido activado. Redirigiendo a la academia...</p>
          </motion.div>
        ) : (
          <motion.div
            key="payment"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${plan.glow}`,
              borderRadius: '24px',
              padding: '2.5rem',
              maxWidth: '520px',
              width: '100%',
              boxShadow: `0 0 60px ${plan.glow}`,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Badge */}
            <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: plan.color, color: 'black', padding: '0.3rem 1.2rem', borderRadius: '30px', fontWeight: 'bold', fontSize: '0.85rem' }}>
              {plan.badge}
            </div>

            {/* Plan info */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.8rem' }}>{plan.name}</h2>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '3rem', fontWeight: 'bold', color: plan.color }}>
                  ${plan.price}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>USD / {plan.priceEUR}</span>
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', marginTop: '0.3rem' }}>
                <Lock size={14} /> Pago único — Acceso de por vida
              </span>
            </div>

            {/* Features */}
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {plan.features.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', color: 'var(--text-muted)' }}>
                  <Star size={14} color={plan.color} fill={plan.color} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* Currency selector */}
            <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
              {['USD', 'EUR'].map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCurrency(c)}
                  style={{
                    padding: '0.4rem 1rem',
                    borderRadius: '20px',
                    border: `1px solid ${selectedCurrency === c ? plan.color : 'rgba(255,255,255,0.2)'}`,
                    background: selectedCurrency === c ? `${plan.glow}` : 'transparent',
                    color: selectedCurrency === c ? plan.color : 'var(--text-muted)',
                    cursor: 'pointer',
                    fontWeight: selectedCurrency === c ? 'bold' : 'normal',
                    display: 'flex', alignItems: 'center', gap: '0.3rem'
                  }}
                >
                  <Globe size={14} /> {c}
                </button>
              ))}
            </div>

            {/* Error message */}
            {status === 'error' && (
              <div style={{ background: 'rgba(255,51,102,0.15)', border: '1px solid var(--danger)', borderRadius: '10px', padding: '1rem', marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--danger)' }}>
                ⚠️ {errorMessage}
              </div>
            )}

            {/* PayPal Buttons */}
            {status === 'processing' ? (
              <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--electric-blue)' }}>
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} style={{ display: 'inline-block', marginBottom: '1rem' }}>
                  <Rocket size={32} />
                </motion.div>
                <p>Procesando tu pago de forma segura...</p>
              </div>
            ) : (
              <PayPalScriptProvider options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                currency: selectedCurrency,
                intent: 'capture',
              }}>
                <PayPalButtons
                  style={{ layout: 'vertical', shape: 'pill', label: 'pay', color: 'blue' }}
                  forceReRender={[selectedCurrency]}
                  createOrder={handleCreateOrder}
                  onApprove={handleApprove}
                  onError={(err) => {
                    console.error('[PayPal Button Error]', err);
                    setStatus('error');
                    setErrorMessage('Error en PayPal. Por favor intenta de nuevo o contacta soporte.');
                  }}
                  onCancel={() => setStatus('idle')}
                />
              </PayPalScriptProvider>
            )}

            {/* Security badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              <Shield size={14} />
              <span>Pago 100% seguro procesado por PayPal · Sin datos de tarjeta almacenados</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PagoPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando...</div>}>
      <PagoContent />
    </Suspense>
  );
}
