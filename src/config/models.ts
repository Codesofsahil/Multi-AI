import { ModelConfig, LocalModelConfig } from '../types';

export const AVAILABLE_MODELS: ModelConfig[] = [
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'openai',
    description: 'OpenAI GPT-4o Mini - Fast and efficient',
    maxTokens: 4096,
    temperature: 0.7,
    costPer1kTokens: 0.15,
    type: 'remote'
  },
  {
    id: 'claude-3-haiku-20240307',
    name: 'Claude 3 Haiku',
    provider: 'anthropic',
    description: 'Anthropic Claude 3 Haiku - Quick responses',
    maxTokens: 4096,
    temperature: 0.7,
    costPer1kTokens: 0.25,
    type: 'remote'
  },
  {
    id: 'gemini-1.5-flash',
    name: 'Gemini 1.5 Flash',
    provider: 'google',
    description: 'Google Gemini Flash - Lightning fast',
    maxTokens: 4096,
    temperature: 0.7,
    costPer1kTokens: 0.075,
    type: 'remote'
  },
  {
    id: 'deepseek-chat',
    name: 'DeepSeek Chat',
    provider: 'deepseek',
    description: 'DeepSeek Chat - Advanced reasoning',
    maxTokens: 4096,
    temperature: 0.7,
    costPer1kTokens: 0.14,
    type: 'remote'
  }
];

export const DEFAULT_LOCAL_MODELS: LocalModelConfig[] = [
  {
    id: 'llama3.2:latest',
    name: 'Llama 3.2',
    provider: 'Meta',
    description: 'Meta Llama 3.2 - Fast and efficient',
    endpoint: 'http://localhost:11434/api/chat',
    maxTokens: 512,
    temperature: 0.7,
    isEnabled: true,
    modelType: 'ollama'
  },
  {
    id: 'mistral:latest',
    name: 'Mistral',
    provider: 'Mistral AI',
    description: 'Mistral 7B - Powerful open-source model',
    endpoint: 'http://localhost:11434/api/chat',
    maxTokens: 512,
    temperature: 0.7,
    isEnabled: true,
    modelType: 'ollama'
  },
  {
    id: 'phi3:latest',
    name: 'Phi-3',
    provider: 'Microsoft',
    description: 'Microsoft Phi-3 - Small but capable',
    endpoint: 'http://localhost:11434/api/chat',
    maxTokens: 512,
    temperature: 0.7,
    isEnabled: true,
    modelType: 'ollama'
  },
  {
    id: 'deepseek-coder:1.3b',
    name: 'DeepSeek Coder',
    provider: 'DeepSeek',
    description: 'DeepSeek Coder - Programming specialist',
    endpoint: 'http://localhost:11434/api/chat',
    maxTokens: 512,
    temperature: 0.7,
    isEnabled: true,
    modelType: 'ollama'
  },
  {
    id: 'qwen2.5:1.5b',
    name: 'Qwen 2.5',
    provider: 'Alibaba',
    description: 'Alibaba Qwen 2.5 - Multilingual model',
    endpoint: 'http://localhost:11434/api/chat',
    maxTokens: 512,
    temperature: 0.7,
    isEnabled: true,
    modelType: 'ollama'
  }
];

export const getModelById = (id: string): ModelConfig | LocalModelConfig | undefined => {
  const remoteModel = AVAILABLE_MODELS.find(model => model.id === id);
  if (remoteModel) return remoteModel;
  return DEFAULT_LOCAL_MODELS.find(model => model.id === id);
};

export const getLocalModelById = (id: string): LocalModelConfig | undefined => {
  return DEFAULT_LOCAL_MODELS.find(model => model.id === id);
};

export const getDefaultModels = (count: number = 3): ModelConfig[] => {
  return AVAILABLE_MODELS.slice(0, Math.min(count, AVAILABLE_MODELS.length));
};

export const getAllModels = (): (ModelConfig | LocalModelConfig)[] => {
  return [...AVAILABLE_MODELS, ...DEFAULT_LOCAL_MODELS];
};

