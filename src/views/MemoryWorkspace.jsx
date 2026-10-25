import React, { useState } from 'react';
import { Brain, Search, Plus, Trash2, Pin, CheckCircle2, Shield, Filter } from 'lucide-react';

export function MemoryWorkspace() {
  const [memories, setMemories] = useState([
    { id: 'm1', title: 'Color Palette Locked', category: 'Project Memory', desc: 'Use only #0A1931, #1A3D63, #4A7FA7, #B3CFE5, #F6FAFD.', conf: '99%', pinned: true },
    { id: 'm2', title: 'User Preference', category: 'Preferences', desc: 'User prefers dark atmospheric glassmorphism design.', conf: '96%', pinned: true },
    { id: 'm3', title: 'System Architecture', category: 'Instructions', desc: 'Build modular React components in src/components.', conf: '94%', pinned: false },
    { id: 'm4', title: 'Task Queue Pipeline', category: 'Temporary Context', desc: 'Active execution queue running 3 subagents.', conf: '90%', pinned: false }
  ]);

  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Project Memory', 'Preferences', 'Instructions', 'Temporary Context'];

  const filtered = memories.filter(m => {
    const matchesCat = activeCategory === 'All' || m.category === activeCategory;
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase()) || m.desc.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

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
            <Brain size={18} />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase' }}>
              Persistent Memory Management
            </span>
          </div>
          <h2 style={{ color: '#F6FAFD', fontSize: '1.5rem', fontWeight: 700 }}>
            Hyperion Memory Manager
          </h2>
          <p style={{ color: 'rgba(179, 207, 229, 0.65)', fontSize: '0.88rem', marginTop: '4px' }}>
            Inspect, pin, edit, and forget long-term memories retained across sessions.
          </p>
        </div>

        <button className="btn-primary" style={{ padding: '10px 18px', borderRadius: '10px' }}>
          <Plus size={16} />
          <span>Add Custom Memory</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                backgroundColor: activeCategory === cat ? '#4A7FA7' : 'rgba(179, 207, 229, 0.08)',
                color: activeCategory === cat ? '#F6FAFD' : '#B3CFE5',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#1A3D63', border: '1px solid rgba(179, 207, 229, 0.12)', borderRadius: '8px', padding: '6px 12px', width: '240px' }}>
          <Search size={14} style={{ color: '#B3CFE5' }} />
          <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search memory..."
            style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', color: '#F6FAFD', fontSize: '0.78rem' }}
          />
        </div>
      </div>

      {/* Memories Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
        {filtered.map(mem => (
          <div 
            key={mem.id}
            style={{
              backgroundColor: 'rgba(26, 61, 99, 0.40)',
              border: '1px solid rgba(179, 207, 229, 0.12)',
              borderRadius: '12px',
              padding: '16px',
              backdropFilter: 'blur(24px)',
              boxShadow: '0 10px 30px rgba(10,25,49,0.35)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ color: '#F6FAFD', fontWeight: 600, fontSize: '0.92rem' }}>{mem.title}</span>
                <span style={{ fontSize: '0.66rem', color: '#4A7FA7', backgroundColor: '#1A3D63', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(179,207,229,0.12)', fontWeight: 600 }}>
                  {mem.category}
                </span>
              </div>
              <p style={{ color: 'rgba(179, 207, 229, 0.65)', fontSize: '0.82rem', lineHeight: '1.4' }}>
                {mem.desc}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(179,207,229,0.08)', paddingTop: '10px' }}>
              <span style={{ fontSize: '0.72rem', color: '#B3CFE5' }}>Confidence: {mem.conf}</span>
              <button 
                onClick={() => setMemories(memories.filter(m => m.id !== mem.id))}
                style={{ background: 'transparent', border: 'none', color: '#B3CFE5', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem' }}
              >
                <Trash2 size={12} />
                <span>Forget</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
