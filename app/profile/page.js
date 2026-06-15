'use client';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import AstronautAvatar from '@/components/AstronautAvatar';
import {
  UserCircle, MapPin, Heart, Atom, Beaker, Star,
  Rocket, ChevronLeft, Camera, Save, Shield,
  Sparkles, Trophy, BookOpen, Fingerprint
} from 'lucide-react';

// ─── Animated star-field background particles ───
function StarField() {
  const stars = useRef(
    Array.from({ length: 80 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      dur: Math.random() * 4 + 2,
      delay: Math.random() * 4,
    }))
  ).current;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {stars.map((s, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.15, 0.9, 0.15], scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: s.dur, delay: s.delay, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: '#fff',
          }}
        />
      ))}
    </div>
  );
}

// ─── Glassmorphism panel wrapper ───
function GlassPanel({ children, style, delay = 0, borderColor = 'rgba(0,228,255,0.25)' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: 'rgba(10, 15, 30, 0.45)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${borderColor}`,
        borderRadius: '24px',
        padding: 'clamp(1.25rem, 3vw, 2.5rem)',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Corner accents */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 32, height: 32, borderTop: `2px solid ${borderColor}`, borderLeft: `2px solid ${borderColor}`, borderTopLeftRadius: 24 }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 32, height: 32, borderBottom: `2px solid ${borderColor}`, borderRight: `2px solid ${borderColor}`, borderBottomRightRadius: 24 }} />
      {children}
    </motion.div>
  );
}

// ─── Styled input ───
function FormField({ label, icon: Icon, value, onChange, placeholder, type = 'text', multiline = false }) {
  const baseInput = {
    width: '100%',
    padding: '0.75rem 1rem',
    paddingLeft: Icon ? '2.75rem' : '1rem',
    background: 'rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(0, 228, 255, 0.2)',
    borderRadius: multiline ? '16px' : '12px',
    color: '#fff',
    fontSize: '1rem',
    fontFamily: "'Outfit', sans-serif",
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    resize: multiline ? 'vertical' : 'none',
    minHeight: multiline ? '100px' : 'auto',
  };
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600 }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        {Icon && (
          <Icon
            size={18}
            style={{ position: 'absolute', left: '0.85rem', top: multiline ? '0.85rem' : '50%', transform: multiline ? 'none' : 'translateY(-50%)', color: 'rgba(0, 228, 255, 0.5)', pointerEvents: 'none' }}
          />
        )}
        {multiline ? (
          <textarea
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            style={baseInput}
            onFocus={e => { e.target.style.borderColor = '#00E4FF'; e.target.style.boxShadow = '0 0 20px rgba(0,228,255,0.15)'; }}
            onBlur={e => { e.target.style.borderColor = 'rgba(0,228,255,0.2)'; e.target.style.boxShadow = 'none'; }}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            style={baseInput}
            onFocus={e => { e.target.style.borderColor = '#00E4FF'; e.target.style.boxShadow = '0 0 20px rgba(0,228,255,0.15)'; }}
            onBlur={e => { e.target.style.borderColor = 'rgba(0,228,255,0.2)'; e.target.style.boxShadow = 'none'; }}
          />
        )}
      </div>
    </div>
  );
}

