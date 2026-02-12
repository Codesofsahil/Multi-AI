import React, { useRef, useEffect } from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import { ChatMessage } from './ChatMessage';
import { getModelById } from '../config/models';
import { SettingsService } from '../services/settings';

interface MultiColumnChatProps {
  messages: ChatMessageType[];
  selectedModels: string[];
}

export const MultiColumnChat: React.FC<MultiColumnChatProps> = ({ messages, selectedModels }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  // Group messages by user message and model responses
  const groupedMessages = React.useMemo(() => {
    const groups: Array<{
      id: string;
      userMessage: ChatMessageType;
      modelResponses: ChatMessageType[];
    }> = [];

    let currentGroup: {
      id: string;
      userMessage: ChatMessageType;
      modelResponses: ChatMessageType[];
    } | null = null;

    messages.forEach((message) => {
      if (message.role === 'user') {
        if (currentGroup) {
          groups.push(currentGroup);
        }
        currentGroup = {
          id: message.id,
          userMessage: message,
          modelResponses: []
        };
      } else if (message.role === 'assistant' && currentGroup) {
        currentGroup.modelResponses.push(message);
      }
    });

    if (currentGroup) {
      groups.push(currentGroup);
    }

    return groups;
  }, [messages]);

  const getModelName = (modelId: string) => {
    const settings = SettingsService.getSettings();
    const remoteModel = getModelById(modelId);
    const localModel = settings.localModels.find(local => local.id === modelId);
    if (remoteModel) return remoteModel.name;
    if (localModel) return localModel.name;
    return modelId;
  };

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white mb-2">
            Multi-AI Chat
          </h3>
          <p className="text-gray-400 text-sm">
            Select models above and start chatting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto">
      {groupedMessages.map((group) => (
        <div key={group.id} className="border-b border-gray-800">
          {/* User Message */}
          <div className="bg-[#212121] px-4 py-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-sm font-semibold text-gray-400 mb-2">You</div>
              <div className="text-white">{group.userMessage.content}</div>
            </div>
          </div>

          {/* Model Responses - Side by Side */}
          <div className="bg-[#171717] px-4 py-6">
            <div className={`grid gap-0 ${
              selectedModels.length === 1 ? 'grid-cols-1 max-w-4xl mx-auto' :
              selectedModels.length === 2 ? 'grid-cols-2' :
              selectedModels.length === 3 ? 'grid-cols-3' :
              selectedModels.length === 4 ? 'grid-cols-4' :
              'grid-cols-5'
            }`}>
              {group.modelResponses.map((response, index) => (
                <div 
                  key={response.model} 
                  className={`flex flex-col px-4 ${
                    index !== group.modelResponses.length - 1 ? 'border-r border-gray-800' : ''
                  }`}
                >
                  {/* Model Name */}
                  <div className="text-xs font-semibold text-gray-400 mb-3">
                    {getModelName(response.model || '')}
                  </div>

                  {/* Response Content */}
                  <div className="text-white text-sm">
                    {response.isLoading ? (
                      <div className="flex items-center gap-2 text-gray-500">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
                        <span>Thinking...</span>
                      </div>
                    ) : response.error ? (
                      <div className="text-red-400 text-xs">
                        Error: {response.error}
                      </div>
                    ) : (
                      <div className="prose prose-sm prose-invert max-w-none">
                        <ChatMessage message={response} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
