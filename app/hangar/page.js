'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Navbar from '@/components/Navbar';
import Spaceship from '@/components/Spaceship';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Shield, Zap, Sparkles, AlertTriangle, Image as ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SHOP_ITEMS = {
  color: [
    { id: 'gray', name: 'Gris Titanio', price: 0, color: '#a0a0a0' },
    { id: 'crimson', name: 'Rojo Carmesí', price: 5, color: '#ff3366' },
    { id: 'gold', name: 'Oro Estelar', price: 10, color: '#ffd700' },
    { id: 'neon', name: 'Cyber Neón', price: 15, color: '#00ffcc' },
    { id: 'dark', name: 'Materia Oscura', price: 25, color: '#1a1a2e' }
  ],
  hull: [
    { id: 'standard', name: 'Cápsula Base', price: 0 },
    { id: 'sharp', name: 'Caza Interceptor', price: 20 },
    { id: 'heavy', name: 'Crucero Acorazado', price: 35 }
  ],
  wings: [
    { id: 'basic', name: 'Aleta Ligera', price: 0 },
    { id: 'delta', name: 'Alas Delta', price: 25 },
    { id: 'x-wing', name: 'Cruzado X', price: 40 }
  ],
  engine: [
    { id: 'ion', name: 'Ión Estándar', price: 0 },
    { id: 'plasma', name: 'Doble Plasma', price: 30 },
    { id: 'nova', name: 'Explosión Nova', price: 50 }
  ],
  logo: [
    { id: 'none', name: 'Sin Insignias', price: 0 },
    { id: 'nasa', name: 'Sello NASA', price: 15 },
    { id: 'spacecamp', name: 'Academia Espacial', price: 15 },
    { id: 'lockheed', name: 'Armadura Lockheed', price: 25 }
  ]
};

