'use client';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import { db } from '@/lib/firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Radio, Users, MessageSquare, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LiveTransmissionsCenter() {
  const { user, loading } = useAuth();
  const [streamData, setStreamData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    // Escucha en tiempo real si el Director cambia el Link de la transmisión en la Base de Datos
    const unsub = onSnapshot(doc(db, "system", "live_config"), (docRef) => {
      if (docRef.exists()) {
        setStreamData(docRef.data());
      } else {
        setStreamData({ active: false, youtubeId: "", title: "Sin transmisiones activas" });
      }
      setIsFetching(false);
    });

    return () => unsub();
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#020308' }}>
      <Navbar />
      
      <main className="layout-container" style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Encabezado del Mando de Comunicaciones */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
          <div>
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: 0, fontSize: '2.5rem', color: 'var(--electric-blue)' }}>
              <Radio size={36} className={streamData?.active ? 'pulse-anim' : ''} color={streamData?.active ? 'var(--success)' : 'var(--text-muted)'} />
              Centro de Comunicaciones
            </h1>
            <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 0 0' }}>Estación Receptora de Transmisiones Oficiales</p>
          </div>
          
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: streamData?.active ? 'var(--success)' : 'var(--text-muted)' }}>
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: streamData?.active ? 'var(--success)' : 'var(--text-muted)' }} />
              {streamData?.active ? 'SEÑAL EN VIVO' : 'SIN SEÑAL'}
            </div>
          </div>
        </header>

        {isFetching ? (
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Buscando señal satelital...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '2rem', flex: 1 }}>
            
            {/* Reproductor de Video */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="glass-card" style={{ padding: 0, overflow: 'hidden', flex: 1, minHeight: '500px', display: 'flex', flexDirection: 'column', border: streamData?.active ? '1px solid rgba(0, 255, 136, 0.4)' : '1px solid rgba(255,255,255,0.05)' }}>
                {streamData?.active && streamData?.youtubeId ? (
                   <iframe 
                      width="100%" 
                      height="100%" 
                      src={`https://www.youtube.com/embed/${streamData.youtubeId}?autoplay=1`} 
                      title="Space Camp Live"
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      style={{ flex: 1, border: 'none' }}
                   ></iframe>
                ) : (
                   <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', background: 'rgba(0,0,0,0.5)' }}>
                     <AlertCircle size={64} color="var(--text-muted)" opacity={0.3} />
                     <h2 style={{ color: 'var(--text-muted)', margin: 0 }}>El Director no está transmitiendo actualmente</h2>
                     <p style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', maxWidth: '400px' }}>Mantente atento a los anuncios oficiales de tu comando central. Las emisiones espaciales aparecerán automáticamente en esta pantalla.</p>
                   </div>
                )}
                
                {/* Metadatos del Stream */}
                <div style={{ background: 'rgba(0,0,0,0.8)', padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <h2 style={{ margin: 0, color: 'var(--starlight)' }}>{streamData?.title || 'Esperando Transmisión...'}</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>{streamData?.active ? 'Transmisión Segura | Sistema Encriptado de Space Camp Academy' : 'Standby Mode'}</p>
                </div>
              </div>
            </section>

            {/* Panel Lateral (Chat / Notas) */}
            <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
               <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                 <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 1rem 0', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--electric-blue)' }}>
                   <MessageSquare size={20} /> Base de Comentarios
                 </h3>
                 <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
                   La terminal de comunicación escrita estará disponible durante el próximo simulacro en vivo.
                 </div>
               </div>

               <div className="glass-card" style={{ background: 'rgba(255, 215, 0, 0.05)', borderColor: 'rgba(255, 215, 0, 0.2)' }}>
                  <h4 style={{ color: 'var(--gold-star)', margin: '0 0 0.5rem 0' }}>Protocolo R-1</h4>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', margin: 0 }}>Recuerda portar tus audífonos espaciales y evitar distracciones terrenales durante la emisión de tu comando.</p>
               </div>
            </aside>
            
          </div>
        )}
      </main>

      <style jsx global>{`
        .pulse-anim {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
