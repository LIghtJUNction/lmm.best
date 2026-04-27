import { useEffect, useRef } from 'react'

const models = [
  { rank: 1, name: 'OpenMind OS-2', vendor: 'OpenMind AI', initials: 'OP', tier: 's', score: 98, params: '1.8T', context: '256K', date: '2026-04-15' },
  { rank: 2, name: 'Gemini Ultra 3', vendor: 'Google DeepMind', initials: 'GC', tier: 's', score: 96, params: '2.0T', context: '1M', date: '2026-04-10' },
  { rank: 3, name: 'Claude Opus 4', vendor: 'Anthropic', initials: 'CX', tier: 's', score: 95, params: '1.5T', context: '200K', date: '2026-04-12' },
  { rank: 4, name: 'GPT-5 Vision', vendor: 'OpenAI', initials: 'GP', tier: 'a', score: 92, params: '1.2T', context: '128K', date: '2026-04-08' },
  { rank: 5, name: 'LLaMA-4 Vision', vendor: 'Meta AI', initials: 'LM', tier: 'a', score: 89, params: '400B', context: '100K', date: '2026-04-05' },
  { rank: 6, name: 'Mistral Large 2 Vision', vendor: 'Mistral AI', initials: 'MX', tier: 'a', score: 87, params: '180B', context: '128K', date: '2026-04-01' },
  { rank: 7, name: 'Qwen2.5 VL Max', vendor: 'Alibaba', initials: 'Q9', tier: 'b', score: 84, params: '72B', context: '32K', date: '2026-03-28' },
  { rank: 8, name: 'Cohere Command R+ V2', vendor: 'Cohere', initials: 'CO', tier: 'b', score: 81, params: '104B', context: '128K', date: '2026-03-25' },
]

const reviews = [
  {
    name: 'OpenMind OS-2',
    vendor: 'OpenMind AI',
    initials: 'OP',
    rating: 5,
    specs: { params: '1.8T', context: '256K', vision: 'Native', audio: 'Native' },
    pros: ['State-of-the-art reasoning', 'Exceptional multimodal', '256K context window'],
    cons: ['Premium pricing', 'Higher latency'],
    date: 'Reviewed Apr 2026',
  },
  {
    name: 'Gemini Ultra 3',
    vendor: 'Google DeepMind',
    initials: 'GC',
    rating: 5,
    specs: { params: '2.0T', context: '1M', vision: 'Native', audio: 'Native' },
    pros: ['Massive 1M context', 'Native audio support', 'Google ecosystem'],
    cons: ['Complex pricing', 'Region restrictions'],
    date: 'Reviewed Apr 2026',
  },
  {
    name: 'Claude Opus 4',
    vendor: 'Anthropic',
    initials: 'CX',
    rating: 4,
    specs: { params: '1.5T', context: '200K', vision: 'Native', audio: 'via API' },
    pros: ['Best-in-class reasoning', 'Constitutional AI safety', 'Excellent writing'],
    cons: ['No native audio', 'Priced per token'],
    date: 'Reviewed Apr 2026',
  },
  {
    name: 'GPT-5 Vision',
    vendor: 'OpenAI',
    initials: 'GP',
    rating: 4,
    specs: { params: '1.2T', context: '128K', vision: 'Native', audio: 'via API' },
    pros: ['Industry standard', 'Robust ecosystem', 'Fast inference'],
    cons: ['Conservative safety', 'Limited context'],
    date: 'Reviewed Apr 2026',
  },
]

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg className={`star ${filled ? '' : 'empty'}`} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  )
}

function useIntersectionObserver(options: IntersectionObserverInit) {
  const ref = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, options)
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [options.threshold, options.rootMargin])

  return { ref, isVisible }
}

import { useState } from 'react'

