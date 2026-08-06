"use client";

import React, { useRef, useEffect, useState } from "react";
import { Message } from "@/types/chat";

interface ChatWindowProps {
  messages: Message[];
  isGenerating?: boolean;
}

// Waterfall typing effect component
interface WaterfallTextProps {
  text: string;
  delayMs?: number;
  speedMs?: number;
  showCursor?: boolean;
}

const WaterfallText = ({ text, delayMs = 0, speedMs = 25, showCursor = false }: WaterfallTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsTypingDone(false);

    let intervalId: NodeJS.Timeout;
    const startTimer = setTimeout(() => {
      let i = 0;
      intervalId = setInterval(() => {
        i++;
        setDisplayedText(text.substring(0, i));
        if (i >= text.length) {
          clearInterval(intervalId);
          setIsTypingDone(true);
        }
      }, speedMs);
    }, delayMs);

    return () => {
      clearTimeout(startTimer);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, delayMs, speedMs]);

  return (
    <span>
      {displayedText}
      {showCursor && !isTypingDone && (
        <span className="inline-block w-0.5 h-5 bg-[#0802E2] ml-1 animate-pulse align-middle" />
      )}
    </span>
  );
};

export default function ChatWindow({ messages, isGenerating }: ChatWindowProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isGenerating]);

  return (
    <div
      ref={containerRef}
      data-lenis-prevent
      className="h-full overflow-y-auto p-6 pb-36 bg-white space-y-6 scrollbar-thin scrollbar-thumb-slate-200"
    >
      {messages.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center text-center p-8">
          <h3 className="text-xl md:text-2xl font-bold text-[#0802E2]">
            <WaterfallText text="How can Caseus AI help you today?" delayMs={750} speedMs={35} showCursor />
          </h3>
        </div>
      )}

      {messages.map((message, idx) => {
        const isUser = message.role === "user";
        const isLastAiMsg = !isUser && idx === messages.length - 1;

        return (
          <div
            key={message.id}
            className={`flex gap-4 max-w-3xl ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
          >
            {/* Message Bubble */}
            <div className="space-y-1">
              <div
                className={`px-5 py-3 text-[15px] leading-relaxed ${
                  isUser
                    ? "bg-[#0802E2] text-white rounded-full rounded-tr-none shadow-sm"
                    : "text-[#0802E2] font-medium"
                }`}
              >
                {isLastAiMsg ? (
                  <p className="whitespace-pre-wrap"><WaterfallText text={message.content} /></p>
                ) : (
                  <p className="whitespace-pre-wrap">{message.content}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {isGenerating && (
        <div className="flex gap-4 max-w-3xl mr-auto">
          <div className="px-5 py-3">
            <div className="flex gap-1.5 items-center">
              <div className="w-2 h-2 rounded-full bg-[#0802E2] animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-2 h-2 rounded-full bg-[#0802E2] animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="w-2 h-2 rounded-full bg-[#0802E2] animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
