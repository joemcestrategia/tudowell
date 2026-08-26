'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Erro de autenticação');
      }
    } catch (err) {
      setError('Erro de rede');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)' }}>
      <form onSubmit={handleLogin} style={{ background: 'var(--card-bg)', padding: '2.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--card-border)', boxShadow: 'var(--card-shadow)', width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '-1.5px', lineHeight: 1 }}>
            Tudo<span style={{ color: '#000', fontWeight: 300 }}>|</span><span style={{ color: 'var(--accent)' }}>Well</span>
          </span>
          <h1 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--secondary)', textTransform: 'uppercase', marginTop: '0.5rem', letterSpacing: '2px' }}>Acesso Restrito</h1>
        </div>
        
        {error && <div style={{ background: '#ffebee', color: '#c62828', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem' }}>Senha Administrativa</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)', background: 'var(--background)', color: 'var(--foreground)' }}
            required
          />
        </div>
        
        <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
          {loading ? 'Entrando...' : 'Acessar Painel'}
        </button>
      </form>
    </div>
  );
}
