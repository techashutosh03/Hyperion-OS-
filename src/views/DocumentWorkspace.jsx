import React, { useState } from 'react';
import { 
  FileText, Upload, Search, CheckCircle2, MessageSquare, 
  Sparkles, Layers, BookOpen, FileCheck, Highlighter, Plus 
} from 'lucide-react';

export function DocumentWorkspace() {
  const [activeDoc, setActiveDoc] = useState('hyperion_vision_spec.pdf');
  const [docQuery, setDocQuery] = useState('');
  const [qaHistory, setQaHistory] = useState([
    {
      q: 'What are the main color tokens defined in the specification?',
      a: 'The specification mandates Deep Navy (#0A1931), Ocean Blue (#1A3D63), Muted Blue (#4A7FA7), Soft Blue (#B3CFE5), and Arctic White (#F6FAFD).'
    }
  ]);

  const docs = [
    { name: 'hyperion_vision_spec.pdf', type: 'PDF', pages: 12, size: '2.4 MB' },
    { name: 'architecture_contract.docx', type: 'DOCX', pages: 5, size: '850 KB' },
    { name: 'user_preferences.csv', type: 'CSV', pages: 1, size: '42 KB' }
  ];

  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: '240px 1fr 300px',
        gap: '12px',
        height: '100%',
        maxHeight: 'calc(100vh - 120px)',
        width: '100%'
      }}
    >
      {/* 1. DOCUMENT EXPLORER & UPLOAD */}
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
        <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center', borderRadius: '8px' }}>
          <Upload size={14} />
          <span>Upload Document</span>
        </button>

        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#B3CFE5', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Document Vault
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {docs.map((doc, idx) => {
            const isSel = doc.name === activeDoc;
            return (
              <div
                key={idx}
                onClick={() => setActiveDoc(doc.name)}
                style={{
                  backgroundColor: isSel ? '#1A3D63' : 'rgba(26, 61, 99, 0.25)',
                  border: isSel ? '1px solid #4A7FA7' : '1px solid transparent',
                  borderRadius: '8px',
                  padding: '8px 10px',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}
              >
                <div style={{ color: '#F6FAFD', fontWeight: 600, fontSize: '0.82rem' }}>
                  {doc.name}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'rgba(179,207,229,0.65)', marginTop: '2px' }}>
                  <span>{doc.type} • {doc.pages} pages</span>
                  <span>{doc.size}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. DOCUMENT PREVIEW & ANNOTATION VIEWER */}
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
        {/* Header toolbar */}
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
          <div style={{ color: '#F6FAFD', fontWeight: 600, fontSize: '0.86rem' }}>
            {activeDoc}
          </div>
          <span style={{ fontSize: '0.72rem', color: '#B3CFE5' }}>Page 1 of 12</span>
        </div>

        {/* Document Content View */}
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto', backgroundColor: '#0A1931', color: '#F6FAFD', fontSize: '0.9rem', lineHeight: '1.6' }}>
          <h2 style={{ color: '#F6FAFD', fontSize: '1.3rem', fontWeight: 700, marginBottom: '12px' }}>
            Hyperion AI Operating System — Vision & Specification
          </h2>
          <p style={{ color: '#B3CFE5', marginBottom: '14px' }}>
            This document specifies the core design system tokens, atmospheric glassmorphism layer parameters, and multi-agent interaction paradigms for Hyperion OS v4.0.
          </p>

          <div style={{ backgroundColor: '#1A3D63', borderLeft: '4px solid #4A7FA7', padding: '12px 16px', borderRadius: '4px', margin: '14px 0', color: '#F6FAFD' }}>
            <span style={{ fontWeight: 600, color: '#4A7FA7' }}>AI Highlight [Citation #1]:</span><br/>
            All glass surfaces must utilize backdrop blur (24px) with subtle borders (rgba(179, 207, 229, 0.12)) and deep ocean base (#0A1931).
          </div>
        </div>
      </div>

      {/* 3. AI DOCUMENT INTELLIGENCE PANEL */}
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
          <span>Ask Document AI</span>
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          <input 
            type="text"
            value={docQuery}
            onChange={(e) => setDocQuery(e.target.value)}
            placeholder="Ask question about document..."
            style={{
              flex: 1,
              backgroundColor: '#1A3D63',
              border: '1px solid rgba(179, 207, 229, 0.12)',
              borderRadius: '6px',
              padding: '6px 10px',
              color: '#F6FAFD',
              fontSize: '0.78rem',
              outline: 'none'
            }}
          />
          <button 
            onClick={() => {
              if (!docQuery.trim()) return;
              setQaHistory([...qaHistory, { q: docQuery, a: 'Hyperion Document Engine: Extracted key points matching your query from page 1.' }]);
              setDocQuery('');
            }}
            className="btn-primary" 
            style={{ padding: '6px 10px', borderRadius: '6px', fontSize: '0.74rem' }}
          >
            Ask
          </button>
        </div>

        {/* QA List */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {qaHistory.map((item, i) => (
            <div key={i} style={{ backgroundColor: 'rgba(26, 61, 99, 0.40)', border: '1px solid rgba(179, 207, 229, 0.12)', borderRadius: '8px', padding: '10px', fontSize: '0.78rem' }}>
              <div style={{ color: '#F6FAFD', fontWeight: 600, marginBottom: '4px' }}>Q: {item.q}</div>
              <div style={{ color: '#B3CFE5', lineHeight: '1.4' }}>A: {item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
