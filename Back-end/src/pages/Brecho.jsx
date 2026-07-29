import { useState, useEffect } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { listar } from '../services/brechoService.js'

export default function Brecho() {
  const [produtos, setProdutos] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('todos')

  useEffect(() => {
    async function load() {
      try {
        const data = await listar()
        setProdutos(data)
      } catch (err) {
        console.error('Erro ao carregar produtos:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = filter === 'todos'
    ? produtos
    : filter === 'disponiveis'
      ? produtos.filter(p => p.disponivel)
      : produtos.filter(p => !p.disponivel)

  return (
    <>
      <PageHeader
        title="Brechó Solidário"
        description="Compre no nosso brechó e ajude a transformar vidas. Todo valor arrecadado é revertido para os animais."
      />

      <div className="filter-bar">
        <div className="container">
          <div className="filter-group">
            {[
              { key: 'todos', label: 'Todos' },
              { key: 'disponiveis', label: 'Disponíveis' },
              { key: 'indisponiveis', label: 'Vendidos' },
            ].map(f => (
              <button
                key={f.key}
                className={`filter-btn${filter === f.key ? ' active' : ''}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {loading ? (
            <div className="products-grid">
              {[1, 2, 3].map(i => (
                <div key={i} className="product-card" style={{ pointerEvents: 'none' }}>
                  <div className="shimmer" style={{ width: '100%', aspectRatio: '4/3' }}></div>
                  <div style={{ padding: 'var(--space-3)' }}>
                    <div className="shimmer" style={{ width: '60%', height: '20px', marginBottom: '12px', borderRadius: '4px' }}></div>
                    <div className="shimmer" style={{ width: '80%', height: '14px', marginBottom: '8px', borderRadius: '4px' }}></div>
                    <div className="shimmer" style={{ width: '30%', height: '20px', borderRadius: '4px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center" style={{ padding: 'var(--space-10) 0' }}>
              <i className="fas fa-box-open" style={{ fontSize: '3rem', color: 'var(--text-tertiary)', marginBottom: 'var(--space-3)' }}></i>
              <h3 style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Nenhum produto encontrado</h3>
            </div>
          ) : (
            <div className="products-grid">
              {filtered.map(produto => (
                <ProductCard key={produto.id} produto={produto} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
