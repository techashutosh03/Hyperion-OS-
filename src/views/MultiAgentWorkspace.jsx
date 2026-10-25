import React from 'react';
import { Activity, Layers, Globe, Palette, Cpu, ArrowRight, CheckCircle2, Play, Pause, StopCircle, MessageSquare } from 'lucide-react';

export function MultiAgentWorkspace() {
  const agents = [
    { name: 'Hyperion Orchestrator', role: 'Master Dispatcher', mode: 'ORCHESTRATOR', status: 'Completed', icon: Activity },
    { name: 'Architect Subagent', role: 'System & Schema Design', mode: 'ARCHITECT', status: 'Completed', icon: Layers },
    { name: 'Researcher Subagent', role: 'Source Verification', mode: 'RESEARCHER', status: 'Running', icon: Globe },
    { name: 'Creator Subagent', role: 'UI Tokens & Assets', mode: 'CREATOR', status: 'Queued', icon: Palette },
    { name: 'Executor Subagent', role: 'Sandbox Task Runner', mode: 'EXECUTOR', status: 'Queued', icon: Cpu }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
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
            <Activity size={18} />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase' }}>
              Multi-Agent Parallel Orchestration
            </span>
          </div>
          <h2 style={{ color: '#F6FAFD', fontSize: '1.5rem', fontWeight: 700 }}>
            Hyperion Agent Mesh Flow
          </h2>
          <p style={{ color: 'rgba(179, 207, 229, 0.65)', fontSize: '0.88rem', marginTop: '4px' }}>
            Visualize live inter-agent pipeline execution and cross-communication.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn-primary" style={{ borderRadius: '8px', padding: '8px 14px' }}>
            <Play size={14} />
            <span>Start Orchestration</span>
          </button>
        </div>
      </div>

      {/* Visual Flow Diagram Stream */}
      <div 
        style={{
          backgroundColor: 'rgba(26, 61, 99, 0.40)',
          border: '1px solid rgba(179, 207, 229, 0.12)',
          borderRadius: '16px',
          padding: '24px',
          backdropFilter: 'blur(24px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        <h3 style={{ color: '#F6FAFD', fontWeight: 600, fontSize: '1.05rem' }}>
          Pipeline Execution Hierarchy
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
          {agents.map((ag, i) => {
            const Icon = ag.icon;
            return (
              <React.Fragment key={i}>
                <div 
                  style={{
                    backgroundColor: '#1A3D63',
                    border: '1px solid rgba(179, 207, 229, 0.15)',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    minWidth: '170px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    boxShadow: '0 8px 24px rgba(10,25,49,0.35)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Icon size={18} style={{ color: '#4A7FA7' }} />
                    <span style={{ fontSize: '0.64rem', color: '#F6FAFD', backgroundColor: '#0A1931', padding: '2px 6px', borderRadius: '4px' }}>
                      {ag.mode}
                    </span>
                  </div>
                  <div style={{ color: '#F6FAFD', fontWeight: 600, fontSize: '0.84rem' }}>{ag.name}</div>
                  <div style={{ color: 'rgba(179,207,229,0.65)', fontSize: '0.72rem' }}>{ag.role}</div>
                  <div style={{ fontSize: '0.72rem', color: ag.status === 'Completed' ? '#B3CFE5' : '#4A7FA7', fontWeight: 600, marginTop: '4px' }}>
                    ● {ag.status}
                  </div>
                </div>

                {i < agents.length - 1 && (
                  <ArrowRight size={18} style={{ color: '#4A7FA7', flexShrink: 0 }} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
