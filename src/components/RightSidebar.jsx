import React from 'react';
import { 
  CheckCircle2, Brain, Cpu, FolderGit2, FileText, ChevronRight
} from 'lucide-react';

export function RightSidebar({ isOpen, setIsOpen }) {
  if (!isOpen) return null;

  const projectMemories = [
    { title: 'Aesthetic Palette', detail: 'Deep Ocean & Arctic White (#0A1931)' },
    { title: 'Core Architecture', detail: 'Vite + React + Framer Motion' },
    { title: 'Navigation Paradigm', desc: 'macOS Finder & Arc Browser layout' },
    { title: 'User Identity', detail: 'Ashutosh Gautam — Lead Architect' }
  ];

  const recentFiles = [
    { name: 'server.js', type: 'JavaScript' },
    { name: 'App.jsx', type: 'React Component' },
    { name: 'design-system.md', type: 'Markdown Spec' }
  ];

  return (
    <aside
      style={{
        width: '280px',
        backgroundColor: '#0A1931',
        borderLeft: '1px solid rgba(179, 207, 229, 0.12)',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 64px)',
        padding: '18px 16px',
        boxSizing: 'border-box',
        zIndex: 15,
        gap: '20px',
        overflowY: 'auto'
      }}
    >
      {/* 1. CURRENT PROJECT */}
      <div 
        style={{
          backgroundColor: '#1A3D63',
          border: '1px solid rgba(179, 207, 229, 0.12)',
          borderRadius: '12px',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 8px 24px rgba(10, 25, 49, 0.35)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FolderGit2 size={18} style={{ color: '#4A7FA7' }} />
          <div>
            <div style={{ fontSize: '0.68rem', color: 'rgba(179, 207, 229, 0.65)', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 600 }}>
              Current Project
            </div>
            <div style={{ color: '#F6FAFD', fontWeight: 700, fontSize: '0.9rem' }}>
              Hyperion OS
            </div>
          </div>
        </div>
        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#4A7FA7', boxShadow: '0 0 10px rgba(74,127,167,0.6)' }} />
      </div>

      {/* 2. TODAY SUMMARY */}
      <div>
        <div 
          style={{ 
            fontSize: '0.72rem', 
            fontWeight: 700, 
            color: '#B3CFE5', 
            textTransform: 'uppercase', 
            letterSpacing: '1px',
            marginBottom: '8px'
          }}
        >
          Today
        </div>
        <div 
          style={{
            backgroundColor: 'rgba(26, 61, 99, 0.40)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(179, 207, 229, 0.12)',
            borderRadius: '10px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <CheckCircle2 size={16} style={{ color: '#4A7FA7' }} />
          <span style={{ color: '#F6FAFD', fontWeight: 500, fontSize: '0.84rem' }}>
            3 active tasks
          </span>
        </div>
      </div>

      {/* 3. AI CORE STATUS */}
      <div>
        <div 
          style={{ 
            fontSize: '0.72rem', 
            fontWeight: 700, 
            color: '#B3CFE5', 
            textTransform: 'uppercase', 
            letterSpacing: '1px',
            marginBottom: '8px'
          }}
        >
          AI Core
        </div>
        <div 
          style={{
            backgroundColor: 'rgba(26, 61, 99, 0.40)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(179, 207, 229, 0.12)',
            borderRadius: '10px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={15} style={{ color: '#4A7FA7' }} />
            <span style={{ color: '#F6FAFD', fontWeight: 600, fontSize: '0.84rem' }}>
              Ready
            </span>
          </div>
          <span style={{ fontSize: '0.72rem', color: '#B3CFE5' }}>Gemini 3.6</span>
        </div>
      </div>

      {/* 4. MEMORY (4 Project Memories) */}
      <div>
        <div 
          style={{ 
            fontSize: '0.72rem', 
            fontWeight: 700, 
            color: '#B3CFE5', 
            textTransform: 'uppercase', 
            letterSpacing: '1px',
            marginBottom: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span>Memory</span>
          <span style={{ fontSize: '0.7rem', color: '#4A7FA7' }}>4 Memories</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {projectMemories.map((mem, i) => (
            <div 
              key={i}
              style={{
                backgroundColor: 'rgba(26, 61, 99, 0.35)',
                border: '1px solid rgba(179, 207, 229, 0.10)',
                borderRadius: '8px',
                padding: '8px 12px'
              }}
            >
              <div style={{ color: '#F6FAFD', fontWeight: 600, fontSize: '0.78rem' }}>
                {mem.title}
              </div>
              <div style={{ color: 'rgba(179, 207, 229, 0.65)', fontSize: '0.73rem', marginTop: '2px' }}>
                {mem.detail || mem.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. RECENT FILES */}
      <div>
        <div 
          style={{ 
            fontSize: '0.72rem', 
            fontWeight: 700, 
            color: '#B3CFE5', 
            textTransform: 'uppercase', 
            letterSpacing: '1px',
            marginBottom: '8px'
          }}
        >
          Recent Files
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {recentFiles.map((file, i) => (
            <div 
              key={i}
              style={{
                backgroundColor: 'rgba(179, 207, 229, 0.04)',
                border: '1px solid rgba(179, 207, 229, 0.08)',
                borderRadius: '6px',
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.78rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={14} style={{ color: '#4A7FA7' }} />
                <span style={{ color: '#F6FAFD', fontWeight: 500 }}>{file.name}</span>
              </div>
              <span style={{ color: 'rgba(179, 207, 229, 0.65)', fontSize: '0.7rem' }}>
                {file.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
