import React from 'react';
import { 
  Home, MessageSquare, Code2, Globe, Palette, FileText, 
  Brain, ListTodo, Layers, Wrench, Settings, ChevronLeft, 
  ChevronRight, Network, LayoutGrid, Cpu, Activity, User, ShieldCheck, Zap
} from 'lucide-react';

export function Sidebar({ activeView, setActiveView, isCollapsed, setIsCollapsed }) {
  const mainNavItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'console', label: 'AI Console', icon: MessageSquare },
    { id: 'code-studio', label: 'Code Studio', icon: Code2 },
    { id: 'research', label: 'Deep Research', icon: Globe },
    { id: 'visual-studio', label: 'Visual Studio', icon: Palette },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'knowledge-graph', label: 'Knowledge Graph', icon: Network },
    { id: 'memory', label: 'Memory', icon: Brain },
    { id: 'toolkit', label: 'AI Toolkit', icon: Wrench },
    { id: 'task-center', label: 'Tasks', icon: ListTodo },
    { id: 'multi-agent', label: 'Multi-Agent', icon: Activity },
    { id: 'canvas', label: 'Canvas', icon: LayoutGrid },
    { id: 'context-inspector', label: 'Context Inspector', icon: Cpu },
    { id: 'routing', label: 'Routing Inspector', icon: Zap },
    { id: 'providers', label: 'Provider Setup', icon: ShieldCheck },
  ];

  return (
    <aside
      style={{
        width: isCollapsed ? '64px' : '240px',
        backgroundColor: '#0A1931',
        borderRight: '1px solid rgba(179, 207, 229, 0.12)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: isCollapsed ? '16px 8px' : '16px 12px',
        height: 'calc(100vh - 60px)',
        boxSizing: 'border-box',
        zIndex: 15,
        transition: 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Top Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
        
        {/* Workspace Brand Card */}
        <div 
          style={{
            backgroundColor: '#1A3D63',
            borderRadius: '10px',
            padding: isCollapsed ? '8px 4px' : '10px 12px',
            border: '1px solid rgba(179, 207, 229, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'space-between',
            boxShadow: '0 4px 16px rgba(10, 25, 49, 0.35)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div 
              style={{
                width: 28,
                height: 28,
                borderRadius: '6px',
                background: 'linear-gradient(135deg, #1A3D63, #4A7FA7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F6FAFD',
                flexShrink: 0
              }}
            >
              <Cpu size={16} />
            </div>
            {!isCollapsed && (
              <div>
                <div style={{ color: '#F6FAFD', fontWeight: 700, fontSize: '0.85rem' }}>
                  Hyperion OS
                </div>
                <div style={{ color: 'rgba(179, 207, 229, 0.65)', fontSize: '0.68rem' }}>
                  AI System v4.2
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#B3CFE5',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2px'
            }}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation Section */}
        <div>
          {!isCollapsed && (
            <div 
              style={{ 
                fontSize: '0.68rem', 
                fontWeight: 700, 
                color: '#B3CFE5', 
                textTransform: 'uppercase', 
                letterSpacing: '1.2px',
                padding: '0 8px 6px 8px'
              }}
            >
              Workspaces
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isCollapsed ? 'center' : 'flex-start',
                    gap: '10px',
                    width: '100%',
                    padding: isCollapsed ? '10px 0' : '8px 10px',
                    borderRadius: '8px',
                    border: isActive ? '1px solid #4A7FA7' : '1px solid transparent',
                    backgroundColor: isActive ? '#1A3D63' : 'transparent',
                    color: isActive ? '#F6FAFD' : '#B3CFE5',
                    fontSize: '0.82rem',
                    fontWeight: isActive ? 600 : 400,
                    cursor: 'pointer',
                    boxShadow: isActive ? '0 0 15px rgba(74, 127, 167, 0.20)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(179, 207, 229, 0.08)';
                      e.currentTarget.style.color = '#F6FAFD';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#B3CFE5';
                    }
                  }}
                >
                  <Icon 
                    size={16} 
                    style={{ color: isActive ? '#4A7FA7' : 'rgba(179, 207, 229, 0.65)', flexShrink: 0 }} 
                  />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div 
        style={{
          borderTop: '1px solid rgba(179, 207, 229, 0.12)',
          paddingTop: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}
      >
        <button
          onClick={() => setActiveView('providers')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            gap: '10px',
            width: '100%',
            padding: isCollapsed ? '8px 0' : '8px 10px',
            borderRadius: '8px',
            border: activeView === 'providers' ? '1px solid #4A7FA7' : 'none',
            backgroundColor: activeView === 'providers' ? '#1A3D63' : 'rgba(179, 207, 229, 0.06)',
            color: activeView === 'providers' ? '#F6FAFD' : '#B3CFE5',
            fontSize: '0.8rem',
            fontWeight: 500,
            cursor: 'pointer'
          }}
        >
          <ShieldCheck size={15} />
          {!isCollapsed && <span>Provider Setup</span>}
        </button>

        {/* User Card */}
        {!isCollapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 6px' }}>
            <div 
              style={{ 
                width: 26, 
                height: 26, 
                borderRadius: '50%', 
                backgroundColor: '#4A7FA7',
                color: '#F6FAFD',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.72rem'
              }}
            >
              AG
            </div>
            <div>
              <div style={{ color: '#F6FAFD', fontSize: '0.78rem', fontWeight: 600 }}>
                Ashutosh Gautam
              </div>
              <div style={{ color: 'rgba(179, 207, 229, 0.65)', fontSize: '0.68rem' }}>
                Lead OS Architect
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
