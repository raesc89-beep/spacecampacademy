'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Pickaxe, UserCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function HangarLayout({ children }) {
  const pathname = usePathname();
  
  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', minHeight: '100vh', paddingTop: '70px', backgroundColor: '#05010a', color: 'white' }}>
        
        {/* Cinta de Opciones / Sidebar */}
        <motion.nav 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          style={{ width: '280px', background: 'rgba(255,255,255,0.03)', borderRight: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', padding: '2rem 1rem', zIndex: 10 }}
        >
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <img src="/assets/heavy_cruiser_vector.png" alt="Astillero Logo" style={{ width: '80px', marginBottom: '1rem', filter: 'drop-shadow(0 0 10px rgba(0,228,255,0.5))' }} />
            <h2 style={{ fontSize: '1.4rem', color: 'var(--electric-blue)', margin: 0, fontFamily: 'sans-serif', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase' }}>Hangar Estelar</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Complejo de Mantenimiento</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link href="/hangar" style={{ textDecoration: 'none' }}>
              <motion.div 
                whileHover={{ x: 10, backgroundColor: 'rgba(0, 228, 255, 0.1)' }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '12px',
                  backgroundColor: pathname === '/hangar' ? 'rgba(0, 228, 255, 0.2)' : 'transparent',
                  border: pathname === '/hangar' ? '1px solid var(--electric-blue)' : '1px solid transparent',
                  color: pathname === '/hangar' ? 'var(--electric-blue)' : 'white',
                  transition: 'all 0.2s', cursor: 'pointer'
                }}
              >
                 <Pickaxe size={24} />
                 <span style={{ fontWeight: 'bold' }}>Astillero Naval</span>
              </motion.div>
            </Link>
            
            <Link href="/hangar/avatar" style={{ textDecoration: 'none' }}>
              <motion.div 
                whileHover={{ x: 10, backgroundColor: 'rgba(255, 100, 200, 0.1)' }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '12px',
                  backgroundColor: pathname === '/hangar/avatar' ? 'rgba(255, 100, 200, 0.2)' : 'transparent',
                  border: pathname === '/hangar/avatar' ? '1px solid #FF64C8' : '1px solid transparent',
                  color: pathname === '/hangar/avatar' ? '#FF64C8' : 'white',
                  transition: 'all 0.2s', cursor: 'pointer'
                }}
              >
                 <UserCircle size={24} />
                 <span style={{ fontWeight: 'bold' }}>Biocubierta Avatar</span>
              </motion.div>
            </Link>
          </div>
        </motion.nav>

        {/* Dynamic Content Area */}
        <main style={{ flex: 1, padding: '2rem', height: 'calc(100vh - 70px)', overflowY: 'auto' }}>
           {children}
        </main>
      </div>
    </>
  );
}
