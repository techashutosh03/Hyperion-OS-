import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { MODEL_REGISTRY } from './registry/modelRegistry.js';
import { orchestrator } from './orchestrator/aiOrchestrator.js';
import { smartRouter } from './router/smartRouter.js';
import { classifyIntent } from './router/intentClassifier.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '20mb' }));

// 1. Health Status Endpoint (Live Health Check Across All 6 Providers)
app.get('/api/ai/health', async (req, res) => {
  try {
    const healthResults = await orchestrator.checkAllProvidersHealth();
    const configuredCount = Object.values(healthResults).filter(h => h.configured).length;
    const connectedCount = Object.values(healthResults).filter(h => h.status === 'Connected').length;

    res.json({
      status: connectedCount > 0 ? 'Ready' : 'Provider Setup Required',
      configuredCount,
      connectedCount,
      totalProviders: 6,
      providers: healthResults,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Routing Debug History Inspection Endpoint (SECTION 10)
app.get('/api/ai/routing-debug', (req, res) => {
  const history = orchestrator.getRoutingHistory();
  const configuredProviders = orchestrator.getConfiguredProviders();
  res.json({
    history,
    configuredProviders,
    totalModels: MODEL_REGISTRY.length,
    timestamp: new Date().toISOString()
  });
});

// 3. Classify Intent & Model Routing Test Endpoint (SECTION 2 & 12)
app.post('/api/ai/classify-intent', (req, res) => {
  const { prompt, hasImage, requestedModelId, mode, contextFiles } = req.body;
  const configuredProviders = orchestrator.getConfiguredProviders();
  
  const route = smartRouter.routeRequest({
    mode: mode || 'architect',
    prompt: prompt || '',
    hasImage: Boolean(hasImage),
    requestedModelId: requestedModelId || 'auto',
    contextFiles: contextFiles || [],
    configuredProviders
  });

  res.json(route);
});

// 4. Single Provider Health Test Endpoint
app.post('/api/ai/test-provider', async (req, res) => {
  const { provider } = req.body;
  const adapter = orchestrator.adapters[provider];

  if (!adapter) {
    return res.status(400).json({ success: false, error: `Invalid provider [${provider}]` });
  }

  const start = Date.now();
  try {
    const health = await adapter.healthCheck();
    const duration = ((Date.now() - start) / 1000).toFixed(2) + 's';
    res.json({
      success: health.status === 'Connected',
      provider,
      status: health.status,
      duration,
      sampleResponse: health.sampleResponse || null,
      error: health.error || null
    });
  } catch (err) {
    res.json({
      success: false,
      provider,
      status: 'Failed',
      duration: ((Date.now() - start) / 1000).toFixed(2) + 's',
      error: err.message
    });
  }
});

// 5. Models Registry Endpoint
app.get('/api/ai/models', (req, res) => {
  const configuredProviders = orchestrator.getConfiguredProviders();
  const modelsWithStatus = MODEL_REGISTRY.map(m => ({
    ...m,
    isAvailable: configuredProviders.includes(m.provider)
  }));
  res.json({
    models: modelsWithStatus,
    configuredProviders
  });
});

// 6. Context Budget Endpoint
app.post('/api/ai/context-budget', (req, res) => {
  const { prompt, contextFiles } = req.body;
  const budget = orchestrator.calculateContextBudget(prompt, contextFiles);
  res.json(budget);
});

// 7. Streaming SSE AI Chat Endpoint
app.post('/api/ai/chat', async (req, res) => {
  const { mode, prompt, requestedModelId, contextFiles, image } = req.body;

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ error: 'Prompt message cannot be empty.' });
  }

  // Set SSE Headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const startTime = Date.now();

    const metadata = await orchestrator.streamResponse(
      { mode, prompt, requestedModelId, contextFiles, image },
      (chunk) => {
        res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
      }
    );

    const duration = ((Date.now() - startTime) / 1000).toFixed(2) + 's';

    res.write(`data: ${JSON.stringify({ 
      done: true, 
      metadata: { 
        ...metadata, 
        duration,
        tokens: Math.ceil(prompt.length / 4) + 180 
      } 
    })}\n\n`);
    res.end();

  } catch (error) {
    console.error(`[Hyperion AI Server Error - ${requestedModelId || 'Default'}]:`, error.message);
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
    res.end();
  }
});

app.listen(PORT, () => {
  console.log(`[Hyperion Intelligence Engine Server] Running on http://localhost:${PORT}`);
  console.log(`[Providers] Configured: ${orchestrator.getConfiguredProviders().join(', ').toUpperCase() || 'None'}`);
});
