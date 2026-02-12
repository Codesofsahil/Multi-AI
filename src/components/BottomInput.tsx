import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface BottomInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export const BottomInput: React.FC<BottomInputProps> = ({ onSendMessage, isLoading, disabled = false }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && !isLoading && !disabled) {
      onSendMessage(trimmedMessage);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const isSendDisabled = !message.trim() || isLoading || disabled;

  return (
    <div className="border-t border-gray-800 bg-[#171717] px-4 py-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end gap-2 bg-[#2f2f2f] border border-gray-700 rounded-lg p-2">
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={disabled ? "Select at least one model..." : "Message"}
            disabled={disabled}
            className="flex-1 bg-transparent text-white placeholder-gray-500 resize-none outline-none px-2 py-2 max-h-[120px] disabled:cursor-not-allowed"
            rows={1}
            style={{ minHeight: '24px' }}
          />

          {/* Send Button */}
          <button
            onClick={handleSubmit}
            disabled={isSendDisabled}
            className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
              isSendDisabled
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
