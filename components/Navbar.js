'use client';
import Link from 'next/link';
import { Rocket, LogOut, User, Trophy } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import AnimatedLogos from './AnimatedLogos';

export default function Navbar() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <nav style={{ 
      padding: '1rem 2rem', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      background: 'rgba(4, 6, 14, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', textDecoration: 'none', color: 'white' }}>
          <img src="/assets/amde_logo.png" alt="AMDE Logo" style={{ height: '45px', width: 'auto', objectFit: 'contain', background: 'transparent' }} />
        </Link>
        {pathname !== '/dashboard' && (() => {
          // Smart back navigation: route to the correct hub when inside a course/quiz
          const NAV_HUB_MAP = {
            egypt: { path: '/hub/egypt-astro', name: 'Misiones Egipcias' },
            animales: { path: '/hub/animales', name: 'Animales del Espacio' },
            apollo8: { path: '/hub/apollo8', name: 'Apollo 8' },
            apollo10: { path: '/hub/apollo10', name: 'Apollo 10' },
            apollo11: { path: '/hub/apollo11', name: 'Apollo 11' },
            area51: { path: '/hub/area51', name: 'Área 51' },
            asteroides: { path: '/hub/asteroides-cometas', name: 'Asteroides' },
            bttf: { path: '/hub/bttf', name: 'Volver al Futuro' },
            copernico: { path: '/hub/copernico', name: 'Copérnico' },
            davinci: { path: '/hub/davinci', name: 'Da Vinci' },
            exoplanetas: { path: '/hub/exoplanetas', name: 'Exoplanetas' },
            faraday: { path: '/hub/faraday', name: 'Faraday' },
            galileo: { path: '/hub/galileo', name: 'Galileo' },
            interestelar: { path: '/hub/objetos-interestelares', name: 'Objetos Interestelares' },
            interstellar: { path: '/hub/interstellar', name: 'Interstellar' },
            maya: { path: '/hub/maya-astro', name: 'Misiones Mayas' },
            arqueoastronomia_maya: { path: '/hub/maya-astro', name: 'Misiones Mayas' },
            objetos_interestelares: { path: '/hub/objetos-interestelares', name: 'Objetos Interestelares' },
            pioneros: { path: '/hub/pioneros', name: 'Pioneros' },
            rocosos: { path: '/hub/planetas-rocosos', name: 'Planetas Rocosos' },
            viaje_planetas_rocosos: { path: '/hub/planetas-rocosos', name: 'Planetas Rocosos' },
            robots: { path: '/hub/robots-espacio', name: 'Robots en el Espacio' },
            starwars: { path: '/hub/star-wars', name: 'Star Wars' },
            agujeros: { path: '/hub/agujeros-gusano', name: 'Agujeros de Gusano' },
            wormhole: { path: '/hub/agujeros-gusano', name: 'Agujeros de Gusano' },
            stellar: { path: '/hub/stellar-objects', name: 'Objetos Estelares' },
            black_hole: { path: '/hub/stellar-objects', name: 'Objetos Estelares' },
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

          let backHref = '/dashboard';
          let backLabel = 'Estación Central';

          // Check if we're on a course or quiz page
          const courseMatch = pathname.match(/^\/(course|quiz)\/([^/]+)/);
          if (courseMatch) {
            const moduleId = courseMatch[2];
            // Try exact match first, then prefix matching
            const keys = Object.keys(NAV_HUB_MAP).sort((a, b) => b.length - a.length);
            for (const key of keys) {
              if (moduleId === key || moduleId.startsWith(key + '_') || moduleId.startsWith(key)) {
                backHref = NAV_HUB_MAP[key].path;
                backLabel = NAV_HUB_MAP[key].name;
                break;
              }
            }
          }

          return (
            <Link href={backHref} style={{ textDecoration: 'none', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem', border: '1px solid rgba(255,255,255,0.2)', padding: '0.4rem 1rem', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', fontSize: '0.9rem', fontWeight: 600, transition: 'all 0.3s ease' }}>
              <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>←</span> {backLabel}
            </Link>
          );
        })()}
      </div>
      
      {!loading && user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link href="/profile" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', transition: 'all 0.2s ease', padding: '0.3rem 0.8rem', borderRadius: '20px', border: '1px solid transparent' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,206,209,0.4)'; e.currentTarget.style.background = 'rgba(0,206,209,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.background = 'transparent'; }}
          >
            <div style={{ padding: '0.5rem', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%' }}>
              <User size={18} color="var(--starlight)" />
            </div>
            <span style={{ fontWeight: 600 }}>{userData?.name || user.email}</span>
            {userData?.role === 'admin' && (
              <span style={{ fontSize: '0.7rem', background: 'var(--danger)', padding: '0.2rem 0.5rem', borderRadius: '10px' }}>Admin</span>
            )}
          </Link>
          <Link
            href="/profile/logros"
            title="Mis Logros"
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none', color: 'rgba(255,215,0,0.7)', padding: '0.45rem 0.9rem', borderRadius: '20px', background: 'rgba(255,215,0,0.06)', border: '1px solid rgba(255,215,0,0.18)', fontSize: '0.82rem', fontWeight: 700, transition: 'all 0.2s' }}
          >
            <Trophy size={15} /> Logros
          </Link>
          <button
            onClick={handleLogout}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: 'var(--text-muted)', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <LogOut size={18} /> Salir
          </button>
        </div>
      )}
    </nav>
  );
}
