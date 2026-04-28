import { useState, useEffect, useRef } from 'react'

function LLMvsLMMAnimation() {
  const [phase, setPhase] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!isPlaying) return
    if (phase > 5) {
      setIsPlaying(false)
      return
    }
    const timer = setTimeout(() => setPhase(p => p + 1), 1200)
    return () => clearTimeout(timer)
  }, [phase, isPlaying])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height
    ctx.clearRect(0, 0, w, h)

    // Text box (always visible)
    const textX = 100, textY = h/2 - 30, textW = 160, textH = 60
    ctx.strokeStyle = phase >= 1 ? '#d4a574' : '#555'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.roundRect(textX, textY, textW, textH, 8)
    ctx.stroke()
    ctx.fillStyle = '#1a1a1a'
    ctx.fillRect(textX, textY, textW, textH)
    ctx.fillStyle = phase >= 1 ? '#d4a574' : '#888'
    ctx.font = '14px JetBrains Mono'
    ctx.textAlign = 'center'
    ctx.fillText('TEXT', textX + textW/2, textY + textH/2 + 5)

    // Image box (appears at phase 2+)
    if (phase >= 2) {
      const imgX = w/2 - 80, imgY = h/2 - 30, imgW = 160, imgH = 60
      const alpha = phase >= 2 ? 1 : 0
      ctx.strokeStyle = '#d4a574'
      ctx.globalAlpha = alpha
      ctx.beginPath()
      ctx.roundRect(imgX, imgY, imgW, imgH, 8)
      ctx.stroke()
      ctx.fillStyle = '#1a1a1a'
      ctx.fillRect(imgX, imgY, imgW, imgH)
      ctx.fillStyle = '#d4a574'
      ctx.font = '14px JetBrains Mono'
      ctx.fillText('IMAGE', imgX + imgW/2, imgY + imgH/2 + 5)
      ctx.globalAlpha = 1
    }

    // Audio box (appears at phase 3+)
    if (phase >= 3) {
      const audX = 100, audY = h/2 + 50, audW = 160, audH = 60
      ctx.strokeStyle = '#d4a574'
      ctx.beginPath()
      ctx.roundRect(audX, audY, audW, audH, 8)
      ctx.stroke()
      ctx.fillStyle = '#1a1a1a'
      ctx.fillRect(audX, audY, audW, audH)
      ctx.fillStyle = '#d4a574'
      ctx.font = '14px JetBrains Mono'
      ctx.fillText('AUDIO', audX + audW/2, audY + audH/2 + 5)
    }

    // Video box (appears at phase 4+)
    if (phase >= 4) {
      const vidX = w/2 - 80, vidY = h/2 + 50, vidW = 160, vidH = 60
      ctx.strokeStyle = '#d4a574'
      ctx.beginPath()
      ctx.roundRect(vidX, vidY, vidW, vidH, 8)
      ctx.stroke()
      ctx.fillStyle = '#1a1a1a'
      ctx.fillRect(vidX, vidY, vidW, vidH)
      ctx.fillStyle = '#d4a574'
      ctx.font = '14px JetBrains Mono'
      ctx.fillText('VIDEO', vidX + vidW/2, vidY + vidH/2 + 5)
    }

    // Connection lines (phase 3+)
    if (phase >= 3) {
      ctx.strokeStyle = '#d4a574'
      ctx.lineWidth = 1
      ctx.setLineDash([4, 4])
      ctx.beginPath()
      ctx.moveTo(textX + textW/2, textY + textH)
      ctx.lineTo(textX + textW/2, textY + textH + 20)
      ctx.stroke()
      ctx.setLineDash([])
    }

    // LLM label
    if (phase === 1) {
      ctx.fillStyle = '#888'
      ctx.font = '12px DM Sans'
      ctx.textAlign = 'center'
      ctx.fillText('LLM', textX + textW/2, textY - 15)
    }

    // LMM label
    if (phase >= 5) {
      ctx.fillStyle = '#d4a574'
      ctx.font = 'bold 14px DM Sans'
      ctx.textAlign = 'center'
      ctx.fillText('LMM = LLM + Multimodal', w/2, h - 30)
    }

  }, [phase])

  const labels = ['Text Only', '+ Images', '+ Audio', '+ Video', 'Complete LMM']

  return (
    <div className="animation-container">
      <canvas ref={canvasRef} width={400} height={200} />
      <div className="animation-controls">
        <button onClick={() => { setPhase(0); setIsPlaying(true) }} className="play-btn">
          {isPlaying ? '▶ Playing...' : '▶ Play Animation'}
        </button>
      </div>
      <div className="animation-labels">
        {labels.map((label, i) => (
          <span key={i} className={`label ${phase >= i + 1 ? 'active' : ''}`}>{label}</span>
        ))}
      </div>
    </div>
  )
}

