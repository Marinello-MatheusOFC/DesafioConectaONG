export default function PageHeader({ title, description }) {
  return (
    <div className="page-header">
      <div className="container">
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
    </div>
  )
}
