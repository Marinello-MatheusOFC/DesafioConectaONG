import { useState, useEffect } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import EventCard from '../components/EventCard.jsx'
import { listar } from '../services/eventoService.js'

export default function Eventos() {
  const [eventos, setEventos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await listar()
        setEventos(data)
      } catch (err) {
        console.error('Erro ao carregar eventos:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <>
      <PageHeader
        title="Eventos"
        description="Participe dos nossos eventos e ajude a transformar vidas."
      />

      <section className="section">
        <div className="container">
          {loading ? (
            <div className="events-grid">
              {[1, 2, 3].map(i => (
                <div key={i} className="event-card" style={{ pointerEvents: 'none' }}>
                  <div className="shimmer" style={{ width: '100%', aspectRatio: '3/2' }}></div>
                  <div style={{ padding: 'var(--space-3)' }}>
                    <div className="shimmer" style={{ width: '70%', height: '20px', marginBottom: '12px', borderRadius: '4px' }}></div>
                    <div className="shimmer" style={{ width: '100%', height: '14px', borderRadius: '4px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : eventos.length === 0 ? (
            <div className="text-center" style={{ padding: 'var(--space-10) 0' }}>
              <i className="fas fa-calendar" style={{ fontSize: '3rem', color: 'var(--text-tertiary)', marginBottom: 'var(--space-3)' }}></i>
              <h3 style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Nenhum evento agendado no momento</h3>
            </div>
          ) : (
            <div className="events-grid">
              {eventos.map(evento => (
                <EventCard key={evento.id} evento={evento} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
