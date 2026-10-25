// HYPERION SMART MODEL ROUTER & SCORING ENGINE
import { MODEL_REGISTRY, getModelById } from '../registry/modelRegistry.js';
import { classifyIntent } from './intentClassifier.js';

export class SmartModelRouter {
  // 1. Calculate capability match score
  calculateModelScore(model, classification, activeMode, configuredProviders) {
    let score = 0;
    const isConfigured = configuredProviders.includes(model.provider);

    // Hard Constraint: Vision requirement
    if (classification.requiresVision && !model.supportsVision) {
      return -9999;
    }

    // Hard Constraint: Unconfigured provider penalty
    if (!isConfigured) {
      score -= 500;
    } else {
      score += 100;
    }

    // 1. Capability Match Score (+30 per matching capability)
    classification.requiredCapabilities.forEach(cap => {
      if (model.capabilities.includes(cap)) {
        score += 30;
      }
    });

    // 2. Mode Priority Match (+25)
    switch (activeMode?.toLowerCase()) {
      case 'mirror':
        if (model.supportsReasoning) score += 25;
        break;
      case 'architect':
        if (model.capabilities.includes('coding') || model.capabilities.includes('architecture')) score += 25;
        break;
      case 'researcher':
        if (model.capabilities.includes('research') || model.capabilities.includes('longContext')) score += 25;
        break;
      case 'creator':
        if (model.capabilities.includes('creative') || model.supportsVision) score += 25;
        break;
      case 'executor':
        if (model.supportsReasoning || model.capabilities.includes('planning')) score += 25;
        break;
    }

    // 3. Category & Performance Weighting
    if (classification.complexity === 'HIGH' && model.category === 'Reasoning') score += 15;
    if (classification.complexity === 'LOW' && model.category === 'Fast') score += 15;
    if (classification.intent === 'CODING' && model.category === 'Coding') score += 20;

    // 4. Context Window Score
    if (classification.requiresLongContext && model.contextWindow >= 1000000) {
      score += 20;
    }

    return score;
  }

  // 2. Core Routing Engine
  routeRequest({ mode = 'architect', prompt = '', hasImage = false, requestedModelId = 'auto', contextFiles = [], configuredProviders = [] }) {
    const start = Date.now();

    // Step 1: Request Classification
    const classification = classifyIntent({ prompt, hasImage, contextFiles, mode });

    // Step 2: Rank All Candidate Models
    const rankedModels = MODEL_REGISTRY.map(model => {
      const score = this.calculateModelScore(model, classification, mode, configuredProviders);
      return { model, score };
    }).sort((a, b) => b.score - a.score);

    // Step 3: Evaluate Model Selection (Explicit Override vs AUTO)
    const isAuto = !requestedModelId || requestedModelId.toLowerCase() === 'auto';
    let selectedModel = null;
    let fallbackModels = [];
    let overrideNotice = null;
    let reason = '';

    if (!isAuto) {
      const requestedModel = getModelById(requestedModelId);
      const isConfigured = configuredProviders.includes(requestedModel.provider);

      if (classification.requiresVision && !requestedModel.supportsVision) {
        // Explicit selection lacks required vision capability -> Route to compatible fallback with clear notice
        const bestVisionModel = rankedModels.find(r => r.model.supportsVision && configuredProviders.includes(r.model.provider))?.model || rankedModels[0].model;
        selectedModel = bestVisionModel;
        overrideNotice = `Requested model [${requestedModel.displayName}] does not support vision. Auto-routed to [${bestVisionModel.displayName}].`;
        reason = `Auto-routed to ${bestVisionModel.displayName} for vision prompt requirement.`;
      } else if (!isConfigured) {
        // Explicit selection is unconfigured -> Fallback to best available configured model
        const bestAvailable = rankedModels.find(r => configuredProviders.includes(r.model.provider))?.model || requestedModel;
        selectedModel = bestAvailable;
        overrideNotice = `Requested model provider [${requestedModel.provider.toUpperCase()}] is not configured. Routed to [${bestAvailable.displayName}].`;
        reason = `Fallback to ${bestAvailable.displayName} due to unconfigured API key.`;
      } else {
        // User explicit choice is valid & compatible
        selectedModel = requestedModel;
        reason = `User explicit selection: ${requestedModel.displayName}`;
      }
    } else {
      // AUTO Mode Routing: Select top-ranked available model
      const topChoice = rankedModels.find(r => configuredProviders.includes(r.model.provider)) || rankedModels[0];
      selectedModel = topChoice.model;
      reason = `AUTO Mode: Selected ${selectedModel.displayName} (${classification.intent} in ${mode.toUpperCase()} mode).`;
    }

    // Prepare fallbacks list
    fallbackModels = rankedModels
      .filter(r => r.model.id !== selectedModel.id && configuredProviders.includes(r.model.provider) && r.score > 0)
      .map(r => r.model);

    const routingDuration = (Date.now() - start) + 'ms';

    return {
      autoRouted: isAuto,
      intentMetadata: classification,
      selectedModel,
      selectedProvider: selectedModel.provider,
      selectedProviderDisplayName: selectedModel.providerDisplayName,
      fallbackModels,
      reason,
      overrideNotice,
      routingDuration,
      timestamp: new Date().toISOString()
    };
  }
}

export const smartRouter = new SmartModelRouter();
