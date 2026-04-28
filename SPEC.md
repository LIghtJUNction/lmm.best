# LMM.best - Specification

## Concept & Vision

LMM.best is an informational domain about Large Multimodal Models (LMMs). The site introduces visitors to what LMMs are, who the current leaders are, and communicates that this domain is evolving toward a new purpose. The aesthetic remains premium and editorial — a refined, authoritative presence that feels like a premium tech publication.

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

**Motion Philosophy**: Subtle, refined. Page load has staggered reveals. Hover states are smooth (200-300ms). Nothing bouncy or playful — everything feels precise and intentional.

**Visual Assets**:
- Lucide icons (thin stroke weight)
- Abstract geometric patterns as decorative elements
- Subtle grain texture overlay for depth

## Layout & Structure

1. **Navigation**: Minimal top bar with logo and "About" link
2. **Hero Section**: Full-viewport with large serif headline, tagline, subtle geometric accents
3. **About Section**: Card grid explaining LMMs, current leaders, future direction, and the question of "which is best"
4. **Footer**: Minimal, refined

## Content

### Hero
- Eyebrow: "One Domain, Many Possibilities"
- Headline: "What is LMM.best"
- Tagline: "A domain dedicated to Large Multimodal Models — past, present, and future."

### About Section Cards
1. **What is LMM?** - Definition of Large Multimodal Models
2. **Current Leaders** - Overview of top models (GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, Qwen2.5-VL)
3. **Future Direction** - Domain is evolving, exact destination TBD
4. **Which LMM is Best?** - No single best answer, depends on use case

### Footer
- Logo
- Tagline: "A domain for the LMM community"

## Technical Approach

React 19 + TypeScript + Vite SPA. Single-page application with static content cards.