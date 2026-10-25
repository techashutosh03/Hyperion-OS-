import React, { useState } from 'react';
import { ListTodo, Play, Pause, XCircle, CheckCircle2, RefreshCw, Clock, Terminal, Activity } from 'lucide-react';

export function TaskCenterWorkspace() {
  const [tasks, setTasks] = useState([
    { id: 't1', name: 'Refactoring CSS Theme Variables', mode: 'ARCHITECT', progress: 100, status: 'Completed', time: 'Completed 5m ago' },
    { id: 't2', name: 'Synthesizing Academic Papers on Agent Memory', mode: 'RESEARCHER', progress: 78, status: 'Running', time: 'ETA 1m 20s' },
    { id: 't3', name: 'Generating Visual Component Variations', mode: 'CREATOR', progress: 40, status: 'Running', time: 'ETA 45s' },
    { id: 't4', name: 'Automating Security Audit Script', mode: 'EXECUTOR', progress: 0, status: 'Queued', time: 'Queued' },
    { id: 't5', name: 'Self-Reflection Code Audit', mode: 'MIRROR', progress: 0, status: 'Paused', time: 'Paused' }
  ]);

  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        if (t.status === 'Running') return { ...t, status: 'Paused' };
        if (t.status === 'Paused') return { ...t, status: 'Running' };
      }
      return t;
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
      {/* Header Banner */}
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
            <ListTodo size={18} />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase' }}>
              Autonomous Task Operations
            </span>
          </div>
          <h2 style={{ color: '#F6FAFD', fontSize: '1.5rem', fontWeight: 700 }}>
            Hyperion Task Operations Center
          </h2>
          <p style={{ color: 'rgba(179, 207, 229, 0.65)', fontSize: '0.88rem', marginTop: '4px' }}>
            Monitor, pause, resume, and inspect background agent process threads.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn-secondary" style={{ borderRadius: '8px', padding: '8px 14px' }}>
            <RefreshCw size={14} />
            <span>Refresh Queue</span>
          </button>
        </div>
      </div>

      {/* Task List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {tasks.map(t => (
          <div 
            key={t.id}
            style={{
              backgroundColor: 'rgba(26, 61, 99, 0.40)',
              border: '1px solid rgba(179, 207, 229, 0.12)',
              borderRadius: '14px',
              padding: '16px 20px',
              backdropFilter: 'blur(24px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <span style={{ color: '#F6FAFD', fontWeight: 600, fontSize: '0.92rem' }}>{t.name}</span>
                <span style={{ fontSize: '0.66rem', color: '#F6FAFD', backgroundColor: '#1A3D63', padding: '2px 7px', borderRadius: '4px', border: '1px solid #4A7FA7', fontWeight: 700 }}>
                  {t.mode}
                </span>
              </div>

              {/* Progress Track */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '75%' }}>
                <div style={{ flex: 1, height: '6px', backgroundColor: 'rgba(179,207,229,0.10)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${t.progress}%`, height: '100%', backgroundColor: '#4A7FA7', borderRadius: '3px', boxShadow: '0 0 10px rgba(74,127,167,0.4)' }} />
                </div>
                <span style={{ fontSize: '0.76rem', color: '#B3CFE5', fontWeight: 600 }}>{t.progress}%</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '0.78rem', color: t.status === 'Running' ? '#4A7FA7' : '#B3CFE5', fontWeight: 600 }}>
                {t.status}
              </span>

              {(t.status === 'Running' || t.status === 'Paused') && (
                <button 
                  onClick={() => toggleTaskStatus(t.id)}
                  style={{ backgroundColor: '#1A3D63', border: '1px solid rgba(179,207,229,0.15)', borderRadius: '6px', padding: '6px 10px', color: '#F6FAFD', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}
                >
                  {t.status === 'Running' ? <Pause size={13} /> : <Play size={13} />}
                  <span>{t.status === 'Running' ? 'Pause' : 'Resume'}</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
