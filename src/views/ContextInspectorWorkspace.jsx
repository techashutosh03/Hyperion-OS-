import React, { useState, useEffect } from 'react';
import { Cpu, Layers, CheckCircle2, ShieldCheck } from 'lucide-react';

export function ContextInspectorWorkspace() {
  const [budget, setBudget] = useState({ tokensUsed: 104900, maxTokens: 1000000, percentage: '10%' });

  useEffect(() => {
    fetch('/api/ai/context-budget', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'Hyperion OS Context Budget Calculation', contextFiles: [] })
    })
    .then(res => res.json())
    .then(data => setBudget(data))
    .catch(() => {});
  }, []);

  const contextBreakdown = [
    { name: 'System Instructions & Rules', tokens: '14,200', percentage: '12%', color: '#4A7FA7' },
    { name: 'Active Project Files (12 files)', tokens: '42,800', percentage: '36%', color: '#1A3D63' },
    { name: 'Retained Memory Graph Nodes (8 memories)', tokens: '18,500', percentage: '15%', color: '#B3CFE5' },
    { name: 'Document Vault Context (4 documents)', tokens: '21,000', percentage: '18%', color: '#4A7FA7' },
    { name: 'Conversation History Buffer', tokens: '8,400', percentage: '7%', color: '#1A3D63' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      {/* Banner */}
      <div 
        style={{
          background: 'rgba(26, 61, 99, 0.45)',
          border: '1px solid rgba(179, 207, 229, 0.12)',
          borderRadius: '16px',
          padding: '24px',
          backdropFilter: 'blur(24px)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4A7FA7', marginBottom: '6px' }}>
          <Cpu size={18} />
          <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase' }}>
            Context Transparency Inspector
          </span>
        </div>
        <h2 style={{ color: '#F6FAFD', fontSize: '1.5rem', fontWeight: 700 }}>
          Hyperion Context Window Inspection
        </h2>
        <p style={{ color: 'rgba(179, 207, 229, 0.65)', fontSize: '0.88rem', marginTop: '4px' }}>
          Inspect active tokens, loaded files, memory nodes, and model context usage.
        </p>
      </div>

      {/* Grid Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
        {[
          { label: 'Current Project', value: 'Hyperion OS', icon: Layers },
          { label: 'Current Mode', value: 'Architect', icon: ShieldCheck },
          { label: 'Model Engine', value: 'Gemini 2.5 Flash', icon: Cpu },
          { label: 'Total Context Used', value: budget.percentage || '10%', icon: CheckCircle2 }
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div 
              key={i}
              style={{
                backgroundColor: '#1A3D63',
                border: '1px solid rgba(179, 207, 229, 0.12)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'rgba(179,207,229,0.65)', fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 600 }}>{card.label}</span>
                <Icon size={16} style={{ color: '#4A7FA7' }} />
              </div>
              <div style={{ color: '#F6FAFD', fontWeight: 700, fontSize: '1.1rem' }}>
                {card.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Context Breakdown Bar & Details */}
      <div 
        style={{
          backgroundColor: 'rgba(26, 61, 99, 0.40)',
          border: '1px solid rgba(179, 207, 229, 0.12)',
          borderRadius: '16px',
          padding: '24px',
          backdropFilter: 'blur(24px)'
        }}
      >
        <h3 style={{ color: '#F6FAFD', fontWeight: 600, fontSize: '1.05rem', marginBottom: '14px' }}>
          Context Token Distribution ({budget.tokensUsed.toLocaleString()} / {budget.maxTokens.toLocaleString()} Tokens)
        </h3>

        {/* Visual Progress Track */}
        <div style={{ height: '10px', backgroundColor: 'rgba(179, 207, 229, 0.10)', borderRadius: '5px', overflow: 'hidden', display: 'flex', marginBottom: '20px' }}>
          <div style={{ width: '12%', backgroundColor: '#4A7FA7' }} />
          <div style={{ width: '36%', backgroundColor: '#1A3D63' }} />
          <div style={{ width: '15%', backgroundColor: '#B3CFE5' }} />
          <div style={{ width: '18%', backgroundColor: '#4A7FA7' }} />
          <div style={{ width: '7%', backgroundColor: '#1A3D63' }} />
        </div>

        {/* Breakdown List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {contextBreakdown.map((item, idx) => (
            <div 
              key={idx}
              style={{
                backgroundColor: '#1A3D63',
                border: '1px solid rgba(179, 207, 229, 0.10)',
                borderRadius: '8px',
                padding: '12px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span style={{ color: '#F6FAFD', fontWeight: 500, fontSize: '0.86rem' }}>{item.name}</span>
              <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem' }}>
                <span style={{ color: '#B3CFE5' }}>{item.tokens} tokens</span>
                <span style={{ color: '#4A7FA7', fontWeight: 700 }}>{item.percentage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
