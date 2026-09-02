'use client';
import Link from 'next/link';
import { LogOut, User, Trophy, Menu, X } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV_HUB_MAP = {
  egypt: { path: '/hub/egypt-astro', name: 'Misiones Egipcias' },
  animales: { path: '/hub/animales', name: 'Animales del Espacio' },
  apollo8: { path: '/hub/apollo8', name: 'Apollo 8' },
  apollo10: { path: '/hub/apollo10', name: 'Apollo 10' },
  apollo11: { path: '/hub/apollo11', name: 'Apollo 11' },
  area51: { path: '/hub/area51', name: 'Area 51' },
  asteroides: { path: '/hub/asteroides-cometas', name: 'Asteroides' },
  bttf: { path: '/hub/bttf', name: 'Volver al Futuro' },
  copernico: { path: '/hub/copernico', name: 'Copernico' },
  davinci: { path: '/hub/davinci', name: 'Da Vinci' },
  exoplanetas: { path: '/hub/exoplanetas', name: 'Exoplanetas' },
  faraday: { path: '/hub/faraday', name: 'Faraday' },
  galileo: { path: '/hub/galileo', name: 'Galileo' },
  interestelar: { path: '/hub/objetos-interestelares', name: 'Obj. Interestelares' },
  interstellar: { path: '/hub/interstellar', name: 'Interstellar' },
  maya: { path: '/hub/maya-astro', name: 'Misiones Mayas' },
  arqueoastronomia_maya: { path: '/hub/maya-astro', name: 'Misiones Mayas' },
  objetos_interestelares: { path: '/hub/objetos-interestelares', name: 'Obj. Interestelares' },
  pioneros: { path: '/hub/pioneros', name: 'Pioneros' },
  rocosos: { path: '/hub/planetas-rocosos', name: 'Planetas Rocosos' },
  viaje_planetas_rocosos: { path: '/hub/planetas-rocosos', name: 'Planetas Rocosos' },
  viaje_planetas_gaseosos: { path: '/hub/solar-system', name: 'Planetas Gaseosos' },
  robots: { path: '/hub/robots-espacio', name: 'Robots' },
  starwars: { path: '/hub/star-wars', name: 'Star Wars' },
  agujeros: { path: '/hub/agujeros-gusano', name: 'Agujeros de Gusano' },
  wormhole: { path: '/hub/agujeros-gusano', name: 'Agujeros de Gusano' },
  stellar: { path: '/hub/stellar-objects', name: 'Obj. Estelares' },
  black_hole: { path: '/hub/stellar-objects', name: 'Obj. Estelares' },
  earth: { path: '/hub/solar-system', name: 'Sistema Solar' },
  mars: { path: '/hub/solar-system', name: 'Sistema Solar' },
  jupiter: { path: '/hub/solar-system', name: 'Sistema Solar' },
  saturn: { path: '/hub/solar-system', name: 'Sistema Solar' },
  venus: { path: '/hub/solar-system', name: 'Sistema Solar' },
  mercury: { path: '/hub/solar-system', name: 'Sistema Solar' },
  neptune: { path: '/hub/solar-system', name: 'Sistema Solar' },
  uranus: { path: '/hub/solar-system', name: 'Sistema Solar' },
  pluto: { path: '/hub/solar-system', name: 'Sistema Solar' },
  sun: { path: '/hub/solar-system', name: 'Sistema Solar' },
  cecilia: { path: '/hub/cecilia-payne', name: 'Cecilia Payne' },
  dinos: { path: '/hub/dinosaurios', name: 'Dinosaurios' },
  marinos: { path: '/hub/reptiles-marinos', name: 'Reptiles Marinos' },
  tesla: { path: '/hub/tesla', name: 'Tesla' },
  sagan: { path: '/hub/carl-sagan', name: 'Carl Sagan' },
  curie: { path: '/hub/marie-curie', name: 'Marie Curie' },
  astro_train: { path: '/hub/astronauts-training', name: 'Entrenamiento' },
  einstein: { path: '/hub/albert-einstein', name: 'Einstein' },
  griegos: { path: '/hub/griegos-ciencia', name: 'Griegos' },
  arrival: { path: '/hub/arrival-ciencia', name: 'Arrival' },
};

const MLinkStyle = {
  textDecoration: 'none',
  color: 'white',
  fontSize: '1.1rem',
  fontWeight: 600,
  padding: '0.9rem 2rem',
  borderRadius: '14px',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.08)',
  width: '100%',
  maxWidth: '320px',
  textAlign: 'center',
  display: 'block',
};

