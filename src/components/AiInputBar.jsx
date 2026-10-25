import React, { useState, useEffect, useRef } from 'react';
import { 
  Paperclip, Mic, Send, ChevronDown, Cpu, Sparkles, X, Image as ImageIcon, Check, StopCircle, Zap 
} from 'lucide-react';
import { AiOrb } from './AiOrb';
import { aiService } from '../services/aiService';

const DEFAULT_MODELS = [
  { id: 'gemini-2.5-flash', provider: 'google', providerDisplayName: 'Google Gemini', displayName: 'Gemini 2.5 Flash', category: 'Fast', contextWindow: 1000000 },
  { id: 'gemini-2.5-pro', provider: 'google', providerDisplayName: 'Google Gemini', displayName: 'Gemini 2.5 Pro', category: 'Reasoning', contextWindow: 2000000 },
  { id: 'gpt-4o', provider: 'openai', providerDisplayName: 'OpenAI', displayName: 'GPT-4o', category: 'Vision', contextWindow: 128000 },
  { id: 'gpt-4o-mini', provider: 'openai', providerDisplayName: 'OpenAI', displayName: 'GPT-4o Mini', category: 'Fast', contextWindow: 128000 },
  { id: 'o3-mini', provider: 'openai', providerDisplayName: 'OpenAI', displayName: 'o3 Mini Reasoning', category: 'Reasoning', contextWindow: 200000 },
  { id: 'claude-3-5-sonnet-20241022', provider: 'anthropic', providerDisplayName: 'Anthropic', displayName: 'Claude 3.5 Sonnet', category: 'Coding', contextWindow: 200000 },
  { id: 'claude-3-5-haiku-20241022', provider: 'anthropic', providerDisplayName: 'Anthropic', displayName: 'Claude 3.5 Haiku', category: 'Fast', contextWindow: 200000 },
  { id: 'glm-4-flash', provider: 'zai', providerDisplayName: 'Z.AI / GLM', displayName: 'GLM-4 Flash', category: 'Fast', contextWindow: 128000 },
  { id: 'glm-4', provider: 'zai', providerDisplayName: 'Z.AI / GLM', displayName: 'GLM-4 Flagship', category: 'Reasoning', contextWindow: 128000 },
  { id: 'grok-2-latest', provider: 'xai', providerDisplayName: 'xAI / Grok', displayName: 'Grok 2 Latest', category: 'Vision', contextWindow: 128000 },
  { id: 'grok-beta', provider: 'xai', providerDisplayName: 'xAI / Grok', displayName: 'Grok Beta', category: 'Reasoning', contextWindow: 128000 },
  { id: 'deepseek-chat', provider: 'deepseek', providerDisplayName: 'DeepSeek', displayName: 'DeepSeek V3 Chat', category: 'Coding', contextWindow: 64000 },
  { id: 'deepseek-reasoner', provider: 'deepseek', providerDisplayName: 'DeepSeek', displayName: 'DeepSeek R1 Reasoner', category: 'Reasoning', contextWindow: 64000 }
];

