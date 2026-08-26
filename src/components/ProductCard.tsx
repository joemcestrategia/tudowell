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
        <Link href={produto.linkAfiliado} target="_blank" rel="nofollow sponsored noopener" style={{ textDecoration: 'none' }}>
          <h3 className="product-title" title={produto.nome}>
            {produto.nome}
          </h3>
        </Link>
        
        {priceValue ? (
          <div style={{ marginTop: '0.75rem' }}>
            <div className="product-price">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceValue)}
            </div>
          </div>
        ) : (
          <div style={{ marginTop: '0.75rem' }}>
             <div className="product-price" style={{ color: 'var(--secondary)', fontSize: '1rem' }}>Preço sob consulta</div>
          </div>
        )}

        <div className="product-platform" style={{ marginTop: '0.75rem' }}>
           Via {isShopee ? 'Shopee' : 'Mercado Livre'}
        </div>
      </div>
    </div>
  );
}
