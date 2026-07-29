export default function AnimalCard({ animal }) {
  const idadeLabel = animal.idade > 1 ? `${animal.idade} anos` : `${animal.idade} ano`
  const sexoIcon = animal.sexo === 'macho' ? 'fa-mars' : 'fa-venus'
  const porteLabel = animal.porte === 'pequeno' ? 'Pequeno' : animal.porte === 'medio' ? 'Médio' : 'Grande'

  return (
    <div className="animal-card">
      <div className="animal-card-image">
        <img
          src={animal.imagem_url || 'https://via.placeholder.com/400x400?text=Sem+Imagem'}
          alt={animal.nome}
        />
        <span className="animal-card-badge">
          {animal.adotado ? 'Adotado' : 'Disponível'}
        </span>
      </div>
      <div className="animal-card-body">
        <h3>{animal.nome}</h3>
        <div className="animal-meta">
          <span><i className={`fas ${sexoIcon}`}></i> {animal.sexo}</span>
          <span><i className="fas fa-calendar"></i> {idadeLabel}</span>
          <span><i className="fas fa-ruler"></i> {porteLabel}</span>
        </div>
        <p>{animal.descricao}</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {animal.vacinado && <span className="badge badge-success"><i className="fas fa-syringe"></i> Vacinado</span>}
          {animal.castrado && <span className="badge badge-primary"><i className="fas fa-heart"></i> Castrado</span>}
        </div>
      </div>
    </div>
  )
}
