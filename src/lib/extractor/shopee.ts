import * as cheerio from 'cheerio';

export async function extractShopee(url: string) {
  try {
    // Para Shopee, usamos o Microlink como fallback/primary pois bot-blocking é agressivo
    const microlinkKey = process.env.MICROLINK_API_KEY;
    
    // Usamos a API do Microlink para extrair o meta tag (fallback gratuito se não tiver key, mas rate limited)
    const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&filter=title,image`;
    
    const headers: Record<string, string> = {};
    if (microlinkKey) {
      headers['x-api-key'] = microlinkKey;
    }

    const res = await fetch(apiUrl, { headers });
    
    if (res.ok) {
      const data = await res.json();
      if (data.status === 'success' && data.data) {
        return {
          nome: data.data.title || 'Produto Shopee',
          preco: null, // Shopee via meta tags geralmente não traz preço confiável no og:title
          imagemUrl: data.data.image?.url || '',
          plataforma: 'shopee',
          linkAfiliado: url
        };
      }
    }
    
    // Fallback: fetch direto usando cheerio (geralmente bloqueado se não for puppeteer)
    const directRes = await fetch(url, { redirect: 'follow', headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
    } });
    
    const html = await directRes.text();
    const $ = cheerio.load(html);
    
    const title = $('meta[property="og:title"]').attr('content') || $('title').text();
    const image = $('meta[property="og:image"]').attr('content');

    if (!title || !image) {
      throw new Error("Não foi possível extrair nome e imagem da Shopee.");
    }

    return {
      nome: title,
      preco: null,
      imagemUrl: image,
      plataforma: 'shopee',
      linkAfiliado: url
    };
  } catch (error: any) {
    console.error("Erro na extração Shopee:", error);
    throw new Error(error.message || "Erro ao processar o link da Shopee");
  }
}
