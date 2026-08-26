import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// We use a dummy client if keys are not provided so the build doesn't fail,
// but upload will fail at runtime.
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export async function uploadImageFromUrl(imageUrl: string): Promise<string> {
  if (!supabase) {
    throw new Error("Supabase não está configurado. Verifique as variáveis de ambiente.");
  }

  try {
    // 1. Download image
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error(`Falha ao baixar imagem original: ${response.statusText}`);
    
    const buffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    
    // 2. Generate random filename
    const ext = contentType.split('/')[1] || 'jpg';
    const filename = `${randomUUID()}.${ext}`;

    // 3. Upload to Supabase Storage (bucket: 'produtos')
    const { data, error } = await supabase.storage
      .from('produtos')
      .upload(filename, buffer, {
        contentType,
        upsert: false
      });

    if (error) {
      throw error;
    }

    // 4. Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('produtos')
      .getPublicUrl(filename);

    return publicUrlData.publicUrl;
  } catch (error: any) {
    console.error("Erro no upload de imagem:", error);
    throw new Error("Erro ao salvar imagem no storage: " + error.message);
  }
}
