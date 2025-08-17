'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type Msg = { id: string; text: string; sender: 'user' | 'assistant' };

export default function FloatingChatButton() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<Msg[]>(
    [{ id: 'm0', text: 'Hi! How can I help?', sender: 'assistant' }]
  );
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      // focus the input when opened
      setTimeout(() => textareaRef.current?.focus(), 80);
    }
  }, [open]);

  useEffect(() => {
    // scroll to bottom on new message
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, open]);

  const sendMessage = async (msgText?: string) => {
    const content = (msgText ?? text).trim();
    if (!content) return;
    const id = `u-${Date.now()}`;
    const userMsg: Msg = { id, text: content, sender: 'user' };
    setMessages((m) => [...m, userMsg]);
    setText('');
    // simulate async assistant reply (replace with real API call)
    setTimeout(() => {
      const aid = `a-${Date.now()}`;
      setMessages((m) => [
        ...m,
        {
          id: aid,
          text: "Thanks — here's an example reply. Replace with your real backend.",
          sender: 'assistant',
        },
      ]);
    }, 900);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!mounted) return null;

  const portal = (
    <>
      {/* Floating Button */}
      <div
        className="floating-chat-portal"
        role="presentation"
        style={{
          position: 'fixed',
          right: 24,
          bottom: 24,
          zIndex: 2147483647,
          pointerEvents: 'auto',
        }}
      >
        <button
          aria-label={open ? 'Close chat' : 'Open chat'}
          className="floating-chat-btn glass"
          onClick={() => setOpen((s) => !s)}
          style={{
            width: 56,
            height: 56,
            borderRadius: 9999,
            display: 'inline-grid',
            placeItems: 'center',
            cursor: 'pointer',
            transform: open ? 'scale(1.02)' : 'scale(1)',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="rgba(255,255,255,0.95)" />
          </svg>
        </button>
      </div>

      {/* Chat window */}
      <div
        aria-hidden={!open}
        className={`floating-chat-window glass ${open ? 'chat-open' : 'chat-closed'}`}
        style={{
          position: 'fixed',
          right: 24,
          bottom: 100,
          zIndex: 2147483647,
          width: 360,
          maxWidth: 'calc(100vw - 48px)',
          height: 520,
          display: open ? 'flex' : 'none',
          flexDirection: 'column',
          borderRadius: 14,
          overflow: 'hidden',
          pointerEvents: 'auto',
          willChange: 'transform, opacity',
        }}
      >
        <header
          className="chat-header"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 14px',
            borderBottom: '1px solid rgba(255,255,255,0.03)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                display: 'grid',
                placeItems: 'center',
                background: 'linear-gradient(135deg, rgba(122,76,224,0.18), rgba(45,163,255,0.08))',
                border: '1px solid rgba(122,76,224,0.12)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="white" opacity="0.95" />
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 700, color: 'rgba(255,255,255,0.96)', fontSize: 14 }}>Assistant</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Ask me about the portfolio</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button
              aria-label="Minimize"
              onClick={() => setOpen(false)}
              style={{
                border: 'none',
                background: 'transparent',
                color: 'rgba(255,255,255,0.8)',
                cursor: 'pointer',
                padding: 6,
                borderRadius: 8,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </header>

        <div
          className="chat-messages"
          ref={messagesRef}
          style={{
            flex: 1,
            padding: 12,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.00), rgba(255,255,255,0.01) 100%)',
          }}
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={`chat-bubble ${m.sender === 'user' ? 'user' : 'assistant'}`}
              style={{ alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start' }}
            >
              {m.text}
            </div>
          ))}
        </div>

        <form
          className="chat-input"
          onSubmit={(e) => handleSubmit(e)}
          style={{
            display: 'flex',
            gap: 8,
            padding: 12,
            borderTop: '1px solid rgba(255,255,255,0.03)',
            background: 'transparent',
            alignItems: 'flex-end',
          }}
        >
          <textarea
            aria-label="Type a message"
            ref={textareaRef}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              // auto-resize textarea
              const ta = textareaRef.current;
              if (!ta) return;
              ta.style.height = 'auto';
              ta.style.height = Math.min(140, ta.scrollHeight) + 'px';
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a message... (Enter to send, Shift+Enter for newline)"
            style={{
              flex: 1,
              minHeight: 40,
              maxHeight: 140,
              padding: '10px 12px',
              borderRadius: 10,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.03)',
              color: 'rgba(255,255,255,0.95)',
              outline: 'none',
              resize: 'none',
              lineHeight: 1.4,
            }}
          />
          <button
            type="submit"
            className="chat-send-btn"
            style={{
              minWidth: 48,
              height: 40,
              borderRadius: 10,
              border: 'none',
              background: 'linear-gradient(135deg,#7A4CE0,#2DA3FF)',
              color: '#fff',
              cursor: 'pointer',
              boxShadow: '0 14px 40px rgba(42,44,80,0.5)',
              display: 'inline-grid',
              placeItems: 'center',
            }}
          >
            Send
          </button>
        </form>
      </div>
    </>
  );

  return createPortal(portal, document.body);
}
