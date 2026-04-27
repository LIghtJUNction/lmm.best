import { useState, useEffect, useRef, useMemo } from 'react'

const models = [
  { rank: 1, name: 'GPT-5.5 (xhigh)', vendor: 'OpenAI', initials: 'OP', tier: 's', score: 60, params: '?B', context: '128K', date: '2026-04-23' },
  { rank: 2, name: 'GPT-5.5 (high)', vendor: 'OpenAI', initials: 'OP', tier: 's', score: 59, params: '?B', context: '128K', date: '2026-04-23' },
  { rank: 3, name: 'Claude Opus 4.7 (Reasoning)', vendor: 'Anthropic', initials: 'AN', tier: 's', score: 57, params: '?B', context: '200K', date: '2026-04-16' },
  { rank: 4, name: 'GPT-5.4 (xhigh)', vendor: 'OpenAI', initials: 'OP', tier: 's', score: 57, params: '?B', context: '128K', date: '2026-03-05' },
  { rank: 5, name: 'Kimi K2.6', vendor: 'Kimi', initials: 'KM', tier: 'a', score: 54, params: '?B', context: '128K', date: '2026-04-20' },
  { rank: 6, name: 'MiMo-V2.5-Pro', vendor: 'Xiaomi', initials: 'XM', tier: 'a', score: 54, params: '?B', context: '128K', date: '2026-04-22' },
  { rank: 7, name: 'Muse Spark', vendor: 'Meta', initials: 'MT', tier: 'a', score: 52, params: '?B', context: '100K', date: '2026-04-08' },
  { rank: 8, name: 'DeepSeek V4 Pro', vendor: 'DeepSeek', initials: 'DS', tier: 'a', score: 52, params: '?B', context: '128K', date: '2026-04-24' },
]

const reviews = [
  {
    name: 'GPT-5.5 (xhigh)',
    vendor: 'OpenAI',
    initials: 'OP',
    rating: 5,
    specs: { params: '?B', context: '128K', vision: 'Native', audio: 'Native' },
    pros: ['Highest intelligence score', 'Excellent coding能力', 'Strong GPQA 93.5%'],
    cons: ['Premium pricing ¥216/MT', 'High effort mode expensive'],
    date: 'Reviewed Apr 2026',
  },
  {
    name: 'Claude Opus 4.7',
    vendor: 'Anthropic',
    initials: 'AN',
    rating: 5,
    specs: { params: '?B', context: '200K', vision: 'Native', audio: 'Native' },
    pros: ['Top reasoning capabilities', 'Constitutional AI safety', '200K context'],
    cons: ['Expensive ¥180/MT output', 'Reasoning mode slower'],
    date: 'Reviewed Apr 2026',
  },
  {
    name: 'Kimi K2.6',
    vendor: 'Kimi',
    initials: 'KM',
    rating: 4,
    specs: { params: '?B', context: '128K', vision: 'Native', audio: 'via API' },
    pros: ['Good value ¥6.84/MT input', '91.1% GPQA', 'Fast output speed'],
    cons: ['Less known globally', 'Smaller context window'],
    date: 'Reviewed Apr 2026',
  },
  {
    name: 'DeepSeek V4 Pro',
    vendor: 'DeepSeek',
    initials: 'DS',
    rating: 4,
    specs: { params: '?B', context: '128K', vision: 'via API', audio: 'via API' },
    pros: ['Competitive pricing ¥12.53/MT', '88.8% GPQA', 'Good reasoning'],
    cons: ['Limited multimodal', 'No native audio'],
    date: 'Reviewed Apr 2026',
  },
]

const benchmarks = [
  { name: 'MMMU', full: 'Massive Multimodal Multitask Understanding', weight: 35, desc: 'Tests reasoning across diverse academic disciplines' },
  { name: 'MathVista', full: 'Mathematical Visual Reasoning', weight: 25, desc: 'Evaluates mathematical problem-solving with visuals' },
  { name: 'ChartQA', full: 'Chart Understanding & Reasoning', weight: 20, desc: 'Measures interpretation of charts and data visualizations' },
  { name: 'AI2D', full: 'AI2 Diagrams', weight: 20, desc: 'Assesses science diagram comprehension' },
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

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="search-icon">
      <circle cx="11" cy="11" r="8"/>
      <path d="M21 21l-4.35-4.35"/>
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  )
}

function CompareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 3v18M16 3v18M8 12h8"/>
    </svg>
  )
}

function SkeletonRow() {
  return (
    <tr className="skeleton-row">
      <td><div className="skeleton" style={{width: 30, height: 24}}></div></td>
      <td>
        <div className="skeleton-model">
          <div className="skeleton" style={{width: 40, height: 40, borderRadius: 8}}></div>
          <div>
            <div className="skeleton" style={{width: 120, height: 16, marginBottom: 4}}></div>
            <div className="skeleton" style={{width: 80, height: 12}}></div>
          </div>
        </div>
      </td>
      <td><div className="skeleton" style={{width: 28, height: 28, borderRadius: 6}}></div></td>
      <td><div className="skeleton" style={{width: 160, height: 6, borderRadius: 3}}></div></td>
      <td><div className="skeleton" style={{width: 40, height: 14}}></div></td>
      <td><div className="skeleton" style={{width: 40, height: 14}}></div></td>
      <td><div className="skeleton" style={{width: 70, height: 14}}></div></td>
    </tr>
  )
}

function SkeletonCard() {
  return (
    <div className="card skeleton-card">
      <div className="skeleton-card-header">
        <div>
          <div className="skeleton" style={{width: 140, height: 18, marginBottom: 6}}></div>
          <div className="skeleton" style={{width: 80, height: 12}}></div>
        </div>
        <div className="skeleton" style={{width: 80, height: 16}}></div>
      </div>
      <div className="skeleton" style={{width: '100%', height: 80, marginTop: 16}}></div>
    </div>
  )
}

type TierFilter = 'all' | 's' | 'a' | 'b'

