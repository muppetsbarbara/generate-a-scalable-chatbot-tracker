TypeScript
interface ChatMessage {
  id: number;
  text: string;
  timestamp: number;
  userId: string;
}

interface ChatbotTracker {
  addMessage(message: ChatMessage): void;
  getConversation(userId: string): ChatMessage[];
  getActiveUsers(): string[];
  getConversationCount(): number;
}

class ScalableChatbotTracker implements ChatbotTracker {
  private conversationMap: Map<string, ChatMessage[]>;
  private userActivityMap: Map<string, number>;

  constructor() {
    this.conversationMap = new Map();
    this.userActivityMap = new Map();
  }

  addMessage(message: ChatMessage): void {
    const userId = message.userId;
    const conversations = this.conversationMap.get(userId) || [];
    conversations.push(message);
    this.conversationMap.set(userId, conversations);
    this.userActivityMap.set(userId, message.timestamp);
  }

  getConversation(userId: string): ChatMessage[] {
    return this.conversationMap.get(userId) || [];
  }

  getActiveUsers(): string[] {
    return Array.from(this.userActivityMap.keys());
  }

  getConversationCount(): number {
    return this.conversationMap.size;
  }
}

const tracker = new ScalableChatbotTracker();

tracker.addMessage({ id: 1, text: 'Hello', timestamp: 1643723400, userId: 'user1' });
tracker.addMessage({ id: 2, text: 'Hi', timestamp: 1643723410, userId: 'user2' });
tracker.addMessage({ id: 3, text: 'Hi again', timestamp: 1643723420, userId: 'user2' });
tracker.addMessage({ id: 4, text: 'Hello again', timestamp: 1643723430, userId: 'user1' });

console.log(tracker.getConversation('user1'));
console.log(tracker.getActiveUsers());
console.log(tracker.getConversationCount());