import React, { useState, useEffect } from 'react';
import { Settings, Trash2 } from 'lucide-react';
import { ChatHistoryService, ChatSession } from '../services/chatHistory';

interface SidebarProps {
  onNewChat: () => void;
  onOpenSettings: () => void;
  onLoadChat: (chatId: string) => void;
  currentChatId: string | null;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNewChat, onOpenSettings, onLoadChat, currentChatId }) => {
  const [chats, setChats] = useState<ChatSession[]>([]);

  const loadChats = () => {
    setChats(ChatHistoryService.getChatHistory());
  };

  useEffect(() => {
    loadChats();
    const interval = setInterval(loadChats, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    ChatHistoryService.deleteChat(chatId);
    loadChats();
  };

  const handleDeleteAll = () => {
    if (confirm('Delete all chats?')) {
      ChatHistoryService.deleteAllChats();
      loadChats();
      onNewChat();
    }
  };
  return (
    <div className="w-60 h-screen bg-[#171717] border-r border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-lg font-semibold text-white">Multi-AI Chat</h1>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <button
          onClick={onNewChat}
          className="w-full px-4 py-2.5 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          New Chat
        </button>
      </div>

      {/* Recent Chats */}
      <div className="flex-1 px-3 overflow-y-auto">
        {chats.length > 0 && (
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 px-3">Recent Chats</span>
            <button
              onClick={handleDeleteAll}
              className="text-xs text-red-400 hover:text-red-300 px-2 py-1"
              title="Delete all chats"
            >
              Clear All
            </button>
          </div>
        )}
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onLoadChat(chat.id)}
            className={`group flex items-center justify-between px-3 py-2 mb-1 rounded-lg cursor-pointer transition-colors ${
              currentChatId === chat.id ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <span className="text-sm truncate flex-1">{chat.title}</span>
            <button
              onClick={(e) => handleDelete(chat.id, e)}
              className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-opacity"
              title="Delete chat"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="p-3 border-t border-gray-800">
        <button
          onClick={onOpenSettings}
          className="w-full flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span className="text-sm">Settings</span>
        </button>
      </div>
    </div>
  );
};
