import { useState, useEffect } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import AnimalCard from '../components/AnimalCard.jsx'
import AnimalCardSkeleton from '../components/AnimalCardSkeleton.jsx'
import { listar } from '../services/animalService.js'

export default function Animais() {
  const [animais, setAnimais] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('todos')

  useEffect(() => {
    async function load() {
      try {
        const data = await listar()
        setAnimais(data)
      } catch (err) {
        console.error('Erro ao carregar animais:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = filter === 'todos'
    ? animais
    : filter === 'disponiveis'
      ? animais.filter(a => !a.adotado)
      : animais.filter(a => a.adotado)

  return (
    <>
      <PageHeader
        title="Animais para Adoção"
        description="Conheça nossos animais resgatados que esperam por um lar cheio de amor."
      />

      <div className="filter-bar">
        <div className="container">
          <div className="filter-group">
            {[
              { key: 'todos', label: 'Todos' },
              { key: 'disponiveis', label: 'Disponíveis' },
              { key: 'adotados', label: 'Adotados' },
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
            <div className="animals-grid">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <AnimalCardSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center" style={{ padding: 'var(--space-10) 0' }}>
              <i className="fas fa-paw" style={{ fontSize: '3rem', color: 'var(--text-tertiary)', marginBottom: 'var(--space-3)' }}></i>
              <h3 style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Nenhum animal encontrado</h3>
            </div>
          ) : (
            <div className="animals-grid">
              {filtered.map(animal => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
