import React from 'react';
import { X, Plus, Pin, Home, MessageSquare, Code2, Globe, Palette, FileText, Brain, Wrench, ListTodo, Activity, LayoutGrid, Cpu } from 'lucide-react';

export function TabManager({ tabs, activeTabId, onSelectTab, onCloseTab, onAddTab }) {
  const getTabIcon = (viewId) => {
    switch (viewId) {
      case 'dashboard': return Home;
      case 'console': return MessageSquare;
      case 'code-studio': return Code2;
      case 'research': return Globe;
      case 'visual-studio': return Palette;
      case 'documents': return FileText;
      case 'knowledge-graph': return Brain;
      case 'memory': return Brain;
      case 'toolkit': return Wrench;
      case 'task-center': return ListTodo;
      case 'multi-agent': return Activity;
      case 'canvas': return LayoutGrid;
      case 'context-inspector': return Cpu;
      default: return Home;
    }
  };

  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        backgroundColor: '#0A1931',
        borderBottom: '1px solid rgba(179, 207, 229, 0.12)',
        padding: '6px 16px 0 16px',
        height: '38px',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      {tabs.map((tab) => {
        const Icon = getTabIcon(tab.view);
        const isActive = tab.id === activeTabId;
        return (
          <div
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: isActive ? '#1A3D63' : 'rgba(26, 61, 99, 0.25)',
              borderTop: isActive ? '1px solid #4A7FA7' : '1px solid rgba(179, 207, 229, 0.10)',
              borderLeft: isActive ? '1px solid rgba(179, 207, 229, 0.15)' : '1px solid transparent',
              borderRight: isActive ? '1px solid rgba(179, 207, 229, 0.15)' : '1px solid transparent',
              borderBottom: isActive ? '1px solid #1A3D63' : 'none',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              padding: '6px 12px',
              color: isActive ? '#F6FAFD' : '#B3CFE5',
              fontSize: '0.78rem',
              fontWeight: isActive ? 600 : 500,
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'all 0.15s ease',
              marginBottom: '-1px'
            }}
          >
            <Icon size={13} style={{ color: isActive ? '#4A7FA7' : 'rgba(179, 207, 229, 0.65)' }} />
            <span>{tab.title}</span>

            {tabs.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseTab(tab.id);
                }}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'rgba(179, 207, 229, 0.65)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2px',
                  borderRadius: '4px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#F6FAFD'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(179, 207, 229, 0.65)'}
              >
                <X size={12} />
              </button>
            )}
          </div>
        );
      })}

      <button
        onClick={onAddTab}
        title="Open New Workspace Tab"
        style={{
          backgroundColor: 'transparent',
          border: '1px dashed rgba(179, 207, 229, 0.15)',
          borderRadius: '6px',
          padding: '4px 8px',
          color: '#B3CFE5',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: '4px'
        }}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = '#4A7FA7'}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(179, 207, 229, 0.15)'}
      >
        <Plus size={13} />
      </button>
    </div>
  );
}
