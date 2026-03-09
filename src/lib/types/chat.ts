export interface Chat {
  id: string;
  resumeId: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  chatId: string;
  sender: MessageSender;
  generatedResumeId?: string | null;
  generatedResume?: string | null;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export type MessageSender = "user" | "ai";
