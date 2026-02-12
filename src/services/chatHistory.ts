import { ChatMessage } from '../types';

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  timestamp: Date;
}

const CHAT_HISTORY_KEY = 'multi-model-chat-history';

export class ChatHistoryService {
  static getChatHistory(): ChatSession[] {
    try {
      const stored = localStorage.getItem(CHAT_HISTORY_KEY);
      if (!stored) return [];
      const sessions = JSON.parse(stored);
      return sessions.map((s: any) => ({
        ...s,
        timestamp: new Date(s.timestamp),
        messages: s.messages.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }))
      }));
    } catch {
      return [];
    }
  }

  static saveChat(messages: ChatMessage[]): string {
    if (messages.length === 0) return '';
    
    const sessions = this.getChatHistory();
    const userMessage = messages.find(m => m.role === 'user');
    const title = userMessage?.content.slice(0, 50) || 'New Chat';
    
    const newSession: ChatSession = {
      id: `chat-${Date.now()}`,
      title,
      messages,
      timestamp: new Date()
    };
    
    sessions.unshift(newSession);
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(sessions.slice(0, 50)));
    return newSession.id;
  }

  static deleteChat(chatId: string): void {
    const sessions = this.getChatHistory().filter(s => s.id !== chatId);
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(sessions));
  }

  static deleteAllChats(): void {
    localStorage.removeItem(CHAT_HISTORY_KEY);
  }

  static getChat(chatId: string): ChatSession | undefined {
    return this.getChatHistory().find(s => s.id === chatId);
  }
}
