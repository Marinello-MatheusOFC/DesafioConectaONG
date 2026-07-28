import { supabase } from '../lib/supabase.js'

const BUCKETS = {
  ANIMAIS: 'animais',
  EVENTOS: 'eventos',
  BRECHO: 'brecho',
}

function getBucketPath(bucket, fileName) {
  return `${Date.now()}_${fileName}`
}

export async function uploadImagem(bucket, file) {
  const filePath = getBucketPath(bucket, file.name)

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) throw new Error(`Erro ao fazer upload: ${error.message}`)

  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path)

  return {
    path: data.path,
    url: urlData.publicUrl,
  }
}

export async function atualizarImagem(bucket, oldPath, newFile) {
  if (oldPath) {
    await removerImagem(bucket, oldPath)
  }

  return uploadImagem(bucket, newFile)
}

export async function removerImagem(bucket, filePath) {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([filePath])

  if (error) throw new Error(`Erro ao remover imagem: ${error.message}`)
}

export { BUCKETS }
