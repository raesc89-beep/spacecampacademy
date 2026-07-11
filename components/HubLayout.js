'use client';
import { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

/**
 * Shared hub layout wrapper with consistent back button, background, vignette,
 * and responsive container. Each hub can pass custom decorations as children.
 *
 * @param {Object} props
 * @param {string} props.title - Hub display title
 * @param {string} props.backgroundImage - Background image URL
 * @param {string} [props.backgroundColor='#070B19'] - Fallback bg color
 * @param {string} [props.backPath='/dashboard'] - Back navigation target
 * @param {string} [props.backLabel='Dashboard'] - Back button label
 * @param {React.ReactNode} [props.decorations] - Custom particle/animation overlays
 * @param {React.ReactNode} props.children - Hub content (mission nodes, etc.)
 */
export default function HubLayout({
  title,
  backgroundImage,
  backgroundColor = '#070B19',
  backPath = '/dashboard',
  backLabel = 'Dashboard',
  decorations,
  children,
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor, overflow: 'hidden' }}>
      <main
        style={{
          flex: 1,
          position: 'relative',
          width: '100vw',
          height: '100vh',
          backgroundImage: backgroundImage ? `url('${backgroundImage}')` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Vignette overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.95) 100%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Custom decorations */}
        {decorations}

        {/* Hub title */}
        <div
          style={{
            position: 'absolute',
            top: 'clamp(10px, 2vh, 20px)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 30,
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              color: 'white',
              fontSize: 'clamp(1rem, 2.5vw, 1.6rem)',
              fontWeight: 800,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              textShadow: '0 2px 10px rgba(0,0,0,0.8)',
              background: 'rgba(0,0,0,0.5)',
              padding: '8px 24px',
              borderRadius: '30px',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </h1>
        </div>

        {/* Back button */}
        <Link href={backPath}>
          <div
            style={{
              position: 'absolute',
              top: 'clamp(10px, 2vh, 20px)',
              left: 'clamp(10px, 2vw, 20px)',
              zIndex: 30,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'white',
              cursor: 'pointer',
              background: 'rgba(0,0,0,0.5)',
              padding: '8px 16px',
              borderRadius: '20px',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
              fontSize: '0.85rem',
              fontWeight: 600,
              transition: 'all 0.3s ease',
            }}
          >
            <ChevronLeft size={18} />
            {backLabel}
          </div>
        </Link>

        {/* Mission nodes and other content */}
        {children}
      </main>
    </div>
  );
}
