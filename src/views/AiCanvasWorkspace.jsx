import React, { useState } from 'react';
import { LayoutGrid, Plus, Trash2, Move, ZoomIn, ZoomOut, FileText, Code2, Image, MessageSquare } from 'lucide-react';

export function AiCanvasWorkspace() {
  const [cards, setCards] = useState([
    { id: '1', title: 'System Architecture Note', type: 'note', x: 40, y: 40, text: 'Master orchestrator uses 1M token context window with 5 specialized subagent modes.' },
    { id: '2', title: 'Deep Ocean Color Tokens', type: 'code', x: 380, y: 40, text: 'const PALETTE = {\n  base: "#0A1931",\n  surface: "#1A3D63",\n  accent: "#4A7FA7"\n};' },
    { id: '3', title: 'AI Assistant Response', type: 'response', x: 200, y: 240, text: 'Synthesized persistent memory graph with soft blue glass highlights.' }
  ]);

  const [selectedCardId, setSelectedCardId] = useState('1');

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxHeight: 'calc(100vh - 120px)',
        width: '100%',
        backgroundColor: '#0A1931',
        border: '1px solid rgba(179, 207, 229, 0.12)',
        borderRadius: '14px',
        overflow: 'hidden'
      }}
    >
      {/* Canvas Header Bar */}
      <div 
        style={{
          backgroundColor: '#1A3D63',
          borderBottom: '1px solid rgba(179, 207, 229, 0.12)',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F6FAFD', fontWeight: 600, fontSize: '0.88rem' }}>
          <LayoutGrid size={16} style={{ color: '#4A7FA7' }} />
          <span>Free-form Spatial AI Canvas</span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => {
              const newC = { id: 'c_' + Date.now(), title: 'New Spatial Note', type: 'note', x: 100, y: 100, text: 'New note content...' };
              setCards([...cards, newC]);
              setSelectedCardId(newC.id);
            }}
            className="btn-primary" 
            style={{ padding: '6px 12px', fontSize: '0.76rem', borderRadius: '6px' }}
          >
            <Plus size={13} />
            <span>Add Canvas Card</span>
          </button>
        </div>
      </div>

      {/* Interactive Freeform Canvas Grid */}
      <div 
        style={{
          flex: 1,
          position: 'relative',
          backgroundColor: '#0A1931',
          backgroundImage: 'radial-gradient(circle, rgba(179,207,229,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          overflow: 'auto',
          padding: '40px'
        }}
      >
        {cards.map(card => {
          const isSel = card.id === selectedCardId;
          return (
            <div
              key={card.id}
              onClick={() => setSelectedCardId(card.id)}
              style={{
                position: 'absolute',
                left: card.x,
                top: card.y,
                width: 300,
                backgroundColor: 'rgba(26, 61, 99, 0.45)',
                backdropFilter: 'blur(24px)',
                border: isSel ? '2px solid #4A7FA7' : '1px solid rgba(179, 207, 229, 0.15)',
                borderRadius: '12px',
                padding: '14px',
                boxShadow: isSel ? '0 0 20px rgba(74,127,167,0.35)' : '0 10px 30px rgba(10,25,49,0.4)',
                cursor: 'move'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ color: '#F6FAFD', fontWeight: 600, fontSize: '0.84rem' }}>{card.title}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setCards(cards.filter(c => c.id !== card.id));
                  }}
                  style={{ background: 'transparent', border: 'none', color: '#B3CFE5', cursor: 'pointer' }}
                >
                  <Trash2 size={13} />
                </button>
              </div>

              <div style={{ color: '#B3CFE5', fontSize: '0.78rem', lineHeight: '1.4', fontFamily: card.type === 'code' ? 'var(--font-mono)' : 'inherit' }}>
                {card.text}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
