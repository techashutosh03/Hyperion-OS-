import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, Plus, Search, Pin, Star, Trash2, Copy, Share2, 
  RefreshCw, StopCircle, Layers, Globe, Palette, Cpu, Activity, Check, AlertCircle, Key
} from 'lucide-react';
import { aiService } from '../services/aiService';

export function AiConsoleWorkspace({ activeMode, setActiveMode, pendingInput, onClearPendingInput }) {
  const [conversations, setConversations] = useState([
    { 
      id: 'c1', 
      title: 'Hyperion Agent Architecture', 
      mode: 'ARCHITECT', 
      time: '10m ago',
      messages: [
        {
          role: 'user',
          text: 'How should I structure Hyperion OS\'s agent orchestration system for high efficiency?',
          time: '10:42 AM'
        },
        {
          role: 'assistant',
          mode: 'ARCHITECT',
          model: 'Gemini 2.5 Flash',
          provider: 'google',
          time: '10:43 AM',
          thinking: 'Analyzing hierarchical tree structure, subagent IPC memory queues, and glassmorphism state updates...',
          text: `### Hierarchical Agent Orchestration Architecture

Hyperion OS implements a **Decentralized Master-Worker Mesh**:

1. **Hyperion Orchestrator Core**:
   - Manages top-level context window (1M tokens).
   - Dynamically delegates tasks to specialized subagents.

2. **Specialized Intelligence Modes**:
   - **Architect**: Designs schemas, file contracts, and system boundaries.
   - **Researcher**: Queries multi-source indexes and returns verified citations.
   - **Creator**: Generates UI tokens, layouts, and SVG visual shaders.
   - **Executor**: Executes sandbox commands and tracks process lifecycles.
   - **Mirror**: Audits decisions, identifies contradictions, and validates assumptions.

\`\`\`javascript
// Hyperion Agent Dispatch Contract
export async function dispatchAgentTask({ mode, prompt, context }) {
  const agent = await HyperionMesh.spawn(mode);
  return agent.execute({ prompt, contextWindow: context.memory });
}
\`\`\`
`
        }
      ]
    }
  ]);

  const [activeConvId, setActiveConvId] = useState('c1');
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [streamBuffer, setStreamBuffer] = useState('');
  const [responseMetadata, setResponseMetadata] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [aiHealth, setAiHealth] = useState({ configuredProviders: [] });

  const abortControllerRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    aiService.fetchHealth().then(res => setAiHealth(res));
  }, []);

  const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0];

  // Handle pending input from bottom AI input bar
  useEffect(() => {
    if (pendingInput && pendingInput.prompt) {
      handleSendMessage(pendingInput);
      if (onClearPendingInput) onClearPendingInput();
    }
  }, [pendingInput]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages, streamBuffer]);

  const handleSendMessage = async ({ prompt, requestedModelId, attachedFile }) => {
    if (!prompt && !attachedFile) return;

    setErrorMessage(null);
    setResponseMetadata(null);
    setStreamBuffer('');
    setIsGenerating(true);

    const userMsg = {
      role: 'user',
      text: prompt,
      attachedFile,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Append user message to active thread
    const updatedMessages = [...(activeConv?.messages || []), userMsg];
    setConversations(conversations.map(c => c.id === activeConvId ? { ...c, messages: updatedMessages } : c));

    abortControllerRef.current = new AbortController();

    let currentChunkText = '';

    await aiService.streamChat({
      mode: activeMode,
      prompt,
      requestedModelId,
      image: attachedFile?.type === 'image' ? attachedFile : null,
      onChunk: (chunk) => {
        currentChunkText += chunk;
        setStreamBuffer(currentChunkText);
      },
      onMetadata: (meta) => {
        setResponseMetadata(meta);
        setIsGenerating(false);

        // Append assistant message once streaming completes
        const assistantMsg = {
          role: 'assistant',
          mode: activeMode.toUpperCase(),
          model: meta.model || 'Hyperion Model',
          provider: meta.provider || 'AI Core',
          text: currentChunkText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          metadata: meta
        };

        setConversations(prev => prev.map(c => {
          if (c.id === activeConvId) {
            return { ...c, messages: [...c.messages, assistantMsg] };
          }
          return c;
        }));
        setStreamBuffer('');
      },
      onError: (err) => {
        setIsGenerating(false);
        setErrorMessage(err);
      },
      signal: abortControllerRef.current.signal
    });
  };

  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsGenerating(false);
    }
  };

  const handleCopy = (idx, text) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const isConfigured = aiHealth.configuredProviders && aiHealth.configuredProviders.length > 0;

  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: '260px 1fr',
        gap: '16px',
        height: '100%',
        maxHeight: 'calc(100vh - 120px)',
        width: '100%'
      }}
    >
      {/* 1. CONVERSATION THREAD SIDEBAR */}
      <div 
        style={{
          backgroundColor: '#0A1931',
          border: '1px solid rgba(179, 207, 229, 0.12)',
          borderRadius: '14px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          overflowY: 'auto'
        }}
      >
        <button
          onClick={() => {
            const newC = { id: 'c_' + Date.now(), title: 'New Intelligence Thread', mode: activeMode.toUpperCase(), time: 'Just now', messages: [] };
            setConversations([newC, ...conversations]);
            setActiveConvId(newC.id);
          }}
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center', borderRadius: '8px' }}
        >
          <Plus size={15} />
          <span>New Conversation</span>
        </button>

        {/* Search Bar */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#1A3D63',
            border: '1px solid rgba(179, 207, 229, 0.12)',
            borderRadius: '8px',
            padding: '6px 10px'
          }}
        >
          <Search size={14} style={{ color: '#B3CFE5' }} />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search threads..."
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#F6FAFD',
              fontSize: '0.78rem'
            }}
          />
        </div>

        {/* Conversations List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, overflowY: 'auto' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#B3CFE5', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Threads
          </div>

          {conversations
            .filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .map(c => {
              const isActive = c.id === activeConvId;
              return (
                <div
                  key={c.id}
                  onClick={() => setActiveConvId(c.id)}
                  style={{
                    backgroundColor: isActive ? '#1A3D63' : 'rgba(26, 61, 99, 0.25)',
                    border: isActive ? '1px solid #4A7FA7' : '1px solid transparent',
                    borderRadius: '8px',
                    padding: '8px 10px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#F6FAFD', fontWeight: isActive ? 600 : 400, fontSize: '0.8rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '160px' }}>
                      {c.title}
                    </span>
                    <button onClick={(e) => { e.stopPropagation(); setConversations(conversations.filter(x => x.id !== c.id)); }} style={{ background: 'transparent', border: 'none', color: '#B3CFE5', cursor: 'pointer' }}>
                      <Trash2 size={11} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'rgba(179, 207, 229, 0.65)' }}>
                    <span>{c.mode}</span>
                    <span>{c.time}</span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* 2. MAIN CONVERSATION STREAM */}
      <div 
        style={{
          backgroundColor: 'rgba(26, 61, 99, 0.35)',
          border: '1px solid rgba(179, 207, 229, 0.12)',
          backdropFilter: 'blur(24px)',
          borderRadius: '14px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          overflowY: 'auto'
        }}
      >
        {/* Unconfigured Provider Fallback Banner */}
        {!isConfigured && (
          <div 
            style={{
              backgroundColor: '#1A3D63',
              border: '1px solid #4A7FA7',
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 0 20px rgba(74, 127, 167, 0.20)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Key size={20} style={{ color: '#4A7FA7' }} />
              <div>
                <div style={{ color: '#F6FAFD', fontWeight: 600, fontSize: '0.9rem' }}>
                  AI Provider Not Configured
                </div>
                <div style={{ color: 'rgba(179, 207, 229, 0.65)', fontSize: '0.78rem' }}>
                  Add your API key (e.g. <code style={{ color: '#F6FAFD', backgroundColor: 'rgba(10,25,49,0.6)', padding: '2px 6px', borderRadius: '4px' }}>GEMINI_API_KEY</code> or <code style={{ color: '#F6FAFD', backgroundColor: 'rgba(10,25,49,0.6)', padding: '2px 6px', borderRadius: '4px' }}>OPENAI_API_KEY</code>) in your <code style={{ color: '#F6FAFD' }}>.env</code> file to enable live intelligence responses.
                </div>
              </div>
            </div>
            <button onClick={() => aiService.fetchHealth().then(res => setAiHealth(res))} className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
              <RefreshCw size={13} />
              <span>Retry Connection</span>
            </button>
          </div>
        )}

        {/* Message Stream */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
          {activeConv?.messages?.map((msg, i) => (
            <div 
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div style={{ fontSize: '0.72rem', color: 'rgba(179, 207, 229, 0.65)', display: 'flex', gap: '6px' }}>
                <span>{msg.role === 'user' ? 'You' : `Hyperion [${msg.mode || activeMode.toUpperCase()}]`}</span>
                <span>•</span>
                <span>{msg.time}</span>
              </div>

              <div
                style={{
                  maxWidth: '85%',
                  backgroundColor: msg.role === 'user' ? '#1A3D63' : 'rgba(10, 25, 49, 0.70)',
                  border: msg.role === 'user' ? '1px solid #4A7FA7' : '1px solid rgba(179, 207, 229, 0.12)',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  color: '#F6FAFD',
                  fontSize: '0.9rem',
                  lineHeight: '1.5',
                  boxShadow: '0 8px 24px rgba(10, 25, 49, 0.35)'
                }}
              >
                {/* Image Attachment Preview */}
                {msg.attachedFile?.previewUrl && (
                  <img 
                    src={msg.attachedFile.previewUrl} 
                    alt="attachment" 
                    style={{ maxWidth: '240px', borderRadius: '8px', marginBottom: '10px', border: '1px solid rgba(179,207,229,0.2)' }} 
                  />
                )}

                <div style={{ whiteSpace: 'pre-wrap' }}>
                  {msg.text}
                </div>

                {/* Assistant Response Metadata */}
                {msg.role === 'assistant' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid rgba(179, 207, 229, 0.08)', fontSize: '0.72rem', color: 'rgba(179,207,229,0.65)' }}>
                    {msg.metadata?.routing && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4A7FA7', fontWeight: 600 }}>
                        <Zap size={12} />
                        <span>{msg.metadata.routing.autoRouted ? 'AUTO ROUTED' : 'DIRECT ROUTE'}: {msg.model} ({msg.provider}) — Task: {msg.metadata.routing.intent} • {msg.metadata.routing.reason}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Engine: {msg.model || 'Gemini'} • Duration: {msg.metadata?.duration || '1.2s'}</span>
                      <button onClick={() => handleCopy(i, msg.text)} style={{ background: 'transparent', border: 'none', color: '#B3CFE5', fontSize: '0.74rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {copiedIndex === i ? <Check size={13} style={{ color: '#4A7FA7' }} /> : <Copy size={13} />}
                        <span>{copiedIndex === i ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Live Streaming Chunk Output */}
          {isGenerating && streamBuffer && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '0.72rem', color: '#4A7FA7', fontWeight: 600 }}>
                Hyperion [{activeMode.toUpperCase()}] • Streaming response...
              </div>
              <div 
                style={{
                  maxWidth: '85%',
                  backgroundColor: 'rgba(10, 25, 49, 0.70)',
                  border: '1px solid #4A7FA7',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  color: '#F6FAFD',
                  fontSize: '0.9rem',
                  lineHeight: '1.5',
                  boxShadow: '0 0 20px rgba(74,127,167,0.25)',
                  whiteSpace: 'pre-wrap'
                }}
              >
                {streamBuffer}
                <span style={{ display: 'inline-block', width: '8px', height: '14px', backgroundColor: '#4A7FA7', marginLeft: '4px', animation: 'blink 1s infinite' }} />
              </div>
            </div>
          )}

          {/* Error Card */}
          {errorMessage && (
            <div style={{ backgroundColor: 'rgba(26, 61, 99, 0.60)', border: '1px solid #4A7FA7', borderRadius: '10px', padding: '14px 18px', color: '#F6FAFD', fontSize: '0.84rem', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <AlertCircle size={18} style={{ color: '#4A7FA7', flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 600 }}>Execution Notice</div>
                <div style={{ color: '#B3CFE5', fontSize: '0.78rem' }}>{errorMessage}</div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}
