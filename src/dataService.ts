// Data service for fetching LLM leaderboard data from multiple sources
// This file is meant to be used with a build tool that supports environment variables
// or through a backend proxy

export interface LLMModel {
  id: string
  name: string
  vendor: string
  score: number
  rank: number
  parameters?: string
  contextLength?: string
  pricing?: { input: string; output: string }
  benchmarks?: Record<string, number>
  lastUpdated: string
}

// Fetch from llmrank.cn (primary source - no auth needed)
export async function fetchLLMRankCN(): Promise<LLMModel[]> {
  // In production, use a serverless function to scrape
  // For now, using static data
  return getLLMRankData()
}

// Fetch from HuggingFace Open LLM Leaderboard
export async function fetchHuggingFaceLeaderboard(): Promise<LLMModel[]> {
  // Requires HF_TOKEN - would need a backend proxy
  // For now, return empty array
  return []
}

// Fetch from Apify LLM Benchmarks
export async function fetchApifyLLMBenchmarks(): Promise<LLMModel[]> {
  // Requires APIFY_API_KEY - would need a backend proxy
  // For now, return empty array
  return []
}

// Merge data from all sources
export async function fetchAllLeaderboardData(): Promise<LLMModel[]> {
  const [llmrank, hfData] = await Promise.allSettled([
    fetchLLMRankCN(),
    fetchHuggingFaceLeaderboard()
  ])

  const primary = llmrank.status === 'fulfilled' ? llmrank.value : []

  if (hfData.status === 'fulfilled' && hfData.value.length > 0) {
    // Could merge or cross-reference here
  }

  return primary
}

// Static data from llmrank.cn
function getLLMRankData(): LLMModel[] {
  return [
    { id: 'gpt-5.5-xhigh', name: 'GPT-5.5 (xhigh)', vendor: 'OpenAI', score: 60, rank: 1, parameters: '?B', contextLength: '128K', lastUpdated: '2026-04-23' },
    { id: 'gpt-5.5-high', name: 'GPT-5.5 (high)', vendor: 'OpenAI', score: 59, rank: 2, parameters: '?B', contextLength: '128K', lastUpdated: '2026-04-23' },
    { id: 'claude-opus-4.7', name: 'Claude Opus 4.7', vendor: 'Anthropic', score: 57, rank: 3, parameters: '?B', contextLength: '200K', lastUpdated: '2026-04-16' },
    { id: 'gpt-5.4-xhigh', name: 'GPT-5.4 (xhigh)', vendor: 'OpenAI', score: 57, rank: 4, parameters: '?B', contextLength: '128K', lastUpdated: '2026-03-05' },
    { id: 'kimi-k2.6', name: 'Kimi K2.6', vendor: 'Kimi', score: 54, rank: 5, parameters: '?B', contextLength: '128K', lastUpdated: '2026-04-20' },
    { id: 'mimo-v2.5-pro', name: 'MiMo-V2.5-Pro', vendor: 'Xiaomi', score: 54, rank: 6, parameters: '?B', contextLength: '128K', lastUpdated: '2026-04-22' },
    { id: 'muse-spark', name: 'Muse Spark', vendor: 'Meta', score: 52, rank: 7, parameters: '?B', contextLength: '100K', lastUpdated: '2026-04-08' },
    { id: 'deepseek-v4-pro', name: 'DeepSeek V4 Pro', vendor: 'DeepSeek', score: 52, rank: 8, parameters: '?B', contextLength: '128K', lastUpdated: '2026-04-24' },
  ]
}