export function AiInputBar({ activeMode, onSendMessage, isGenerating, onStopGeneration }) {
  const [inputVal, setInputVal] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [models, setModels] = useState(DEFAULT_MODELS);
  const [selectedModelId, setSelectedModelId] = useState('auto');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    aiService.fetchModels().then(res => {
      if (res.models && res.models.length > 0) {
        setModels(res.models);
      }
    });
  }, []);

  const handleSend = () => {
    if (!inputVal.trim() && !attachedFile) return;
    if (onSendMessage) {
      onSendMessage({
        prompt: inputVal,
        requestedModelId: selectedModelId,
        attachedFile
      });
    }
    setInputVal('');
    setAttachedFile(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    const isImage = file.type.startsWith('image/');

    if (isImage) {
      reader.onload = (event) => {
        const base64Data = event.target.result.split(',')[1];
        setAttachedFile({
          name: file.name,
          type: 'image',
          mimeType: file.type,
          base64Data,
          previewUrl: URL.createObjectURL(file)
        });
      };
      reader.readAsDataURL(file);
    } else {
      reader.onload = (event) => {
        setAttachedFile({
          name: file.name,
          type: 'text',
          content: event.target.result
        });
      };
      reader.readAsText(file);
    }
  };

  const isAuto = selectedModelId === 'auto';
  const selectedModel = isAuto 
    ? { displayName: 'AUTO (Smart Router)', category: 'Optimal' }
    : (models.find(m => m.id === selectedModelId) || DEFAULT_MODELS[0]);

  // Group models by Provider Display Name
  const groupedModels = models.reduce((acc, m) => {
    const pName = m.providerDisplayName || m.provider.toUpperCase();
    if (!acc[pName]) acc[pName] = [];
    acc[pName].push(m);
    return acc;
  }, {});

  return (
    <div 
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '860px',
        margin: '0 auto',
        zIndex: 25
      }}
    >
      {/* Model Selection Dropdown Popup */}
      {isModelDropdownOpen && (
        <div 
          style={{
            position: 'absolute',
            bottom: '100%',
            right: 0,
            marginBottom: '8px',
            width: '380px',
            backgroundColor: '#0A1931',
            border: '1px solid rgba(179, 207, 229, 0.20)',
            borderRadius: '14px',
            padding: '12px',
            boxShadow: '0 20px 60px rgba(10, 25, 49, 0.85)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#B3CFE5', textTransform: 'uppercase', letterSpacing: '1px' }}>
              6-Provider Model Registry ({models.length} Models)
            </span>
            <span style={{ fontSize: '0.68rem', color: '#4A7FA7', fontWeight: 600 }}>Active</span>
          </div>

          <div style={{ maxHeight: '320px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px' }}>
            
            {/* 1. TOP CHOICE: AUTO MODE CARD */}
            <div
              onClick={() => {
                setSelectedModelId('auto');
                setIsModelDropdownOpen(false);
              }}
              style={{
                backgroundColor: isAuto ? '#1A3D63' : 'rgba(26, 61, 99, 0.40)',
                border: isAuto ? '1px solid #4A7FA7' : '1px solid rgba(74, 127, 167, 0.3)',
                borderRadius: '10px',
                padding: '10px 14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: isAuto ? '0 0 15px rgba(74, 127, 167, 0.25)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Zap size={18} style={{ color: '#4A7FA7' }} />
                <div>
                  <div style={{ color: '#F6FAFD', fontWeight: 700, fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>AUTO</span>
                    <span style={{ fontSize: '0.62rem', color: '#4A7FA7', backgroundColor: 'rgba(74,127,167,0.15)', padding: '1px 6px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 700 }}>
                      RECOMMENDED
                    </span>
                  </div>
                  <div style={{ color: 'rgba(179,207,229,0.7)', fontSize: '0.72rem', marginTop: '2px' }}>
                    Smart Router selects best model based on intent & mode
                  </div>
                </div>
              </div>
              {isAuto && <Check size={14} style={{ color: '#4A7FA7' }} />}
            </div>

            {/* 2. GROUPED PROVIDER MODELS */}
            {Object.keys(groupedModels).map(pName => (
              <div key={pName} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#4A7FA7', textTransform: 'uppercase', letterSpacing: '0.8px', padding: '4px 6px 2px 6px', borderBottom: '1px solid rgba(179,207,229,0.08)' }}>
                  {pName}
                </div>

                {groupedModels[pName].map(m => {
                  const isSelected = !isAuto && m.id === selectedModelId;
                  return (
                    <div
                      key={m.id}
                      onClick={() => {
                        setSelectedModelId(m.id);
                        setIsModelDropdownOpen(false);
                      }}
                      style={{
                        backgroundColor: isSelected ? '#1A3D63' : 'rgba(26, 61, 99, 0.25)',
                        border: isSelected ? '1px solid #4A7FA7' : '1px solid rgba(179, 207, 229, 0.08)',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div>
                        <div style={{ color: '#F6FAFD', fontWeight: 600, fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>{m.displayName}</span>
                          <span style={{ fontSize: '0.62rem', color: '#4A7FA7', backgroundColor: 'rgba(179,207,229,0.1)', padding: '1px 5px', borderRadius: '4px' }}>
                            {m.category}
                          </span>
                        </div>
                        <div style={{ color: 'rgba(179,207,229,0.65)', fontSize: '0.7rem', marginTop: '2px' }}>
                          {(m.contextWindow / 1000).toFixed(0)}k Context
                        </div>
                      </div>
                      {isSelected && <Check size={14} style={{ color: '#4A7FA7' }} />}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Input Container */}
      <div
        style={{
          background: 'rgba(26, 61, 99, 0.45)',
          border: isFocused 
            ? '1px solid #4A7FA7' 
            : '1px solid rgba(179, 207, 229, 0.12)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: isFocused 
            ? '0 0 25px rgba(74, 127, 167, 0.25), 0 20px 60px rgba(10, 25, 49, 0.45)' 
            : '0 20px 60px rgba(10, 25, 49, 0.35)',
          transform: isFocused ? 'translateY(-2px)' : 'translateY(0)',
          borderRadius: '16px',
          padding: '12px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Attachment Preview Chip */}
        {attachedFile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#1A3D63', border: '1px solid rgba(179,207,229,0.15)', padding: '4px 10px', borderRadius: '8px', width: 'fit-content' }}>
            {attachedFile.type === 'image' ? <ImageIcon size={14} style={{ color: '#4A7FA7' }} /> : <Paperclip size={14} style={{ color: '#B3CFE5' }} />}
            <span style={{ fontSize: '0.76rem', color: '#F6FAFD', fontWeight: 500 }}>{attachedFile.name}</span>
            <button onClick={() => setAttachedFile(null)} style={{ background: 'transparent', border: 'none', color: '#B3CFE5', cursor: 'pointer' }}>
              <X size={13} />
            </button>
          </div>
        )}

        {/* Top Prompt Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Animated Atmospheric Orb Avatar */}
          <AiOrb size={32} isThinking={isGenerating} />

          {/* Text Area / Input */}
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Hyperion anything..."
            disabled={isGenerating}
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#F6FAFD',
              fontSize: '0.94rem',
              fontFamily: 'inherit',
            }}
          />

          {/* Hidden File Input */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            style={{ display: 'none' }} 
            accept=".txt,.md,.js,.jsx,.ts,.tsx,.json,.csv,.pdf,.png,.jpg,.jpeg,.webp"
          />

          {/* Action Tools */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              title="Attach File or Image"
              style={{
                backgroundColor: 'rgba(179, 207, 229, 0.10)',
                border: '1px solid rgba(179, 207, 229, 0.12)',
                borderRadius: '8px',
                width: 34,
                height: 34,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#B3CFE5',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <Paperclip size={15} />
            </button>

            {/* Primary Send / Stop Button */}
            {isGenerating ? (
              <button
                onClick={onStopGeneration}
                style={{
                  backgroundColor: 'rgba(179, 207, 229, 0.15)',
                  color: '#F6FAFD',
                  border: '1px solid rgba(179, 207, 229, 0.20)',
                  borderRadius: '8px',
                  padding: '7px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: 600,
                  fontSize: '0.84rem',
                  cursor: 'pointer'
                }}
              >
                <span>Stop</span>
                <StopCircle size={14} />
              </button>
            ) : (
              <button
                onClick={handleSend}
                disabled={!inputVal.trim() && !attachedFile}
                style={{
                  backgroundColor: (!inputVal.trim() && !attachedFile) ? 'rgba(74, 127, 167, 0.4)' : '#4A7FA7',
                  color: '#F6FAFD',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '7px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: 600,
                  fontSize: '0.84rem',
                  cursor: (!inputVal.trim() && !attachedFile) ? 'not-allowed' : 'pointer',
                  boxShadow: '0 0 15px rgba(74, 127, 167, 0.3)',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>Send</span>
                <Send size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Bottom Options Row */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(179, 207, 229, 0.08)',
            paddingTop: '8px',
            fontSize: '0.74rem'
          }}
        >
          {/* Active Mode Selector Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'rgba(179, 207, 229, 0.65)' }}>Mode:</span>
            <div
              style={{ 
                backgroundColor: '#1A3D63', 
                color: '#F6FAFD', 
                padding: '3px 10px', 
                borderRadius: '6px',
                border: '1px solid #4A7FA7',
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '0.7rem',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 0 10px rgba(74, 127, 167, 0.2)'
              }}
            >
              <span>{activeMode}</span>
            </div>
          </div>

          {/* Model Selector Pill */}
          <div 
            onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              color: '#B3CFE5', 
              cursor: 'pointer',
              backgroundColor: isAuto ? 'rgba(74, 127, 167, 0.25)' : 'rgba(179, 207, 229, 0.08)',
              padding: '3px 10px',
              borderRadius: '6px',
              border: isAuto ? '1px solid #4A7FA7' : '1px solid rgba(179, 207, 229, 0.12)'
            }}
          >
            {isAuto ? <Zap size={12} style={{ color: '#4A7FA7' }} /> : <Cpu size={12} style={{ color: '#4A7FA7' }} />}
            <span style={{ fontWeight: isAuto ? 700 : 500, color: isAuto ? '#F6FAFD' : '#B3CFE5' }}>{selectedModel.displayName}</span>
            <ChevronDown size={11} />
          </div>
        </div>
      </div>
    </div>
  );
}
