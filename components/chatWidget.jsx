"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Book, Code, MapPin } from "lucide-react";
import TypeWriter from "./TypeWriter";

const fetchWithTimeout = async (url, options, timeout = 15000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [showBotIcon, setShowBotIcon] = useState(true);
  const [isCompact, setIsCompact] = useState(false);
  const [zoomOut, setZoomOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTypingMessage, setIsTypingMessage] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [currentIcon, setCurrentIcon] = useState('chat'); // Add this state

  const quickActions = [
    { text: "Who is Sayees?", query: "who is sayees", icon: <User className="h-4 w-4" /> },
    { text: "Education", query: "education", icon: <Book className="h-4 w-4" /> },
    { text: "Projects", query: "projects", icon: <Code className="h-4 w-4" /> },
    { text: "Skills", query: "skills", icon: <Code className="h-4 w-4" /> },
    { text: "Location", query: "where are you from", icon: <MapPin className="h-4 w-4" /> },
  ];

  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);

  useEffect(() => {
    if (messages.length > 0 || isTypingMessage) {
      setTimeout(() => {
        scrollToBottom();
      }, 0);
    }
  }, [messages, isTypingMessage]);

  const scrollToBottom = (smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: smooth ? "smooth" : "instant" });
    }
  };

  useEffect(() => {
    const container = messageContainerRef.current;

    const handleScroll = () => {
      if (!container) return;
      // If the user has scrolled up more than a threshold, disable smooth scrolling
      const isScrolledUp = container.scrollHeight - container.scrollTop - container.clientHeight > 100;
      scrollToBottom(!isScrolledUp, false); // Disable smooth scroll if scrolled up
    };

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);
      setIsCompact(isMobileView);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setZoomOut(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          text: "\uD83D\uDC4B Hi! I'm Sayees's AI assistant. How can I help you today?",
          sender: "bot",
        },
      ]);
    }
  }, [isOpen]);

  const handleSendMessage = async (message) => {
    if (!message.trim() || isSubmitting) return;

    let timeoutId;
    try {
      setShowQuickActions(false);
      setIsSubmitting(true);
      setMessages((prev) => [...prev, { text: message, sender: "user" }]);
      setInputMessage("");
      setShowBotIcon(false);
      setIsTypingMessage(true);

      timeoutId = setTimeout(() => {
        throw new Error("Server taking too long to respond");
      }, 15000);

      const res = await fetchWithTimeout(
        "https://chatbot-4cn8.onrender.com/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        },
        15000
      );

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (!data || !data.response) {
        throw new Error("Invalid response format");
      }

      setMessages((prev) => [
        ...prev,
        {
          text: data.response,
          sender: "bot",
        },
      ]);
    } catch (err) {
      clearTimeout(timeoutId);

      let errorMessage = "Sorry, I couldn't connect to the chatbot server. Please try again later.";

      if (
        err.name === "AbortError" ||
        err.message === "Server taking too long to respond"
      ) {
        errorMessage = "Server seems to be down at the moment. Please try again later.";
      } else if (err.message === "Invalid response format") {
        errorMessage = "Received an invalid response from the server.";
      } else if (err.message.includes("HTTP error!")) {
        errorMessage = "The server encountered an error. Please try again later.";
      }

      setMessages((prev) => [
        ...prev,
        {
          text: errorMessage,
          sender: "bot",
        },
      ]);
    } finally {
      setIsSubmitting(false);
      setShowBotIcon(true);
      setIsTypingMessage(false);
    }
  };

  // Add this effect for icon animation
  useEffect(() => {
    const icons = ['chat', 'thinking', 'robot'];
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % icons.length;
      setCurrentIcon(icons[currentIndex]);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const renderIcon = (iconKey, isMobile) => {
    switch(iconKey) {
      case 'chat':
        return (
          <svg className={`w-6 h-6 ${!isMobile && "mr-2"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        );
      case 'thinking':
        return <span className="text-xl mr-2">💭</span>;
      case 'robot':
        return <span className="text-xl mr-2">🤖</span>;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="backdrop-blur-md bg-white/30 border border-white/40 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            flex items-center justify-center text-black
            rounded-full
            hover:bg-black/5
            transition-all duration-300
            relative
            overflow-visible
            transform origin-center
            ${zoomOut ? "scale-100 opacity-100" : "scale-90 opacity-0"}
            ${isMobile ? "w-12 h-12 min-w-0 p-0" : "w-auto min-w-[140px] px-4 py-2"}
            moving-border-btn
          `}
          aria-label="Open chat"
          style={{ zIndex: 1 }}
        >
          {/* Animated moving border using SVG, conditional for shape */}
          {isMobile ? (
            <svg className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] pointer-events-none z-0" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="28" cy="28" r="27" stroke="url(#border-gradient-colorful)" strokeWidth="2" className="moving-border-circle" />
            </svg>
          ) : (
            <svg className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] pointer-events-none z-0" viewBox="0 0 216 64" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <rect x="4" y="4" width="208" height="56" rx="28" stroke="url(#border-gradient-colorful)" strokeWidth="2" className="moving-border-rect" />
            </svg>
          )}

          {/* Common linear gradient definition */}
          <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
              <linearGradient id="border-gradient-colorful" x1="0" y1="0" x2="1" y2="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(20)">
                <stop stopColor="#3d5be0" stopOpacity="0.5" />
                <stop offset="0.5" stopColor="#ff5941" stopOpacity="0.4" />
                <stop offset="1" stopColor="#3d5be0" stopOpacity="0.5" />
              </linearGradient>
            </defs>
          </svg>

          {/* Smooth icon switching */}
          <div className="relative w-6 h-6 flex items-center justify-center">
            {['chat', 'thinking', 'robot'].map((iconKey) => (
              <div
                key={iconKey}
                className={`absolute transition-all duration-700 ease-in-out ${
                  currentIcon === iconKey ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-75'
                }`}
              >
                {renderIcon(iconKey, isMobile)}
              </div>
            ))}
          </div>
          {!isMobile && <span className="font-medium ml-2">Let's Chat</span>}
        </button>
      </div>

      {isOpen && (
        <div
          className={`fixed bottom-24 ${isMobile ? "right-2 w-72" : "right-8 w-80"} 
          h-[400px] bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-white/40
          transform transition-all duration-300 ease-in-out
          hover:shadow-3d`}
        >
          <div className="flex items-center justify-between p-3 border-b border-white/40 bg-[#3d5be0] text-white rounded-t-lg">
            <h3 className="font-semibold text-sm">Chat with Sayees</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-[#2d4bd0] rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div ref={messageContainerRef} className="flex-1 overflow-y-auto p-3 space-y-3 bg-white">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`p-2 rounded-lg text-sm max-w-xs break-words transform transition-all duration-300 hover:scale-105 ${
                    message.sender === "user"
                      ? "bg-[#3d5be0] text-white rounded-br-none shadow-lg"
                      : "bg-gray-100 rounded-bl-none text-black shadow-md"
                  }`}
                >
                  {message.sender === "bot" && index === messages.length - 1 ? (
                    <TypeWriter
                      text={message.text}
                      onComplete={() => setIsTypingMessage(false)}
                      onCharacterTyped={scrollToBottom}
                    />
                  ) : (
                    message.text
                  )}
                </div>
              </div>
            ))}

            {/* Quick Action Buttons */}
            {showQuickActions && messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(action.query)}
                    className="px-3 py-1 text-sm bg-gray-100 border border-gray-200 text-black rounded-full hover:bg-[#3d5be0] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md"
                  >
                    {action.icon}
                    {action.text}
                  </button>
                ))}
              </div>
            )}

            {isTypingMessage && (
              <div className="flex justify-start">
                <div className="bg-gray-100 border border-gray-200 rounded-lg p-2 text-black rounded-bl-none shadow-md">
                  <div className="typing-animation">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-white/40 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage(inputMessage)
              }}
              className="flex w-full space-x-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d5be0] text-sm text-black placeholder:text-black/50 transition-all duration-300 hover:border-[#3d5be0]/50"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isSubmitting}
                className="p-2 bg-[#3d5be0] text-white rounded-lg hover:bg-[#2d4bd0] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {isSubmitting ? (
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span className="sr-only">{isSubmitting ? "Sending..." : "Send message"}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .typing-animation {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
        }
        
        .typing-animation span {
          width: 6px;
          height: 6px;
          background: #3d5be0;
          border-radius: 50%;
          animation: typing 1.4s infinite ease-in-out;
        }
        
        .typing-animation span:nth-child(1) { animation-delay: 0s; }
        .typing-animation span:nth-child(2) { animation-delay: 0.2s; }
        .typing-animation span:nth-child(3) { animation-delay: 0.4s; }
        
        @keyframes typing {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .moving-border-btn {
          position: relative;
          z-index: 0;
          background: #fff;
          border-radius: 9999px;
        }
        .moving-border-rect {
          stroke-dasharray: 600 100;
          stroke-dashoffset: 0;
          animation: border-move-rect 3s linear infinite;
        }
        .moving-border-circle {
          stroke-dasharray: 108 62; /* Circumference ~170 for r=27 */
          stroke-dashoffset: 0;
          animation: border-move-circle 3s linear infinite;
        }
        @keyframes border-move-rect {
          100% {
            stroke-dashoffset: -700;
          }
        }
        @keyframes border-move-circle {
          100% {
            stroke-dashoffset: -170;
          }
        }

        /* Make the moving border faster on mobile */
        @media (max-width: 768px) {
          :global(.moving-border-circle) {
            animation-duration: 1.2s !important;
          }
        }

        .shadow-3d {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                    0 4px 6px -2px rgba(0, 0, 0, 0.05),
                    0 1px 0 rgba(255, 255, 255, 0.1) inset;
        }

        .shadow-md {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                    0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .shadow-lg {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                    0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </>
  )
}
