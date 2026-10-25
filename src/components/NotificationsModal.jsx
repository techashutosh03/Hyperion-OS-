import React, { useState } from 'react';
import { Bell, CheckCircle2, AlertCircle, Info, Sparkles, X, Trash2, Filter } from 'lucide-react';

export function NotificationsModal({ isOpen, onClose }) {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'Deep Research Completed', desc: 'Multi-source report on Personal AI OS compiled.', type: 'research', unread: true, time: '5m ago' },
    { id: '2', title: 'Approval Required', desc: 'Architect agent requests deployment to staging.', type: 'approval', unread: true, time: '18m ago' },
    { id: '3', title: 'New Memory Retained', desc: 'Saved preference: Soft blue glassmorphism gradient.', type: 'memory', unread: false, time: '1h ago' },
    { id: '4', title: 'Task Execution Finished', desc: 'CSS color system refactored without errors.', type: 'task', unread: false, time: '3h ago' },
    { id: '5', title: 'Hyperion System Update v4.0', desc: 'Atmospheric Ocean color grading applied.', type: 'system', unread: false, time: '1d ago' }
  ]);

  if (!isOpen) return null;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filtered = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filter);

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(10, 25, 49, 0.70)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingTop: '64px',
        paddingRight: '24px',
        zIndex: 150
      }}
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '380px',
          backgroundColor: '#0A1931',
          border: '1px solid rgba(179, 207, 229, 0.18)',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(10, 25, 49, 0.65)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: 'calc(100vh - 100px)'
        }}
      >
        {/* Header */}
        <div 
          style={{
            padding: '16px',
            backgroundColor: '#1A3D63',
            borderBottom: '1px solid rgba(179, 207, 229, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={18} style={{ color: '#4A7FA7' }} />
            <h3 style={{ color: '#F6FAFD', fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>
              Notifications
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              onClick={markAllRead} 
              style={{ background: 'transparent', border: 'none', color: '#B3CFE5', fontSize: '0.72rem', cursor: 'pointer' }}
            >
              Mark all read
            </button>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#B3CFE5', cursor: 'pointer' }}>
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div 
          style={{ 
            display: 'flex', 
            gap: '6px', 
            padding: '10px 14px', 
            borderBottom: '1px solid rgba(179, 207, 229, 0.08)',
            overflowX: 'auto'
          }}
        >
          {['all', 'research', 'approval', 'task', 'memory'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                backgroundColor: filter === cat ? '#4A7FA7' : 'rgba(179, 207, 229, 0.08)',
                color: filter === cat ? '#F6FAFD' : '#B3CFE5',
                border: 'none',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.7rem',
                fontWeight: 600,
                textTransform: 'capitalize',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* List */}
        <div style={{ padding: '10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', color: 'rgba(179, 207, 229, 0.65)', fontSize: '0.82rem' }}>
              No notifications in this view.
            </div>
          ) : (
            filtered.map(item => (
              <div 
                key={item.id}
                style={{
                  backgroundColor: item.unread ? '#1A3D63' : 'rgba(26, 61, 99, 0.35)',
                  border: item.unread ? '1px solid #4A7FA7' : '1px solid rgba(179, 207, 229, 0.10)',
                  borderRadius: '10px',
                  padding: '12px',
                  display: 'flex',
                  gap: '10px',
                  position: 'relative'
                }}
              >
                <div 
                  style={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%', 
                    backgroundColor: item.unread ? '#4A7FA7' : 'transparent',
                    marginTop: '5px',
                    flexShrink: 0
                  }} 
                />

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <span style={{ color: '#F6FAFD', fontWeight: 600, fontSize: '0.84rem' }}>{item.title}</span>
                    <span style={{ color: 'rgba(179, 207, 229, 0.65)', fontSize: '0.7rem' }}>{item.time}</span>
                  </div>
                  <p style={{ color: '#B3CFE5', fontSize: '0.78rem', lineHeight: '1.3', margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div 
            style={{
              padding: '10px 16px',
              borderTop: '1px solid rgba(179, 207, 229, 0.12)',
              backgroundColor: 'rgba(26, 61, 99, 0.3)',
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <button 
              onClick={clearAll} 
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: '#B3CFE5', 
                fontSize: '0.72rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px',
                cursor: 'pointer' 
              }}
            >
              <Trash2 size={12} />
              Clear all
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
