'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--background)' }}>
      {/* Sidebar Admin */}
      <aside style={{ width: '250px', background: 'var(--card-bg)', borderRight: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--card-border)' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', textDecoration: 'none' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '-1.5px', lineHeight: 1 }}>
              Tudo<span style={{ color: '#000', fontWeight: 300 }}>|</span><span style={{ color: 'var(--accent)' }}>Well</span>
            </span>
          </Link>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--secondary)', textTransform: 'uppercase', marginTop: '0.5rem', letterSpacing: '1px' }}>Painel Admin</div>
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
      <main style={{ flexGrow: 1, padding: '2rem', overflowY: 'auto', height: '100vh' }}>
        {children}
      </main>
    </div>
  );
}
