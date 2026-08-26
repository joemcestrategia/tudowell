import { NextResponse } from 'next/server';
import { extractMercadoLivre } from '@/lib/extractor/mercadolivre';
import { extractShopee } from '@/lib/extractor/shopee';
import { uploadImageFromUrl } from '@/lib/storage';

export async function POST(request: Request) {
  try {
    const { link } = await request.json();
    
    if (!link) {
      return NextResponse.json({ error: 'Link é obrigatório' }, { status: 400 });
    }

    let data: any;

    if (link.includes('mercadolivre.com') || link.includes('mercadolibre.com') || link.includes('meli.la')) {
      data = await extractMercadoLivre(link);
    } else if (link.includes('shopee.com') || link.includes('s.shopee.com')) {
      data = await extractShopee(link);
    } else {
      return NextResponse.json({ error: 'Plataforma não suportada. Use Mercado Livre ou Shopee.' }, { status: 400 });
    }

    // Attempt to upload image to our storage
    try {
      if (data.imagemUrl) {
        const publicUrl = await uploadImageFromUrl(data.imagemUrl);
        data.imagemUrl = publicUrl; // replace original with our stored version
      }
    } catch (uploadError: any) {
      console.warn("Upload falhou, mantendo URL original:", uploadError);
      // We could throw here, but for resilience, we return the original URL and a warning
      data.warning = "A imagem não pôde ser salva no Storage, usando URL externa temporariamente.";
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Extração Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
