"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  MessageCircle,
  X,
  Minimize2,
  Maximize2,
  Bot,
} from "lucide-react";
import { SendHorizonal } from "lucide-react";
import { useReduxChat } from "@/hooks/useReduxChat";
import { ChatMessage, AIAgent } from "@/types/chat";
import Avatar, { AvatarImage, AvatarFallback } from "./ui/avatar";

// Memoized ChatBubble component with proper types
const ChatBubble = React.memo(
  ({ message, aiAgent }: { message: ChatMessage; aiAgent: AIAgent }) => {
    const isAI = message.sender === "ai";

    const formatTime = useCallback((date: Date  | string) => {
      return new Date(date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }, []);

    const getInitials = (name: string) => {
      return name
        .split(" ")
        .map(part => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    };

    return (
      <div
        className={`flex gap-3 ${
          isAI ? "flex-row" : "flex-row-reverse"
        } mb-4 animate-fade-in-up`}
      >
        {/* Avatar */}
        <div className={`shrink-0 ${isAI ? "" : "hidden"}`}>
          <Avatar className="size-8">
            {isAI && aiAgent.avatar ? (
              <AvatarImage
                src={aiAgent.avatar}
                alt={aiAgent.name}
                className="object-cover"
              />
            ) : null}
            <AvatarFallback 
              className={`${
                isAI 
                  ? "bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] text-white" 
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {isAI ? getInitials(aiAgent.name) : "You"}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Message Bubble */}
        <div
          className={`flex flex-col ${
            isAI ? "items-start" : "items-end"
          } max-w-[80%]`}
        >
          <div
            className={`px-4 py-3 rounded-2xl transition-all duration-300 ${
              isAI
                ? "bg-gray-100 border border-gray-200 rounded-bl-none text-gray-800"
                : "bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] rounded-br-none text-white"
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
          <span className="text-xs text-gray-500 mt-1">
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    );
  }
);

ChatBubble.displayName = "ChatBubble";

const ChatWidget: React.FC = () => {
  const {
    isOpen,
    isMinimized,
    currentSession,
    aiAgent,
    startNewChat,
    sendMessage,
    toggleChat,
    toggleMinimize,
    closeChat,
  } = useReduxChat();

  const [inputMessage, setInputMessage] = useState("");
  const [isChatButtonVisible, setIsChatButtonVisible] = useState(true);
  const [isWindowVisible, setIsWindowVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current && !isMinimized && currentSession?.messages) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentSession?.messages, isMinimized]);

  // Start new chat when widget opens for the first time
  useEffect(() => {
    if (
      isOpen &&
      !isMinimized &&
      (!currentSession || currentSession.messages.length === 0) &&
      !hasInitialized.current
    ) {
      startNewChat();
      hasInitialized.current = true;
    }
  }, [isOpen, isMinimized, currentSession, startNewChat]);

  // Reset initialization when chat closes
  useEffect(() => {
    if (!isOpen) {
      hasInitialized.current = false;
    }
  }, [isOpen]);

  // Handle animations for chat window
  useEffect(() => {
    if (isOpen) {
      setIsWindowVisible(true);
      setAnimationClass("animate-slide-in-right");
      setTimeout(() => setIsChatButtonVisible(false), 300);
    } else {
      setAnimationClass("animate-slide-out-right");
      setTimeout(() => {
        setIsWindowVisible(false);
        setIsChatButtonVisible(true);
      }, 300);
    }
  }, [isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    await sendMessage(inputMessage);
    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleButtonClick = () => {
    toggleChat();
    if (buttonRef.current) {
      buttonRef.current.classList.add("active:scale-95");
      setTimeout(() => {
        buttonRef.current?.classList.remove("active:scale-95");
      }, 150);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {isChatButtonVisible && (
        <button
          ref={buttonRef}
          onClick={handleButtonClick}
          className={`
            fixed bottom-6 right-6 z-50 bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] 
            text-white p-4 rounded-full shadow-lg hover:shadow-orange-500/25 
            transition-all duration-300 animate-fade-in-scale
            hover:scale-110 active:scale-95
          `}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          <div className="relative">
            {isOpen ? (
              <div className="animate-rotate-in">
                <X className="h-6 w-6" />
              </div>
            ) : (
              <div className="animate-rotate-in">
                <MessageCircle className="h-6 w-6" />
              </div>
            )}

            {/* Notification dot for new messages */}
            {!isOpen &&
              currentSession?.messages &&
              currentSession.messages.length > 1 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
              )}
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isWindowVisible && (
        <div
          className={`
            fixed bottom-24 right-6 z-50 ${animationClass}
            ${isMinimized ? "w-80 h-16" : "w-96 h-[600px] max-h-[80vh]"}
            bg-white rounded-2xl border border-gray-200 shadow-2xl
            overflow-hidden flex flex-col transition-all duration-300
          `}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <Avatar className="size-8 border-2 border-white/50">
                {aiAgent?.avatar ? (
                  <AvatarImage
                    src={aiAgent.avatar}
                    alt={aiAgent?.name || "AI Assistant"}
                    className="object-cover"
                  />
                ) : null}
                <AvatarFallback className="bg-white/20 text-white font-semibold">
                  {aiAgent?.name ? getInitials(aiAgent.name) : "AI"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-white! font-semibold text-sm">
                  {aiAgent?.name || "AI Assistant"}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleMinimize}
                className="
                  text-white/80 hover:text-white transition-all duration-200 p-1
                  hover:scale-110 active:scale-95
                "
                aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
              >
                {isMinimized ? (
                  <Maximize2 className="h-4 w-4" />
                ) : (
                  <Minimize2 className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={closeChat}
                className="
                  text-white/80 hover:text-white transition-all duration-200 p-1
                  hover:scale-110 active:scale-95
                "
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <div className="flex flex-col flex-1 min-h-0">
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {!currentSession || currentSession.messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FF6B00]/20 to-[#FF8A33]/20 flex items-center justify-center mb-4">
                      <Bot className="h-8 w-8 text-[#FF6B00]" />
                    </div>
                    <p className="text-sm font-medium">
                      Hi! I'm {aiAgent?.name || "your assistant"}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      How can I help you today?
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 justify-center">
                      <button
                        onClick={() => sendMessage("Tell me about your services")}
                        className="px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                      >
                        Services
                      </button>
                      <button
                        onClick={() => sendMessage("What are your pricing plans?")}
                        className="px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                      >
                        Pricing
                      </button>
                      <button
                        onClick={() => sendMessage("Can you help with a custom project?")}
                        className="px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                      >
                        Projects
                      </button>
                    </div>
                  </div>
                ) : (
                  currentSession.messages.map((message: ChatMessage) => (
                    <ChatBubble
                      key={message.id}
                      message={message}
                      aiAgent={aiAgent}
                    />
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form
                onSubmit={handleSendMessage}
                className="p-4 border-t border-gray-200 bg-white shrink-0"
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message here..."
                    className="
                      flex-1 bg-gray-100 border border-gray-300 rounded-xl 
                      px-4 py-3 text-gray-800 placeholder-gray-500 
                      focus:outline-none focus:border-[#FF6B00]/50 focus:ring-2 focus:ring-[#FF6B00]/20
                      transition-all duration-200 text-sm
                    "
                    autoComplete="off"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim()}
                    className="
                      bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] text-white p-3 
                      rounded-xl disabled:opacity-50 disabled:cursor-not-allowed 
                      transition-all duration-200 shrink-0
                      hover:scale-105 active:scale-95 hover:shadow-md
                    "
                    aria-label="Send message"
                  >
                    <SendHorizonal className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-gray-500 text-xs mt-2 text-center">
                  Ask about services, pricing, or projects
                </p>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default React.memo(ChatWidget);