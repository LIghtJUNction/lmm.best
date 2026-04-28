import { useState, useEffect, useRef } from 'react'

/* ——— Theme ——— */
function useTheme() {
  const [t, setT] = useState<'light'|'dark'>(() => {
    if (typeof window !== 'undefined') {
      const s = localStorage.getItem('theme')
      if (s === 'dark' || s === 'light') return s
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  })
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', t)
    localStorage.setItem('theme', t)
  }, [t])
  return { theme: t, toggle: () => setT(p => p === 'light' ? 'dark' : 'light') }
}

/* ——— Scroll reveal ——— */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true) }, { threshold: 0.05 })
    o.observe(el); return () => o.disconnect()
  }, [])
  return { ref, visible: v }
}

function Reveal({ children }: { children: React.ReactNode }) {
  const { ref, visible } = useReveal()
  return <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>{children}</div>
}

const Sun = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
const Moon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
const External = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>

// Model data updated as of April 2026
const MODELS = [
  { name:'GPT-5.2', vendor:'OpenAI', params:'~2T (est.)', text:true, image:true, audio:true, video:true, notes:'Omnimodal. Sora 2 video generation integrated. LMSYS #1 overall.' },
  { name:'Gemini 3.1 Ultra', vendor:'Google', params:'Unknown', text:true, image:true, audio:true, video:true, notes:'20M token context. Veo 3.1 video gen. Native 3D understanding. Deep Think reasoning.' },
  { name:'Claude Opus 4.6', vendor:'Anthropic', params:'Unknown', text:true, image:true, audio:false, video:false, notes:'Lowest hallucination rate (&lt;4%). Adaptive multi-step reasoning. No audio/video yet.' },
  { name:'Llama 4 Maverick', vendor:'Meta', params:'400B MoE', text:true, image:true, audio:false, video:false, notes:'MIT open source. MoE architecture. Open weights for research and commercial use.' },
  { name:'Qwen 3.5', vendor:'Alibaba', params:'397B MoE', text:true, image:true, audio:true, video:true, notes:'3rd-gen MoE. 17B active params. Full multimodal. Open weights.' },
  { name:'Kimi K2.5', vendor:'Moonshot AI', params:'Unknown', text:true, image:true, audio:true, video:true, notes:'100-agent parallel collaboration. 200K+ char processing. MIT open source.' },
  { name:'GLM-5.0', vendor:'Zhipu AI', params:'Unknown', text:true, image:true, audio:true, video:true, notes:'SWE-bench 77.8 (open source #1). Full-stack domestic chip adaptation.' },
  { name:'Muse Spark', vendor:'Meta', params:'Unknown', text:true, image:true, audio:false, video:false, notes:'Visual chain-of-thought. Multi-agent orchestration. Contemplating mode.' },
  { name:'Gemini Embedding 2', vendor:'Google', params:'—', text:true, image:true, audio:true, video:true, notes:'First native multimodal embedding model. Unifies text+image+audio+video in one vector space.' },
]

