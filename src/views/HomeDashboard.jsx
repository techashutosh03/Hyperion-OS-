import React from 'react';
import { 
  Code2, Globe, Palette, FileCode2, FileText, Zap, 
  ArrowUpRight, Clock, MessageSquare, Sparkles, FolderGit2, CheckCircle2, Play
} from 'lucide-react';
import { motion } from 'framer-motion';

export function HomeDashboard({ onNavigate }) {
  // 6 Quick Action Cards (3x2 grid)
  const quickActions = [
    {
      id: 'build-app',
      title: 'Build an Application',
      desc: 'Plan and build a complete software project.',
      icon: Code2,
      view: 'automation'
    },
    {
      id: 'deep-research',
      title: 'Deep Research',
      desc: 'Investigate a topic and synthesize reliable sources.',
      icon: Globe,
      view: 'research'
    },
    {
      id: 'generate-ui',
      title: 'Generate UI',
      desc: 'Create interfaces, components, and design systems.',
      icon: Palette,
      view: 'studio'
    },
    {
      id: 'analyze-code',
      title: 'Analyze Code',
      desc: 'Review architecture, bugs, and security issues.',
      icon: FileCode2,
      view: 'automation'
    },
    {
      id: 'analyze-docs',
      title: 'Analyze Documents',
      desc: 'Understand PDFs, notes, and project documents.',
      icon: FileText,
      view: 'studio'
    },
    {
      id: 'automate-task',
      title: 'Automate a Task',
      desc: 'Turn repetitive work into an automated workflow.',
      icon: Zap,
      view: 'goals'
    }
  ];

  // Recent Work Project Cards (Horizontal)
  const recentWork = [
    {
      name: 'Hyperion OS',
      desc: 'Personal AI Operating System',
      activity: 'Active now',
      statusColor: '#4A7FA7',
      isCurrent: true
    },
    {
      name: 'TripVault',
      desc: 'Travel management platform',
      activity: 'Updated recently',
      statusColor: '#B3CFE5',
      isCurrent: false
    },
    {
      name: 'Avenor',
      desc: 'AI luxury commerce platform',
      activity: 'Updated recently',
      statusColor: '#B3CFE5',
      isCurrent: false
    }
  ];

  // Active AI Tasks
  const activeTasks = [
    {
      name: 'Researching AI Operating Systems',
      mode: 'RESEARCHER',
      progress: 68,
      status: 'In progress'
    },
    {
      name: 'Analyzing repository architecture',
      mode: 'ARCHITECT',
      progress: 92,
      status: 'In progress'
    },
    {
      name: 'Generating interface concepts',
      mode: 'CREATOR',
      progress: 40,
      status: 'Queued'
    }
  ];

  // Recent Conversations
  const recentConversations = [
    {
      title: 'How should I structure Hyperion\'s agent system?',
      mode: 'ARCHITECT',
      time: '10m ago'
    },
    {
      title: 'Audit my backend architecture',
      mode: 'EXECUTOR',
      time: '2h ago'
    },
    {
      title: 'Research the future of personal AI',
      mode: 'RESEARCHER',
      time: 'Yesterday'
    },
    {
      title: 'Design a better authentication flow',
      mode: 'CREATOR',
      time: '2 days ago'
    }
  ];

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
        maxWidth: '1100px',
        margin: '0 auto',
        width: '100%',
        paddingBottom: '32px'
      }}
    >
      {/* 1. HERO SECTION */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          padding: '8px 0 4px 0'
        }}
      >
        <div 
          style={{ 
            fontSize: '0.72rem', 
            fontWeight: 700, 
            color: '#B3CFE5', 
            letterSpacing: '2px', 
            textTransform: 'uppercase',
            opacity: 0.9
          }}
        >
          HYPERION OS
        </div>

        <h1 
          style={{ 
            color: '#F6FAFD', 
            fontSize: '1.85rem', 
            fontWeight: 800, 
            letterSpacing: '-0.5px',
            margin: 0,
            lineHeight: 1.2
          }}
        >
          Good morning, Ashutosh.
        </h1>

        <h2 
          style={{ 
            color: '#B3CFE5', 
            fontSize: '1.25rem', 
            fontWeight: 600, 
            margin: 0,
            letterSpacing: '-0.2px'
          }}
        >
          What would you like to accomplish today?
        </h2>

        <p 
          style={{ 
            color: 'rgba(179, 207, 229, 0.65)', 
            fontSize: '0.92rem', 
            margin: '4px 0 0 0'
          }}
        >
          Build, research, create, and execute from one intelligent workspace.
        </p>
      </div>

      {/* 2. QUICK ACTIONS ("Start with") */}
      <div>
        <div 
          style={{ 
            fontSize: '0.8rem', 
            fontWeight: 700, 
            color: '#B3CFE5', 
            letterSpacing: '1px', 
            textTransform: 'uppercase',
            marginBottom: '14px'
          }}
        >
          Start with
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '14px'
          }}
        >
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.id}
                whileHover={{ y: -3, scale: 1.01 }}
                onClick={() => onNavigate(action.view)}
                style={{
                  backgroundColor: 'rgba(26, 61, 99, 0.40)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  border: '1px solid rgba(179, 207, 229, 0.12)',
                  borderRadius: '12px',
                  padding: '16px 18px',
                  boxShadow: '0 10px 30px rgba(10, 25, 49, 0.40)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '108px',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(179, 207, 229, 0.28)';
                  e.currentTarget.style.backgroundColor = 'rgba(26, 61, 99, 0.65)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(74, 127, 167, 0.20)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(179, 207, 229, 0.12)';
                  e.currentTarget.style.backgroundColor = 'rgba(26, 61, 99, 0.40)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(10, 25, 49, 0.40)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div 
                    style={{ 
                      width: 32, 
                      height: 32, 
                      borderRadius: '8px', 
                      backgroundColor: '#1A3D63',
                      border: '1px solid rgba(179, 207, 229, 0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#4A7FA7'
                    }}
                  >
                    <Icon size={17} />
                  </div>
                  <ArrowUpRight size={15} style={{ color: 'rgba(179, 207, 229, 0.65)' }} />
                </div>

                <div>
                  <div style={{ color: '#F6FAFD', fontWeight: 600, fontSize: '0.92rem', marginBottom: '2px' }}>
                    {action.title}
                  </div>
                  <div style={{ color: 'rgba(179, 207, 229, 0.65)', fontSize: '0.78rem', lineHeight: '1.3' }}>
                    {action.desc}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 3. RECENT WORK ("Continue where you left off") */}
      <div>
        <div 
          style={{ 
            fontSize: '0.8rem', 
            fontWeight: 700, 
            color: '#B3CFE5', 
            letterSpacing: '1px', 
            textTransform: 'uppercase',
            marginBottom: '14px'
          }}
        >
          Continue where you left off
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '14px'
          }}
        >
          {recentWork.map((project, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -2 }}
              style={{
                backgroundColor: project.isCurrent ? '#1A3D63' : 'rgba(26, 61, 99, 0.40)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: project.isCurrent 
                  ? '1px solid #4A7FA7' 
                  : '1px solid rgba(179, 207, 229, 0.12)',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: project.isCurrent
                  ? '0 0 20px rgba(74, 127, 167, 0.20)'
                  : '0 10px 30px rgba(10, 25, 49, 0.35)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!project.isCurrent) {
                  e.currentTarget.style.backgroundColor = 'rgba(26, 61, 99, 0.65)';
                  e.currentTarget.style.borderColor = 'rgba(179, 207, 229, 0.25)';
                }
              }}
              onMouseLeave={(e) => {
                if (!project.isCurrent) {
                  e.currentTarget.style.backgroundColor = 'rgba(26, 61, 99, 0.40)';
                  e.currentTarget.style.borderColor = 'rgba(179, 207, 229, 0.12)';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div 
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '8px',
                    backgroundColor: 'rgba(10, 25, 49, 0.6)',
                    border: '1px solid rgba(179, 207, 229, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#B3CFE5'
                  }}
                >
                  <FolderGit2 size={18} style={{ color: '#4A7FA7' }} />
                </div>
                <div>
                  <div style={{ color: '#F6FAFD', fontWeight: 600, fontSize: '0.9rem' }}>
                    {project.name}
                  </div>
                  <div style={{ color: 'rgba(179, 207, 229, 0.65)', fontSize: '0.76rem' }}>
                    {project.desc}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div 
                  style={{ 
                    width: 7, 
                    height: 7, 
                    borderRadius: '50%', 
                    backgroundColor: project.statusColor,
                    boxShadow: project.isCurrent ? '0 0 8px rgba(74, 127, 167, 0.6)' : 'none'
                  }} 
                />
                <span style={{ fontSize: '0.72rem', color: '#B3CFE5', fontWeight: 500 }}>
                  {project.activity}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. ACTIVE TASKS & RECENT CONVERSATIONS (2-Column Balanced Grid) */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px'
        }}
      >
        {/* Active AI Tasks */}
        <div 
          style={{
            backgroundColor: 'rgba(26, 61, 99, 0.40)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(179, 207, 229, 0.12)',
            borderRadius: '14px',
            padding: '18px 20px',
            boxShadow: '0 10px 30px rgba(10, 25, 49, 0.40)'
          }}
        >
          <div 
            style={{ 
              fontSize: '0.8rem', 
              fontWeight: 700, 
              color: '#B3CFE5', 
              letterSpacing: '1px', 
              textTransform: 'uppercase',
              marginBottom: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span>Active Tasks</span>
            <span style={{ fontSize: '0.72rem', color: '#4A7FA7', fontWeight: 600 }}>3 Running</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {activeTasks.map((task, idx) => (
              <div 
                key={idx}
                style={{
                  backgroundColor: '#1A3D63',
                  border: '1px solid rgba(179, 207, 229, 0.10)',
                  borderRadius: '10px',
                  padding: '12px 14px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ color: '#F6FAFD', fontWeight: 600, fontSize: '0.84rem' }}>
                    {task.name}
                  </span>
                  <span 
                    style={{ 
                      fontSize: '0.66rem', 
                      fontWeight: 700, 
                      color: '#F6FAFD', 
                      backgroundColor: '#4A7FA7',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {task.mode}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {/* Progress Bar */}
                  <div 
                    style={{ 
                      flex: 1, 
                      height: '5px', 
                      backgroundColor: 'rgba(179, 207, 229, 0.12)', 
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}
                  >
                    <div 
                      style={{ 
                        width: `${task.progress}%`, 
                        height: '100%', 
                        backgroundColor: '#4A7FA7',
                        borderRadius: '3px',
                        boxShadow: '0 0 10px rgba(74, 127, 167, 0.4)'
                      }} 
                    />
                  </div>
                  <span style={{ color: '#B3CFE5', fontSize: '0.74rem', fontWeight: 600, minWidth: '32px', textAlign: 'right' }}>
                    {task.progress}%
                  </span>
                  <span style={{ color: 'rgba(179, 207, 229, 0.65)', fontSize: '0.72rem' }}>
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Conversations */}
        <div 
          style={{
            backgroundColor: 'rgba(26, 61, 99, 0.40)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(179, 207, 229, 0.12)',
            borderRadius: '14px',
            padding: '18px 20px',
            boxShadow: '0 10px 30px rgba(10, 25, 49, 0.40)'
          }}
        >
          <div 
            style={{ 
              fontSize: '0.8rem', 
              fontWeight: 700, 
              color: '#B3CFE5', 
              letterSpacing: '1px', 
              textTransform: 'uppercase',
              marginBottom: '14px'
            }}
          >
            Recent Conversations
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {recentConversations.map((conv, idx) => (
              <div 
                key={idx}
                style={{
                  backgroundColor: 'rgba(179, 207, 229, 0.04)',
                  border: '1px solid rgba(179, 207, 229, 0.08)',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1A3D63';
                  e.currentTarget.style.borderColor = 'rgba(179, 207, 229, 0.20)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(179, 207, 229, 0.04)';
                  e.currentTarget.style.borderColor = 'rgba(179, 207, 229, 0.08)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <MessageSquare size={15} style={{ color: '#4A7FA7', flexShrink: 0 }} />
                  <span style={{ color: '#F6FAFD', fontSize: '0.84rem', fontWeight: 500 }}>
                    {conv.title}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  <span 
                    style={{ 
                      fontSize: '0.64rem', 
                      color: '#B3CFE5', 
                      backgroundColor: 'rgba(179, 207, 229, 0.10)',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}
                  >
                    {conv.mode}
                  </span>
                  <span style={{ color: 'rgba(179, 207, 229, 0.65)', fontSize: '0.72rem' }}>
                    {conv.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
