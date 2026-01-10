"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  MessageCircle,
  X,
  Bot,
  Phone,
  Mail,
  ChevronUp,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { SendHorizonal } from "lucide-react";
import { useReduxChat } from "@/hooks/useReduxChat";
import { ChatMessage, AIAgent } from "@/types/chat";
import Avatar, { AvatarImage, AvatarFallback } from "./ui/avatar";

// Memoized ChatBubble component with proper types and enhanced UI
const ChatBubble = React.memo(
  ({ message, aiAgent }: { message: ChatMessage; aiAgent: AIAgent }) => {
    const isAI = message.sender === "ai";

    const formatTime = useCallback((date: Date | string) => {
      return new Date(date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }, []);

    const getInitials = (name: string) => {
      return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    };

    return (
      <div
        className={`flex gap-2 sm:gap-3 ${
          isAI ? "flex-row" : "flex-row-reverse"
        } mb-3 sm:mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300`}
      >
        {/* Avatar */}
        <div className={`shrink-0 ${isAI ? "" : "hidden sm:block"}`}>
          <Avatar className="size-7 sm:size-9 ring-2 ring-white shadow-sm">
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
                  ? "bg-gradient-to-br from-[#FF6B00] to-[#FF8A33] text-white text-xs sm:text-sm font-semibold"
                  : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 text-xs sm:text-sm font-medium"
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
          } max-w-[85%] sm:max-w-[75%]`}
        >
          <div
            className={`px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl transition-all duration-200 shadow-xs hover:shadow-md ${
              isAI
                ? "bg-white border border-gray-200 rounded-tl-none text-gray-800"
                : "bg-gradient-to-br from-[#FF6B00] to-[#FF8A33] rounded-tr-none text-white shadow-orange-200"
            }`}
          >
            <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
          <span className="text-[10px] sm:text-xs text-gray-400 mt-1 px-1">
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    );
  }
);

ChatBubble.displayName = "ChatBubble";

// Typing Indicator Component
const TypingIndicator = React.memo(({ aiAgent }: { aiAgent: AIAgent }) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex gap-2 sm:gap-3 mb-3 sm:mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="shrink-0">
        <Avatar className="size-7 sm:size-9 ring-2 ring-white shadow-sm">
          {aiAgent?.avatar ? (
            <AvatarImage
              src={aiAgent.avatar}
              alt={aiAgent.name}
              className="object-cover"
            />
          ) : null}
          <AvatarFallback className="bg-gradient-to-br from-[#FF6B00] to-[#FF8A33] text-white text-xs font-semibold">
            {aiAgent?.name ? getInitials(aiAgent.name) : "AI"}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col items-start max-w-[85%] sm:max-w-[75%]">
        <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-5 py-3.5 shadow-sm">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 bg-[#FF6B00] rounded-full animate-bounce [animation-duration:1s]"></div>
            <div className="w-2 h-2 bg-[#FF7A1A] rounded-full animate-bounce [animation-duration:1s] [animation-delay:0.2s]"></div>
            <div className="w-2 h-2 bg-[#FF8A33] rounded-full animate-bounce [animation-duration:1s] [animation-delay:0.4s]"></div>
          </div>
        </div>
        <span className="text-[10px] sm:text-xs text-gray-400 mt-1 px-1">
          Typing...
        </span>
      </div>
    </div>
  );
});

TypingIndicator.displayName = "TypingIndicator";

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
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const previousMessageCountRef = useRef(0);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
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
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-scroll to bottom when new messages arrive or typing status changes
  useEffect(() => {
    if (messagesEndRef.current && !isMinimized) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentSession?.messages, isTyping, isMinimized]);

  // Monitor for AI responses to stop typing indicator
  useEffect(() => {
    const currentMessageCount = currentSession?.messages?.length || 0;
    const previousMessageCount = previousMessageCountRef.current;

    // If messages increased and we were typing, stop typing
    if (currentMessageCount > previousMessageCount && isTyping) {
      // Check if the last message is from AI
      const lastMessage = currentSession?.messages?.[currentMessageCount - 1];
      if (lastMessage && lastMessage.sender === "ai") {
        setIsTyping(false);
      }
    }

    previousMessageCountRef.current = currentMessageCount;
  }, [currentSession?.messages, isTyping]);

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
      setIsTyping(false); // Reset typing state when chat closes
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

  // Focus input when chat opens or is maximized
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isTyping) return; // Prevent sending while typing

    const messageToSend = inputMessage;
    setInputMessage("");
    setIsTyping(true);

    try {
      await sendMessage(messageToSend);
      
      // The typing indicator will be turned off automatically
      // when the AI response is detected in the useEffect above
      // But as a fallback, set a timeout
      setTimeout(() => {
        setIsTyping(false);
      }, 5000); // 5 second maximum timeout
    } catch (error) {
      console.error("Error sending message:", error);
      setIsTyping(false);
    }

    // Refocus input after sending
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleQuickMessage = async (message: string) => {
    if (isTyping) return; // Prevent sending while typing

    setIsTyping(true);

    try {
      await sendMessage(message);
      
      // Fallback timeout
      setTimeout(() => {
        setIsTyping(false);
      }, 5000);
    } catch (error) {
      console.error("Error sending quick message:", error);
      setIsTyping(false);
    }
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
    window.location.href = "tel:+254789874647";
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:info@akilinovatech.com";
  };

  // Quick message presets
  const quickMessages = [
    "Tell me about your services",
    "What are your pricing plans?",
    "Can you help with a custom project?",
    "Do you have any portfolio examples?",
    "What's your typical project timeline?",
  ];

  return (
    <>
      {/* Chat Toggle Button with Pulse Animation */}
      {isChatButtonVisible && (
        <button
          ref={buttonRef}
          onClick={handleButtonClick}
          className={`
            fixed z-50 bg-gradient-to-br from-[#FF6B00] to-[#FF8A33] 
            text-white rounded-full shadow-xl hover:shadow-orange-500/50 
            transition-all duration-300
            hover:scale-110 active:scale-95
            before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-[#FF6B00] before:to-[#FF8A33]
            before:animate-pulse before:opacity-0 hover:before:opacity-30
            ${
              isMobile
                ? "bottom-6 sm:bottom-6 right-4 sm:right-6 p-3.5 sm:p-4"
                : "bottom-6 right-6 p-4"
            }
          `}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          <div className="relative z-10">
            {isOpen ? (
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            ) : (
              <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
            )}

            {/* Notification Badge */}
            {!isOpen &&
              currentSession?.messages &&
              currentSession.messages.length > 1 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-bounce"></div>
              )}
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isWindowVisible && (
        <div
          className={`
            fixed z-50 bg-white rounded-t-2xl sm:rounded-2xl border border-gray-200 
            shadow-2xl overflow-hidden flex flex-col transition-all duration-300
            ${
              isMobile
                ? `bottom-0 sm:bottom-24 left-0 sm:left-auto right-0 sm:right-6 w-full sm:w-[400px] ${
                    isMinimized ? "h-16" : "h-[75vh] sm:h-[650px]"
                  } max-h-screen sm:max-h-[85vh]`
                : `bottom-24 right-6 w-[400px] ${
                    isMinimized ? "h-16" : "h-[650px]"
                  } max-h-[85vh]`
            }
            ${
              animationClass === "slide-up"
                ? "animate-in slide-in-from-bottom duration-300"
                : animationClass === "slide-down"
                ? "animate-out slide-out-to-bottom duration-300"
                : animationClass === "slide-in-right"
                ? "animate-in slide-in-from-right duration-300"
                : "animate-out slide-out-to-right duration-300"
            }
          `}
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-[#FF6B00] via-[#FF7A1A] to-[#FF8A33] p-3.5 sm:p-4 flex items-center justify-between shrink-0 relative overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_50%)]"></div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 relative z-10">
              <Avatar className="size-8 sm:size-10 border-2 border-white/40 shadow-lg">
                {aiAgent?.avatar ? (
                  <AvatarImage
                    src={aiAgent.avatar}
                    alt={aiAgent?.name || "AI Assistant"}
                    className="object-cover"
                  />
                ) : null}
                <AvatarFallback className="bg-white/20 text-white font-bold text-sm">
                  {aiAgent?.name ? getInitials(aiAgent.name) : "AI"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-white font-bold text-sm sm:text-base flex items-center gap-1.5">
                  {aiAgent?.name || "AI Assistant"}
                  <Sparkles className="h-3.5 w-3.5 text-yellow-300 animate-pulse" />
                </h3>
                <p className="text-white/90 text-xs font-medium">
                  {isTyping ? (
                    <span className="flex items-center gap-1">
                      <span className="inline-block w-1 h-1 bg-white rounded-full animate-pulse"></span>
                      Typing...
                    </span>
                  ) : (
                    "Online • Ready to help"
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 relative z-10">
              <button
                onClick={toggleMinimize}
                className="
                  text-white/90 hover:text-white transition-all duration-200 p-1.5
                  hover:bg-white/20 rounded-lg hover:scale-110 active:scale-95
                "
                aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
              >
                {isMinimized ? (
                  <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </button>
              <button
                onClick={closeChat}
                className="
                  text-white/90 hover:text-white transition-all duration-200 p-1.5
                  hover:bg-white/20 rounded-lg hover:scale-110 active:scale-95
                "
                aria-label="Close chat"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>

          {/* Quick Actions Bar (Mobile) */}
          {isMobile && !isMinimized && (
            <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 p-2 flex gap-1.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <button
                onClick={handleCallClick}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all text-xs shrink-0 shadow-xs hover:shadow"
              >
                <Phone className="h-3.5 w-3.5 text-green-600" />
                <span className="font-medium text-gray-700">Call</span>
              </button>
              <button
                onClick={handleEmailClick}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-xs shrink-0 shadow-xs hover:shadow"
              >
                <Mail className="h-3.5 w-3.5 text-blue-600" />
                <span className="font-medium text-gray-700">Email</span>
              </button>
              {quickMessages.slice(0, 2).map((msg, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickMessage(msg)}
                  disabled={isTyping}
                  className="px-3 py-2 rounded-lg bg-gradient-to-r from-[#FF6B00]/10 to-[#FF8A33]/10 border border-[#FF6B00]/20 hover:from-[#FF6B00]/20 hover:to-[#FF8A33]/20 transition-all text-xs shrink-0 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="font-medium text-gray-700">
                    {msg.split(" ").slice(0, 3).join(" ")}...
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Chat Content - Only show when NOT minimized */}
          {!isMinimized && (
            <div className="flex flex-col flex-1 min-h-0">
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 sm:space-y-3 bg-gradient-to-b from-gray-50 to-white">
                {!currentSession || currentSession.messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#FF6B00]/20 to-[#FF8A33]/20 flex items-center justify-center mb-4 animate-pulse">
                      <Bot className="h-8 w-8 sm:h-10 sm:w-10 text-[#FF6B00]" />
                    </div>
                    <p className="text-base sm:text-lg font-bold text-gray-800 text-center">
                      Hi! I'm {aiAgent?.name || "your assistant"}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm mt-2 text-center max-w-xs">
                      I'm here to help answer questions about our services,
                      pricing, and projects. How can I assist you today?
                    </p>

                    {/* Quick Question Buttons */}
                    {isMobile ? (
                      <div className="mt-4 space-y-2 w-full">
                        {quickMessages.map((msg, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuickMessage(msg)}
                            disabled={isTyping}
                            className="w-full px-4 py-2.5 text-xs bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-[#FF6B00]/30 transition-all text-left shadow-sm hover:shadow font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {msg}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-5 flex flex-wrap gap-2 justify-center">
                        <button
                          onClick={() => handleQuickMessage("Tell me about your services")}
                          disabled={isTyping}
                          className="px-4 py-2 text-xs bg-white border border-gray-300 rounded-full hover:bg-gradient-to-r hover:from-[#FF6B00] hover:to-[#FF8A33] hover:text-white hover:border-transparent transition-all shadow-sm hover:shadow font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Services
                        </button>
                        <button
                          onClick={() => handleQuickMessage("What are your pricing plans?")}
                          disabled={isTyping}
                          className="px-4 py-2 text-xs bg-white border border-gray-300 rounded-full hover:bg-gradient-to-r hover:from-[#FF6B00] hover:to-[#FF8A33] hover:text-white hover:border-transparent transition-all shadow-sm hover:shadow font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Pricing
                        </button>
                        <button
                          onClick={() => handleQuickMessage("Can you help with a custom project?")}
                          disabled={isTyping}
                          className="px-4 py-2 text-xs bg-white border border-gray-300 rounded-full hover:bg-gradient-to-r hover:from-[#FF6B00] hover:to-[#FF8A33] hover:text-white hover:border-transparent transition-all shadow-sm hover:shadow font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Custom Projects
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {currentSession.messages.map((message: ChatMessage) => (
                      <ChatBubble
                        key={message.id}
                        message={message}
                        aiAgent={aiAgent}
                      />
                    ))}
                    
                    {/* Typing Indicator - Only show when typing, not when there are messages */}
                    {isTyping && <TypingIndicator aiAgent={aiAgent} />}
                  </>
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
                    placeholder={isTyping ? "Waiting for response..." : "Type your message here..."}
                    disabled={isTyping}
                    className="
                      flex-1 bg-gray-50 border border-gray-300 rounded-xl 
                      px-3.5 sm:px-4 py-2.5 sm:py-3 text-gray-800 placeholder-gray-400 
                      focus:outline-none focus:border-[#FF6B00] focus:ring-0 focus:ring-[#FF6B00]/20 focus:bg-white
                      transition-all duration-200 text-xs sm:text-sm
                      disabled:opacity-60 disabled:cursor-not-allowed
                    "
                    autoComplete="off"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isTyping}
                    className="
                      bg-gradient-to-br from-[#FF6B00] to-[#FF8A33] text-white p-2.5 sm:p-3 
                      rounded-xl disabled:opacity-50 disabled:cursor-not-allowed 
                      transition-all duration-200 shrink-0
                      hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-orange-200
                      disabled:hover:scale-100 disabled:hover:shadow-none
                    "
                    aria-label="Send message"
                  >
                    <SendHorizonal className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
                <p className="text-gray-400 text-[10px] sm:text-xs mt-2 text-center">
                  {isTyping ? (
                    "AI is responding..."
                  ) : isMobile ? (
                    "Tap quick options above or type your question"
                  ) : (
                    "Ask about services, pricing, or projects • Press Enter to send"
                  )}
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