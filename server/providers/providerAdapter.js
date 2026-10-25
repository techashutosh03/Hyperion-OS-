// HYPERION AI PROVIDER ADAPTER ARCHITECTURE — 6 PROVIDERS
import { getModelById } from '../registry/modelRegistry.js';

export class BaseAIProviderAdapter {
  constructor(name, apiKey) {
    this.name = name;
    this.apiKey = apiKey;
  }

  isConfigured() {
    return Boolean(this.apiKey && this.apiKey.trim().length > 0);
  }

  async healthCheck() {
    if (!this.isConfigured()) {
      return { status: 'Not Configured', error: 'API key missing in .env' };
    }
    const start = Date.now();
    try {
      let resultText = '';
      await this.stream({
        prompt: 'Respond with exactly: Hyperion connection successful.',
        systemInstruction: 'Respond with brevity.',
        onChunk: (chunk) => { resultText += chunk; }
      });
      const durationMs = Date.now() - start;
      return { status: 'Connected', durationMs, sampleResponse: resultText.trim() };
    } catch (err) {
      const errLower = (err.message || '').toLowerCase();
      let status = 'Unavailable';
      if (errLower.includes('401') || errLower.includes('auth') || errLower.includes('key') || errLower.includes('invalid')) {
        status = 'Authentication Failed';
      } else if (errLower.includes('429') || errLower.includes('rate limit')) {
        status = 'Rate Limited';
      }
      return { status, error: err.message };
    }
  }

  async stream(options, onChunk) {
    throw new Error('stream() method must be implemented by provider adapter');
  }
}

// 1. GOOGLE GEMINI ADAPTER
export class GeminiAdapter extends BaseAIProviderAdapter {
  constructor(apiKey) {
    super('google', apiKey);
  }

  async stream({ modelId, prompt, systemInstruction, context, image, onChunk }) {
    if (!this.isConfigured()) {
      throw new Error('Google Gemini API Key is not configured in .env (GEMINI_API_KEY).');
    }

    const model = getModelById(modelId || 'gemini-2.5-flash');
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model.id}:streamGenerateContent?key=${this.apiKey}&alt=sse`;

    const contents = [];
    if (image && image.data) {
      contents.push({
        parts: [
          { inline_data: { mime_type: image.mimeType || 'image/png', data: image.data } },
          { text: prompt }
        ]
      });
    } else {
      contents.push({
        parts: [{ text: prompt }]
      });
    }

    const payload = {
      contents,
      systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined,
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 2048,
      }
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Google Gemini Authentication/API Error (${response.status}): ${errText.slice(0, 150)}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') continue;
          try {
            const data = JSON.parse(jsonStr);
            const textChunk = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (textChunk && onChunk) {
              onChunk(textChunk);
            }
          } catch (e) {}
        }
      }
    }
  }
}

// 2. OPENAI ADAPTER
export class OpenAIAdapter extends BaseAIProviderAdapter {
  constructor(apiKey) {
    super('openai', apiKey);
  }

  async stream({ modelId, prompt, systemInstruction, context, image, onChunk }) {
    if (!this.isConfigured()) {
      throw new Error('OpenAI API Key is not configured in .env (OPENAI_API_KEY).');
    }

    const model = getModelById(modelId || 'gpt-4o');
    const endpoint = 'https://api.openai.com/v1/chat/completions';

    const messages = [];
    if (systemInstruction) {
      messages.push({ role: 'system', content: systemInstruction });
    }

    if (image && image.data) {
      messages.push({
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          { type: 'image_url', image_url: { url: `data:${image.mimeType || 'image/png'};base64,${image.data}` } }
        ]
      });
    } else {
      messages.push({ role: 'user', content: prompt });
    }

    const payload = {
      model: model.id,
      messages,
      stream: true,
      temperature: 0.3
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`OpenAI Authentication/API Error (${response.status}): ${errText.slice(0, 150)}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;
          try {
            const data = JSON.parse(jsonStr);
            const textChunk = data?.choices?.[0]?.delta?.content;
            if (textChunk && onChunk) {
              onChunk(textChunk);
            }
          } catch (e) {}
        }
      }
    }
  }
}

// 3. ANTHROPIC CLAUDE ADAPTER
export class AnthropicAdapter extends BaseAIProviderAdapter {
  constructor(apiKey) {
    super('anthropic', apiKey);
  }

