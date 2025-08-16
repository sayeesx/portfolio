
'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ChatWidget to enable code-splitting
const ChatWidget = dynamic(
  () => import('./ChatWidget'),
  { ssr: false }
);

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Add a small delay before showing the button for a smoother initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
      }}
   >
      <div
        style={{
          transition: 'all 300ms ease-in-out',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
        }}
      >
        {isOpen && (
          <div style={{ marginBottom: 12 }}>
            <ChatWidget onClose={() => setIsOpen(false)} />
          </div>
        )}

        {!isOpen && (
          <>
            <button
              onClick={() => setIsOpen(true)}
              aria-label={'Open chat'}
              className="chat-fab"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M20 12.5c0 3.59-3.582 6.5-8 6.5-1.056 0-2.06-.168-2.972-.473-.267-.09-.402-.135-.534-.157-.12-.02-.187-.024-.308.008-.114.03-.238.1-.485.239l-2.6 1.47c-.39.22-.586.33-.744.315a.5.5 0 0 1-.416-.296c-.072-.162-.008-.387.12-.837l.74-2.63c.08-.284.121-.426.116-.555-.004-.118-.036-.233-.098-.444C3.64 15.27 3 13.94 3 12.5 3 8.91 6.582 6 11 6s9 2.91 9 6.5Z" fill="white" fillOpacity="0.95"/>
              </svg>
            </button>
            <style jsx>{`
              .chat-fab {
                width: 56px;
                height: 56px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                background: linear-gradient(180deg, rgba(16,24,40,0.35), rgba(16,24,40,0.18)) padding-box,
                            radial-gradient(120% 120% at 0% 0%, rgba(122,162,255,0.35), rgba(61,91,224,0.18) 60%, rgba(122,162,255,0.15)) border-box;
                border: 1px solid rgba(255,255,255,0.22);
                box-shadow: 0 10px 25px rgba(0,0,0,0.35), 0 2px 8px rgba(61,91,224,0.25) inset;
                backdrop-filter: blur(10px) saturate(140%);
                -webkit-backdrop-filter: blur(10px) saturate(140%);
                cursor: pointer;
                transition: transform .18s ease, box-shadow .25s ease, background .25s ease, filter .25s ease;
                animation: floaty 3s ease-in-out infinite;
              }
              .chat-fab:hover {
                transform: translateY(-2px);
                box-shadow: 0 16px 36px rgba(0,0,0,0.45), 0 0 0 1px rgba(122,162,255,0.25) inset;
                background: linear-gradient(180deg, rgba(16,24,40,0.45), rgba(16,24,40,0.24)) padding-box,
                            radial-gradient(120% 120% at 0% 0%, rgba(122,162,255,0.45), rgba(61,91,224,0.28) 60%, rgba(122,162,255,0.22)) border-box;
                filter: saturate(1.05);
              }
              .chat-fab:active { transform: translateY(0); }
              @keyframes floaty { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-1.5px); } }
            `}</style>
          </>
        )}
      </div>
    </div>
  );
};

export default FloatingChatButton;
