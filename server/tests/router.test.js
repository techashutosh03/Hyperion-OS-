// AUTOMATED UNIT TESTS FOR HYPERION SMART MODEL ROUTER
import { smartRouter } from '../router/smartRouter.js';
import { classifyIntent } from '../router/intentClassifier.js';
import { MODEL_REGISTRY } from '../registry/modelRegistry.js';

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`✓ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`✕ FAIL: ${testName}`);
    failed++;
  }
}

console.log('--- RUNNING HYPERION SMART MODEL ROUTER TESTS ---\n');

// 1. Intent Classification Tests
const codeIntent = classifyIntent({ prompt: 'Write a React hook for fetching data', mode: 'architect' });
assert(codeIntent.intent === 'CODING', 'Intent Classifier: Detects CODING intent');

const debugIntent = classifyIntent({ prompt: 'Fix TypeError: Cannot read property of undefined in main.js', mode: 'architect' });
assert(debugIntent.intent === 'DEBUGGING', 'Intent Classifier: Detects DEBUGGING intent');

const visionIntent = classifyIntent({ prompt: 'Analyze this UI screenshot', hasImage: true, mode: 'creator' });
assert(visionIntent.intent === 'VISION' && visionIntent.requiresVision, 'Intent Classifier: Detects VISION requirement on image prompt');

const researchIntent = classifyIntent({ prompt: 'Compare multi-agent orchestration papers and citations', mode: 'researcher' });
assert(researchIntent.intent === 'RESEARCH', 'Intent Classifier: Detects RESEARCH intent');

const mirrorIntent = classifyIntent({ prompt: 'Audit this architectural decision and list contradictions', mode: 'mirror' });
assert(mirrorIntent.intent === 'REASONING', 'Intent Classifier: Detects REASONING intent in MIRROR mode');

// 2. AUTO Mode Routing Tests
const configuredAll = ['google', 'openai', 'anthropic', 'zai', 'xai', 'deepseek'];

const autoCodeRoute = smartRouter.routeRequest({
  mode: 'architect',
  prompt: 'Refactor this database schema and write an API contract',
  requestedModelId: 'auto',
  configuredProviders: configuredAll
});
assert(autoCodeRoute.autoRouted, 'AUTO Routing: Correctly marks autoRouted as true');
assert(autoCodeRoute.selectedModel.capabilities.includes('coding'), 'AUTO Routing: Selects model with coding capability for architecture prompt');

const autoVisionRoute = smartRouter.routeRequest({
  mode: 'creator',
  prompt: 'Describe what is shown in this diagram',
  hasImage: true,
  requestedModelId: 'auto',
  configuredProviders: configuredAll
});
assert(autoVisionRoute.selectedModel.supportsVision, 'AUTO Routing: Selects vision-capable model for image request');

// 3. Explicit Model Selection & Override Tests
const explicitClaudeRoute = smartRouter.routeRequest({
  mode: 'architect',
  prompt: 'Review code',
  requestedModelId: 'claude-3-5-sonnet-20241022',
  configuredProviders: configuredAll
});
assert(explicitClaudeRoute.selectedModel.id === 'claude-3-5-sonnet-20241022', 'Explicit Selection: Respects user choice for Claude');

// 4. Unsupported Capability Fallback Test
const invalidVisionRoute = smartRouter.routeRequest({
  mode: 'creator',
  prompt: 'Analyze screenshot',
  hasImage: true,
  requestedModelId: 'o3-mini', // text/reasoning only, lacks vision
  configuredProviders: configuredAll
});
assert(invalidVisionRoute.selectedModel.supportsVision, 'Unsupported Capability: Auto-routes text-only explicit choice to vision-capable model on image prompt');
assert(invalidVisionRoute.overrideNotice !== null, 'Unsupported Capability: Generates clear override explanation notice');

// 5. Unconfigured Provider Fallback Test
const unconfiguredRoute = smartRouter.routeRequest({
  mode: 'architect',
  prompt: 'Write code',
  requestedModelId: 'auto',
  configuredProviders: ['google'] // Only Google configured
});
assert(unconfiguredRoute.selectedProvider === 'google', 'Fallback Routing: Routes to available configured provider (Google)');

console.log(`\n--- TEST SUMMARY: ${passed} PASSED, ${failed} FAILED ---`);
if (failed > 0) process.exit(1);
