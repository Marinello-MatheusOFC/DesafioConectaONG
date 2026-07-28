import { supabase } from '../lib/supabase.js'

export async function listar() {
  const { data, error } = await supabase
    .from('mensagens')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Erro ao listar mensagens: ${error.message}`)
  return data
}

export async function cadastrar(dados) {
  const { data, error } = await supabase
    .from('mensagens')
    .insert([{
      nome: dados.nome,
      email: dados.email,
      telefone: dados.telefone,
      assunto: dados.assunto,
      mensagem: dados.mensagem,
    }])
    .select()
    .single()

  if (error) throw new Error(`Erro ao enviar mensagem: ${error.message}`)
  return data
}

export async function excluir(id) {
  const { error } = await supabase
    .from('mensagens')
    .delete()
    .eq('id', id)

  if (error) throw new Error(`Erro ao excluir mensagem: ${error.message}`)
}
