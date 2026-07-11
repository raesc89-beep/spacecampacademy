'use client';
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

/**
 * Reusable mission node component for hub pages.
 * Renders an interactive, animated circular button for navigating to a course module.
 * 
 * @param {Object} props
 * @param {Object} props.mod - Module data { id, title, color, icon, link?, coords? }
 * @param {number} props.idx - Node index (for z-index stacking)
 * @param {boolean} props.isCompleted - Whether the module is completed
 * @param {string} [props.linkPrefix='/course/'] - Base path for module links
 */
export default function HubMissionNode({ mod, idx = 0, isCompleted = false, linkPrefix = '/course/' }) {
  const [hovered, setHovered] = useState(false);
  const link = mod.link || `${linkPrefix}${mod.id}`;

  return (
    <Link href={link} passHref>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'absolute',
          left: mod.coords?.left || '50%',
          top: mod.coords?.top || '50%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          zIndex: hovered ? 50 : 10 + idx,
        }}
      >
        <motion.div
          animate={{
            y: [0, -8, 0],
            scale: hovered ? 1.15 : 1,
          }}
          transition={{
            y: { repeat: Infinity, duration: 4 + (idx % 3), ease: 'easeInOut', delay: idx * 0.3 },
            scale: { duration: 0.2 },
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.6rem',
          }}
        >
          {/* Icon circle */}
          <div
            style={{
              position: 'relative',
              width: 'clamp(80px, 10vw, 120px)',
              height: 'clamp(80px, 10vw, 120px)',
              borderRadius: '50%',
              boxShadow: hovered
                ? `0 0 40px ${mod.color}ff, inset 0 0 20px ${mod.color}aa`
                : `0 0 20px ${mod.color}88`,
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 70%)',
                maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 70%)',
                overflow: 'hidden',
              }}
            >
              <img
                src={mod.icon || mod.badgeIcon}
                alt={mod.title || mod.titleEs}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: hovered ? 'scale(1.1)' : 'scale(1)',
                  transition: 'transform 0.5s ease',
                }}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                inset: '-2px',
                borderRadius: '50%',
                border: `2px solid ${hovered ? 'white' : mod.color + '55'}`,
                opacity: hovered ? 0.8 : 0.3,
                transition: 'all 0.3s ease',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Title label */}
          <div
            style={{
              color: 'white',
              textAlign: 'center',
              textShadow: `0 2px 8px ${mod.color}, 0 4px 16px rgba(0,0,0,0.9)`,
              background: 'rgba(0,0,0,0.65)',
              padding: '4px 14px',
              borderRadius: '20px',
              backdropFilter: 'blur(6px)',
              border: `1px solid ${hovered ? mod.color : mod.color + '44'}`,
              transition: 'all 0.3s ease',
              maxWidth: 'clamp(100px, 15vw, 180px)',
            }}
          >
            <div
              style={{
                fontSize: 'clamp(0.6rem, 0.9vw, 0.8rem)',
                color: mod.color,
                fontWeight: 700,
                letterSpacing: '1px',
              }}
            >
              {mod.title || mod.titleEs}
            </div>
          </div>

          {/* Completion badge */}
          {isCompleted && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              style={{
                position: 'absolute',
                top: -8,
                right: -8,
                background: '#FFD700',
                borderRadius: '50%',
                padding: '4px',
                boxShadow: '0 0 10px #FFD700',
                zIndex: 10,
              }}
            >
              <CheckCircle size={16} color="black" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </Link>
  );
}
