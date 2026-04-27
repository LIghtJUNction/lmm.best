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

const benchmarks = [
  { name: 'Intelligence Index', full: '综合能力指数', weight: 30, desc: '综合评估模型在各个维度的表现' },
  { name: 'Coding Index', full: '编程能力指数', weight: 20, desc: '代码生成、调试和理解能力' },
  { name: 'Math Index', full: '数学能力指数', weight: 15, desc: '数学推理和问题解决能力' },
  { name: 'MMLU Pro', full: '学科知识测试', weight: 10, desc: '多学科选择题测试' },
  { name: 'GPQA', full: '研究生水平问答', weight: 10, desc: '需要深度推理的专业问题' },
  { name: 'IFBench', full: '指令遵循', weight: 10, desc: '精确遵循复杂指令的能力' },
  { name: '输出速度', full: 'Tokens/秒', weight: 5, desc: '模型响应速度' },
]

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

type TierFilter = 'all' | 's' | 'a' | 'b'

function App() {
  const [loading, setLoading] = useState(true)
  const [tierFilter, setTierFilter] = useState<TierFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedForCompare, setSelectedForCompare] = useState<number[]>([])
  const [showCompareModal, setShowCompareModal] = useState(false)

  const heroRef = useRef<HTMLElement>(null)
  const leaderboardRef = useRef<HTMLElement>(null)
  const [leaderboardVisible, setLeaderboardVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (entry.target === leaderboardRef.current) setLeaderboardVisible(true)
        }
      },
      { threshold: 0.1 }
    )
    if (heroRef.current) observer.observe(heroRef.current)
    if (leaderboardRef.current) observer.observe(leaderboardRef.current)
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
          <li><a href="#methodology">Scoring</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </nav>

      <section className="hero" ref={heroRef}>
        <div className="hero-content">
          <div className="hero-eyebrow">The Definitive Ranking</div>
          <h1>Large Multimodal<br /><em>Models</em> Ranked</h1>
          <p className="hero-tagline">
            Simply the best Large Multimodal Models, ranked and reviewed.
            Data from llmrank.cn with transparent scoring methodology.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-value">{models.length}</span>
              <span className="hero-stat-label">Models Ranked</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">7</span>
              <span className="hero-stat-label">Benchmarks</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">Daily</span>
              <span className="hero-stat-label">Updates</span>
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
            <p className="section-subtitle">Updated April 2026 — Intelligence Index Score</p>
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
            <h2 className="section-title">评分算法公开</h2>
            <p className="section-subtitle">Data from llmrank.cn — Updated Daily</p>
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
        <div className="scoring-formula">
          <h3>综合分数计算公式</h3>
          <code>Final Score = Σ(Benchmark_i × Weight_i) / Σ(Weight_i)</code>
          <p>所有分数均来自 llmrank.cn 真实测试结果，每日更新。</p>
        </div>
      </section>

      <footer className="footer" id="about">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-dot"></span>
            LMM.best
          </div>
          <p className="footer-text">
            LLM 排行榜数据来源：llmrank.cn | 评分算法完全公开透明
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
