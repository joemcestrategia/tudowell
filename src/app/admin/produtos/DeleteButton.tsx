'use client';

import { useTransition } from 'react';
import { excluirProduto } from './actions';

export default function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir este produto permanentemente?')) {
      startTransition(async () => {
        const formData = new FormData();
        formData.append('id', id);
        await excluirProduto(formData);
      });
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={isPending}
      style={{ color: '#ef4444', fontWeight: 600, background: 'none', cursor: 'pointer', border: 'none' }}
    >
      {isPending ? 'Excluindo...' : 'Excluir'}
    </button>
  );
}
