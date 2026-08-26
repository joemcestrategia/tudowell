'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function salvarProduto(formData: FormData) {
  const nome = formData.get('nome') as string;
  const precoStr = formData.get('preco') as string;
  const avaliacaoStr = formData.get('avaliacao') as string;
  const imagemUrl = formData.get('imagemUrl') as string;
  const linkAfiliado = formData.get('linkAfiliado') as string;
  const plataforma = formData.get('plataforma') as string;
  const categoria = formData.get('categoria') as string;
  const subcategoria = formData.get('subcategoria') as string;
  const ordemStr = formData.get('ordem') as string;

  const preco = precoStr ? parseFloat(precoStr) : null;
  const avaliacao = avaliacaoStr ? parseFloat(avaliacaoStr) : null;
  const ordem = parseInt(ordemStr || '0', 10);

  await prisma.produto.create({
    data: {
      nome,
      preco,
      avaliacao,
      imagemUrl,
      linkAfiliado,
      plataforma,
      categoria: categoria || null,
      subcategoria: subcategoria || null,
      ordem,
      status: 'ATIVO'
    }
  });

  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin');
}
