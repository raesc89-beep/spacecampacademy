'use client';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Users, BookOpen, FileText, Database, ShieldAlert } from 'lucide-react';

export default function AdminLayout({ children }) {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Validando credenciales...</div>;

  if (!user || userData?.role !== 'admin') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <ShieldAlert size={80} color="var(--danger)" style={{ marginBottom: '1rem' }} />
        <h1>Acceso Denegado</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>No tienes permisos de administrador (Space Commander).</p>
        <Link href="/" className="btn-primary">Volver a la Base</Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#020308' }}>
      {/* Admin Sidebar */}
      <aside style={{ width: '250px', background: 'rgba(255,255,255,0.03)', borderRight: '1px solid rgba(255,255,255,0.05)', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', color: 'var(--electric-blue)' }}>Moodle Admin</h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Space Camp Academy</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link href="/admin" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1rem', borderRadius: '8px', color: 'white', textDecoration: 'none', background: 'rgba(255,255,255,0.05)' }}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link href="/admin/users" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1rem', borderRadius: '8px', color: 'white', textDecoration: 'none' }}>
            <Users size={20} /> Usuarios
          </Link>
          <Link href="/admin/modules" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1rem', borderRadius: '8px', color: 'white', textDecoration: 'none' }}>
            <BookOpen size={20} /> Editor Módulos
          </Link>
          <Link href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1rem', borderRadius: '8px', color: 'white', textDecoration: 'none', opacity: 0.5 }}>
            <FileText size={20} /> Reportes SCORM/H5P
          </Link>
          <Link href="/admin/seed" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1rem', borderRadius: '8px', color: 'var(--danger)', textDecoration: 'none', marginTop: 'auto' }}>
            <Database size={20} /> Reiniciar DB
          </Link>
        </nav>
      </aside>

      {/* Admin Content Window */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
