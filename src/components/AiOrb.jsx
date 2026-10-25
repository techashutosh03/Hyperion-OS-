import React from 'react';
import { motion } from 'framer-motion';

export function AiOrb({ size = 36, isThinking = false }) {
  return (
    <div 
      style={{ 
        width: size, 
        height: size, 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: '50%',
        flexShrink: 0
      }}
    >
      {/* Outer Ambient Glow */}
      <motion.div
        animate={{
          scale: isThinking ? [1, 1.25, 1] : [1, 1.1, 1],
          opacity: isThinking ? [0.4, 0.7, 0.4] : [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: isThinking ? 2 : 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          inset: -4,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(74,127,167,0.4) 0%, rgba(26,61,99,0.2) 60%, transparent 100%)',
          filter: 'blur(8px)',
        }}
      />

      {/* Rotating Soft Gradient Orb Surface */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: isThinking ? [0.95, 1.05, 0.95] : [0.98, 1.02, 0.98]
        }}
        transition={{
          rotate: { duration: 12, repeat: Infinity, ease: "linear" },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #0A1931 0%, #1A3D63 35%, #4A7FA7 70%, #B3CFE5 100%)',
          boxShadow: 'inset 0 2px 4px rgba(179,207,229,0.4), 0 4px 14px rgba(10,25,49,0.6)',
          border: '1px solid rgba(179,207,229,0.25)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Inner Highlight Layer */}
        <motion.div
          animate={{
            x: ['-20%', '20%', '-20%'],
            y: ['-20%', '20%', '-20%']
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: '10%',
            left: '15%',
            width: '60%',
            height: '60%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(179,207,229,0.5) 0%, rgba(74,127,167,0.2) 60%, transparent 100%)',
            filter: 'blur(3px)'
          }}
        />
      </motion.div>

      {/* Core Center Pulse Dot */}
      <motion.div
        animate={{
          opacity: isThinking ? [0.6, 1, 0.6] : [0.5, 0.8, 0.5],
          scale: isThinking ? [0.8, 1.2, 0.8] : [0.9, 1.1, 0.9]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          width: size * 0.28,
          height: size * 0.28,
          borderRadius: '50%',
          background: '#F6FAFD',
          boxShadow: '0 0 10px #B3CFE5'
        }}
      />
    </div>
  );
}
