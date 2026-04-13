'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Navbar from '@/components/Navbar';
import AstronautAvatar from '@/components/AstronautAvatar';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Shield, Sparkles, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AVATAR_SHOP = {
  skinTone: [
    { id: 'light', name: 'Alba', price: 0, color: '#fcd9b8' },
    { id: 'medium', name: 'Horizonte', price: 0, color: '#d08c5c' },
    { id: 'dark', name: 'Eclipse', price: 0, color: '#68402A' },
    { id: 'alien-green', name: 'Alien Verde', price: 100, color: '#7FFF00' },
    { id: 'nebula', name: 'Nebulosa Púrpura', price: 200, color: '#8A2BE2' }
  ],
  suitColor: [
    { id: 'white', name: 'Blanco Estándar', price: 0, color: '#ffffff' },
    { id: 'orange', name: 'Naranja NASA', price: 50, color: '#ff6600' },
    { id: 'carbon', name: 'Fibra de Carbono', price: 150, color: '#333333' },
    { id: 'plasma', name: 'Plasma Brillante', price: 300, color: '#00ffff' }
  ],
  visorColor: [
    { id: 'gold', name: 'Vidrio Dorado', price: 0, color: '#FFD700' },
    { id: 'blue', name: 'Cristal Cuántico', price: 100, color: '#00e4ff' },
    { id: 'red', name: 'Rubí Marciano', price: 250, color: '#ff0033' },
    { id: 'void', name: 'Vacío Oscuro', price: 400, color: '#000000' }
  ],
  accentColor: [
    { id: 'red', name: 'Bordes Rojos', price: 0, color: '#ff3366' },
    { id: 'yellow', name: 'Bordes Amarillos', price: 25, color: '#FFD700' },
    { id: 'green', name: 'Bordes Tóxicos', price: 100, color: '#00FF00' }
  ]
};

