import React, { useState } from 'react';
import { 
  Wrench, Search, Sparkles, Globe, Code2, Palette, FileText, 
  Terminal, Cpu, CheckCircle2, ArrowUpRight, Star, Layers, Filter 
} from 'lucide-react';

export function AiToolkitWorkspace() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const categories = [
    'All', 'AI Assistants', 'Research', 'Coding', 'UI/UX & Design', 
    'Automation', 'Documents', 'Productivity', 'Writing'
  ];

  const tools = [
    {
      id: 't1',
      name: 'Architect Code Auditor',
      category: 'Coding',
      desc: 'Deep security, performance, and architecture inspector for full-stack repos.',
      mode: 'ARCHITECT',
      status: 'Connected',
      icon: Code2
    },
    {
      id: 't2',
      name: 'Multi-Source Synthesizer',
      category: 'Research',
      desc: 'Retrieves, cross-verifies, and cites evidence across academic literature.',
      mode: 'RESEARCHER',
      status: 'Connected',
      icon: Globe
    },
    {
      id: 't3',
      name: 'Atmospheric UI Studio',
      category: 'UI/UX & Design',
      desc: 'Generates frosted glass layout designs, color tokens, and SVG graphics.',
      mode: 'CREATOR',
      status: 'Connected',
      icon: Palette
    },
    {
      id: 't4',
      name: 'Sandbox Task Runner',
      category: 'Automation',
      desc: 'Executes parallel shell commands and monitors workflow pipelines.',
      mode: 'EXECUTOR',
      status: 'Connected',
      icon: Terminal
    },
    {
      id: 't5',
      name: 'Decision Risk Audit Engine',
      category: 'AI Assistants',
      desc: 'Identifies contradictions, counterarguments, and risks in product decisions.',
      mode: 'MIRROR',
      status: 'Connected',
      icon: Cpu
    },
    {
      id: 't6',
      name: 'PDF & Document Analyzer',
      category: 'Documents',
      desc: 'Extracts tables, citations, and summaries from multi-page documents.',
      mode: 'RESEARCHER',
      status: 'Connected',
      icon: FileText
    }
  ];

  const filtered = tools.filter(t => {
    const matchesCat = activeCategory === 'All' || t.category === activeCategory;
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1150px', margin: '0 auto', width: '100%' }}>
      {/* Banner */}
      <div 
        style={{
          background: 'rgba(26, 61, 99, 0.45)',
          border: '1px solid rgba(179, 207, 229, 0.12)',
          borderRadius: '16px',
          padding: '24px',
          backdropFilter: 'blur(24px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4A7FA7', marginBottom: '6px' }}>
            <Wrench size={18} />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase' }}>
              Hyperion AI Tools Ecosystem
            </span>
          </div>
          <h2 style={{ color: '#F6FAFD', fontSize: '1.5rem', fontWeight: 700 }}>
            AI Tools & Integrations Directory
          </h2>
          <p style={{ color: 'rgba(179, 207, 229, 0.65)', fontSize: '0.88rem', marginTop: '4px' }}>
            Discover and integrate specialized AI tools designed natively in Deep Ocean visual style.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#1A3D63', border: '1px solid rgba(179, 207, 229, 0.12)', borderRadius: '8px', padding: '8px 14px', width: '260px' }}>
          <Search size={15} style={{ color: '#B3CFE5' }} />
          <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search AI toolkit..."
            style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', color: '#F6FAFD', fontSize: '0.8rem' }}
          />
        </div>
      </div>

      {/* Filter Pills */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              backgroundColor: activeCategory === cat ? '#4A7FA7' : 'rgba(179, 207, 229, 0.08)',
              color: activeCategory === cat ? '#F6FAFD' : '#B3CFE5',
              border: 'none',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px' }}>
        {filtered.map(tool => {
          const Icon = tool.icon;
          return (
            <div 
              key={tool.id}
              style={{
                backgroundColor: 'rgba(26, 61, 99, 0.40)',
                border: '1px solid rgba(179, 207, 229, 0.12)',
                borderRadius: '14px',
                padding: '20px',
                backdropFilter: 'blur(24px)',
                boxShadow: '0 10px 30px rgba(10, 25, 49, 0.35)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div 
                    style={{ 
                      width: 40, 
                      height: 40, 
                      borderRadius: '10px', 
                      backgroundColor: '#1A3D63', 
                      border: '1px solid rgba(179,207,229,0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#4A7FA7'
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <div style={{ color: '#F6FAFD', fontWeight: 600, fontSize: '0.94rem' }}>{tool.name}</div>
                    <div style={{ fontSize: '0.7rem', color: '#B3CFE5' }}>{tool.category}</div>
                  </div>
                </div>

                <span style={{ fontSize: '0.66rem', color: '#F6FAFD', backgroundColor: '#1A3D63', padding: '3px 8px', borderRadius: '4px', border: '1px solid #4A7FA7', fontWeight: 700 }}>
                  {tool.mode}
                </span>
              </div>

              <p style={{ color: 'rgba(179, 207, 229, 0.65)', fontSize: '0.82rem', lineHeight: '1.4' }}>
                {tool.desc}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(179,207,229,0.08)', paddingTop: '10px' }}>
                <span style={{ fontSize: '0.72rem', color: '#4A7FA7', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={12} />
                  <span>{tool.status}</span>
                </span>
                <button className="btn-primary" style={{ padding: '4px 12px', fontSize: '0.74rem', borderRadius: '6px' }}>
                  <span>Open Tool</span>
                  <ArrowUpRight size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
