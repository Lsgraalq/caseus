export type MessageRole = "user" | "model" | "system";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  rawContent?: string;
  suggestions?: string[];
  createdAt: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  projectId?: string;
  createdAt: Date;
  updatedAt: Date;
  messages: Message[];
}

export interface AgentConfig {
  id: string;
  name: string;
  description: string;
  avatarUrl?: string;
  model: string;
}
