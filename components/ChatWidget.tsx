"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  MessageCircle,
  X,
  Minimize2,
  Maximize2,
  Bot,
  Phone,
  Mail,
  ChevronUp,
  ChevronDown,
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
        className={`flex gap-2 sm:gap-3 ${
          isAI ? "flex-row" : "flex-row-reverse"
        } mb-3 sm:mb-4`}
      >
        {/* Avatar - Hidden on mobile for user messages */}
        <div className={`shrink-0 ${isAI ? "" : "hidden sm:block"}`}>
          <Avatar className="size-6 sm:size-8">
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
                  ? "bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] text-white text-xs sm:text-sm" 
                  : "bg-gray-100 text-gray-800 text-xs sm:text-sm"
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
          } max-w-[85%] sm:max-w-[80%]`}
        >
          <div
            className={`px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-2xl transition-all duration-200 ${
              isAI
                ? "bg-gray-100 border border-gray-200 rounded-bl-none text-gray-800"
                : "bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] rounded-br-none text-white"
            }`}
          >
            <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
          <span className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">
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
  const [isMobile, setIsMobile] = useState(false);
  const [showContactOptions, setShowContactOptions] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      setAnimationClass(isMobile ? "slide-up" : "slide-in-right");
      setTimeout(() => setIsChatButtonVisible(false), 200);
    } else {
      setAnimationClass(isMobile ? "slide-down" : "slide-out-right");
      setTimeout(() => {
        setIsWindowVisible(false);
        setIsChatButtonVisible(true);
      }, 200);
    }
  }, [isOpen, isMobile]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    await sendMessage(inputMessage);
    setInputMessage("");
    
    // Refocus input after sending
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
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

  // Mobile contact shortcuts
  const handleCallClick = () => {
    window.location.href = 'tel:+254789874647';
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:info@akilinovatech.com';
  };

  // Quick message presets for mobile
  const quickMessages = [
    "Tell me about your services",
    "What are your pricing plans?",
    "Can you help with a custom project?",
    "Do you have any portfolio examples?",
    "What's your typical project timeline?"
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      {isChatButtonVisible && (
        <button
          ref={buttonRef}
          onClick={handleButtonClick}
          className={`
            fixed z-50 bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] 
            text-white rounded-full shadow-lg hover:shadow-orange-500/25 
            transition-all duration-200
            hover:scale-110 active:scale-95
            ${isMobile 
              ? 'bottom-6 sm:bottom-6 right-4 sm:right-6 p-3 sm:p-4' 
              : 'bottom-6 right-6 p-4'
            }
          `}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          <div className="relative">
            {isOpen ? (
              <div>
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
            ) : (
              <div>
                <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
            )}

            {/* Notification dot for new messages */}
            {!isOpen &&
              currentSession?.messages &&
              currentSession.messages.length > 1 && (
                <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full border border-white"></div>
              )}
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isWindowVisible && (
        <div
          className={`
            fixed z-50 bg-white rounded-xl sm:rounded-2xl border border-gray-200 
            shadow-2xl overflow-hidden flex flex-col transition-all duration-200
            ${isMobile 
              ? `bottom-0 sm:bottom-24 left-0 sm:left-auto right-0 sm:right-6 w-full sm:w-96 h-[70vh] sm:h-[600px] max-h-screen sm:max-h-[80vh] ${isMinimized ? 'h-16' : ''}`
              : `bottom-24 right-6 w-96 h-[600px] max-h-[80vh] ${isMinimized ? 'h-16' : ''}`
            }
            ${animationClass === 'slide-up' ? 'animate-in slide-in-from-bottom duration-200' : 
              animationClass === 'slide-down' ? 'animate-out slide-out-to-bottom duration-200' :
              animationClass === 'slide-in-right' ? 'animate-in slide-in-from-right duration-200' :
              'animate-out slide-out-to-right duration-200'}
          `}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] p-3 sm:p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <Avatar className="size-6 sm:size-8 border border-white/50">
                {aiAgent?.avatar ? (
                  <AvatarImage
                    src={aiAgent.avatar}
                    alt={aiAgent?.name || "AI Assistant"}
                    className="object-cover"
                  />
                ) : null}
                <AvatarFallback className="bg-white/20 text-white font-semibold text-xs sm:text-sm">
                  {aiAgent?.name ? getInitials(aiAgent.name) : "AI"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-white! font-semibold text-sm">
                  {aiAgent?.name || "AI Assistant"}
                </h3>
                {isMobile && (
                  <p className="text-white/80 text-xs">Tap here for quick options</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={toggleMinimize}
                className="
                  text-white/80 hover:text-white transition-all duration-200 p-1
                  hover:scale-110 active:scale-95
                "
                aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
              >
                {isMinimized ? (
                  <Maximize2 className="h-3 w-3 sm:h-4 sm:w-4" />
                ) : (
                  <Minimize2 className="h-3 w-3 sm:h-4 sm:w-4" />
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
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>

          {/* Mobile Contact Quick Actions in Header */}
          {isMobile && !isMinimized && (
            <div className="bg-white border-b border-gray-200 p-2 flex gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <button
                onClick={handleCallClick}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-xs shrink-0"
              >
                <Phone className="h-3 w-3 text-green-500" />
                <span>Call</span>
              </button>
              <button
                onClick={handleEmailClick}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-xs shrink-0"
              >
                <Mail className="h-3 w-3 text-blue-500" />
                <span>Email</span>
              </button>
              {quickMessages.slice(0, 3).map((msg, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(msg)}
                  className="px-3 py-1.5 rounded-full bg-[#FF6B00]/10 hover:bg-[#FF6B00]/20 transition-colors text-xs shrink-0"
                >
                  {msg.split(' ').slice(0, 3).join(' ')}...
                </button>
              ))}
            </div>
          )}

          {/* Chat Content */}
          {!isMinimized && (
            <div className="flex flex-col flex-1 min-h-0">
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 sm:space-y-4 bg-gray-50">
                {!currentSession || currentSession.messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-[#FF6B00]/20 to-[#FF8A33]/20 flex items-center justify-center mb-3 sm:mb-4">
                      <Bot className="h-6 w-6 sm:h-8 sm:w-8 text-[#FF6B00]" />
                    </div>
                    <p className="text-sm font-medium text-center">
                      Hi! I'm {aiAgent?.name || "your assistant"}
                    </p>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1 text-center">
                      How can I help you today?
                    </p>
                    
                    {/* Mobile Quick Questions */}
                    {isMobile && (
                      <div className="mt-3 space-y-2 w-full">
                        {quickMessages.map((msg, index) => (
                          <button
                            key={index}
                            onClick={() => sendMessage(msg)}
                            className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
                          >
                            {msg}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {/* Desktop Quick Buttons */}
                    {!isMobile && (
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
                    )}
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
                className="p-3 sm:p-4 border-t border-gray-200 bg-white shrink-0"
              >
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message here..."
                    className="
                      flex-1 bg-gray-100 border border-gray-300 rounded-lg sm:rounded-xl 
                      px-3 sm:px-4 py-2 sm:py-3 text-gray-800 placeholder-gray-500 
                      focus:outline-none focus:border-[#FF6B00]/50 focus:ring-2 focus:ring-[#FF6B00]/20
                      transition-all duration-200 text-xs sm:text-sm
                    "
                    autoComplete="off"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim()}
                    className="
                      bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] text-white p-2 sm:p-3 
                      rounded-lg sm:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed 
                      transition-all duration-200 shrink-0
                      hover:scale-105 active:scale-95 hover:shadow-md
                    "
                    aria-label="Send message"
                  >
                    <SendHorizonal className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                </div>
                <p className="text-gray-500 text-xs mt-2 text-center hidden sm:block">
                  Ask about services, pricing, or projects
                </p>
                <p className="text-gray-500 text-xs mt-2 text-center sm:hidden">
                  Tap quick options above or type your question
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