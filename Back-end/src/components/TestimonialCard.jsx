export default function TestimonialCard({ text, author, role, avatar }) {
  return (
    <div className="testimonial-card">
      <div className="testimonial-stars">
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
      </div>
      <p className="testimonial-text">"{text}"</p>
      <div className="testimonial-author">
        <img
          src={avatar || 'https://via.placeholder.com/40x40?text=Avatar'}
          alt={author}
          className="testimonial-avatar"
        />
        <div>
          <h4>{author}</h4>
          <span>{role}</span>
        </div>
      </div>
    </div>
  )
}