export default function Navbar() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    setMenuOpen(false);
    await signOut(auth);
    router.push('/');
  };

  // Compute back link outside JSX
  let backHref = '/dashboard';
  let backLabel = 'Inicio';
  if (pathname !== '/dashboard') {
    const courseMatch = pathname.match(/^\/(course|quiz)\/([^/]+)/);
    if (courseMatch) {
      const moduleId = courseMatch[2];
      const keys = Object.keys(NAV_HUB_MAP).sort((a, b) => b.length - a.length);
      for (const key of keys) {
        if (moduleId === key || moduleId.startsWith(key + '_') || moduleId.startsWith(key)) {
          backHref = NAV_HUB_MAP[key].path;
          backLabel = NAV_HUB_MAP[key].name;
          break;
        }
      }
    }
  }

  return (
    <>
      <nav style={{
        padding: '0.75rem 1.25rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(4, 6, 14, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 200,
        minHeight: '60px',
        gap: '0.5rem',
      }}>
        {/* Left: Logo + Back */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden', flex: 1, minWidth: 0 }}>
          <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <img src="/assets/amde_logo.png" alt="AMDE Logo" style={{ height: '38px', width: 'auto', objectFit: 'contain' }} />
          </Link>
          {pathname !== '/dashboard' && (
            <Link href={backHref} style={{
              textDecoration: 'none',
              color: 'rgba(255,255,255,0.7)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              border: '1px solid rgba(255,255,255,0.12)',
              padding: '0.35rem 0.8rem',
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.04)',
              fontSize: '0.82rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '160px',
            }}>
              <span>\u2190</span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{backLabel}</span>
            </Link>
          )}
        </div>

        {/* Desktop nav links - hidden on mobile via CSS class */}
        {!loading && user && (
          <div className="navbar-links-desktop">
            <Link href="/profile" style={{
              textDecoration: 'none', color: 'white', display: 'flex',
              alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.75rem',
              borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)',
              fontSize: '0.85rem', fontWeight: 600, whiteSpace: 'nowrap',
            }}>
              <User size={16} />
              <span>{userData?.name?.split(' ')[0] || 'Cadete'}</span>
              {userData?.role === 'admin' && (
                <span style={{ fontSize: '0.65rem', background: 'var(--danger)', padding: '0.15rem 0.4rem', borderRadius: '8px', marginLeft: '0.25rem' }}>Admin</span>
              )}
            </Link>
            <Link href="/profile/logros" style={{
              display: 'flex', alignItems: 'center', gap: '0.3rem',
              textDecoration: 'none', color: 'rgba(255,215,0,0.8)',
              padding: '0.35rem 0.8rem', borderRadius: '20px',
              background: 'rgba(255,215,0,0.05)', border: '1px solid rgba(255,215,0,0.15)',
              fontSize: '0.82rem', fontWeight: 700, whiteSpace: 'nowrap',
            }}>
              <Trophy size={14} /> Logros
            </Link>
            <button onClick={handleLogout} style={{
              background: 'transparent', border: 'none',
              color: 'rgba(255,255,255,0.4)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', fontSize: '0.82rem', padding: '0.35rem 0.5rem',
            }}>
              <LogOut size={16} />
            </button>
          </div>
        )}

        {/* Hamburger button - visible on mobile via CSS class */}
        {!loading && user && (
          <button
            className="navbar-hamburger"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu size={22} />
          </button>
        )}
      </nav>

      {/* Mobile full-screen overlay */}
      {!loading && user && (
        <div
          className={menuOpen ? 'navbar-mobile-menu open' : 'navbar-mobile-menu'}
          style={{ position: 'fixed', zIndex: 9999 }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'absolute', top: '1.25rem', right: '1.25rem',
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '10px', padding: '0.6rem', cursor: 'pointer', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <X size={22} />
          </button>
          <img src="/assets/amde_logo.png" alt="AMDE" style={{ height: '48px', objectFit: 'contain', marginBottom: '0.5rem' }} />
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', textAlign: 'center', marginBottom: '0.5rem' }}>
            {userData?.name || user.email}
          </div>
          <Link href="/dashboard" onClick={() => setMenuOpen(false)} style={MLinkStyle}>
            Estacion Central
          </Link>
          {pathname !== '/dashboard' && (
            <Link href={backHref} onClick={() => setMenuOpen(false)} style={MLinkStyle}>
              \u2190 {backLabel}
            </Link>
          )}
          <Link href="/profile" onClick={() => setMenuOpen(false)} style={MLinkStyle}>
            Mi Perfil
          </Link>
          <Link href="/profile/logros" onClick={() => setMenuOpen(false)} style={{ ...MLinkStyle, color: 'rgba(255,215,0,0.85)' }}>
            Mis Logros
          </Link>
          <button
            onClick={handleLogout}
            style={{
              marginTop: '0.5rem',
              background: 'rgba(255,51,102,0.1)', border: '1px solid rgba(255,51,102,0.25)',
              color: '#FF6680', cursor: 'pointer', borderRadius: '12px',
              padding: '0.85rem 2rem', fontSize: '1rem', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}
          >
            <LogOut size={18} /> Cerrar Sesion
          </button>
        </div>
      )}
    </>
  );
}
