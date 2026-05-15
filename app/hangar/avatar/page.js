'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { User, Shield, Sparkles, Activity, Grid } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AstronautAvatar from '@/components/AstronautAvatar';

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
  
  const [activeCategory, setActiveCategory] = useState('suitColor');
  const [errorStatus, setErrorStatus] = useState('');
  
  const [avatar, setAvatar] = useState({ skinTone: 'light', suitColor: 'white', visorColor: 'gold', accentColor: 'red' });
  const [inventory, setInventory] = useState(['light', 'medium', 'dark', 'white', 'gold', 'red']);
  const [stars, setStars] = useState(0);

  const [confirmItem, setConfirmItem] = useState(null);

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
    if (userData) {
      setAvatar(userData.avatarData || { skinTone: 'light', suitColor: 'white', visorColor: 'gold', accentColor: 'red' });
      const initialInv = userData.inventory || [];
      setInventory([...new Set([...initialInv, 'light', 'medium', 'dark', 'white', 'gold', 'red'])]);
      setStars(userData.progress?.stars || 0);
    }
  }, [user, userData, loading, router]);

  if (loading || !userData) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', color: '#00E4FF' }}>Sincronizando Sistema...</div>;

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

  const categories = [
    { id: 'suitColor', label: 'TRAJE BASE', icon: <Shield size={20} /> },
    { id: 'visorColor', label: 'VISOR CASCO', icon: <Sparkles size={20} /> },
    { id: 'skinTone', label: 'TONO BIO', icon: <User size={20} /> },
    { id: 'accentColor', label: 'DETALLES', icon: <Shield size={20} /> }
  ];

  return (
    <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#000000', fontFamily: 'sans-serif' }}>
      
      {/* 3D Canvas Background (Viewport) */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
         {/* Background gradient behind astronaut */}
         <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(0,228,255,0.05) 0%, transparent 60%)', zIndex: -1 }}></div>
         <AstronautAvatar 
           skinTone={getHexCode('skinTone', avatar.skinTone)}
           suitColor={getHexCode('suitColor', avatar.suitColor)}
           visorColor={getHexCode('visorColor', avatar.visorColor)}
           accentColor={getHexCode('accentColor', avatar.accentColor)}
           animate={true} 
         />
      </div>

      {/* COCKPIT OVERLAY UI - ALIEN DARK CYBERPUNK THEME */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>
        
        {/* Top Arch / Window Frame */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', pointerEvents: 'none' }}>
          {/* Left Arch */}
          <div style={{ width: '30%', height: '100px', backgroundColor: '#070A10', borderBottomRightRadius: '120px', boxShadow: '10px 10px 30px rgba(0, 228, 255, 0.1)', borderRight: '4px solid #00E4FF', borderBottom: '4px solid #00E4FF', display: 'flex', padding: '24px', alignItems: 'flex-start', justifyContent: 'space-between' }}>
             <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FF2A2A', boxShadow: '0 0 10px #FF2A2A' }} className="pulse-anim"></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#00E4FF', boxShadow: '0 0 10px #00E4FF' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#00FF66', opacity: 0.5 }}></div>
             </div>
             {/* Mini Radar */}
             <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #00E4FF', position: 'relative', overflow: 'hidden' }}>
               <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', backgroundColor: 'rgba(0,228,255,0.3)' }}></div>
               <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: '1px', backgroundColor: 'rgba(0,228,255,0.3)' }}></div>
               <div style={{ position: 'absolute', top: '50%', left: '50%', width: '50%', height: '1px', backgroundColor: '#00E4FF', transformOrigin: 'left center', animation: 'spin 4s linear infinite' }}></div>
             </div>
          </div>
          
          {/* Top Center Frame */}
          <div style={{ width: '45%', height: '64px', backgroundColor: '#070A10', borderBottomLeftRadius: '60px', borderBottomRightRadius: '60px', borderBottom: '4px solid #00E4FF', boxShadow: '0 10px 30px rgba(0, 228, 255, 0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
             <div style={{ color: '#00E4FF', fontSize: '20px', fontWeight: 900, letterSpacing: '8px', textTransform: 'uppercase', textShadow: '0 0 15px #00E4FF', fontFamily: '"Courier New", Courier, monospace' }}>
               BIOCUBIERTA // EN LÍNEA
             </div>
          </div>
          
          {/* Right Arch */}
          <div style={{ width: '30%', height: '100px', backgroundColor: '#070A10', borderBottomLeftRadius: '120px', boxShadow: '-10px 10px 30px rgba(0, 228, 255, 0.1)', borderLeft: '4px solid #00E4FF', borderBottom: '4px solid #00E4FF', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '24px' }}>
             {/* Data Blocks */}
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
               {[...Array(6)].map((_, i) => (
                 <div key={i} style={{ width: '16px', height: '6px', backgroundColor: '#00E4FF', opacity: Math.random() > 0.5 ? 1 : 0.3, boxShadow: '0 0 5px #00E4FF' }}></div>
               ))}
             </div>
             <div style={{ width: '40px', height: '40px', borderRadius: '8px', border: '2px solid #00E4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00E4FF', fontWeight: 'bold' }}>
               BIO
             </div>
          </div>
        </div>

        {/* Dashboard Panels (Bottom & Sides) */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', pointerEvents: 'auto' }}>
          
          {/* LEFT PANEL: Stats Screen */}
          <div 
            style={{ width: '28%', height: '420px', backgroundColor: '#070A10', borderTopRightRadius: '60px', boxShadow: '10px -10px 40px rgba(0, 228, 255, 0.15)', borderTop: '4px solid #00E4FF', borderRight: '4px solid #00E4FF', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', transform: 'perspective(1200px) rotateY(15deg)', transformOrigin: 'left bottom', position: 'relative' }}
          >
            {/* Hexagonal decorative pattern */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\\"24\\" height=\\"40\\" viewBox=\\"0 0 24 40\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cpath d=\\"M0 10l12-6.928L24 10v20l-12 6.928L0 30V10z\\" fill=\\"%2300E4FF\\" fill-rule=\\"evenodd\\"%3E%3C/path%3E%3C/svg%3E")' }}></div>
            
            {/* Screen border */}
            <div style={{ width: '100%', height: '75%', backgroundColor: '#010306', borderRadius: '16px', padding: '8px', border: '2px solid #1a2a3a', boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8), 0 0 20px rgba(0, 228, 255, 0.1)', marginBottom: '16px', zIndex: 10 }}>
              {/* Actual Screen */}
              <div style={{ width: '100%', height: '100%', backgroundColor: '#020b14', borderRadius: '12px', border: '1px solid #00E4FF', padding: '20px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                 <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 50%, rgba(0,228,255,0.05) 50%)', backgroundSize: '100% 4px', pointerEvents: 'none' }}></div>
                 
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(0,228,255,0.3)', paddingBottom: '12px', marginBottom: '16px' }}>
                   <Activity size={18} color="#00E4FF" />
                   <h2 style={{ color: '#00E4FF', fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '3px', margin: 0 }}>Parámetros Vitales</h2>
                 </div>
                 
                 <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center' }}>
                   <CockpitStat label="SALUD CADETE" value={100} color="#00FF66" />
                   <CockpitStat label="POLVO ESTELAR (⭐)" value={stars > 1000 ? 100 : (stars/1000)*100} displayValue={stars} color="#FFD700" />
                   <CockpitStat label="INVENTARIO DESBLOQUEADO" value={(inventory.length / 15) * 100} displayValue={inventory.length} color="#B02AFF" />
                 </div>
              </div>
            </div>
            
            {/* Physical Keypad */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', padding: '0 8px 8px 8px', zIndex: 10 }}>
               {[...Array(4)].map((_, i) => (
                 <div key={i} style={{ height: '8px', backgroundColor: '#00E4FF', borderRadius: '2px', opacity: 0.5, boxShadow: '0 0 10px #00E4FF' }}></div>
               ))}
            </div>
          </div>

          {/* CENTER PANEL: Main Controls */}
          <div 
            style={{ width: '44%', height: '280px', backgroundColor: '#070A10', borderTopLeftRadius: '30px', borderTopRightRadius: '30px', boxShadow: '0 -15px 40px rgba(0, 228, 255, 0.1)', borderTop: '4px solid #00E4FF', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', zIndex: 20, transform: 'perspective(1200px) rotateX(25deg)', transformOrigin: 'bottom center', position: 'relative' }}
          >
             <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '200px', height: '4px', backgroundColor: '#00E4FF', boxShadow: '0 0 20px #00E4FF' }}></div>

             {/* Center Screen */}
             <div style={{ width: '90%', height: '80px', backgroundColor: '#010306', borderRadius: '12px', border: '1px solid #1a2a3a', display: 'flex', gap: '8px', padding: '6px', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)' }}>
                {/* CLASE DISPLAY */}
                <div style={{ width: '35%', backgroundColor: '#020b14', borderRadius: '8px', border: '1px solid rgba(0,228,255,0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4px', position: 'relative', overflow: 'hidden' }}>
                   <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 50%, rgba(0,228,255,0.1) 50%)', backgroundSize: '100% 4px' }}></div>
                   <span style={{ fontSize: '10px', color: '#00E4FF', fontWeight: 'bold', letterSpacing: '3px', position: 'relative', zIndex: 10 }}>CADETE</span>
                   <span style={{ fontSize: '18px', fontWeight: 900, color: '#FFFFFF', textTransform: 'uppercase', textShadow: '0 0 10px #00E4FF', position: 'relative', zIndex: 10 }}>{userData.name.substring(0, 8)}</span>
                </div>
                
                {/* CONTROL BOARD */}
                <div style={{ flex: 1, backgroundColor: '#020b14', borderRadius: '8px', border: '1px solid rgba(0,228,255,0.2)', display: 'flex', alignItems: 'center', padding: '8px', gap: '16px', position: 'relative', overflow: 'hidden' }}>
                   {/* Soundwave/Equalizer bars */}
                   <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '40px' }}>
                     {[...Array(8)].map((_, i) => (
                       <div key={i} style={{ width: '6px', backgroundColor: '#00FF66', boxShadow: '0 0 5px #00FF66', height: `${Math.max(20, Math.random() * 100)}%`, animation: `pulse ${1 + Math.random()}s infinite` }}></div>
                     ))}
                   </div>
                   
                   <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                     {/* Data lines */}
                     <div style={{ width: '100%', height: '2px', backgroundColor: '#00E4FF', opacity: 0.5 }}></div>
                     <div style={{ width: '70%', height: '2px', backgroundColor: '#00E4FF', opacity: 0.3 }}></div>
                     <div style={{ width: '90%', height: '2px', backgroundColor: '#FF2A2A', opacity: 0.5 }}></div>
                   </div>

                   {/* Action Buttons */}
                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
                     <div style={{ width: '20px', height: '20px', backgroundColor: '#FF2A2A', borderRadius: '4px', boxShadow: '0 0 10px #FF2A2A' }}></div>
                     <div style={{ width: '20px', height: '20px', backgroundColor: 'transparent', border: '2px solid #00E4FF', borderRadius: '4px' }}></div>
                     <div style={{ width: '20px', height: '20px', backgroundColor: 'transparent', border: '2px solid #00E4FF', borderRadius: '4px' }}></div>
                     <div style={{ width: '20px', height: '20px', backgroundColor: '#00E4FF', borderRadius: '4px', boxShadow: '0 0 10px #00E4FF' }}></div>
                   </div>
                </div>
             </div>

             {/* Main Category Buttons */}
             <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', gap: '12px' }}>
               {categories.map(cat => {
                 const isActive = activeCategory === cat.id;
                 return (
                   <button 
                     key={cat.id}
                     onClick={() => setActiveCategory(cat.id)}
                     style={{ flex: 1, height: '70px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 900, fontSize: '10px', letterSpacing: '1px', transition: 'all 0.2s', border: 'none', cursor: 'pointer', ...isActive ? {
                       backgroundColor: '#00E4FF', color: '#000000', transform: 'translateY(2px)', boxShadow: '0 0 20px rgba(0,228,255,0.6)'
                     } : {
                       backgroundColor: '#0F172A', color: '#00E4FF', borderBottom: '3px solid #00E4FF', borderTop: '1px solid rgba(0,228,255,0.2)', boxShadow: '0 5px 15px rgba(0,0,0,0.5)'
                     }}}
                     onMouseOver={(e) => { if(!isActive) e.currentTarget.style.backgroundColor = '#1E293B'; }}
                     onMouseOut={(e) => { if(!isActive) e.currentTarget.style.backgroundColor = '#0F172A'; }}
                   >
                     {cat.icon}
                     {cat.label}
                   </button>
                 );
               })}
             </div>
          </div>

          {/* RIGHT PANEL: Options Screen */}
          <div 
            style={{ width: '28%', height: '420px', backgroundColor: '#070A10', borderTopLeftRadius: '60px', boxShadow: '-10px -10px 40px rgba(0, 228, 255, 0.15)', borderTop: '4px solid #00E4FF', borderLeft: '4px solid #00E4FF', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', transform: 'perspective(1200px) rotateY(-15deg)', transformOrigin: 'right bottom', position: 'relative' }}
          >
            {/* Screen border */}
            <div style={{ width: '100%', height: '75%', backgroundColor: '#010306', borderRadius: '16px', padding: '8px', border: '2px solid #1a2a3a', boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8), 0 0 20px rgba(0, 228, 255, 0.1)', marginBottom: '16px', zIndex: 10 }}>
              {/* Actual Screen */}
              <div style={{ width: '100%', height: '100%', backgroundColor: '#020b14', borderRadius: '12px', border: '1px solid #00E4FF', padding: '20px', overflowY: 'auto', position: 'relative' }}>
                 <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 50%, rgba(0,228,255,0.05) 50%)', backgroundSize: '100% 4px', pointerEvents: 'none', zIndex: 20 }}></div>
                 
                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,228,255,0.3)', paddingBottom: '12px', marginBottom: '16px', position: 'relative', zIndex: 30 }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                     <Sparkles size={18} color="#00E4FF" />
                     <h2 style={{ color: '#00E4FF', fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '3px', margin: 0 }}>
                       {categories.find(c => c.id === activeCategory)?.label || 'OPCIONES'}
                     </h2>
                   </div>
                 </div>

                 {/* Errors */}
                 {errorStatus && (
                    <div style={{ position: 'relative', zIndex: 30, background: 'rgba(255,42,42,0.2)', border: '1px solid #FF2A2A', color: '#FF2A2A', padding: '8px', borderRadius: '8px', marginBottom: '12px', fontSize: '12px', textAlign: 'center', fontWeight: 'bold' }}>
                      {errorStatus}
                    </div>
                 )}

                 {/* Confirmation Dialog */}
                 {confirmItem ? (
                   <div style={{ position: 'relative', zIndex: 30, display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                      <span style={{ color: '#fff', fontSize: '14px', textAlign: 'center' }}>¿Desbloquear <strong>{confirmItem.item.name}</strong> por {confirmItem.item.price} ⭐?</span>
                      <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                        <button onClick={confirmPurchase} style={{ flex: 1, padding: '10px', backgroundColor: '#00FF66', border: 'none', borderRadius: '8px', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}>CONFIRMAR</button>
                        <button onClick={() => setConfirmItem(null)} style={{ flex: 1, padding: '10px', backgroundColor: 'transparent', border: '1px solid #FF2A2A', borderRadius: '8px', color: '#FF2A2A', fontWeight: 'bold', cursor: 'pointer' }}>CANCELAR</button>
                      </div>
                   </div>
                 ) : (
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', zIndex: 30 }}>
                     <AnimatePresence mode="popLayout">
                       {AVATAR_SHOP[activeCategory]?.map((item, i) => {
                         const isOwned = inventory.includes(item.id);
                         const isEquipped = avatar[activeCategory] === item.id;
                         return (
                           <motion.button
                             initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                             key={item.id}
                             onClick={() => handleEquipOrBuy(activeCategory, item)}
                             style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'all 0.2s', ...isEquipped ? {
                               backgroundColor: 'rgba(0, 228, 255, 0.15)', borderColor: '#00E4FF', color: '#00E4FF', boxShadow: 'inset 0 0 15px rgba(0,228,255,0.2)', transform: 'scale(1.02)'
                             } : {
                               backgroundColor: 'transparent', borderColor: 'rgba(0, 228, 255, 0.2)', color: 'rgba(0, 228, 255, 0.5)'
                             }}}
                             onMouseOver={(e) => { if(!isEquipped) e.currentTarget.style.borderColor = '#00E4FF'; e.currentTarget.style.color = '#fff'; }}
                             onMouseOut={(e) => { if(!isEquipped) e.currentTarget.style.borderColor = 'rgba(0, 228, 255, 0.2)'; e.currentTarget.style.color = 'rgba(0, 228, 255, 0.5)'; }}
                           >
                             <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                               <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: item.color, border: '1px solid rgba(255,255,255,0.5)' }}></div>
                               <span style={{ fontWeight: 900, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase' }}>{item.name}</span>
                             </div>
                             {!isOwned && (
                               <div style={{ fontSize: '10px', color: '#FFD700', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                 <Sparkles size={12} /> {item.price}
                               </div>
                             )}
                           </motion.button>
                         );
                       })}
                     </AnimatePresence>
                   </div>
                 )}
              </div>
            </div>
            
            {/* Back Button inside Cockpit Panel */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 8px 8px 8px', zIndex: 10 }}>
               <Link href="/hangar" style={{ textDecoration: 'none' }}>
                 <div style={{ height: '40px', padding: '0 24px', borderRadius: '8px', backgroundColor: 'transparent', border: '2px solid #FF2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF2A2A', fontWeight: 900, letterSpacing: '2px', fontSize: '12px', cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 42, 42, 0.1)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 42, 42, 0.4)'; }}
                      onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}>
                    &lt; REGRESAR
                 </div>
               </Link>
            </div>
          </div>

        </div>
      </div>
      
      <style>{`
        @keyframes slide { from { background-position: 0 0; } to { background-position: 20px 0; } }
        .pulse-anim { animation: pulse 2s infinite; }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; box-shadow: 0 0 10px #00E4FF; }
          50% { transform: scale(1.1); opacity: 0.7; box-shadow: 0 0 20px #00E4FF; }
          100% { transform: scale(1); opacity: 1; box-shadow: 0 0 10px #00E4FF; }
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0, 228, 255, 0.3); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0, 228, 255, 0.8); }
      `}</style>
    </div>
  );
}

function CockpitStat({ label, value, color, displayValue }) {
  return (
    <div style={{ marginBottom: '4px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(0,228,255,0.7)', fontWeight: 'bold', fontSize: '10px', marginBottom: '6px', letterSpacing: '1px' }}>
        <span>{label}</span>
        <span style={{ color }}>{displayValue !== undefined ? displayValue : `${value}%`}</span>
      </div>
      <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '2px', border: '1px solid rgba(0,228,255,0.2)', overflow: 'hidden' }}>
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: `${value}%` }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ height: '100%', backgroundColor: color, boxShadow: `0 0 10px ${color}` }} 
        />
      </div>
    </div>
  );
}
