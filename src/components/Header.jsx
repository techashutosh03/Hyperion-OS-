import React, { useState, useEffect } from 'react';
import { 
  Search, Bell, Mic, Brain, ChevronRight, Cpu, CheckCircle2, ShieldCheck 
} from 'lucide-react';
import { aiService } from '../services/aiService';

export function Header({ 
  activeMode, 
  setActiveMode, 
  activeView, 
  onOpenCmd, 
  onOpenNotifications, 
  onOpenVoice 
}) {
  const [aiHealth, setAiHealth] = useState({ configuredCount: 0, connectedCount: 0, totalProviders: 6 });

  useEffect(() => {
    aiService.fetchHealth().then(res => setAiHealth(res));
  }, []);

  const isReady = aiHealth.configuredCount > 0 || aiHealth.connectedCount > 0;

  return (
    <header 
      style={{
        height: '60px',
        backgroundColor: '#0A1931',
        borderBottom: '1px solid rgba(179, 207, 229, 0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        zIndex: 20,
        position: 'relative',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)'
      }}
    >
      {/* Left: Window Dots & Mode */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Window Dots */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: 'rgba(179, 207, 229, 0.25)', border: '1px solid rgba(179, 207, 229, 0.4)' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: 'rgba(179, 207, 229, 0.25)', border: '1px solid rgba(179, 207, 229, 0.4)' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: 'rgba(179, 207, 229, 0.25)', border: '1px solid rgba(179, 207, 229, 0.4)' }} />
        </div>

        <div style={{ height: '16px', width: '1px', backgroundColor: 'rgba(179, 207, 229, 0.15)' }} />

        {/* Current Mode Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.74rem', color: '#B3CFE5', fontWeight: 500 }}>Mode:</span>
          <div 
            style={{ 
              backgroundColor: '#1A3D63', 
              color: '#F6FAFD', 
              padding: '3px 9px', 
              borderRadius: '6px',
              border: '1px solid #4A7FA7',
              fontSize: '0.72rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              boxShadow: '0 0 15px rgba(74, 127, 167, 0.20)'
            }}
          >
            {activeMode}
          </div>
        </div>
      </div>

      {/* Center: Universal Search (⌘K) */}
      <button
        onClick={onOpenCmd}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#1A3D63',
          border: '1px solid rgba(179, 207, 229, 0.15)',
          borderRadius: '10px',
          padding: '6px 16px',
          color: '#F6FAFD',
          fontSize: '0.82rem',
          fontWeight: 500,
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(10, 25, 49, 0.35)',
          transition: 'all 0.15s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#4A7FA7';
          e.currentTarget.style.boxShadow = '0 0 15px rgba(74, 127, 167, 0.20)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(179, 207, 229, 0.15)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(10, 25, 49, 0.35)';
        }}
      >
        <Search size={14} style={{ color: '#4A7FA7' }} />
        <span>Universal Search</span>
        <kbd 
          style={{ 
            backgroundColor: 'rgba(10, 25, 49, 0.6)', 
            padding: '2px 5px', 
            borderRadius: '4px', 
            fontSize: '0.7rem',
            color: '#B3CFE5',
            border: '1px solid rgba(179, 207, 229, 0.12)'
          }}
        >
          ⌘K
        </kbd>
      </button>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Voice Trigger */}
        <button
          onClick={onOpenVoice}
          title="Open Voice Interface"
          style={{
            backgroundColor: 'rgba(179, 207, 229, 0.08)',
            border: '1px solid rgba(179, 207, 229, 0.12)',
            borderRadius: '8px',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#B3CFE5',
            cursor: 'pointer'
          }}
        >
          <Mic size={15} />
        </button>

        {/* Notifications Trigger */}
        <button
          onClick={onOpenNotifications}
          title="Open Notifications Center"
          style={{
            backgroundColor: 'rgba(179, 207, 229, 0.08)',
            border: '1px solid rgba(179, 207, 229, 0.12)',
            borderRadius: '8px',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#B3CFE5',
            cursor: 'pointer',
            position: 'relative'
          }}
        >
          <Bell size={15} />
          <div style={{ position: 'absolute', top: 5, right: 5, width: 6, height: 6, borderRadius: '50%', backgroundColor: '#4A7FA7' }} />
        </button>

        {/* AI Core Status Indicator */}
        <div 
          title={isReady ? `${aiHealth.configuredCount || 6} Providers Configured` : 'Check .env configuration'}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            backgroundColor: 'rgba(26, 61, 99, 0.45)', 
            padding: '4px 10px', 
            borderRadius: '20px', 
            border: '1px solid rgba(179, 207, 229, 0.12)' 
          }}
        >
          <div 
            style={{ 
              width: 7, 
              height: 7, 
              borderRadius: '50%', 
              backgroundColor: isReady ? '#4A7FA7' : '#B3CFE5',
              boxShadow: isReady ? '0 0 8px rgba(74, 127, 167, 0.6)' : 'none'
            }} 
          />
          <span style={{ fontSize: '0.74rem', color: '#F6FAFD', fontWeight: 500 }}>
            {isReady ? `AI Core: Ready (${aiHealth.configuredCount || 6} Providers)` : 'Provider Setup'}
          </span>
        </div>

        {/* Profile */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '3px 8px', 
            borderRadius: '8px', 
            backgroundColor: 'rgba(179, 207, 229, 0.06)',
            border: '1px solid rgba(179, 207, 229, 0.12)' 
          }}
        >
          <div 
            style={{ 
              width: 24, 
              height: 24, 
              borderRadius: '50%', 
              backgroundColor: '#4A7FA7', 
              color: '#F6FAFD', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.7rem'
            }}
          >
            AG
          </div>
          <span style={{ fontSize: '0.78rem', color: '#F6FAFD', fontWeight: 600 }}>
            Ashutosh
          </span>
        </div>
      </div>
    </header>
  );
}
