// HYPERION AI ORCHESTRATOR & SMART ROUTING ENGINE
import { MODEL_REGISTRY } from '../registry/modelRegistry.js';
import { 
  GeminiAdapter, OpenAIAdapter, AnthropicAdapter, 
  ZAIAdapter, XAIAdapter, DeepSeekAdapter 
} from '../providers/providerAdapter.js';
import { smartRouter } from '../router/smartRouter.js';

export class AIOrchestrator {
  constructor() {
    this.adapters = {
      google: new GeminiAdapter(process.env.GEMINI_API_KEY),
      openai: new OpenAIAdapter(process.env.OPENAI_API_KEY),
      anthropic: new AnthropicAdapter(process.env.ANTHROPIC_API_KEY),
      zai: new ZAIAdapter(process.env.ZAI_API_KEY),
      xai: new XAIAdapter(process.env.XAI_API_KEY),
      deepseek: new DeepSeekAdapter(process.env.DEEPSEEK_API_KEY)
    };
    this.routingHistory = [];
  }

  // Get list of configured provider names
  getConfiguredProviders() {
    return Object.keys(this.adapters).filter(name => this.adapters[name].isConfigured());
  }

  // Perform live health check across all 6 providers
  async checkAllProvidersHealth() {
    const results = {};
    const promises = Object.keys(this.adapters).map(async (name) => {
      const adapter = this.adapters[name];
      if (!adapter.isConfigured()) {
        results[name] = { status: 'Not Configured', configured: false };
      } else {
        const health = await adapter.healthCheck();
        results[name] = { ...health, configured: true };
      }
    });
    await Promise.all(promises);
    return results;
  }

  // Get routing inspection logs for Debug Panel
  getRoutingHistory() {
    return this.routingHistory.slice(-20).reverse();
  }

  // 1. COMPOSABLE SYSTEM PROMPT BUILDER
  buildSystemInstruction({ mode, project, contextFiles }) {
    let base = `You are Hyperion OS, an intelligent Personal AI Operating System designed for software engineering, deep research, UI/UX creation, autonomous task planning, and decision auditing.\n`;
    base += `Maintain a calm, technical, concise, and highly effective tone. Use clean GitHub-flavored markdown formatting for code and structured responses.\n`;

    let modeInstruction = '';
    switch (mode?.toLowerCase()) {
      case 'mirror':
        modeInstruction = `MODE: [MIRROR]\nAct as a rigorous decision audit and critical reasoning engine. Challenge underlying assumptions, detect logical contradictions, identify blind spots, analyze risks, present counterarguments, and evaluate decisions with intellectual clarity.\n`;
        break;
      case 'architect':
        modeInstruction = `MODE: [ARCHITECT]\nAct as a Principal Software Architect. Focus on software engineering, system boundaries, API contracts, database schemas, frontend/backend architecture, scalability, security, and structured technical outputs.\n`;
        break;
      case 'researcher':
        modeInstruction = `MODE: [RESEARCHER]\nAct as a Lead Multi-Source Researcher. Focus on evidence synthesis, source verification, comparative analysis, fact checking, and structured reports. Do NOT fabricate sources or citations.\n`;
        break;
      case 'creator':
        modeInstruction = `MODE: [CREATOR]\nAct as a Senior Creative & UI/UX Designer. Focus on UI design tokens, component architecture, visual layout hierarchy, frosted glass aesthetics (#0A1931, #1A3D63, #4A7FA7, #B3CFE5, #F6FAFD), branding, and creative concepts.\n`;
        break;
      case 'executor':
        modeInstruction = `MODE: [EXECUTOR]\nAct as an Execution Planner. Break requested tasks down into clear step-by-step execution plans, identify necessary tools, evaluate dependencies, and request user approval for high-risk operations.\n`;
        break;
      default:
        modeInstruction = `MODE: [ARCHITECT]\nProvide structured technical intelligence.\n`;
    }

    let contextStr = '';
    if (project) {
      contextStr += `Current Project: ${project}\n`;
    }
    if (contextFiles && contextFiles.length > 0) {
      contextStr += `Selected Workspace Files:\n${contextFiles.map(f => `- ${f.name}: ${f.content.slice(0, 500)}`).join('\n')}\n`;
    }

    return `${base}\n${modeInstruction}\n${contextStr}`;
  }

