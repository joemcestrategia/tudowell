'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState, Suspense } from 'react';

function HeaderInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    setIsMobileMenuOpen(false);
    router.push(`/?${params.toString()}`);
  };

  return (
    <header className="glass-header">
      <div className="container header-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem' }}>
        
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', textDecoration: 'none' }}>
          <span style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1 }}>
            Tudo<span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}>|</span><span style={{ color: 'var(--accent)' }}>Well</span>
          </span>
        </Link>
        
        {/* Hamburger Button (Mobile Only) */}
        <button 
          className="mobile-only hamburger-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ background: 'none', fontSize: '1.5rem', color: '#fff', cursor: 'pointer', padding: '0.2rem' }}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
        
        <form className="desktop-flex" onSubmit={handleSearch} style={{ flexGrow: 1, maxWidth: '600px', display: 'flex', margin: '0 2rem', position: 'relative' }}>
          <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)', fontSize: '1.2rem' }}>⌕</span>
          <input
            type="text"
            placeholder="Busque seu produto"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 3rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: '#fff',
              color: 'var(--foreground)'
            }}
          />
        </form>

        <div className="desktop-flex" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.875rem' }}>
          <Link href="/sobre" style={{ fontWeight: 600, color: '#fff' }}>
            Sobre & Ajuda
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="mobile-only mobile-menu">
          <div className="container" style={{ padding: '1rem' }}>
            <form onSubmit={handleSearch} style={{ display: 'flex', position: 'relative', marginBottom: '1rem' }}>
              <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)' }}>⌕</span>
              <input
                type="text"
                placeholder="Busque seu produto"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 3rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--card-border)',
                  background: '#f4f7f9',
                  color: 'var(--foreground)'
                }}
              />
            </form>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontWeight: 600, fontSize: '1rem', textTransform: 'uppercase' }}>
              <Link href="/?categoria=tecnologia" onClick={() => setIsMobileMenuOpen(false)}>Tecnologia</Link>
              <Link href="/?categoria=eletro" onClick={() => setIsMobileMenuOpen(false)}>Eletrodomésticos</Link>
              <Link href="/?categoria=moda-masculina" onClick={() => setIsMobileMenuOpen(false)}>Masculino</Link>
              <Link href="/?categoria=moda-feminina" onClick={() => setIsMobileMenuOpen(false)}>Feminino</Link>
              <Link href="/?categoria=beleza" onClick={() => setIsMobileMenuOpen(false)}>Beleza</Link>
              <Link href="/?categoria=esportes" onClick={() => setIsMobileMenuOpen(false)}>Esportes</Link>
              <Link href="/?categoria=infantil" onClick={() => setIsMobileMenuOpen(false)}>Infantil</Link>
              <Link href="/?categoria=religiosos" onClick={() => setIsMobileMenuOpen(false)}>Religiosos</Link>
              <Link href="/?categoria=casa" onClick={() => setIsMobileMenuOpen(false)}>Casa</Link>
              <Link href="/?categoria=lancamentos" style={{ color: 'var(--accent)' }} onClick={() => setIsMobileMenuOpen(false)}>Novidades</Link>
              <div style={{ height: '1px', background: 'var(--card-border)', margin: '0.5rem 0' }}></div>
              <Link href="/sobre" style={{ color: 'var(--secondary)' }} onClick={() => setIsMobileMenuOpen(false)}>Sobre & Ajuda</Link>
            </div>
          </div>
        </div>
      )}

      {/* Categoria Nav Desktop */}
      <div className="desktop-only" style={{ borderTop: '1px solid rgba(255,255,255,0.2)', padding: '0.75rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase' }}>
          <Link href="/?categoria=tecnologia">Tecnologia ⌄</Link>
          <Link href="/?categoria=eletro">Eletrodomésticos ⌄</Link>
          <Link href="/?categoria=moda-masculina">Masculino ⌄</Link>
          <Link href="/?categoria=moda-feminina">Feminino ⌄</Link>
          <Link href="/?categoria=beleza">Beleza ⌄</Link>
          <Link href="/?categoria=esportes">Esportes ⌄</Link>
          <Link href="/?categoria=infantil">Infantil ⌄</Link>
          <Link href="/?categoria=religiosos">Religiosos ⌄</Link>
          <Link href="/?categoria=casa">Casa ⌄</Link>
          <Link href="/?categoria=lancamentos" style={{ color: 'var(--accent)' }}>Novidades</Link>
        </div>
      </div>
    </header>
  );
}

export default function Header() {
  return (
    <Suspense fallback={<header className="glass-header"><div className="container" style={{ padding: '1rem 2rem' }}>Carregando...</div></header>}>
      <HeaderInner />
    </Suspense>
  );
}