export default function Hangar() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('color');
  const [errorStatus, setErrorStatus] = useState('');
  
  const [ship, setShip] = useState({ color: 'gray', hull: 'standard', wings: 'basic', engine: 'ion', logo: 'none' });
  const [inventory, setInventory] = useState(['gray', 'standard', 'basic', 'ion', 'none']);
  const [stars, setStars] = useState(0);

  const [confirmItem, setConfirmItem] = useState(null);

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
    if (userData) {
      setShip(userData.shipData || { color: 'gray', hull: 'standard', wings: 'basic', engine: 'ion', logo: 'none' });
      setInventory(userData.inventory || ['gray', 'standard', 'basic', 'ion', 'none']);
      setStars(userData.progress?.stars || 0);
    }
  }, [user, userData, loading, router]);

  if (loading || !userData) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Iniciando Sistemas de Ensamblaje...</div>;

  if (userData.role !== 'admin' && !userData.isApproved) {
     return <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>Acceso Denegado. Esperando revisión.</div>;
  }

  const handleEquipOrBuy = async (category, item) => {
    setErrorStatus('');
    const isOwned = inventory.includes(item.id);

    if (isOwned) {
      // Equip instantly
      const newShip = { ...ship, [category]: item.id };
      setShip(newShip);
      await setDoc(doc(db, 'users', user.uid), { shipData: newShip }, { merge: true });
    } else {
      // Show confirmation prompt
      setConfirmItem({ category, item });
    }
  };

  const confirmPurchase = async () => {
    if (!confirmItem) return;
    const { category, item } = confirmItem;

    if (stars >= item.price) {
      const newStars = stars - item.price;
      const newInventory = [...inventory, item.id];
      const newShip = { ...ship, [category]: item.id };
      
      setStars(newStars);
      setInventory(newInventory);
      setShip(newShip);
      
      await setDoc(doc(db, 'users', user.uid), {
        progress: {
          stars: newStars
        },
        inventory: newInventory,
        shipData: newShip
      }, { merge: true });
      setConfirmItem(null);
    } else {
      setConfirmItem(null);
      setErrorStatus(`¡Polvo Estelar insuficiente! Necesitas ${item.price} ⭐`);
      setTimeout(() => setErrorStatus(''), 3000);
    }
  };

  const getRealColor = (colorId) => {
    return SHOP_ITEMS.color.find(c => c.id === colorId)?.color || '#a0a0a0';
  };

  const tabs = [
    { id: 'color', label: 'Pintura', icon: Sparkles },
    { id: 'hull', label: 'Chasis', icon: Shield },
    { id: 'wings', label: 'Alas', icon: Shield },
    { id: 'engine', label: 'Propulsor', icon: Zap },
    { id: 'logo', label: 'Insignias', icon: ImageIcon }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main className="layout-container" style={{ flex: 1, padding: '2rem', display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(350px, 1.2fr)', gap: '2rem' }}>
        
        {/* SHIP VIEWER */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', position: 'relative', overflow: 'hidden', padding: '2rem' }}>
          
          {/* Dynamic background that illuminates depending on ship color */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, ' + getRealColor(ship.color) + '33 0%, rgba(0,0,0,1) 80%)', zIndex: 0 }}></div>
          
          {/* Header Layout for Title and Stars */}
          <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1, marginBottom: '2rem' }}>
             <h2 style={{ margin: 0, color: 'var(--starlight)' }}>Astillero Naval</h2>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,215,0,0.1)', padding: '0.5rem 1rem', borderRadius: '30px', border: '1px solid rgba(255,215,0,0.3)' }}>
               <Star color="var(--gold-star)" size={20} />
               <span style={{ fontWeight: 'bold', color: 'var(--gold-star)', fontSize: '1.2rem' }}>{stars}</span>
             </div>
          </div>

          <motion.div 
            key={JSON.stringify(ship)} // Re-animates completely when parts change
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
            style={{ zIndex: 1, marginTop: '2rem' }}
          >
             <Spaceship 
                size={350} 
                animate={true} 
                color={getRealColor(ship.color)} 
                hull={ship.hull} 
                wings={ship.wings} 
                engine={ship.engine} 
                logo={ship.logo}
             />
          </motion.div>
        </div>

        {/* SHOP TERMINAL */}
        <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
          
          <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', overflowX: 'auto' }}>
            {tabs.map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{ 
                  flex: 1, 
                  background: activeTab === tab.id ? 'var(--electric-blue)' : 'transparent',
                  color: activeTab === tab.id ? 'black' : 'var(--text-muted)',
                  border: 'none',
                  padding: '1rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontWeight: 'bold',
                  transition: 'all 0.3s',
                  minWidth: '110px'
                }}
              >
                <tab.icon size={18} /> {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence>
             {errorStatus && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ background: 'rgba(255,51,102,0.2)', color: 'var(--danger)', padding: '1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--danger)' }}>
                  <AlertTriangle size={18} /> {errorStatus}
                </motion.div>
             )}
          </AnimatePresence>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', flex: 1, paddingRight: '0.5rem' }}>
             {SHOP_ITEMS[activeTab].map(item => {
               const isOwned = inventory.includes(item.id);
               const isEquipped = ship[activeTab] === item.id;
               
               return (
                 <motion.button
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   key={item.id}
                   onClick={() => handleEquipOrBuy(activeTab, item)}
                   style={{
                     display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem',
                     background: isEquipped ? 'rgba(0, 228, 255, 0.15)' : 'rgba(255,255,255,0.05)',
                     border: isEquipped ? '1px solid var(--electric-blue)' : '1px solid rgba(255,255,255,0.1)',
                     borderRadius: '16px', color: 'white', cursor: 'pointer', outline: 'none'
                   }}
                 >
                   <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                     {activeTab === 'color' && (
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: item.color, boxShadow: '0 0 10px ' + item.color }} />
                     )}
                     <div style={{ textAlign: 'left' }}>
                       <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{item.name}</span>
                       <div style={{ fontSize: '0.8rem', color: isEquipped ? 'var(--electric-blue)' : 'var(--text-muted)' }}>
                         {isEquipped ? 'Equipado' : isOwned ? 'En Inventario' : 'Disponible en Tienda'}
                       </div>
                     </div>
                   </div>
                   
                   {!isOwned && (
                     <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,215,0,0.1)', padding: '0.5rem 1rem', borderRadius: '20px', color: 'var(--gold-star)' }}>
                       {item.price} <Star size={16} />
                     </div>
                   )}
                 </motion.button>
               );
             })}
          </div>

          {/* PURCHASE CONFIRMATION OVERLAY */}
          <AnimatePresence>
            {confirmItem && (
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 style={{
                   position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
                   background: 'rgba(2,3,8,0.95)', backdropFilter: 'blur(10px)',
                   display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                   zIndex: 10, borderRadius: '24px', padding: '2rem', textAlign: 'center'
                 }}
               >
                 <Sparkles size={48} color="var(--starlight)" style={{ marginBottom: '1rem' }} />
                 <h2 style={{ color: 'var(--starlight)', margin: '0 0 0.5rem 0' }}>Autorizar Compra</h2>
                 <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                   ¿Deseas invertir polvo estelar en <strong>{confirmItem.item.name}</strong>?
                 </p>
                 <div style={{ fontSize: '2rem', color: 'var(--gold-star)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                   {confirmItem.item.price} <Star size={32} />
                 </div>
                 <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                   <button className="btn-secondary" onClick={() => setConfirmItem(null)} style={{ flex: 1 }}>Cancelar</button>
                   <button className="btn-primary" onClick={confirmPurchase} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                     Comprar <Star size={18} fill="black" />
                   </button>
                 </div>
               </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>
    </div>
  );
}
