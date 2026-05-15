'use client';
import Link from 'next/link';
import { Rocket, LogOut, User } from 'lucide-react';
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
        {pathname !== '/dashboard' && (
          <Link href="/dashboard" style={{ textDecoration: 'none', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem', border: '1px solid rgba(255,255,255,0.2)', padding: '0.4rem 1rem', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', fontSize: '0.9rem', fontWeight: 600, transition: 'all 0.3s ease' }}>
            <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>←</span> Estación Central
          </Link>
        )}
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
