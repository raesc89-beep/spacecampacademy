'use client';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, onSnapshot, collection, getDocs } from 'firebase/firestore';
import { Activity, Users, Radio, CheckCircle, Save } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboardPage() {
  const [liveConfig, setLiveConfig] = useState({ active: false, youtubeId: '', title: '' });
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  
  const [stats, setStats] = useState({ users: 0, completions: 0 });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "system", "live_config"), (docRef) => {
      if (docRef.exists()) {
        setLiveConfig(docRef.data());
      }
    });

    const fetchStats = async () => {
      try {
        const usersSnap = await getDocs(collection(db, "users"));
        setStats({ users: usersSnap.size, completions: 0 }); // Simplificado para demo
      } catch (err) { }
    };
    fetchStats();

    return () => unsub();
  }, []);

  const handleSaveLiveConfig = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaveStatus('');
    try {
      await setDoc(doc(db, 'system', 'live_config'), {
        ...liveConfig,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      setSaveStatus('¡Transmisión Actualizada en toda la red!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (err) {
      console.error(err);
      setSaveStatus('Error guardando en la Base de Datos.');
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--electric-blue)', margin: 0, display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Activity size={36} /> Comando Central
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Bienvenido al cerebro de Space Camp Academy. Administra datos en tiempo real.</p>
      </div>

      {/* Tarjetas de Métricas Rápidas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid var(--starlight)' }}>
          <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
            <Users size={28} color="var(--starlight)" />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Total Cadetes Registrados</p>
            <h2 style={{ margin: 0, fontSize: '2rem' }}>{stats.users}</h2>
          </div>
        </div>
      </div>

      {/* Control de Transmisión en Vivo (Tarea 9) */}
      <div className="glass-card" style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: liveConfig.active ? 'var(--success)' : 'var(--text-muted)' }}>
          <Radio size={24} className={liveConfig.active ? 'pulse-anim' : ''} />
          Panel de Emisión Satelital (YouTube)
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Configura aquí el ID del video de YouTube. El cambio se reflejará instantáneamente en todas las pantallas de los estudiantes que estén dentro del Centro de Comunicaciones.</p>

        <form onSubmit={handleSaveLiveConfig} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
             <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', cursor: 'pointer' }}>
               <span style={{ fontWeight: 'bold' }}>Estatus de Transmisión</span>
               <select 
                 value={liveConfig.active} 
                 onChange={(e) => setLiveConfig({...liveConfig, active: e.target.value === 'true'})}
                 style={{ padding: '0.8rem', background: 'rgba(0,0,0,0.5)', border: liveConfig.active ? '1px solid var(--success)' : '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '8px', cursor: 'pointer' }}
               >
                 <option value={false}>Apagado (Standby Mode)</option>
                 <option value={true}>Transmisión EN VIVO Activa</option>
               </select>
             </label>

             <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
               <span style={{ fontWeight: 'bold' }}>ID del Video de YouTube</span>
               <input 
                 type="text" 
                 placeholder="Ejemplo: dQw4w9WgXcQ"
                 value={liveConfig.youtubeId}
                 onChange={(e) => setLiveConfig({...liveConfig, youtubeId: e.target.value})}
                 style={{ padding: '0.8rem', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '8px' }}
               />
               <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Extrae solo el código después de "v=" del enlace.</span>
             </label>
          </div>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
             <span style={{ fontWeight: 'bold' }}>Título de la Misión (Opcional)</span>
             <input 
               type="text" 
               placeholder="Ejemplo: Despegue Artemis III - Transmisión Oficial"
               value={liveConfig.title}
               onChange={(e) => setLiveConfig({...liveConfig, title: e.target.value})}
               style={{ padding: '0.8rem', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '8px' }}
             />
          </label>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
             <button type="submit" disabled={loading} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--electric-blue)', color: 'black' }}>
               {loading ? 'Transmitiendo...' : <><Save size={20} /> Actualizar Emisión Global</>}
             </button>
             {saveStatus && (
               <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
                 <CheckCircle size={18} /> {saveStatus}
               </motion.span>
             )}
          </div>
        </form>
      </div>

    </div>
  );
}