// ─── Stat card ───
function StatCard({ icon: Icon, label, value, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${color}44` }}
      style={{
        background: `${color}0D`,
        border: `1px solid ${color}44`,
        borderRadius: '16px',
        padding: '1.25rem',
        textAlign: 'center',
        flex: '1 1 140px',
        minWidth: 130,
      }}
    >
      <Icon size={28} color={color} style={{ marginBottom: '0.5rem', filter: `drop-shadow(0 0 8px ${color})` }} />
      <div style={{ fontSize: '1.6rem', fontWeight: 800, color, fontFamily: 'monospace' }}>{value}</div>
      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.25rem' }}>{label}</div>
    </motion.div>
  );
}

// ─── Toast notification ───
function Toast({ message, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20 }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            background: 'rgba(0, 255, 136, 0.15)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 255, 136, 0.5)',
            borderRadius: '16px',
            padding: '1rem 2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: '0 10px 40px rgba(0, 255, 136, 0.25)',
          }}
        >
          <Shield size={22} color="#00FF88" style={{ filter: 'drop-shadow(0 0 6px #00FF88)' }} />
          <span style={{ color: '#fff', fontWeight: 600, fontSize: '1rem' }}>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ═══════════════════════════════════════════════════════
//  MAIN PROFILE PAGE
// ═══════════════════════════════════════════════════════
export default function CadeteProfilePage() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef(null);

  // Form state
  const [displayName, setDisplayName] = useState('');
  const [callsign, setCallsign] = useState('');
  const [location, setLocation] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [favoriteScientist, setFavoriteScientist] = useState('');
  const [favoriteScience, setFavoriteScience] = useState('');
  const [bio, setBio] = useState('');

  // UI state
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  // Initialize form from userData
  useEffect(() => {
    if (userData?.profile) {
      const p = userData.profile;
      setDisplayName(p.displayName || userData.name || '');
      setCallsign(p.callsign || '');
      setLocation(p.location || '');
      setPhotoURL(p.photoURL || '');
      setHobbies(Array.isArray(p.hobbies) ? p.hobbies.join(', ') : (p.hobbies || ''));
      setFavoriteScientist(p.favoriteScientist || '');
      setFavoriteScience(p.favoriteScience || '');
      setBio(p.bio || '');
    } else if (userData) {
      setDisplayName(userData.name || '');
    }
  }, [userData]);

  // Show toast helper
  const showToast = (msg) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  // Handle photo upload (from file input or drag-drop)
  const processPhotoFile = async (file) => {
    if (!file || !user) return;
    if (!file.type.startsWith('image/')) {
      showToast('❌ Solo se permiten archivos de imagen');
      return;
    }

    // Immediate preview
    const previewUrl = URL.createObjectURL(file);
    setPhotoPreview(previewUrl);

    try {
      setUploading(true);
      const storageRef = ref(storage, `profile-photos/${user.uid}.jpg`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setPhotoURL(url);
      setPhotoPreview(null);
      showToast('📸 Fotografía subida exitosamente');
    } catch (err) {
      console.error('Photo upload error:', err);
      showToast('❌ Error al subir la fotografía');
      setPhotoPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    processPhotoFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    processPhotoFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  // Save profile
  const handleSave = async () => {
    if (!user) return;
    try {
      setSaving(true);
      const hobbiesArray = hobbies
        .split(',')
        .map(h => h.trim())
        .filter(Boolean);

      await setDoc(doc(db, 'users', user.uid), {
        profile: {
          displayName,
          callsign,
          location,
          photoURL,
          hobbies: hobbiesArray,
          favoriteScientist,
          favoriteScience,
          bio,
        }
      }, { merge: true });

      showToast('✅ Perfil guardado en la base de datos estelar');
    } catch (err) {
      console.error('Save error:', err);
      showToast('❌ Error al guardar el perfil');
    } finally {
      setSaving(false);
    }
  };

  // ── Loading state ──
  if (loading || !userData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020308', color: '#00E4FF' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
            style={{ width: 50, height: 50, border: '4px solid #00E4FF', borderRadius: '50%', borderTopColor: 'transparent' }}
          />
          Cargando Perfil de Cadete...
        </div>
      </div>
    );
  }

  // ── Derived data ──
  const avatarData = userData.avatarData || {};
  const progress = userData.progress || {};
  const starsCount = progress.stars || 0;
  const completedModules = progress.completedModules
    ? (typeof progress.completedModules === 'object' ? Object.keys(progress.completedModules).length : progress.completedModules)
    : 0;
  const achievementsCount = progress.achievements
    ? (typeof progress.achievements === 'object' ? Object.keys(progress.achievements).length : progress.achievements)
    : 0;

  const currentPhotoUrl = photoPreview || photoURL;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#020308', overflow: 'hidden' }}>
      <Navbar />
      <Toast message={toastMsg} visible={toastVisible} />

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        style={{ display: 'none' }}
      />

      <main style={{ flex: 1, position: 'relative', padding: 'clamp(1rem, 3vw, 3rem)', display: 'flex', justifyContent: 'center' }}>
        {/* Background */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <StarField />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 20% 20%, rgba(0,228,255,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(153,51,255,0.06) 0%, transparent 50%)',
          }} />
          {/* Nebula accents */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: '10%', right: '5%', width: 300, height: 300, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(153,51,255,0.12) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
          <motion.div
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.25, 0.45, 0.25] }}
            transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
            style={{
              position: 'absolute', bottom: '15%', left: '10%', width: 250, height: 250, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,228,255,0.1) 0%, transparent 70%)',
              filter: 'blur(50px)',
            }}
          />
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 900, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* ── Back button ── */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/dashboard" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', fontWeight: 600, padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)', transition: 'all 0.3s' }}>
              <ChevronLeft size={18} /> Volver a la Estación
            </Link>
          </motion.div>

          {/* ── SECTION 1: Profile Header ── */}
          <GlassPanel delay={0.1} borderColor="rgba(0,228,255,0.3)" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            {/* Decorative ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
              style={{
                position: 'absolute', top: -60, right: -60, width: 180, height: 180,
                border: '1px dashed rgba(0,228,255,0.15)', borderRadius: '50%', pointerEvents: 'none',
              }}
            />

            {/* Section title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', alignSelf: 'flex-start' }}>
              <Fingerprint size={18} color="#00E4FF" />
              <span style={{ fontSize: '0.75rem', color: '#00E4FF', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>
                Expediente del Cadete
              </span>
            </div>

            {/* Photo + Name row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', width: '100%' }}>
              {/* Photo circle — click or drag-and-drop */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                style={{
                  width: 130, height: 130, borderRadius: '50%', cursor: 'pointer',
                  background: currentPhotoUrl
                    ? `url(${currentPhotoUrl}) center / cover no-repeat`
                    : 'linear-gradient(135deg, rgba(0,228,255,0.15), rgba(153,51,255,0.15))',
                  border: isDragging 
                    ? '3px solid rgba(0,255,136,0.8)' 
                    : '3px solid rgba(0, 228, 255, 0.5)',
                  boxShadow: isDragging 
                    ? '0 0 40px rgba(0,255,136,0.4), inset 0 0 30px rgba(0,255,136,0.15)'
                    : '0 0 30px rgba(0,228,255,0.2), inset 0 0 20px rgba(0,0,0,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', flexShrink: 0,
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
              >
                {!currentPhotoUrl && !isDragging && <UserCircle size={56} color="rgba(0,228,255,0.4)" />}
                {isDragging && <Camera size={40} color="#00FF88" style={{ filter: 'drop-shadow(0 0 10px #00FF88)' }} />}
                {/* Camera overlay */}
                {!isDragging && (
                  <div style={{
                    position: 'absolute', inset: 0, borderRadius: '50%',
                    background: 'rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.3rem',
                    opacity: 0, transition: 'opacity 0.3s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.opacity = 1}
                    onMouseLeave={e => e.currentTarget.style.opacity = 0}
                  >
                    <Camera size={24} color="#00E4FF" />
                    <span style={{ fontSize: '0.6rem', color: '#00E4FF', textAlign: 'center', lineHeight: 1.2 }}>Click o<br/>arrastra</span>
                  </div>
                )}
                {uploading && (
                  <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      style={{ width: 30, height: 30, border: '3px solid #00E4FF', borderTopColor: 'transparent', borderRadius: '50%' }} />
                  </div>
                )}
                {/* Orbital ring around photo */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
                  style={{
                    position: 'absolute', inset: -8, border: '1px dashed rgba(0,228,255,0.25)',
                    borderRadius: '50%', pointerEvents: 'none',
                  }}
                />
              </motion.div>

              {/* Name fields */}
              <div style={{ flex: 1, minWidth: 220 }}>
                <FormField label="Nombre Completo" icon={UserCircle} value={displayName} onChange={setDisplayName} placeholder="Tu nombre de cadete" />
                <FormField label="Apodo de Cadete (Callsign)" icon={Shield} value={callsign} onChange={setCallsign} placeholder='Ej: "Cometa Veloz"' />
                <FormField label="Lugar de Residencia" icon={MapPin} value={location} onChange={setLocation} placeholder="¿Desde dónde orbitas?" />
              </div>
            </div>
          </GlassPanel>

          {/* ── SECTION 2: About Me ── */}
          <GlassPanel delay={0.25} borderColor="rgba(153,51,255,0.3)">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Sparkles size={18} color="#9933FF" />
              <span style={{ fontSize: '0.75rem', color: '#9933FF', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>
                Sobre Mí
              </span>
            </div>

            <FormField label="Bio — Breve Descripción" icon={BookOpen} value={bio} onChange={setBio} placeholder="Cuéntanos sobre ti, cadete..." multiline />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <FormField label="Hobbies (separados por coma)" icon={Heart} value={hobbies} onChange={setHobbies} placeholder="Astronomía, LEGO, Robótica..." />
              <FormField label="Científico Favorito" icon={Atom} value={favoriteScientist} onChange={setFavoriteScientist} placeholder="Carl Sagan, Marie Curie..." />
              <FormField label="Ciencia Favorita" icon={Beaker} value={favoriteScience} onChange={setFavoriteScience} placeholder="Astrofísica, Biología..." />
            </div>
          </GlassPanel>

          {/* ── SECTION 3: Mi Equipo ── */}
          <GlassPanel delay={0.4} borderColor="rgba(255,215,0,0.25)">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Rocket size={18} color="#FFD700" />
              <span style={{ fontSize: '0.75rem', color: '#FFD700', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>
                Mi Equipo
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              {/* Mi Astronauta */}
              <Link href="/hangar/avatar" style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: '0 8px 35px rgba(0,228,255,0.3), inset 0 0 25px rgba(0,228,255,0.15)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: 'rgba(0, 228, 255, 0.06)',
                    border: '1px solid rgba(0,228,255,0.3)',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div style={{
                    width: 80, height: 80, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,228,255,0.08)', borderRadius: '16px',
                    border: '1px solid rgba(0,228,255,0.2)',
                  }}>
                    <AstronautAvatar
                      skinTone={avatarData.skinTone || '#fcd9b8'}
                      suitColor={avatarData.suitColor || '#ffffff'}
                      visorColor={avatarData.visorColor || '#00e4ff'}
                      accentColor={avatarData.accentColor || '#ff3366'}
                      size={65}
                      animate={false}
                    />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', margin: 0 }}>Mi Astronauta</h3>
                    <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', margin: '0.25rem 0 0', lineHeight: 1.4 }}>
                      Personaliza tu traje, visor e insignias
                    </p>
                    <span style={{ fontSize: '0.7rem', color: '#00E4FF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Ir al Hangar →
                    </span>
                  </div>
                </motion.div>
              </Link>

              {/* Mi Nave */}
              <Link href="/hangar/nave" style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: '0 8px 35px rgba(153,51,255,0.3), inset 0 0 25px rgba(153,51,255,0.15)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: 'rgba(153, 51, 255, 0.06)',
                    border: '1px solid rgba(153,51,255,0.3)',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div style={{
                    width: 80, height: 80, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(153,51,255,0.08)', borderRadius: '16px',
                    border: '1px solid rgba(153,51,255,0.2)',
                  }}>
                    <Rocket size={40} color="#9933FF" style={{ filter: 'drop-shadow(0 0 8px #9933FF)' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', margin: 0 }}>Mi Nave</h3>
                    <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', margin: '0.25rem 0 0', lineHeight: 1.4 }}>
                      Mejora propulsores, escudos y pintura
                    </p>
                    <span style={{ fontSize: '0.7rem', color: '#9933FF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Ir al Astillero →
                    </span>
                  </div>
                </motion.div>
              </Link>
            </div>
          </GlassPanel>

          {/* ── SECTION 4: Estadísticas ── */}
          <GlassPanel delay={0.55} borderColor="rgba(0,255,136,0.25)">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Trophy size={18} color="#00FF88" />
              <span style={{ fontSize: '0.75rem', color: '#00FF88', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>
                Estadísticas
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <StatCard icon={Star} label="Polvo Estelar" value={starsCount.toLocaleString()} color="#FFD700" delay={0.6} />
              <StatCard icon={BookOpen} label="Módulos Completados" value={completedModules} color="#00E4FF" delay={0.7} />
              <StatCard icon={Trophy} label="Logros Desbloqueados" value={achievementsCount} color="#00FF88" delay={0.8} />
            </div>
          </GlassPanel>

          {/* ── Save button ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            style={{ display: 'flex', justifyContent: 'center', padding: '0.5rem 0 2rem' }}
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(0,228,255,0.4), 0 0 80px rgba(153,51,255,0.2)' }}
              whileTap={{ scale: 0.96 }}
              onClick={handleSave}
              disabled={saving}
              style={{
                background: 'linear-gradient(135deg, #00E4FF 0%, #9933FF 100%)',
                color: '#fff',
                border: 'none',
                padding: '1rem 3rem',
                fontSize: '1.1rem',
                fontWeight: 700,
                borderRadius: '50px',
                cursor: saving ? 'wait' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontFamily: "'Outfit', sans-serif",
                boxShadow: '0 4px 25px rgba(0,228,255,0.3)',
                opacity: saving ? 0.7 : 1,
                transition: 'opacity 0.3s',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              {saving ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                    style={{ width: 20, height: 20, border: '3px solid #fff', borderTopColor: 'transparent', borderRadius: '50%' }} />
                  Guardando...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Guardar Perfil
                </>
              )}
            </motion.button>
          </motion.div>

        </div>
      </main>

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        input::placeholder, textarea::placeholder {
          color: rgba(255,255,255,0.25);
        }
        input:focus, textarea:focus {
          border-color: #00E4FF !important;
          box-shadow: 0 0 20px rgba(0,228,255,0.15) !important;
        }
        @media (max-width: 600px) {
          .profile-photo-row { flex-direction: column; align-items: center; }
        }
      `}</style>
    </div>
  );
}
