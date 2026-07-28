import { supabase } from '../lib/supabase.js'
import { uploadImagem, atualizarImagem, removerImagem, BUCKETS } from '../utils/storage.js'

export async function listar() {
  const { data, error } = await supabase
    .from('eventos')
    .select('*')
    .order('data', { ascending: false })

  if (error) throw new Error(`Erro ao listar eventos: ${error.message}`)
  return data
}

export async function buscarPorId(id) {
  const { data, error } = await supabase
    .from('eventos')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(`Erro ao buscar evento: ${error.message}`)
  return data
}

export async function cadastrar(dados, imagemFile = null) {
  let imagemUrl = null
  let imagemPath = null

  if (imagemFile) {
    const result = await uploadImagem(BUCKETS.EVENTOS, imagemFile)
    imagemUrl = result.url
    imagemPath = result.path
  }

  const { data, error } = await supabase
    .from('eventos')
    .insert([{
      titulo: dados.titulo,
      descricao: dados.descricao,
      data: dados.data,
      local: dados.local,
      imagem_url: imagemUrl,
    }])
    .select()
    .single()

  if (error) {
    if (imagemPath) await removerImagem(BUCKETS.EVENTOS, imagemPath)
    throw new Error(`Erro ao cadastrar evento: ${error.message}`)
  }

  return { ...data, imagem_path: imagemPath }
}

export async function atualizar(id, dados, imagemFile = null) {
  const eventoAtual = await buscarPorId(id)
  const oldPath = eventoAtual.imagem_url
    ? eventoAtual.imagem_url.split('/').pop()
    : null

  let imagemUrl = eventoAtual.imagem_url
  let imagemPath = null

  if (imagemFile) {
    const result = await atualizarImagem(BUCKETS.EVENTOS, oldPath, imagemFile)
    imagemUrl = result.url
    imagemPath = result.path
  }

  const { data, error } = await supabase
    .from('eventos')
    .update({
      titulo: dados.titulo,
      descricao: dados.descricao,
      data: dados.data,
      local: dados.local,
      ...(imagemUrl && { imagem_url: imagemUrl }),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(`Erro ao atualizar evento: ${error.message}`)
  return { ...data, imagem_path: imagemPath }
}

export async function excluir(id) {
  const evento = await buscarPorId(id)

  if (evento.imagem_url) {
    const filePath = evento.imagem_url.split('/').pop()
    await removerImagem(BUCKETS.EVENTOS, filePath)
  }

  const { error } = await supabase
    .from('eventos')
    .delete()
    .eq('id', id)

  if (error) throw new Error(`Erro ao excluir evento: ${error.message}`)
}
