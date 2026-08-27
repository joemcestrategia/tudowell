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
  const subcategoria = typeof sp?.subcategoria === 'string' ? sp.subcategoria : undefined;
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
  if (subcategoria) where.subcategoria = subcategoria;
  if (plataforma) where.plataforma = plataforma;

  let produtos: any[] = [];
  let availableSubcategories: string[] = [];
  try {
    produtos = await prisma.produto.findMany({
      where,
      orderBy: [orderBy, { ordem: 'desc' }],
    });

    if (categoria) {
      const distinctSubs = await prisma.produto.findMany({
        where: { categoria, status: 'ATIVO', subcategoria: { not: null } },
        select: { subcategoria: true },
        distinct: ['subcategoria']
      });
      availableSubcategories = distinctSubs.map(s => s.subcategoria).filter(Boolean) as string[];
    }
  } catch (error) {
    produtos = [];
  }

  // Removendo os produtos fake com preços hardcoded.
  // Como é apenas vitrine de afiliado, só mostraremos produtos que de fato vieram do DB.
  // if (produtos.length === 0 && !query) {
  //   produtos = [...]
  // }

  const getBannerImage = (cat?: string) => {
    switch (cat) {
      case 'tecnologia': return '/images/banners/banner_tech.jpg';
      case 'eletro': return '/images/banners/banner_home.jpg';
      case 'religiosos': return '/images/banners/banner_religious.jpg';
      case 'moda-masculina': return '/images/banners/banner_men.jpg';
      case 'moda-feminina': return '/images/banners/banner_women.jpg';
      case 'beleza': return '/images/banners/banner_beauty.jpg';
      case 'esportes': return '/images/banners/banner_sports.jpg';
      case 'infantil': return '/images/banners/banner_kids.jpg';
      case 'casa': return '/images/banners/banner_house.jpg';
      case 'lancamentos': return '/images/banners/banner_new.jpg';
      case 'biblias': return '/images/banners/banner_bibles.jpg';
      case 'moda': return '/images/banners/banner_fashion.jpg';
      default: return '/images/hero_megastore.jpg';
    }
  };

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
            position: 'relative',
            width: '100%',
            height: '250px',
            marginBottom: '2rem',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${getBannerImage(categoria)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} />
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.4))'
            }} />
            <div style={{
              position: 'relative',
              zIndex: 1,
              textAlign: 'center',
              color: '#fff',
              padding: '0 2rem'
            }}>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>
                {query ? `Busca: "${query}"` : subcategoria ? subcategoria.replace('-', ' ') : categoria?.replace('-', ' ')}
              </h1>
              <p style={{ opacity: 0.9, marginTop: '0.5rem', fontSize: '1.1rem' }}>
                {query ? 'Confira os produtos que encontramos para você.' : subcategoria ? `Explorando ${subcategoria.replace('-', ' ')} em ${categoria?.replace('-', ' ')}` : 'Explore os melhores produtos selecionados para esta categoria.'}
              </p>
            </div>
          </div>
        )}

        {/* Subcategorias Pills */}
        {availableSubcategories.length > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem', justifyContent: 'center' }}>
            <Link 
              href={`/?categoria=${categoria}`}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '2rem',
                fontWeight: 600,
                fontSize: '0.875rem',
                border: '1px solid var(--primary)',
                background: !subcategoria ? 'var(--primary)' : 'transparent',
                color: !subcategoria ? '#fff' : 'var(--primary)'
              }}
            >
              Todos
            </Link>
            {availableSubcategories.map(sub => (
              <Link
                key={sub}
                href={`/?categoria=${categoria}&subcategoria=${sub}`}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '2rem',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  border: '1px solid var(--primary)',
                  background: subcategoria === sub ? 'var(--primary)' : 'transparent',
                  color: subcategoria === sub ? '#fff' : 'var(--primary)'
                }}
              >
                {sub}
              </Link>
            ))}
          </div>
        )}

        {produtos.length > 0 && (
          <>
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

            <div className="product-grid">
              {produtos.map((p) => (
                <ProductCard key={p.id} produto={p} />
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}
