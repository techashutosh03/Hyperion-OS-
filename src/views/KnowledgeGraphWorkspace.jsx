import React, { useState } from 'react';
import { Network, Search, Plus, Trash2, ZoomIn, ZoomOut, Filter, Sparkles, Layers, Brain, FolderGit2 } from 'lucide-react';

export function KnowledgeGraphWorkspace() {
  const [selectedNode, setSelectedNode] = useState('node-1');
  const [nodes, setNodes] = useState([
    { id: 'node-1', label: 'Hyperion OS Core', category: 'Project', x: 260, y: 160, connections: ['node-2', 'node-3', 'node-4'] },
    { id: 'node-2', label: 'Deep Ocean Palette', category: 'Design System', x: 120, y: 80, connections: ['node-1'] },
    { id: 'node-3', label: 'Multi-Agent Mesh', category: 'Architecture', x: 420, y: 100, connections: ['node-1'] },
    { id: 'node-4', label: 'Knowledge Graph Engine', category: 'Memory', x: 300, y: 300, connections: ['node-1'] }
  ]);

  const activeNodeData = nodes.find(n => n.id === selectedNode) || nodes[0];

  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        gap: '12px',
        height: '100%',
        maxHeight: 'calc(100vh - 120px)',
        width: '100%'
      }}
    >
      {/* 1. INTERACTIVE GRAPH CANVAS */}
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
        {/* Graph Header Controls */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F6FAFD', fontWeight: 600, fontSize: '0.86rem' }}>
            <Network size={16} style={{ color: '#4A7FA7' }} />
            <span>Interactive Knowledge Mesh</span>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.72rem' }}>
              <Plus size={12} />
              <span>Add Node</span>
            </button>
          </div>
        </div>

        {/* Graph Canvas */}
        <div 
          style={{
            flex: 1,
            position: 'relative',
            backgroundColor: '#0A1931',
            backgroundImage: 'radial-gradient(circle, rgba(179,207,229,0.06) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        >
          {/* SVG Connection Lines */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <line x1="260" y1="160" x2="120" y2="80" stroke="#4A7FA7" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
            <line x1="260" y1="160" x2="420" y2="100" stroke="#4A7FA7" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
            <line x1="260" y1="160" x2="300" y2="300" stroke="#4A7FA7" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
          </svg>

          {/* Render Nodes */}
          {nodes.map(n => {
            const isSel = n.id === selectedNode;
            return (
              <div
                key={n.id}
                onClick={() => setSelectedNode(n.id)}
                style={{
                  position: 'absolute',
                  left: n.x - 60,
                  top: n.y - 25,
                  width: 130,
                  height: 50,
                  backgroundColor: isSel ? '#1A3D63' : 'rgba(26, 61, 99, 0.45)',
                  border: isSel ? '2px solid #4A7FA7' : '1px solid rgba(179, 207, 229, 0.15)',
                  borderRadius: '12px',
                  boxShadow: isSel ? '0 0 20px rgba(74,127,167,0.35)' : '0 8px 24px rgba(10,25,49,0.35)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: '6px'
                }}
              >
                <div style={{ color: '#F6FAFD', fontWeight: 600, fontSize: '0.78rem', textAlign: 'center', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '100%' }}>
                  {n.label}
                </div>
                <div style={{ fontSize: '0.64rem', color: '#B3CFE5' }}>{n.category}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. RIGHT NODE DETAILS PANEL */}
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
          Node Intelligence
        </div>

        <div style={{ backgroundColor: '#1A3D63', border: '1px solid rgba(179,207,229,0.12)', borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ color: '#F6FAFD', fontWeight: 700, fontSize: '0.92rem' }}>
            {activeNodeData.label}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#4A7FA7', fontWeight: 600 }}>
            Category: {activeNodeData.category}
          </div>
          <div style={{ fontSize: '0.76rem', color: 'rgba(179,207,229,0.65)', lineHeight: '1.4' }}>
            Connected to {activeNodeData.connections.length} active workspace nodes.
          </div>
        </div>

        <button 
          onClick={() => setNodes(nodes.filter(n => n.id !== selectedNode))}
          style={{
            backgroundColor: 'rgba(179, 207, 229, 0.08)',
            border: '1px solid rgba(179, 207, 229, 0.12)',
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
          <span>Delete Node</span>
        </button>
      </div>
    </div>
  );
}
