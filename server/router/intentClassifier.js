// HYPERION INTENT CLASSIFIER (Zero-Latency Deterministic Classification)

export function classifyIntent({ prompt = '', hasImage = false, contextFiles = [], mode = 'architect' }) {
  const p = prompt.toLowerCase().trim();
  const fileExts = contextFiles.map(f => (f.name || '').split('.').pop().toLowerCase());

  // 1. VISION CHECK
  if (hasImage) {
    return {
      intent: 'VISION',
      complexity: 'MEDIUM',
      requiresVision: true,
      requiresLongContext: false,
      requiredCapabilities: ['vision', 'textGeneration'],
      explanation: 'Multimodal input requires vision capability'
    };
  }

  // 2. DOCUMENT / LONG CONTEXT CHECK
  const totalLength = p.length + contextFiles.reduce((acc, f) => acc + (f.content || '').length, 0);
  const requiresLongContext = totalLength > 15000;

  // 3. CODING & DEBUGGING PATTERNS
  const isCodeFileAttached = fileExts.some(ext => ['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'c', 'cpp', 'rs', 'go', 'html', 'css', 'json', 'sql'].includes(ext));
  const codingKeywords = ['code', 'function', 'class', 'bug', 'fix', 'refactor', 'compile', 'script', 'component', 'api', 'syntax', 'const', 'import', 'export', 'method', 'error', 'exception', 'stack trace', 'react', 'node', 'express'];
  
  if (p.includes('bug') || p.includes('fix') || p.includes('error') || p.includes('exception') || p.includes('stack trace')) {
    return {
      intent: 'DEBUGGING',
      complexity: 'HIGH',
      requiresVision: false,
      requiresLongContext,
      requiredCapabilities: ['coding', 'debugging', 'reasoning'],
      explanation: 'Code error detection & bug diagnosis request'
    };
  }

  if (isCodeFileAttached || codingKeywords.some(kw => p.includes(kw))) {
    return {
      intent: 'CODING',
      complexity: p.length > 200 ? 'HIGH' : 'MEDIUM',
      requiresVision: false,
      requiresLongContext,
      requiredCapabilities: ['coding', 'textGeneration'],
      explanation: 'Software engineering & code implementation request'
    };
  }

  // 4. ARCHITECTURE & SYSTEM DESIGN
  const archKeywords = ['architecture', 'system design', 'microservices', 'database schema', 'scalability', 'infrastructure', 'security model', 'api contract', 'orchestrator'];
  if (mode === 'architect' || archKeywords.some(kw => p.includes(kw))) {
    return {
      intent: 'ARCHITECTURE',
      complexity: 'HIGH',
      requiresVision: false,
      requiresLongContext,
      requiredCapabilities: ['architecture', 'reasoning', 'coding'],
      explanation: 'System architecture & software engineering design'
    };
  }

  // 5. REASONING & MATH
  const mathKeywords = ['solve', 'proof', 'equation', 'algorithm', 'complexity', 'o(n)', 'matrix', 'probability', 'logic', 'contradiction', 'assumption'];
  if (mode === 'mirror' || mathKeywords.some(kw => p.includes(kw))) {
    return {
      intent: mode === 'mirror' ? 'REASONING' : 'MATH',
      complexity: 'HIGH',
      requiresVision: false,
      requiresLongContext,
      requiredCapabilities: ['reasoning'],
      explanation: mode === 'mirror' ? 'Decision audit & critical reasoning request' : 'Mathematical & algorithmic reasoning request'
    };
  }

  // 6. RESEARCH & SOURCE ANALYSIS
  const researchKeywords = ['research', 'source', 'citation', 'paper', 'literature', 'compare', 'evidence', 'market analysis', 'benchmark'];
  if (mode === 'researcher' || researchKeywords.some(kw => p.includes(kw))) {
    return {
      intent: 'RESEARCH',
      complexity: 'MEDIUM',
      requiresVision: false,
      requiresLongContext,
      requiredCapabilities: ['research', 'reasoning'],
      explanation: 'Multi-source research & evidence analysis'
    };
  }

  // 7. CREATIVE & WRITING
  const creativeKeywords = ['design', 'ui', 'ux', 'color', 'brand', 'story', 'article', 'copy', 'presentation', 'layout'];
  if (mode === 'creator' || creativeKeywords.some(kw => p.includes(kw))) {
    return {
      intent: 'CREATIVE',
      complexity: 'MEDIUM',
      requiresVision: false,
      requiresLongContext,
      requiredCapabilities: ['creative', 'writing'],
      explanation: 'UI design & creative concept generation'
    };
  }

  // 8. PLANNING & EXECUTION
  const planningKeywords = ['plan', 'steps', 'workflow', 'roadmap', 'schedule', 'todo', 'tasks'];
  if (mode === 'executor' || planningKeywords.some(kw => p.includes(kw))) {
    return {
      intent: 'PLANNING',
      complexity: 'MEDIUM',
      requiresVision: false,
      requiresLongContext,
      requiredCapabilities: ['reasoning'],
      explanation: 'Task planning & workflow step breakdown'
    };
  }

  // 9. GENERAL / DEFAULT
  return {
    intent: 'GENERAL',
    complexity: 'LOW',
    requiresVision: false,
    requiresLongContext,
    requiredCapabilities: ['textGeneration', 'fastResponse'],
    explanation: 'General conversational query'
  };
}
