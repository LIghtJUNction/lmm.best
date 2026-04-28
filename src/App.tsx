function App() {
  return (
    <>
      <nav className="nav">
        <div className="logo">
          <span className="logo-dot"></span>
          LMM.best
        </div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
        </ul>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <div className="hero-eyebrow">One Domain, Many Possibilities</div>
          <h1>What is<br /><em>LMM.best</em></h1>
          <p className="hero-tagline">
            A domain dedicated to Large Multimodal Models — past, present, and future.
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

      <section className="section" id="about">
        <div className="section-header">
          <div>
            <h2 className="section-title">About This Domain</h2>
            <p className="section-subtitle">Your gateway to understanding Large Multimodal Models</p>
          </div>
        </div>

        <div className="benchmarks-grid">
          <div className="benchmark-card">
            <div className="benchmark-header">
              <h3>What is LMM?</h3>
            </div>
            <p className="benchmark-desc">
              Large Multimodal Models (LMMs) are AI systems that can understand and process multiple types of data — text, images, audio, and video. Unlike traditional language models, LMMs can see, hear, and reason across modalities.
            </p>
          </div>

          <div className="benchmark-card">
            <div className="benchmark-header">
              <h3>Current Leaders</h3>
            </div>
            <p className="benchmark-desc">
              The most capable LMMs in 2026 include GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, and Qwen2.5-VL. Each excels at different tasks — some are better at reasoning, others at vision or speed.
            </p>
          </div>

          <div className="benchmark-card">
            <div className="benchmark-header">
              <h3>Future Direction</h3>
            </div>
            <p className="benchmark-desc">
              LMM.best is evolving. This domain will point to a curated collection of resources, comparisons, or a new project focused on the LMM ecosystem. The exact destination is being decided.
            </p>
          </div>

          <div className="benchmark-card">
            <div className="benchmark-header">
              <h3>Which LMM is Best?</h3>
            </div>
            <p className="benchmark-desc">
              There is no single "best" LMM — it depends on your needs. For general reasoning, Claude 3.5 Sonnet leads. For coding, GPT-4o excels. For multilingual vision tasks, Qwen models are outstanding. The right choice depends on your specific use case.
            </p>
          </div>
        </div>

        <div className="scoring-formula">
          <h3>The LMM Landscape</h3>
          <code>LMM = Large Multimodal Model</code>
          <p>LMMs represent the next frontier of AI — models that can perceive and understand the world across multiple modalities, enabling applications from autonomous vehicles to medical diagnosis to creative tools.</p>
        </div>
      </section>

      <footer className="footer" id="about">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-dot"></span>
            LMM.best
          </div>
          <p className="footer-text">
            A domain for the LMM community
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
