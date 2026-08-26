import Image from 'next/image';
import Link from 'next/link';
import { Prisma } from '@prisma/client';

type ProdutoProps = {
  produto: {
    id: string;
    nome: string;
    preco: Prisma.Decimal | null;
    avaliacao: number | null;
    imagemUrl: string;
    linkAfiliado: string;
    plataforma: string;
    categoria: string | null;
  };
};

export default function ProductCard({ produto }: ProdutoProps) {
  const isShopee = produto.plataforma.toLowerCase() === 'shopee';
  const priceValue = produto.preco ? Number(produto.preco) : null;

  return (
    <div className="product-card" style={{ background: '#fff', borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s' }}>
      <Link href={produto.linkAfiliado} target="_blank" rel="nofollow sponsored noopener" style={{ display: 'block', padding: '1rem', background: '#f8f9fa', position: 'relative' }}>
        <div style={{ width: '100%', aspectRatio: '1/1', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img 
            src={produto.imagemUrl} 
            alt={produto.nome}
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
            loading="lazy"
          />
        </div>
        
        {/* Tiny Store Badge in the top right corner */}
        <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', zIndex: 2 }}>
          {isShopee ? (
            <div title="Shopee" style={{ background: '#EE4D2D', width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.15)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </div>
          ) : (
            <div title="Mercado Livre" style={{ background: '#FFE600', width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.15)' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#2D3277">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5v-3h2.5l-3.5-5.5-3.5 5.5H11v3h2z"/>
              </svg>
            </div>
          )}
        </div>
      </Link>
      
      <div className="product-info" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
        <Link href={produto.linkAfiliado} target="_blank" rel="nofollow sponsored noopener" style={{ textDecoration: 'none' }}>
          <h3 className="product-title" title={produto.nome} style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--foreground)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.35, minHeight: '2.7rem' }}>
            {produto.nome}
          </h3>
        </Link>
        
        <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {priceValue ? (
            <div className="product-price" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceValue)}
            </div>
          ) : (
            <div style={{ color: 'var(--secondary)', fontSize: '0.9rem' }}>Preço sob consulta</div>
          )}
        </div>
      </div>
    </div>
  );
}
