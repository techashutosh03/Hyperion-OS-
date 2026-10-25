// CLIENT-SIDE AI SERVICE (Proxied via /api/ai/* to secure server)

export const aiService = {
  async fetchHealth() {
    try {
      const res = await fetch('/api/ai/health');
      if (!res.ok) throw new Error('Server health check failed');
      return await res.json();
    } catch (e) {
      return {
        status: 'Provider Setup Required',
        configuredCount: 0,
        connectedCount: 0,
        totalProviders: 6,
        providers: {}
      };
    }
  },

  async testProvider(provider) {
    try {
      const res = await fetch('/api/ai/test-provider', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider })
      });
      return await res.json();
    } catch (e) {
      return { success: false, provider, error: e.message };
    }
  },

  async fetchModels() {
    try {
      const res = await fetch('/api/ai/models');
      if (!res.ok) throw new Error('Failed to fetch models registry');
      return await res.json();
    } catch (e) {
      return {
        models: [],
        configuredProviders: []
      };
    }
  },

  async streamChat({ mode, prompt, requestedModelId, contextFiles, image, onChunk, onMetadata, onError, signal }) {
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, prompt, requestedModelId, contextFiles, image }),
        signal
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `API request failed with status ${response.status}`);
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
            const rawData = line.slice(6).trim();
            if (!rawData) continue;
            try {
              const data = JSON.parse(rawData);

              if (data.error) {
                if (onError) onError(data.error);
                return;
              }

              if (data.text && onChunk) {
                onChunk(data.text);
              }

              if (data.done && data.metadata && onMetadata) {
                onMetadata(data.metadata);
              }
            } catch (err) {}
          }
        }
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        if (onMetadata) onMetadata({ status: 'Cancelled by user' });
        return;
      }
      if (onError) onError(err.message || 'Connection error to AI Server');
    }
  }
};
