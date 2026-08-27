import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import DeleteButton from './produtos/DeleteButton';

export const revalidate = 0; // Don't cache admin pages

export default async function AdminProdutos({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  
  const nomeBusca = typeof params?.nome === 'string' ? params.nome : '';
  const categoriaBusca = typeof params?.categoria === 'string' ? params.categoria : '';
  const subcategoriaBusca = typeof params?.subcategoria === 'string' ? params.subcategoria : '';

  let produtos: any[] = [];
  try {
    produtos = await prisma.produto.findMany({
      where: {
        status: { in: ['ATIVO', 'OCULTO'] },
        ...(nomeBusca && { nome: { contains: nomeBusca } }),
        ...(categoriaBusca && { categoria: categoriaBusca }),
        ...(subcategoriaBusca && { subcategoria: subcategoriaBusca }),
      },
      orderBy: { ordem: 'desc' }
    });
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Produtos Ativos / Ocultos</h1>
        <Link href="/admin/produtos/novo" className="btn-primary btn-fab">
          <span className="btn-fab-icon">+</span>
          <span className="btn-fab-text">Novo Produto</span>
        </Link>
      </div>

      <details style={{ marginBottom: '1.5rem', background: 'var(--card-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)' }}>
        <summary style={{ padding: '1rem', fontWeight: 600, cursor: 'pointer', outline: 'none' }}>
          Filtrar Produtos
        </summary>
        
        <form className="admin-filters" method="GET" style={{ border: 'none', marginBottom: 0, paddingTop: 0, borderRadius: 0, borderTop: '1px solid var(--card-border)' }}>
          <input 
            type="text" 
            name="nome" 
            placeholder="Buscar por nome..." 
            defaultValue={nomeBusca} 
          />
          
          <select name="categoria" defaultValue={categoriaBusca}>
            <option value="">Todas as Categorias</option>
            <option value="tecnologia">Tecnologia e Celulares</option>
            <option value="eletro">Casa e Cozinha (Eletro)</option>
            <option value="religiosos">Fé e Espiritualidade</option>
            <option value="moda-masculina">Moda Masculina</option>
            <option value="moda-feminina">Moda Feminina</option>
            <option value="beleza">Beleza e Perfumaria</option>
            <option value="esportes">Esportes e Lazer</option>
            <option value="infantil">Infantil e Brinquedos</option>
            <option value="casa">Casa e Decoração</option>
            <option value="lancamentos">Lançamentos</option>
            <option value="biblias">Bíblias</option>
            <option value="moda">Moda (Geral)</option>
          </select>
          
          <select name="subcategoria" defaultValue={subcategoriaBusca}>
            <option value="">Todas Subcategorias</option>
            <optgroup label="Tecnologia">
              <option value="celulares">Celulares</option>
              <option value="notebooks">Notebooks</option>
              <option value="fones-de-ouvido">Fones de Ouvido</option>
              <option value="smartwatches">Smartwatches</option>
            </optgroup>
            <optgroup label="Eletro e Casa">
              <option value="geladeiras">Geladeiras</option>
              <option value="fogoes">Fogões</option>
              <option value="micro-ondas">Micro-ondas</option>
              <option value="eletroportateis">Eletroportáteis</option>
              <option value="moveis">Móveis</option>
              <option value="decoracao">Decoração</option>
            </optgroup>
            <optgroup label="Moda e Beleza">
              <option value="roupas-masculinas">Roupas Masculinas</option>
              <option value="roupas-femininas">Roupas Femininas</option>
              <option value="calcados">Calçados</option>
              <option value="acessorios">Acessórios</option>
              <option value="perfumes">Perfumes</option>
              <option value="maquiagem">Maquiagem</option>
              <option value="skincare">Skincare</option>
            </optgroup>
            <optgroup label="Outros">
              <option value="brinquedos">Brinquedos</option>
              <option value="artigos-esportivos">Artigos Esportivos</option>
              <option value="livros">Livros</option>
              <option value="ferramentas">Ferramentas</option>
            </optgroup>
          </select>
          
          <div style={{ display: 'flex', gap: '0.5rem', flexGrow: 1, minWidth: '150px' }}>
            <button type="submit" className="btn-primary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.875rem' }}>Buscar</button>
            <Link href="/admin" className="btn-primary" style={{ flex: 1, padding: '0.5rem', background: 'var(--secondary)', textAlign: 'center', fontSize: '0.875rem' }}>Limpar</Link>
          </div>
        </form>
      </details>

      {produtos.length === 0 && (
        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--secondary)', background: 'var(--card-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)' }}>
          Nenhum produto encontrado com os filtros selecionados.
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
                <div className="admin-card-status" style={{ background: p.status === 'ATIVO' ? '#dcfce7' : '#f3f4f6', color: p.status === 'ATIVO' ? '#166534' : '#374151' }}>
                  {p.status}
                </div>
                <div className="admin-card-title">{p.nome}</div>
                <div className="admin-card-meta">
                  {p.categoria || 'Sem categoria'} {p.subcategoria && `• ${p.subcategoria}`}
                </div>
                <div className="admin-card-meta">
                  Ordem: {p.ordem}
                </div>
              </div>
            </div>
            
            <div className="admin-card-actions">
              <Link href={`/admin/produtos/${p.id}/editar`} style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem' }}>
                Editar
              </Link>
              <DeleteButton id={p.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
