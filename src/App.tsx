import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ModelBar } from './components/ModelBar';
import { MultiColumnChat } from './components/MultiColumnChat';
import { BottomInput } from './components/BottomInput';
import { SettingsPage } from './components/SettingsPage';
import { AddModelModal } from './components/AddModelModal';
import { useChat } from './hooks/useChat';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [showAddModel, setShowAddModel] = useState(false);
  const {
    messages,
    selectedModels,
    isLoading,
    currentChatId,
    sendMessage,
    clearMessages,
    loadChat,
    setModels,
  } = useChat();

  const handleModelToggle = (modelId: string) => {
    if (selectedModels.includes(modelId)) {
      setModels(selectedModels.filter(id => id !== modelId));
    } else {
      if (selectedModels.length < 5) {
        setModels([...selectedModels, modelId]);
      }
    }
  };

  const handleNewChat = () => {
    clearMessages();
  };

  return (
    <div className="h-screen flex bg-[#0a0a0a] overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar
        onNewChat={handleNewChat}
        onOpenSettings={() => setShowSettings(true)}
        onLoadChat={loadChat}
        currentChatId={currentChatId}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Model Bar */}
        <ModelBar
          selectedModels={selectedModels}
          onModelToggle={handleModelToggle}
          onAddModel={() => setShowAddModel(true)}
          maxModels={5}
        />

        {/* Chat Area */}
        <MultiColumnChat
          messages={messages}
          selectedModels={selectedModels}
        />

        {/* Bottom Input */}
        <BottomInput
          onSendMessage={sendMessage}
          isLoading={isLoading}
          disabled={selectedModels.length === 0}
        />
      </div>

      {/* Add Model Modal */}
      {showAddModel && (
        <AddModelModal onClose={() => setShowAddModel(false)} />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <SettingsPage onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}

export default App;

