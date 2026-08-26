import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SobrePage() {
  return (
    <>
      <Header />
      <main className="container" style={{ padding: '4rem 2rem', minHeight: '60vh', maxWidth: '800px', margin: '0 auto' }}>
        
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '2rem', color: 'var(--primary)' }}>
          Sobre a Tudo Well
        </h1>

        <div style={{ background: '#fff', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--card-shadow)', border: '1px solid var(--card-border)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Como funciona a nossa vitrine?</h2>
          <p style={{ lineHeight: '1.8', color: 'var(--secondary)', marginBottom: '1.5rem' }}>
            A <strong>Tudo Well</strong> nasceu com um propósito simples: poupar o seu tempo. Sabemos que a internet está cheia de opções, e às vezes pode ser cansativo encontrar aquele produto perfeito, com boa avaliação e preço justo.
          </p>
          <p style={{ lineHeight: '1.8', color: 'var(--secondary)', marginBottom: '2.5rem' }}>
            Nós fazemos esse trabalho por você. Nossa equipe seleciona a dedo os melhores produtos do mercado — de tecnologia e eletrodomésticos a moda e literatura —, e os organizamos em uma vitrine limpa, direta e agradável.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Segurança e Transparência</h2>
          <div style={{ background: 'var(--background)', padding: '1.5rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--accent)', marginBottom: '2.5rem' }}>
            <p style={{ lineHeight: '1.8', color: 'var(--foreground)' }}>
              É importante ressaltar que a <strong>Tudo Well atua exclusivamente como uma vitrine de curadoria e indicação</strong>.
            </p>
            <p style={{ lineHeight: '1.8', color: 'var(--secondary)', marginTop: '1rem' }}>
              Nós não realizamos vendas diretas, não processamos pagamentos e não gerenciamos estoques. Ao se interessar por um produto e clicar nele, você será redirecionado para a loja parceira oficial (como Mercado Livre, Shopee, Amazon, entre outras). 
            </p>
            <p style={{ lineHeight: '1.8', color: 'var(--secondary)', marginTop: '1rem' }}>
              <strong>Toda a responsabilidade pela transação financeira, faturamento, prazo de entrega e garantia legal pertence inteiramente à loja vendedora.</strong> 
              Nossa alegria é apenas facilitar o seu encontro com a oferta ideal!
            </p>
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Ficou alguma dúvida?</h2>
          <p style={{ lineHeight: '1.8', color: 'var(--secondary)' }}>
            Se você tiver dúvidas sobre um pedido já realizado, recomendamos que acesse a sua conta na loja onde a compra foi finalizada (ex: acessando seus "Meus Pedidos" no aplicativo da Shopee ou Mercado Livre).
            Eles possuem canais de atendimento 24 horas preparados para solucionar qualquer questão sobre a entrega.
          </p>
        </div>

      </main>
      <Footer />
    </>
  );
}
