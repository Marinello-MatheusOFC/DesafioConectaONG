import { useState, useEffect } from 'react'
import { getUser, isAdmin, onAuthStateChange } from '../services/authService.js'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [admin, setAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function carregarUsuario() {
      try {
        const usuario = await getUser()
        setUser(usuario)
        setAdmin(usuario?.role === 'admin')
      } catch {
        setUser(null)
        setAdmin(false)
      } finally {
        setLoading(false)
      }
    }

    carregarUsuario()

    const subscription = onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        carregarUsuario()
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setAdmin(false)
      }
    })

    return () => {
      subscription.data?.subscription?.unsubscribe()
    }
  }, [])

  async function refreshUser() {
    setLoading(true)
    const usuario = await getUser()
    setUser(usuario)
    setAdmin(usuario?.role === 'admin')
    setLoading(false)
  }

  return {
    user,
    admin,
    loading,
    refreshUser,
    isAuthenticated: !!user,
    isAdmin: admin,
  }
}