function App() {
  const [loading, setLoading] = useState(true)
  const [tierFilter, setTierFilter] = useState<TierFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedForCompare, setSelectedForCompare] = useState<number[]>([])
  const [showCompareModal, setShowCompareModal] = useState(false)

  const heroRef = useRef<HTMLElement>(null)
  const leaderboardRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLElement>(null)
  const [leaderboardVisible, setLeaderboardVisible] = useState(false)
  const [cardsVisible, setCardsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (entry.target === leaderboardRef.current) setLeaderboardVisible(true)
          if (entry.target === cardsRef.current) setCardsVisible(true)
        }
      },
      { threshold: 0.1 }
    )
    if (heroRef.current) observer.observe(heroRef.current)
    if (leaderboardRef.current) observer.observe(leaderboardRef.current)
    if (cardsRef.current) observer.observe(cardsRef.current)
    return () => observer.disconnect()
  }, [])

  const filteredModels = useMemo(() => {
    return models.filter(m => {
      const matchesTier = tierFilter === 'all' || m.tier === tierFilter
      const matchesSearch = searchQuery === '' ||
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.vendor.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesTier && matchesSearch
    })
  }, [tierFilter, searchQuery])

  const toggleCompare = (rank: number) => {
    setSelectedForCompare(prev => {
      if (prev.includes(rank)) {
        return prev.filter(r => r !== rank)
      }
      if (prev.length >= 3) {
        return prev
      }
      return [...prev, rank]
    })
  }

  const compareModels = useMemo(() => {
    return models.filter(m => selectedForCompare.includes(m.rank))
  }, [selectedForCompare])

  const clearCompare = () => {
    setSelectedForCompare([])
    setShowCompareModal(false)
  }

  const tierCounts = useMemo(() => ({
    all: models.length,
    s: models.filter(m => m.tier === 's').length,
    a: models.filter(m => m.tier === 'a').length,
    b: models.filter(m => m.tier === 'b').length,
  }), [])

  return (
    <>
      <nav className="nav">
        <div className="logo">
          <span className="logo-dot"></span>
          LMM.best
        </div>
        <ul className="nav-links">
          <li><a href="#leaderboard">Leaderboard</a></li>
          <li><a href="#methodology">Methodology</a></li>
          <li><a href="#models">Models</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </nav>

      <section className="hero" ref={heroRef}>
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

      <section className="section" id="leaderboard" ref={leaderboardRef}>
        <div className="section-header">
          <div>
            <h2 className="section-title">Leaderboard</h2>
            <p className="section-subtitle">Updated April 2026 — Multimodal Understanding Score</p>
          </div>
        </div>

        <div className="leaderboard-controls">
          <div className="tier-filters">
            {(['all', 's', 'a', 'b'] as const).map(tier => (
              <button
                key={tier}
                className={`filter-btn ${tierFilter === tier ? 'active' : ''}`}
                onClick={() => setTierFilter(tier)}
              >
                {tier === 'all' ? 'All' : `${tier.toUpperCase()} Tier`}
                <span className="filter-count">{tierCounts[tier]}</span>
              </button>
            ))}
          </div>
          <div className="search-box">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search models..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="search-clear" onClick={() => setSearchQuery('')}>
                <CloseIcon />
              </button>
            )}
          </div>
        </div>

        {selectedForCompare.length >= 2 && (
          <button className="compare-bar" onClick={() => setShowCompareModal(true)}>
            <CompareIcon />
            Compare {selectedForCompare.length} models
          </button>
        )}

        <table className="leaderboard">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Model</th>
              <th>Tier</th>
              <th>Score</th>
              <th>Parameters</th>
              <th>Context</th>
              <th>Compare</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
            ) : filteredModels.length === 0 ? (
              <tr>
                <td colSpan={7} className="no-results">No models match your filters</td>
              </tr>
            ) : (
              filteredModels.map((m) => (
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
                        <div className="score-fill" style={{ width: leaderboardVisible ? `${m.score}%` : '0%' }}></div>
                      </div>
                      <span className="score-value">{m.score}</span>
                    </div>
                  </td>
                  <td className="metric">{m.params}</td>
                  <td className="metric">{m.context}</td>
                  <td>
                    <label className="compare-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedForCompare.includes(m.rank)}
                        onChange={() => toggleCompare(m.rank)}
                        disabled={!selectedForCompare.includes(m.rank) && selectedForCompare.length >= 3}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <p className="results-count">{filteredModels.length} of {models.length} models shown</p>
      </section>

      <section className="section" id="methodology">
        <div className="section-header">
          <div>
            <h2 className="section-title">Methodology</h2>
            <p className="section-subtitle">How we evaluate and score Large Multimodal Models</p>
          </div>
        </div>
        <div className="benchmarks-grid">
          {benchmarks.map(b => (
            <div className="benchmark-card" key={b.name}>
              <div className="benchmark-header">
                <h3>{b.name}</h3>
                <span className="benchmark-weight">{b.weight}%</span>
              </div>
              <p className="benchmark-full">{b.full}</p>
              <p className="benchmark-desc">{b.desc}</p>
              <div className="benchmark-bar">
                <div className="benchmark-fill" style={{ width: `${b.weight}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="models" ref={cardsRef}>
        <div className="section-header">
          <div>
            <h2 className="section-title">Model Reviews</h2>
            <p className="section-subtitle">In-depth analysis and hands-on evaluation</p>
          </div>
        </div>
        <div className="cards-grid">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            reviews.map((r, i) => (
              <article
                className={`card ${cardsVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 100}ms` }}
                key={r.name}
              >
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
            ))
          )}
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

      {showCompareModal && (
        <div className="modal-overlay" onClick={clearCompare}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Model Comparison</h3>
              <button className="modal-close" onClick={clearCompare}><CloseIcon /></button>
            </div>
            <div className="compare-table">
              <table>
                <thead>
                  <tr>
                    <th>Metric</th>
                    {compareModels.map(m => <th key={m.rank}>{m.name}</th>)}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Vendor</td>
                    {compareModels.map(m => <td key={m.rank}>{m.vendor}</td>)}
                  </tr>
                  <tr>
                    <td>Tier</td>
                    {compareModels.map(m => <td key={m.rank}><span className={`tier-badge ${m.tier}`}>{m.tier.toUpperCase()}</span></td>)}
                  </tr>
                  <tr>
                    <td>Score</td>
                    {compareModels.map(m => <td key={m.rank} className="compare-score">{m.score}</td>)}
                  </tr>
                  <tr>
                    <td>Parameters</td>
                    {compareModels.map(m => <td key={m.rank}>{m.params}</td>)}
                  </tr>
                  <tr>
                    <td>Context</td>
                    {compareModels.map(m => <td key={m.rank}>{m.context}</td>)}
                  </tr>
                </tbody>
              </table>
            </div>
            <button className="compare-clear" onClick={clearCompare}>Clear Selection</button>
          </div>
        </div>
      )}
    </>
  )
}

export default App
