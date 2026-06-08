'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { ACHIEVEMENTS_CATALOG, getAchievementProgress } from '@/lib/achievements';
import { Trophy, Lock, Star, Filter } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

const CATEGORIES = [
  { id: 'all', label: 'Todos', icon: '🌌' },
  { id: 'progreso', label: 'Progreso', icon: '📈' },
  { id: 'insignias', label: 'Insignias', icon: '🎖️' },
  { id: 'quizzes', label: 'Quizzes', icon: '🧠' },
  { id: 'cursos', label: 'Cursos', icon: '📚' },
  { id: 'polvo', label: 'Polvo Estelar', icon: '✨' },
  { id: 'hangar', label: 'Hangar', icon: '🛸' },
  { id: 'especiales', label: 'Especiales', icon: '⚡' },
];

const RARITY_LABELS = {
  common: { label: 'Común', color: '#00FF88' },
  rare: { label: 'Raro', color: '#00E4FF' },
  epic: { label: 'Épico', color: '#B02AFF' },
  legendary: { label: 'Legendario', color: '#FFD700' },
};

export default function LogrosPage() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [filterUnlocked, setFilterUnlocked] = useState('all');

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { if (!loading && !user) router.push('/auth'); }, [user, loading, router]);

  if (!mounted || loading) return (
    <div style={{ minHeight: '100vh', background: '#030712', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFD700', fontSize: '1rem', letterSpacing: '2px', fontFamily: 'monospace' }}>
      Cargando logros...
    </div>
  );

  // userData?.progress contains the user's achievements
  const userAchievements = userData?.progress?.achievements || {};
  const { unlocked, total, percent } = getAchievementProgress(userAchievements);

  const filtered = ACHIEVEMENTS_CATALOG.filter(a => {
    const catMatch = activeCategory === 'all' || a.category === activeCategory;
    const isUnlocked = !!userAchievements[a.id];
    const stateMatch = filterUnlocked === 'all'
      || (filterUnlocked === 'unlocked' && isUnlocked)
      || (filterUnlocked === 'locked' && !isUnlocked);
    return catMatch && stateMatch;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #030712 0%, #0a0e1a 50%, #060812 100%)' }}>
      <Navbar />
      {/* Stars background */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        {[...Array(80)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            borderRadius: '50%',
            background: 'white',
            opacity: 0.1 + Math.random() * 0.3,
          }} />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* ── Header ── */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <button
            onClick={() => router.back()}
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', padding: '0.5rem 1rem', borderRadius: '10px', cursor: 'pointer', fontSize: '0.85rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            ← Regresar
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '2rem' }}>
            <div style={{
              width: 64, height: 64, borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,140,0,0.1))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(255,215,0,0.3)',
              boxShadow: '0 0 30px rgba(255,215,0,0.15)',
              fontSize: '2rem',
            }}>🏆</div>
            <div>
              <h1 style={{ margin: 0, color: 'white', fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
                Galería de Logros
              </h1>
              <p style={{ margin: '0.3rem 0 0', color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
                Desbloquea trofeos completando misiones, cursos y retos especiales
              </p>
            </div>
          </div>

          {/* ── Progress Bar ── */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '20px',
            padding: '1.5rem 2rem',
            border: '1px solid rgba(255,215,0,0.15)',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 700, fontSize: '0.9rem' }}>
                  Progreso Total
                </span>
                <span style={{ color: '#FFD700', fontWeight: 900, fontSize: '1rem' }}>
                  {unlocked} / {total}
                </span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '10px', height: '10px', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #FFD700, #FF8C00)',
                    borderRadius: '10px',
                    boxShadow: '0 0 15px rgba(255,215,0,0.5)',
                  }}
                />
              </div>
              <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem', marginTop: '0.5rem' }}>
                {percent}% completado
              </div>
            </div>

            {/* Rarity breakdown */}
            <div style={{ display: 'flex', gap: '1.2rem', flexShrink: 0 }}>
              {Object.entries(RARITY_LABELS).map(([rarity, info]) => {
                const rarityTotal = ACHIEVEMENTS_CATALOG.filter(a => a.rarity === rarity).length;
                const rarityDone = ACHIEVEMENTS_CATALOG.filter(a => a.rarity === rarity && userAchievements[a.id]).length;
                return (
                  <div key={rarity} style={{ textAlign: 'center' }}>
                    <div style={{ color: info.color, fontWeight: 900, fontSize: '1.1rem' }}>{rarityDone}</div>
                    <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.65rem', marginTop: '2px' }}>{info.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ── Filters ── */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
                border: '1px solid',
                ...(activeCategory === cat.id ? {
                  background: 'rgba(255,215,0,0.15)',
                  borderColor: 'rgba(255,215,0,0.4)',
                  color: '#FFD700',
                } : {
                  background: 'rgba(255,255,255,0.03)',
                  borderColor: 'rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.4)',
                }),
              }}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.4rem' }}>
            {[['all', 'Todos'], ['unlocked', '✅ Desbloqueados'], ['locked', '🔒 Bloqueados']].map(([val, label]) => (
              <button
                key={val}
                onClick={() => setFilterUnlocked(val)}
                style={{
                  padding: '0.4rem 0.8rem',
                  borderRadius: '10px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: '1px solid',
                  transition: 'all 0.2s',
                  ...(filterUnlocked === val ? {
                    background: 'rgba(0,228,255,0.1)',
                    borderColor: 'rgba(0,228,255,0.35)',
                    color: '#00E4FF',
                  } : {
                    background: 'transparent',
                    borderColor: 'rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.35)',
                  }),
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Achievement Grid ── */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((achievement, i) => {
              const isUnlocked = !!userAchievements[achievement.id];
              const unlockedAt = userAchievements[achievement.id]?.unlockedAt;
              const rarity = RARITY_LABELS[achievement.rarity] || RARITY_LABELS.common;

              return (
                <motion.div
                  key={achievement.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={isUnlocked ? { y: -4, scale: 1.02 } : {}}
                  style={{
                    background: isUnlocked
                      ? `linear-gradient(135deg, rgba(255,255,255,0.04), ${achievement.rarityColor}08)`
                      : 'rgba(255,255,255,0.02)',
                    borderRadius: '18px',
                    padding: '1.3rem',
                    border: `1px solid ${isUnlocked ? achievement.rarityColor + '30' : 'rgba(255,255,255,0.06)'}`,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'border-color 0.3s',
                    opacity: isUnlocked ? 1 : 0.55,
                    filter: isUnlocked ? 'none' : 'grayscale(60%)',
                    boxShadow: isUnlocked ? `0 4px 20px ${achievement.rarityColor}10` : 'none',
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    width: '52px', height: '52px',
                    borderRadius: '14px',
                    background: isUnlocked
                      ? `linear-gradient(135deg, ${achievement.rarityColor}30, ${achievement.rarityColor}10)`
                      : 'rgba(255,255,255,0.04)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.7rem',
                    flexShrink: 0,
                    border: `1px solid ${isUnlocked ? achievement.rarityColor + '40' : 'rgba(255,255,255,0.08)'}`,
                    position: 'relative',
                  }}>
                    {isUnlocked ? achievement.icon : <Lock size={20} color="rgba(255,255,255,0.2)" />}
                    {/* Rarity dot */}
                    <div style={{
                      position: 'absolute', bottom: -2, right: -2,
                      width: 10, height: 10,
                      borderRadius: '50%',
                      background: rarity.color,
                      border: '2px solid #0a0e1a',
                    }} />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span style={{ color: 'white', fontWeight: 800, fontSize: '0.95rem', lineHeight: 1.2 }}>
                        {achievement.name}
                      </span>
                      {isUnlocked && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          style={{ fontSize: '0.85rem' }}
                        >✅</motion.span>
                      )}
                    </div>
                    <p style={{ margin: '0 0 0.5rem', color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', lineHeight: 1.5 }}>
                      {achievement.description}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: rarity.color,
                        background: `${rarity.color}15`,
                        padding: '2px 8px',
                        borderRadius: '6px',
                        border: `1px solid ${rarity.color}30`,
                      }}>
                        {rarity.label}
                      </span>
                      {isUnlocked && unlockedAt && (
                        <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.68rem' }}>
                          {new Date(unlockedAt).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Glow for legendary */}
                  {isUnlocked && achievement.rarity === 'legendary' && (
                    <motion.div
                      animate={{ opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        position: 'absolute', inset: 0,
                        background: `radial-gradient(circle at 30% 50%, ${achievement.rarityColor}12, transparent 70%)`,
                        pointerEvents: 'none',
                        borderRadius: '18px',
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,0.3)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <p>No hay logros en esta categoría</p>
          </div>
        )}

      </div>
    </div>
  );
}
