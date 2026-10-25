import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { RightSidebar } from './components/RightSidebar';
import { AiInputBar } from './components/AiInputBar';
import { CommandPalette } from './components/CommandPalette';
import { TabManager } from './components/TabManager';
import { VoiceModal } from './components/VoiceModal';
import { NotificationsModal } from './components/NotificationsModal';

// Workspace Views
import { HomeDashboard } from './views/HomeDashboard';
import { AiConsoleWorkspace } from './views/AiConsoleWorkspace';
import { CodeStudioWorkspace } from './views/CodeStudioWorkspace';
import { DeepResearchWorkspace } from './views/DeepResearchWorkspace';
import { VisualStudioWorkspace } from './views/VisualStudioWorkspace';
import { DocumentWorkspace } from './views/DocumentWorkspace';
import { KnowledgeGraphWorkspace } from './views/KnowledgeGraphWorkspace';
import { MemoryWorkspace } from './views/MemoryWorkspace';
import { ContextInspectorWorkspace } from './views/ContextInspectorWorkspace';
import { TaskCenterWorkspace } from './views/TaskCenterWorkspace';
import { MultiAgentWorkspace } from './views/MultiAgentWorkspace';
import { AiCanvasWorkspace } from './views/AiCanvasWorkspace';
import { AiToolkitWorkspace } from './views/AiToolkitWorkspace';
import { GoalsProactiveWorkspace } from './views/GoalsProactiveWorkspace';
import { SystemAutomationWorkspace } from './views/SystemAutomationWorkspace';
import { ProviderHealthWorkspace } from './views/ProviderHealthWorkspace';
import { RoutingDebugWorkspace } from './views/RoutingDebugWorkspace';

import { PanelRightOpen, PanelRightClose } from 'lucide-react';
import './styles/theme.css';

