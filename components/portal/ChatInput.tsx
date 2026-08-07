"use client";

import React, { useState, FormEvent } from "react";
import { FaArrowUp, FaPaperclip } from "react-icons/fa";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  isLoading?: boolean;
  hasMessages?: boolean;
  suggestions?: string[];
}

export default function ChatInput({ onSendMessage, isLoading, hasMessages, suggestions }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim() || isLoading) return;
    onSendMessage(value.trim());
    setValue("");
  };

  const handleQuickAction = (text: string) => {
    if (isLoading) return;
    onSendMessage(text);
  };

  const displaySuggestions = suggestions?.length 
    ? suggestions 
    : [
        "Мне нужно короткое видео (Reels/TikTok)",
        "Хочу добавить глубокий покрас и саунд-дизайн",
        "Нужна экспресс-доставка (24ч)"
      ];

  return (
    <div
      className="absolute bottom-0 left-0 right-0 p-6 z-20 pointer-events-none bg-transparent animate-fly-in-bottom"
      style={{ animationDelay: "100ms" }}
    >
      {/* Ambient Blue Glow - Layer 1: Active Wave (Fades out on messages) */}
      <div
        className={`absolute inset-x-0 -bottom-6 h-48 -z-10 pointer-events-none transition-opacity duration-1000 ease-in-out ${
          hasMessages ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="w-full h-full bg-gradient-to-t from-[#0802E2]/45 via-[#0802E2]/20 to-transparent blur-2xl animate-wave-glow" />
      </div>

      {/* Ambient Blue Glow - Layer 2: Calm Waters (Fades in on messages) */}
      <div
        className={`absolute inset-x-0 -bottom-6 h-36 -z-10 pointer-events-none transition-opacity duration-1000 ease-in-out ${
          hasMessages ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-full h-full bg-gradient-to-t from-[#0802E2]/20 via-[#0802E2]/08 to-transparent blur-xl" />
      </div>

      {/* Quick Action Suggestion Buttons */}
      <div className="relative z-10 flex flex-wrap justify-center gap-3 max-w-3xl mx-auto w-full mb-3 pointer-events-auto">
        {displaySuggestions.map((suggestion, idx) => {
          const isHidden = isLoading || value.length > 0;
          return (
            <button
              key={idx}
              onClick={() => handleQuickAction(suggestion)}
              style={{ transitionDelay: `${idx * 75}ms` }}
              className={`flex-1 min-w-[140px] text-sm bg-white hover:bg-[#0802E2] hover:text-white text-[#0802E2] font-medium px-4 py-2.5 rounded-xl border-2 border-[#0802E2] shadow-sm cursor-pointer text-center break-words whitespace-normal leading-snug transition-all duration-300 ease-out ${
                isHidden ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"
              }`}
            >
              {suggestion}
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 flex gap-3 items-center max-w-3xl mx-auto w-full pointer-events-auto">
        <div className="flex-1 flex items-center bg-white border-2 border-[#0802E2] rounded-full px-3 py-1.5 focus-within:ring-4 focus-within:ring-blue-100 transition-all">
          <button
            type="button"
            className="w-9 h-9 rounded-full text-[#0802E2] flex items-center justify-center shrink-0 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Attach file"
          >
            <FaPaperclip className="text-lg" />
          </button>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent px-2 py-2 text-[15px] text-slate-800 placeholder-slate-400 focus:outline-none font-medium"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={!value.trim() || isLoading}
          className="w-12 h-12 rounded-full border-2 border-[#0802E2] bg-white text-[#0802E2] disabled:opacity-40 flex items-center justify-center shrink-0 hover:bg-[#0802E2] hover:text-white transition-all cursor-pointer shadow-sm"
        >
          <FaArrowUp className="text-lg" />
        </button>
      </form>
    </div>
  );
}
