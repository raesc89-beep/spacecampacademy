'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAchievementInfo } from '@/lib/achievements';

/**
 * AchievementToast — Shows an animated Xbox/PlayStation-style achievement notification.
 *
 * Props:
 *   achievements: string[] — array of achievement IDs to show (one by one, queued)
 *   onDismiss: () => void — called after all toasts finish
 */
export default function AchievementToast({ achievements = [], onDismiss }) {
  const [queue, setQueue] = useState([]);
  const [current, setCurrent] = useState(null);

  // Load queue when achievements prop changes
  useEffect(() => {
    if (achievements.length > 0) {
      setQueue(achievements.map(id => getAchievementInfo(id)).filter(Boolean));
    }
  }, [achievements]);

  // Process queue: show next one when queue changes and nothing is displaying
  useEffect(() => {
    if (queue.length > 0 && !current) {
      const [next, ...rest] = queue;
      setCurrent(next);
      setQueue(rest);
    }
  }, [queue, current]);

  const dismiss = () => {
    setCurrent(null);
    if (queue.length === 0 && onDismiss) onDismiss();
  };

  // Auto-dismiss after 5 seconds
  useEffect(() => {
    if (!current) return;
    const t = setTimeout(dismiss, 5000);
    return () => clearTimeout(t);
  }, [current]);

  const rarityGradients = {
    common:    'linear-gradient(135deg, #00FF88, #00CC70)',
    rare:      'linear-gradient(135deg, #00E4FF, #0099CC)',
    epic:      'linear-gradient(135deg, #B02AFF, #7700CC)',
    legendary: 'linear-gradient(135deg, #FFD700, #FF8C00)',
  };

  const rarityGlow = {
    common:    '0 0 40px rgba(0,255,136,0.5)',
    rare:      '0 0 40px rgba(0,228,255,0.5)',
    epic:      '0 0 40px rgba(176,42,255,0.5)',
    legendary: '0 0 60px rgba(255,215,0,0.7)',
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      zIndex: 9999,
      pointerEvents: 'none',
    }}>
      <AnimatePresence mode="wait">
        {current && (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 120, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 120, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            style={{ pointerEvents: 'auto' }}
          >
            {/* Outer glow ring */}
            <div style={{
              borderRadius: '20px',
              padding: '2px',
              background: rarityGradients[current.rarity] || rarityGradients.common,
              boxShadow: rarityGlow[current.rarity] || rarityGlow.common,
            }}>
              {/* Inner card */}
              <div style={{
                background: 'rgba(6, 10, 22, 0.97)',
                borderRadius: '18px',
                padding: '1rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                minWidth: '320px',
                maxWidth: '400px',
                backdropFilter: 'blur(20px)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Animated shimmer background */}
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, delay: 0.3, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '50%', height: '100%',
                    background: `linear-gradient(90deg, transparent, ${current.rarityColor}15, transparent)`,
                    pointerEvents: 'none',
                  }}
                />

                {/* Icon Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 400, damping: 20 }}
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: rarityGradients[current.rarity] || rarityGradients.common,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem',
                    flexShrink: 0,
                    boxShadow: `0 0 20px ${current.rarityColor}60`,
                  }}
                >
                  {current.icon}
                </motion.div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: current.rarityColor,
                      marginBottom: '0.2rem',
                    }}
                  >
                    🏆 ¡Logro Desbloqueado!
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{
                      fontSize: '1rem',
                      fontWeight: 800,
                      color: 'white',
                      lineHeight: 1.2,
                      marginBottom: '0.2rem',
                    }}
                  >
                    {current.name}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{
                      fontSize: '0.78rem',
                      color: 'rgba(255,255,255,0.5)',
                      lineHeight: 1.4,
                    }}
                  >
                    {current.description}
                  </motion.div>
                </div>

                {/* Close button */}
                <button
                  onClick={dismiss}
                  style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.6rem',
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.3)',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    lineHeight: 1,
                    padding: '2px',
                  }}
                >
                  ×
                </button>

                {/* Progress bar (auto-dismiss indicator) */}
                <motion.div
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: 5, ease: 'linear' }}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: '2px',
                    width: '100%',
                    background: rarityGradients[current.rarity],
                    transformOrigin: 'left center',
                    borderRadius: '0 0 18px 18px',
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
