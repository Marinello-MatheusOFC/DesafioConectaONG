import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <div className="container header-inner">
        <Link to="/" className="logo" onClick={closeMenu}>
          <span className="logo-mark">
            <i className="fas fa-paw"></i>
          </span>
          SOS Focinho Carente
        </Link>

        <nav className="nav">
          <div className={`nav-overlay${menuOpen ? ' active' : ''}`} onClick={closeMenu}></div>
          <ul className={`nav-list${menuOpen ? ' active' : ''}`}>
            <li><NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={closeMenu}>Início</NavLink></li>
            <li><NavLink to="/animais" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={closeMenu}>Animais</NavLink></li>
            <li><NavLink to="/eventos" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={closeMenu}>Eventos</NavLink></li>
            <li><NavLink to="/brecho" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={closeMenu}>Brechó</NavLink></li>
            <li><NavLink to="/contato" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={closeMenu}>Contato</NavLink></li>
            <li>
              <NavLink to="/admin" className="btn btn-nav" onClick={closeMenu}>
                <i className="fas fa-lock"></i>
                Admin
              </NavLink>
            </li>
          </ul>

          <button className="theme-toggle" onClick={toggleTheme} aria-label="Alternar tema">
            <i className="fas fa-sun icon-sun"></i>
            <i className="fas fa-moon icon-moon"></i>
          </button>

          <button className={`menu-toggle${menuOpen ? ' active' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </div>
    </header>
  )
}
