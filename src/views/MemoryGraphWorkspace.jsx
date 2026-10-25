import React, { useState } from 'react';
import { Brain, Plus, Trash2, Shield, Zap, Sparkles, Filter } from 'lucide-react';

export function MemoryGraphWorkspace() {
  const [nodes, setNodes] = useState([
    { id: '1', title: 'Color Palette Rule', desc: '#0A1931 background, #1A3D63 surfaces, #4A7FA7 buttons/accents, #B3CFE5 secondary text, #F6FAFD primary text', cat: 'UI System' },
    { id: '2', title: 'Background Gradient', desc: 'Base #0A1931 with subtle radial gradients using #1A3D63 and #4A7FA7', cat: 'Aesthetics' },
    { id: '3', title: 'Glassmorphism Blur', desc: 'blur(24px) background rgba(26,61,99,0.45) with border rgba(179,207,229,0.12)', cat: 'Glass' },
    { id: '4', title: 'AI Orb Shading', desc: '#0A1931 -> #1A3D63 -> #4A7FA7 -> #B3CFE5 soft atmospheric gradient', cat: 'AI Core' }
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div 
        style={{
          background: 'rgba(26,61,99,0.45)',
          border: '1px solid rgba(179,207,229,0.12)',
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
            <Brain size={18} />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase' }}>
              Persistent Knowledge Graph
            </span>
          </div>
          <h2 style={{ color: '#F6FAFD', fontSize: '1.5rem', fontWeight: 700 }}>
            Hyperion Memory Engine
          </h2>
          <p style={{ color: 'rgba(179,207,229,0.65)', fontSize: '0.88rem', marginTop: '4px' }}>
            Inspect, filter, and modify long-term memory nodes retained across sessions.
          </p>
        </div>

        <button className="btn-primary" style={{ padding: '10px 18px', borderRadius: '10px' }}>
          <Plus size={16} />
          <span>Add Knowledge Node</span>
        </button>
      </div>

      {/* Nodes Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        {nodes.map((n) => (
          <div 
            key={n.id}
            style={{
              backgroundColor: 'rgba(26,61,99,0.40)',
              border: '1px solid rgba(179,207,229,0.12)',
              borderRadius: '14px',
              padding: '18px',
              backdropFilter: 'blur(24px)',
              boxShadow: '0 10px 30px rgba(10,25,49,0.40)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ color: '#F6FAFD', fontWeight: 600, fontSize: '0.95rem' }}>{n.title}</span>
              <span style={{ fontSize: '0.68rem', color: '#B3CFE5', backgroundColor: '#1A3D63', padding: '3px 8px', borderRadius: '4px', border: '1px solid rgba(179,207,229,0.12)' }}>
                {n.cat}
              </span>
            </div>
            <p style={{ color: 'rgba(179,207,229,0.65)', fontSize: '0.82rem', lineHeight: '1.4' }}>
              {n.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