  // 2. CONTEXT BUDGET CALCULATOR
  calculateContextBudget(prompt, contextFiles = []) {
    const textLen = (prompt || '').length + contextFiles.reduce((acc, f) => acc + (f.content || '').length, 0);
    const estimatedTokens = Math.ceil(textLen / 4) + 1200;
    const maxTokens = 1000000;
    const percentage = Math.min(100, Math.round((estimatedTokens / maxTokens) * 100));

    return {
      tokensUsed: estimatedTokens,
      maxTokens,
      percentage: `${percentage}%`
    };
  }

  // Stream dispatch execution using Smart Model Router
  async streamResponse({ mode, prompt, requestedModelId, contextFiles, image }, onChunk) {
    const configuredProviders = this.getConfiguredProviders();

    if (configuredProviders.length === 0) {
      throw new Error('No AI Provider Configured in .env.');
    }

    // Step 1: Execute Smart Model Routing
    const route = smartRouter.routeRequest({
      mode,
      prompt,
      hasImage: Boolean(image),
      requestedModelId,
      contextFiles,
      configuredProviders
    });

    const selectedModel = route.selectedModel;
    let adapter = this.adapters[selectedModel.provider];

    // Record routing log entry for Debug Inspection Panel
    const debugRecord = {
      requestId: 'req_' + Date.now().toString(36),
      intent: route.intentMetadata.intent,
      mode: mode.toUpperCase(),
      requiredCapabilities: route.intentMetadata.requiredCapabilities,
      selectedProvider: route.selectedProviderDisplayName,
      selectedModel: selectedModel.displayName,
      fallbackModels: route.fallbackModels.map(m => m.displayName),
      routingDuration: route.routingDuration,
      status: 'PENDING',
      timestamp: new Date().toLocaleTimeString()
    };

    if (!adapter || !adapter.isConfigured()) {
      // Primary model adapter unavailable -> Attempt Fallback Model Execution
      const fallbackModel = route.fallbackModels[0];
      if (fallbackModel && this.adapters[fallbackModel.provider]?.isConfigured()) {
        adapter = this.adapters[fallbackModel.provider];
        route.selectedModel = fallbackModel;
        route.selectedProvider = fallbackModel.provider;
        route.selectedProviderDisplayName = fallbackModel.providerDisplayName;
        route.reason += ` (Fallback to ${fallbackModel.displayName})`;
      } else {
        debugRecord.status = 'FAILED';
        this.routingHistory.push(debugRecord);
        throw new Error(`Provider [${selectedModel.provider.toUpperCase()}] API Key is not configured in .env.`);
      }
    }

    const systemInstruction = this.buildSystemInstruction({ mode, contextFiles });

    try {
      await adapter.stream({
        modelId: route.selectedModel.id,
        prompt,
        systemInstruction,
        image,
        onChunk
      });

      debugRecord.status = 'SUCCESS';
      this.routingHistory.push(debugRecord);

      return {
        model: route.selectedModel.displayName,
        modelId: route.selectedModel.id,
        provider: route.selectedModel.provider,
        providerDisplayName: route.selectedModel.providerDisplayName,
        mode: mode || 'architect',
        routing: {
          autoRouted: route.autoRouted,
          intent: route.intentMetadata.intent,
          reason: route.reason,
          overrideNotice: route.overrideNotice
        }
      };
    } catch (err) {
      debugRecord.status = 'FAILED';
      this.routingHistory.push(debugRecord);
      throw err;
    }
  }
}

export const orchestrator = new AIOrchestrator();
