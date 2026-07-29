export default function EventCard({ evento }) {
  const data = new Date(evento.data)
  const dia = data.getDate()
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  const mes = meses[data.getMonth()]
  const dataFormatada = data.toLocaleDateString('pt-BR')

  return (
    <div className="event-card">
      <div className="event-card-image">
        <img
          src={evento.imagem_url || 'https://via.placeholder.com/600x400?text=Sem+Imagem'}
          alt={evento.titulo}
        />
        <div className="event-date">
          <span className="day">{dia}</span>
          <span className="month">{mes}</span>
        </div>
      </div>
      <div className="event-card-body">
        <h3>{evento.titulo}</h3>
        <div className="event-meta">
          <span><i className="fas fa-calendar"></i> {dataFormatada}</span>
          {evento.local && <span><i className="fas fa-map-marker-alt"></i> {evento.local}</span>}
        </div>
        <p>{evento.descricao}</p>
      </div>
    </div>
  )
}
