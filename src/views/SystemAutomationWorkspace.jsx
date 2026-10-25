import React, { useState } from 'react';
import { Terminal, ShieldAlert, Play, CheckCircle2, Cpu, Server } from 'lucide-react';

export function SystemAutomationWorkspace() {
  const [logs] = useState([
    '[HYPERION OS] Initializing Atmospheric Ocean Color Palette...',
    '[PALETTE] Base Background: #0A1931 | Surfaces: #1A3D63 | Primary Accent: #4A7FA7',
    '[PALETTE] Glass Filter: blur(24px) | Card Highlights: #B3CFE5 | Typography: #F6FAFD',
    '[SHADING] AI Orb Shader: #0A1931 -> #1A3D63 -> #4A7FA7 -> #B3CFE5 (Soft Gradient)',
    '[STATUS] UI System Refactored. Zero neon accents remaining. Nominal operation.'
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
      {/* Banner */}
      <div 
        style={{
          background: 'rgba(26,61,99,0.45)',
          border: '1px solid rgba(179,207,229,0.12)',
          borderRadius: '16px',
          padding: '24px',
          backdropFilter: 'blur(24px)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4A7FA7', marginBottom: '6px' }}>
          <Terminal size={18} />
          <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase' }}>
            System Terminal & Sandbox
          </span>
        </div>
        <h2 style={{ color: '#F6FAFD', fontSize: '1.5rem', fontWeight: 700 }}>
          Live Shell & Code Execution Environment
        </h2>
        <p style={{ color: 'rgba(179,207,229,0.65)', fontSize: '0.88rem', marginTop: '4px' }}>
          Real-time terminal log stream, subagent processes, and sandbox diagnostics.
        </p>
      </div>

      {/* Terminal Console Surface */}
      <div 
        style={{
          backgroundColor: '#0A1931',
          border: '1px solid rgba(179,207,229,0.20)',
          borderRadius: '14px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(10,25,49,0.50)'
        }}
      >
        {/* Terminal Header */}
        <div 
          style={{
            backgroundColor: '#1A3D63',
            padding: '10px 16px',
            borderBottom: '1px solid rgba(179,207,229,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Server size={14} style={{ color: '#4A7FA7' }} />
            <span style={{ color: '#F6FAFD', fontSize: '0.82rem', fontWeight: 600 }}>zsh — hyperion-core</span>
          </div>
          <span style={{ color: '#B3CFE5', fontSize: '0.72rem' }}>Process ID: 40822</span>
        </div>

        {/* Console Log Area */}
        <div 
          style={{
            padding: '16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: '#B3CFE5',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            minHeight: '260px'
          }}
        >
          {logs.map((log, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px' }}>
              <span style={{ color: '#4A7FA7', select: 'none' }}>❯</span>
              <span style={{ color: i === logs.length - 1 ? '#F6FAFD' : '#B3CFE5' }}>{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
