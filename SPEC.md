# LMM.best - Specification

## Concept & Vision

LMM.best is an informational domain explaining the difference between LLMs (Large Language Models) and LMMs (Large Multimodal Models). It features an interactive animation demonstrating how LMMs add multimodal capabilities (image, audio, video) on top of text-only LLM foundations.

## Design Language

**Aesthetic Direction**: Editorial luxury meets tech — think Car & Driver meets a refined research publication.

**Color Palette**:
- Background: `#0a0a0a` (near-black)
- Surface: `#141414` (card backgrounds)
- Surface Elevated: `#1a1a1a` (hover states)
- Primary Text: `#f5f5f5` (off-white)
- Secondary Text: `#888888` (muted)
- Accent: `#d4a574` (warm amber/gold)
- Accent Secondary: `#8b7355` (muted bronze)
- Border: `#2a2a2a` (subtle dividers)

**Typography**:
- Display: "Playfair Display" (serif, for hero and section titles)
- Body: "DM Sans" (clean geometric sans)
- Monospace: "JetBrains Mono" (for code snippets)

**Spatial System**: Generous whitespace, asymmetric layouts, content breathes.

**Motion Philosophy**: Subtle, refined. Page load has staggered reveals. Hover states are smooth (200-300ms). Animation progresses in phases showing modality expansion.

**Visual Assets**:
- Canvas-based interactive animation
- Abstract geometric patterns as decorative elements
- Subtle grain texture overlay for depth

## Layout & Structure

1. **Navigation**: Minimal top bar with logo and "LLM vs LMM" link
2. **Hero Section**: Full-viewport with large serif headline explaining the purpose
3. **LLM vs LMM Section**: Two comparison cards + interactive animation demonstrating modality expansion
4. **Key Difference Section**: Side-by-side comparison of LLM and LMM capabilities
5. **Footer**: Minimal, refined

## Animation

Interactive 5-phase animation showing modality expansion:
1. **Phase 0**: Text box appears (LLM)
2. **Phase 1**: Text labeled as "LLM"
3. **Phase 2**: Image box appears
4. **Phase 3**: Audio box appears, connection lines drawn
5. **Phase 4**: Video box appears
6. **Phase 5**: "LMM = LLM + Multimodal" label

Labels below canvas track progress: "Text Only" → "+ Images" → "+ Audio" → "+ Video" → "Complete LMM"

## Content

### Hero
- Eyebrow: "Understanding AI Models"
- Headline: "LLM vs LMM"
- Tagline: "What's the difference? Click play to see."

### Comparison Cards
1. **LLM — Language Only** — Text processing only
2. **LMM — Multimodal** — Text + Image + Audio + Video

### Key Difference Section
- LLM: Text only, powerful text processing
- LMM: Adds image, audio, video perception to text

## Technical Approach

React 19 + TypeScript + Vite SPA. Canvas-based animation with phase-based rendering. CSS animations for UI elements.