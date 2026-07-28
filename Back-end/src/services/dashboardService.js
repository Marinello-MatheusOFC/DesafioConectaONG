import { supabase } from '../lib/supabase.js'

export async function getQuantidadeAnimais() {
  const { count, error } = await supabase
    .from('animais')
    .select('*', { count: 'exact', head: true })

  if (error) throw new Error(`Erro ao contar animais: ${error.message}`)
  return count
}

export async function getQuantidadeAnimaisAdotados() {
  const { count, error } = await supabase
    .from('animais')
    .select('*', { count: 'exact', head: true })
    .eq('adotado', true)

  if (error) throw new Error(`Erro ao contar animais adotados: ${error.message}`)
  return count
}

export async function getQuantidadeAnimaisDisponiveis() {
  const { count, error } = await supabase
    .from('animais')
    .select('*', { count: 'exact', head: true })
    .eq('adotado', false)

  if (error) throw new Error(`Erro ao contar animais disponíveis: ${error.message}`)
  return count
}

export async function getQuantidadeEventos() {
  const { count, error } = await supabase
    .from('eventos')
    .select('*', { count: 'exact', head: true })

  if (error) throw new Error(`Erro ao contar eventos: ${error.message}`)
  return count
}

export async function getQuantidadeProdutos() {
  const { count, error } = await supabase
    .from('produtos_brecho')
    .select('*', { count: 'exact', head: true })

  if (error) throw new Error(`Erro ao contar produtos: ${error.message}`)
  return count
}

export async function getQuantidadeMensagens() {
  const { count, error } = await supabase
    .from('mensagens')
    .select('*', { count: 'exact', head: true })

  if (error) throw new Error(`Erro ao contar mensagens: ${error.message}`)
  return count
}
