import React, { useState } from 'react';
import { 
  Palette, Sparkles, Layers, Layout, Move, Type, Square, 
  Trash2, Plus, Download, Eye, Sliders, Grid, ZoomIn, ZoomOut 
} from 'lucide-react';

export function VisualStudioWorkspace() {
  const [selectedElement, setSelectedElement] = useState('hero-card');
  const [elements, setElements] = useState([
    { id: 'hero-card', type: 'Glass Container', x: 40, y: 40, w: 320, h: 180, bg: 'rgba(26,61,99,0.45)', label: 'Hero Card' },
    { id: 'btn-primary', type: 'Primary Button', x: 60, y: 150, w: 140, h: 40, bg: '#4A7FA7', label: 'Primary Action' },
    { id: 'badge-pill', type: 'Mode Pill', x: 215, y: 150, w: 120, h: 40, bg: '#1A3D63', label: 'Mode Selector' }
  ]);

  const [prompt, setPrompt] = useState('Generate an atmospheric frosted glass modal dialog for AI task execution');

  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: '220px 1fr 280px',
        gap: '12px',
        height: '100%',
        maxHeight: 'calc(100vh - 120px)',
        width: '100%'
      }}
    >
      {/* 1. LEFT TOOLBAR & LAYERS */}
      <div 
        style={{
          backgroundColor: '#0A1931',
          border: '1px solid rgba(179, 207, 229, 0.12)',
          borderRadius: '12px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}
      >
        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#B3CFE5', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Layers & Components
        </div>

        {/* Layers List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {elements.map((el) => {
            const isSel = el.id === selectedElement;
            return (
              <div
                key={el.id}
                onClick={() => setSelectedElement(el.id)}
                style={{
                  backgroundColor: isSel ? '#1A3D63' : 'rgba(26, 61, 99, 0.25)',
                  border: isSel ? '1px solid #4A7FA7' : '1px solid transparent',
                  borderRadius: '8px',
                  padding: '8px 10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: isSel ? '#F6FAFD' : '#B3CFE5',
                  fontSize: '0.8rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Square size={14} style={{ color: '#4A7FA7' }} />
                  <span>{el.label}</span>
                </div>
                <span style={{ fontSize: '0.68rem', opacity: 0.7 }}>{el.type}</span>
              </div>
            );
          })}
        </div>

        {/* AI Action Palette */}
        <div style={{ borderTop: '1px solid rgba(179, 207, 229, 0.12)', paddingTop: '12px' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#B3CFE5', textTransform: 'uppercase', marginBottom: '8px' }}>
            Generative Design Actions
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {['Generate UI', 'Improve Design', 'Generate Component', 'Generate Layout', 'Generate Palette', 'Create Variations'].map((act, i) => (
              <button
                key={i}
                style={{
                  backgroundColor: 'rgba(179, 207, 229, 0.08)',
                  border: '1px solid rgba(179, 207, 229, 0.12)',
                  borderRadius: '6px',
                  padding: '6px 8px',
                  color: '#B3CFE5',
                  fontSize: '0.74rem',
                  cursor: 'pointer',
                  textAlign: 'left'
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
                {act}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. CANVAS WORKSPACE */}
      <div 
        style={{
          backgroundColor: '#0A1931',
          border: '1px solid rgba(179, 207, 229, 0.12)',
          borderRadius: '12px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Canvas Toolbar */}
        <div 
          style={{
            backgroundColor: '#1A3D63',
            borderBottom: '1px solid rgba(179, 207, 229, 0.12)',
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ color: '#F6FAFD', fontWeight: 600, fontSize: '0.84rem' }}>Artboard 1 (1200 x 800)</span>
          </div>

          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <button style={{ background: 'transparent', border: 'none', color: '#B3CFE5', cursor: 'pointer' }}><ZoomIn size={16} /></button>
            <button style={{ background: 'transparent', border: 'none', color: '#B3CFE5', cursor: 'pointer' }}><ZoomOut size={16} /></button>
          </div>
        </div>

        {/* Interactive Canvas Canvas Area */}
        <div 
          style={{
            flex: 1,
            position: 'relative',
            backgroundColor: '#0A1931',
            backgroundImage: 'radial-gradient(circle, rgba(179,207,229,0.08) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            padding: '40px'
          }}
        >
          {elements.map((el) => {
            const isSel = el.id === selectedElement;
            return (
              <div
                key={el.id}
                onClick={() => setSelectedElement(el.id)}
                style={{
                  position: 'absolute',
                  left: el.x,
                  top: el.y,
                  width: el.w,
                  height: el.h,
                  backgroundColor: el.bg,
                  backdropFilter: 'blur(24px)',
                  border: isSel ? '2px solid #4A7FA7' : '1px solid rgba(179, 207, 229, 0.20)',
                  borderRadius: '12px',
                  boxShadow: isSel ? '0 0 25px rgba(74,127,167,0.35)' : '0 10px 30px rgba(10,25,49,0.4)',
                  cursor: 'move',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F6FAFD',
                  fontWeight: 600,
                  fontSize: '0.85rem'
                }}
              >
                <span>{el.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. RIGHT PROPERTIES PANEL */}
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
        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#B3CFE5', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Element Properties
        </div>

        <div style={{ backgroundColor: '#1A3D63', borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'rgba(179,207,229,0.65)' }}>Element ID</span>
            <span style={{ color: '#F6FAFD', fontWeight: 600 }}>{selectedElement}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'rgba(179,207,229,0.65)' }}>Border Radius</span>
            <span style={{ color: '#B3CFE5' }}>16px</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'rgba(179,207,229,0.65)' }}>Backdrop Blur</span>
            <span style={{ color: '#4A7FA7', fontWeight: 600 }}>24px</span>
          </div>
        </div>

        <button 
          onClick={() => setElements(elements.filter(e => e.id !== selectedElement))}
          style={{
            backgroundColor: 'rgba(179,207,229,0.08)',
            border: '1px solid rgba(179,207,229,0.12)',
            color: '#B3CFE5',
            padding: '8px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontSize: '0.78rem'
          }}
        >
          <Trash2 size={14} />
          <span>Delete Element</span>
        </button>
      </div>
    </div>
  );
}
