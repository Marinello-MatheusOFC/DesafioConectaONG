import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import { cadastrar } from '../services/mensagemService.js'

export default function Contato() {
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', assunto: '', mensagem: '' })
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      await cadastrar(form)
      setSuccess(true)
      setForm({ nome: '', email: '', telefone: '', assunto: '', mensagem: '' })
    } catch (err) {
      setError('Erro ao enviar mensagem. Tente novamente.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <PageHeader
        title="Entre em Contato"
        description="Tem dúvidas, sugestões ou quer saber como ajudar? Mande uma mensagem para a gente!"
      />

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div>
              <div className="contact-info-list">
                <div className="contact-item">
                  <div className="contact-item-icon"><i className="fas fa-map-marker-alt"></i></div>
                  <div>
                    <h4>Endereço</h4>
                    <p>Rua dos Animais, 123 - Centro, São Paulo - SP</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon"><i className="fas fa-envelope"></i></div>
                  <div>
                    <h4>E-mail</h4>
                    <p>contato@sosfocinhocarente.org</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon"><i className="fas fa-phone"></i></div>
                  <div>
                    <h4>Telefone</h4>
                    <p>(11) 99999-9999</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon"><i className="fas fa-clock"></i></div>
                  <div>
                    <h4>Horário de Atendimento</h4>
                    <p>Seg a Sex: 9h às 18h | Sáb: 9h às 13h</p>
                  </div>
                </div>
              </div>

              <div className="map-wrap" style={{ marginTop: 'var(--space-4)' }}>
                <iframe
                  title="Localização"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197493348871!2d-46.6540!3d-23.5610!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzM5LjYiUyA0NsKwMzknMTQuNCJX!5e0!3m2!1spt-BR!2sbr!4v1"
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            <div className="form-card">
              <h3>Envie sua mensagem</h3>

              {success ? (
                <div className="text-center" style={{ padding: 'var(--space-6) 0' }}>
                  <i className="fas fa-check-circle" style={{ fontSize: '3rem', color: 'var(--success)', marginBottom: 'var(--space-3)' }}></i>
                  <h3 style={{ color: 'var(--text)', marginBottom: 'var(--space-2)' }}>Mensagem enviada!</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>Obrigado pelo contato. Responderemos em breve.</p>
                  <button className="btn btn-primary" style={{ marginTop: 'var(--space-3)' }} onClick={() => setSuccess(false)}>
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="nome">Nome</label>
                      <input type="text" id="nome" name="nome" value={form.nome} onChange={handleChange} required placeholder="Seu nome" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">E-mail</label>
                      <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required placeholder="seu@email.com" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="telefone">Telefone</label>
                      <input type="tel" id="telefone" name="telefone" value={form.telefone} onChange={handleChange} placeholder="(11) 99999-9999" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="assunto">Assunto</label>
                      <input type="text" id="assunto" name="assunto" value={form.assunto} onChange={handleChange} required placeholder="Ex: Quero ajudar" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="mensagem">Mensagem</label>
                    <textarea id="mensagem" name="mensagem" value={form.mensagem} onChange={handleChange} required placeholder="Sua mensagem..."></textarea>
                  </div>
                  {error && <p style={{ color: 'var(--danger)', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>{error}</p>}
                  <button type="submit" className={`btn btn-primary${sending ? ' btn-loading' : ''}`} style={{ width: '100%' }} disabled={sending}>
                    {sending ? 'Enviando...' : 'Enviar Mensagem'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
