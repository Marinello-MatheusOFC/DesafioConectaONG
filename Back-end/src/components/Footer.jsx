import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <span className="logo-mark">
                <i className="fas fa-paw"></i>
              </span>
              SOS Focinho Carente
            </Link>
            <p>
              Somos uma ONG dedicada ao resgate, cuidado e adoção de animais abandonados.
              Transformamos vidas há mais de 10 anos.
            </p>
            <div className="footer-social">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>

          <div>
            <h4>Páginas</h4>
            <ul className="footer-links">
              <li><Link to="/">Início</Link></li>
              <li><Link to="/animais">Animais</Link></li>
              <li><Link to="/eventos">Eventos</Link></li>
              <li><Link to="/brecho">Brechó</Link></li>
              <li><Link to="/contato">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h4>Links</h4>
            <ul className="footer-links">
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#privacidade">Política de Privacidade</a></li>
              <li><a href="#termos">Termos de Uso</a></li>
            </ul>
          </div>

          <div>
            <h4>Newsletter</h4>
            <div className="footer-newsletter">
              <p>Receba novidades e eventos da ONG.</p>
              <form className="footer-newsletter-form" onSubmit={e => e.preventDefault()}>
                <input type="email" placeholder="Seu e-mail" required />
                <button type="submit" aria-label="Inscrever">
                  <i className="fas fa-arrow-right"></i>
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} SOS Focinho Carente. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
