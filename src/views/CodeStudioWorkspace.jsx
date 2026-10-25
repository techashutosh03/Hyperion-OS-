import React, { useState } from 'react';
import { 
  FileCode2, Folder, FolderOpen, Play, ChevronRight, ChevronDown, 
  Terminal as TermIcon, Bug, Sparkles, RefreshCw, CheckCircle2, Eye, ShieldCheck
} from 'lucide-react';

export function CodeStudioWorkspace() {
  const [activeFile, setActiveFile] = useState('App.jsx');
  const [activeTab, setActiveTab] = useState('terminal'); // terminal, problems, output
  const [aiPrompt, setAiPrompt] = useState('');

  const files = [
    { name: 'src/', isFolder: true, open: true, children: [
      { name: 'App.jsx', isFolder: false },
      { name: 'main.jsx', isFolder: false },
      { name: 'styles/theme.css', isFolder: false },
      { name: 'components/Header.jsx', isFolder: false },
      { name: 'components/AiOrb.jsx', isFolder: false }
    ]},
    { name: 'package.json', isFolder: false },
    { name: 'index.html', isFolder: false }
  ];

  const codeSnippets = {
    'App.jsx': `import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HomeDashboard } from './views/HomeDashboard';
import './styles/theme.css';

export function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [activeMode, setActiveMode] = useState('architect');

  return (
    <div style={{ backgroundColor: '#0A1931', minHeight: '100vh' }}>
      <Header activeMode={activeMode} setActiveMode={setActiveMode} />
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <HomeDashboard onNavigate={setActiveView} />
    </div>
  );
}
export default App;`,
    'main.jsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    'package.json': `{
  "name": "hyperion",
  "version": "4.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.300.0"
  }
}`
  };

  const codeContent = codeSnippets[activeFile] || codeSnippets['App.jsx'];
  const lines = codeContent.split('\n');

  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: '220px 1fr 300px',
        gap: '12px',
        height: '100%',
        maxHeight: 'calc(100vh - 120px)',
        width: '100%'
      }}
    >
      {/* 1. FILE EXPLORER */}
      <div 
        style={{
          backgroundColor: '#0A1931',
          border: '1px solid rgba(179, 207, 229, 0.12)',
          borderRadius: '12px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#B3CFE5', textTransform: 'uppercase', letterSpacing: '1px' }}>
          File Explorer
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8rem' }}>
          {files.map((item, idx) => (
            <div key={idx}>
              <div style={{ color: '#F6FAFD', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 0' }}>
                {item.isFolder ? <FolderOpen size={14} style={{ color: '#4A7FA7' }} /> : <FileCode2 size={14} style={{ color: '#B3CFE5' }} />}
                <span>{item.name}</span>
              </div>
              {item.children && item.children.map((c, ci) => (
                <div 
                  key={ci}
                  onClick={() => setActiveFile(c.name.split('/').pop())}
                  style={{
                    paddingLeft: '20px',
                    paddingTop: '3px',
                    paddingBottom: '3px',
                    color: activeFile === c.name.split('/').pop() ? '#F6FAFD' : '#B3CFE5',
                    backgroundColor: activeFile === c.name.split('/').pop() ? '#1A3D63' : 'transparent',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.78rem'
                  }}
                >
                  {c.name}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 2. CENTER CODE EDITOR */}
      <div 
        style={{
          backgroundColor: 'rgba(26, 61, 99, 0.35)',
          border: '1px solid rgba(179, 207, 229, 0.12)',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Editor Tab Bar */}
        <div 
          style={{
            backgroundColor: '#1A3D63',
            borderBottom: '1px solid rgba(179, 207, 229, 0.12)',
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#0A1931', border: '1px solid #4A7FA7', color: '#F6FAFD', padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600 }}>
              {activeFile}
            </div>
          </div>

          <button className="btn-primary" style={{ padding: '4px 12px', fontSize: '0.76rem' }}>
            <Play size={12} />
            <span>Run Code</span>
          </button>
        </div>

        {/* Code Canvas Area */}
        <div style={{ flex: 1, padding: '16px', overflowY: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', lineHeight: '1.6', backgroundColor: '#0A1931', color: '#B3CFE5', display: 'flex' }}>
          {/* Line numbers */}
          <div style={{ paddingRight: '14px', color: 'rgba(179, 207, 229, 0.35)', userSelect: 'none', textAlign: 'right' }}>
            {lines.map((_, i) => <div key={i}>{i + 1}</div>)}
          </div>
          {/* Code Text */}
          <div style={{ flex: 1, color: '#F6FAFD' }}>
            {lines.map((line, i) => (
              <div key={i} style={{ whiteSpace: 'pre' }}>{line}</div>
            ))}
          </div>
        </div>

        {/* Bottom Panel (Terminal / Problems) */}
        <div style={{ height: '140px', borderTop: '1px solid rgba(179, 207, 229, 0.12)', backgroundColor: '#0A1931', padding: '10px 14px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid rgba(179, 207, 229, 0.10)', paddingBottom: '6px', fontSize: '0.74rem' }}>
            <span onClick={() => setActiveTab('terminal')} style={{ color: activeTab === 'terminal' ? '#F6FAFD' : '#B3CFE5', cursor: 'pointer', fontWeight: 600 }}>Terminal</span>
            <span onClick={() => setActiveTab('problems')} style={{ color: activeTab === 'problems' ? '#F6FAFD' : '#B3CFE5', cursor: 'pointer' }}>Problems (0)</span>
            <span onClick={() => setActiveTab('output')} style={{ color: activeTab === 'output' ? '#F6FAFD' : '#B3CFE5', cursor: 'pointer' }}>Output</span>
          </div>

          <div style={{ flex: 1, fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#4A7FA7', paddingTop: '8px' }}>
            {activeTab === 'terminal' && <div>❯ vite build --mode development<br/><span style={{ color: '#B3CFE5' }}>✓ 2208 modules transformed cleanly. Build ready in 180ms.</span></div>}
            {activeTab === 'problems' && <div style={{ color: '#B3CFE5' }}>No syntax or type errors detected in {activeFile}.</div>}
            {activeTab === 'output' && <div style={{ color: '#B3CFE5' }}>Hyperion Code Sandbox initialized.</div>}
          </div>
        </div>
      </div>

      {/* 3. RIGHT AI CODING ASSISTANT */}
      <div 
        style={{
          backgroundColor: '#0A1931',
          border: '1px solid rgba(179, 207, 229, 0.12)',
          borderRadius: '12px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#B3CFE5', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={14} style={{ color: '#4A7FA7' }} />
          <span>AI Coding Assistant</span>
        </div>

        {/* Quick AI Action Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
          {['Explain', 'Fix', 'Refactor', 'Optimize', 'Review', 'Tests', 'Document', 'Debug'].map((action, i) => (
            <button
              key={i}
              style={{
                backgroundColor: 'rgba(179, 207, 229, 0.08)',
                border: '1px solid rgba(179, 207, 229, 0.12)',
                borderRadius: '6px',
                padding: '6px 8px',
                color: '#B3CFE5',
                fontSize: '0.72rem',
                fontWeight: 500,
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#4A7FA7';
                e.currentTarget.style.color = '#F6FAFD';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(179, 207, 229, 0.08)';
                e.currentTarget.style.color = '#B3CFE5';
              }}
            >
              {action}
            </button>
          ))}
        </div>

        {/* AI Code Audit Box */}
        <div 
          style={{
            backgroundColor: '#1A3D63',
            border: '1px solid rgba(179, 207, 229, 0.12)',
            borderRadius: '10px',
            padding: '12px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <div style={{ color: '#F6FAFD', fontWeight: 600, fontSize: '0.82rem' }}>
            Code Intelligence Audit
          </div>
          <p style={{ color: 'rgba(179, 207, 229, 0.65)', fontSize: '0.76rem', lineHeight: '1.4' }}>
            File <span style={{ color: '#F6FAFD' }}>{activeFile}</span> adheres strictly to the Hyperion Deep Ocean visual palette tokens.
          </p>
        </div>
      </div>
    </div>
  );
}
