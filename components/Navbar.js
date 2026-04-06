'use client';
import Link from 'next/link';
import { Rocket, LogOut, User } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import AnimatedLogos from './AnimatedLogos';

export default function Navbar() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

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
          <img src="/assets/main_logo.png" alt="Space Academy Camp Logo" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'contain', background: 'white' }} />
          <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Space Camp</h2>
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem', marginLeft: '2rem' }}>
           <Link href="/dashboard" style={{ textDecoration: 'none', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
             Base de Misiones
           </Link>
           <Link href="/dashboard/live" style={{ textDecoration: 'none', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.4rem', border: '1px solid rgba(0, 255, 136, 0.4)', padding: '0.3rem 0.8rem', borderRadius: '15px', background: 'rgba(0,255,136,0.05)' }}>
             <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)', display: 'inline-block' }} className="pulse-anim" />
             En Vivo
           </Link>
        </div>
      </div>
      
      {!loading && user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%' }}>
              <User size={18} color="var(--starlight)" />
            </div>
            <span style={{ fontWeight: 600 }}>{userData?.name || user.email}</span>
            {userData?.role === 'admin' && (
              <span style={{ fontSize: '0.7rem', background: 'var(--danger)', padding: '0.2rem 0.5rem', borderRadius: '10px' }}>Admin</span>
            )}
          </div>
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
