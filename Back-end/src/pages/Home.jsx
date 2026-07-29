import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import AnimalCard from '../components/AnimalCard.jsx'
import AnimalCardSkeleton from '../components/AnimalCardSkeleton.jsx'
import TestimonialCard from '../components/TestimonialCard.jsx'
import { listar as listarAnimais } from '../services/animalService.js'
import { getQuantidadeAnimaisAdotados, getQuantidadeAnimaisDisponiveis } from '../services/dashboardService.js'

const services = [
  { icon: 'fas fa-paw', title: 'Resgate Animal', description: 'Resgatamos animais em situação de risco, oferecendo cuidado veterinário e muito amor.', link: '/animais' },
  { icon: 'fas fa-heart', title: 'Adoção Responsável', description: 'Promovemos a adoção consciente com acompanhamento veterinário e suporte pós-adoção.', link: '/animais' },
  { icon: 'fas fa-box-open', title: 'Brechó Solidário', description: 'Todo o valor arrecadado no brechó é revertido para o cuidado dos nossos animais.', link: '/brecho' },
]

const testimonials = [
  { text: 'Adotei meu melhor amigo através da SOS Focinho Carente. O processo foi super transparente e acolhedor.', author: 'Ana Silva', role: 'Adotante', avatar: 'https://i.pravatar.cc/80?img=1' },
  { text: 'O trabalho que essa ONG faz é incrível! Já fiz várias doações e acompanho o resgate de vários animais.', author: 'Carlos Oliveira', role: 'Voluntário', avatar: 'https://i.pravatar.cc/80?img=3' },
  { text: 'Comprei no brechó e me surpreendi com a qualidade dos produtos. Ótima iniciativa!', author: 'Marina Costa', role: 'Cliente Brechó', avatar: 'https://i.pravatar.cc/80?img=5' },
]

export default function Home() {
  const [animais, setAnimais] = useState([])
  const [stats, setStats] = useState({ adotados: 0, disponiveis: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [animaisData, adotados, disponiveis] = await Promise.all([
          listarAnimais(),
          getQuantidadeAnimaisAdotados(),
          getQuantidadeAnimaisDisponiveis(),
        ])
        setAnimais(animaisData.slice(0, 4))
        setStats({ adotados, disponiveis })
      } catch (err) {
        console.error('Erro ao carregar dados:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  return (
    <>
      <section className="hero">
        <div className="hero-media">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1600&q=80"
            alt="Cachorro feliz"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <span className="hero-tag">
              <i className="fas fa-paw"></i> ONG de Proteção Animal
            </span>
            <h1 className="hero-title">
              Amor que <span>transforma</span> vidas
            </h1>
            <p className="hero-text">
              Há mais de 10 anos resgatando, cuidando e encontrando lares cheios de amor para animais abandonados.
            </p>
            <div className="hero-actions">
              <Link to="/animais" className="btn btn-primary">
                Quero Adotar <i className="fas fa-arrow-right"></i>
              </Link>
              <Link to="/contato" className="btn btn-outline">
                Quero Ajudar
              </Link>
            </div>
            <div className="hero-stats">
              <div>
                <span className="hero-stat-value">{stats.adotados}+</span>
                <span className="hero-stat-label">Animais Adotados</span>
              </div>
              <div>
                <span className="hero-stat-value">{stats.disponiveis}</span>
                <span className="hero-stat-label">Disponíveis</span>
              </div>
              <div>
                <span className="hero-stat-value">10+</span>
                <span className="hero-stat-label">Anos de Atividade</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHeader
            tag="Nossos Serviços"
            tagIcon="fas fa-heart"
            title="Como ajudamos os animais"
            description="Conheça nossas principais frentes de atuação e descubra como você pode fazer parte dessa corrente do bem."
          />
          <div className="services-grid">
            {services.map((s, i) => (
              <ServiceCard key={i} {...s} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split-grid">
            <div className="split-image">
              <img
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80"
                alt="Animais resgatados"
              />
            </div>
            <div className="split-content">
              <SectionHeader
                tag="Nossa História"
                title="Mais de 10 anos dedicados aos animais"
                description="Desde 2014, trabalhamos incansavelmente para resgatar, reabilitar e encontrar lares para animais abandonados."
              />
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-item-icon"><i className="fas fa-check"></i></div>
                  <div>
                    <h4>Resgate e Reabilitação</h4>
                    <p>Equipe especializada para resgate e cuidados veterinários completos.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-item-icon"><i className="fas fa-check"></i></div>
                  <div>
                    <h4>Lar Temporário</h4>
                    <p>Rede de lares temporários enquanto aguardam adoção permanente.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-item-icon"><i className="fas fa-check"></i></div>
                  <div>
                    <h4>Campanhas de Castração</h4>
                    <p>Programas de castração para controle populacional responsável.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHeader
            tag="Estatísticas"
            title="Nosso impacto em números"
            description="Cada número representa uma vida transformada."
          />
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-card-icon"><i className="fas fa-paw"></i></div>
              <span className="stat-card-value">{stats.adotados + stats.disponiveis}+</span>
              <span className="stat-card-label">Animais Resgatados</span>
            </div>
            <div className="stat-card">
              <div className="stat-card-icon"><i className="fas fa-home"></i></div>
              <span className="stat-card-value">{stats.adotados}+</span>
              <span className="stat-card-label">Adoções Realizadas</span>
            </div>
            <div className="stat-card">
              <div className="stat-card-icon"><i className="fas fa-star"></i></div>
              <span className="stat-card-value">10+</span>
              <span className="stat-card-label">Anos de Atividade</span>
            </div>
            <div className="stat-card">
              <div className="stat-card-icon"><i className="fas fa-hand-holding-heart"></i></div>
              <span className="stat-card-value">500+</span>
              <span className="stat-card-label">Voluntários</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader
            tag="Adoção"
            title="Conheça nossos animais"
            description="Eles esperam por um lar cheio de amor. Adote e transforme uma vida!"
          />
          {loading ? (
            <div className="animals-grid">
              {[1, 2, 3, 4].map(i => <AnimalCardSkeleton key={i} />)}
            </div>
          ) : (
            <>
              <div className="animals-grid">
                {animais.map(animal => (
                  <AnimalCard key={animal.id} animal={animal} />
                ))}
              </div>
              <div className="text-center" style={{ marginTop: 'var(--space-6)' }}>
                <Link to="/animais" className="btn btn-primary">
                  Ver Todos os Animais <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHeader
            tag="Depoimentos"
            title="O que dizem sobre nós"
            description="Histórias reais de pessoas que fizeram parte da nossa jornada."
          />
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader
            tag="Parceiros"
            title="Quem confia em nosso trabalho"
            description="Empresas e organizações que apoiam nossa causa."
          />
          <div className="partners-grid">
            {['PetLove', 'Cobasi', 'Royal Canin', 'PremieR', 'Mundo Animal'].map((name, i) => (
              <div key={i} className="partner-item">{name}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Faça parte dessa história</h2>
            <p>Seja adotando, doando ou voluntariando, juntos podemos fazer a diferença na vida de muitos animais.</p>
            <div className="cta-actions">
              <Link to="/animais" className="btn btn-primary" style={{ background: '#fff', color: '#0F172A' }}>
                Quero Adotar
              </Link>
              <Link to="/contato" className="btn btn-outline">
                Quero Ajudar
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
