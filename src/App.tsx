import { useState, useEffect, useRef, useCallback } from 'react'

/* ——— In-view reveal ——— */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useReveal()
  return <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`}>{children}</div>
}

/* ——— Icons ——— */
const Icons = {
  ArrowDown: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M19 12l-7 7-7-7"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6"/>
    </svg>
  ),
  Brain: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5V13h-4v-1.5C8.8 10.8 8 9.5 8 8a4 4 0 0 1 4-4z"/>
      <path d="M12 13v3M10 16h4M9 4.5A4.5 4.5 0 0 0 4.5 9C3.5 9 3 9.8 3 10.5s.5 1.5 1.5 1.5H6v1a2 2 0 0 0 2 2h1"/>
      <path d="M15 4.5A4.5 4.5 0 0 1 19.5 9c1 0 1.5.8 1.5 1.5s-.5 1.5-1.5 1.5H18v1a2 2 0 0 1-2 2h-1"/>
    </svg>
  ),
}

/* ——— Animated Visualization ——— */
type Phase = 0 | 1 | 2 | 3 | 4
type VizModality = { key: string; emoji: string; label: string }

const modalities: VizModality[] = [
  { key: 'text', emoji: 'Aa', label: 'Text' },
  { key: 'image', emoji: '🖼', label: 'Image' },
  { key: 'audio', emoji: '🎵', label: 'Audio' },
  { key: 'video', emoji: '🎬', label: 'Video' },
]

function ModalityVisualization() {
  const [phase, setPhase] = useState<Phase>(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const advance = useCallback(() => {
    setPhase(p => {
      const next = (p + 1) as Phase
      if (next > 4) { setIsPlaying(false); return p }
      return next
    })
  }, [])

  useEffect(() => {
    if (!isPlaying) return
    timerRef.current = setTimeout(advance, 1000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [phase, isPlaying, advance])

  const start = () => { setPhase(0); setIsPlaying(true) }

  const activeCount = phase // phase 0 = 0 active, phase 1 = 1 active, etc.
  const isLLM = activeCount === 1
  const isLMM = activeCount >= 2

  return (
    <div className="viz-section">
      <h3 className="viz-title">See the Difference</h3>
      <p className="viz-subtitle">
        {phase === 0 && 'Press play to see how LMM expands beyond LLM'}
        {phase === 1 && 'LLM: One modality — text only'}
        {phase >= 2 && phase < 4 && `LMM: Adding ${modalities[activeCount - 1]?.label}...`}
        {phase === 4 && 'LMM: All modalities unlocked'}
      </p>

      <div className="viz-stage">
        {/* Input modalities */}
        <div className="viz-modalities">
          {modalities.map((m, i) => {
            const isActive = i < activeCount
            return (
              <div key={m.key} className={`viz-modality ${isActive ? 'on' : 'off'}`}>
                <span className="mod-emoji">{m.emoji}</span>
                <span className="mod-label">{m.label}</span>
              </div>
            )
          })}
        </div>

        <div className="viz-arrows">
          <Icons.ChevronRight />
        </div>

        {/* Model hub */}
        <div className="viz-model" style={{
          borderColor: isLMM ? 'rgba(56,189,248,0.5)' : isLLM ? 'rgba(255,255,255,0.15)' : undefined,
          boxShadow: isLMM ? '0 0 40px rgba(56,189,248,0.12)' : undefined,
        }}>
          <Icons.Brain />
          <span className="viz-model-name">MODEL</span>
          <span className="viz-model-type">{isLLM ? 'LLM' : isLMM ? 'LMM' : 'AI'}</span>
        </div>

        <div className="viz-arrows">
          <Icons.ChevronRight />
        </div>

        {/* Output modalities (mirror) */}
        <div className="viz-modalities">
          {modalities.map((m, i) => {
            const isActive = i < activeCount
            return (
              <div key={m.key} className={`viz-modality ${isActive ? 'on' : 'off'}`}>
                <span className="mod-emoji">{m.emoji}</span>
                <span className="mod-label">{m.label}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="viz-controls">
        <button className="viz-btn" onClick={start} disabled={isPlaying}>
          {isPlaying ? 'Running...' : phase > 0 ? 'Replay' : 'Play'}
        </button>
      </div>

      <div className="viz-phase-indicator">
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} className={`viz-phase-dot ${i < activeCount || (i === 0 && phase === 0) ? 'active' : ''}`} />
        ))}
      </div>
    </div>
  )
}

/* ——— App ——— */
function App() {
  const scrollToViz = () => {
    document.getElementById('viz')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Nav */}
      <nav className="nav">
        <div className="logo"><span className="logo-dot" />LMM.best</div>
        <ul className="nav-links">
          <li><a href="#compare">LLM vs LMM</a></li>
          <li><a href="#viz">Visualize</a></li>
          <li><a href="#any2any">Any2Any</a></li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="bg-grid" />
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />

        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Understanding AI Models
          </div>
          <h1>LLM <em>vs</em> LMM</h1>
          <p className="hero-tagline">
            Large Language Models process text. Large Multimodal Models understand text, images, audio, and video — together.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={scrollToViz}>
              See the difference <Icons.ArrowDown />
            </button>
            <a href="#compare" className="btn-ghost">Learn more</a>
          </div>
        </div>
      </section>

      {/* LLM vs LMM Comparison */}
      <Reveal>
        <section className="section" id="compare">
          <div className="section-header">
            <div className="section-label">Core Concepts</div>
            <h2 className="section-title">LLM vs LMM</h2>
            <p className="section-subtitle">The difference is simple — LMMs add perception beyond text.</p>
          </div>

          <div className="compare-grid">
            <div className="compare-card llm">
              <div className="card-icon">Aa</div>
              <h3 className="card-title">LLM</h3>
              <span className="card-badge">Language Only</span>
              <p className="card-desc">
                A Large Language Model reads and generates text. It can write code, answer questions, and summarize documents — but it cannot see images, hear audio, or watch video.
              </p>
              <div className="modality-tags">
                <span className="modality-tag tag-on">Text</span>
                <span className="modality-tag tag-off">Image</span>
                <span className="modality-tag tag-off">Audio</span>
                <span className="modality-tag tag-off">Video</span>
              </div>
            </div>

            <div className="compare-card lmm">
              <div className="card-icon">◈</div>
              <h3 className="card-title">LMM</h3>
              <span className="card-badge">Multimodal</span>
              <p className="card-desc">
                A Large Multimodal Model extends text understanding with visual and audio perception. It can analyze a chart, describe a photo, transcribe speech, or summarize a video — all within one model.
              </p>
              <div className="modality-tags">
                <span className="modality-tag tag-on">Text</span>
                <span className="modality-tag tag-on">Image</span>
                <span className="modality-tag tag-on">Audio</span>
                <span className="modality-tag tag-on">Video</span>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Interactive Visualization */}
      <Reveal>
        <section className="section" id="viz">
          <div className="section-header">
            <div className="section-label">Interactive</div>
            <h2 className="section-title">Watch the Difference</h2>
            <p className="section-subtitle">Play the animation to see how modalities expand from LLM to LMM.</p>
          </div>
          <ModalityVisualization />
        </section>
      </Reveal>

      {/* Any2Any */}
      <Reveal>
        <section className="section" id="any2any">
          <div className="section-header">
            <div className="section-label">Beyond LMM</div>
            <h2 className="section-title">Any2Any</h2>
            <p className="section-subtitle">The ultimate vision — LMM is the technical foundation to achieve it.</p>
          </div>

          <div className="any2any-grid">
            <div className="info-card full-width">
              <div className="info-card-icon">∞</div>
              <h3>LMM x Any2Any</h3>
              <p>
                <strong>Any2Any</strong> is a <em>functional vision</em>: a system that accepts any combination of modalities as input and produces any combination as output. <strong>LMM</strong> is the <em>technical foundation</em> — the most powerful approach we have today to realize that vision.
              </p>
              <table className="compare-table">
                <thead>
                  <tr><th>Dimension</th><th>LMM</th><th>Any2Any</th></tr>
                </thead>
                <tbody>
                  <tr><td>Nature</td><td>Model type / Architecture</td><td>Task capability / Goal</td></tr>
                  <tr><td>Focus</td><td>Scale, unified representation</td><td>Input / output flexibility</td></tr>
                  <tr><td>Role</td><td>Technical means — the "brain"</td><td>Application form — full interaction</td></tr>
                </tbody>
              </table>
            </div>

            <div className="info-card">
              <div className="info-card-icon">🔬</div>
              <h3>NExT-GPT</h3>
              <p>The first end-to-end Any-to-Any MM-LLM. Accepts any combination of text, image, audio, and video, and generates any-modality output through integrated diffusion decoders.</p>
            </div>

            <div className="info-card">
              <div className="info-card-icon">⚡</div>
              <h3>GPT-4o</h3>
              <p>OpenAI's flagship natively unifying audio, visual, and text processing in a single model — a major step toward seamless Any2Any interaction.</p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Evolution */}
      <Reveal>
        <section className="section evo-section">
          <div className="section-header">
            <div className="section-label">Evolution</div>
            <h2 className="section-title">The Path Forward</h2>
            <p className="section-subtitle" style={{margin:'0 auto'}}>From text-only models to full multimodal understanding.</p>
          </div>

          <div className="evo-path">
            <div className="evo-step">
              <div className="evo-step-icon">Aa</div>
              <h4>LLM</h4>
              <p>Text only</p>
            </div>
            <span className="evo-arrow">→</span>
            <div className="evo-step">
              <div className="evo-step-icon">◈</div>
              <h4>Basic LMM</h4>
              <p>Understanding</p>
            </div>
            <span className="evo-arrow">→</span>
            <div className="evo-step">
              <div className="evo-step-icon">∞</div>
              <h4>Any2Any LMM</h4>
              <p>Full generation</p>
            </div>
          </div>

          <div className="evo-detail">
            <div className="evo-detail-card">
              <h4>Basic LMM — Understanding</h4>
              <p>Focuses on perception: recognizing images, answering visual questions, captioning photos. Early models like LLaVA pioneered this — input multiple modalities, but output only text.</p>
            </div>
            <div className="evo-detail-card">
              <h4>Any2Any LMM — Generation</h4>
              <p>Adds generation on top of understanding. Uses diffusion decoders or native multimodal output heads to produce images, audio, and video — not just text — from any input combination.</p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo"><span className="logo-dot" />LMM.best</div>
        <p className="footer-text">LMM = Large Multimodal Model</p>
      </footer>
    </>
  )
}

export default App