function App() {
  const heroRef = useIntersectionObserver({ threshold: 0.1 })
  const leaderboardRef = useIntersectionObserver({ threshold: 0.2, rootMargin: '0px 0px -50px 0px' })
  const cardsRef = useIntersectionObserver({ threshold: 0.2 })

  return (
    <>
      <nav className="nav">
        <div className="logo">
          <span className="logo-dot"></span>
          LMM.best
        </div>
        <ul className="nav-links">
          <li><a href="#leaderboard">Leaderboard</a></li>
          <li><a href="#models">Models</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </nav>

      <section className="hero" ref={heroRef.ref as React.RefObject<HTMLElement>}>
        <div className="hero-content">
          <div className="hero-eyebrow">The Definitive Ranking</div>
          <h1>Large Multimodal<br /><em>Models</em> Ranked</h1>
          <p className="hero-tagline">
            Simply the best Large Multimodal Models, ranked and reviewed.
            Objective benchmarks, hands-on testing, and transparent methodology.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-value">47</span>
              <span className="hero-stat-label">Models Ranked</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">12</span>
              <span className="hero-stat-label">Benchmarks</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">2.1M+</span>
              <span className="hero-stat-label">Tests Run</span>
            </div>
          </div>
        </div>
        <div className="hero-decoration">
          <svg viewBox="0 0 300 300" fill="none">
            <circle cx="150" cy="150" r="140" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
            <circle cx="150" cy="150" r="100" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
            <circle cx="150" cy="150" r="60" stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>
            <line x1="150" y1="10" x2="150" y2="290" stroke="currentColor" strokeWidth="0.3" opacity="0.1"/>
            <line x1="10" y1="150" x2="290" y2="150" stroke="currentColor" strokeWidth="0.3" opacity="0.1"/>
          </svg>
        </div>
      </section>

      <section className="section" id="leaderboard" ref={leaderboardRef.ref as React.RefObject<HTMLElement>}>
        <div className="section-header">
          <div>
            <h2 className="section-title">Leaderboard</h2>
            <p className="section-subtitle">Updated April 2026 — Multimodal Understanding Score</p>
          </div>
        </div>
        <table className="leaderboard">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Model</th>
              <th>Tier</th>
              <th>Score</th>
              <th>Parameters</th>
              <th>Context</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {models.map((m) => (
              <tr key={m.rank}>
                <td className={`rank rank-${m.rank <= 3 ? m.rank : ''}`}>#{m.rank}</td>
                <td>
                  <div className="model-info">
                    <div className="model-avatar">{m.initials}</div>
                    <div>
                      <span className="model-name">{m.name}</span>
                      <span className="model-vendor">{m.vendor}</span>
                    </div>
                  </div>
                </td>
                <td><span className={`tier-badge ${m.tier}`}>{m.tier.toUpperCase()}</span></td>
                <td>
                  <div className="score-cell">
                    <div className="score-bar">
                      <div className="score-fill" data-width={m.score} style={{ width: leaderboardRef.isVisible ? `${m.score}%` : '0%' }}></div>
                    </div>
                    <span className="score-value">{m.score}</span>
                  </div>
                </td>
                <td className="metric">{m.params}</td>
                <td className="metric">{m.context}</td>
                <td className="metric">{m.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="section" id="models" ref={cardsRef.ref as React.RefObject<HTMLElement>}>
        <div className="section-header">
          <div>
            <h2 className="section-title">Model Reviews</h2>
            <p className="section-subtitle">In-depth analysis and hands-on evaluation</p>
          </div>
        </div>
        <div className="cards-grid">
          {reviews.map((r, i) => (
            <article className={`card ${cardsRef.isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${i * 100}ms` }} key={r.name}>
              <div className="card-header">
                <div>
                  <div className="card-title">{r.name}</div>
                  <div className="card-vendor">{r.vendor}</div>
                </div>
                <div className="card-rating">
                  {[1,2,3,4,5].map(n => <StarIcon key={n} filled={n <= r.rating} />)}
                </div>
              </div>
              <div className="card-specs">
                <div className="spec">
                  <span className="spec-label">Parameters</span>
                  <span className="spec-value">{r.specs.params}</span>
                </div>
                <div className="spec">
                  <span className="spec-label">Context</span>
                  <span className="spec-value">{r.specs.context}</span>
                </div>
                <div className="spec">
                  <span className="spec-label">Vision</span>
                  <span className="spec-value">{r.specs.vision}</span>
                </div>
                <div className="spec">
                  <span className="spec-label">Audio</span>
                  <span className="spec-value">{r.specs.audio}</span>
                </div>
              </div>
              <div className="card-proscons">
                <div className="pros">
                  <h4>Pros</h4>
                  <ul>{r.pros.map(p => <li key={p}>{p}</li>)}</ul>
                </div>
                <div className="cons">
                  <h4>Cons</h4>
                  <ul>{r.cons.map(c => <li key={c}>{c}</li>)}</ul>
                </div>
              </div>
              <div className="card-footer">
                <span className="card-date">{r.date}</span>
                <a href="#" className="read-review">Read Review <ArrowIcon /></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer" id="about">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-dot"></span>
            LMM.best
          </div>
          <p className="footer-text">
            Independent benchmarking and reviews of Large Multimodal Models.
            Our methodology combines automated benchmarks with human evaluation.
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
