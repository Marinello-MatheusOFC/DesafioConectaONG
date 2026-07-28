import { supabase } from '../lib/supabase.js'
import { uploadImagem, atualizarImagem, removerImagem, BUCKETS } from '../utils/storage.js'

export async function listar() {
  const { data, error } = await supabase
    .from('animais')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Erro ao listar animais: ${error.message}`)
  return data
}

export async function buscarPorId(id) {
  const { data, error } = await supabase
    .from('animais')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(`Erro ao buscar animal: ${error.message}`)
  return data
}

export async function cadastrar(dados, imagemFile = null) {
  let imagemUrl = null
  let imagemPath = null

  if (imagemFile) {
    const result = await uploadImagem(BUCKETS.ANIMAIS, imagemFile)
    imagemUrl = result.url
    imagemPath = result.path
  }

  const { data, error } = await supabase
    .from('animais')
    .insert([{
      nome: dados.nome,
      idade: dados.idade,
      sexo: dados.sexo,
      porte: dados.porte,
      descricao: dados.descricao,
      vacinado: dados.vacinado,
      castrado: dados.castrado,
      adotado: dados.adotado ?? false,
      imagem_url: imagemUrl,
    }])
    .select()
    .single()

  if (error) {
    if (imagemPath) await removerImagem(BUCKETS.ANIMAIS, imagemPath)
    throw new Error(`Erro ao cadastrar animal: ${error.message}`)
  }

  return { ...data, imagem_path: imagemPath }
}

export async function atualizar(id, dados, imagemFile = null) {
  const animalAtual = await buscarPorId(id)
  const oldPath = animalAtual.imagem_url
    ? animalAtual.imagem_url.split('/').pop()
    : null

  let imagemUrl = animalAtual.imagem_url
  let imagemPath = null

  if (imagemFile) {
    const result = await atualizarImagem(BUCKETS.ANIMAIS, oldPath, imagemFile)
    imagemUrl = result.url
    imagemPath = result.path
  }

  const { data, error } = await supabase
    .from('animais')
    .update({
      nome: dados.nome,
      idade: dados.idade,
      sexo: dados.sexo,
      porte: dados.porte,
      descricao: dados.descricao,
      vacinado: dados.vacinado,
      castrado: dados.castrado,
      adotado: dados.adotado,
      ...(imagemUrl && { imagem_url: imagemUrl }),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(`Erro ao atualizar animal: ${error.message}`)
  return { ...data, imagem_path: imagemPath }
}

export async function excluir(id) {
  const animal = await buscarPorId(id)

  if (animal.imagem_url) {
    const filePath = animal.imagem_url.split('/').pop()
    await removerImagem(BUCKETS.ANIMAIS, filePath)
  }

  const { error } = await supabase
    .from('animais')
    .delete()
    .eq('id', id)

  if (error) throw new Error(`Erro ao excluir animal: ${error.message}`)
}
