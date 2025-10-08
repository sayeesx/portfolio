"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import PixelCard from "./chat/PixelCard";
import styles from "./chat/PixelCard.module.css";
import type { JSX } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

type Msg = { id: string; text: string; sender: "user" | "assistant" };

export default function ChatWidget({
  hideLauncher = false,
  open,
  onOpenChange,
}: {
  hideLauncher?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}): JSX.Element | null {
  const [mounted, setMounted] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { id: "m0", text: "Hi! How can I help you with the portfolio?", sender: "assistant" },
  ]);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [serverStatus, setServerStatus] = useState<"checking" | "online" | "offline">("checking");
  const messagesRef = useRef<HTMLDivElement | null>(null);

  const sendMessageAction = useAction(api.chatbot.sendMessage);
  const checkHealthAction = useAction(api.chatbot.checkHealth);

  const placeholders = [
    "Ask me about the portfolio...",
    "What projects has Muhammed worked on?",
    "Tell me about his skills...",
    "How can I contact him?",
    "What technologies does he use?",
    "Tell me about his experience...",
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const result = await checkHealthAction();
        setServerStatus(result.online ? "online" : "offline");
      } catch (error) {
        setServerStatus("offline");
      }
    };
    checkStatus();
  }, [checkHealthAction]);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      const blur = document.getElementById('chat-blur-overlay');
      if (blur) blur.remove();
      return;
    }

    const isMobile = window.innerWidth <= 768;
    if (open && isMobile) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      if (!document.getElementById('chat-blur-overlay')) {
        const blurDiv = document.createElement('div');
        blurDiv.id = 'chat-blur-overlay';
        blurDiv.style.position = 'fixed';
        blurDiv.style.top = '0';
        blurDiv.style.left = '0';
        blurDiv.style.width = '100vw';
        blurDiv.style.height = '100vh';
        blurDiv.style.zIndex = '2147483646';
        blurDiv.style.backdropFilter = 'blur(8px)';
        blurDiv.style.background = 'rgba(0,0,0,0.25)';
        blurDiv.style.transition = 'backdrop-filter 0.2s';
        document.body.appendChild(blurDiv);
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      const blur = document.getElementById('chat-blur-overlay');
      if (blur) blur.remove();
    };
  }, [open]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, open, isTyping]);

  const sendMessage = async (msgText?: string) => {
    const content = (msgText ?? text).trim();
    if (!content) return;
    
    const id = `u-${Date.now()}`;
    const userMsg: Msg = { id, text: content, sender: "user" };
    setMessages((m) => [...m, userMsg]);
    setText("");
    setLoading(true);
    setIsTyping(true);

    try {
      const result = await sendMessageAction({ message: content });
      
      setTimeout(() => {
        const aid = `a-${Date.now()}`;
        setMessages((m) => [
          ...m,
          {
            id: aid,
            text: result.response,
            sender: "assistant",
          },
        ]);
        setIsTyping(false);
        setLoading(false);
      }, 800);
    } catch (error) {
      setTimeout(() => {
        const aid = `a-${Date.now()}`;
        setMessages((m) => [
          ...m,
          {
            id: aid,
            text: "Sorry, the chatbot server is currently unavailable. Please try again later.",
            sender: "assistant",
          },
        ]);
        setIsTyping(false);
        setLoading(false);
      }, 800);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(text);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  if (!mounted) return null;

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  const portal = (
    <>
      {!hideLauncher && (
        <div
          className="floating-chat-portal"
          role="presentation"
          style={{
            position: "fixed",
            right: 24,
            bottom: 24,
            zIndex: 2147483647,
            pointerEvents: "auto",
          }}
        >
          <button
            aria-label={open ? "Close chat" : "Open chat"}
            className="floating-chat-btn glass"
            onClick={() => onOpenChange?.(!open)}
          style={{
            width: isMobile ? 44 : 56,
            height: isMobile ? 44 : 56,
            borderRadius: 9999,
              display: "inline-grid",
              placeItems: "center",
              cursor: "pointer",
              transform: open ? "scale(1.02)" : "scale(1)",
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              transition: "all 0.3s ease",
            }}
          >
            <svg width={isMobile ? "18" : "22"} height={isMobile ? "18" : "22"} viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="rgba(255,255,255,0.95)" />
            </svg>
          </button>
        </div>
      )}
      <div
        aria-hidden={!open}
        className={`floating-chat-window glass ${open ? "chat-open" : "chat-closed"}`}
          style={{
            position: "fixed",
            right: isMobile ? 0 : 24,
            left: isMobile ? 0 : undefined,
            bottom: isMobile ? 0 : 100,
            zIndex: 2147483647,
            width: isMobile ? '100vw' : 320,
            maxWidth: isMobile ? '100vw' : 'calc(100vw - 48px)',
            height: isMobile ? '70vh' : 520,
          display: open ? "flex" : "none",
          flexDirection: "column",
          borderRadius: isMobile ? 0 : 14,
          overflow: "hidden",
          pointerEvents: "auto",
          background: "rgba(0, 0, 0, 0.85)",
          backdropFilter: "blur(20px)",
          border: isMobile ? "none" : "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: isMobile ? 'none' : '0 20px 60px rgba(0, 0, 0, 0.5)',
        }}
      >
        <header
          className="chat-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: isMobile ? "8px 10px" : "12px 14px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            position: "relative",
            zIndex: 2,
            background: "transparent",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: isMobile ? 28 : 36,
                height: isMobile ? 28 : 36,
                borderRadius: 8,
                display: "grid",
                placeItems: "center",
                background: "linear-gradient(135deg, rgba(122,76,224,0.18), rgba(45,163,255,0.08))",
                border: "1px solid rgba(122,76,224,0.12)",
                position: "relative",
              }}
            >
              <svg width={isMobile ? "14" : "18"} height={isMobile ? "14" : "18"} viewBox="0 0 24 24" fill="none">
                <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="white" opacity="0.95" />
              </svg>
              {serverStatus !== "checking" && (
                <div
                  style={{
                    position: "absolute",
                    top: -2,
                    right: -2,
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: serverStatus === "online" ? "#22c55e" : "#ef4444",
                    boxShadow: `0 0 0 2px rgba(0,0,0,0.85), 0 0 8px ${serverStatus === "online" ? "#22c55e" : "#ef4444"}`,
                    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                  }}
                />
              )}
            </div>
            <div>
              <div style={{ fontWeight: 700, color: "rgba(255,255,255,0.96)", fontSize: isMobile ? 12 : 14 }}>Assistant</div>
              <div style={{ fontSize: isMobile ? 9 : 11, color: serverStatus === "online" ? "#22c55e" : "#ef4444", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                {serverStatus === "checking" ? (
                  <>
                    Connecting to server...
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}>
                      <circle cx="12" cy="12" r="10" opacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                    </svg>
                  </>
                ) : serverStatus === "online" ? "Online" : "Offline"}
              </div>
            </div>
          </div>
          <button
            aria-label="Close"
            onClick={() => onOpenChange?.(false)}
            style={{
              border: "none",
              background: "transparent",
              color: "rgba(255,255,255,0.8)",
              cursor: "pointer",
              padding: 6,
              borderRadius: 8,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </header>
        <div
          style={{
            position: "relative",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          {loading && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: "100%",
                height: "100%",
                zIndex: 1,
                pointerEvents: "none",
                overflow: "hidden",
              }}
            >
              <PixelCard
                className={`${styles["pixel-card"]} pixel-card-loading`}
                variant="blue"
                active={true}
              >
                <></>
              </PixelCard>
            </div>
          )}
          <div
            className="chat-messages"
            ref={messagesRef}
            style={{
              flex: 1,
              padding: isMobile ? 8 : 12,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              position: "relative",
              zIndex: 2,
            }}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
                  maxWidth: isMobile ? "85%" : "80%",
                  padding: isMobile ? "8px 12px" : "10px 14px",
                  borderRadius: isMobile ? 10 : 12,
                  background: m.sender === "user" 
                    ? "linear-gradient(135deg, #7A4CE0, #2DA3FF)" 
                    : "rgba(255, 255, 255, 0.05)",
                  color: "white",
                  fontSize: isMobile ? 13 : 14,
                  lineHeight: 1.5,
                }}
              >
                {m.text}
              </div>
            ))}
            {isTyping && (
              <div
                style={{
                  alignSelf: "flex-start",
                  maxWidth: "80%",
                  padding: "10px 14px",
                  borderRadius: 12,
                  background: "rgba(255, 255, 255, 0.05)",
                  color: "white",
                  fontSize: 14,
                  lineHeight: 1.5,
                  display: "flex",
                  gap: 4,
                }}
              >
                <span style={{ animation: "bounce 1.4s infinite", animationDelay: "0s" }}>●</span>
                <span style={{ animation: "bounce 1.4s infinite", animationDelay: "0.2s" }}>●</span>
                <span style={{ animation: "bounce 1.4s infinite", animationDelay: "0.4s" }}>●</span>
              </div>
            )}
          </div>
          <div
            className="chat-input"
            style={{
              padding: isMobile ? 8 : 12,
              borderTop: "1px solid rgba(255,255,255,0.1)",
              background: "transparent",
              position: "relative",
              zIndex: 2,
            }}
          >
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        @keyframes bounce {
          0%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-6px);
          }
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );

  return createPortal(portal, document.body);
}