import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import DeleteButton from '../DeleteButton';

export const revalidate = 0;

export default async function ProdutosExpirados() {
  let produtos: any[] = [];
  try {
    produtos = await prisma.produto.findMany({
      where: { status: 'EXPIRADO' },
      orderBy: { ultimaChecagem: 'desc' }
    });
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Produtos Expirados</h1>
        <p style={{ color: 'var(--secondary)' }}>Estes produtos foram marcados como indisponíveis automaticamente pelo sistema e não aparecem na vitrine.</p>
      </div>

      {produtos.length === 0 && (
        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--secondary)', background: 'var(--card-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)' }}>
          Nenhum produto expirado.
        </div>
      )}

      <div className="admin-cards-grid">
        {produtos.map(p => (
          <div key={p.id} className="admin-card">
            <div className="admin-card-header">
              <div className="admin-card-image">
                <img src={p.imagemUrl} alt={p.nome} />
              </div>
              <div className="admin-card-content">
                <div className="admin-card-status" style={{ background: '#f3f4f6', color: '#374151' }}>
                  EXPIRADO
                </div>
                <div className="admin-card-title">{p.nome}</div>
                <div className="admin-card-meta">
                  Plataforma: {p.plataforma || 'N/A'}
                </div>
                <div className="admin-card-meta">
                  Visto em: {p.ultimaChecagem ? new Date(p.ultimaChecagem).toLocaleDateString('pt-BR') : 'Desconhecido'}
                </div>
              </div>
            </div>
            
            <div className="admin-card-actions">
              <Link href={`/admin/produtos/${p.id}/editar`} style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem' }}>
                Editar / Reativar
              </Link>
              <DeleteButton id={p.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
