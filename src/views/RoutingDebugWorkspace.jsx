import React, { useState, useEffect } from 'react';
import { Cpu, Layers, RefreshCw, Zap, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export function RoutingDebugWorkspace() {
  const [debugData, setDebugData] = useState({ history: [], configuredProviders: [] });
  const [testPrompt, setTestPrompt] = useState('Review this React component and optimize performance.');
  const [testMode, setTestMode] = useState('architect');
  const [testResult, setTestResult] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  const refreshHistory = () => {
    fetch('/api/ai/routing-debug')
      .then(res => res.json())
      .then(data => setDebugData(data))
      .catch(() => {});
  };

  useEffect(() => {
    refreshHistory();
  }, []);

  const handleTestClassify = async () => {
    setIsTesting(true);
    try {
      const res = await fetch('/api/ai/classify-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: testPrompt, mode: testMode, requestedModelId: 'auto' })
      });
      const data = await res.json();
      setTestResult(data);
    } catch (e) {
      setTestResult({ error: e.message });
    }
    setIsTesting(false);
  };

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
            <Zap size={18} />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase' }}>
              Developer Inspection Panel • Phase 4.2 Smart Model Router
            </span>
          </div>
          <h2 style={{ color: '#F6FAFD', fontSize: '1.5rem', fontWeight: 700 }}>
            Routing Intelligence & Intent Inspector
          </h2>
          <p style={{ color: 'rgba(179, 207, 229, 0.65)', fontSize: '0.88rem', marginTop: '4px' }}>
            Inspect real-time request classification, capability matching, model scoring, and fallback decisions.
          </p>
        </div>

        <button onClick={refreshHistory} className="btn-primary" style={{ padding: '8px 16px', borderRadius: '10px' }}>
          <RefreshCw size={14} />
          <span>Refresh Routing History</span>
        </button>
      </div>

      {/* Interactive Intent Simulator Card */}
      <div 
        style={{
          backgroundColor: 'rgba(26, 61, 99, 0.40)',
          border: '1px solid rgba(179, 207, 229, 0.12)',
          borderRadius: '14px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}
      >
        <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#F6FAFD', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Cpu size={16} style={{ color: '#4A7FA7' }} />
          <span>Simulate Smart Router Request</span>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <input 
            type="text"
            value={testPrompt}
            onChange={(e) => setTestPrompt(e.target.value)}
            placeholder="Type prompt to test intent classification..."
            style={{
              flex: 1,
              backgroundColor: '#1A3D63',
              border: '1px solid rgba(179, 207, 229, 0.15)',
              borderRadius: '8px',
              padding: '8px 14px',
              color: '#F6FAFD',
              fontSize: '0.86rem',
              outline: 'none'
            }}
          />

          <select 
            value={testMode} 
            onChange={(e) => setTestMode(e.target.value)}
            style={{
              backgroundColor: '#1A3D63',
              border: '1px solid rgba(179, 207, 229, 0.15)',
              borderRadius: '8px',
              padding: '8px 12px',
              color: '#F6FAFD',
              fontSize: '0.82rem',
              outline: 'none'
            }}
          >
            <option value="architect">ARCHITECT</option>
            <option value="mirror">MIRROR</option>
            <option value="researcher">RESEARCHER</option>
            <option value="creator">CREATOR</option>
            <option value="executor">EXECUTOR</option>
          </select>

          <button onClick={handleTestClassify} className="btn-primary" style={{ padding: '8px 18px', borderRadius: '8px', fontSize: '0.82rem' }}>
            <span>{isTesting ? 'Classifying...' : 'Classify & Route'}</span>
          </button>
        </div>

        {/* Simulation Output Result */}
        {testResult && (
          <div style={{ backgroundColor: '#0A1931', border: '1px solid rgba(179,207,229,0.15)', borderRadius: '10px', padding: '14px', fontSize: '0.82rem' }}>
            <div style={{ color: '#4A7FA7', fontWeight: 700, marginBottom: '6px' }}>
              Detected Intent: {testResult.intentMetadata?.intent} (Complexity: {testResult.intentMetadata?.complexity})
            </div>
            <div style={{ color: '#F6FAFD', marginBottom: '4px' }}>
              Selected Model: <strong style={{ color: '#4A7FA7' }}>{testResult.selectedModel?.displayName}</strong> ({testResult.selectedProviderDisplayName})
            </div>
            <div style={{ color: 'rgba(179,207,229,0.7)', fontSize: '0.76rem', marginBottom: '8px' }}>
              Reasoning: {testResult.reason}
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {testResult.intentMetadata?.requiredCapabilities?.map((cap, i) => (
                <span key={i} style={{ backgroundColor: 'rgba(179,207,229,0.1)', color: '#B3CFE5', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem' }}>
                  {cap}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Routing History Table (SECTION 10) */}
      <div 
        style={{
          backgroundColor: 'rgba(26, 61, 99, 0.40)',
          border: '1px solid rgba(179, 207, 229, 0.12)',
          borderRadius: '14px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F6FAFD' }}>
          Recent Routing History Traces ({debugData.history?.length || 0} traces)
        </div>

        {debugData.history && debugData.history.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {debugData.history.map((item, idx) => (
              <div 
                key={idx}
                style={{
                  backgroundColor: '#1A3D63',
                  border: '1px solid rgba(179, 207, 229, 0.10)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.8rem'
                }}
              >
                <div>
                  <div style={{ color: '#F6FAFD', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{item.intent}</span>
                    <span style={{ fontSize: '0.68rem', backgroundColor: 'rgba(179,207,229,0.1)', color: '#4A7FA7', padding: '1px 6px', borderRadius: '4px' }}>
                      {item.mode}
                    </span>
                  </div>
                  <div style={{ color: 'rgba(179,207,229,0.65)', fontSize: '0.72rem', marginTop: '2px' }}>
                    Selected: <strong style={{ color: '#F6FAFD' }}>{item.selectedModel}</strong> ({item.selectedProvider})
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '0.72rem', color: '#B3CFE5' }}>{item.timestamp}</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: item.status === 'SUCCESS' ? '#4A7FA7' : '#B3CFE5' }}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ color: 'rgba(179,207,229,0.65)', fontSize: '0.8rem', fontStyle: 'italic', padding: '10px 0' }}>
            No routing history traces recorded yet. Send queries in AI Console to populate traces.
          </div>
        )}
      </div>
    </div>
  );
}
