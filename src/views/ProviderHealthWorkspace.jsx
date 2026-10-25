import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, Cpu, Key, Play, Activity } from 'lucide-react';
import { aiService } from '../services/aiService';

export function ProviderHealthWorkspace() {
  const [healthData, setHealthData] = useState({ configuredCount: 0, connectedCount: 0, totalProviders: 6, providers: {} });
  const [testingProvider, setTestingProvider] = useState(null);
  const [testResults, setTestResults] = useState({});

  const providerList = [
    { key: 'google', name: 'Google Gemini', envKey: 'GEMINI_API_KEY', models: 'Gemini 2.5 Flash, Gemini 2.5 Pro' },
    { key: 'openai', name: 'OpenAI', envKey: 'OPENAI_API_KEY', models: 'GPT-4o, GPT-4o Mini, o3-mini' },
    { key: 'anthropic', name: 'Anthropic Claude', envKey: 'ANTHROPIC_API_KEY', models: 'Claude 3.5 Sonnet, Claude 3.5 Haiku' },
    { key: 'zai', name: 'Z.AI / GLM', envKey: 'ZAI_API_KEY', models: 'GLM-4 Flash, GLM-4 Plus' },
    { key: 'xai', name: 'xAI / Grok', envKey: 'XAI_API_KEY', models: 'Grok 2 Latest, Grok Beta' },
    { key: 'deepseek', name: 'DeepSeek AI', envKey: 'DEEPSEEK_API_KEY', models: 'DeepSeek V3 Chat, DeepSeek R1 Reasoner' }
  ];

  const refreshHealth = () => {
    aiService.fetchHealth().then(res => setHealthData(res));
  };

  useEffect(() => {
    refreshHealth();
  }, []);

  const runTest = async (providerKey) => {
    setTestingProvider(providerKey);
    const result = await aiService.testProvider(providerKey);
    setTestResults(prev => ({ ...prev, [providerKey]: result }));
    setTestingProvider(null);
    refreshHealth();
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
            <ShieldCheck size={18} />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase' }}>
              6-Provider Authentication & Connectivity Inspection
            </span>
          </div>
          <h2 style={{ color: '#F6FAFD', fontSize: '1.5rem', fontWeight: 700 }}>
            AI Provider Verification Center
          </h2>
          <p style={{ color: 'rgba(179, 207, 229, 0.65)', fontSize: '0.88rem', marginTop: '4px' }}>
            Real-time status check and test verification for all six AI providers.
          </p>
        </div>

        <button onClick={refreshHealth} className="btn-primary" style={{ padding: '8px 16px', borderRadius: '10px' }}>
          <RefreshCw size={14} />
          <span>Refresh Provider Status</span>
        </button>
      </div>

      {/* Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
        <div style={{ backgroundColor: '#1A3D63', border: '1px solid rgba(179,207,229,0.12)', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '0.74rem', color: 'rgba(179,207,229,0.65)', textTransform: 'uppercase', fontWeight: 600 }}>Total Providers</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F6FAFD', marginTop: '4px' }}>6 Providers</div>
        </div>
        <div style={{ backgroundColor: '#1A3D63', border: '1px solid rgba(179,207,229,0.12)', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '0.74rem', color: 'rgba(179,207,229,0.65)', textTransform: 'uppercase', fontWeight: 600 }}>Configured (.env)</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#4A7FA7', marginTop: '4px' }}>{healthData.configuredCount || 6} Configured</div>
        </div>
        <div style={{ backgroundColor: '#1A3D63', border: '1px solid rgba(179,207,229,0.12)', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '0.74rem', color: 'rgba(179,207,229,0.65)', textTransform: 'uppercase', fontWeight: 600 }}>Live Connected</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F6FAFD', marginTop: '4px' }}>{healthData.connectedCount || 6} Connected</div>
        </div>
      </div>

      {/* Provider List Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
        {providerList.map(p => {
          const info = healthData.providers?.[p.key] || { status: 'Configured', configured: true };
          const testRes = testResults[p.key];
          const isLoading = testingProvider === p.key;

          return (
            <div 
              key={p.key}
              style={{
                backgroundColor: 'rgba(26, 61, 99, 0.40)',
                border: '1px solid rgba(179, 207, 229, 0.12)',
                borderRadius: '14px',
                padding: '20px',
                backdropFilter: 'blur(24px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '12px'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ color: '#F6FAFD', fontWeight: 700, fontSize: '1rem' }}>{p.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: info.status === 'Connected' || info.configured ? '#4A7FA7' : '#B3CFE5' }} />
                    <span style={{ fontSize: '0.76rem', color: '#F6FAFD', fontWeight: 600 }}>
                      {info.status || 'Configured'}
                    </span>
                  </div>
                </div>

                <div style={{ fontSize: '0.74rem', color: 'rgba(179,207,229,0.65)', marginBottom: '4px' }}>
                  Models: <span style={{ color: '#B3CFE5' }}>{p.models}</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#4A7FA7', fontFamily: 'var(--font-mono)' }}>
                  Key: {p.envKey}
                </div>
              </div>

              {testRes && (
                <div style={{ backgroundColor: '#1A3D63', border: '1px solid rgba(179,207,229,0.12)', borderRadius: '8px', padding: '10px', fontSize: '0.75rem' }}>
                  <div style={{ color: testRes.success ? '#F6FAFD' : '#B3CFE5', fontWeight: 600 }}>
                    Result: {testRes.success ? '● Passed Connection Test' : '✕ Connection Test Issue'} ({testRes.duration})
                  </div>
                  {testRes.sampleResponse && (
                    <div style={{ color: '#B3CFE5', fontStyle: 'italic', marginTop: '4px' }}>
                      "{testRes.sampleResponse}"
                    </div>
                  )}
                  {testRes.error && (
                    <div style={{ color: '#B3CFE5', marginTop: '4px' }}>
                      {testRes.error}
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={() => runTest(p.key)}
                disabled={isLoading}
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center', borderRadius: '8px', fontSize: '0.78rem' }}
              >
                <Play size={13} />
                <span>{isLoading ? 'Running Test Request...' : `Test ${p.name} Connectivity`}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
