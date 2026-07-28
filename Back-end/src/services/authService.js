import { supabase } from '../lib/supabase.js'

export async function login(email, senha) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  })

  if (error) throw new Error(`Erro ao fazer login: ${error.message}`)
  return data
}

export async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) throw new Error(`Erro ao fazer logout: ${error.message}`)
}

export async function getUser() {
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) return null

  const { data: perfil } = await supabase
    .from('usuarios')
    .select('*')
    .eq('id', user.id)
    .single()

  return {
    id: user.id,
    email: user.email,
    ...perfil,
  }
}

export async function isAdmin() {
  const user = await getUser()
  return user?.role === 'admin'
}

export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session)
  })
}