export function App() {
  const [activeMode, setActiveMode] = useState('architect');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  
  // Modals state
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Pending Input state from AiInputBar
  const [pendingInput, setPendingInput] = useState(null);

  // Workspace Tabs State
  const [tabs, setTabs] = useState([
    { id: 'tab-home', title: 'Home', view: 'dashboard' },
    { id: 'tab-console', title: 'AI Console', view: 'console' },
    { id: 'tab-routing', title: 'Routing Inspector', view: 'routing' }
  ]);
  const [activeTabId, setActiveTabId] = useState('tab-home');

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];
  const activeView = activeTab ? activeTab.view : 'dashboard';

  const navigateToView = (viewId, customTitle) => {
    const existingTab = tabs.find(t => t.view === viewId);
    if (existingTab) {
      setActiveTabId(existingTab.id);
    } else {
      const titleMap = {
        'dashboard': 'Home',
        'console': 'AI Console',
        'code-studio': 'Code Studio',
        'research': 'Deep Research',
        'visual-studio': 'Visual Studio',
        'documents': 'Documents',
        'knowledge-graph': 'Knowledge Graph',
        'memory': 'Memory',
        'toolkit': 'AI Toolkit',
        'task-center': 'Tasks',
        'multi-agent': 'Multi-Agent',
        'canvas': 'Canvas',
        'context-inspector': 'Context Inspector',
        'routing': 'Routing Inspector',
        'providers': 'Provider Setup',
        'settings': 'Provider Setup'
      };
      const newTab = {
        id: 'tab_' + Date.now(),
        title: customTitle || titleMap[viewId] || 'Workspace',
        view: viewId
      };
      setTabs([...tabs, newTab]);
      setActiveTabId(newTab.id);
    }
  };

  const handleCloseTab = (tabId) => {
    if (tabs.length === 1) return;
    const nextTabs = tabs.filter(t => t.id !== tabId);
    setTabs(nextTabs);
    if (activeTabId === tabId) {
      setActiveTabId(nextTabs[nextTabs.length - 1].id);
    }
  };

  const handleAddTab = () => {
    navigateToView('console');
  };

  const handleSendMessageFromBar = (inputData) => {
    setPendingInput(inputData);
    if (activeView !== 'console') {
      navigateToView('console');
    }
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <HomeDashboard onNavigate={navigateToView} />;
      case 'console':
        return (
          <AiConsoleWorkspace 
            activeMode={activeMode} 
            setActiveMode={setActiveMode} 
            pendingInput={pendingInput}
            onClearPendingInput={() => setPendingInput(null)}
          />
        );
      case 'code-studio':
        return <CodeStudioWorkspace />;
      case 'research':
        return <DeepResearchWorkspace />;
      case 'visual-studio':
        return <VisualStudioWorkspace />;
      case 'documents':
        return <DocumentWorkspace />;
      case 'knowledge-graph':
        return <KnowledgeGraphWorkspace />;
      case 'memory':
        return <MemoryWorkspace />;
      case 'toolkit':
        return <AiToolkitWorkspace />;
      case 'task-center':
        return <TaskCenterWorkspace />;
      case 'multi-agent':
        return <MultiAgentWorkspace />;
      case 'canvas':
        return <AiCanvasWorkspace />;
      case 'context-inspector':
        return <ContextInspectorWorkspace />;
      case 'routing':
        return <RoutingDebugWorkspace />;
      case 'goals':
        return <GoalsProactiveWorkspace />;
      case 'automation':
        return <SystemAutomationWorkspace />;
      case 'providers':
      case 'settings':
        return <ProviderHealthWorkspace />;
      default:
        return <HomeDashboard onNavigate={navigateToView} />;
    }
  };

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#0A1931',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Top Navigation Header */}
      <Header 
        activeMode={activeMode} 
        setActiveMode={setActiveMode} 
        activeView={activeView}
        onOpenCmd={() => setIsCmdOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenVoice={() => setIsVoiceOpen(true)}
      />

      {/* Main Container */}
      <div style={{ display: 'flex', flex: 1, height: 'calc(100vh - 60px)', overflow: 'hidden', position: 'relative' }}>
        
        {/* Left Sidebar */}
        <Sidebar 
          activeView={activeView} 
          setActiveView={navigateToView}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />

        {/* Central Main Workspace Area */}
        <main 
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          {/* Workspace Tabs Bar */}
          <TabManager 
            tabs={tabs}
            activeTabId={activeTabId}
            onSelectTab={setActiveTabId}
            onCloseTab={handleCloseTab}
            onAddTab={handleAddTab}
          />

          {/* Viewport Content */}
          <div 
            style={{
              flex: 1,
              padding: '20px 24px 10px 24px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ flex: 1 }}>
              {renderView()}
            </div>

            {/* Floating Right Sidebar Toggle Button */}
            <button
              onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
              title={isRightSidebarOpen ? "Hide Context Panel" : "Show Context Panel"}
              style={{
                position: 'fixed',
                right: isRightSidebarOpen ? '290px' : '16px',
                top: '72px',
                backgroundColor: 'rgba(26,61,99,0.65)',
                border: '1px solid rgba(179,207,229,0.12)',
                backdropFilter: 'blur(16px)',
                borderRadius: '8px',
                width: 30,
                height: 30,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#B3CFE5',
                cursor: 'pointer',
                zIndex: 30,
                transition: 'all 0.2s ease'
              }}
            >
              {isRightSidebarOpen ? <PanelRightClose size={15} /> : <PanelRightOpen size={15} />}
            </button>

            {/* Sticky Bottom AI Input Bar */}
            <div style={{ position: 'sticky', bottom: 0, paddingTop: '10px', width: '100%', zIndex: 20 }}>
              <AiInputBar 
                activeMode={activeMode} 
                onSendMessage={handleSendMessageFromBar}
              />
            </div>
          </div>
        </main>

        {/* Right Context Panel */}
        <RightSidebar isOpen={isRightSidebarOpen} setIsOpen={setIsRightSidebarOpen} />
      </div>

      {/* Overlays and Modals */}
      <CommandPalette 
        isOpen={isCmdOpen} 
        onClose={() => setIsCmdOpen(false)} 
        onSelectView={navigateToView} 
      />

      <VoiceModal 
        isOpen={isVoiceOpen} 
        onClose={() => setIsVoiceOpen(false)} 
      />

      <NotificationsModal 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />
    </div>
  );
}

export default App;
