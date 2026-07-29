import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import SocialFloat from './components/SocialFloat.jsx'
import BackToTop from './components/BackToTop.jsx'
import Home from './pages/Home.jsx'
import Animais from './pages/Animais.jsx'
import Eventos from './pages/Eventos.jsx'
import Brecho from './pages/Brecho.jsx'
import Contato from './pages/Contato.jsx'
import Login from './pages/Login.jsx'
import Admin from './pages/Admin.jsx'

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')
  const location = useLocation()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    const html = document.documentElement
    html.classList.add('transitioning')
    const timer = setTimeout(() => html.classList.remove('transitioning'), 400)
    return () => clearTimeout(timer)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')

  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/animais" element={<Animais />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/brecho" element={<Brecho />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
      <SocialFloat />
      <BackToTop />
    </>
  )
}
