'use client';

import { useState } from 'react';
import { salvarProduto } from '../actions';
import Link from 'next/link';

export default function NovoProduto() {
  const [link, setLink] = useState('');
  const [loadingExtract, setLoadingExtract] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [error, setError] = useState('');

  const handleExtract = async () => {
    if (!link) return;
    setLoadingExtract(true);
    setError('');
    try {
      const res = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link })
      });
      const data = await res.json();
      if (res.ok) {
        setExtractedData(data);
      } else {
        setError(data.error || 'Erro ao extrair dados');
      }
    } catch (err) {
      setError('Falha de rede ao tentar extrair dados');
    } finally {
      setLoadingExtract(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Novo Produto</h1>
      </div>

      <div style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--card-border)', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>1. Importar Produto</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input 
            type="url" 
            placeholder="Cole o link do Mercado Livre ou Shopee..." 
            value={link} 
            onChange={(e) => setLink(e.target.value)} 
            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)' }}
          />
          <button onClick={handleExtract} disabled={loadingExtract || !link} className="btn-primary" style={{ width: '100%', padding: '0.75rem' }}>
            {loadingExtract ? 'Buscando...' : 'Buscar Dados'}
          </button>
          <Link href="/admin" style={{ display: 'block', textAlign: 'center', color: 'var(--secondary)', textDecoration: 'none', padding: '0.5rem', marginTop: '0.5rem', fontWeight: 600 }}>
            ← Voltar para a lista
          </Link>
        </div>
        {error && <div style={{ color: '#c62828', marginTop: '1rem' }}>{error}</div>}
      </div>

      {extractedData && (
        <form action={salvarProduto} style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--card-border)' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>2. Revisar e Salvar</h2>
          
          {extractedData.warning && <div style={{ background: '#fff3cd', color: '#856404', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>{extractedData.warning}</div>}
          
          <input type="hidden" name="plataforma" value={extractedData.plataforma} />
          <input type="hidden" name="linkAfiliado" value={extractedData.linkAfiliado} />
          <input type="hidden" name="imagemUrl" value={extractedData.imagemUrl} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
            <div>
              <div style={{ width: '100%', aspectRatio: '1/1', background: '#f1f3f5', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1rem' }}>
                {extractedData.imagemUrl && <img src={extractedData.imagemUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />}
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Nome do Produto</label>
                <input type="text" name="nome" defaultValue={extractedData.nome} required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)' }} />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Preço (R$)</label>
                  <input type="number" step="0.01" name="preco" defaultValue={extractedData.preco} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Avaliação (0-5)</label>
                  <input type="number" step="0.1" name="avaliacao" defaultValue={extractedData.avaliacao} max="5" min="0" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)' }} />
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Categoria</label>
                  <select name="categoria" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)', background: '#fff' }}>
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
                  <select name="subcategoria" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)', background: '#fff' }}>
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
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Ordem de exibição (Maior = primeiro)</label>
                  <input type="number" name="ordem" defaultValue="0" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)' }} />
                </div>
              </div>
              
              <div style={{ marginTop: '1rem' }}>
                <button type="submit" className="btn-primary" style={{ width: '100%' }}>Salvar Produto</button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
