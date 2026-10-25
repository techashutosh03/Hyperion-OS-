// HYPERION CENTRAL MODEL REGISTRY — ALL 6 AI PROVIDERS SOURCE OF TRUTH
export const MODEL_REGISTRY = [
  // 1. GOOGLE GEMINI
  {
    id: 'gemini-2.5-flash',
    provider: 'google',
    providerDisplayName: 'Google Gemini',
    displayName: 'Gemini 2.5 Flash',
    category: 'Fast',
    capabilities: ['textGeneration', 'vision', 'streaming', 'fastResponse', 'reasoning', 'longContext'],
    contextWindow: 1000000,
    supportsStreaming: true,
    supportsVision: true,
    supportsTools: true,
    supportsReasoning: true,
    description: 'Ultra-fast atmospheric reasoning engine with 1M token context.'
  },
  {
    id: 'gemini-2.5-pro',
    provider: 'google',
    providerDisplayName: 'Google Gemini',
    displayName: 'Gemini 2.5 Pro',
    category: 'Reasoning',
    capabilities: ['textGeneration', 'vision', 'streaming', 'reasoning', 'coding', 'architecture', 'longContext'],
    contextWindow: 2000000,
    supportsStreaming: true,
    supportsVision: true,
    supportsTools: true,
    supportsReasoning: true,
    description: 'Deep reasoning & system architecture model with 2M context.'
  },

  // 2. OPENAI
  {
    id: 'gpt-4o',
    provider: 'openai',
    providerDisplayName: 'OpenAI',
    displayName: 'GPT-4o',
    category: 'Vision',
    capabilities: ['textGeneration', 'vision', 'streaming', 'coding', 'writing', 'creative', 'toolCalling'],
    contextWindow: 128000,
    supportsStreaming: true,
    supportsVision: true,
    supportsTools: true,
    supportsReasoning: false,
    description: 'Flagship multimodal vision & intelligence model.'
  },
  {
    id: 'gpt-4o-mini',
    provider: 'openai',
    providerDisplayName: 'OpenAI',
    displayName: 'GPT-4o Mini',
    category: 'Fast',
    capabilities: ['textGeneration', 'vision', 'streaming', 'fastResponse'],
    contextWindow: 128000,
    supportsStreaming: true,
    supportsVision: true,
    supportsTools: false,
    supportsReasoning: false,
    description: 'Lightweight, rapid response assistant.'
  },
  {
    id: 'o3-mini',
    provider: 'openai',
    providerDisplayName: 'OpenAI',
    displayName: 'o3 Mini Reasoning',
    category: 'Reasoning',
    capabilities: ['textGeneration', 'reasoning', 'streaming', 'coding', 'math'],
    contextWindow: 200000,
    supportsStreaming: true,
    supportsVision: false,
    supportsTools: false,
    supportsReasoning: true,
    description: 'Advanced STEM & logic reasoning model.'
  },

  // 3. ANTHROPIC CLAUDE
  {
    id: 'claude-3-5-sonnet-20241022',
    provider: 'anthropic',
    providerDisplayName: 'Anthropic',
    displayName: 'Claude 3.5 Sonnet',
    category: 'Coding',
    capabilities: ['textGeneration', 'vision', 'streaming', 'coding', 'debugging', 'architecture', 'reasoning', 'longContext'],
    contextWindow: 200000,
    supportsStreaming: true,
    supportsVision: true,
    supportsTools: true,
    supportsReasoning: true,
    description: 'Industry-leading software engineering & code generation engine.'
  },
  {
    id: 'claude-3-5-haiku-20241022',
    provider: 'anthropic',
    providerDisplayName: 'Anthropic',
    displayName: 'Claude 3.5 Haiku',
    category: 'Fast',
    capabilities: ['textGeneration', 'streaming', 'fastResponse', 'writing'],
    contextWindow: 200000,
    supportsStreaming: true,
    supportsVision: false,
    supportsTools: false,
    supportsReasoning: false,
    description: 'Compact high-speed conversational engine.'
  },

  // 4. Z.AI / GLM (ZHIPU AI)
  {
    id: 'glm-4-flash',
    provider: 'zai',
    providerDisplayName: 'Z.AI / GLM',
    displayName: 'GLM-4 Flash',
    category: 'Fast',
    capabilities: ['textGeneration', 'streaming', 'fastResponse', 'coding'],
    contextWindow: 128000,
    supportsStreaming: true,
    supportsVision: false,
    supportsTools: false,
    supportsReasoning: false,
    description: 'Z.AI high-efficiency rapid response engine.'
  },
  {
    id: 'glm-4',
    provider: 'zai',
    providerDisplayName: 'Z.AI / GLM',
    displayName: 'GLM-4 Flagship',
    category: 'Reasoning',
    capabilities: ['textGeneration', 'streaming', 'reasoning', 'research', 'writing'],
    contextWindow: 128000,
    supportsStreaming: true,
    supportsVision: false,
    supportsTools: true,
    supportsReasoning: true,
    description: 'Z.AI flagship reasoning & language synthesis model.'
  },

  // 5. xAI / GROK
  {
    id: 'grok-2-latest',
    provider: 'xai',
    providerDisplayName: 'xAI / Grok',
    displayName: 'Grok 2 Latest',
    category: 'Vision',
    capabilities: ['textGeneration', 'vision', 'streaming', 'reasoning', 'research'],
    contextWindow: 128000,
    supportsStreaming: true,
    supportsVision: true,
    supportsTools: true,
    supportsReasoning: true,
    description: 'xAI flagship real-time reasoning & vision engine.'
  },
  {
    id: 'grok-beta',
    provider: 'xai',
    providerDisplayName: 'xAI / Grok',
    displayName: 'Grok Beta',
    category: 'Reasoning',
    capabilities: ['textGeneration', 'streaming', 'reasoning', 'fastResponse'],
    contextWindow: 128000,
    supportsStreaming: true,
    supportsVision: false,
    supportsTools: false,
    supportsReasoning: true,
    description: 'xAI high-throughput conversational model.'
  },

  // 6. DEEPSEEK
  {
    id: 'deepseek-chat',
    provider: 'deepseek',
    providerDisplayName: 'DeepSeek',
    displayName: 'DeepSeek V3 Chat',
    category: 'Coding',
    capabilities: ['textGeneration', 'streaming', 'coding', 'debugging', 'fastResponse'],
    contextWindow: 64000,
    supportsStreaming: true,
    supportsVision: false,
    supportsTools: true,
    supportsReasoning: false,
    description: 'DeepSeek open-architecture code & general chat model.'
  },
  {
    id: 'deepseek-reasoner',
    provider: 'deepseek',
    providerDisplayName: 'DeepSeek',
    displayName: 'DeepSeek R1 Reasoner',
    category: 'Reasoning',
    capabilities: ['textGeneration', 'streaming', 'reasoning', 'math', 'architecture'],
    contextWindow: 64000,
    supportsStreaming: true,
    supportsVision: false,
    supportsTools: false,
    supportsReasoning: true,
    description: 'DeepSeek R1 chain-of-thought reasoning engine.'
  }
];

export function getModelById(modelId) {
  return MODEL_REGISTRY.find(m => m.id === modelId) || MODEL_REGISTRY[0];
}

export function getModelsByProvider(provider) {
  return MODEL_REGISTRY.filter(m => m.provider === provider);
}
