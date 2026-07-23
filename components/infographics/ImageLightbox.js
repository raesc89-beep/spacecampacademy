'use client';
import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * ImageLightbox — Componente reutilizable para expandir imágenes en infografías.
 * §15 del Rules Catalog.
 * 
 * Props:
 *   src (string|null) — URL de la imagen a mostrar. null = cerrado.
 *   alt (string) — Texto alternativo para la imagen.
 *   onClose (function) — Callback para cerrar el lightbox.
 */
export default function ImageLightbox({ src, alt = '', onClose }) {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (src) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [src, handleKeyDown]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.92)',
            cursor: 'zoom-out',
          }}
        >
          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.1 }}
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#fff',
              backdropFilter: 'blur(8px)',
              zIndex: 10000,
            }}
            whileHover={{ background: 'rgba(255,255,255,0.25)', scale: 1.1 }}
          >
            <X size={22} />
          </motion.button>

          {/* Image */}
          <motion.img
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
              cursor: 'default',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
