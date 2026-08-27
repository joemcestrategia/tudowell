'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);
  
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--background)' }}>
      {/* Overlay mobile */}
      <div 
        className={`admin-overlay ${isMenuOpen ? 'admin-overlay-open' : ''}`} 
        style={{ display: isMenuOpen ? 'block' : 'none' }}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Header (Only visible on mobile) */}
      <div className="admin-mobile-header" style={{ 
        position: 'fixed', 
        top: 0, left: 0, right: 0, 
        height: '60px', 
        background: 'var(--card-bg)', 
        borderBottom: '1px solid var(--card-border)', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '0 1rem', 
        zIndex: 998 
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', textDecoration: 'none' }}>
          <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '-1.5px', lineHeight: 1 }}>
            Tudo<span style={{ color: '#000', fontWeight: 300 }}>|</span><span style={{ color: 'var(--accent)' }}>Well</span>
          </span>
        </Link>
        <button 
          onClick={() => setIsMenuOpen(true)}
          style={{ 
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            color: 'var(--foreground)',
            cursor: 'pointer',
            padding: '0.2rem'
          }}
        >
          ☰
        </button>
      </div>

      {/* Sidebar Admin */}
      <aside className={`admin-sidebar ${isMenuOpen ? 'open' : ''}`} style={{ width: '250px', background: 'var(--card-bg)', borderRight: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--card-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', textDecoration: 'none' }}>
              <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '-1.5px', lineHeight: 1 }}>
                Tudo<span style={{ color: '#000', fontWeight: 300 }}>|</span><span style={{ color: 'var(--accent)' }}>Well</span>
              </span>
            </Link>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--secondary)', textTransform: 'uppercase', marginTop: '0.5rem', letterSpacing: '1px' }}>Painel Admin</div>
          </div>
          {/* Close button inside sidebar for mobile */}
          <button className="mobile-only" onClick={() => setIsMenuOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <nav style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
          <Link href="/admin" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: pathname === '/admin' ? 'var(--primary)' : 'transparent', color: pathname === '/admin' ? '#fff' : 'inherit', fontWeight: pathname === '/admin' ? 600 : 400 }}>
            Produtos Ativos
          </Link>
          <Link href="/admin/produtos/expirados" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: pathname === '/admin/produtos/expirados' ? 'var(--primary)' : 'transparent', color: pathname === '/admin/produtos/expirados' ? '#fff' : 'inherit', fontWeight: pathname === '/admin/produtos/expirados' ? 600 : 400 }}>
            Produtos Expirados
          </Link>
          <Link href="/admin/configuracoes" style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: pathname === '/admin/configuracoes' ? 'var(--primary)' : 'transparent', color: pathname === '/admin/configuracoes' ? '#fff' : 'inherit', fontWeight: pathname === '/admin/configuracoes' ? 600 : 400 }}>
            Configurações
          </Link>
        </nav>
        
        <div style={{ padding: '1rem', borderTop: '1px solid var(--card-border)' }}>
          <button onClick={handleLogout} style={{ width: '100%', padding: '0.75rem', background: 'transparent', border: '1px solid var(--card-border)', borderRadius: 'var(--radius-md)', cursor: 'pointer', color: 'var(--foreground)' }}>
            Sair
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="admin-main" style={{ flexGrow: 1, padding: '2rem', overflowY: 'auto', height: '100vh', width: '100%' }}>
        {children}
      </main>
    </div>
  );
}
