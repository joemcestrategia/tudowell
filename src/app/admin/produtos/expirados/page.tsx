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

      <div className="responsive-table">
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.02)', borderBottom: '1px solid var(--card-border)' }}>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Imagem</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Nome</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Plataforma</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Última Checagem</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--secondary)' }}>Nenhum produto expirado.</td>
              </tr>
            )}
            {produtos.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--card-border)' }}>
                <td data-label="Imagem" style={{ padding: '1rem' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-sm)', background: '#eee', overflow: 'hidden', display: 'inline-block' }}>
                    <img src={p.imagemUrl} alt={p.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </td>
                <td data-label="Nome" style={{ padding: '1rem', whiteSpace: 'normal', wordBreak: 'break-word' }}>{p.nome}</td>
                <td data-label="Plataforma" style={{ padding: '1rem', textTransform: 'capitalize' }}>{p.plataforma}</td>
                <td data-label="Última Checagem" style={{ padding: '1rem', color: 'var(--secondary)' }}>
                  {p.ultimaChecagem ? new Date(p.ultimaChecagem).toLocaleString('pt-BR') : 'Desconhecido'}
                </td>
                <td data-label="Ações" style={{ padding: '1rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <Link href={`/admin/produtos/${p.id}/editar`} style={{ color: 'var(--primary)', fontWeight: 600 }}>
                    Editar / Reativar
                  </Link>
                  <DeleteButton id={p.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
