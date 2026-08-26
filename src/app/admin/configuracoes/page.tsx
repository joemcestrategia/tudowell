export default function Configuracoes() {
  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '2rem' }}>Configurações do Site</h1>
      
      <div style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--card-border)' }}>
        <p style={{ color: 'var(--secondary)', marginBottom: '1rem' }}>
          Para configurar a loja como "Tudo Well", o nome já foi atualizado no código principal (Metadata e Header).
          Para futuras implementações de cores e logo, o schema <code>ConfiguracaoSite</code> está pronto no Prisma.
        </p>
        
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Nome do Site</label>
            <input type="text" defaultValue="Tudo Well" disabled style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)', background: 'var(--background)' }} />
          </div>
          <button type="button" disabled className="btn-primary" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
            Salvar (Em Breve)
          </button>
        </form>
      </div>
    </div>
  );
}
