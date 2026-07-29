export default function ProductCard({ produto }) {
  const preco = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco)

  return (
    <div className="product-card">
      <div className="product-card-image">
        <img
          src={produto.imagem_url || 'https://via.placeholder.com/400x300?text=Sem+Imagem'}
          alt={produto.nome}
        />
        {produto.categoria && <span className="product-badge">{produto.categoria}</span>}
      </div>
      <div className="product-card-body">
        <h3>{produto.nome}</h3>
        <p>{produto.descricao}</p>
        <span className="product-price">{preco}</span>
        <span className={`badge ${produto.disponivel ? 'badge-success' : 'badge-danger'}`}>
          {produto.disponivel ? 'Disponível' : 'Indisponível'}
        </span>
      </div>
    </div>
  )
}
