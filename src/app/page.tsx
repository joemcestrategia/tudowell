import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroCarousel from '@/components/HeroCarousel';
import ProductCard from '@/components/ProductCard';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const revalidate = 60;

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: PageProps) {
  const sp = await searchParams;
  
  const query = typeof sp?.q === 'string' ? sp.q : undefined;
  const categoria = typeof sp?.categoria === 'string' ? sp.categoria : undefined;
  const plataforma = typeof sp?.plataforma === 'string' ? sp.plataforma : undefined;
  const sort = typeof sp?.sort === 'string' ? sp.sort : 'recentes';

  let orderBy: Prisma.ProdutoOrderByWithRelationInput = { ordem: 'desc' };
  if (sort === 'preco_asc') orderBy = { preco: 'asc' };
  else if (sort === 'preco_desc') orderBy = { preco: 'desc' };
  else if (sort === 'avaliacao') orderBy = { avaliacao: 'desc' };
  else if (sort === 'recentes') orderBy = { criadoEm: 'desc' };

  let where: Prisma.ProdutoWhereInput = {
    status: 'ATIVO',
  };

  if (query) where.nome = { contains: query };
  if (categoria) where.categoria = categoria;
  if (plataforma) where.plataforma = plataforma;

  let produtos: any[] = [];
  try {
    produtos = await prisma.produto.findMany({
      where,
      orderBy: [orderBy, { ordem: 'desc' }],
    });
  } catch (error) {
    produtos = [];
  }

  // Removendo os produtos fake com preços hardcoded.
  // Como é apenas vitrine de afiliado, só mostraremos produtos que de fato vieram do DB.
  // if (produtos.length === 0 && !query) {
  //   produtos = [...]
  // }

  return (
    <>
      <Header />
      
      {!query && !categoria && (
        <>
          {/* Hero Section */}
          <HeroCarousel />

          {/* Categorias Quadradas */}
          <section className="container category-section">
            <div className="category-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', justifyContent: 'center' }}>
              <Link href="/?categoria=tecnologia" className="category-card" style={{ backgroundImage: 'url(/images/cat_tech.jpg)' }}>
                <h3 className="category-title">Smartphones e Tecnologia</h3>
              </Link>
              <Link href="/?categoria=eletro" className="category-card" style={{ backgroundImage: 'url(/images/cat_home.jpg)' }}>
                <h3 className="category-title">Casa e Cozinha</h3>
              </Link>
              <Link href="/?categoria=religiosos" className="category-card" style={{ backgroundImage: 'url(/images/cat_religious.jpg)' }}>
                <h3 className="category-title">Fé e Espiritualidade</h3>
              </Link>
              <Link href="/?categoria=moda-masculina" className="category-card" style={{ backgroundImage: 'url(/images/cat_men.jpg)' }}>
                <h3 className="category-title">Moda Masculina</h3>
              </Link>
              <Link href="/?categoria=moda-feminina" className="category-card" style={{ backgroundImage: 'url(/images/cat_women.jpg)' }}>
                <h3 className="category-title">Moda Feminina</h3>
              </Link>
              <Link href="/?categoria=beleza" className="category-card" style={{ backgroundImage: 'url(/images/cat_beauty.jpg)' }}>
                <h3 className="category-title">Beleza & Perfumaria</h3>
              </Link>
              <Link href="/?categoria=esportes" className="category-card" style={{ backgroundImage: 'url(/images/cat_sports.jpg)' }}>
                <h3 className="category-title">Esportes & Lazer</h3>
              </Link>
              <Link href="/?categoria=infantil" className="category-card" style={{ backgroundImage: 'url(/images/cat_kids.jpg)' }}>
                <h3 className="category-title">Infantil & Brinquedos</h3>
              </Link>
            </div>
          </section>

          {/* Estilos Circulares */}
          <section className="container style-section">
            <h2 style={{ fontSize: '2rem', fontWeight: 800, textAlign: 'center' }}>Explore as Seções</h2>
            <div className="style-circles" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
              <div className="style-item">
                <a href="/?categoria=tecnologia" className="style-circle">
                  <img src="/images/cat_tech.jpg" alt="Celulares" />
                </a>
                <div style={{ textAlign: 'center' }}>
                  <div className="style-title">Celulares</div>
                  <div className="style-subtitle">Lançamentos</div>
                </div>
              </div>
              <div className="style-item">
                <a href="/?categoria=eletro" className="style-circle">
                  <img src="/images/cat_home.jpg" alt="Eletroportáteis" />
                </a>
                <div style={{ textAlign: 'center' }}>
                  <div className="style-title">Eletroportáteis</div>
                  <div className="style-subtitle">Cozinha Prática</div>
                </div>
              </div>
              <div className="style-item">
                <a href="/?categoria=biblias" className="style-circle">
                  <img src="/images/cat_religious.jpg" alt="Bíblias" />
                </a>
                <div style={{ textAlign: 'center' }}>
                  <div className="style-title">Bíblias de Estudo</div>
                  <div className="style-subtitle">Livros Cristãos</div>
                </div>
              </div>
              <div className="style-item">
                <a href="/?categoria=moda" className="style-circle">
                  <img src="/images/cat_women.jpg" alt="Moda" />
                </a>
                <div style={{ textAlign: 'center' }}>
                  <div className="style-title">Moda</div>
                  <div className="style-subtitle">Look do dia</div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Main Grid (Removido Sidebar) */}
      <main className="container" style={{ paddingBottom: '4rem' }}>
        
        {/* Banner Premium de Busca ou Categoria */}
        {(query || categoria) && (
          <div style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, #002266 100%)',
            color: '#fff',
            padding: '3rem 2rem',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '2rem',
            marginTop: '1.5rem',
            textAlign: 'center',
            boxShadow: 'var(--card-shadow)'
          }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>
              {query ? `Busca: "${query}"` : categoria?.replace('-', ' ')}
            </h1>
            <p style={{ opacity: 0.9, marginTop: '0.5rem', fontSize: '1.1rem' }}>
              {query ? 'Confira os produtos que encontramos para você.' : 'Explore os melhores produtos selecionados para esta categoria.'}
            </p>
          </div>
        )}

        <div className="products-header">
          <h2 className="section-title">
            {query || categoria ? 'Produtos encontrados' : 'Recém Adicionados (Novidades)'}
          </h2>
          
          <div className="sort-container">
            <span>Ordenar por:</span>
            <select>
              <option>Mais recentes</option>
              <option>Menor Preço</option>
              <option>Maior Preço</option>
            </select>
          </div>
        </div>

        {produtos.length > 0 ? (
          <div className="product-grid">
            {produtos.map((p) => (
              <ProductCard key={p.id} produto={p} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Nenhum produto encontrado</h3>
            <p style={{ color: 'var(--secondary)' }}>Tente ajustar seus filtros ou termos de busca.</p>
          </div>
        )}
      </main>
    </>
  );
}
