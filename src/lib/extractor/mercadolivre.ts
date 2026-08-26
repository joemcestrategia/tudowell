export async function extractMercadoLivre(url: string) {
  try {
    // 1. Resolve redirect if it's a shortlink (meli.la or short url)
    let finalUrl = url;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
      },
      redirect: 'follow'
    });
    finalUrl = res.url;

    // 2. Try to Extract ITEM_ID (e.g. MLB1234567890)
    const mlbMatch = finalUrl.match(/MLB[-_]?\d+/i);
    if (mlbMatch) {
      const itemId = mlbMatch[0].replace(/[-_]/g, '').toUpperCase();
      const apiUrl = `https://api.mercadolibre.com/items/${itemId}`;
      const itemRes = await fetch(apiUrl);
      if (itemRes.ok) {
        const itemData = await itemRes.json();
        return {
          nome: itemData.title,
          preco: itemData.price,
          imagemUrl: itemData.pictures?.[0]?.url || itemData.thumbnail,
          plataforma: 'mercadolivre',
          linkAfiliado: url
        };
      }
    }

    // 3. Fallback: Parse HTML directly (for social/affiliate affiliate landing pages)
    const html = await res.text();
    const ogTitle = html.match(/<meta\s+property=["']og:title["']\s+content=["'](.*?)["']/i)?.[1] || html.match(/<title>(.*?)<\/title>/i)?.[1];
    const ogImage = html.match(/<meta\s+property=["']og:image["']\s+content=["'](.*?)["']/i)?.[1];
    const priceMatch = html.match(/class=["']andes-money-amount__fraction["'][^>]*>(.*?)<\/span>/i);
    const price = priceMatch?.[1] ? parseFloat(priceMatch[1].replace(/\./g, '').replace(',', '.')) : null;

    if (!ogTitle) {
      throw new Error("Não foi possível extrair os dados deste anúncio do Mercado Livre.");
    }

    return {
      nome: ogTitle,
      preco: price,
      imagemUrl: ogImage || '',
      plataforma: 'mercadolivre',
      linkAfiliado: url
    };
  } catch (error: any) {
    console.error("Erro na extração ML:", error);
    throw new Error(error.message || "Erro ao processar o link do Mercado Livre");
  }
}
