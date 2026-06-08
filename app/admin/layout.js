'use client';
import { useAuth } from '@/hooks/useAuth';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Users, BookOpen, HelpCircle, FileText, Database, ShieldAlert, Sparkles } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, color: '#00E4FF' },
  { href: '/admin/users', label: 'Usuarios', icon: Users, color: '#00FF88' },
  { href: '/admin/modules', label: 'Editor Módulos', icon: BookOpen, color: '#FF64C8' },
  { href: '/admin/quiz', label: 'Editor Quiz', icon: HelpCircle, color: '#B388FF' },
  { href: '#', label: 'Reportes SCORM/H5P', icon: FileText, color: 'rgba(255,255,255,0.3)', disabled: true },
];

export default function AdminLayout({ children }) {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Allow the admin auth page to render without blocking
  if (pathname === '/admin/auth') {
    return <>{children}</>;
  }

  if (loading) return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#020308', flexDirection: 'column', gap: '1rem',
    }}>
      <Sparkles size={36} color="#00E4FF" style={{ animation: 'pulse 1.5s ease-in-out infinite' }} />
      <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Validando credenciales...</span>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </div>
  );

  const isPerpetualAdmin = user?.email === 'raesc89@gmail.com';
  const hasAccess = isPerpetualAdmin || userData?.role === 'admin';

  if (!user || !hasAccess) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', background: '#020308', padding: '2rem',
      }}>
        <div style={{
          width: 100, height: 100, borderRadius: '50%',
          background: 'rgba(255,50,50,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '1.5rem', border: '2px solid rgba(255,50,50,0.2)',
        }}>
          <ShieldAlert size={50} color="var(--danger)" />
        </div>
        <h1 style={{ color: 'white', fontSize: '1.8rem', marginBottom: '0.5rem' }}>Acceso Denegado</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '400px' }}>
          No tienes permisos de administrador (Space Commander). Inicia sesión con una cuenta autorizada.
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/" style={{
            background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
            color: 'white', padding: '0.7rem 1.5rem', borderRadius: '10px',
            textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem',
          }}>
            Volver a la Base
          </Link>
          <Link href="/admin/auth" style={{
            background: 'linear-gradient(135deg, #00E4FF, #00C4E0)',
            color: '#000', padding: '0.7rem 1.5rem', borderRadius: '10px',
            textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem',
          }}>
            Validar Credenciales
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#020308' }}>
      {/* Admin Sidebar */}
      <aside style={{
        width: '260px',
        background: 'linear-gradient(180deg, rgba(0,228,255,0.03) 0%, rgba(0,0,0,0.4) 100%)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        padding: '2rem 1rem',
        display: 'flex', flexDirection: 'column', gap: '2rem',
        position: 'sticky', top: 0, height: '100vh',
        overflowY: 'auto',
      }}>
        {/* Logo / Brand */}
        <div style={{ padding: '0 0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.3rem' }}>
            <div style={{
              width: 36, height: 36, borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(0,228,255,0.2), rgba(0,228,255,0.05))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(0,228,255,0.2)',
            }}>
              <Sparkles size={18} color="#00E4FF" />
            </div>
            <h2 style={{ fontSize: '1.15rem', color: '#00E4FF', margin: 0, fontWeight: 800, letterSpacing: '-0.02em' }}>
              Admin Panel
            </h2>
          </div>
          <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', paddingLeft: '0.2rem' }}>
            Agencia Mexicana de Divulgación Espacial
          </span>
        </div>

        {/* Navigation */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
          {NAV_ITEMS.map(item => {
            const isActive = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href) && item.href !== '#';
            const Icon = item.icon;
            return (
              <Link
                key={item.href + item.label}
                href={item.disabled ? '#' : item.href}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.8rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  color: item.disabled ? 'rgba(255,255,255,0.25)' : isActive ? item.color : 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  background: isActive ? `${item.color}12` : 'transparent',
                  border: isActive ? `1px solid ${item.color}25` : '1px solid transparent',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.88rem',
                  transition: 'all 0.2s',
                  cursor: item.disabled ? 'not-allowed' : 'pointer',
                  opacity: item.disabled ? 0.5 : 1,
                  position: 'relative',
                }}
              >
                {isActive && (
                  <div style={{
                    position: 'absolute', left: 0, top: '25%', bottom: '25%', width: 3,
                    background: item.color, borderRadius: '0 4px 4px 0',
                    boxShadow: `0 0 8px ${item.color}60`,
                  }} />
                )}
                <Icon size={20} />
                {item.label}
                {item.disabled && (
                  <span style={{
                    fontSize: '0.6rem', background: 'rgba(255,255,255,0.08)',
                    padding: '0.1rem 0.4rem', borderRadius: '4px', marginLeft: 'auto',
                    color: 'rgba(255,255,255,0.3)',
                  }}>PRÓX.</span>
                )}
              </Link>
            );
          })}

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Danger zone */}
          <Link href="/admin/seed" style={{
            display: 'flex', alignItems: 'center', gap: '0.8rem',
            padding: '0.75rem 1rem',
            borderRadius: '10px',
            color: pathname === '/admin/seed' ? '#ff5555' : 'rgba(255,80,80,0.6)',
            textDecoration: 'none',
            background: pathname === '/admin/seed' ? 'rgba(255,50,50,0.1)' : 'transparent',
            border: pathname === '/admin/seed' ? '1px solid rgba(255,50,50,0.2)' : '1px solid transparent',
            fontWeight: 500,
            fontSize: '0.88rem',
            transition: 'all 0.2s',
          }}>
            <Database size={20} /> Reiniciar DB
          </Link>
        </nav>

        {/* User info */}
        {user && (
          <div style={{
            padding: '0.8rem 1rem', borderRadius: '10px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', marginBottom: '0.2rem' }}>Conectado como</div>
            <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user.email}
            </div>
          </div>
        )}
      </aside>

      {/* Admin Content Window */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto', minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  );
}
