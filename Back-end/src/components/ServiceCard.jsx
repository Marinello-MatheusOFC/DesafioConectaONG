import { Link } from 'react-router-dom'

export default function ServiceCard({ icon, title, description, link }) {
  return (
    <div className="service-card">
      <div className="service-card-icon">
        <i className={icon}></i>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {link && (
        <Link to={link} className="service-link">
          Saiba mais <i className="fas fa-arrow-right"></i>
        </Link>
      )}
    </div>
  )
}