export default function AvatarHangar() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState('suitColor');
  const [errorStatus, setErrorStatus] = useState('');
  
  const [avatar, setAvatar] = useState({ skinTone: 'light', suitColor: 'white', visorColor: 'gold', accentColor: 'red' });
  const [inventory, setInventory] = useState(['light', 'medium', 'dark', 'white', 'gold', 'red']);
  const [stars, setStars] = useState(0);

  const [confirmItem, setConfirmItem] = useState(null);

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
    if (userData) {
      setAvatar(userData.avatarData || { skinTone: 'light', suitColor: 'white', visorColor: 'gold', accentColor: 'red' });
      // Fusionamos el inventario asumiendo que los básicos siempre están.
      const initialInv = userData.inventory || [];
      setInventory([...new Set([...initialInv, 'light', 'medium', 'dark', 'white', 'gold', 'red'])]);
      setStars(userData.progress?.stars || 0);
    }
  }, [user, userData, loading, router]);

  if (loading || !userData) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Vistiendo Traje Espacial...</div>;

  const handleEquipOrBuy = async (category, item) => {
    setErrorStatus('');
    const isOwned = inventory.includes(item.id);

    if (isOwned) {
      const newAvatar = { ...avatar, [category]: item.id };
      setAvatar(newAvatar);
      await setDoc(doc(db, 'users', user.uid), { avatarData: newAvatar }, { merge: true });
    } else {
      setConfirmItem({ category, item });
    }
  };

  const confirmPurchase = async () => {
    if (!confirmItem) return;
    const { category, item } = confirmItem;

    if (stars >= item.price) {
      const newStars = stars - item.price;
      const newInventory = [...inventory, item.id];
      const newAvatar = { ...avatar, [category]: item.id };
      
      setStars(newStars);
      setInventory(newInventory);
      setAvatar(newAvatar);
      
      await setDoc(doc(db, 'users', user.uid), {
        progress: {
          stars: newStars
        },
        inventory: newInventory,
        avatarData: newAvatar
      }, { merge: true });
      setConfirmItem(null);
    } else {
      setConfirmItem(null);
      setErrorStatus(`¡Polvo Estelar insuficiente! Requieres ${item.price} ⭐`);
      setTimeout(() => setErrorStatus(''), 3000);
    }
  };

  const getHexCode = (category, id) => {
    return AVATAR_SHOP[category].find(i => i.id === id)?.color || '#fff';
  };

  const tabs = [
    { id: 'suitColor', label: 'Traje Base', icon: Shield },
    { id: 'visorColor', label: 'Visor Casco', icon: Sparkles },
    { id: 'skinTone', label: 'Tono Biológico', icon: User },
    { id: 'accentColor', label: 'Detalles (Botas/Guantes)', icon: Shield }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main className="layout-container" style={{ flex: 1, padding: '2rem', display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(350px, 1.2fr)', gap: '2rem' }}>
        
        {/* AVATAR VIEWER */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', position: 'relative', overflow: 'hidden', padding: '2rem' }}>
          
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, #001f3f 0%, #000 80%)', zIndex: 0 }}></div>
          
          <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1, marginBottom: '2rem' }}>
             <Link href="/hangar" className="btn-secondary" style={{ padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ChevronLeft size={16} /> Volver a Naves
             </Link>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,215,0,0.1)', padding: '0.5rem 1rem', borderRadius: '30px', border: '1px solid rgba(255,215,0,0.3)' }}>
               <Sparkles size={16} color="var(--gold-star)" />
               <span style={{ fontWeight: 'bold', color: 'var(--gold-star)' }}>{stars} Polvo</span>
             </div>
          </div>

          <motion.div 
            style={{ position: 'relative', zIndex: 1, marginTop: '2rem' }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring' }}
          >
            <AstronautAvatar 
              skinTone={getHexCode('skinTone', avatar.skinTone)}
              suitColor={getHexCode('suitColor', avatar.suitColor)}
              visorColor={getHexCode('visorColor', avatar.visorColor)}
              accentColor={getHexCode('accentColor', avatar.accentColor)}
              animate={true} 
            />
          </motion.div>
          
          <div style={{ zIndex: 1, marginTop: 'auto', textAlign: 'center', paddingTop: '2rem' }}>
            <h3 style={{ margin: 0, color: 'var(--starlight)' }}>Cadete {userData.name}</h3>
            <p style={{ color: 'var(--text-muted)' }}>Módulo de Biometría y Trajes</p>
          </div>
        </div>

        {/* SHOP INTERFACE */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
           <div style={{ display: 'flex', overflowX: 'auto', gap: '0.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
             {tabs.map(tab => {
               const Icon = tab.icon;
               const isActive = activeTab === tab.id;
               return (
                 <button 
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id)}
                   style={{
                     background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                     border: `1px solid ${isActive ? 'var(--electric-blue)' : 'rgba(255,255,255,0.05)'}`,
                     color: isActive ? 'var(--electric-blue)' : 'var(--text-muted)',
                     padding: '0.8rem 1rem',
                     borderRadius: '12px',
                     display: 'flex',
                     alignItems: 'center',
                     gap: '0.5rem',
                     cursor: 'pointer',
                     whiteSpace: 'nowrap',
                     transition: 'all 0.2s'
                   }}
                 >
                   <Icon size={16} /> {tab.label}
                 </button>
               );
             })}
           </div>

           <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem', alignContent: 'start' }}>
              <AnimatePresence mode="popLayout">
                {AVATAR_SHOP[activeTab].map((item) => {
                  const isOwned = inventory.includes(item.id);
                  const isEquipped = avatar[activeTab] === item.id;
                  
                  return (
                    <motion.div 
                      key={item.id}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="glass-card"
                      style={{
                        padding: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem',
                        cursor: 'pointer',
                        background: isEquipped ? 'rgba(0, 228, 255, 0.1)' : 'var(--bg-card)',
                        borderColor: isEquipped ? 'var(--electric-blue)' : 'rgba(255,255,255,0.1)',
                        transform: isEquipped ? 'translateY(-5px)' : 'none',
                        transition: 'all 0.2s'
                      }}
                      onClick={() => handleEquipOrBuy(activeTab, item)}
                    >
                      <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: item.color, border: '2px solid rgba(255,255,255,0.2)' }}></div>
                      
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{item.name}</div>
                        
                        {isEquipped ? (
                           <span style={{ background: 'var(--electric-blue)', color: 'black', padding: '0.2rem 0.5rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold' }}>Equipado</span>
                        ) : isOwned ? (
                           <span style={{ color: 'var(--success)', fontSize: '0.8rem', fontWeight: 'bold' }}>En Propiedad</span>
                        ) : (
                           <span style={{ color: 'var(--gold-star)', fontSize: '0.9rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                             {item.price} ⭐
                           </span>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
           </div>
           
           {errorStatus && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'rgba(255,0,0,0.2)', color: 'var(--error)', padding: '1rem', borderRadius: '8px', textAlign: 'center', marginTop: '1rem' }}>
                {errorStatus}
              </motion.div>
           )}
        </div>
      </main>

      {/* COMPRA MODAL */}
      <AnimatePresence>
        {confirmItem && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
          >
            <motion.div 
               initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
               className="glass-card" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
               <h3 style={{ margin: '0 0 1rem 0' }}>Autorización de Consumo</h3>
               <p>Estás a punto de forjar <strong>{confirmItem.item.name}</strong> por {confirmItem.item.price} unidades de Polvo Estelar.</p>
               
               <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                 <button onClick={() => setConfirmItem(null)} className="btn-secondary" style={{ flex: 1 }}>Cancelar</button>
                 <button onClick={confirmPurchase} className="btn-primary" style={{ flex: 1, background: 'var(--gold-star)', color: 'black' }}>Confirmar Petición</button>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
