import React, { useState } from 'react';
import { Globe, Search, Sparkles, BookOpen, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

export function DeepResearchWorkspace() {
  const [searchTopic, setSearchTopic] = useState('Quantum Computing Memory Optimization in AI Agents');
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const sources = [
    { title: 'arXiv:2608.0192 - Persistent Agent Memory Trees', domain: 'arxiv.org', relevance: '99%' },
    { title: 'ACM Digital Library: Multi-Modal Context Graphs', domain: 'dl.acm.org', relevance: '96%' },
    { title: 'MIT AI Lab: Atmospheric Glass Shader Performance', domain: 'mit.edu', relevance: '94%' },
  ];

  const synthesisPoints = [
    'Layered radial gradients reduce visual fatigue by 42% compared to flat dark themes.',
    'Atmospheric ocean color palettes (#0A1931, #1A3D63, #4A7FA7, #B3CFE5, #F6FAFD) foster high focus.',
    'Strict text system hierarchy enforces #F6FAFD for headings and #B3CFE5 for secondary labels.',
    'Glass backdrop blur of 24px with rgba(26,61,99,0.45) provides optimal depth perception.'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div 
        style={{
          background: 'rgba(26,61,99,0.45)',
          border: '1px solid rgba(179,207,229,0.12)',
          borderRadius: '16px',
          padding: '24px',
          backdropFilter: 'blur(24px)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#4A7FA7', marginBottom: '6px' }}>
          <Globe size={20} />
          <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
            Deep Research & Knowledge Engine
          </span>
        </div>
        <h2 style={{ color: '#F6FAFD', fontSize: '1.5rem', fontWeight: 700 }}>
          Multi-Source Deep Synthesis
        </h2>
        <p style={{ color: 'rgba(179,207,229,0.65)', fontSize: '0.88rem', marginTop: '4px' }}>
          Query across academic literature, real-time web indexes, and workspace memory nodes.
        </p>

        {/* Input Bar */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <div 
            style={{ 
              flex: 1, 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              backgroundColor: '#1A3D63', 
              border: '1px solid rgba(179,207,229,0.12)',
              borderRadius: '10px',
              padding: '10px 14px'
            }}
          >
            <Search size={16} style={{ color: '#B3CFE5' }} />
            <input 
              type="text"
              value={searchTopic}
              onChange={(e) => setSearchTopic(e.target.value)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#F6FAFD',
                fontSize: '0.9rem'
              }}
            />
          </div>
          <button 
            onClick={() => setIsSynthesizing(true)}
            className="btn-primary"
            style={{ padding: '10px 20px', borderRadius: '10px' }}
          >
            <Sparkles size={16} />
            <span>Synthesize Report</span>
          </button>
        </div>
      </div>

      {/* Grid Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px' }}>
        {/* Main Report Output */}
        <div 
          style={{
            backgroundColor: 'rgba(26,61,99,0.40)',
            border: '1px solid rgba(179,207,229,0.12)',
            borderRadius: '16px',
            padding: '24px',
            backdropFilter: 'blur(24px)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ color: '#F6FAFD', fontSize: '1.1rem', fontWeight: 600 }}>
              Synthesized Findings
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#B3CFE5', backgroundColor: 'rgba(179,207,229,0.10)', padding: '4px 10px', borderRadius: '6px' }}>
              4 Sources Analyzed
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {synthesisPoints.map((point, idx) => (
              <div 
                key={idx}
                style={{
                  backgroundColor: '#1A3D63',
                  border: '1px solid rgba(179,207,229,0.12)',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start'
                }}
              >
                <div style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: '#4A7FA7', color: '#F6FAFD', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>
                  {idx + 1}
                </div>
                <p style={{ color: '#F6FAFD', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sources Tree */}
        <div 
          style={{
            backgroundColor: 'rgba(26,61,99,0.40)',
            border: '1px solid rgba(179,207,229,0.12)',
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <h4 style={{ color: '#B3CFE5', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
            Verified Sources
          </h4>

          {sources.map((src, i) => (
            <div 
              key={i}
              style={{
                backgroundColor: '#1A3D63',
                border: '1px solid rgba(179,207,229,0.12)',
                borderRadius: '8px',
                padding: '10px 12px'
              }}
            >
              <div style={{ color: '#F6FAFD', fontWeight: 600, fontSize: '0.8rem', marginBottom: '4px' }}>
                {src.title}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'rgba(179,207,229,0.65)' }}>
                <span>{src.domain}</span>
                <span style={{ color: '#4A7FA7', fontWeight: 600 }}>{src.relevance} match</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
