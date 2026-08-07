import { useState } from "react";
import { Message } from "@/types/chat";
import { ClientProject } from "@/types/project";

export function useChat(activeProjectId: string, setProjects: React.Dispatch<React.SetStateAction<ClientProject[]>>) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    const userMsg: Message = {
      id: Math.random().toString(),
      role: "user",
      content,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const assistantMsgId = Math.random().toString();
      setMessages((prev) => [...prev, {
        id: assistantMsgId,
        role: "model",
        content: "",
        createdAt: new Date(),
      }]);

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMsg],
          projectId: activeProjectId 
        })
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      let buffer = "";
      let currentEvent = '';

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          // Keep the last incomplete line in the buffer
          buffer = lines.pop() || "";
          
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;

            if (trimmed.startsWith('event: ')) {
              currentEvent = trimmed.substring(7).trim();
            } else if (trimmed.startsWith('data: ')) {
              const dataStr = trimmed.substring(6).trim();
              if (!dataStr) continue;
              if (currentEvent === 'done') break;
              
              try {
                const data = JSON.parse(dataStr);
                
                if (currentEvent === 'error') {
                  const errorText = data.error || "An error occurred while generating response.";
                  setMessages(prev => prev.map(m => {
                    if (m.id === assistantMsgId) {
                      return { ...m, content: `⚠️ ${errorText}` };
                    }
                    return m;
                  }));
                } else if (currentEvent === 'tool_call') {
                  if (data.result?.updatedBrief) {
                    const updatedBrief = data.result.updatedBrief;
                    setProjects(prev => prev.map(p => {
                      if (p.id === activeProjectId) {
                        return {
                          ...p,
                          brief: {
                            ...p.brief,
                            durationAndPrice: updatedBrief.durationAndPrice,
                            upsells: updatedBrief.upsells,
                            notes: updatedBrief.autoDiscountMessage, 
                          }
                        };
                      }
                      return p;
                    }));
                  }
                } else if (data.text) {
                  setMessages(prev => prev.map(m => {
                    if (m.id === assistantMsgId) {
                      const newRawContent = (m.rawContent || m.content || '') + data.text;
                      const parts = newRawContent.split('---SUGGESTIONS---');
                      let newSuggestions = m.suggestions;
                      
                      if (parts.length > 1) {
                        try {
                          const parsed = JSON.parse(parts[1].trim());
                          if (Array.isArray(parsed)) newSuggestions = parsed;
                        } catch (e) {
                          // Ignore parsing errors while streaming
                        }
                      }
                      
                      return { 
                        ...m, 
                        rawContent: newRawContent,
                        content: parts[0], 
                        suggestions: newSuggestions 
                      };
                    }
                    return m;
                  }));
                }
              } catch (e) {
                console.warn("Partial SSE JSON chunk ignored:", dataStr);
              }
              currentEvent = '';
            }
          }
        }
      }
    } catch (err) {
      console.error("Failed to generate response:", err);
      // fallback
      setMessages((prev) => [...prev, {
        id: Math.random().toString(),
        role: "model",
        content: "Error connecting to AI.",
        createdAt: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, setMessages, isLoading, sendMessage };
}
