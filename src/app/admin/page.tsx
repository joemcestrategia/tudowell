import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const revalidate = 0; // Don't cache admin pages

export default async function AdminProdutos() {
  let produtos: any[] = [];
  try {
    produtos = await prisma.produto.findMany({
      where: {
        status: { in: ['ATIVO', 'OCULTO'] }
      },
      orderBy: { ordem: 'desc' }
    });
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Produtos Ativos / Ocultos</h1>
        <Link href="/admin/produtos/novo" className="btn-primary">
          + Novo Produto
        </Link>
      </div>

      <div style={{ background: 'var(--card-bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--card-border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.02)', borderBottom: '1px solid var(--card-border)' }}>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Imagem</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Nome</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Plataforma</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Status</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Ordem</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'var(--secondary)' }}>Nenhum produto cadastrado.</td>
              </tr>
            )}
            {produtos.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--card-border)' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-sm)', background: '#eee', overflow: 'hidden' }}>
                    <img src={p.imagemUrl} alt={p.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </td>
                <td style={{ padding: '1rem', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.nome}</td>
                <td style={{ padding: '1rem', textTransform: 'capitalize' }}>{p.plataforma}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ padding: '0.25rem 0.5rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 600, background: p.status === 'ATIVO' ? '#dcfce7' : '#f3f4f6', color: p.status === 'ATIVO' ? '#166534' : '#374151' }}>
                    {p.status}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>{p.ordem}</td>
                <td style={{ padding: '1rem' }}>
                  <Link href={`/admin/produtos/${p.id}/editar`} style={{ color: 'var(--primary)', fontWeight: 600, marginRight: '1rem' }}>
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
