import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { logout } from '../services/authService.js'
import {
  getQuantidadeAnimais,
  getQuantidadeAnimaisAdotados,
  getQuantidadeAnimaisDisponiveis,
  getQuantidadeEventos,
  getQuantidadeProdutos,
  getQuantidadeMensagens,
} from '../services/dashboardService.js'

export default function Admin() {
  const { user, admin, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [statsLoading, setStatsLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login')
    }
  }, [user, authLoading, navigate])

  useEffect(() => {
    if (admin) {
      async function loadStats() {
        try {
          const data = await Promise.all([
            getQuantidadeAnimais(),
            getQuantidadeAnimaisAdotados(),
            getQuantidadeAnimaisDisponiveis(),
            getQuantidadeEventos(),
            getQuantidadeProdutos(),
            getQuantidadeMensagens(),
          ])
          setStats({
            animais: data[0],
            adotados: data[1],
            disponiveis: data[2],
            eventos: data[3],
            produtos: data[4],
            mensagens: data[5],
          })
        } catch (err) {
          console.error('Erro ao carregar estatísticas:', err)
        } finally {
          setStatsLoading(false)
        }
      }
      loadStats()
    }
  }, [admin])

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  if (authLoading) {
    return (
      <div className="flex-center" style={{ minHeight: '100vh', paddingTop: '80px' }}>
        <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--primary)' }}></i>
      </div>
    )
  }

  if (!user) return null

  return (
    <>
      <PageHeader title="Painel Administrativo" description="Gerencie o conteúdo do site." />

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
            <div>
              <h3 style={{ marginBottom: '4px' }}>Bem-vindo, {user?.nome || user?.email}</h3>
              <p className="caption">{admin ? 'Administrador' : 'Usuário'}</p>
            </div>
            <button className="btn btn-outline" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Sair
            </button>
          </div>

          {statsLoading ? (
            <div className="stats-row">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="stat-card">
                  <div className="shimmer" style={{ width: '48px', height: '48px', borderRadius: 'var(--r-md)', margin: '0 auto var(--space-2)' }}></div>
                  <div className="shimmer" style={{ width: '60%', height: '28px', margin: '0 auto 8px', borderRadius: '4px' }}></div>
                  <div className="shimmer" style={{ width: '40%', height: '14px', margin: '0 auto', borderRadius: '4px' }}></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-card-icon"><i className="fas fa-paw"></i></div>
                <span className="stat-card-value">{stats?.animais ?? 0}</span>
                <span className="stat-card-label">Total de Animais</span>
              </div>
              <div className="stat-card">
                <div className="stat-card-icon"><i className="fas fa-home"></i></div>
                <span className="stat-card-value">{stats?.adotados ?? 0}</span>
                <span className="stat-card-label">Adotados</span>
              </div>
              <div className="stat-card">
                <div className="stat-card-icon"><i className="fas fa-heart"></i></div>
                <span className="stat-card-value">{stats?.disponiveis ?? 0}</span>
                <span className="stat-card-label">Disponíveis</span>
              </div>
              <div className="stat-card">
                <div className="stat-card-icon"><i className="fas fa-calendar"></i></div>
                <span className="stat-card-value">{stats?.eventos ?? 0}</span>
                <span className="stat-card-label">Eventos</span>
              </div>
              <div className="stat-card">
                <div className="stat-card-icon"><i className="fas fa-box-open"></i></div>
                <span className="stat-card-value">{stats?.produtos ?? 0}</span>
                <span className="stat-card-label">Produtos</span>
              </div>
              <div className="stat-card">
                <div className="stat-card-icon"><i className="fas fa-envelope"></i></div>
                <span className="stat-card-value">{stats?.mensagens ?? 0}</span>
                <span className="stat-card-label">Mensagens</span>
              </div>
            </div>
          )}

          {!admin && (
            <div className="text-center" style={{ marginTop: 'var(--space-8)', padding: 'var(--space-6)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)' }}>
              <i className="fas fa-shield-alt" style={{ fontSize: '2rem', color: 'var(--warning)', marginBottom: 'var(--space-2)' }}></i>
              <p style={{ color: 'var(--text-secondary)' }}>Você não possui permissão de administrador para gerenciar conteúdo.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
