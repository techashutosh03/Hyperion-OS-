import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Terminal, Globe, Brain, Layers, X, Cpu } from 'lucide-react';

export function CommandPalette({ isOpen, onClose, onSelectView }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(false); // Toggle action handler
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { id: 'dashboard', label: 'Open Overview Dashboard', category: 'Navigation', icon: Layers },
    { id: 'research', label: 'Start Deep Research Synthesis', category: 'Intelligence', icon: Globe },
    { id: 'goals', label: 'View Autonomous Goals & Alerts', category: 'Execution', icon: Sparkles },
    { id: 'memory', label: 'Inspect Knowledge Memory Graph', category: 'Memory', icon: Brain },
    { id: 'automation', label: 'Launch System Terminal & Sandbox', category: 'System', icon: Terminal },
    { id: 'studio', label: 'Open Generative Document Studio', category: 'Studio', icon: Cpu },
  ];

  const filtered = actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(10, 25, 49, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '100px',
        zIndex: 100
      }}
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '620px',
          backgroundColor: '#0A1931',
          border: '1px solid rgba(179, 207, 229, 0.20)',
          borderRadius: '16px',
          boxShadow: '0 30px 80px rgba(10, 25, 49, 0.8)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Input Bar */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 20px',
            borderBottom: '1px solid rgba(179, 207, 229, 0.12)',
            backgroundColor: '#1A3D63'
          }}
        >
          <Search size={18} style={{ color: '#4A7FA7' }} />
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search Hyperion OS..."
            autoFocus
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#F6FAFD',
              fontSize: '1rem',
              fontFamily: 'inherit'
            }}
          />
          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#B3CFE5',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '360px', overflowY: 'auto', padding: '8px' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'rgba(179, 207, 229, 0.65)', fontSize: '0.85rem' }}>
              No matching commands found.
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectView(item.id);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#1A3D63';
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(74, 127, 167, 0.20)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div 
                      style={{ 
                        width: 32, 
                        height: 32, 
                        borderRadius: '8px', 
                        backgroundColor: 'rgba(74, 127, 167, 0.15)',
                        border: '1px solid rgba(179, 207, 229, 0.12)',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: '#4A7FA7'
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    <span style={{ color: '#F6FAFD', fontWeight: 500, fontSize: '0.9rem' }}>
                      {item.label}
                    </span>
                  </div>
                  <span 
                    style={{ 
                      fontSize: '0.7rem', 
                      color: '#B3CFE5', 
                      backgroundColor: 'rgba(179, 207, 229, 0.10)',
                      padding: '3px 8px',
                      borderRadius: '4px'
                    }}
                  >
                    {item.category}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div 
          style={{
            padding: '10px 16px',
            borderTop: '1px solid rgba(179, 207, 229, 0.12)',
            backgroundColor: 'rgba(26, 61, 99, 0.3)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.72rem',
            color: 'rgba(179, 207, 229, 0.65)'
          }}
        >
          <span>Use ↑ ↓ to navigate, Enter to select</span>
          <span style={{ color: '#4A7FA7', fontWeight: 600 }}>ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
}
