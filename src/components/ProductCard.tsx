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
  
  // Fake "original price" just for the aesthetic of the reference site 
  // (usually it's 10-15% higher to show a discount)
  const oldPrice = priceValue ? priceValue * 1.15 : null;

  return (
    <div className="product-card">
      <Link href={produto.linkAfiliado} target="_blank" rel="nofollow sponsored noopener" style={{ display: 'block' }}>
        <div className="product-image-container">
          <Image 
            src={produto.imagemUrl} 
            alt={produto.nome}
            fill
            unoptimized
            className="product-image"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
      </Link>
      
      <div className="product-info">
        <span className="product-badge">
          Novidade
        </span>
        
        <Link href={produto.linkAfiliado} target="_blank" rel="nofollow sponsored noopener">
          <h3 className="product-title" title={produto.nome}>
            {produto.nome}
          </h3>
        </Link>
        
        <div className="product-stars">
          ★★★★★ <span style={{ color: '#ccc' }}>({produto.avaliacao ? produto.avaliacao.toFixed(1) : '5.0'})</span>
        </div>
        
        {priceValue && oldPrice ? (
          <div style={{ marginTop: '0.5rem' }}>
            <div className="product-price-old">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(oldPrice)}
            </div>
            <div className="product-price">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceValue)}
            </div>
            <div className="product-installments">
              <span>R$ {(priceValue * 0.95).toFixed(2).replace('.', ',')} à vista com desconto ou 5x de R$ {(priceValue / 5).toFixed(2).replace('.', ',')} Sem juros</span>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: '0.5rem' }}>
             <div className="product-price" style={{ color: 'var(--secondary)', fontSize: '1rem' }}>Preço sob consulta</div>
          </div>
        )}
        
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', justifyContent: 'center' }}>
          <div style={{ width: '15px', height: '15px', borderRadius: '50%', background: '#000', border: '1px solid #ccc' }}></div>
          <div style={{ width: '15px', height: '15px', borderRadius: '50%', background: '#fff', border: '1px solid #ccc' }}></div>
          <div style={{ width: '15px', height: '15px', borderRadius: '50%', background: '#0a3161', border: '1px solid #ccc' }}></div>
        </div>

        <div className="product-platform">
           Via {isShopee ? 'Shopee' : 'Mercado Livre'}
        </div>
      </div>
    </div>
  );
}