function App() {
  return (
    <>
      <nav className="nav">
        <div className="logo">
          <span className="logo-dot"></span>
          LMM.best
        </div>
        <ul className="nav-links">
          <li><a href="#llm-vs-lmm">LLM vs LMM</a></li>
        </ul>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <div className="hero-eyebrow">Understanding AI Models</div>
          <h1>LLM <em>vs</em> LMM</h1>
          <p className="hero-tagline">
            What's the difference? Click play to see.
          </p>
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

      <section className="section" id="llm-vs-lmm">
        <div className="section-header">
          <div>
            <h2 className="section-title">LLM vs LMM</h2>
            <p className="section-subtitle">Large Language Models vs Large Multimodal Models</p>
          </div>
        </div>

        <div className="benchmarks-grid">
          <div className="benchmark-card">
            <div className="benchmark-header">
              <h3>LLM — Language Only</h3>
            </div>
            <p className="benchmark-desc">
              A Large Language Model processes and generates text only. It can read documents, write code, answer questions — but cannot see images, hear audio, or understand video.
            </p>
            <div className="benchmark-bar">
              <div className="benchmark-fill" style={{ width: '25%' }}></div>
            </div>
            <p className="benchmark-full" style={{fontSize: '12px', color: '#888'}}>Text: 100%</p>
          </div>

          <div className="benchmark-card">
            <div className="benchmark-header">
              <h3>LMM — Multimodal</h3>
            </div>
            <p className="benchmark-desc">
              A Large Multimodal Model adds image, audio, and video understanding to text. It can analyze a chart, transcribe speech, or understand what's happening in a video.
            </p>
            <div className="benchmark-bar">
              <div className="benchmark-fill" style={{ width: '100%' }}></div>
            </div>
            <p className="benchmark-full" style={{fontSize: '12px', color: '#888'}}>Text + Image + Audio + Video</p>
          </div>
        </div>

        <div className="scoring-formula" style={{ marginTop: '40px' }}>
          <h3>See It In Action</h3>
          <LLMvsLMMAnimation />
        </div>

        <div className="scoring-formula" style={{ marginTop: '40px' }}>
          <h3>The Key Difference</h3>
          <code>LLM → Text only</code>
          <p>LLMs are powerful text processors. They learn from massive text corpora and can generate human-like text, translate languages, summarize documents, and write code.</p>
          <code style={{ marginTop: '20px' }}>LMM → Text + Images + Audio + Video</code>
          <p>LMMs extend LLMs with perception of other modalities. They can "see" images, "hear" audio, and "understand" video — making them suitable for tasks like image captioning, video analysis, and voice assistants.</p>
        </div>

        <div className="benchmarks-grid" style={{ marginTop: '60px' }}>
          <div className="benchmark-card" style={{ gridColumn: 'span 2' }}>
            <div className="benchmark-header">
              <h3>Any2Any — The Ultimate Goal</h3>
            </div>
            <p className="benchmark-desc">
              <strong>Any2Any</strong> (Any-to-Any) is a <em>functional vision</em> — a system that can receive any combination of modality inputs (text, image, audio, video) and generate any combination of modality outputs. <strong>LMM</strong> is the <em>technical foundation</em> — the most powerful approach currently used to achieve this goal.
            </p>
            <div style={{ marginTop: '20px', padding: '15px', background: 'var(--surface-elevated)', borderRadius: '8px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <th style={{ textAlign: 'left', padding: '8px', color: 'var(--accent)' }}>Dimension</th>
                    <th style={{ textAlign: 'left', padding: '8px', color: 'var(--accent)' }}>LMM</th>
                    <th style={{ textAlign: 'left', padding: '8px', color: 'var(--accent)' }}>Any2Any</th>
                  </tr>
                </thead>
                <tbody style={{ color: 'var(--text-secondary)' }}>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '8px' }}>Nature</td>
                    <td style={{ padding: '8px' }}>Model type / Architecture</td>
                    <td style={{ padding: '8px' }}>Task capability / Goal scope</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '8px' }}>Focus</td>
                    <td style={{ padding: '8px' }}>Large scale, unified representation</td>
                    <td style={{ padding: '8px' }}>Input/output flexibility</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px' }}>Relationship</td>
                    <td style={{ padding: '8px' }}>Technical means: provides the "brain"</td>
                    <td style={{ padding: '8px' }}>Application form: full-range interaction capability</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="benchmark-card">
            <div className="benchmark-header">
              <h3>NExT-GPT</h3>
            </div>
            <p className="benchmark-desc">
              Considered the first end-to-end Any-to-Any MM-LLM. It can input any combination of text, image, audio, and video, and generate corresponding any-modality output.
            </p>
          </div>

          <div className="benchmark-card">
            <div className="benchmark-header">
              <h3>GPT-4o</h3>
            </div>
            <p className="benchmark-desc">
              OpenAI's flagship model marking native LMM's march toward more perfect Any2Any experience — unifying audio, visual, and text processing in a single model.
            </p>
          </div>
        </div>

        <div className="scoring-formula" style={{ marginTop: '40px' }}>
          <h3>Evolution Path</h3>
          <code>LLM → Basic LMM → Any2Any LMM</code>
          <p>
            <strong>Basic LMM</strong>: Focuses on "understanding" — recognizing images, visual Q&A (like early LLaVA).<br/>
            <strong>Any2Any LMM</strong>: Adds "generation" capability on top of understanding — using decoders like Diffusion models for full modality transformation.
          </p>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-dot"></span>
            LMM.best
          </div>
          <p className="footer-text">
            LMM = Large Multimodal Model
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
