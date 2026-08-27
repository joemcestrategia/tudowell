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

export async function atualizarProduto(formData: FormData) {
  const id = formData.get('id') as string;
  const nome = formData.get('nome') as string;
  const precoStr = formData.get('preco') as string;
  const avaliacaoStr = formData.get('avaliacao') as string;
  const imagemUrl = formData.get('imagemUrl') as string;
  const linkAfiliado = formData.get('linkAfiliado') as string;
  const plataforma = formData.get('plataforma') as string;
  const categoria = formData.get('categoria') as string;
  const subcategoria = formData.get('subcategoria') as string;
  const ordemStr = formData.get('ordem') as string;
  const status = formData.get('status') as string;

  const preco = precoStr ? parseFloat(precoStr) : null;
  const avaliacao = avaliacaoStr ? parseFloat(avaliacaoStr) : null;
  const ordem = parseInt(ordemStr || '0', 10);

  if (!id) {
    throw new Error("ID do produto é obrigatório para atualização.");
  }

  await prisma.produto.update({
    where: { id },
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
      status: (status as any) || 'ATIVO',
    }
  });

  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin');
}

export async function excluirProduto(formData: FormData) {
  const id = formData.get('id') as string;
  if (!id) throw new Error("ID não fornecido");

  await prisma.produto.delete({
    where: { id }
  });

  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin');
}
