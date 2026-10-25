import React from 'react';
import { Target, CheckCircle2, AlertTriangle, Zap, Shield, Plus, Sparkles } from 'lucide-react';

export function GoalsProactiveWorkspace() {
  const goals = [
    { title: 'Purge Old Color System & Upgrade to Deep Ocean', progress: 100, status: 'Completed', milestones: ['Inspect palette requirements', 'Define CSS variables', 'Refactor UI hierarchy'] },
    { title: 'Atmospheric Shader Glow Engine', progress: 80, status: 'In Progress', milestones: ['Radial gradient background', 'Soft glass filter 24px blur', 'AI Orb gradient pulse'] },
    { title: 'Autonomous Multi-Agent Task Orchestration', progress: 45, status: 'Active', milestones: ['Task queue scheduler', 'Parallel worker processes', 'Live telemetry stream'] }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
      {/* Top Banner */}
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
            <Target size={18} />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase' }}>
              Autonomous Watcher & Goals
            </span>
          </div>
          <h2 style={{ color: '#F6FAFD', fontSize: '1.5rem', fontWeight: 700 }}>
            Proactive Goal Execution
          </h2>
          <p style={{ color: 'rgba(179,207,229,0.65)', fontSize: '0.88rem', marginTop: '4px' }}>
            Hyperion OS actively monitors background conditions and executes milestone pipelines.
          </p>
        </div>

        <button className="btn-primary" style={{ padding: '10px 18px', borderRadius: '10px' }}>
          <Plus size={16} />
          <span>New Goal Objective</span>
        </button>
      </div>

      {/* Goals List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {goals.map((g, idx) => (
          <div 
            key={idx}
            style={{
              backgroundColor: 'rgba(26,61,99,0.40)',
              border: '1px solid rgba(179,207,229,0.12)',
              borderRadius: '14px',
              padding: '20px',
              boxShadow: '0 10px 30px rgba(10,25,49,0.40)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: g.progress === 100 ? '#B3CFE5' : '#4A7FA7', boxShadow: '0 0 10px rgba(74,127,167,0.5)' }} />
                <h3 style={{ color: '#F6FAFD', fontWeight: 600, fontSize: '1.05rem' }}>{g.title}</h3>
              </div>
              <span style={{ color: '#4A7FA7', fontWeight: 700, fontSize: '0.9rem' }}>{g.progress}% Complete</span>
            </div>

            {/* Milestones list */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
              {g.milestones.map((m, mi) => (
                <div 
                  key={mi}
                  style={{
                    backgroundColor: '#1A3D63',
                    border: '1px solid rgba(179,207,229,0.12)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.8rem',
                    color: '#F6FAFD'
                  }}
                >
                  <CheckCircle2 size={14} style={{ color: g.progress === 100 || mi < 2 ? '#4A7FA7' : 'rgba(179,207,229,0.4)' }} />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
