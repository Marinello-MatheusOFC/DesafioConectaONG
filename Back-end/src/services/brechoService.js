import { supabase } from '../lib/supabase.js'
import { uploadImagem, atualizarImagem, removerImagem, BUCKETS } from '../utils/storage.js'

export async function listar() {
  const { data, error } = await supabase
    .from('produtos_brecho')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Erro ao listar produtos: ${error.message}`)
  return data
}

export async function buscarPorId(id) {
  const { data, error } = await supabase
    .from('produtos_brecho')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(`Erro ao buscar produto: ${error.message}`)
  return data
}

export async function cadastrar(dados, imagemFile = null) {
  let imagemUrl = null
  let imagemPath = null

  if (imagemFile) {
    const result = await uploadImagem(BUCKETS.BRECHO, imagemFile)
    imagemUrl = result.url
    imagemPath = result.path
  }

  const { data, error } = await supabase
    .from('produtos_brecho')
    .insert([{
      nome: dados.nome,
      descricao: dados.descricao,
      preco: dados.preco,
      categoria: dados.categoria,
      imagem_url: imagemUrl,
      disponivel: dados.disponivel ?? true,
    }])
    .select()
    .single()

  if (error) {
    if (imagemPath) await removerImagem(BUCKETS.BRECHO, imagemPath)
    throw new Error(`Erro ao cadastrar produto: ${error.message}`)
  }

  return { ...data, imagem_path: imagemPath }
}

export async function atualizar(id, dados, imagemFile = null) {
  const produtoAtual = await buscarPorId(id)
  const oldPath = produtoAtual.imagem_url
    ? produtoAtual.imagem_url.split('/').pop()
    : null

  let imagemUrl = produtoAtual.imagem_url
  let imagemPath = null

  if (imagemFile) {
    const result = await atualizarImagem(BUCKETS.BRECHO, oldPath, imagemFile)
    imagemUrl = result.url
    imagemPath = result.path
  }

  const { data, error } = await supabase
    .from('produtos_brecho')
    .update({
      nome: dados.nome,
      descricao: dados.descricao,
      preco: dados.preco,
      categoria: dados.categoria,
      disponivel: dados.disponivel,
      ...(imagemUrl && { imagem_url: imagemUrl }),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(`Erro ao atualizar produto: ${error.message}`)
  return { ...data, imagem_path: imagemPath }
}

export async function excluir(id) {
  const produto = await buscarPorId(id)

  if (produto.imagem_url) {
    const filePath = produto.imagem_url.split('/').pop()
    await removerImagem(BUCKETS.BRECHO, filePath)
  }

  const { error } = await supabase
    .from('produtos_brecho')
    .delete()
    .eq('id', id)

  if (error) throw new Error(`Erro ao excluir produto: ${error.message}`)
}
