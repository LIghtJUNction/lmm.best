# LMM.best - Specification

## Concept & Vision

A refined, editorial-style ranking site for Large Multimodal Models that feels like a premium tech publication rather than another generic AI listing page. The aesthetic draws from high-end automotive reviews and luxury magazine layouts — authoritative, sophisticated, and memorable. Dark theme with warm amber accents creates a distinctive presence that stands apart from typical blue/purple AI sites.

## Design Language

**Aesthetic Direction**: Editorial luxury meets tech benchmark — think Car & Driver meets a refined research publication.

**Color Palette**:
- Background: `#0a0a0a` (near-black)
- Surface: `#141414` (card backgrounds)
- Surface Elevated: `#1a1a1a` (hover states)
- Primary Text: `#f5f5f5` (off-white)
- Secondary Text: `#888888` (muted)
- Accent: `#d4a574` (warm amber/gold)
- Accent Secondary: `#8b7355` (muted bronze)
- Border: `#2a2a2a` (subtle dividers)
- Tier S: `#ffd700` (gold)
- Tier A: `#c0c0c0` (silver)
- Tier B: `#cd7f32` (bronze)

**Typography**:
- Display: "Playfair Display" (serif, for hero and section titles)
- Body: "DM Sans" (clean geometric sans)
- Monospace: "JetBrains Mono" (for specs/model names)

**Spatial System**: Generous whitespace, asymmetric layouts, content breathes.

**Motion Philosophy**: Subtle, refined. Page load has staggered reveals. Hover states are smooth (200-300ms). Nothing bouncy or playful — everything feels precise and intentional.

**Visual Assets**:
- Lucide icons (thin stroke weight)
- Abstract geometric patterns as decorative elements
- Subtle grain texture overlay for depth

## Layout & Structure

1. **Navigation**: Minimal top bar with logo and key links
2. **Hero Section**: Full-viewport with large serif headline, tagline, subtle geometric accents
3. **Leaderboard Section**: Magazine-style ranking table with tier badges, scores, and key metrics
4. **Model Cards Grid**: Individual model review cards with specs, pros/cons, and ratings
5. **Footer**: Minimal, refined

## Features & Interactions

- Smooth scroll navigation
- Tier badge system (S/A/B/C tiers)
- Score bars with animated fill
- Model cards with hover lift effect
- Responsive: works on mobile and desktop

## Component Inventory

### Navigation
- Logo (text-based, distinctive)
- Minimal links
- Sticky on scroll with backdrop blur

### Hero
- Large serif headline
- Tagline in secondary text
- Decorative geometric element

### Leaderboard Table
- Rank number (large, monospace)
- Model name with tier badge
- Score bar (animated)
- Key metrics: Parameters, Context Window, Multimodal Score
- Hover row highlight

### Model Review Card
- Model name + tier badge
- Key specifications
- Star rating
- Pros/Cons list
- "Read Review" link

## Technical Approach

Single HTML file with embedded CSS and vanilla JavaScript. No framework needed for this scope. All styles use CSS custom properties for consistency.
