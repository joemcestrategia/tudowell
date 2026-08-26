import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractShopee } from '@/lib/extractor/shopee';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    // Autenticação básica
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const produtosAtivos = await prisma.produto.findMany({
      where: { status: 'ATIVO' }
    });

    let expiradosCount = 0;

    for (const produto of produtosAtivos) {
      let isExpirado = false;

      try {
        if (produto.plataforma === 'mercadolivre') {
          // Extrair ID
          const mlbMatch = produto.linkAfiliado.match(/MLB[-_]?\d+/i);
          if (mlbMatch) {
            const itemId = mlbMatch[0].replace(/[-_]/g, '').toUpperCase();
            const res = await fetch(`https://api.mercadolibre.com/items/${itemId}`);
            
            if (res.status === 404) {
              isExpirado = true;
            } else if (res.ok) {
              const data = await res.json();
              if (['closed', 'under_review', 'paused'].includes(data.status)) {
                // TODO: lógica de "2 checagens" sugerida pelo prompt poderia ser
                // salva em um campo de fallback, mas marcaremos como expirado temporariamente.
                isExpirado = true;
              }
            }
          }
        } else if (produto.plataforma === 'shopee') {
          // Shopee check
          try {
            await extractShopee(produto.linkAfiliado);
          } catch {
            isExpirado = true;
          }
        }
      } catch (err) {
        console.error(`Erro ao checar produto ${produto.id}`, err);
      }

      if (isExpirado) {
        await prisma.produto.update({
          where: { id: produto.id },
          data: { 
            status: 'EXPIRADO',
            ultimaChecagem: new Date()
          }
        });
        expiradosCount++;
      } else {
        await prisma.produto.update({
          where: { id: produto.id },
          data: { ultimaChecagem: new Date() }
        });
      }
    }

    return NextResponse.json({ success: true, checked: produtosAtivos.length, expirados: expiradosCount });
  } catch (error: any) {
    console.error("Cron Job Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