  async stream({ modelId, prompt, systemInstruction, context, image, onChunk }) {
    if (!this.isConfigured()) {
      throw new Error('Anthropic API Key is not configured in .env (ANTHROPIC_API_KEY).');
    }

    const model = getModelById(modelId || 'claude-3-5-sonnet-20241022');
    const endpoint = 'https://api.anthropic.com/v1/messages';

    const payload = {
      model: model.id,
      max_tokens: 2048,
      system: systemInstruction || undefined,
      messages: [{ role: 'user', content: prompt }],
      stream: true
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Anthropic Authentication/API Error (${response.status}): ${errText.slice(0, 150)}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonStr = line.slice(6).trim();
          try {
            const data = JSON.parse(jsonStr);
            if (data.type === 'content_block_delta' && data.delta?.text) {
              if (onChunk) onChunk(data.delta.text);
            }
          } catch (e) {}
        }
      }
    }
  }
}

// 4. Z.AI / GLM (ZHIPU AI) ADAPTER
export class ZAIAdapter extends BaseAIProviderAdapter {
  constructor(apiKey) {
    super('zai', apiKey);
  }

  async stream({ modelId, prompt, systemInstruction, context, image, onChunk }) {
    if (!this.isConfigured()) {
      throw new Error('Z.AI / GLM API Key is not configured in .env (ZAI_API_KEY).');
    }

    const model = getModelById(modelId || 'glm-4-flash');
    const endpoint = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

    const messages = [];
    if (systemInstruction) {
      messages.push({ role: 'system', content: systemInstruction });
    }
    messages.push({ role: 'user', content: prompt });

    const payload = {
      model: model.id,
      messages,
      stream: true,
      temperature: 0.3
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Z.AI Authentication/API Error (${response.status}): ${errText.slice(0, 150)}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;
          try {
            const data = JSON.parse(jsonStr);
            const textChunk = data?.choices?.[0]?.delta?.content;
            if (textChunk && onChunk) {
              onChunk(textChunk);
            }
          } catch (e) {}
        }
      }
    }
  }
}

// 5. xAI / GROK ADAPTER
export class XAIAdapter extends BaseAIProviderAdapter {
  constructor(apiKey) {
    super('xai', apiKey);
  }

  async stream({ modelId, prompt, systemInstruction, context, image, onChunk }) {
    if (!this.isConfigured()) {
      throw new Error('xAI / Grok API Key is not configured in .env (XAI_API_KEY).');
    }

    const model = getModelById(modelId || 'grok-2-latest');
    const endpoint = 'https://api.x.ai/v1/chat/completions';

    const messages = [];
    if (systemInstruction) {
      messages.push({ role: 'system', content: systemInstruction });
    }
    messages.push({ role: 'user', content: prompt });

    const payload = {
      model: model.id,
      messages,
      stream: true,
      temperature: 0.3
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`xAI Authentication/API Error (${response.status}): ${errText.slice(0, 150)}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;
          try {
            const data = JSON.parse(jsonStr);
            const textChunk = data?.choices?.[0]?.delta?.content;
            if (textChunk && onChunk) {
              onChunk(textChunk);
            }
          } catch (e) {}
        }
      }
    }
  }
}

// 6. DEEPSEEK ADAPTER
export class DeepSeekAdapter extends BaseAIProviderAdapter {
  constructor(apiKey) {
    super('deepseek', apiKey);
  }

  async stream({ modelId, prompt, systemInstruction, context, image, onChunk }) {
    if (!this.isConfigured()) {
      throw new Error('DeepSeek API Key is not configured in .env (DEEPSEEK_API_KEY).');
    }

    const model = getModelById(modelId || 'deepseek-chat');
    const endpoint = 'https://api.deepseek.com/chat/completions';

    const messages = [];
    if (systemInstruction) {
      messages.push({ role: 'system', content: systemInstruction });
    }
    messages.push({ role: 'user', content: prompt });

    const payload = {
      model: model.id,
      messages,
      stream: true,
      temperature: 0.3
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`DeepSeek Authentication/API Error (${response.status}): ${errText.slice(0, 150)}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;
          try {
            const data = JSON.parse(jsonStr);
            const textChunk = data?.choices?.[0]?.delta?.content;
            if (textChunk && onChunk) {
              onChunk(textChunk);
            }
          } catch (e) {}
        }
      }
    }
  }
}
