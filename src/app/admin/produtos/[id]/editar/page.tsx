import { prisma } from '@/lib/prisma';
import { atualizarProduto } from '../../actions';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function EditarProduto({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const produto = await prisma.produto.findUnique({
    where: { id: resolvedParams.id }
  });

  if (!produto) {
    notFound();
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/admin" style={{ color: 'var(--secondary)', textDecoration: 'none' }}>← Voltar</Link>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Editar Produto</h1>
      </div>

      <form action={atualizarProduto} style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--card-border)' }}>
        <input type="hidden" name="id" value={produto.id} />
        <input type="hidden" name="plataforma" value={produto.plataforma} />
        <input type="hidden" name="linkAfiliado" value={produto.linkAfiliado} />
        <input type="hidden" name="imagemUrl" value={produto.imagemUrl} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
          <div>
            <div style={{ width: '100%', aspectRatio: '1/1', background: '#f1f3f5', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1rem' }}>
              {produto.imagemUrl && <img src={produto.imagemUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />}
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Nome do Produto</label>
              <input type="text" name="nome" defaultValue={produto.nome} required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)' }} />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Preço (R$)</label>
                <input type="number" step="0.01" name="preco" defaultValue={produto.preco ? produto.preco.toString() : ''} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Avaliação (0-5)</label>
                <input type="number" step="0.1" name="avaliacao" defaultValue={produto.avaliacao ? produto.avaliacao.toString() : ''} max="5" min="0" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)' }} />
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Categoria</label>
                <select name="categoria" defaultValue={produto.categoria ?? ''} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)', background: '#fff' }}>
                  <option value="">Selecione a categoria</option>
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
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Subcategoria (Opcional)</label>
                <select name="subcategoria" defaultValue={produto.subcategoria ?? ''} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)', background: '#fff' }}>
                  <option value="">Nenhuma</option>
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
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Status</label>
                <select name="status" defaultValue={produto.status} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)', background: '#fff' }}>
                  <option value="ATIVO">Ativo</option>
                  <option value="OCULTO">Oculto</option>
                  <option value="EXPIRADO">Expirado (Indisponível)</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Ordem (Maior = primeiro)</label>
                <input type="number" name="ordem" defaultValue={produto.ordem} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)' }} />
              </div>
            </div>
            
            <div style={{ marginTop: '1rem' }}>
              <button type="submit" className="btn-primary" style={{ width: '100%' }}>Salvar Alterações</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
