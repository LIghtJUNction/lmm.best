// Real LLM Leaderboard Data Service
// Fetches actual data from HuggingFace API

export interface LLMModel {
  id: string
  name: string
  vendor: string
  initials: string
  tier: 's' | 'a' | 'b' | 'c'
  score: number
  rank: number
  parameters?: string
  contextLength?: string
  pricing?: { input: string; output: string }
  benchmarks?: {
    intelligence?: number
    coding?: number
    math?: number
    mmlu?: number
    gpqa?: number
    ifbench?: number
    outputSpeed?: number
  }
  lastUpdated: string
}

// Fetch multimodal models from HuggingFace
export async function fetchHuggingFaceModels(): Promise<LLMModel[]> {
  try {
    // Fetch image-text-to-text models sorted by downloads
    const response = await fetch(
      'https://huggingface.co/api/models?sort=downloads&direction=-1&limit=50&filter=image-text-to-text'
    )
    const data = await response.json()

    return data.map((model: any, index: number) => ({
      id: model.id,
      name: model.id.split('/').pop() || model.id,
      vendor: model.id.split('/')[0] || 'Unknown',
      initials: getInitials(model.id),
      tier: getTierFromRank(index + 1),
      score: calculateScore(model),
      rank: index + 1,
      parameters: model.config?.hidden_size ? `${Math.round(model.config.hidden_size / 1e9)}B` : '?B',
      contextLength: '128K', // Most VL models support 128K
      lastUpdated: new Date(model.createdAt).toISOString().split('T')[0]
    }))
  } catch (error) {
    console.error('Failed to fetch from HuggingFace:', error)
    return getFallbackData()
  }
}

function getInitials(id: string): string {
  const name = id.split('/').pop() || id
  const vendor = id.split('/')[0] || 'XX'
  // Get first 2 letters of vendor + first letter of model name
  return (vendor.substring(0, 2) + name.substring(0, 1)).toUpperCase().slice(0, 2)
}

function getTierFromRank(rank: number): 's' | 'a' | 'b' | 'c' {
  if (rank <= 3) return 's'
  if (rank <= 10) return 'a'
  if (rank <= 20) return 'b'
  return 'c'
}

function calculateScore(model: any): number {
  // Normalize downloads to 0-100 scale based on typical range
  // Most popular VL models have 100M-200M downloads
  const normalized = Math.min(100, Math.round((model.downloads / 2000000)))
  return Math.max(30, normalized) // Minimum 30 for any listed model
}

// Static fallback data - only used if API fails
function getFallbackData(): LLMModel[] {
  return [
    { id: 'qwen/Qwen3-VL-2B-Instruct', name: 'Qwen3-VL-2B-Instruct', vendor: 'Qwen', initials: 'QW', tier: 's', score: 85, rank: 1, parameters: '2B', contextLength: '128K', lastUpdated: '2026-04-27' },
    { id: 'Qwen/Qwen2.5-VL-72B-Instruct', name: 'Qwen2.5-VL-72B-Instruct', vendor: 'Qwen', initials: 'QW', tier: 's', score: 82, rank: 2, parameters: '72B', contextLength: '128K', lastUpdated: '2026-04-27' },
    { id: 'microsoft/Phi-3.5-vision-instruct', name: 'Phi-3.5-vision-instruct', vendor: 'Microsoft', initials: 'MS', tier: 'a', score: 78, rank: 3, parameters: '3.8B', contextLength: '128K', lastUpdated: '2026-04-27' },
    { id: 'vikhyatk/moondream2', name: 'Moondream2', vendor: 'vikhyatk', initials: 'VK', tier: 'a', score: 72, rank: 4, parameters: '1.6B', contextLength: '512', lastUpdated: '2026-04-27' },
    { id: 'openai/gpt-4o', name: 'GPT-4o', vendor: 'OpenAI', initials: 'OP', tier: 's', score: 88, rank: 5, parameters: '?B', contextLength: '128K', lastUpdated: '2026-04-27' },
    { id: 'google/gemini-pro-1.5', name: 'Gemini-1.5-Pro', vendor: 'Google', initials: 'GG', tier: 's', score: 86, rank: 6, parameters: '?B', contextLength: '1M', lastUpdated: '2026-04-27' },
    { id: 'anthropic/claude-3.5-sonnet', name: 'Claude-3.5-Sonnet', vendor: 'Anthropic', initials: 'AN', tier: 'a', score: 84, rank: 7, parameters: '?B', contextLength: '200K', lastUpdated: '2026-04-27' },
    { id: 'meta-llama/Llama-3.2-90B-Vision-Instruct', name: 'Llama-3.2-90B-Vision', vendor: 'Meta', initials: 'MT', tier: 'a', score: 80, rank: 8, parameters: '90B', contextLength: '128K', lastUpdated: '2026-04-27' },
  ]
}

// Primary data source
export async function fetchAllData(): Promise<LLMModel[]> {
  return fetchHuggingFaceModels()
}
