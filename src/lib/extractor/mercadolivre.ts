export async function extractMercadoLivre(url: string) {
  try {
    // 1. Resolve redirect if it's a shortlink
    let finalUrl = url;
    if (url.includes('mercadolivre.com') && url.length < 50) {
      const res = await fetch(url, { redirect: 'follow' });
      finalUrl = res.url;
    }

    // 2. Extract ITEM_ID (e.g. MLB1234567890)
    // It can be in the format: mercadolivre.com.br/MLB-12345-nome -> MLB12345
    // or mercadolivre.com.br/p/MLB12345 -> This is a catalog product (different API, but we'll try to extract)
    const mlbMatch = finalUrl.match(/MLB[-_]?\d+/i);
    if (!mlbMatch) {
      throw new Error("Não foi possível encontrar o ID do produto (MLB...) na URL.");
    }
    
    // Normalize ID: remove hyphens
    const itemId = mlbMatch[0].replace(/[-_]/g, '').toUpperCase();

    // 3. Call ML API
    const apiUrl = `https://api.mercadolibre.com/items/${itemId}`;
    const itemRes = await fetch(apiUrl);
    
    if (!itemRes.ok) {
      throw new Error(`Falha ao buscar dados na API do ML: ${itemRes.statusText}`);
    }
    
    const itemData = await itemRes.json();

    return {
      nome: itemData.title,
      preco: itemData.price,
      imagemUrl: itemData.pictures?.[0]?.url || itemData.thumbnail,
      plataforma: 'mercadolivre',
      linkAfiliado: url // mantemos o link original colado pelo admin
    };
  } catch (error: any) {
    console.error("Erro na extração ML:", error);
    throw new Error(error.message || "Erro ao processar o link do Mercado Livre");
  }
}
