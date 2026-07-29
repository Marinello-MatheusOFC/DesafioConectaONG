import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import { login } from '../services/authService.js'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(email, senha)
      navigate('/admin')
    } catch (err) {
      setError('E-mail ou senha inválidos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageHeader title="Área do Administrador" description="Faça login para gerenciar o conteúdo do site." />

      <section className="section">
        <div className="container" style={{ maxWidth: '480px', margin: '0 auto' }}>
          <div className="form-card">
            <h3 style={{ textAlign: 'center', marginBottom: 'var(--space-5)' }}>Entrar</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@email.com" />
              </div>
              <div className="form-group">
                <label htmlFor="senha">Senha</label>
                <input type="password" id="senha" value={senha} onChange={e => setSenha(e.target.value)} required placeholder="••••••••" />
              </div>
              {error && <p style={{ color: 'var(--danger)', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>{error}</p>}
              <button type="submit" className={`btn btn-primary${loading ? ' btn-loading' : ''}`} style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
