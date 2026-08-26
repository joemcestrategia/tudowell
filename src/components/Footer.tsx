import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#0a192f', color: '#fff', padding: '4rem 2rem 2rem', marginTop: '4rem' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        
        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-1px', marginBottom: '1rem' }}>
            Tudo<span style={{ color: 'var(--accent)', fontWeight: 800 }}>|</span>Well
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6' }}>
            Nossa missão é garimpar e selecionar os melhores produtos da internet para você. 
            Facilitamos sua jornada de compra reunindo qualidade, inovação e estilo em uma única vitrine.
          </p>
        </div>

        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Sobre a Loja
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>
              <Link href="/sobre" style={{ color: '#cbd5e1', fontSize: '0.9rem', textDecoration: 'none' }}>
                Como Funciona?
              </Link>
            </li>
            <li>
              <Link href="/sobre" style={{ color: '#cbd5e1', fontSize: '0.9rem', textDecoration: 'none' }}>
                Perguntas Frequentes
              </Link>
            </li>
            <li>
              <Link href="/sobre" style={{ color: '#cbd5e1', fontSize: '0.9rem', textDecoration: 'none' }}>
                Termos de Uso
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Transparência
          </h4>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.6', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            A Tudo Well é uma plataforma de curadoria. Atuamos exclusivamente como uma <strong>vitrine de indicações</strong>. 
            Toda a responsabilidade sobre o pagamento, faturamento, entrega e garantia é integralmente das lojas parceiras oficiais (como Mercado Livre, Shopee, etc) para onde você é redirecionado.
          </p>
        </div>

      </div>
      
      <div className="container" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center', color: '#64748b', fontSize: '0.8rem' }}>
        <p>&copy; {new Date().getFullYear()} Tudo Well. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
