import React, { useState, useEffect } from 'react';
import { Mic, MicOff, X, Volume2, Settings, Sparkles, StopCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { AiOrb } from './AiOrb';

export function VoiceModal({ isOpen, onClose }) {
  const [voiceState, setVoiceState] = useState('LISTENING'); // READY, LISTENING, PROCESSING, RESPONDING
  const [transcript, setTranscript] = useState('How can Hyperion optimize my agent memory architecture?');

  useEffect(() => {
    if (!isOpen) return;
    const timer1 = setTimeout(() => setVoiceState('PROCESSING'), 3000);
    const timer2 = setTimeout(() => {
      setVoiceState('RESPONDING');
      setTranscript('Hyperion OS recommends implementing a persistent hierarchical tree structure with soft blue glass confidence nodes...');
    }, 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(10, 25, 49, 0.85)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200
      }}
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '520px',
          backgroundColor: '#0A1931',
          border: '1px solid rgba(179, 207, 229, 0.20)',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: '0 30px 90px rgba(10, 25, 49, 0.9)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'transparent',
            border: 'none',
            color: '#B3CFE5',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {/* State Badge */}
        <div 
          style={{ 
            backgroundColor: '#1A3D63', 
            color: '#F6FAFD', 
            padding: '4px 14px', 
            borderRadius: '20px', 
            border: '1px solid #4A7FA7',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            boxShadow: '0 0 15px rgba(74, 127, 167, 0.25)'
          }}
        >
          {voiceState}
        </div>

        {/* Center AI Orb */}
        <div style={{ margin: '12px 0' }}>
          <AiOrb size={96} isThinking={voiceState === 'PROCESSING'} />
        </div>

        {/* Animated Waveform */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '40px' }}>
          {[12, 28, 42, 20, 36, 48, 24, 38, 16].map((h, i) => (
            <motion.div
              key={i}
              animate={{
                height: voiceState === 'LISTENING' || voiceState === 'RESPONDING' 
                  ? [h * 0.4, h, h * 0.4] 
                  : [8, 12, 8]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.08,
                ease: "easeInOut"
              }}
              style={{
                width: 4,
                backgroundColor: '#4A7FA7',
                borderRadius: '4px',
                boxShadow: '0 0 10px rgba(74, 127, 167, 0.4)'
              }}
            />
          ))}
        </div>

        {/* Live Transcript Area */}
        <div 
          style={{
            backgroundColor: 'rgba(26, 61, 99, 0.40)',
            border: '1px solid rgba(179, 207, 229, 0.12)',
            borderRadius: '14px',
            padding: '16px 20px',
            width: '100%',
            textAlign: 'center',
            minHeight: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <p style={{ color: '#F6FAFD', fontSize: '0.94rem', lineHeight: '1.5', margin: 0 }}>
            "{transcript}"
          </p>
        </div>

        {/* Control Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={() => setVoiceState(voiceState === 'LISTENING' ? 'READY' : 'LISTENING')}
            style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              backgroundColor: '#4A7FA7',
              color: '#F6FAFD',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(74, 127, 167, 0.35)'
            }}
          >
            {voiceState === 'LISTENING' ? <Mic size={22} /> : <MicOff size={22} />}
          </button>

          <button 
            onClick={onClose}
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              backgroundColor: 'rgba(179, 207, 229, 0.10)',
              color: '#B3CFE5',
              border: '1px solid rgba(179, 207, 229, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <StopCircle size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