/* ——— App ——— */
function App() {
  const { theme, toggle } = useTheme()

  return (
    <>
      <nav className="nav" id="nav">
        <div className="nav-logo">LMM.best</div>
        <div className="nav-right">
          <ul className="nav-links">
            <li><a href="#architecture">Architecture</a></li>
            <li><a href="#models">Models</a></li>
            <li><a href="#convergence">Convergence</a></li>
          </ul>
          <button className="theme-btn" onClick={toggle} aria-label="Toggle theme">
            {theme === 'light' ? <Moon /> : <Sun />}
          </button>
          <a href="https://github.com" className="nav-gh" target="_blank" rel="noopener">
            GitHub <External />
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="sec sec--hero">
        <div className="sec-inner">
          <div className="hero-eyebrow">LLM &rarr; LMM &rarr; Any-to-Any</div>
          <div className="hero">
            <h1>LLM <em>&rarr;</em> LMM</h1>
          </div>
          <p className="hero-deck">
            Text-only transformer architectures have been replaced by omnimodal systems
            that process text, images, audio, and video through the same attention mechanism.
            GPT-5.2, Gemini 3.1, and Qwen 3.5 are single unified networks — not pipelines
            of separate models. As of April 2026, Any-to-Any is no longer a research goal.
            It's shipping.
          </p>
        </div>
      </section>

      {/* Architecture */}
      <Reveal>
        <section className="sec sec--alt" id="architecture">
          <div className="sec-inner">
            <div className="sec-num">01 &mdash; Architecture</div>
            <h2 className="sec-title">How the data flows</h2>
            <p className="sec-deck">
              The key difference isn't training data — it's the input pipeline.
              LMMs add modality-specific encoders that project everything into a shared
              token space. The transformer backbone is modality-agnostic: after projection,
              a text token, an image patch, and an audio frame are all just vectors.
            </p>

            <div className="arch">
              <div className="arch-col">
                <div className="arch-col-head">
                  <span className="arch-col-label">Language Model (2020)</span>
                  <span className="arch-col-name">LLM</span>
                </div>
                <div className="arch-flow">
                  <div className="arch-flow-item">Tokenizer &rarr; token IDs</div>
                  <div className="arch-flow-arrow">&darr;</div>
                  <div className="arch-flow-item">Token Embedding</div>
                  <div className="arch-flow-arrow">&darr;</div>
                  <div className="arch-flow-item arch-flow-item--hl">Transformer Blocks</div>
                  <div className="arch-flow-arrow">&darr;</div>
                  <div className="arch-flow-item">LM Head &rarr; next-token logits</div>
                </div>
                <div className="arch-note">
                  <strong>Input:</strong> text tokens only.<br/>
                  <strong>Output:</strong> text. One modality, one direction.
                </div>
                <div className="arch-models">
                  <span className="arch-model">GPT-3</span>
                  <span className="arch-model">LLaMA 2</span>
                  <span className="arch-model">PaLM</span>
                </div>
              </div>

              <div className="arch-col">
                <div className="arch-col-head">
                  <span className="arch-col-label">Multimodal Model (2026)</span>
                  <span className="arch-col-name">LMM</span>
                </div>
                <div className="arch-flow">
                  <div className="arch-flow-item arch-flow-item--dim">Text: Tokenizer &rarr; token IDs</div>
                  <div className="arch-flow-item">Image: ViT &rarr; patch embeddings</div>
                  <div className="arch-flow-item">Audio: Whisper-style encoder &rarr; frame embeddings</div>
                  <div className="arch-flow-item">Video: spatial-temporal patches &rarr; sequence embeddings</div>
                  <div className="arch-flow-arrow">&darr;</div>
                  <div className="arch-flow-item">Projection &rarr; unified token space (R<sup>d</sup>)</div>
                  <div className="arch-flow-arrow">&darr;</div>
                  <div className="arch-flow-item arch-flow-item--hl">Omnimodal Transformer</div>
                  <div className="arch-flow-arrow">&darr;</div>
                  <div className="arch-flow-item">Multimodal Output Heads</div>
                </div>
                <div className="arch-note">
                  <strong>Input:</strong> interleaved tokens from any modality.<br/>
                  <strong>Output:</strong> text, image, audio, or video tokens from shared vocabulary.<br/>
                  <strong>Key:</strong> after projection, everything is just a vector.
                </div>
                <div className="arch-models">
                  <span className="arch-model">GPT-5.2</span>
                  <span className="arch-model">Gemini 3.1</span>
                  <span className="arch-model">Qwen 3.5</span>
                  <span className="arch-model">Kimi K2.5</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Models */}
      <Reveal>
        <section className="sec" id="models">
          <div className="sec-inner">
            <div className="sec-num">02 &mdash; The Models</div>
            <h2 className="sec-title">Who's shipping multimodal</h2>
            <p className="models-intro">
              As of April 2026, all major labs ship multimodal models. The architecture has
              converged — differences are in modality coverage, context window, and whether
              weights are open. Chinese labs (Zhipu, Alibaba, Moonshot) now lead in open-source
              multimodal, surpassing US models on several benchmarks.
            </p>

            <table className="models-table">
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Lab</th>
                  <th>Params</th>
                  <th>T</th>
                  <th>I</th>
                  <th>A</th>
                  <th>V</th>
                  <th style={{minWidth:280}}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {MODELS.map(m => (
                  <tr key={m.name}>
                    <td>{m.name}</td>
                    <td><span className="vendor">{m.vendor}</span></td>
                    <td><span className="params">{m.params}</span></td>
                    <td><span className="check">&check;</span></td>
                    <td>{m.image ? <span className="check">&check;</span> : <span className="cross">&mdash;</span>}</td>
                    <td>{m.audio ? <span className="check">&check;</span> : <span className="cross">&mdash;</span>}</td>
                    <td>{m.video ? <span className="check">&check;</span> : <span className="cross">&mdash;</span>}</td>
                    <td style={{fontSize:'0.78rem'}}>{m.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="models-source">
              As of April 2026. Chinese models now exceed 5.16 trillion weekly API calls vs US 2.7 trillion. &rarr;{' '}
              <a href="https://artificialanalysis.ai" target="_blank" rel="noopener">Artificial Analysis</a>
              {' '}for live benchmarks.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Convergence */}
      <Reveal>
        <section className="sec sec--alt" id="convergence">
          <div className="sec-inner sec-inner--narrow">
            <div className="sec-num">03 &mdash; The Convergence</div>
            <h2 className="sec-title">One architecture, all modalities</h2>

            <div className="converge-text">
              <p>
                <strong>The convergence is complete.</strong> In 2020, GPT-3 (text), ViT (vision),
                and Wav2Vec (audio) were three separate architectures. By 2023, LLaVA and GPT-4V
                connected a frozen ViT to a frozen LLM via a projection layer — the one-way bridge.
                By late 2025, the separation dissolved. GPT-5.2 processes text, images, audio, and
                video (via Sora 2) in a single end-to-end network. Gemini 3.1 adds 3D understanding
                and a 20-million-token context window. Qwen 3.5 and Kimi K2.5 are open-weight
                models with full multimodal parity.
              </p>

              <p>
                <strong>MoE changed the economics.</strong> Llama 4 Maverick has 400B total
                parameters but only activates a fraction per token. Qwen 3.5: 397B total, 17B active.
                This means multimodal inference at interactive speeds — under 500ms — with costs
                down 60-90% from 2024. Real-time voice + vision interaction is GA on Vertex AI
                (Gemini Live API) and through GPT-4o's realtime endpoint.
              </p>

              <div className="converge-block">
                <p>
                  "The transformer is modality-agnostic. After projection, a text token, an image
                  patch, and an audio frame are all vectors in R<sup>d</sup>. The attention
                  mechanism doesn't care where they came from. The bottleneck was never the
                  architecture — it was the encoders and the data. Both are solved now."
                </p>
              </div>

              <p>
                <strong>What's next.</strong> The remaining frontier is generative quality across
                all modalities at once. GPT-5.2 with Sora 2 and Gemini 3.1 with Veo 3.1 can produce
                coherent video from text prompts, but seamless interleaved generation — producing a
                document where text paragraphs, diagrams, and video clips are all generated in a
                single unified pass — is still being refined. Google's Gemini Embedding 2 (March 2026)
                is the first model to unify text, image, audio, and video in a single embedding space,
                enabling true multimodal RAG. When generation catches up to understanding across all
                modalities simultaneously, the distinction between "text model," "image model," and
                "audio model" disappears entirely. There's just the model.
              </p>
            </div>

            {/* Capability comparison */}
            <div className="cap-grid">
              <div className="cap-col">
                <div className="cap-col-head">LLM<br/>2020</div>
                <div className="cap-col-body">
                  <div className="cap-row"><span className="yes">&#10003;</span> Text &rarr; Text</div>
                  <div className="cap-row"><span className="no">&#10005;</span> Image &rarr; Text</div>
                  <div className="cap-row"><span className="no">&#10005;</span> Audio &rarr; Text</div>
                  <div className="cap-row"><span className="no">&#10005;</span> Text &rarr; Image</div>
                  <div className="cap-row"><span className="no">&#10005;</span> Any &rarr; Any</div>
                </div>
              </div>
              <div className="cap-col">
                <div className="cap-col-head">Early LMM<br/>2023</div>
                <div className="cap-col-body">
                  <div className="cap-row"><span className="yes">&#10003;</span> Text &rarr; Text</div>
                  <div className="cap-row"><span className="yes">&#10003;</span> Image &rarr; Text</div>
                  <div className="cap-row"><span className="no">&#10005;</span> Audio &rarr; Text</div>
                  <div className="cap-row"><span className="no">&#10005;</span> Text &rarr; Image</div>
                  <div className="cap-row"><span className="no">&#10005;</span> Any &rarr; Any</div>
                </div>
              </div>
              <div className="cap-col">
                <div className="cap-col-head">Native LMM<br/>2025</div>
                <div className="cap-col-body">
                  <div className="cap-row"><span className="yes">&#10003;</span> Text &rarr; Text</div>
                  <div className="cap-row"><span className="yes">&#10003;</span> Image &rarr; Text</div>
                  <div className="cap-row"><span className="yes">&#10003;</span> Audio &rarr; Text</div>
                  <div className="cap-row"><span className="yes">&#10003;</span> Text &rarr; Image</div>
                  <div className="cap-row"><span className="no">&#10005;</span> Any &rarr; Any</div>
                </div>
              </div>
              <div className="cap-col">
                <div className="cap-col-head">Any2Any<br/>2026</div>
                <div className="cap-col-body">
                  <div className="cap-row"><span className="yes">&#10003;</span> Text &rarr; Text</div>
                  <div className="cap-row"><span className="yes">&#10003;</span> Image &rarr; Text</div>
                  <div className="cap-row"><span className="yes">&#10003;</span> Audio &rarr; Text</div>
                  <div className="cap-row"><span className="yes">&#10003;</span> Text &rarr; Image</div>
                  <div className="cap-row"><span className="yes">&#10003;</span> Any &rarr; Any</div>
                </div>
              </div>
            </div>

            <p className="models-source" style={{marginTop:'1.5rem'}}>
              Any-to-Any is no longer research. GPT-5.2 + Sora 2, Gemini 3.1 + Veo 3.1, and Qwen 3.5
              all support at least 4 input modalities and 3+ output modalities in production as of
              April 2026. See{' '}
              <a href="https://artificialanalysis.ai" target="_blank" rel="noopener">Artificial Analysis</a>
              {' '}for up-to-date benchmarks.
            </p>
          </div>
        </section>
      </Reveal>

      <footer className="footer">
        <span className="footer-text">LMM.best &mdash; Tracking the multimodal convergence. Updated April 2026.</span>
        <div className="footer-links">
          <a href="#architecture">Architecture</a>
          <a href="#models">Models</a>
          <a href="#convergence">Convergence</a>
        </div>
      </footer>
    </>
  )
}

export default App
